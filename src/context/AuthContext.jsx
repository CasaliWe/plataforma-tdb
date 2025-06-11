// Contexto de autenticação para gerenciar o estado do usuário logado
import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { verifyToken } from "../services/api";

// Chave usada para armazenar o token no cookie
export const AUTH_TOKEN_KEY = "auth_token";
export const AUTH_USER_KEY = "auth_user";

// Tempo de expiração do cookie em dias
const COOKIE_EXPIRATION_DAYS = 1; // 1 dia

// Criação do contexto de autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar token no carregamento do aplicativo
  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get(AUTH_TOKEN_KEY);
      
      if (token) {
        // Verifica se o token é válido com a API
        const response = await verifyToken(token);
        
        if (response.success) {
          setUser(response.user);
          setIsAuthenticated(true);
          
          // Salva informações do usuário para acesso rápido
          Cookies.set(AUTH_USER_KEY, JSON.stringify(response.user), { 
            expires: COOKIE_EXPIRATION_DAYS,
            sameSite: 'strict'
          });
        } else {
          // Token inválido, remove os cookies
          Cookies.remove(AUTH_TOKEN_KEY);
          Cookies.remove(AUTH_USER_KEY);
        }
      }
      
      setLoading(false);
    };
    
    checkToken();
  }, []);

  // Função para realizar o login
  const signIn = (token, userData, expiresAt) => {
    // Salva o token no cookie
    Cookies.set(AUTH_TOKEN_KEY, token, { 
      expires: COOKIE_EXPIRATION_DAYS,
      sameSite: 'strict'
    });
    
    // Salva informações do usuário para acesso rápido
    Cookies.set(AUTH_USER_KEY, JSON.stringify(userData), { 
      expires: COOKIE_EXPIRATION_DAYS,
      sameSite: 'strict'
    });
    
    // Atualiza o estado do contexto
    setUser(userData);
    setIsAuthenticated(true);
    
    return true;
  };

  // Função para realizar o logout
  const signOut = () => {
    // Remove os cookies
    Cookies.remove(AUTH_TOKEN_KEY);
    Cookies.remove(AUTH_USER_KEY);
    
    // Limpa o estado do contexto
    setUser(null);
    setIsAuthenticated(false);
    
    return true;
  };

  // Valores disponibilizados pelo contexto
  const contextValue = {
    user,
    loading,
    isAuthenticated,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  
  return context;
};

export default AuthProvider;
