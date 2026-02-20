import { usePageContent } from "@/hooks/usePageContent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, FileText } from "lucide-react";
import { PrefetchLink } from "@/components/common/PrefetchLink";
import { prefetchIndex } from "@/App";

const TermosPage = () => {
  const { data: pageData } = usePageContent('termos');
  const c = (pageData?.content && typeof pageData.content === 'object' && !Array.isArray(pageData.content))
    ? pageData.content as Record<string, string>
    : {} as Record<string, string>;

  const s = (key: string, fallback: string) => c[key] || fallback;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-6">
              <FileText className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
              {s('titulo', 'Termos de Uso')}
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              {s('subtitulo', 'Leia com atenção as condições de uso do portal AAFAB.')}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container max-w-3xl mx-auto py-12 px-4">
          <div className="mb-6">
            <PrefetchLink
              to="/"
              prefetch={prefetchIndex}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </PrefetchLink>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-8 md:p-12 space-y-8 text-foreground">

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">1. Aceitação dos Termos</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s1', 'Ao acessar e utilizar o portal da AAFAB, você concorda com estes Termos de Uso.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">2. Uso do Conteúdo</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s2', 'Todo o conteúdo disponibilizado neste portal é de propriedade da AAFAB ou de seus parceiros e está protegido pela legislação de direitos autorais.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">3. Compra de E-Books</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s3', 'Ao adquirir um e-book pelo portal, você recebe uma licença pessoal, intransferível e não exclusiva para uso do material.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">4. Política de Reembolso</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s4', 'Devido à natureza digital dos produtos, não realizamos reembolsos após o acesso ao arquivo ser liberado, exceto em casos de defeito comprovado.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">5. Responsabilidade</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s5', 'A AAFAB se esforça para manter as informações do portal atualizadas e precisas, mas não garante a exatidão de todo o conteúdo.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">6. Links Externos</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s6', 'Nosso portal pode conter links para sites de terceiros. Esses links são fornecidos apenas para conveniência.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">7. Alterações nos Termos</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s7', 'A AAFAB reserva-se o direito de modificar estes Termos de Uso a qualquer momento.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">8. Legislação Aplicável</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s8', 'Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de Brasília — DF.')}
                </p>
              </section>

              <div className="pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  {s('rodape', 'Última atualização: fevereiro de 2025 · AAFAB — Associação Amigos da Força Aérea Brasileira')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosPage;
