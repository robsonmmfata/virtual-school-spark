import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Search,
  Plus,
  MessageSquare,
  Clock,
  User,
  CheckCircle2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mensagensAPI, professoresAPI } from "@/lib/api.js";
import { useAuth } from "@/hooks/useAuth.js";

const AlunoMensagensAPI = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [novaMensagem, setNovaMensagem] = useState("");
  const [conversaSelecionada, setConversaSelecionada] = useState(null);
  const [conversas, setConversas] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    if (user) {
      carregarDados();
    }
  }, [user]);

  // Carregar mensagens quando conversa é selecionada
  useEffect(() => {
    if (conversaSelecionada && user) {
      carregarMensagens(conversaSelecionada);
    }
  }, [conversaSelecionada, user]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      console.log('Carregando dados do aluno, user.id:', user.id);
      
      const [conversasData, professoresData] = await Promise.all([
        mensagensAPI.listarConversas(user.id),
        professoresAPI.listar()
      ]);

      console.log('Conversas carregadas:', conversasData);
      console.log('Professores carregados:', professoresData);
      
      setConversas(conversasData);
      setProfessores(professoresData);

      // Selecionar primeira conversa se existir
      if (conversasData.length > 0) {
        setConversaSelecionada(conversasData[0].outro_usuario_id);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const carregarMensagens = async (outroUsuarioId) => {
    try {
      const mensagensData = await mensagensAPI.listarEntreUsuarios(user.id, outroUsuarioId);
      setMensagens(mensagensData);
    } catch (error) {
      toast({
        title: "Erro ao carregar mensagens",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const enviarMensagem = async () => {
    if (!novaMensagem.trim() || !conversaSelecionada) return;

    try {
      console.log('Enviando mensagem:', {
        remetente_id: user.id,
        destinatario_id: conversaSelecionada,
        conteudo: novaMensagem.trim()
      });

      const response = await mensagensAPI.enviar({
        remetente_id: user.id,
        destinatario_id: conversaSelecionada,
        conteudo: novaMensagem.trim()
      });

      console.log('Resposta do envio:', response);

      toast({
        title: "Mensagem enviada!",
        description: "Sua mensagem foi entregue.",
      });

      setNovaMensagem("");

      // Recarregar mensagens
      await carregarMensagens(conversaSelecionada);
      await carregarDados(); // Para atualizar a lista de conversas
    } catch (error) {
      console.error('Erro detalhado ao enviar mensagem:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleNovaConversa = () => {
    toast({
      title: "Nova conversa",
      description: "Selecione um professor para iniciar uma conversa.",
    });
  };

  const iniciarConversa = async (professorId) => {
    try {
      // Verificar se já existe conversa
      const conversaExistente = conversas.find(c => c.outro_usuario_id === professorId);
      if (conversaExistente) {
        setConversaSelecionada(professorId);
        return;
      }

      // Enviar primeira mensagem
      await mensagensAPI.enviar({
        remetente_id: user.id,
        destinatario_id: professorId,
        conteudo: "Olá! Gostaria de conversar sobre as aulas."
      });

      toast({
        title: "Conversa iniciada!",
        description: "Sua mensagem foi enviada para o professor.",
      });

      // Recarregar dados
      carregarDados();
      setConversaSelecionada(professorId);
    } catch (error) {
      toast({
        title: "Erro ao iniciar conversa",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Filtrar professores para busca
  const professoresFiltrados = professores.filter(prof =>
    prof.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.disciplina.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obter dados da conversa selecionada
  const conversaAtual = conversas.find(c => c.outro_usuario_id === conversaSelecionada);
  const professorAtual = professores.find(p => p.id === conversaSelecionada);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando mensagens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mensagens</h1>
          <p className="text-muted-foreground">Converse com seus professores e tire suas dúvidas</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} data-testid="btn-nova-conversa">
          <Plus className="h-4 w-4 mr-2" />
          Nova Conversa
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Lista de Conversas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <CardTitle>Conversas</CardTitle>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar professores..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {/* Conversas existentes */}
              {conversas.map((conversa) => (
                <div
                  key={conversa.outro_usuario_id}
                  className={`p-4 cursor-pointer transition-colors duration-200 border-b border-border hover:bg-muted ${
                    conversaSelecionada === conversa.outro_usuario_id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setConversaSelecionada(conversa.outro_usuario_id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                          {conversa.outro_usuario_nome.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground truncate">{conversa.outro_usuario_nome}</p>
                          <Badge variant="outline" className="text-xs">
                            Professor
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Professor</p>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          Última mensagem: {new Date(conversa.ultima_mensagem).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Modal para nova conversa */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-testid="modal-nova-conversa">
                  <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                    <h3 className="text-lg font-semibold mb-4">Iniciar Nova Conversa</h3>
                    <div className="max-h-60 overflow-y-auto">
                      {professoresFiltrados.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Nenhum professor encontrado.</p>
                      ) : (
                        professoresFiltrados.map((professor) => (
                          <div
                            key={professor.id}
                            className="p-3 cursor-pointer hover:bg-muted rounded"
                            onClick={() => {
                              iniciarConversa(professor.id);
                              setIsModalOpen(false);
                            }}
                          >
                            <p className="font-medium">{professor.nome}</p>
                            <p className="text-sm text-muted-foreground">{professor.disciplina}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat */}
        <Card className="lg:col-span-2 flex flex-col">
          {conversaAtual && professorAtual ? (
            <>
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {professorAtual.nome.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{professorAtual.nome}</p>
                      <p className="text-sm text-green-600">Professor de {professorAtual.disciplina}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Perfil
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Mensagens */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {mensagens.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma mensagem ainda.</p>
                      <p className="text-sm">Envie a primeira mensagem para iniciar a conversa!</p>
                    </div>
                  ) : (
                    mensagens.map((mensagem) => (
                      <div
                        key={mensagem.id}
                        className={`flex ${mensagem.remetente_id === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            mensagem.remetente_id === user.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{mensagem.conteudo}</p>
                          <div className={`flex items-center justify-between mt-1 ${
                            mensagem.remetente_id === user.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            <span className="text-xs">
                              {new Date(mensagem.data_envio).toLocaleString('pt-BR')}
                            </span>
                            {mensagem.remetente_id === user.id && (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>

              {/* Input de Nova Mensagem */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                    rows={1}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        enviarMensagem();
                      }
                    }}
                  />
                  <Button onClick={enviarMensagem} className="self-end">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
                <p>Escolha um professor para ver as mensagens ou iniciar uma nova conversa.</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Estatísticas de Mensagens */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{conversas.length}</div>
            <div className="text-sm text-muted-foreground">Conversas ativas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-orange">
              {conversas.filter(c => c.nao_lidas > 0).length}
            </div>
            <div className="text-sm text-muted-foreground">Não lidas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-green">{mensagens.length}</div>
            <div className="text-sm text-muted-foreground">Mensagens totais</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-purple">{professores.length}</div>
            <div className="text-sm text-muted-foreground">Professores disponíveis</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlunoMensagensAPI;
