import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const AdminAlunos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const alunos = [
    {
      id: 1,
      nome: "Ana Silva Santos",
      email: "ana.silva@email.com",
      turma: "1º Ano A",
      status: "Ativo",
      matricula: "2024001",
      telefone: "(11) 99999-9999",
      dataMatricula: "2024-01-15"
    },
    {
      id: 2,
      nome: "Carlos Oliveira Lima",
      email: "carlos.oliveira@email.com",
      turma: "2º Ano B",
      status: "Ativo",
      matricula: "2024002",
      telefone: "(11) 98888-8888",
      dataMatricula: "2024-01-16"
    },
    {
      id: 3,
      nome: "Maria Santos Costa",
      email: "maria.santos@email.com",
      turma: "3º Ano A",
      status: "Suspenso",
      matricula: "2024003",
      telefone: "(11) 97777-7777",
      dataMatricula: "2024-01-17"
    },
    {
      id: 4,
      nome: "João Pereira Silva",
      email: "joao.pereira@email.com",
      turma: "1º Ano B",
      status: "Ativo",
      matricula: "2024004",
      telefone: "(11) 96666-6666",
      dataMatricula: "2024-01-18"
    }
  ];

  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.matricula.includes(searchTerm)
  );

  const handleAddAluno = () => {
    toast({
      title: "Aluno adicionado!",
      description: "O novo aluno foi cadastrado com sucesso.",
    });
    setIsAddDialogOpen(false);
  };

  const handleViewAluno = (id: number, nome: string) => {
    toast({
      title: "Visualizando aluno",
      description: `Abrindo perfil detalhado de: ${nome}`,
    });
  };

  const handleEditAluno = (id: number, nome: string) => {
    toast({
      title: "Editando aluno",
      description: `Abrindo formulário de edição para: ${nome}`,
    });
  };

  const handleDeleteAluno = (id: number, nome: string) => {
    if (confirm(`Tem certeza que deseja excluir o aluno ${nome}?`)) {
      toast({
        title: "Aluno removido!",
        description: `${nome} foi removido do sistema.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('common.manageStudents')}</h1>
          <p className="text-muted-foreground">{t('common.registerManageStudents')}</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-education-purple hover:bg-education-purple/90">
              <Plus className="h-4 w-4 mr-2" />
              {t('common.newStudent')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{t('common.registerNewStudent')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t('common.fullName')}</Label>
                <Input placeholder={t('common.fullNameExample')} />
              </div>
              <div className="space-y-2">
                <Label>{t('common.email')}</Label>
                <Input type="email" placeholder="joao@email.com" />
              </div>
              <div className="space-y-2">
                <Label>{t('common.phone')}</Label>
                <Input placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label>{t('common.class')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t('common.selectClass')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1a">1º Ano A</SelectItem>
                    <SelectItem value="1b">1º Ano B</SelectItem>
                    <SelectItem value="2a">2º Ano A</SelectItem>
                    <SelectItem value="2b">2º Ano B</SelectItem>
                    <SelectItem value="3a">3º Ano A</SelectItem>
                    <SelectItem value="3b">3º Ano B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleAddAluno}
                  className="flex-1 bg-education-purple hover:bg-education-purple/90"
                >
                  {t('common.register')}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1"
                >
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Alunos ({filteredAlunos.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou matrícula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matrícula</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Turma</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlunos.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell className="font-medium">{aluno.matricula}</TableCell>
                  <TableCell>{aluno.nome}</TableCell>
                  <TableCell>{aluno.email}</TableCell>
                  <TableCell>{aluno.turma}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={aluno.status === "Ativo" ? "default" : "destructive"}
                      className={aluno.status === "Ativo" ? "bg-education-green hover:bg-education-green/90" : ""}
                    >
                      {aluno.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewAluno(aluno.id, aluno.nome)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditAluno(aluno.id, aluno.nome)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteAluno(aluno.id, aluno.nome)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{alunos.length}</p>
            <p className="text-sm text-muted-foreground">Total de Alunos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-education-green">
              {alunos.filter(a => a.status === "Ativo").length}
            </p>
            <p className="text-sm text-muted-foreground">Alunos Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">
              {alunos.filter(a => a.status === "Suspenso").length}
            </p>
            <p className="text-sm text-muted-foreground">Suspensos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-education-orange">6</p>
            <p className="text-sm text-muted-foreground">Turmas Ativas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAlunos;