-- Add onboarding fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS brand_voice JSONB,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Update the handle_new_user function to include these fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, role, onboarding_completed)
  VALUES (new.id, 'editor', false);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;