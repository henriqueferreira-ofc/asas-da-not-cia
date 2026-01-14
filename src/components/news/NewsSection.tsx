import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">{title}</h2>
        {showViewAll && categorySlug && (
          <Link 
            to={`/categoria/${categorySlug}`} 
            className="flex items-center gap-2 text-link hover:text-primary font-semibold text-sm transition-colors group"
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
