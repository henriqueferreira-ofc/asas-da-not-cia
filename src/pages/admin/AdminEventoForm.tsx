import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Save, Image as ImageIcon, Calendar, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  useEvento, 
  useCreateEvento, 
  useUpdateEvento
} from '@/hooks/useEventos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageUpload } from '@/components/admin/ImageUpload';

const formSchema = z.object({
  title: z.string().min(5, 'O título deve ter pelo menos 5 caracteres'),
  description: z.string().optional(),
  location: z.string().optional(),
  event_date: z.string().min(1, 'A data do evento é obrigatória'),
  event_time: z.string().min(1, 'O horário é obrigatório'),
  end_date: z.string().optional(),
  end_time: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

const AdminEventoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const { data: evento, isLoading: isLoadingEvento } = useEvento(id);
  const createEvento = useCreateEvento();
  const updateEvento = useUpdateEvento();

  const [imageUrl, setImageUrl] = useState<string>('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      event_date: '',
      event_time: '',
      end_date: '',
      end_time: '',
      published: false,
      featured: false,
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (evento) {
      const eventDate = new Date(evento.event_date);
      const endDate = evento.end_date ? new Date(evento.end_date) : null;
      
      form.reset({
        title: evento.title,
        description: evento.description || '',
        location: evento.location || '',
        event_date: format(eventDate, 'yyyy-MM-dd'),
        event_time: format(eventDate, 'HH:mm'),
        end_date: endDate ? format(endDate, 'yyyy-MM-dd') : '',
        end_time: endDate ? format(endDate, 'HH:mm') : '',
        published: evento.published,
        featured: evento.featured,
      });
      setImageUrl(evento.image_url || '');
    }
  }, [evento, form]);

  const onSubmit = async (data: FormData) => {
    try {
      // Combine date and time
      const eventDateTime = new Date(`${data.event_date}T${data.event_time}`);
      const endDateTime = data.end_date && data.end_time 
        ? new Date(`${data.end_date}T${data.end_time}`)
        : null;

      const eventoData = {
        title: data.title,
        description: data.description || null,
        location: data.location || null,
        event_date: eventDateTime.toISOString(),
        end_date: endDateTime?.toISOString() || null,
        image_url: imageUrl || null,
        published: data.published,
        featured: data.featured,
      };

      if (isEditing && id) {
        await updateEvento.mutateAsync({ id, ...eventoData });
        toast({
          title: 'Evento atualizado',
          description: 'O evento foi atualizado com sucesso.',
        });
      } else {
        await createEvento.mutateAsync(eventoData);
        toast({
          title: 'Evento criado',
          description: 'O evento foi criado com sucesso.',
        });
      }

      navigate('/admin/eventos');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o evento. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  if (isEditing && isLoadingEvento) {
    return (
      <div className="p-6 lg:p-8 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/admin/eventos')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-headline">
            {isEditing ? 'Editar Evento' : 'Novo Evento'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? 'Atualize as informações do evento' : 'Preencha as informações do evento'}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Evento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Encontro Nacional da AAFAB 2026" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva os detalhes do evento..."
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input 
                              placeholder="Ex: Brasília, DF - Hotel Nacional" 
                              className="pl-10"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Data e Horário
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="event_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data do Evento *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="event_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horário *</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="end_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Término (opcional)</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="end_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horário de Término</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Imagem do Evento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUpload
                    value={imageUrl}
                    onChange={setImageUrl}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publicação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Publicar</FormLabel>
                          <FormDescription>
                            Tornar visível no site
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Destaque</FormLabel>
                          <FormDescription>
                            Exibir em destaque
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full gap-2"
                disabled={createEvento.isPending || updateEvento.isPending}
              >
                <Save className="w-4 h-4" />
                {isEditing ? 'Salvar Alterações' : 'Criar Evento'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminEventoForm;
