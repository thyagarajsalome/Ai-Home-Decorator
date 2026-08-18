-- ==============================================================================
-- SAFE SUPABASE TRIGGER MIGRATION FOR AI HOME DECORATOR
-- Preserves existing user_profiles schema and works seamlessly with Native Mobile App
-- ==============================================================================

-- 1. Create a safe function to auto-create user profile on signup if missing
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, role, generation_credits)
  VALUES (
    new.id,
    'user',
    15  -- Default starter credits for new users
  )
  ON CONFLICT (id) DO NOTHING; -- Prevents duplicate errors if user already exists
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop existing trigger if present and recreate safely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Verify RLS policy allows authenticated users to read their own profile
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile" 
      ON public.user_profiles 
      FOR SELECT 
      USING (auth.uid() = id);
  END IF;
END $$;
