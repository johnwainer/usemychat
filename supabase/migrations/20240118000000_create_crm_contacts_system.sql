-- CRM Contacts System Migration
-- This migration updates the existing contacts table and creates the CRM system

-- ============================================
-- 0. CREATE HELPER FUNCTIONS
-- ============================================

-- Create is_admin function if it doesn't exist
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================
-- 1. UPDATE EXISTING CONTACTS TABLE
-- ============================================

-- Add new columns to existing contacts table if they don't exist
DO $$
BEGIN
  -- Add first_name if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='first_name') THEN
    ALTER TABLE public.contacts ADD COLUMN first_name VARCHAR(100);
  END IF;

  -- Add last_name if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='last_name') THEN
    ALTER TABLE public.contacts ADD COLUMN last_name VARCHAR(100);
  END IF;

  -- Add job_title if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='job_title') THEN
    ALTER TABLE public.contacts ADD COLUMN job_title VARCHAR(150);
  END IF;

  -- Add website if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='website') THEN
    ALTER TABLE public.contacts ADD COLUMN website VARCHAR(255);
  END IF;

  -- Add address fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='address_line1') THEN
    ALTER TABLE public.contacts ADD COLUMN address_line1 VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='address_line2') THEN
    ALTER TABLE public.contacts ADD COLUMN address_line2 VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='city') THEN
    ALTER TABLE public.contacts ADD COLUMN city VARCHAR(100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='state') THEN
    ALTER TABLE public.contacts ADD COLUMN state VARCHAR(100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='postal_code') THEN
    ALTER TABLE public.contacts ADD COLUMN postal_code VARCHAR(20);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='country') THEN
    ALTER TABLE public.contacts ADD COLUMN country VARCHAR(100);
  END IF;

  -- Add social media fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='whatsapp') THEN
    ALTER TABLE public.contacts ADD COLUMN whatsapp VARCHAR(50);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='telegram') THEN
    ALTER TABLE public.contacts ADD COLUMN telegram VARCHAR(100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='instagram') THEN
    ALTER TABLE public.contacts ADD COLUMN instagram VARCHAR(100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='facebook') THEN
    ALTER TABLE public.contacts ADD COLUMN facebook VARCHAR(100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='linkedin') THEN
    ALTER TABLE public.contacts ADD COLUMN linkedin VARCHAR(100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='twitter') THEN
    ALTER TABLE public.contacts ADD COLUMN twitter VARCHAR(100);
  END IF;

  -- Add CRM fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='status') THEN
    ALTER TABLE public.contacts ADD COLUMN status VARCHAR(50) DEFAULT 'active';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='source') THEN
    ALTER TABLE public.contacts ADD COLUMN source VARCHAR(100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='lead_score') THEN
    ALTER TABLE public.contacts ADD COLUMN lead_score INTEGER DEFAULT 0;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='lifecycle_stage') THEN
    ALTER TABLE public.contacts ADD COLUMN lifecycle_stage VARCHAR(50) DEFAULT 'lead';
  END IF;

  -- Add tags and custom fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='tags') THEN
    ALTER TABLE public.contacts ADD COLUMN tags TEXT[];
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='custom_fields') THEN
    ALTER TABLE public.contacts ADD COLUMN custom_fields JSONB DEFAULT '{}';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='notes') THEN
    ALTER TABLE public.contacts ADD COLUMN notes TEXT;
  END IF;

  -- Add metadata fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='avatar_url') THEN
    ALTER TABLE public.contacts ADD COLUMN avatar_url TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='last_contact_date') THEN
    ALTER TABLE public.contacts ADD COLUMN last_contact_date TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='next_follow_up_date') THEN
    ALTER TABLE public.contacts ADD COLUMN next_follow_up_date TIMESTAMPTZ;
  END IF;

END $$;

-- Add full_name generated column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='full_name') THEN
    ALTER TABLE public.contacts ADD COLUMN full_name VARCHAR(200) GENERATED ALWAYS AS (
      CASE
        WHEN last_name IS NOT NULL THEN first_name || ' ' || last_name
        ELSE first_name
      END
    ) STORED;
  END IF;
END $$;

-- Migrate existing data: populate first_name from name if exists
UPDATE public.contacts
SET first_name = COALESCE(first_name, name, email, 'Contact')
WHERE first_name IS NULL OR first_name = '';

-- Add constraints
DO $$
BEGIN
  -- Add check constraint for status if not exists
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contacts_status_check') THEN
    ALTER TABLE public.contacts ADD CONSTRAINT contacts_status_check
      CHECK (status IN ('active', 'inactive', 'blocked', 'lead', 'customer', 'prospect'));
  END IF;

  -- Add check constraint for lifecycle_stage if not exists
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contacts_lifecycle_stage_check') THEN
    ALTER TABLE public.contacts ADD CONSTRAINT contacts_lifecycle_stage_check
      CHECK (lifecycle_stage IN ('lead', 'prospect', 'customer', 'evangelist', 'other'));
  END IF;

  -- Add check constraint for lead_score if not exists
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contacts_lead_score_check') THEN
    ALTER TABLE public.contacts ADD CONSTRAINT contacts_lead_score_check
      CHECK (lead_score >= 0 AND lead_score <= 100);
  END IF;
END $$;

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
