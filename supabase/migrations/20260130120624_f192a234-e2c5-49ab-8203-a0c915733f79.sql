-- =============================================
-- SITE SETTINGS: Configurações gerais do site
-- =============================================
CREATE TABLE public.site_settings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    value TEXT,
    label TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'geral',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read site settings
CREATE POLICY "Anyone can read site settings" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Only admins can manage site settings
CREATE POLICY "Admins can manage site settings" 
ON public.site_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.site_settings (key, value, label, category) VALUES
('footer_text', 'AAFAB - Associação Amigos da Força Aérea Brasileira. Todos os direitos reservados.', 'Texto do Rodapé', 'rodape'),
('address', 'Brasília - DF', 'Endereço', 'contato'),
('phone', '(61) 99999-9999', 'Telefone', 'contato'),
('email', 'contato@aafab.org.br', 'E-mail Institucional', 'contato'),
('instagram', '', 'Instagram', 'redes_sociais'),
('facebook', '', 'Facebook', 'redes_sociais'),
('youtube', '', 'YouTube', 'redes_sociais'),
('twitter', '', 'Twitter/X', 'redes_sociais'),
('linkedin', '', 'LinkedIn', 'redes_sociais'),
('floating_button_text', 'Entrar na nossa comunidade', 'Texto do Botão Flutuante', 'botao_flutuante'),
('floating_button_link', 'https://chat.whatsapp.com/seu-grupo', 'Link do Botão Flutuante', 'botao_flutuante'),
('floating_button_position', 'bottom-right', 'Posição do Botão Flutuante', 'botao_flutuante'),
('floating_button_enabled', 'true', 'Botão Flutuante Ativo', 'botao_flutuante');

-- =============================================
-- E-BOOKS: Catálogo de e-books para captação
-- =============================================
CREATE TABLE public.ebooks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    pages INTEGER,
    cover_url TEXT,
    pdf_url TEXT,
    pix_link TEXT,
    card_link TEXT,
    published BOOLEAN NOT NULL DEFAULT false,
    featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;

-- Anyone can read published ebooks
CREATE POLICY "Anyone can read published ebooks" 
ON public.ebooks 
FOR SELECT 
USING (published = true);

-- Admins and editors can read all ebooks
CREATE POLICY "Admins and editors can read all ebooks" 
ON public.ebooks 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Admins and editors can insert ebooks
CREATE POLICY "Admins and editors can insert ebooks" 
ON public.ebooks 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Admins and editors can update ebooks
CREATE POLICY "Admins and editors can update ebooks" 
ON public.ebooks 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Only admins can delete ebooks
CREATE POLICY "Only admins can delete ebooks" 
ON public.ebooks 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_ebooks_updated_at
BEFORE UPDATE ON public.ebooks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- CATEGORIAS DINÂMICAS
-- =============================================
CREATE TABLE public.categories (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    published BOOLEAN NOT NULL DEFAULT true,
    show_in_menu BOOLEAN NOT NULL DEFAULT true,
    show_in_home BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Anyone can read published categories
CREATE POLICY "Anyone can read published categories" 
ON public.categories 
FOR SELECT 
USING (published = true);

-- Admins and editors can read all categories
CREATE POLICY "Admins and editors can read all categories" 
ON public.categories 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Admins can manage categories
CREATE POLICY "Admins can manage categories" 
ON public.categories 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.categories (name, slug, description, sort_order) VALUES
('Política Nacional', 'politica', 'Notícias sobre política nacional relacionadas à defesa e aviação', 1),
('Internacional', 'internacional', 'Notícias internacionais sobre aviação e defesa', 2),
('AAFAB', 'aafab', 'Notícias institucionais da AAFAB', 3);

-- =============================================
-- MELHORIAS NAS TABELAS EXISTENTES
-- =============================================

-- Adicionar campos de ciclo de vida e SEO em noticias
ALTER TABLE public.noticias 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published',
ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Adicionar campos em eventos
ALTER TABLE public.eventos 
ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;