import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Mail, Phone, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VisualizarAlunosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  turma: string;
}

const VisualizarAlunosModal = ({ open, onOpenChange, turma }: VisualizarAlunosModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Mock data - substituir por dados reais da API
  const alunosData = [
    {
      id: 1,
      nome: "Ana Silva",
      email: "ana.silva@email.com",
      telefone: "(11) 99999-1111",
      status: "Ativo",
      media: 8.5,
      faltas: 2,
      ultimoAcesso: "2024-02-01 09:30"
    },
    {
      id: 2,
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      telefone: "(11) 99999-2222",
      status: "Ativo",
      media: 7.2,
      faltas: 1,
      ultimoAcesso: "2024-02-01 08:45"
    },
    {
      id: 3,
      nome: "Maria Santos",
      email: "maria.santos@email.com",
      telefone: "(11) 99999-3333",
      status: "Ativo",
      media: 9.1,
      faltas: 0,
      ultimoAcesso: "2024-02-01 10:15"
    },
    {
      id: 4,
      nome: "João Pereira",
      email: "joao.pereira@email.com",
      telefone: "(11) 99999-4444",
      status: "Inativo",
      media: 6.8,
      faltas: 5,
      ultimoAcesso: "2024-01-28 16:20"
    }
  ];

  const filteredAlunos = alunosData.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnviarMensagem = (aluno: any) => {
    toast({
      title: "Redirecionando",
      description: `Abrindo chat com ${aluno.nome}`,
    });
    onOpenChange(false);
    // Aqui você redirecionaria para a página de mensagens
  };

  const handleAdicionarAluno = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Em breve você poderá adicionar novos alunos à turma.",
    });
  };

  const getStatusColor = (status: string) => {
    return status === "Ativo" ? "bg-education-green" : "bg-gray-500";
  };

  const getMediaColor = (media: number) => {
    if (media >= 8) return "text-education-green";
    if (media >= 6) return "text-education-orange";
    return "text-red-500";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Alunos da Turma: {turma}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Barra de busca e botão adicionar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar aluno..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={handleAdicionarAluno}
              className="bg-education-green hover:bg-education-green/90"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Aluno
            </Button>
          </div>

          {/* Lista de alunos */}
          <div className="space-y-2 max-h-[50vh] overflow-y-auto">
            {filteredAlunos.map((aluno) => (
              <div key={aluno.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-education-green text-primary-foreground">
                      {aluno.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{aluno.nome}</h3>
                      <Badge className={`${getStatusColor(aluno.status)} text-primary-foreground`}>
                        {aluno.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {aluno.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {aluno.telefone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getMediaColor(aluno.media)}`}>
                      {aluno.media.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">Média</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">
                      {aluno.faltas}
                    </div>
                    <div className="text-xs text-muted-foreground">Faltas</div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Último acesso</div>
                    <div className="text-sm">
                      {new Date(aluno.ultimoAcesso).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEnviarMensagem(aluno)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Mensagem
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredAlunos.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum aluno encontrado.
            </div>
          )}

          {/* Estatísticas */}
          <div className="border-t border-border pt-4">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">{alunosData.length}</div>
                <div className="text-sm text-muted-foreground">Total de Alunos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-education-green">
                  {alunosData.filter(a => a.status === "Ativo").length}
                </div>
                <div className="text-sm text-muted-foreground">Ativos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-education-orange">
                  {(alunosData.reduce((acc, a) => acc + a.media, 0) / alunosData.length).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Média da Turma</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {(alunosData.reduce((acc, a) => acc + a.faltas, 0) / alunosData.length).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Média de Faltas</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisualizarAlunosModal;