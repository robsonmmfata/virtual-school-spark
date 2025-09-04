import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './i18n';
import Home from "./pages/Home";
import LoginAluno from "./pages/LoginAluno";
import LoginProfessor from "./pages/LoginProfessor";
import LoginAdmin from "./pages/LoginAdmin";
import LoginSecretaria from "./pages/LoginSecretaria";
import DashboardAluno from "./pages/DashboardAluno";
import DashboardProfessor from "./pages/DashboardProfessor";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardSecretaria from "./pages/DashboardSecretaria";
import AlunoAulas from "./pages/aluno/AlunoAulas";
import AlunoMateriais from "./pages/aluno/AlunoMateriais";
import AlunoTarefas from "./pages/aluno/AlunoTarefas";
import AlunoCronograma from "./pages/aluno/AlunoCronograma";
import AlunoMensagens from "./pages/aluno/AlunoMensagens";
import ProfessorTurmas from "./pages/professor/ProfessorTurmas";
import ProfessorConteudo from "./pages/professor/ProfessorConteudo";
import ProfessorCorrecao from "./pages/professor/ProfessorCorrecao";
import ProfessorDesempenho from "./pages/professor/ProfessorDesempenho";
import ProfessorMensagens from "./pages/professor/ProfessorMensagens";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAlunos from "./pages/admin/AdminAlunos";
import AdminProfessores from "./pages/admin/AdminProfessores";
import AdminComunicados from "./pages/admin/AdminComunicados";
import AdminRelatorios from "./pages/admin/AdminRelatorios";
import AdminConfiguracoes from "./pages/admin/AdminConfiguracoes";
import SecretariaMatriculas from "./pages/secretaria/SecretariaMatriculas";
import SecretariaDocumentos from "./pages/secretaria/SecretariaDocumentos";
import SecretariaHorarios from "./pages/secretaria/SecretariaHorarios";
import SecretariaRelatorios from "./pages/secretaria/SecretariaRelatorios";
import NotFound from "./pages/NotFound";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Login Routes */}
          <Route path="/login/aluno" element={<LoginAluno />} />
          <Route path="/login/professor" element={<LoginProfessor />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/login/secretaria" element={<LoginSecretaria />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/aluno" element={<DashboardAluno />}>
            <Route index element={<AlunoAulas />} />
            <Route path="aulas" element={<AlunoAulas />} />
            <Route path="materiais" element={<AlunoMateriais />} />
            <Route path="tarefas" element={<AlunoTarefas />} />
            <Route path="cronograma" element={<AlunoCronograma />} />
            <Route path="mensagens" element={<AlunoMensagens />} />
          </Route>
          
          <Route path="/dashboard/professor" element={<DashboardProfessor />}>
            <Route index element={<ProfessorTurmas />} />
            <Route path="turmas" element={<ProfessorTurmas />} />
            <Route path="conteudo" element={<ProfessorConteudo />} />
            <Route path="correcao" element={<ProfessorCorrecao />} />
            <Route path="desempenho" element={<ProfessorDesempenho />} />
            <Route path="mensagens" element={<ProfessorMensagens />} />
          </Route>
          
          <Route path="/dashboard/admin" element={<DashboardAdmin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="alunos" element={<AdminAlunos />} />
            <Route path="professores" element={<AdminProfessores />} />
            <Route path="comunicados" element={<AdminComunicados />} />
            <Route path="relatorios" element={<AdminRelatorios />} />
            <Route path="configuracoes" element={<AdminConfiguracoes />} />
          </Route>
          
          <Route path="/dashboard/secretaria" element={<DashboardSecretaria />}>
            <Route index element={<SecretariaMatriculas />} />
            <Route path="matriculas" element={<SecretariaMatriculas />} />
            <Route path="documentos" element={<SecretariaDocumentos />} />
            <Route path="horarios" element={<SecretariaHorarios />} />
            <Route path="relatorios" element={<SecretariaRelatorios />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
