import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Heart, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { usePublishedEbooks } from "@/hooks/useEbooks";
import { usePageContent } from "@/hooks/usePageContent";
import { Skeleton } from "@/components/ui/skeleton";

// New modular components
import { EbooksSection } from "@/components/ajude-nos/EbooksSection";
import { DonationSection } from "@/components/ajude-nos/DonationSection";
import { ImpactSection } from "@/components/ajude-nos/ImpactSection";
import { PixModal } from "@/components/ajude-nos/PixModal";

const AjudeNosPage = () => {
  const [pixModalOpen, setPixModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPixCode, setSelectedPixCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [checkingOutId, setCheckingOutId] = useState<string | null>(null);

  const { data: ebooks, isLoading: isLoadingEbooks } = usePublishedEbooks();
  const { data: pageData, isLoading: isLoadingPage } = usePageContent("ajude-nos");

  const c = (pageData?.content as Record<string, unknown>) || {};

  // Content Configuration
  const pageTitle = (c.title as string) || "Ajude a AAFAB";
  const pageDescription = (c.description as string) || "Sua contribuição fortalece nossa missão de informar, educar e apoiar a AAFAB e seus admiradores.";
  const ebooksTitle = (c.ebooksTitle as string) || "Nossos E-Books";
  const ebooksSubtitle = (c.ebooksSubtitle as string) || "Materiais informativos exclusivos sobre defesa e política";
  const donationTitle = (c.donationTitle as string) || "Faça uma Doação";
  const donationDescription = (c.donationDescription as string) || "Sua contribuição ajuda a manter nosso portal ativo, produzir conteúdo de qualidade e apoiar iniciativas em prol da Força Aérea Brasileira.";
  const donationFooter = (c.donationFooter as string) || "Ao clicar em um valor, você será direcionado para o pagamento via PIX";
  const pixBeneficiary = (c.pixBeneficiary as string) || "Henrique Cesar Araujo Fer";
  const impactTitle = (c.impactTitle as string) || "Como sua ajuda é utilizada";

  const donationValues = [
    { value: (c.donationValue1 as string) || "19,90", pixCode: (c.donationPixCode1 as string) || "" },
    { value: (c.donationValue2 as string) || "29,90", pixCode: (c.donationPixCode2 as string) || "" },
    { value: (c.donationValue3 as string) || "49,90", pixCode: (c.donationPixCode3 as string) || "" },
  ].filter(d => d.value);

  const impactItems = [
    { title: (c.impact1Title as string) || "Conteúdo de Qualidade", description: (c.impact1Description as string) || "Produção de artigos, análises e materiais educativos sobre defesa nacional" },
    { title: (c.impact2Title as string) || "Apoio à AAFAB", description: (c.impact2Description as string) || "Iniciativas de valorização e apoio à Associação Amigos da Força Aérea Brasileira" },
    { title: (c.impact3Title as string) || "Eventos e Projetos", description: (c.impact3Description as string) || "Organização de eventos, seminários e projetos educacionais" },
  ];

  const impactIcons = [
    <BookOpen className="w-6 h-6 text-primary" />,
    <Heart className="w-6 h-6 text-accent" />,
    <Gift className="w-6 h-6 text-green-600" />,
  ];
  const impactBgs = ["bg-primary/10", "bg-accent/10", "bg-green-500/10"];

  // Handlers
  const handleDonation = (value: string, pixCode: string) => {
    setSelectedValue(value);
    setSelectedItem("Doação");
    setSelectedPixCode(pixCode);
    setPixModalOpen(true);
  };

  const handleEbookPurchase = async (ebookId: string, title: string, price: number, stripePrice: string | null, pixLink: string | null, cardLink: string | null) => {
    if (stripePrice) {
      setCheckingOutId(ebookId);
      try {
        const { data, error } = await supabase.functions.invoke("create-payment", {
          body: { ebook_id: ebookId },
        });
        if (error || !data?.url) throw new Error(error?.message || "Erro ao criar sessão de pagamento");
        window.location.href = data.url;
      } catch (err: any) {
        toast.error(err.message || "Erro ao iniciar pagamento. Tente novamente.");
        setCheckingOutId(null);
      }
      return;
    }

    const link = pixLink || cardLink;
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
      return;
    }

    setSelectedValue(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price));
    setSelectedItem(title);
    setSelectedPixCode("");
    setPixModalOpen(true);
  };

  const copyPixCode = async () => {
    if (selectedPixCode) {
      await navigator.clipboard.writeText(selectedPixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoadingPage) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <Skeleton className="h-96 w-full rounded-xl" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-headline mb-4">
              {pageTitle}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {pageDescription}
            </p>
          </div>

          <EbooksSection
            title={ebooksTitle}
            subtitle={ebooksSubtitle}
            ebooks={ebooks}
            isLoading={isLoadingEbooks}
            checkingOutId={checkingOutId}
            onPurchase={handleEbookPurchase}
          />

          <DonationSection
            title={donationTitle}
            description={donationDescription}
            footer={donationFooter}
            values={donationValues}
            onDonate={handleDonation}
          />

          <ImpactSection
            title={impactTitle}
            items={impactItems}
            icons={impactIcons}
            bgColors={impactBgs}
          />
        </div>
      </main>

      <PixModal
        isOpen={pixModalOpen}
        onOpenChange={setPixModalOpen}
        selectedItem={selectedItem}
        selectedValue={selectedValue}
        selectedPixCode={selectedPixCode}
        copied={copied}
        onCopyPixCode={copyPixCode}
        pixBeneficiary={pixBeneficiary}
      />

      <Footer />
    </div>
  );
};

export default AjudeNosPage;
