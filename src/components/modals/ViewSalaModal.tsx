import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Monitor, Wifi, Volume2, Thermometer } from "lucide-react";

interface Sala {
  id: number;
  nome: string;
  capacidade: number;
  tipo: string;
  equipamentos: string[];
  status: string;
}

interface ViewSalaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sala: Sala | null;
}

const ViewSalaModal = ({ open, onOpenChange, sala }: ViewSalaModalProps) => {
  if (!sala) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "disponivel":
        return <Badge className="bg-education-green text-primary-foreground">Disponível</Badge>;
      case "ocupada":
        return <Badge variant="destructive">Ocupada</Badge>;
      case "manutencao":
        return <Badge variant="outline" className="border-education-orange text-education-orange">Manutenção</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getEquipmentIcon = (equipment: string) => {
    switch (equipment.toLowerCase()) {
      case "projetor":
        return <Monitor className="h-4 w-4" />;
      case "ar condicionado":
        return <Thermometer className="h-4 w-4" />;
      case "som":
        return <Volume2 className="h-4 w-4" />;
      case "lousa digital":
        return <Monitor className="h-4 w-4" />;
      case "microscópios":
        return <Monitor className="h-4 w-4" />;
      case "wi-fi":
        return <Wifi className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Detalhes da Sala
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{sala.nome}</h3>
            {getStatusBadge(sala.status)}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Capacidade:</span>
                <span className="text-sm">{sala.capacidade} pessoas</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Tipo:</span>
              <Badge variant="outline">{sala.tipo}</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Equipamentos:</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {sala.equipamentos.map((equipamento, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    {getEquipmentIcon(equipamento)}
                    <span className="text-sm">{equipamento}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Informações Adicionais</h4>
            <div className="text-sm space-y-1">
              <p>ID da Sala: #{sala.id.toString().padStart(3, '0')}</p>
              <p>Última atualização: Hoje às 14:30</p>
              <p>Próxima manutenção: 15/03/2024</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            <Button className="bg-education-orange hover:bg-education-orange/90">
              Editar Sala
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSalaModal;