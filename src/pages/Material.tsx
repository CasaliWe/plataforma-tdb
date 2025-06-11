
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Download, FileText, Music, Video, Headphones } from 'lucide-react';

const Material = () => {
  const materials = [
    {
      id: 1,
      title: "Manual Completo de Rudimentos",
      type: "PDF",
      description: "Guia completo com todos os 40 rudimentos essenciais da bateria, incluindo notação musical e exercícios progressivos.",
      icon: FileText,
      size: "2.5 MB",
      pages: 45,
      downloads: 1240
    },
    {
      id: 2,
      title: "Partituras - Grooves Clássicos",
      type: "PDF",
      description: "Coletânea de partituras dos grooves mais importantes do rock, pop, funk e jazz.",
      icon: Music,
      size: "1.8 MB",
      pages: 32,
      downloads: 890
    },
    {
      id: 3,
      title: "Exercícios de Coordenação",
      type: "PDF",
      description: "50 exercícios progressivos para desenvolver coordenação entre mãos e pés.",
      icon: BookOpen,
      size: "1.2 MB",
      pages: 28,
      downloads: 756
    },
    {
      id: 4,
      title: "Metrônomo Virtual",
      type: "AUDIO",
      description: "Coleção de clicks em diferentes tempos e subdivisões para prática.",
      icon: Headphones,
      size: "15.3 MB",
      duration: "2h 30min",
      downloads: 445
    },
    {
      id: 5,
      title: "Video Aulas - Técnica de Brushes",
      type: "VIDEO",
      description: "Série de vídeos sobre técnicas avançadas de brushes para jazz e ballads.",
      icon: Video,
      size: "250 MB",
      duration: "45min",
      downloads: 312
    },
    {
      id: 6,
      title: "Tabela de Equivalências Rítmicas",
      type: "PDF",
      description: "Referência rápida para conversões entre diferentes figuras rítmicas e tempos.",
      icon: FileText,
      size: "0.8 MB",
      pages: 12,
      downloads: 623
    }
  ];

  const categories = [
    { name: "PDFs", count: 4, icon: FileText, color: "text-blue-400" },
    { name: "Áudios", count: 1, icon: Headphones, color: "text-green-400" },
    { name: "Vídeos", count: 1, icon: Video, color: "text-purple-400" }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'AUDIO': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'VIDEO': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getIcon = (IconComponent: any) => IconComponent;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="secao-container py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <BookOpen className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold texto-gradiente">
              Material de Apoio
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Baixe materiais exclusivos para complementar seus estudos
          </p>
        </div>

        {/* Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category, index) => {
            const IconComponent = getIcon(category.icon);
            return (
              <Card key={index} className="cartao-gradiente text-center p-6">
                <IconComponent className={`w-8 h-8 mx-auto mb-2 ${category.color}`} />
                <div className="text-2xl font-bold texto-gradiente">{category.count}</div>
                <div className="text-sm text-muted-foreground">{category.name}</div>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <Card className="cartao-gradiente p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold texto-gradiente">6</div>
              <div className="text-sm text-muted-foreground">Materiais Disponíveis</div>
            </div>
            <div>
              <div className="text-2xl font-bold texto-gradiente">4,266</div>
              <div className="text-sm text-muted-foreground">Total de Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-bold texto-gradiente">271 MB</div>
              <div className="text-sm text-muted-foreground">Tamanho Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold texto-gradiente">162</div>
              <div className="text-sm text-muted-foreground">Páginas de Conteúdo</div>
            </div>
          </div>
        </Card>

        {/* Materials Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Todos os Materiais</h2>
            <Badge variant="outline" className="border-primary/30 text-primary">
              Acesso Premium
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {materials.map((material) => {
              const IconComponent = getIcon(material.icon);
              return (
                <Card key={material.id} className="cartao-gradiente p-6 hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {material.title}
                        </h3>
                        <Badge className={`border ${getTypeColor(material.type)}`}>
                          {material.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {material.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>📁 {material.size}</span>
                          {material.pages && <span>📄 {material.pages} páginas</span>}
                          {material.duration && <span>⏱️ {material.duration}</span>}
                        </div>
                        <span>⬇️ {material.downloads} downloads</span>
                      </div>
                      
                      <Button 
                        className="w-full botao-primario group-hover:scale-105 transition-all duration-300"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Baixar Material
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <Card className="cartao-gradiente p-8 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Precisa de Ajuda?
          </h3>
          <p className="text-muted-foreground mb-4">
            Todos os materiais estão em alta qualidade e prontos para download. 
            Se tiver dúvidas, consulte nossa seção de FAQ ou entre em contato.
          </p>
          <Button variant="outline" className="botao-secundario">
            Central de Ajuda
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Material;
