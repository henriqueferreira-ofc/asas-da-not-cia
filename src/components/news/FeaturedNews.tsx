import { Link } from "react-router-dom";
import { Clock, User, ArrowRight } from "lucide-react";

interface FeaturedNewsProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

export function FeaturedNews({ id, title, excerpt, image, category, author, date }: FeaturedNewsProps) {
  return (
    <Link to={`/noticia/${id}`}>
      <article className="relative rounded-xl overflow-hidden group cursor-pointer">
        <div className="aspect-[16/9] md:aspect-[21/9]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <span className="category-badge category-aafab mb-4 inline-block">
            {category}
          </span>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 max-w-4xl">
            {title}
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4 max-w-3xl line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{date}</span>
              </div>
            </div>
            <span className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
              Ler matéria completa
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
