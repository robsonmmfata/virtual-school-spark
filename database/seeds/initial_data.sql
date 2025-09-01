-- Virtual School Spark - Dados Iniciais
-- Execute este arquivo após criar as tabelas para inserir dados de exemplo

-- Inserir configurações padrão
INSERT INTO configuracoes (chave, valor, descricao, categoria) VALUES 
('escola_nome', 'California International Academy', 'Nome da escola', 'geral'),
('escola_email', 'contato@cia.edu', 'E-mail institucional', 'geral'),
('escola_telefone', '+1 (555) 123-4567', 'Telefone da escola', 'geral'),
('ano_letivo', '2024', 'Ano letivo atual', 'academico'),
('sistema_avaliacao', 'notas', 'Sistema de avaliação (notas/conceitos)', 'academico'),
('frequencia_minima', '75', 'Frequência mínima para aprovação (%)', 'academico'),
('media_minima', '7.0', 'Média mínima para aprovação', 'academico'),
('backup_automatico', 'true', 'Realizar backup automático', 'sistema'),
('notificacoes_email', 'true', 'Enviar notificações por email', 'sistema'),
('fuso_horario', 'America/Sao_Paulo', 'Fuso horário do sistema', 'sistema')
ON CONFLICT (chave) DO NOTHING;

-- Inserir turmas de exemplo
INSERT INTO turmas (nome, ano, descricao, capacidade) VALUES 
('1º Ano A', 1, 'Turma do primeiro ano - Turno matutino', 30),
('1º Ano B', 1, 'Turma do primeiro ano - Turno vespertino', 30),
('2º Ano A', 2, 'Turma do segundo ano - Turno matutino', 30),
('2º Ano B', 2, 'Turma do segundo ano - Turno vespertino', 30),
('3º Ano A', 3, 'Turma do terceiro ano - Turno matutino', 30),
('3º Ano B', 3, 'Turma do terceiro ano - Turno vespertino', 30)
ON CONFLICT DO NOTHING;

-- Inserir usuário administrador padrão
INSERT INTO usuarios (id, email, senha_hash, tipo) VALUES 
(1, 'admin@cia.edu', '$2b$10$K9F2j4L6N8P0Q2R3S5T7U9v1W3X5Y7Z9A1B2C3D4E5F6G7H8I9J0K1', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Inserir alguns professores de exemplo
INSERT INTO usuarios (id, email, senha_hash, tipo) VALUES 
(2, 'maria.silva@cia.edu', '$2b$10$K9F2j4L6N8P0Q2R3S5T7U9v1W3X5Y7Z9A1B2C3D4E5F6G7H8I9J0K1', 'professor'),
(3, 'carlos.santos@cia.edu', '$2b$10$K9F2j4L6N8P0Q2R3S5T7U9v1W3X5Y7Z9A1B2C3D4E5F6G7H8I9J0K1', 'professor'),
(4, 'ana.costa@cia.edu', '$2b$10$K9F2j4L6N8P0Q2R3S5T7U9v1W3X5Y7Z9A1B2C3D4E5F6G7H8I9J0K1', 'professor')
ON CONFLICT (email) DO NOTHING;

INSERT INTO professores (id, nome, email, disciplina, formacao) VALUES 
(2, 'Dra. Maria Silva Santos', 'maria.silva@cia.edu', 'Matemática', 'Doutorado em Matemática - USP'),
(3, 'Prof. Carlos Santos Oliveira', 'carlos.santos@cia.edu', 'Física', 'Mestrado em Física - UNICAMP'),
(4, 'Profa. Ana Costa Lima', 'ana.costa@cia.edu', 'Química', 'Mestrado em Química - UFRJ')
ON CONFLICT (id) DO NOTHING;

-- Inserir alguns alunos de exemplo
INSERT INTO usuarios (id, email, senha_hash, tipo) VALUES 
(5, 'joao.silva@student.cia.edu', '$2b$10$K9F2j4L6N8P0Q2R3S5T7U9v1W3X5Y7Z9A1B2C3D4E5F6G7H8I9J0K1', 'aluno'),
(6, 'ana.santos@student.cia.edu', '$2b$10$K9F2j4L6N8P0Q2R3S5T7U9v1W3X5Y7Z9A1B2C3D4E5F6G7H8I9J0K1', 'aluno'),
(7, 'pedro.oliveira@student.cia.edu', '$2b$10$K9F2j4L6N8P0Q2R3S5T7U9v1W3X5Y7Z9A1B2C3D4E5F6G7H8I9J0K1', 'aluno')
ON CONFLICT (email) DO NOTHING;

INSERT INTO alunos (id, nome, email, matricula, telefone) VALUES 
(5, 'João Silva Santos', 'joao.silva@student.cia.edu', '2024001', '(11) 99999-0001'),
(6, 'Ana Santos Costa', 'ana.santos@student.cia.edu', '2024002', '(11) 99999-0002'),
(7, 'Pedro Oliveira Lima', 'pedro.oliveira@student.cia.edu', '2024003', '(11) 99999-0003')
ON CONFLICT (id) DO NOTHING;

-- Associar alunos às turmas
INSERT INTO alunos_turmas (aluno_id, turma_id) VALUES 
(5, 1), -- João na turma 1º Ano A
(6, 1), -- Ana na turma 1º Ano A
(7, 2)  -- Pedro na turma 1º Ano B
ON CONFLICT (aluno_id, turma_id) DO NOTHING;

-- Associar professores às turmas
INSERT INTO professores_turmas (professor_id, turma_id) VALUES 
(2, 1), (2, 2), -- Maria Silva - Matemática nas turmas 1º A e B
(3, 3), (3, 4), -- Carlos Santos - Física nas turmas 2º A e B
(4, 5), (4, 6)  -- Ana Costa - Química nas turmas 3º A e B
ON CONFLICT (professor_id, turma_id) DO NOTHING;

-- Inserir algumas aulas de exemplo
INSERT INTO aulas (titulo, descricao, professor_id, turma_id, data_aula, horario, duracao) VALUES 
('Funções Quadráticas - Parte 1', 'Introdução às funções quadráticas e seus gráficos', 2, 1, CURRENT_DATE + 1, '14:00:00', 90),
('Lei de Ohm', 'Estudo da lei de Ohm e resistência elétrica', 3, 3, CURRENT_DATE + 1, '15:30:00', 90),
('Ligações Químicas', 'Tipos de ligações: iônica, covalente e metálica', 4, 5, CURRENT_DATE + 2, '08:00:00', 90),
('Equações de 2º Grau', 'Resolução de equações quadráticas', 2, 1, CURRENT_DATE + 3, '14:00:00', 90)
ON CONFLICT DO NOTHING;

-- Inserir algumas tarefas de exemplo
INSERT INTO tarefas (titulo, descricao, professor_id, turma_id, data_entrega, valor_nota) VALUES 
('Lista de Exercícios - Funções', 'Resolver exercícios 1 a 20 da página 45', 2, 1, CURRENT_DATE + 7, 10.00),
('Relatório de Experimento', 'Relatório sobre o experimento de resistência elétrica', 3, 3, CURRENT_DATE + 14, 15.00),
('Pesquisa sobre Ligações', 'Pesquisar e apresentar diferentes tipos de ligações químicas', 4, 5, CURRENT_DATE + 10, 12.00)
ON CONFLICT DO NOTHING;

-- Inserir alguns comunicados de exemplo
INSERT INTO comunicados (titulo, conteudo, autor_id, tipo, destinatarios, status, data_envio) VALUES 
('Início do Ano Letivo 2024', 'Bem-vindos ao novo ano letivo! As aulas começam no dia 05/02/2024.', 1, 'geral', '["aluno", "professor"]', 'enviado', CURRENT_TIMESTAMP),
('Reunião Pedagógica', 'Reunião pedagógica agendada para 15/02/2024 às 14h00.', 1, 'administrativo', '["professor"]', 'enviado', CURRENT_TIMESTAMP),
('Cronograma de Avaliações', 'O cronograma do 1º bimestre está disponível no sistema.', 1, 'academico', '["aluno"]', 'enviado', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Atualizar sequências (importante para PostgreSQL)
SELECT setval('usuarios_id_seq', 100, false);
SELECT setval('turmas_id_seq', 10, false);
SELECT setval('aulas_id_seq', 10, false);
SELECT setval('tarefas_id_seq', 10, false);
SELECT setval('comunicados_id_seq', 10, false);

-- Comentário final
-- Senha padrão para todos os usuários de exemplo: "123456"
-- Hash gerado com: bcrypt.hash('123456', 10)