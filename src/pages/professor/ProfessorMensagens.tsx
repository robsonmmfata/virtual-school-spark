import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Send, MessageSquare, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfessorMensagens = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const conversas = [
    {
      id: 1,
      nome: "Ana Silva",
      turma: "9º Ano - Álgebra 1",
      ultimaMensagem: "Professor, tenho dúvidas sobre equações quadráticas",
      horario: "14:30",
      naoLidas: 2,
      online: true
    },
    {
      id: 2,
      nome: "Carlos Oliveira",
      turma: "10º Ano - História Mundial",
      ultimaMensagem: "Obrigado pela explicação sobre a Revolução Industrial!",
      horario: "13:15",
      naoLidas: 0,
      online: false
    },
    {
      id: 3,
      nome: "Maria Santos",
      turma: "11º Ano - História dos EUA",
      ultimaMensagem: "Quando será a próxima prova sobre a Guerra Civil?",
      horario: "12:45",
      naoLidas: 1,
      online: true
    }
  ];

  const mensagens = [
    {
      id: 1,
      remetente: "Ana Silva",
      conteudo: "Professor, tenho dúvidas sobre a questão 5 da lista de exercícios.",
      horario: "14:25",
      proprio: false
    },
    {
      id: 2,
      remetente: "Você",
      conteudo: "Oi Ana! Qual parte específica da questão 5 está gerando dúvida?",
      horario: "14:27",
      proprio: true
    },
    {
      id: 3,
      remetente: "Ana Silva",
      conteudo: "Não estou conseguindo entender como aplicar a fórmula de bhaskara quando o discriminante é negativo.",
      horario: "14:30",
      proprio: false
    }
  ];

  const comunicados = [
    {
      id: 1,
      titulo: "Aviso - Prova de Matemática",
      conteudo: "A prova de matemática do 2º bimestre será no dia 15/02. Estudem os capítulos 3 e 4.",
      turmas: ["9º Ano - Álgebra 1", "10º Ano - Geometria"],
      data: "2024-02-01"
    },
    {
      id: 2,
      titulo: "Material Extra - Trigonometria",
      conteudo: "Disponibilizei material extra sobre trigonometria na seção de materiais.",
      turmas: ["11º Ano - História dos EUA"],
      data: "2024-01-30"
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast({
        title: "Mensagem enviada!",
        description: "Sua mensagem foi entregue ao aluno.",
      });
      setNewMessage("");
    }
  };

  const handleSendCommunique = () => {
    toast({
      title: "Comunicado enviado!",
      description: "O comunicado foi enviado para as turmas selecionadas.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mensagens</h1>
        <p className="text-muted-foreground">Comunicação com alunos e envio de comunicados</p>
      </div>

      <Tabs defaultValue="conversas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="conversas" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Conversas
          </TabsTrigger>
          <TabsTrigger value="comunicados" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Comunicados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conversas">
          <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
            {/* Lista de Conversas */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Conversas</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar aluno..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {conversas.map((conversa) => (
                    <div
                      key={conversa.id}
                      className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedChat === conversa.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedChat(conversa.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{conversa.nome}</h3>
                          {conversa.online && (
                            <div className="w-2 h-2 bg-education-green rounded-full"></div>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">{conversa.horario}</span>
                          {conversa.naoLidas > 0 && (
                            <Badge variant="destructive" className="ml-2 text-xs">
                              {conversa.naoLidas}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{conversa.turma}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversa.ultimaMensagem}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat */}
            <Card className="lg:col-span-2">
              {selectedChat ? (
                <>
                  <CardHeader className="border-b border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {conversas.find(c => c.id === selectedChat)?.nome}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {conversas.find(c => c.id === selectedChat)?.turma}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-education-green rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Online</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0 flex flex-col h-[400px]">
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                      {mensagens.map((mensagem) => (
                        <div
                          key={mensagem.id}
                          className={`flex ${mensagem.proprio ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              mensagem.proprio
                                ? 'bg-education-green text-primary-foreground'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="text-sm">{mensagem.conteudo}</p>
                            <span className="text-xs opacity-70">{mensagem.horario}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t border-border">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Digite sua mensagem..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button 
                          onClick={handleSendMessage}
                          className="bg-education-green hover:bg-education-green/90"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Selecione uma conversa para começar</p>
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comunicados" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Novo Comunicado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título</label>
                <Input placeholder="Ex: Aviso importante sobre a prova" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Mensagem</label>
                <Textarea 
                  placeholder="Digite o conteúdo do comunicado..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Turmas</label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">9º Ano - Álgebra 1</Button>
                  <Button variant="outline" size="sm">10º Ano - História Mundial</Button>
                  <Button variant="outline" size="sm">11º Ano - História dos EUA</Button>
                  <Button variant="outline" size="sm">12º Ano - Economia</Button>
                </div>
              </div>

              <Button 
                onClick={handleSendCommunique}
                className="bg-education-green hover:bg-education-green/90"
              >
                Enviar Comunicado
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comunicados Enviados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comunicados.map((comunicado) => (
                  <div key={comunicado.id} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{comunicado.titulo}</h3>
                      <span className="text-sm text-muted-foreground">
                        {new Date(comunicado.data).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{comunicado.conteudo}</p>
                    <div className="flex gap-1">
                      {comunicado.turmas.map((turma, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {turma}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessorMensagens;