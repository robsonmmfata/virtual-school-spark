import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Users, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AlunoAulas = () => {
  const { toast } = useToast();
  
  const aulas = [
    {
      id: 1,
      titulo: "Matemática - Funções Quadráticas",
      professor: "Prof. Ana Silva",
      horario: "14:00 - 15:30",
      data: "Hoje",
      status: "ao-vivo",
      participantes: 24,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      descricao: "Estudo completo sobre funções quadráticas, gráficos e aplicações práticas."
    },
    {
      id: 2,
      titulo: "Física - Cinemática",
      professor: "Prof. Carlos Santos",
      horario: "16:00 - 17:30",
      data: "Hoje",
      status: "agendado",
      participantes: 28,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      descricao: "Movimento uniformemente variado e suas aplicações no cotidiano."
    },
    {
      id: 3,
      titulo: "Literatura - Machado de Assis",
      professor: "Prof. Marina Costa",
      horario: "09:00 - 10:30",
      data: "Ontem",
      status: "gravado",
      participantes: 32,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      descricao: "Análise das principais obras de Machado de Assis e características realistas."
    },
    {
      id: 4,
      titulo: "Química - Ligações Químicas",
      professor: "Prof. Ana Silva",
      horario: "10:00 - 11:30",
      data: "26/03",
      status: "gravado",
      participantes: 25,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      descricao: "Tipos de ligações químicas: iônica, covalente e metálica."
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ao-vivo":
        return <Badge className="bg-red-500 hover:bg-red-600">🔴 Ao Vivo</Badge>;
      case "agendado":
        return <Badge variant="secondary">📅 Agendado</Badge>;
      case "gravado":
        return <Badge variant="outline">📹 Gravado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleEntrarAula = (titulo: string) => {
    toast({
      title: "Entrando na aula...",
      description: `Conectando à aula: ${titulo}`,
    });
  };

  const handleLembrete = (titulo: string) => {
    toast({
      title: "Lembrete ativado!",
      description: `Você será notificado antes da aula: ${titulo}`,
    });
  };

  const handleAssistirGravacao = (titulo: string) => {
    toast({
      title: "Reproduzindo aula...",
      description: `Iniciando reprodução: ${titulo}`,
    });
  };

  const handleFavoritar = (titulo: string) => {
    toast({
      title: "Adicionado aos favoritos!",
      description: `Aula salva: ${titulo}`,
    });
  };

  const handleVerDetalhes = (titulo: string) => {
    toast({
      title: "Detalhes da aula",
      description: `Visualizando informações de: ${titulo}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas Aulas</h1>
          <p className="text-muted-foreground">Assista suas aulas ao vivo ou gravadas</p>
        </div>
      </div>

      {/* Aula ao Vivo (se houver) */}
      {aulas.find(aula => aula.status === "ao-vivo") && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 p-6 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">🔴 Aula Acontecendo Agora!</h2>
              <p className="text-foreground/80">{aulas.find(aula => aula.status === "ao-vivo")?.titulo}</p>
            </div>
            <Button 
              className="bg-red-500 hover:bg-red-600"
              onClick={() => handleEntrarAula(aulas.find(aula => aula.status === "ao-vivo")?.titulo || "")}
            >
              <Play className="h-4 w-4 mr-2" />
              Entrar na Aula
            </Button>
          </div>
        </div>
      )}

      {/* Lista de Aulas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aulas.map((aula) => (
          <Card key={aula.id} className="hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{aula.titulo}</CardTitle>
                  <p className="text-sm text-muted-foreground">{aula.professor}</p>
                </div>
                {getStatusBadge(aula.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{aula.descricao}</p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{aula.horario}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{aula.participantes}</span>
                  </div>
                </div>
                <span className="font-medium">{aula.data}</span>
              </div>

              {/* Video Player */}
              {aula.status === "gravado" && (
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    src={aula.videoUrl}
                    title={aula.titulo}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="flex space-x-2">
                {aula.status === "ao-vivo" && (
                  <Button 
                    className="flex-1 bg-red-500 hover:bg-red-600"
                    onClick={() => handleEntrarAula(aula.titulo)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Entrar na Aula
                  </Button>
                )}
                {aula.status === "agendado" && (
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleLembrete(aula.titulo)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Lembrar-me
                  </Button>
                )}
                {aula.status === "gravado" && (
                  <Button 
                    className="flex-1"
                    onClick={() => handleAssistirGravacao(aula.titulo)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Assistir Gravação
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleFavoritar(aula.titulo)}
                >
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Próximas Aulas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Aulas da Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { dia: "Quarta-feira", aula: "Biologia - Genética", horario: "14:00" },
              { dia: "Quinta-feira", aula: "História - Revolução Industrial", horario: "15:00" },
              { dia: "Sexta-feira", aula: "Geografia - Climatologia", horario: "16:00" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{item.aula}</p>
                  <p className="text-sm text-muted-foreground">{item.dia}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">{item.horario}</p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleVerDetalhes(item.aula)}
                  >
                    Ver detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlunoAulas;