-- COMPLETE MIGRATION TO FIX ALL ISSUES
-- Run this entire script in your Supabase SQL Editor

-- 1. Create user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (drop first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (user_id) DO UPDATE
  SET email = EXCLUDED.email,
      full_name = EXCLUDED.full_name,
      avatar_url = EXCLUDED.avatar_url;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2. Add LinkedIn integration fields to user_profiles table
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS linkedin_access_token TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS linkedin_refresh_token TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS linkedin_expires_at TIMESTAMPTZ;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS linkedin_profile_id TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS linkedin_first_name TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS linkedin_last_name TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS linkedin_connected_at TIMESTAMPTZ;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS linkedin_oauth_state TEXT;

-- Add voice profile fields
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS writing_style TEXT[];
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS writing_goals TEXT[];
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS sample_content TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS voice_profile_setup BOOLEAN DEFAULT FALSE;

-- Add writing preferences
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS real_time_suggestions BOOLEAN DEFAULT TRUE;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS hook_generation BOOLEAN DEFAULT TRUE;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS engagement_predictions BOOLEAN DEFAULT TRUE;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS linkedin_formatting BOOLEAN DEFAULT TRUE;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS suggestion_aggressiveness TEXT DEFAULT 'balanced';

-- 3. Add missing columns to drafts table
ALTER TABLE public.drafts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.drafts ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE public.drafts ADD COLUMN IF NOT EXISTS linkedin_post_id TEXT;

-- 4. Create table for LinkedIn posts analysis
CREATE TABLE IF NOT EXISTS linkedin_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  linkedin_post_id TEXT,
  content TEXT,
  engagement_score INTEGER,
  likes_count INTEGER,
  comments_count INTEGER,
  shares_count INTEGER,
  posted_at TIMESTAMPTZ,
  analyzed_at TIMESTAMPTZ DEFAULT NOW(),
  voice_analysis JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE linkedin_posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for linkedin_posts
DROP POLICY IF EXISTS "Users can view own LinkedIn posts" ON linkedin_posts;
CREATE POLICY "Users can view own LinkedIn posts" ON linkedin_posts
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own LinkedIn posts" ON linkedin_posts;
CREATE POLICY "Users can insert own LinkedIn posts" ON linkedin_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own LinkedIn posts" ON linkedin_posts;
CREATE POLICY "Users can update own LinkedIn posts" ON linkedin_posts
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own LinkedIn posts" ON linkedin_posts;
CREATE POLICY "Users can delete own LinkedIn posts" ON linkedin_posts
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_linkedin_posts_user_id ON linkedin_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_linkedin_posts_posted_at ON linkedin_posts(posted_at);
CREATE INDEX IF NOT EXISTS idx_user_profiles_linkedin_profile_id ON user_profiles(linkedin_profile_id);
CREATE INDEX IF NOT EXISTS idx_drafts_published_at ON public.drafts(published_at);
CREATE INDEX IF NOT EXISTS idx_drafts_user_published ON public.drafts(user_id, published_at);

-- 5. Create profile for existing users (if any)
INSERT INTO public.user_profiles (user_id, email)
SELECT id, email FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_profiles)
ON CONFLICT (user_id) DO NOTHING;

-- 6. Create trigger for drafts updated_at if not exists
DROP TRIGGER IF EXISTS update_drafts_updated_at ON public.drafts;
CREATE TRIGGER update_drafts_updated_at BEFORE UPDATE ON public.drafts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();