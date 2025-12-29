-- CRITICAL FIX: Remove ALL policies causing infinite recursion
-- This script must be executed in Supabase SQL Editor

-- Step 1: Disable RLS temporarily to fix the issue
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_statistics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Drop all policies on profiles
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'profiles' AND schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.profiles';
    END LOOP;

    -- Drop all policies on user_statistics
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'user_statistics' AND schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.user_statistics';
    END LOOP;

    -- Drop all policies on activity_logs
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'activity_logs' AND schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.activity_logs';
    END LOOP;
END $$;

-- Step 3: Create a simple function to check if user is admin (avoids recursion)
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Step 4: Create NEW simple policies for profiles
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "profiles_select_all_if_admin"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- Step 5: Create policies for user_statistics
CREATE POLICY "user_statistics_select_own"
  ON public.user_statistics FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "user_statistics_select_all_if_admin"
  ON public.user_statistics FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "user_statistics_insert_own"
  ON public.user_statistics FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "user_statistics_update_own"
  ON public.user_statistics FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Step 6: Create policies for activity_logs
CREATE POLICY "activity_logs_select_own"
  ON public.activity_logs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "activity_logs_select_all_if_admin"
  ON public.activity_logs FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "activity_logs_insert_own"
  ON public.activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Step 7: Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Step 8: Grant permissions
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.user_statistics TO authenticated;
GRANT ALL ON public.activity_logs TO authenticated;

-- Step 9: Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('profiles', 'user_statistics', 'activity_logs')
ORDER BY tablename, policyname;
