import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { FileText, Download, Calendar as CalendarIcon, BarChart3, Users, BookOpen, Printer, Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import ViewRelatorioModal from "@/components/modals/ViewRelatorioModal";

const SecretariaRelatorios = () => {
  const [dataInicio, setDataInicio] = useState<Date>();
  const [dataFim, setDataFim] = useState<Date>();
  const [tipoRelatorio, setTipoRelatorio] = useState("matriculas");
  const [selectedRelatorio, setSelectedRelatorio] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const { toast } = useToast();

  // Dados para gráficos
  const dadosMatriculas = [
    { mes: "Jan", ativas: 142, novas: 15, canceladas: 3 },
    { mes: "Fev", ativas: 156, novas: 18, canceladas: 4 },
    { mes: "Mar", ativas: 163, novas: 12, canceladas: 5 },
    { mes: "Abr", ativas: 171, novas: 20, canceladas: 2 },
    { mes: "Mai", ativas: 189, novas: 22, canceladas: 4 },
    { mes: "Jun", ativas: 205, novas: 25, canceladas: 3 }
  ];

  const dadosFrequencia = [
    { serie: "9º Ano", presencas: 92, faltas: 8 },
    { serie: "10º Ano", presencas: 89, faltas: 11 },
    { serie: "11º Ano", presencas: 94, faltas: 6 },
    { serie: "12º Ano", presencas: 91, faltas: 9 }
  ];

  const dadosPorSerie = [
    { name: "9º Ano", value: 45, color: "#8B5CF6" },
    { name: "10º Ano", value: 38, color: "#10B981" },
    { name: "11º Ano", value: 32, color: "#F59E0B" },
    { name: "12º Ano", value: 28, color: "#EF4444" }
  ];

  const relatoriosDisponiveis = [
    {
      id: 1,
      nome: "Relatório de Matrículas - Janeiro 2024",
      tipo: "matriculas",
      data: "01/02/2024",
      status: "concluido",
      tamanho: "2.3 MB"
    },
    {
      id: 2,
      nome: "Frequência Escolar - 1º Bimestre",
      tipo: "frequencia",
      data: "15/03/2024",
      status: "processando",
      tamanho: "1.8 MB"
    },
    {
      id: 3,
      nome: "Relatório de Documentos - Fevereiro",
      tipo: "documentos",
      data: "28/02/2024",
      status: "concluido",
      tamanho: "3.1 MB"
    },
    {
      id: 4,
      nome: "Desempenho Acadêmico - Q1 2024",
      tipo: "desempenho",
      data: "30/03/2024",
      status: "agendado",
      tamanho: "-"
    }
  ];

  const handleViewRelatorio = (relatorio: any) => {
    setSelectedRelatorio(relatorio);
    setShowViewModal(true);
  };

  const handleDeleteRelatorio = (nome: string) => {
    toast({
      title: "Relatório Removido",
      description: `O ${nome} foi removido do sistema.`,
      variant: "destructive"
    });
  };

  const handleGerarRelatorio = () => {
    toast({
      title: "Relatório Agendado",
      description: "O relatório será gerado e estará disponível em alguns minutos.",
    });
  };

  const handleBaixarRelatorio = (nome: string) => {
    toast({
      title: "Download Iniciado",
      description: `O download do ${nome} foi iniciado.`,
    });
  };

  const handlePrintRelatorio = (nome: string) => {
    toast({
      title: "Impressão Iniciada",
      description: `A impressão do ${nome} foi enviada para a impressora.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-education-green text-primary-foreground">Concluído</Badge>;
      case "processando":
        return <Badge className="bg-education-orange text-primary-foreground">Processando</Badge>;
      case "agendado":
        return <Badge variant="outline" className="border-primary text-primary">Agendado</Badge>;
      case "erro":
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "matriculas":
        return <Users className="h-4 w-4" />;
      case "frequencia":
        return <BarChart3 className="h-4 w-4" />;
      case "documentos":
        return <FileText className="h-4 w-4" />;
      case "desempenho":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Relatórios Administrativos</h1>
        <p className="text-muted-foreground">Geração e controle de relatórios institucionais</p>
      </div>

      <Tabs defaultValue="gerar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="gerar" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Gerar Relatório
          </TabsTrigger>
          <TabsTrigger value="historico" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Histórico
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gerar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurar Novo Relatório</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Relatório</label>
                  <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matriculas">Relatório de Matrículas</SelectItem>
                      <SelectItem value="frequencia">Frequência Escolar</SelectItem>
                      <SelectItem value="documentos">Controle de Documentos</SelectItem>
                      <SelectItem value="desempenho">Desempenho Acadêmico</SelectItem>
                      <SelectItem value="financeiro">Situação Financeira</SelectItem>
                      <SelectItem value="completo">Relatório Completo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Formato</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Início</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dataInicio ? format(dataInicio, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dataInicio}
                        onSelect={setDataInicio}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Fim</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dataFim ? format(dataFim, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dataFim}
                        onSelect={setDataFim}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Filtros Adicionais</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Série" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as séries</SelectItem>
                      <SelectItem value="9ano">9º Ano</SelectItem>
                      <SelectItem value="10ano">10º Ano</SelectItem>
                      <SelectItem value="11ano">11º Ano</SelectItem>
                      <SelectItem value="12ano">12º Ano</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Turma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as turmas</SelectItem>
                      <SelectItem value="ingles9">Inglês 9</SelectItem>
                      <SelectItem value="algebra1">Álgebra 1</SelectItem>
                      <SelectItem value="geometria">Geometria</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="bg-education-orange hover:bg-education-orange/90 w-full"
                onClick={handleGerarRelatorio}
              >
                <FileText className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Gerados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatoriosDisponiveis.map((relatorio) => (
                  <div key={relatorio.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded-lg">
                        {getTipoIcon(relatorio.tipo)}
                      </div>
                      <div>
                        <h3 className="font-medium">{relatorio.nome}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Gerado em: {relatorio.data}</span>
                          {relatorio.tamanho !== "-" && <span>Tamanho: {relatorio.tamanho}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(relatorio.status)}
                      {relatorio.status === "concluido" && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewRelatorio(relatorio)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleBaixarRelatorio(relatorio.nome)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePrintRelatorio(relatorio.nome)}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteRelatorio(relatorio.nome)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-4">
          {/* Estatísticas Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Alunos</p>
                    <p className="text-2xl font-bold text-foreground">205</p>
                  </div>
                  <Users className="h-8 w-8 text-education-orange" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Frequência Média</p>
                    <p className="text-2xl font-bold text-education-green">91.5%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-education-green" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Docs Pendentes</p>
                    <p className="text-2xl font-bold text-education-orange">23</p>
                  </div>
                  <FileText className="h-8 w-8 text-education-orange" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Relatórios Mês</p>
                    <p className="text-2xl font-bold text-primary">12</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Matrículas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosMatriculas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ativas" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="novas" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Série</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dadosPorSerie}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dadosPorSerie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Frequência por Série</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosFrequencia}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="serie" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="presencas" fill="#10B981" />
                    <Bar dataKey="faltas" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <ViewRelatorioModal
        open={showViewModal}
        onOpenChange={setShowViewModal}
        relatorio={selectedRelatorio}
      />
    </div>
  );
};

export default SecretariaRelatorios;