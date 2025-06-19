-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NULL,
  username TEXT NULL,
  full_name TEXT NULL,
  avatar_url TEXT NULL,
  website TEXT NULL,
  role TEXT NULL DEFAULT 'editor'::TEXT,
  brand_voice JSONB,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_username_key UNIQUE (username),
  CONSTRAINT username_length CHECK ((char_length(username) >= 3))
) TABLESPACE pg_default;

-- Create drafts table
CREATE TABLE IF NOT EXISTS public.drafts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NULL,
  content TEXT NULL,
  channel TEXT NULL,
  optimization_score INTEGER NULL,
  status TEXT NULL,
  metadata JSONB NULL,
  updated_at TIMESTAMP WITH TIME ZONE NULL,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
  CONSTRAINT drafts_pkey PRIMARY KEY (id),
  CONSTRAINT drafts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Create draft_snapshots table
CREATE TABLE IF NOT EXISTS public.draft_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  draft_id UUID NOT NULL,
  user_id UUID NOT NULL,
  title TEXT NULL,
  content TEXT NULL,
  channel TEXT NULL,
  optimization_score INTEGER NULL,
  metadata JSONB NULL,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
  CONSTRAINT draft_snapshots_pkey PRIMARY KEY (id),
  CONSTRAINT draft_snapshots_draft_id_fkey FOREIGN KEY (draft_id) REFERENCES drafts (id) ON DELETE CASCADE,
  CONSTRAINT draft_snapshots_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Create suggestion cache table
CREATE TABLE IF NOT EXISTS suggestion_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text_hash TEXT NOT NULL UNIQUE,
  text_length INTEGER NOT NULL,
  suggestions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  access_count INTEGER DEFAULT 1
);

-- Create suggestion analytics table (from migration file)
CREATE TABLE IF NOT EXISTS suggestion_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  draft_id UUID REFERENCES drafts(id) ON DELETE CASCADE NOT NULL,
  suggestion_type TEXT CHECK (suggestion_type IN ('grammar', 'tone')),
  suggestion_text TEXT NOT NULL,
  original_text TEXT NOT NULL,
  accepted BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_drafts_user_id ON drafts(user_id);
CREATE INDEX IF NOT EXISTS idx_drafts_created_at ON drafts(created_at);
CREATE INDEX IF NOT EXISTS idx_draft_snapshots_draft_id ON draft_snapshots(draft_id);
CREATE INDEX IF NOT EXISTS idx_draft_snapshots_created_at ON draft_snapshots(created_at);
CREATE INDEX IF NOT EXISTS idx_suggestion_cache_text_hash ON suggestion_cache(text_hash);
CREATE INDEX IF NOT EXISTS idx_suggestion_cache_created_at ON suggestion_cache(created_at);
CREATE INDEX IF NOT EXISTS idx_suggestion_cache_accessed_at ON suggestion_cache(accessed_at);
CREATE INDEX IF NOT EXISTS idx_suggestion_analytics_user_id ON suggestion_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_suggestion_analytics_draft_id ON suggestion_analytics(draft_id);
CREATE INDEX IF NOT EXISTS idx_suggestion_analytics_accepted ON suggestion_analytics(accepted);

-- Function to create daily snapshots
CREATE OR REPLACE FUNCTION public.create_daily_snapshot(p_draft_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Check if a snapshot was already created today for this draft
  IF NOT EXISTS (
    SELECT 1
    FROM draft_snapshots
    WHERE draft_id = p_draft_id
    AND date(created_at) = date(now())
  ) THEN
    -- If not, create a new snapshot by copying from the drafts table
    INSERT INTO draft_snapshots (draft_id, user_id, title, content, channel, optimization_score, metadata)
    SELECT id, user_id, title, content, channel, optimization_score, metadata
    FROM drafts
    WHERE id = p_draft_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up old cache entries
CREATE OR REPLACE FUNCTION cleanup_suggestion_cache()
RETURNS VOID AS $$
BEGIN
  -- Delete entries older than 7 days that haven't been accessed recently
  DELETE FROM suggestion_cache
  WHERE created_at < NOW() - INTERVAL '7 days'
  AND accessed_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, onboarding_completed)
  VALUES (new.id, 'editor', false);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE draft_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestion_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for drafts
CREATE POLICY "Users can view their own drafts." ON drafts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own drafts." ON drafts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own drafts." ON drafts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own drafts." ON drafts
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for draft_snapshots
CREATE POLICY "Users can view their own snapshots." ON draft_snapshots
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own snapshots." ON draft_snapshots
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for suggestion_analytics
CREATE POLICY "Users can view own analytics" ON suggestion_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own analytics" ON suggestion_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);