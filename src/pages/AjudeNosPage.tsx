import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Heart, Copy, Check, QrCode, Download, Gift, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePublishedEbooks } from "@/hooks/useEbooks";
import { Skeleton } from "@/components/ui/skeleton";

const donationValues = [
  { 
    value: "19,90", 
    label: "R$ 19,90",
    pixCode: "00020126360014BR.GOV.BCB.PIX0114+5561983021315520400005303986540519.905802BR5925Henrique Cesar Araujo Fer6009SAO PAULO62140510KVtdFiyJbU63042255"
  },
  { 
    value: "29,90", 
    label: "R$ 29,90",
    pixCode: "00020126360014BR.GOV.BCB.PIX0114+5561983021315520400005303986540529.905802BR5925Henrique Cesar Araujo Fer6009SAO PAULO62140510KtJcU9ctRT63048B2D"
  },
  { 
    value: "49,90", 
    label: "R$ 49,90",
    pixCode: "00020126360014BR.GOV.BCB.PIX0114+5561983021315520400005303986540549.905802BR5925Henrique Cesar Araujo Fer6009SAO PAULO62140510KUuE78YEUt6304707A"
  },
];

const AjudeNosPage = () => {
  const [pixModalOpen, setPixModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPixCode, setSelectedPixCode] = useState("");
  const [copied, setCopied] = useState(false);

  const { data: ebooks, isLoading: isLoadingEbooks } = usePublishedEbooks();

  const pixBeneficiary = "Henrique Cesar Araujo Fer";

  const handleDonation = (value: string, pixCode: string) => {
    setSelectedValue(value);
    setSelectedItem("Doação");
    setSelectedPixCode(pixCode);
    setPixModalOpen(true);
  };

  const handleEbookPurchase = (title: string, price: string) => {
    setSelectedValue(price);
    setSelectedItem(title);
    // Para e-books, usar o código PIX de R$ 29,90 como padrão (pode ajustar depois)
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

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-headline mb-4">
              Ajude a AAFAB
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sua contribuição fortalece nossa missão de informar, educar e apoiar 
              a AAFAB e seus admiradores.
            </p>
          </div>

          {/* E-Books Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-headline">
                  Nossos E-Books
                </h2>
                <p className="text-muted-foreground text-sm">
                  Materiais informativos exclusivos sobre defesa e política
                </p>
              </div>
            </div>

            {isLoadingEbooks ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-48 rounded-xl" />
                ))}
              </div>
            ) : ebooks && ebooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ebooks.map((ebook) => (
                  <div 
                    key={ebook.id}
                    className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      {ebook.cover_url ? (
                        <img src={ebook.cover_url} alt={ebook.title} className="w-16 h-20 rounded-lg object-cover shrink-0 shadow-md" />
                      ) : (
                        <div className="w-16 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                          <BookOpen className="w-8 h-8 text-primary-foreground" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-headline mb-2 leading-tight">
                          {ebook.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {ebook.description || 'Sem descrição'}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                          <span className="bg-secondary px-2 py-1 rounded">PDF</span>
                          {ebook.pages && <span>{ebook.pages} páginas</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                      <div>
                        <span className="text-2xl font-bold text-headline">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ebook.price)}
                        </span>
                      </div>
                      {ebook.pix_link || ebook.card_link ? (
                        <a href={ebook.pix_link || ebook.card_link || '#'} target="_blank" rel="noopener noreferrer">
                          <Button className="gap-2">
                            <Download className="w-4 h-4" />
                            Adquirir
                          </Button>
                        </a>
                      ) : (
                        <Button 
                          onClick={() => handleEbookPurchase(ebook.title, ebook.price.toString())}
                          className="gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Adquirir
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">Nenhum e-book disponível no momento.</p>
            )}
          </section>

          {/* Donation Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-accent/5 via-accent/10 to-accent/5 rounded-2xl p-8 md:p-12 border border-accent/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 mb-4">
                  <Gift className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-headline mb-3">
                  Faça uma Doação
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Sua contribuição ajuda a manter nosso portal ativo, produzir conteúdo de qualidade 
                  e apoiar iniciativas em prol da Força Aérea Brasileira.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {donationValues.map((donation) => (
                  <button
                    key={donation.value}
                    onClick={() => handleDonation(donation.value, donation.pixCode)}
                    className="group relative px-8 py-4 bg-card border-2 border-accent/30 rounded-xl hover:border-accent hover:bg-accent/5 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <span className="text-2xl font-bold text-headline group-hover:text-accent transition-colors">
                      {donation.label}
                    </span>
                  </button>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Ao clicar em um valor, você será direcionado para o pagamento via PIX
              </p>
            </div>
          </section>

          {/* Impact Section */}
          <section className="text-center">
            <h2 className="text-2xl font-serif font-bold text-headline mb-6">
              Como sua ajuda é utilizada
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-headline mb-2">Conteúdo de Qualidade</h3>
                <p className="text-sm text-muted-foreground">
                  Produção de artigos, análises e materiais educativos sobre defesa nacional
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-headline mb-2">Apoio à AAFAB</h3>
                <p className="text-sm text-muted-foreground">
                  Iniciativas de valorização e apoio à Associação Amigos da Força Aérea Brasileira
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-headline mb-2">Eventos e Projetos</h3>
                <p className="text-sm text-muted-foreground">
                  Organização de eventos, seminários e projetos educacionais
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* PIX Modal */}
      <Dialog open={pixModalOpen} onOpenChange={setPixModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-serif">
              Pagamento via PIX
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6 py-4">
            {/* Selected Item */}
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">{selectedItem}</p>
              <p className="text-3xl font-bold text-headline">R$ {selectedValue}</p>
            </div>

            {/* PIX Copia e Cola */}
            {selectedPixCode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <p className="text-sm font-medium">PIX Copia e Cola pronto!</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Código PIX</p>
                  <div className="bg-secondary rounded-lg p-3">
                    <p className="text-xs font-mono text-foreground break-all mb-3 max-h-20 overflow-y-auto">
                      {selectedPixCode}
                    </p>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={copyPixCode}
                      className="w-full gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Código Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copiar Código PIX
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-48 h-48 bg-secondary rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Entre em contato para PIX</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Para E-Books, entre em contato conosco
                </p>
              </div>
            )}

            {/* Beneficiary */}
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{pixBeneficiary}</p>
            </div>

            {/* Instructions */}
            <div className="text-left bg-accent/5 rounded-lg p-4 text-sm">
              <p className="font-medium text-headline mb-2">Como pagar:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Abra o app do seu banco</li>
                <li>Escolha pagar com PIX</li>
                <li>Escaneie o QR Code ou cole a chave</li>
                <li>Confirme o valor e finalize</li>
              </ol>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AjudeNosPage;