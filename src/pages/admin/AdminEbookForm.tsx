import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Loader2, CreditCard, QrCode, X, Trash2 } from 'lucide-react';
import { useEbook, useCreateEbook, useUpdateEbook, uploadEbookCover, uploadEbookPdf, EbookInsert } from '@/hooks/useEbooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminEbookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const { data: ebook, isLoading: isLoadingEbook } = useEbook(id);
  const createEbook = useCreateEbook();
  const updateEbook = useUpdateEbook();

  const [formData, setFormData] = useState<EbookInsert>({
    title: '',
    description: '',
    price: 0,
    pages: null,
    cover_url: null,
    pdf_url: null,
    pix_link: null,
    card_link: null,
    published: false,
    featured: false,
    sort_order: 0,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (ebook) {
      setFormData({
        title: ebook.title,
        description: ebook.description || '',
        price: ebook.price,
        pages: ebook.pages,
        cover_url: ebook.cover_url,
        pdf_url: ebook.pdf_url,
        pix_link: ebook.pix_link,
        card_link: ebook.card_link,
        published: ebook.published,
        featured: ebook.featured,
        sort_order: ebook.sort_order,
      });
    }
  }, [ebook]);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadEbookCover(file);
      setFormData(prev => ({ ...prev, cover_url: url }));
      toast({ title: 'Capa enviada com sucesso' });
    } catch (error) {
      toast({ title: 'Erro ao enviar capa', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({ title: 'Por favor, envie um arquivo PDF', variant: 'destructive' });
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadEbookPdf(file);
      setFormData(prev => ({ ...prev, pdf_url: url }));
      toast({ title: 'PDF enviado com sucesso' });
    } catch (error) {
      toast({ title: 'Erro ao enviar PDF', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({ title: 'Título é obrigatório', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && id) {
        await updateEbook.mutateAsync({ id, ...formData });
        toast({ title: 'E-book atualizado com sucesso' });
      } else {
        await createEbook.mutateAsync(formData);
        toast({ title: 'E-book criado com sucesso' });
      }
      navigate('/admin/ebooks');
    } catch (error) {
      toast({ title: 'Erro ao salvar e-book', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing && isLoadingEbook) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate('/admin/ebooks')}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>

      <h1 className="text-2xl lg:text-3xl font-serif font-bold text-headline mb-8">
        {isEditing ? 'Editar E-book' : 'Novo E-book'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Nome do e-book"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Breve descrição do e-book"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Preço (R$) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="pages">Número de Páginas</Label>
                <Input
                  id="pages"
                  type="number"
                  min="1"
                  value={formData.pages || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, pages: parseInt(e.target.value) || null }))}
                  placeholder="Ex: 120"
                />
              </div>
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
                Números menores aparecem primeiro
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cover Image */}
        <Card>
          <CardHeader>
            <CardTitle>Capa do E-book</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="w-32 h-44 bg-muted rounded-lg overflow-hidden flex items-center justify-center relative group/cover">
                {formData.cover_url ? (
                  <>
                    <img
                      src={formData.cover_url}
                      alt="Capa"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, cover_url: null }))}
                      className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover/cover:opacity-100 transition-opacity hover:bg-destructive/90"
                      title="Remover capa"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <span className="text-muted-foreground text-sm">Sem capa</span>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="cover" className="cursor-pointer">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    {isUploading ? (
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Clique para enviar uma imagem
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Recomendado: 600x800px (3:4)
                        </p>
                      </>
                    )}
                  </div>
                </Label>
                <Input
                  id="cover"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverUpload}
                  disabled={isUploading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PDF Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Arquivo do E-book (PDF)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="flex-1">
                <Label htmlFor="pdf" className="cursor-pointer">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    {isUploading ? (
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Clique para enviar o arquivo PDF
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Apenas arquivos .pdf
                        </p>
                      </>
                    )}
                  </div>
                </Label>
                <Input
                  id="pdf"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handlePdfUpload}
                  disabled={isUploading}
                />

                {formData.pdf_url && (
                  <div className="mt-4 p-4 bg-muted rounded-lg flex items-center justify-between group/pdf">
                    <span className="text-sm font-medium truncate max-w-[200px] lg:max-w-md">
                      {formData.pdf_url.split('/').pop()}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <a href={formData.pdf_url} target="_blank" rel="noopener noreferrer">
                          Visualizar
                        </a>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setFormData(prev => ({ ...prev, pdf_url: null }))}
                        title="Remover PDF"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Links */}
        <Card>
          <CardHeader>
            <CardTitle>Links de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure os links para pagamento externo (gateway de pagamento).
              O sistema não processa pagamentos internamente.
            </p>

            <div>
              <Label htmlFor="pix_link" className="flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                Link PIX
              </Label>
              <Input
                id="pix_link"
                type="url"
                value={formData.pix_link || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, pix_link: e.target.value || null }))}
                placeholder="https://seu-gateway.com/pix/..."
              />
            </div>

            <div>
              <Label htmlFor="card_link" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Link Cartão de Crédito
              </Label>
              <Input
                id="card_link"
                type="url"
                value={formData.card_link || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, card_link: e.target.value || null }))}
                placeholder="https://seu-gateway.com/cartao/..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Publicado</Label>
                <p className="text-sm text-muted-foreground">
                  E-book visível no site público
                </p>
              </div>
              <Switch
                checked={formData.published}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Destaque</Label>
                <p className="text-sm text-muted-foreground">
                  Exibir em destaque na página Ajude-nos
                </p>
              </div>
              <Switch
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/ebooks')}
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
              isEditing ? 'Salvar Alterações' : 'Criar E-book'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminEbookForm;
