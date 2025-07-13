import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Menu, 
  X, 
  LogOut,
  Video,
  FileText,
  CheckSquare,
  Calendar,
  MessageSquare,
  Upload,
  Users,
  BarChart3,
  Shield,
  BookOpen,
  Settings
} from "lucide-react";

interface DashboardLayoutProps {
  userType: "aluno" | "professor" | "admin";
  userName: string;
}

const DashboardLayout = ({ userType, userName }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getMenuItems = () => {
    switch (userType) {
      case "aluno":
        return [
          { name: "Aulas", path: "/dashboard/aluno/aulas", icon: Video },
          { name: "Materiais", path: "/dashboard/aluno/materiais", icon: FileText },
          { name: "Tarefas", path: "/dashboard/aluno/tarefas", icon: CheckSquare },
          { name: "Cronograma", path: "/dashboard/aluno/cronograma", icon: Calendar },
          { name: "Mensagens", path: "/dashboard/aluno/mensagens", icon: MessageSquare },
        ];
      case "professor":
        return [
          { name: "Minhas Turmas", path: "/dashboard/professor/turmas", icon: Users },
          { name: "Enviar Conteúdo", path: "/dashboard/professor/conteudo", icon: Upload },
          { name: "Corrigir Tarefas", path: "/dashboard/professor/correcao", icon: CheckSquare },
          { name: "Desempenho", path: "/dashboard/professor/desempenho", icon: BarChart3 },
          { name: "Mensagens", path: "/dashboard/professor/mensagens", icon: MessageSquare },
        ];
      case "admin":
        return [
          { name: "Dashboard", path: "/dashboard/admin", icon: BarChart3 },
          { name: "Gerenciar Alunos", path: "/dashboard/admin/alunos", icon: Users },
          { name: "Gerenciar Professores", path: "/dashboard/admin/professores", icon: Shield },
          { name: "Comunicados", path: "/dashboard/admin/comunicados", icon: MessageSquare },
          { name: "Relatórios", path: "/dashboard/admin/relatorios", icon: FileText },
          { name: "Configurações", path: "/dashboard/admin/configuracoes", icon: Settings },
        ];
      default:
        return [];
    }
  };

  const getUserColor = () => {
    switch (userType) {
      case "aluno": return "text-primary";
      case "professor": return "text-education-green";
      case "admin": return "text-education-purple";
      default: return "text-primary";
    }
  };

  const getUserBg = () => {
    switch (userType) {
      case "aluno": return "bg-gradient-primary";
      case "professor": return "bg-education-green";
      case "admin": return "bg-education-purple";
      default: return "bg-gradient-primary";
    }
  };

  const menuItems = getMenuItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/" className="flex items-center space-x-2">
            <div className={`p-2 ${getUserBg()} rounded-lg shadow-elegant`}>
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">EduVirtual</h1>
              <p className="text-xs text-muted-foreground capitalize">{userType}</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${getUserBg()} rounded-full flex items-center justify-center text-primary-foreground font-semibold`}>
              {userName.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-foreground">{userName}</p>
              <p className={`text-sm ${getUserColor()}`}>
                {userType === "aluno" && "Estudante"}
                {userType === "professor" && "Professor"}
                {userType === "admin" && "Administrador"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive(item.path)
                  ? `${getUserBg()} text-primary-foreground shadow-elegant`
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => window.location.href = "/"}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <header className="bg-card border-b border-border p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold text-foreground">
            Dashboard {userType === "aluno" && "do Aluno"}
            {userType === "professor" && "do Professor"}
            {userType === "admin" && "Administrativo"}
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Ajuda
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;