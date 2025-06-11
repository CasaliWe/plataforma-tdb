
import { useState } from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Users, Search, Plus, ThumbsUp, Clock, Pin } from 'lucide-react';

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = [
    'Todos', 'Técnica', 'Equipamentos', 'Teoria Musical', 'Dúvidas Gerais', 'Compartilhamentos'
  ];

  const forumPosts = [
    {
      id: 1,
      title: "Como melhorar a coordenação entre mãos e pés?",
      author: "Carlos_Drummer",
      category: "Técnica",
      replies: 23,
      likes: 45,
      lastActivity: "2h atrás",
      isPinned: true,
      excerpt: "Estou com dificuldade para coordenar mãos e pés em grooves mais complexos. Alguém tem dicas de exercícios específicos?"
    },
    {
      id: 2,
      title: "Qual o melhor kit para iniciantes até R$ 2000?",
      author: "Maria_Beat",
      category: "Equipamentos",
      replies: 18,
      likes: 32,
      lastActivity: "4h atrás",
      isPinned: false,
      excerpt: "Estou começando na bateria e preciso de um kit bom e barato. Aceito sugestões de marcas e modelos!"
    },
    {
      id: 3,
      title: "Compartilhando minha versão de 'In The Air Tonight'",
      author: "Drummer_Pro",
      category: "Compartilhamentos",
      replies: 12,
      likes: 67,
      lastActivity: "6h atrás",
      isPinned: false,
      excerpt: "Gravei minha interpretação desse clássico do Phil Collins. O que vocês acham? Aceito críticas construtivas!"
    },
    {
      id: 4,
      title: "Dúvida sobre compasso 7/8 - exercícios?",
      author: "RhythmMaster",
      category: "Teoria Musical",
      replies: 8,
      likes: 28,
      lastActivity: "8h atrás",
      isPinned: false,
      excerpt: "Estou estudando compassos irregulares e o 7/8 está me dando trabalho. Alguém conhece exercícios bons?"
    },
    {
      id: 5,
      title: "Problema com pedal duplo - travando",
      author: "FastFeet",
      category: "Equipamentos",
      replies: 15,
      likes: 21,
      lastActivity: "12h atrás",
      isPinned: false,
      excerpt: "Meu pedal duplo DW está travando na segunda batida. Já tentei lubrificar mas não resolveu. Ideias?"
    },
    {
      id: 6,
      title: "Como estudar rudimentos eficientemente?",
      author: "StudyDrummer",
      category: "Técnica",
      replies: 31,
      likes: 89,
      lastActivity: "1 dia atrás",
      isPinned: true,
      excerpt: "Criando este tópico para compartilharmos métodos de estudo de rudimentos. Qual a rotina de vocês?"
    }
  ];

  const stats = [
    { icon: Users, label: 'Membros Ativos', value: '1,247' },
    { icon: MessageSquare, label: 'Posts Totais', value: '8,923' },
    { icon: ThumbsUp, label: 'Curtidas Hoje', value: '342' },
    { icon: Clock, label: 'Online Agora', value: '89' }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Técnica': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Equipamentos': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Teoria Musical': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Dúvidas Gerais': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Compartilhamentos': 'bg-pink-500/20 text-pink-400 border-pink-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Ordenar posts: fixados primeiro, depois por atividade
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0; // Manter ordem original para posts do mesmo tipo
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="secao-container py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <MessageSquare className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold texto-gradiente">
              Fórum da Comunidade
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conecte-se com outros bateristas, tire dúvidas e compartilhe conhecimento
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

        {/* Search and Actions */}
        <Card className="cartao-gradiente p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar no fórum..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>
            <Button className="botao-primario">
              <Plus className="w-4 h-4 mr-2" />
              Novo Post
            </Button>
          </div>
        </Card>

        {/* Categories Filter */}
        <Card className="cartao-gradiente p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "botao-primario" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </Card>

        {/* Forum Posts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {sortedPosts.length} Posts Encontrados
            </h2>
            <Badge variant="outline" className="border-primary/30 text-primary">
              Comunidade Ativa
            </Badge>
          </div>
          
          <div className="space-y-4">
            {sortedPosts.map((post) => (
              <Card key={post.id} className="cartao-gradiente p-6 hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                <div className="space-y-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {post.isPinned && (
                        <Pin className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-lg">
                        {post.title}
                      </h3>
                    </div>
                    <Badge className={`border ${getCategoryColor(post.category)} flex-shrink-0`}>
                      {post.category}
                    </Badge>
                  </div>

                  {/* Post Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Post Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/20">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs bg-primary/20 text-primary">
                            {post.author.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.lastActivity}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {sortedPosts.length === 0 && (
          <Card className="cartao-gradiente p-12 text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum post encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou termo de busca
            </p>
          </Card>
        )}

        {/* Community Guidelines */}
        <Card className="cartao-gradiente p-8 text-center">
          <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Bem-vindo à Nossa Comunidade!
          </h3>
          <p className="text-muted-foreground mb-4">
            Mantenha as discussões respeitosas e construtivas. Estamos aqui para ajudar uns aos outros a evoluir na bateria.
          </p>
          <Button variant="outline" className="botao-secundario">
            Ver Regras da Comunidade
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Forum;
