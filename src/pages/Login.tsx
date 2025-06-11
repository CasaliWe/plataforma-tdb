
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { login as apiLogin } from '@/services/api';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validação básica
    if (!username || !password) {
      setError('Informe seu login e senha para continuar.');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Chama a API para autenticar o usuário
      const response = apiLogin(username, password);
      
      if (!response.success) {
        setError(response.message || 'Login ou senha inválidos.');
        setIsLoading(false);
        return;
      }
      
      // Armazena os dados do usuário no contexto de autenticação
      signIn(response.token, response.user, response.expiresAt);
      
      // Redireciona para a página inicial após o login
      navigate('/');
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Partículas de fundo */}
      <div className="particulas">
        <div className="particula" style={{ top: '10%', left: '10%', width: '4px', height: '4px', animationDelay: '0s' }}></div>
        <div className="particula" style={{ top: '20%', left: '80%', width: '3px', height: '3px', animationDelay: '2s' }}></div>
        <div className="particula" style={{ top: '60%', left: '20%', width: '2px', height: '2px', animationDelay: '4s' }}></div>
        <div className="particula" style={{ top: '80%', left: '70%', width: '5px', height: '5px', animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="cartao-gradiente">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center animacao-brilho">
              <span className="text-2xl">🥁</span>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold texto-gradiente">
                THE DRUMMER BOY
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Faça login para acessar suas aulas
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="login" className="text-foreground font-medium">
                  Login
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login"
                    type="text"
                    placeholder="casaliwe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary"                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>              <Button 
                type="submit" 
                className="w-full botao-primario h-12 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>

              <div className="text-center">
                <a
                  href='https://wa.me/5554991538488?text=Preciso recuperar minha senha da plaforma!'
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Esqueceu sua senha?
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            © 2025 The Drummer Boy. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
