-- Recriar política de leitura pública para eventos (garantindo acesso anon)
DROP POLICY IF EXISTS "Anyone can read published events" ON eventos;
CREATE POLICY "Anyone can read published events" 
ON eventos FOR SELECT 
TO anon, authenticated
USING (published = true);

-- Recriar política de leitura pública para noticias
DROP POLICY IF EXISTS "Anyone can read published news" ON noticias;
CREATE POLICY "Anyone can read published news" 
ON noticias FOR SELECT 
TO anon, authenticated
USING (published = true);