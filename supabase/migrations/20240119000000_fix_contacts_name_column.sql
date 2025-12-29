-- Fix contacts table: make name column nullable and update existing data
-- This migration handles the transition from 'name' to 'first_name'/'last_name'

-- First, make the name column nullable
ALTER TABLE public.contacts 
  ALTER COLUMN name DROP NOT NULL;

-- Update existing records where name is null but first_name exists
UPDATE public.contacts 
SET name = COALESCE(
  NULLIF(TRIM(first_name || ' ' || COALESCE(last_name, '')), ''),
  email,
  'Sin nombre'
)
WHERE name IS NULL;

-- Add a trigger to automatically populate name from first_name and last_name
CREATE OR REPLACE FUNCTION public.sync_contact_name()
RETURNS TRIGGER AS $$
BEGIN
  -- If first_name or last_name changes, update name
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND (NEW.first_name IS DISTINCT FROM OLD.first_name OR NEW.last_name IS DISTINCT FROM OLD.last_name)) THEN
    NEW.name := COALESCE(
      NULLIF(TRIM(NEW.first_name || ' ' || COALESCE(NEW.last_name, '')), ''),
      NEW.email,
      'Sin nombre'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS sync_contact_name_trigger ON public.contacts;

CREATE TRIGGER sync_contact_name_trigger
  BEFORE INSERT OR UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_contact_name();

-- Add comment
COMMENT ON COLUMN public.contacts.name IS 'Auto-populated from first_name and last_name. Used for backward compatibility.';
