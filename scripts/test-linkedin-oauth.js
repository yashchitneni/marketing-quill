// Test script to verify LinkedIn OAuth URL construction
require('dotenv').config({ path: '.env.local' })

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
const LINKEDIN_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL + '/api/auth/linkedin/callback'

// LinkedIn OAuth scopes - using the new scope format
const SCOPES = [
  'w_member_social',  // Post on behalf of user
  'r_liteprofile',    // Read basic profile info
  'r_emailaddress'    // Read email (optional)
].join(' ')

const state = 'test-state-12345'

// Build the OAuth URL
const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization')
authUrl.searchParams.append('response_type', 'code')
authUrl.searchParams.append('client_id', LINKEDIN_CLIENT_ID)
authUrl.searchParams.append('redirect_uri', LINKEDIN_REDIRECT_URI)
authUrl.searchParams.append('state', state)
authUrl.searchParams.append('scope', SCOPES)

console.log('LinkedIn OAuth URL:')
console.log(authUrl.toString())
console.log('\nDecoded scope parameter:')
console.log(decodeURIComponent(authUrl.searchParams.get('scope')))
console.log('\nExpected scopes:', SCOPES)