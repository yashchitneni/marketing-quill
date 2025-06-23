import { NextResponse } from 'next/server'

export async function GET() {
  const config = {
    clientId: process.env.LINKEDIN_CLIENT_ID ? 'Set ✅' : 'Missing ❌',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET ? 'Set ✅' : 'Missing ❌',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'Missing ❌',
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/linkedin/callback`,
    scopes: ['openid', 'profile', 'email', 'w_member_social'],
    authUrl: buildAuthUrl()
  }

  return NextResponse.json(config, { status: 200 })
}

function buildAuthUrl() {
  if (!process.env.LINKEDIN_CLIENT_ID || !process.env.NEXT_PUBLIC_APP_URL) {
    return 'Cannot build URL - missing config'
  }

  const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization')
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('client_id', process.env.LINKEDIN_CLIENT_ID)
  authUrl.searchParams.append('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/linkedin/callback`)
  authUrl.searchParams.append('state', 'debug-state-12345')
  authUrl.searchParams.append('scope', 'openid profile email w_member_social')
  
  return authUrl.toString()
}