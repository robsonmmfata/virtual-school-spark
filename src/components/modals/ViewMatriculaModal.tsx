import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, User, Phone, Mail, GraduationCap, MapPin, FileText, Clock } from "lucide-react";

interface Matricula {
  id: number;
  nome: string;
  email: string;
  serie: string;
  turma: string;
  dataMatricula: string;
  responsavel: string;
  telefone: string;
  status: string;
  documentosPendentes: string[];
}

interface ViewMatriculaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matricula: Matricula | null;
}

const ViewMatriculaModal = ({ open, onOpenChange, matricula }: ViewMatriculaModalProps) => {
  if (!matricula) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Detalhes da Matrícula
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{matricula.nome}</h3>
            {getStatusBadge(matricula.status)}
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Informações Pessoais</h4>
              
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{matricula.email}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>{matricula.serie}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{matricula.turma}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Matriculado em: {matricula.dataMatricula}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Responsável</h4>
              
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{matricula.responsavel}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{matricula.telefone}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Documentação</h4>
            
            {matricula.documentosPendentes.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-destructive font-medium">Documentos Pendentes:</p>
                {matricula.documentosPendentes.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-destructive" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-education-green">
                <FileText className="h-4 w-4" />
                <span>Documentação completa</span>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            <Button className="bg-education-orange hover:bg-education-orange/90">
              Editar Matrícula
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMatriculaModal;