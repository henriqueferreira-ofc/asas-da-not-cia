import { usePageContent } from "@/hooks/usePageContent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Shield } from "lucide-react";
import { PrefetchLink } from "@/components/common/PrefetchLink";
import { prefetchIndex } from "@/App";

const PrivacidadePage = () => {
  const { data: pageData } = usePageContent('privacidade');
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
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
              {s('titulo', 'Política de Privacidade')}
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              {s('subtitulo', 'Saiba como coletamos, usamos e protegemos suas informações pessoais.')}
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
                <h2 className="text-xl font-serif font-bold text-headline mb-3">1. Informações que Coletamos</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s1', 'A AAFAB coleta informações que você nos fornece diretamente, como nome e endereço de e-mail ao se inscrever em nossa newsletter, preencher o formulário de contato ou adquirir nossos e-books.\n\nTambém coletamos automaticamente informações de uso por meio de ferramentas de análise.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">2. Como Usamos suas Informações</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s2', '- Enviar newsletters e comunicados;\n- Processar compras de e-books;\n- Responder a suas mensagens;\n- Melhorar nosso site;\n- Cumprir obrigações legais.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">3. Compartilhamento de Dados</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s3', 'Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins comerciais.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">4. Segurança dos Dados</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s4', 'Adotamos medidas técnicas e organizacionais para proteger suas informações. As transações financeiras são processadas com criptografia SSL/TLS.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">5. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s5', 'Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para entender como os visitantes interagem com nossas páginas.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">6. Seus Direitos (LGPD)</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s6', 'De acordo com a LGPD (Lei nº 13.709/2018), você tem direito a acessar, corrigir e excluir seus dados pessoais.')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">7. Alterações nesta Política</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s('s7', 'Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página.')}
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

export default PrivacidadePage;
