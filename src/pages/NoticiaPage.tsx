import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShareButtons } from "@/components/common/ShareButtons";
import { NewsCard, NewsCategory } from "@/components/news/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useNoticia, useRelatedNoticias, useIncrementViewCount } from "@/hooks/useNoticias";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import heroImage from "@/assets/hero-fab.jpg";

// Helper to format date
const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "dd MMM yyyy", { locale: ptBR });
  } catch {
    return dateString;
  }
};

// Helper to map category from DB to component type
const mapCategory = (category: string): NewsCategory => {
  const validCategories: NewsCategory[] = ["aafab", "politica", "internacional", "comunicados"];
  return validCategories.includes(category as NewsCategory)
    ? (category as NewsCategory)
    : "aafab";
};

// Helper to get category label
const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    aafab: "AAFAB",
    politica: "Nacional",
    internacional: "Internacional",
    comunicados: "Comunicados",
  };
  return labels[category] || "AAFAB";
};

// Helper to render text with clickable URLs
const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      const href = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
          {part}
        </a>
      );
    }
    // Reset regex lastIndex since we reuse it
    urlRegex.lastIndex = 0;
    return part;
  });
};

const NoticiaPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: noticia, isLoading, error } = useNoticia(id);
  const { data: relatedNoticias } = useRelatedNoticias(id, noticia?.category, 3);
  const incrementViewCount = useIncrementViewCount();

  // Increment view count when the news article is loaded
  useEffect(() => {
    if (id && noticia && !isLoading) {
      incrementViewCount.mutate(id);
    }
  }, [id, noticia?.id]); // Only run when article loads

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <Skeleton className="h-6 w-32 mb-6" />
          <article className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-24 mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-6" />
            <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !noticia) {
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
            to={`/categoria/${noticia.category}`}
            className="inline-block mb-4"
          >
            <span className="category-badge category-aafab">
              {getCategoryLabel(noticia.category)}
            </span>
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-headline leading-tight mb-4">
            {noticia.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            {renderTextWithLinks(noticia.excerpt)}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 pb-6 mb-6 border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="font-medium text-foreground">{noticia.author}</span>
              {noticia.author_role && (
                <span className="text-muted-foreground">• {noticia.author_role}</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{formatDate(noticia.created_at)}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden mb-8">
            <img
              src={noticia.image_url || heroImage}
              alt={noticia.title}
              className="w-full h-auto object-cover aspect-video"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: noticia.content }}
          />

          {/* Share */}
          <ShareButtons title={noticia.title} />

          {/* Related News */}
          {(relatedNoticias?.length ?? 0) > 0 && (
            <section>
              <h2 className="section-title mb-6">Notícias Relacionadas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNoticias?.map((item) => (
                  <NewsCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    excerpt={item.excerpt}
                    image={item.image_url || heroImage}
                    category={mapCategory(item.category)}
                    categoryLabel={getCategoryLabel(item.category)}
                    author={item.author}
                    date={formatDate(item.created_at)}
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
