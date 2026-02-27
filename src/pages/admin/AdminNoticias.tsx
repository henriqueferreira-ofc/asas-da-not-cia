import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MoreHorizontal,
  Newspaper
} from 'lucide-react';
import { useAllNoticias, useDeleteNoticia, useTogglePublished } from '@/hooks/useNoticias';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const categoryLabels: Record<string, string> = {
  aafab: 'AAFAB',
  politica: 'Notícia Nacional',
  internacional: 'Internacional',
  comunicados: 'Comunicados',
  // Compatibilidade com categorias antigas
  defesa: 'Defesa (antiga)',
  fab: 'Força Aérea (antiga)',
  opiniao: 'Opinião (antiga)',
  politics: 'Política (antiga)',
};

const AdminNoticias = () => {
  const { data: noticias, isLoading } = useAllNoticias();
  const deleteNoticia = useDeleteNoticia();
  const togglePublished = useTogglePublished();
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredNews = noticias?.filter(news =>
    news.title.toLowerCase().includes(search.toLowerCase()) ||
    news.category.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteNoticia.mutateAsync(deleteId);
      toast({
        title: 'Notícia excluída',
        description: 'A notícia foi excluída com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir a notícia.',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      await togglePublished.mutateAsync({ id, published: !currentStatus });
      toast({
        title: currentStatus ? 'Notícia despublicada' : 'Notícia publicada',
        description: currentStatus
          ? 'A notícia foi movida para rascunhos.'
          : 'A notícia está agora visível no site.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível alterar o status da notícia.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-headline">
            Notícias
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todas as notícias do site
          </p>
        </div>
        <Link to="/admin/noticias/nova">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Notícia
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar notícias..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 max-w-md"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-12 h-12 rounded" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
              ))
            ) : filteredNews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  <Newspaper className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {search ? 'Nenhuma notícia encontrada.' : 'Nenhuma notícia cadastrada.'}
                  </p>
                  {!search && (
                    <Link to="/admin/noticias/nova">
                      <Button className="mt-4">Criar primeira notícia</Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              filteredNews.map((news) => (
                <TableRow key={news.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {news.image_url ? (
                        <img
                          src={news.image_url}
                          alt=""
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center">
                          <Newspaper className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                      <span className="font-medium line-clamp-2">{news.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {categoryLabels[news.category] || news.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded-full ${news.published
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                      }`}>
                      {news.published ? 'Publicada' : 'Rascunho'}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(news.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/noticias/editar/${news.id}`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleTogglePublished(news.id, news.published)}
                        >
                          {news.published ? (
                            <>
                              <EyeOff className="w-4 h-4 mr-2" />
                              Despublicar
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Publicar
                            </>
                          )}
                        </DropdownMenuItem>
                        {isAdmin && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => setDeleteId(news.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir notícia?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A notícia será permanentemente excluída.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminNoticias;
