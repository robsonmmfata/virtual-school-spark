import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserPlus, Edit, Eye, FileText, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SecretariaMatriculas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { toast } = useToast();

  const matriculas = [
    {
      id: 1,
      nome: "Ana Silva Santos",
      email: "ana.silva@email.com",
      serie: "9º Ano",
      turma: "Inglês 9",
      dataMatricula: "15/01/2024",
      responsavel: "Maria Silva Santos",
      telefone: "(11) 99999-1111",
      status: "ativa",
      documentosPendentes: ["Histórico Escolar"]
    },
    {
      id: 2,
      nome: "Carlos Oliveira Lima",
      email: "carlos.oliveira@email.com",
      serie: "10º Ano",
      turma: "Geometria",
      dataMatricula: "20/01/2024",
      responsavel: "João Oliveira Lima",
      telefone: "(11) 99999-2222",
      status: "pendente",
      documentosPendentes: ["RG", "Comprovante de Residência"]
    },
    {
      id: 3,
      nome: "Maria Santos Costa",
      email: "maria.santos@email.com",
      serie: "11º Ano",
      turma: "História dos EUA",
      dataMatricula: "10/01/2024",
      responsavel: "Ana Santos Costa",
      telefone: "(11) 99999-3333",
      status: "ativa",
      documentosPendentes: []
    }
  ];

  const handleAprovarMatricula = (id: number, nome: string) => {
    toast({
      title: "Matrícula Aprovada",
      description: `A matrícula de ${nome} foi aprovada com sucesso.`,
    });
  };

  const handleRejeitarMatricula = (id: number, nome: string) => {
    toast({
      title: "Matrícula Rejeitada",
      description: `A matrícula de ${nome} foi rejeitada.`,
      variant: "destructive"
    });
  };

  const filteredMatriculas = matriculas.filter(matricula => {
    const matchesSearch = matricula.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         matricula.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || matricula.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativa":
        return <Badge className="bg-education-green text-primary-foreground">Ativa</Badge>;
      case "pendente":
        return <Badge variant="outline" className="border-education-orange text-education-orange">Pendente</Badge>;
      case "rejeitada":
        return <Badge variant="destructive">Rejeitada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gerenciar Matrículas</h1>
        <p className="text-muted-foreground">Controle de matrículas e documentação de alunos</p>
      </div>

      {/* Filtros e Ações */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="ativa">Ativas</SelectItem>
              <SelectItem value="pendente">Pendentes</SelectItem>
              <SelectItem value="rejeitada">Rejeitadas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-education-orange hover:bg-education-orange/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Nova Matrícula
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nova Matrícula</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input placeholder="Nome do aluno" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@exemplo.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Série</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a série" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9ano">9º Ano</SelectItem>
                      <SelectItem value="10ano">10º Ano</SelectItem>
                      <SelectItem value="11ano">11º Ano</SelectItem>
                      <SelectItem value="12ano">12º Ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Turma Principal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a turma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ingles9">Inglês 9</SelectItem>
                      <SelectItem value="algebra1">Álgebra 1</SelectItem>
                      <SelectItem value="geometria">Geometria</SelectItem>
                      <SelectItem value="historia-mundial">História Mundial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome do Responsável</Label>
                  <Input placeholder="Nome do responsável" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input placeholder="(xx) xxxxx-xxxx" />
                </div>
              </div>
              <Button className="bg-education-orange hover:bg-education-orange/90">
                Criar Matrícula
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Matrículas</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <UserPlus className="h-8 w-8 text-education-orange" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ativas</p>
                <p className="text-2xl font-bold text-education-green">142</p>
              </div>
              <CheckCircle className="h-8 w-8 text-education-green" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-education-orange">12</p>
              </div>
              <FileText className="h-8 w-8 text-education-orange" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejeitadas</p>
                <p className="text-2xl font-bold text-red-500">2</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Matrículas */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Matrículas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Série/Turma</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Data Matrícula</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Documentos</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatriculas.map((matricula) => (
                <TableRow key={matricula.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{matricula.nome}</p>
                      <p className="text-sm text-muted-foreground">{matricula.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{matricula.serie}</p>
                      <p className="text-sm text-muted-foreground">{matricula.turma}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{matricula.responsavel}</p>
                      <p className="text-sm text-muted-foreground">{matricula.telefone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{matricula.dataMatricula}</TableCell>
                  <TableCell>{getStatusBadge(matricula.status)}</TableCell>
                  <TableCell>
                    {matricula.documentosPendentes.length > 0 ? (
                      <Badge variant="outline" className="border-red-500 text-red-500">
                        {matricula.documentosPendentes.length} pendente(s)
                      </Badge>
                    ) : (
                      <Badge className="bg-education-green text-primary-foreground">
                        Completo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {matricula.status === "pendente" && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-education-green hover:bg-education-green/90"
                            onClick={() => handleAprovarMatricula(matricula.id, matricula.nome)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejeitarMatricula(matricula.id, matricula.nome)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
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

export default SecretariaMatriculas;