import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Upload,
  Calendar
} from "lucide-react";

const AlunoTarefas = () => {
  const tarefas = [
    {
      id: 1,
      titulo: "Lista de Exercícios - Funções Quadráticas",
      materia: "Matemática",
      professor: "Prof. Ana Silva",
      prazo: "25/03/2024",
      status: "pendente",
      pontuacao: 10,
      descricao: "Resolva os exercícios 1 a 15 da página 42 da apostila.",
      tempoRestante: "2 dias"
    },
    {
      id: 2,
      titulo: "Relatório - Experimento de Física",
      materia: "Física",
      professor: "Prof. Carlos Santos",
      prazo: "30/03/2024",
      status: "em-andamento",
      pontuacao: 15,
      descricao: "Elabore um relatório sobre o experimento de movimento uniformemente variado.",
      tempoRestante: "7 dias"
    },
    {
      id: 3,
      titulo: "Resenha - Dom Casmurro",
      materia: "Literatura",
      professor: "Prof. Marina Costa",
      prazo: "20/03/2024",
      status: "entregue",
      pontuacao: 8,
      descricao: "Escreva uma resenha crítica da obra Dom Casmurro de Machado de Assis.",
      tempoRestante: "Entregue",
      nota: 9.5
    },
    {
      id: 4,
      titulo: "Mapa Mental - Tabela Periódica",
      materia: "Química",
      professor: "Prof. Ana Silva",
      prazo: "28/03/2024",
      status: "atrasado",
      pontuacao: 12,
      descricao: "Crie um mapa mental organizando os elementos da tabela periódica.",
      tempoRestante: "2 dias atrasado"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">⏳ Pendente</Badge>;
      case "em-andamento":
        return <Badge className="bg-blue-500 hover:bg-blue-600">📝 Em Andamento</Badge>;
      case "entregue":
        return <Badge className="bg-green-500 hover:bg-green-600">✅ Entregue</Badge>;
      case "atrasado":
        return <Badge className="bg-red-500 hover:bg-red-600">⚠️ Atrasado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "em-andamento":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "entregue":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "atrasado":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const materiaColors: { [key: string]: string } = {
    "Matemática": "bg-blue-100 text-blue-800",
    "Física": "bg-green-100 text-green-800",
    "Literatura": "bg-purple-100 text-purple-800",
    "Química": "bg-orange-100 text-orange-800"
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas Tarefas</h1>
          <p className="text-muted-foreground">Acompanhe o status das suas atividades escolares</p>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-yellow-700">Pendentes</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <div className="text-sm text-blue-700">Em Andamento</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-green-700">Entregues</div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-red-700">Atrasadas</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Tarefas */}
      <div className="space-y-4">
        {tarefas.map((tarefa) => (
          <Card key={tarefa.id} className="hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(tarefa.status)}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{tarefa.titulo}</h3>
                        <p className="text-muted-foreground">{tarefa.professor}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={materiaColors[tarefa.materia]}>
                          {tarefa.materia}
                        </Badge>
                        {getStatusBadge(tarefa.status)}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{tarefa.descricao}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Prazo: {tarefa.prazo}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>Pontuação: {tarefa.pontuacao} pts</span>
                        </div>
                        {tarefa.nota && (
                          <div className="text-green-600 font-medium">
                            Nota: {tarefa.nota}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          tarefa.status === "atrasado" ? "text-red-600" : 
                          tarefa.status === "entregue" ? "text-green-600" : "text-foreground"
                        }`}>
                          {tarefa.tempoRestante}
                        </span>
                      </div>
                    </div>
                    
                    {tarefa.status !== "entregue" && (
                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <Upload className="h-4 w-4 mr-2" />
                          {tarefa.status === "em-andamento" ? "Enviar Tarefa" : "Iniciar Tarefa"}
                        </Button>
                        <Button variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </div>
                    )}
                    
                    {tarefa.status === "entregue" && (
                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Submissão
                        </Button>
                        <Button variant="outline">
                          Ver Feedback
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Próximas Entregas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Entregas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { tarefa: "Ensaio sobre Guerra Fria", materia: "História", prazo: "02/04" },
              { tarefa: "Exercícios de Derivadas", materia: "Matemática", prazo: "05/04" },
              { tarefa: "Relatório de Biologia", materia: "Biologia", prazo: "08/04" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{item.tarefa}</p>
                  <p className="text-sm text-muted-foreground">{item.materia}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">{item.prazo}</p>
                  <Button variant="ghost" size="sm">Ver detalhes</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlunoTarefas;