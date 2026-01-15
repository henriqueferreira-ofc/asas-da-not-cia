import { Link } from "react-router-dom";
import { ArrowRight, Newspaper } from "lucide-react";
import { NewsCard, NewsCategory } from "./NewsCard";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: NewsCategory;
  categoryLabel: string;
  author: string;
  date: string;
}

interface NewsSectionProps {
  title: string;
  news: NewsItem[];
  showViewAll?: boolean;
  categorySlug?: string;
}

export function NewsSection({ title, news, showViewAll = true, categorySlug }: NewsSectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex w-10 h-10 rounded-lg bg-accent/10 items-center justify-center">
            <Newspaper className="w-5 h-5 text-accent" />
          </div>
          <h2 className="section-title !mb-0">{title}</h2>
        </div>
        {showViewAll && categorySlug && (
          <Link 
            to={`/categoria/${categorySlug}`} 
            className="flex items-center gap-2 text-link hover:text-primary font-semibold text-sm transition-colors group shrink-0 bg-secondary/50 hover:bg-secondary px-4 py-2 rounded-full"
          >
            Ver todas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}
