import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, MessageSquare, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import NovaTurmaModal from "@/components/modals/NovaTurmaModal";
import VisualizarAlunosModal from "@/components/modals/VisualizarAlunosModal";
import ChatTurmaModal from "@/components/modals/ChatTurmaModal";

const ProfessorTurmas = () => {
  const [novaTurmaOpen, setNovaTurmaOpen] = useState(false);
  const [visualizarAlunosOpen, setVisualizarAlunosOpen] = useState(false);
  const [chatTurmaOpen, setChatTurmaOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState("");
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const turmas = [
    {
      id: 1,
      nome: "9º Ano - Inglês 9",
      alunos: 28,
      proximaAula: "2024-02-01 14:00",
      status: "Ativa"
    },
    {
      id: 2,
      nome: "9º Ano - Álgebra 1",
      alunos: 25,
      proximaAula: "2024-02-01 15:30",
      status: "Ativa"
    },
    {
      id: 3,
      nome: "10º Ano - Geometria",
      alunos: 22,
      proximaAula: "2024-02-02 14:00",
      status: "Ativa"
    },
    {
      id: 4,
      nome: "10º Ano - História Mundial",
      alunos: 26,
      proximaAula: "2024-02-02 15:30",
      status: "Ativa"
    },
    {
      id: 5,
      nome: "11º Ano - História dos EUA",
      alunos: 24,
      proximaAula: "2024-02-03 14:00",
      status: "Ativa"
    },
    {
      id: 6,
      nome: "12º Ano - Economia",
      alunos: 20,
      proximaAula: "2024-02-03 15:30",
      status: "Ativa"
    }
  ];

  const handleNovaTurma = () => {
    setNovaTurmaOpen(true);
  };

  const handleVerAlunos = (nomeTurma: string) => {
    setSelectedTurma(nomeTurma);
    setVisualizarAlunosOpen(true);
  };

  const handleChat = (nomeTurma: string) => {
    setSelectedTurma(nomeTurma);
    setChatTurmaOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('teacher.myGroups')}</h1>
          <p className="text-muted-foreground">{t('common.manageStudentsTeachers')}</p>
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
                  {t('common.active')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4 mr-2" />
                {turma.alunos} {t('common.studentsCount')}
              </div>
              
              <div className="text-sm">
                <p className="text-muted-foreground">{t('common.nextClass')}:</p>
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
                  {t('common.viewStudents')}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleChat(turma.nome)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {t('common.chat')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modais */}
      <NovaTurmaModal 
        open={novaTurmaOpen} 
        onOpenChange={setNovaTurmaOpen} 
      />
      
      <VisualizarAlunosModal 
        open={visualizarAlunosOpen} 
        onOpenChange={setVisualizarAlunosOpen}
        turma={selectedTurma}
      />
      
      <ChatTurmaModal 
        open={chatTurmaOpen} 
        onOpenChange={setChatTurmaOpen}
        turma={selectedTurma}
      />
    </div>
  );
};

export default ProfessorTurmas;