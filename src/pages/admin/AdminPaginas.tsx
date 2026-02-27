import { Link } from 'react-router-dom';
import { FileText, Edit, ExternalLink } from 'lucide-react';
import { useAllPageContents } from '@/hooks/usePageContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const pageRoutes: Record<string, string> = {
  'inicio': '/',
  'sobre': '/sobre',
  'ajude-nos': '/ajude-nos',
  'contato': '/contato',
  'diretoria': '/diretoria',
  'privacidade': '/privacidade',
  'termos': '/termos',
  'cesd': '/cesd',
};

const pageLabels: Record<string, string> = {
  'inicio': 'Início',
  'sobre': 'Sobre a AAFAB',
  'ajude-nos': 'Ajude-nos',
  'contato': 'Contato',
  'diretoria': 'Diretoria',
  'privacidade': 'Política de Privacidade',
  'termos': 'Termos de Uso',
  'cesd': 'CESD - Memorial Digital',
};

const AdminPaginas = () => {
  const { data: pages, isLoading } = useAllPageContents();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-headline">
          Gerenciar Páginas
        </h1>
        <p className="text-muted-foreground mt-1">
          Edite o conteúdo das páginas estáticas do site
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(pageRoutes).map((slug) => {
            const page = pages?.find(p => p.page_slug === slug);
            const title = page?.page_title || pageLabels[slug] || slug;
            const updatedAt = page?.updated_at ? new Date(page.updated_at).toLocaleDateString('pt-BR') : 'Não inicializada';

            return (
              <Card key={slug} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className={`w-5 h-5 ${page ? 'text-primary' : 'text-muted-foreground'}`} />
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Última atualização: {updatedAt}
                  </p>
                  <div className="flex gap-2">
                    <Link to={`/admin/paginas/editar/${slug}`} className="flex-1">
                      <Button className="w-full gap-2" size="sm" variant={page ? "default" : "secondary"}>
                        <Edit className="w-4 h-4" />
                        {page ? 'Editar' : 'Inicializar'}
                      </Button>
                    </Link>
                    <Link to={pageRoutes[slug] || '/'} target="_blank">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPaginas;
