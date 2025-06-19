-- Create snapshots table
CREATE TABLE draft_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID REFERENCES drafts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  channel TEXT,
  optimization_score INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_snapshots_draft_id ON draft_snapshots(draft_id);
CREATE INDEX idx_snapshots_user_id ON draft_snapshots(user_id);
CREATE INDEX idx_snapshots_created_at ON draft_snapshots(created_at DESC);

-- Enable RLS
ALTER TABLE draft_snapshots ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own snapshots" ON draft_snapshots
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own snapshots" ON draft_snapshots
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own snapshots" ON draft_snapshots
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically create daily snapshots
CREATE OR REPLACE FUNCTION create_daily_snapshot(p_draft_id UUID)
RETURNS void AS $$
DECLARE
  v_last_snapshot TIMESTAMP;
  v_draft RECORD;
BEGIN
  -- Get the last snapshot time for this draft
  SELECT created_at INTO v_last_snapshot
  FROM draft_snapshots
  WHERE draft_id = p_draft_id
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- Only create snapshot if it's been at least 24 hours since last one
  IF v_last_snapshot IS NULL OR 
     (NOW() - v_last_snapshot) > INTERVAL '24 hours' THEN
    
    -- Get draft data
    SELECT * INTO v_draft
    FROM drafts
    WHERE id = p_draft_id;
    
    -- Create snapshot
    INSERT INTO draft_snapshots (
      draft_id,
      user_id,
      title,
      content,
      channel,
      optimization_score,
      metadata
    ) VALUES (
      v_draft.id,
      v_draft.user_id,
      v_draft.title,
      v_draft.content,
      v_draft.channel,
      v_draft.optimization_score,
      v_draft.metadata
    );
    
    -- Clean up old snapshots (keep only last 7 days)
    DELETE FROM draft_snapshots
    WHERE draft_id = p_draft_id
    AND created_at < NOW() - INTERVAL '7 days';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;