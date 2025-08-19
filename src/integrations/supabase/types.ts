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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      SAAS_Conexões: {
        Row: {
          Apikey: string | null
          created_at: string
          FotoPerfil: string | null
          id: number
          idUsuario: string | null
          instanceName: string | null
          NomeConexao: string | null
          Telefone: string | null
        }
        Insert: {
          Apikey?: string | null
          created_at?: string
          FotoPerfil?: string | null
          id?: number
          idUsuario?: string | null
          instanceName?: string | null
          NomeConexao?: string | null
          Telefone?: string | null
        }
        Update: {
          Apikey?: string | null
          created_at?: string
          FotoPerfil?: string | null
          id?: number
          idUsuario?: string | null
          instanceName?: string | null
          NomeConexao?: string | null
          Telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SAAS_Conexões_idUsuario_fkey"
            columns: ["idUsuario"]
            isOneToOne: false
            referencedRelation: "SAAS_Usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      SAAS_Contatos: {
        Row: {
          atributos: Json | null
          created_at: string
          id: number
          idLista: number
          idUsuario: string
          nome: string | null
          telefone: string | null
        }
        Insert: {
          atributos?: Json | null
          created_at?: string
          id?: number
          idLista: number
          idUsuario: string
          nome?: string | null
          telefone?: string | null
        }
        Update: {
          atributos?: Json | null
          created_at?: string
          id?: number
          idLista?: number
          idUsuario?: string
          nome?: string | null
          telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SAAS_Contatos_idLista_fkey"
            columns: ["idLista"]
            isOneToOne: false
            referencedRelation: "SAAS_Listas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SAAS_Contatos_idUsuario_fkey"
            columns: ["idUsuario"]
            isOneToOne: false
            referencedRelation: "SAAS_Usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      SAAS_Detalhes_Disparos: {
        Row: {
          dataEnvio: string | null
          FakeCall: boolean | null
          id: number
          idConexao: number | null
          idContato: number | null
          idDisparo: number | null
          idGrupo: number | null
          KeyRedis: string | null
          Mensagem: string | null
          mensagemErro: string | null
          Payload: Json | null
          respostaHttp: Json | null
          Status: string | null
          statusHttp: string | null
        }
        Insert: {
          dataEnvio?: string | null
          FakeCall?: boolean | null
          id?: number
          idConexao?: number | null
          idContato?: number | null
          idDisparo?: number | null
          idGrupo?: number | null
          KeyRedis?: string | null
          Mensagem?: string | null
          mensagemErro?: string | null
          Payload?: Json | null
          respostaHttp?: Json | null
          Status?: string | null
          statusHttp?: string | null
        }
        Update: {
          dataEnvio?: string | null
          FakeCall?: boolean | null
          id?: number
          idConexao?: number | null
          idContato?: number | null
          idDisparo?: number | null
          idGrupo?: number | null
          KeyRedis?: string | null
          Mensagem?: string | null
          mensagemErro?: string | null
          Payload?: Json | null
          respostaHttp?: Json | null
          Status?: string | null
          statusHttp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SAAS_Detalhes_Disparos_idConexao_fkey"
            columns: ["idConexao"]
            isOneToOne: false
            referencedRelation: "SAAS_Conexões"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SAAS_Detalhes_Disparos_idContato_fkey"
            columns: ["idContato"]
            isOneToOne: false
            referencedRelation: "SAAS_Contatos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SAAS_Detalhes_Disparos_idDisparo_fkey"
            columns: ["idDisparo"]
            isOneToOne: false
            referencedRelation: "SAAS_Disparos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SAAS_Detalhes_Disparos_idGrupo_fkey"
            columns: ["idGrupo"]
            isOneToOne: false
            referencedRelation: "SAAS_Grupos"
            referencedColumns: ["id"]
          },
        ]
      }
      SAAS_Disparos: {
        Row: {
          created_at: string
          DataAgendamento: string | null
          DiasSelecionados: number[] | null
          EndTime: string | null
          id: number
          idConexoes: number[] | null
          idExecution: string | null
          idListas: number[] | null
          intervaloMax: number | null
          intervaloMin: number | null
          Mensagens: Json[] | null
          MensagensDisparadas: number | null
          PausaAposMensagens: number | null
          PausaMinutos: number | null
          StartTime: string | null
          StatusDisparo: string | null
          TipoDisparo: string | null
          TotalDisparos: number | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          DataAgendamento?: string | null
          DiasSelecionados?: number[] | null
          EndTime?: string | null
          id?: number
          idConexoes?: number[] | null
          idExecution?: string | null
          idListas?: number[] | null
          intervaloMax?: number | null
          intervaloMin?: number | null
          Mensagens?: Json[] | null
          MensagensDisparadas?: number | null
          PausaAposMensagens?: number | null
          PausaMinutos?: number | null
          StartTime?: string | null
          StatusDisparo?: string | null
          TipoDisparo?: string | null
          TotalDisparos?: number | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          DataAgendamento?: string | null
          DiasSelecionados?: number[] | null
          EndTime?: string | null
          id?: number
          idConexoes?: number[] | null
          idExecution?: string | null
          idListas?: number[] | null
          intervaloMax?: number | null
          intervaloMin?: number | null
          Mensagens?: Json[] | null
          MensagensDisparadas?: number | null
          PausaAposMensagens?: number | null
          PausaMinutos?: number | null
          StartTime?: string | null
          StatusDisparo?: string | null
          TipoDisparo?: string | null
          TotalDisparos?: number | null
          userId?: string | null
        }
        Relationships: []
      }
      SAAS_Grupos: {
        Row: {
          atributos: Json | null
          created_at: string
          id: number
          idConexao: number
          idLista: number
          idUsuario: string
          nome: string | null
          participantes: number | null
          WhatsAppId: string | null
        }
        Insert: {
          atributos?: Json | null
          created_at?: string
          id?: number
          idConexao: number
          idLista: number
          idUsuario: string
          nome?: string | null
          participantes?: number | null
          WhatsAppId?: string | null
        }
        Update: {
          atributos?: Json | null
          created_at?: string
          id?: number
          idConexao?: number
          idLista?: number
          idUsuario?: string
          nome?: string | null
          participantes?: number | null
          WhatsAppId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SAAS_Grupos_idConexao_fkey"
            columns: ["idConexao"]
            isOneToOne: false
            referencedRelation: "SAAS_Conexões"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SAAS_Grupos_idLista_fkey"
            columns: ["idLista"]
            isOneToOne: false
            referencedRelation: "SAAS_Listas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SAAS_Grupos_idUsuario_fkey"
            columns: ["idUsuario"]
            isOneToOne: false
            referencedRelation: "SAAS_Usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      SAAS_Listas: {
        Row: {
          campos: Json | null
          created_at: string
          descricao: string | null
          id: number
          idConexao: number | null
          idUsuario: string
          nome: string
          tipo: string | null
        }
        Insert: {
          campos?: Json | null
          created_at?: string
          descricao?: string | null
          id?: number
          idConexao?: number | null
          idUsuario: string
          nome: string
          tipo?: string | null
        }
        Update: {
          campos?: Json | null
          created_at?: string
          descricao?: string | null
          id?: number
          idConexao?: number | null
          idUsuario?: string
          nome?: string
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SAAS_Listas_idConexao_fkey"
            columns: ["idConexao"]
            isOneToOne: false
            referencedRelation: "SAAS_Conexões"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SAAS_Listas_idUsuario_fkey"
            columns: ["idUsuario"]
            isOneToOne: false
            referencedRelation: "SAAS_Usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      SAAS_Usuarios: {
        Row: {
          apikey_gpt: string | null
          created_at: string
          Email: string | null
          id: string
          nome: string | null
          senha: string | null
          status: boolean | null
          telefone: string | null
        }
        Insert: {
          apikey_gpt?: string | null
          created_at?: string
          Email?: string | null
          id?: string
          nome?: string | null
          senha?: string | null
          status?: boolean | null
          telefone?: string | null
        }
        Update: {
          apikey_gpt?: string | null
          created_at?: string
          Email?: string | null
          id?: string
          nome?: string | null
          senha?: string | null
          status?: boolean | null
          telefone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      vw_Detalhes_Completo: {
        Row: {
          ApikeyConexao: string | null
          dataEnvio: string | null
          FakeCall: boolean | null
          id: number | null
          idConexao: number | null
          idContato: number | null
          idDisparo: number | null
          idGrupo: number | null
          InstanceName: string | null
          KeyRedis: string | null
          Mensagem: string | null
          mensagemErro: string | null
          NomeConexao: string | null
          NomeGrupo: string | null
          Payload: Json | null
          respostaHttp: Json | null
          Status: string | null
          StatusDisparo: string | null
          statusHttp: string | null
          TelefoneContato: string | null
          TipoDisparo: string | null
          UserId: string | null
          WhatsAppIdGrupo: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SAAS_Detalhes_Disparos_idConexao_fkey"
            columns: ["idConexao"]
            isOneToOne: false
            referencedRelation: "SAAS_Conexões"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SAAS_Detalhes_Disparos_idContato_fkey"
            columns: ["idContato"]
            isOneToOne: false
            referencedRelation: "SAAS_Contatos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SAAS_Detalhes_Disparos_idDisparo_fkey"
            columns: ["idDisparo"]
            isOneToOne: false
            referencedRelation: "SAAS_Disparos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SAAS_Detalhes_Disparos_idGrupo_fkey"
            columns: ["idGrupo"]
            isOneToOne: false
            referencedRelation: "SAAS_Grupos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      add_connections_disparo: {
        Args: { p_conn_ids: number[]; p_disparo_id: number; p_user_id: string }
        Returns: undefined
      }
      create_disparo: {
        Args: { p_payload: Json }
        Returns: number
      }
      create_disparo_grupo: {
        Args: { p_payload: Json }
        Returns: number
      }
      delete_disparo: {
        Args: { p_disparo_id: number; p_user_id: string }
        Returns: undefined
      }
      f_next_valid_time: {
        Args: { p_days: number[]; p_end: string; p_start: string; p_ts: string }
        Returns: string
      }
      f_render_message: {
        Args: {
          p_attrs: Json
          p_nome: string
          p_send_ts: string
          p_template: string
        }
        Returns: string
      }
      f_saudacao: {
        Args: { p_ts: string }
        Returns: string
      }
      get_contatos_by_lista: {
        Args: { p_id_lista: number }
        Returns: {
          atributos: Json | null
          created_at: string
          id: number
          idLista: number
          idUsuario: string
          nome: string | null
          telefone: string | null
        }[]
      }
      pause_disparo: {
        Args: { p_disparo_id: number; p_user_id: string }
        Returns: undefined
      }
      resume_disparo: {
        Args: { p_disparo_id: number; p_user_id: string }
        Returns: undefined
      }
      swap_connection: {
        Args: {
          p_blocked_conn_id: number
          p_disparo_id: number
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
