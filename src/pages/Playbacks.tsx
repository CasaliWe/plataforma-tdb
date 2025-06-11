
import { useState } from 'react';
import Header from '@/components/Header';
import AudioCard from '@/components/AudioCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Music, Search, Filter, Zap } from 'lucide-react';

const Playbacks = () => {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos');

  const playbacks = [
    {
      id: 1,
      title: "Rock Clássico - Tempo 120 BPM",
      description: "Playback instrumental de rock clássico para praticar grooves básicos.",
      duration: "4:30",
      bpm: 120,
      genre: "Rock",
      difficulty: "Iniciante"
    },
    {
      id: 2,
      title: "Blues Shuffle - Tempo 85 BPM",
      description: "Groove de blues shuffle com base e guitarra para desenvolver swing.",
      duration: "3:45",
      bpm: 85,
      genre: "Blues",
      difficulty: "Intermediário"
    },
    {
      id: 3,
      title: "Funk Groove - Tempo 95 BPM",
      description: "Base funk com baixo marcante para trabalhar precisão e dinâmica.",
      duration: "5:15",
      bpm: 95,
      genre: "Funk",
      difficulty: "Intermediário"
    },
    {
      id: 4,
      title: "Metal Progressivo - Tempo 140 BPM",
      description: "Playback complexo de metal progressivo com mudanças de compasso.",
      duration: "6:20",
      bpm: 140,
      genre: "Metal",
      difficulty: "Avançado"
    },
    {
      id: 5,
      title: "Jazz Standard - Tempo 130 BPM",
      description: "Base de jazz standard para desenvolver técnicas de brushes e swing.",
      duration: "4:50",
      bpm: 130,
      genre: "Jazz",
      difficulty: "Avançado"
    },
    {
      id: 6,
      title: "Pop Rock - Tempo 110 BPM",
      description: "Playback de pop rock moderno com batida simples e cativante.",
      duration: "3:30",
      bpm: 110,
      genre: "Pop",
      difficulty: "Iniciante"
    },
    {
      id: 7,
      title: "Reggae Groove - Tempo 75 BPM",
      description: "Base de reggae relaxante com característica marcação off-beat.",
      duration: "4:00",
      bpm: 75,
      genre: "Reggae",
      difficulty: "Intermediário"
    },
    {
      id: 8,
      title: "Samba Rock - Tempo 100 BPM",
      description: "Fusão brasileira de samba com rock para desenvolver coordenação.",
      duration: "3:45",
      bpm: 100,
      genre: "Samba",
      difficulty: "Avançado"
    }
  ];

  const genres = ['Todos', 'Rock', 'Blues', 'Funk', 'Metal', 'Jazz', 'Pop', 'Reggae', 'Samba'];
  const levels = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredPlaybacks = playbacks.filter(playback => {
    const matchesSearch = playback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         playback.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'Todos' || playback.genre === selectedGenre;
    const matchesLevel = selectedLevel === 'Todos' || playback.difficulty === selectedLevel;
    return matchesSearch && matchesGenre && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="secao-container py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Music className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold texto-gradiente">
              Playbacks
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pratique com nossas bases instrumentais profissionais
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cartao-gradiente text-center p-6">
            <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold texto-gradiente">{playbacks.length}</div>
            <div className="text-sm text-muted-foreground">Playbacks Disponíveis</div>
          </Card>
          <Card className="cartao-gradiente text-center p-6">
            <Music className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold texto-gradiente">{genres.length - 1}</div>
            <div className="text-sm text-muted-foreground">Gêneros Musicais</div>
          </Card>
          <Card className="cartao-gradiente text-center p-6">
            <Filter className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold texto-gradiente">75-140</div>
            <div className="text-sm text-muted-foreground">BPM Range</div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="cartao-gradiente p-6">
          <div className="space-y-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar playbacks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">Filtrar por nível:</h3>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Button
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLevel(level)}
                      className={selectedLevel === level ? "botao-primario" : ""}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">Filtrar por gênero:</h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <Button
                      key={genre}
                      variant={selectedGenre === genre ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedGenre(genre)}
                      className={selectedGenre === genre ? "botao-primario" : ""}
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Playbacks Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredPlaybacks.length} Playbacks Encontrados
            </h2>
            <Badge variant="outline" className="border-primary/30 text-primary">
              Prontos para Tocar
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaybacks.map((playback) => (
              <div key={playback.id} className="space-y-3">
                <AudioCard
                  title={playback.title}
                  description={playback.description}
                  duration={playback.duration}
                  bpm={playback.bpm}
                  genre={playback.genre}
                  difficulty={playback.difficulty}
                  isPlaying={playingTrack === playback.id}
                  onPlayPause={() => setPlayingTrack(playingTrack === playback.id ? null : playback.id)}
                />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Badge className={`border ${getDifficultyColor(playback.difficulty)}`}>
                      {playback.difficulty}
                    </Badge>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {playback.genre}
                    </Badge>
                  </div>
                  <span className="text-muted-foreground font-mono">{playback.bpm} BPM</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredPlaybacks.length === 0 && (
          <Card className="cartao-gradiente p-12 text-center">
            <Music className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum playback encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou termo de busca
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Playbacks;
