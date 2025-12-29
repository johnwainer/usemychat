-- Remove the 'name' column from contacts table
-- We now use first_name, last_name, and full_name (generated column)

-- First, drop any constraints or indexes on the name column
DO $$
BEGIN
  -- Drop any indexes on name column
  IF EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'contacts' AND indexdef LIKE '%name%') THEN
    DROP INDEX IF EXISTS contacts_name_idx;
  END IF;
END $$;

-- Drop the name column
ALTER TABLE public.contacts
  DROP COLUMN IF EXISTS name;

-- Ensure full_name generated column exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'contacts'
    AND column_name = 'full_name'
  ) THEN
    ALTER TABLE public.contacts
      ADD COLUMN full_name TEXT GENERATED ALWAYS AS (
        COALESCE(
          NULLIF(TRIM(first_name || ' ' || COALESCE(last_name, '')), ''),
          email,
          'Sin nombre'
        )
      ) STORED;
  END IF;
END $$;

-- Add index on full_name for better search performance
CREATE INDEX IF NOT EXISTS contacts_full_name_idx ON public.contacts(full_name);

-- Add comment
COMMENT ON COLUMN public.contacts.full_name IS 'Auto-generated from first_name and last_name. Used for display purposes.';