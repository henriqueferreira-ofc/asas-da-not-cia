import { Link } from "react-router-dom";
import { Calendar, TrendingUp, FileText, ChevronRight, Flame } from "lucide-react";

const upcomingEvents = [
  { date: "15 Jan", title: "Assembleia Geral AAFAB" },
  { date: "22 Jan", title: "Cerimônia Dia do Aviador" },
  { date: "28 Jan", title: "Seminário de Defesa Aérea" },
  { date: "05 Fev", title: "Encontro Nacional de Associados" },
];

const trendingNews = [
  { id: "fab-exercicio-defesa-aerea", title: "FAB adquire novos caças de quinta geração", views: "12.5k" },
  { id: "brasil-comando-forca-paz", title: "Brasil assume liderança em operação multinacional", views: "8.2k" },
  { id: "fab-sistema-radar", title: "Novo radar nacional entra em operação", views: "6.8k" },
  { id: "cooperacao-brics-defesa", title: "Acordo de cooperação com países do BRICS", views: "5.4k" },
];

const officialDocuments = [
  { id: "comunicado-001", title: "Comunicado Oficial nº 001/2026", date: "10 Jan 2026" },
  { id: "nota-janeiro", title: "Nota à Imprensa - Janeiro/2026", date: "08 Jan 2026" },
  { id: "relatorio-2025", title: "Relatório Anual 2025", date: "02 Jan 2026" },
];

export function Sidebar() {
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
        <ul className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <li key={index} className="flex items-start gap-3 group cursor-pointer p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="w-14 h-14 bg-secondary rounded-lg flex flex-col items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{event.date.split(" ")[1]}</span>
                <span className="text-lg font-bold text-headline">{event.date.split(" ")[0]}</span>
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-foreground group-hover:text-link transition-colors leading-snug">
                  {event.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <Link 
          to="/categoria/aafab" 
          className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-border text-sm text-link hover:text-primary font-medium transition-colors"
        >
          Ver agenda completa
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Trending */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <h3 className="font-serif font-bold text-lg text-headline">Mais Lidas</h3>
        </div>
        <ul className="space-y-4">
          {trendingNews.map((news, index) => (
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
                    {news.views} visualizações
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Official Documents */}
      <div className="bg-primary rounded-xl p-5 text-primary-foreground shadow-lg">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-primary-foreground/20">
          <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
            <FileText className="w-4 h-4 text-accent" />
          </div>
          <h3 className="font-serif font-bold text-lg">Comunicados Oficiais</h3>
        </div>
        <ul className="space-y-3">
          {officialDocuments.map((doc) => (
            <li key={doc.id} className="group cursor-pointer p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors -mx-2">
              <p className="text-sm font-medium group-hover:text-accent transition-colors line-clamp-2">
                {doc.title}
              </p>
              <span className="text-xs text-primary-foreground/60 mt-0.5 block">{doc.date}</span>
            </li>
          ))}
        </ul>
        <Link 
          to="/categoria/aafab" 
          className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-primary-foreground/20 text-sm text-accent hover:text-accent/80 font-medium transition-colors"
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
