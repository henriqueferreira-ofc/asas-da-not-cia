import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type Noticia = Tables<'noticias'>;
export type NoticiaInsert = TablesInsert<'noticias'>;
export type NoticiaUpdate = TablesUpdate<'noticias'>;

// Fetch all published news for the public site
export function usePublishedNoticias() {
  return useQuery({
    queryKey: ['noticias', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

// Fetch all news for admin (including unpublished)
export function useAllNoticias() {
  return useQuery({
    queryKey: ['noticias', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

// Fetch single news by ID
export function useNoticia(id: string | undefined) {
  return useQuery({
    queryKey: ['noticias', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

// Fetch news by category
export function useNoticiasByCategory(category: string | undefined) {
  return useQuery({
    queryKey: ['noticias', 'category', category],
    queryFn: async () => {
      if (!category) return [];
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!category,
  });
}

// Fetch featured news
export function useFeaturedNoticias(limit = 1) {
  return useQuery({
    queryKey: ['noticias', 'featured', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },
  });
}

// Fetch related news (same category, excluding current)
export function useRelatedNoticias(currentId: string | undefined, category: string | undefined, limit = 3) {
  return useQuery({
    queryKey: ['noticias', 'related', currentId, category, limit],
    queryFn: async () => {
      if (!currentId || !category) return [];
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .neq('id', currentId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },
    enabled: !!currentId && !!category,
  });
}

// Create news
export function useCreateNoticia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noticia: NoticiaInsert) => {
      const { data, error } = await supabase
        .from('noticias')
        .insert(noticia)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
    },
  });
}

// Update news
export function useUpdateNoticia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: NoticiaUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('noticias')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
      queryClient.invalidateQueries({ queryKey: ['noticias', data.id] });
    },
  });
}

// Delete news
export function useDeleteNoticia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('noticias')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
    },
  });
}

// Toggle published status
export function useTogglePublished() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { data, error } = await supabase
        .from('noticias')
        .update({ published })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
    },
  });
}

// Upload image to storage
export async function uploadNewsImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('news-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('news-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
