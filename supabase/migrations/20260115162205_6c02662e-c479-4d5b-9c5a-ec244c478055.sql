-- Drop the existing policy that allows users to view their own roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create a more restrictive policy: users can ONLY view their own roles
CREATE POLICY "Users can view only their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());