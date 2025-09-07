import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, Calendar, BookOpen, Target, Clock } from "lucide-react";

interface ViewAlunoModalProps {
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
}

const ViewAlunoModal = ({ open, onOpenChange, aluno }: ViewAlunoModalProps) => {
  if (!aluno) return null;

  const dadosDesempenho = [
    { disciplina: "Matemática", nota: 8.5, frequencia: 95 },
    { disciplina: "Português", nota: 7.8, frequencia: 92 },
    { disciplina: "História", nota: 9.0, frequencia: 98 },
    { disciplina: "Geografia", nota: 8.2, frequencia: 90 },
    { disciplina: "Física", nota: 7.5, frequencia: 88 },
  ];

  const mediaGeral = dadosDesempenho.reduce((acc, d) => acc + d.nota, 0) / dadosDesempenho.length;
  const frequenciaMedia = dadosDesempenho.reduce((acc, d) => acc + d.frequencia, 0) / dadosDesempenho.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Perfil do Aluno - {aluno.nome}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Nome:</span>
                    <span className="font-medium">{aluno.nome}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">E-mail:</span>
                    <span className="font-medium">{aluno.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Telefone:</span>
                    <span className="font-medium">{aluno.telefone}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Matrícula:</span>
                    <span className="font-medium">{aluno.matricula}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Turma:</span>
                    <Badge variant="outline">{aluno.turma}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Matrícula em:</span>
                    <span className="font-medium">{new Date(aluno.dataMatricula).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Badge 
                  variant={aluno.status === "Ativo" ? "default" : "destructive"}
                  className={aluno.status === "Ativo" ? "bg-education-green hover:bg-education-green/90" : ""}
                >
                  {aluno.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Resumo Acadêmico */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{mediaGeral.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Média Geral</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-education-green mx-auto mb-2" />
                <p className="text-2xl font-bold">{frequenciaMedia.toFixed(0)}%</p>
                <p className="text-sm text-muted-foreground">Frequência</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-education-orange mx-auto mb-2" />
                <p className="text-2xl font-bold">{dadosDesempenho.length}</p>
                <p className="text-sm text-muted-foreground">Disciplinas</p>
              </CardContent>
            </Card>
          </div>

          {/* Desempenho por Disciplina */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Desempenho por Disciplina</h3>
              <div className="space-y-4">
                {dadosDesempenho.map((disciplina, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{disciplina.disciplina}</h4>
                      <div className="flex gap-4">
                        <Badge variant="outline">Nota: {disciplina.nota}</Badge>
                        <Badge variant="outline">Freq: {disciplina.frequencia}%</Badge>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Nota</span>
                          <span>{disciplina.nota}/10</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(disciplina.nota / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Frequência</span>
                          <span>{disciplina.frequencia}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-education-green h-2 rounded-full" 
                            style={{ width: `${disciplina.frequencia}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button className="flex-1">Enviar Mensagem</Button>
            <Button variant="outline" className="flex-1">Editar Informações</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAlunoModal;