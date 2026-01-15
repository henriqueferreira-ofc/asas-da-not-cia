import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send } from "lucide-react";
import logoAafab from "@/assets/logo-aafab.png";

const categories = [
  { name: "AAFAB Institucional", href: "/categoria/aafab" },
  { name: "Política Brasileira", href: "/categoria/politica" },
  { name: "Política Internacional", href: "/categoria/internacional" },
  { name: "Defesa Nacional", href: "/categoria/defesa" },
  { name: "Força Aérea Brasileira", href: "/categoria/fab" },
  { name: "Artigos e Análises", href: "/categoria/opiniao" },
];

const links = [
  { name: "Sobre a AAFAB", href: "/sobre" },
  { name: "Nossa Missão", href: "/sobre" },
  { name: "Diretoria", href: "/sobre" },
  { name: "Política Editorial", href: "/sobre" },
  { name: "Ajude-nos", href: "/ajude-nos" },
  { name: "Contato", href: "/contato" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif font-bold text-2xl mb-2">Fique por dentro das notícias</h3>
            <p className="text-primary-foreground/70 mb-6">
              Receba as principais notícias sobre defesa, política e Força Aérea diretamente em seu e-mail
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/40" />
                <input 
                  type="email" 
                  placeholder="Digite seu melhor e-mail" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-sm bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-accent transition-all"
                />
              </div>
              <button 
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
                Assinar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src={logoAafab} 
                alt="AAFAB" 
                className="w-14 h-14 object-contain"
              />
              <div>
                <h3 className="font-serif font-bold text-lg leading-tight">AAFAB</h3>
                <p className="text-xs text-primary-foreground/70 leading-tight">
                  Amigos da Força Aérea Brasileira
                </p>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-5">
              Portal de notícias institucional dedicado à informação qualificada sobre defesa, 
              política e assuntos relacionados à Força Aérea Brasileira.
            </p>
            <div className="flex items-center gap-2">
              <a 
                href="#" 
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                aria-label="Youtube"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 pb-2 border-b border-primary-foreground/20">
              Categorias
            </h4>
            <ul className="space-y-2.5">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.href} 
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors inline-flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 pb-2 border-b border-primary-foreground/20">
              Institucional
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors inline-flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 pb-2 border-b border-primary-foreground/20">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/60 uppercase tracking-wide mb-0.5">Endereço</p>
                  <span className="text-sm text-primary-foreground/90">Brasília - DF, Brasil</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/60 uppercase tracking-wide mb-0.5">E-mail</p>
                  <a 
                    href="mailto:contato@aafab.org.br" 
                    className="text-sm text-primary-foreground/90 hover:text-accent transition-colors"
                  >
                    contato@aafab.org.br
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/60 uppercase tracking-wide mb-0.5">Telefone</p>
                  <span className="text-sm text-primary-foreground/90">(61) 3333-0000</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 bg-primary/95">
        <div className="container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-primary-foreground/60 text-center md:text-left">
              © {new Date().getFullYear()} AAFAB - Amigos da Força Aérea Brasileira. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-primary-foreground/60">
              <Link to="/sobre" className="hover:text-primary-foreground transition-colors">
                Privacidade
              </Link>
              <span className="text-primary-foreground/30">|</span>
              <Link to="/sobre" className="hover:text-primary-foreground transition-colors">
                Termos de Uso
              </Link>
              <span className="text-primary-foreground/30">|</span>
              <Link to="/sobre" className="hover:text-primary-foreground transition-colors">
                Aviso Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
