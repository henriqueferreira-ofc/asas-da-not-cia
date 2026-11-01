import { Link } from "react-router-dom";
import { ArrowLeft, Target, Eye, Users, Award } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { usePageContent } from "@/hooks/usePageContent";
import { Skeleton } from "@/components/ui/skeleton";

// Permite usar **negrito** nos textos vindos do admin
const formatRichText = (text: string) => {
  if (!text) return "";

  // Escapa caracteres básicos para evitar HTML indesejado
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Converte **texto** em <strong>texto</strong>
  const withBold = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Quebras de linha
  return withBold.replace(/\n/g, "<br />");
};

const SobrePage = () => {
  const { data: pageData, isLoading } = usePageContent('sobre');

  const content = (pageData?.content && typeof pageData.content === 'object' && !Array.isArray(pageData.content))
    ? pageData.content as Record<string, unknown>
    : {};

  const title = (content.title as string) || 'Sobre a AAFAB';
  const subtitle = (content.subtitle as string) || '';
  const intro1 = (content.intro1 as string) || '';
  const intro2 = (content.intro2 as string) || '';
  const mission = (content.mission as string) || '';
  const vision = (content.vision as string) || '';
  const values = Array.isArray(content.values) ? (content.values as string[]) : [];
  const publico = Array.isArray(content.publico) ? (content.publico as string[]) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-12 w-64 mx-auto" />
            <Skeleton className="h-24 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-40" />)}
            </div>
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
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-headline mb-4">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {(intro1 || intro2) && (
            <section className="prose prose-lg max-w-none mb-12">
              {intro1 && (
                <p
                  className="text-lg leading-relaxed text-foreground"
                  dangerouslySetInnerHTML={{ __html: formatRichText(intro1) }}
                />
              )}
              {intro2 && (
                <p
                  className="text-lg leading-relaxed text-foreground"
                  dangerouslySetInnerHTML={{ __html: formatRichText(intro2) }}
                />
              )}
            </section>
          )}

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {mission && (
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-headline">Missão</h2>
                </div>
                <p
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatRichText(mission) }}
                />
              </div>
            )}

            {vision && (
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-headline">Visão</h2>
                </div>
                <p
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatRichText(vision) }}
                />
              </div>
            )}

            {values.length > 0 && (
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-headline">Valores</h2>
                </div>
                <ul className="text-muted-foreground space-y-3">
                  {values.map((v, i) => {
                    const parts = v.split(' - ');
                    if (parts.length >= 3) {
                      const title = `${parts[0]} - ${parts[1]}`;
                      const desc = parts.slice(2).join(' - ');
                      return (
                        <li key={i}>
                          <span className="font-bold text-foreground">{title}</span>
                          <br />
                          <span
                            dangerouslySetInnerHTML={{ __html: formatRichText(desc) }}
                          />
                        </li>
                      );
                    }
                    // Se tiver apenas 2 partes, assume que é "número - título" e permite descrição na próxima linha
                    if (parts.length === 2) {
                      const title = `${parts[0]} - ${parts[1]}`;
                      return (
                        <li key={i}>
                          <span className="font-bold text-foreground">{title}</span>
                        </li>
                      );
                    }
                    return (
                      <li key={i}>
                        <span dangerouslySetInnerHTML={{ __html: formatRichText(v) }} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {publico.length > 0 && (
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-headline">Público</h2>
                </div>
                <ul className="text-muted-foreground space-y-2">
                  {publico.map((p, i) => <li key={i}>• {p}</li>)}
                </ul>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SobrePage;
