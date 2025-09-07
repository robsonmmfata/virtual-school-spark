import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Users, Calendar, Mail, Edit } from "lucide-react";

interface ViewComunicadoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comunicado: {
    id: number;
    titulo: string;
    conteudo: string;
    destinatarios: string[];
    status: string;
    dataEnvio: string;
    visualizacoes: number;
    tipo: string;
  } | null;
  onEdit?: () => void;
}

const ViewComunicadoModal = ({ open, onOpenChange, comunicado, onEdit }: ViewComunicadoModalProps) => {
  if (!comunicado) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Enviado":
        return "bg-education-green hover:bg-education-green/90";
      case "Agendado":
        return "bg-education-orange hover:bg-education-orange/90";
      case "Rascunho":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-primary";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Comunicado - {comunicado.titulo}</span>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                {comunicado.tipo}
              </Badge>
              <Badge className={getStatusColor(comunicado.status)}>
                {comunicado.status}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{comunicado.titulo}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {comunicado.dataEnvio ? 
                        new Date(comunicado.dataEnvio).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 
                        "Não enviado"
                      }
                    </div>
                    {comunicado.status === "Enviado" && (
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {comunicado.visualizacoes} visualizações
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Destinatários
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {comunicado.destinatarios.map((dest, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {dest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Conteúdo</h4>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {comunicado.conteudo}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas de Entrega (se enviado) */}
          {comunicado.status === "Enviado" && (
            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium mb-4">Estatísticas de Entrega</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{comunicado.visualizacoes}</p>
                    <p className="text-sm text-muted-foreground">Visualizações</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-education-green">
                      {Math.round(comunicado.visualizacoes * 0.8)}
                    </p>
                    <p className="text-sm text-muted-foreground">E-mails Abertos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-education-orange">
                      {Math.round(comunicado.visualizacoes * 0.95)}
                    </p>
                    <p className="text-sm text-muted-foreground">Entregues</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ações Recentes */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-medium mb-4">Histórico</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-education-green rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Comunicado criado</p>
                    <p className="text-xs text-muted-foreground">
                      {comunicado.dataEnvio ? 
                        new Date(comunicado.dataEnvio).toLocaleDateString('pt-BR') : 
                        "Hoje"
                      }
                    </p>
                  </div>
                </div>
                {comunicado.status === "Enviado" && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Comunicado enviado</p>
                      <p className="text-xs text-muted-foreground">
                        Para {comunicado.destinatarios.length} grupo(s) de destinatários
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            {onEdit && comunicado.status !== "Enviado" && (
              <Button onClick={onEdit} className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            )}
            {comunicado.status === "Rascunho" && (
              <Button variant="outline" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Agora
              </Button>
            )}
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewComunicadoModal;