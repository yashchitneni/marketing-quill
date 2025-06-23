-- Add missing columns to drafts table
ALTER TABLE public.drafts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.drafts ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE public.drafts ADD COLUMN IF NOT EXISTS linkedin_post_id TEXT;

-- Add indexes for better performance on new columns
CREATE INDEX IF NOT EXISTS idx_drafts_published_at ON public.drafts(published_at);
CREATE INDEX IF NOT EXISTS idx_drafts_user_published ON public.drafts(user_id, published_at);