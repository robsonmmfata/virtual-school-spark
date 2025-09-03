import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Video, Link as LinkIcon, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadConteudoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tipo: 'video' | 'material' | 'link';
}

const UploadConteudoModal = ({ open, onOpenChange, tipo }: UploadConteudoModalProps) => {
  const [formData, setFormData] = useState({
    titulo: "",
    turma: "",
    descricao: "",
    url: "",
    arquivo: null as File | null
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const turmas = [
    "9º Ano - Inglês 9",
    "9º Ano - Álgebra 1", 
    "10º Ano - Geometria",
    "10º Ano - História Mundial",
    "11º Ano - História dos EUA",
    "12º Ano - Economia"
  ];

  const getIcon = () => {
    switch (tipo) {
      case 'video': return Video;
      case 'material': return FileText;
      case 'link': return LinkIcon;
    }
  };

  const getTitle = () => {
    switch (tipo) {
      case 'video': return "Upload de Vídeo";
      case 'material': return "Upload de Material";
      case 'link': return "Adicionar Link Externo";
    }
  };

  const getAcceptedFiles = () => {
    switch (tipo) {
      case 'video': return "video/*";
      case 'material': return ".pdf,.doc,.docx,.ppt,.pptx";
      case 'link': return "";
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar tamanho do arquivo (máx 100MB para vídeos, 10MB para materiais)
      const maxSize = tipo === 'video' ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
      
      if (file.size > maxSize) {
        toast({
          title: "Arquivo muito grande",
          description: `O arquivo deve ter no máximo ${tipo === 'video' ? '100MB' : '10MB'}.`,
          variant: "destructive"
        });
        return;
      }

      setFormData({...formData, arquivo: file});
    }
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simular progresso de upload
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    setIsUploading(false);
    setUploadComplete(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tipo !== 'link' && !formData.arquivo) {
      toast({
        title: "Arquivo necessário",
        description: "Por favor, selecione um arquivo para upload.",
        variant: "destructive"
      });
      return;
    }

    if (tipo === 'link' && !formData.url) {
      toast({
        title: "URL necessária",
        description: "Por favor, insira a URL do link.",  
        variant: "destructive"
      });
      return;
    }

    try {
      if (tipo !== 'link') {
        await simulateUpload();
      }

      // Simular salvamento no banco de dados
      await new Promise(resolve => setTimeout(resolve, 500));

      const messages = {
        video: "Vídeo foi enviado com sucesso e está disponível para os alunos!",
        material: "Material foi compartilhado e está disponível para download!",
        link: "Link foi compartilhado com a turma!"
      };

      toast({
        title: "Conteúdo enviado!",
        description: messages[tipo],
      });

      // Reset form
      setFormData({
        titulo: "",
        turma: "",
        descricao: "",
        url: "",
        arquivo: null
      });
      setUploadProgress(0);
      setUploadComplete(false);

      onOpenChange(false);

      // Aqui você faria a chamada real para a API
      // const formDataToSend = new FormData();
      // formDataToSend.append('titulo', formData.titulo);
      // formDataToSend.append('turma', formData.turma);
      // formDataToSend.append('descricao', formData.descricao);
      // if (formData.arquivo) formDataToSend.append('arquivo', formData.arquivo);
      // if (formData.url) formDataToSend.append('url', formData.url);
      // await api.post('/conteudos', formDataToSend);

    } catch (error) {
      toast({
        title: "Erro no envio",
        description: "Não foi possível enviar o conteúdo.",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };

  const Icon = getIcon();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-education-green" />
            {getTitle()}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              placeholder={tipo === 'video' ? "Ex: Aula sobre Equações" : tipo === 'material' ? "Ex: Lista de Exercícios" : "Ex: Simulado Online"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="turma">Turma</Label>
            <Select value={formData.turma} onValueChange={(value) => setFormData({...formData, turma: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a turma" />
              </SelectTrigger>
              <SelectContent>
                {turmas.map((turma) => (
                  <SelectItem key={turma} value={turma}>{turma}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {tipo === 'link' ? (
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                placeholder="https://..."
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Arquivo</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {uploadComplete ? (
                  <div className="space-y-2">
                    <Check className="h-8 w-8 mx-auto text-education-green" />
                    <p className="text-sm text-education-green">
                      Upload concluído!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formData.arquivo?.name}
                    </p>
                  </div>
                ) : isUploading ? (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground animate-pulse" />
                    <p className="text-sm text-muted-foreground">
                      Enviando arquivo...
                    </p>
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-xs text-muted-foreground">
                      {uploadProgress}% concluído
                    </p>
                  </div>
                ) : formData.arquivo ? (
                  <div className="space-y-2">
                    <Icon className="h-8 w-8 mx-auto text-education-green" />
                    <p className="text-sm text-foreground">
                      {formData.arquivo.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(formData.arquivo.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({...formData, arquivo: null})}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remover
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Icon className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {tipo === 'video' ? 'Clique para selecionar vídeo' : 'Clique para selecionar arquivo'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tipo === 'video' ? 'MP4, AVI, MOV (máx. 100MB)' : 'PDF, DOC, PPT (máx. 10MB)'}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Selecionar Arquivo
                    </Button>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={getAcceptedFiles()}
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              placeholder="Descreva o conteúdo..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isUploading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-education-green hover:bg-education-green/90"
              disabled={isUploading || !formData.titulo || !formData.turma}
            >
              {isUploading ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadConteudoModal;