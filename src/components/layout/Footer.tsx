import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { useSiteSettingsMap } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const links = [
  { name: "Sobre a AAFAB", href: "/sobre" },
  { name: "Diretoria", href: "/diretoria" },
  { name: "Ajude-nos", href: "/ajude-nos" },
  { name: "Contato", href: "/contato" },
];

// Newsletter form component
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: "Newsletter",
          email: email,
          subject: "Inscrição Newsletter AAFAB",
          message: `Novo inscrito na newsletter.\n\nE-mail: ${email}`,
        },
      });

      if (error) throw error;
      if (data && !data.success) throw new Error(data.error);

      toast({ title: "Inscrição enviada!", description: "Seu e-mail foi enviado com sucesso." });
      setEmail("");
    } catch (err) {
      toast({ title: "Erro ao enviar", description: "Tente novamente mais tarde.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="flex-1 relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/40" />
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu melhor e-mail" 
          className="w-full pl-10 pr-4 py-3 rounded-lg text-sm bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-accent transition-all"
          required
          disabled={loading}
        />
      </div>
      <button 
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors shrink-0 disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}

export function Footer() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { data: settings } = useSiteSettingsMap();

  const address = settings?.address || 'Brasília - DF, Brasil';
  const email = settings?.email || 'contato@aafab.org.br';
  const phone = settings?.phone || '(61) 99999-9999';
  const footerText = settings?.footer_text || 'AAFAB - Associação Amigos da Força Aérea Brasileira. Todos os direitos reservados.';

  const socialLinks = [
    { icon: Facebook, href: settings?.facebook, label: 'Facebook' },
    { icon: Instagram, href: settings?.instagram, label: 'Instagram' },
    { icon: Twitter, href: settings?.twitter, label: 'Twitter' },
    { icon: Youtube, href: settings?.youtube, label: 'Youtube' },
    { icon: Linkedin, href: settings?.linkedin, label: 'LinkedIn' },
  ].filter(s => s.href);

  return (
    <>
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif font-bold text-2xl mb-2 text-white">{settings?.newsletter_title || 'Fique por dentro das notícias'}</h3>
            <p className="text-primary-foreground/70 mb-6">
              {settings?.newsletter_subtitle || 'Receba as principais informações da AAFAB sobre o processo Internacional, diretamente em seu e-mail'}
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* About */}
          <div className="lg:col-span-1">
            <Link to="/" className="block mb-4">
              <h3 className="font-serif font-bold text-2xl leading-tight text-white">AAFAB</h3>
              <p className="text-sm text-primary-foreground/70 leading-tight mt-1">
                Associação Amigos da Força Aérea Brasileira
              </p>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-5">
              Portal de notícias institucional dedicado à informação qualificada sobre defesa, 
              política e assuntos relacionados à Força Aérea Brasileira.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.length > 0 ? (
                socialLinks.map(({ icon: Icon, href, label }) => (
                  <a 
                    key={label}
                    href={href || '#'} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))
              ) : (
                <>
                  <span className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center opacity-50">
                    <Facebook className="w-5 h-5" />
                  </span>
                  <span className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center opacity-50">
                    <Instagram className="w-5 h-5" />
                  </span>
                </>
              )}
            </div>
          </div>


          {/* Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 pb-2 border-b border-primary-foreground/20 text-white">
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
            <h4 className="font-serif font-bold text-lg mb-4 pb-2 border-b border-primary-foreground/20 text-white">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/60 uppercase tracking-wide mb-0.5">Endereço</p>
                  <span className="text-sm text-primary-foreground/90">{address}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/60 uppercase tracking-wide mb-0.5">E-mail</p>
                  <a 
                    href={`mailto:${email}`} 
                    className="text-sm text-primary-foreground/90 hover:text-accent transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/60 uppercase tracking-wide mb-0.5">Telefone</p>
                  <span className="text-sm text-primary-foreground/90">{phone}</span>
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
              © {new Date().getFullYear()} {footerText}
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
              <button 
                onClick={() => setLoginModalOpen(true)}
                className="hover:text-primary-foreground transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
    
    <AdminLoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
}
