import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InlineSearch } from "@/components/common/InlineSearch";
import { PrefetchLink } from "@/components/common/PrefetchLink";
import {
  prefetchSobre,
  prefetchAjudeNos,
  prefetchContato,
  prefetchIndex,
  prefetchCategoria,
  prefetchCesd
} from "@/App";
import logoAafab from "@/assets/logo-aafab.png";

const categories = [
  { name: "Sobre a AAFAB", href: "/sobre", prefetch: prefetchSobre },
  { name: "Notícia Nacional", href: "/categoria/noticia", prefetch: prefetchCategoria },
  { name: "Internacional", href: "/categoria/internacional", prefetch: prefetchCategoria },
  { name: "E-Books", href: "/ajude-nos#ebooks", prefetch: prefetchAjudeNos },
  { name: "CESD", href: "/cesd", prefetch: prefetchCesd },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <PrefetchLink
              to="/contato"
              prefetch={prefetchContato}
              className="hover:text-primary-foreground transition-colors hover:underline"
            >
              Contato
            </PrefetchLink>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center gap-4">
          {/* Logo on the left */}
          <PrefetchLink to="/" prefetch={prefetchIndex} className="flex items-center gap-2 md:gap-3 shrink-0">
            <img
              src={logoAafab}
              alt="AAFAB - Amigos da Força Aérea Brasileira"
              className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain bg-white rounded-full p-1"
            />
            <div className="hidden sm:block">
              <h1 className="text-base md:text-lg lg:text-2xl font-serif font-bold text-primary-foreground tracking-tight leading-tight">
                AAFAB
              </h1>
              <p className="text-[9px] md:text-[10px] lg:text-sm text-primary-foreground/70 leading-tight">
                Associação Amigos da Força Aérea Brasileira
              </p>
            </div>
          </PrefetchLink>

          {/* Search on the far right + mobile menu */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-4 min-w-0">
            <div className="w-full max-w-[22rem] sm:max-w-md md:max-w-lg lg:max-w-xl">
              <InlineSearch />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden shrink-0">
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
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden lg:block border-t border-primary-foreground/10 bg-primary/95">
        <div className="container">
          <ul className="flex items-center">
            <li>
              <PrefetchLink
                to="/"
                prefetch={prefetchIndex}
                className="nav-link block px-5 py-3.5 text-sm font-semibold uppercase tracking-wide"
              >
                Início
              </PrefetchLink>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <PrefetchLink
                  to={category.href}
                  prefetch={category.prefetch}
                  className="nav-link block px-5 py-3.5 text-sm font-semibold uppercase tracking-wide"
                >
                  {category.name}
                </PrefetchLink>
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
                <PrefetchLink
                  to="/"
                  prefetch={prefetchIndex}
                  className="flex items-center justify-between px-4 py-3 text-primary-foreground font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Início
                </PrefetchLink>
              </li>
              {categories.map((category) => (
                <li key={category.name}>
                  <PrefetchLink
                    to={category.href}
                    prefetch={category.prefetch}
                    className="flex items-center justify-between px-4 py-3 text-primary-foreground font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </PrefetchLink>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-primary-foreground/10 space-y-2">
              <PrefetchLink
                to="/contato"
                prefetch={prefetchContato}
                className="block px-4 py-2.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </PrefetchLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
