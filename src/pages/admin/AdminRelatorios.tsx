import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, FileText, BarChart3, TrendingUp, Users, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminRelatorios = () => {
  const { toast } = useToast();

  const dadosDesempenho = [
    { turma: "1º A", media: 8.2, aprovacao: 96 },
    { turma: "1º B", media: 7.8, aprovacao: 92 },
    { turma: "2º A", media: 8.5, aprovacao: 100 },
    { turma: "2º B", media: 8.0, aprovacao: 95 },
    { turma: "3º A", media: 8.7, aprovacao: 98 },
    { turma: "3º B", media: 8.3, aprovacao: 94 }
  ];

  const evolucaoNotas = [
    { bimestre: "1º Bim", media: 7.8 },
    { bimestre: "2º Bim", media: 8.1 },
    { bimestre: "3º Bim", media: 8.3 },
    { bimestre: "4º Bim", media: 8.2 }
  ];

  const distribuicaoFrequencia = [
    { faixa: "95-100%", alunos: 180, fill: "#10b981" },
    { faixa: "85-94%", alunos: 45, fill: "#3b82f6" },
    { faixa: "75-84%", alunos: 18, fill: "#f59e0b" },
    { faixa: "< 75%", alunos: 5, fill: "#ef4444" }
  ];

  const relatóriosDisponiveis = [
    {
      titulo: "Boletim Individual",
      descricao: "Boletim completo com notas e frequência por aluno",
      tipo: "PDF",
      icon: FileText
    },
    {
      titulo: "Relatório de Turma",
      descricao: "Desempenho geral da turma com estatísticas",
      tipo: "PDF",
      icon: Users
    },
    {
      titulo: "Análise de Disciplinas",
      descricao: "Performance por disciplina e professor",
      tipo: "PDF",
      icon: BarChart3
    },
    {
      titulo: "Frequência Escolar",
      descricao: "Relatório detalhado de presença dos alunos",
      tipo: "Excel",
      icon: TrendingUp
    },
    {
      titulo: "Relatório Administrativo",
      descricao: "Dados gerais da escola para secretaria",
      tipo: "PDF",
      icon: GraduationCap
    }
  ];

  const handleGerarRelatorio = (tipo: string) => {
    // Simular geração de relatório
    const loading = toast({
      title: "Gerando relatório...",
      description: `Processando ${tipo}. Aguarde...`,
    });

    // Simular delay de processamento
    setTimeout(() => {
      toast({
        title: "Relatório gerado!",
        description: `O relatório ${tipo} foi gerado e está sendo baixado.`,
      });
    }, 2000);
  };

  const handleExportarDados = (formato: string) => {
    toast({
      title: "Exportando dados!",
      description: `Dados exportados em formato ${formato}.`,
    });
  };

  const handleEnviarRelatorio = (email: string) => {
    toast({
      title: "Relatório enviado!",
      description: `Relatório enviado para ${email}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Análises e relatórios da escola virtual</p>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bimestre">Bimestre</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="semestre">Semestre</SelectItem>
              <SelectItem value="ano">Ano Letivo</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="desempenho" className="space-y-4">
        <TabsList>
          <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
          <TabsTrigger value="frequencia">Frequência</TabsTrigger>
          <TabsTrigger value="gerar">Gerar Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="desempenho" className="space-y-6">
          {/* Cards de Resumo */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">8.3</p>
                <p className="text-sm text-muted-foreground">Média Geral</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-education-green">96%</p>
                <p className="text-sm text-muted-foreground">Taxa de Aprovação</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-education-orange">92%</p>
                <p className="text-sm text-muted-foreground">Frequência Média</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-education-purple">248</p>
                <p className="text-sm text-muted-foreground">Total de Alunos</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Desempenho por Turma */}
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Turma</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosDesempenho}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="turma" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="media" fill="#10b981" name="Média" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Evolução das Notas */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução das Médias</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={evolucaoNotas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bimestre" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="media" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detalhamento por Turma */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhamento por Turma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dadosDesempenho.map((turma, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">{turma.turma}</h3>
                      <div className="flex gap-4 text-sm">
                        <span>Média: <strong>{turma.media}</strong></span>
                        <span>Aprovação: <strong>{turma.aprovacao}%</strong></span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Taxa de Aprovação</span>
                        <span>{turma.aprovacao}%</span>
                      </div>
                      <Progress value={turma.aprovacao} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequencia" className="space-y-6">
          {/* Distribuição de Frequência */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Frequência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={distribuicaoFrequencia}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ faixa, alunos }) => `${faixa}: ${alunos}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="alunos"
                    >
                      {distribuicaoFrequencia.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-4">
                  {distribuicaoFrequencia.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: item.fill }}
                        ></div>
                        <span className="font-medium">{item.faixa}</span>
                      </div>
                      <span className="text-lg font-bold">{item.alunos} alunos</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alertas de Frequência */}
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Alertas de Frequência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-red-800">Ana Silva Santos - 1º Ano A</p>
                      <p className="text-sm text-red-600">Frequência: 68% (Abaixo do mínimo)</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                      Contatar Responsável
                    </Button>
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-yellow-800">Carlos Oliveira - 2º Ano B</p>
                      <p className="text-sm text-yellow-600">Frequência: 74% (Próximo do limite)</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-yellow-600 border-yellow-600">
                      Acompanhar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gerar" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatóriosDisponiveis.map((relatorio, index) => (
              <Card key={index} className="hover:shadow-elegant transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-education-purple/10 rounded-lg">
                      <relatorio.icon className="h-6 w-6 text-education-purple" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{relatorio.titulo}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {relatorio.descricao}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {relatorio.tipo}
                        </span>
                        <Button 
                          size="sm"
                          onClick={() => handleGerarRelatorio(relatorio.titulo)}
                          className="bg-education-purple hover:bg-education-purple/90"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Gerar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filtros para Relatórios Personalizados */}
          <Card>
            <CardHeader>
              <CardTitle>Relatório Personalizado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Turma</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a turma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as Turmas</SelectItem>
                      <SelectItem value="1a">1º Ano A</SelectItem>
                      <SelectItem value="1b">1º Ano B</SelectItem>
                      <SelectItem value="2a">2º Ano A</SelectItem>
                      <SelectItem value="2b">2º Ano B</SelectItem>
                      <SelectItem value="3a">3º Ano A</SelectItem>
                      <SelectItem value="3b">3º Ano B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Período</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1bim">1º Bimestre</SelectItem>
                      <SelectItem value="2bim">2º Bimestre</SelectItem>
                      <SelectItem value="3bim">3º Bimestre</SelectItem>
                      <SelectItem value="4bim">4º Bimestre</SelectItem>
                      <SelectItem value="ano">Ano Completo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Formato</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Formato do arquivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Incluir informações</label>
                <div className="grid md:grid-cols-3 gap-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Notas</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Frequência</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Observações</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Gráficos</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Comparativos</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Estatísticas</span>
                  </label>
                </div>
              </div>
              
              <Button 
                className="bg-education-purple hover:bg-education-purple/90"
                onClick={() => handleGerarRelatorio("Personalizado")}
              >
                <Download className="h-4 w-4 mr-2" />
                Gerar Relatório Personalizado
              </Button>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline"
                  onClick={() => handleExportarDados("Excel")}
                  className="flex-1"
                >
                  Exportar Excel
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleEnviarRelatorio("admin@escola.com")}
                  className="flex-1"
                >
                  Enviar por E-mail
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRelatorios;