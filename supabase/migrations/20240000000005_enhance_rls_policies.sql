-- Enhanced Row Level Security (RLS) Policies
-- This migration enhances the existing RLS policies with more comprehensive security measures

-- 1. Enable RLS on suggestion_cache table (was missing)
ALTER TABLE suggestion_cache ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate with enhanced security
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;

-- Enhanced Profiles Policies
-- Allow users to view all profiles (for potential collaboration features)
CREATE POLICY "profiles_select_policy" ON profiles
  FOR SELECT
  USING (true);

-- Users can only insert their own profile
CREATE POLICY "profiles_insert_policy" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "profiles_update_policy" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Only admins can delete profiles
CREATE POLICY "profiles_delete_policy" ON profiles
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Enhanced Drafts Policies
-- Add admin access to all drafts
DROP POLICY IF EXISTS "Users can view their own drafts." ON drafts;
CREATE POLICY "drafts_select_policy" ON drafts
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Ensure user_id matches authenticated user on insert
DROP POLICY IF EXISTS "Users can insert their own drafts." ON drafts;
CREATE POLICY "drafts_insert_policy" ON drafts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Update policy remains the same but add admin override
DROP POLICY IF EXISTS "Users can update their own drafts." ON drafts;
CREATE POLICY "drafts_update_policy" ON drafts
  FOR UPDATE
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Delete policy with admin override
DROP POLICY IF EXISTS "Users can delete their own drafts." ON drafts;
CREATE POLICY "drafts_delete_policy" ON drafts
  FOR DELETE
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Enhanced Draft Snapshots Policies
DROP POLICY IF EXISTS "Users can view their own snapshots." ON draft_snapshots;
CREATE POLICY "snapshots_select_policy" ON draft_snapshots
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Ensure snapshots can only be created for user's own drafts
DROP POLICY IF EXISTS "Users can create their own snapshots." ON draft_snapshots;
CREATE POLICY "snapshots_insert_policy" ON draft_snapshots
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM drafts
      WHERE drafts.id = draft_id
      AND drafts.user_id = auth.uid()
    )
  );

-- No update allowed on snapshots (they're immutable)
CREATE POLICY "snapshots_no_update_policy" ON draft_snapshots
  FOR UPDATE
  USING (false);

-- Only admins can delete snapshots
CREATE POLICY "snapshots_delete_policy" ON draft_snapshots
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Suggestion Cache Policies
-- Anyone can read from cache (it's anonymized)
CREATE POLICY "cache_select_policy" ON suggestion_cache
  FOR SELECT
  USING (true);

-- System-only insert (no direct user inserts)
CREATE POLICY "cache_insert_policy" ON suggestion_cache
  FOR INSERT
  WITH CHECK (false);

-- System-only update (for access count)
CREATE POLICY "cache_update_policy" ON suggestion_cache
  FOR UPDATE
  USING (false);

-- Only admins can delete cache entries
CREATE POLICY "cache_delete_policy" ON suggestion_cache
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Enhanced Suggestion Analytics Policies
DROP POLICY IF EXISTS "Users can view own analytics" ON suggestion_analytics;
CREATE POLICY "analytics_select_policy" ON suggestion_analytics
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Ensure analytics are only created for user's own drafts
DROP POLICY IF EXISTS "Users can create own analytics" ON suggestion_analytics;
CREATE POLICY "analytics_insert_policy" ON suggestion_analytics
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM drafts
      WHERE drafts.id = draft_id
      AND drafts.user_id = auth.uid()
    )
  );

-- No updates allowed on analytics (they're immutable)
CREATE POLICY "analytics_no_update_policy" ON suggestion_analytics
  FOR UPDATE
  USING (false);

-- Only admins can delete analytics
CREATE POLICY "analytics_delete_policy" ON suggestion_analytics
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Enhanced Custom Templates Policies
-- Public templates are viewable by all, private only by owner
DROP POLICY IF EXISTS "Users can view their own templates" ON custom_templates;
CREATE POLICY "templates_select_policy" ON custom_templates
  FOR SELECT
  USING (
    is_public = true
    OR auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Increment usage count function with security
CREATE OR REPLACE FUNCTION increment_template_usage(template_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Only increment if user has access to view the template
  UPDATE custom_templates
  SET usage_count = usage_count + 1
  WHERE id = template_id
  AND (
    is_public = true
    OR user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to validate draft ownership
CREATE OR REPLACE FUNCTION validate_draft_ownership(draft_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM drafts
    WHERE id = draft_id
    AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit log table for security events
CREATE TABLE IF NOT EXISTS security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "audit_select_policy" ON security_audit_log
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- System-only insert for audit logs
CREATE POLICY "audit_insert_policy" ON security_audit_log
  FOR INSERT
  WITH CHECK (false);

-- Create function to log security events
CREATE OR REPLACE FUNCTION log_security_event(
  p_action TEXT,
  p_table_name TEXT,
  p_record_id UUID DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO security_audit_log (user_id, action, table_name, record_id, metadata)
  VALUES (auth.uid(), p_action, p_table_name, p_record_id, p_metadata);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add index for audit log queries
CREATE INDEX idx_security_audit_log_user_id ON security_audit_log(user_id);
CREATE INDEX idx_security_audit_log_created_at ON security_audit_log(created_at);
CREATE INDEX idx_security_audit_log_action ON security_audit_log(action);

-- Create a view for user's own activity
CREATE OR REPLACE VIEW my_activity AS
SELECT 
  id,
  action,
  table_name,
  record_id,
  metadata,
  created_at
FROM security_audit_log
WHERE user_id = auth.uid();

-- Grant access to the view
GRANT SELECT ON my_activity TO authenticated;

-- Add comment documentation
COMMENT ON TABLE security_audit_log IS 'Audit log for security-relevant events';
COMMENT ON FUNCTION log_security_event IS 'Log security events to audit table';
COMMENT ON VIEW my_activity IS 'User view of their own activity log';