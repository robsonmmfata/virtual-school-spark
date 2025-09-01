const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { testConnection, query } = require('./src/lib/database.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_temporaria';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

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
    console.log('Tentativa de login para:', email);

    const result = await query(`
      SELECT u.id, u.email, u.tipo, 
             COALESCE(a.nome, p.nome) as nome,
             a.matricula, p.disciplina
      FROM usuarios u
      LEFT JOIN alunos a ON u.id = a.usuario_id  
      LEFT JOIN professores p ON u.id = p.usuario_id
      WHERE u.email = $1 AND u.ativo = true
    `, [email]);

    if (result.rows.length === 0) {
      console.log('Usuário não encontrado:', email);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = result.rows[0];
    
    // Para desenvolvimento, aceitar senha "123456" ou a hash MD5 existente
    const senhaValida = password === '123456' || 
                       await bcrypt.compare(password, user.senha_hash || '') ||
                       password === user.senha_hash; // Compatibilidade com MD5 existente

    if (!senhaValida) {
      console.log('Senha inválida para:', email);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        tipo: user.tipo,
        nome: user.nome
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    console.log('Login bem-sucedido para:', email);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        tipo: user.tipo,
        nome: user.nome,
        matricula: user.matricula,
        disciplina: user.disciplina
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
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

// Buscar aluno por ID
app.get('/api/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(`
      SELECT a.*, t.nome as turma_nome, u.email
      FROM alunos a
      LEFT JOIN alunos_turmas at ON a.id = at.aluno_id
      LEFT JOIN turmas t ON at.turma_id = t.id
      LEFT JOIN usuarios u ON a.usuario_id = u.id
      WHERE a.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar aluno
app.put('/api/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, turma_id } = req.body;

    // Atualizar dados do aluno
    await query(
      'UPDATE alunos SET nome = $1, email = $2, telefone = $3 WHERE id = $4',
      [nome, email, telefone, id]
    );

    // Atualizar email no usuário
    await query(
      'UPDATE usuarios SET email = $1 WHERE id = $2',
      [email, id]
    );

    // Atualizar turma se fornecida
    if (turma_id) {
      await query('DELETE FROM alunos_turmas WHERE aluno_id = $1', [id]);
      await query(
        'INSERT INTO alunos_turmas (aluno_id, turma_id) VALUES ($1, $2)',
        [id, turma_id]
      );
    }

    res.json({ message: 'Aluno atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir aluno
app.delete('/api/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Remover relacionamentos
    await query('DELETE FROM alunos_turmas WHERE aluno_id = $1', [id]);
    await query('DELETE FROM mensagens WHERE remetente_id = $1 OR destinatario_id = $1', [id]);
    
    // Remover aluno e usuário
    await query('DELETE FROM alunos WHERE id = $1', [id]);
    await query('DELETE FROM usuarios WHERE id = $1', [id]);

    res.json({ message: 'Aluno excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
    console.log('Buscando conversas para usuário:', userId);

    const result = await query(`
      WITH conversas_usuarios AS (
        SELECT DISTINCT
          CASE
            WHEN m.remetente_id = $1 THEN m.destinatario_id
            ELSE m.remetente_id
          END as outro_usuario_id,
          MAX(m.data_envio) as ultima_data,
          MAX(m.conteudo) as ultima_mensagem_conteudo
        FROM mensagens m
        WHERE m.remetente_id = $1 OR m.destinatario_id = $1
        GROUP BY outro_usuario_id
      )
      SELECT 
        cu.outro_usuario_id,
        u.nome as outro_usuario_nome,
        u.tipo as outro_usuario_tipo,
        cu.ultima_data as ultima_mensagem,
        cu.ultima_mensagem_conteudo,
        COUNT(m_nao_lidas.id) as nao_lidas
      FROM conversas_usuarios cu
      JOIN usuarios u ON cu.outro_usuario_id = u.id
      LEFT JOIN mensagens m_nao_lidas ON (
        m_nao_lidas.destinatario_id = $1 
        AND m_nao_lidas.remetente_id = cu.outro_usuario_id 
        AND m_nao_lidas.lida = false
      )
      GROUP BY cu.outro_usuario_id, u.nome, u.tipo, cu.ultima_data, cu.ultima_mensagem_conteudo
      ORDER BY cu.ultima_data DESC
    `, [userId]);

    console.log('Conversas encontradas:', result.rows.length);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar conversas:', error);
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
    console.log('Enviando mensagem:', { remetente_id, destinatario_id, conteudo: conteudo.substring(0, 50) + '...' });

    // Verificar se os usuários existem
    const usuariosCheck = await query(
      'SELECT id, nome, tipo FROM usuarios WHERE id IN ($1, $2)',
      [remetente_id, destinatario_id]
    );

    if (usuariosCheck.rows.length < 2) {
      console.error('Usuários não encontrados:', usuariosCheck.rows);
      return res.status(400).json({ error: 'Usuário remetente ou destinatário não encontrado' });
    }

    const result = await query(
      'INSERT INTO mensagens (remetente_id, destinatario_id, conteudo, lida, data_envio) VALUES ($1, $2, $3, false, CURRENT_TIMESTAMP) RETURNING *',
      [remetente_id, destinatario_id, conteudo]
    );

    console.log('Mensagem criada com sucesso:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api`);
});

module.exports = app;
