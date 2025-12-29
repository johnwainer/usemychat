-- CRM Contacts System Migration
-- This migration creates a comprehensive CRM system for managing contacts

-- ============================================
-- 1. CONTACTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  full_name VARCHAR(200) GENERATED ALWAYS AS (
    CASE 
      WHEN last_name IS NOT NULL THEN first_name || ' ' || last_name
      ELSE first_name
    END
  ) STORED,
  email VARCHAR(255),
  phone VARCHAR(50),
  
  -- Additional Contact Info
  company VARCHAR(200),
  job_title VARCHAR(150),
  website VARCHAR(255),
  
  -- Address Information
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  
  -- Social Media & Communication Channels
  whatsapp VARCHAR(50),
  telegram VARCHAR(100),
  instagram VARCHAR(100),
  facebook VARCHAR(100),
  linkedin VARCHAR(100),
  twitter VARCHAR(100),
  
  -- CRM Fields
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked', 'lead', 'customer', 'prospect')),
  source VARCHAR(100), -- Where the contact came from (website, referral, campaign, etc.)
  lead_score INTEGER DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
  lifecycle_stage VARCHAR(50) DEFAULT 'lead' CHECK (lifecycle_stage IN ('lead', 'prospect', 'customer', 'evangelist', 'other')),
  
  -- Custom Fields
  tags TEXT[], -- Array of tags for categorization
  custom_fields JSONB DEFAULT '{}', -- Flexible custom fields
  notes TEXT,
  
  -- Metadata
  avatar_url TEXT,
  last_contact_date TIMESTAMPTZ,
  next_follow_up_date TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Indexes for performance
  CONSTRAINT unique_user_email UNIQUE(user_id, email)
);

-- Create indexes for contacts
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON public.contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON public.contacts(phone);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_tags ON public.contacts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_contacts_full_name ON public.contacts(full_name);
CREATE INDEX IF NOT EXISTS idx_contacts_company ON public.contacts(company);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);

-- ============================================
-- 2. CONTACT INTERACTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.contact_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Interaction Details
  type VARCHAR(50) NOT NULL CHECK (type IN ('call', 'email', 'meeting', 'message', 'note', 'whatsapp', 'telegram', 'instagram', 'facebook', 'other')),
  direction VARCHAR(20) CHECK (direction IN ('inbound', 'outbound')),
  subject VARCHAR(255),
  content TEXT,
  
  -- Metadata
  duration_minutes INTEGER, -- For calls and meetings
  outcome VARCHAR(100), -- Result of the interaction
  sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  
  -- Attachments
  attachments JSONB DEFAULT '[]', -- Array of file URLs/metadata
  
  -- Timestamps
  interaction_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for interactions
CREATE INDEX IF NOT EXISTS idx_interactions_contact_id ON public.contact_interactions(contact_id);
CREATE INDEX IF NOT EXISTS idx_interactions_user_id ON public.contact_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON public.contact_interactions(type);
CREATE INDEX IF NOT EXISTS idx_interactions_date ON public.contact_interactions(interaction_date DESC);

-- ============================================
-- 3. CONTACT GROUPS/SEGMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.contact_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3B82F6', -- Hex color for UI
  
  -- Group criteria (for dynamic segments)
  criteria JSONB DEFAULT '{}',
  is_dynamic BOOLEAN DEFAULT false, -- Static vs dynamic groups
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_user_group_name UNIQUE(user_id, name)
);

-- Create indexes for groups
CREATE INDEX IF NOT EXISTS idx_groups_user_id ON public.contact_groups(user_id);

-- ============================================
-- 4. CONTACT GROUP MEMBERS (Many-to-Many)
-- ============================================
CREATE TABLE IF NOT EXISTS public.contact_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES public.contact_groups(id) ON DELETE CASCADE,
  
  added_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_contact_group UNIQUE(contact_id, group_id)
);

-- Create indexes for group members
CREATE INDEX IF NOT EXISTS idx_group_members_contact_id ON public.contact_group_members(contact_id);
CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON public.contact_group_members(group_id);

-- ============================================
-- 5. CONTACT STATISTICS VIEW
-- ============================================
CREATE OR REPLACE VIEW public.contact_statistics AS
SELECT 
  c.user_id,
  COUNT(DISTINCT c.id) as total_contacts,
  COUNT(DISTINCT CASE WHEN c.status = 'active' THEN c.id END) as active_contacts,
  COUNT(DISTINCT CASE WHEN c.status = 'lead' THEN c.id END) as leads,
  COUNT(DISTINCT CASE WHEN c.status = 'customer' THEN c.id END) as customers,
  COUNT(DISTINCT CASE WHEN c.lifecycle_stage = 'prospect' THEN c.id END) as prospects,
  COUNT(DISTINCT ci.id) as total_interactions,
  COUNT(DISTINCT CASE WHEN ci.interaction_date >= NOW() - INTERVAL '30 days' THEN ci.id END) as interactions_last_30_days,
  COUNT(DISTINCT CASE WHEN c.created_at >= NOW() - INTERVAL '30 days' THEN c.id END) as new_contacts_last_30_days,
  AVG(c.lead_score) as avg_lead_score
