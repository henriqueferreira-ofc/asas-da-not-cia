-- Criar tabela para armazenar conteúdo editável das páginas
CREATE TABLE public.page_contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL UNIQUE,
  page_title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer pessoa pode ler o conteúdo das páginas
CREATE POLICY "Anyone can read page contents"
ON public.page_contents
FOR SELECT
USING (true);

-- Política: Admins e editores podem modificar
CREATE POLICY "Admins and editors can insert page contents"
ON public.page_contents
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins and editors can update page contents"
ON public.page_contents
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Only admins can delete page contents"
ON public.page_contents
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger para atualizar updated_at
CREATE TRIGGER update_page_contents_updated_at
BEFORE UPDATE ON public.page_contents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir conteúdo inicial das páginas
INSERT INTO public.page_contents (page_slug, page_title, content) VALUES
('inicio', 'Início', '{"heroTitle": "AAFAB - Associação Amigos da Força Aérea Brasileira", "heroSubtitle": "Acompanhe as últimas notícias sobre política nacional, internacional e comunicados oficiais."}'::jsonb),
('sobre', 'Sobre a AAFAB', '{"title": "Sobre a AAFAB", "mission": "A Associação Amigos da Força Aérea Brasileira (AAFAB) é uma organização dedicada a promover e preservar a história, tradições e valores da Força Aérea Brasileira, além de apoiar iniciativas que fortaleçam os laços entre a sociedade civil e a aeronáutica militar.", "vision": "Ser referência nacional no apoio e divulgação das atividades da Força Aérea Brasileira, contribuindo para o fortalecimento da defesa nacional e a valorização dos profissionais da aeronáutica.", "values": ["Patriotismo e amor à Pátria", "Respeito às tradições militares", "Compromisso com a verdade e transparência", "Valorização dos heróis da aviação brasileira", "Promoção da educação cívica"]}'::jsonb),
('ajude-nos', 'Ajude-nos', '{"title": "Ajude-nos", "description": "Sua contribuição é fundamental para mantermos nossas atividades e projetos. Existem várias formas de apoiar a AAFAB.", "pixKey": "", "bankName": "", "bankAgency": "", "bankAccount": ""}'::jsonb),
('contato', 'Contato', '{"title": "Contato", "email": "contato@aafab.org.br", "phone": "", "address": "", "whatsappLink": ""}'::jsonb),
('diretoria', 'Diretoria', '{"title": "Nossa Diretoria", "presidente": {"nome": "A definir", "foto": ""}, "vicePresidente": {"nome": "A definir", "foto": ""}, "secretario": {"nome": "A definir", "foto": ""}, "tesoureiro": {"nome": "A definir", "foto": ""}, "conselho": []}'::jsonb);