import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { usePageContent } from "@/hooks/usePageContent";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContatoPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: pageContent, isLoading } = usePageContent("contato");

  // Conteúdo editável no admin (Páginas > Contato)
  const content = (pageContent?.content as Record<string, unknown>) || {};
  const title = (content.title as string) || "Entre em Contato";
  const subtitle = (content.subtitle as string) || "";
  const contactEmail = (content.email as string) || "";
  const phone = (content.phone as string) || "";
  const address = (content.address as string) || "";
  const formTitle = (content.formTitle as string) || "Envie sua Mensagem";
  const openingHours = (content.openingHours as string) || "";

  // Permite múltiplos e-mails separados por "/" no admin
  const emailList = contactEmail
    ? contactEmail.split("/").map((e) => e.trim()).filter(Boolean)
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, informe um e-mail válido.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      });

      if (error) throw error;
      if (data && !data.success) throw new Error(data.error || "Erro ao enviar mensagem");

      toast({
        title: "Mensagem enviada!",
        description: "Sua mensagem foi enviada com sucesso. Em breve entraremos em contato.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao enviar mensagem";
      console.error("Error sending contact email:", error);
      toast({
        title: "Erro ao enviar",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {subtitle ? (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {address ? (
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
              ) : null}

              {emailList.length > 0 ? (
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-headline">E-mail</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong>Geral:</strong>{" "}
                      {emailList.map((email, idx) => (
                        <span key={email}>
                          {idx > 0 && <br />}
                          <a
                            href={`mailto:${email}`}
                            className="text-link hover:text-primary"
                          >
                            {email}
                          </a>
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ) : null}

              {(phone || openingHours) ? (
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-headline">Telefone</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    {phone ? <p>{phone}</p> : null}
                    {openingHours ? <p className="text-sm">{openingHours}</p> : null}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border p-8">
                <h2 className="text-xl font-serif font-bold text-headline mb-6">
                  {formTitle}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input 
                        id="name" 
                        placeholder="Seu nome" 
                        value={formData.name}
                        onChange={handleInputChange}
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        maxLength={255}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input 
                      id="subject" 
                      placeholder="Sobre o que deseja falar?" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      maxLength={200}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Escreva sua mensagem aqui..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      maxLength={2000}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full md:w-auto" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
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
