import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      {/* Top bar */}
      <div className="border-b border-primary-foreground/10">
        <div className="container flex items-center justify-between py-2 text-sm text-primary-foreground/80">
          <div className="flex items-center gap-4">
            <span>Segunda-feira, 13 de Janeiro de 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/sobre" className="hover:text-primary-foreground transition-colors">
              Sobre a AAFAB
            </Link>
            <Link to="/contato" className="hover:text-primary-foreground transition-colors">
              Contato
            </Link>
            <Link to="/associe-se" className="hover:text-primary-foreground transition-colors">
              Associe-se
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary">A</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-serif font-bold text-primary-foreground tracking-tight">
                AAFAB
              </h1>
              <p className="text-xs text-primary-foreground/70">
                Amigos da Força Aérea Brasileira
              </p>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden lg:flex items-center bg-primary-foreground/10 rounded-lg px-4 py-2 w-72">
            <Search className="w-4 h-4 text-primary-foreground/60 mr-2" />
            <input
              type="text"
              placeholder="Buscar notícias..."
              className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 outline-none w-full text-sm"
            />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden lg:block border-t border-primary-foreground/10">
        <div className="container">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                to="/"
                className="nav-link block px-4 py-3 text-sm font-semibold uppercase tracking-wide"
              >
                Início
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  to={category.href}
                  className="nav-link block px-4 py-3 text-sm font-semibold uppercase tracking-wide"
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
            <div className="flex items-center bg-primary-foreground/10 rounded-lg px-4 py-2 mb-4">
              <Search className="w-4 h-4 text-primary-foreground/60 mr-2" />
              <input
                type="text"
                placeholder="Buscar notícias..."
                className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 outline-none w-full text-sm"
              />
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-3 text-primary-foreground font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Início
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="block px-4 py-3 text-primary-foreground font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-primary-foreground/10 space-y-2">
              <Link 
                to="/sobre" 
                className="block px-4 py-2 text-primary-foreground/80 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre a AAFAB
              </Link>
              <Link 
                to="/contato" 
                className="block px-4 py-2 text-primary-foreground/80 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </Link>
              <Link 
                to="/associe-se" 
                className="block px-4 py-2 text-primary-foreground/80 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Associe-se
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
