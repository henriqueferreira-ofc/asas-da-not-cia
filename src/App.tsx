import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { Loader2 } from "lucide-react";

// Lazy project pages
// Lazy project pages
const IndexLoader = () => import("./pages/Index");
const CategoriaPageLoader = () => import("./pages/CategoriaPage");
const NoticiaPageLoader = () => import("./pages/NoticiaPage");
const SobrePageLoader = () => import("./pages/SobrePage");
const DiretoriaPageLoader = () => import("./pages/DiretoriaPage");
const ContatoPageLoader = () => import("./pages/ContatoPage");
const AjudeNosPageLoader = () => import("./pages/AjudeNosPage");
const EbookPageLoader = () => import("./pages/EbookPage");
const PaymentSuccessPageLoader = () => import("./pages/PaymentSuccessPage");
const AgendaPageLoader = () => import("./pages/AgendaPage");
const ComunicadosPageLoader = () => import("./pages/ComunicadosPage");
const PrivacidadePageLoader = () => import("./pages/PrivacidadePage");
const TermosPageLoader = () => import("./pages/TermosPage");
const NotFoundLoader = () => import("./pages/NotFound");

export const prefetchIndex = () => IndexLoader();
export const prefetchCategoria = () => CategoriaPageLoader();
export const prefetchNoticia = () => NoticiaPageLoader();
export const prefetchSobre = () => SobrePageLoader();
export const prefetchDiretoria = () => DiretoriaPageLoader();
export const prefetchContato = () => ContatoPageLoader();
export const prefetchAjudeNos = () => AjudeNosPageLoader();
export const prefetchEbook = () => EbookPageLoader();
export const prefetchPaymentSuccess = () => PaymentSuccessPageLoader();
export const prefetchAgenda = () => AgendaPageLoader();
export const prefetchComunicados = () => ComunicadosPageLoader();
export const prefetchPrivacidade = () => PrivacidadePageLoader();
export const prefetchTermos = () => TermosPageLoader();

const Index = lazy(IndexLoader);
const CategoriaPage = lazy(CategoriaPageLoader);
const NoticiaPage = lazy(NoticiaPageLoader);
const SobrePage = lazy(SobrePageLoader);
const DiretoriaPage = lazy(DiretoriaPageLoader);
const ContatoPage = lazy(ContatoPageLoader);
const AjudeNosPage = lazy(AjudeNosPageLoader);
const EbookPage = lazy(EbookPageLoader);
const PaymentSuccessPage = lazy(PaymentSuccessPageLoader);
const AgendaPage = lazy(AgendaPageLoader);
const ComunicadosPage = lazy(ComunicadosPageLoader);
const PrivacidadePage = lazy(PrivacidadePageLoader);
const TermosPage = lazy(TermosPageLoader);
const NotFound = lazy(NotFoundLoader);

// Lazy admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminNoticias = lazy(() => import("./pages/admin/AdminNoticias"));
const AdminNoticiaForm = lazy(() => import("./pages/admin/AdminNoticiaForm"));
const AdminEventos = lazy(() => import("./pages/admin/AdminEventos"));
const AdminEventoForm = lazy(() => import("./pages/admin/AdminEventoForm"));
const AdminComunicados = lazy(() => import("./pages/admin/AdminComunicados"));
const AdminPaginas = lazy(() => import("./pages/admin/AdminPaginas"));
const AdminPaginaForm = lazy(() => import("./pages/admin/AdminPaginaForm"));
const AdminEbooks = lazy(() => import("./pages/admin/AdminEbooks"));
const AdminEbookForm = lazy(() => import("./pages/admin/AdminEbookForm"));
const AdminCategorias = lazy(() => import("./pages/admin/AdminCategorias"));
const AdminCategoriaForm = lazy(() => import("./pages/admin/AdminCategoriaForm"));
const AdminConfiguracoes = lazy(() => import("./pages/admin/AdminConfiguracoes"));
const AdminSetup = lazy(() => import("./pages/admin/AdminSetup"));
const ResetPassword = lazy(() => import("./pages/admin/ResetPassword"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        basename={import.meta.env.BASE_URL}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categoria/:slug" element={<CategoriaPage />} />
            <Route path="/noticia/:id" element={<NoticiaPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/diretoria" element={<DiretoriaPage />} />
            <Route path="/contato" element={<ContatoPage />} />
            <Route path="/ajude-nos" element={<AjudeNosPage />} />
            <Route path="/ebook/:id" element={<EbookPage />} />
            <Route path="/pagamento-sucesso" element={<PaymentSuccessPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/comunicados" element={<ComunicadosPage />} />
            <Route path="/privacidade" element={<PrivacidadePage />} />
            <Route path="/termos" element={<TermosPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="noticias" element={<AdminNoticias />} />
              <Route path="noticias/nova" element={<AdminNoticiaForm />} />
              <Route path="noticias/editar/:id" element={<AdminNoticiaForm />} />
              <Route path="eventos" element={<AdminEventos />} />
              <Route path="eventos/novo" element={<AdminEventoForm />} />
              <Route path="eventos/editar/:id" element={<AdminEventoForm />} />
              <Route path="comunicados" element={<AdminComunicados />} />
              <Route path="paginas" element={<AdminPaginas />} />
              <Route path="paginas/editar/:slug" element={<AdminPaginaForm />} />
              <Route path="ebooks" element={<AdminEbooks />} />
              <Route path="ebooks/novo" element={<AdminEbookForm />} />
              <Route path="ebooks/editar/:id" element={<AdminEbookForm />} />
              <Route path="categorias" element={<AdminCategorias />} />
              <Route path="categorias/nova" element={<AdminCategoriaForm />} />
              <Route path="categorias/editar/:id" element={<AdminCategoriaForm />} />
              <Route path="configuracoes" element={<AdminConfiguracoes />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
