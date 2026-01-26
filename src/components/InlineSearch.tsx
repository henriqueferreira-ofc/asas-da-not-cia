import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Loader2, FileText, Menu, Calendar, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "page" | "menu" | "noticia" | "evento";
  href: string;
  icon: typeof FileText;
}

// Static pages and menu items that can be searched
const staticPages: SearchResult[] = [
  { id: "home", title: "Início", description: "Página inicial da AAFAB", type: "page", href: "/", icon: Menu },
  { id: "sobre", title: "Sobre a AAFAB", description: "Conheça a história e missão da AAFAB", type: "page", href: "/sobre", icon: FileText },
  { id: "diretoria", title: "Diretoria", description: "Conheça os membros da diretoria", type: "page", href: "/diretoria", icon: Users },
  { id: "politica", title: "Política Nacional", description: "Notícias sobre política nacional", type: "menu", href: "/categoria/politica", icon: Menu },
  { id: "internacional", title: "Internacional", description: "Notícias internacionais", type: "menu", href: "/categoria/internacional", icon: Menu },
  { id: "ajude", title: "Ajude-nos", description: "Saiba como apoiar a AAFAB", type: "page", href: "/ajude-nos", icon: FileText },
  { id: "contato", title: "Contato", description: "Entre em contato conosco", type: "page", href: "/contato", icon: FileText },
  { id: "agenda", title: "Agenda", description: "Eventos e compromissos da AAFAB", type: "page", href: "/agenda", icon: Calendar },
  { id: "comunicados", title: "Comunicados", description: "Comunicados oficiais da AAFAB", type: "page", href: "/comunicados", icon: FileText },
];

export function InlineSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchAll = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      
      try {
        // Filter static pages
        const queryLower = query.toLowerCase();
        const filteredPages = staticPages.filter(
          page => 
            page.title.toLowerCase().includes(queryLower) ||
            page.description.toLowerCase().includes(queryLower)
        );

        // Search noticias from database
        const { data: noticias, error } = await supabase
          .from("noticias")
          .select("id, title, excerpt, category_label")
          .eq("published", true)
          .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) throw error;

        const noticiaResults: SearchResult[] = (noticias || []).map(noticia => ({
          id: noticia.id,
          title: noticia.title,
          description: noticia.excerpt.substring(0, 80) + "...",
          type: "noticia" as const,
          href: `/noticia/${noticia.id}`,
          icon: FileText,
        }));

        // Search eventos from database
        const { data: eventos, error: eventosError } = await supabase
          .from("eventos")
          .select("id, title, description, event_date")
          .eq("published", true)
          .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
          .order("event_date", { ascending: true })
          .limit(3);

        if (eventosError) throw eventosError;

        const eventoResults: SearchResult[] = (eventos || []).map(evento => ({
          id: evento.id,
          title: evento.title,
          description: evento.description?.substring(0, 80) + "..." || format(new Date(evento.event_date), "dd 'de' MMMM", { locale: ptBR }),
          type: "evento" as const,
          href: "/agenda",
          icon: Calendar,
        }));

        // Combine all results
        setResults([...filteredPages, ...noticiaResults, ...eventoResults]);
      } catch (error) {
        console.error("Erro na busca:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchAll, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    navigate(result.href);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const getTypeLabel = (type: SearchResult["type"]) => {
    const labels = {
      page: "Página",
      menu: "Menu",
      noticia: "Notícia",
      evento: "Evento",
    };
    return labels[type];
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-md">
      <div className="flex items-center bg-primary-foreground/10 rounded-lg px-4 py-2.5">
        <Search className="w-5 h-5 text-primary-foreground/60 mr-3 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          placeholder="Buscar páginas, notícias, eventos..."
          className="flex-1 bg-transparent outline-none text-primary-foreground placeholder:text-primary-foreground/50 text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-primary-foreground/60" />
          </button>
        )}
        {isLoading && (
          <Loader2 className="w-4 h-4 text-primary-foreground/60 animate-spin ml-2" />
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden max-h-[70vh] overflow-y-auto">
          {results.length === 0 && !isLoading ? (
            <div className="py-8 text-center text-muted-foreground">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="font-medium">Nenhum resultado encontrado</p>
              <p className="text-sm">Tente buscar por outros termos</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((result) => {
                const Icon = result.icon;
                return (
                  <li key={`${result.type}-${result.id}`}>
                    <button
                      onClick={() => handleResultClick(result)}
                      className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-start gap-3"
                    >
                      <div className="mt-0.5 p-2 rounded-lg bg-accent/10 shrink-0">
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                            {getTypeLabel(result.type)}
                          </span>
                        </div>
                        <h4 className="font-semibold text-foreground line-clamp-1">
                          {result.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {result.description}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {results.length > 0 && (
            <div className="border-t border-border px-4 py-2 bg-muted/30">
              <p className="text-xs text-muted-foreground text-center">
                {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