FROM public.contacts c
LEFT JOIN public.contact_interactions ci ON c.id = ci.contact_id
GROUP BY c.user_id;

-- Grant access to the view
GRANT SELECT ON public.contact_statistics TO authenticated;

-- ============================================
-- 6. FUNCTIONS
-- ============================================

-- Function to update contact's last_contact_date
CREATE OR REPLACE FUNCTION public.update_contact_last_interaction()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.contacts
  SET 
    last_contact_date = NEW.interaction_date,
    updated_at = NOW()
  WHERE id = NEW.contact_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 7. TRIGGERS
-- ============================================

-- Trigger to update contact's last interaction date
DROP TRIGGER IF EXISTS trigger_update_contact_last_interaction ON public.contact_interactions;
CREATE TRIGGER trigger_update_contact_last_interaction
  AFTER INSERT ON public.contact_interactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_contact_last_interaction();

-- Triggers to update updated_at
DROP TRIGGER IF EXISTS trigger_contacts_updated_at ON public.contacts;
CREATE TRIGGER trigger_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_interactions_updated_at ON public.contact_interactions;
CREATE TRIGGER trigger_interactions_updated_at
  BEFORE UPDATE ON public.contact_interactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_groups_updated_at ON public.contact_groups;
CREATE TRIGGER trigger_groups_updated_at
  BEFORE UPDATE ON public.contact_groups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_group_members ENABLE ROW LEVEL SECURITY;

-- Contacts Policies
DROP POLICY IF EXISTS "Users can view their own contacts" ON public.contacts;
CREATE POLICY "Users can view their own contacts"
  ON public.contacts FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Users can insert their own contacts" ON public.contacts;
CREATE POLICY "Users can insert their own contacts"
  ON public.contacts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own contacts" ON public.contacts;
CREATE POLICY "Users can update their own contacts"
  ON public.contacts FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Users can delete their own contacts" ON public.contacts;
CREATE POLICY "Users can delete their own contacts"
  ON public.contacts FOR DELETE
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

-- Contact Interactions Policies
DROP POLICY IF EXISTS "Users can view their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can view their contact interactions"
  ON public.contact_interactions FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Users can insert their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can insert their contact interactions"
  ON public.contact_interactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can update their contact interactions"
  ON public.contact_interactions FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Users can delete their contact interactions" ON public.contact_interactions;
CREATE POLICY "Users can delete their contact interactions"
  ON public.contact_interactions FOR DELETE
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

-- Contact Groups Policies
DROP POLICY IF EXISTS "Users can view their contact groups" ON public.contact_groups;
CREATE POLICY "Users can view their contact groups"
  ON public.contact_groups FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Users can insert their contact groups" ON public.contact_groups;
CREATE POLICY "Users can insert their contact groups"
  ON public.contact_groups FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their contact groups" ON public.contact_groups;
CREATE POLICY "Users can update their contact groups"
  ON public.contact_groups FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Users can delete their contact groups" ON public.contact_groups;
CREATE POLICY "Users can delete their contact groups"
  ON public.contact_groups FOR DELETE
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

-- Contact Group Members Policies
DROP POLICY IF EXISTS "Users can view their group members" ON public.contact_group_members;
CREATE POLICY "Users can view their group members"
  ON public.contact_group_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.contact_groups
      WHERE id = group_id AND (user_id = auth.uid() OR public.is_admin(auth.uid()))
    )
  );

DROP POLICY IF EXISTS "Users can manage their group members" ON public.contact_group_members;
CREATE POLICY "Users can manage their group members"
  ON public.contact_group_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.contact_groups
      WHERE id = group_id AND (user_id = auth.uid() OR public.is_admin(auth.uid()))
    )
  );

-- ============================================
-- 9. GRANT PERMISSIONS
-- ============================================

GRANT ALL ON public.contacts TO authenticated;
GRANT ALL ON public.contact_interactions TO authenticated;
GRANT ALL ON public.contact_groups TO authenticated;
GRANT ALL ON public.contact_group_members TO authenticated;

-- ============================================
-- 10. SAMPLE DATA (Optional - for testing)
-- ============================================

-- You can add sample contacts here for testing purposes
-- This section can be removed in production

COMMENT ON TABLE public.contacts IS 'Stores contact information for CRM system';
COMMENT ON TABLE public.contact_interactions IS 'Tracks all interactions with contacts';
COMMENT ON TABLE public.contact_groups IS 'Organizes contacts into groups/segments';
COMMENT ON TABLE public.contact_group_members IS 'Many-to-many relationship between contacts and groups';
