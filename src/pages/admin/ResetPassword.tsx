import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import logoAafab from '@/assets/logo-aafab.png';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has a valid recovery session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsValidSession(true);
      } else {
        toast({
          title: 'Link inválido ou expirado',
          description: 'Solicite um novo link de recuperação de senha.',
          variant: 'destructive',
        });
      }
      setIsCheckingSession(false);
    };

    checkSession();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Senhas não conferem',
        description: 'As senhas digitadas não são iguais.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Senha muito curta',
        description: 'A senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        toast({
          title: 'Erro ao redefinir senha',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setIsSuccess(true);
      toast({
        title: 'Senha redefinida com sucesso',
        description: 'Você será redirecionado para o painel administrativo.',
      });

      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao redefinir a senha.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img 
              src={logoAafab} 
              alt="AAFAB" 
              className="w-16 h-16 object-contain bg-white rounded-full p-1 mx-auto mb-3"
            />
            <CardTitle className="text-xl font-serif text-headline">
              Link Inválido
            </CardTitle>
            <CardDescription>
              O link de recuperação é inválido ou expirou.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Voltar para o site
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-3" />
            <CardTitle className="text-xl font-serif text-headline">
              Senha Redefinida!
            </CardTitle>
            <CardDescription>
              Redirecionando para o painel administrativo...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src={logoAafab} 
            alt="AAFAB" 
            className="w-16 h-16 object-contain bg-white rounded-full p-1 mx-auto mb-3"
          />
          <CardTitle className="text-xl font-serif text-headline">
            Redefinir Senha
          </CardTitle>
          <CardDescription>
            Digite sua nova senha abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Redefinindo...
                </>
              ) : (
                'Redefinir Senha'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
