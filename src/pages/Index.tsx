import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FeaturedNewsGrid } from "@/components/news/FeaturedNewsGrid";
import { BreakingNews } from "@/components/news/BreakingNews";
import { NewsSection } from "@/components/news/NewsSection";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { FloatingCommunityButton } from "@/components/common/FloatingCommunityButton";
import { useRecentNoticias, usePublishedNoticias, useFeaturedNoticias } from "@/hooks/useNoticias";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import heroImage from "@/assets/hero-fab.jpg";
import type { NewsCategory } from "@/components/news/NewsCard";

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

const Index = () => {
  // Fetch up to 4 featured news for the grid layout (1 main + 3 secondary)
  const { data: featuredNoticias, isLoading: loadingFeatured } = useFeaturedNoticias(4);
  const { data: recentNoticias, isLoading: loadingRecent } = useRecentNoticias(12);
  const { data: allPublished, isLoading: loadingAll } = usePublishedNoticias();

  // Use featured news if available, otherwise use the most recent published news as fallback
  const featuredNews = (featuredNoticias && featuredNoticias.length > 0)
    ? featuredNoticias
    : (recentNoticias?.slice(0, 1) || []);

  // Transform featured news for the grid
  const transformedFeatured = featuredNews.map((noticia) => ({
    id: noticia.id,
    title: noticia.title,
    excerpt: noticia.excerpt,
    image: noticia.image_url || heroImage,
    category: getCategoryLabel(noticia.category),
    author: noticia.author,
    date: formatDate(noticia.created_at),
  }));

  // Transform DB data to NewsSection format
  const transformNews = (noticias: typeof recentNoticias, limit = 3) => {
    return (noticias || []).slice(0, limit).map((noticia) => ({
      id: noticia.id,
      title: noticia.title,
      excerpt: noticia.excerpt,
      image: noticia.image_url || heroImage,
      category: mapCategory(noticia.category),
      categoryLabel: getCategoryLabel(noticia.category),
      author: noticia.author,
      date: formatDate(noticia.created_at),
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreakingNews />

      <main className="container py-8 md:py-10">
        {/* Featured News Grid - 1 main + up to 3 secondary */}
        <section className="mb-10 md:mb-12">
          {loadingFeatured ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <Skeleton className="lg:col-span-2 h-[300px] md:h-[400px] rounded-xl" />
              <div className="flex flex-col gap-4">
                <Skeleton className="h-[120px] rounded-xl" />
                <Skeleton className="h-[120px] rounded-xl" />
                <Skeleton className="h-[120px] rounded-xl" />
              </div>
            </div>
          ) : transformedFeatured.length > 0 ? (
            <FeaturedNewsGrid news={transformedFeatured} />
          ) : null}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Latest News - most recent */}
            {loadingRecent ? (
              <section className="mb-12">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[300px] rounded-xl" />
                  ))}
                </div>
              </section>
            ) : (recentNoticias?.length ?? 0) > 0 ? (
              <NewsSection
                title="Últimas Notícias"
                news={transformNews(recentNoticias, 6)}
                showViewAll={false}
              />
            ) : null}

            {/* Older news - all published beyond the recent ones */}
            {loadingAll ? (
              <section className="mb-12">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[300px] rounded-xl" />
                  ))}
                </div>
              </section>
            ) : (() => {
              const recentIds = new Set((recentNoticias || []).map(n => n.id));
              const featuredIds = new Set((featuredNoticias || []).map(n => n.id));
              const olderNews = (allPublished || []).filter(n => !recentIds.has(n.id) && !featuredIds.has(n.id));
              return olderNews.length > 0 ? (
                <NewsSection
                  title="Notícias Anteriores"
                  news={transformNews(olderNews, 9)}
                  showViewAll={false}
                />
              ) : null;
            })()}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-[140px]">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingCommunityButton />
    </div>
  );
};

export default Index;
