DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;

CREATE POLICY "Public can read safe site settings"
ON public.site_settings
FOR SELECT
USING (
  category IN ('geral', 'general', 'contato', 'rodape', 'redes_sociais', 'botao_flutuante')
);