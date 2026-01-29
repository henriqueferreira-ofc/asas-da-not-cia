-- Add view_count column to noticias table
ALTER TABLE public.noticias 
ADD COLUMN view_count integer NOT NULL DEFAULT 0;

-- Create index for efficient sorting by view_count
CREATE INDEX idx_noticias_view_count ON public.noticias (view_count DESC);

-- Create a function to increment view count (public access for anonymous users)
CREATE OR REPLACE FUNCTION public.increment_view_count(noticia_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.noticias 
  SET view_count = view_count + 1 
  WHERE id = noticia_id AND published = true;
END;
$$;