import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  published: boolean;
  show_in_menu: boolean;
  show_in_home: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type CategoryInsert = Omit<Category, 'id' | 'created_at' | 'updated_at'>;
export type CategoryUpdate = Partial<CategoryInsert>;

// Fetch all published categories (public)
export function usePublishedCategories() {
  return useQuery({
    queryKey: ['categories', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
  });
}

// Fetch categories for menu
export function useMenuCategories() {
  return useQuery({
    queryKey: ['categories', 'menu'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('published', true)
        .eq('show_in_menu', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
  });
}

// Fetch categories for homepage
export function useHomeCategories() {
  return useQuery({
    queryKey: ['categories', 'home'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('published', true)
        .eq('show_in_home', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
  });
}

// Fetch all categories (admin)
export function useAllCategories() {
  return useQuery({
    queryKey: ['categories', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
  });
}

// Fetch single category by ID
export function useCategory(id: string | undefined) {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Category;
    },
    enabled: !!id,
  });
}

// Fetch single category by slug
export function useCategoryBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['categories', 'slug', slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      return data as Category;
    },
    enabled: !!slug,
  });
}

// Create category
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: CategoryInsert) => {
      const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

// Update category
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...category }: CategoryUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories', variables.id] });
    },
  });
}

// Delete category
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

// Toggle published status
export function useToggleCategoryPublished() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase
        .from('categories')
        .update({ published: !published })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

// Generate slug from name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}
