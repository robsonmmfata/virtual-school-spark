// Mock API para substituir chamadas reais durante desenvolvimento
export const mockAPI = {
  alunos: {
    buscarPorId: async (id: number) => {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        id,
        nome: "João Silva Santos",
        email: "joao.silva@email.com",
        telefone: "(11) 99999-9999",
        matricula: `2024${String(id).padStart(3, '0')}`,
        turma: "1º Ano A",
        status: "Ativo",
        dataMatricula: "2024-01-15"
      };
    },
    
    atualizar: async (id: number, dados: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...dados, id };
    },
    
    excluir: async (id: number) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    
    cadastrar: async (dados: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...dados, id: Math.floor(Math.random() * 1000) };
    }
  },
  
  professores: {
    buscarPorId: async (id: number) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        id,
        nome: "Dr. Maria Silva Santos",
        email: "maria.silva@eduvirtual.com.br",
        telefone: "(11) 99999-1111",
        disciplina: "Matemática",
        formacao: "Doutorado em Matemática",
        turmas: ["1º Ano A", "2º Ano B"],
        status: "Ativo",
        dataAdmissao: "2023-01-15"
      };
    },
    
    atualizar: async (id: number, dados: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...dados, id };
    },
    
    cadastrar: async (dados: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...dados, id: Math.floor(Math.random() * 1000) };
    }
  }
};