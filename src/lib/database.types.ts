export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      browser_bookmarks: {
        Row: {
          created_at: string | null
          favicon: string | null
          folder: string | null
          id: string
          title: string
          updated_at: string | null
          url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          favicon?: string | null
          folder?: string | null
          id?: string
          title: string
          updated_at?: string | null
          url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          favicon?: string | null
          folder?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      browser_history: {
        Row: {
          favicon: string | null
          id: string
          title: string | null
          url: string
          user_id: string | null
          visited_at: string | null
        }
        Insert: {
          favicon?: string | null
          id?: string
          title?: string | null
          url: string
          user_id?: string | null
          visited_at?: string | null
        }
        Update: {
          favicon?: string | null
          id?: string
          title?: string | null
          url?: string
          user_id?: string | null
          visited_at?: string | null
        }
        Relationships: []
      }
      browser_settings: {
        Row: {
          created_at: string | null
          default_search_engine: string | null
          default_zoom_level: number | null
          enable_adblock: boolean | null
          enable_cookies: boolean | null
          enable_javascript: boolean | null
          enable_tracking_protection: boolean | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          default_search_engine?: string | null
          default_zoom_level?: number | null
          enable_adblock?: boolean | null
          enable_cookies?: boolean | null
          enable_javascript?: boolean | null
          enable_tracking_protection?: boolean | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          default_search_engine?: string | null
          default_zoom_level?: number | null
          enable_adblock?: boolean | null
          enable_cookies?: boolean | null
          enable_javascript?: boolean | null
          enable_tracking_protection?: boolean | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          birthdate: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          organization: string | null
          updated_at: string
          username: string
        }
        Insert: {
          birthdate?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          organization?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          birthdate?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          organization?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
