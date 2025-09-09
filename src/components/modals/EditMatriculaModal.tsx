import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Matricula {
  id: number;
  nome: string;
  email: string;
  serie: string;
  turma: string;
  dataMatricula: string;
  responsavel: string;
  telefone: string;
  status: string;
  documentosPendentes: string[];
}

interface EditMatriculaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matricula: Matricula | null;
}

const EditMatriculaModal = ({ open, onOpenChange, matricula }: EditMatriculaModalProps) => {
  const { toast } = useToast();

  if (!matricula) return null;

  const handleSave = () => {
    toast({
      title: "Matrícula Atualizada",
      description: `A matrícula de ${matricula.nome} foi atualizada com sucesso.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Matrícula - {matricula.nome}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input defaultValue={matricula.nome} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" defaultValue={matricula.email} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Série</Label>
              <Select defaultValue={matricula.serie.toLowerCase().replace('º', '').replace(' ', '')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9ano">9º Ano</SelectItem>
                  <SelectItem value="10ano">10º Ano</SelectItem>
                  <SelectItem value="11ano">11º Ano</SelectItem>
                  <SelectItem value="12ano">12º Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Turma Principal</Label>
              <Select defaultValue={matricula.turma.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inglês 9">Inglês 9</SelectItem>
                  <SelectItem value="álgebra 1">Álgebra 1</SelectItem>
                  <SelectItem value="geometria">Geometria</SelectItem>
                  <SelectItem value="história dos eua">História dos EUA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome do Responsável</Label>
              <Input defaultValue={matricula.responsavel} />
            </div>
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input defaultValue={matricula.telefone} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status da Matrícula</Label>
            <Select defaultValue={matricula.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="rejeitada">Rejeitada</SelectItem>
                <SelectItem value="suspensa">Suspensa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Documentos Pendentes</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {matricula.documentosPendentes.map((doc, index) => (
                <Badge key={index} variant="outline" className="border-red-500 text-red-500">
                  {doc}
                </Badge>
              ))}
            </div>
            <Input placeholder="Adicionar documento pendente..." />
          </div>

          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea placeholder="Observações adicionais sobre a matrícula..." />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              className="bg-education-green hover:bg-education-green/90"
              onClick={handleSave}
            >
              Salvar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMatriculaModal;