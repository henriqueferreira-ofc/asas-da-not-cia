
CREATE TABLE public.cesd_ratings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  visitor_id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Allow anyone to read ratings
ALTER TABLE public.cesd_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read ratings" ON public.cesd_ratings
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert ratings" ON public.cesd_ratings
  FOR INSERT WITH CHECK (true);

-- Create a function to get rating stats
CREATE OR REPLACE FUNCTION public.get_cesd_rating_stats()
RETURNS TABLE(total_ratings bigint, average_rating numeric)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT COUNT(*) as total_ratings, COALESCE(ROUND(AVG(rating)::numeric, 1), 0) as average_rating
  FROM public.cesd_ratings;
$$;
