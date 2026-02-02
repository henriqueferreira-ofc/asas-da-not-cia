import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { usePageContent } from "@/hooks/usePageContent";

const ContatoPage = () => {
  const { data: pageContent, isLoading } = usePageContent("contato");

  // Extract content from database
  const content = (pageContent?.content as Record<string, unknown>) || {};
  const title = (content.title as string) || "Entre em Contato";
  const email = (content.email as string) || "contato@aafab.org.br";
  const phone = (content.phone as string) || "(61) 3333-0000";
  const address = (content.address as string) || "Esplanada dos Ministérios\nBloco A, Sala 100\nBrasília - DF, 70000-000";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-headline mb-4">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Estamos à disposição para atender associados, imprensa e interessados 
              em conhecer mais sobre a AAFAB.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-headline">Endereço</h3>
                </div>
                <p className="text-muted-foreground whitespace-pre-line">
                  {address}
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-headline">E-mail</h3>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>Geral:</strong><br />
                    <a href={`mailto:${email}`} className="text-link hover:text-primary">
                      {email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-headline">Telefone</h3>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p>{phone}</p>
                  <p className="text-sm">
                    Segunda a Sexta<br />
                    08h às 18h
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border p-8">
                <h2 className="text-xl font-serif font-bold text-headline mb-6">
                  Envie sua Mensagem
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input id="subject" placeholder="Sobre o que deseja falar?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Escreva sua mensagem aqui..."
                      rows={6}
                    />
                  </div>

                  <Button className="w-full md:w-auto" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContatoPage;
