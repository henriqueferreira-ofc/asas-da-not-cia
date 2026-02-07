import { Link } from "react-router-dom";
import { Clock, User, ArrowRight, Eye } from "lucide-react";

interface FeaturedNewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

interface FeaturedNewsGridProps {
  news: FeaturedNewsItem[];
}

export function FeaturedNewsGrid({ news }: FeaturedNewsGridProps) {
  if (news.length === 0) return null;
  
  const [mainNews, ...secondaryNews] = news;
  
  // If only 1 news, show full width
  if (news.length === 1) {
    return (
      <Link to={`/noticia/${mainNews.id}`}>
        <article className="relative rounded-xl overflow-hidden group cursor-pointer shadow-xl">
          <div className="aspect-[16/9] md:aspect-[21/9]">
            <img
              src={mainNews.image}
              alt={mainNews.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3">
            <span className="category-badge category-aafab shadow-lg">
              {mainNews.category}
            </span>
            <span className="hidden md:flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded text-white text-xs font-medium">
              <Eye className="w-3.5 h-3.5" />
              Destaque
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-3 md:mb-4 max-w-4xl drop-shadow-lg">
              {mainNews.title}
            </h2>
            <p className="hidden sm:block text-white/85 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-5 max-w-3xl line-clamp-2">
              {mainNews.excerpt}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 md:gap-4 text-white/70 text-xs md:text-sm">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{mainNews.author}</span>
                </div>
                <span className="text-white/40">|</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{mainNews.date}</span>
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Main Featured News - Takes 2 columns */}
      <Link to={`/noticia/${mainNews.id}`} className="lg:col-span-2">
        <article className="relative rounded-xl overflow-hidden group cursor-pointer shadow-xl h-full min-h-[300px] md:min-h-[400px]">
          <img
            src={mainNews.image}
            alt={mainNews.title}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          <div className="absolute top-4 left-4 flex items-center gap-3">
            <span className="category-badge category-aafab shadow-lg">
              {mainNews.category}
            </span>
            <span className="hidden md:flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded text-white text-xs font-medium">
              <Eye className="w-3.5 h-3.5" />
              Destaque
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-2 md:mb-3 drop-shadow-lg line-clamp-3">
              {mainNews.title}
            </h2>
            <p className="hidden md:block text-white/85 text-sm leading-relaxed mb-3 line-clamp-2">
              {mainNews.excerpt}
            </p>
            <div className="flex items-center gap-3 text-white/70 text-xs">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{mainNews.author}</span>
              </div>
              <span className="text-white/40">|</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{mainNews.date}</span>
              </div>
            </div>
          </div>
        </article>
      </Link>

      {/* Secondary News - Takes 1 column */}
      <div className="flex flex-col gap-4">
        {secondaryNews.slice(0, 3).map((news) => (
          <Link key={news.id} to={`/noticia/${news.id}`}>
            <article className="relative rounded-xl overflow-hidden group cursor-pointer shadow-lg h-[140px] md:h-[120px] lg:h-[calc((400px-32px)/3)]">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              
              <div className="absolute top-3 left-3">
                <span className="category-badge category-aafab text-[10px] px-2 py-0.5">
                  {news.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-serif text-sm md:text-base font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
                  {news.title}
                </h3>
                <div className="flex items-center gap-2 text-white/60 text-[10px] mt-1">
                  <span>{news.author}</span>
                  <span>•</span>
                  <span>{news.date}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
