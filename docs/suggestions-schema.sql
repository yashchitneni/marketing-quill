-- Create suggestion cache table
CREATE TABLE suggestion_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text_hash TEXT NOT NULL UNIQUE,
  text_length INTEGER NOT NULL,
  suggestions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  access_count INTEGER DEFAULT 1
);

-- Create indexes for faster lookups
CREATE INDEX idx_suggestion_cache_text_hash ON suggestion_cache(text_hash);
CREATE INDEX idx_suggestion_cache_created_at ON suggestion_cache(created_at);
CREATE INDEX idx_suggestion_cache_accessed_at ON suggestion_cache(accessed_at);

-- Create suggestion analytics table
CREATE TABLE suggestion_analytics (
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
CREATE INDEX idx_suggestion_analytics_user_id ON suggestion_analytics(user_id);
CREATE INDEX idx_suggestion_analytics_draft_id ON suggestion_analytics(draft_id);
CREATE INDEX idx_suggestion_analytics_accepted ON suggestion_analytics(accepted);

-- Enable RLS
ALTER TABLE suggestion_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own analytics" ON suggestion_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own analytics" ON suggestion_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to clean up old cache entries (run periodically)
CREATE OR REPLACE FUNCTION cleanup_suggestion_cache()
RETURNS void AS $$
BEGIN
  -- Delete entries older than 7 days that haven't been accessed recently
  DELETE FROM suggestion_cache
  WHERE created_at < NOW() - INTERVAL '7 days'
  AND accessed_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;