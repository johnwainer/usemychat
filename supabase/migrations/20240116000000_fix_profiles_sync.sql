-- Fix profiles synchronization and ensure all data is properly set

-- First, sync existing auth users to profiles table
INSERT INTO public.profiles (id, email, full_name, role, status, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', 'Usuario'),
  COALESCE(au.raw_user_meta_data->>'role', 'client'),
  'active',
  au.created_at,
  NOW()
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = au.id
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name, 'Usuario'),
  updated_at = NOW();

-- Update profiles that have null full_name
UPDATE public.profiles
SET full_name = 'Usuario'
WHERE full_name IS NULL OR full_name = '';

-- Update profiles that have null email from auth.users
UPDATE public.profiles p
SET email = au.email
FROM auth.users au
WHERE p.id = au.id AND (p.email IS NULL OR p.email = '');

-- Ensure company field is synced from metadata
UPDATE public.profiles p
SET company = au.raw_user_meta_data->>'company'
FROM auth.users au
WHERE p.id = au.id 
  AND au.raw_user_meta_data->>'company' IS NOT NULL
  AND (p.company IS NULL OR p.company = '');

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the handle_new_user function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    company,
    role, 
    status,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuario'),
    NEW.raw_user_meta_data->>'company',
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    'active',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    company = COALESCE(EXCLUDED.company, public.profiles.company),
    updated_at = NOW();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the auth
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT SELECT ON public.profiles TO authenticated;
GRANT UPDATE ON public.profiles TO authenticated;

-- Verify all profiles have required data
DO $$
DECLARE
  missing_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO missing_count
  FROM public.profiles
  WHERE full_name IS NULL OR full_name = '' OR email IS NULL OR email = '';
  
  IF missing_count > 0 THEN
    RAISE NOTICE 'Found % profiles with missing data. Fixing...', missing_count;
    
    UPDATE public.profiles p
    SET 
      full_name = COALESCE(NULLIF(p.full_name, ''), au.raw_user_meta_data->>'full_name', 'Usuario'),
      email = COALESCE(NULLIF(p.email, ''), au.email)
    FROM auth.users au
    WHERE p.id = au.id;
  END IF;
END $$;
