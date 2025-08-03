import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Video, 
  CheckSquare,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AlunoCronograma = () => {
  const { toast } = useToast();
  
  const eventos = [
    {
      id: 1,
      tipo: "aula",
      titulo: "Matemática - Funções",
      horario: "14:00 - 15:30",
      professor: "Prof. Ana Silva",
      sala: "Sala Virtual 1"
    },
    {
      id: 2,
      tipo: "tarefa",
      titulo: "Entrega Lista de Física",
      horario: "23:59",
      materia: "Física",
      status: "pendente"
    },
    {
      id: 3,
      tipo: "aula",
      titulo: "Literatura - Machado de Assis",
      horario: "16:00 - 17:30",
      professor: "Prof. Marina Costa",
      sala: "Sala Virtual 2"
    }
  ];

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

  const criarCalendario = () => {
    const calendario = [];
    const primeiroDiaSemana = primeiroDia.getDay();
    
    // Adicionar dias do mês anterior
    for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
      const dia = new Date(primeiroDia);
      dia.setDate(dia.getDate() - i - 1);
      calendario.push({ dia: dia.getDate(), isOutroMes: true });
    }
    
    // Adicionar dias do mês atual
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      calendario.push({ dia, isOutroMes: false });
    }
    
    return calendario;
  };

  const calendario = criarCalendario();
  const diaAtual = hoje.getDate();

  const getEventoIcon = (tipo: string) => {
    switch (tipo) {
      case "aula":
        return <Video className="h-4 w-4 text-blue-500" />;
      case "tarefa":
        return <CheckSquare className="h-4 w-4 text-orange-500" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const handlePreviousMonth = () => {
    toast({
      title: "Mês anterior",
      description: "Navegando para o mês anterior.",
    });
  };

  const handleNextMonth = () => {
    toast({
      title: "Próximo mês",
      description: "Navegando para o próximo mês.",
    });
  };

  const handleSelectDay = (dia: number) => {
    toast({
      title: `Dia ${dia} selecionado`,
      description: "Visualizando eventos do dia selecionado.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cronograma de Estudos</h1>
          <p className="text-muted-foreground">Organize sua rotina de estudos e compromissos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Março 2024</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handlePreviousMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleNextMonth}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {diasSemana.map((dia) => (
                <div key={dia} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {dia}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendario.map((item, index) => (
                <div
                  key={index}
                  className={`
                    relative p-2 h-12 text-center text-sm border rounded-lg cursor-pointer transition-colors duration-200
                    ${item.isOutroMes 
                      ? 'text-muted-foreground bg-muted/30' 
                      : 'text-foreground hover:bg-muted'
                    }
                    ${item.dia === diaAtual && !item.isOutroMes
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : ''
                    }
                  `}
                  onClick={() => !item.isOutroMes && handleSelectDay(item.dia)}
                >
                  {item.dia}
                  {/* Indicadores de eventos */}
                  {item.dia === diaAtual && !item.isOutroMes && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      <div className="w-1 h-1 bg-education-orange rounded-full"></div>
                      <div className="w-1 h-1 bg-education-green rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Eventos de Hoje */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Hoje - 23/03</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="p-3 border border-border rounded-lg space-y-2 hover:shadow-card transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getEventoIcon(evento.tipo)}
                    <span className="font-medium text-sm">{evento.titulo}</span>
                  </div>
                  <Badge variant={evento.tipo === "aula" ? "default" : "outline"}>
                    {evento.tipo}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{evento.horario}</span>
                  </div>
                  {evento.professor && (
                    <div className="mt-1">
                      {evento.professor} • {evento.sala}
                    </div>
                  )}
                  {evento.materia && (
                    <div className="mt-1">
                      {evento.materia}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Visão Semanal */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {[
              { dia: "Dom", data: "24", eventos: [] },
              { dia: "Seg", data: "25", eventos: ["Matemática 14h", "Tarefa Física"] },
              { dia: "Ter", data: "26", eventos: ["Literatura 16h"] },
              { dia: "Qua", data: "27", eventos: ["Química 15h", "Prova História"] },
              { dia: "Qui", data: "28", eventos: ["Física 14h"] },
              { dia: "Sex", data: "29", eventos: ["Biologia 16h", "Tarefa Matemática"] },
              { dia: "Sáb", data: "30", eventos: ["Revisão Geral"] }
            ].map((dia, index) => (
              <div key={index} className="space-y-2">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground">{dia.dia}</div>
                  <div className="text-lg font-bold text-foreground">{dia.data}</div>
                </div>
                <div className="space-y-1">
                  {dia.eventos.map((evento, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="text-xs bg-muted p-2 rounded text-center"
                    >
                      {evento}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">Aulas esta semana</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-orange">5</div>
            <div className="text-sm text-muted-foreground">Tarefas pendentes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-green">8</div>
            <div className="text-sm text-muted-foreground">Horas de estudo</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-purple">2</div>
            <div className="text-sm text-muted-foreground">Provas próximas</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlunoCronograma;