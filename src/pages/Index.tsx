import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FeaturedNews } from "@/components/news/FeaturedNews";
import { BreakingNews } from "@/components/news/BreakingNews";
import { NewsSection } from "@/components/news/NewsSection";
import { NewsCard } from "@/components/news/NewsCard";
import { Sidebar } from "@/components/sidebar/Sidebar";

import heroImage from "@/assets/hero-fab.jpg";
import ceremonyImage from "@/assets/news-ceremony.jpg";
import congressImage from "@/assets/news-congress.jpg";
import defenseImage from "@/assets/news-defense.jpg";
import internationalImage from "@/assets/news-international.jpg";
import aircraftImage from "@/assets/news-aircraft.jpg";

const latestNews = [
  {
    id: "aafab-encontro-nacional",
    title: "AAFAB promove encontro nacional de associados em Brasília",
    excerpt: "Evento reunirá militares da ativa, reserva e pensionistas para discussão sobre políticas de valorização das Forças Armadas.",
    image: ceremonyImage,
    category: "aafab" as const,
    categoryLabel: "AAFAB",
    author: "Redação AAFAB",
    date: "13 Jan 2026",
  },
  {
    id: "congresso-marco-regulatorio",
    title: "Congresso aprova novo marco regulatório para setor de defesa",
    excerpt: "Legislação moderniza regras para contratações militares e incentiva participação da indústria nacional em projetos estratégicos.",
    image: congressImage,
    category: "politics" as const,
    categoryLabel: "Política",
    author: "Ana Beatriz Costa",
    date: "12 Jan 2026",
  },
  {
    id: "fab-sistema-radar",
    title: "FAB recebe primeira unidade do novo sistema de radar nacional",
    excerpt: "Equipamento desenvolvido com tecnologia 100% brasileira amplia capacidade de monitoramento do espaço aéreo em 40%.",
    image: defenseImage,
    category: "defense" as const,
    categoryLabel: "Defesa",
    author: "Ten. Ricardo Almeida",
    date: "11 Jan 2026",
  },
];

const politicsNews = [
  {
    id: "ministerio-plano-estrategico",
    title: "Ministério da Defesa apresenta plano estratégico para próxima década",
    excerpt: "Documento define prioridades de investimento, modernização de equipamentos e políticas de pessoal para as três Forças.",
    image: congressImage,
    category: "politics" as const,
    categoryLabel: "Política",
    author: "Carlos Eduardo Silva",
    date: "10 Jan 2026",
  },
  {
    id: "senado-militares-inativos",
    title: "Senado debate proposta de valorização dos militares inativos",
    excerpt: "Projeto de lei busca equiparar benefícios e garantir melhores condições para reservistas e pensionistas das Forças Armadas.",
    image: congressImage,
    category: "politics" as const,
    categoryLabel: "Política",
    author: "Maria Helena Souza",
    date: "09 Jan 2026",
  },
  {
    id: "camara-credito-forcas-armadas",
    title: "Câmara aprova crédito extraordinário para Forças Armadas",
    excerpt: "Recursos serão destinados à manutenção de equipamentos e continuidade de projetos estratégicos de defesa nacional.",
    image: congressImage,
    category: "politics" as const,
    categoryLabel: "Política",
    author: "Paulo Roberto Lima",
    date: "08 Jan 2026",
  },
];

const defenseNews = [
  {
    id: "brasil-comando-forca-paz",
    title: "Brasil assume comando de força de paz multinacional",
    excerpt: "Oficiais brasileiros lideram contingente internacional em missão de estabilização autorizada pelo Conselho de Segurança da ONU.",
    image: internationalImage,
    category: "international" as const,
    categoryLabel: "Internacional",
    author: "Cel. Fernando Gomes",
    date: "12 Jan 2026",
  },
  {
    id: "embraer-kc390-entrega",
    title: "Embraer entrega novos cargueiros KC-390 à FAB",
    excerpt: "Aeronaves de transporte tático aumentam capacidade logística e de projeção de poder da Força Aérea Brasileira.",
    image: aircraftImage,
    category: "fab" as const,
    categoryLabel: "Força Aérea",
    author: "Maj. Patrícia Ramos",
    date: "11 Jan 2026",
  },
  {
    id: "exercicio-conjunto-forcas",
    title: "Exercício conjunto integra Marinha, Exército e Aeronáutica",
    excerpt: "Operação Guardião testa interoperabilidade e prontidão das Forças Armadas em cenário de defesa do território nacional.",
    image: defenseImage,
    category: "defense" as const,
    categoryLabel: "Defesa",
    author: "Cap. André Moreira",
    date: "10 Jan 2026",
  },
];

const opinionNews = [
  {
    id: "analise-brasil-seguranca-hemisferica",
    title: "Análise: O papel estratégico do Brasil na segurança hemisférica",
    excerpt: "Especialistas avaliam posicionamento brasileiro em cenário geopolítico marcado por novas tensões globais.",
    image: internationalImage,
    category: "opinion" as const,
    categoryLabel: "Opinião",
    author: "Dr. Roberto Pinheiro",
    date: "13 Jan 2026",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreakingNews />
      
      <main className="container py-8">
        {/* Featured News */}
        <section className="mb-10">
          <FeaturedNews
            id="fab-exercicio-defesa-aerea"
            title="FAB realiza maior exercício de defesa aérea da história do Brasil"
            excerpt="Operação Céu Guardião mobiliza mais de 5.000 militares e 120 aeronaves em simulação de defesa do espaço aéreo nacional, com participação de países aliados do continente americano."
            image={heroImage}
            category="Força Aérea Brasileira"
            author="Redação AAFAB"
            date="13 Janeiro 2026"
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Latest News */}
            <NewsSection
              title="Últimas Notícias"
              news={latestNews}
              categorySlug="aafab"
            />

            {/* Politics */}
            <NewsSection
              title="Política Nacional"
              news={politicsNews}
              categorySlug="politica"
            />

            {/* Defense */}
            <NewsSection
              title="Defesa e Assuntos Militares"
              news={defenseNews}
              categorySlug="defesa"
            />

            {/* Opinion Section */}
            <section className="mb-10">
              <h2 className="section-title">Artigos e Análises</h2>
              <div className="grid grid-cols-1 gap-6">
                {opinionNews.map((news) => (
                  <Link key={news.id} to={`/noticia/${news.id}`}>
                    <article className="news-card flex flex-col md:flex-row overflow-hidden group cursor-pointer">
                      <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="category-badge category-opinion absolute top-3 left-3">
                          {news.categoryLabel}
                        </span>
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="font-serif text-xl font-bold text-headline mb-3 group-hover:text-link transition-colors">
                          {news.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {news.excerpt}
                        </p>
                        <div className="article-meta">
                          <span className="font-medium text-foreground">{news.author}</span>
                          <span className="text-muted-foreground/50">•</span>
                          <span>{news.date}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
