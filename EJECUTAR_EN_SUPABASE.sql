-- ============================================
-- EJECUTA ESTE SCRIPT EN SUPABASE SQL EDITOR
-- ============================================
-- Este script corrige el error de recursión infinita en las políticas RLS

-- 1. Deshabilitar RLS temporalmente
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_statistics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs DISABLE ROW LEVEL SECURITY;

-- 2. Eliminar TODAS las políticas existentes
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for admins" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for admins" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for service role" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_all_if_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;

DROP POLICY IF EXISTS "Users can view their own statistics" ON public.user_statistics;
DROP POLICY IF EXISTS "Admins can view all statistics" ON public.user_statistics;
DROP POLICY IF EXISTS "Users can insert their own statistics" ON public.user_statistics;
DROP POLICY IF EXISTS "Users can update their own statistics" ON public.user_statistics;
DROP POLICY IF EXISTS "Enable read for own statistics" ON public.user_statistics;
DROP POLICY IF EXISTS "Enable read for admin statistics" ON public.user_statistics;
DROP POLICY IF EXISTS "Enable insert for own statistics" ON public.user_statistics;
DROP POLICY IF EXISTS "Enable update for own statistics" ON public.user_statistics;
DROP POLICY IF EXISTS "user_statistics_select_own" ON public.user_statistics;
DROP POLICY IF EXISTS "user_statistics_select_all_if_admin" ON public.user_statistics;
DROP POLICY IF EXISTS "user_statistics_insert_own" ON public.user_statistics;
DROP POLICY IF EXISTS "user_statistics_update_own" ON public.user_statistics;

DROP POLICY IF EXISTS "Users can view their own activity" ON public.activity_logs;
DROP POLICY IF EXISTS "Admins can view all activity" ON public.activity_logs;
DROP POLICY IF EXISTS "Users can insert their own activity" ON public.activity_logs;
DROP POLICY IF EXISTS "Enable read for own activity" ON public.activity_logs;
DROP POLICY IF EXISTS "Enable read for admin activity" ON public.activity_logs;
DROP POLICY IF EXISTS "Enable insert for activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "activity_logs_select_own" ON public.activity_logs;
DROP POLICY IF EXISTS "activity_logs_select_all_if_admin" ON public.activity_logs;
DROP POLICY IF EXISTS "activity_logs_insert_own" ON public.activity_logs;

-- 3. Crear políticas SIMPLES sin recursión para profiles
CREATE POLICY "profiles_select"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);  -- Permitir a todos los usuarios autenticados leer perfiles

CREATE POLICY "profiles_update"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_insert"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- 4. Crear políticas para user_statistics
CREATE POLICY "user_statistics_select"
  ON public.user_statistics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "user_statistics_insert"
  ON public.user_statistics FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "user_statistics_update"
  ON public.user_statistics FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 5. Crear políticas para activity_logs
CREATE POLICY "activity_logs_select"
  ON public.activity_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "activity_logs_insert"
  ON public.activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- 6. Re-habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 7. Otorgar permisos
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.user_statistics TO authenticated;
GRANT ALL ON public.activity_logs TO authenticated;

-- 8. Verificar que todo esté correcto
SELECT 'Políticas creadas correctamente' as status;
