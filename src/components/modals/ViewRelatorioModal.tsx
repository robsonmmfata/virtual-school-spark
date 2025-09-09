import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Download, Printer, Eye, BarChart3, Users, BookOpen } from "lucide-react";

interface Relatorio {
  id: number;
  nome: string;
  tipo: string;
  data: string;
  status: string;
  tamanho: string;
}

interface ViewRelatorioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relatorio: Relatorio | null;
}

const ViewRelatorioModal = ({ open, onOpenChange, relatorio }: ViewRelatorioModalProps) => {
  if (!relatorio) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-education-green text-primary-foreground">Concluído</Badge>;
      case "processando":
        return <Badge className="bg-education-orange text-primary-foreground">Processando</Badge>;
      case "agendado":
        return <Badge variant="outline" className="border-primary text-primary">Agendado</Badge>;
      case "erro":
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "matriculas":
        return <Users className="h-5 w-5" />;
      case "frequencia":
        return <BarChart3 className="h-5 w-5" />;
      case "documentos":
        return <FileText className="h-5 w-5" />;
      case "desempenho":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTipoText = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      "matriculas": "Relatório de Matrículas",
      "frequencia": "Frequência Escolar",
      "documentos": "Controle de Documentos",
      "desempenho": "Desempenho Acadêmico"
    };
    return tipos[tipo] || tipo;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getTipoIcon(relatorio.tipo)}
            Detalhes do Relatório
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{relatorio.nome}</h3>
            {getStatusBadge(relatorio.status)}
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Informações do Relatório</h4>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Tipo:</span>
                  <span>{getTipoText(relatorio.tipo)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Gerado em:</span>
                  <span>{relatorio.data}</span>
                </div>
                
                {relatorio.tamanho !== "-" && (
                  <div className="flex items-center gap-2 text-sm">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Tamanho:</span>
                    <span>{relatorio.tamanho}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Resumo do Conteúdo</h4>
              
              <div className="space-y-2 text-sm">
                {relatorio.tipo === "matriculas" && (
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 156 matrículas ativas</li>
                    <li>• 12 matrículas pendentes</li>
                    <li>• 2 matrículas rejeitadas</li>
                    <li>• Análise por série e turma</li>
                  </ul>
                )}
                
                {relatorio.tipo === "frequencia" && (
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Frequência média: 91.5%</li>
                    <li>• Análise por disciplina</li>
                    <li>• Identificação de padrões</li>
                    <li>• Alunos com frequência baixa</li>
                  </ul>
                )}
                
                {relatorio.tipo === "documentos" && (
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 1.234 documentos emitidos</li>
                    <li>• 23 documentos pendentes</li>
                    <li>• Tempo médio de processamento</li>
                    <li>• Status por tipo de documento</li>
                  </ul>
                )}
                
                {relatorio.tipo === "desempenho" && (
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Notas por disciplina</li>
                    <li>• Evolução dos alunos</li>
                    <li>• Comparativo de turmas</li>
                    <li>• Indicadores de aprovação</li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {relatorio.status === "concluido" && (
              <div className="flex gap-2">
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
              </div>
            )}
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
              {relatorio.status === "erro" && (
                <Button className="bg-education-orange hover:bg-education-orange/90">
                  Gerar Novamente
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewRelatorioModal;