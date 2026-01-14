import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const categories = [
  { name: "AAFAB Institucional", href: "/categoria/aafab" },
  { name: "Política Brasileira", href: "/categoria/politica" },
  { name: "Política Internacional", href: "/categoria/internacional" },
  { name: "Defesa Nacional", href: "/categoria/defesa" },
  { name: "Força Aérea Brasileira", href: "/categoria/fab" },
  { name: "Geopolítica", href: "/categoria/internacional" },
  { name: "Artigos e Análises", href: "/categoria/opiniao" },
  { name: "Opinião", href: "/categoria/opiniao" },
];

const links = [
  { name: "Sobre a AAFAB", href: "/sobre" },
  { name: "Nossa Missão", href: "/sobre" },
  { name: "Diretoria", href: "/sobre" },
  { name: "Política Editorial", href: "/sobre" },
  { name: "Código de Ética", href: "/sobre" },
  { name: "Associe-se", href: "/associe-se" },
  { name: "Contato", href: "/contato" },
  { name: "Trabalhe Conosco", href: "/contato" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-primary">A</span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">AAFAB</h3>
                <p className="text-xs text-primary-foreground/70">Amigos da Força Aérea Brasileira</p>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-4">
              Portal de notícias institucional dedicado à informação qualificada sobre defesa, 
              política e assuntos relacionados à Força Aérea Brasileira.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Categorias</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.href} 
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Institucional</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/80">
                  Brasília - DF, Brasil
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:contato@aafab.org.br" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  contato@aafab.org.br
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">
                  (61) 3333-0000
                </span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-primary-foreground/10 rounded-lg">
              <h5 className="font-semibold text-sm mb-2">Newsletter</h5>
              <p className="text-xs text-primary-foreground/70 mb-3">
                Receba as principais notícias em seu e-mail
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="flex-1 px-3 py-2 rounded text-sm bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 outline-none"
                />
                <button className="px-4 py-2 bg-accent text-accent-foreground rounded text-sm font-semibold hover:bg-accent/90 transition-colors">
                  Assinar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>
              © 2026 AAFAB - Amigos da Força Aérea Brasileira. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/sobre" className="hover:text-primary-foreground transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/sobre" className="hover:text-primary-foreground transition-colors">
                Termos de Uso
              </Link>
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
