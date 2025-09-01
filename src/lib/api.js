// Configuração da API
const API_BASE_URL = 'http://localhost:3001/api';

// Função helper para fazer requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Erro ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
};

// === AUTENTICAÇÃO ===
export const authAPI = {
  // Login
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Verificar se usuário está logado
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('user');
  },
};

// === ALUNOS ===
export const alunosAPI = {
  // Listar todos os alunos
  listar: () => apiRequest('/alunos'),

  // Cadastrar novo aluno
  cadastrar: (dados) => apiRequest('/alunos', {
    method: 'POST',
    body: JSON.stringify(dados),
  }),

  // Buscar aluno por ID
  buscarPorId: (id) => apiRequest(`/alunos/${id}`),

  // Atualizar aluno
  atualizar: (id, dados) => apiRequest(`/alunos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  }),

  // Excluir aluno
  excluir: (id) => apiRequest(`/alunos/${id}`, {
    method: 'DELETE',
  }),
};

// === PROFESSORES ===
export const professoresAPI = {
  // Listar todos os professores
  listar: () => apiRequest('/professores'),

  // Cadastrar novo professor
  cadastrar: (dados) => apiRequest('/professores', {
    method: 'POST',
    body: JSON.stringify(dados),
  }),

  // Buscar professor por ID
  buscarPorId: (id) => apiRequest(`/professores/${id}`),

  // Atualizar professor
  atualizar: (id, dados) => apiRequest(`/professores/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  }),
};

// === TURMAS ===
export const turmasAPI = {
  // Listar todas as turmas
  listar: () => apiRequest('/turmas'),

  // Buscar turma por ID
  buscarPorId: (id) => apiRequest(`/turmas/${id}`),
};

// === AULAS ===
export const aulasAPI = {
  // Listar todas as aulas
  listar: () => apiRequest('/aulas'),

  // Criar nova aula
  criar: (dados) => apiRequest('/aulas', {
    method: 'POST',
    body: JSON.stringify(dados),
  }),

  // Buscar aulas por turma
  buscarPorTurma: (turmaId) => apiRequest(`/aulas?turma_id=${turmaId}`),

  // Buscar aulas por professor
  buscarPorProfessor: (professorId) => apiRequest(`/aulas?professor_id=${professorId}`),
};

// === TAREFAS ===
export const tarefasAPI = {
  // Listar todas as tarefas
  listar: () => apiRequest('/tarefas'),

  // Criar nova tarefa
  criar: (dados) => apiRequest('/tarefas', {
    method: 'POST',
    body: JSON.stringify(dados),
  }),

  // Buscar tarefas por turma
  buscarPorTurma: (turmaId) => apiRequest(`/tarefas?turma_id=${turmaId}`),

  // Buscar tarefas por professor
  buscarPorProfessor: (professorId) => apiRequest(`/tarefas?professor_id=${professorId}`),
};

// === MATERIAIS ===
export const materiaisAPI = {
  // Listar todos os materiais
  listar: () => apiRequest('/materiais'),

  // Buscar materiais por turma
  buscarPorTurma: (turmaId) => apiRequest(`/materiais?turma_id=${turmaId}`),

  // Buscar materiais por professor
  buscarPorProfessor: (professorId) => apiRequest(`/materiais?professor_id=${professorId}`),
};

// === COMUNICADOS ===
export const comunicadosAPI = {
  // Listar todos os comunicados
  listar: () => apiRequest('/comunicados'),

  // Criar novo comunicado
  criar: (dados) => apiRequest('/comunicados', {
    method: 'POST',
    body: JSON.stringify(dados),
  }),

  // Buscar comunicados por destinatário
  buscarPorDestinatario: (tipo) => apiRequest(`/comunicados?destinatario=${tipo}`),
};

// === MENSAGENS ===
export const mensagensAPI = {
  // Listar conversas do usuário
  listarConversas: (userId) => apiRequest(`/mensagens/conversas/${userId}`),

  // Listar mensagens entre dois usuários
  listarEntreUsuarios: (userId, otherUserId) => apiRequest(`/mensagens/${userId}/${otherUserId}`),

  // Enviar mensagem
  enviar: (dados) => apiRequest('/mensagens', {
    method: 'POST',
    body: JSON.stringify(dados),
  }),
};

// === UTILITÁRIOS ===
export const utilsAPI = {
  // Verificar saúde do sistema
  healthCheck: () => apiRequest('/health'),

  // Testar conexão com banco
  testConnection: async () => {
    try {
      await apiRequest('/health');
      return { status: 'OK', message: 'Conexão estabelecida com sucesso!' };
    } catch (error) {
      return { status: 'ERROR', message: error.message };
    }
  },
};

export default {
  auth: authAPI,
  alunos: alunosAPI,
  professores: professoresAPI,
  turmas: turmasAPI,
  aulas: aulasAPI,
  tarefas: tarefasAPI,
  materiais: materiaisAPI,
  comunicados: comunicadosAPI,
  mensagens: mensagensAPI,
  utils: utilsAPI,
};
