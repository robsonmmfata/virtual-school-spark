import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, User, Lock, ArrowLeft } from "lucide-react";

const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de autenticação
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary-foreground hover:text-education-orange transition-colors duration-300">
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar ao site</span>
          </Link>
        </div>

        <Card className="shadow-elegant border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-education-purple rounded-full flex items-center justify-center shadow-glow">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Painel Administrativo
            </CardTitle>
            <p className="text-muted-foreground">
              Acesso restrito à administração
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-foreground">
                  <User className="h-4 w-4 text-education-purple" />
                  E-mail Administrativo
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@eduvirtual.com.br"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  required
                  className="border-border focus:border-education-purple"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-foreground">
                  <Lock className="h-4 w-4 text-education-purple" />
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  required
                  className="border-border focus:border-education-purple"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span>Lembrar-me</span>
                </label>
                <Link to="#" className="text-education-purple hover:text-education-purple/80 transition-colors duration-300">
                  Esqueceu a senha?
                </Link>
              </div>

              <Button 
                type="submit" 
                variant="purple"
                className="w-full" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Área restrita para administradores e secretaria.</p>
            </div>

            <div className="mt-4 space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                Outros acessos:{" "}
                <Link to="/login/aluno" className="text-primary hover:text-primary-glow transition-colors duration-300">
                  Aluno
                </Link>
                {" | "}
                <Link to="/login/professor" className="text-education-green hover:text-education-green/80 transition-colors duration-300">
                  Professor
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-blue-200">
            Para demonstração, use qualquer e-mail/senha
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;