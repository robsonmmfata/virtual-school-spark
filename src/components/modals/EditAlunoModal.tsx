import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockAPI } from "@/lib/mockApi";

interface EditAlunoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aluno: {
    id: number;
    nome: string;
    email: string;
    turma: string;
    status: string;
    matricula: string;
    telefone: string;
    dataMatricula: string;
  } | null;
  onUpdate: () => void;
}

const EditAlunoModal = ({ open, onOpenChange, aluno, onUpdate }: EditAlunoModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aluno) return;

    setLoading(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const dados = {
        nome: formData.get('nome') as string,
        email: formData.get('email') as string,
        telefone: formData.get('telefone') as string,
        turma_id: formData.get('turma') as string,
        status: formData.get('status') as string
      };

      await mockAPI.alunos.atualizar(aluno.id, dados);
      
      toast({
        title: "Aluno atualizado!",
        description: `${dados.nome} foi atualizado com sucesso.`,
      });
      
      onUpdate();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao atualizar aluno",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!aluno) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Aluno</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Nome Completo</Label>
            <Input name="nome" defaultValue={aluno.nome} required />
          </div>
          
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input name="email" type="email" defaultValue={aluno.email} required />
          </div>
          
          <div className="space-y-2">
            <Label>Telefone</Label>
            <Input name="telefone" defaultValue={aluno.telefone} />
          </div>
          
          <div className="space-y-2">
            <Label>Turma</Label>
            <Select name="turma" defaultValue={aluno.turma}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1º Ano A">1º Ano A</SelectItem>
                <SelectItem value="1º Ano B">1º Ano B</SelectItem>
                <SelectItem value="2º Ano A">2º Ano A</SelectItem>
                <SelectItem value="2º Ano B">2º Ano B</SelectItem>
                <SelectItem value="3º Ano A">3º Ano A</SelectItem>
                <SelectItem value="3º Ano B">3º Ano B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Status</Label>
            <Select name="status" defaultValue={aluno.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Suspenso">Suspenso</SelectItem>
                <SelectItem value="Transferido">Transferido</SelectItem>
                <SelectItem value="Graduado">Graduado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Matrícula</Label>
            <Input value={aluno.matricula} disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">A matrícula não pode ser alterada</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-education-purple hover:bg-education-purple/90"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
            <Button 
              type="button"
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAlunoModal;