import { Link } from "react-router-dom";
import { Calendar, TrendingUp, FileText, ChevronRight, Flame, Loader2, UserRound } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useUpcomingEventos } from "@/hooks/useEventos";
import { useNoticiasByCategory, useMostViewedNoticias } from "@/hooks/useNoticias";
import { useSiteSettingsMap } from "@/hooks/useSiteSettings";
import { getPortalUrl } from "@/lib/portal-link";

// Format view count for display
const formatViewCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace('.0', '')}k`;
  }
  return count.toString();
};


export function Sidebar() {
  const { data: eventos, isLoading: isLoadingEventos, error: errorEventos } = useUpcomingEventos(4);
  const { data: comunicados, isLoading: isLoadingComunicados, error: errorComunicados } = useNoticiasByCategory("comunicados");
  const { data: mostViewed, isLoading: isLoadingMostViewed } = useMostViewedNoticias(4);
  const { data: settingsMap } = useSiteSettingsMap();
  const portalUrl = getPortalUrl(settingsMap);

  return (
    <aside className="space-y-6">
      {/* Portal do Associado */}
      {portalUrl && (
        <div className="overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-br from-primary to-primary/85 p-5 shadow-lg">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Exclusivo
          </div>
          <h3 className="font-serif text-lg font-bold text-primary-foreground">
            Portal do Associado
          </h3>
          <p className="mt-1 text-sm leading-snug text-primary-foreground/80">
            Acompanhe comunicados, mensalidades e o atendimento da AAFAB em um só lugar.
          </p>
          <a
            href={portalUrl}
            target="_top"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition-all duration-200 hover:brightness-110"
          >
            <UserRound className="h-4 w-4" />
            Entrar no Portal
          </a>
        </div>
      )}

      {/* Events */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-accent" />
          </div>
          <h3 className="font-serif font-bold text-lg text-headline">Agenda</h3>
        </div>
        
        {isLoadingEventos ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : errorEventos ? (
          <p className="text-sm text-destructive text-center py-4">
            Erro ao carregar eventos
          </p>
        ) : eventos && eventos.length > 0 ? (
          <ul className="space-y-3">
            {eventos.map((evento) => {
              const eventDate = new Date(evento.event_date);
              const day = format(eventDate, "dd", { locale: ptBR });
              const month = format(eventDate, "MMM", { locale: ptBR });
              
              return (
                <li 
                  key={evento.id} 
                  className="flex items-start gap-3 group cursor-pointer p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-14 h-14 bg-secondary rounded-lg flex flex-col items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{month}</span>
                    <span className="text-lg font-bold text-headline">{day}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-link transition-colors leading-snug line-clamp-2">
                      {evento.title}
                    </p>
                    {evento.location && (
                      <span className="text-xs text-muted-foreground mt-0.5 block truncate">
                        {evento.location}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhum evento agendado
          </p>
        )}
        
        <Link 
          to="/agenda" 
          className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-border text-base text-link hover:text-primary font-medium transition-colors"
        >
          Ver agenda completa
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Trending */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Flame className="w-4 h-4 text-accent" />
          </div>
          <h3 className="font-serif font-bold text-lg text-headline">Mais Lidas</h3>
        </div>
        
        {isLoadingMostViewed ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : mostViewed && mostViewed.length > 0 ? (
          <ul className="space-y-4">
            {mostViewed.map((news, index) => (
              <li key={news.id}>
                <Link 
                  to={`/noticia/${news.id}`}
                  className="flex items-start gap-3 group p-2 rounded-lg hover:bg-secondary/50 transition-colors -mx-2"
                >
                  <span className="text-2xl font-serif font-bold text-transparent bg-gradient-to-br from-accent to-accent/50 bg-clip-text leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-link transition-colors leading-snug line-clamp-2">
                      {news.title}
                    </p>
                    <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {formatViewCount(news.view_count)} visualizações
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma notícia visualizada ainda
          </p>
        )}
      </div>

      {/* Official Documents */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-accent" />
          </div>
          <h3 className="font-serif font-bold text-xl text-headline">Comunicados Oficiais</h3>
        </div>
        
        {isLoadingComunicados ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : errorComunicados ? (
          <p className="text-sm text-destructive text-center py-4">
            Erro ao carregar comunicados
          </p>
        ) : comunicados && comunicados.length > 0 ? (
          <ul className="space-y-3">
            {comunicados.slice(0, 3).map((doc) => {
              const docDate = new Date(doc.created_at);
              const formattedDate = format(docDate, "dd MMM yyyy", { locale: ptBR });
              
              return (
                <li key={doc.id}>
                  <Link 
                    to={`/noticia/${doc.id}`}
                    className="block group p-3 rounded-lg hover:bg-secondary/50 transition-colors -mx-2"
                  >
                    <p className="text-base font-medium text-foreground group-hover:text-link transition-colors line-clamp-2">
                      {doc.title}
                    </p>
                    <span className="text-sm text-muted-foreground mt-1 block">{formattedDate}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhum comunicado disponível
          </p>
        )}
        
        <Link 
          to="/comunicados" 
          className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-border text-sm text-link hover:text-primary font-medium transition-colors"
        >
          Ver todos os comunicados
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

    </aside>
  );
}
