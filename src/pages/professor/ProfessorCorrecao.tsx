import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, FileText, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfessorCorrecao = () => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const { toast } = useToast();

  const tarefasPendentes = [
    {
      id: 1,
      aluno: "Ana Silva",
      tarefa: "Lista de Exercícios - Equações",
      turma: "1º Ano A",
      dataEntrega: "2024-01-29",
      status: "pendente"
    },
    {
      id: 2,
      aluno: "Carlos Oliveira",
      tarefa: "Prova - Funções",
      turma: "2º Ano B",
      dataEntrega: "2024-01-28",
      status: "pendente"
    }
  ];

  const tarefasCorrigidas = [
    {
      id: 3,
      aluno: "Maria Santos",
      tarefa: "Trabalho - Geometria",
      turma: "3º Ano A",
      dataEntrega: "2024-01-27",
      nota: 8.5,
      status: "corrigida"
    },
    {
      id: 4,
      aluno: "João Pereira",
      tarefa: "Lista de Exercícios - Trigonometria",
      turma: "3º Ano A",
      dataEntrega: "2024-01-26",
      nota: 9.0,
      status: "corrigida"
    }
  ];

  const handleCorrection = () => {
    toast({
      title: "Correção salva!",
      description: "A nota e comentários foram registrados.",
    });
    setSelectedTask(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Corrigir Tarefas</h1>
        <p className="text-muted-foreground">Avalie e corrija as atividades dos alunos</p>
      </div>

      <Tabs defaultValue="pendentes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pendentes" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pendentes ({tarefasPendentes.length})
          </TabsTrigger>
          <TabsTrigger value="corrigidas" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Corrigidas ({tarefasCorrigidas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes" className="space-y-4">
          <div className="grid gap-4">
            {tarefasPendentes.map((tarefa) => (
              <Card key={tarefa.id} className="hover:shadow-elegant transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{tarefa.aluno}</h3>
                      <p className="text-muted-foreground">{tarefa.tarefa}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{tarefa.turma}</span>
                        <span>Entregue em: {new Date(tarefa.dataEntrega).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      Pendente
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedTask(tarefa.id)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Arquivo
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-education-green hover:bg-education-green/90"
                      onClick={() => setSelectedTask(tarefa.id)}
                    >
                      Corrigir
                    </Button>
                  </div>

                  {selectedTask === tarefa.id && (
                    <div className="mt-4 p-4 border border-border rounded-lg bg-muted/50">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label>Nota (0-10)</Label>
                          <Input type="number" min="0" max="10" step="0.1" placeholder="8.5" />
                        </div>
                        <div className="space-y-2">
                          <Label>Avaliação</Label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-5 w-5 text-yellow-400 cursor-pointer" />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <Label>Comentários</Label>
                        <Textarea 
                          placeholder="Adicione comentários sobre a correção..."
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={handleCorrection}
                          className="bg-education-green hover:bg-education-green/90"
                        >
                          Salvar Correção
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedTask(null)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="corrigidas" className="space-y-4">
          <div className="grid gap-4">
            {tarefasCorrigidas.map((tarefa) => (
              <Card key={tarefa.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{tarefa.aluno}</h3>
                      <p className="text-muted-foreground">{tarefa.tarefa}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{tarefa.turma}</span>
                        <span>Entregue em: {new Date(tarefa.dataEntrega).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-education-green border-education-green mb-2">
                        Corrigida
                      </Badge>
                      <div className="text-2xl font-bold text-education-green">
                        {tarefa.nota.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessorCorrecao;