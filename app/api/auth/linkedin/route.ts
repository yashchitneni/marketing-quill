import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// LinkedIn OAuth configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
const LINKEDIN_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL + '/api/auth/linkedin/callback'

// LinkedIn OAuth scopes for posting and reading content
const SCOPES = [
  'w_member_social',  // Post on behalf of user
  'r_liteprofile',    // Read basic profile info
  'r_emailaddress'    // Read email (optional)
].join('%20')

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // Generate state parameter for security
  const state = crypto.randomUUID()
  
  // Store state in user session/database for verification
  await supabase
    .from('user_profiles')
    .upsert({
      user_id: user.id,
      linkedin_oauth_state: state
    }, {
      onConflict: 'user_id'
    })

  // LinkedIn OAuth URL
  const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization')
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('client_id', LINKEDIN_CLIENT_ID!)
  authUrl.searchParams.append('redirect_uri', LINKEDIN_REDIRECT_URI)
  authUrl.searchParams.append('state', state)
  authUrl.searchParams.append('scope', SCOPES)

  return NextResponse.redirect(authUrl.toString())
}