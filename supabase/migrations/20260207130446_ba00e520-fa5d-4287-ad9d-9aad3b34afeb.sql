-- Adicionar configuração para link de recadastramento na tabela site_settings
INSERT INTO public.site_settings (key, label, value, category)
VALUES ('recadastramento_link', 'Link de Recadastramento', '', 'general')
ON CONFLICT (key) DO NOTHING;