import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, BookOpen, ExternalLink } from 'lucide-react';
import { useAllEbooks, useDeleteEbook, useToggleEbookPublished } from '@/hooks/useEbooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
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
import { useToast } from '@/hooks/use-toast';

const AdminEbooks = () => {
  const { data: ebooks, isLoading } = useAllEbooks();
  const deleteEbook = useDeleteEbook();
  const togglePublished = useToggleEbookPublished();
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteEbook.mutateAsync(deleteId);
      toast({ title: 'E-book excluído com sucesso' });
    } catch (error) {
      toast({ title: 'Erro ao excluir e-book', variant: 'destructive' });
    } finally {
      setDeleteId(null);
    }
  };

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      await togglePublished.mutateAsync({ id, published });
      toast({ title: published ? 'E-book despublicado' : 'E-book publicado' });
    } catch (error) {
      toast({ title: 'Erro ao alterar status', variant: 'destructive' });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-headline">
            E-books
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie o catálogo de e-books para captação institucional
          </p>
        </div>
        <Link to="/admin/ebooks/novo">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo E-book
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      ) : ebooks?.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-lg font-medium mb-2">Nenhum e-book cadastrado</h2>
          <p className="text-muted-foreground mb-4">
            Comece adicionando seu primeiro e-book ao catálogo.
          </p>
          <Link to="/admin/ebooks/novo">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Adicionar E-book
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ebooks?.map((ebook) => (
            <Card key={ebook.id} className="overflow-hidden">
              <div className="aspect-[3/4] relative bg-muted">
                {ebook.cover_url ? (
                  <img
                    src={ebook.cover_url}
                    alt={ebook.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-muted-foreground/50" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  {ebook.featured && (
                    <Badge variant="secondary">Destaque</Badge>
                  )}
                  <Badge variant={ebook.published ? 'default' : 'outline'}>
                    {ebook.published ? 'Publicado' : 'Rascunho'}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                  {ebook.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {ebook.description || 'Sem descrição'}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-primary">
                    {formatPrice(ebook.price)}
                  </span>
                  {ebook.pages && (
                    <span className="text-sm text-muted-foreground">
                      {ebook.pages} páginas
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link to={`/admin/ebooks/editar/${ebook.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Edit className="w-4 h-4" />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublished(ebook.id, ebook.published)}
                  >
                    {ebook.published ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeleteId(ebook.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir e-book?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O e-book será permanentemente removido do catálogo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminEbooks;
