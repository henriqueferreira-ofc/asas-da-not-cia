import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, FolderOpen, GripVertical } from 'lucide-react';
import { useAllCategories, useDeleteCategory, useToggleCategoryPublished, Category } from '@/hooks/useCategories';
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

const AdminCategorias = () => {
  const { data: categories, isLoading } = useAllCategories();
  const deleteCategory = useDeleteCategory();
  const togglePublished = useToggleCategoryPublished();
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteCategory.mutateAsync(deleteId);
      toast({ title: 'Categoria excluída com sucesso' });
    } catch (error) {
      toast({ title: 'Erro ao excluir categoria', variant: 'destructive' });
    } finally {
      setDeleteId(null);
    }
  };

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      await togglePublished.mutateAsync({ id, published });
      toast({ title: published ? 'Categoria desativada' : 'Categoria ativada' });
    } catch (error) {
      toast({ title: 'Erro ao alterar status', variant: 'destructive' });
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-headline">
            Categorias
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as categorias de notícias do portal
          </p>
        </div>
        <Link to="/admin/categorias/nova">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Categoria
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : categories?.length === 0 ? (
        <Card className="p-12 text-center">
          <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-lg font-medium mb-2">Nenhuma categoria cadastrada</h2>
          <p className="text-muted-foreground mb-4">
            Comece adicionando sua primeira categoria.
          </p>
          <Link to="/admin/categorias/nova">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Categoria
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {categories?.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="text-muted-foreground cursor-move">
                  <GripVertical className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      /{category.slug}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {category.description || 'Sem descrição'}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {category.show_in_menu && (
                      <Badge variant="secondary" className="text-xs">Menu</Badge>
                    )}
                    {category.show_in_home && (
                      <Badge variant="secondary" className="text-xs">Home</Badge>
                    )}
                  </div>
                </div>

                <Badge variant={category.published ? 'default' : 'outline'}>
                  {category.published ? 'Ativa' : 'Inativa'}
                </Badge>

                <div className="flex gap-2">
                  <Link to={`/admin/categorias/editar/${category.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublished(category.id, category.published)}
                  >
                    {category.published ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeleteId(category.id)}
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
            <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Notícias associadas a esta categoria não serão excluídas, mas perderão a associação.
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

export default AdminCategorias;
