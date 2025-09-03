import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, BookOpen, CheckCircle } from "lucide-react";

const ProfessorDesempenho = () => {
  const stats = [
    {
      title: "Total de Alunos",
      value: "75",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Tarefas Corrigidas",
      value: "142",
      icon: CheckCircle,
      color: "text-education-green"
    },
    {
      title: "Aulas Ministradas",
      value: "28",
      icon: BookOpen,
      color: "text-education-orange"
    },
    {
      title: "Média Geral",
      value: "8.2",
      icon: TrendingUp,
      color: "text-education-purple"
    }
  ];

  const notasPorTurma = [
    { turma: "9º Ano - Álgebra 1", media: 7.8, aprovados: 26, total: 28 },
    { turma: "10º Ano - Geometria", media: 8.1, aprovados: 23, total: 25 },
    { turma: "11º Ano - História dos EUA", media: 8.7, aprovados: 21, total: 22 },
    { turma: "12º Ano - Economia", media: 8.4, aprovados: 19, total: 20 }
  ];

  const dadosGrafico = [
    { mes: "Jan", media: 7.5 },
    { mes: "Fev", media: 8.1 },
    { mes: "Mar", media: 7.9 },
    { mes: "Abr", media: 8.3 },
    { mes: "Mai", media: 8.2 }
  ];

  const distribuicaoNotas = [
    { faixa: "9-10", quantidade: 15, fill: "#10b981" },
    { faixa: "7-8.9", quantidade: 35, fill: "#3b82f6" },
    { faixa: "5-6.9", quantidade: 20, fill: "#f59e0b" },
    { faixa: "0-4.9", quantidade: 5, fill: "#ef4444" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Desempenho</h1>
        <p className="text-muted-foreground">Análise do desempenho das suas turmas</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="turmas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="turmas">Por Turma</TabsTrigger>
          <TabsTrigger value="evolucao">Evolução</TabsTrigger>
          <TabsTrigger value="distribuicao">Distribuição</TabsTrigger>
        </TabsList>

        <TabsContent value="turmas" className="space-y-4">
          <div className="grid gap-6">
            {notasPorTurma.map((turma, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{turma.turma}</CardTitle>
                    <Badge variant="outline" className="text-education-green border-education-green">
                      Média: {turma.media.toFixed(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Taxa de Aprovação</p>
                      <Progress 
                        value={(turma.aprovados / turma.total) * 100} 
                        className="h-2"
                      />
                      <p className="text-sm mt-1">
                        {turma.aprovados} de {turma.total} alunos ({((turma.aprovados / turma.total) * 100).toFixed(0)}%)
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-education-green">
                          {turma.media.toFixed(1)}
                        </div>
                        <p className="text-sm text-muted-foreground">Média da Turma</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="evolucao">
          <Card>
            <CardHeader>
              <CardTitle>Evolução das Médias</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar dataKey="media" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribuicao">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={distribuicaoNotas}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ faixa, quantidade }) => `${faixa}: ${quantidade}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="quantidade"
                  >
                    {distribuicaoNotas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessorDesempenho;