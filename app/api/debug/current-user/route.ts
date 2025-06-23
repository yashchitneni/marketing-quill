import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return NextResponse.json({ 
      authenticated: false,
      error: error?.message || 'Not authenticated' 
    }, { status: 401 })
  }
  
  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()
  
  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at
    },
    profile: profile ? {
      has_profile: true,
      linkedin_connected: !!profile.linkedin_profile_id,
      linkedin_profile_id: profile.linkedin_profile_id,
      linkedin_name: profile.linkedin_first_name && profile.linkedin_last_name 
        ? `${profile.linkedin_first_name} ${profile.linkedin_last_name}`
        : null,
      has_access_token: !!profile.linkedin_access_token,
      token_expires: profile.linkedin_expires_at
    } : {
      has_profile: false
    }
  })
}