import { Link } from "react-router-dom";
import { Clock, User, ArrowRight, Eye } from "lucide-react";

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
      <article className="relative rounded-xl overflow-hidden group cursor-pointer shadow-xl">
        <div className="aspect-[16/9] md:aspect-[21/9]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Top badge */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3">
          <span className="category-badge category-aafab shadow-lg">
            {category}
          </span>
          <span className="hidden md:flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded text-white text-xs font-medium">
            <Eye className="w-3.5 h-3.5" />
            Destaque
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10">
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-3 md:mb-4 max-w-4xl drop-shadow-lg">
            {title}
          </h2>
          <p className="hidden sm:block text-white/85 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-5 max-w-3xl line-clamp-2">
            {excerpt}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 md:gap-4 text-white/70 text-xs md:text-sm">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span className="font-medium">{author}</span>
              </div>
              <span className="text-white/40">|</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{date}</span>
              </div>
            </div>
            <span className="flex items-center gap-2 text-accent font-semibold text-xs md:text-sm group-hover:gap-3 transition-all bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
              Ler matéria completa
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
