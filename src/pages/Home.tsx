import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Video,
  Users,
  Award,
  Clock,
  Globe,
  CheckCircle,
  Star,
  Mail,
  User,
  MessageSquare,
  FileText,
  Target,
  Eye,
  Handshake,
  CheckSquare,
  FileText as FileTextIcon,
  Laptop,
  Wifi,
  Camera,
  Layers,
  Code,
  Check,
  ClipboardList,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-education.jpg";
import teacher1 from "@/assets/teacher-1.jpg";
import teacher2 from "@/assets/teacher-2.jpg";
import teacher3 from "@/assets/teacher-3.jpg";
import teacher4 from "@/assets/asiatica.jpg";
import teacher5 from "@/assets/asiatico.jpg";
import teacher6 from "@/assets/brasileira.jpg";
import Testimonials from '@/components/Testimonials';

const Home = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('notifications.messagesSent'));
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const estruturaCards = [
    {
      icon: Video,
      title: t('home.features.virtualClassroom'),
      description: t('home.features.virtualClassroomDesc')
    },
    {
      icon: BookOpen,
      title: t('home.features.materialManagement'),
      description: t('home.features.materialManagementDesc')
    },
    {
      icon: Users,
      title: t('home.features.progressTracking'),
      description: t('home.features.progressTrackingDesc')
    },
    {
      icon: Award,
      title: t('common.certificate'),
      description: t('common.certificateDesc')
    },
    {
      icon: Clock,
      title: t('common.flexibility'),
      description: t('common.flexibilityDesc')
    },
    {
      icon: Globe,
      title: t('common.globalPlatform'),
      description: t('common.globalPlatformDesc')
    }
  ];

  const professores = [
    {
      name: t('home.teachers.teacher1.name'),
      specialty: t('home.teachers.teacher1.specialty'),
      experience: t('home.teachers.teacher1.experience'),
      image: teacher1
    },
    {
      name: t('home.teachers.teacher2.name'),
      specialty: t('home.teachers.teacher2.specialty'),
      experience: t('home.teachers.teacher2.experience'),
      image: teacher2
    },
    {
      name: t('home.teachers.teacher3.name'),
      specialty: t('home.teachers.teacher3.specialty'),
      experience: t('home.teachers.teacher3.experience'),
      image: teacher6
    },
    {
      name: t('home.teachers.teacher4.name'),
      specialty: t('home.teachers.teacher4.specialty'),
      experience: t('home.teachers.teacher4.experience'),
      image: teacher3
    },
    {
      name: t('home.teachers.teacher5.name'),
      specialty: t('home.teachers.teacher5.specialty'),
      experience: t('home.teachers.teacher5.experience'),
      image: teacher4
    },
    {
      name: t('home.teachers.teacher6.name'),
      specialty: t('home.teachers.teacher6.specialty'),
      experience: t('home.teachers.teacher6.experience'),
      image: teacher5
    },
  ];

  const curriculumData = [
    t('home.academics.curriculum.grade9', { returnObjects: true }),
    t('home.academics.curriculum.grade10', { returnObjects: true }),
    t('home.academics.curriculum.grade11', { returnObjects: true }),
    t('home.academics.curriculum.grade12', { returnObjects: true }),
  ].filter(Boolean);

  const summerCourses = Array.isArray(t('home.academics.summerCourses.locations', { returnObjects: true })) ? t('home.academics.summerCourses.locations', { returnObjects: true }) as string[] : [];

  const renderSpecs = (specs: unknown) => {
    if (!Array.isArray(specs)) {
      console.error("Erro: 'specs' não é uma array. Verifique seu arquivo de tradução.");
      return null;
    }
    
    return (
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        {specs.map((spec, index) => (
          <li key={index}>{spec}</li>
        ))}
      </ul>
    );
  };

  const technicalRequirementsData = [
    {
      icon: Laptop,
      title: t('admissions.technicalRequirements.list.computer.title'),
      desc: t('admissions.technicalRequirements.list.computer.desc'),
      specs: t('admissions.technicalRequirements.list.computer.specs', { returnObjects: true })
    },
    {
      icon: Wifi,
      title: t('admissions.technicalRequirements.list.internet.title'),
      specs: t('admissions.technicalRequirements.list.internet.specs', { returnObjects: true })
    },
    {
      icon: Camera,
      title: t('admissions.technicalRequirements.list.webcam.title'),
      specs: t('admissions.technicalRequirements.list.webcam.specs', { returnObjects: true })
    },
    {
      icon: Globe,
      title: t('admissions.technicalRequirements.list.browser.title'),
      specs: t('admissions.technicalRequirements.list.browser.specs', { returnObjects: true })
    },
    {
      icon: Code,
      title: t('admissions.technicalRequirements.list.software.title'),
      specs: t('admissions.technicalRequirements.list.software.specs', { returnObjects: true })
    },
    {
      icon: Check,
      title: t('admissions.technicalRequirements.list.platformAccess.title'),
      specs: t('admissions.technicalRequirements.list.platformAccess.specs', { returnObjects: true })
    },
    {
      icon: ClipboardList,
      title: t('admissions.technicalRequirements.list.supplies.title'),
      specs: t('admissions.technicalRequirements.list.supplies.specs', { returnObjects: true })
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={t('home.virtualEducation')}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-primary-foreground space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {t('home.title')}
              <span className="block text-education-orange">{t('home.subtitle')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button size="xl" variant="hero" className="group">
                {t('home.getStarted')}
                <CheckCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </Button>
              <Button size="xl" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-primary-foreground hover:bg-white/20">
                {t('home.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a Escola */}
      <section id="sobre" className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('home.aboutEduVirtual')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('home.aboutDescription1')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('home.aboutDescription2')}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5000+</div>
                  <div className="text-muted-foreground">{t('home.studentsGraduated')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-muted-foreground">{t('home.approvalRate')}</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/saladeaula.jpg"
                alt={t('home.virtualClassroom')}
                className="rounded-lg shadow-elegant w-full"
              />
              <div className="absolute inset-0 bg-gradient-primary/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section id="missao-visao-valores" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t('home.missionVisionValuesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-primary/20 bg-card">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('home.mission.title')}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t('home.mission.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-education-orange/20 bg-card">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-education-orange to-amber-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Eye className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('home.vision.title')}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t('home.vision.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-green-500/20 bg-card">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Handshake className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('home.values.title')}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t('home.values.desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Acreditação */}
      <section id="acreditacao" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block bg-primary/10 rounded-full p-3 mb-4">
              <CheckSquare className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('home.accreditation.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('home.accreditation.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Nossos Acadêmicos */}
      <section id="academicos" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('home.academics.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('home.academics.subtitle')}
            </p>
          </div>

          {/* Programas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border/50">
              <CardContent className="p-6 space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto shadow-elegant group-hover:shadow-glow transition-all duration-300">
                  <FileTextIcon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('home.academics.programs.fundamental.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('home.academics.programs.fundamental.desc')}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border/50">
              <CardContent className="p-6 space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto shadow-elegant group-hover:shadow-glow transition-all duration-300">
                  <FileTextIcon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('home.academics.programs.middle.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('home.academics.programs.middle.desc')}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border/50">
              <CardContent className="p-6 space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto shadow-elegant group-hover:shadow-glow transition-all duration-300">
                  <FileTextIcon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('home.academics.programs.highSchool.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('home.academics.programs.highSchool.desc')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Grade Curricular */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {curriculumData.map((grade: any, index: number) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border/50">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-foreground mb-4">{grade?.title}</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {Array.isArray(grade?.courses) && grade.courses.map((course: string, courseIndex: number) => (
                      <li key={courseIndex} className="flex items-start">
                        <span className="text-primary mr-2"><CheckCircle size={16} /></span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Aulas de Verão */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">{t('home.academics.summerCourses.title')}</h3>
            <ul className="flex flex-wrap justify-center gap-4 text-lg text-muted-foreground">
              {summerCourses.map((location, index) => (
                <li key={index} className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                  <Globe className="h-4 w-4 text-primary" />
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RECURSOS - ADMISSÕES - SEÇÃO ATUALIZADA */}
      <section id="admissoes" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('admissions.title')}</h2>
          </div>
          
          {/* Começando com Cards e Ícones */}
          <div className="space-y-12 mb-12">
            <h3 className="text-2xl font-bold text-center">{t('admissions.gettingStarted.title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 space-y-4 flex flex-col items-center text-center group transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold">{t('admissions.gettingStarted.accessAnytime.title')}</h4>
                <p className="text-gray-600 text-sm">{t('admissions.gettingStarted.accessAnytime.desc')}</p>
              </Card>
              <Card className="p-6 space-y-4 flex flex-col items-center text-center group transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Video className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold">{t('admissions.gettingStarted.liveWeekendClasses.title')}</h4>
                <p className="text-gray-600 text-sm">{t('admissions.gettingStarted.liveWeekendClasses.desc')}</p>
              </Card>
              <Card className="p-6 space-y-4 flex flex-col items-center text-center group transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
                <h4 className="text-xl font-semibold">{t('admissions.gettingStarted.afterSchoolSupport.title')}</h4>
                <p className="text-gray-600 text-sm">{t('admissions.gettingStarted.afterSchoolSupport.desc')}</p>
              </Card>
              <Card className="p-6 space-y-4 flex flex-col items-center text-center group transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold">{t('admissions.gettingStarted.rigorousCurriculum.title')}</h4>
                <p className="text-gray-600 text-sm">{t('admissions.gettingStarted.rigorousCurriculum.desc')}</p>
              </Card>
            </div>
          </div>

          {/* Custo e Mensalidade Section - CENTRALIZADO E COM EFEITO */}
          <div className="my-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">{t('admissions.costAndTuition.title')}</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center">{t('admissions.costAndTuition.desc')}</p>
          </div>

          {/* Requisitos Técnicos com Cards e Ícones */}
          <div className="space-y-12 mb-12">
            <h3 className="text-2xl font-bold text-center">{t('admissions.technicalRequirements.title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {technicalRequirementsData.map((req, index) => (
                <Card key={index} className="p-6 space-y-4 group transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
                  <div className="flex items-center space-x-4">
                    <req.icon className="h-8 w-8 text-primary flex-shrink-0" />
                    <h4 className="text-xl font-semibold">{req.title}</h4>
                  </div>
                  {req.desc && <p className="text-gray-600 text-sm">{req.desc}</p>}
                  {Array.isArray(req.specs) && (
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                      {req.specs.map((spec, i) => (
                        <li key={i}>{spec}</li>
                      ))}
                    </ul>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Application Paths Section - Centralizado com Ícones */}
          <div className="space-y-12 mb-12">
            <h3 className="text-2xl font-bold text-center">{t('admissions.applicationPaths.title')}</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 space-y-4 text-center group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <Layers className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{t('admissions.applicationPaths.creditTransfer.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('admissions.applicationPaths.creditTransfer.desc')}</p>
              </Card>
              <Card className="p-6 space-y-4 text-center group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{t('admissions.applicationPaths.homeschoolTransfer.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('admissions.applicationPaths.homeschoolTransfer.desc')}</p>
              </Card>
            </div>
          </div>

          {/* Requisitos de Graduação - CARD COM ESTILO */}
          <div className="space-y-12 mb-12">
            <div className="max-w-4xl mx-auto p-8 bg-card rounded-lg shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
                {t('admissions.graduationRequirements.title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                {t('admissions.graduationRequirements.desc1')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                {t('admissions.graduationRequirements.desc2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estrutura de Ensino */}
      <section id="estrutura" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('home.teachingStructure')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('home.teachingStructureDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {estruturaCards.map((card, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-300">
                    <card.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <Testimonials />

      {/* Equipe Pedagógica */}
      <section id="equipe" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('home.pedagogicalTeam')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('home.pedagogicalTeamDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {professores.map((professor, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={professor.image}
                      alt={professor.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{professor.name}</h3>
                    <p className="text-primary font-medium">{professor.specialty}</p>
                    <p className="text-muted-foreground text-sm">{professor.experience}</p>
                    <div className="flex text-education-orange">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section id="contato" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('home.contact')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('home.contactDesc')}
              </p>
            </div>

            <Card className="shadow-elegant">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        {t('home.fullName')}
                      </label>
                      <Input
                        type="text"
                        placeholder={t('home.fullNamePlaceholder')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        {t('common.email')}
                      </label>
                      <Input
                        type="email"
                        placeholder={t('home.emailPlaceholder')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      {t('home.subject')}
                    </label>
                    <Input
                      type="text"
                      placeholder={t('home.subjectPlaceholder')}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      {t('home.message')}
                    </label>
                    <Textarea
                      placeholder={t('home.messagePlaceholder')}
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    {t('home.sendMessage')}
                    <Mail className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;