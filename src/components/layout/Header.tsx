import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAafab from "@/assets/logo-aafab.png";

const categories = [
  { name: "AAFAB", href: "/categoria/aafab" },
  { name: "Política Nacional", href: "/categoria/politica" },
  { name: "Internacional", href: "/categoria/internacional" },
  { name: "Defesa", href: "/categoria/defesa" },
  { name: "Força Aérea", href: "/categoria/fab" },
  { name: "Opinião", href: "/categoria/opiniao" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      {/* Top bar */}
      <div className="border-b border-primary-foreground/10">
        <div className="container flex items-center justify-between py-2 text-sm text-primary-foreground/80">
          <div className="flex items-center gap-4">
            <span className="capitalize">{currentDate}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/sobre" className="hover:text-primary-foreground transition-colors hover:underline">
              Sobre a AAFAB
            </Link>
            <Link to="/contato" className="hover:text-primary-foreground transition-colors hover:underline">
              Contato
            </Link>
            <Link 
              to="/ajude-nos" 
              className="bg-accent text-accent-foreground px-4 py-1 rounded font-semibold hover:bg-accent/90 transition-colors"
            >
              Ajude-nos
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img 
              src={logoAafab} 
              alt="AAFAB - Amigos da Força Aérea Brasileira" 
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-serif font-bold text-primary-foreground tracking-tight leading-tight">
                AAFAB
              </h1>
              <p className="text-xs md:text-sm text-primary-foreground/70 leading-tight">
                Amigos da Força Aérea Brasileira
              </p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center bg-primary-foreground/10 rounded-lg px-4 py-2.5 flex-1 max-w-md mx-8">
            <Search className="w-5 h-5 text-primary-foreground/60 mr-3" />
            <input
              type="text"
              placeholder="Buscar notícias, artigos, eventos..."
              className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 outline-none w-full text-sm"
            />
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="lg:hidden mt-4 flex items-center bg-primary-foreground/10 rounded-lg px-4 py-2.5 animate-fade-in">
            <Search className="w-5 h-5 text-primary-foreground/60 mr-3" />
            <input
              type="text"
              placeholder="Buscar notícias..."
              className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 outline-none w-full text-sm"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="hidden lg:block border-t border-primary-foreground/10 bg-primary/95">
        <div className="container">
          <ul className="flex items-center">
            <li>
              <Link
                to="/"
                className="nav-link block px-5 py-3.5 text-sm font-semibold uppercase tracking-wide"
              >
                Início
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  to={category.href}
                  className="nav-link block px-5 py-3.5 text-sm font-semibold uppercase tracking-wide"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-primary-foreground/10 bg-primary animate-fade-in">
          <div className="container py-4">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="flex items-center justify-between px-4 py-3 text-primary-foreground font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Início
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="flex items-center justify-between px-4 py-3 text-primary-foreground font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-primary-foreground/10 space-y-2">
              <Link 
                to="/sobre" 
                className="block px-4 py-2.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre a AAFAB
              </Link>
              <Link 
                to="/contato" 
                className="block px-4 py-2.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </Link>
              <Link 
                to="/ajude-nos" 
                className="block mx-4 mt-2 py-3 bg-accent text-accent-foreground text-center rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ajude-nos
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
