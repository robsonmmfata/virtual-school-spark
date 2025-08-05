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
  FileText
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-education.jpg";
import virtualClassroomImage from "@/assets/virtual-classroom.jpg";
import teacher1 from "@/assets/teacher-1.jpg";
import teacher2 from "@/assets/teacher-2.jpg";
import teacher3 from "@/assets/teacher-3.jpg";

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
      name: t('home.teachers.ana.name'),
      specialty: t('home.teachers.ana.specialty'),
      experience: t('home.teachers.ana.experience'),
      image: teacher1
    },
    {
      name: t('home.teachers.carlos.name'),
      specialty: t('home.teachers.carlos.specialty'),
      experience: t('home.teachers.carlos.experience'),
      image: teacher2
    },
    {
      name: t('home.teachers.marina.name'),
      specialty: t('home.teachers.marina.specialty'),
      experience: t('home.teachers.marina.experience'),
      image: teacher3
    }
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

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-education-orange/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-glow/20 rounded-full blur-xl animate-pulse"></div>
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
                src={virtualClassroomImage} 
                alt={t('home.virtualClassroom')} 
                className="rounded-lg shadow-elegant w-full"
              />
              <div className="absolute inset-0 bg-gradient-primary/10 rounded-lg"></div>
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
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
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