import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User, Share2, Facebook, Twitter } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsCard } from "@/components/news/NewsCard";
import { getNewsById, getRelatedNews } from "@/data/noticias";

const NoticiaPage = () => {
  const { id } = useParams<{ id: string }>();
  const news = getNewsById(id || "");
  const relatedNews = news ? getRelatedNews(news.id, news.categorySlug, 3) : [];

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-headline mb-4">
              Notícia não encontrada
            </h1>
            <Link to="/" className="text-link hover:text-primary transition-colors">
              Voltar para a página inicial
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <Link 
            to={`/categoria/${news.categorySlug}`}
            className="inline-block mb-4"
          >
            <span className="category-badge category-aafab">
              {news.categoryLabel}
            </span>
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-headline leading-tight mb-4">
            {news.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            {news.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 pb-6 mb-6 border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="font-medium text-foreground">{news.author}</span>
              {news.authorRole && (
                <span className="text-muted-foreground">• {news.authorRole}</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{news.date}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden mb-8">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-auto object-cover aspect-video"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Share */}
          <div className="flex items-center gap-4 py-6 border-t border-b border-border mb-8">
            <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Share2 className="w-4 h-4" />
              Compartilhar:
            </span>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <section>
              <h2 className="section-title mb-6">Notícias Relacionadas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <NewsCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    excerpt={item.excerpt}
                    image={item.image}
                    category={item.category}
                    categoryLabel={item.categoryLabel}
                    author={item.author}
                    date={item.date}
                    size="small"
                  />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default NoticiaPage;
