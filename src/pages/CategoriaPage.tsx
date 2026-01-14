import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsCard } from "@/components/news/NewsCard";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { getNewsByCategory, categoryInfo } from "@/data/noticias";

const CategoriaPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const news = getNewsByCategory(slug || "");
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
            {news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map((item) => (
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
