import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";

export type NewsCategory = "aafab" | "politics" | "international" | "defense" | "opinion" | "fab";

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
  politics: "category-politics",
  international: "category-international",
  defense: "category-defense",
  opinion: "category-opinion",
  fab: "category-aafab",
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
    <Link to={`/noticia/${id}`}>
      <article className="news-card group cursor-pointer h-full flex flex-col">
        <div className={`relative overflow-hidden ${isLarge ? "h-64 md:h-80" : isSmall ? "h-32" : "h-48"}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className={`category-badge ${categoryStyles[category]} absolute top-3 left-3`}>
            {categoryLabel}
          </span>
        </div>
        <div className={`p-4 flex-1 flex flex-col ${isSmall ? "p-3" : ""}`}>
          <h3 className={`font-serif font-bold text-headline leading-tight mb-2 group-hover:text-link transition-colors ${
            isLarge ? "text-xl md:text-2xl" : isSmall ? "text-sm" : "text-lg"
          }`}>
            {title}
          </h3>
          {!isSmall && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
              {excerpt}
            </p>
          )}
          <div className={`article-meta mt-auto ${isSmall ? "text-xs" : ""}`}>
            <User className="w-3 h-3" />
            <span>{author}</span>
            <span className="text-muted-foreground/50">•</span>
            <Clock className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
