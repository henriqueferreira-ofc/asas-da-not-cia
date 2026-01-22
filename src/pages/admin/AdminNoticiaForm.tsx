import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  useNoticia, 
  useCreateNoticia, 
  useUpdateNoticia 
} from '@/hooks/useNoticias';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useToast } from '@/hooks/use-toast';

const noticiaSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  excerpt: z.string().min(1, 'Resumo é obrigatório').max(500, 'Resumo muito longo'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  author: z.string().min(1, 'Autor é obrigatório').max(100, 'Nome muito longo'),
  author_role: z.string().max(100, 'Cargo muito longo').optional(),
  image_url: z.string().optional(),
  published: z.boolean(),
  featured: z.boolean(),
});

type NoticiaFormData = z.infer<typeof noticiaSchema>;

const categories = [
  { value: 'aafab', label: 'AAFAB' },
  { value: 'politica', label: 'Política' },
  { value: 'internacional', label: 'Internacional' },
  { value: 'defesa', label: 'Defesa' },
  { value: 'fab', label: 'Força Aérea' },
  { value: 'opiniao', label: 'Opinião' },
  { value: 'comunicados', label: 'Comunicados' },
];

const categoryLabels: Record<string, string> = {
  aafab: 'AAFAB',
  politica: 'Política',
  internacional: 'Internacional',
  defesa: 'Defesa',
  fab: 'Força Aérea',
  opiniao: 'Opinião',
  comunicados: 'Comunicados',
};

const AdminNoticiaForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const { data: existingNews, isLoading: isLoadingNews } = useNoticia(id);
  const createNoticia = useCreateNoticia();
  const updateNoticia = useUpdateNoticia();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoticiaFormData>({
    resolver: zodResolver(noticiaSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      category: 'aafab',
      author: 'Redação AAFAB',
      author_role: '',
      image_url: '',
      published: false,
      featured: false,
    },
  });

  const imageUrl = watch('image_url');
  const published = watch('published');
  const featured = watch('featured');
  const category = watch('category');

  useEffect(() => {
    if (existingNews) {
      reset({
        title: existingNews.title,
        excerpt: existingNews.excerpt,
        content: existingNews.content,
        category: existingNews.category,
        author: existingNews.author,
        author_role: existingNews.author_role || '',
        image_url: existingNews.image_url || '',
        published: existingNews.published,
        featured: existingNews.featured,
      });
    }
  }, [existingNews, reset]);

  const onSubmit = async (data: NoticiaFormData) => {
    try {
      const payload = {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        author: data.author,
        author_role: data.author_role || null,
        image_url: data.image_url || null,
        published: data.published,
        featured: data.featured,
        category_label: categoryLabels[data.category] || data.category,
      };

      if (isEditing && id) {
        await updateNoticia.mutateAsync({ id, ...payload });
        toast({
          title: 'Notícia atualizada',
          description: 'As alterações foram salvas com sucesso.',
        });
      } else {
        await createNoticia.mutateAsync(payload);
        toast({
          title: 'Notícia criada',
          description: 'A notícia foi criada com sucesso.',
        });
      }

      navigate('/admin/noticias');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar a notícia.',
        variant: 'destructive',
      });
    }
  };

  if (isEditing && isLoadingNews) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <Link 
          to="/admin/noticias"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para notícias
        </Link>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-headline">
          {isEditing ? 'Editar Notícia' : 'Nova Notícia'}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload */}
        <div className="space-y-2">
          <Label>Imagem Principal</Label>
          <ImageUpload
            value={imageUrl}
            onChange={(url) => setValue('image_url', url)}
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            {...register('title')}
            placeholder="Digite o título da notícia"
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <Label htmlFor="excerpt">Resumo *</Label>
          <Textarea
            id="excerpt"
            {...register('excerpt')}
            placeholder="Resumo que aparece na listagem de notícias"
            rows={3}
          />
          {errors.excerpt && (
            <p className="text-sm text-destructive">{errors.excerpt.message}</p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content">Conteúdo *</Label>
          <Textarea
            id="content"
            {...register('content')}
            placeholder="Conteúdo completo da notícia (suporta HTML)"
            rows={12}
          />
          <p className="text-xs text-muted-foreground">
            Você pode usar HTML para formatar o conteúdo (ex: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;)
          </p>
          {errors.content && (
            <p className="text-sm text-destructive">{errors.content.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Categoria *</Label>
          <Select
            value={category}
            onValueChange={(value) => setValue('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-destructive">{errors.category.message}</p>
          )}
        </div>

        {/* Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="author">Autor *</Label>
            <Input
              id="author"
              {...register('author')}
              placeholder="Nome do autor"
            />
            {errors.author && (
              <p className="text-sm text-destructive">{errors.author.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="author_role">Cargo (opcional)</Label>
            <Input
              id="author_role"
              {...register('author_role')}
              placeholder="Ex: Correspondente Parlamentar"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={(checked) => setValue('published', checked)}
            />
            <div>
              <Label htmlFor="published" className="cursor-pointer">
                Publicar
              </Label>
              <p className="text-xs text-muted-foreground">
                Torna a notícia visível no site
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={(checked) => setValue('featured', checked)}
            />
            <div>
              <Label htmlFor="featured" className="cursor-pointer">
                Destaque
              </Label>
              <p className="text-xs text-muted-foreground">
                Exibe na área de destaque da home
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-6 border-t border-border">
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isEditing ? 'Salvar Alterações' : 'Criar Notícia'}
          </Button>

          {isEditing && existingNews?.published && (
            <Link to={`/noticia/${id}`} target="_blank">
              <Button type="button" variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                Ver no Site
              </Button>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminNoticiaForm;
