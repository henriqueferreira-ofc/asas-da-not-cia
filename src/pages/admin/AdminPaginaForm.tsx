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
        placeholder="1 - Legalidade - Atuamos com base na Constituição...&#10;2 - Ética - Compromisso com a verdade e transparência...&#10;..."
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
        placeholder="Entre em Contato"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="subtitle">Subtítulo (texto abaixo do título)</Label>
      <Textarea
        id="subtitle"
        rows={2}
        value={(content.subtitle as string) || ''}
        onChange={(e) => onChange({ ...content, subtitle: e.target.value })}
        placeholder="Estamos à disposição para atender associados..."
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">E-mail (quadro E-mail)</Label>
      <Input
        id="email"
        type="email"
        value={(content.email as string) || ''}
        onChange={(e) => onChange({ ...content, email: e.target.value })}
        placeholder="aafabdm@gmail.com"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="phone">Telefone</Label>
      <Input
        id="phone"
        value={(content.phone as string) || ''}
        onChange={(e) => onChange({ ...content, phone: e.target.value })}
        placeholder="(61) 3965-2394 / 98321-3399"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="openingHours">Horário de atendimento (opcional, aparece no quadro Telefone)</Label>
      <Input
        id="openingHours"
        value={(content.openingHours as string) || ''}
        onChange={(e) => onChange({ ...content, openingHours: e.target.value })}
        placeholder="Ex: Segunda a Sexta 08h às 18h. Deixe vazio para não exibir."
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="address">Endereço</Label>
      <Textarea
        id="address"
        rows={3}
        value={(content.address as string) || ''}
        onChange={(e) => onChange({ ...content, address: e.target.value })}
        placeholder="SCS Quadra 02 Ed. Oscar Niemeyer..."
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="formTitle">Título do formulário</Label>
      <Input
        id="formTitle"
        value={(content.formTitle as string) || ''}
        onChange={(e) => onChange({ ...content, formTitle: e.target.value })}
        placeholder="Envie sua Mensagem"
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Cabeçalho da Página</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título Principal</Label>
          <Input id="title" value={(content.title as string) || ''} onChange={(e) => onChange({ ...content, title: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" rows={3} value={(content.description as string) || ''} onChange={(e) => onChange({ ...content, description: e.target.value })} />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Seção E-Books</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ebooksTitle">Título da Seção</Label>
          <Input id="ebooksTitle" value={(content.ebooksTitle as string) || ''} onChange={(e) => onChange({ ...content, ebooksTitle: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ebooksSubtitle">Subtítulo</Label>
          <Input id="ebooksSubtitle" value={(content.ebooksSubtitle as string) || ''} onChange={(e) => onChange({ ...content, ebooksSubtitle: e.target.value })} />
        </div>
        <p className="text-xs text-muted-foreground">Os e-books são gerenciados em E-books {'>'} catálogo</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Seção Doação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="donationTitle">Título</Label>
          <Input id="donationTitle" value={(content.donationTitle as string) || ''} onChange={(e) => onChange({ ...content, donationTitle: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="donationDescription">Descrição</Label>
          <Textarea id="donationDescription" rows={3} value={(content.donationDescription as string) || ''} onChange={(e) => onChange({ ...content, donationDescription: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="donationFooter">Texto de rodapé</Label>
          <Input id="donationFooter" value={(content.donationFooter as string) || ''} onChange={(e) => onChange({ ...content, donationFooter: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pixBeneficiary">Nome do Beneficiário PIX</Label>
          <Input id="pixBeneficiary" value={(content.pixBeneficiary as string) || ''} onChange={(e) => onChange({ ...content, pixBeneficiary: e.target.value })} />
        </div>

        <div className="border-t pt-4 space-y-4">
          <p className="font-medium text-sm">Valor 1</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor (ex: 19,90)</Label>
              <Input value={(content.donationValue1 as string) || ''} onChange={(e) => onChange({ ...content, donationValue1: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Código PIX Copia e Cola</Label>
            <Textarea rows={2} value={(content.donationPixCode1 as string) || ''} onChange={(e) => onChange({ ...content, donationPixCode1: e.target.value })} />
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <p className="font-medium text-sm">Valor 2</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor (ex: 29,90)</Label>
              <Input value={(content.donationValue2 as string) || ''} onChange={(e) => onChange({ ...content, donationValue2: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Código PIX Copia e Cola</Label>
            <Textarea rows={2} value={(content.donationPixCode2 as string) || ''} onChange={(e) => onChange({ ...content, donationPixCode2: e.target.value })} />
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <p className="font-medium text-sm">Valor 3</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor (ex: 49,90)</Label>
              <Input value={(content.donationValue3 as string) || ''} onChange={(e) => onChange({ ...content, donationValue3: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Código PIX Copia e Cola</Label>
            <Textarea rows={2} value={(content.donationPixCode3 as string) || ''} onChange={(e) => onChange({ ...content, donationPixCode3: e.target.value })} />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Seção "Como sua ajuda é utilizada"</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="impactTitle">Título da Seção</Label>
          <Input id="impactTitle" value={(content.impactTitle as string) || ''} onChange={(e) => onChange({ ...content, impactTitle: e.target.value })} />
        </div>
        <div className="border-t pt-4 space-y-4">
          <p className="font-medium text-sm">Item 1</p>
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={(content.impact1Title as string) || ''} onChange={(e) => onChange({ ...content, impact1Title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea rows={2} value={(content.impact1Description as string) || ''} onChange={(e) => onChange({ ...content, impact1Description: e.target.value })} />
          </div>
        </div>
        <div className="border-t pt-4 space-y-4">
          <p className="font-medium text-sm">Item 2</p>
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={(content.impact2Title as string) || ''} onChange={(e) => onChange({ ...content, impact2Title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea rows={2} value={(content.impact2Description as string) || ''} onChange={(e) => onChange({ ...content, impact2Description: e.target.value })} />
          </div>
        </div>
        <div className="border-t pt-4 space-y-4">
          <p className="font-medium text-sm">Item 3</p>
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={(content.impact3Title as string) || ''} onChange={(e) => onChange({ ...content, impact3Title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea rows={2} value={(content.impact3Description as string) || ''} onChange={(e) => onChange({ ...content, impact3Description: e.target.value })} />
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
