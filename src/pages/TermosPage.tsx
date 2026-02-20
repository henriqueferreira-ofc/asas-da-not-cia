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
              {c.titulo || 'Termos de Uso'}
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              {c.subtitulo || 'Leia com atenção as condições de uso do portal AAFAB.'}
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
                <p className="text-muted-foreground leading-relaxed">
                  Ao acessar e utilizar o portal da AAFAB — Associação Amigos da Força Aérea Brasileira, você concorda com estes Termos de Uso. Se não concordar com qualquer disposição, pedimos que não utilize nosso site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">2. Uso do Conteúdo</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Todo o conteúdo disponibilizado neste portal — incluindo textos, imagens, e-books, logos e demais materiais — é de propriedade da AAFAB ou de seus parceiros e está protegido pela legislação de direitos autorais.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  É permitida a reprodução parcial de conteúdo jornalístico mediante citação expressa da fonte. A reprodução total ou comercial sem autorização prévia por escrito é proibida.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">3. Compra de E-Books</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ao adquirir um e-book pelo portal, você recebe uma licença pessoal, intransferível e não exclusiva para uso do material. Fica expressamente proibido:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mt-3">
                  <li>Compartilhar, redistribuir ou revender o arquivo;</li>
                  <li>Reproduzir o conteúdo integral sem autorização;</li>
                  <li>Utilizar o material para fins comerciais não autorizados.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  As compras são processadas com segurança via Stripe. Em caso de problemas com o pagamento ou download, entre em contato conosco.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">4. Política de Reembolso</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Devido à natureza digital dos produtos, não realizamos reembolsos após o acesso ao arquivo ser liberado, exceto em casos de defeito comprovado no produto. Solicitações de reembolso devem ser feitas em até 7 dias após a compra, mediante justificativa.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">5. Responsabilidade</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A AAFAB se esforça para manter as informações do portal atualizadas e precisas, mas não garante a exatidão, completude ou atualidade de todo o conteúdo. O uso das informações é de responsabilidade do usuário.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Não nos responsabilizamos por danos diretos ou indiretos decorrentes do uso ou da impossibilidade de uso do portal.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">6. Links Externos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nosso portal pode conter links para sites de terceiros. Esses links são fornecidos apenas para conveniência e não implicam endosso ou responsabilidade pelo conteúdo desses sites.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">7. Alterações nos Termos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A AAFAB reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações entram em vigor imediatamente após a publicação. O uso continuado do portal após qualquer modificação implica aceitação dos novos termos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">8. Legislação Aplicável</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de Brasília — DF para dirimir quaisquer controvérsias.
                </p>
              </section>

              <div className="pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Última atualização: fevereiro de 2025 · AAFAB — Associação Amigos da Força Aérea Brasileira
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
