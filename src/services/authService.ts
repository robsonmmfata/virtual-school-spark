import { query } from '../lib/database';
import crypto from 'crypto';

export interface User {
  id: number;
  email: string;
  tipo: 'aluno' | 'professor' | 'admin';
  nome?: string;
  matricula?: string;
  disciplina?: string;
}

export class AuthService {
  // Autenticar usuário
  static async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const result = await query(
        'SELECT u.id, u.email, u.senha, u.tipo, a.nome, a.matricula, p.nome as prof_nome, p.disciplina FROM usuarios u LEFT JOIN alunos a ON u.id = a.usuario_id LEFT JOIN professores p ON u.id = p.usuario_id WHERE u.email = $1 AND u.ativo = true',
        [email]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const user = result.rows[0];

      // Verificar senha (comparar com hash MD5 usado no banco)
      const isValidPassword = user.senha === this.md5(password);

      if (!isValidPassword) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        tipo: user.tipo,
        nome: user.nome || user.prof_nome,
        matricula: user.matricula,
        disciplina: user.disciplina
      };
    } catch (error) {
      console.error('Erro na autenticação:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  // Buscar usuário por ID
  static async getUserById(id: number): Promise<User | null> {
    try {
      const result = await query(
        'SELECT u.id, u.email, u.tipo, a.nome, a.matricula, p.nome as prof_nome, p.disciplina FROM usuarios u LEFT JOIN alunos a ON u.id = a.usuario_id LEFT JOIN professores p ON u.id = p.usuario_id WHERE u.id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const user = result.rows[0];
      return {
        id: user.id,
        email: user.email,
        tipo: user.tipo,
        nome: user.nome || user.prof_nome,
        matricula: user.matricula,
        disciplina: user.disciplina
      };
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  // Atualizar último acesso
  static async updateLastAccess(userId: number): Promise<void> {
    try {
      await query(
        'UPDATE usuarios SET ultimo_acesso = CURRENT_TIMESTAMP WHERE id = $1',
        [userId]
      );
    } catch (error) {
      console.error('Erro ao atualizar último acesso:', error);
    }
  }

  // Verificar se usuário existe
  static async userExists(email: string): Promise<boolean> {
    try {
      const result = await query('SELECT id FROM usuarios WHERE email = $1', [email]);
      return result.rows.length > 0;
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      return false;
    }
  }

  // Função MD5 simples (compatível com o hash usado no banco)
  private static md5(input: string): string {
    // Usando uma implementação simples de MD5
    // Em produção, considere usar crypto.createHash('md5')
    return crypto.createHash('md5').update(input).digest('hex');
  }
}
