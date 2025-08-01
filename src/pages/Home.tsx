import { useState } from "react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de envio
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const estruturaCards = [
    {
      icon: Video,
      title: "Aulas Ao Vivo",
      description: "Interação em tempo real com professores especializados através de videoconferências interativas."
    },
    {
      icon: BookOpen,
      title: "Material Didático",
      description: "Conteúdo exclusivo desenvolvido por nossa equipe pedagógica, sempre atualizado e acessível."
    },
    {
      icon: Users,
      title: "Tutoria Personalizada",
      description: "Acompanhamento individual com tutores dedicados para potencializar seu aprendizado."
    },
    {
      icon: Award,
      title: "Certificação",
      description: "Certificado reconhecido pelo MEC com validade em todo território nacional."
    },
    {
      icon: Clock,
      title: "Flexibilidade",
      description: "Estude no seu ritmo, quando e onde quiser, com acesso 24/7 à plataforma."
    },
    {
      icon: Globe,
      title: "Plataforma Global",
      description: "Tecnologia de ponta que conecta estudantes de todo o Brasil em um ambiente virtual seguro."
    }
  ];

  const professores = [
    {
      name: "Profa. Ana Silva",
      specialty: "Matemática e Física",
      experience: "15 anos de experiência",
      image: teacher1
    },
    {
      name: "Prof. Carlos Santos",
      specialty: "Língua Portuguesa e Literatura",
      experience: "12 anos de experiência",
      image: teacher2
    },
    {
      name: "Profa. Marina Costa",
      specialty: "Biologia e Química",
      experience: "18 anos de experiência",
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
            alt="Educação Virtual" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-primary-foreground space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Educação de Qualidade
              <span className="block text-education-orange">Onde Você Estiver</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Transforme seu futuro com nossa escola virtual 100% online. 
              Aprenda com os melhores professores do país, no conforto da sua casa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button size="xl" variant="hero" className="group">
                Comece Agora
                <CheckCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </Button>
              <Button size="xl" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-primary-foreground hover:bg-white/20">
                Saiba Mais
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
                Sobre a <span className="text-primary">EduVirtual</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos uma escola de ensino médio 100% virtual, comprometida em oferecer educação de qualidade 
                através de tecnologia inovadora. Nossa missão é democratizar o acesso ao conhecimento, 
                conectando estudantes aos melhores professores do país.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Com uma metodologia única que combina aulas ao vivo, materiais exclusivos e 
                acompanhamento personalizado, preparamos nossos alunos não apenas para o ENEM, 
                mas para os desafios do futuro.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5000+</div>
                  <div className="text-muted-foreground">Alunos Formados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-muted-foreground">Taxa de Aprovação</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={virtualClassroomImage} 
                alt="Sala de Aula Virtual" 
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
              Nossa <span className="text-primary">Estrutura de Ensino</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Metodologia inovadora que combina tecnologia de ponta com a expertise 
              dos melhores educadores do país.
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
              Nossa <span className="text-primary">Equipe Pedagógica</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professores especialistas e mestres em suas áreas, dedicados ao seu sucesso acadêmico.
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
                Entre em <span className="text-primary">Contato</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Tem dúvidas? Nossa equipe está pronta para ajudar você a começar sua jornada educacional.
              </p>
            </div>

            <Card className="shadow-elegant">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Nome Completo
                      </label>
                      <Input
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        E-mail
                      </label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
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
                      Assunto
                    </label>
                    <Input
                      type="text"
                      placeholder="Qual o assunto da sua mensagem?"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                      className="border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Mensagem
                    </label>
                    <Textarea
                      placeholder="Escreva sua mensagem aqui..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      className="border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Enviar Mensagem
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