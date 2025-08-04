import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const getMenuItems = () => {
    switch (userType) {
      case "aluno":
        return [
          { name: t('dashboard.classes'), path: "/dashboard/aluno/aulas", icon: Video },
          { name: t('dashboard.materials'), path: "/dashboard/aluno/materiais", icon: FileText },
          { name: t('dashboard.tasks'), path: "/dashboard/aluno/tarefas", icon: CheckSquare },
          { name: t('dashboard.schedule'), path: "/dashboard/aluno/cronograma", icon: Calendar },
          { name: t('dashboard.messages'), path: "/dashboard/aluno/mensagens", icon: MessageSquare },
        ];
      case "professor":
        return [
          { name: t('teacher.myGroups'), path: "/dashboard/professor/turmas", icon: Users },
          { name: t('teacher.sendContent'), path: "/dashboard/professor/conteudo", icon: Upload },
          { name: t('teacher.correctTasks'), path: "/dashboard/professor/correcao", icon: CheckSquare },
          { name: t('teacher.performance'), path: "/dashboard/professor/desempenho", icon: BarChart3 },
          { name: t('dashboard.messages'), path: "/dashboard/professor/mensagens", icon: MessageSquare },
        ];
      case "admin":
        return [
          { name: t('navigation.dashboard'), path: "/dashboard/admin", icon: BarChart3 },
          { name: t('admin.manageStudents'), path: "/dashboard/admin/alunos", icon: Users },
          { name: t('admin.manageTeachers'), path: "/dashboard/admin/professores", icon: Shield },
          { name: t('admin.announcements'), path: "/dashboard/admin/comunicados", icon: MessageSquare },
          { name: t('admin.reports'), path: "/dashboard/admin/relatorios", icon: FileText },
          { name: t('admin.configurations'), path: "/dashboard/admin/configuracoes", icon: Settings },
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
                {userType === "aluno" && t('student.myClasses').split(' ')[0]}
                {userType === "professor" && t('common.teacher')}
                {userType === "admin" && t('admin.manageStudents').split(' ')[0]}
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
            {t('common.exit')}
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
            {t('navigation.dashboard')} {userType === "aluno" && t('student.myClasses').split(' ')[0]}
            {userType === "professor" && t('common.teacher')}
            {userType === "admin" && "Admin"}
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              {t('common.help')}
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