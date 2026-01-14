import { Link } from "react-router-dom";
import { ArrowLeft, Check, Users, Calendar, BookOpen, Award } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const benefits = [
  "Acesso a eventos exclusivos da AAFAB",
  "Newsletter semanal com notícias privilegiadas",
  "Descontos em parceiros e conveniados",
  "Participação em assembleias e votações",
  "Certificado digital de membro",
  "Acesso à biblioteca digital",
  "Convites para cerimônias oficiais",
  "Rede de contatos com militares e especialistas",
];

const plans = [
  {
    name: "Individual",
    price: "R$ 50",
    period: "/mês",
    description: "Para militares da ativa, reserva e pensionistas",
    icon: Users,
    featured: false,
  },
  {
    name: "Família",
    price: "R$ 80",
    period: "/mês",
    description: "Inclui cônjuge e dependentes",
    icon: Users,
    featured: true,
  },
  {
    name: "Anual",
    price: "R$ 480",
    period: "/ano",
    description: "20% de desconto no plano individual",
    icon: Calendar,
    featured: false,
  },
];

const AssociePage = () => {
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
              Associe-se à AAFAB
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Faça parte da maior comunidade de apoiadores da Força Aérea Brasileira 
              e tenha acesso a benefícios exclusivos.
            </p>
          </div>

          {/* Benefits */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-headline text-center mb-8">
              Benefícios de Ser Associado
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-card rounded-lg border border-border p-4"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Plans */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-headline text-center mb-8">
              Escolha Seu Plano
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div 
                  key={plan.name}
                  className={`rounded-xl border p-6 text-center ${
                    plan.featured 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "bg-card border-border"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    plan.featured ? "bg-accent" : "bg-accent/10"
                  }`}>
                    <plan.icon className={`w-6 h-6 ${plan.featured ? "text-accent-foreground" : "text-accent"}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className={plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-sm mb-6 ${plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                  <Button 
                    className="w-full"
                    variant={plan.featured ? "secondary" : "default"}
                  >
                    Selecionar
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Registration Form */}
          <section className="bg-card rounded-xl border border-border p-8">
            <h2 className="text-2xl font-serif font-bold text-headline text-center mb-8">
              Preencha Seus Dados
            </h2>
            <form className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input id="fullName" placeholder="Seu nome completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <select 
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Selecione...</option>
                    <option value="ativa">Militar da Ativa</option>
                    <option value="reserva">Militar da Reserva</option>
                    <option value="pensionista">Pensionista</option>
                    <option value="civil">Civil</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="force">Força</Label>
                  <select 
                    id="force"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Selecione...</option>
                    <option value="fab">Força Aérea Brasileira</option>
                    <option value="eb">Exército Brasileiro</option>
                    <option value="mb">Marinha do Brasil</option>
                    <option value="civil">Não se aplica</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button size="lg" className="w-full md:w-auto">
                  Enviar Cadastro
                </Button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AssociePage;
