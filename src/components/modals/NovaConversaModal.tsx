import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mensagensAPI } from "@/lib/api";

interface NovaConversaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NovaConversaModal = ({ isOpen, onClose, onSuccess }: NovaConversaModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  const professores = [
    { id: 1, nome: "Prof. Ana Silva", materia: "Matemática" },
    { id: 2, nome: "Prof. Carlos Santos", materia: "Física" },
    { id: 3, nome: "Prof. Marina Costa", materia: "Literatura" },
    { id: 4, nome: "Prof. Roberto Lima", materia: "História" },
  ];

  const handleEnviar = async () => {
    if (!professorSelecionado || !assunto || !mensagem) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para iniciar a conversa",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      await mensagensAPI.enviar({
        remetente_id: user.id,
        destinatario_id: parseInt(professorSelecionado),
        conteudo: `Assunto: ${assunto}\n\n${mensagem}`,
        tipo: 'texto'
      });

      toast({
        title: "Conversa iniciada!",
        description: "Sua mensagem foi enviada ao professor",
      });
      
      onSuccess();
      onClose();
      resetForm();
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Não foi possível iniciar a conversa no momento",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProfessorSelecionado("");
    setAssunto("");
    setMensagem("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Conversa</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="professor">Professor</Label>
            <Select value={professorSelecionado} onValueChange={setProfessorSelecionado}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um professor" />
              </SelectTrigger>
              <SelectContent>
                {professores.map((prof) => (
                  <SelectItem key={prof.id} value={prof.id.toString()}>
                    {prof.nome} - {prof.materia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="assunto">Assunto</Label>
            <Input
              id="assunto"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              placeholder="Ex: Dúvida sobre exercícios..."
            />
          </div>
          
          <div>
            <Label htmlFor="mensagem">Mensagem</Label>
            <Textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Descreva sua dúvida ou questão..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button onClick={handleEnviar} disabled={loading}>
              {loading ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovaConversaModal;