const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkDatabase() {
  console.log('🔍 Checking database connection...')
  
  // Test basic connection
  const { data: test, error: testError } = await supabase
    .from('drafts')
    .select('count')
    .limit(1)
  
  if (testError) {
    console.error('❌ Database connection error:', testError.message)
    console.error('Error code:', testError.code)
    console.error('Details:', testError.details)
    console.error('Hint:', testError.hint)
    
    if (testError.code === '42P01') {
      console.log('\n💡 The drafts table does not exist.')
      console.log('Run this SQL in your Supabase dashboard:')
      console.log('\n--- SQL to create drafts table ---')
      console.log(`
CREATE TABLE IF NOT EXISTS public.drafts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Draft',
  content TEXT,
  channel TEXT DEFAULT 'linkedin',
  optimization_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  metadata JSONB DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE,
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can manage their own drafts" ON public.drafts
  FOR ALL USING (auth.uid() = user_id);
      `)
    }
    return
  }
  
  console.log('✅ Database connection successful!')
  
  // Check if user_profiles table exists
  const { error: profileError } = await supabase
    .from('user_profiles')
    .select('count')
    .limit(1)
  
  if (profileError) {
    console.log('⚠️  user_profiles table might not exist')
  } else {
    console.log('✅ user_profiles table exists')
  }
  
  // Check if linkedin_posts table exists
  const { error: postsError } = await supabase
    .from('linkedin_posts')
    .select('count')
    .limit(1)
  
  if (postsError) {
    console.log('⚠️  linkedin_posts table might not exist')
  } else {
    console.log('✅ linkedin_posts table exists')
  }
}

checkDatabase().catch(console.error)