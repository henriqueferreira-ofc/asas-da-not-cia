import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useCategory, useCreateCategory, useUpdateCategory, generateSlug, CategoryInsert } from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminCategoriaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const { data: category, isLoading: isLoadingCategory } = useCategory(id);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const [formData, setFormData] = useState<CategoryInsert>({
    name: '',
    slug: '',
    description: '',
    published: true,
    show_in_menu: true,
    show_in_home: true,
    sort_order: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        published: category.published,
        show_in_menu: category.show_in_menu,
        show_in_home: category.show_in_home,
        sort_order: category.sort_order,
      });
      setAutoSlug(false);
    }
  }, [category]);

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: autoSlug ? generateSlug(name) : prev.slug,
    }));
  };

  const handleSlugChange = (slug: string) => {
    setAutoSlug(false);
    setFormData(prev => ({ ...prev, slug: generateSlug(slug) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({ title: 'Nome é obrigatório', variant: 'destructive' });
      return;
    }

    if (!formData.slug.trim()) {
      toast({ title: 'Slug é obrigatório', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && id) {
        await updateCategory.mutateAsync({ id, ...formData });
        toast({ title: 'Categoria atualizada com sucesso' });
      } else {
        await createCategory.mutateAsync(formData);
        toast({ title: 'Categoria criada com sucesso' });
      }
      navigate('/admin/categorias');
    } catch (error: any) {
      if (error.message?.includes('unique')) {
        toast({ title: 'Já existe uma categoria com este slug', variant: 'destructive' });
      } else {
        toast({ title: 'Erro ao salvar categoria', variant: 'destructive' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing && isLoadingCategory) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate('/admin/categorias')}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>

      <h1 className="text-2xl lg:text-3xl font-serif font-bold text-headline mb-8">
        {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Categoria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: Política Nacional"
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="politica-nacional"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Usado na URL: /categoria/{formData.slug || 'slug'}
              </p>
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Breve descrição da categoria"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="sort_order">Ordem de Exibição</Label>
              <Input
                id="sort_order"
                type="number"
                min="0"
                value={formData.sort_order}
                onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Números menores aparecem primeiro no menu e na home
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visibilidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Categoria Ativa</Label>
                <p className="text-sm text-muted-foreground">
                  Categoria visível no site
                </p>
              </div>
              <Switch
                checked={formData.published}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Exibir no Menu</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar categoria no menu de navegação
                </p>
              </div>
              <Switch
                checked={formData.show_in_menu}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, show_in_menu: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Exibir na Home</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar seção desta categoria na página inicial
                </p>
              </div>
              <Switch
                checked={formData.show_in_home}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, show_in_home: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/categorias')}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              isEditing ? 'Salvar Alterações' : 'Criar Categoria'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminCategoriaForm;
