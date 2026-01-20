import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type Evento = Tables<'eventos'>;
export type EventoInsert = TablesInsert<'eventos'>;
export type EventoUpdate = TablesUpdate<'eventos'>;

// Fetch all published events (for public view)
export function usePublishedEventos() {
  return useQuery({
    queryKey: ['eventos', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .eq('published', true)
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data as Evento[];
    },
  });
}

// Fetch upcoming published events
export function useUpcomingEventos(limit = 5) {
  return useQuery({
    queryKey: ['eventos', 'upcoming', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .eq('published', true)
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data as Evento[];
    },
  });
}

// Fetch all events (for admin)
export function useAllEventos() {
  return useQuery({
    queryKey: ['eventos', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      return data as Evento[];
    },
  });
}

// Fetch single event by ID
export function useEvento(id: string | undefined) {
  return useQuery({
    queryKey: ['eventos', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Evento;
    },
    enabled: !!id,
  });
}

// Create event
export function useCreateEvento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (evento: EventoInsert) => {
      const { data, error } = await supabase
        .from('eventos')
        .insert(evento)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
    },
  });
}

// Update event
export function useUpdateEvento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...evento }: EventoUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('eventos')
        .update(evento)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
      queryClient.invalidateQueries({ queryKey: ['eventos', variables.id] });
    },
  });
}

// Delete event
export function useDeleteEvento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('eventos')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
    },
  });
}

// Toggle published status
export function useToggleEventoPublished() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase
        .from('eventos')
        .update({ published: !published })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
    },
  });
}

// Upload event image
export async function uploadEventImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `eventos/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('news-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('news-images')
    .getPublicUrl(filePath);

  return publicUrl;
}
