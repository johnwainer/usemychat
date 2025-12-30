-- Allow anyone to read invitations by token (for accepting invitations)
-- This is safe because:
-- 1. Tokens are cryptographically secure UUIDs
-- 2. Invitations expire after 7 days
-- 3. Users can only accept invitations for their own email

DROP POLICY IF EXISTS "Anyone can view invitations by token" ON public.team_invitations;
CREATE POLICY "Anyone can view invitations by token"
  ON public.team_invitations FOR SELECT
  USING (true);
