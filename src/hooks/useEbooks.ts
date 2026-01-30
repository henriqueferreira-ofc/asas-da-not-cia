import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Ebook {
  id: string;
  title: string;
  description: string | null;
  price: number;
  pages: number | null;
  cover_url: string | null;
  pdf_url: string | null;
  pix_link: string | null;
  card_link: string | null;
  published: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type EbookInsert = Omit<Ebook, 'id' | 'created_at' | 'updated_at'>;
export type EbookUpdate = Partial<EbookInsert>;

// Fetch all published ebooks (public)
export function usePublishedEbooks() {
  return useQuery({
    queryKey: ['ebooks', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as Ebook[];
    },
  });
}

// Fetch featured ebooks
export function useFeaturedEbooks() {
  return useQuery({
    queryKey: ['ebooks', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as Ebook[];
    },
  });
}

// Fetch all ebooks (admin)
export function useAllEbooks() {
  return useQuery({
    queryKey: ['ebooks', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as Ebook[];
    },
  });
}

// Fetch single ebook
export function useEbook(id: string | undefined) {
  return useQuery({
    queryKey: ['ebooks', id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Ebook;
    },
    enabled: !!id,
  });
}

// Create ebook
export function useCreateEbook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ebook: EbookInsert) => {
      const { data, error } = await supabase
        .from('ebooks')
        .insert(ebook)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ebooks'] });
    },
  });
}

// Update ebook
export function useUpdateEbook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...ebook }: EbookUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('ebooks')
        .update(ebook)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ebooks'] });
      queryClient.invalidateQueries({ queryKey: ['ebooks', variables.id] });
    },
  });
}

// Delete ebook
export function useDeleteEbook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ebooks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ebooks'] });
    },
  });
}

// Toggle published status
export function useToggleEbookPublished() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase
        .from('ebooks')
        .update({ published: !published })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ebooks'] });
    },
  });
}

// Upload ebook cover
export async function uploadEbookCover(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `ebooks/covers/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('news-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('news-images')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Upload ebook PDF
export async function uploadEbookPdf(file: File): Promise<string> {
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`;
  const filePath = `ebooks/pdfs/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('news-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('news-images')
    .getPublicUrl(filePath);

  return publicUrl;
}
