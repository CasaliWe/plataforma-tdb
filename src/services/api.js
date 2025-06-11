// *****************TUDO QUE FOR RELACIONADO A USUÁRIOS E AUTENTICAÇÃO****************

// Lista de usuários da plataforma
const users = [
  {
    id: 1,
    name: "BU BU",
    nickname: "CasaliWe",
    login: "casaliwe",
    password: "123456",
    email: "wes@exemplo.com",
    phone: "(54) 9 9153-8488",
    role: "aluno",
    isPremium: true
  },
  {
    id: 2,
    name: "Weslei Casali",
    nickname: "admin",
    login: "admin",
    password: "admin",
    email: "weslei@drummerboyapp.com",
    phone: "(54) 9 9876-5432",
    role: "admin",
    isPremium: true
  },
  {
    id: 3,
    name: "João Silva",
    nickname: "joaos",
    login: "joaos",
    password: "123456",
    email: "joao@exemplo.com",
    phone: "(11) 9 1234-5678",
    role: "aluno",
    isPremium: false
  }
];

// Função para autenticar usuário
export function login(username, password) {
  // Simulação da chamada de API
  const user = users.find(u => u.login === username && u.password === password);
  
  if (!user) {
    return {
      success: false,
      message: "Login ou senha inválidos"
    };
  }
  
  // Gera um token fake
  const currentTime = new Date().getTime();
  const expiresAt = currentTime + (8 * 60 * 60 * 1000); // 8 horas em milissegundos
  
  const token = {
    value: `${user.id}_${Math.random().toString(36).substring(2)}_${currentTime}`,
    expiresAt: expiresAt,    user: {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      login: user.login,
      email: user.email,
      role: user.role,
      isPremium: user.isPremium
    }
  };
  
  return {
    success: true,
    token: token.value,
    expiresAt: token.expiresAt,
    user: token.user
  };
}

// Função para buscar informações do usuário
export function getUserInfo(userId) {
  // Simulação da chamada de API
  const user = users.find(u => u.id === parseInt(userId));
  
  if (!user) {
    return {
      success: false,
      message: "Usuário não encontrado"
    };
  }
    return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      login: user.login,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isPremium: user.isPremium
    }
  };
}

// Função para atualizar as informações do usuário
export function updateUserInfo(userId, userData) {
  // Simulação da chamada de API
  console.log("Atualizando informações do usuário:", userId);
  console.log("Novos dados:", userData);
  
  // Aqui você implementaria a chamada real à API para atualizar os dados
  return {
    success: true,
    message: "Informações atualizadas com sucesso",
    user: {
      ...userData,
      id: userId
    }
  };
}

// Função para verificar se o token é válido
export function verifyToken(token) {
  // Simulação da chamada de API para verificar token
  if (!token) {
    return {
      success: false,
      message: "Token não fornecido"
    };
  }
  
  // Extrai o ID do usuário do token fake
  const parts = token.split('_');
  if (parts.length !== 3) {
    return {
      success: false,
      message: "Token inválido"
    };
  }
  
  const userId = parseInt(parts[0]);
  const timestamp = parseInt(parts[2]);
  const currentTime = new Date().getTime();
  
  // Verifica se o token está expirado
  if (currentTime > timestamp + (8 * 60 * 60 * 1000)) {
    return {
      success: false,
      message: "Token expirado"
    };
  }
  
  // Busca informações do usuário
  const user = users.find(u => u.id === userId);
  if (!user) {
    return {
      success: false,
      message: "Usuário não encontrado"
    };
  }
    return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      login: user.login,
      email: user.email,
      role: user.role,
      isPremium: user.isPremium
    }
  };
}

// *****************TUDO QUE FOR RELACIONADO A CURSOS E AULAS****************

// Dados de cursos, módulos e aulas
const cursosData = {
  niveis: [
    {
      id: "iniciante",
      nome: "Iniciante",
      modulos: [
        {
          id: 1,
          titulo: "Bolsonaro ta ok",
          aulas: [
            {
              id: 101,
              titulo: "taaa ok",
              descricao: "Aprenda a postura ideal e como segurar as baquetas corretamente para evitar lesões e ter melhor performance.",
              duracao: "8:45",
              videoUrl: "https://www.youtube.com/embed/vsN_XYP7THw?si=CwFzCIWDzXmCEXMF",
              favorito: false,
              concluido: false
            },
            {
              id: 102,
              titulo: "Primeiros Ritmos Simples",
              descricao: "Nesta aula você aprenderá os primeiros ritmos simples usados na maioria das músicas pop.",
              duracao: "12:20",
              videoUrl: "https://www.youtube.com/embed/et9hU7QMDYU",
              favorito: false,
              concluido: false
            },
            {
              id: 103,
              titulo: "Contagem e Metrônomo",
              descricao: "A importância de manter o tempo e como praticar com metrônomo desde o início.",
              duracao: "10:05",
              videoUrl: "https://www.youtube.com/embed/Xr-oZr3nzGw",
              favorito: false,
              concluido: false
            }
          ]
        },
        {
          id: 133,
          titulo: "Bolsonaro ta ok",
          aulas: [
            {
              id: 101,
              titulo: "taaa ok",
              descricao: "Aprenda a postura ideal e como segurar as baquetas corretamente para evitar lesões e ter melhor performance.",
              duracao: "8:45",
              videoUrl: "https://www.youtube.com/embed/vsN_XYP7THw?si=CwFzCIWDzXmCEXMF",
              favorito: false,
              concluido: false
            },
            {
              id: 102,
              titulo: "Primeiros Ritmos Simples",
              descricao: "Nesta aula você aprenderá os primeiros ritmos simples usados na maioria das músicas pop.",
              duracao: "12:20",
              videoUrl: "https://www.youtube.com/embed/et9hU7QMDYU",
              favorito: false,
              concluido: false
            },
            {
              id: 103,
              titulo: "Contagem e Metrônomo",
              descricao: "A importância de manter o tempo e como praticar com metrônomo desde o início.",
              duracao: "10:05",
              videoUrl: "https://www.youtube.com/embed/Xr-oZr3nzGw",
              favorito: false,
              concluido: false
            }
          ]
        },
        {
          id: 2,
          titulo: "Coordenação Inicial",
          aulas: [
            {
              id: 201,
              titulo: "Exercícios de Independência",
              descricao: "Exercícios básicos para desenvolver a independência entre as mãos e os pés.",
              duracao: "15:10",
              videoUrl: "https://www.youtube.com/embed/lT_j7cxRvJw",
              favorito: false,
              concluido: false
            },
            {
              id: 202,
              titulo: "Coordenação Mão e Pé",
              descricao: "Como sincronizar o bumbo com os toques das mãos em padrões simples.",
              duracao: "11:35",
              videoUrl: "https://www.youtube.com/embed/XtUzrRnGYQk",
              favorito: false,
              concluido: false
            }
          ]
        }
      ]
    },
    {
      id: "intermediario",
      nome: "Intermediário",
      modulos: [
        {
          id: 3,
          titulo: "Rudimentos Essenciais",
          aulas: [
            {
              id: 301,
              titulo: "Flams e Drags",
              descricao: "Aprenda dois dos rudimentos mais importantes e como aplicá-los em viradas.",
              duracao: "14:20",
              videoUrl: "https://www.youtube.com/embed/tpS3jLfx5GA",
              favorito: false,
              concluido: false
            },
            {
              id: 302,
              titulo: "Paradiddles",
              descricao: "Dominando o paradiddle e suas variações para criar frases interessantes.",
              duracao: "16:45",
              videoUrl: "https://www.youtube.com/embed/9WFiYnXU3r0",
              favorito: false,
              concluido: false
            }
          ]
        },
        {
          id: 4,
          titulo: "Grooves de Rock",
          aulas: [
            {
              id: 401,
              titulo: "Rock Clássico dos Anos 70",
              descricao: "Grooves inspirados em John Bonham, Ian Paice e outros grandes bateristas do rock clássico.",
              duracao: "17:30",
              videoUrl: "https://www.youtube.com/embed/lT5xpXYittg",
              favorito: false,
              concluido: false
            },
            {
              id: 402,
              titulo: "Rock Alternativo",
              descricao: "Padrões de bateria usados no rock alternativo dos anos 90 até hoje.",
              duracao: "13:15",
              videoUrl: "https://www.youtube.com/embed/HzOXCR6yQ9g",
              favorito: false,
              concluido: false
            }
          ]
        }
      ]
    },
    {
      id: "avancado",
      nome: "Avançado",
      modulos: [
        {
          id: 5,
          titulo: "Técnica de Pedal Duplo",
          aulas: [
            {
              id: 501,
              titulo: "Heel-Toe e Slide",
              descricao: "Técnicas avançadas para executar batidas rápidas de bumbo com um pedal.",
              duracao: "18:40",
              videoUrl: "https://www.youtube.com/embed/D3LzZqrWf-E",
              favorito: false,
              concluido: false
            },
            {
              id: 502,
              titulo: "Exercícios para Velocidade",
              descricao: "Desenvolva mais velocidade e resistência para tocar metal e outros estilos intensos.",
              duracao: "15:25",
              videoUrl: "https://www.youtube.com/embed/zM2a8MpMvhw",
              favorito: false,
              concluido: false
            }
          ]
        },
        {
          id: 6,
          titulo: "Ritmos Complexos",
          aulas: [
            {
              id: 601,
              titulo: "Compassos Ímpares",
              descricao: "Como dominar compassos em 5/4, 7/8 e outras fórmulas de compasso incomuns.",
              duracao: "20:10",
              videoUrl: "https://www.youtube.com/embed/G4vsDqF9jIE",
              favorito: false,
              concluido: false
            },
            {
              id: 602,
              titulo: "Polirritmia",
              descricao: "Entenda e aplique polirritmias para criar texturas sofisticadas em sua execução.",
              duracao: "19:05",
              videoUrl: "https://www.youtube.com/embed/dzkY4XbCrNs",
              favorito: false,
              concluido: false
            },
            {
              id: 605,
              titulo: "Polirritmia",
              descricao: "Entenda e aplique polirritmias para criar texturas sofisticadas em sua execução.",
              duracao: "19:05",
              videoUrl: "https://www.youtube.com/embed/dzkY4XbCrNs",
              favorito: true,
              concluido: true
            }
          ]
        }
      ]
    }
  ]
};

/**
 * Função para buscar todos os cursos, módulos e aulas
 * @returns {Object} Objeto com todos os níveis, módulos e aulas
 */
export function getCursosData() {
  // Em um ambiente real, esta função faria uma chamada à API
  // Por enquanto, retorna os dados mockados
  return {
    success: true,
    data: cursosData
  };
}

/**
 * Função para marcar/desmarcar uma aula como favorita
 * @param {number} aulaId - ID da aula a ser marcada/desmarcada
 * @returns {Object} Objeto com status da operação
 */
export function toggleFavorito(aulaId) {
  // Encontrar a aula em todos os níveis e módulos
  let aulaEncontrada = null;
  
  cursosData.niveis.forEach(nivel => {
    nivel.modulos.forEach(modulo => {
      const aula = modulo.aulas.find(a => a.id === aulaId);
      if (aula) {
        aula.favorito = !aula.favorito;
        aulaEncontrada = aula;
      }
    });
  });
  
  // Em um ambiente real, seria feita uma chamada à API para persistir a mudança
  return {
    success: !!aulaEncontrada,
    message: aulaEncontrada ? "Status de favorito atualizado com sucesso" : "Aula não encontrada",
    data: aulaEncontrada
  };
}

/**
 * Função para marcar/desmarcar uma aula como concluída
 * @param {number} aulaId - ID da aula a ser marcada/desmarcada
 * @returns {Object} Objeto com status da operação
 */
export function toggleConcluido(aulaId) {
  // Encontrar a aula em todos os níveis e módulos
  let aulaEncontrada = null;
  
  cursosData.niveis.forEach(nivel => {
    nivel.modulos.forEach(modulo => {
      const aula = modulo.aulas.find(a => a.id === aulaId);
      if (aula) {
        aula.concluido = !aula.concluido;
        aulaEncontrada = aula;
      }
    });
  });
  
  // Em um ambiente real, seria feita uma chamada à API para persistir a mudança
  return {
    success: !!aulaEncontrada,
    message: aulaEncontrada ? "Status de conclusão atualizado com sucesso" : "Aula não encontrada",
    data: aulaEncontrada
  };
}

