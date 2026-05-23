
-- 1) Private table for ebook PDF URLs
CREATE TABLE public.ebook_files (
  ebook_id uuid PRIMARY KEY REFERENCES public.ebooks(id) ON DELETE CASCADE,
  pdf_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ebook_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins and editors can read ebook files"
  ON public.ebook_files FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins and editors can insert ebook files"
  ON public.ebook_files FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins and editors can update ebook files"
  ON public.ebook_files FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can delete ebook files"
  ON public.ebook_files FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_ebook_files_updated_at
  BEFORE UPDATE ON public.ebook_files
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Migrate existing pdf_url values
INSERT INTO public.ebook_files (ebook_id, pdf_url)
SELECT id, pdf_url FROM public.ebooks
WHERE pdf_url IS NOT NULL AND pdf_url <> '';

-- Drop the public column
ALTER TABLE public.ebooks DROP COLUMN pdf_url;

-- 2) Restrict storage.objects listing for news-images bucket
DROP POLICY IF EXISTS "Anyone can view news images" ON storage.objects;

CREATE POLICY "Admins and editors can list news images"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'news-images'
    AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  );
