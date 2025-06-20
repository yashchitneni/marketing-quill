-- Dashboard Performance Optimization Indexes
-- This migration adds indexes to improve dashboard query performance

-- Index for updated_at column (for sorting by last modified)
CREATE INDEX IF NOT EXISTS idx_drafts_updated_at ON drafts(updated_at DESC NULLS LAST);

-- Index for status column (for filtering by status)
CREATE INDEX IF NOT EXISTS idx_drafts_status ON drafts(status);

-- Index for channel column (for filtering by channel)
CREATE INDEX IF NOT EXISTS idx_drafts_channel ON drafts(channel);

-- Composite index for user_id and updated_at (most common query pattern)
CREATE INDEX IF NOT EXISTS idx_drafts_user_id_updated_at ON drafts(user_id, updated_at DESC NULLS LAST);

-- Composite index for user_id, status, and updated_at
CREATE INDEX IF NOT EXISTS idx_drafts_user_status_updated ON drafts(user_id, status, updated_at DESC NULLS LAST);

-- Composite index for user_id, channel, and updated_at
CREATE INDEX IF NOT EXISTS idx_drafts_user_channel_updated ON drafts(user_id, channel, updated_at DESC NULLS LAST);

-- Index for optimization_score (for sorting by score)
CREATE INDEX IF NOT EXISTS idx_drafts_optimization_score ON drafts(optimization_score DESC NULLS LAST);

-- Full text search index for title and content (for search functionality)
CREATE INDEX IF NOT EXISTS idx_drafts_title_gin ON drafts USING gin(to_tsvector('english', COALESCE(title, '')));
CREATE INDEX IF NOT EXISTS idx_drafts_content_gin ON drafts USING gin(to_tsvector('english', COALESCE(content, '')));

-- Analyze the table to update statistics for query planner
ANALYZE drafts;