import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Aula {
  id: number;
  horario: string;
  disciplina: string;
  professor: string;
  sala: string;
  turma: string;
}

interface EditAulaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aula: Aula | null;
}

const EditAulaModal = ({ open, onOpenChange, aula }: EditAulaModalProps) => {
  const { toast } = useToast();

  if (!aula) return null;

  const handleSave = () => {
    toast({
      title: "Aula Atualizada",
      description: `A aula de ${aula.disciplina} foi atualizada com sucesso.`,
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    toast({
      title: "Aula Removida",
      description: `A aula de ${aula.disciplina} foi removida do horário.`,
      variant: "destructive"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Aula - {aula.disciplina}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Disciplina</Label>
              <Select defaultValue={aula.disciplina.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inglês 9">Inglês 9</SelectItem>
                  <SelectItem value="inglês 10">Inglês 10</SelectItem>
                  <SelectItem value="álgebra 1">Álgebra 1</SelectItem>
                  <SelectItem value="álgebra 2">Álgebra 2</SelectItem>
                  <SelectItem value="geometria">Geometria</SelectItem>
                  <SelectItem value="curso de ciências 1">Curso de Ciências 1</SelectItem>
                  <SelectItem value="história mundial">História Mundial</SelectItem>
                  <SelectItem value="história dos eua">História dos EUA</SelectItem>
                  <SelectItem value="economia">Economia</SelectItem>
                  <SelectItem value="governo americano">Governo Americano</SelectItem>
                  <SelectItem value="educação física">Educação Física</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Professor</Label>
              <Select defaultValue={aula.professor.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maria silva">Maria Silva</SelectItem>
                  <SelectItem value="joão santos">João Santos</SelectItem>
                  <SelectItem value="ana costa">Ana Costa</SelectItem>
                  <SelectItem value="carlos lima">Carlos Lima</SelectItem>
                  <SelectItem value="pedro alves">Pedro Alves</SelectItem>
                  <SelectItem value="fernanda rocha">Fernanda Rocha</SelectItem>
                  <SelectItem value="roberto dias">Roberto Dias</SelectItem>
                  <SelectItem value="lucia fernandes">Lucia Fernandes</SelectItem>
                  <SelectItem value="marcos oliveira">Marcos Oliveira</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Horário</Label>
              <Input type="time" defaultValue={aula.horario} />
            </div>
            <div className="space-y-2">
              <Label>Sala</Label>
              <Select defaultValue={aula.sala.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="101">Sala 101</SelectItem>
                  <SelectItem value="102">Sala 102</SelectItem>
                  <SelectItem value="103">Sala 103</SelectItem>
                  <SelectItem value="104">Sala 104</SelectItem>
                  <SelectItem value="105">Sala 105</SelectItem>
                  <SelectItem value="lab 1">Lab 1</SelectItem>
                  <SelectItem value="quadra">Quadra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Turma</Label>
              <Input defaultValue={aula.turma} />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="destructive" onClick={handleDelete}>
              Remover Aula
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button 
                className="bg-education-green hover:bg-education-green/90"
                onClick={handleSave}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAulaModal;