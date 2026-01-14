import { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "AAFAB", href: "#aafab" },
  { name: "Política Nacional", href: "#politica" },
  { name: "Internacional", href: "#internacional" },
  { name: "Defesa", href: "#defesa" },
  { name: "Força Aérea", href: "#fab" },
  { name: "Opinião", href: "#opiniao" },
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
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Sobre a AAFAB
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Contato
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Associe-se
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
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
          </a>

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
              <a
                href="/"
                className="nav-link block px-4 py-3 text-sm font-semibold uppercase tracking-wide"
              >
                Início
              </a>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <a
                  href={category.href}
                  className="nav-link block px-4 py-3 text-sm font-semibold uppercase tracking-wide"
                >
                  {category.name}
                </a>
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
                <a
                  href="/"
                  className="block px-4 py-3 text-primary-foreground font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors"
                >
                  Início
                </a>
              </li>
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="block px-4 py-3 text-primary-foreground font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-primary-foreground/10 space-y-2">
              <a href="#" className="block px-4 py-2 text-primary-foreground/80 text-sm">
                Sobre a AAFAB
              </a>
              <a href="#" className="block px-4 py-2 text-primary-foreground/80 text-sm">
                Contato
              </a>
              <a href="#" className="block px-4 py-2 text-primary-foreground/80 text-sm">
                Associe-se
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
