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
      commands: {
        Row: {
          category: string
          content: string | null
          created_at: string
          created_by: string
          description: string
          id: string
          name: string
          required_permissions: string[]
          updated_at: string
          updated_by: string
          usage: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string
          created_by: string
          description: string
          id?: string
          name: string
          required_permissions?: string[]
          updated_at?: string
          updated_by: string
          usage: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          name?: string
          required_permissions?: string[]
          updated_at?: string
          updated_by?: string
          usage?: string
        }
        Relationships: []
      }
      message_formats: {
        Row: {
          content: string
          created_at: string
          created_by: string
          format_type: string
          guild_id: string
          id: string
          is_enabled: boolean
          updated_at: string
          updated_by: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          format_type: string
          guild_id: string
          id?: string
          is_enabled?: boolean
          updated_at?: string
          updated_by: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          format_type?: string
          guild_id?: string
          id?: string
          is_enabled?: boolean
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      themes: {
        Row: {
          content: string
          created_at: string
          created_by: string
          description: string
          id: string
          recommendations: number
          tags: string[] | null
          thumbnail: string
          title: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          description: string
          id?: string
          recommendations?: number
          tags?: string[] | null
          thumbnail: string
          title: string
          updated_at?: string
          updated_by: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          recommendations?: number
          tags?: string[] | null
          thumbnail?: string
          title?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string
          created_at: string
          discord_id: string
          display_name: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar: string
          created_at?: string
          discord_id: string
          display_name: string
          id?: string
          role?: string
          updated_at?: string
        }
        Update: {
          avatar?: string
          created_at?: string
          discord_id?: string
          display_name?: string
          id?: string
          role?: string
          updated_at?: string
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
