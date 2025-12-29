-- Fix RLS policies for contact_interactions to allow admins to create interactions

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Users can insert their contact interactions" ON public.contact_interactions;

-- Create new INSERT policy that allows both users and admins
CREATE POLICY "Users can insert their contact interactions"
  ON public.contact_interactions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR 
    public.is_admin(auth.uid())
  );

-- Also update the WITH CHECK clause to be consistent with other operations
DROP POLICY IF EXISTS "Users can update their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can update their contact interactions"
  ON public.contact_interactions FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()))
  WITH CHECK (auth.uid() = user_id OR public.is_admin(auth.uid()));
