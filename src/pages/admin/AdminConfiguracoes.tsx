import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Settings, School, Bell, Users, Shield, Mail, Calendar, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminConfiguracoes = () => {
  const [notificacoesEmail, setNotificacoesEmail] = useState(true);
  const [notificacoesSistema, setNotificacoesSistema] = useState(true);
  const [backupAutomatico, setBackupAutomatico] = useState(true);
  const { toast } = useToast();

  const handleSalvarConfiguracoes = () => {
    toast({
      title: "Configurações salvas!",
      description: "Todas as alterações foram aplicadas com sucesso.",
    });
  };

  const handleBackupManual = () => {
    toast({
      title: "Backup iniciado!",
      description: "O backup manual foi iniciado e você será notificado quando concluído.",
    });
    
    // Simular progresso do backup
    setTimeout(() => {
      toast({
        title: "Backup concluído!",
        description: "Backup realizado com sucesso. Arquivo salvo no servidor.",
      });
    }, 3000);
  };

  const handleTestEmail = () => {
    toast({
      title: "Enviando e-mail de teste...",
      description: "Aguarde enquanto testamos as configurações de e-mail.",
    });
    
    setTimeout(() => {
      toast({
        title: "E-mail de teste enviado!",
        description: "Verifique sua caixa de entrada para confirmar as configurações.",
      });
    }, 2000);
  };

  const handleResetConfiguracoes = () => {
    if (confirm("Tem certeza que deseja restaurar as configurações padrão? Esta ação não pode ser desfeita.")) {
      toast({
        title: "Configurações resetadas!",
        description: "Todas as configurações foram restauradas ao padrão.",
        variant: "destructive"
      });
    }
  };

  const handleExportarConfiguracoes = () => {
    toast({
      title: "Configurações exportadas!",
      description: "Arquivo de configurações foi baixado com sucesso.",
    });
  };

  const handleImportarConfiguracoes = () => {
    toast({
      title: "Importação iniciada!",
      description: "Selecione um arquivo de configuração válido.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações gerais da plataforma</p>
      </div>

      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="escola">Escola</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nome da Plataforma</Label>
                  <Input defaultValue="EduVirtual" />
                </div>
                <div className="space-y-2">
                  <Label>URL da Plataforma</Label>
                  <Input defaultValue="https://eduvirtual.com.br" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea 
                  defaultValue="Plataforma de ensino virtual de alta qualidade para educação do ensino médio"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Fuso Horário</Label>
                  <Select defaultValue="america-sao_paulo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-sao_paulo">América/São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="america-new_york">América/Nova York (GMT-5)</SelectItem>
                      <SelectItem value="europe-london">Europa/Londres (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Idioma do Sistema</Label>
                  <Select defaultValue="pt-br">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                      <SelectItem value="en-us">English (US)</SelectItem>
                      <SelectItem value="es-es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Configurações de Interface</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Modo Escuro por Padrão</Label>
                    <p className="text-sm text-muted-foreground">Aplicar tema escuro para novos usuários</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sidebar Recolhida</Label>
                    <p className="text-sm text-muted-foreground">Iniciar com menu lateral recolhido</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button onClick={handleSalvarConfiguracoes} className="bg-education-purple hover:bg-education-purple/90">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escola" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5" />
                Informações da Escola
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nome da Escola</Label>
                  <Input defaultValue="Escola Virtual EduTech" />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input defaultValue="12.345.678/0001-90" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Endereço</Label>
                <Input defaultValue="Rua da Educação, 123 - Centro" />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Cidade</Label>
                  <Input defaultValue="São Paulo" />
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select defaultValue="sp">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sp">São Paulo</SelectItem>
                      <SelectItem value="rj">Rio de Janeiro</SelectItem>
                      <SelectItem value="mg">Minas Gerais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>CEP</Label>
                  <Input defaultValue="01234-567" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue="(11) 3456-7890" />
                </div>
                <div className="space-y-2">
                  <Label>E-mail Institucional</Label>
                  <Input defaultValue="contato@eduvirtual.com.br" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Site da Escola</Label>
                <Input defaultValue="https://www.eduvirtual.com.br" />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Configurações Acadêmicas</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Ano Letivo</Label>
                    <Select defaultValue="2024">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sistema de Avaliação</Label>
                    <Select defaultValue="notas">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notas">Notas (0-10)</SelectItem>
                        <SelectItem value="conceitos">Conceitos (A-F)</SelectItem>
                        <SelectItem value="pontos">Pontos (0-100)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Frequência Mínima (%)</Label>
                    <Input type="number" defaultValue="75" min="0" max="100" />
                  </div>
                  <div className="space-y-2">
                    <Label>Média Mínima para Aprovação</Label>
                    <Input type="number" defaultValue="7.0" min="0" max="10" step="0.1" />
                  </div>
                </div>
              </div>

              <Button onClick={handleSalvarConfiguracoes} className="bg-education-purple hover:bg-education-purple/90">
                Salvar Informações da Escola
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Configurações de Usuários
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Políticas de Acesso</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Permitir Auto-cadastro de Alunos</Label>
                    <p className="text-sm text-muted-foreground">Alunos podem se cadastrar automaticamente</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Verificação de E-mail Obrigatória</Label>
                    <p className="text-sm text-muted-foreground">Usuários devem verificar e-mail antes do acesso</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autenticação em Duas Etapas</Label>
                    <p className="text-sm text-muted-foreground">Exigir 2FA para administradores</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Configurações de Senha</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tamanho Mínimo da Senha</Label>
                    <Input type="number" defaultValue="8" min="6" max="20" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiração da Senha (dias)</Label>
                    <Input type="number" defaultValue="90" min="30" max="365" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tentativas de Login Permitidas</Label>
                  <Input type="number" defaultValue="5" min="3" max="10" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Exigir Caracteres Especiais</Label>
                    <p className="text-sm text-muted-foreground">Senhas devem conter símbolos especiais</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Limites de Sessão</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tempo de Sessão (minutos)</Label>
                    <Input type="number" defaultValue="480" min="60" max="1440" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sessões Simultâneas por Usuário</Label>
                    <Input type="number" defaultValue="3" min="1" max="10" />
                  </div>
                </div>
              </div>

              <Button onClick={handleSalvarConfiguracoes} className="bg-education-purple hover:bg-education-purple/90">
                Salvar Configurações de Usuários
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notificações por E-mail</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações Ativadas</Label>
                    <p className="text-sm text-muted-foreground">Habilitar envio de e-mails automáticos</p>
                  </div>
                  <Switch checked={notificacoesEmail} onCheckedChange={setNotificacoesEmail} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Servidor SMTP</Label>
                    <Input defaultValue="smtp.gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Porta</Label>
                    <Input defaultValue="587" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>E-mail Remetente</Label>
                    <Input defaultValue="noreply@eduvirtual.com.br" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome do Remetente</Label>
                    <Input defaultValue="EduVirtual - Escola Virtual" />
                  </div>
                </div>

                <Button variant="outline" onClick={handleTestEmail}>
                  <Mail className="h-4 w-4 mr-2" />
                  Testar Configurações de E-mail
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tipos de Notificação</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Novas Matrículas</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Tarefas Entregues</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Frequência Baixa</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Aniversários</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Backup Concluído</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notificações do Sistema</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações em Tempo Real</Label>
                    <p className="text-sm text-muted-foreground">Notificações instantâneas na plataforma</p>
                  </div>
                  <Switch checked={notificacoesSistema} onCheckedChange={setNotificacoesSistema} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tempo de Exibição (segundos)</Label>
                    <Input type="number" defaultValue="5" min="3" max="15" />
                  </div>
                  <div className="space-y-2">
                    <Label>Posição na Tela</Label>
                    <Select defaultValue="top-right">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-right">Superior Direita</SelectItem>
                        <SelectItem value="top-left">Superior Esquerda</SelectItem>
                        <SelectItem value="bottom-right">Inferior Direita</SelectItem>
                        <SelectItem value="bottom-left">Inferior Esquerda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button onClick={handleSalvarConfiguracoes} className="bg-education-purple hover:bg-education-purple/90">
                Salvar Configurações de Notificações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Configurações de Backup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">Executar backups automáticos regularmente</p>
                  </div>
                  <Switch checked={backupAutomatico} onCheckedChange={setBackupAutomatico} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Frequência do Backup</Label>
                    <Select defaultValue="diario">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diario">Diário</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Horário do Backup</Label>
                    <Input type="time" defaultValue="02:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Retenção de Backups (dias)</Label>
                  <Input type="number" defaultValue="30" min="7" max="365" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dados Incluídos no Backup</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <Label>Dados dos Usuários</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <Label>Notas e Avaliações</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <Label>Frequência</Label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <Label>Materiais de Aula</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <Label>Comunicados</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <Label>Logs do Sistema</Label>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Status do Último Backup</h3>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">Backup Concluído com Sucesso</p>
                      <p className="text-sm text-green-600">
                        Último backup: 01/02/2024 às 02:00 • Tamanho: 2.4 GB
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleBackupManual} variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Executar Backup Manual
                </Button>
              </div>

              <Button onClick={handleSalvarConfiguracoes} className="bg-education-purple hover:bg-education-purple/90">
                Salvar Configurações de Backup
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sistema" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações do Sistema</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Versão</Label>
                    <p className="font-semibold">v2.1.4</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Última Atualização</Label>
                    <p className="font-semibold">15/01/2024</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Uptime</Label>
                    <p className="font-semibold">15 dias, 8 horas</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Usuários Ativos</Label>
                    <p className="font-semibold">186 online</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Configurações de Segurança</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Logs de Auditoria</Label>
                    <p className="text-sm text-muted-foreground">Registrar todas as ações dos usuários</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>HTTPS Obrigatório</Label>
                    <p className="text-sm text-muted-foreground">Forçar conexões seguras</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">Limitar número de requisições por IP</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Manutenção</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Modo de Manutenção</Label>
                    <p className="text-sm text-muted-foreground">Colocar sistema em manutenção</p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label>Mensagem de Manutenção</Label>
                  <Textarea 
                    defaultValue="Sistema temporariamente indisponível para manutenção. Voltaremos em breve."
                    rows={2}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cache e Performance</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tempo de Cache (minutos)</Label>
                    <Input type="number" defaultValue="60" min="5" max="1440" />
                  </div>
                  <div className="space-y-2">
                    <Label>Limite de Upload (MB)</Label>
                    <Input type="number" defaultValue="100" min="10" max="1000" />
                  </div>
                </div>

                <Button variant="outline">
                  Limpar Cache do Sistema
                </Button>
              </div>

              <Button onClick={handleSalvarConfiguracoes} className="bg-education-purple hover:bg-education-purple/90">
                Salvar Configurações do Sistema
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminConfiguracoes;