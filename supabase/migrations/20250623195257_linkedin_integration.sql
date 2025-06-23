-- Add LinkedIn integration fields to user_profiles table
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

-- Add fields to drafts table for published posts
ALTER TABLE drafts ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE drafts ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE drafts ADD COLUMN IF NOT EXISTS linkedin_post_id TEXT;

-- Create table for LinkedIn posts analysis
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
CREATE POLICY "Users can view own LinkedIn posts" ON linkedin_posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own LinkedIn posts" ON linkedin_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own LinkedIn posts" ON linkedin_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own LinkedIn posts" ON linkedin_posts
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_linkedin_posts_user_id ON linkedin_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_linkedin_posts_posted_at ON linkedin_posts(posted_at);
CREATE INDEX IF NOT EXISTS idx_user_profiles_linkedin_profile_id ON user_profiles(linkedin_profile_id);
CREATE INDEX IF NOT EXISTS idx_drafts_published_at ON drafts(published_at);
CREATE INDEX IF NOT EXISTS idx_drafts_user_published ON drafts(user_id, published_at);