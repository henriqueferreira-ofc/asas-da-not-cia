import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsCard, NewsCategory } from "@/components/news/NewsCard";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useNoticiasByCategory } from "@/hooks/useNoticias";
import { categoryInfo } from "@/data/noticias";
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
    politica: "Política Nacional",
    internacional: "Internacional",
    comunicados: "Comunicados",
  };
  return labels[category] || "AAFAB";
};

const CategoriaPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: noticias, isLoading, error } = useNoticiasByCategory(slug);
  const category = categoryInfo[slug || ""];

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-headline mb-4">
              Categoria não encontrada
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

        {/* Category Header */}
        <div className="mb-8 pb-6 border-b border-border">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-headline mb-2">
            {category.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            {category.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Grid */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-[300px] rounded-xl" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive text-lg">
                  Erro ao carregar notícias. Tente novamente mais tarde.
                </p>
              </div>
            ) : (noticias?.length ?? 0) > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {noticias?.map((noticia) => (
                  <NewsCard
                    key={noticia.id}
                    id={noticia.id}
                    title={noticia.title}
                    excerpt={noticia.excerpt}
                    image={noticia.image_url || heroImage}
                    category={mapCategory(noticia.category)}
                    categoryLabel={noticia.category_label || getCategoryLabel(noticia.category)}
                    author={noticia.author}
                    date={formatDate(noticia.created_at)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhuma notícia encontrada nesta categoria.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoriaPage;
