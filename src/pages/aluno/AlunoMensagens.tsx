import { useState } from "react";
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

const AlunoMensagens = () => {
  const [novaMensagem, setNovaMensagem] = useState("");
  const [conversaSelecionada, setConversaSelecionada] = useState(1);

  const conversas = [
    {
      id: 1,
      nome: "Prof. Ana Silva",
      materia: "Matemática",
      ultimaMensagem: "Sobre os exercícios da página 42...",
      horario: "14:30",
      naoLidas: 2,
      online: true
    },
    {
      id: 2,
      nome: "Prof. Carlos Santos",
      materia: "Física",
      ultimaMensagem: "O relatório ficou muito bom!",
      horario: "10:15",
      naoLidas: 0,
      online: false
    },
    {
      id: 3,
      nome: "Secretaria",
      materia: "Administrativo",
      ultimaMensagem: "Documentos disponíveis para download",
      horario: "Ontem",
      naoLidas: 1,
      online: true
    },
    {
      id: 4,
      nome: "Prof. Marina Costa",
      materia: "Literatura",
      ultimaMensagem: "Ótima análise do Dom Casmurro",
      horario: "22/03",
      naoLidas: 0,
      online: false
    }
  ];

  const mensagens = [
    {
      id: 1,
      remetente: "Prof. Ana Silva",
      conteudo: "Olá João! Vi que você teve dúvidas nos exercícios da página 42. Podemos conversar sobre isso?",
      horario: "14:25",
      isProprieMessage: false
    },
    {
      id: 2,
      remetente: "Você",
      conteudo: "Oi professora! Sim, estou com dificuldade principalmente nos exercícios 8 e 12.",
      horario: "14:27",
      isProprieMessage: true
    },
    {
      id: 3,
      remetente: "Prof. Ana Silva",
      conteudo: "Perfeito! Vamos resolver juntos. O exercício 8 é sobre vértice da parábola. Lembra da fórmula?",
      horario: "14:30",
      isProprieMessage: false
    },
    {
      id: 4,
      remetente: "Você",
      conteudo: "Sim, é x = -b/2a, certo?",
      horario: "14:32",
      isProprieMessage: true
    },
    {
      id: 5,
      remetente: "Prof. Ana Silva",
      conteudo: "Exato! Agora aplique essa fórmula no exercício 8 e me diga o resultado.",
      horario: "14:35",
      isProprieMessage: false
    }
  ];

  const enviarMensagem = () => {
    if (novaMensagem.trim()) {
      // Simulação de envio
      alert(`Mensagem enviada: ${novaMensagem}`);
      setNovaMensagem("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mensagens</h1>
          <p className="text-muted-foreground">Converse com seus professores e tire suas dúvidas</p>
        </div>
        <Button>
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
                placeholder="Buscar conversas..."
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversas.map((conversa) => (
                <div
                  key={conversa.id}
                  className={`p-4 cursor-pointer transition-colors duration-200 border-b border-border hover:bg-muted ${
                    conversaSelecionada === conversa.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setConversaSelecionada(conversa.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                          {conversa.nome.charAt(0)}
                        </div>
                        {conversa.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground truncate">{conversa.nome}</p>
                          {conversa.naoLidas > 0 && (
                            <Badge variant="default" className="text-xs px-2 py-0.5">
                              {conversa.naoLidas}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{conversa.materia}</p>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {conversa.ultimaMensagem}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{conversa.horario}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    P
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div>
                  <p className="font-medium text-foreground">Prof. Ana Silva</p>
                  <p className="text-sm text-green-600">Online agora</p>
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
              {mensagens.map((mensagem) => (
                <div
                  key={mensagem.id}
                  className={`flex ${mensagem.isProprieMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      mensagem.isProprieMessage
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{mensagem.conteudo}</p>
                    <div className={`flex items-center justify-between mt-1 ${
                      mensagem.isProprieMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      <span className="text-xs">{mensagem.horario}</span>
                      {mensagem.isProprieMessage && (
                        <CheckCircle2 className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
              />
              <Button onClick={enviarMensagem} className="self-end">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Estatísticas de Mensagens */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="text-sm text-muted-foreground">Conversas ativas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-orange">3</div>
            <div className="text-sm text-muted-foreground">Não lidas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-green">42</div>
            <div className="text-sm text-muted-foreground">Mensagens enviadas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-purple">95%</div>
            <div className="text-sm text-muted-foreground">Taxa de resposta</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlunoMensagens;