
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Playbacks from "./pages/Playbacks";
import Material from "./pages/Material";
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuthProvider from "./context/AuthContext";
import { PrivateRoute, PublicRoute } from "./components/AuthRoutes";

// Cliente do React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rotas protegidas - requerem autenticação */}
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/playbacks" 
              element={
                <PrivateRoute>
                  <Playbacks />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/material" 
              element={
                <PrivateRoute>
                  <Material />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/forum" 
              element={
                <PrivateRoute>
                  <Forum />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            
            {/* Rotas públicas */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            
            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
