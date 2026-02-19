import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Download, BookOpen, Loader2, XCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type PaymentResult = {
  paid: boolean;
  pdf_url?: string;
  ebook_title?: string;
  ebook_id?: string;
  customer_email?: string;
  error?: string;
};

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [result, setResult] = useState<PaymentResult | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("verify-payment", {
          body: { session_id: sessionId },
        });

        if (error) throw new Error(error.message);

        if (data?.paid) {
          setResult(data);
          setStatus("success");
        } else {
          setResult(data);
          setStatus("error");
        }
      } catch (err: any) {
        setResult({ paid: false, error: err.message });
        setStatus("error");
      }
    };

    verify();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-16 max-w-2xl mx-auto">
        {status === "loading" && (
          <div className="text-center space-y-4">
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
            <p className="text-lg text-muted-foreground">Verificando seu pagamento...</p>
          </div>
        )}

        {status === "success" && result && (
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 text-center space-y-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            <div>
              <h1 className="text-3xl font-serif font-bold text-headline mb-2">
                Pagamento confirmado!
              </h1>
              <p className="text-muted-foreground">
                Obrigado pela sua compra. Seu e-book está pronto para download.
              </p>
              {result.customer_email && (
                <p className="text-sm text-muted-foreground mt-1">
                  Compra realizada para: <strong>{result.customer_email}</strong>
                </p>
              )}
            </div>

            {result.ebook_title && (
              <div className="bg-muted/40 rounded-xl p-4 text-left">
                <p className="text-sm text-muted-foreground mb-1">E-book adquirido:</p>
                <p className="font-semibold text-headline">{result.ebook_title}</p>
              </div>
            )}

            {result.pdf_url && (
              <div className="space-y-3">
                <a href={result.pdf_url} target="_blank" rel="noopener noreferrer" download>
                  <Button size="lg" className="gap-2 w-full">
                    <Download className="w-5 h-5" />
                    Baixar E-book (PDF)
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground">
                  Salve esta página ou anote o link. O acesso é válido pelo link abaixo:
                </p>
                <div className="bg-muted rounded-lg p-3 break-all text-xs text-muted-foreground font-mono text-left">
                  {result.pdf_url}
                </div>
              </div>
            )}

            <Link to="/ajude-nos">
              <Button variant="outline" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Ver mais e-books
              </Button>
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 text-center space-y-6">
            <XCircle className="w-20 h-20 text-destructive mx-auto" />
            <div>
              <h1 className="text-3xl font-serif font-bold text-headline mb-2">
                Pagamento não confirmado
              </h1>
              <p className="text-muted-foreground">
                Não foi possível confirmar seu pagamento. Se você foi cobrado, entre em contato conosco.
              </p>
              {result?.error && (
                <p className="text-sm text-destructive mt-2">{result.error}</p>
              )}
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/ajude-nos">
                <Button variant="outline">Ver e-books</Button>
              </Link>
              <Link to="/contato">
                <Button>Falar com suporte</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
