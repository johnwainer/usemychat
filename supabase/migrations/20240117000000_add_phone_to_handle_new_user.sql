-- Update handle_new_user function to include phone field

-- Drop existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Update the handle_new_user function to include phone
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    company,
    phone,
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
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    'active',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    company = COALESCE(EXCLUDED.company, public.profiles.company),
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
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

-- Sync phone from existing users metadata to profiles
UPDATE public.profiles p
SET phone = au.raw_user_meta_data->>'phone'
FROM auth.users au
WHERE p.id = au.id 
  AND au.raw_user_meta_data->>'phone' IS NOT NULL
  AND (p.phone IS NULL OR p.phone = '');

-- Sync company from existing users metadata to profiles (in case it was missed)
UPDATE public.profiles p
SET company = au.raw_user_meta_data->>'company'
FROM auth.users au
WHERE p.id = au.id 
  AND au.raw_user_meta_data->>'company' IS NOT NULL
  AND (p.company IS NULL OR p.company = '');
