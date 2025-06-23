import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// LinkedIn OAuth configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
const LINKEDIN_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL + '/api/auth/linkedin/callback'

// LinkedIn OAuth scopes for posting and reading content
// Using the new LinkedIn OAuth 2.0 scopes (as of 2024)
const SCOPES = [
  'openid',           // Required for OpenID Connect flow
  'profile',          // Read member's profile
  'email',            // Read member's email address
  'w_member_social'   // Post, comment and react on behalf of the authenticated member
].join(' ')

export async function GET(request: NextRequest) {
  // Check for required environment variables
  if (!LINKEDIN_CLIENT_ID) {
    console.error('LINKEDIN_CLIENT_ID is not set')
    return NextResponse.redirect(new URL('/settings?error=linkedin_config', request.url))
  }
  
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    console.error('NEXT_PUBLIC_APP_URL is not set')
    return NextResponse.redirect(new URL('/settings?error=app_url_config', request.url))
  }
  
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
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