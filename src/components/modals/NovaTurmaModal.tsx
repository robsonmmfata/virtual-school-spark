import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface NovaTurmaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NovaTurmaModal = ({ open, onOpenChange }: NovaTurmaModalProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    serie: "",
    materia: "",
    descricao: "",
    capacidade: ""
  });
  const { toast } = useToast();

  const materiasPorSerie = {
    "9": ["Inglês 9", "Álgebra 1", "Curso de Ciências 1", "Educação Física", "Espanhol 1"],
    "10": ["Inglês 10", "Geometria", "Curso de Ciências 2", "História Mundial", "Educação Física", "Espanhol 2"],
    "11": ["Inglês 11", "Álgebra 2", "Curso de Ciências 3", "História dos EUA", "Computadores e TI", "Introdução à Programação"],
    "12": ["Finanças Pessoais", "Governo Americano", "Economia", "Espanhol 3", "Saúde"]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simular criação da turma
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Turma criada!",
        description: `A turma ${formData.nome} foi criada com sucesso.`,
      });
      
      // Reset form
      setFormData({
        nome: "",
        serie: "",
        materia: "",
        descricao: "",
        capacidade: ""
      });
      
      onOpenChange(false);
      
      // Aqui você faria a chamada real para a API
      // await api.post('/turmas', formData);
      
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar a turma.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Nova Turma</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serie">Série</Label>
            <Select 
              value={formData.serie} 
              onValueChange={(value) => setFormData({...formData, serie: value, materia: ""})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a série" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9">9º Ano</SelectItem>
                <SelectItem value="10">10º Ano</SelectItem>
                <SelectItem value="11">11º Ano</SelectItem>
                <SelectItem value="12">12º Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.serie && (
            <div className="space-y-2">
              <Label htmlFor="materia">Matéria</Label>
              <Select 
                value={formData.materia} 
                onValueChange={(value) => setFormData({...formData, materia: value, nome: `${formData.serie}º Ano - ${value}`})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a matéria" />
                </SelectTrigger>
                <SelectContent>
                  {materiasPorSerie[formData.serie as keyof typeof materiasPorSerie]?.map((materia) => (
                    <SelectItem key={materia} value={materia}>{materia}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Turma</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              placeholder="Ex: 9º Ano - Inglês 9"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacidade">Capacidade de Alunos</Label>
            <Input
              id="capacidade"
              type="number"
              value={formData.capacidade}
              onChange={(e) => setFormData({...formData, capacidade: e.target.value})}
              placeholder="30"
              min="1"
              max="50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição (opcional)</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              placeholder="Descrição da turma..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-education-green hover:bg-education-green/90"
            >
              Criar Turma
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NovaTurmaModal;