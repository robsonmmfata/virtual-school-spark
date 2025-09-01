import { query } from '../lib/database';

export interface Message {
  id: number;
  remetente_id: number;
  destinatario_id: number;
  conteudo: string;
  lida: boolean;
  data_envio: Date;
  remetente_nome?: string;
}

export interface Conversation {
  id: number;
  usuario1_id: number;
  usuario2_id: number;
  ultima_mensagem: string;
  ultima_data: Date;
  nao_lidas_usuario1: number;
  nao_lidas_usuario2: number;
}

export class MessageService {
  // Buscar conversas de um usuário
  static async getConversations(userId: number): Promise<Array<{
    id: number;
    outro_usuario: {
      id: number;
      email: string;
      nome: string;
      tipo: string;
    };
    ultima_mensagem: string;
    ultima_data: Date;
    nao_lidas: number;
  }>> {
    try {
      const result = await query(`
        SELECT
          c.id,
          c.usuario1_id,
          c.usuario2_id,
          c.ultima_mensagem,
          c.ultima_data,
          CASE
            WHEN c.usuario1_id = $1 THEN c.nao_lidas_usuario1
            ELSE c.nao_lidas_usuario2
          END as nao_lidas,
          u1.email as usuario1_email,
          u2.email as usuario2_email,
          COALESCE(a1.nome, p1.nome) as usuario1_nome,
          COALESCE(a2.nome, p2.nome) as usuario2_nome,
          u1.tipo as usuario1_tipo,
          u2.tipo as usuario2_tipo
        FROM conversas c
        JOIN usuarios u1 ON c.usuario1_id = u1.id
        JOIN usuarios u2 ON c.usuario2_id = u2.id
        LEFT JOIN alunos a1 ON u1.id = a1.usuario_id
        LEFT JOIN alunos a2 ON u2.id = a2.usuario_id
        LEFT JOIN professores p1 ON u1.id = p1.usuario_id
        LEFT JOIN professores p2 ON u2.id = p2.usuario_id
        WHERE c.usuario1_id = $1 OR c.usuario2_id = $1
        ORDER BY c.ultima_data DESC
      `, [userId]);

      return result.rows.map(row => ({
        id: row.id,
        outro_usuario: {
          id: row.usuario1_id === userId ? row.usuario2_id : row.usuario1_id,
          email: row.usuario1_id === userId ? row.usuario2_email : row.usuario1_email,
          nome: row.usuario1_id === userId ? row.usuario2_nome : row.usuario1_nome,
          tipo: row.usuario1_id === userId ? row.usuario2_tipo : row.usuario1_tipo
        },
        ultima_mensagem: row.ultima_mensagem,
        ultima_data: row.ultima_data,
        nao_lidas: row.nao_lidas
      }));
    } catch (error) {
      console.error('Erro ao buscar conversas:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  // Buscar mensagens de uma conversa
  static async getMessages(conversationId: number, userId: number, limit: number = 50): Promise<Message[]> {
    try {
      // Primeiro, marcar mensagens como lidas
      await query(`
        UPDATE mensagens
        SET lida = true
        WHERE destinatario_id = $1 AND id IN (
          SELECT m.id FROM mensagens m
          JOIN conversas c ON (
            (c.usuario1_id = m.remetente_id AND c.usuario2_id = m.destinatario_id) OR
            (c.usuario1_id = m.destinatario_id AND c.usuario2_id = m.remetente_id)
          )
          WHERE c.id = $2
        )
      `, [userId, conversationId]);

      // Depois buscar as mensagens
      const result = await query(`
        SELECT m.id, m.remetente_id, m.destinatario_id, m.conteudo, m.lida, m.data_envio,
               COALESCE(a.nome, p.nome) as remetente_nome
        FROM mensagens m
        JOIN conversas c ON (
          (c.usuario1_id = m.remetente_id AND c.usuario2_id = m.destinatario_id) OR
          (c.usuario1_id = m.destinatario_id AND c.usuario2_id = m.remetente_id)
        )
        LEFT JOIN alunos a ON m.remetente_id = a.usuario_id
        LEFT JOIN professores p ON m.remetente_id = p.usuario_id
        WHERE c.id = $1
        ORDER BY m.data_envio DESC
        LIMIT $2
      `, [conversationId, limit]);

      return result.rows.reverse().map(row => ({
        id: row.id,
        remetente_id: row.remetente_id,
        destinatario_id: row.destinatario_id,
        conteudo: row.conteudo,
        lida: row.lida,
        data_envio: row.data_envio,
        remetente_nome: row.remetente_nome
      }));
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  // Enviar mensagem
  static async sendMessage(remetenteId: number, destinatarioId: number, conteudo: string): Promise<Message> {
    try {
      // Verificar se já existe uma conversa entre os usuários
      const conversationResult = await query(`
        SELECT id FROM conversas
        WHERE (usuario1_id = $1 AND usuario2_id = $2) OR (usuario1_id = $2 AND usuario2_id = $1)
      `, [remetenteId, destinatarioId]);

      let conversationId: number;

      if (conversationResult.rows.length === 0) {
        // Criar nova conversa
        const newConversation = await query(`
          INSERT INTO conversas (usuario1_id, usuario2_id, ultima_mensagem, ultima_data)
          VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
          RETURNING id
        `, [remetenteId, destinatarioId, conteudo.substring(0, 100)]);

        conversationId = newConversation.rows[0].id;
      } else {
        conversationId = conversationResult.rows[0].id;

        // Atualizar última mensagem da conversa
        await query(`
          UPDATE conversas
          SET ultima_mensagem = $1, ultima_data = CURRENT_TIMESTAMP,
              nao_lidas_usuario1 = CASE WHEN usuario1_id = $3 THEN nao_lidas_usuario1 + 1 ELSE nao_lidas_usuario1 END,
              nao_lidas_usuario2 = CASE WHEN usuario2_id = $3 THEN nao_lidas_usuario2 + 1 ELSE nao_lidas_usuario2 END
          WHERE id = $2
        `, [conteudo.substring(0, 100), conversationId, destinatarioId]);
      }

      // Inserir a mensagem
      const messageResult = await query(`
        INSERT INTO mensagens (remetente_id, destinatario_id, conteudo)
        VALUES ($1, $2, $3)
        RETURNING id, data_envio
      `, [remetenteId, destinatarioId, conteudo]);

      return {
        id: messageResult.rows[0].id,
        remetente_id: remetenteId,
        destinatario_id: destinatarioId,
        conteudo: conteudo,
        lida: false,
        data_envio: messageResult.rows[0].data_envio
      };
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  // Buscar usuários disponíveis para conversar
  static async getAvailableUsers(userId: number, userType: string): Promise<Array<{
    id: number;
    email: string;
    nome: string;
    matricula?: string;
    disciplina?: string;
    tipo: string;
  }>> {
    try {
      let queryText: string;
      const params: (string | number)[] = [userId];

      if (userType === 'aluno') {
        // Aluno pode conversar com professores de suas turmas
        queryText = `
          SELECT DISTINCT u.id, u.email, COALESCE(p.nome, 'Professor') as nome, p.disciplina, 'professor' as tipo
          FROM usuarios u
          JOIN professores p ON u.id = p.usuario_id
          JOIN professores_turmas pt ON p.id = pt.professor_id
          JOIN alunos_turmas at ON pt.turma_id = at.turma_id
          JOIN alunos a ON at.aluno_id = a.id
          WHERE a.usuario_id = $1 AND u.ativo = true
        `;
      } else if (userType === 'professor') {
        // Professor pode conversar com alunos de suas turmas
        queryText = `
          SELECT DISTINCT u.id, u.email, COALESCE(a.nome, 'Aluno') as nome, a.matricula, 'aluno' as tipo
          FROM usuarios u
          JOIN alunos a ON u.id = a.usuario_id
          JOIN alunos_turmas at ON a.id = at.aluno_id
          JOIN professores_turmas pt ON at.turma_id = pt.turma_id
          JOIN professores p ON pt.professor_id = p.id
          WHERE p.usuario_id = $1 AND u.ativo = true
        `;
      } else {
        // Admin pode conversar com todos
        queryText = `
          SELECT u.id, u.email, COALESCE(a.nome, p.nome, 'Usuário') as nome,
                 CASE WHEN a.id IS NOT NULL THEN 'aluno' ELSE 'professor' END as tipo,
                 a.matricula, p.disciplina
          FROM usuarios u
          LEFT JOIN alunos a ON u.id = a.usuario_id
          LEFT JOIN professores p ON u.id = p.usuario_id
          WHERE u.id != $1 AND u.ativo = true
        `;
      }

      const result = await query(queryText, params);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar usuários disponíveis:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  // Marcar mensagens como lidas
  static async markAsRead(conversationId: number, userId: number): Promise<void> {
    try {
      await query(`
        UPDATE mensagens
        SET lida = true
        WHERE destinatario_id = $1 AND id IN (
          SELECT m.id FROM mensagens m
          JOIN conversas c ON (
            (c.usuario1_id = m.remetente_id AND c.usuario2_id = m.destinatario_id) OR
            (c.usuario1_id = m.destinatario_id AND c.usuario2_id = m.remetente_id)
          )
          WHERE c.id = $2
        )
      `, [userId, conversationId]);

      // Atualizar contador de não lidas na conversa
      await query(`
        UPDATE conversas
        SET nao_lidas_usuario1 = CASE WHEN usuario1_id = $2 THEN 0 ELSE nao_lidas_usuario1 END,
            nao_lidas_usuario2 = CASE WHEN usuario2_id = $2 THEN 0 ELSE nao_lidas_usuario2 END
        WHERE id = $1
      `, [conversationId, userId]);
    } catch (error) {
      console.error('Erro ao marcar mensagens como lidas:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  // Buscar estatísticas de mensagens
  static async getMessageStats(userId: number): Promise<{
    total_conversas: number;
    total_mensagens: number;
    nao_lidas: number;
    conversas_hoje: number;
  }> {
    try {
      const result = await query(`
        SELECT
          COUNT(DISTINCT c.id) as total_conversas,
          COUNT(m.id) as total_mensagens,
          COUNT(CASE WHEN m.lida = false AND m.destinatario_id = $1 THEN 1 END) as nao_lidas,
          COUNT(DISTINCT CASE WHEN m.data_envio >= CURRENT_DATE THEN c.id END) as conversas_hoje
        FROM conversas c
        LEFT JOIN mensagens m ON (
          (c.usuario1_id = m.remetente_id AND c.usuario2_id = m.destinatario_id) OR
          (c.usuario1_id = m.destinatario_id AND c.usuario2_id = m.remetente_id)
        )
        WHERE c.usuario1_id = $1 OR c.usuario2_id = $1
      `, [userId]);

      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw new Error('Erro interno do servidor');
    }
  }
}
