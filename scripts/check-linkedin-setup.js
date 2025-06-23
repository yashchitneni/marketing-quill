const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Checking LinkedIn OAuth Setup...\n')

// Check environment variables
console.log('1️⃣  Environment Variables:')
console.log('   LINKEDIN_CLIENT_ID:', LINKEDIN_CLIENT_ID ? '✅ Set' : '❌ Missing')
console.log('   LINKEDIN_CLIENT_SECRET:', LINKEDIN_CLIENT_SECRET ? '✅ Set' : '❌ Missing')
console.log('   NEXT_PUBLIC_APP_URL:', NEXT_PUBLIC_APP_URL || '❌ Missing')
console.log('   Callback URL:', NEXT_PUBLIC_APP_URL ? `${NEXT_PUBLIC_APP_URL}/api/auth/linkedin/callback` : 'N/A')

if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET) {
  console.log('\n❌ LinkedIn credentials are missing. Please set them in .env.local')
  process.exit(1)
}

// Check Supabase connection
console.log('\n2️⃣  Supabase Connection:')
if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.log('❌ Supabase credentials are missing')
  process.exit(1)
}

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function checkDatabase() {
  // Check user_profiles table
  console.log('\n3️⃣  Database Tables:')
  
  const { error: profilesError } = await supabase
    .from('user_profiles')
    .select('count')
    .limit(1)
  
  if (profilesError) {
    console.log('   user_profiles table:', '❌ Missing or inaccessible')
    console.log('   Error:', profilesError.message)
    
    if (profilesError.code === '42P01') {
      console.log('\n💡 Run the migration 20240000000001_create_user_profiles.sql in Supabase dashboard')
    }
  } else {
    console.log('   user_profiles table:', '✅ Exists')
    
    // Check if LinkedIn columns exist
    const { data: columns, error: columnsError } = await supabase.rpc('get_table_columns', {
      table_name: 'user_profiles'
    }).catch(() => ({ data: null, error: 'RPC not available' }))
    
    if (!columnsError && columns) {
      const linkedinColumns = ['linkedin_access_token', 'linkedin_profile_id', 'linkedin_oauth_state']
      const hasAllColumns = linkedinColumns.every(col => 
        columns.some(c => c.column_name === col)
      )
      console.log('   LinkedIn columns:', hasAllColumns ? '✅ Present' : '❌ Missing')
    } else {
      // Fallback check - try to select LinkedIn columns
      const { error: linkedinError } = await supabase
        .from('user_profiles')
        .select('linkedin_access_token, linkedin_profile_id')
        .limit(1)
      
      if (linkedinError && linkedinError.message.includes('column')) {
        console.log('   LinkedIn columns:', '❌ Missing')
        console.log('\n💡 Run the LinkedIn integration migrations in Supabase dashboard')
      } else {
        console.log('   LinkedIn columns:', '✅ Likely present')
      }
    }
  }
  
  // Check drafts table
  const { error: draftsError } = await supabase
    .from('drafts')
    .select('count')
    .limit(1)
  
  console.log('   drafts table:', draftsError ? '❌ Missing' : '✅ Exists')
  
  // Check linkedin_posts table
  const { error: postsError } = await supabase
    .from('linkedin_posts')
    .select('count')
    .limit(1)
  
  console.log('   linkedin_posts table:', postsError ? '❌ Missing' : '✅ Exists')
  
  console.log('\n4️⃣  LinkedIn App Configuration:')
  console.log('   Make sure your LinkedIn app has these redirect URLs:')
  console.log('   - Development:', `http://localhost:3000/api/auth/linkedin/callback`)
  if (NEXT_PUBLIC_APP_URL && !NEXT_PUBLIC_APP_URL.includes('localhost')) {
    console.log('   - Production:', `${NEXT_PUBLIC_APP_URL}/api/auth/linkedin/callback`)
  }
  
  console.log('\n5️⃣  Required LinkedIn OAuth Scopes:')
  console.log('   ✓ w_member_social (Post on behalf of user)')
  console.log('   ✓ r_liteprofile (Read basic profile info)')
  console.log('   ✓ r_emailaddress (Read email - optional)')
  
  console.log('\n✨ Setup Check Complete!')
}

checkDatabase().catch(console.error)