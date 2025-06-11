import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Heart, Star, CheckCircle, Filter, Folder } from 'lucide-react';
import { getCursosData, toggleFavorito, toggleConcluido } from '@/services/api';

// Tipos para a estrutura de dados
interface Aula {
  id: number;
  titulo: string;
  descricao: string;
  duracao: string;
  videoUrl: string;
  favorito: boolean;
  concluido: boolean;
}

interface Modulo {
  id: number;
  titulo: string;
  aulas: Aula[];
}

interface Nivel {
  id: string;
  nome: string;
  modulos: Modulo[];
}

interface CursosData {
  niveis: Nivel[];
}

const Index = () => {
  // Estado para os dados dos cursos
  const [cursosData, setCursosData] = useState<CursosData | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | 'Todos'>('Todos');
  const [selectedModulo, setSelectedModulo] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Buscar dados de cursos
  useEffect(() => {
    const fetchData = () => {
      try {
        const response = getCursosData();
        if (response.success && response.data) {
          setCursosData(response.data);
        } else {
          console.error("Erro ao buscar dados de cursos");
        }
      } catch (error) {
        console.error("Erro ao buscar dados de cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Definir todos os níveis disponíveis
  const levels = cursosData ? ['Todos', ...cursosData.niveis.map(nivel => nivel.nome)] : ['Todos'];
  
  // Obter módulos do nível selecionado
  const getModulosDoNivel = () => {
    if (!cursosData || selectedLevel === 'Todos') return [];
    
    const nivelSelecionado = cursosData.niveis.find(nivel => nivel.nome === selectedLevel);
    return nivelSelecionado ? nivelSelecionado.modulos : [];
  };
  
  const modulosDoNivel = getModulosDoNivel();
    
  // Calcular estatísticas
  const calcularTotalAulas = (): number => {
    if (!cursosData) return 0;
    
    let total = 0;
    cursosData.niveis.forEach(nivel => {
      nivel.modulos.forEach(modulo => {
        total += modulo.aulas.length;
      });
    });
    return total;
  };

  const calcularAulasFavoritas = (): number => {
    if (!cursosData) return 0;
    
    let total = 0;
    cursosData.niveis.forEach(nivel => {
      nivel.modulos.forEach(modulo => {
        total += modulo.aulas.filter(aula => aula.favorito).length;
      });
    });
    return total;
  };

  const calcularAulasConcluidas = (): number => {
    if (!cursosData) return 0;
    
    let total = 0;
    cursosData.niveis.forEach(nivel => {
      nivel.modulos.forEach(modulo => {
        total += modulo.aulas.filter(aula => aula.concluido).length;
      });
    });
    return total;
  };
  
  const stats = [
    { icon: BookOpen, label: 'Aulas Disponíveis', value: calcularTotalAulas().toString() },
    { icon: Heart, label: 'Aulas Favoritas', value: calcularAulasFavoritas().toString() },
    { icon: Star, label: 'Níveis', value: cursosData ? cursosData.niveis.length.toString() : '0' },
    { icon: CheckCircle, label: 'Aulas Concluídas', value: calcularAulasConcluidas().toString() }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Handler para favoritar aula
  const handleToggleFavorito = (aulaId: number) => {
    const response = toggleFavorito(aulaId);
    if (response.success) {
      setCursosData(prevData => {
        if (!prevData) return null;
        
        // Cria uma cópia profunda dos dados
        const newData = JSON.parse(JSON.stringify(prevData));
        
        // Atualiza o estado de favorito na cópia
        newData.niveis.forEach((nivel: Nivel) => {
          nivel.modulos.forEach((modulo: Modulo) => {
            const aula = modulo.aulas.find((a: Aula) => a.id === aulaId);
            if (aula) {
              aula.favorito = !aula.favorito;
            }
          });
        });
        
        return newData;
      });
    }
  };

  // Handler para marcar aula como concluída
  const handleToggleConcluido = (aulaId: number) => {
    const response = toggleConcluido(aulaId);
    if (response.success) {
      setCursosData(prevData => {
        if (!prevData) return null;
        
        // Cria uma cópia profunda dos dados
        const newData = JSON.parse(JSON.stringify(prevData));
        
        // Atualiza o estado de conclusão na cópia
        newData.niveis.forEach((nivel: Nivel) => {
          nivel.modulos.forEach((modulo: Modulo) => {
            const aula = modulo.aulas.find((a: Aula) => a.id === aulaId);
            if (aula) {
              aula.concluido = !aula.concluido;
            }
          });
        });
        
        return newData;
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="secao-container py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold texto-gradiente">
            Suas Aulas de Bateria
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Continue sua jornada musical com as melhores aulas de bateria
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="cartao-gradiente text-center p-4">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold texto-gradiente">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Filter Section - Níveis */}
        <Card className="cartao-gradiente p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Filtrar por nível:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedLevel(level);
                    setSelectedModulo(null); // Reset módulo selecionado ao trocar o nível
                  }}
                  className={selectedLevel === level ? "botao-primario" : ""}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Filter Section - Módulos (mostra apenas quando um nível específico é selecionado) */}
        {selectedLevel !== 'Todos' && modulosDoNivel.length > 0 && (
          <Card className="cartao-gradiente p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Folder className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Filtrar por módulo:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedModulo === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedModulo(null)}
                  className={selectedModulo === null ? "botao-primario" : ""}
                >
                  Todos
                </Button>
                {modulosDoNivel.map((modulo) => (
                  <Button
                    key={modulo.id}
                    variant={selectedModulo === modulo.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedModulo(modulo.id)}
                    className={selectedModulo === modulo.id ? "botao-primario" : ""}
                  >
                    {modulo.titulo}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {loading ? (
          // Estado de carregamento
          <Card className="cartao-gradiente p-12 text-center">
            <div className="animate-pulse flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 mb-4"></div>
              <div className="h-6 w-48 bg-muted-foreground/20 rounded mb-2"></div>
              <div className="h-4 w-32 bg-muted-foreground/10 rounded"></div>
            </div>
          </Card>
        ) : (
          <>
            {selectedLevel === 'Todos' ? (
              // Exibição de todos os níveis e seus módulos
              <>
                {cursosData && cursosData.niveis.map((nivel) => (
                  <div key={nivel.id} className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <Badge className={`border ${getLevelColor(nivel.nome)}`}>
                        {nivel.nome}
                      </Badge>
                      <span>Módulos disponíveis</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {nivel.modulos.map((modulo) => (
                        <Card key={modulo.id} className="cartao-gradiente p-6 hover:scale-105 transition-all duration-300">
                          <h3 className="text-xl font-bold texto-gradiente mb-2">{modulo.titulo}</h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {modulo.aulas.length} aulas disponíveis
                          </p>
                          <Button 
                            variant="default"
                            className="w-full botao-primario"
                            onClick={() => {
                              setSelectedLevel(nivel.nome);
                              setSelectedModulo(modulo.id);
                            }}
                          >
                            Acessar módulo
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : selectedModulo === null ? (
              // Exibição de todos os módulos de um nível específico
              <>
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold texto-gradiente">
                    Módulos de {selectedLevel}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modulosDoNivel.map((modulo) => (
                      <Card key={modulo.id} className="cartao-gradiente p-6 hover:scale-105 transition-all duration-300">
                        <h3 className="text-xl font-bold texto-gradiente mb-2">{modulo.titulo}</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {modulo.aulas.length} aulas disponíveis
                        </p>
                        <Button 
                          variant="default"
                          className="w-full botao-primario"
                          onClick={() => setSelectedModulo(modulo.id)}
                        >
                          Ver aulas
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              // Exibição de todas as aulas de um módulo específico
              <>
                {cursosData && (() => {
                  // Encontrar o módulo selecionado
                  const nivelSelecionado = cursosData.niveis.find(nivel => nivel.nome === selectedLevel);
                  const moduloSelecionado = nivelSelecionado?.modulos.find(modulo => modulo.id === selectedModulo);
                  
                  if (!moduloSelecionado) return (
                    <Card className="cartao-gradiente p-12 text-center">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Módulo não encontrado
                      </h3>
                    </Card>
                  );
                  
                  return (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold texto-gradiente">
                            {moduloSelecionado.titulo}
                          </h2>
                          <div className="flex items-center mt-1">
                            <Badge className={`border ${getLevelColor(selectedLevel)}`}>
                              {selectedLevel}
                            </Badge>
                            <span className="text-muted-foreground ml-2 text-sm">
                              {moduloSelecionado.aulas.length} aula{moduloSelecionado.aulas.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedModulo(null)}
                        >
                          Voltar para módulos
                        </Button>
                      </div>
                      
                      {/* Listagem de aulas */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {moduloSelecionado.aulas.map((aula) => (
                          <div key={aula.id} className="space-y-3">
                            <VideoCard
                              title={aula.titulo}
                              description={aula.descricao}
                              duration={aula.duracao}
                              videoUrl={aula.videoUrl}
                              isPlaying={playingVideo === aula.id}
                              onPlayPause={() => setPlayingVideo(playingVideo === aula.id ? null : aula.id)}
                              isFavorite={aula.favorito}
                              onToggleFavorite={() => handleToggleFavorito(aula.id)}
                              isCompleted={aula.concluido}
                            />
                            <div className="flex items-center justify-between text-sm">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs flex items-center"
                                onClick={() => handleToggleFavorito(aula.id)}
                              >
                                <Heart className={`h-4 w-4 mr-1 ${aula.favorito ? 'text-red-500 fill-red-500' : ''}`} />
                                {aula.favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-xs flex items-center"
                                onClick={() => handleToggleConcluido(aula.id)}
                              >
                                <CheckCircle className={`h-4 w-4 mr-1 ${aula.concluido ? 'text-green-500' : ''}`} />
                                {aula.concluido ? 'Marcar como não concluída' : 'Marcar como concluída'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </>
            )}

            {/* Exibição quando não há conteúdo */}
            {!cursosData || cursosData.niveis.length === 0 && (
              <Card className="cartao-gradiente p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Nenhum conteúdo disponível
                </h3>
                <p className="text-muted-foreground">
                  Fique atento para novas aulas em breve
                </p>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
