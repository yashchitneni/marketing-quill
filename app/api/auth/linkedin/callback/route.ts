import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET
const LINKEDIN_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL + '/api/auth/linkedin/callback'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    console.error('LinkedIn OAuth error:', error)
    return NextResponse.redirect(new URL('/settings?error=linkedin_auth_failed', request.url))
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL('/settings?error=invalid_callback', request.url))
  }

  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // Verify state parameter
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('linkedin_oauth_state')
    .eq('user_id', user.id)
    .single()

  if (!profile || profile.linkedin_oauth_state !== state) {
    return NextResponse.redirect(new URL('/settings?error=invalid_state', request.url))
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: LINKEDIN_REDIRECT_URI,
        client_id: LINKEDIN_CLIENT_ID!,
        client_secret: LINKEDIN_CLIENT_SECRET!,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokens = await tokenResponse.json()

    // Get LinkedIn profile information
    const profileResponse = await fetch('https://api.linkedin.com/v2/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    })

    const linkedinProfile = await profileResponse.json()

    // Store LinkedIn connection in database
    await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        linkedin_access_token: tokens.access_token,
        linkedin_refresh_token: tokens.refresh_token || null,
        linkedin_expires_at: tokens.expires_in ? new Date(Date.now() + tokens.expires_in * 1000).toISOString() : null,
        linkedin_profile_id: linkedinProfile.id,
        linkedin_first_name: linkedinProfile.firstName?.localized?.en_US,
        linkedin_last_name: linkedinProfile.lastName?.localized?.en_US,
        linkedin_connected_at: new Date().toISOString(),
        linkedin_oauth_state: null, // Clear the state
      }, {
        onConflict: 'user_id'
      })

    // Redirect to settings with success message
    return NextResponse.redirect(new URL('/settings?success=linkedin_connected', request.url))

  } catch (error) {
    console.error('LinkedIn OAuth callback error:', error)
    return NextResponse.redirect(new URL('/settings?error=token_exchange_failed', request.url))
  }
}