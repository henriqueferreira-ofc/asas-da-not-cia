
INSERT INTO public.site_settings (key, value, label, category)
VALUES ('breaking_news_text', 'FAB realiza maior exercício de defesa aérea da história • Ministro da Defesa anuncia novos investimentos em tecnologia militar • AAFAB completa 25 anos de atuação institucional • Brasil assina acordo de cooperação em defesa com países do BRICS', 'Texto do Ao Vivo (Breaking News)', 'geral')
ON CONFLICT (key) DO NOTHING;
