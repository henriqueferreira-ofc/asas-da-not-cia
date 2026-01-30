import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import CategoriaPage from "./pages/CategoriaPage";
import NoticiaPage from "./pages/NoticiaPage";
import SobrePage from "./pages/SobrePage";
import DiretoriaPage from "./pages/DiretoriaPage";
import ContatoPage from "./pages/ContatoPage";
import AjudeNosPage from "./pages/AjudeNosPage";
import AgendaPage from "./pages/AgendaPage";
import ComunicadosPage from "./pages/ComunicadosPage";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNoticias from "./pages/admin/AdminNoticias";
import AdminNoticiaForm from "./pages/admin/AdminNoticiaForm";
import AdminEventos from "./pages/admin/AdminEventos";
import AdminEventoForm from "./pages/admin/AdminEventoForm";
import AdminComunicados from "./pages/admin/AdminComunicados";
import AdminPaginas from "./pages/admin/AdminPaginas";
import AdminPaginaForm from "./pages/admin/AdminPaginaForm";
import AdminEbooks from "./pages/admin/AdminEbooks";
import AdminEbookForm from "./pages/admin/AdminEbookForm";
import AdminCategorias from "./pages/admin/AdminCategorias";
import AdminCategoriaForm from "./pages/admin/AdminCategoriaForm";
import AdminConfiguracoes from "./pages/admin/AdminConfiguracoes";
import AdminSetup from "./pages/admin/AdminSetup";
import ResetPassword from "./pages/admin/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categoria/:slug" element={<CategoriaPage />} />
          <Route path="/noticia/:id" element={<NoticiaPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/diretoria" element={<DiretoriaPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/ajude-nos" element={<AjudeNosPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/comunicados" element={<ComunicadosPage />} />
          
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
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
