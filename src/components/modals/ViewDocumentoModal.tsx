import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileText, User, Calendar, AlertCircle, Download, Printer, Eye } from "lucide-react";

interface Documento {
  id: number;
  aluno: string;
  serie: string;
  tipo: string;
  nome: string;
  dataEmissao: string;
  status: string;
  observacoes: string;
}

interface ViewDocumentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documento: Documento | null;
}

const ViewDocumentoModal = ({ open, onOpenChange, documento }: ViewDocumentoModalProps) => {
  if (!documento) return null;

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

  const getTipoText = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      "historico": "Histórico Escolar",
      "certificado": "Certificado",
      "declaracao": "Declaração",
      "diploma": "Diploma"
    };
    return tipos[tipo] || tipo;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detalhes do Documento
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{documento.nome}</h3>
            {getStatusBadge(documento.status)}
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Informações do Documento</h4>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Tipo:</span>
                  <span>{getTipoText(documento.tipo)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Emitido em:</span>
                  <span>{documento.dataEmissao}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Aluno:</span>
                  <span>{documento.aluno}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Série:</span>
                  <span>{documento.serie}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Informações Adicionais</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Observações:</p>
                      <p className="text-sm text-muted-foreground mt-1">{documento.observacoes}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <p>ID do Documento: #{documento.id.toString().padStart(6, '0')}</p>
                  <p>Gerado pelo sistema em {documento.dataEmissao}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-2">
              {documento.status === "aprovado" && (
                <>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir
                  </Button>
                </>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
              {documento.status === "pendente" && (
                <Button className="bg-education-green hover:bg-education-green/90">
                  Aprovar Documento
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDocumentoModal;