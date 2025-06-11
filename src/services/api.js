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

export default {
  login,
  getUserInfo,
  updateUserInfo,
  verifyToken
};


// *****************TUDO QUE FOR RELACIONADO A USUÁRIOS E AUTENTICAÇÃO****************
