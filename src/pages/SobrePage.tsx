import { Link } from "react-router-dom";
import { ArrowLeft, Target, Eye, Users, Award } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SobrePage = () => {
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

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-headline mb-4">
              Sobre a AAFAB
            </h1>
            <p className="text-xl text-muted-foreground">
              Amigos da Força Aérea Brasileira
            </p>
          </div>

          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-lg leading-relaxed text-foreground">
              A AAFAB – Associação Amigos da Força Aérea Brasileira é uma entidade sem fins lucrativos 
              dedicada a promover e preservar os valores, a história e as tradições da Força Aérea 
              Brasileira, além de apoiar militares da ativa, reserva, pensionistas e suas famílias.
            </p>
            <p className="text-lg leading-relaxed text-foreground">
              Fundada com o propósito de fortalecer os laços entre a sociedade civil e a FAB, 
              a AAFAB atua como uma ponte de comunicação, divulgando informações qualificadas 
              sobre defesa, política e assuntos militares.
            </p>
          </section>

          {/* Mission, Vision, Values */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-xl font-serif font-bold text-headline">Missão</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Promover a valorização da Força Aérea Brasileira e de seus integrantes, 
                divulgando informações qualificadas e fortalecendo o vínculo entre a 
                sociedade civil e a instituição.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-xl font-serif font-bold text-headline">Visão</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Ser referência nacional em informação e advocacy sobre temas de defesa 
                e assuntos militares, reconhecida pela credibilidade e responsabilidade 
                editorial.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-xl font-serif font-bold text-headline">Valores</h2>
              </div>
              <ul className="text-muted-foreground space-y-2">
                <li>• Compromisso com a verdade</li>
                <li>• Ética e responsabilidade</li>
                <li>• Respeito às instituições democráticas</li>
                <li>• Valorização da história e tradições</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-xl font-serif font-bold text-headline">Público</h2>
              </div>
              <ul className="text-muted-foreground space-y-2">
                <li>• Militares da ativa e reserva</li>
                <li>• Pensionistas e familiares</li>
                <li>• Pesquisadores e acadêmicos</li>
                <li>• Sociedade civil interessada</li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary rounded-xl p-8 text-center">
            <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-4">
              Faça Parte da Nossa Comunidade
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Junte-se a milhares de associados que apoiam e valorizam a Força Aérea Brasileira. 
              Como membro, você terá acesso a eventos exclusivos, informações privilegiadas e 
              muito mais.
            </p>
            <Link
              to="/associe-se"
              className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Associe-se Agora
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SobrePage;
