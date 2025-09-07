import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { mockAPI } from "@/lib/mockApi";

interface EditProfessorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  professor: {
    id: number;
    nome: string;
    email: string;
    disciplina: string;
    turmas: string[];
    status: string;
    telefone: string;
    formacao: string;
    dataAdmissao: string;
  } | null;
  onUpdate: () => void;
}

const EditProfessorModal = ({ open, onOpenChange, professor, onUpdate }: EditProfessorModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedTurmas, setSelectedTurmas] = useState<string[]>(professor?.turmas || []);

  const turmasDisponiveis = ["1º Ano A", "1º Ano B", "2º Ano A", "2º Ano B", "3º Ano A", "3º Ano B"];

  const handleTurmaChange = (turma: string, checked: boolean) => {
    if (checked) {
      setSelectedTurmas([...selectedTurmas, turma]);
    } else {
      setSelectedTurmas(selectedTurmas.filter(t => t !== turma));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!professor) return;

    setLoading(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const dados = {
        nome: formData.get('nome') as string,
        email: formData.get('email') as string,
        telefone: formData.get('telefone') as string,
        disciplina: formData.get('disciplina') as string,
        formacao: formData.get('formacao') as string,
        status: formData.get('status') as string,
        turmas: selectedTurmas
      };

      await mockAPI.professores.atualizar(professor.id, dados);
      
      toast({
        title: "Professor atualizado!",
        description: `${dados.nome} foi atualizado com sucesso.`,
      });
      
      onUpdate();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao atualizar professor",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!professor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Professor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input name="nome" defaultValue={professor.nome} required />
            </div>
            
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input name="email" type="email" defaultValue={professor.email} required />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input name="telefone" defaultValue={professor.telefone} />
            </div>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <Select name="status" defaultValue={professor.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Férias">Férias</SelectItem>
                  <SelectItem value="Licença">Licença</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Disciplina Principal</Label>
            <Select name="disciplina" defaultValue={professor.disciplina}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Matemática">Matemática</SelectItem>
                <SelectItem value="Física">Física</SelectItem>
                <SelectItem value="Química">Química</SelectItem>
                <SelectItem value="Biologia">Biologia</SelectItem>
                <SelectItem value="História">História</SelectItem>
                <SelectItem value="Geografia">Geografia</SelectItem>
                <SelectItem value="Português">Português</SelectItem>
                <SelectItem value="Inglês">Inglês</SelectItem>
                <SelectItem value="Educação Física">Educação Física</SelectItem>
                <SelectItem value="Arte">Arte</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Formação</Label>
            <Input name="formacao" defaultValue={professor.formacao} />
          </div>
          
          <div className="space-y-2">
            <Label>Turmas Atribuídas</Label>
            <div className="grid grid-cols-2 gap-2 p-3 border rounded-lg max-h-32 overflow-y-auto">
              {turmasDisponiveis.map((turma) => (
                <div key={turma} className="flex items-center space-x-2">
                  <Checkbox 
                    id={turma}
                    checked={selectedTurmas.includes(turma)}
                    onCheckedChange={(checked) => handleTurmaChange(turma, checked as boolean)}
                  />
                  <Label htmlFor={turma} className="text-sm">{turma}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Data de Admissão</Label>
            <Input 
              value={new Date(professor.dataAdmissao).toLocaleDateString('pt-BR')} 
              disabled 
              className="bg-muted" 
            />
            <p className="text-xs text-muted-foreground">A data de admissão não pode ser alterada</p>
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

export default EditProfessorModal;