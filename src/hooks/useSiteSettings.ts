import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  label: string;
  category: string;
  created_at: string;
  updated_at: string;
}

// Fetch all site settings
export function useSiteSettings() {
  return useQuery({
    queryKey: ['site_settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      return data as SiteSetting[];
    },
  });
}

// Fetch settings by category
export function useSiteSettingsByCategory(category: string) {
  return useQuery({
    queryKey: ['site_settings', 'category', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('category', category);

      if (error) throw error;
      return data as SiteSetting[];
    },
  });
}

// Fetch a single setting by key
export function useSiteSetting(key: string) {
  return useQuery({
    queryKey: ['site_settings', 'key', key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', key)
        .single();

      if (error) throw error;
      return data as SiteSetting;
    },
    enabled: !!key,
  });
}

// Get all settings as a key-value map
export function useSiteSettingsMap() {
  const { data: settings, ...rest } = useSiteSettings();
  
  const settingsMap = settings?.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string | null>) || {};

  return { data: settingsMap, ...rest };
}

// Update a single setting
export function useUpdateSiteSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { data, error } = await supabase
        .from('site_settings')
        .update({ value })
        .eq('key', key)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings'] });
    },
  });
}

// Update multiple settings at once
export function useUpdateMultipleSiteSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: { key: string; value: string }[]) => {
      const promises = updates.map(({ key, value }) =>
        supabase
          .from('site_settings')
          .update({ value })
          .eq('key', key)
      );

      const results = await Promise.all(promises);
      const errors = results.filter(r => r.error);
      
      if (errors.length > 0) {
        throw new Error('Failed to update some settings');
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings'] });
    },
  });
}
