import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, FileText, Loader2, ExternalLink, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNoticiasByCategory } from "@/hooks/useNoticias";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function ComunicadosPage() {
  const { data: comunicados, isLoading, error } = useNoticiasByCategory("comunicados");
  const { data: settings } = useSiteSettings();
  
  // Get recadastramento link from site settings
  const recadastramentoLink = settings?.find(s => s.key === 'recadastramento_link')?.value;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-16">
          <div className="text-center">
            <FileText className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold text-headline mb-2">Erro ao carregar comunicados</h1>
            <p className="text-muted-foreground">Tente novamente mais tarde</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-12 md:py-16">
          <div className="container">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Início
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Comunicados Oficiais
            </h1>
            <p className="text-primary-foreground/80 mt-3 max-w-2xl text-lg">
              Notas, comunicados e documentos oficiais da AAFAB
            </p>
          </div>
        </section>

        <div className="container py-12">
          {/* Recadastramento Banner */}
          {recadastramentoLink && (
            <a 
              href={recadastramentoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 p-5 mb-8 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20 rounded-xl hover:border-accent/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-accent/30 transition-colors">
                  <UserCheck className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-headline group-hover:text-link transition-colors">
                    Recadastramento de Associados
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Clique aqui para atualizar seus dados cadastrais
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
            </a>
          )}
          
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : comunicados && comunicados.length > 0 ? (
            <div className="space-y-4">
              {comunicados.map((comunicado) => {
                const date = new Date(comunicado.created_at);
                const formattedDate = format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
                
                return (
                  <Link 
                    key={comunicado.id}
                    to={`/noticia/${comunicado.id}`}
                    className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-accent/50 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-lg text-headline group-hover:text-link transition-colors mb-1">
                        {comunicado.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{formattedDate}</p>
                      {comunicado.excerpt && (
                        <p className="text-sm text-foreground/80 line-clamp-2">
                          {comunicado.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-secondary/30 rounded-xl">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Nenhum comunicado disponível no momento</p>
              <p className="text-sm text-muted-foreground mt-2">
                Os comunicados oficiais aparecerão aqui quando publicados
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
