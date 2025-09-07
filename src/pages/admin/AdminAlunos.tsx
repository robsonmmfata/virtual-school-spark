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
import { alunosAPI } from "@/lib/api.js";
import { mockAPI } from "@/lib/mockApi";
import ViewAlunoModal from "@/components/modals/ViewAlunoModal";
import EditAlunoModal from "@/components/modals/EditAlunoModal";

const AdminAlunos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<any>(null);
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

  const handleAddAluno = async () => {
    try {
      const formData = new FormData(document.querySelector('form') as HTMLFormElement);
      const dados = {
        nome: formData.get('nome') as string,
        email: formData.get('email') as string,
        telefone: formData.get('telefone') as string,
        matricula: `2024${String(alunos.length + 1).padStart(3, '0')}`,
        turma_id: formData.get('turma') as string
      };

      const novoAluno = await mockAPI.alunos.cadastrar(dados);
      
      toast({
        title: "Aluno adicionado!",
        description: `${dados.nome} foi cadastrado com sucesso.`,
      });
      setIsAddDialogOpen(false);
      // Recarregar lista de alunos
      window.location.reload();
    } catch (error) {
      toast({
        title: "Erro ao cadastrar aluno",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
    }
  };

  const handleViewAluno = (aluno: any) => {
    setSelectedAluno(aluno);
    setIsViewModalOpen(true);
  };

  const handleEditAluno = (aluno: any) => {
    setSelectedAluno(aluno);
    setIsEditModalOpen(true);
  };

  const handleUpdateComplete = () => {
    // Recarregar lista de alunos - em uma implementação real, você faria uma nova busca
    window.location.reload();
  };

  const handleDeleteAluno = async (id: number, nome: string) => {
    if (confirm(`Tem certeza que deseja excluir o aluno ${nome}?`)) {
      try {
        await mockAPI.alunos.excluir(id);
        toast({
          title: "Aluno removido!",
          description: `${nome} foi removido do sistema.`,
          variant: "destructive"
        });
        // Recarregar lista
        window.location.reload();
      } catch (error) {
        toast({
          title: "Erro ao remover aluno",
          description: "Não foi possível remover o aluno do sistema",
          variant: "destructive"
        });
      }
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
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>{t('common.fullName')}</Label>
                <Input name="nome" placeholder={t('common.fullNameExample')} required />
              </div>
              <div className="space-y-2">
                <Label>{t('common.email')}</Label>
                <Input name="email" type="email" placeholder="joao@email.com" required />
              </div>
              <div className="space-y-2">
                <Label>{t('common.phone')}</Label>
                <Input name="telefone" placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label>{t('common.class')}</Label>
                <Select name="turma">
                  <SelectTrigger>
                    <SelectValue placeholder={t('common.selectClass')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1º Ano A</SelectItem>
                    <SelectItem value="2">1º Ano B</SelectItem>
                    <SelectItem value="3">2º Ano A</SelectItem>
                    <SelectItem value="4">2º Ano B</SelectItem>
                    <SelectItem value="5">3º Ano A</SelectItem>
                    <SelectItem value="6">3º Ano B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button 
                  type="submit"
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
            </form>
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
                        onClick={() => handleViewAluno(aluno)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditAluno(aluno)}
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

      {/* Modais */}
      <ViewAlunoModal 
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        aluno={selectedAluno}
      />
      
      <EditAlunoModal 
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        aluno={selectedAluno}
        onUpdate={handleUpdateComplete}
      />
    </div>
  );
};

export default AdminAlunos;