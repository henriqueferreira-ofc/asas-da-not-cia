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
              Junte-se a milhares de associados que apoiam e valorizam a Associação Amigos da Força Aérea Brasileira. 
              Como patrocinador, você terá acesso a e-books, informações privilegiadas e muito mais.
            </p>
            <a
              href="https://chat.whatsapp.com/SEU_LINK_AQUI"
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
