import heroImage from "@/assets/hero-fab.jpg";
import ceremonyImage from "@/assets/news-ceremony.jpg";
import congressImage from "@/assets/news-congress.jpg";
import defenseImage from "@/assets/news-defense.jpg";
import internationalImage from "@/assets/news-international.jpg";
import aircraftImage from "@/assets/news-aircraft.jpg";

export type NewsCategory = "aafab" | "politics" | "international" | "defense" | "opinion" | "fab";

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
    name: "Política Nacional",
    description: "Cobertura completa sobre política brasileira, Executivo, Legislativo e Judiciário.",
  },
  internacional: {
    name: "Política Internacional",
    description: "Análises e notícias sobre relações internacionais e geopolítica global.",
  },
  defesa: {
    name: "Defesa Nacional",
    description: "Notícias sobre as Forças Armadas, segurança nacional e assuntos militares.",
  },
  fab: {
    name: "Força Aérea Brasileira",
    description: "Cobertura dedicada à FAB: operações, tecnologia, história e legado.",
  },
  opiniao: {
    name: "Artigos e Análises",
    description: "Análises aprofundadas e artigos de opinião de especialistas.",
  },
};

export const allNews: NewsItem[] = [
  {
    id: "fab-exercicio-defesa-aerea",
    title: "FAB realiza maior exercício de defesa aérea da história do Brasil",
    excerpt: "Operação Céu Guardião mobiliza mais de 5.000 militares e 120 aeronaves em simulação de defesa do espaço aéreo nacional, com participação de países aliados do continente americano.",
    content: `
      <p>A Força Aérea Brasileira (FAB) conduziu nesta semana a Operação Céu Guardião, considerada o maior exercício de defesa aérea já realizado no país. A operação mobilizou mais de 5.000 militares e 120 aeronaves de combate, transporte e apoio.</p>
      
      <h2>Participação Internacional</h2>
      <p>O exercício contou com a participação de forças aéreas de países aliados do continente americano, incluindo Argentina, Chile, Colômbia e Estados Unidos. A cooperação internacional foi fundamental para testar a interoperabilidade entre as diferentes forças aéreas.</p>
      
      <h2>Objetivos Estratégicos</h2>
      <p>Segundo o Comando da Aeronáutica, os principais objetivos da operação incluíram:</p>
      <ul>
        <li>Testar a capacidade de resposta rápida do sistema de defesa aérea</li>
        <li>Avaliar a integração entre radares civis e militares</li>
        <li>Simular cenários de ameaças múltiplas ao espaço aéreo</li>
        <li>Treinar pilotos em situações de combate simulado</li>
      </ul>
      
      <h2>Tecnologia Nacional</h2>
      <p>A operação também serviu para demonstrar as capacidades do novo sistema de radar desenvolvido com tecnologia 100% brasileira, que amplia em 40% a capacidade de monitoramento do espaço aéreo nacional.</p>
      
      <p>O Comandante da Aeronáutica destacou a importância do exercício para a manutenção da soberania nacional e a capacidade de defesa do espaço aéreo brasileiro, um dos maiores do mundo.</p>
    `,
    image: heroImage,
    category: "fab",
    categoryLabel: "Força Aérea",
    categorySlug: "fab",
    author: "Redação AAFAB",
    authorRole: "Equipe Editorial",
    date: "13 Janeiro 2026",
  },
  {
    id: "aafab-encontro-nacional",
    title: "AAFAB promove encontro nacional de associados em Brasília",
    excerpt: "Evento reunirá militares da ativa, reserva e pensionistas para discussão sobre políticas de valorização das Forças Armadas.",
    content: `
      <p>A Associação Amigos da Força Aérea Brasileira (AAFAB) realizará seu encontro anual de associados nos dias 20 e 21 de janeiro, em Brasília. O evento reunirá militares da ativa, reserva e pensionistas de todo o país.</p>
      
      <h2>Programação do Evento</h2>
      <p>A programação inclui palestras, debates e workshops sobre temas relevantes para a comunidade militar, incluindo:</p>
      <ul>
        <li>Políticas de valorização dos militares inativos</li>
        <li>Assistência médico-hospitalar para reservistas</li>
        <li>Projetos legislativos em tramitação no Congresso</li>
        <li>Preservação da memória histórica da FAB</li>
      </ul>
      
      <h2>Inscrições</h2>
      <p>As inscrições podem ser realizadas pelo site da AAFAB até o dia 18 de janeiro. Associados têm desconto especial nas taxas de participação.</p>
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
      <p>O Congresso Nacional aprovou nesta terça-feira o novo marco regulatório para o setor de defesa brasileiro. A legislação, que tramitava há dois anos, moderniza as regras para contratações militares e cria incentivos para a participação da indústria nacional em projetos estratégicos.</p>
      
      <h2>Principais Mudanças</h2>
      <p>Entre as principais mudanças trazidas pelo novo marco estão:</p>
      <ul>
        <li>Criação de um regime tributário especial para empresas do setor de defesa</li>
        <li>Prioridade para fornecedores nacionais em contratações militares</li>
        <li>Simplificação dos processos de importação de equipamentos</li>
        <li>Criação de um fundo para financiamento de pesquisa e desenvolvimento</li>
      </ul>
      
      <h2>Impacto Esperado</h2>
      <p>Especialistas avaliam que a nova legislação pode gerar mais de 50 mil empregos diretos e indiretos no setor de defesa nos próximos cinco anos, além de fortalecer a base industrial de defesa nacional.</p>
    `,
    image: congressImage,
    category: "politics",
    categoryLabel: "Política",
    categorySlug: "politica",
    author: "Ana Beatriz Costa",
    authorRole: "Correspondente Parlamentar",
    date: "12 Jan 2026",
  },
  {
    id: "fab-sistema-radar",
    title: "FAB recebe primeira unidade do novo sistema de radar nacional",
    excerpt: "Equipamento desenvolvido com tecnologia 100% brasileira amplia capacidade de monitoramento do espaço aéreo em 40%.",
    content: `
      <p>A Força Aérea Brasileira recebeu nesta semana a primeira unidade do novo sistema de radar SABER-M60, desenvolvido integralmente com tecnologia brasileira. O equipamento representa um marco na capacidade de defesa do espaço aéreo nacional.</p>
      
      <h2>Especificações Técnicas</h2>
      <p>O SABER-M60 é um radar de última geração que incorpora tecnologias de ponta em processamento de sinais e detecção de alvos. Entre suas principais características estão:</p>
      <ul>
        <li>Alcance de detecção superior a 400 km</li>
        <li>Capacidade de rastrear múltiplos alvos simultaneamente</li>
        <li>Resistência a contramedidas eletrônicas</li>
        <li>Integração com sistemas de armas antiaéreas</li>
      </ul>
      
      <h2>Desenvolvimento Nacional</h2>
      <p>O projeto foi desenvolvido por um consórcio de empresas brasileiras em parceria com universidades e institutos de pesquisa. O investimento total foi de R$ 2,3 bilhões ao longo de oito anos de desenvolvimento.</p>
    `,
    image: defenseImage,
    category: "defense",
    categoryLabel: "Defesa",
    categorySlug: "defesa",
    author: "Ten. Ricardo Almeida",
    authorRole: "Analista de Defesa",
    date: "11 Jan 2026",
  },
  {
    id: "ministerio-plano-estrategico",
    title: "Ministério da Defesa apresenta plano estratégico para próxima década",
    excerpt: "Documento define prioridades de investimento, modernização de equipamentos e políticas de pessoal para as três Forças.",
    content: `
      <p>O Ministério da Defesa apresentou hoje seu Plano Estratégico de Defesa Nacional para o período 2026-2036. O documento, elaborado em conjunto com os comandantes das três Forças, define as prioridades de investimento e modernização para a próxima década.</p>
      
      <h2>Pilares do Plano</h2>
      <p>O plano está estruturado em cinco pilares fundamentais:</p>
      <ul>
        <li>Modernização de equipamentos e sistemas de armas</li>
        <li>Valorização e capacitação do pessoal</li>
        <li>Fortalecimento da base industrial de defesa</li>
        <li>Defesa cibernética e espacial</li>
        <li>Cooperação internacional</li>
      </ul>
    `,
    image: congressImage,
    category: "politics",
    categoryLabel: "Política",
    categorySlug: "politica",
    author: "Carlos Eduardo Silva",
    date: "10 Jan 2026",
  },
  {
    id: "senado-militares-inativos",
    title: "Senado debate proposta de valorização dos militares inativos",
    excerpt: "Projeto de lei busca equiparar benefícios e garantir melhores condições para reservistas e pensionistas das Forças Armadas.",
    content: `
      <p>O Senado Federal iniciou nesta semana a discussão do Projeto de Lei que visa valorizar os militares inativos das Forças Armadas. A proposta busca equiparar benefícios e garantir melhores condições para reservistas e pensionistas.</p>
      
      <h2>Principais Propostas</h2>
      <p>Entre as principais medidas propostas estão a atualização dos valores das pensões militares, a extensão da assistência médico-hospitalar e a criação de programas de reinserção no mercado de trabalho.</p>
    `,
    image: congressImage,
    category: "politics",
    categoryLabel: "Política",
    categorySlug: "politica",
    author: "Maria Helena Souza",
    date: "09 Jan 2026",
  },
  {
    id: "camara-credito-forcas-armadas",
    title: "Câmara aprova crédito extraordinário para Forças Armadas",
    excerpt: "Recursos serão destinados à manutenção de equipamentos e continuidade de projetos estratégicos de defesa nacional.",
    content: `
      <p>A Câmara dos Deputados aprovou ontem crédito extraordinário de R$ 4,5 bilhões para as Forças Armadas. Os recursos serão destinados à manutenção de equipamentos e à continuidade de projetos estratégicos de defesa nacional.</p>
    `,
    image: congressImage,
    category: "politics",
    categoryLabel: "Política",
    categorySlug: "politica",
    author: "Paulo Roberto Lima",
    date: "08 Jan 2026",
  },
  {
    id: "brasil-comando-forca-paz",
    title: "Brasil assume comando de força de paz multinacional",
    excerpt: "Oficiais brasileiros lideram contingente internacional em missão de estabilização autorizada pelo Conselho de Segurança da ONU.",
    content: `
      <p>O Brasil assumiu nesta semana o comando da Força de Paz das Nações Unidas em missão de estabilização. Oficiais brasileiros lideram um contingente multinacional composto por militares de 12 países.</p>
      
      <h2>Liderança Brasileira</h2>
      <p>A escolha do Brasil para comandar a missão reflete o reconhecimento internacional da experiência e profissionalismo das Forças Armadas brasileiras em operações de paz. O país já participou de mais de 50 missões de paz da ONU desde 1948.</p>
    `,
    image: internationalImage,
    category: "international",
    categoryLabel: "Internacional",
    categorySlug: "internacional",
    author: "Cel. Fernando Gomes",
    date: "12 Jan 2026",
  },
  {
    id: "embraer-kc390-entrega",
    title: "Embraer entrega novos cargueiros KC-390 à FAB",
    excerpt: "Aeronaves de transporte tático aumentam capacidade logística e de projeção de poder da Força Aérea Brasileira.",
    content: `
      <p>A Embraer entregou hoje mais duas unidades do cargueiro KC-390 à Força Aérea Brasileira. Com esta entrega, a FAB passa a contar com oito aeronaves do modelo, aumentando significativamente sua capacidade de transporte tático.</p>
      
      <h2>Capacidades do KC-390</h2>
      <p>O KC-390 é uma aeronave multimissão capaz de realizar transporte de tropas e cargas, reabastecimento em voo, evacuação aeromédica e missões humanitárias. Com velocidade de cruzeiro de 870 km/h, é o cargueiro militar mais rápido de sua categoria.</p>
    `,
    image: aircraftImage,
    category: "fab",
    categoryLabel: "Força Aérea",
    categorySlug: "fab",
    author: "Maj. Patrícia Ramos",
    date: "11 Jan 2026",
  },
  {
    id: "exercicio-conjunto-forcas",
    title: "Exercício conjunto integra Marinha, Exército e Aeronáutica",
    excerpt: "Operação Guardião testa interoperabilidade e prontidão das Forças Armadas em cenário de defesa do território nacional.",
    content: `
      <p>As três Forças Armadas participaram esta semana da Operação Guardião, exercício conjunto que testou a interoperabilidade e prontidão para defesa do território nacional. A operação simulou cenários de crise que exigem resposta coordenada.</p>
    `,
    image: defenseImage,
    category: "defense",
    categoryLabel: "Defesa",
    categorySlug: "defesa",
    author: "Cap. André Moreira",
    date: "10 Jan 2026",
  },
  {
    id: "analise-brasil-seguranca-hemisferica",
    title: "Análise: O papel estratégico do Brasil na segurança hemisférica",
    excerpt: "Especialistas avaliam posicionamento brasileiro em cenário geopolítico marcado por novas tensões globais.",
    content: `
      <p>Em um cenário internacional marcado por crescentes tensões geopolíticas, o Brasil ocupa posição estratégica fundamental para a segurança do hemisfério. Esta análise examina os desafios e oportunidades que se apresentam ao país.</p>
      
      <h2>Contexto Geopolítico</h2>
      <p>O reordenamento das relações de poder globais coloca novos desafios para a política de defesa brasileira. O país precisa equilibrar suas relações com potências tradicionais e emergentes, mantendo autonomia estratégica.</p>
      
      <h2>Desafios Regionais</h2>
      <p>Na América do Sul, o Brasil tem papel de liderança natural em questões de segurança. A cooperação em defesa com países vizinhos e a proteção das fronteiras são prioridades constantes.</p>
      
      <h2>Conclusão</h2>
      <p>O momento exige uma política de defesa robusta, que combine capacidade dissuasória com engajamento diplomático ativo. O Brasil tem condições de desempenhar papel central na arquitetura de segurança hemisférica.</p>
    `,
    image: internationalImage,
    category: "opinion",
    categoryLabel: "Opinião",
    categorySlug: "opiniao",
    author: "Dr. Roberto Pinheiro",
    authorRole: "Analista de Relações Internacionais",
    date: "13 Jan 2026",
  },
  {
    id: "fab-nova-base-amazonia",
    title: "FAB inaugura nova base aérea na região amazônica",
    excerpt: "Instalação fortalece presença militar na fronteira norte e amplia capacidade de vigilância do espaço aéreo.",
    content: `
      <p>A Força Aérea Brasileira inaugurou nesta sexta-feira uma nova base aérea na região amazônica. A instalação fortalece a presença militar na fronteira norte do país e amplia significativamente a capacidade de vigilância do espaço aéreo.</p>
    `,
    image: aircraftImage,
    category: "fab",
    categoryLabel: "Força Aérea",
    categorySlug: "fab",
    author: "Redação AAFAB",
    date: "07 Jan 2026",
  },
  {
    id: "cooperacao-brics-defesa",
    title: "Acordo de cooperação em defesa com países do BRICS avança",
    excerpt: "Ministros de Defesa discutem iniciativas conjuntas em tecnologia, treinamento e operações de paz.",
    content: `
      <p>Os ministros de Defesa dos países do BRICS se reuniram esta semana para discutir avanços na cooperação em defesa. A agenda incluiu iniciativas conjuntas em desenvolvimento de tecnologia, intercâmbio de treinamento e participação em operações de paz.</p>
    `,
    image: internationalImage,
    category: "international",
    categoryLabel: "Internacional",
    categorySlug: "internacional",
    author: "Embaixador Paulo Mendes",
    date: "06 Jan 2026",
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
