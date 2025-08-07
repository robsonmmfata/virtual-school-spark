import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: t('navigation.home'), path: "/" },
    { name: t('navigation.about'), path: "/#sobre" },
    { name: t('navigation.features'), path: "/#estrutura" },
    { name: t('home.footer.about'), path: "/#equipe" },
    { name: t('navigation.contact'), path: "/#contato" },
  ];

  const loginOptions = [
    { name: t('auth.loginAsStudent'), path: "/login/aluno" },
    { name: t('auth.loginAsTeacher'), path: "/login/professor" },
    { name: t('auth.loginAsAdmin'), path: "/login/admin" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm border-b border-border shadow-card py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1">
              <img 
                src="/logoedit.png" 
                alt={t('home.footer.schoolName')} 
                className="h-24 w-auto object-contain"
              />
            </div>
            <span className="text-lg font-semibold text-green-800 whitespace-nowrap">
              {t('home.footer.schoolName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Login Dropdown */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector />
            <div className="relative group">
              <Button variant="outline" className="group-hover:border-primary">
                {t('navigation.login')}
              </Button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-2">
                  {loginOptions.map((option) => (
                    <Link
                      key={option.name}
                      to={option.path}
                      className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="flex flex-col py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 py-2">
                <LanguageSelector />
                <p className="text-sm font-medium text-muted-foreground mb-2">{t('navigation.login')}</p>
                {loginOptions.map((option) => (
                  <Link
                    key={option.name}
                    to={option.path}
                    className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-muted transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {option.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
