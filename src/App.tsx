import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoriaPage from "./pages/CategoriaPage";
import NoticiaPage from "./pages/NoticiaPage";
import SobrePage from "./pages/SobrePage";
import ContatoPage from "./pages/ContatoPage";
import AjudeNosPage from "./pages/AjudeNosPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categoria/:slug" element={<CategoriaPage />} />
          <Route path="/noticia/:id" element={<NoticiaPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/ajude-nos" element={<AjudeNosPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
