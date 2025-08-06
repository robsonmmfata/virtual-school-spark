import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, GraduationCap, BookOpen, TrendingUp, Calendar, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
  const { t } = useTranslation();
  
  const stats = [
    {
      title: t('common.totalStudents'),
      value: "248",
      change: "+12%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: t('common.activeTeachers'),
      value: "15",
      change: "+2",
      icon: GraduationCap,
      color: "text-education-green"
    },
    {
      title: t('common.classes'),
      value: "18",
      change: "+3",
      icon: BookOpen,
      color: "text-education-orange"
    },
    {
      title: t('common.approvalRate'),
      value: "94%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-education-purple"
    }
  ];

  const alunosPorTurma = [
    { turma: "1º A", alunos: 28, capacidade: 30 },
    { turma: "1º B", alunos: 25, capacidade: 30 },
    { turma: "2º A", alunos: 30, capacidade: 30 },
    { turma: "2º B", alunos: 27, capacidade: 30 },
    { turma: "3º A", alunos: 24, capacidade: 30 },
    { turma: "3º B", alunos: 22, capacidade: 30 }
  ];

  const evolucaoMatriculas = [
    { mes: "Jan", matriculas: 220 },
    { mes: "Fev", matriculas: 235 },
    { mes: "Mar", matriculas: 248 },
    { mes: "Abr", matriculas: 248 },
    { mes: "Mai", matriculas: 248 }
  ];

  const atividades = [
    { tipo: t('common.newEnrollment'), aluno: "Pedro Silva", horario: `${t('common.hours')} 2 ${t('common.hour')}` },
    { tipo: t('common.teacherAdded'), professor: "Dr. Carlos Lima", horario: `${t('common.hours')} 3 ${t('common.hour')}` },
    { tipo: t('common.announcementSent'), detalhes: "Informações sobre férias", horario: `${t('common.hours')} 5 ${t('common.hour')}` },
    { tipo: t('common.reportGenerated'), detalhes: "Notas do 1º bimestre", horario: `${t('common.hours')} 1 ${t('common.days')}` }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('common.administrativeDashboard')}</h1>
        <p className="text-muted-foreground">{t('common.virtualSchoolOverview')}</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-education-green">
                    {stat.change} {t('common.thisMonth')}
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Ocupação das Turmas */}
        <Card>
          <CardHeader>
            <CardTitle>{t('common.classOccupancy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alunosPorTurma.map((turma, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{turma.turma}</span>
                    <span>{turma.alunos}/{turma.capacidade} {t('common.studentsPerClass')}</span>
                  </div>
                  <Progress value={(turma.alunos / turma.capacidade) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t('common.recentActivities')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atividades.map((atividade, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 bg-education-green rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{atividade.tipo}</p>
                    {atividade.aluno && (
                      <p className="text-xs text-muted-foreground">{t('student.student')}: {atividade.aluno}</p>
                    )}
                    {atividade.professor && (
                      <p className="text-xs text-muted-foreground">{t('common.teacher')}: {atividade.professor}</p>
                    )}
                    {atividade.detalhes && (
                      <p className="text-xs text-muted-foreground">{atividade.detalhes}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{atividade.horario}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Evolução */}
      <Card>
        <CardHeader>
          <CardTitle>{t('common.enrollmentEvolution')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evolucaoMatriculas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="matriculas" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resumo Rápido */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-education-orange mx-auto mb-2" />
            <p className="text-2xl font-bold">47</p>
            <p className="text-sm text-muted-foreground">{t('common.pendingMessages')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-education-purple mx-auto mb-2" />
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-muted-foreground">{t('common.sentTasks')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">8.4</p>
            <p className="text-sm text-muted-foreground">{t('common.generalAverage')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;