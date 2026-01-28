import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export interface PageContent {
  id: string;
  page_slug: string;
  page_title: string;
  content: Json;
  created_at: string;
  updated_at: string;
}

export function usePageContent(slug: string) {
  return useQuery({
    queryKey: ["page-content", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_contents")
        .select("*")
        .eq("page_slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as PageContent | null;
    },
  });
}

export function useAllPageContents() {
  return useQuery({
    queryKey: ["page-contents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_contents")
        .select("*")
        .order("page_title");

      if (error) throw error;
      return data as PageContent[];
    },
  });
}

export function useUpdatePageContent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      slug,
      content,
    }: {
      slug: string;
      content: Record<string, unknown>;
    }) => {
      const { data, error } = await supabase
        .from("page_contents")
        .update({ content: content as unknown as Json })
        .eq("page_slug", slug)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["page-content", variables.slug] });
      queryClient.invalidateQueries({ queryKey: ["page-contents"] });
      toast({
        title: "Sucesso!",
        description: "Conteúdo da página atualizado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
