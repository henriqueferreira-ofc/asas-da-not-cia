import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FeaturedNews } from "@/components/news/FeaturedNews";
import { BreakingNews } from "@/components/news/BreakingNews";
import { NewsSection } from "@/components/news/NewsSection";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { FloatingCommunityButton } from "@/components/FloatingCommunityButton";
import { useRecentNoticias, useNoticiasByCategory, useFeaturedNoticias } from "@/hooks/useNoticias";
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
    politica: "Política Nacional",
    internacional: "Internacional",
    comunicados: "Comunicados",
  };
  return labels[category] || "AAFAB";
};

const Index = () => {
  const { data: featuredNoticias, isLoading: loadingFeatured } = useFeaturedNoticias(1);
  const { data: recentNoticias, isLoading: loadingRecent } = useRecentNoticias(6);
  const { data: politicaNoticias, isLoading: loadingPolitica } = useNoticiasByCategory("politica");
  const { data: internacionalNoticias, isLoading: loadingInternacional } = useNoticiasByCategory("internacional");

  // Use featured news if available, otherwise use the most recent published news
  const featured = featuredNoticias?.[0] || recentNoticias?.[0];

  // Transform DB data to NewsSection format
  const transformNews = (noticias: typeof recentNoticias, limit = 3) => {
    return (noticias || []).slice(0, limit).map((noticia) => ({
      id: noticia.id,
      title: noticia.title,
      excerpt: noticia.excerpt,
      image: noticia.image_url || heroImage,
      category: mapCategory(noticia.category),
      categoryLabel: noticia.category_label || getCategoryLabel(noticia.category),
      author: noticia.author,
      date: formatDate(noticia.created_at),
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreakingNews />
      
      <main className="container py-8 md:py-10">
        {/* Featured News */}
        <section className="mb-10 md:mb-12">
          {loadingFeatured ? (
            <div className="rounded-xl overflow-hidden">
              <Skeleton className="w-full h-[400px]" />
            </div>
          ) : featured ? (
            <FeaturedNews
              id={featured.id}
              title={featured.title}
              excerpt={featured.excerpt}
              image={featured.image_url || heroImage}
              category={featured.category_label || getCategoryLabel(featured.category)}
              author={featured.author}
              date={formatDate(featured.created_at)}
            />
          ) : null}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Latest News */}
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
                news={transformNews(recentNoticias, 3)}
                showViewAll={false}
              />
            ) : null}

            {/* Política Nacional */}
            {loadingPolitica ? (
              <section className="mb-12">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[300px] rounded-xl" />
                  ))}
                </div>
              </section>
            ) : (politicaNoticias?.length ?? 0) > 0 ? (
              <NewsSection
                title="Política Nacional"
                news={transformNews(politicaNoticias, 3)}
                categorySlug="politica"
              />
            ) : null}

            {/* Internacional */}
            {loadingInternacional ? (
              <section className="mb-12">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[300px] rounded-xl" />
                  ))}
                </div>
              </section>
            ) : (internacionalNoticias?.length ?? 0) > 0 ? (
              <NewsSection
                title="Internacional"
                news={transformNews(internacionalNoticias, 3)}
                categorySlug="internacional"
              />
            ) : null}
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
