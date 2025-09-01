import { useState, useEffect } from 'react';
import { alunosAPI, turmasAPI } from '../lib/api.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search } from 'lucide-react';

const AlunosExample = () => {
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [novoAluno, setNovoAluno] = useState({
    nome: '',
    email: '',
    telefone: '',
    matricula: '',
    turma_id: ''
  });
  const { toast } = useToast();

  // Carregar dados iniciais
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [alunosData, turmasData] = await Promise.all([
        alunosAPI.listar(),
        turmasAPI.listar()
      ]);

      setAlunos(alunosData);
      setTurmas(turmasData);
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrar alunos por busca
  const alunosFiltrados = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.matricula.includes(searchTerm)
  );

  // Cadastrar novo aluno
  const handleCadastrarAluno = async () => {
    try {
      await alunosAPI.cadastrar(novoAluno);

      toast({
        title: "Aluno cadastrado!",
        description: "O novo aluno foi adicionado com sucesso.",
      });

      // Limpar formulário e recarregar lista
      setNovoAluno({
        nome: '',
        email: '',
        telefone: '',
        matricula: '',
        turma_id: ''
      });
      setIsAddDialogOpen(false);
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando alunos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Alunos</h1>
          <p className="text-muted-foreground">Gerencie os alunos do sistema escolar</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Aluno
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Aluno</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input
                  placeholder="João Silva Santos"
                  value={novoAluno.nome}
                  onChange={(e) => setNovoAluno({...novoAluno, nome: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input
                  type="email"
                  placeholder="joao@email.com"
                  value={novoAluno.email}
                  onChange={(e) => setNovoAluno({...novoAluno, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  placeholder="(11) 99999-9999"
                  value={novoAluno.telefone}
                  onChange={(e) => setNovoAluno({...novoAluno, telefone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Matrícula</Label>
                <Input
                  placeholder="2024001"
                  value={novoAluno.matricula}
                  onChange={(e) => setNovoAluno({...novoAluno, matricula: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Turma</Label>
                <Select value={novoAluno.turma_id} onValueChange={(value) => setNovoAluno({...novoAluno, turma_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma turma" />
                  </SelectTrigger>
                  <SelectContent>
                    {turmas.map((turma) => (
                      <SelectItem key={turma.id} value={turma.id.toString()}>
                        {turma.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCadastrarAluno} className="flex-1">
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

      {/* Barra de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, email ou matrícula..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabela de alunos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos ({alunosFiltrados.length})</CardTitle>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunosFiltrados.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell className="font-medium">{aluno.matricula}</TableCell>
                  <TableCell>{aluno.nome}</TableCell>
                  <TableCell>{aluno.email}</TableCell>
                  <TableCell>{aluno.turma_nome || 'Não atribuída'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      aluno.status === 'Ativo'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {aluno.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{alunos.length}</p>
            <p className="text-sm text-muted-foreground">Total de Alunos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {alunos.filter(a => a.status === 'Ativo').length}
            </p>
            <p className="text-sm text-muted-foreground">Alunos Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{turmas.length}</p>
            <p className="text-sm text-muted-foreground">Turmas Disponíveis</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlunosExample;
