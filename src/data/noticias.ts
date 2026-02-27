import heroImage from "@/assets/hero-fab.jpg";
import ceremonyImage from "@/assets/hero-fab.jpg";
import congressImage from "@/assets/hero-fab.jpg";
import defenseImage from "@/assets/hero-fab.jpg";
import internationalImage from "@/assets/news-aircraft.jpg";
import aircraftImage from "@/assets/news-aircraft.jpg";

export type NewsCategory = "aafab" | "politica" | "internacional" | "comunicados";

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: NewsCategory;
  categoryLabel: string;
  categorySlug: string;
  author: string;
  authorRole?: string;
  date: string;
}

export const categoryInfo: Record<string, { name: string; description: string }> = {
  aafab: {
    name: "AAFAB Institucional",
    description: "Notícias, eventos e comunicados oficiais da Associação Amigos da Força Aérea Brasileira.",
  },
  politica: {
    name: "Notícia Nacional",
    description: "Cobertura completa sobre política brasileira, Executivo, Legislativo e Judiciário.",
  },
  internacional: {
    name: "Internacional",
    description: "Análises e notícias sobre relações internacionais e geopolítica global.",
  },
  comunicados: {
    name: "Comunicados Oficiais",
    description: "Notas, comunicados e documentos oficiais da AAFAB.",
  },
};

export const allNews: NewsItem[] = [
  {
    id: "aafab-encontro-nacional",
    title: "AAFAB promove encontro nacional de associados em Brasília",
    excerpt: "Evento reunirá militares da ativa, reserva e pensionistas para discussão sobre políticas de valorização das Forças Armadas.",
    content: `
      <p>A Associação Amigos da Força Aérea Brasileira (AAFAB) realizará seu encontro anual de associados nos dias 20 e 21 de janeiro, em Brasília. O evento reunirá militares da ativa, reserva e pensionistas de todo o país.</p>
      
      <h2>Programação do Evento</h2>
      <p>A programação inclui palestras, debates e workshops sobre temas relevantes para a comunidade militar.</p>
    `,
    image: ceremonyImage,
    category: "aafab",
    categoryLabel: "AAFAB",
    categorySlug: "aafab",
    author: "Redação AAFAB",
    date: "13 Jan 2026",
  },
  {
    id: "congresso-marco-regulatorio",
    title: "Congresso aprova novo marco regulatório para setor de defesa",
    excerpt: "Legislação moderniza regras para contratações militares e incentiva participação da indústria nacional em projetos estratégicos.",
    content: `
      <p>O Congresso Nacional aprovou nesta terça-feira o novo marco regulatório para o setor de defesa brasileiro.</p>
    `,
    image: congressImage,
    category: "politica",
    categoryLabel: "Política Nacional",
    categorySlug: "politica",
    author: "Ana Beatriz Costa",
    authorRole: "Correspondente Parlamentar",
    date: "12 Jan 2026",
  },
  {
    id: "ministerio-plano-estrategico",
    title: "Ministério da Defesa apresenta plano estratégico para próxima década",
    excerpt: "Documento define prioridades de investimento, modernização de equipamentos e políticas de pessoal para as três Forças.",
    content: `
      <p>O Ministério da Defesa apresentou hoje seu Plano Estratégico de Defesa Nacional para o período 2026-2036.</p>
    `,
    image: congressImage,
    category: "politica",
    categoryLabel: "Política Nacional",
    categorySlug: "politica",
    author: "Carlos Eduardo Silva",
    date: "10 Jan 2026",
  },
  {
    id: "senado-militares-inativos",
    title: "Senado debate proposta de valorização dos militares inativos",
    excerpt: "Projeto de lei busca equiparar benefícios e garantir melhores condições para reservistas e pensionistas das Forças Armadas.",
    content: `
      <p>O Senado Federal iniciou nesta semana a discussão do Projeto de Lei que visa valorizar os militares inativos das Forças Armadas.</p>
    `,
    image: congressImage,
    category: "politica",
    categoryLabel: "Política Nacional",
    categorySlug: "politica",
    author: "Maria Helena Souza",
    date: "09 Jan 2026",
  },
  {
    id: "camara-credito-forcas-armadas",
    title: "Câmara aprova crédito extraordinário para Forças Armadas",
    excerpt: "Recursos serão destinados à manutenção de equipamentos e continuidade de projetos estratégicos de defesa nacional.",
    content: `
      <p>A Câmara dos Deputados aprovou ontem crédito extraordinário de R$ 4,5 bilhões para as Forças Armadas.</p>
    `,
    image: congressImage,
    category: "politica",
    categoryLabel: "Política Nacional",
    categorySlug: "politica",
    author: "Paulo Roberto Lima",
    date: "08 Jan 2026",
  },
  {
    id: "brasil-comando-forca-paz",
    title: "Brasil assume comando de força de paz multinacional",
    excerpt: "Oficiais brasileiros lideram contingente internacional em missão de estabilização autorizada pelo Conselho de Segurança da ONU.",
    content: `
      <p>O Brasil assumiu nesta semana o comando da Força de Paz das Nações Unidas em missão de estabilização.</p>
    `,
    image: internationalImage,
    category: "internacional",
    categoryLabel: "Internacional",
    categorySlug: "internacional",
    author: "Cel. Fernando Gomes",
    date: "12 Jan 2026",
  },
  {
    id: "cooperacao-brics-defesa",
    title: "Acordo de cooperação em defesa com países do BRICS avança",
    excerpt: "Ministros de Defesa discutem iniciativas conjuntas em tecnologia, treinamento e operações de paz.",
    content: `
      <p>Os ministros de Defesa dos países do BRICS se reuniram esta semana para discutir avanços na cooperação em defesa.</p>
    `,
    image: internationalImage,
    category: "internacional",
    categoryLabel: "Internacional",
    categorySlug: "internacional",
    author: "Embaixador Paulo Mendes",
    date: "06 Jan 2026",
  },
  {
    id: "comunicado-assembleia-geral",
    title: "Comunicado: Assembleia Geral Ordinária da AAFAB",
    excerpt: "Convocamos todos os associados para a Assembleia Geral Ordinária que será realizada no dia 25 de janeiro de 2026.",
    content: `
      <p>A diretoria da AAFAB convoca todos os associados para a Assembleia Geral Ordinária.</p>
    `,
    image: ceremonyImage,
    category: "comunicados",
    categoryLabel: "Comunicados",
    categorySlug: "comunicados",
    author: "Diretoria AAFAB",
    date: "05 Jan 2026",
  },
];

export function getNewsByCategory(categorySlug: string): NewsItem[] {
  return allNews.filter((news) => news.categorySlug === categorySlug);
}

export function getNewsById(id: string): NewsItem | undefined {
  return allNews.find((news) => news.id === id);
}

export function getRelatedNews(currentId: string, category: string, limit: number = 3): NewsItem[] {
  return allNews
    .filter((news) => news.id !== currentId && news.categorySlug === category)
    .slice(0, limit);
}
