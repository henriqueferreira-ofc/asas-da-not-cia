export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          published: boolean
          show_in_home: boolean
          show_in_menu: boolean
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          published?: boolean
          show_in_home?: boolean
          show_in_menu?: boolean
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          published?: boolean
          show_in_home?: boolean
          show_in_menu?: boolean
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      cesd_ratings: {
        Row: {
          created_at: string
          id: string
          rating: number
          visitor_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          rating: number
          visitor_id: string
        }
        Update: {
          created_at?: string
          id?: string
          rating?: number
          visitor_id?: string
        }
        Relationships: []
      }
      ebooks: {
        Row: {
          card_link: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          featured: boolean
          id: string
          pages: number | null
          pdf_url: string | null
          pix_link: string | null
          price: number
          published: boolean
          sort_order: number
          stripe_price_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          card_link?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          pages?: number | null
          pdf_url?: string | null
          pix_link?: string | null
          price?: number
          published?: boolean
          sort_order?: number
          stripe_price_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          card_link?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          pages?: number | null
          pdf_url?: string | null
          pix_link?: string | null
          price?: number
          published?: boolean
          sort_order?: number
          stripe_price_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      eventos: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          event_date: string
          expires_at: string | null
          featured: boolean
          id: string
          image_url: string | null
          is_pinned: boolean
          location: string | null
          published: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_date: string
          expires_at?: string | null
          featured?: boolean
          id?: string
          image_url?: string | null
          is_pinned?: boolean
          location?: string | null
          published?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_date?: string
          expires_at?: string | null
          featured?: boolean
          id?: string
          image_url?: string | null
          is_pinned?: boolean
          location?: string | null
          published?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      noticias: {
        Row: {
          author: string
          author_role: string | null
          category: string
          category_label: string
          content: string
          created_at: string
          excerpt: string
          expires_at: string | null
          featured: boolean
          id: string
          image_url: string | null
          is_pinned: boolean
          meta_description: string | null
          meta_title: string | null
          published: boolean
          status: string
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          author?: string
          author_role?: string | null
          category?: string
          category_label?: string
          content: string
          created_at?: string
          excerpt: string
          expires_at?: string | null
          featured?: boolean
          id?: string
          image_url?: string | null
          is_pinned?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          status?: string
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          author?: string
          author_role?: string | null
          category?: string
          category_label?: string
          content?: string
          created_at?: string
          excerpt?: string
          expires_at?: string | null
          featured?: boolean
          id?: string
          image_url?: string | null
          is_pinned?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          status?: string
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: []
      }
      page_contents: {
        Row: {
          content: Json
          created_at: string
          id: string
          page_slug: string
          page_title: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          page_slug: string
          page_title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          page_slug?: string
          page_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          category: string
          created_at: string
          id: string
          key: string
          label: string
          updated_at: string
          value: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          key: string
          label: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          key?: string
          label?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_cesd_rating_stats: {
        Args: never
        Returns: {
          average_rating: number
          total_ratings: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_view_count: { Args: { noticia_id: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "viewer"],
    },
  },
} as const
