import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, MessageSquare, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const ProfessorTurmas = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const turmas = [
    {
      id: 1,
      nome: "1º Ano A - Matemática",
      alunos: 28,
      proximaAula: "2024-02-01 14:00",
      status: "Ativa"
    },
    {
      id: 2,
      nome: "2º Ano B - Matemática",
      alunos: 25,
      proximaAula: "2024-02-01 15:30",
      status: "Ativa"
    },
    {
      id: 3,
      nome: "3º Ano A - Matemática",
      alunos: 22,
      proximaAula: "2024-02-02 14:00",
      status: "Ativa"
    }
  ];

  const handleNovaTurma = () => {
    toast({
      title: "Nova turma",
      description: "Abrindo formulário para criar uma nova turma.",
    });
  };

  const handleVerAlunos = (nomeTurma: string) => {
    toast({
      title: "Lista de alunos",
      description: `Visualizando alunos da turma: ${nomeTurma}`,
    });
  };

  const handleChat = (nomeTurma: string) => {
    toast({
      title: "Chat da turma",
      description: `Abrindo chat da turma: ${nomeTurma}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('teacher.myGroups')}</h1>
          <p className="text-muted-foreground">Gerencie suas turmas e alunos</p>
        </div>
        <Button 
          className="bg-education-green hover:bg-education-green/90"
          onClick={handleNovaTurma}
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('teacher.createClass')}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {turmas.map((turma) => (
          <Card key={turma.id} className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{turma.nome}</CardTitle>
                <Badge variant="outline" className="text-education-green border-education-green">
                  {turma.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4 mr-2" />
                {turma.alunos} alunos
              </div>
              
              <div className="text-sm">
                <p className="text-muted-foreground">Próxima aula:</p>
                <p className="font-medium">{new Date(turma.proximaAula).toLocaleString('pt-BR')}</p>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleVerAlunos(turma.nome)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Alunos
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleChat(turma.nome)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfessorTurmas;