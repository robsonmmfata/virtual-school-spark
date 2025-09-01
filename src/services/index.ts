// Exportar todos os serviços
export { AuthService } from './authService';
export { MessageService } from './messageService';

// Exportar tipos
export type { User } from './authService';
export type { Message, Conversation } from './messageService';

// Exportar utilitários do banco
export { testConnection, query, getClient } from '../lib/database';

// Tipos comuns
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  offset?: number;
}

export interface SearchOptions {
  query?: string;
  filters?: Record<string, string | number | boolean>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Função utilitária para tratamento de erros
export function handleServiceError(error: unknown): ApiResponse<null> {
  console.error('Erro no serviço:', error);

  const err = error as any;

  if (err?.code === 'ECONNREFUSED') {
    return {
      success: false,
      error: 'Erro de conexão',
      message: 'Não foi possível conectar ao banco de dados'
    };
  }

  if (err?.code === '23505') {
    return {
      success: false,
      error: 'Dados duplicados',
      message: 'Já existe um registro com essas informações'
    };
  }

  return {
    success: false,
    error: 'Erro interno',
    message: err?.message || 'Ocorreu um erro inesperado'
  };
}

// Função utilitária para respostas de sucesso
export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message
  };
}
