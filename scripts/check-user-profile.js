const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkUserProfiles() {
  console.log('🔍 Checking user profiles...\n')
  
  // Get all users
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers()
  
  if (usersError) {
    console.error('Error fetching users:', usersError)
    return
  }
  
  console.log(`Found ${users.users.length} users\n`)
  
  for (const user of users.users) {
    console.log(`User: ${user.email} (${user.id})`)
    console.log(`Created: ${new Date(user.created_at).toLocaleString()}`)
    
    // Check user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    
    if (profileError) {
      console.log('❌ No user profile found')
    } else {
      console.log('✅ User profile exists')
      console.log('LinkedIn connected:', profile.linkedin_profile_id ? '✅ Yes' : '❌ No')
      
      if (profile.linkedin_profile_id) {
        console.log('LinkedIn details:')
        console.log('  - Profile ID:', profile.linkedin_profile_id)
        console.log('  - Name:', profile.linkedin_first_name, profile.linkedin_last_name)
        console.log('  - Connected:', new Date(profile.linkedin_connected_at).toLocaleString())
        console.log('  - Has access token:', profile.linkedin_access_token ? 'Yes' : 'No')
        console.log('  - Token expires:', profile.linkedin_expires_at ? new Date(profile.linkedin_expires_at).toLocaleString() : 'N/A')
      }
    }
    console.log('---\n')
  }
}

checkUserProfiles().catch(console.error)