import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Video, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import UploadConteudoModal from "@/components/modals/UploadConteudoModal";

const ProfessorConteudo = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'video' | 'material' | 'link'>('video');
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleOpenUploadModal = (tipo: 'video' | 'material' | 'link') => {
    setUploadType(tipo);
    setUploadModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('common.sendContent')}</h1>
        <p className="text-muted-foreground">{t('common.shareContentWithClasses')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-elegant transition-shadow duration-300 cursor-pointer" onClick={() => handleOpenUploadModal('video')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-education-green" />
              Upload de Vídeo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Clique para enviar vídeos da aula
              </p>
              <p className="text-xs text-muted-foreground">
                MP4, AVI, MOV (máx. 100MB)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-elegant transition-shadow duration-300 cursor-pointer" onClick={() => handleOpenUploadModal('material')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-education-green" />
              Material de Apoio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Clique para enviar materiais
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOC, PPT (máx. 10MB)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-elegant transition-shadow duration-300 cursor-pointer" onClick={() => handleOpenUploadModal('link')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-education-green" />
              Link Externo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <LinkIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Clique para compartilhar links
              </p>
              <p className="text-xs text-muted-foreground">
                Sites, simulados, recursos externos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdos Enviados Recentemente */}
      <Card>
        <CardHeader>
          <CardTitle>Conteúdos Enviados Recentemente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-education-green" />
                <div>
                  <p className="font-medium">Aula - Equações Quadráticas</p>
                  <p className="text-sm text-muted-foreground">9º Ano - Álgebra 1 • Hoje às 14:30</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Ver Status</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-education-green" />
                <div>
                  <p className="font-medium">Lista de Exercícios - Cap. 3</p>
                  <p className="text-sm text-muted-foreground">10º Ano - História Mundial • Ontem às 16:20</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Ver Status</Button>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <LinkIcon className="h-5 w-5 text-education-green" />
                <div>
                  <p className="font-medium">Simulado Online - História</p>
                  <p className="text-sm text-muted-foreground">11º Ano - História dos EUA • 2 dias atrás</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Ver Status</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Upload */}
      <UploadConteudoModal 
        open={uploadModalOpen} 
        onOpenChange={setUploadModalOpen}
        tipo={uploadType}
      />
    </div>
  );
};

export default ProfessorConteudo;