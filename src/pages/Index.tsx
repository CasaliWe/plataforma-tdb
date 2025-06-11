
import { useState } from 'react';
import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Star, Trophy, Filter } from 'lucide-react';

const Index = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState('Todos');

  const courses = [
    {
      id: 1,
      title: "Fundamentos da Bateria",
      description: "Aprenda os conceitos básicos da bateria, postura correta e primeiros ritmos.",
      duration: "8:45",
      level: "Iniciante",
      lessons: 12
    },
    {
      id: 2,
      title: "Rudimentos Essenciais",
      description: "Domine os rudimentos fundamentais que todo baterista precisa conhecer.",
      duration: "12:30",
      level: "Intermediário",
      lessons: 8
    },
    {
      id: 3,
      title: "Técnicas de Pedal",
      description: "Desenvolva técnicas avançadas de pedal duplo e controle dinâmico.",
      duration: "15:20",
      level: "Avançado",
      lessons: 15
    },
    {
      id: 4,
      title: "Grooves de Rock",
      description: "Explore os grooves clássicos do rock e suas variações.",
      duration: "10:15",
      level: "Intermediário",
      lessons: 10
    },
    {
      id: 5,
      title: "Bateria para Iniciantes",
      description: "Primeiros passos na bateria, desde a postura até os primeiros ritmos.",
      duration: "6:30",
      level: "Iniciante",
      lessons: 6
    },
    {
      id: 6,
      title: "Técnicas Avançadas de Solo",
      description: "Desenvolva solos complexos e técnicas de improviso avançadas.",
      duration: "18:45",
      level: "Avançado",
      lessons: 20
    }
  ];

  const levels = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

  const stats = [
    { icon: BookOpen, label: 'Aulas Disponíveis', value: courses.length.toString() },
    { icon: Clock, label: 'Tempo Total', value: '75h' },
    { icon: Star, label: 'Níveis', value: '3' },
    { icon: Trophy, label: 'Certificados', value: '12' }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediário': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Avançado': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredCourses = courses.filter(course => {
    return selectedLevel === 'Todos' || course.level === selectedLevel;
  });

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

        {/* Filter Section */}
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
                  onClick={() => setSelectedLevel(level)}
                  className={selectedLevel === level ? "botao-primario" : ""}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* All Courses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredCourses.length} {selectedLevel !== 'Todos' ? `Curso${filteredCourses.length !== 1 ? 's' : ''} - ${selectedLevel}` : 'Cursos Disponíveis'}
            </h2>
            <Badge variant="outline" className="border-primary/30 text-primary">
              {filteredCourses.length} de {courses.length}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="space-y-3">
                <VideoCard
                  title={course.title}
                  description={course.description}
                  duration={course.duration}
                  isPlaying={playingVideo === course.id}
                  onPlayPause={() => setPlayingVideo(playingVideo === course.id ? null : course.id)}
                />
                <div className="flex items-center justify-between text-sm">
                  <Badge className={`border ${getLevelColor(course.level)}`}>
                    {course.level}
                  </Badge>
                  <span className="text-muted-foreground">{course.lessons} aulas</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredCourses.length === 0 && (
          <Card className="cartao-gradiente p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum curso encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar o filtro de nível
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
