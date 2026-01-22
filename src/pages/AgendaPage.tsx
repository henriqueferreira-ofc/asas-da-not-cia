import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Calendar, MapPin, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { usePublishedEventos } from "@/hooks/useEventos";

export default function AgendaPage() {
  const { data: eventos, isLoading, error } = usePublishedEventos();

  const upcomingEvents = eventos?.filter(
    (e) => new Date(e.event_date) >= new Date()
  ) || [];
  
  const pastEvents = eventos?.filter(
    (e) => new Date(e.event_date) < new Date()
  ) || [];

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-16">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold text-headline mb-2">Erro ao carregar eventos</h1>
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
              Agenda de Eventos
            </h1>
            <p className="text-primary-foreground/80 mt-3 max-w-2xl text-lg">
              Confira os próximos eventos e atividades da AAFAB
            </p>
          </div>
        </section>

        <div className="container py-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Upcoming Events */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-bold text-headline mb-6 pb-3 border-b border-border">
                  Próximos Eventos
                </h2>
                
                {upcomingEvents.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.map((evento) => {
                      const eventDate = new Date(evento.event_date);
                      const day = format(eventDate, "dd", { locale: ptBR });
                      const month = format(eventDate, "MMM", { locale: ptBR });
                      const year = format(eventDate, "yyyy", { locale: ptBR });
                      const time = format(eventDate, "HH:mm", { locale: ptBR });
                      
                      return (
                        <article 
                          key={evento.id}
                          className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          {evento.image_url && (
                            <div className="aspect-video">
                              <img 
                                src={evento.image_url} 
                                alt={evento.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="p-5">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-16 h-16 bg-accent/10 rounded-lg flex flex-col items-center justify-center shrink-0">
                                <span className="text-xs text-accent uppercase tracking-wide font-medium">{month}</span>
                                <span className="text-2xl font-bold text-headline">{day}</span>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-serif font-bold text-lg text-headline leading-snug mb-1">
                                  {evento.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{year} às {time}</p>
                              </div>
                            </div>
                            
                            {evento.location && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                <MapPin className="w-4 h-4 text-accent" />
                                {evento.location}
                              </div>
                            )}
                            
                            {evento.description && (
                              <p className="text-sm text-foreground/80 line-clamp-3">
                                {evento.description}
                              </p>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-secondary/30 rounded-xl">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhum evento programado no momento</p>
                  </div>
                )}
              </section>

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl font-bold text-headline mb-6 pb-3 border-b border-border">
                    Eventos Anteriores
                  </h2>
                  
                  <div className="space-y-4">
                    {pastEvents.map((evento) => {
                      const eventDate = new Date(evento.event_date);
                      const formattedDate = format(eventDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
                      
                      return (
                        <article 
                          key={evento.id}
                          className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border opacity-70 hover:opacity-100 transition-opacity"
                        >
                          <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                            <Calendar className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-headline">{evento.title}</h3>
                            <p className="text-sm text-muted-foreground">{formattedDate}</p>
                          </div>
                          {evento.location && (
                            <span className="text-sm text-muted-foreground hidden md:block">
                              {evento.location}
                            </span>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
