import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Video, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfessorConteudo = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Conteúdo enviado!",
        description: "O material foi compartilhado com a turma.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Enviar Conteúdo</h1>
        <p className="text-muted-foreground">Compartilhe materiais e vídeos com suas turmas</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-education-green" />
              Upload de Vídeo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Título da Aula</Label>
              <Input placeholder="Ex: Equações de 2º Grau" />
            </div>
            
            <div className="space-y-2">
              <Label>Turma</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1a">1º Ano A - Matemática</SelectItem>
                  <SelectItem value="2b">2º Ano B - Matemática</SelectItem>
                  <SelectItem value="3a">3º Ano A - Matemática</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea placeholder="Descreva o conteúdo da aula..." rows={3} />
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Arraste o vídeo aqui ou clique para selecionar
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast({
                  title: "Selecionando arquivo",
                  description: "Abrindo seletor de arquivos de vídeo...",
                })}
              >
                Selecionar Arquivo
              </Button>
            </div>

            <Button 
              onClick={handleUpload} 
              disabled={uploading}
              className="w-full bg-education-green hover:bg-education-green/90"
            >
              {uploading ? "Enviando..." : "Enviar Vídeo"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-education-green" />
              Material de Apoio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Título do Material</Label>
              <Input placeholder="Ex: Lista de Exercícios" />
            </div>
            
            <div className="space-y-2">
              <Label>Turma</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1a">1º Ano A - Matemática</SelectItem>
                  <SelectItem value="2b">2º Ano B - Matemática</SelectItem>
                  <SelectItem value="3a">3º Ano A - Matemática</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                PDF, DOC, PPT (máx. 10MB)
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast({
                  title: "Selecionando arquivo",
                  description: "Abrindo seletor de materiais de apoio...",
                })}
              >
                Selecionar Arquivo
              </Button>
            </div>

            <Button 
              onClick={handleUpload} 
              disabled={uploading}
              className="w-full bg-education-green hover:bg-education-green/90"
            >
              {uploading ? "Enviando..." : "Enviar Material"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-education-green" />
            Link Externo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input placeholder="Ex: Simulado Online" />
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input placeholder="https://..." />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Turma</Label>
            <Select>
              <SelectTrigger className="md:w-1/2">
                <SelectValue placeholder="Selecione a turma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1a">1º Ano A - Matemática</SelectItem>
                <SelectItem value="2b">2º Ano B - Matemática</SelectItem>
                <SelectItem value="3a">3º Ano A - Matemática</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="bg-education-green hover:bg-education-green/90"
            onClick={() => toast({
              title: "Link compartilhado!",
              description: "O link foi enviado para a turma selecionada.",
            })}
          >
            Compartilhar Link
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessorConteudo;