-- Team Management System
-- This migration creates a complete team management system for clients

-- Create team_roles enum
CREATE TYPE team_role AS ENUM (
  'owner',        -- Full access, can manage billing and delete workspace
  'admin',        -- Can manage team members and all settings
  'supervisor',   -- Can view all conversations and manage agents
  'agent',        -- Can handle conversations assigned to them
  'viewer'        -- Read-only access to conversations and reports
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Create team_invitations table
CREATE TABLE IF NOT EXISTS public.team_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role team_role NOT NULL DEFAULT 'agent',
  invited_by UUID NOT NULL REFERENCES auth.users(id),
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(workspace_owner_id, email)
);

-- Create team_permissions table for granular permissions
CREATE TABLE IF NOT EXISTS public.team_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID NOT NULL REFERENCES public.team_members(id) ON DELETE CASCADE,
  permission_key TEXT NOT NULL,
  granted BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_member_id, permission_key)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_workspace_owner ON public.team_members(workspace_owner_id);
CREATE INDEX IF NOT EXISTS idx_team_members_role ON public.team_members(role);
CREATE INDEX IF NOT EXISTS idx_team_invitations_email ON public.team_invitations(email);
CREATE INDEX IF NOT EXISTS idx_team_invitations_token ON public.team_invitations(token);
CREATE INDEX IF NOT EXISTS idx_team_invitations_workspace ON public.team_invitations(workspace_owner_id);

-- Create function to check if user is team member
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

-- Create function to check if user has specific role
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
  -- Owner or admin can manage team
  RETURN check_user_id = owner_id OR EXISTS (
    SELECT 1 FROM public.team_members
    WHERE user_id = check_user_id 
    AND workspace_owner_id = owner_id
    AND role IN ('admin', 'owner')
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
  -- If user is the owner
  IF check_user_id = owner_id THEN
    RETURN 'owner'::team_role;
  END IF;
  
  -- Get role from team_members
  SELECT role INTO user_role
  FROM public.team_members
  WHERE user_id = check_user_id 
  AND workspace_owner_id = owner_id
  AND is_active = true;
  
  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_team_members_updated_at()
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
  EXECUTE FUNCTION public.update_team_members_updated_at();

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_members
DROP POLICY IF EXISTS "Users can view team members in their workspace" ON public.team_members;
CREATE POLICY "Users can view team members in their workspace"
  ON public.team_members FOR SELECT
  USING (
    auth.uid() = workspace_owner_id OR 
    auth.uid() = user_id OR
    public.is_team_member(auth.uid(), workspace_owner_id) OR
    public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Owners and admins can insert team members" ON public.team_members;
CREATE POLICY "Owners and admins can insert team members"
  ON public.team_members FOR INSERT
  WITH CHECK (
    public.can_manage_team(auth.uid(), workspace_owner_id) OR
    public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Owners and admins can update team members" ON public.team_members;
CREATE POLICY "Owners and admins can update team members"
  ON public.team_members FOR UPDATE
  USING (
    public.can_manage_team(auth.uid(), workspace_owner_id) OR
    auth.uid() = user_id OR
    public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Owners and admins can delete team members" ON public.team_members;
CREATE POLICY "Owners and admins can delete team members"
  ON public.team_members FOR DELETE
  USING (
    public.can_manage_team(auth.uid(), workspace_owner_id) OR
    public.is_admin(auth.uid())
  );

-- RLS Policies for team_invitations
DROP POLICY IF EXISTS "Users can view invitations for their workspace" ON public.team_invitations;
CREATE POLICY "Users can view invitations for their workspace"
  ON public.team_invitations FOR SELECT
  USING (
    auth.uid() = workspace_owner_id OR
    public.can_manage_team(auth.uid(), workspace_owner_id) OR
    public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Anyone can view invitations by token" ON public.team_invitations;
CREATE POLICY "Anyone can view invitations by token"
  ON public.team_invitations FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Owners and admins can create invitations" ON public.team_invitations;
CREATE POLICY "Owners and admins can create invitations"
  ON public.team_invitations FOR INSERT
  WITH CHECK (
    public.can_manage_team(auth.uid(), workspace_owner_id) OR
    public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Owners and admins can delete invitations" ON public.team_invitations;
CREATE POLICY "Owners and admins can delete invitations"
  ON public.team_invitations FOR DELETE
  USING (
    public.can_manage_team(auth.uid(), workspace_owner_id) OR
    public.is_admin(auth.uid())
  );

-- RLS Policies for team_permissions
DROP POLICY IF EXISTS "Users can view their own permissions" ON public.team_permissions;
CREATE POLICY "Users can view their own permissions"
  ON public.team_permissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE id = team_member_id AND user_id = auth.uid()
    ) OR
    public.is_admin(auth.uid())
  );

-- Grant permissions
GRANT ALL ON public.team_members TO authenticated;
GRANT ALL ON public.team_invitations TO authenticated;
GRANT ALL ON public.team_permissions TO authenticated;

-- Update contacts table to support team access
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES auth.users(id);
CREATE INDEX IF NOT EXISTS idx_contacts_assigned_to ON public.contacts(assigned_to);

-- Update contact_interactions to support team members
ALTER TABLE public.contact_interactions ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
CREATE INDEX IF NOT EXISTS idx_interactions_created_by ON public.contact_interactions(created_by);

-- Update RLS policies for contacts to include team members
DROP POLICY IF EXISTS "Users can view their contacts" ON public.contacts;
CREATE POLICY "Users can view their contacts"
  ON public.contacts FOR SELECT
  USING (
    auth.uid() = user_id OR 
    auth.uid() = assigned_to OR
    public.is_team_member(auth.uid(), user_id) OR
    public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert their contacts" ON public.contacts;
CREATE POLICY "Users can insert their contacts"
  ON public.contacts FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR 
    public.is_team_member(auth.uid(), user_id) OR
    public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Users can update their contacts" ON public.contacts;
CREATE POLICY "Users can update their contacts"
  ON public.contacts FOR UPDATE
  USING (
    auth.uid() = user_id OR 
    auth.uid() = assigned_to OR
    public.is_team_member(auth.uid(), user_id) OR
    public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Users can delete their contacts" ON public.contacts;
CREATE POLICY "Users can delete their contacts"
  ON public.contacts FOR DELETE
  USING (
    auth.uid() = user_id OR 
    public.can_manage_team(auth.uid(), user_id) OR
    public.is_admin(auth.uid())
  );

-- Update RLS policies for contact_interactions to include team members
DROP POLICY IF EXISTS "Users can view their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can view their contact interactions"
  ON public.contact_interactions FOR SELECT
  USING (
    auth.uid() = user_id OR 
    public.is_team_member(auth.uid(), user_id) OR
    public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can insert their contact interactions"
  ON public.contact_interactions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR 
    public.is_team_member(auth.uid(), user_id) OR
    public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Users can update their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can update their contact interactions"
  ON public.contact_interactions FOR UPDATE
  USING (
    auth.uid() = user_id OR 
    public.is_team_member(auth.uid(), user_id) OR
    public.is_admin(auth.uid())
  )
  WITH CHECK (
    auth.uid() = user_id OR 
    public.is_team_member(auth.uid(), user_id) OR
    public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Users can delete their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can delete their contact interactions"
  ON public.contact_interactions FOR DELETE
  USING (
    auth.uid() = user_id OR 
    public.can_manage_team(auth.uid(), user_id) OR
    public.is_admin(auth.uid())
  );

-- Comments
COMMENT ON TABLE public.team_members IS 'Team members for each workspace';
COMMENT ON TABLE public.team_invitations IS 'Pending team invitations';
COMMENT ON TABLE public.team_permissions IS 'Granular permissions for team members';
COMMENT ON TYPE team_role IS 'Roles: owner (full access), admin (manage team), supervisor (manage agents), agent (handle conversations), viewer (read-only)';
