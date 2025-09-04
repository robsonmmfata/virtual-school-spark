import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SecretariaHorarios = () => {
  const [selectedDay, setSelectedDay] = useState("segunda");
  const { toast } = useToast();

  const horarios = {
    segunda: [
      { id: 1, horario: "08:00", disciplina: "Inglês 9", professor: "Maria Silva", sala: "101", turma: "9º A" },
      { id: 2, horario: "09:00", disciplina: "Álgebra 1", professor: "João Santos", sala: "102", turma: "9º B" },
      { id: 3, horario: "10:00", disciplina: "Curso de Ciências 1", professor: "Ana Costa", sala: "Lab 1", turma: "9º A" },
      { id: 4, horario: "11:00", disciplina: "Educação Física", professor: "Carlos Lima", sala: "Quadra", turma: "9º C" },
      { id: 5, horario: "14:00", disciplina: "Geometria", professor: "Pedro Alves", sala: "103", turma: "10º A" },
      { id: 6, horario: "15:00", disciplina: "História Mundial", professor: "Fernanda Rocha", sala: "104", turma: "10º B" }
    ],
    terca: [
      { id: 7, horario: "08:00", disciplina: "Inglês 10", professor: "Maria Silva", sala: "101", turma: "10º A" },
      { id: 8, horario: "09:00", disciplina: "Álgebra 2", professor: "João Santos", sala: "102", turma: "11º A" },
      { id: 9, horario: "10:00", disciplina: "História dos EUA", professor: "Roberto Dias", sala: "105", turma: "11º B" },
      { id: 10, horario: "14:00", disciplina: "Economia", professor: "Lucia Fernandes", sala: "106", turma: "12º A" },
      { id: 11, horario: "15:00", disciplina: "Governo Americano", professor: "Marcos Oliveira", sala: "107", turma: "12º B" }
    ]
  };

  const salas = [
    { id: 1, nome: "Sala 101", capacidade: 30, tipo: "Regular", equipamentos: ["Projetor", "Ar Condicionado"], status: "disponivel" },
    { id: 2, nome: "Sala 102", capacidade: 25, tipo: "Regular", equipamentos: ["Projetor"], status: "ocupada" },
    { id: 3, nome: "Laboratório 1", capacidade: 20, tipo: "Laboratório", equipamentos: ["Microscópios", "Projetor"], status: "disponivel" },
    { id: 4, nome: "Quadra", capacidade: 50, tipo: "Esportiva", equipamentos: ["Som"], status: "manutencao" },
    { id: 5, nome: "Sala 103", capacidade: 30, tipo: "Regular", equipamentos: ["Projetor", "Lousa Digital"], status: "disponivel" }
  ];

  const conflitos = [
    {
      id: 1,
      tipo: "Professor",
      detalhes: "Maria Silva tem aulas simultâneas às 14:00 na segunda-feira",
      severidade: "alta",
      sugestao: "Reagendar uma das aulas"
    },
    {
      id: 2,
      tipo: "Sala",
      detalhes: "Sala 102 agendada para duas turmas às 10:00",
      severidade: "alta",
      sugestao: "Alterar sala de uma das turmas"
    },
    {
      id: 3,
      tipo: "Capacidade",
      detalhes: "Turma 10º A (35 alunos) na Sala 102 (25 lugares)",
      severidade: "media",
      sugestao: "Mover para sala maior"
    }
  ];

  const handleSalvarHorario = () => {
    toast({
      title: "Horário Salvo",
      description: "As alterações no horário foram salvas com sucesso.",
    });
  };

  const handleResolverConflito = (id: number) => {
    toast({
      title: "Conflito Resolvido",
      description: "O conflito de horário foi resolvido.",
    });
  };

  const getSeveridadeBadge = (severidade: string) => {
    switch (severidade) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>;
      case "media":
        return <Badge variant="outline" className="border-education-orange text-education-orange">Média</Badge>;
      case "baixa":
        return <Badge variant="secondary">Baixa</Badge>;
      default:
        return <Badge variant="secondary">{severidade}</Badge>;
    }
  };

  const getSalaStatusBadge = (status: string) => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gestão de Horários e Salas</h1>
        <p className="text-muted-foreground">Organização de cronogramas e controle de espaços</p>
      </div>

      <Tabs defaultValue="horarios" className="space-y-4">
        <TabsList>
          <TabsTrigger value="horarios" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Horários
          </TabsTrigger>
          <TabsTrigger value="salas" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Salas
          </TabsTrigger>
          <TabsTrigger value="conflitos" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Conflitos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="horarios" className="space-y-4">
          {/* Controles de Horário */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="segunda">Segunda-feira</SelectItem>
                  <SelectItem value="terca">Terça-feira</SelectItem>
                  <SelectItem value="quarta">Quarta-feira</SelectItem>
                  <SelectItem value="quinta">Quinta-feira</SelectItem>
                  <SelectItem value="sexta">Sexta-feira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-education-orange hover:bg-education-orange/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Aula
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agendar Nova Aula</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Disciplina</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ingles9">Inglês 9</SelectItem>
                            <SelectItem value="algebra1">Álgebra 1</SelectItem>
                            <SelectItem value="ciencias1">Curso de Ciências 1</SelectItem>
                            <SelectItem value="edfisica">Educação Física</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Professor</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maria">Maria Silva</SelectItem>
                            <SelectItem value="joao">João Santos</SelectItem>
                            <SelectItem value="ana">Ana Costa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Dia</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Dia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="segunda">Segunda</SelectItem>
                            <SelectItem value="terca">Terça</SelectItem>
                            <SelectItem value="quarta">Quarta</SelectItem>
                            <SelectItem value="quinta">Quinta</SelectItem>
                            <SelectItem value="sexta">Sexta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Horário</Label>
                        <Input type="time" />
                      </div>
                      <div className="space-y-2">
                        <Label>Sala</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sala" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="101">Sala 101</SelectItem>
                            <SelectItem value="102">Sala 102</SelectItem>
                            <SelectItem value="lab1">Lab 1</SelectItem>
                            <SelectItem value="quadra">Quadra</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button 
                      className="bg-education-orange hover:bg-education-orange/90"
                      onClick={handleSalvarHorario}
                    >
                      Agendar Aula
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                className="bg-education-green hover:bg-education-green/90"
                onClick={handleSalvarHorario}
              >
                Salvar Alterações
              </Button>
            </div>
          </div>

          {/* Grade de Horários */}
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">{selectedDay}-feira</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horário</TableHead>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Professor</TableHead>
                    <TableHead>Sala</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {horarios[selectedDay as keyof typeof horarios]?.map((aula) => (
                    <TableRow key={aula.id}>
                      <TableCell className="font-medium">{aula.horario}</TableCell>
                      <TableCell>{aula.disciplina}</TableCell>
                      <TableCell>{aula.professor}</TableCell>
                      <TableCell>{aula.sala}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{aula.turma}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
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
        </TabsContent>

        <TabsContent value="salas" className="space-y-4">
          {/* Estatísticas de Salas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Salas</p>
                    <p className="text-2xl font-bold text-foreground">24</p>
                  </div>
                  <MapPin className="h-8 w-8 text-education-orange" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Disponíveis</p>
                    <p className="text-2xl font-bold text-education-green">18</p>
                  </div>
                  <Users className="h-8 w-8 text-education-green" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Em Uso</p>
                    <p className="text-2xl font-bold text-primary">4</p>
                  </div>
                  <Clock className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Manutenção</p>
                    <p className="text-2xl font-bold text-education-orange">2</p>
                  </div>
                  <Calendar className="h-8 w-8 text-education-orange" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Salas */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Controle de Salas</CardTitle>
                <Button className="bg-education-orange hover:bg-education-orange/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Sala
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sala</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Capacidade</TableHead>
                    <TableHead>Equipamentos</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salas.map((sala) => (
                    <TableRow key={sala.id}>
                      <TableCell className="font-medium">{sala.nome}</TableCell>
                      <TableCell>{sala.tipo}</TableCell>
                      <TableCell>{sala.capacidade} lugares</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {sala.equipamentos.map((equip, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {equip}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getSalaStatusBadge(sala.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conflitos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Conflitos Detectados</CardTitle>
              <p className="text-sm text-muted-foreground">
                Resolva os conflitos de horário para evitar problemas
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conflitos.map((conflito) => (
                  <div key={conflito.id} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Conflito de {conflito.tipo}</h3>
                        {getSeveridadeBadge(conflito.severidade)}
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-education-green hover:bg-education-green/90"
                        onClick={() => handleResolverConflito(conflito.id)}
                      >
                        Resolver
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{conflito.detalhes}</p>
                    <p className="text-sm text-primary">
                      <strong>Sugestão:</strong> {conflito.sugestao}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecretariaHorarios;