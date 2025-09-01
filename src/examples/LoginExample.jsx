import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const LoginExample = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(credentials.email, credentials.password);

      if (result.success) {
        toast({
          title: "Login realizado!",
          description: `Bem-vindo, ${result.user.nome}!`,
        });

        // Redirecionar baseado no tipo de usuário
        switch (result.user.tipo) {
          case 'aluno':
            window.location.href = '/dashboard/aluno';
            break;
          case 'professor':
            window.location.href = '/dashboard/professor';
            break;
          case 'admin':
            window.location.href = '/dashboard/admin';
            break;
          default:
            window.location.href = '/dashboard';
        }
      } else {
        toast({
          title: "Erro no login",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login com API</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Credenciais de Teste:</h4>
            <div className="text-sm space-y-1">
              <p><strong>Admin:</strong> admin@eduvirtual.com.br / 123456</p>
              <p><strong>Professor:</strong> professor@eduvirtual.com.br / 123456</p>
              <p><strong>Aluno:</strong> aluno@eduvirtual.com.br / 123456</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginExample;
