import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNoticiasByCategory } from "@/hooks/useNoticias";

export default function ComunicadosPage() {
  const { data: comunicados, isLoading } = useNoticiasByCategory("comunicados");

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
