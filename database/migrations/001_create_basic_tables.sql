-- Virtual School Spark - Database Schema
-- Execute este arquivo no PostgreSQL para criar as tabelas básicas

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('aluno', 'professor', 'admin')),
  ativo BOOLEAN DEFAULT true,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultimo_acesso TIMESTAMP
);

-- Tabela de alunos
CREATE TABLE IF NOT EXISTS alunos (
  id INTEGER PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  matricula VARCHAR(50) UNIQUE,
  data_nascimento DATE,
  status VARCHAR(20) DEFAULT 'Ativo',
  data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de professores
CREATE TABLE IF NOT EXISTS professores (
  id INTEGER PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  disciplina VARCHAR(100),
  formacao VARCHAR(255),
  status VARCHAR(20) DEFAULT 'Ativo',
  data_admissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de turmas
CREATE TABLE IF NOT EXISTS turmas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  ano INTEGER NOT NULL,
  descricao TEXT,
  capacidade INTEGER DEFAULT 30,
  ativo BOOLEAN DEFAULT true,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de relacionamento alunos-turmas
CREATE TABLE IF NOT EXISTS alunos_turmas (
  id SERIAL PRIMARY KEY,
  aluno_id INTEGER REFERENCES alunos(id) ON DELETE CASCADE,
  turma_id INTEGER REFERENCES turmas(id) ON DELETE CASCADE,
  data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(aluno_id, turma_id)
);

-- Tabela de relacionamento professores-turmas
CREATE TABLE IF NOT EXISTS professores_turmas (
  id SERIAL PRIMARY KEY,
  professor_id INTEGER REFERENCES professores(id) ON DELETE CASCADE,
  turma_id INTEGER REFERENCES turmas(id) ON DELETE CASCADE,
  data_atribuicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(professor_id, turma_id)
);

-- Tabela de aulas
CREATE TABLE IF NOT EXISTS aulas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  professor_id INTEGER REFERENCES professores(id) ON DELETE CASCADE,
  turma_id INTEGER REFERENCES turmas(id) ON DELETE CASCADE,
  data_aula DATE NOT NULL,
  horario TIME NOT NULL,
  duracao INTEGER DEFAULT 90, -- em minutos
  video_url TEXT,
  material_url TEXT,
  status VARCHAR(20) DEFAULT 'agendada' CHECK (status IN ('agendada', 'ao-vivo', 'finalizada', 'cancelada')),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tarefas
CREATE TABLE IF NOT EXISTS tarefas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  professor_id INTEGER REFERENCES professores(id) ON DELETE CASCADE,
  turma_id INTEGER REFERENCES turmas(id) ON DELETE CASCADE,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_entrega TIMESTAMP NOT NULL,
  valor_nota DECIMAL(4,2) DEFAULT 10.00,
  status VARCHAR(20) DEFAULT 'ativa' CHECK (status IN ('ativa', 'encerrada', 'cancelada')),
  arquivo_anexo TEXT
);

-- Tabela de submissões de tarefas
CREATE TABLE IF NOT EXISTS submissoes_tarefas (
  id SERIAL PRIMARY KEY,
  tarefa_id INTEGER REFERENCES tarefas(id) ON DELETE CASCADE,
  aluno_id INTEGER REFERENCES alunos(id) ON DELETE CASCADE,
  arquivo_url TEXT,
  comentario TEXT,
  data_submissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  nota DECIMAL(4,2),
  feedback TEXT,
  status VARCHAR(20) DEFAULT 'enviada' CHECK (status IN ('enviada', 'avaliada', 'reenviar')),
  UNIQUE(tarefa_id, aluno_id)
);

-- Tabela de materiais de apoio
CREATE TABLE IF NOT EXISTS materiais (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  professor_id INTEGER REFERENCES professores(id) ON DELETE CASCADE,
  turma_id INTEGER REFERENCES turmas(id) ON DELETE CASCADE,
  arquivo_url TEXT NOT NULL,
  tipo VARCHAR(50), -- pdf, video, link, etc.
  tamanho_arquivo BIGINT, -- em bytes
  data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  downloads INTEGER DEFAULT 0
);

-- Tabela de conversas (sistema de mensagens)
CREATE TABLE IF NOT EXISTS conversas (
  id SERIAL PRIMARY KEY,
  usuario1_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  usuario2_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  ultima_mensagem TEXT,
  ultima_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  nao_lidas_usuario1 INTEGER DEFAULT 0,
  nao_lidas_usuario2 INTEGER DEFAULT 0,
  UNIQUE(usuario1_id, usuario2_id),
  CHECK (usuario1_id != usuario2_id)
);

-- Tabela de mensagens
CREATE TABLE IF NOT EXISTS mensagens (
  id SERIAL PRIMARY KEY,
  remetente_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  destinatario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  conteudo TEXT NOT NULL,
  lida BOOLEAN DEFAULT false,
  data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  anexo_url TEXT
);

-- Tabela de comunicados
CREATE TABLE IF NOT EXISTS comunicados (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  conteudo TEXT NOT NULL,
  autor_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  tipo VARCHAR(50) DEFAULT 'geral', -- geral, urgente, manutencao, etc.
  destinatarios JSONB, -- array de tipos de usuários ou IDs específicos
  status VARCHAR(20) DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'agendado', 'enviado')),
  data_envio TIMESTAMP,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  visualizacoes INTEGER DEFAULT 0
);

-- Tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS configuracoes (
  id SERIAL PRIMARY KEY,
  chave VARCHAR(100) UNIQUE NOT NULL,
  valor TEXT,
  descricao TEXT,
  categoria VARCHAR(50),
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_tipo ON usuarios(tipo);
CREATE INDEX IF NOT EXISTS idx_mensagens_remetente ON mensagens(remetente_id);
CREATE INDEX IF NOT EXISTS idx_mensagens_destinatario ON mensagens(destinatario_id);
CREATE INDEX IF NOT EXISTS idx_mensagens_data ON mensagens(data_envio);
CREATE INDEX IF NOT EXISTS idx_aulas_data ON aulas(data_aula);
CREATE INDEX IF NOT EXISTS idx_tarefas_entrega ON tarefas(data_entrega);

-- Comentários nas tabelas
COMMENT ON TABLE usuarios IS 'Tabela principal de usuários do sistema';
COMMENT ON TABLE alunos IS 'Dados específicos dos alunos';
COMMENT ON TABLE professores IS 'Dados específicos dos professores';
COMMENT ON TABLE turmas IS 'Turmas/classes da escola';
COMMENT ON TABLE aulas IS 'Aulas agendadas e realizadas';
COMMENT ON TABLE tarefas IS 'Tarefas e atividades para os alunos';
COMMENT ON TABLE mensagens IS 'Sistema de mensagens entre usuários';
COMMENT ON TABLE comunicados IS 'Comunicados e avisos da administração';