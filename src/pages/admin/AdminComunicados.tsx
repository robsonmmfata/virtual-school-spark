import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Send, Mail, Users, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminComunicados = () => {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const { toast } = useToast();

  const comunicados = [
    {
      id: 1,
      titulo: "Cronograma de Provas do 1º Bimestre",
      conteudo: "Informamos o cronograma das avaliações do primeiro bimestre. As provas iniciarão no dia 15/03 e seguem até 22/03.",
      destinatarios: ["Todos os Alunos", "Todos os Professores"],
      status: "Enviado",
      dataEnvio: "2024-02-01",
      visualizacoes: 245,
      tipo: "Aviso Geral"
    },
    {
      id: 2,
      titulo: "Reunião de Pais - 1º Trimestre",
      conteudo: "Convocamos todos os responsáveis para a reunião de pais do primeiro trimestre, que acontecerá virtualmente no dia 25/03.",
      destinatarios: ["Responsáveis"],
      status: "Agendado",
      dataEnvio: "2024-02-05",
      visualizacoes: 0,
      tipo: "Convocação"
    },
    {
      id: 3,
      titulo: "Atualização do Sistema - Manutenção",
      conteudo: "O sistema ficará em manutenção no dia 10/03 das 22h às 06h para atualizações de segurança.",
      destinatarios: ["Todos os Usuários"],
      status: "Rascunho",
      dataEnvio: "",
      visualizacoes: 0,
      tipo: "Manutenção"
    }
  ];

  const destinatariosOptions = [
    "Todos os Alunos",
    "Todos os Professores", 
    "Todos os Responsáveis",
    "1º Ano A",
    "1º Ano B",
    "2º Ano A", 
    "2º Ano B",
    "3º Ano A",
    "3º Ano B",
    "Administradores"
  ];

  const handleSendCommunique = () => {
    toast({
      title: "Comunicado enviado!",
      description: "O comunicado foi enviado com sucesso para os destinatários selecionados.",
    });
    setIsComposeOpen(false);
  };

  const handleSchedule = () => {
    toast({
      title: "Comunicado agendado!",
      description: "O comunicado foi agendado para envio automático.",
    });
    setIsComposeOpen(false);
  };

  const handleView = (titulo: string) => {
    toast({
      title: "Visualizando comunicado",
      description: `Abrindo detalhes de: ${titulo}`,
    });
  };

  const handleEdit = (titulo: string) => {
    toast({
      title: "Editando comunicado",
      description: `Abrindo editor para: ${titulo}`,
    });
  };

  const handleDelete = (id: number, titulo: string) => {
    if (confirm(`Tem certeza que deseja excluir o comunicado "${titulo}"?`)) {
      toast({
        title: "Comunicado excluído!",
        description: "O comunicado foi removido permanentemente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comunicados</h1>
          <p className="text-muted-foreground">Envie avisos e comunicações para a comunidade escolar</p>
        </div>
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button className="bg-education-purple hover:bg-education-purple/90">
              <Send className="h-4 w-4 mr-2" />
              Novo Comunicado
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Comunicado</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input placeholder="Ex: Aviso importante sobre..." />
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aviso">Aviso Geral</SelectItem>
                      <SelectItem value="convocacao">Convocação</SelectItem>
                      <SelectItem value="evento">Evento</SelectItem>
                      <SelectItem value="manutencao">Manutenção</SelectItem>
                      <SelectItem value="emergencia">Emergência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Destinatários</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                  {destinatariosOptions.map((dest, index) => (
                    <label key={index} className="flex items-center space-x-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span>{dest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Conteúdo</Label>
                <Textarea 
                  placeholder="Digite o conteúdo do comunicado..."
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label>Opções de Envio</Label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="envio" value="imediato" defaultChecked />
                    <span className="text-sm">Enviar imediatamente</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="envio" value="agendado" />
                    <span className="text-sm">Agendar envio</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="envio" value="rascunho" />
                    <span className="text-sm">Salvar como rascunho</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleSendCommunique}
                  className="flex-1 bg-education-purple hover:bg-education-purple/90"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Agora
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSchedule}
                  className="flex-1"
                >
                  Agendar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsComposeOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Bell className="h-8 w-8 text-education-purple mx-auto mb-2" />
            <p className="text-2xl font-bold">{comunicados.length}</p>
            <p className="text-sm text-muted-foreground">Total de Comunicados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Send className="h-8 w-8 text-education-green mx-auto mb-2" />
            <p className="text-2xl font-bold">
              {comunicados.filter(c => c.status === "Enviado").length}
            </p>
            <p className="text-sm text-muted-foreground">Enviados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Mail className="h-8 w-8 text-education-orange mx-auto mb-2" />
            <p className="text-2xl font-bold">
              {comunicados.filter(c => c.status === "Agendado").length}
            </p>
            <p className="text-sm text-muted-foreground">Agendados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">
              {comunicados.reduce((acc, c) => acc + c.visualizacoes, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Visualizações</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="enviados">Enviados</TabsTrigger>
          <TabsTrigger value="agendados">Agendados</TabsTrigger>
          <TabsTrigger value="rascunhos">Rascunhos</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <div className="grid gap-4">
            {comunicados.map((comunicado) => (
              <Card key={comunicado.id} className="hover:shadow-elegant transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{comunicado.titulo}</h3>
                        <Badge variant="outline" className="text-xs">
                          {comunicado.tipo}
                        </Badge>
                        <Badge 
                          variant={
                            comunicado.status === "Enviado" ? "default" :
                            comunicado.status === "Agendado" ? "secondary" : "outline"
                          }
                          className={
                            comunicado.status === "Enviado" ? "bg-education-green hover:bg-education-green/90" :
                            comunicado.status === "Agendado" ? "bg-education-orange hover:bg-education-orange/90" : ""
                          }
                        >
                          {comunicado.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{comunicado.conteudo}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Destinatários: {comunicado.destinatarios.join(", ")}</span>
                        {comunicado.dataEnvio && (
                          <span>Enviado em: {new Date(comunicado.dataEnvio).toLocaleDateString('pt-BR')}</span>
                        )}
                        {comunicado.status === "Enviado" && (
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {comunicado.visualizacoes} visualizações
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleView(comunicado.titulo)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(comunicado.titulo)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(comunicado.id, comunicado.titulo)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enviados">
          <div className="grid gap-4">
            {comunicados.filter(c => c.status === "Enviado").map((comunicado) => (
              <Card key={comunicado.id}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{comunicado.titulo}</h3>
                  <p className="text-muted-foreground mb-3">{comunicado.conteudo}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Enviado em: {new Date(comunicado.dataEnvio).toLocaleDateString('pt-BR')}
                    </span>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{comunicado.visualizacoes} visualizações</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agendados">
          <div className="grid gap-4">
            {comunicados.filter(c => c.status === "Agendado").map((comunicado) => (
              <Card key={comunicado.id}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{comunicado.titulo}</h3>
                  <p className="text-muted-foreground mb-3">{comunicado.conteudo}</p>
                  <Badge className="bg-education-orange hover:bg-education-orange/90">
                    Agendado para envio
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rascunhos">
          <div className="grid gap-4">
            {comunicados.filter(c => c.status === "Rascunho").map((comunicado) => (
              <Card key={comunicado.id}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{comunicado.titulo}</h3>
                  <p className="text-muted-foreground mb-3">{comunicado.conteudo}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-education-purple hover:bg-education-purple/90">
                      Continuar Editando
                    </Button>
                    <Button variant="outline" size="sm">
                      Enviar Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminComunicados;