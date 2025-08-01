import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, User, Lock, ArrowLeft } from "lucide-react";

const LoginProfessor = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de autenticação
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/professor");
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
            <div className="mx-auto w-16 h-16 bg-education-green rounded-full flex items-center justify-center shadow-glow">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Portal do Professor
            </CardTitle>
            <p className="text-muted-foreground">
              Acesse sua área de ensino
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-foreground">
                  <User className="h-4 w-4 text-education-green" />
                  E-mail Institucional
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="professor@eduvirtual.com.br"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  required
                  className="border-border focus:border-education-green"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-foreground">
                  <Lock className="h-4 w-4 text-education-green" />
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  required
                  className="border-border focus:border-education-green"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span>Lembrar-me</span>
                </label>
                <Link to="#" className="text-education-green hover:text-education-green/80 transition-colors duration-300">
                  Esqueceu a senha?
                </Link>
              </div>

              <Button 
                type="submit" 
                variant="success"
                className="w-full" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Acesso restrito aos professores da instituição.</p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                É aluno?{" "}
                <Link to="/login/aluno" className="text-primary hover:text-primary-glow transition-colors duration-300">
                  Acesse o Portal do Aluno
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

export default LoginProfessor;