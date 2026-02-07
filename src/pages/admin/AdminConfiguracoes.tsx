import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { useSiteSettings, useUpdateMultipleSiteSettings, SiteSetting } from '@/hooks/useSiteSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const AdminConfiguracoes = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateMultipleSiteSettings();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      const map: Record<string, string> = {};
      settings.forEach(s => {
        map[s.key] = s.value || '';
      });
      setFormData(map);
    }
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = Object.entries(formData).map(([key, value]) => ({
        key,
        value,
      }));
      await updateSettings.mutateAsync(updates);
      toast({ title: 'Configurações salvas com sucesso' });
    } catch (error) {
      toast({ title: 'Erro ao salvar configurações', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8">
        <Skeleton className="h-10 w-64 mb-8" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-headline">
            Configurações do Site
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as configurações gerais do portal
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="contato" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="contato">Contato</TabsTrigger>
          <TabsTrigger value="redes">Redes Sociais</TabsTrigger>
          <TabsTrigger value="botao">Botão Flutuante</TabsTrigger>
          <TabsTrigger value="links">Links Especiais</TabsTrigger>
        </TabsList>

        <TabsContent value="contato">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
              <CardDescription>
                Esses dados serão exibidos no rodapé e página de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={formData.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Brasília - DF, Brasil"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="(61) 99999-9999"
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail Institucional</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="contato@aafab.org.br"
                />
              </div>

              <div>
                <Label htmlFor="footer_text">Texto do Rodapé</Label>
                <Textarea
                  id="footer_text"
                  value={formData.footer_text || ''}
                  onChange={(e) => handleChange('footer_text', e.target.value)}
                  placeholder="AAFAB - Associação Amigos da Força Aérea Brasileira..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redes">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
              <CardDescription>
                Links para as redes sociais da AAFAB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.instagram || ''}
                  onChange={(e) => handleChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/aafab"
                />
              </div>

              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={formData.facebook || ''}
                  onChange={(e) => handleChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/aafab"
                />
              </div>

              <div>
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={formData.youtube || ''}
                  onChange={(e) => handleChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/@aafab"
                />
              </div>

              <div>
                <Label htmlFor="twitter">Twitter / X</Label>
                <Input
                  id="twitter"
                  value={formData.twitter || ''}
                  onChange={(e) => handleChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/aafab"
                />
              </div>

              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin || ''}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/aafab"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="botao">
          <Card>
            <CardHeader>
              <CardTitle>Botão Flutuante</CardTitle>
              <CardDescription>
                Configure o botão de comunidade que aparece no canto da tela
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Botão Ativo</Label>
                  <p className="text-sm text-muted-foreground">
                    Exibir botão flutuante no site
                  </p>
                </div>
                <Switch
                  checked={formData.floating_button_enabled === 'true'}
                  onCheckedChange={(checked) => handleChange('floating_button_enabled', checked ? 'true' : 'false')}
                />
              </div>

              <div>
                <Label htmlFor="floating_button_text">Texto do Botão</Label>
                <Input
                  id="floating_button_text"
                  value={formData.floating_button_text || ''}
                  onChange={(e) => handleChange('floating_button_text', e.target.value)}
                  placeholder="Entrar na nossa comunidade"
                />
              </div>

              <div>
                <Label htmlFor="floating_button_link">Link do Botão</Label>
                <Input
                  id="floating_button_link"
                  value={formData.floating_button_link || ''}
                  onChange={(e) => handleChange('floating_button_link', e.target.value)}
                  placeholder="https://chat.whatsapp.com/..."
                />
              </div>

              <div>
                <Label htmlFor="floating_button_position">Posição do Botão</Label>
                <Select
                  value={formData.floating_button_position || 'bottom-right'}
                  onValueChange={(value) => handleChange('floating_button_position', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-right">Inferior Direito</SelectItem>
                    <SelectItem value="bottom-left">Inferior Esquerdo</SelectItem>
                    <SelectItem value="top-right">Superior Direito</SelectItem>
                    <SelectItem value="top-left">Superior Esquerdo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Links Especiais</CardTitle>
              <CardDescription>
                Configure links importantes que aparecem em áreas específicas do site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recadastramento_link">Link de Recadastramento</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Este link aparecerá na página de Comunicados para direcionar usuários ao recadastramento
                </p>
                <Input
                  id="recadastramento_link"
                  value={formData.recadastramento_link || ''}
                  onChange={(e) => handleChange('recadastramento_link', e.target.value)}
                  placeholder="https://forms.gle/... ou https://seusite.com/recadastramento"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminConfiguracoes;
