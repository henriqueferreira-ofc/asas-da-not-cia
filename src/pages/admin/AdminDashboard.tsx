import { Link } from 'react-router-dom';
import { 
  Newspaper, 
  Eye, 
  FileEdit, 
  Plus,
  TrendingUp
} from 'lucide-react';
import { useAllNoticias } from '@/hooks/useNoticias';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboard = () => {
  const { data: noticias, isLoading } = useAllNoticias();

  const stats = {
    total: noticias?.length || 0,
    published: noticias?.filter(n => n.published).length || 0,
    drafts: noticias?.filter(n => !n.published).length || 0,
    featured: noticias?.filter(n => n.featured).length || 0,
  };

  const recentNews = noticias?.slice(0, 5) || [];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-headline">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo ao painel administrativo da AAFAB
          </p>
        </div>
        <Link to="/admin/noticias/nova">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Notícia
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Notícias
            </CardTitle>
            <Newspaper className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{stats.total}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Publicadas
            </CardTitle>
            <Eye className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold text-emerald-600">{stats.published}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rascunhos
            </CardTitle>
            <FileEdit className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold text-amber-600">{stats.drafts}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Destaques
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold text-blue-600">{stats.featured}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent News */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Notícias Recentes</CardTitle>
          <Link to="/admin/noticias">
            <Button variant="ghost" size="sm">
              Ver todas
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentNews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Nenhuma notícia cadastrada ainda.
              </p>
              <Link to="/admin/noticias/nova">
                <Button>Criar primeira notícia</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentNews.map((news) => (
                <Link 
                  key={news.id} 
                  to={`/admin/noticias/editar/${news.id}`}
                  className="flex items-center gap-4 p-2 -mx-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  {news.image_url ? (
                    <img 
                      src={news.image_url} 
                      alt={news.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-secondary rounded flex items-center justify-center">
                      <Newspaper className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{news.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        news.published 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {news.published ? 'Publicada' : 'Rascunho'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(news.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
