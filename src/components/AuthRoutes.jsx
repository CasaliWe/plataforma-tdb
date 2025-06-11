// Componente para proteger rotas com autenticação
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente para rotas que exigem autenticação
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Exibe um loader enquanto verifica a autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Redireciona para login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Renderiza o conteúdo se estiver autenticado
  return children;
};

// Componente para rotas públicas (como login)
// Redireciona para a página inicial se já estiver autenticado
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Exibe um loader enquanto verifica a autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Redireciona para a página inicial se já estiver autenticado
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Renderiza o conteúdo se não estiver autenticado
  return children;
};
