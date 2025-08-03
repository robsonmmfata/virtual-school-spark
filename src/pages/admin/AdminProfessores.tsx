import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Trash2, Eye, Users, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProfessores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const professores = [
    {
      id: 1,
      nome: "Dr. Maria Silva Santos",
      email: "maria.silva@eduvirtual.com.br",
      disciplina: "Matemática",
      turmas: ["1º Ano A", "2º Ano B"],
      status: "Ativo",
      telefone: "(11) 99999-1111",
      formacao: "Doutorado em Matemática",
      dataAdmissao: "2023-01-15"
    },
    {
      id: 2,
      nome: "Prof. Carlos Oliveira",
      email: "carlos.oliveira@eduvirtual.com.br",
      disciplina: "Física",
      turmas: ["2º Ano A", "3º Ano A"],
      status: "Ativo",
      telefone: "(11) 99999-2222",
      formacao: "Mestrado em Física",
      dataAdmissao: "2023-02-01"
    },
    {
      id: 3,
      nome: "Profa. Ana Costa Lima",
      email: "ana.costa@eduvirtual.com.br",
      disciplina: "Química",
      turmas: ["1º Ano B", "3º Ano B"],
      status: "Férias",
      telefone: "(11) 99999-3333",
      formacao: "Mestrado em Química",
      dataAdmissao: "2023-03-10"
    },
    {
      id: 4,
      nome: "Prof. João Santos",
      email: "joao.santos@eduvirtual.com.br",
      disciplina: "História",
      turmas: ["1º Ano A", "2º Ano A", "3º Ano A"],
      status: "Ativo",
      telefone: "(11) 99999-4444",
      formacao: "Especialização em História",
      dataAdmissao: "2023-01-20"
    }
  ];

  const filteredProfessores = professores.filter(professor =>
    professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.disciplina.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProfessor = () => {
    toast({
      title: "Professor adicionado!",
      description: "O novo professor foi cadastrado com sucesso.",
    });
    setIsAddDialogOpen(false);
  };

  const handleViewProfessor = (id: number, nome: string) => {
    toast({
      title: "Visualizando professor",
      description: `Abrindo perfil detalhado de: ${nome}`,
    });
  };

  const handleEditProfessor = (id: number, nome: string) => {
    toast({
      title: "Editando professor",
      description: `Abrindo formulário de edição para: ${nome}`,
    });
  };

  const handleDeleteProfessor = (id: number, nome: string) => {
    if (confirm(`Tem certeza que deseja excluir o professor ${nome}?`)) {
      toast({
        title: "Professor removido!",
        description: `${nome} foi removido do sistema.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gerenciar Professores</h1>
          <p className="text-muted-foreground">Cadastre e gerencie os professores da escola</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-education-purple hover:bg-education-purple/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Professor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Professor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input placeholder="Ex: Dr. João Silva Santos" />
              </div>
              <div className="space-y-2">
                <Label>E-mail Institucional</Label>
                <Input type="email" placeholder="joao@eduvirtual.com.br" />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label>Disciplina Principal</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matematica">Matemática</SelectItem>
                    <SelectItem value="fisica">Física</SelectItem>
                    <SelectItem value="quimica">Química</SelectItem>
                    <SelectItem value="biologia">Biologia</SelectItem>
                    <SelectItem value="historia">História</SelectItem>
                    <SelectItem value="geografia">Geografia</SelectItem>
                    <SelectItem value="portugues">Português</SelectItem>
                    <SelectItem value="ingles">Inglês</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Formação</Label>
                <Input placeholder="Ex: Mestrado em Matemática" />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleAddProfessor}
                  className="flex-1 bg-education-purple hover:bg-education-purple/90"
                >
                  Cadastrar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Professores ({filteredProfessores.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou disciplina..."
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
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Disciplina</TableHead>
                <TableHead>Turmas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfessores.map((professor) => (
                <TableRow key={professor.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{professor.nome}</p>
                      <p className="text-sm text-muted-foreground">{professor.formacao}</p>
                    </div>
                  </TableCell>
                  <TableCell>{professor.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-education-green border-education-green">
                      {professor.disciplina}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {professor.turmas.map((turma, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {turma}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={professor.status === "Ativo" ? "default" : "outline"}
                      className={professor.status === "Ativo" ? "bg-education-green hover:bg-education-green/90" : "text-education-orange border-education-orange"}
                    >
                      {professor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewProfessor(professor.id, professor.nome)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditProfessor(professor.id, professor.nome)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteProfessor(professor.id, professor.nome)}
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

      {/* Estatísticas e Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{professores.length}</p>
            <p className="text-sm text-muted-foreground">Total de Professores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-education-green">
              {professores.filter(p => p.status === "Ativo").length}
            </p>
            <p className="text-sm text-muted-foreground">Professores Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-education-orange">
              {professores.filter(p => p.status === "Férias").length}
            </p>
            <p className="text-sm text-muted-foreground">Em Férias</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-education-purple">8</p>
            <p className="text-sm text-muted-foreground">Disciplinas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">6</p>
            <p className="text-sm text-muted-foreground">Turmas Ativas</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por Disciplina */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Professores por Disciplina
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from(new Set(professores.map(p => p.disciplina))).map((disciplina) => {
              const count = professores.filter(p => p.disciplina === disciplina).length;
              return (
                <div key={disciplina} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{disciplina}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfessores;