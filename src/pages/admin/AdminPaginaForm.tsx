import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { usePageContent, useUpdatePageContent } from '@/hooks/usePageContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Form Fields Components
import { SobreFormFields } from '@/components/admin/forms/SobreFormFields';
import { ContatoFormFields } from '@/components/admin/forms/ContatoFormFields';
import { AjudeNosFormFields } from '@/components/admin/forms/AjudeNosFormFields';
import { DiretoriaFormFields } from '@/components/admin/forms/DiretoriaFormFields';
import { InicioFormFields } from '@/components/admin/forms/InicioFormFields';

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

    // Filter empty lines only on save for array fields
    const cleanContent = { ...content } as Record<string, unknown>;
    if (Array.isArray(cleanContent.values)) {
      cleanContent.values = (cleanContent.values as string[]).filter(v => typeof v === 'string' && v.trim());
    }
    if (Array.isArray(cleanContent.publico)) {
      cleanContent.publico = (cleanContent.publico as string[]).filter(v => typeof v === 'string' && v.trim());
    }

    updateMutation.mutate({ slug, content: cleanContent });
  };

  const renderForm = () => {
    switch (slug) {
      case 'sobre':
        return <SobreFormFields content={content} onChange={setContent} />;
      case 'contato':
        return <ContatoFormFields content={content} onChange={setContent} />;
      case 'ajude-nos':
        return <AjudeNosFormFields content={content} onChange={setContent} />;
      case 'diretoria':
        return <DiretoriaFormFields content={content} onChange={setContent} />;
      case 'inicio':
        return <InicioFormFields content={content} onChange={setContent} />;
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
