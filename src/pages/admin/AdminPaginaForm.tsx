import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { usePageContent, useUpdatePageContent } from '@/hooks/usePageContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DiretoriaFormFields } from '@/components/admin/forms/DiretoriaFormFields';

// Formulários específicos para cada página
const SobreForm = ({ content, onChange }: { content: Record<string, unknown>; onChange: (content: Record<string, unknown>) => void }) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Label htmlFor="title">Título da Página</Label>
      <Input
        id="title"
        value={(content.title as string) || ''}
        onChange={(e) => onChange({ ...content, title: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="subtitle">Subtítulo</Label>
      <Input
        id="subtitle"
        value={(content.subtitle as string) || ''}
        onChange={(e) => onChange({ ...content, subtitle: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="intro1">Introdução – Parágrafo 1</Label>
      <Textarea
        id="intro1"
        rows={4}
        value={(content.intro1 as string) || ''}
        onChange={(e) => onChange({ ...content, intro1: e.target.value })}
        placeholder="A AAFAB – Associação Amigos da Força Aérea Brasileira..."
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="intro2">Introdução – Parágrafo 2</Label>
      <Textarea
        id="intro2"
        rows={4}
        value={(content.intro2 as string) || ''}
        onChange={(e) => onChange({ ...content, intro2: e.target.value })}
        placeholder="Fundada com o propósito de fortalecer..."
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="mission">Missão</Label>
      <Textarea
        id="mission"
        rows={4}
        value={(content.mission as string) || ''}
        onChange={(e) => onChange({ ...content, mission: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="vision">Visão</Label>
      <Textarea
        id="vision"
        rows={4}
        value={(content.vision as string) || ''}
        onChange={(e) => onChange({ ...content, vision: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label>Valores (um por linha, formato: Título - Descrição)</Label>
      <Textarea
        rows={8}
        value={Array.isArray(content.values) ? (content.values as string[]).join('\n') : ''}
        onChange={(e) => onChange({ ...content, values: e.target.value.split('\n').filter(v => v.trim()) })}
        placeholder="Legalidade - Atuamos com base na Constituição...&#10;Ética - Compromisso com a verdade e transparência...&#10;..."
      />
    </div>
    <div className="space-y-2">
      <Label>Público (um por linha)</Label>
      <Textarea
        rows={6}
        value={Array.isArray(content.publico) ? (content.publico as string[]).join('\n') : ''}
        onChange={(e) => onChange({ ...content, publico: e.target.value.split('\n').filter(v => v.trim()) })}
        placeholder="Militares da ativa e reserva&#10;Pensionistas e familiares&#10;..."
      />
    </div>
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Seção CTA (Chamada para Ação)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ctaTitle">Título do CTA</Label>
          <Input
            id="ctaTitle"
            value={(content.ctaTitle as string) || ''}
            onChange={(e) => onChange({ ...content, ctaTitle: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ctaText">Texto do CTA</Label>
          <Textarea
            id="ctaText"
            rows={3}
            value={(content.ctaText as string) || ''}
            onChange={(e) => onChange({ ...content, ctaText: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  </div>
);

const ContatoForm = ({ content, onChange }: { content: Record<string, unknown>; onChange: (content: Record<string, unknown>) => void }) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Label htmlFor="title">Título da Página</Label>
      <Input
        id="title"
        value={(content.title as string) || ''}
        onChange={(e) => onChange({ ...content, title: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={(content.email as string) || ''}
        onChange={(e) => onChange({ ...content, email: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="phone">Telefone</Label>
      <Input
        id="phone"
        value={(content.phone as string) || ''}
        onChange={(e) => onChange({ ...content, phone: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="address">Endereço</Label>
      <Textarea
        id="address"
        rows={3}
        value={(content.address as string) || ''}
        onChange={(e) => onChange({ ...content, address: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="whatsappLink">Link do WhatsApp</Label>
      <Input
        id="whatsappLink"
        value={(content.whatsappLink as string) || ''}
        onChange={(e) => onChange({ ...content, whatsappLink: e.target.value })}
        placeholder="https://wa.me/5561999999999"
      />
    </div>
  </div>
);

const AjudeNosForm = ({ content, onChange }: { content: Record<string, unknown>; onChange: (content: Record<string, unknown>) => void }) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Label htmlFor="title">Título da Página</Label>
      <Input
        id="title"
        value={(content.title as string) || ''}
        onChange={(e) => onChange({ ...content, title: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="description">Descrição</Label>
      <Textarea
        id="description"
        rows={4}
        value={(content.description as string) || ''}
        onChange={(e) => onChange({ ...content, description: e.target.value })}
      />
    </div>
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Dados Bancários</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pixKey">Chave PIX</Label>
          <Input
            id="pixKey"
            value={(content.pixKey as string) || ''}
            onChange={(e) => onChange({ ...content, pixKey: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bankName">Nome do Banco</Label>
          <Input
            id="bankName"
            value={(content.bankName as string) || ''}
            onChange={(e) => onChange({ ...content, bankName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bankAgency">Agência</Label>
            <Input
              id="bankAgency"
              value={(content.bankAgency as string) || ''}
              onChange={(e) => onChange({ ...content, bankAgency: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankAccount">Conta</Label>
            <Input
              id="bankAccount"
              value={(content.bankAccount as string) || ''}
              onChange={(e) => onChange({ ...content, bankAccount: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// DiretoriaForm now uses the extracted component

const InicioForm = ({ content, onChange }: { content: Record<string, unknown>; onChange: (content: Record<string, unknown>) => void }) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Label htmlFor="heroTitle">Título Principal</Label>
      <Input
        id="heroTitle"
        value={(content.heroTitle as string) || ''}
        onChange={(e) => onChange({ ...content, heroTitle: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="heroSubtitle">Subtítulo</Label>
      <Textarea
        id="heroSubtitle"
        rows={3}
        value={(content.heroSubtitle as string) || ''}
        onChange={(e) => onChange({ ...content, heroSubtitle: e.target.value })}
      />
    </div>
  </div>
);

const AdminPaginaForm = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: pageData, isLoading } = usePageContent(slug || '');
  const updateMutation = useUpdatePageContent();
  const [content, setContent] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (pageData?.content && typeof pageData.content === 'object' && !Array.isArray(pageData.content)) {
      setContent(pageData.content as Record<string, unknown>);
    }
  }, [pageData]);

  const handleSave = () => {
    if (!slug) return;
    updateMutation.mutate({ slug, content: content as Record<string, unknown> });
  };

  const renderForm = () => {
    switch (slug) {
      case 'sobre':
        return <SobreForm content={content} onChange={setContent} />;
      case 'contato':
        return <ContatoForm content={content} onChange={setContent} />;
      case 'ajude-nos':
        return <AjudeNosForm content={content} onChange={setContent} />;
      case 'diretoria':
        return <DiretoriaFormFields content={content} onChange={setContent} />;
      case 'inicio':
        return <InicioForm content={content} onChange={setContent} />;
      default:
        return <p className="text-muted-foreground">Formulário não disponível para esta página.</p>;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/paginas')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-headline">
              Editar: {pageData?.page_title}
            </h1>
            <p className="text-muted-foreground mt-1">
              Atualize o conteúdo desta página
            </p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={updateMutation.isPending} className="gap-2">
          {updateMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Salvar Alterações
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {renderForm()}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPaginaForm;
