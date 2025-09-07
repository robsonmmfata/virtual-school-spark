import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, Calendar, BookOpen, GraduationCap, Users, Target } from "lucide-react";

interface ViewProfessorModalProps {
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
}

const ViewProfessorModal = ({ open, onOpenChange, professor }: ViewProfessorModalProps) => {
  if (!professor) return null;

  const estatisticas = {
    totalAlunos: professor.turmas.length * 30, // Estimativa
    aulasMinistradas: 45,
    avaliacoesCorrigidas: 120,
    mediaAvaliacoes: 4.8
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Perfil do Professor - {professor.nome}
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
                    <span className="font-medium">{professor.nome}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">E-mail:</span>
                    <span className="font-medium">{professor.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Telefone:</span>
                    <span className="font-medium">{professor.telefone}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Disciplina:</span>
                    <Badge variant="outline" className="text-education-green border-education-green">
                      {professor.disciplina}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Formação:</span>
                    <span className="font-medium">{professor.formacao}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Admissão:</span>
                    <span className="font-medium">{new Date(professor.dataAdmissao).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Badge 
                  variant={professor.status === "Ativo" ? "default" : "outline"}
                  className={professor.status === "Ativo" ? "bg-education-green hover:bg-education-green/90" : "text-education-orange border-education-orange"}
                >
                  {professor.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Turmas */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Turmas Atribuídas</h3>
              <div className="flex flex-wrap gap-2">
                {professor.turmas.map((turma, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                    {turma}
                  </Badge>
                ))}
              </div>
              {professor.turmas.length === 0 && (
                <p className="text-muted-foreground">Nenhuma turma atribuída</p>
              )}
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.totalAlunos}</p>
                <p className="text-sm text-muted-foreground">Total de Alunos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-education-green mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.aulasMinistradas}</p>
                <p className="text-sm text-muted-foreground">Aulas Ministradas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-education-orange mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.avaliacoesCorrigidas}</p>
                <p className="text-sm text-muted-foreground">Avaliações Corrigidas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <GraduationCap className="h-8 w-8 text-education-purple mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.mediaAvaliacoes}</p>
                <p className="text-sm text-muted-foreground">Média de Avaliações</p>
              </CardContent>
            </Card>
          </div>

          {/* Atividade Recente */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-education-green rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Aula ministrada - {professor.disciplina}</p>
                    <p className="text-xs text-muted-foreground">2 horas atrás • {professor.turmas[0]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-education-orange rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Avaliações corrigidas</p>
                    <p className="text-xs text-muted-foreground">1 dia atrás • 25 avaliações</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Material didático enviado</p>
                    <p className="text-xs text-muted-foreground">3 dias atrás • Lista de exercícios</p>
                  </div>
                </div>
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

export default ViewProfessorModal;