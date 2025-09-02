import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Calendar, BookOpen, Star } from "lucide-react";

interface PerfilProfessorModalProps {
  isOpen: boolean;
  onClose: () => void;
  professorId?: number;
}

const PerfilProfessorModal = ({ isOpen, onClose, professorId = 1 }: PerfilProfessorModalProps) => {
  const professor = {
    id: 1,
    nome: "Ana Silva",
    email: "ana.silva@escola.edu.br",
    telefone: "(11) 9999-9999",
    materia: "Matemática",
    formacao: "Licenciatura em Matemática - USP",
    especializacao: "Mestrado em Educação Matemática",
    experiencia: "15 anos de experiência",
    turmas: ["1º Ano A", "2º Ano B", "3º Ano C"],
    horarioAtendimento: "Terças e Quintas, 14h às 16h",
    avaliacaoMedia: 4.8,
    totalAvaliacoes: 127,
    biografia: "Professora especializada em matemática com foco em métodos inovadores de ensino. Busco sempre tornar a matemática mais acessível e interessante para os estudantes.",
    conquistas: [
      "Professora do Ano 2023",
      "Especialista em Tecnologias Educacionais",
      "Coordenadora do Projeto Matemática Divertida"
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Perfil do Professor</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header do Perfil */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {professor.nome.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold">{professor.nome}</h2>
              <Badge className="bg-blue-100 text-blue-800">
                {professor.materia}
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{professor.avaliacaoMedia}</span>
                  <span className="text-muted-foreground">({professor.totalAvaliacoes} avaliações)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{professor.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{professor.telefone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Atendimento: {professor.horarioAtendimento}</span>
              </div>
            </div>
          </div>

          {/* Formação */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Formação Acadêmica</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <BookOpen className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="font-medium">{professor.formacao}</p>
                  <p className="text-muted-foreground">{professor.especializacao}</p>
                  <p className="text-sm text-muted-foreground">{professor.experiencia}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Biografia */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Sobre</h3>
            <p className="text-muted-foreground">{professor.biografia}</p>
          </div>

          {/* Turmas */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Turmas</h3>
            <div className="flex flex-wrap gap-2">
              {professor.turmas.map((turma, index) => (
                <Badge key={index} variant="outline">
                  {turma}
                </Badge>
              ))}
            </div>
          </div>

          {/* Conquistas */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Conquistas</h3>
            <div className="space-y-2">
              {professor.conquistas.map((conquista, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">{conquista}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button>
              Enviar Mensagem
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PerfilProfessorModal;