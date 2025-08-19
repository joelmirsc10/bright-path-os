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
      categorias_financeiras: {
        Row: {
          created_at: string | null
          id: string
          nome: string
          tipo: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome: string
          tipo?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nome?: string
          tipo?: string | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          created_at: string | null
          documento: string
          email: string | null
          id: string
          nome: string
          nome_loja: string | null
          status: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          documento: string
          email?: string | null
          id?: string
          nome: string
          nome_loja?: string | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          documento?: string
          email?: string | null
          id?: string
          nome?: string
          nome_loja?: string | null
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      configuracoes_sistema: {
        Row: {
          categoria: string | null
          chave: string
          created_at: string | null
          descricao: string | null
          id: string
          tipo: string | null
          updated_at: string | null
          valor: string | null
        }
        Insert: {
          categoria?: string | null
          chave: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          tipo?: string | null
          updated_at?: string | null
          valor?: string | null
        }
        Update: {
          categoria?: string | null
          chave?: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          tipo?: string | null
          updated_at?: string | null
          valor?: string | null
        }
        Relationships: []
      }
      eventos_agenda: {
        Row: {
          cliente_id: string | null
          created_at: string | null
          data_fim: string | null
          data_inicio: string
          descricao: string | null
          excursao_id: string | null
          id: string
          status: string | null
          tipo: string | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio: string
          descricao?: string | null
          excursao_id?: string | null
          id?: string
          status?: string | null
          tipo?: string | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          cliente_id?: string | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string
          descricao?: string | null
          excursao_id?: string | null
          id?: string
          status?: string | null
          tipo?: string | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eventos_agenda_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventos_agenda_excursao_id_fkey"
            columns: ["excursao_id"]
            isOneToOne: false
            referencedRelation: "excursoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventos_agenda_excursao_id_fkey"
            columns: ["excursao_id"]
            isOneToOne: false
            referencedRelation: "view_ocupacao_excursoes"
            referencedColumns: ["id"]
          },
        ]
      }
      excursoes: {
        Row: {
          capacidade: number
          created_at: string | null
          data_partida: string
          data_retorno: string
          descricao: string | null
          destino: string
          horario_partida: string
          horario_retorno: string
          id: string
          onibus: string | null
          preco: number
          status: string | null
          updated_at: string | null
        }
        Insert: {
          capacidade: number
          created_at?: string | null
          data_partida: string
          data_retorno: string
          descricao?: string | null
          destino: string
          horario_partida: string
          horario_retorno: string
          id?: string
          onibus?: string | null
          preco: number
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          capacidade?: number
          created_at?: string | null
          data_partida?: string
          data_retorno?: string
          descricao?: string | null
          destino?: string
          horario_partida?: string
          horario_retorno?: string
          id?: string
          onibus?: string | null
          preco?: number
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      historico_mensagens: {
        Row: {
          conteudo: string
          created_at: string | null
          data_entrega: string | null
          data_envio: string | null
          data_leitura: string | null
          destinatario: string
          erro_descricao: string | null
          id: string
          status: string | null
          telefone: string
          template_id: string | null
          template_nome: string | null
        }
        Insert: {
          conteudo: string
          created_at?: string | null
          data_entrega?: string | null
          data_envio?: string | null
          data_leitura?: string | null
          destinatario: string
          erro_descricao?: string | null
          id?: string
          status?: string | null
          telefone: string
          template_id?: string | null
          template_nome?: string | null
        }
        Update: {
          conteudo?: string
          created_at?: string | null
          data_entrega?: string | null
          data_envio?: string | null
          data_leitura?: string | null
          destinatario?: string
          erro_descricao?: string | null
          id?: string
          status?: string | null
          telefone?: string
          template_id?: string | null
          template_nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historico_mensagens_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates_mensagem"
            referencedColumns: ["id"]
          },
        ]
      }
      passageiros: {
        Row: {
          created_at: string | null
          excursao_id: string | null
          id: string
          idade: number | null
          nome: string
          poltrona: number | null
          rg: string
          status_pagamento: string | null
          telefone: string | null
          updated_at: string | null
          valor_pago: number | null
        }
        Insert: {
          created_at?: string | null
          excursao_id?: string | null
          id?: string
          idade?: number | null
          nome: string
          poltrona?: number | null
          rg: string
          status_pagamento?: string | null
          telefone?: string | null
          updated_at?: string | null
          valor_pago?: number | null
        }
        Update: {
          created_at?: string | null
          excursao_id?: string | null
          id?: string
          idade?: number | null
          nome?: string
          poltrona?: number | null
          rg?: string
          status_pagamento?: string | null
          telefone?: string | null
          updated_at?: string | null
          valor_pago?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "passageiros_excursao_id_fkey"
            columns: ["excursao_id"]
            isOneToOne: false
            referencedRelation: "excursoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "passageiros_excursao_id_fkey"
            columns: ["excursao_id"]
            isOneToOne: false
            referencedRelation: "view_ocupacao_excursoes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          nome: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nome?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nome?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      templates_mensagem: {
        Row: {
          ativo: boolean | null
          conteudo: string
          created_at: string | null
          id: string
          nome: string
          tipo: string | null
          updated_at: string | null
          variaveis: Json | null
        }
        Insert: {
          ativo?: boolean | null
          conteudo: string
          created_at?: string | null
          id?: string
          nome: string
          tipo?: string | null
          updated_at?: string | null
          variaveis?: Json | null
        }
        Update: {
          ativo?: boolean | null
          conteudo?: string
          created_at?: string | null
          id?: string
          nome?: string
          tipo?: string | null
          updated_at?: string | null
          variaveis?: Json | null
        }
        Relationships: []
      }
      transacoes_financeiras: {
        Row: {
          categoria_id: string | null
          cliente_id: string | null
          created_at: string | null
          data_transacao: string
          descricao: string
          id: string
          parcela_atual: number | null
          recorrente: boolean | null
          repeticao_intervalo: string | null
          repeticao_quantidade: number | null
          status: string | null
          tipo: string
          tipo_recorrencia: string | null
          total_parcelas: number | null
          updated_at: string | null
          valor: number
          valor_parcela: number | null
          valor_total: number | null
        }
        Insert: {
          categoria_id?: string | null
          cliente_id?: string | null
          created_at?: string | null
          data_transacao: string
          descricao: string
          id?: string
          parcela_atual?: number | null
          recorrente?: boolean | null
          repeticao_intervalo?: string | null
          repeticao_quantidade?: number | null
          status?: string | null
          tipo: string
          tipo_recorrencia?: string | null
          total_parcelas?: number | null
          updated_at?: string | null
          valor: number
          valor_parcela?: number | null
          valor_total?: number | null
        }
        Update: {
          categoria_id?: string | null
          cliente_id?: string | null
          created_at?: string | null
          data_transacao?: string
          descricao?: string
          id?: string
          parcela_atual?: number | null
          recorrente?: boolean | null
          repeticao_intervalo?: string | null
          repeticao_quantidade?: number | null
          status?: string | null
          tipo?: string
          tipo_recorrencia?: string | null
          total_parcelas?: number | null
          updated_at?: string | null
          valor?: number
          valor_parcela?: number | null
          valor_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transacoes_financeiras_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_financeiras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transacoes_financeiras_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      view_ocupacao_excursoes: {
        Row: {
          capacidade: number | null
          data_partida: string | null
          destino: string | null
          id: string | null
          reservas: number | null
          taxa_ocupacao: number | null
        }
        Relationships: []
      }
      view_relatorio_financeiro: {
        Row: {
          mes: string | null
          quantidade_transacoes: number | null
          tipo: string | null
          total_valor: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      calcular_idade: {
        Args: { data_nascimento: string }
        Returns: number
      }
      gerar_numero_documento: {
        Args: Record<PropertyKey, never>
        Returns: string
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
