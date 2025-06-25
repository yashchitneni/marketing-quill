-- Add preferences columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{"realTimeSuggestions": true, "hookGeneration": true, "engagementPredictions": true, "linkedinFormatting": true, "suggestionLevel": "balanced"}'::jsonb,
ADD COLUMN IF NOT EXISTS writing_styles text[] DEFAULT ARRAY[]::text[],
ADD COLUMN IF NOT EXISTS writing_goals text[] DEFAULT ARRAY[]::text[];

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_preferences ON profiles USING GIN (preferences);