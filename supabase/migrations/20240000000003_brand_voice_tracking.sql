-- Add brand_voice_completed column to track if user completed brand voice setup
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS brand_voice_completed BOOLEAN DEFAULT FALSE;

-- Update existing profiles to set brand_voice_completed based on whether they have brand_voice data
UPDATE profiles
SET brand_voice_completed = TRUE
WHERE brand_voice IS NOT NULL 
  AND brand_voice::text != 'null' 
  AND brand_voice::text != '{}';