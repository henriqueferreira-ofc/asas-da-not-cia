import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Download, Check, Share2, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEbook } from "@/hooks/useEbooks";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const EbookPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ebook, isLoading } = useEbook(id);
  const [linkCopied, setLinkCopied] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  // Update document meta tags for social sharing
  useEffect(() => {
    if (!ebook) return;
    document.title = `${ebook.title} | AAFAB`;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("fb:")) {
          el.setAttribute("property", property);
        } else {
          el.setAttribute("name", property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const url = window.location.href;
    const desc = ebook.description || `Adquira o e-book "${ebook.title}" por ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ebook.price)}`;

    setMeta("og:title", ebook.title);
    setMeta("og:description", desc);
    setMeta("og:url", url);
    setMeta("og:type", "product");
    if (ebook.cover_url) setMeta("og:image", ebook.cover_url);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", ebook.title);
    setMeta("twitter:description", desc);
    if (ebook.cover_url) setMeta("twitter:image", ebook.cover_url);
    setMeta("description", desc);

    return () => { document.title = "AAFAB"; };
  }, [ebook]);

  const formattedPrice = ebook
    ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(ebook.price)
    : "";

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = (platform: "facebook" | "whatsapp") => {
    const encoded = encodeURIComponent(currentUrl);
    const text = encodeURIComponent(`${ebook?.title} - ${formattedPrice}`);
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      whatsapp: `https://wa.me/?text=${text}%20${encoded}`,
    };
    window.open(urls[platform], "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setLinkCopied(true);
    toast.success("Link copiado!");
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleStripeCheckout = async () => {
    if (!ebook) return;
    setCheckingOut(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { ebook_id: ebook.id },
      });
      if (error || !data?.url) throw new Error(error?.message || "Erro ao criar sessão de pagamento");
      window.location.href = data.url;
    } catch (err: any) {
      toast.error(err.message || "Erro ao iniciar pagamento. Tente novamente.");
      setCheckingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8 max-w-3xl mx-auto">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-96 w-full rounded-xl" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold text-headline mb-2">E-book não encontrado</h1>
          <Link to="/ajude-nos" className="text-primary hover:underline">Voltar para Ajude-nos</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const purchaseLink = ebook.card_link || ebook.pix_link;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-6">
          <Link to="/ajude-nos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Ajude-nos
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {/* Cover + Info */}
            <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8">
              {ebook.cover_url ? (
                <img src={ebook.cover_url} alt={ebook.title} className="w-48 h-64 rounded-xl object-cover shadow-lg shrink-0 mx-auto md:mx-0" />
              ) : (
                <div className="w-48 h-64 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shrink-0 shadow-lg mx-auto md:mx-0">
                  <BookOpen className="w-16 h-16 text-primary-foreground" />
                </div>
              )}
              <div className="flex-1 space-y-4">
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-headline">{ebook.title}</h1>
                <p className="text-muted-foreground leading-relaxed">{ebook.description || "Sem descrição"}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="bg-secondary px-3 py-1 rounded-full">PDF</span>
                  {ebook.pages && <span>{ebook.pages} páginas</span>}
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-3xl font-bold text-headline mb-4">{formattedPrice}</p>
                  {ebook.pdf_url ? (
                    <Button size="lg" className="gap-2" onClick={handleStripeCheckout} disabled={checkingOut}>
                      {checkingOut ? (
                        <><Loader2 className="w-5 h-5 animate-spin" />Aguarde...</>
                      ) : (
                        <><Download className="w-5 h-5" />Adquirir Agora</>
                      )}
                    </Button>
                  ) : (
                    <p className="text-sm text-muted-foreground">PDF não disponível no momento.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Share section */}
            <div className="border-t border-border px-6 md:px-10 py-5 bg-muted/30">
              <p className="text-sm font-medium text-headline mb-3">Compartilhe este e-book:</p>
              <div className="flex items-center gap-3 flex-wrap">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("facebook")}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#1877F2]">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("whatsapp")}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={copyLink}>
                  {linkCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {linkCopied ? "Copiado!" : "Copiar Link"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EbookPage;
