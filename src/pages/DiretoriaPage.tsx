import { Link } from "react-router-dom";
import { ArrowLeft, User, Users, BookOpen, Wallet, Shield } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface DiretorMember {
  cargo: string;
  nome: string;
  descricao: string;
  icon: React.ReactNode;
}

const diretoria: DiretorMember[] = [
  {
    cargo: "Presidente",
    nome: "A definir",
    descricao: "Responsável pela gestão geral da associação e representação institucional.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    cargo: "Vice-Presidente",
    nome: "A definir",
    descricao: "Auxilia o presidente em suas funções e o substitui em suas ausências.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    cargo: "Secretário",
    nome: "A definir",
    descricao: "Responsável pela documentação, atas e comunicações oficiais da associação.",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    cargo: "Tesoureiro",
    nome: "A definir",
    descricao: "Gerencia as finanças, prestação de contas e patrimônio da associação.",
    icon: <Wallet className="w-6 h-6" />,
  },
];

const conselhoDeliberativo: DiretorMember[] = [
  {
    cargo: "Conselheiro",
    nome: "A definir",
    descricao: "Membro do Conselho Deliberativo da AAFAB.",
    icon: <User className="w-6 h-6" />,
  },
  {
    cargo: "Conselheiro",
    nome: "A definir",
    descricao: "Membro do Conselho Deliberativo da AAFAB.",
    icon: <User className="w-6 h-6" />,
  },
  {
    cargo: "Conselheiro",
    nome: "A definir",
    descricao: "Membro do Conselho Deliberativo da AAFAB.",
    icon: <User className="w-6 h-6" />,
  },
];

const DiretoriaPage = () => {
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

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-headline mb-4">
              Diretoria da AAFAB
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diretoria.map((membro, index) => (
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
                      <h3 className="text-lg font-bold text-headline mb-2">
                        {membro.nome}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {membro.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Conselho Deliberativo */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-headline">Conselho Deliberativo</h2>
            </div>

            <p className="text-muted-foreground mb-6">
              O Conselho Deliberativo é responsável por deliberar sobre as diretrizes gerais da associação, 
              aprovar contas e tomar decisões estratégicas para o futuro da AAFAB.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {conselhoDeliberativo.map((membro, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">
                      {membro.icon}
                    </div>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent mb-1 block">
                    {membro.cargo}
                  </span>
                  <h3 className="text-lg font-bold text-headline">
                    {membro.nome}
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
