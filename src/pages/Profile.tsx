import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { User, Key, Save, Eye, EyeOff, AtSign, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { getUserInfo, updateUserInfo } from '@/services/api';

const Profile = () => {  const { toast } = useToast();
  const { user: authUser } = useAuth();
    
  // Estado para armazenar dados do perfil
  const [profileData, setProfileData] = useState({
    name: '',
    nickname: '',
    email: '',
    login: '',
    phone: '',
  });
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
    // Carregar dados do usuário ao montar o componente
  useEffect(() => {
    const loadUserInfo = async () => {
      if (authUser && authUser.id) {
        // Obtém informações detalhadas do usuário
        const response = getUserInfo(authUser.id);
        
        if (response.success) {
          setProfileData({
            name: response.user.name || '',
            nickname: response.user.nickname || '',
            email: response.user.email || '',
            login: response.user.login || '',
            phone: response.user.phone || '',
          });
        }
      }
    };
    
    loadUserInfo();
  }, [authUser]);
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authUser && authUser.id) {
      // Chama a API para atualizar as informações do usuário
      const response = updateUserInfo(authUser.id, profileData);
      
      if (response.success) {
        toast({
          title: "Perfil atualizado",
          description: "Seus dados foram atualizados com sucesso.",
          variant: "default",
        });
      } else {
        toast({
          title: "Erro ao atualizar",
          description: "Não foi possível atualizar seus dados. Tente novamente.",
          variant: "destructive",
        });
      }
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
    
    // Aplica a formatação conforme o tamanho do número
    if (numericValue.length <= 2) {
      return `(${numericValue}`;
    } else if (numericValue.length <= 3) {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
    } else if (numericValue.length <= 7) {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 3)} ${numericValue.slice(3)}`;
    } else if (numericValue.length <= 11) {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 3)} ${numericValue.slice(3, 7)}-${numericValue.slice(7)}`;
    } else {
      // Limita o tamanho máximo
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 3)} ${numericValue.slice(3, 7)}-${numericValue.slice(7, 11)}`;
    }
  };
  
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setProfileData({ ...profileData, phone: formattedPhone });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Erro ao atualizar senha",
        description: "A nova senha e a confirmação não correspondem.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Senha atualizada",
      description: "Sua senha foi atualizada com sucesso.",
      variant: "default",
    });
    
    setPasswords({
      current: '',
      new: '',
      confirm: '',
    });
  };
  // Função removida para não permitir upload de imagem

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="secao-container py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold texto-gradiente">
            Seu Perfil
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Atualize suas informações e personalize sua experiência
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="profile" className="text-base">
                <User className="h-4 w-4 mr-2" />
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="security" className="text-base">
                <Key className="h-4 w-4 mr-2" />
                Segurança
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card className="cartao-gradiente">
                <CardHeader>
                  <CardTitle className="texto-gradiente">Informações do Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Avatar className="w-32 h-32 border-4 border-primary/50">
                        <AvatarFallback className="bg-accent text-accent-foreground text-4xl">
                          {/* Exibe as iniciais do nome completo (até 2 primeiras palavras) */}
                          {profileData.name ? profileData.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : ''}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground font-medium">
                          Nome Completo
                        </Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </div>
                        <div className="space-y-2">
                        <Label htmlFor="nickname" className="text-foreground font-medium">
                          Apelido
                        </Label>
                        <Input
                          id="nickname"
                          value={profileData.nickname}
                          onChange={(e) => setProfileData({...profileData, nickname: e.target.value})}
                          className="bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login" className="text-foreground font-medium flex items-center gap-1">
                          <AtSign className="h-4 w-4" />
                          Login
                        </Label>
                        <Input
                          id="login"
                          value={profileData.login}
                          onChange={(e) => setProfileData({...profileData, login: e.target.value})}
                          className="bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email" className="text-foreground font-medium">
                          E-mail
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="phone" className="text-foreground font-medium flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          Telefone
                        </Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={handlePhoneChange}
                          className="bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary"
                          placeholder="(00) 0 0000-0000"
                        />
                      </div>
                    </div>
                      <div className="pt-4 flex justify-center md:justify-end">
                      <Button 
                        type="submit" 
                        className="botao-primario"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Salvar alterações
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="cartao-gradiente">
                <CardHeader>
                  <CardTitle className="texto-gradiente">Alterar Senha</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordUpdate} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-foreground font-medium">
                          Senha Atual
                        </Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showPasswords.current ? 'text' : 'password'}
                            value={passwords.current}
                            onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                            className="bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('current')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPasswords.current ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-foreground font-medium">
                          Nova Senha
                        </Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showPasswords.new ? 'text' : 'password'}
                            value={passwords.new}
                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                            className="bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('new')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPasswords.new ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-foreground font-medium">
                          Confirmar Nova Senha
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showPasswords.confirm ? 'text' : 'password'}
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                            className="bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('confirm')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPasswords.confirm ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                      <div className="pt-4 flex justify-center md:justify-end">
                      <Button 
                        type="submit" 
                        className="botao-primario"
                      >
                        <Key className="h-4 w-4 mr-2" />
                        Atualizar Senha
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
