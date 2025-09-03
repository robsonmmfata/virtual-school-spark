import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Paperclip, Smile } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatTurmaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  turma: string;
}

const ChatTurmaModal = ({ open, onOpenChange, turma }: ChatTurmaModalProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  // Mock data - substituir por dados reais da API
  const mensagens = [
    {
      id: 1,
      remetente: "Ana Silva",
      tipo: "aluno",
      conteudo: "Professor, quando será a próxima prova?",
      horario: "2024-02-01 09:15",
      online: true
    },
    {
      id: 2,
      remetente: "Você",
      tipo: "professor",
      conteudo: "A prova será na próxima sexta-feira, dia 9 de fevereiro. Estudem os capítulos 3 e 4.",
      horario: "2024-02-01 09:18",
      online: true
    },
    {
      id: 3,
      remetente: "Carlos Oliveira",
      tipo: "aluno",
      conteudo: "Professor, pode disponibilizar uma lista de exercícios extras?",
      horario: "2024-02-01 09:22",
      online: true
    },
    {
      id: 4,
      remetente: "Maria Santos",
      tipo: "aluno",
      conteudo: "Obrigada pela explicação de hoje! Ficou muito claro.",
      horario: "2024-02-01 10:05",
      online: false
    },
    {
      id: 5,
      remetente: "Você",
      tipo: "professor",
      conteudo: "Vou disponibilizar uma lista extra ainda hoje. Fiquem atentos na seção de materiais!",
      horario: "2024-02-01 10:30",
      online: true
    }
  ];

  const alunosOnline = [
    { nome: "Ana Silva", iniciais: "AS" },
    { nome: "Carlos Oliveira", iniciais: "CO" },
    { nome: "João Pereira", iniciais: "JP" }
  ];

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      // Simular envio da mensagem
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Mensagem enviada!",
        description: "Sua mensagem foi enviada para a turma.",
      });
      
      setNewMessage("");
      
      // Aqui você faria a chamada real para a API
      // await api.post('/mensagens/turma', { turma, conteudo: newMessage });
      
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem.",
        variant: "destructive"
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Chat da Turma: {turma}</DialogTitle>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {alunosOnline.slice(0, 3).map((aluno, index) => (
                  <Avatar key={index} className="border-2 border-background w-8 h-8">
                    <AvatarFallback className="bg-education-green text-primary-foreground text-xs">
                      {aluno.iniciais}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {alunosOnline.length > 3 && (
                  <div className="w-8 h-8 bg-muted border-2 border-background rounded-full flex items-center justify-center text-xs text-muted-foreground">
                    +{alunosOnline.length - 3}
                  </div>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {alunosOnline.length} online
              </span>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col min-h-0">
          {/* Área de mensagens */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4 border border-border rounded-lg mb-4">
            {mensagens.map((mensagem) => (
              <div
                key={mensagem.id}
                className={`flex ${mensagem.tipo === 'professor' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-xs lg:max-w-md ${mensagem.tipo === 'professor' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={`text-xs ${mensagem.tipo === 'professor' ? 'bg-education-green text-primary-foreground' : 'bg-primary text-primary-foreground'}`}>
                      {mensagem.tipo === 'professor' ? 'P' : mensagem.remetente.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`${mensagem.tipo === 'professor' ? 'text-right' : ''}`}>
                    <div className={`px-4 py-2 rounded-lg ${
                      mensagem.tipo === 'professor'
                        ? 'bg-education-green text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}>
                      <p className="text-sm">{mensagem.conteudo}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {mensagem.remetente}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(mensagem.horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {mensagem.online && (
                        <div className="w-2 h-2 bg-education-green rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Campo de nova mensagem */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Digite sua mensagem para a turma..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-education-green hover:bg-education-green/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-xs text-muted-foreground mt-2 text-center">
            Pressione Enter para enviar • Shift+Enter para nova linha
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatTurmaModal;