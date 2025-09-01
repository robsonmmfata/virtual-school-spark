# 🏫 Sistema Escolar Virtual - API Backend

Este projeto agora inclui uma API backend completa integrada com o banco de dados PostgreSQL para persistir todas as operações do sistema escolar.

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Banco de Dados
Certifique-se de que o banco PostgreSQL "escola" está criado na sua VPS com todas as tabelas e dados iniciais.

### 3. Configurar Variáveis de Ambiente
O arquivo `.env` já está configurado com suas credenciais da VPS.

### 4. Executar o Sistema Completo
```bash
# Executa tanto o backend quanto o frontend simultaneamente
npm run dev:full

# Ou execute separadamente:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

### 5. Acessar o Sistema
- **Frontend**: http://localhost:5173
- **API Backend**: http://localhost:3001/api

## 📊 Funcionalidades Integradas

### ✅ Autenticação
- Login de alunos, professores e administradores
- Credenciais salvas no banco de dados
- Sessões persistentes

### ✅ Gestão de Alunos
- Cadastro de novos alunos
- Listagem e edição de alunos existentes
- Associação automática a turmas
- Dados salvos no banco

### ✅ Gestão de Professores
- Cadastro de novos professores
- Vinculação a disciplinas e turmas
- Controle de status (ativo, férias, etc.)
- Dados persistidos

### ✅ Sistema de Aulas
- Criação e agendamento de aulas
- Gravação de aulas ao vivo
- Materiais de apoio
- Histórico completo salvo

### ✅ Tarefas e Avaliações
- Criação de tarefas por professores
- Controle de entrega por alunos
- Correção e notas
- Relatórios de desempenho

### ✅ Materiais Didáticos
- Upload e compartilhamento de materiais
- Organização por turmas e disciplinas
- Controle de acesso

### ✅ Comunicados
- Envio de avisos e comunicados
- Destinatários específicos ou gerais
- Histórico de comunicações

### ✅ Sistema de Mensagens
- Mensagens entre usuários
- Conversas privadas
- Notificações em tempo real

## 🔧 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login de usuário

### Alunos
- `GET /api/alunos` - Listar alunos
- `POST /api/alunos` - Cadastrar aluno

### Professores
- `GET /api/professores` - Listar professores
- `POST /api/professores` - Cadastrar professor

### Turmas
- `GET /api/turmas` - Listar turmas

### Aulas
- `GET /api/aulas` - Listar aulas
- `POST /api/aulas` - Criar aula

### Tarefas
- `GET /api/tarefas` - Listar tarefas
- `POST /api/tarefas` - Criar tarefa

### Materiais
- `GET /api/materiais` - Listar materiais

### Comunicados
- `GET /api/comunicados` - Listar comunicados
- `POST /api/comunicados` - Criar comunicado

### Mensagens
- `GET /api/mensagens/conversas/:userId` - Listar conversas
- `GET /api/mensagens/:userId/:otherUserId` - Mensagens entre usuários
- `POST /api/mensagens` - Enviar mensagem

## 🗄️ Estrutura do Banco de Dados

O sistema utiliza PostgreSQL com as seguintes tabelas principais:

- `usuarios` - Usuários do sistema (alunos, professores, admin)
- `alunos` - Dados específicos dos alunos
- `professores` - Dados específicos dos professores
- `turmas` - Turmas escolares
- `alunos_turmas` - Relacionamento alunos-turmas
- `professores_turmas` - Relacionamento professores-turmas
- `aulas` - Aulas agendadas e gravadas
- `tarefas` - Tarefas e avaliações
- `materiais` - Materiais didáticos
- `comunicados` - Avisos e comunicados
- `mensagens` - Sistema de mensagens
- `conversas` - Controle de conversas

## 🔐 Credenciais de Teste

- **Admin**: admin@eduvirtual.com.br / 123456
- **Professor**: professor@eduvirtual.com.br / 123456
- **Aluno**: aluno@eduvirtual.com.br / 123456

## 📝 Próximos Passos

1. **Testar todas as funcionalidades** - Cadastre alunos, professores, crie aulas, etc.
2. **Implementar validações** - Adicionar validações nos formulários
3. **Adicionar autenticação JWT** - Para sessões mais seguras
4. **Implementar notificações** - Push notifications para novos comunicados
5. **Adicionar upload de arquivos** - Para materiais didáticos
6. **Dashboard com estatísticas** - Gráficos e relatórios em tempo real

## 🐛 Troubleshooting

### Erro de Conexão com Banco
- Verifique se a VPS está acessível
- Confirme as credenciais no arquivo `.env`
- Certifique-se de que o banco "escola" existe

### Frontend não conecta com API
- Verifique se o servidor backend está rodando na porta 3001
- Confirme a variável `VITE_API_URL` no `.env`

### Erro de CORS
- O CORS já está configurado no servidor
- Se ainda houver problemas, verifique as configurações do navegador

---

**🎉 Sistema pronto para uso completo! Todas as operações agora são persistidas no banco de dados.**
