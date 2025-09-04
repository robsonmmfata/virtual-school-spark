import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Download, Upload, Award, GraduationCap, Eye, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SecretariaDocumentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const { toast } = useToast();

  const documentos = [
    {
      id: 1,
      aluno: "Ana Silva Santos",
      serie: "9º Ano",
      tipo: "historico",
      nome: "Histórico Escolar - 8º Ano",
      dataEmissao: "15/12/2023",
      status: "aprovado",
      observacoes: "Documento completo e validado"
    },
    {
      id: 2,
      aluno: "Carlos Oliveira Lima",
      serie: "10º Ano",
      tipo: "certificado",
      nome: "Certificado de Conclusão - 9º Ano",
      dataEmissao: "20/12/2023",
      status: "pendente",
      observacoes: "Aguardando assinatura da direção"
    },
    {
      id: 3,
      aluno: "Maria Santos Costa",
      serie: "11º Ano",
      tipo: "declaracao",
      nome: "Declaração de Matrícula",
      dataEmissao: "10/01/2024",
      status: "aprovado",
      observacoes: "Emitido para processo seletivo"
    },
    {
      id: 4,
      aluno: "João Pedro Alves",
      serie: "12º Ano",
      tipo: "diploma",
      nome: "Diploma Ensino Médio",
      dataEmissao: "15/01/2024",
      status: "em_analise",
      observacoes: "Aguardando validação final"
    }
  ];

  const solicitacoes = [
    {
      id: 1,
      aluno: "Lucas Silva",
      documento: "Histórico Escolar",
      data: "02/02/2024",
      status: "nova",
      urgencia: "normal"
    },
    {
      id: 2,
      aluno: "Fernanda Costa",
      documento: "Declaração de Matrícula",
      data: "01/02/2024",
      status: "processando",
      urgencia: "alta"
    }
  ];

  const handleGerarDocumento = (tipo: string, aluno: string) => {
    toast({
      title: "Documento Gerado",
      description: `${tipo} para ${aluno} foi gerado com sucesso.`,
    });
  };

  const handleAprovarDocumento = (id: number, nome: string) => {
    toast({
      title: "Documento Aprovado",
      description: `${nome} foi aprovado e está disponível.`,
    });
  };

  const filteredDocumentos = documentos.filter(doc => {
    const matchesSearch = doc.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || doc.tipo === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-education-green text-primary-foreground">Aprovado</Badge>;
      case "pendente":
        return <Badge variant="outline" className="border-education-orange text-education-orange">Pendente</Badge>;
      case "em_analise":
        return <Badge variant="outline" className="border-primary text-primary">Em Análise</Badge>;
      case "rejeitado":
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "historico":
        return <FileText className="h-4 w-4" />;
      case "certificado":
        return <Award className="h-4 w-4" />;
      case "diploma":
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gestão de Documentos</h1>
        <p className="text-muted-foreground">Controle de históricos, certificados e declarações</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Documentos Emitidos</p>
                <p className="text-2xl font-bold text-foreground">1.234</p>
              </div>
              <FileText className="h-8 w-8 text-education-orange" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-education-orange">23</p>
              </div>
              <Upload className="h-8 w-8 text-education-orange" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Este Mês</p>
                <p className="text-2xl font-bold text-education-green">87</p>
              </div>
              <Award className="h-8 w-8 text-education-green" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Solicitações</p>
                <p className="text-2xl font-bold text-primary">12</p>
              </div>
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Solicitações Recentes */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Solicitações Recentes</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-education-orange hover:bg-education-orange/90">
                  <FileText className="h-4 w-4 mr-2" />
                  Novo Documento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Gerar Novo Documento</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Aluno</Label>
                    <Input placeholder="Nome do aluno" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Documento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="historico">Histórico Escolar</SelectItem>
                        <SelectItem value="certificado">Certificado</SelectItem>
                        <SelectItem value="declaracao">Declaração</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Observações</Label>
                    <Textarea placeholder="Observações adicionais..." />
                  </div>
                  <Button className="bg-education-orange hover:bg-education-orange/90">
                    Gerar Documento
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Urgência</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {solicitacoes.map((solicitacao) => (
                <TableRow key={solicitacao.id}>
                  <TableCell className="font-medium">{solicitacao.aluno}</TableCell>
                  <TableCell>{solicitacao.documento}</TableCell>
                  <TableCell>{solicitacao.data}</TableCell>
                  <TableCell>
                    {solicitacao.status === "nova" && (
                      <Badge variant="outline" className="border-primary text-primary">Nova</Badge>
                    )}
                    {solicitacao.status === "processando" && (
                      <Badge className="bg-education-orange text-primary-foreground">Processando</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {solicitacao.urgencia === "alta" && (
                      <Badge variant="destructive">Alta</Badge>
                    )}
                    {solicitacao.urgencia === "normal" && (
                      <Badge variant="secondary">Normal</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-education-green hover:bg-education-green/90"
                        onClick={() => handleGerarDocumento(solicitacao.documento, solicitacao.aluno)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Filtros e Busca */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por aluno ou documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tipo de documento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="historico">Histórico Escolar</SelectItem>
            <SelectItem value="certificado">Certificado</SelectItem>
            <SelectItem value="declaracao">Declaração</SelectItem>
            <SelectItem value="diploma">Diploma</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Emitidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Aluno</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Data Emissão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocumentos.map((documento) => (
                <TableRow key={documento.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTipoIcon(documento.tipo)}
                      <span className="capitalize">{documento.tipo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{documento.aluno}</p>
                      <p className="text-sm text-muted-foreground">{documento.serie}</p>
                    </div>
                  </TableCell>
                  <TableCell>{documento.nome}</TableCell>
                  <TableCell>{documento.dataEmissao}</TableCell>
                  <TableCell>{getStatusBadge(documento.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Printer className="h-4 w-4" />
                      </Button>
                      {documento.status === "pendente" && (
                        <Button 
                          size="sm" 
                          className="bg-education-green hover:bg-education-green/90"
                          onClick={() => handleAprovarDocumento(documento.id, documento.nome)}
                        >
                          Aprovar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretariaDocumentos;