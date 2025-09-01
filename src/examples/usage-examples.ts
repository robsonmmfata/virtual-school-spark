/**
 * Exemplos de uso dos serviços de banco de dados
 * Este arquivo demonstra como usar os serviços criados para autenticação e mensagens
 */

import { AuthService, MessageService, User, Message, handleServiceError, createSuccessResponse } from '../services';

// ==========================================
// EXEMPLOS DE AUTENTICAÇÃO
// ==========================================

export async function exemploLogin() {
  try {
    const email = 'aluno@escola.com';
    const senha = 'senha123';

    const user = await AuthService.authenticate(email, senha);

    if (user) {
      console.log('✅ Login bem-sucedido:', user);
      return createSuccessResponse(user, 'Login realizado com sucesso');
    } else {
      console.log('❌ Credenciais inválidas');
      return createSuccessResponse(null, 'Credenciais inválidas');
    }
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function exemploBuscarUsuario(userId: number) {
  try {
    const user = await AuthService.getUserById(userId);

    if (user) {
      console.log('✅ Usuário encontrado:', user);
      return createSuccessResponse(user);
    } else {
      console.log('❌ Usuário não encontrado');
      return createSuccessResponse(null, 'Usuário não encontrado');
    }
  } catch (error) {
    return handleServiceError(error);
  }
}

// ==========================================
// EXEMPLOS DE MENSAGENS
// ==========================================

export async function exemploBuscarConversas(userId: number) {
  try {
    const conversations = await MessageService.getConversations(userId);
    console.log('✅ Conversas encontradas:', conversations.length);

    conversations.forEach(conv => {
      console.log(`- Com ${conv.outro_usuario.nome}: ${conv.ultima_mensagem} (${conv.nao_lidas} não lidas)`);
    });

    return createSuccessResponse(conversations);
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function exemploBuscarMensagens(conversationId: number, userId: number) {
  try {
    const messages = await MessageService.getMessages(conversationId, userId, 20);
    console.log('✅ Mensagens encontradas:', messages.length);

    messages.forEach(msg => {
      console.log(`${msg.remetente_nome}: ${msg.conteudo} (${msg.data_envio})`);
    });

    return createSuccessResponse(messages);
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function exemploEnviarMensagem(remetenteId: number, destinatarioId: number) {
  try {
    const conteudo = 'Olá! Como você está?';
    const message = await MessageService.sendMessage(remetenteId, destinatarioId, conteudo);

    console.log('✅ Mensagem enviada:', message);
    return createSuccessResponse(message, 'Mensagem enviada com sucesso');
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function exemploBuscarUsuariosDisponiveis(userId: number, userType: string) {
  try {
    const users = await MessageService.getAvailableUsers(userId, userType);
    console.log('✅ Usuários disponíveis:', users.length);

    users.forEach(user => {
      console.log(`- ${user.nome} (${user.email}) - ${user.tipo}`);
    });

    return createSuccessResponse(users);
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function exemploMarcarComoLida(conversationId: number, userId: number) {
  try {
    await MessageService.markAsRead(conversationId, userId);
    console.log('✅ Mensagens marcadas como lidas');
    return createSuccessResponse(null, 'Mensagens marcadas como lidas');
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function exemploEstatisticasMensagens(userId: number) {
  try {
    const stats = await MessageService.getMessageStats(userId);
    console.log('✅ Estatísticas:', stats);
    return createSuccessResponse(stats);
  } catch (error) {
    return handleServiceError(error);
  }
}

// ==========================================
// EXEMPLO DE FLUXO COMPLETO
// ==========================================

export async function exemploFluxoCompleto() {
  console.log('🚀 Iniciando fluxo completo de exemplo...\n');

  try {
    // 1. Fazer login
    console.log('1️⃣ Fazendo login...');
    const loginResult = await exemploLogin();
    if (!loginResult.success || !loginResult.data) {
      console.log('❌ Falha no login');
      return;
    }

    const user = loginResult.data as User;
    console.log(`✅ Logado como ${user.nome} (${user.tipo})\n`);

    // 2. Buscar conversas
    console.log('2️⃣ Buscando conversas...');
    const conversationsResult = await exemploBuscarConversas(user.id);
    if (!conversationsResult.success) {
      console.log('❌ Falha ao buscar conversas');
      return;
    }

    const conversations = conversationsResult.data as Array<{
      id: number;
      outro_usuario: { id: number; email: string; nome: string; tipo: string; };
      ultima_mensagem: string;
      ultima_data: Date;
      nao_lidas: number;
    }>;
    console.log(`✅ Encontradas ${conversations.length} conversas\n`);

    // 3. Se houver conversas, buscar mensagens da primeira
    if (conversations.length > 0) {
      console.log('3️⃣ Buscando mensagens da primeira conversa...');
      const firstConversation = conversations[0];
      const messagesResult = await exemploBuscarMensagens(firstConversation.id, user.id);
      if (messagesResult.success) {
        const messages = messagesResult.data as Message[];
        console.log(`✅ Encontradas ${messages.length} mensagens\n`);
      }
    }

    // 4. Buscar usuários disponíveis
    console.log('4️⃣ Buscando usuários disponíveis...');
    const availableUsersResult = await exemploBuscarUsuariosDisponiveis(user.id, user.tipo);
    if (availableUsersResult.success) {
      const availableUsers = availableUsersResult.data as Array<{
        id: number;
        email: string;
        nome: string;
        matricula?: string;
        disciplina?: string;
        tipo: string;
      }>;
      console.log(`✅ Encontrados ${availableUsers.length} usuários disponíveis\n`);
    }

    // 5. Buscar estatísticas
    console.log('5️⃣ Buscando estatísticas...');
    const statsResult = await exemploEstatisticasMensagens(user.id);
    if (statsResult.success) {
      const stats = statsResult.data as {
        total_conversas: number;
        total_mensagens: number;
        nao_lidas: number;
        conversas_hoje: number;
      };
      console.log(`✅ Estatísticas: ${stats.total_conversas} conversas, ${stats.total_mensagens} mensagens, ${stats.nao_lidas} não lidas\n`);
    }

    console.log('🎉 Fluxo completo executado com sucesso!');

  } catch (error) {
    console.error('❌ Erro no fluxo completo:', error);
  }
}

// ==========================================
// FUNÇÕES DE TESTE PARA DESENVOLVIMENTO
// ==========================================

export async function testarTodosOsServicos() {
  console.log('🧪 Iniciando testes de todos os serviços...\n');

  // IDs de exemplo (substitua pelos IDs reais do seu banco)
  const userId = 1;
  const otherUserId = 2;

  try {
    // Testar autenticação
    console.log('🔐 Testando autenticação...');
    await exemploLogin();

    // Testar busca de usuário
    console.log('\n👤 Testando busca de usuário...');
    await exemploBuscarUsuario(userId);

    // Testar mensagens
    console.log('\n💬 Testando mensagens...');
    await exemploBuscarConversas(userId);
    await exemploBuscarUsuariosDisponiveis(userId, 'aluno');
    await exemploEstatisticasMensagens(userId);

    // Testar envio de mensagem (cuidado: isso cria dados reais)
    console.log('\n📤 Testando envio de mensagem...');
    // await exemploEnviarMensagem(userId, otherUserId);

    console.log('\n✅ Todos os testes básicos concluídos!');

  } catch (error) {
    console.error('❌ Erro nos testes:', error);
  }
}

// ==========================================
// UTILITÁRIOS PARA DESENVOLVIMENTO
// ==========================================

export function logUserInfo(user: User) {
  console.log('👤 Informações do usuário:');
  console.log(`  ID: ${user.id}`);
  console.log(`  Email: ${user.email}`);
  console.log(`  Tipo: ${user.tipo}`);
  console.log(`  Nome: ${user.nome || 'N/A'}`);
  console.log(`  Matrícula: ${user.matricula || 'N/A'}`);
  console.log(`  Disciplina: ${user.disciplina || 'N/A'}`);
}

export function logMessageInfo(message: Message) {
  console.log('💬 Informações da mensagem:');
  console.log(`  ID: ${message.id}`);
  console.log(`  De: ${message.remetente_id}`);
  console.log(`  Para: ${message.destinatario_id}`);
  console.log(`  Conteúdo: ${message.conteudo}`);
  console.log(`  Lida: ${message.lida}`);
  console.log(`  Data: ${message.data_envio}`);
}

// ==========================================
// EXEMPLO DE USO EM COMPONENTE REACT
// ==========================================

/*
import React, { useState, useEffect } from 'react';
import { AuthService, MessageService, User, Message } from '../services';

export function ChatComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Simular login (em produção, use dados reais)
      const userData = await AuthService.authenticate('aluno@escola.com', 'senha123');
      if (userData) {
        setUser(userData);
        await loadConversations(userData.id);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const loadConversations = async (userId: number) => {
    try {
      const convs = await MessageService.getConversations(userId);
      setConversations(convs);
    } catch (error) {
      console.error('Erro ao carregar conversas:', error);
    }
  };

  const loadMessages = async (conversationId: number) => {
    if (!user) return;

    try {
      const msgs = await MessageService.getMessages(conversationId, user.id);
      setMessages(msgs);
      setSelectedConversation(conversationId);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!user || !selectedConversation) return;

    try {
      await MessageService.sendMessage(user.id, selectedConversation, content);
      // Recarregar mensagens após enviar
      await loadMessages(selectedConversation);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="conversations-list">
        {conversations.map(conv => (
          <div
            key={conv.id}
            onClick={() => loadMessages(conv.id)}
            className={selectedConversation === conv.id ? 'active' : ''}
          >
            <h4>{conv.outro_usuario.nome}</h4>
            <p>{conv.ultima_mensagem}</p>
            {conv.nao_lidas > 0 && <span>({conv.nao_lidas} não lidas)</span>}
          </div>
        ))}
      </div>

      <div className="messages-area">
        {messages.map(msg => (
          <div key={msg.id} className={msg.remetente_id === user?.id ? 'sent' : 'received'}>
            <strong>{msg.remetente_nome}:</strong> {msg.conteudo}
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
    </div>
  );
}
*/
