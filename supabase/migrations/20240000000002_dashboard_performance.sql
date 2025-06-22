-- Dashboard performance optimization indexes

-- Index for user_id + status filtering (most common query pattern)
CREATE INDEX IF NOT EXISTS idx_drafts_user_status 
ON drafts(user_id, status);

-- Index for user_id + updated_at sorting (default sort)
CREATE INDEX IF NOT EXISTS idx_drafts_user_updated 
ON drafts(user_id, updated_at DESC);

-- Index for user_id + created_at sorting
CREATE INDEX IF NOT EXISTS idx_drafts_user_created 
ON drafts(user_id, created_at DESC);

-- Index for user_id + channel filtering
CREATE INDEX IF NOT EXISTS idx_drafts_user_channel 
ON drafts(user_id, channel);

-- Index for user_id + optimization_score sorting
CREATE INDEX IF NOT EXISTS idx_drafts_user_score 
ON drafts(user_id, optimization_score DESC);

-- Composite index for the most common query pattern
-- user_id + status + updated_at for filtered and sorted queries
CREATE INDEX IF NOT EXISTS idx_drafts_user_status_updated 
ON drafts(user_id, status, updated_at DESC);

-- Add comment
COMMENT ON INDEX idx_drafts_user_status IS 'Speeds up dashboard queries filtered by status';
COMMENT ON INDEX idx_drafts_user_updated IS 'Speeds up dashboard queries sorted by last update';