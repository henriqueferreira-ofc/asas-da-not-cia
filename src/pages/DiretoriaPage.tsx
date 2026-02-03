import { Link } from "react-router-dom";
import { ArrowLeft, User, Users, Shield, Scale, Loader2, MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { usePageContent } from "@/hooks/usePageContent";

// Brazilian states for the 15 state counselors
const ESTADOS_BRASILEIROS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB"
];

interface DiretorMember {
  cargo: string;
  nome: string;
  icon: React.ReactNode;
  estado?: string;
}

interface ConselheiroEstadual {
  estado: string;
  nome: string;
}

interface ConselhoFiscalMember {
  cargo: string;
  nome: string;
}

const DiretoriaPage = () => {
  const { data: pageContent, isLoading } = usePageContent("diretoria");

  // Extract content from database
  const content = (pageContent?.content as Record<string, unknown>) || {};
  
  // Diretoria Executiva
  const presidente = (content.presidente as { nome?: string }) || {};
  const vicePresidente = (content.vicePresidente as { nome?: string }) || {};
  const secretarioGeral = (content.secretarioGeral as { nome?: string }) || {};
  const diretorFinanceiro = (content.diretorFinanceiro as { nome?: string }) || {};
  const viceDiretorFinanceiro = (content.viceDiretorFinanceiro as { nome?: string }) || {};

  // Conselheiros Estaduais (15)
  const conselheirosEstaduais = (content.conselheirosEstaduais as ConselheiroEstadual[]) || 
    ESTADOS_BRASILEIROS.map(estado => ({ estado, nome: "" }));

  // Conselho Fiscal (4 membros)
  const conselhoFiscal = (content.conselhoFiscal as ConselhoFiscalMember[]) || [
    { cargo: "Presidente", nome: "" },
    { cargo: "Segundo Conselheiro", nome: "" },
    { cargo: "Terceiro Conselheiro", nome: "" },
    { cargo: "Advogada", nome: "" },
  ];

  const diretoriaExecutiva: DiretorMember[] = [
    {
      cargo: "Presidente",
      nome: presidente.nome || "A definir",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      cargo: "Vice-Presidente",
      nome: vicePresidente.nome || "A definir",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      cargo: "Secretário Geral",
      nome: secretarioGeral.nome || "A definir",
      icon: <User className="w-6 h-6" />,
    },
    {
      cargo: "Diretor Financeiro",
      nome: diretorFinanceiro.nome || "A definir",
      icon: <User className="w-6 h-6" />,
    },
    {
      cargo: "Vice Diretor Financeiro",
      nome: viceDiretorFinanceiro.nome || "A definir",
      icon: <User className="w-6 h-6" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
            to="/sobre" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Sobre a AAFAB
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-headline mb-4">
              {(content.title as string) || "Diretoria da AAFAB"}
            </h1>
            <p className="text-xl text-muted-foreground">
              Conheça a equipe que lidera a Associação Amigos da Força Aérea Brasileira
            </p>
          </div>

          {/* Diretoria Executiva */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-headline">Diretoria Executiva</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diretoriaExecutiva.map((membro, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <div className="text-primary">
                        {membro.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wide text-accent mb-1 block">
                        {membro.cargo}
                      </span>
                      <h3 className="text-lg font-bold text-headline">
                        {membro.nome}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Conselheiros Estaduais - 15 estados */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-headline">Conselheiros Estaduais</h2>
                <p className="text-muted-foreground text-sm">Representantes dos 15 estados</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {conselheirosEstaduais.map((conselheiro, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-shadow text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-sm font-bold text-primary">{conselheiro.estado}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-headline">
                    {conselheiro.nome || "A definir"}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Conselho Fiscal */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Scale className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-headline">Conselho Fiscal</h2>
            </div>

            <p className="text-muted-foreground mb-6">
              O Conselho Fiscal é responsável pela fiscalização das contas e atividades financeiras da associação.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {conselhoFiscal.map((membro, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent mb-1 block">
                    {membro.cargo}
                  </span>
                  <h3 className="text-lg font-bold text-headline">
                    {membro.nome || "A definir"}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary rounded-xl p-8 text-center">
            <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-4">
              Quer fazer parte da nossa equipe?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco para saber como você pode contribuir com a AAFAB 
              e ajudar a valorizar a Força Aérea Brasileira.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Entrar em Contato
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiretoriaPage;
