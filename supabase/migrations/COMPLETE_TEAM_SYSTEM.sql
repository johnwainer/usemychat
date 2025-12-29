-- =====================================================
-- COMPLETE TEAM MANAGEMENT SYSTEM SQL
-- Execute this entire file in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- PART 1: Fix RLS policies for contact_interactions
-- =====================================================

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

-- Also update the UPDATE policy to be consistent
DROP POLICY IF EXISTS "Users can update their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can update their contact interactions"
  ON public.contact_interactions FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()))
  WITH CHECK (auth.uid() = user_id OR public.is_admin(auth.uid()));

-- =====================================================
-- PART 2: Create Team Management System
-- =====================================================

-- Create team_role enum
DO $$ BEGIN
  CREATE TYPE team_role AS ENUM ('owner', 'admin', 'supervisor', 'agent', 'viewer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

COMMENT ON TYPE team_role IS 'Roles for team members: owner (full access), admin (manage team), supervisor (view all), agent (assigned only), viewer (read-only)';

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role team_role NOT NULL DEFAULT 'agent',
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_active_at TIMESTAMPTZ,
  invited_by UUID REFERENCES auth.users(id),
  invited_at TIMESTAMPTZ DEFAULT now(),
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, workspace_owner_id)
);

COMMENT ON TABLE public.team_members IS 'Team members for each workspace with their roles and permissions';

-- Create team_invitations table
CREATE TABLE IF NOT EXISTS public.team_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role team_role NOT NULL DEFAULT 'agent',
  invited_by UUID NOT NULL REFERENCES auth.users(id),
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.team_invitations IS 'Pending invitations to join a team';

-- Create team_permissions table for granular permissions
CREATE TABLE IF NOT EXISTS public.team_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID NOT NULL REFERENCES public.team_members(id) ON DELETE CASCADE,
  permission_key TEXT NOT NULL,
  granted BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_member_id, permission_key)
);

COMMENT ON TABLE public.team_permissions IS 'Granular permissions for team members';

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_team_members_workspace ON public.team_members(workspace_owner_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user ON public.team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_role ON public.team_members(role);
CREATE INDEX IF NOT EXISTS idx_team_invitations_workspace ON public.team_invitations(workspace_owner_id);
CREATE INDEX IF NOT EXISTS idx_team_invitations_email ON public.team_invitations(email);
CREATE INDEX IF NOT EXISTS idx_team_invitations_token ON public.team_invitations(token);

-- Create function to check if user is a team member
CREATE OR REPLACE FUNCTION public.is_team_member(check_user_id UUID, owner_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.team_members
    WHERE user_id = check_user_id
    AND workspace_owner_id = owner_id
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_team_role(check_user_id UUID, owner_id UUID, required_role team_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.team_members
    WHERE user_id = check_user_id
    AND workspace_owner_id = owner_id
    AND role = required_role
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user can manage team
CREATE OR REPLACE FUNCTION public.can_manage_team(check_user_id UUID, owner_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN check_user_id = owner_id OR EXISTS (
    SELECT 1 FROM public.team_members
    WHERE user_id = check_user_id
    AND workspace_owner_id = owner_id
    AND role IN ('admin')
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user's team role
CREATE OR REPLACE FUNCTION public.get_team_role(check_user_id UUID, owner_id UUID)
RETURNS team_role AS $$
DECLARE
  user_role team_role;
BEGIN
  IF check_user_id = owner_id THEN
    RETURN 'owner';
  END IF;
  
  SELECT role INTO user_role
  FROM public.team_members
  WHERE user_id = check_user_id
  AND workspace_owner_id = owner_id
  AND is_active = true;
  
  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updated_at on team_members
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_team_members_updated_at ON public.team_members;
CREATE TRIGGER trigger_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_set_timestamp();

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_members

-- SELECT: Users can see team members of their workspace
DROP POLICY IF EXISTS "Users can view team members" ON public.team_members;
CREATE POLICY "Users can view team members"
  ON public.team_members FOR SELECT
  USING (
    auth.uid() = workspace_owner_id OR
    auth.uid() = user_id OR
    public.is_team_member(auth.uid(), workspace_owner_id)
  );

-- INSERT: Only workspace owner and admins can add team members
DROP POLICY IF EXISTS "Owners and admins can add team members" ON public.team_members;
CREATE POLICY "Owners and admins can add team members"
  ON public.team_members FOR INSERT
  WITH CHECK (
    auth.uid() = workspace_owner_id OR
    public.can_manage_team(auth.uid(), workspace_owner_id)
  );

-- UPDATE: Only workspace owner and admins can update team members
DROP POLICY IF EXISTS "Owners and admins can update team members" ON public.team_members;
CREATE POLICY "Owners and admins can update team members"
  ON public.team_members FOR UPDATE
  USING (
    auth.uid() = workspace_owner_id OR
    public.can_manage_team(auth.uid(), workspace_owner_id)
  );

-- DELETE: Only workspace owner and admins can remove team members
DROP POLICY IF EXISTS "Owners and admins can remove team members" ON public.team_members;
CREATE POLICY "Owners and admins can remove team members"
  ON public.team_members FOR DELETE
  USING (
    auth.uid() = workspace_owner_id OR
    public.can_manage_team(auth.uid(), workspace_owner_id)
  );

-- RLS Policies for team_invitations

-- SELECT: Users can see invitations for their workspace
DROP POLICY IF EXISTS "Users can view team invitations" ON public.team_invitations;
CREATE POLICY "Users can view team invitations"
  ON public.team_invitations FOR SELECT
  USING (
    auth.uid() = workspace_owner_id OR
    public.can_manage_team(auth.uid(), workspace_owner_id)
  );

-- INSERT: Only workspace owner and admins can create invitations
DROP POLICY IF EXISTS "Owners and admins can create invitations" ON public.team_invitations;
CREATE POLICY "Owners and admins can create invitations"
  ON public.team_invitations FOR INSERT
  WITH CHECK (
    auth.uid() = workspace_owner_id OR
    public.can_manage_team(auth.uid(), workspace_owner_id)
  );

-- UPDATE: Only workspace owner and admins can update invitations
DROP POLICY IF EXISTS "Owners and admins can update invitations" ON public.team_invitations;
CREATE POLICY "Owners and admins can update invitations"
  ON public.team_invitations FOR UPDATE
  USING (
    auth.uid() = workspace_owner_id OR
    public.can_manage_team(auth.uid(), workspace_owner_id)
  );

-- DELETE: Only workspace owner and admins can delete invitations
DROP POLICY IF EXISTS "Owners and admins can delete invitations" ON public.team_invitations;
CREATE POLICY "Owners and admins can delete invitations"
  ON public.team_invitations FOR DELETE
  USING (
    auth.uid() = workspace_owner_id OR
    public.can_manage_team(auth.uid(), workspace_owner_id)
  );

-- RLS Policies for team_permissions

-- SELECT: Users can see their own permissions
DROP POLICY IF EXISTS "Users can view team permissions" ON public.team_permissions;
CREATE POLICY "Users can view team permissions"
  ON public.team_permissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE id = team_member_id
      AND (user_id = auth.uid() OR workspace_owner_id = auth.uid())
    )
  );

-- INSERT/UPDATE/DELETE: Only workspace owner and admins can manage permissions
DROP POLICY IF EXISTS "Owners and admins can manage permissions" ON public.team_permissions;
CREATE POLICY "Owners and admins can manage permissions"
  ON public.team_permissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE id = team_member_id
      AND (workspace_owner_id = auth.uid() OR public.can_manage_team(auth.uid(), workspace_owner_id))
    )
  );

-- =====================================================
-- PART 3: Update contacts table for team support
-- =====================================================

-- Add assigned_to column to contacts if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'contacts' 
    AND column_name = 'assigned_to'
  ) THEN
    ALTER TABLE public.contacts ADD COLUMN assigned_to UUID REFERENCES auth.users(id);
    CREATE INDEX idx_contacts_assigned_to ON public.contacts(assigned_to);
  END IF;
END $$;

-- Update contacts RLS policies to include team members

-- SELECT: Users can see their own contacts, assigned contacts, or if they're team members
DROP POLICY IF EXISTS "Users can view their contacts" ON public.contacts;
CREATE POLICY "Users can view their contacts"
  ON public.contacts FOR SELECT
  USING (
    auth.uid() = user_id OR
    auth.uid() = assigned_to OR
    public.is_admin(auth.uid()) OR
    public.is_team_member(auth.uid(), user_id) OR
    (public.get_team_role(auth.uid(), user_id) IN ('admin', 'supervisor'))
  );

-- INSERT: Users and team members can create contacts
DROP POLICY IF EXISTS "Users can insert their contacts" ON public.contacts;
CREATE POLICY "Users can insert their contacts"
  ON public.contacts FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR
    public.is_admin(auth.uid()) OR
    public.is_team_member(auth.uid(), user_id)
  );

-- UPDATE: Users, assigned agents, and team admins can update contacts
DROP POLICY IF EXISTS "Users can update their contacts" ON public.contacts;
CREATE POLICY "Users can update their contacts"
  ON public.contacts FOR UPDATE
  USING (
    auth.uid() = user_id OR
    auth.uid() = assigned_to OR
    public.is_admin(auth.uid()) OR
    public.get_team_role(auth.uid(), user_id) IN ('admin', 'supervisor')
  );

-- DELETE: Only owners, admins, and system admins can delete contacts
DROP POLICY IF EXISTS "Users can delete their contacts" ON public.contacts;
CREATE POLICY "Users can delete their contacts"
  ON public.contacts FOR DELETE
  USING (
    auth.uid() = user_id OR
    public.is_admin(auth.uid()) OR
    public.get_team_role(auth.uid(), user_id) = 'admin'
  );

-- =====================================================
-- PART 4: Update contact_interactions for team support
-- =====================================================

-- Add created_by column to contact_interactions if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'contact_interactions' 
    AND column_name = 'created_by'
  ) THEN
    ALTER TABLE public.contact_interactions ADD COLUMN created_by UUID REFERENCES auth.users(id);
    CREATE INDEX idx_contact_interactions_created_by ON public.contact_interactions(created_by);
  END IF;
END $$;

-- Update contact_interactions RLS policies to include team members

-- SELECT: Users can see interactions for contacts they have access to
DROP POLICY IF EXISTS "Users can view their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can view their contact interactions"
  ON public.contact_interactions FOR SELECT
  USING (
    auth.uid() = user_id OR
    public.is_admin(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.contacts
      WHERE contacts.id = contact_interactions.contact_id
      AND (
        contacts.user_id = auth.uid() OR
        contacts.assigned_to = auth.uid() OR
        public.is_team_member(auth.uid(), contacts.user_id)
      )
    )
  );

-- INSERT: Team members can create interactions (already updated in PART 1)
-- The policy from PART 1 already allows admins, we just need to extend it for team members
DROP POLICY IF EXISTS "Users can insert their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can insert their contact interactions"
  ON public.contact_interactions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR 
    public.is_admin(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.contacts
      WHERE contacts.id = contact_interactions.contact_id
      AND (
        contacts.user_id = auth.uid() OR
        contacts.assigned_to = auth.uid() OR
        public.is_team_member(auth.uid(), contacts.user_id)
      )
    )
  );

-- UPDATE: Users and team members can update interactions
DROP POLICY IF EXISTS "Users can update their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can update their contact interactions"
  ON public.contact_interactions FOR UPDATE
  USING (
    auth.uid() = user_id OR
    auth.uid() = created_by OR
    public.is_admin(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.contacts
      WHERE contacts.id = contact_interactions.contact_id
      AND public.get_team_role(auth.uid(), contacts.user_id) IN ('admin', 'supervisor')
    )
  );

-- DELETE: Only owners, admins, and system admins can delete interactions
DROP POLICY IF EXISTS "Users can delete their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can delete their contact interactions"
  ON public.contact_interactions FOR DELETE
  USING (
    auth.uid() = user_id OR
    public.is_admin(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.contacts
      WHERE contacts.id = contact_interactions.contact_id
      AND public.get_team_role(auth.uid(), contacts.user_id) = 'admin'
    )
  );

-- =====================================================
-- PART 5: Grant permissions
-- =====================================================

GRANT ALL ON public.team_members TO authenticated;
GRANT ALL ON public.team_invitations TO authenticated;
GRANT ALL ON public.team_permissions TO authenticated;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Verify the migration
DO $$
BEGIN
  RAISE NOTICE 'Team Management System migration completed successfully!';
  RAISE NOTICE 'Created tables: team_members, team_invitations, team_permissions';
  RAISE NOTICE 'Created functions: is_team_member, has_team_role, can_manage_team, get_team_role';
  RAISE NOTICE 'Updated tables: contacts (added assigned_to), contact_interactions (added created_by)';
  RAISE NOTICE 'All RLS policies have been updated to support team collaboration';
END $$;
