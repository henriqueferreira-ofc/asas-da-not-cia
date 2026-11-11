DROP POLICY "Anyone can read page contents" ON public.page_contents;
CREATE POLICY "Visitors can read public institutional pages" ON public.page_contents
FOR SELECT TO anon, authenticated
USING (page_slug IN ('inicio', 'sobre', 'contato', 'ajude-nos', 'diretoria', 'cesd', 'privacidade', 'termos'));
CREATE POLICY "Admins and editors can read all page contents" ON public.page_contents
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'editor'::public.app_role));

DROP POLICY "Anyone can insert ratings" ON public.cesd_ratings;
CREATE POLICY "Visitors can submit valid memorial ratings" ON public.cesd_ratings
FOR INSERT TO anon, authenticated
WITH CHECK (rating BETWEEN 1 AND 5 AND visitor_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');
DROP POLICY "Anyone can read ratings" ON public.cesd_ratings;
CREATE POLICY "Admins and editors can read individual memorial ratings" ON public.cesd_ratings
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'editor'::public.app_role));

CREATE OR REPLACE FUNCTION public.get_cesd_visitor_rating(_visitor_id text)
RETURNS TABLE(rating integer)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT r.rating FROM public.cesd_ratings r
  WHERE r.visitor_id = _visitor_id
    AND _visitor_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  ORDER BY r.created_at DESC LIMIT 1;
$function$;
REVOKE ALL ON FUNCTION public.get_cesd_visitor_rating(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_cesd_visitor_rating(text) TO anon, authenticated, service_role;
COMMENT ON FUNCTION public.get_cesd_visitor_rating(text) IS 'Returns only the rating for an exact browser visitor UUID; does not expose visitor IDs or allow listing individual ratings. Public totals remain available through get_cesd_rating_stats.';