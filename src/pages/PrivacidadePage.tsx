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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <div className="bg-white border-b border-border py-12">
          <div className="container max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-headline">
              {c.titulo || 'Política de Privacidade'}
            </h1>
            <p className="text-muted-foreground text-lg">
              {c.subtitulo || 'Saiba como coletamos, usamos e protegemos suas informações pessoais.'}
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
            <div className="p-8 md:p-12 space-y-8 prose prose-sm max-w-none text-foreground">

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">1. Informações que Coletamos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A AAFAB — Associação Amigos da Força Aérea Brasileira coleta informações que você nos fornece diretamente, como nome e endereço de e-mail ao se inscrever em nossa newsletter, preencher o formulário de contato ou adquirir nossos e-books.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Também coletamos automaticamente informações de uso, como páginas visitadas e tempo de permanência no site, por meio de ferramentas de análise.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">2. Como Usamos suas Informações</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                  <li>Enviar newsletters e comunicados institucionais;</li>
                  <li>Processar compras de e-books e confirmar pagamentos;</li>
                  <li>Responder a suas mensagens e solicitações de contato;</li>
                  <li>Melhorar nosso site e conteúdo com base no comportamento dos usuários;</li>
                  <li>Cumprir obrigações legais e regulatórias.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">3. Compartilhamento de Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins comerciais. Seus dados podem ser compartilhados apenas com prestadores de serviço que nos auxiliam nas operações do site (como processadores de pagamento — Stripe), e somente na medida necessária para a prestação desses serviços.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">4. Segurança dos Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Adotamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. As transações financeiras são processadas com criptografia SSL/TLS por meio do Stripe.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">5. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para entender como os visitantes interagem com nossas páginas. Você pode configurar seu navegador para recusar cookies, porém isso pode afetar algumas funcionalidades.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">6. Seus Direitos (LGPD)</h2>
                <p className="text-muted-foreground leading-relaxed">
                  De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mt-3">
                  <li>Acessar seus dados pessoais que mantemos;</li>
                  <li>Solicitar a correção de dados incompletos ou incorretos;</li>
                  <li>Solicitar a exclusão de seus dados;</li>
                  <li>Revogar o consentimento a qualquer momento;</li>
                  <li>Opor-se ao tratamento de seus dados.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Para exercer esses direitos, entre em contato pelo e-mail disponível em nossa página de Contato.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-headline mb-3">7. Alterações nesta Política</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com a data de revisão atualizada.
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

export default PrivacidadePage;
