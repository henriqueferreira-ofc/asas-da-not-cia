import { Calendar, TrendingUp, FileText } from "lucide-react";

const upcomingEvents = [
  { date: "15 Jan", title: "Assembleia Geral AAFAB" },
  { date: "22 Jan", title: "Cerimônia Dia do Aviador" },
  { date: "28 Jan", title: "Seminário de Defesa Aérea" },
  { date: "05 Fev", title: "Encontro Nacional de Associados" },
];

const trendingNews = [
  { id: 1, title: "FAB adquire novos caças de quinta geração", views: "12.5k" },
  { id: 2, title: "Brasil assume liderança em operação multinacional", views: "8.2k" },
  { id: 3, title: "Novo radar nacional entra em operação", views: "6.8k" },
  { id: 4, title: "Acordo de cooperação com países do BRICS", views: "5.4k" },
];

const officialDocuments = [
  { title: "Comunicado Oficial nº 001/2026", date: "10 Jan 2026" },
  { title: "Nota à Imprensa - Janeiro/2026", date: "08 Jan 2026" },
  { title: "Relatório Anual 2025", date: "02 Jan 2026" },
];

export function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Events */}
      <div className="bg-card rounded-lg border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-accent" />
          <h3 className="font-serif font-bold text-lg text-headline">Agenda</h3>
        </div>
        <ul className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <li key={index} className="flex items-start gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-secondary rounded flex flex-col items-center justify-center shrink-0">
                <span className="text-xs text-muted-foreground">{event.date.split(" ")[0]}</span>
                <span className="text-sm font-bold text-headline">{event.date.split(" ")[1]}</span>
              </div>
              <p className="text-sm text-foreground group-hover:text-link transition-colors pt-1">
                {event.title}
              </p>
            </li>
          ))}
        </ul>
        <a href="#" className="block mt-4 text-center text-sm text-link hover:text-primary font-medium transition-colors">
          Ver agenda completa
        </a>
      </div>

      {/* Trending */}
      <div className="bg-card rounded-lg border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h3 className="font-serif font-bold text-lg text-headline">Mais Lidas</h3>
        </div>
        <ul className="space-y-4">
          {trendingNews.map((news, index) => (
            <li key={news.id} className="flex items-start gap-3 group cursor-pointer">
              <span className="text-2xl font-serif font-bold text-accent/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-link transition-colors leading-snug">
                  {news.title}
                </p>
                <span className="text-xs text-muted-foreground">{news.views} visualizações</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Official Documents */}
      <div className="bg-primary rounded-lg p-5 text-primary-foreground">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-accent" />
          <h3 className="font-serif font-bold text-lg">Comunicados Oficiais</h3>
        </div>
        <ul className="space-y-3">
          {officialDocuments.map((doc, index) => (
            <li key={index} className="group cursor-pointer">
              <p className="text-sm font-medium group-hover:text-accent transition-colors">
                {doc.title}
              </p>
              <span className="text-xs text-primary-foreground/60">{doc.date}</span>
            </li>
          ))}
        </ul>
        <a href="#" className="block mt-4 text-center text-sm text-accent hover:text-accent/80 font-medium transition-colors">
          Ver todos os comunicados
        </a>
      </div>

      {/* Associate CTA */}
      <div className="bg-gradient-to-br from-accent to-accent/80 rounded-lg p-6 text-center">
        <h3 className="font-serif font-bold text-xl text-accent-foreground mb-2">
          Faça Parte da AAFAB
        </h3>
        <p className="text-sm text-accent-foreground/80 mb-4">
          Junte-se a milhares de associados que apoiam a Força Aérea Brasileira
        </p>
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
          Associe-se Agora
        </button>
      </div>
    </aside>
  );
}
