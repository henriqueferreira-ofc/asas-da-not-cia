import { Link } from "react-router-dom";
import { Clock, User, ArrowRight } from "lucide-react";

export type NewsCategory = "aafab" | "politica" | "internacional" | "comunicados";

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: NewsCategory;
  categoryLabel: string;
  author: string;
  date: string;
  size?: "small" | "medium" | "large";
}

const categoryStyles: Record<NewsCategory, string> = {
  aafab: "category-aafab",
  politica: "category-politics",
  internacional: "category-international",
  comunicados: "category-aafab",
};

export function NewsCard({
  id,
  title,
  excerpt,
  image,
  category,
  categoryLabel,
  author,
  date,
  size = "medium",
}: NewsCardProps) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <Link to={`/noticia/${id}`} className="block h-full">
      <article className="news-card group cursor-pointer h-full flex flex-col">
        <div className={`relative overflow-hidden ${isLarge ? "h-56 md:h-72" : isSmall ? "h-36" : "h-44 md:h-52"}`}>
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <span className={`category-badge ${categoryStyles[category]} absolute top-3 left-3 shadow-lg`}>
            {categoryLabel}
          </span>
          
          {/* Hover indicator */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="flex items-center gap-1 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              Ler mais
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
        
        <div className={`flex-1 flex flex-col ${isSmall ? "p-3" : "p-4 md:p-5"}`}>
          <h3 className={`font-serif font-bold text-headline leading-snug mb-2 group-hover:text-link transition-colors line-clamp-2 ${
            isLarge ? "text-lg md:text-xl" : isSmall ? "text-sm" : "text-base md:text-lg"
          }`}>
            {title}
          </h3>
          
          {!isSmall && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
              {excerpt}
            </p>
          )}
          
          <div className={`article-meta mt-auto pt-3 border-t border-border/50 ${isSmall ? "text-xs pt-2" : ""}`}>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-medium text-foreground/80">{author}</span>
            </div>
            <span className="text-muted-foreground/40">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
