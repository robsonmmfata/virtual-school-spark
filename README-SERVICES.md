# Serviços de Banco de Dados - Virtual School Spark

Este documento descreve os serviços de banco de dados criados para o sistema Virtual School Spark, incluindo autenticação e sistema de mensagens.

## 📁 Estrutura dos Arquivos

```
src/
├── services/
│   ├── authService.ts          # Serviço de autenticação
│   ├── messageService.ts       # Serviço de mensagens
│   └── index.ts                # Exportações e utilitários
├── lib/
│   ├── database.ts             # Conexão e utilitários do banco
│   └── test-db.ts              # Scripts de teste da conexão
└── examples/
    └── usage-examples.ts       # Exemplos de uso dos serviços
```

## 🔐 Serviço de Autenticação (AuthService)

### Métodos Disponíveis

#### `authenticate(email: string, senha: string): Promise<User | null>`
Autentica um usuário com email e senha.

**Exemplo:**
```typescript
const user = await AuthService.authenticate('aluno@escola.com', 'senha123');
if (user) {
  console.log('Login bem-sucedido:', user);
}
```

#### `getUserById(userId: number): Promise<User | null>`
Busca um usuário pelo ID.

**Exemplo:**
```typescript
const user = await AuthService.getUserById(1);
if (user) {
  console.log('Usuário encontrado:', user);
}
```

### Interface User
```typescript
interface User {
  id: number;
  email: string;
  tipo: 'aluno' | 'professor' | 'admin';
  nome?: string;
  matricula?: string;
  disciplina?: string;
}
```

## 💬 Serviço de Mensagens (MessageService)

### Métodos Disponíveis

#### `getConversations(userId: number): Promise<Conversation[]>`
Busca todas as conversas de um usuário.

#### `getMessages(conversationId: number, userId: number, limit?: number): Promise<Message[]>`
Busca mensagens de uma conversa específica.

#### `sendMessage(remetenteId: number, destinatarioId: number, conteudo: string): Promise<Message>`
Envia uma nova mensagem.

#### `getAvailableUsers(userId: number, userType: string): Promise<User[]>`
Busca usuários disponíveis para conversar.

#### `markAsRead(conversationId: number, userId: number): Promise<void>`
Marca mensagens como lidas.

#### `getMessageStats(userId: number): Promise<MessageStats>`
Busca estatísticas de mensagens do usuário.

### Interfaces

```typescript
interface Message {
  id: number;
  remetente_id: number;
  destinatario_id: number;
  conteudo: string;
  lida: boolean;
  data_envio: Date;
  remetente_nome?: string;
}

interface Conversation {
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
}

interface MessageStats {
  total_conversas: number;
  total_mensagens: number;
  nao_lidas: number;
  conversas_hoje: number;
}
```

## 🗄️ Utilitários de Banco de Dados

### Funções Disponíveis

#### `testConnection(): Promise<boolean>`
Testa a conexão com o banco de dados.

#### `query(sql: string, params?: any[]): Promise<QueryResult>`
Executa uma query SQL no banco.

#### `getClient(): Promise<Client>`
Obtém um cliente de conexão do banco.

## 📋 Configuração do Banco de Dados

### Variáveis de Ambiente (.env)
```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/virtual_school
DB_HOST=localhost
DB_PORT=5432
DB_NAME=virtual_school
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

### Estrutura das Tabelas

#### Tabela `usuarios`
```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('aluno', 'professor', 'admin')),
  ativo BOOLEAN DEFAULT true,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabela `alunos`
```sql
CREATE TABLE alunos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  nome VARCHAR(255),
  matricula VARCHAR(50) UNIQUE,
  data_nascimento DATE
);
```

#### Tabela `professores`
```sql
CREATE TABLE professores (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  nome VARCHAR(255),
  disciplina VARCHAR(100)
);
```

#### Tabela `conversas`
```sql
CREATE TABLE conversas (
  id SERIAL PRIMARY KEY,
  usuario1_id INTEGER REFERENCES usuarios(id),
  usuario2_id INTEGER REFERENCES usuarios(id),
  ultima_mensagem TEXT,
  ultima_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  nao_lidas_usuario1 INTEGER DEFAULT 0,
  nao_lidas_usuario2 INTEGER DEFAULT 0
);
```

#### Tabela `mensagens`
```sql
CREATE TABLE mensagens (
  id SERIAL PRIMARY KEY,
  remetente_id INTEGER REFERENCES usuarios(id),
  destinatario_id INTEGER REFERENCES usuarios(id),
  conteudo TEXT NOT NULL,
  lida BOOLEAN DEFAULT false,
  data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Como Usar

### 1. Importação
```typescript
import { AuthService, MessageService, User, Message } from './services';
```

### 2. Exemplo de Login
```typescript
import { AuthService } from './services';

async function login() {
  try {
    const user = await AuthService.authenticate('email@exemplo.com', 'senha');
    if (user) {
      console.log('Login bem-sucedido:', user);
      // Redirecionar ou salvar no estado
    }
  } catch (error) {
    console.error('Erro no login:', error);
  }
}
```

### 3. Exemplo de Chat
```typescript
import { MessageService } from './services';

async function loadConversations(userId: number) {
  try {
    const conversations = await MessageService.getConversations(userId);
    console.log('Conversas:', conversations);
  } catch (error) {
    console.error('Erro ao carregar conversas:', error);
  }
}

async function sendMessage(remetenteId: number, destinatarioId: number) {
  try {
    const message = await MessageService.sendMessage(
      remetenteId,
      destinatarioId,
      'Olá, como você está?'
    );
    console.log('Mensagem enviada:', message);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
}
```

## 🧪 Testes

### Teste de Conexão
```typescript
import { testConnection } from './lib/database';

async function testDB() {
  const connected = await testConnection();
  console.log('Conexão com banco:', connected ? 'OK' : 'FALHA');
}
```

### Exemplos Completos
Consulte o arquivo `src/examples/usage-examples.ts` para exemplos completos de uso de todos os serviços.

## 🔧 Tratamento de Erros

Os serviços incluem tratamento de erros consistente:

```typescript
import { handleServiceError, createSuccessResponse } from './services';

try {
  const result = await SomeService.someMethod();
  return createSuccessResponse(result, 'Operação realizada com sucesso');
} catch (error) {
  return handleServiceError(error);
}
```

## 📊 Funcionalidades Implementadas

- ✅ Autenticação de usuários (aluno, professor, admin)
- ✅ Sistema de mensagens em tempo real
- ✅ Conversas entre usuários
- ✅ Contadores de mensagens não lidas
- ✅ Busca de usuários disponíveis
- ✅ Estatísticas de mensagens
- ✅ Tratamento de erros consistente
- ✅ Tipagem TypeScript completa
- ✅ Utilitários de banco de dados
- ✅ Exemplos de uso documentados

## 🔄 Próximos Passos

- Implementar notificações push
- Adicionar suporte a anexos em mensagens
- Implementar pesquisa de mensagens
- Adicionar criptografia end-to-end
- Criar interface de administração

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- Arquivo `src/examples/usage-examples.ts` para exemplos
- Documentação das interfaces no código
- Logs de erro para debugging

---

**Última atualização:** Dezembro 2024
**Versão:** 1.0.0
