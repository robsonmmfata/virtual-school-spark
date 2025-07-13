import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-education-dark-blue text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold">EduVirtual</h3>
                <p className="text-sm text-blue-200">Escola Online</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Educação de qualidade 100% virtual, conectando estudantes aos melhores professores onde quer que estejam.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-blue-200 hover:text-primary-foreground transition-colors duration-300 text-sm">
                Início
              </Link>
              <Link to="/#sobre" className="text-blue-200 hover:text-primary-foreground transition-colors duration-300 text-sm">
                Sobre Nós
              </Link>
              <Link to="/#estrutura" className="text-blue-200 hover:text-primary-foreground transition-colors duration-300 text-sm">
                Estrutura de Ensino
              </Link>
              <Link to="/#equipe" className="text-blue-200 hover:text-primary-foreground transition-colors duration-300 text-sm">
                Nossa Equipe
              </Link>
              <Link to="/#contato" className="text-blue-200 hover:text-primary-foreground transition-colors duration-300 text-sm">
                Contato
              </Link>
            </nav>
          </div>

          {/* Portals */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Portais</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/login/aluno" className="text-blue-200 hover:text-primary-foreground transition-colors duration-300 text-sm">
                Portal do Aluno
              </Link>
              <Link to="/login/professor" className="text-blue-200 hover:text-primary-foreground transition-colors duration-300 text-sm">
                Portal do Professor
              </Link>
              <Link to="/login/admin" className="text-blue-200 hover:text-primary-foreground transition-colors duration-300 text-sm">
                Painel Administrativo
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-education-orange" />
                <span className="text-blue-200 text-sm">contato@eduvirtual.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-education-orange" />
                <span className="text-blue-200 text-sm">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-education-orange" />
                <span className="text-blue-200 text-sm">São Paulo, SP - Brasil</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <h5 className="font-medium">Redes Sociais</h5>
              <div className="flex space-x-3">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-200 hover:text-primary-foreground hover:bg-primary/20">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-200 hover:text-primary-foreground hover:bg-primary/20">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-200 hover:text-primary-foreground hover:bg-primary/20">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-200 text-sm">
              © 2024 EduVirtual - Escola Online. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-blue-200 hover:text-primary-foreground transition-colors duration-300 text-sm">
                Política de Privacidade
              </Link>
              <Link to="#" className="text-blue-200 hover:text-primary-foreground transition-colors duration-300 text-sm">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;