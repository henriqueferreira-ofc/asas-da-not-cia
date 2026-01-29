import { Link } from "react-router-dom";
import { Calendar, TrendingUp, FileText, ChevronRight, Flame, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useUpcomingEventos } from "@/hooks/useEventos";
import { useNoticiasByCategory, useMostViewedNoticias } from "@/hooks/useNoticias";

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

  return (
    <aside className="space-y-6">
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

      {/* Help CTA */}
      <div className="bg-gradient-to-br from-accent via-accent to-accent/80 rounded-xl p-6 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative">
          <h3 className="font-serif font-bold text-xl text-accent-foreground mb-2">
            Ajude a AAFAB
          </h3>
          <p className="text-sm text-accent-foreground/80 mb-5 leading-relaxed">
            Contribua com nossa missão e fortaleça a AAFAB (Associação Amigos da Força Aérea Brasileira)
          </p>
          <Link 
            to="/ajude-nos"
            className="block w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:bg-primary/90 transition-all hover:shadow-lg active:scale-[0.98]"
          >
            Ajude-nos Agora
          </Link>
        </div>
      </div>
    </aside>
  );
}
