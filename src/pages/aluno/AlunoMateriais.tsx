import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Download, 
  FileText, 
  Search, 
  Filter,
  Eye,
  Calendar,
  User
} from "lucide-react";

const AlunoMateriais = () => {
  const materiais = [
    {
      id: 1,
      titulo: "Apostila de Matemática - Funções",
      materia: "Matemática",
      professor: "Prof. Ana Silva",
      tipo: "PDF",
      tamanho: "2.5 MB",
      dataUpload: "22/03/2024",
      downloads: 142,
      descricao: "Material completo sobre funções quadráticas, exponenciais e logarítmicas."
    },
    {
      id: 2,
      titulo: "Lista de Exercícios - Física Moderna",
      materia: "Física",
      professor: "Prof. Carlos Santos",
      tipo: "PDF",
      tamanho: "1.8 MB",
      dataUpload: "20/03/2024",
      downloads: 98,
      descricao: "Exercícios práticos sobre teoria da relatividade e física quântica."
    },
    {
      id: 3,
      titulo: "Resumo - Literatura Brasileira",
      materia: "Literatura",
      professor: "Prof. Marina Costa",
      tipo: "PDF",
      tamanho: "3.2 MB",
      dataUpload: "18/03/2024",
      downloads: 203,
      descricao: "Resumo completo dos principais autores e movimentos literários brasileiros."
    },
    {
      id: 4,
      titulo: "Tabela Periódica Interativa",
      materia: "Química",
      professor: "Prof. Ana Silva",
      tipo: "PDF",
      tamanho: "4.1 MB",
      dataUpload: "15/03/2024",
      downloads: 156,
      descricao: "Tabela periódica com propriedades detalhadas de cada elemento químico."
    },
    {
      id: 5,
      titulo: "Mapas Históricos - Grandes Navegações",
      materia: "História",
      professor: "Prof. Roberto Lima",
      tipo: "PDF",
      tamanho: "5.3 MB",
      dataUpload: "12/03/2024",
      downloads: 87,
      descricao: "Coleção de mapas históricos das grandes navegações dos séculos XV e XVI."
    },
    {
      id: 6,
      titulo: "Fórmulas de Geometria Analítica",
      materia: "Matemática",
      professor: "Prof. Ana Silva",
      tipo: "PDF",
      tamanho: "1.2 MB",
      dataUpload: "10/03/2024",
      downloads: 234,
      descricao: "Compilação de todas as fórmulas essenciais de geometria analítica."
    }
  ];

  const materiaColors: { [key: string]: string } = {
    "Matemática": "bg-blue-100 text-blue-800",
    "Física": "bg-green-100 text-green-800",
    "Literatura": "bg-purple-100 text-purple-800",
    "Química": "bg-orange-100 text-orange-800",
    "História": "bg-red-100 text-red-800",
    "Geografia": "bg-yellow-100 text-yellow-800"
  };

  const handleDownload = (titulo: string) => {
    // Simulação de download
    alert(`Baixando: ${titulo}`);
  };

  const handlePreview = (titulo: string) => {
    // Simulação de visualização
    alert(`Visualizando: ${titulo}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Materiais de Estudo</h1>
          <p className="text-muted-foreground">Acesse e baixe todos os materiais das suas disciplinas</p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar materiais..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar por Matéria
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-sm text-muted-foreground">Total de Materiais</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-green">6</div>
            <div className="text-sm text-muted-foreground">Disciplinas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-orange">156</div>
            <div className="text-sm text-muted-foreground">Downloads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-education-purple">3</div>
            <div className="text-sm text-muted-foreground">Novos esta semana</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Materiais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {materiais.map((material) => (
          <Card key={material.id} className="hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{material.titulo}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={materiaColors[material.materia] || "bg-gray-100 text-gray-800"}>
                      {material.materia}
                    </Badge>
                    <Badge variant="outline">{material.tipo}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{material.descricao}</p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{material.professor}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{material.dataUpload}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{material.tamanho}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>{material.downloads} downloads</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  className="flex-1"
                  onClick={() => handleDownload(material.titulo)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handlePreview(material.titulo)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Materiais Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Materiais Adicionados Recentemente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {materiais.slice(0, 3).map((material) => (
              <div key={material.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{material.titulo}</p>
                    <p className="text-sm text-muted-foreground">{material.professor} • {material.dataUpload}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handlePreview(material.titulo)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(material.titulo)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlunoMateriais;