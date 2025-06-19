-- Create suggestion_analytics table for tracking suggestion usage
CREATE TABLE IF NOT EXISTS suggestion_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  draft_id UUID REFERENCES drafts(id) ON DELETE CASCADE,
  suggestion_type TEXT NOT NULL CHECK (suggestion_type IN ('grammar', 'tone')),
  suggestion_text TEXT NOT NULL,
  original_text TEXT NOT NULL,
  accepted BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_suggestion_analytics_user_id ON suggestion_analytics(user_id);
CREATE INDEX idx_suggestion_analytics_draft_id ON suggestion_analytics(draft_id);
CREATE INDEX idx_suggestion_analytics_created_at ON suggestion_analytics(created_at);
CREATE INDEX idx_suggestion_analytics_type ON suggestion_analytics(suggestion_type);

-- Enable RLS
ALTER TABLE suggestion_analytics ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own suggestion analytics"
  ON suggestion_analytics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own suggestion analytics"
  ON suggestion_analytics FOR INSERT
  WITH CHECK (auth.uid() = user_id);