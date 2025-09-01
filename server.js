const express = require('express');
const cors = require('cors');
const { testConnection, query } = require('./src/lib/database.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Teste de conexão com banco
app.get('/api/health', async (req, res) => {
  try {
    const isConnected = await testConnection();
    res.json({ status: 'OK', database: isConnected ? 'connected' : 'disconnected' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
});

// === AUTENTICAÇÃO ===

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await query(
      'SELECT id, email, tipo, nome FROM usuarios WHERE email = $1 AND senha = MD5($2)',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = result.rows[0];
    res.json({
      id: user.id,
      email: user.email,
      tipo: user.tipo,
      nome: user.nome
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === ALUNOS ===

// Listar alunos
app.get('/api/alunos', async (req, res) => {
  try {
    const result = await query(`
      SELECT a.*, t.nome as turma_nome
      FROM alunos a
      LEFT JOIN alunos_turmas at ON a.id = at.aluno_id
      LEFT JOIN turmas t ON at.turma_id = t.id
      ORDER BY a.nome
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cadastrar aluno
app.post('/api/alunos', async (req, res) => {
  try {
    const { nome, email, telefone, matricula, turma_id } = req.body;

    // Inserir usuário primeiro
    const userResult = await query(
      'INSERT INTO usuarios (email, senha, tipo, nome) VALUES ($1, MD5($2), $3, $4) RETURNING id',
      [email, '123456', 'aluno', nome]
    );

    const userId = userResult.rows[0].id;

    // Inserir aluno
    const alunoResult = await query(
      'INSERT INTO alunos (id, nome, email, telefone, matricula, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, nome, email, telefone, matricula, 'Ativo']
    );

    // Associar à turma se fornecida
    if (turma_id) {
      await query(
        'INSERT INTO alunos_turmas (aluno_id, turma_id) VALUES ($1, $2)',
        [userId, turma_id]
      );
    }

    res.status(201).json(alunoResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === PROFESSORES ===

// Listar professores
app.get('/api/professores', async (req, res) => {
  try {
    const result = await query(`
      SELECT p.*, array_agg(t.nome) as turmas
      FROM professores p
      LEFT JOIN professores_turmas pt ON p.id = pt.professor_id
      LEFT JOIN turmas t ON pt.turma_id = t.id
      GROUP BY p.id, p.nome, p.email, p.disciplina, p.telefone, p.formacao, p.status, p.data_admissao
      ORDER BY p.nome
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cadastrar professor
app.post('/api/professores', async (req, res) => {
  try {
    const { nome, email, telefone, disciplina, formacao, turmas } = req.body;

    // Inserir usuário primeiro
    const userResult = await query(
      'INSERT INTO usuarios (email, senha, tipo, nome) VALUES ($1, MD5($2), $3, $4) RETURNING id',
      [email, '123456', 'professor', nome]
    );

    const userId = userResult.rows[0].id;

    // Inserir professor
    const profResult = await query(
      'INSERT INTO professores (id, nome, email, disciplina, telefone, formacao, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [userId, nome, email, disciplina, telefone, formacao, 'Ativo']
    );

    // Associar às turmas se fornecidas
    if (turmas && turmas.length > 0) {
      for (const turmaId of turmas) {
        await query(
          'INSERT INTO professores_turmas (professor_id, turma_id) VALUES ($1, $2)',
          [userId, turmaId]
        );
      }
    }

    res.status(201).json(profResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === TURMAS ===

// Listar turmas
app.get('/api/turmas', async (req, res) => {
  try {
    const result = await query(`
      SELECT t.*, COUNT(at.aluno_id) as total_alunos
      FROM turmas t
      LEFT JOIN alunos_turmas at ON t.id = at.turma_id
      GROUP BY t.id, t.nome, t.ano, t.descricao
      ORDER BY t.ano, t.nome
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === AULAS ===

// Listar aulas
app.get('/api/aulas', async (req, res) => {
  try {
    const result = await query(`
      SELECT a.*, p.nome as professor_nome, t.nome as turma_nome
      FROM aulas a
      JOIN professores p ON a.professor_id = p.id
      JOIN turmas t ON a.turma_id = t.id
      ORDER BY a.data_aula DESC, a.horario
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar aula
app.post('/api/aulas', async (req, res) => {
  try {
    const { titulo, descricao, professor_id, turma_id, data_aula, horario, duracao, video_url } = req.body;

    const result = await query(
      'INSERT INTO aulas (titulo, descricao, professor_id, turma_id, data_aula, horario, duracao, video_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [titulo, descricao, professor_id, turma_id, data_aula, horario, duracao, video_url, 'agendado']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === TAREFAS ===

// Listar tarefas
app.get('/api/tarefas', async (req, res) => {
  try {
    const result = await query(`
      SELECT t.*, p.nome as professor_nome, tur.nome as turma_nome
      FROM tarefas t
      JOIN professores p ON t.professor_id = p.id
      JOIN turmas tur ON t.turma_id = tur.id
      ORDER BY t.data_entrega DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar tarefa
app.post('/api/tarefas', async (req, res) => {
  try {
    const { titulo, descricao, professor_id, turma_id, data_entrega, valor_nota } = req.body;

    const result = await query(
      'INSERT INTO tarefas (titulo, descricao, professor_id, turma_id, data_entrega, valor_nota, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [titulo, descricao, professor_id, turma_id, data_entrega, valor_nota, 'ativa']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === MATERIAIS ===

// Listar materiais
app.get('/api/materiais', async (req, res) => {
  try {
    const result = await query(`
      SELECT m.*, p.nome as professor_nome, t.nome as turma_nome
      FROM materiais m
      JOIN professores p ON m.professor_id = p.id
      JOIN turmas t ON m.turma_id = t.id
      ORDER BY m.data_upload DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === COMUNICADOS ===

// Listar comunicados
app.get('/api/comunicados', async (req, res) => {
  try {
    const result = await query(`
      SELECT c.*, u.nome as autor_nome
      FROM comunicados c
      JOIN usuarios u ON c.autor_id = u.id
      ORDER BY c.data_envio DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar comunicado
app.post('/api/comunicados', async (req, res) => {
  try {
    const { titulo, conteudo, autor_id, tipo, destinatarios } = req.body;

    const result = await query(
      'INSERT INTO comunicados (titulo, conteudo, autor_id, tipo, destinatarios, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [titulo, conteudo, autor_id, tipo, JSON.stringify(destinatarios), 'enviado']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === MENSAGENS ===

// Listar conversas do usuário
app.get('/api/mensagens/conversas/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await query(`
      SELECT DISTINCT
        CASE
          WHEN m.remetente_id = $1 THEN m.destinatario_id
          ELSE m.remetente_id
        END as outro_usuario_id,
        u.nome as outro_usuario_nome,
        u.tipo as outro_usuario_tipo,
        MAX(m.data_envio) as ultima_mensagem
      FROM mensagens m
      JOIN usuarios u ON (
        CASE
          WHEN m.remetente_id = $1 THEN m.destinatario_id = u.id
          ELSE m.remetente_id = u.id
        END
      )
      WHERE m.remetente_id = $1 OR m.destinatario_id = $1
      GROUP BY outro_usuario_id, u.nome, u.tipo
      ORDER BY ultima_mensagem DESC
    `, [userId]);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar mensagens entre dois usuários
app.get('/api/mensagens/:userId/:otherUserId', async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;

    const result = await query(`
      SELECT m.*, u_rem.nome as remetente_nome, u_dest.nome as destinatario_nome
      FROM mensagens m
      JOIN usuarios u_rem ON m.remetente_id = u_rem.id
      JOIN usuarios u_dest ON m.destinatario_id = u_dest.id
      WHERE (m.remetente_id = $1 AND m.destinatario_id = $2)
         OR (m.remetente_id = $2 AND m.destinatario_id = $1)
      ORDER BY m.data_envio ASC
    `, [userId, otherUserId]);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enviar mensagem
app.post('/api/mensagens', async (req, res) => {
  try {
    const { remetente_id, destinatario_id, conteudo } = req.body;

    const result = await query(
      'INSERT INTO mensagens (remetente_id, destinatario_id, conteudo) VALUES ($1, $2, $3) RETURNING *',
      [remetente_id, destinatario_id, conteudo]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api`);
});

module.exports = app;
