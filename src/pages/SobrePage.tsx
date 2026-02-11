import { Link } from "react-router-dom";
import { ArrowLeft, Target, Eye, Users, Award } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useSiteSettingsMap } from "@/hooks/useSiteSettings";
import { usePageContent } from "@/hooks/usePageContent";
import { Skeleton } from "@/components/ui/skeleton";

const SobrePage = () => {
  const { data: settings } = useSiteSettingsMap();
  const { data: pageData, isLoading } = usePageContent('sobre');
  const communityLink = settings?.floating_button_link || '#';

  const content = (pageData?.content && typeof pageData.content === 'object' && !Array.isArray(pageData.content))
    ? pageData.content as Record<string, unknown>
    : {};

  const title = (content.title as string) || 'Sobre a AAFAB';
  const subtitle = (content.subtitle as string) || 'Amigos da Força Aérea Brasileira';
  const intro1 = (content.intro1 as string) || '';
  const intro2 = (content.intro2 as string) || '';
  const mission = (content.mission as string) || '';
  const vision = (content.vision as string) || '';
  const values = Array.isArray(content.values) ? (content.values as string[]) : [];
  const publico = Array.isArray(content.publico) ? (content.publico as string[]) : [];
  const ctaTitle = (content.ctaTitle as string) || 'Faça Parte da Nossa Comunidade';
  const ctaText = (content.ctaText as string) || '';

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
              {intro1 && <p className="text-lg leading-relaxed text-foreground">{intro1}</p>}
              {intro2 && <p className="text-lg leading-relaxed text-foreground">{intro2}</p>}
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
                <p className="text-muted-foreground leading-relaxed">{mission}</p>
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
                <p className="text-muted-foreground leading-relaxed">{vision}</p>
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
                <ul className="text-muted-foreground space-y-2">
                  {values.map((v, i) => <li key={i}>• {v}</li>)}
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

          <section className="bg-primary rounded-xl p-8 text-center">
            <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-4">
              {ctaTitle}
            </h2>
            {ctaText && (
              <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
                {ctaText}
              </p>
            )}
            <a
              href={communityLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#20BD5A] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Entrar na Comunidade
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SobrePage;
