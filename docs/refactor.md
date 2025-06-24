<file_map>
/Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill
├── app
│   ├── admin
│   │   └── page.tsx
│   ├── analytics
│   │   └── page.tsx
│   ├── api
│   │   ├── auth
│   │   │   └── linkedin
│   │   │       ├── callback
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   ├── debug
│   │   │   ├── current-user
│   │   │   │   └── route.ts
│   │   │   └── linkedin-config
│   │   │       └── route.ts
│   │   ├── health
│   │   │   └── route.ts
│   │   └── linkedin
│   │       ├── post
│   │       │   └── route.ts
│   │       ├── posts
│   │       │   └── route.ts
│   │       └── status
│   │           └── route.ts
│   ├── auth
│   │   ├── callback
│   │   │   └── route.ts
│   │   ├── login
│   │   │   ├── brand-buttons.tsx
│   │   │   ├── login-form.tsx
│   │   │   └── page.tsx
│   │   └── signup
│   │       ├── page.tsx
│   │       └── signup-form.tsx
│   ├── dashboard
│   │   ├── trash
│   │   │   └── page.tsx
│   │   ├── dashboard-content.tsx
│   │   └── page.tsx
│   ├── debug-edge
│   │   └── page.tsx
│   ├── editor
│   │   ├── [id]
│   │   │   └── page.tsx
│   │   └── new
│   │       └── page.tsx
│   ├── guides
│   │   └── linkedin-best-practices
│   │       └── page.tsx
│   ├── help
│   │   └── page.tsx
│   ├── onboarding
│   │   └── page.tsx
│   ├── settings
│   │   └── page.tsx
│   ├── templates
│   │   └── page.tsx
│   ├── test
│   │   └── page.tsx
│   ├── test-edge-direct
│   │   └── page.tsx
│   ├── test-edge-function
│   │   └── page.tsx
│   ├── test-local-grammar
│   │   └── page.tsx
│   ├── test-network
│   │   └── page.tsx
│   ├── test-render
│   │   └── page.tsx
│   ├── test-suggestions
│   │   └── page.tsx
│   ├── unauthorized
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components
    ├── admin
    │   └── admin-dashboard.tsx
    ├── auth
    │   └── role-guard.tsx
    ├── dashboard
    │   ├── dashboard-home.tsx
    │   ├── dashboard-layout.tsx
    │   ├── draft-card.tsx
    │   └── sidebar.tsx
    ├── editor
    │   ├── editor-header.tsx
    │   ├── editor-pane.tsx
    │   ├── editor-sidebar.tsx
    │   ├── editor-toolbar.tsx
    │   ├── formatted-preview.tsx
    │   ├── linkedin-optimization-panel.tsx
    │   ├── linkedin-post-button.tsx
    │   ├── save-indicator.tsx
    │   ├── spell-check-panel.tsx
    │   ├── spell-check-tooltip.tsx
    │   ├── suggestion-cards.tsx
    │   ├── suggestion-highlights.tsx
    │   ├── template-card.tsx
    │   ├── template-customizer.tsx
    │   └── template-modal.tsx
    ├── landing
    │   ├── features-section.tsx
    │   ├── footer.tsx
    │   ├── hero-section.tsx
    │   ├── navbar.tsx
    │   ├── pricing-section.tsx
    │   └── testimonials-section.tsx
    ├── layouts
    │   └── app-layout.tsx
    ├── providers
    │   └── auth-provider.tsx
    ├── settings
    │   └── data-privacy.tsx
    ├── ui
    │   ├── alert-dialog.tsx
    │   ├── alert.tsx
    │   ├── badge.tsx
    │   ├── button.tsx
    │   ├── card.tsx
    │   ├── dialog.tsx
    │   ├── dropdown-menu.tsx
    │   ├── form.tsx
    │   ├── input.tsx
    │   ├── label.tsx
    │   ├── popover.tsx
    │   ├── progress.tsx
    │   ├── scroll-area.tsx
    │   ├── select.tsx
    │   ├── separator.tsx
    │   ├── switch.tsx
    │   ├── tabs.tsx
    │   ├── textarea.tsx
    │   ├── toast.tsx
    │   ├── toaster.tsx
    │   └── tooltip.tsx
    └── test-suggestions.tsx

</file_map>

<file_contents>
File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/admin/page.tsx
```tsx
'use client'

import { AuthGuard } from '@/lib/security/auth-guard'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export default function AdminPage() {
  return (
    <AuthGuard requireAdmin={true}>
      <AdminDashboard />
    </AuthGuard>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/analytics/page.tsx
```tsx
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Eye, MessageSquare, Share2, ThumbsUp, BarChart3, Calendar, Clock } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold">Analytics</h1>
          </div>
          <p className="text-lg text-gray-600">
            Track your LinkedIn content performance and engagement metrics
          </p>
        </div>

        {/* Coming Soon Notice */}
        <Card className="mb-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">Analytics Dashboard Coming Soon!</CardTitle>
            <CardDescription className="text-green-700">
              We&apos;re building powerful analytics to help you understand what content resonates with your LinkedIn audience.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Preview of Analytics Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="opacity-75">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-400">--</div>
              <p className="text-xs text-gray-400 mt-1">Coming soon</p>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Engagement Rate</CardTitle>
                <ThumbsUp className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-400">--%</div>
              <p className="text-xs text-gray-400 mt-1">Coming soon</p>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Comments</CardTitle>
                <MessageSquare className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-400">--</div>
              <p className="text-xs text-gray-400 mt-1">Coming soon</p>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Shares</CardTitle>
                <Share2 className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-400">--</div>
              <p className="text-xs text-gray-400 mt-1">Coming soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Planned Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="opacity-75">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-gray-400" />
                <CardTitle>Post Performance Tracking</CardTitle>
              </div>
              <CardDescription>
                Monitor views, reactions, comments, and shares for each post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                • Individual post analytics<br/>
                • Engagement timeline<br/>
                • Audience demographics<br/>
                • Peak performance times
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <CardTitle>Best Time to Post</CardTitle>
              </div>
              <CardDescription>
                Discover when your audience is most active
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                • Day of week analysis<br/>
                • Hour-by-hour breakdown<br/>
                • Time zone optimization<br/>
                • Historical performance data
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-gray-400" />
                <CardTitle>Content Performance Insights</CardTitle>
              </div>
              <CardDescription>
                Understand what content drives engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                • Top performing topics<br/>
                • Optimal post length<br/>
                • Hashtag effectiveness<br/>
                • Content type comparison
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <CardTitle>Engagement Predictions</CardTitle>
              </div>
              <CardDescription>
                AI-powered predictions before you post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                • Expected reach<br/>
                • Engagement forecast<br/>
                • Optimization suggestions<br/>
                • A/B testing recommendations
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/api/auth/linkedin/callback/route.ts
```ts
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
  const errorDescription = searchParams.get('error_description')

  console.log('LinkedIn callback received:', {
    code: code ? 'present' : 'missing',
    state: state ? 'present' : 'missing',
    error,
    errorDescription,
    url: request.url
  })

  if (error) {
    console.error('LinkedIn OAuth error:', error, errorDescription)
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
      const errorText = await tokenResponse.text()
      console.error('Token exchange failed:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        error: errorText
      })
      throw new Error(`Failed to exchange code for token: ${tokenResponse.status} - ${errorText}`)
    }

    const tokens = await tokenResponse.json()

    // Get LinkedIn profile information using the new API endpoint
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    })

    if (!profileResponse.ok) {
      console.error('Failed to fetch LinkedIn profile:', await profileResponse.text())
      throw new Error('Failed to fetch LinkedIn profile')
    }

    const linkedinProfile = await profileResponse.json()

    // Store LinkedIn connection in database
    // The new userinfo endpoint returns: sub, name, given_name, family_name, picture, email, email_verified, locale
    await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        linkedin_access_token: tokens.access_token,
        linkedin_refresh_token: tokens.refresh_token || null,
        linkedin_expires_at: tokens.expires_in ? new Date(Date.now() + tokens.expires_in * 1000).toISOString() : null,
        linkedin_profile_id: linkedinProfile.sub, // 'sub' is the unique identifier
        linkedin_first_name: linkedinProfile.given_name || linkedinProfile.name?.split(' ')[0],
        linkedin_last_name: linkedinProfile.family_name || linkedinProfile.name?.split(' ').slice(1).join(' '),
        linkedin_connected_at: new Date().toISOString(),
        linkedin_oauth_state: null, // Clear the state
        email: linkedinProfile.email || user.email, // Update email if provided
        full_name: linkedinProfile.name,
        avatar_url: linkedinProfile.picture
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
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/api/auth/linkedin/route.ts
```ts
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
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/api/debug/current-user/route.ts
```ts
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
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/api/debug/linkedin-config/route.ts
```ts
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
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/api/health/route.ts
```ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    env: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  })
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/api/linkedin/post/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { linkedInAPI } from '@/lib/services/linkedin-api'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get request body
    const { content, draftId } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    // Post to LinkedIn
    const result = await linkedInAPI.postToLinkedIn(supabase, user.id, content)

    // Update draft status if provided
    if (draftId) {
      await supabase
        .from('drafts')
        .update({
          published_at: new Date().toISOString(),
          metadata: {
            linkedin_post_id: result.id,
            linkedin_activity: result.activity
          }
        })
        .eq('id', draftId)
        .eq('user_id', user.id)
    }

    // Store post in our database for analytics
    await supabase
      .from('linkedin_posts')
      .insert({
        user_id: user.id,
        linkedin_post_id: result.id,
        content: content,
        posted_at: new Date().toISOString()
      })

    return NextResponse.json({
      success: true,
      postId: result.id,
      activity: result.activity
    })

  } catch (error) {
    console.error('LinkedIn post error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to post to LinkedIn' },
      { status: 500 }
    )
  }
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/api/linkedin/posts/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { linkedInAPI } from '@/lib/services/linkedin-api'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const count = parseInt(searchParams.get('count') || '10')

    // Fetch user's LinkedIn posts
    const posts = await linkedInAPI.getUserPosts(supabase, user.id, count)

    // Process and store posts for voice analysis
    const processedPosts = posts.map(post => ({
      id: post.id,
      content: post.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary?.text || '',
      created: post.created?.time ? new Date(post.created.time) : null,
      visibility: post.visibility?.['com.linkedin.ugc.MemberNetworkVisibility'] || 'UNKNOWN'
    }))

    return NextResponse.json({
      posts: processedPosts,
      count: processedPosts.length
    })

  } catch (error) {
    console.error('LinkedIn get posts error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch LinkedIn posts' },
      { status: 500 }
    )
  }
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/api/linkedin/status/route.ts
```ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { linkedInAPI } from '@/lib/services/linkedin-api'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if LinkedIn is connected
    const isConnected = await linkedInAPI.isConnected(supabase, user.id)

    if (isConnected) {
      // Get profile info if connected
      try {
        const profile = await linkedInAPI.getProfile(supabase, user.id)
        
        return NextResponse.json({
          connected: true,
          profile: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            profilePicture: profile.profilePicture
          }
        })
      } catch {
        // Token might be invalid
        return NextResponse.json({
          connected: false,
          error: 'Invalid or expired token'
        })
      }
    }

    return NextResponse.json({
      connected: false
    })

  } catch (error) {
    console.error('LinkedIn status error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to check LinkedIn status' },
      { status: 500 }
    )
  }
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/auth/callback/route.ts
```ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Error exchanging code for session:', error.message)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }
    
    // Session should be established at this point
    const { data: { user } } = await supabase.auth.getUser()
    console.log('User authenticated:', user?.id)
    
    if (user) {
      // Check if user profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', user.id)
        .single()
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError.message)
      }
      
      // If profile doesn't exist or onboarding not completed, redirect to onboarding
      if (!profile || !profile.onboarding_completed) {
        console.log('Redirecting to onboarding')
        return NextResponse.redirect(`${origin}/onboarding`)
      }
      
      // Otherwise, proceed with the original redirect
      console.log('Redirecting to:', next)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If we get here, something went wrong
  console.error('Auth callback failed: No code or user')
  return NextResponse.redirect(`${origin}/auth/login?error=callback_failed`)
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/auth/login/brand-buttons.tsx
```tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Chrome } from 'lucide-react'

interface BrandButtonsProps {
  onGoogleSignIn: () => void
  isLoading: boolean
}

export function BrandButtons({ onGoogleSignIn, isLoading }: BrandButtonsProps) {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={onGoogleSignIn}
        disabled={isLoading}
      >
        <Chrome className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </>
  )
} 
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/auth/login/login-form.tsx
```tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Loader2, AlertCircle } from 'lucide-react'
import { sanitizeEmail } from '@/lib/security/sanitization'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BrandButtons } from './brand-buttons'

const formSchema = z.object({
  email: z.string()
    .email({
      message: "Please enter a valid email address.",
    })
    .transform((email) => {
      try {
        return sanitizeEmail(email)
      } catch {
        return email
      }
    }),
})

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, signInWithGoogle, isLoading, user } = useAuthStore()
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  // const next = searchParams.get('next') || '/dashboard'

  // Check for error parameter in URL
  useEffect(() => {
    const urlError = searchParams.get('error')
    if (urlError) {
      setError(
        urlError === 'callback_failed' 
          ? 'Authentication failed. Please try again.' 
          : urlError
      )
    }
  }, [searchParams])

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setMessage('')
    setError(null)
    
    try {
      const { error } = await signIn(values.email)
      
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email for the login link!')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Login error:', err)
    }
  }

  async function handleGoogleSignIn() {
    setMessage('')
    setError(null)
    
    try {
      console.log('Starting Google sign-in flow...')
      const { error } = await signInWithGoogle()
      
      if (error) {
        setError(error.message)
        console.error('Google sign-in error:', error)
      }
    } catch (err) {
      setError('An unexpected error occurred with Google sign-in. Please try again.')
      console.error('Google sign-in unexpected error:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to MarketingQuill</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {message && (
                <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
              )}
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending magic link...
                  </>
                ) : (
                  'Send magic link'
                )}
              </Button>
            </form>
          </Form>

          <BrandButtons onGoogleSignIn={handleGoogleSignIn} isLoading={isLoading} />

        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/auth/login/page.tsx
```tsx
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import LoginForm from './login-form'

// Loading component for Suspense fallback
function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  )
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/auth/signup/page.tsx
```tsx
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import SignupForm from './signup-form'

function SignupLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupLoading />}>
      <SignupForm />
    </Suspense>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/auth/signup/signup-form.tsx
```tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Loader2, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BrandButtons } from '../login/brand-buttons'

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function SignupForm() {
  const router = useRouter()
  const { signIn, signInWithGoogle, isLoading, user } = useAuthStore()
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setMessage('')
    setError(null)
    
    try {
      const { error } = await signIn(values.email)
      
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email for the login link!')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Signup error:', err)
    }
  }

  async function handleGoogleSignIn() {
    setMessage('')
    setError(null)
    
    try {
      const { error } = await signInWithGoogle()
      
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError('An unexpected error occurred with Google sign-in. Please try again.')
      console.error('Google sign-in unexpected error:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Get started with MarketingQuill today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {message && (
                <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
              )}
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending magic link...
                  </>
                ) : (
                  'Sign up with magic link'
                )}
              </Button>
            </form>
          </Form>

          <BrandButtons onGoogleSignIn={handleGoogleSignIn} isLoading={isLoading} />

        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Already have an account?{' '}
            <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
} 
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/dashboard/trash/page.tsx
```tsx
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default function TrashPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Trash</h1>
        <p className="text-gray-600 mt-1">Manage your deleted drafts</p>
      </div>
    </DashboardLayout>
  )
} 
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/dashboard/dashboard-content.tsx
```tsx
'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth-store'
import { createClient } from '@/lib/supabase/client'
import { DraftCard } from '@/components/dashboard/draft-card'
import { DashboardHome } from '@/components/dashboard/dashboard-home'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Plus, Search, Filter, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Draft {
  id: string
  title: string
  content?: string
  channel?: string
  optimization_score: number
  status: string
  updated_at: string
  created_at: string
  content_preview?: string
}

const ITEMS_PER_PAGE = 20

interface DashboardContentProps {
  initialDrafts?: Draft[]
  initialTotalCount?: number
}

export default function DashboardContent({ 
  initialDrafts = [], 
  initialTotalCount = 0 
}: DashboardContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isInitialized } = useAuthStore()
  const [drafts, setDrafts] = useState<Draft[]>(initialDrafts)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(initialDrafts.length === 0)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'updated_at')
  const [filterChannel, setFilterChannel] = useState(searchParams.get('channel') || 'all')
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'))
  const [totalCount, setTotalCount] = useState(initialTotalCount)
  
  const status = searchParams.get('status')
  const isHomePage = !status && !searchParams.get('channel') && !searchParams.get('sort') && !searchParams.get('page')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const fetchDrafts = useCallback(async (page: number) => {
    if (!user?.id) return
    
    setIsLoading(true)
    const supabase = createClient()
    
    // Calculate range for pagination
    const from = (page - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE - 1
    
    // Build the query - include content in the initial query
    let query = supabase
      .from('drafts')
      .select('id, title, channel, optimization_score, status, updated_at, created_at, content', { count: 'exact' })
      .eq('user_id', user.id)
    
    // Apply status filter
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    
    // Apply channel filter
    if (filterChannel !== 'all') {
      query = query.eq('channel', filterChannel)
    }
    
    // Apply sorting
    if (sortBy === 'updated_at') {
      query = query.order('updated_at', { ascending: false })
    } else if (sortBy === 'created_at') {
      query = query.order('created_at', { ascending: false })
    } else if (sortBy === 'title') {
      query = query.order('title', { ascending: true })
    } else if (sortBy === 'score') {
      query = query.order('optimization_score', { ascending: false })
    }
    
    // Apply pagination
    query = query.range(from, to)
    
    const { data, error, count } = await query
    
    if (!error && data) {
      // Process content previews in memory (no additional queries!)
      const draftsWithPreview = data.map(draft => ({
        ...draft,
        content_preview: draft.content ? draft.content.substring(0, 150) : '',
        content: undefined // Remove full content to save memory
      }))
      
      setDrafts(draftsWithPreview)
      setTotalCount(count || 0)
      setIsInitialLoad(false)
    }
    setIsLoading(false)
  }, [user?.id, status, filterChannel, sortBy])

  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/auth/login')
    }
  }, [isInitialized, user, router])

  useEffect(() => {
    if (user) {
      setCurrentPage(1)
      fetchDrafts(1)
    }
  }, [user, status, sortBy, filterChannel, fetchDrafts])

  useEffect(() => {
    if (user && currentPage > 1) {
      fetchDrafts(currentPage)
    }
  }, [user, currentPage, fetchDrafts])


  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await supabase.from('drafts').delete().eq('id', id)
    fetchDrafts(currentPage)
  }

  const handleArchive = async (id: string) => {
    const supabase = createClient()
    await supabase
      .from('drafts')
      .update({ status: 'archived' })
      .eq('id', id)
    fetchDrafts(currentPage)
  }

  const handleDuplicate = async (id: string) => {
    const supabase = createClient()
    
    // Fetch the full draft in one query
    const { data: fullDraft, error: fetchError } = await supabase
      .from('drafts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (fetchError || !fullDraft) return
    
    const { error } = await supabase
      .from('drafts')
      .insert({
        user_id: user?.id,
        title: `${fullDraft.title} (Copy)`,
        content: fullDraft.content || '',
        channel: fullDraft.channel,
        optimization_score: 0
      })
    
    if (!error) {
      fetchDrafts(currentPage)
    }
  }

  // Memoize filtered drafts to prevent unnecessary recalculations
  const filteredDrafts = useMemo(() => {
    if (!debouncedSearchQuery) return drafts
    
    return drafts.filter(draft => 
      draft.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      draft.content_preview?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
  }, [drafts, debouncedSearchQuery])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
  const canGoBack = currentPage > 1
  const canGoForward = currentPage < totalPages

  if (!isInitialized || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Show home page if no filters are applied
  if (isHomePage) {
    return <DashboardHome />
  }

  return (
    <div className="p-8">
      {/* Back Button for filtered views */}
      {(status || filterChannel !== 'all') && (
        <Link href="/dashboard" className="inline-block mb-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      )}
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {status === 'published' ? 'Published Posts' : 
             status === 'archived' ? 'Archived Posts' : 
             'All LinkedIn Posts'}
          </h1>
          <p className="text-gray-600 mt-1">
            {status === 'published' ? 'Your published LinkedIn content' : 
             status === 'archived' ? 'Posts you\'ve archived' : 
             'Create and manage your LinkedIn content'}
          </p>
        </div>
        <Link href="/editor/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search drafts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select 
            value={filterChannel} 
            onValueChange={(value) => {
              setFilterChannel(value)
              const params = new URLSearchParams(searchParams)
              params.set('channel', value)
              router.push(`/dashboard?${params.toString()}`)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All channels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="linkedin">LinkedIn Post</SelectItem>
              <SelectItem value="article">LinkedIn Article</SelectItem>
              <SelectItem value="newsletter">Newsletter</SelectItem>
              <SelectItem value="poll">Poll</SelectItem>
              <SelectItem value="event">Event Post</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={sortBy} 
            onValueChange={(value) => {
              setSortBy(value)
              const params = new URLSearchParams(searchParams)
              params.set('sort', value)
              router.push(`/dashboard?${params.toString()}`)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated_at">Last modified</SelectItem>
              <SelectItem value="created_at">Date created</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="score">Optimization score</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      {(isLoading && isInitialLoad) ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : filteredDrafts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {searchQuery ? (
              'No posts found matching your search.'
            ) : status === 'published' ? (
              "You haven't published any posts yet."
            ) : status === 'archived' ? (
              "You haven't archived any posts yet."
            ) : (
              "You haven't created any posts yet."
            )}
          </p>
          {!searchQuery && (
            <Link href="/editor/new">
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                {status === 'published' ? 'Create & Publish Post' : 'Create New Post'}
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="relative">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDrafts.map((draft) => (
              <DraftCard
                key={draft.id}
                draft={draft}
                onDelete={handleDelete}
                onArchive={handleArchive}
                onDuplicate={handleDuplicate}
              />
            ))}
          </div>
          
          {/* Loading overlay for subsequent loads */}
          {isLoading && !isInitialLoad && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} drafts
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newPage = currentPage - 1
                    setCurrentPage(newPage)
                    const params = new URLSearchParams(searchParams)
                    params.set('page', newPage.toString())
                    router.push(`/dashboard?${params.toString()}`)
                  }}
                  disabled={!canGoBack}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="text-sm px-4">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newPage = currentPage + 1
                    setCurrentPage(newPage)
                    const params = new URLSearchParams(searchParams)
                    params.set('page', newPage.toString())
                    router.push(`/dashboard?${params.toString()}`)
                  }}
                  disabled={!canGoForward}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/dashboard/page.tsx
```tsx
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import DashboardContent from './dashboard-content'

// Loading component for Suspense fallback
function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}

interface DashboardPageProps {
  searchParams: Promise<{
    status?: string
    channel?: string
    sort?: string
    page?: string
  }>
}

async function getInitialDrafts(userId: string, searchParams: Awaited<DashboardPageProps['searchParams']>) {
  const supabase = await createClient()
  const ITEMS_PER_PAGE = 20
  const page = parseInt(searchParams.page || '1')
  const from = (page - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1
  
  // Fetch all data including content in ONE query
  let query = supabase
    .from('drafts')
    .select('id, title, channel, optimization_score, status, updated_at, created_at, content, published_at, linkedin_url', { count: 'exact' })
    .eq('user_id', userId)
  
  // Apply filters
  if (searchParams.status && searchParams.status !== 'all') {
    if (searchParams.status === 'published') {
      query = query.not('published_at', 'is', null)
    } else if (searchParams.status === 'draft') {
      query = query.is('published_at', null)
    } else {
      query = query.eq('status', searchParams.status)
    }
  }
  
  if (searchParams.channel && searchParams.channel !== 'all') {
    query = query.eq('channel', searchParams.channel)
  }
  
  // Apply sorting
  const sortBy = searchParams.sort || 'updated_at'
  if (sortBy === 'updated_at') {
    query = query.order('updated_at', { ascending: false })
  } else if (sortBy === 'created_at') {
    query = query.order('created_at', { ascending: false })
  } else if (sortBy === 'title') {
    query = query.order('title', { ascending: true })
  } else if (sortBy === 'score') {
    query = query.order('optimization_score', { ascending: false })
  }
  
  // Apply pagination
  query = query.range(from, to)
  
  const { data, count, error } = await query
  
  if (error) {
    console.error('Error fetching drafts:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    })
    return { drafts: [], totalCount: 0 }
  }
  
  // Process content previews in memory (much faster than N+1 queries)
  const draftsWithPreview = data?.map(draft => ({
    ...draft,
    content_preview: draft.content ? draft.content.substring(0, 150) : '',
    content: undefined // Remove full content from response to save memory
  })) || []
  
  return { drafts: draftsWithPreview, totalCount: count || 0 }
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  const resolvedSearchParams = await searchParams
  const { drafts, totalCount } = await getInitialDrafts(user.id, resolvedSearchParams)
  
  return (
    <DashboardLayout>
      <Suspense fallback={<DashboardLoading />}>
        <DashboardContent initialDrafts={drafts} initialTotalCount={totalCount} />
      </Suspense>
    </DashboardLayout>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/debug-edge/page.tsx
```tsx
'use client'

import { TestSuggestions } from '@/components/test-suggestions'

export default function DebugEdgePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Debug Edge Function</h1>
      <TestSuggestions />
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/editor/[id]/page.tsx
```tsx
'use client'

import { useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useEditorStore } from '@/lib/stores/editor-store'
import { EditorHeader } from '@/components/editor/editor-header'
import { EditorPane } from '@/components/editor/editor-pane'
import { EditorSidebar } from '@/components/editor/editor-sidebar'
import { AppLayout } from '@/components/layouts/app-layout'
import { Loader2 } from 'lucide-react'

type Params = Promise<{ id: string }>

export default function EditorPage({ params }: { params: Params }) {
  const router = useRouter()
  const { user, isInitialized } = useAuthStore()
  const { loadDraft, reset, createSnapshot } = useEditorStore()
  const resolvedParams = use(params)

  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/auth/login')
    }
  }, [isInitialized, user, router])

  useEffect(() => {
    if (user && resolvedParams.id) {
      loadDraft(resolvedParams.id)
      // Try to create a daily snapshot when loading
      createSnapshot()
    }

    return () => {
      reset()
    }
  }, [resolvedParams.id, user, loadDraft, reset, createSnapshot])

  // Real-time auto-save is now handled in the editor store
  // No need for interval-based saving

  // Save on unmount or before unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const { isDirty } = useEditorStore.getState()
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // Save on unmount
      const { isDirty, save } = useEditorStore.getState()
      if (isDirty) {
        save()
      }
    }
  }, [])

  if (!isInitialized || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <AppLayout fullWidth>
      <div className="h-full flex flex-col bg-gray-100">
        <EditorHeader />
        <div className="flex-1 flex overflow-hidden">
          <EditorPane />
          <EditorSidebar />
        </div>
      </div>
    </AppLayout>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/editor/new/page.tsx
```tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function NewEditorPage() {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  // Create a new draft - try without channel first
  const { data, error } = await supabase
    .from('drafts')
    .insert({
      user_id: user.id,
      title: 'Untitled LinkedIn Post',
      content: '',
      optimization_score: 0,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating draft:', JSON.stringify(error, null, 2))
    // Provide more context about the error
    console.error('User ID:', user.id)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    })
    redirect('/dashboard')
  }
  
  if (!data) {
    console.error('No data returned from draft creation')
    redirect('/dashboard')
  }
  
  // Redirect to the editor with the new draft ID
  redirect(`/editor/${data.id}`)
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/guides/linkedin-best-practices/page.tsx
```tsx
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, BookOpen, Target, TrendingUp, Clock, Hash, Image, FileText } from 'lucide-react'
import Link from 'next/link'

export default function LinkedInBestPracticesPage() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold">LinkedIn Best Practices Guide</h1>
          </div>
          <p className="text-lg text-gray-600">
            Master the art of LinkedIn content creation with these proven strategies
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Writing Effective Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Writing Effective LinkedIn Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Hook Your Readers</h3>
                <p className="text-gray-600 mb-2">
                  The first 2-3 lines are crucial - they determine whether someone clicks &quot;see more&quot;
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm"><strong>Good:</strong> &quot;I made a $50K mistake yesterday. Here&apos;s what I learned...&quot;</p>
                  <p className="text-sm mt-2"><strong>Bad:</strong> &quot;Today I want to share some thoughts about business...&quot;</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Use Line Breaks Strategically</h3>
                <p className="text-gray-600">
                  Keep paragraphs short (1-2 lines) for better mobile readability. White space is your friend.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Tell Stories</h3>
                <p className="text-gray-600">
                  Personal stories and experiences get 3x more engagement than generic advice.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. End with Engagement</h3>
                <p className="text-gray-600">
                  Always end with a question or call-to-action to encourage comments.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Optimal Posting Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Best Times to Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Weekdays</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Tuesday - Thursday: Best days</li>
                    <li>• 7:45 AM - 8:45 AM</li>
                    <li>• 12:00 PM - 1:00 PM</li>
                    <li>• 5:00 PM - 6:00 PM</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Avoid</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Monday mornings</li>
                    <li>• Friday afternoons</li>
                    <li>• Weekends (lower B2B engagement)</li>
                    <li>• Late nights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hashtag Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Hashtag Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600">Use 3-5 relevant hashtags per post for optimal reach.</p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Hashtag Mix Formula:</p>
                <ul className="space-y-1 text-sm">
                  <li>• 1-2 Broad hashtags (#leadership, #marketing)</li>
                  <li>• 1-2 Niche hashtags (#B2BSaaS, #TechStartups)</li>
                  <li>• 1 Branded/Personal hashtag</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Content Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                High-Performing Content Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">How-to Posts</h4>
                    <p className="text-sm text-gray-600">Step-by-step guides and tutorials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Industry Insights</h4>
                    <p className="text-sm text-gray-600">Trends, predictions, and analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Personal Stories</h4>
                    <p className="text-sm text-gray-600">Failures, learnings, and victories</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold">Contrarian Views</h4>
                    <p className="text-sm text-gray-600">Challenge common beliefs respectfully</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Visual Content Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600">Posts with images get 2x more engagement.</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Use high-quality, relevant images</li>
                <li>• Infographics perform exceptionally well</li>
                <li>• Carousel posts can get 3x more reach</li>
                <li>• Native video gets highest engagement</li>
                <li>• Always add alt text for accessibility</li>
              </ul>
            </CardContent>
          </Card>

          {/* Algorithm Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                LinkedIn Algorithm Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Dwell Time is Key</p>
                <p className="text-sm">The algorithm favors posts that keep people on the platform longer.</p>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Respond to comments within the first hour</li>
                <li>• Ask questions that spark discussion</li>
                <li>• Edit posts sparingly (edits can reduce reach)</li>
                <li>• Avoid external links in the main post</li>
                <li>• Post consistently (3-5 times per week)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="/dashboard">
            <Button size="lg">
              Start Writing Better Posts
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/help/page.tsx
```tsx
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Help</h1>
        <p className="text-gray-600 mt-1">Get help and support</p>
      </div>
    </DashboardLayout>
  )
} 
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/onboarding/page.tsx
```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRole } from '@/lib/hooks/use-role'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Building2, FileText, Target, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface BrandVoice {
  companyName: string
  industry: string
  targetAudience: string
  tonePreferences: string[]
  sampleContent: string
}

const toneOptions = [
  'Professional', 'Friendly', 'Conversational', 'Authoritative',
  'Inspirational', 'Educational', 'Casual', 'Technical',
  'Urgent', 'Empathetic', 'Witty', 'Formal'
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useRole()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [brandVoice, setBrandVoice] = useState<BrandVoice>({
    companyName: '',
    industry: '',
    targetAudience: '',
    tonePreferences: [],
    sampleContent: ''
  })

  const handleToneToggle = (tone: string) => {
    setBrandVoice(prev => ({
      ...prev,
      tonePreferences: prev.tonePreferences.includes(tone)
        ? prev.tonePreferences.filter(t => t !== tone)
        : [...prev.tonePreferences, tone]
    }))
  }

  const handleComplete = async () => {
    setIsLoading(true)
    const supabase = createClient()
    
    // Save brand voice to user profile
    const { error } = await supabase
      .from('profiles')
      .update({
        brand_voice: brandVoice,
        onboarding_completed: true
      })
      .eq('id', user?.id)
    
    if (!error) {
      router.push('/dashboard')
    }
    setIsLoading(false)
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-4">
      <div className="max-w-3xl mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to MarketingQuill!</h1>
          <p className="text-gray-600">Let&apos;s set up your brand voice to get personalized suggestions</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Brand Voice Setup</CardTitle>
              <Badge variant="outline">Step {currentStep} of 3</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={currentStep.toString()} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="1" onClick={() => setCurrentStep(1)}>
                  <Building2 className="h-4 w-4 mr-2" />
                  Company Info
                </TabsTrigger>
                <TabsTrigger value="2" onClick={() => setCurrentStep(2)}>
                  <Target className="h-4 w-4 mr-2" />
                  Tone & Audience
                </TabsTrigger>
                <TabsTrigger value="3" onClick={() => setCurrentStep(3)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Sample Content
                </TabsTrigger>
              </TabsList>

              <TabsContent value="1" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Acme Corp"
                    value={brandVoice.companyName}
                    onChange={(e) => setBrandVoice(prev => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="SaaS, E-commerce, FinTech, etc."
                    value={brandVoice.industry}
                    onChange={(e) => setBrandVoice(prev => ({ ...prev, industry: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Textarea
                    id="audience"
                    placeholder="Marketing managers at mid-size B2B SaaS companies..."
                    value={brandVoice.targetAudience}
                    onChange={(e) => setBrandVoice(prev => ({ ...prev, targetAudience: e.target.value }))}
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="2" className="space-y-4 mt-6">
                <div>
                  <Label>Preferred Tone (select up to 4)</Label>
                  <CardDescription className="mb-3">
                    Choose the tones that best represent your brand voice
                  </CardDescription>
                  <div className="grid grid-cols-3 gap-3">
                    {toneOptions.map((tone) => (
                      <Button
                        key={tone}
                        variant={brandVoice.tonePreferences.includes(tone) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleToneToggle(tone)}
                        disabled={!brandVoice.tonePreferences.includes(tone) && brandVoice.tonePreferences.length >= 4}
                      >
                        {tone}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="3" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="sample">Sample Content (Optional)</Label>
                  <CardDescription className="mb-3">
                    Paste a sample of your existing marketing copy to help us understand your style
                  </CardDescription>
                  <Textarea
                    id="sample"
                    placeholder="Paste your best-performing email, landing page copy, or any content that represents your brand voice..."
                    value={brandVoice.sampleContent}
                    onChange={(e) => setBrandVoice(prev => ({ ...prev, sampleContent: e.target.value }))}
                    rows={8}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={handleSkip}
              >
                Skip for now
              </Button>
              
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleComplete}
                    disabled={isLoading}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Complete Setup
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/settings/page.tsx
```tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { 
  Settings, 
  User, 
  Linkedin, 
  Bot,
  ExternalLink,
  CheckCircle
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/auth-store'

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const [linkedinConnected, setLinkedinConnected] = useState(false)
  const [linkedinProfile, setLinkedinProfile] = useState<any>(null)
  const [voiceProfileSetup, setVoiceProfileSetup] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const user = useAuthStore(state => state.user)

  useEffect(() => {
    // Check for error messages
    const errorParam = searchParams.get('error')
    const successParam = searchParams.get('success')
    
    if (errorParam === 'linkedin_config') {
      setError('LinkedIn integration is not configured. Please contact support.')
    } else if (errorParam === 'app_url_config') {
      setError('Application URL is not configured. Please contact support.')
    } else if (errorParam === 'invalid_callback') {
      setError('LinkedIn authentication failed. Please try again.')
    } else if (errorParam === 'token_exchange_failed') {
      setError('Failed to connect LinkedIn. Please try again.')
    }
    
    if (successParam === 'linkedin_connected') {
      setSuccess('LinkedIn connected successfully!')
      // Clear the success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000)
    }
  }, [searchParams])
  
  // Check LinkedIn connection status
  useEffect(() => {
    const checkLinkedInStatus = async () => {
      if (!user) return
      
      const supabase = createClient()
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('linkedin_profile_id, linkedin_connected_at, linkedin_first_name, linkedin_last_name, avatar_url')
        .eq('user_id', user.id)
        .single()
      
      if (profile?.linkedin_profile_id) {
        setLinkedinConnected(true)
        setLinkedinProfile(profile)
      }
    }
    
    checkLinkedInStatus()
  }, [user, searchParams]) // Re-check when searchParams change (after redirect)

  const handleLinkedInConnect = () => {
    // Start LinkedIn OAuth flow
    window.location.href = '/api/auth/linkedin'
  }

  const handleVoiceProfileSetup = () => {
    // TODO: Navigate to voice profile setup flow
    console.log('Starting voice profile setup...')
  }
  
  const handleLinkedInDisconnect = async () => {
    if (!user) return
    
    const supabase = createClient()
    const { error } = await supabase
      .from('user_profiles')
      .update({
        linkedin_access_token: null,
        linkedin_refresh_token: null,
        linkedin_expires_at: null,
        linkedin_profile_id: null,
        linkedin_first_name: null,
        linkedin_last_name: null,
        linkedin_connected_at: null,
        linkedin_oauth_state: null
      })
      .eq('user_id', user.id)
    
    if (!error) {
      setLinkedinConnected(false)
      setLinkedinProfile(null)
      setSuccess('LinkedIn disconnected successfully')
      setTimeout(() => setSuccess(null), 5000)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="h-8 w-8" />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your account, LinkedIn connection, and writing preferences
          </p>
        </div>

        <Tabs defaultValue="linkedin" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            <TabsTrigger value="voice">Voice Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* LinkedIn Integration */}
          <TabsContent value="linkedin" className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p className="text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                <p className="text-sm">{success}</p>
              </div>
            )}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                  LinkedIn Integration
                </CardTitle>
                <CardDescription>
                  Connect your LinkedIn account to enable direct posting and voice analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${linkedinConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div>
                      <p className="font-medium">
                        {linkedinConnected ? 'LinkedIn Connected' : 'LinkedIn Not Connected'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {linkedinConnected 
                          ? 'You can post directly and we can analyze your existing content' 
                          : 'Connect to enable direct posting and voice analysis'
                        }
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleLinkedInConnect}
                    variant={linkedinConnected ? "outline" : "default"}
                  >
                    {linkedinConnected ? 'Reconnect' : 'Connect LinkedIn'}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {linkedinConnected && (
                  <div className="space-y-4">
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Connected Account</h3>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {linkedinProfile?.avatar_url ? (
                          <img 
                            src={linkedinProfile.avatar_url} 
                            alt="Profile" 
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">
                            {linkedinProfile?.linkedin_first_name && linkedinProfile?.linkedin_last_name
                              ? `${linkedinProfile.linkedin_first_name} ${linkedinProfile.linkedin_last_name}`
                              : 'LinkedIn User'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Connected {linkedinProfile?.linkedin_connected_at 
                              ? new Date(linkedinProfile.linkedin_connected_at).toLocaleDateString()
                              : 'recently'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Permissions</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Post to LinkedIn on your behalf</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Read your existing LinkedIn posts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Access basic profile information</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleLinkedInDisconnect}
                        variant="destructive"
                        size="sm"
                      >
                        Disconnect LinkedIn
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Voice Profile */}
          <TabsContent value="voice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Voice Profile
                </CardTitle>
                <CardDescription>
                  Configure your unique writing style for personalized suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${voiceProfileSetup ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div>
                      <p className="font-medium">
                        {voiceProfileSetup ? 'Voice Profile Complete' : 'Voice Profile Not Set Up'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {voiceProfileSetup 
                          ? 'Your writing style has been analyzed and configured' 
                          : 'Set up your voice profile for personalized suggestions'
                        }
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleVoiceProfileSetup}>
                    {voiceProfileSetup ? 'Update Profile' : 'Set Up Voice Profile'}
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="writing-style">Writing Style Preferences</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Professional', 'Conversational', 'Thought Leader', 'Storyteller', 'Data-Driven', 'Motivational'].map((style) => (
                        <Button key={style} variant="outline" size="sm" className="justify-start">
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="writing-goals">Writing Goals</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Build Authority', 'Generate Leads', 'Share Knowledge', 'Network Building', 'Personal Branding', 'Thought Leadership'].map((goal) => (
                        <Button key={goal} variant="outline" size="sm" className="justify-start">
                          {goal}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="sample-content">Sample Content (Optional)</Label>
                    <Textarea 
                      id="sample-content"
                      placeholder="Paste a few of your favorite LinkedIn posts here to help us understand your voice..."
                      className="mt-2"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This helps us understand your unique voice and style
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Writing Preferences</CardTitle>
                <CardDescription>
                  Customize how suggestions and optimizations work for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Real-time suggestions</Label>
                    <p className="text-sm text-gray-500">
                      Get suggestions as you type
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Hook generation</Label>
                    <p className="text-sm text-gray-500">
                      Auto-generate compelling opening lines
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Engagement predictions</Label>
                    <p className="text-sm text-gray-500">
                      Show predicted engagement scores
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>LinkedIn formatting</Label>
                    <p className="text-sm text-gray-500">
                      Auto-format for LinkedIn best practices
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div>
                  <Label>Suggestion aggressiveness</Label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">Conservative</Button>
                    <Button variant="default" size="sm">Balanced</Button>
                    <Button variant="outline" size="sm">Aggressive</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    How many suggestions to show
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your account details and subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Subscription</h3>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Free Plan</p>
                      <p className="text-sm text-gray-500">50 suggestions per month</p>
                    </div>
                    <Button variant="outline">Upgrade</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/templates/page.tsx
```tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Search, Sparkles, Star, Clock, Plus, ArrowRight } from 'lucide-react'
import { linkedInTemplates, templateCategories, getTemplatesByCategory, getViralTemplates } from '@/lib/data/linkedin-templates'
import { useTemplatesStore } from '@/lib/stores/templates-store'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/auth-store'

export default function TemplatesPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTemplates, setFilteredTemplates] = useState(linkedInTemplates)
  const { favoriteTemplateIds, recentTemplateIds, toggleFavorite, trackTemplateUsage } = useTemplatesStore()

  useEffect(() => {
    // Filter templates based on category and search
    let templates = selectedCategory === 'all' 
      ? linkedInTemplates 
      : selectedCategory === 'viral'
      ? getViralTemplates()
      : selectedCategory === 'favorites'
      ? linkedInTemplates.filter(t => favoriteTemplateIds.includes(t.id))
      : selectedCategory === 'recent'
      ? linkedInTemplates.filter(t => recentTemplateIds.includes(t.id))
      : getTemplatesByCategory(selectedCategory)
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      templates = templates.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      )
    }
    
    setFilteredTemplates(templates)
  }, [selectedCategory, searchQuery, favoriteTemplateIds, recentTemplateIds])

  const handleUseTemplate = async (template: typeof linkedInTemplates[0]) => {
    try {
      // Track usage
      await trackTemplateUsage(template.id)
      
      // Create a new draft with the template
      const supabase = createClient()
      const { data, error } = await supabase
        .from('drafts')
        .insert({
          user_id: user?.id,
          title: template.title,
          content: template.template,
          optimization_score: 0,
          metadata: {
            templateId: template.id,
            templateCategory: template.category
          }
        })
        .select()
        .single()
      
      if (error) {
        console.error('Error creating draft:', error)
        return
      }
      
      if (data) {
        router.push(`/editor/${data.id}`)
      }
    } catch (error) {
      console.error('Error using template:', error)
    }
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = templateCategories.find(c => c.id === categoryId)
    return category?.icon || '📝'
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">LinkedIn Templates</h1>
          </div>
          <p className="text-lg text-gray-600">
            Start with proven templates that drive engagement on LinkedIn
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="flex flex-wrap h-auto p-1 gap-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-100">
              All Templates ({linkedInTemplates.length})
            </TabsTrigger>
            <TabsTrigger value="viral" className="data-[state=active]:bg-blue-100">
              <Sparkles className="h-4 w-4 mr-1" />
              Viral ({getViralTemplates().length})
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-blue-100">
              <Star className="h-4 w-4 mr-1" />
              Favorites ({favoriteTemplateIds.length})
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-blue-100">
              <Clock className="h-4 w-4 mr-1" />
              Recent ({recentTemplateIds.length})
            </TabsTrigger>
            {templateCategories.map(cat => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="data-[state=active]:bg-blue-100"
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id}
              className="hover:shadow-lg transition-shadow flex flex-col"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                    <Badge variant="secondary" className="text-xs">
                      {templateCategories.find(c => c.id === template.category)?.label}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(template.id)}
                    className="h-8 w-8"
                  >
                    <Star 
                      className={`h-4 w-4 ${
                        favoriteTemplateIds.includes(template.id) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </Button>
                </div>
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Content Type */}
                {template.metrics?.bestFor && (
                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs">
                      {template.metrics.bestFor}
                    </Badge>
                  </div>
                )}
                
                {/* Preview */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4 flex-1">
                  <p className="text-xs text-gray-600 line-clamp-4 whitespace-pre-wrap">
                    {template.template.substring(0, 200)}...
                  </p>
                </div>
                
                {/* Actions */}
                <Button 
                  onClick={() => handleUseTemplate(template)}
                  className="w-full"
                  size="sm"
                >
                  Use This Template
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No templates found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all')
                setSearchQuery('')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Custom Template CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create Your Own Template
            </CardTitle>
            <CardDescription>
              Save your best-performing posts as reusable templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/test/page.tsx
```tsx
export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Test Page</h1>
      <p>If you can see this, Next.js is working!</p>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/test-edge-direct/page.tsx
```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TestEdgeDirect() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testDirectFetch = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('https://nsxpqvuouvuvehnskajo.supabase.co/functions/v1/analyze-text', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeHBxdnVvdXZ1dmVobnNrYWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyODAxNzAsImV4cCI6MjA2NTg1NjE3MH0.GUWKakdD77zYieOqBbnCGmTzPyoAwmwDVl3wgFbHkxw',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'Myba we should try a different approach to fix this isue.',
          mode: 'streaming',
          model: 'gpt-3.5-turbo',
          maxTokens: 1000
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error('Direct fetch error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Direct Edge Function Test</h1>
      
      <div className="space-y-4">
        <Button onClick={testDirectFetch} disabled={loading}>
          {loading ? 'Testing...' : 'Test Direct Fetch'}
        </Button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h2 className="font-semibold text-red-700">Error:</h2>
            <pre className="text-sm text-red-600 mt-2">{error}</pre>
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h2 className="font-semibold text-green-700">Success!</h2>
            <pre className="text-sm text-green-600 mt-2">
              {JSON.stringify(result, null, 2)}
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold">Found {result.grammar?.length || 0} grammar suggestions:</h3>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {result.grammar?.map((s: any, i: number) => (
                <div key={i} className="mt-2 p-2 bg-white rounded">
                  <p>&quot;{s.text}&quot; → &quot;{s.suggestion}&quot;</p>
                  <p className="text-xs text-gray-600">{s.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/test-edge-function/page.tsx
```tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export default function TestEdgeFunction() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testFunction = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const supabase = createClient()
      
      // Test with a simple request
      const response = await supabase.functions.invoke('analyze-text', {
        body: { 
          text: 'This is a test sentence to check if the edge function works properly.',
          mode: 'full',
          model: 'gpt-3.5-turbo',
          maxTokens: 100
        }
      })

      if (response.error) {
        throw response.error
      }

      setResult(response.data)
    } catch (err) {
      console.error('Edge function error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edge Function Test</h1>
      
      <div className="space-y-4">
        <Button onClick={testFunction} disabled={loading}>
          {loading ? 'Testing...' : 'Test analyze-text Function'}
        </Button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h2 className="font-semibold text-red-700">Error:</h2>
            <pre className="text-sm text-red-600 mt-2">{error}</pre>
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h2 className="font-semibold text-green-700">Success!</h2>
            <pre className="text-sm text-green-600 mt-2">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <ul className="text-sm space-y-1">
            <li>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</li>
            <li>Has Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/test-local-grammar/page.tsx
```tsx
'use client'

import { useState } from 'react'
import { performLocalGrammarCheck, calculateLocalScore } from '@/lib/utils/local-grammar-check'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

export default function TestLocalGrammar() {
  const [text, setText] = useState("Myba we should try a different approach to fix this isue.")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any>(null)

  const runTest = async () => {
    const suggestions = await performLocalGrammarCheck(text)
    const score = calculateLocalScore(text, suggestions)
    setResults({ suggestions, score })
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Local Grammar Checker Test</h1>
      
      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to test..."
          className="min-h-[100px]"
        />
        
        <Button onClick={runTest}>
          Test Grammar Check
        </Button>

        {results && (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Score: {results.score}%</h3>
              <p className="text-sm text-gray-600">
                Found {results.suggestions.length} suggestions
              </p>
            </Card>

            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {results.suggestions.map((suggestion: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="font-medium text-sm">
                      {suggestion.type === 'grammar' ? 'Grammar' : 'Style'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {Math.round(suggestion.confidence * 100)}% confident
                    </span>
                  </div>
                  <div>
                    <span className="line-through text-red-600">{suggestion.text}</span>
                    {' → '}
                    <span className="text-green-600 font-medium">{suggestion.suggestion}</span>
                  </div>
                  <p className="text-sm text-gray-600">{suggestion.reason}</p>
                  <p className="text-xs text-gray-400">
                    Position: {suggestion.startIndex}-{suggestion.endIndex}
                  </p>
                </div>
              </Card>
            ))}

            <div className="mt-6 p-4 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">Test Cases:</h4>
              <ul className="text-sm space-y-1">
                <li>• &quot;Myba&quot; → &quot;Maybe&quot; (typo detection)</li>
                <li>• &quot;a example&quot; → &quot;an example&quot; (article correction)</li>
                <li>• &quot;Your the best&quot; → &quot;You&apos;re the best&quot; (your/you&apos;re)</li>
                <li>• &quot;very quickly&quot; → suggests removing intensifier</li>
                <li>• Double words like &quot;the the&quot;</li>
                <li>• Missing punctuation at end of sentence</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/test-network/page.tsx
```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function TestNetwork() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    setResults({})
    
    // Test 1: Direct fetch
    try {
      console.log('Test 1: Direct fetch...')
      const response = await fetch('https://nsxpqvuouvuvehnskajo.supabase.co/functions/v1/analyze-text', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeHBxdnVvdXZ1dmVobnNrYWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyODAxNzAsImV4cCI6MjA2NTg1NjE3MH0.GUWKakdD77zYieOqBbnCGmTzPyoAwmwDVl3wgFbHkxw',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'This is a test.',
          mode: 'streaming',
          model: 'gpt-3.5-turbo',
          maxTokens: 100
        })
      })
      const data = await response.json()
      setResults((prev: any) => ({ ...prev, directFetch: { success: true, data } }))
    } catch (error) {
      setResults((prev: any) => ({ ...prev, directFetch: { success: false, error: error instanceof Error ? error.message : 'Unknown error' } }))
    }
    
    // Test 2: Supabase client
    try {
      console.log('Test 2: Supabase client...')
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      const response = await supabase.functions.invoke('analyze-text', {
        body: { 
          text: 'This is a test.',
          mode: 'streaming',
          model: 'gpt-3.5-turbo',
          maxTokens: 100
        }
      })
      
      setResults((prev: any) => ({ 
        ...prev, 
        supabaseClient: { 
          success: !response.error, 
          data: response.data,
          error: response.error,
          hasSession: !!session
        } 
      }))
    } catch (error) {
      setResults((prev: any) => ({ ...prev, supabaseClient: { success: false, error: error instanceof Error ? error.message : 'Unknown error' } }))
    }
    
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Network Test</h1>
      
      <Button onClick={runTests} disabled={loading}>
        {loading ? 'Running tests...' : 'Run Network Tests'}
      </Button>
      
      <div className="mt-8 space-y-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {Object.entries(results).map(([test, result]: [string, any]) => (
          <div key={test} className="p-4 border rounded">
            <h3 className="font-semibold">{test}</h3>
            <pre className="mt-2 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/test-render/page.tsx
```tsx
export default function TestRenderPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Test Render Page</h1>
        <p className="text-lg">If you can see this, the rendering works!</p>
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/test-suggestions/page.tsx
```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

export default function TestSuggestionsPage() {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  interface AnalysisResult {
    grammar: Array<{
      text: string
      suggestion: string
      reason: string
      startIndex: number
      endIndex: number
      confidence: number
    }>
    tone: Array<{
      text: string
      suggestion: string
      reason: string
      startIndex: number
      endIndex: number
      confidence: number
    }>
    overallScore: number
  }

  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const testAnalysis = async () => {
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('Not authenticated')
      }

      const response = await supabase.functions.invoke('analyze-text', {
        body: { text, mode: 'full' }
      })

      if (response.error) {
        throw response.error
      }

      setResult(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const sampleTexts = {
    grammar: "Their are many reason why you should choose our product. Its the best solution for you're business needs.",
    tone: "Our product is okay I guess. You might want to try it if you have nothing better to do. Whatever.",
    good: "Our innovative solution empowers businesses to streamline their operations and achieve unprecedented growth. Join thousands of satisfied customers who have transformed their workflows."
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Test Text Analysis</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sample Texts</CardTitle>
            <CardDescription>Click to load sample text for testing</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setText(sampleTexts.grammar)}
            >
              Grammar Issues
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setText(sampleTexts.tone)}
            >
              Tone Issues
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setText(sampleTexts.good)}
            >
              Good Text
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to analyze..."
              rows={5}
              className="font-mono"
            />
            <Button
              onClick={testAnalysis}
              disabled={!text || isAnalyzing}
              className="mt-4"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Text'
              )}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm">{error}</pre>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
              <CardDescription>
                Overall Score: {result.overallScore}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Grammar Suggestions ({result.grammar?.length || 0})</h3>
                  <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
                    {JSON.stringify(result.grammar, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tone Suggestions ({result.tone?.length || 0})</h3>
                  <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
                    {JSON.stringify(result.tone, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Full Response</h3>
                  <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/unauthorized/page.tsx
```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <CardTitle>Unauthorized Access</CardTitle>
          </div>
          <CardDescription>
            You don&apos;t have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This page requires specific permissions that your account doesn&apos;t have. 
            If you believe this is an error, please contact your administrator.
          </p>
          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full">
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Go Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Formatted Preview Styles */
.formatted-preview strong {
  font-weight: 700;
}

.formatted-preview em {
  font-style: italic;
}

.formatted-preview ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.formatted-preview ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.formatted-preview li {
  margin: 0.25rem 0;
}

.formatted-preview br {
  display: block;
  content: "";
  margin: 0.5rem 0;
}

/* Fix tab content height */
[role="tabpanel"] {
  height: 100%;
}

/* Ensure scrolling works properly in sidebar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/layout.tsx
```tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarketingQuill - AI Copy Copilot",
  description: "AI-powered marketing copy assistant for SaaS marketing managers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/app/page.tsx
```tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  const router = useRouter()
  const { user, isInitialized } = useAuthStore()

  useEffect(() => {
    if (isInitialized && user) {
      router.push('/dashboard')
    }
  }, [isInitialized, user, router])

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/admin/admin-dashboard.tsx
```tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Users, 
  FileText, 
  Activity,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { securityService } from '@/lib/security/security-service'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/lib/hooks/use-toast'

interface Stats {
  totalUsers: number
  totalDrafts: number
  activeUsers: number
  recentActivity: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDrafts: 0,
    activeUsers: 0,
    recentActivity: 0
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [auditLogs, setAuditLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch stats
      const [
        { count: userCount },
        { count: draftCount },
        { data: activeUsersData },
        auditData
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('drafts').select('*', { count: 'exact', head: true }),
        supabase
          .from('drafts')
          .select('user_id')
          .gte('updated_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        securityService.getAuditLogs({}, 10)
      ])

      // Count unique active users
      const uniqueActiveUsers = new Set(activeUsersData?.map(d => d.user_id) || []).size

      setStats({
        totalUsers: userCount || 0,
        totalDrafts: draftCount || 0,
        activeUsers: uniqueActiveUsers,
        recentActivity: auditData.length
      })

      setAuditLogs(auditData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const exportAllData = async () => {
    try {
      toast({
        title: 'Exporting data...',
        description: 'This may take a moment'
      })

      // Get all user IDs for bulk export
      const { data: users } = await supabase
        .from('profiles')
        .select('id')
        
      if (!users || users.length === 0) {
        toast({
          title: 'No data to export',
          description: 'No users found in the system'
        })
        return
      }

      // Export data for each user
      const allExports = await Promise.all(
        users.map(user => securityService.exportUserData(user.id))
      )

      // Create and download the file
      const blob = new Blob([JSON.stringify(allExports, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `full-system-export-${new Date().toISOString()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: 'Export complete',
        description: 'System data has been exported successfully'
      })
    } catch (error) {
      console.error('Error exporting data:', error)
      toast({
        title: 'Export failed',
        description: 'Failed to export system data',
        variant: 'destructive'
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getActionIcon = (action: string) => {
    if (action.includes('delete')) return <XCircle className="h-4 w-4 text-red-500" />
    if (action.includes('create') || action.includes('insert')) return <CheckCircle className="h-4 w-4 text-green-500" />
    if (action.includes('error') || action.includes('fail')) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    return <Activity className="h-4 w-4 text-blue-500" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <Button onClick={exportAllData} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All Data
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Drafts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDrafts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users (7d)</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentActivity}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="audit" className="space-y-4">
          <TabsList>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="security">Security Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
                <CardDescription>
                  Latest 10 security-related actions in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <div>
                          <p className="text-sm font-medium">{log.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {log.table_name} • {formatDate(log.created_at)}
                          </p>
                        </div>
                      </div>
                      {log.user_id && (
                        <p className="text-xs text-muted-foreground">
                          User: {log.user_id.substring(0, 8)}...
                        </p>
                      )}
                    </div>
                  ))}
                  {auditLogs.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No audit logs found
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user roles and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  User management features coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Configuration</CardTitle>
                <CardDescription>
                  Current security settings and policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Row Level Security (RLS)</p>
                    <p className="text-sm text-muted-foreground">
                      Enabled on all tables with user-specific policies
                    </p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">HTTPS Enforcement</p>
                    <p className="text-sm text-muted-foreground">
                      Strict-Transport-Security header configured
                    </p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Content Security Policy</p>
                    <p className="text-sm text-muted-foreground">
                      Restrictive CSP headers applied
                    </p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">GDPR Compliance</p>
                    <p className="text-sm text-muted-foreground">
                      Data export and deletion features enabled
                    </p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/auth/role-guard.tsx
```tsx
'use client'

import { ReactNode } from 'react'
import { useRole } from '@/lib/hooks/use-role'

interface RoleGuardProps {
  children: ReactNode
  requiredRole?: 'owner' | 'editor'
  allowedRoles?: ('owner' | 'editor')[]
  fallback?: ReactNode
}

export function RoleGuard({ 
  children, 
  requiredRole, 
  allowedRoles = [], 
  fallback = null 
}: RoleGuardProps) {
  const { role } = useRole()

  // Check if user has the required role
  if (requiredRole && role !== requiredRole) {
    return <>{fallback}</>
  }

  // Check if user has one of the allowed roles
  if (allowedRoles.length > 0 && (!role || !allowedRoles.includes(role))) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/dashboard/dashboard-home.tsx
```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  FileText, 
  Clock, 
  Sparkles,
  ArrowRight,
  Target,
  Zap,
  BarChart3,
  PenTool,
  BookOpen,
  Linkedin
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalDrafts: number
  publishedCount: number
  averageScore: number
  recentDrafts: Array<{
    id: string
    title: string
    updated_at: string
    optimization_score: number
  }>
}

interface QuickAction {
  title: string
  description: string
  icon: React.ElementType
  action: () => void
  color: string
  loading?: boolean
}

export function DashboardHome() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [stats, setStats] = useState<DashboardStats>({
    totalDrafts: 0,
    publishedCount: 0,
    averageScore: 0,
    recentDrafts: []
  })
  const [userName, setUserName] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
      fetchUserProfile()
    }
  }, [user])

  const fetchUserProfile = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('profiles')
      .select('full_name, username')
      .eq('id', user?.id)
      .single()
    
    if (data) {
      setUserName(data.full_name || data.username || user?.email?.split('@')[0] || 'there')
    }
  }

  const fetchDashboardData = async () => {
    if (!user) return
    
    setLoading(true)
    const supabase = createClient()
    
    // Fetch stats in parallel
    const [draftsResult, publishedResult, recentResult] = await Promise.all([
      supabase
        .from('drafts')
        .select('optimization_score', { count: 'exact' })
        .eq('user_id', user.id),
      supabase
        .from('drafts')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .eq('status', 'published'),
      supabase
        .from('drafts')
        .select('id, title, updated_at, optimization_score')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(5)
    ])

    const totalDrafts = draftsResult.count || 0
    const publishedCount = publishedResult.count || 0
    
    // Calculate average score
    const scores = draftsResult.data?.map(d => d.optimization_score).filter(s => s > 0) || []
    const averageScore = scores.length > 0 
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0

    setStats({
      totalDrafts,
      publishedCount,
      averageScore,
      recentDrafts: recentResult.data || []
    })
    
    setLoading(false)
  }


  const quickActions: QuickAction[] = [
    {
      title: 'Write LinkedIn Post',
      description: 'Create engaging content for LinkedIn',
      icon: Linkedin,
      action: () => router.push('/editor/new'),
      color: 'bg-blue-500'
    },
    {
      title: 'Use Template',
      description: 'Start with proven templates',
      icon: BookOpen,
      action: () => router.push('/templates'),
      color: 'bg-purple-500'
    },
    {
      title: 'Improve Existing',
      description: 'Optimize your drafts with AI',
      icon: Sparkles,
      action: () => router.push('/dashboard?status=all'),
      color: 'bg-green-500'
    }
  ]

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const then = new Date(date)
    const diff = now.getTime() - then.getTime()
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Ready to create content that gets noticed on LinkedIn?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action) => (
          <Card 
            key={action.title}
            className="hover:shadow-lg transition-shadow cursor-pointer border-2"
            onClick={action.action}
          >
            <CardHeader>
              <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push('/dashboard?status=all')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Drafts</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDrafts}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push('/dashboard?status=published')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Published</CardTitle>
              <BarChart3 className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedCount}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.totalDrafts > 0 
                ? `${Math.round((stats.publishedCount / stats.totalDrafts) * 100)}% of total`
                : 'Start publishing'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Avg. Score</CardTitle>
              <Target className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <Progress value={stats.averageScore} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Engagement Tips</CardTitle>
              <Zap className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AI-Powered</div>
            <p className="text-xs text-gray-500 mt-1">Real-time suggestions</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Drafts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Drafts</CardTitle>
              <Link href="/dashboard?status=all">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : stats.recentDrafts.length > 0 ? (
              <div className="space-y-3">
                {stats.recentDrafts.map((draft) => (
                  <Link
                    key={draft.id}
                    href={`/editor/${draft.id}`}
                    className="block p-3 rounded-lg border hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{draft.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {formatTimeAgo(draft.updated_at)}
                        </p>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-700">
                          {draft.optimization_score}%
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <PenTool className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No drafts yet</p>
                <Link href="/editor/new">
                  <Button size="sm" className="mt-3">
                    Create Your First Draft
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* LinkedIn Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              LinkedIn Writing Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-sm">Hook readers in the first line</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    LinkedIn shows only the first 2-3 lines. Make them count!
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-sm">Use line breaks strategically</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Short paragraphs (1-2 lines) improve readability on mobile
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-sm">End with a question or CTA</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Encourage engagement by asking for opinions or experiences
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t">
                <Link href="/guides/linkedin-best-practices">
                  <Button variant="outline" size="sm" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Complete Guide
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/dashboard/dashboard-layout.tsx
```tsx
'use client'

import { ReactNode } from 'react'
import { Sidebar } from './sidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/dashboard/draft-card.tsx
```tsx
'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  FileText, 
  Share2, 
  Globe, 
  Megaphone,
  MoreVertical,
  Trash2,
  Archive,
  Copy
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Draft {
  id: string
  title: string
  content?: string
  content_preview?: string
  channel?: string
  optimization_score: number
  status: string
  updated_at: string
  created_at: string
}

const channelIcons = {
  email: Mail,
  blog: FileText,
  social: Share2,
  website: Globe,
  ad: Megaphone
}

const channelColors = {
  email: 'bg-blue-100 text-blue-700',
  blog: 'bg-purple-100 text-purple-700',
  social: 'bg-green-100 text-green-700',
  website: 'bg-orange-100 text-orange-700',
  ad: 'bg-red-100 text-red-700'
}

interface DraftCardProps {
  draft: Draft
  onDelete?: (id: string) => void
  onArchive?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export function DraftCard({ draft, onDelete, onArchive, onDuplicate }: DraftCardProps) {
  const Icon = draft.channel ? channelIcons[draft.channel as keyof typeof channelIcons] : FileText
  const channelColor = draft.channel ? channelColors[draft.channel as keyof typeof channelColors] : 'bg-gray-100 text-gray-700'
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50'
    if (score >= 60) return 'bg-yellow-50'
    return 'bg-red-50'
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
      <Link href={`/editor/${draft.id}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg line-clamp-1">
                {draft.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {formatDistanceToNow(new Date(draft.updated_at), { addSuffix: true })}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onDuplicate?.(draft.id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onArchive?.(draft.id)}>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDelete?.(draft.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {draft.channel && (
                <Badge variant="secondary" className={channelColor}>
                  <Icon className="h-3 w-3 mr-1" />
                  {draft.channel}
                </Badge>
              )}
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${getScoreBg(draft.optimization_score)}`}>
              <span className={getScoreColor(draft.optimization_score)}>
                {draft.optimization_score}%
              </span>
            </div>
          </div>
          {(draft.content_preview || draft.content) && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
              {draft.content_preview || draft.content}
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/dashboard/sidebar.tsx
```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  Home,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Archive,
  Linkedin,
  BookOpen,
  TrendingUp,
  CheckCircle,
  LogOut,
  User
} from 'lucide-react'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useRouter } from 'next/navigation'

const sidebarItems = [
  {
    title: 'Home',
    href: '/dashboard',
    icon: Home,
    id: 'home'
  },
  {
    title: 'My Drafts',
    href: '/dashboard?status=draft',
    icon: FileText,
    id: 'all-drafts'
  },
  {
    title: 'Published',
    href: '/dashboard?status=published',
    icon: CheckCircle,
    id: 'published'
  },
  {
    title: 'Templates',
    href: '/templates',
    icon: BookOpen,
    id: 'templates'
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: TrendingUp,
    id: 'analytics'
  },
  {
    title: 'Archived',
    href: '/dashboard?status=archived',
    icon: Archive,
    id: 'archived'
  }
]

const bottomItems = [
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    id: 'settings'
  },
  {
    title: 'Help',
    href: '/help',
    icon: HelpCircle,
    id: 'help'
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [collapsed, setCollapsed] = useState(false)
  const { user, signOut } = useAuthStore()
  const router = useRouter()
  
  const handleLogout = async () => {
    await signOut()
    router.push('/auth/login')
  }

  return (
    <div className={cn(
      "relative flex flex-col h-full bg-gray-50 border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
            <Linkedin className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-xl font-bold">LinkedIn</span>
              <span className="text-xl font-light ml-1">Writer</span>
            </div>
          )}
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          // Build current URL for comparison
          const currentSearch = searchParams.toString()
          const currentUrl = currentSearch ? `${pathname}?${currentSearch}` : pathname
          
          // Check if we're on the home page
          const isHomePage = pathname === '/dashboard' && !currentSearch
          
          // Determine if this item is active
          const isActive = 
            (item.id === 'home' && isHomePage) ||
            (item.id !== 'home' && item.href === currentUrl)
            
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.title : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors",
              collapsed && "justify-center"
            )}
            title={collapsed ? item.title : undefined}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
        
        {/* User Info & Logout */}
        <div className="mt-4 pt-4 border-t">
          {user && (
            <>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2 mb-2",
                collapsed && "justify-center"
              )}>
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.email}
                    </p>
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className={cn(
                  "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? "Sign out" : undefined}
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span className="ml-2">Sign out</span>}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 h-6 w-6 rounded-full border bg-white shadow-md hover:shadow-lg"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/editor-header.tsx
```tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEditorStore } from '@/lib/stores/editor-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft, 
  Save, 
  Cloud, 
  CloudOff,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTemplatesStore } from '@/lib/stores/templates-store'
import { LinkedInPostButton } from './linkedin-post-button'


export function EditorHeader() {
  const router = useRouter()
  const { 
    title, 
    setTitle, 
    save, 
    isSaving,
    saveStatus,
    isDirty,
    lastSaved 
  } = useEditorStore()
  const { setTemplateModalOpen } = useTemplatesStore()

  const handleSave = async () => {
    // Force save even if not dirty when manually clicking
    await save(true)
  }

  const getSaveStatus = () => {
    if (saveStatus === 'saving') {
      return {
        icon: Cloud,
        text: 'Saving...',
        className: 'text-blue-600 animate-pulse'
      }
    }
    if (saveStatus === 'saved') {
      return {
        icon: Cloud,
        text: 'Saved',
        className: 'text-green-600'
      }
    }
    if (saveStatus === 'error') {
      return {
        icon: CloudOff,
        text: 'Save failed',
        className: 'text-red-600'
      }
    }
    if (isDirty) {
      return {
        icon: CloudOff,
        text: 'Unsaved changes',
        className: 'text-yellow-600'
      }
    }
    if (lastSaved) {
      return {
        icon: Cloud,
        text: 'All changes saved',
        className: 'text-gray-500'
      }
    }
    return {
      icon: Cloud,
      text: 'Ready',
      className: 'text-gray-500'
    }
  }

  const statusDisplay = getSaveStatus()
  const SaveIcon = statusDisplay.icon

  return (
    <div className="border-b bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="max-w-md font-medium"
            placeholder="Untitled LinkedIn Post"
          />
          
          <Button
            variant="outline"
            onClick={() => setTemplateModalOpen(true)}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Templates
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={cn("flex items-center gap-2 text-sm", statusDisplay.className)}>
            <SaveIcon className="h-4 w-4" />
            <span>{statusDisplay.text}</span>
          </div>
          
          <Button 
            onClick={handleSave}
            disabled={isSaving || saveStatus === 'saving'}
            size="sm"
            variant={isDirty ? "default" : "outline"}
          >
            <Save className="h-4 w-4 mr-2" />
            {isDirty ? 'Save' : 'Saved'}
          </Button>
          
          <LinkedInPostButton />
        </div>
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/editor-pane.tsx
```tsx
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { SuggestionHighlights } from './suggestion-highlights'
import { TemplateModal } from './template-modal'
import { EditorToolbar } from './editor-toolbar'
import { cn } from '@/lib/utils'

export function EditorPane() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const editorStore = useEditorStore()
  const { analyzeText, cancelAnalysis } = useSuggestionsStore()
  const { checkText: checkSpelling } = useSpellCheckStore()
  const [localContent, setLocalContent] = useState(editorStore.content)
  const analyzeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const spellCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Ref to hold the latest localContent for use in subscription callback
  const localContentRef = useRef(localContent)
  useEffect(() => {
    localContentRef.current = localContent
  }, [localContent])

  // Only sync from store on initial mount and when externally changed (undo/redo)
  useEffect(() => {
    const unsubscribe = useEditorStore.subscribe((state, prevState) => {
      // Only update if content changed in store, and it's different from our current local reality,
      // and we are not currently in the middle of a debounced save.
      if (
        state.content !== prevState.content &&
        !saveTimeoutRef.current &&
        state.content !== localContentRef.current
      ) {
        setLocalContent(state.content)
      }
    })
    return unsubscribe
  }, [])
  
  // Analyze and spell check content on mount if it exists
  useEffect(() => {
    if (editorStore.content && editorStore.content.length >= 10) {
      // Spell check immediately
      checkSpelling(editorStore.content)
      
      // Analyze after a short delay to let the UI settle
      setTimeout(() => {
        analyzeText(editorStore.content)
      }, 500)
    }
  }, []) // Only run on mount

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    
    // Update local state immediately for responsive typing
    setLocalContent(newContent)
    
    // Clear previous timeouts
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    if (analyzeTimeoutRef.current) {
      clearTimeout(analyzeTimeoutRef.current)
    }
    if (spellCheckTimeoutRef.current) {
      clearTimeout(spellCheckTimeoutRef.current)
    }
    
    // Cancel any in-flight analysis requests
    cancelAnalysis()
    
    // Run spell check with minimal delay (100ms)
    spellCheckTimeoutRef.current = setTimeout(() => {
      checkSpelling(newContent)
    }, 100)
    
    // Debounce saving to store
    saveTimeoutRef.current = setTimeout(() => {
      editorStore.setContent(newContent)
      saveTimeoutRef.current = null
    }, 500) // Increased debounce for less frequent updates
    
    // Debounce text analysis - 1.5 seconds to reduce API calls
    analyzeTimeoutRef.current = setTimeout(() => {
      if (newContent.length >= 10) {
        analyzeText(newContent)
      }
    }, 1500) // Analyze after 1.5 seconds of no typing
  }, [editorStore, analyzeText, cancelAnalysis])

  const handleInsert = useCallback((before: string, after: string, placeholder?: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const textToInsert = selectedText || placeholder || ''
    
    const newContent = 
      localContent.substring(0, start) + 
      before + textToInsert + after +
      localContent.substring(end)
    
    setLocalContent(newContent)
    
    // Update cursor position
    const newCursorPos = start + before.length + textToInsert.length
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.selectionStart = start + before.length
        textareaRef.current.selectionEnd = newCursorPos
      }
    }, 0)
    
    // Trigger save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(() => {
      editorStore.setContent(newContent)
      saveTimeoutRef.current = null
    }, 500)
  }, [localContent, editorStore])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Formatting shortcuts
    if (e.metaKey || e.ctrlKey) {
      switch(e.key.toLowerCase()) {
        case 'b':
          e.preventDefault()
          handleInsert('**', '**', 'bold text')
          break
        case 'i':
          e.preventDefault()
          handleInsert('*', '*', 'italic text')
          break
        case 's':
          e.preventDefault()
          // Manual save with Cmd/Ctrl + S (force save)
          editorStore.save(true)
          break
        case 'z':
          if (e.shiftKey) {
            e.preventDefault()
            editorStore.redo()
          } else {
            e.preventDefault()
            editorStore.undo()
          }
          break
        case 'y':
          e.preventDefault()
          editorStore.redo()
          break
      }
    }
    
    // Tab handling
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = textareaRef.current?.selectionStart || 0
      const end = textareaRef.current?.selectionEnd || 0
      const newContent = 
        localContent.substring(0, start) + 
        '  ' + // 2 spaces for tab
        localContent.substring(end)
      
      setLocalContent(newContent)
      
      // Update cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2
          textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
      
      // Save the tab insertion
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      saveTimeoutRef.current = setTimeout(() => {
        editorStore.setContent(newContent)
        saveTimeoutRef.current = null
      }, 500)
    }
  }, [localContent, editorStore, handleInsert])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (analyzeTimeoutRef.current) {
        clearTimeout(analyzeTimeoutRef.current)
      }
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      if (spellCheckTimeoutRef.current) {
        clearTimeout(spellCheckTimeoutRef.current)
      }
    }
  }, [])

  const { suggestions } = useSuggestionsStore()
  const { errors: spellErrors } = useSpellCheckStore()

  return (
    <>
      <div className="flex-1 flex flex-col bg-background">
        {/* Editor Toolbar */}
        <EditorToolbar textareaRef={textareaRef} onInsert={handleInsert} />
        
        <div className="flex-1 relative">
          {/* Highlights layer */}
          {(suggestions.length > 0 || spellErrors.length > 0) && (
            <SuggestionHighlights text={localContent} textareaRef={textareaRef} />
          )}
          
          {/* Main editor textarea */}
          <textarea
            ref={textareaRef}
            value={localContent}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Start typing your LinkedIn post..."
            className={cn(
              "w-full h-full p-8 resize-none",
              "text-base leading-relaxed",
              "focus:outline-none",
              "placeholder:text-muted-foreground/50",
              // Make textarea background transparent and ensure proper layering
              "bg-transparent relative z-10"
            )}
            style={{
              fontSize: '16px',
              lineHeight: '1.75',
              minHeight: '100%',
              backgroundColor: 'transparent',
              color: 'inherit'
            }}
          />
        </div>
      </div>
      
      {/* Template Modal */}
      <TemplateModal />
    </>
  )
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/editor-sidebar.tsx
```tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore, type Suggestion } from '@/lib/stores/suggestions-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { SuggestionCards } from './suggestion-cards'
import { SpellCheckPanel } from './spell-check-panel'
import { LinkedInOptimizationPanel } from './linkedin-optimization-panel'
import { useTemplatesStore } from '@/lib/stores/templates-store'
import { linkedInTemplates } from '@/lib/data/linkedin-templates'
import { FormattedPreview } from './formatted-preview'
import { 
  ChevronRight, 
  ChevronLeft,
  Target,
  Zap,
  Sparkles,
  SpellCheck,
  FileText,
  Eye,
  Check,
  X,
  AlertCircle
} from 'lucide-react'

export function EditorSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('preview')
  const [userHasInteracted, setUserHasInteracted] = useState(false)
  
  // Get counts for badges
  const { suggestions } = useSuggestionsStore()
  const { errors: spellErrors } = useSpellCheckStore()
  useEditorStore()
  
  const counts = useMemo(() => {
    const grammarSuggestions = suggestions.filter(s => s.type === 'grammar')
    const toneSuggestions = suggestions.filter(s => s.type === 'tone')
    const linkedinSuggestions = suggestions.filter(s => 
      s.type === 'linkedin' || s.type === 'hook' || s.type === 'structure'
    )
    
    return {
      spell: spellErrors.length,
      grammar: grammarSuggestions.length,
      tone: toneSuggestions.length,
      linkedin: linkedinSuggestions.length,
      total: spellErrors.length + suggestions.length
    }
  }, [suggestions, spellErrors])
  
  // Auto-switch to tab with new content (but only if user hasn't manually switched)
  useEffect(() => {
    if (!userHasInteracted) {
      if (counts.linkedin > 0) {
        setActiveTab('linkedin')
      } else if (counts.spell > 0 || counts.grammar > 0) {
        setActiveTab('writing')
      } else if (counts.tone > 0) {
        setActiveTab('engage')
      }
    }
  }, [counts, userHasInteracted])
  
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setUserHasInteracted(true) // User has manually switched tabs
  }

  if (collapsed) {
    return (
      <div className="w-12 border-l bg-gray-50">
        <Button
          variant="ghost"
          size="icon"
          className="w-full h-12 rounded-none relative"
          onClick={() => setCollapsed(false)}
        >
          <ChevronLeft className="h-4 w-4" />
          {counts.total > 0 && (
            <Badge 
              className="absolute top-1 right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-red-500 hover:bg-red-500"
              variant="destructive"
            >
              {counts.total}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="w-96 border-l bg-gray-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Suggestions</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(true)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="grid w-full grid-cols-5 rounded-none border-b h-12 flex-shrink-0">
          <TabsTrigger value="preview" className="rounded-none relative" title="Preview">
            <Eye className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="writing" className="rounded-none relative" title="Writing Quality">
            <SpellCheck className="h-4 w-4" />
            {(counts.spell + counts.grammar) > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-red-500 hover:bg-red-500"
                variant="destructive"
              >
                {counts.spell + counts.grammar}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="rounded-none relative" title="LinkedIn">
            <Target className="h-4 w-4" />
            {counts.linkedin > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-blue-500 hover:bg-blue-500"
              >
                {counts.linkedin}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="engage" className="rounded-none relative" title="Engagement">
            <Sparkles className="h-4 w-4" />
            {counts.tone > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-purple-500 hover:bg-purple-500"
              >
                {counts.tone}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="tools" className="rounded-none relative" title="Tools">
            <FileText className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="preview" className="h-full overflow-y-auto p-4 space-y-4">
            <PreviewPanel />
          </TabsContent>
          
          <TabsContent value="writing" className="h-full overflow-y-auto p-4 space-y-4">
            <WritingQualityPanel />
          </TabsContent>
          
          <TabsContent value="linkedin" className="h-full overflow-y-auto p-4 space-y-4">
            <LinkedInSuggestionsPanel />
          </TabsContent>
          
          <TabsContent value="engage" className="h-full overflow-y-auto p-4 space-y-4">
            <EngagementPanel />
          </TabsContent>
          
          <TabsContent value="tools" className="h-full overflow-y-auto p-4 space-y-4">
            <ToolsPanel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function WritingQualityPanel() {
  const { errors: spellErrors } = useSpellCheckStore()
  const { suggestions } = useSuggestionsStore()
  const grammarSuggestions = suggestions.filter(s => s.type === 'grammar')
  
  return (
    <div className="space-y-4">
      {/* Spell Check Section */}
      {spellErrors.length > 0 && (
        <>
          <h4 className="font-medium text-sm">Spelling ({spellErrors.length})</h4>
          <SpellCheckPanel />
        </>
      )}
      
      {/* Grammar Section */}
      {grammarSuggestions.length > 0 && (
        <>
          <h4 className="font-medium text-sm mt-4">Grammar ({grammarSuggestions.length})</h4>
          <SuggestionCards filterType="grammar" />
        </>
      )}
      
      {spellErrors.length === 0 && grammarSuggestions.length === 0 && (
        <div className="text-center py-8">
          <Check className="h-12 w-12 mx-auto mb-3 text-green-500" />
          <p className="text-sm text-gray-600">Excellent writing quality!</p>
          <p className="text-xs text-gray-400 mt-1">No spelling or grammar issues found</p>
        </div>
      )}
    </div>
  )
}

function LinkedInSuggestionsPanel() {
  const { suggestions } = useSuggestionsStore()
  const linkedinSuggestions = suggestions.filter(s => 
    s.type === 'linkedin' || s.type === 'hook' || s.type === 'structure'
  )
  
  // Group by urgency
  const highUrgency = linkedinSuggestions.filter(s => s.urgency === 'high')
  const mediumUrgency = linkedinSuggestions.filter(s => s.urgency === 'medium')
  const lowUrgency = linkedinSuggestions.filter(s => s.urgency === 'low')
  
  return (
    <div className="space-y-4">
      <LinkedInOptimizationPanel />
      
      {highUrgency.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-red-600">High Priority ({highUrgency.length})</h4>
          <div className="space-y-2">
            {highUrgency.map(suggestion => (
              <LinkedInSuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </>
      )}
      
      {mediumUrgency.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-orange-600 mt-4">Medium Priority ({mediumUrgency.length})</h4>
          <div className="space-y-2">
            {mediumUrgency.map(suggestion => (
              <LinkedInSuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </>
      )}
      
      {lowUrgency.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-gray-600 mt-4">Suggestions ({lowUrgency.length})</h4>
          <div className="space-y-2">
            {lowUrgency.map(suggestion => (
              <LinkedInSuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function LinkedInSuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const { content, setContent, draftId } = useEditorStore()
  const { acceptSuggestion, rejectSuggestion, trackSuggestion } = useSuggestionsStore()
  
  const handleAccept = async () => {
    if (!draftId) return
    
    // Apply the suggestion
    const newContent = 
      content.slice(0, suggestion.startIndex) + 
      suggestion.suggestion + 
      content.slice(suggestion.endIndex)
    
    setContent(newContent, true)
    acceptSuggestion(suggestion.id)
    await trackSuggestion(suggestion, true, draftId)
  }
  
  const handleReject = async () => {
    if (!draftId) return
    rejectSuggestion(suggestion.id)
    await trackSuggestion(suggestion, false, draftId)
  }
  
  const getIcon = () => {
    switch (suggestion.type) {
      case 'hook': return <Zap className="h-4 w-4" />
      case 'structure': return <FileText className="h-4 w-4" />
      case 'algorithm': return <AlertCircle className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }
  
  const getCardColor = () => {
    if (suggestion.urgency === 'high') return 'border-red-200 bg-red-50'
    if (suggestion.urgency === 'medium') return 'border-orange-200 bg-orange-50'
    return 'border-gray-200'
  }
  
  return (
    <Card className={cn("transition-all", getCardColor())}>
      <CardHeader className="pb-2 pt-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            <CardTitle className="text-sm capitalize">{suggestion.type}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm font-medium">{suggestion.reason}</p>
        {suggestion.text !== suggestion.suggestion && (
          <div className="text-xs space-y-1">
            <p className="text-gray-600">Current: {suggestion.text}</p>
            <p className="text-green-700">Suggested: {suggestion.suggestion}</p>
          </div>
        )}
        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={handleAccept} className="flex-1">
            <Check className="h-3 w-3 mr-1" />
            Apply
          </Button>
          <Button size="sm" variant="outline" onClick={handleReject} className="flex-1">
            <X className="h-3 w-3 mr-1" />
            Dismiss
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function EngagementPanel() {
  return (
    <div className="space-y-4">
      <ToneSuggestions />
      
      <div className="border-t pt-4">
        <h4 className="font-medium text-sm mb-3">Engagement Tips</h4>
        <div className="space-y-2 text-xs text-gray-600">
          <p>✓ End with an open question</p>
          <p>✓ Share a personal story</p>
          <p>✓ Use &quot;you&quot; to address readers</p>
          <p>✓ Include 1-3 relevant hashtags</p>
          <p>✓ Add a visual for longer posts</p>
        </div>
      </div>
    </div>
  )
}

function ToolsPanel() {
  return (
    <div className="space-y-4">
      <TemplatesPanel />
      
      <div className="border-t pt-4">
        <VersionHistory />
      </div>
    </div>
  )
}


function ToneSuggestions() {
  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
        <p className="font-medium mb-1">Tone & style improvements:</p>
        <ul className="space-y-0.5 ml-2">
          <li>• Word choice & clarity</li>
          <li>• Professional tone</li>
          <li>• Conciseness</li>
          <li>• LinkedIn best practices</li>
        </ul>
      </div>
      
      <SuggestionCards filterType="tone" />
    </div>
  )
}

function VersionHistory() {
  const { 
    history, 
    historyIndex, 
    undo, 
    redo, 
    snapshots, 
    loadSnapshots, 
    restoreSnapshot,
    createSnapshot 
  } = useEditorStore()
  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  useEffect(() => {
    loadSnapshots()
  }, [loadSnapshots])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={undo} 
          disabled={!canUndo}
          size="sm"
          className="flex-1"
        >
          Undo
        </Button>
        <Button 
          onClick={redo} 
          disabled={!canRedo}
          size="sm"
          className="flex-1"
        >
          Redo
        </Button>
      </div>
      
      <div className="text-sm text-gray-600">
        <p>History: {historyIndex + 1} / {history.length}</p>
        <p className="text-xs mt-1">Up to 50 actions stored</p>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Daily Snapshots</h4>
          <Button 
            size="sm" 
            variant="outline"
            onClick={createSnapshot}
          >
            Create Snapshot
          </Button>
        </div>
        
        {snapshots.length === 0 ? (
          <p className="text-sm text-gray-500">
            No snapshots yet. Snapshots are created automatically daily.
          </p>
        ) : (
          <div className="space-y-2">
            {snapshots.map((snapshot) => (
              <div 
                key={snapshot.id}
                className="flex items-center justify-between p-2 rounded border hover:bg-gray-50"
              >
                <div className="text-sm">
                  <p className="font-medium">{snapshot.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(snapshot.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => restoreSnapshot(snapshot.id)}
                >
                  Restore
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <p className="text-xs text-gray-400 mt-2">
          Snapshots are kept for 7 days
        </p>
      </div>
    </div>
  )
}

function TemplatesPanel() {
  const { 
    recentTemplateIds, 
    favoriteTemplateIds,
    setTemplateModalOpen
  } = useTemplatesStore()
  
  const recentTemplates = recentTemplateIds
    .map(id => linkedInTemplates.find(t => t.id === id))
    .filter(Boolean)
    .slice(0, 3)
  
  const favoriteTemplates = favoriteTemplateIds
    .map(id => linkedInTemplates.find(t => t.id === id))
    .filter(Boolean)
    .slice(0, 3)
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <Button 
          onClick={() => setTemplateModalOpen(true)}
          className="w-full"
        >
          <FileText className="h-4 w-4 mr-2" />
          Browse All Templates
        </Button>
      </div>
      
      {favoriteTemplates.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 text-sm">Favorite Templates</h4>
          <div className="space-y-2">
            {favoriteTemplates.map((template) => template && (
              <button
                key={template.id}
                onClick={() => setTemplateModalOpen(true)}
                className="w-full text-left p-2 rounded border hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-sm">{template.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {template.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {recentTemplates.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 text-sm">Recently Used</h4>
          <div className="space-y-2">
            {recentTemplates.map((template) => template && (
              <button
                key={template.id}
                onClick={() => setTemplateModalOpen(true)}
                className="w-full text-left p-2 rounded border hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-sm">{template.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {template.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {favoriteTemplates.length === 0 && recentTemplates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No templates used yet</p>
          <p className="text-xs mt-1">Browse templates to get started</p>
        </div>
      )}
    </div>
  )
}

function PreviewPanel() {
  const { content } = useEditorStore()
  
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4">
        <h4 className="font-medium mb-3">LinkedIn Preview</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <FormattedPreview content={content} />
        </div>
      </div>
      
      <div className="text-xs text-gray-500 space-y-1">
        <p>• <strong>Bold</strong> text: **text** or Cmd+B</p>
        <p>• <em>Italic</em> text: *text* or Cmd+I</p>
        <p>• Bullet lists: Click bullet icon or start line with •</p>
        <p>• Numbered lists: Click number icon or start with 1.</p>
        <p>• Hashtags and mentions turn blue automatically</p>
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/editor-toolbar.tsx
```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { 
  Bold,
  Italic,
  List,
  ListOrdered,
  Hash,
  AtSign,
  Smile,
  Undo,
  Redo,
  Type
} from 'lucide-react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface EditorToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  onInsert: (before: string, after: string, placeholder?: string) => void
}

export function EditorToolbar({ textareaRef, onInsert }: EditorToolbarProps) {
  const { undo, redo } = useEditorStore()
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)

  const commonEmojis = ['👍', '❤️', '🎉', '🚀', '💡', '🔥', '✨', '💪', '🙌', '👏', '🎯', '💼', '📈', '✅', '🌟', '🤝']

  const formatText = (type: 'bold' | 'italic') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)

    if (type === 'bold') {
      onInsert('**', '**', selectedText || 'bold text')
    } else if (type === 'italic') {
      onInsert('*', '*', selectedText || 'italic text')
    }
  }

  const insertList = (ordered: boolean) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const lineStart = textarea.value.lastIndexOf('\n', start - 1) + 1
    const currentLine = textarea.value.substring(lineStart, start)
    
    // Check if we're already in a list
    const isInList = ordered ? /^\d+\.\s/.test(currentLine) : /^[•·]\s/.test(currentLine)
    
    if (isInList) {
      // Add new list item on next line
      onInsert('\n' + (ordered ? '2. ' : '• '), '', 'Item')
    } else {
      // Start new list
      if (start === lineStart) {
        // At beginning of line
        onInsert(ordered ? '1. ' : '• ', '', 'Item')
      } else {
        // Middle of line, start on new line
        onInsert('\n' + (ordered ? '1. ' : '• '), '', 'Item')
      }
    }
  }

  const insertHashtag = () => {
    onInsert('#', '', 'hashtag')
  }

  const insertMention = () => {
    onInsert('@', '', 'mention')
  }

  const insertEmoji = (emoji: string) => {
    onInsert(emoji, '')
    setIsEmojiOpen(false)
  }

  const clearFormatting = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const content = textarea.value
    // Remove markdown formatting
    const cleaned = content
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .replace(/^[•·]\s/gm, '') // Remove bullet points
      .replace(/^\d+\.\s/gm, '') // Remove numbered lists

    textarea.value = cleaned
    textarea.dispatchEvent(new Event('input', { bubbles: true }))
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 p-2 bg-background border-b">
        {/* Text Formatting */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('bold')}
              className="h-8 w-8 p-0"
            >
              <Bold className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Bold (⌘B)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('italic')}
              className="h-8 w-8 p-0"
            >
              <Italic className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Italic (⌘I)</p>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Lists */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertList(false)}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Bullet List</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertList(true)}
              className="h-8 w-8 p-0"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Numbered List</p>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* LinkedIn Features */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertHashtag}
              className="h-8 w-8 p-0"
            >
              <Hash className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Add Hashtag</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertMention}
              className="h-8 w-8 p-0"
            >
              <AtSign className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Mention Someone</p>
          </TooltipContent>
        </Tooltip>

        <Popover open={isEmojiOpen} onOpenChange={setIsEmojiOpen}>
          <PopoverTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Add Emoji</p>
              </TooltipContent>
            </Tooltip>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="grid grid-cols-8 gap-1">
              {commonEmojis.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  onClick={() => insertEmoji(emoji)}
                  className="h-8 w-8 p-0 text-lg hover:bg-accent"
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Utilities */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFormatting}
              className="h-8 w-8 p-0"
            >
              <Type className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Clear Formatting</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex-1" />

        {/* Undo/Redo */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              className="h-8 w-8 p-0"
            >
              <Undo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Undo (⌘Z)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              className="h-8 w-8 p-0"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Redo (⌘⇧Z)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/formatted-preview.tsx
```tsx
'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface FormattedPreviewProps {
  content: string
  className?: string
}

export function FormattedPreview({ content, className }: FormattedPreviewProps) {
  const formattedContent = useMemo(() => {
    if (!content) return null

    // Convert markdown-style formatting to HTML for preview
    let formatted = content
      // Escape HTML
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      
    // Bold text: **text** -> <strong>text</strong>
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    
    // Italic text: *text* -> <em>text</em>
    formatted = formatted.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
    
    // Bullet points: • text or - text at start of line
    formatted = formatted.replace(/^[•·]\s(.*)$/gm, '<li>$1</li>')
    formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    
    // Numbered lists: 1. text at start of line
    formatted = formatted.replace(/^\d+\.\s(.*)$/gm, '<li>$1</li>')
    formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      // Check if this is already wrapped in ul (bullet list)
      if (match.includes('<ul>')) return match
      return `<ol>${match}</ol>`
    })
    
    // Convert hashtags to blue
    formatted = formatted.replace(/#(\w+)/g, '<span class="text-blue-600">#$1</span>')
    
    // Convert mentions to blue
    formatted = formatted.replace(/@(\w+)/g, '<span class="text-blue-600">@$1</span>')
    
    // Convert line breaks
    formatted = formatted.replace(/\n/g, '<br />')

    return formatted
  }, [content])

  if (!content) {
    return (
      <div className={cn("text-muted-foreground/50 italic", className)}>
        Preview will appear here...
      </div>
    )
  }

  return (
    <div 
      className={cn("formatted-preview", className)}
      dangerouslySetInnerHTML={{ __html: formattedContent || '' }}
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
      }}
    />
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/linkedin-optimization-panel.tsx
```tsx
'use client'

import { useEffect } from 'react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useLinkedInOptimizerStore } from '@/lib/stores/linkedin-optimizer-store'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  TrendingUp, 
  Hash, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  Target,
  Zap,
  Calendar,
  BarChart3,
  Sparkles
} from 'lucide-react'

export function LinkedInOptimizationPanel() {
  const { content } = useEditorStore()
  const { analysis, isAnalyzing, analyzeContent } = useLinkedInOptimizerStore()
  
  // Analyze content whenever it changes
  useEffect(() => {
    analyzeContent(content)
  }, [content, analyzeContent])
  
  if (!analysis && !isAnalyzing) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="text-sm">Start typing to see LinkedIn optimization tips</p>
      </div>
    )
  }
  
  if (isAnalyzing) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm text-gray-500">Analyzing your content...</p>
      </div>
    )
  }
  
  if (!analysis) return null
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }
  
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Work'
  }
  
  const getEngagementIcon = (predicted: string) => {
    switch (predicted) {
      case 'viral': return <Zap className="h-4 w-4 text-purple-500" />
      case 'high': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'medium': return <BarChart3 className="h-4 w-4 text-yellow-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }
  
  return (
    <div className="space-y-6">
      {/* LinkedIn Score */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium flex items-center gap-2">
            <Target className="h-4 w-4" />
            LinkedIn Score
          </h4>
          <span className={cn("text-2xl font-bold", getScoreColor(analysis.score))}>
            {analysis.score}
          </span>
        </div>
        <Progress value={analysis.score} className="h-2 mb-2" />
        <p className="text-sm text-gray-600">
          {getScoreLabel(analysis.score)} - {analysis.score < 80 && 'Follow suggestions below to improve'}
        </p>
      </div>
      
      {/* Character Count */}
      <div className="bg-white p-4 rounded-lg border">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Post Length
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Characters</span>
            <span className={cn(
              "font-medium",
              analysis.isOptimalLength ? "text-green-600" : "text-orange-600"
            )}>
              {analysis.characterCount} / 1300
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={Math.min(100, (analysis.characterCount / 1300) * 100)} 
              className="h-2"
            />
            {/* Optimal range indicator */}
            <div 
              className="absolute top-0 h-2 bg-green-200 opacity-50"
              style={{
                left: `${(1000 / 3000) * 100}%`,
                width: `${((1300 - 1000) / 3000) * 100}%`
              }}
            />
          </div>
          <p className="text-xs text-gray-500">
            {analysis.isOptimalLength 
              ? "✓ Perfect length for maximum engagement"
              : analysis.characterCount < 1000
              ? `Add ${1000 - analysis.characterCount} more characters`
              : `Consider trimming ${analysis.characterCount - 1300} characters`
            }
          </p>
        </div>
      </div>
      
      {/* Engagement Prediction */}
      <div className="bg-white p-4 rounded-lg border">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Engagement Prediction
        </h4>
        <div className="flex items-center gap-2 mb-3">
          {getEngagementIcon(analysis.engagement.predicted)}
          <Badge 
            variant={analysis.engagement.predicted === 'viral' ? 'default' : 'secondary'}
            className={cn(
              analysis.engagement.predicted === 'viral' && 'bg-purple-500',
              analysis.engagement.predicted === 'high' && 'bg-green-500',
              analysis.engagement.predicted === 'medium' && 'bg-yellow-500'
            )}
          >
            {analysis.engagement.predicted.toUpperCase()}
          </Badge>
          <span className="text-sm text-gray-600">
            ~{analysis.readingTime}s read time
          </span>
        </div>
        {analysis.engagement.factors.length > 0 && (
          <ul className="space-y-1">
            {analysis.engagement.factors.map((factor, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                {factor}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Hashtag Suggestions */}
      {analysis.hashtagSuggestions.length > 0 && (
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Suggested Hashtags
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.hashtagSuggestions.map((hashtag, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  // Add hashtag to content
                  const newContent = content.trim() + '\n\n' + hashtag
                  useEditorStore.getState().setContent(newContent)
                }}
              >
                {hashtag}
              </Button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Click to add • Use 3-5 hashtags for best reach
          </p>
        </div>
      )}
      
      {/* Best Time to Post */}
      <div className="bg-white p-4 rounded-lg border">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Best Time to Post
        </h4>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-blue-500" />
          <div>
            <p className="font-medium">
              {analysis.bestPostTime.day} at {analysis.bestPostTime.time}
            </p>
            <p className="text-xs text-gray-500">
              {analysis.bestPostTime.timezone} timezone
            </p>
          </div>
        </div>
      </div>
      
      {/* Improvements */}
      {analysis.improvements.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium mb-3 flex items-center gap-2 text-blue-900">
            <AlertCircle className="h-4 w-4" />
            Suggested Improvements
          </h4>
          <ul className="space-y-2">
            {analysis.improvements.map((improvement, index) => (
              <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                {improvement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/linkedin-post-button.tsx
```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Linkedin, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useRouter } from 'next/navigation'

interface LinkedInPostButtonProps {
  draftId?: string
}

export function LinkedInPostButton({ draftId }: LinkedInPostButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [postResult, setPostResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  
  const { content } = useEditorStore()
  useAuthStore()
  const router = useRouter()

  const handlePost = async () => {
    if (!content.trim()) {
      setPostResult({
        success: false,
        message: 'Please write some content before posting'
      })
      return
    }

    setIsPosting(true)
    setPostResult(null)

    try {
      const response = await fetch('/api/linkedin/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          draftId
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to post')
      }

      setPostResult({
        success: true,
        message: 'Successfully posted to LinkedIn!'
      })

      // Optionally redirect to dashboard after successful post
      setTimeout(() => {
        router.push('/dashboard?tab=published')
      }, 2000)

    } catch (error) {
      console.error('Post error:', error)
      
      if (error instanceof Error && error.message === 'LinkedIn not connected') {
        setPostResult({
          success: false,
          message: 'Please connect your LinkedIn account in Settings first'
        })
      } else {
        setPostResult({
          success: false,
          message: error instanceof Error ? error.message : 'Failed to post to LinkedIn'
        })
      }
    } finally {
      setIsPosting(false)
    }
  }

  const checkLinkedInConnection = async () => {
    try {
      const response = await fetch('/api/linkedin/status')
      const data = await response.json()
      
      if (!data.connected) {
        setPostResult({
          success: false,
          message: 'Please connect your LinkedIn account in Settings first'
        })
        return false
      }
      
      return true
    } catch {
      return false
    }
  }

  const handleOpenDialog = async () => {
    const isConnected = await checkLinkedInConnection()
    if (isConnected) {
      setIsOpen(true)
    } else {
      setIsOpen(true) // Still open to show the error message
    }
  }

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        className="gap-2"
        variant="default"
      >
        <Linkedin className="h-4 w-4" />
        Post to LinkedIn
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-blue-600" />
              Post to LinkedIn
            </DialogTitle>
            <DialogDescription>
              Review your content before posting to LinkedIn
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <p className="whitespace-pre-wrap text-sm">
                {content || 'No content to post'}
              </p>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <span>{content.length} characters</span>
              <span className={content.length > 3000 ? 'text-red-500' : ''}>
                {content.length > 3000 ? 'Exceeds LinkedIn limit' : 'Within LinkedIn limit'}
              </span>
            </div>
          </div>

          {postResult && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              postResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {postResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <span className="text-sm">{postResult.message}</span>
            </div>
          )}

          <DialogFooter>
            {postResult?.success ? (
              <Button onClick={() => setIsOpen(false)}>
                Close
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isPosting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePost}
                  disabled={isPosting || !content.trim() || content.length > 3000}
                >
                  {isPosting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    'Post Now'
                  )}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/save-indicator.tsx
```tsx
'use client'

import { useEffect, useState } from 'react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { Check, Loader2, AlertCircle, Cloud } from 'lucide-react'

export function SaveIndicator() {
  const { saveStatus, lastSaved, isDirty } = useEditorStore()
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    // Show indicator when there's a status or when dirty
    setShowIndicator(!!saveStatus || isDirty)
  }, [saveStatus, isDirty])

  if (!showIndicator && !saveStatus) return null

  return (
    <div className="flex items-center gap-2 text-sm">
      {saveStatus === 'saving' && (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Saving...</span>
        </>
      )}
      
      {saveStatus === 'saved' && (
        <>
          <Check className="h-4 w-4 text-green-600" />
          <span className="text-green-600">Saved</span>
        </>
      )}
      
      {saveStatus === 'error' && (
        <>
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-red-600">Save failed</span>
        </>
      )}
      
      {!saveStatus && isDirty && (
        <>
          <Cloud className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Unsaved changes</span>
        </>
      )}
      
      {lastSaved && saveStatus === 'saved' && (
        <span className="text-xs text-muted-foreground">
          ({new Date(lastSaved).toLocaleTimeString()})
        </span>
      )}
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/spell-check-panel.tsx
```tsx
'use client'

import { useEditorStore } from '@/lib/stores/editor-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SpellCheckPanel() {
  const { content, setContent } = useEditorStore()
  const { errors, isChecking, isEnabled, setEnabled, checkText, addToPersonalDictionary } = useSpellCheckStore()

  const handleCorrect = async (error: typeof errors[0], suggestion: string) => {
    // Apply the correction to the content
    const newContent = 
      content.slice(0, error.startIndex) + 
      suggestion + 
      content.slice(error.endIndex)
    
    setContent(newContent, true) // Add to history so user can undo
    
    // Force update the textarea
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    if (textarea) {
      textarea.value = newContent
      const event = new Event('input', { bubbles: true })
      textarea.dispatchEvent(event)
    }
    
    // Re-run spell check after a brief delay to update the errors list
    setTimeout(() => {
      checkText(newContent, true) // Force check even if same text
    }, 100)
  }

  if (isChecking) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        <span className="ml-2 text-sm text-gray-500">Checking spelling...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with toggle */}
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Spell Check</h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setEnabled(!isEnabled)}
          className={cn(
            "text-xs",
            isEnabled ? "bg-green-50 border-green-200" : "bg-gray-50"
          )}
        >
          {isEnabled ? 'Enabled' : 'Disabled'}
        </Button>
      </div>

      {!isEnabled ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 text-center">
              Spell checking is disabled
            </p>
          </CardContent>
        </Card>
      ) : errors.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Check className="h-12 w-12 mx-auto mb-3 text-green-500" />
              <p className="text-sm text-gray-600">
                No spelling errors found
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Your content looks great!
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span>{errors.length} spelling {errors.length === 1 ? 'error' : 'errors'} found</span>
          </div>
          
          {errors.map((error) => (
            <Card key={`${error.word}-${error.startIndex}`} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <span className="text-red-600 font-mono">&quot;{error.word}&quot;</span>
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    Position {error.startIndex}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {error.suggestions.length > 0 ? (
                  <>
                    <CardDescription className="text-xs">
                      Did you mean:
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {error.suggestions.map((suggestion, suggIndex) => (
                        <Button
                          key={suggIndex}
                          size="sm"
                          variant="outline"
                          onClick={() => handleCorrect(error, suggestion)}
                          className="text-xs h-7"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <CardDescription className="text-xs">
                    Unknown word - please check spelling
                  </CardDescription>
                )}
                <div className="pt-2 border-t mt-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addToPersonalDictionary(error.word)}
                    className="text-xs h-7 w-full"
                  >
                    Add to Dictionary
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/spell-check-tooltip.tsx
```tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'

interface SpellCheckTooltipProps {
  word: string
  position: { x: number; y: number }
  suggestions: string[]
  onReplace: (replacement: string) => void
  onDismiss: () => void
  onAddToDictionary?: (word: string) => void
}

export function SpellCheckTooltip({ 
  word, 
  position, 
  suggestions, 
  onReplace,
  onDismiss,
  onAddToDictionary
}: SpellCheckTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [adjustedPosition, setAdjustedPosition] = useState(position)

  useEffect(() => {
    if (!tooltipRef.current) return

    const rect = tooltipRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let newX = position.x
    let newY = position.y

    // Adjust if tooltip goes off right edge
    if (rect.right > viewportWidth) {
      newX = viewportWidth - rect.width - 10
    }

    // Adjust if tooltip goes off bottom edge
    if (rect.bottom > viewportHeight) {
      newY = position.y - rect.height - 30 // Show above cursor
    }

    setAdjustedPosition({ x: newX, y: newY })
  }, [position])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        onDismiss()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onDismiss])

  return createPortal(
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-white rounded-lg shadow-lg border p-3 max-w-xs"
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y + 20}px`,
      }}
    >
      <div className="text-sm font-medium mb-2">
        Spelling: &quot;<span className="text-red-600">{word}</span>&quot;
      </div>
      
      {suggestions.length > 0 ? (
        <>
          <div className="text-xs text-gray-500 mb-2">Suggestions:</div>
          <div className="space-y-1">
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm"
                onClick={() => {
                  onReplace(suggestion)
                  onDismiss()
                }}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-sm text-gray-500">No suggestions available</div>
      )}
      
      <div className="mt-2 pt-2 border-t space-y-1">
        {onAddToDictionary && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs justify-start"
            onClick={() => {
              onAddToDictionary(word)
              onDismiss()
            }}
          >
            Add to Dictionary
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs justify-start"
          onClick={onDismiss}
        >
          Ignore
        </Button>
      </div>
    </div>,
    document.body
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/suggestion-cards.tsx
```tsx
'use client'

import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Lightbulb, AlertCircle, Loader2, WifiOff, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface SuggestionCardsProps {
  filterType?: 'grammar' | 'tone'
}

export function SuggestionCards({ filterType }: SuggestionCardsProps = {}) {
  const { content, setContent, draftId } = useEditorStore()
  const { 
    suggestions: allSuggestions, 
    selectedSuggestion, 
    isAnalyzing,
    overallScore,
    acceptSuggestion, 
    rejectSuggestion,
    trackSuggestion,
    error 
  } = useSuggestionsStore()
  
  const suggestions = filterType 
    ? allSuggestions.filter(s => s.type === filterType)
    : allSuggestions

  const handleAccept = async (suggestion: typeof suggestions[0]) => {
    if (!draftId) return

    // Get the current cursor position from the textarea
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    const cursorPos = textarea?.selectionStart || 0
    
    // Apply the suggestion to the content
    const newContent = 
      content.slice(0, suggestion.startIndex) + 
      suggestion.suggestion + 
      content.slice(suggestion.endIndex)
    
    // Calculate new cursor position
    let newCursorPos = cursorPos
    if (cursorPos >= suggestion.startIndex && cursorPos <= suggestion.endIndex) {
      // Cursor was within the replaced text, move to end of replacement
      newCursorPos = suggestion.startIndex + suggestion.suggestion.length
    } else if (cursorPos > suggestion.endIndex) {
      // Cursor was after the replaced text, adjust by the length difference
      const lengthDiff = suggestion.suggestion.length - (suggestion.endIndex - suggestion.startIndex)
      newCursorPos = cursorPos + lengthDiff
    }
    
    // Update the content in the store (this will trigger the editor to update)
    setContent(newContent, true) // Add to history so user can undo
    acceptSuggestion(suggestion.id)
    await trackSuggestion(suggestion, true, draftId)
    
    // Force update the textarea value directly and restore cursor position
    setTimeout(() => {
      if (textarea) {
        // Force the textarea to update its value
        textarea.value = newContent
        textarea.setSelectionRange(newCursorPos, newCursorPos)
        textarea.focus()
        
        // Trigger a change event to ensure the editor pane's local state updates
        const event = new Event('input', { bubbles: true })
        textarea.dispatchEvent(event)
      }
    }, 50) // Small delay to ensure React has updated
  }

  const handleReject = async (suggestion: typeof suggestions[0]) => {
    if (!draftId) return
    
    rejectSuggestion(suggestion.id)
    await trackSuggestion(suggestion, false, draftId)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  if (isAnalyzing) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        <span className="ml-2 text-sm text-gray-500">Analyzing text...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Error/Offline Notice */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
          <WifiOff className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-yellow-800">{error}</p>
            <p className="text-xs text-yellow-600 mt-1">
              Basic grammar checking is active. Some advanced suggestions may not be available.
            </p>
          </div>
        </div>
      )}
      
      {/* Overall Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <h4 className="font-medium">Content Score</h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Overall quality score based on grammar, tone, clarity, and marketing effectiveness.
                  <br /><br />
                  • 80%+ = Excellent
                  <br />
                  • 60-79% = Good
                  <br />
                  • Below 60% = Needs improvement
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Badge className={cn('px-3', getScoreBadge(overallScore))}>
          <span className={getScoreColor(overallScore)}>{overallScore}%</span>
        </Badge>
      </div>

      {/* Suggestions */}
      {suggestions.length === 0 ? (
        <div className="text-center py-8">
          <Lightbulb className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm text-gray-500">
            {allSuggestions.length === 0 
              ? "No suggestions yet. Start typing to get real-time feedback."
              : `No ${filterType} suggestions found. Try the other tabs for more feedback.`}
          </p>
          {allSuggestions.length === 0 && (
            <p className="text-xs text-gray-400 mt-2">
              Our AI analyzes for grammar, style, and clarity improvements.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <Card 
              key={suggestion.id}
              className={cn(
                "cursor-pointer transition-all",
                selectedSuggestion?.id === suggestion.id && "ring-2 ring-indigo-500"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {suggestion.type === 'grammar' ? (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <Lightbulb className="h-4 w-4 text-blue-500" />
                    )}
                    <CardTitle className="text-sm">
                      {suggestion.type === 'grammar' ? 'Grammar & Structure' : 'Tone & Style'}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(suggestion.confidence * 100)}% confident
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-gray-500 mt-0.5">Original:</span>
                    <p className="text-sm line-through text-gray-600">{suggestion.text}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-gray-500 mt-0.5">Suggested:</span>
                    <p className="text-sm font-medium text-green-700">{suggestion.suggestion}</p>
                  </div>
                </div>
                
                <CardDescription className="text-xs">
                  {suggestion.reason}
                </CardDescription>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleAccept(suggestion)}
                    className="flex-1"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(suggestion)}
                    className="flex-1"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/suggestion-highlights.tsx
```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { SpellCheckTooltip } from './spell-check-tooltip'
import { useEditorStore } from '@/lib/stores/editor-store'

interface SuggestionHighlightsProps {
  text: string
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}

interface TextSegment {
  text: string
  type: 'normal' | 'spell-error' | 'grammar' | 'tone' | 'linkedin' | 'hook' | 'structure' | 'engagement' | 'algorithm' | 'visual'
  startIndex: number
  endIndex: number
}

export function SuggestionHighlights({ text, textareaRef }: SuggestionHighlightsProps) {
  const highlightContainerRef = useRef<HTMLDivElement>(null)
  const { suggestions } = useSuggestionsStore()
  const { errors: spellErrors, addToPersonalDictionary } = useSpellCheckStore()
  const { setContent } = useEditorStore()
  const lastTextRef = useRef<string>(text)
  const [tooltipInfo, setTooltipInfo] = useState<{
    word: string
    suggestions: string[]
    position: { x: number; y: number }
    startIndex: number
    endIndex: number
  } | null>(null)

  // Sync scroll position between textarea and highlights
  useEffect(() => {
    if (!textareaRef.current || !highlightContainerRef.current) return

    const syncScroll = () => {
      if (highlightContainerRef.current && textareaRef.current) {
        highlightContainerRef.current.scrollTop = textareaRef.current.scrollTop
        highlightContainerRef.current.scrollLeft = textareaRef.current.scrollLeft
      }
    }

    const textarea = textareaRef.current
    textarea.addEventListener('scroll', syncScroll)
    
    // Initial sync
    syncScroll()

    return () => {
      textarea.removeEventListener('scroll', syncScroll)
    }
  }, [textareaRef])

  // Store the last text value to prevent unnecessary re-renders
  useEffect(() => {
    lastTextRef.current = text
  }, [text])

  const renderHighlightedText = () => {
    if (!text) {
      return null;
    }


    // Combine all highlights (spell errors and suggestions)
    const allHighlights: TextSegment[] = []
    
    // Add spell errors
    spellErrors.forEach(error => {
      allHighlights.push({
        text: error.word,
        type: 'spell-error',
        startIndex: error.startIndex,
        endIndex: error.endIndex
      })
    })
    
    // Add AI suggestions
    suggestions.forEach(suggestion => {
      // Check if this overlaps with a spell error
      const hasSpellError = spellErrors.some(error => 
        (error.startIndex <= suggestion.startIndex && error.endIndex >= suggestion.endIndex) ||
        (suggestion.startIndex <= error.startIndex && suggestion.endIndex >= error.endIndex)
      )
      
      if (!hasSpellError) {
        allHighlights.push({
          text: suggestion.text,
          type: suggestion.type,
          startIndex: suggestion.startIndex,
          endIndex: suggestion.endIndex
        })
      }
    })
    
    // Sort by start index
    allHighlights.sort((a, b) => a.startIndex - b.startIndex)
    
    // Build the highlighted text
    const segments: React.ReactNode[] = []
    let lastIndex = 0
    
    allHighlights.forEach((highlight, index) => {
      // Add normal text before this highlight
      if (lastIndex < highlight.startIndex) {
        segments.push(
          <span key={`normal-${index}`} style={{ color: 'transparent' }}>
            {text.slice(lastIndex, highlight.startIndex)}
          </span>
        )
      }
      
      // Add highlighted text
      const highlightStyle = {
        color: 'transparent',
        borderBottom: highlight.type === 'spell-error' 
          ? '2px dotted red'
          : highlight.type === 'grammar'
          ? '2px dotted #ef4444'
          : '2px dotted #3b82f6',
        cursor: highlight.type === 'spell-error' ? 'pointer' : 'default',
        position: 'relative' as const,
        backgroundColor: highlight.type === 'spell-error' 
          ? 'rgba(255, 0, 0, 0.1)'
          : 'transparent'
      }
      
      const handleSpellErrorClick = (e: React.MouseEvent) => {
        if (highlight.type === 'spell-error') {
          e.stopPropagation()
          const error = spellErrors.find(err => 
            err.startIndex === highlight.startIndex && 
            err.endIndex === highlight.endIndex
          )
          if (error) {
            const rect = (e.target as HTMLElement).getBoundingClientRect()
            setTooltipInfo({
              word: error.word,
              suggestions: error.suggestions || [],
              position: { x: rect.left, y: rect.bottom },
              startIndex: error.startIndex,
              endIndex: error.endIndex
            })
          }
        }
      }
      
      segments.push(
        <span 
          key={`highlight-${index}`} 
          style={highlightStyle}
          onClick={handleSpellErrorClick}
          className={highlight.type === 'spell-error' ? 'pointer-events-auto cursor-pointer' : ''}
        >
          {text.slice(highlight.startIndex, highlight.endIndex)}
        </span>
      )
      
      lastIndex = highlight.endIndex
    })
    
    // Add any remaining text
    if (lastIndex < text.length) {
      segments.push(
        <span key="normal-end" style={{ color: 'transparent' }}>
          {text.slice(lastIndex)}
        </span>
      )
    }
    
    return segments
  }

  const handleReplace = (replacement: string) => {
    if (!tooltipInfo) return
    
    const newText = 
      text.slice(0, tooltipInfo.startIndex) + 
      replacement + 
      text.slice(tooltipInfo.endIndex)
    
    setContent(newText)
    setTooltipInfo(null)
    
    // Force spell check to re-run after replacement
    setTimeout(() => {
      const { checkText } = useSpellCheckStore.getState()
      checkText(newText, true) // Force check even if same text
    }, 100)
  }

  return (
    <>
      <div
        ref={highlightContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none z-20"
        style={{
          fontFamily: 'inherit', // Use same font as textarea
          fontSize: '16px',
          lineHeight: '1.75',
          padding: '32px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          userSelect: 'none' // Prevent text selection in the highlights layer
        }}
      >
        <div>
          {renderHighlightedText()}
        </div>
      </div>
      
      {tooltipInfo && (
        <SpellCheckTooltip
          word={tooltipInfo.word}
          position={tooltipInfo.position}
          suggestions={tooltipInfo.suggestions}
          onReplace={handleReplace}
          onDismiss={() => setTooltipInfo(null)}
          onAddToDictionary={(word) => {
            addToPersonalDictionary(word)
            setTooltipInfo(null)
          }}
        />
      )}
    </>
  )
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/template-card.tsx
```tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  StarOff, 
  TrendingUp, 
  Target
} from 'lucide-react'
import { LinkedInTemplate } from '@/lib/data/linkedin-templates'
import { useTemplatesStore } from '@/lib/stores/templates-store'

interface TemplateCardProps {
  template: LinkedInTemplate
  onSelect: () => void
  isFavorite: boolean
}

export function TemplateCard({ template, onSelect, isFavorite }: TemplateCardProps) {
  const { toggleFavorite } = useTemplatesStore()
  
  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, string> = {
      story: '📖',
      howto: '📝',
      casestudy: '📊',
      thought: '💡',
      poll: '🗳️',
      list: '📋',
      behind: '🎬',
      success: '🏆',
      industry: '🏢',
      career: '💼'
    }
    return icons[categoryId] || '📄'
  }
  
  
  const preview = template.template.substring(0, 150).replace(/\[.*?\]/g, '___') + '...'
  
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group h-full flex flex-col">
      <div className="flex flex-col flex-1 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{getCategoryIcon(template.category)}</span>
              <h3 className="font-semibold text-gray-900">{template.title}</h3>
              {template.isViral && (
                <Badge variant="destructive" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Viral
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 -mr-2"
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(template.id)
            }}
          >
            {isFavorite ? (
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Preview */}
        <div 
          className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md line-clamp-3"
          onClick={onSelect}
        >
          {preview}
        </div>
        
        {/* Content Type */}
        <div className="flex-1">
          {template.metrics?.bestFor && (
            <div className="flex items-center gap-1 text-xs">
              <Target className="h-3 w-3 text-gray-400" />
              <span className="text-gray-600">{template.metrics.bestFor}</span>
            </div>
          )}
        </div>
        
        {/* Actions - Always at bottom */}
        <div className="flex gap-2 pt-2 mt-auto">
          <Button 
            onClick={onSelect}
            className="flex-1"
            size="sm"
          >
            Use Template
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              // Preview functionality could be added here
              onSelect()
            }}
          >
            Preview
          </Button>
        </div>
      </div>
    </Card>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/template-customizer.tsx
```tsx
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { 
  ArrowLeft, 
  Copy, 
  Save,
  Sparkles,
  X,
  CheckCircle2
} from 'lucide-react'
import { LinkedInTemplate } from '@/lib/data/linkedin-templates'
import { useTemplatesStore } from '@/lib/stores/templates-store'
import { useEditorStore } from '@/lib/stores/editor-store'
import { cn } from '@/lib/utils'

interface TemplateCustomizerProps {
  template: LinkedInTemplate
  onBack: () => void
  onClose: () => void
}

export function TemplateCustomizer({ template, onBack, onClose }: TemplateCustomizerProps) {
  const { saveCustomTemplate, addToRecent } = useTemplatesStore()
  
  const [customizedContent, setCustomizedContent] = useState(template.template)
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({})
  const [saveAsCustom, setSaveAsCustom] = useState(false)
  const [customTitle, setCustomTitle] = useState(`${template.title} (Custom)`)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const [applied, setApplied] = useState(false)
  
  // Extract unique placeholders from the template
  const extractPlaceholders = (templateText: string): string[] => {
    const regex = /\[([^\]]+)\]/g
    const matches = templateText.matchAll(regex)
    const placeholders = new Set<string>()
    
    for (const match of matches) {
      placeholders.add(match[1])
    }
    
    return Array.from(placeholders)
  }
  
  // Dynamically extract placeholders from customized content
  const [dynamicPlaceholders, setDynamicPlaceholders] = useState<string[]>([])
  
  useEffect(() => {
    const placeholders = extractPlaceholders(customizedContent)
    setDynamicPlaceholders(placeholders)
  }, [customizedContent])
  
  // Generate preview content with filled placeholders
  const getPreviewContent = () => {
    let content = customizedContent
    
    Object.entries(placeholderValues).forEach(([placeholder, value]) => {
      if (value) {
        // Replace all instances of [placeholder] with the value
        const regex = new RegExp(`\\[${placeholder}\\]`, 'g')
        content = content.replace(regex, value)
      }
    })
    
    return content
  }
  
  const handlePlaceholderChange = (placeholder: string, value: string) => {
    setPlaceholderValues(prev => ({
      ...prev,
      [placeholder]: value
    }))
  }
  
  const handleSaveTemplate = async () => {
    setIsSaving(true)
    try {
      // Save the template with placeholders intact
      await saveCustomTemplate({
        title: customTitle,
        category: template.category,
        description: `Custom version of: ${template.description}`,
        template: customizedContent, // This keeps the [placeholders] intact
        placeholders: dynamicPlaceholders,
        isPublic: false
      })
      setSaveSuccess(true)
      // Show success for 2 seconds
      setTimeout(() => setSaveSuccess(false), 2000)
    } catch (error) {
      console.error('Failed to save custom template:', error)
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleApplyToEditor = async () => {
    try {
      // Track template usage
      await addToRecent(template.id)
      
      // Generate final content with filled placeholders
      const finalContent = getPreviewContent()
      
      // Apply to editor using the store's setState method
      useEditorStore.setState({ content: finalContent })
      
      // Show success feedback
      setApplied(true)
      
      // Close the modal after a short delay
      setTimeout(() => {
        onClose()
      }, 500)
    } catch (error) {
      console.error('Error applying template:', error)
    }
  }
  
  const handleCopyToClipboard = async () => {
    try {
      const contentToCopy = getPreviewContent()
      await navigator.clipboard.writeText(contentToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }
  
  const previewContent = getPreviewContent()
  const characterCount = previewContent.length
  const isOverLimit = characterCount > 3000
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] h-[85vh] p-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <DialogTitle className="text-xl">{template.title}</DialogTitle>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex flex-1 min-h-0">
          {/* Left side - Placeholder inputs */}
          <div className="w-1/3 border-r bg-gray-50 p-6 overflow-hidden flex flex-col">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Customize Your Content
            </h3>
            
            <ScrollArea className="flex-1">
              <div className="space-y-4 pr-4">
                {dynamicPlaceholders.length > 0 ? (
                  dynamicPlaceholders.map((placeholder) => (
                    <div key={placeholder}>
                      <Label htmlFor={placeholder} className="text-sm font-medium">
                        {placeholder}
                      </Label>
                      {placeholder.toLowerCase().includes('story') || 
                       placeholder.toLowerCase().includes('description') ? (
                        <Textarea
                          id={placeholder}
                          placeholder={`Enter ${placeholder}...`}
                          value={placeholderValues[placeholder] || ''}
                          onChange={(e) => handlePlaceholderChange(placeholder, e.target.value)}
                          className="mt-1"
                          rows={3}
                        />
                      ) : (
                        <Input
                          id={placeholder}
                          placeholder={`Enter ${placeholder}...`}
                          value={placeholderValues[placeholder] || ''}
                          onChange={(e) => handlePlaceholderChange(placeholder, e.target.value)}
                          className="mt-1"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Add placeholders in the preview using [brackets]
                  </p>
                )}
                
                {/* Save as custom template section */}
                <div className="pt-4 border-t space-y-3">
                  <h4 className="text-sm font-medium">Save as Template</h4>
                  <Input
                    placeholder="Template name..."
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="text-sm"
                  />
                  <Button
                    onClick={handleSaveTemplate}
                    disabled={isSaving || !customTitle.trim()}
                    size="sm"
                    className="w-full"
                    variant="outline"
                  >
                    {isSaving ? (
                      <>
                        <Save className="h-4 w-4 mr-2 animate-pulse" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Template
                      </>
                    )}
                  </Button>
                  {saveSuccess && (
                    <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded-md">
                      <CheckCircle2 className="h-4 w-4" />
                      Saved to "My Templates"!
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Templates preserve [placeholders] for future use
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
          
          {/* Right side - Template Editor and Preview */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Template Editor</h3>
                <p className="text-xs text-gray-500">Edit template and add [placeholders] in brackets</p>
              </div>
              <div className="flex items-center gap-4">
                <div className={cn(
                  "text-sm",
                  isOverLimit ? "text-red-600 font-medium" : "text-gray-600"
                )}>
                  {characterCount} / 3000 characters
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyToClipboard}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex-1 space-y-4 overflow-hidden">
              {/* Template Editor */}
              <div className="h-1/2 flex flex-col">
                <Label className="text-sm font-medium mb-2">Template (add [placeholders] here)</Label>
                <div className="flex-1 border rounded-lg bg-white">
                  <Textarea
                    value={customizedContent}
                    onChange={(e) => setCustomizedContent(e.target.value)}
                    placeholder="Your LinkedIn post template..."
                    className="w-full h-full resize-none border-0 p-4 font-mono text-sm focus:ring-0"
                  />
                </div>
              </div>
              
              {/* Preview */}
              <div className="h-1/2 flex flex-col">
                <Label className="text-sm font-medium mb-2">Preview (with filled values)</Label>
                <div className="flex-1 border rounded-lg bg-gray-50 overflow-auto">
                  <pre className="p-4 text-sm whitespace-pre-wrap font-sans">
                    {previewContent}
                  </pre>
                </div>
              </div>
            </div>
            
            {template.example && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Example:</strong> {template.example}
                </p>
              </div>
            )}
            
            <div className="flex gap-3 mt-4">
              <Button
                onClick={handleApplyToEditor}
                disabled={isOverLimit || applied}
                className="flex-1"
                type="button"
                variant={applied ? "outline" : "default"}
              >
                {applied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Applied to Editor!
                  </>
                ) : (
                  "Apply to Editor"
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={onBack}
                type="button"
              >
                Back to Templates
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/template-modal.tsx
```tsx
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  X, 
  Star, 
  StarOff,
  Clock,
  TrendingUp,
  Plus
} from 'lucide-react'
import { useTemplatesStore } from '@/lib/stores/templates-store'
import { 
  linkedInTemplates, 
  templateCategories,
  getTemplatesByCategory,
  getViralTemplates,
  searchTemplates,
  LinkedInTemplate
} from '@/lib/data/linkedin-templates'
import { TemplateCard } from './template-card'
import { TemplateCustomizer } from './template-customizer'
import { cn } from '@/lib/utils'

export function TemplateModal() {
  const { 
    isTemplateModalOpen, 
    setTemplateModalOpen,
    selectedTemplate,
    selectTemplate,
    customTemplates,
    favoriteTemplateIds,
    recentTemplateIds,
    loadCustomTemplates
  } = useTemplatesStore()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [activeTab, setActiveTab] = useState('browse')
  
  useEffect(() => {
    if (isTemplateModalOpen) {
      loadCustomTemplates()
    }
  }, [isTemplateModalOpen, loadCustomTemplates])
  
  const getFilteredTemplates = () => {
    let templates: LinkedInTemplate[] = []
    
    if (activeTab === 'browse') {
      if (searchQuery) {
        templates = searchTemplates(searchQuery)
      } else if (selectedCategory === 'all') {
        templates = linkedInTemplates
      } else if (selectedCategory === 'viral') {
        templates = getViralTemplates()
      } else {
        templates = getTemplatesByCategory(selectedCategory)
      }
    } else if (activeTab === 'favorites') {
      templates = linkedInTemplates.filter(t => favoriteTemplateIds.includes(t.id))
    } else if (activeTab === 'recent') {
      templates = recentTemplateIds
        .map(id => linkedInTemplates.find(t => t.id === id))
        .filter(Boolean) as LinkedInTemplate[]
    } else if (activeTab === 'custom') {
      templates = customTemplates
    }
    
    return templates
  }
  
  const filteredTemplates = getFilteredTemplates()
  
  const handleSelectTemplate = (template: LinkedInTemplate) => {
    selectTemplate(template)
    setShowCustomizer(true)
  }
  
  const handleClose = () => {
    setTemplateModalOpen(false)
    setShowCustomizer(false)
    selectTemplate(null)
    setSearchQuery('')
    setSelectedCategory('all')
  }
  
  if (showCustomizer && selectedTemplate) {
    return (
      <TemplateCustomizer
        template={selectedTemplate}
        onBack={() => setShowCustomizer(false)}
        onClose={handleClose}
      />
    )
  }
  
  return (
    <Dialog open={isTemplateModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[1200px] w-[95vw] h-[90vh] p-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">LinkedIn Content Templates</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <div className="w-64 border-r bg-gray-50 p-4 overflow-y-auto">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setActiveTab('browse')
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  selectedCategory === 'all' && activeTab === 'browse' 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "hover:bg-white/50"
                )}
              >
                All Templates
              </button>
              
              <button
                onClick={() => {
                  setSelectedCategory('viral')
                  setActiveTab('browse')
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                  selectedCategory === 'viral' && activeTab === 'browse'
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "hover:bg-white/50"
                )}
              >
                <TrendingUp className="h-4 w-4" />
                Viral Templates
              </button>
              
              <div className="pt-2 pb-1">
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase">Categories</p>
              </div>
              
              {templateCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setActiveTab('browse')
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                    selectedCategory === category.id && activeTab === 'browse'
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "hover:bg-white/50"
                  )}
                >
                  <span>{category.icon}</span>
                  {category.label}
                </button>
              ))}
              
              <div className="pt-4 border-t mt-4">
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                    activeTab === 'favorites'
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "hover:bg-white/50"
                  )}
                >
                  <Star className="h-4 w-4" />
                  Favorites
                  {favoriteTemplateIds.length > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {favoriteTemplateIds.length}
                    </Badge>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab('recent')}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                    activeTab === 'recent'
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "hover:bg-white/50"
                  )}
                >
                  <Clock className="h-4 w-4" />
                  Recent
                </button>
                
                <button
                  onClick={() => setActiveTab('custom')}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                    activeTab === 'custom'
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "hover:bg-white/50"
                  )}
                >
                  <Plus className="h-4 w-4" />
                  My Templates
                  {customTemplates.length > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {customTemplates.length}
                    </Badge>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="p-6">
                {filteredTemplates.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      {searchQuery 
                        ? `No templates found for "${searchQuery}"`
                        : activeTab === 'favorites'
                        ? "No favorite templates yet"
                        : activeTab === 'recent'
                        ? "No recently used templates"
                        : activeTab === 'custom'
                        ? "No custom templates yet"
                        : "No templates in this category"}
                    </p>
                    {activeTab === 'custom' && (
                      <p className="text-sm text-gray-400 mt-2">
                        Create custom templates by modifying existing ones
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        onSelect={() => handleSelectTemplate(template)}
                        isFavorite={favoriteTemplateIds.includes(template.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/landing/features-section.tsx
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Zap, 
  BarChart3, 
  Brain, 
  Clock, 
  Shield,
  Globe
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Suggestions',
    description: 'Get intelligent grammar, style, and tone suggestions powered by GPT-4o with less than 2-second response time.',
    color: 'text-purple-600'
  },
  {
    icon: BarChart3,
    title: 'Subject Line Optimizer',
    description: 'Test multiple subject line variants and see predicted open rates before you send.',
    color: 'text-indigo-600'
  },
  {
    icon: Zap,
    title: 'Real-time Analysis',
    description: 'Instant feedback on readability, tone, and engagement potential as you write.',
    color: 'text-yellow-600'
  },
  {
    icon: Globe,
    title: 'SEO Optimization',
    description: 'Built-in SEO analysis for keyword density, meta descriptions, and content structure.',
    color: 'text-green-600'
  },
  {
    icon: Clock,
    title: 'Auto-save & Version History',
    description: 'Never lose your work with auto-save every 30 seconds and daily snapshots.',
    color: 'text-blue-600'
  },
  {
    icon: Shield,
    title: 'Compliance Checks',
    description: 'Ensure your copy meets industry standards and avoids problematic language.',
    color: 'text-red-600'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to Write Better Copy
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features designed specifically for SaaS marketing teams 
            to create compelling content that converts.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <feature.icon className={`h-10 w-10 mb-4 ${feature.color}`} />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/landing/footer.tsx
```tsx
import Link from 'next/link'
import { PenTool } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PenTool className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-bold text-white">MarketingQuill</span>
            </div>
            <p className="text-sm">
              AI-powered marketing copy assistant for SaaS teams.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">GDPR</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© 2025 MarketingQuill. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/landing/hero-section.tsx
```tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react'

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Marketing Copy
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Write Marketing Copy{' '}
              <span className="text-indigo-600">10x Faster</span>
            </h1>
            
            <p className="text-xl text-gray-600">
              AI-powered suggestions, tone adjustments, and SEO optimization 
              designed specifically for SaaS marketing teams. Write better copy 
              in less time.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Real-time grammar and tone suggestions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Subject line optimization with predicted open rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Built-in SEO analysis and compliance checks</span>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-gray-500">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
          
          {/* Right side - Product demo */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-sm border">
              <div className="bg-gray-100 p-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center text-xs text-gray-600">
                  MarketingQuill Editor
                </div>
              </div>
              <div className="relative aspect-video bg-gray-900">
                {/* Placeholder for demo GIF */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white/60">Product Demo GIF</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50" />
          </div>
        </div>
      </div>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/landing/navbar.tsx
```tsx
'use client'

import Link from 'next/link'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Button } from '@/components/ui/button'
import { PenTool } from 'lucide-react'

export function Navbar() {
  const { user } = useAuthStore()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <PenTool className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold">MarketingQuill</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Testimonials
            </Link>
            
            {user ? (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Start Free Trial
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/landing/pricing-section.tsx
```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Free',
    description: 'Perfect for trying out MarketingQuill',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: '3 drafts per month', included: true },
      { name: 'Basic grammar suggestions', included: true },
      { name: 'SEO hints', included: true },
      { name: 'Export to Markdown', included: true },
      { name: 'Subject line optimizer', included: false },
      { name: 'Advanced tone analysis', included: false },
      { name: 'Team collaboration', included: false },
      { name: 'Priority support', included: false }
    ]
  },
  {
    name: 'Pro',
    description: 'For marketing professionals',
    monthlyPrice: 29,
    yearlyPrice: 290,
    popular: true,
    features: [
      { name: 'Unlimited drafts', included: true },
      { name: 'Advanced grammar & style', included: true },
      { name: 'Full SEO analysis', included: true },
      { name: 'All export formats', included: true },
      { name: 'Subject line optimizer', included: true },
      { name: 'Advanced tone analysis', included: true },
      { name: 'Team collaboration', included: false },
      { name: 'Priority support', included: false }
    ]
  },
  {
    name: 'Team',
    description: 'For marketing teams',
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      { name: 'Everything in Pro', included: true },
      { name: 'Unlimited team members', included: true },
      { name: 'Team templates', included: true },
      { name: 'Brand voice profiles', included: true },
      { name: 'Analytics dashboard', included: true },
      { name: 'API access', included: true },
      { name: 'SSO authentication', included: true },
      { name: 'Dedicated support', included: true }
    ]
  }
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={`text-lg ${!isYearly ? 'font-semibold' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-indigo-600"
            />
            <span className={`text-lg ${isYearly ? 'font-semibold' : 'text-gray-500'}`}>
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-700">Save 20%</Badge>
            </span>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-indigo-600 shadow-xl' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600">/month</span>
                  {isYearly && plan.yearlyPrice > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Billed ${plan.yearlyPrice} yearly
                    </p>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <Link href="/auth/signup">
                  <Button 
                    className={`w-full mb-6 ${
                      plan.popular 
                        ? 'bg-indigo-600 hover:bg-indigo-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    {plan.monthlyPrice === 0 ? 'Start Free' : 'Start Free Trial'}
                  </Button>
                </Link>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? '' : 'text-gray-400'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/landing/testimonials-section.tsx
```tsx
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow SaaS',
    content: 'MarketingQuill has transformed how our team writes copy. The AI suggestions are spot-on, and we&apos;ve seen a 35% increase in email open rates.',
    rating: 5,
    image: '/testimonials/sarah.jpg'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Content Manager',
    company: 'CloudSync Inc',
    content: 'The subject line optimizer alone is worth the price. We&apos;re writing better copy in half the time, and our conversion rates have never been higher.',
    rating: 5,
    image: '/testimonials/michael.jpg'
  },
  {
    name: 'Emily Thompson',
    role: 'VP of Marketing',
    company: 'DataPro Solutions',
    content: 'Finally, an AI tool that understands SaaS marketing. The tone suggestions help us maintain consistency across all our content.',
    rating: 5,
    image: '/testimonials/emily.jpg'
  }
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Loved by Marketing Teams
          </h2>
          <p className="text-xl text-gray-600">
            See what marketing professionals are saying about MarketingQuill
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base italic">
                  &quot;{testimonial.content}&quot;
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/layouts/app-layout.tsx
```tsx
'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'

interface AppLayoutProps {
  children: ReactNode
  fullWidth?: boolean
}

export function AppLayout({ children, fullWidth = false }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className={`flex-1 overflow-y-auto ${fullWidth ? '' : 'max-w-7xl mx-auto w-full'}`}>
        {children}
      </main>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/providers/auth-provider.tsx
```tsx
'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/stores/auth-store'
import { createClient } from '@/lib/supabase/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((state) => state.fetchUser)
  const setUser = useAuthStore((state) => state.setUser)
  const isInitialized = useAuthStore((state) => state.isInitialized)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Handle error parameter from login page
  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      console.error('Auth error:', error)
    }
  }, [searchParams])

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true)
      
      try {
        const supabase = createClient()
        
        // Check active sessions and set the user
        await fetchUser()
        
        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event)
            
            if (session?.user) {
              setUser(session.user)
              await fetchUser()
            } else {
              setUser(null)
            }
            
            // Handle sign in and sign out events
            if (event === 'SIGNED_IN') {
              // If on login page, redirect to dashboard
              if (pathname === '/auth/login' || pathname === '/auth/signup') {
                router.push('/dashboard')
              }
            } else if (event === 'SIGNED_OUT') {
              // If on protected page, redirect to login
              if (pathname.startsWith('/dashboard') || 
                  pathname.startsWith('/editor') || 
                  pathname.startsWith('/admin')) {
                router.push('/auth/login')
              }
            }
          }
        )
        
        return () => subscription.unsubscribe()
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    initializeAuth()
  }, [fetchUser, setUser, router, pathname])

  // Show nothing while initializing auth to prevent flash of unauthenticated content
  if (!isInitialized && isLoading) {
    console.log('Auth is initializing, blocking content render')
    return null
  }

  console.log('Auth initialized, rendering children')
  return <>{children}</>
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/settings/data-privacy.tsx
```tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog'
import { Download, Trash2, Shield, FileJson } from 'lucide-react'
import { securityService } from '@/lib/security/security-service'
import { useToast } from '@/lib/hooks/use-toast'
import { useRouter } from 'next/navigation'

export function DataPrivacySettings() {
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleExportData = async () => {
    try {
      setIsExporting(true)
      
      toast({
        title: 'Exporting your data...',
        description: 'This may take a moment'
      })

      const data = await securityService.exportUserData()
      
      // Create and download the file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `my-data-export-${new Date().toISOString()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: 'Export complete',
        description: 'Your data has been downloaded successfully'
      })
    } catch (error) {
      console.error('Export error:', error)
      toast({
        title: 'Export failed',
        description: 'Failed to export your data. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true)
      
      toast({
        title: 'Deleting your account...',
        description: 'This action is permanent'
      })

      await securityService.deleteAllUserData()
      
      toast({
        title: 'Account deleted',
        description: 'Your account and all associated data have been permanently deleted'
      })

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: 'Deletion failed',
        description: 'Failed to delete your account. Please try again.',
        variant: 'destructive'
      })
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-6 w-6" />
        <h2 className="text-2xl font-semibold">Data & Privacy</h2>
      </div>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            Export Your Data
          </CardTitle>
          <CardDescription>
            Download all your data in a machine-readable format (GDPR compliant)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your export will include:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-2">
              <li>Profile information</li>
              <li>All drafts and content</li>
              <li>Draft snapshots and history</li>
              <li>Custom templates</li>
              <li>Usage analytics and statistics</li>
            </ul>
            <Button 
              onClick={handleExportData} 
              disabled={isExporting}
              className="w-full sm:w-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export My Data'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-destructive/10 p-4">
              <p className="text-sm text-destructive font-medium mb-2">
                Warning: This action is irreversible
              </p>
              <p className="text-sm text-muted-foreground">
                Deleting your account will permanently remove:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-2 mt-2">
                <li>Your profile and settings</li>
                <li>All drafts and content</li>
                <li>Templates and saved data</li>
                <li>Access to the platform</li>
              </ul>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  disabled={isDeleting}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete My Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Yes, delete my account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Information */}
      <Card>
        <CardHeader>
          <CardTitle>Your Privacy Rights</CardTitle>
          <CardDescription>
            We respect your privacy and data protection rights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Under GDPR and similar regulations, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access your personal data (export)</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Restrict processing of your data</li>
              <li>Data portability</li>
              <li>Object to data processing</li>
            </ul>
            <p className="pt-2">
              For more information, please review our Privacy Policy or contact our
              data protection officer.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/alert-dialog.tsx
```tsx
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/alert.tsx
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/badge.tsx
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/button.tsx
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/card.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/dialog.tsx
```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/dropdown-menu.tsx
```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/form.tsx
```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/input.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/label.tsx
```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/popover.tsx
```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/progress.tsx
```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/scroll-area.tsx
```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/select.tsx
```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/separator.tsx
```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/switch.tsx
```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/tabs.tsx
```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/textarea.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/toast.tsx
```tsx
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/toaster.tsx
```tsx
"use client"

import { useToast } from "@/lib/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/ui/tooltip.tsx
```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/test-suggestions.tsx
```tsx
'use client'

import { useState } from 'react'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function TestSuggestions() {
  const [text, setText] = useState('Myba we should try a different approach to fix this isue.')
  const { analyzeText, suggestions, isAnalyzing, error, overallScore, clearError } = useSuggestionsStore()

  const handleAnalyze = () => {
    clearError()
    console.log('Button clicked, analyzing:', text)
    analyzeText(text)
  }

  return (
    <div className="space-y-4 p-4 border rounded">
      <h3 className="font-semibold">Test Suggestions</h3>
      
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze..."
        rows={3}
      />
      
      <Button onClick={handleAnalyze} disabled={isAnalyzing}>
        {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
      </Button>
      
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      <div className="space-y-2">
        <p>Score: {overallScore}%</p>
        <p>Suggestions: {suggestions.length}</p>
        {suggestions.map((s) => (
          <div key={s.id} className="p-2 bg-gray-50 rounded text-sm">
            <p>"{s.text}" → "{s.suggestion}"</p>
            <p className="text-xs text-gray-600">{s.reason}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```
</file_contents>
<meta prompt 1 = "[Architect]">
You are a senior software architect specializing in code design and implementation planning. Your role is to:

1. Analyze the requested changes and break them down into clear, actionable steps
2. Create a detailed implementation plan that includes:
   - Files that need to be modified
   - Specific code sections requiring changes
   - New functions, methods, or classes to be added
   - Dependencies or imports to be updated
   - Data structure modifications
   - Interface changes
   - Configuration updates

For each change:
- Describe the exact location in the code where changes are needed
- Explain the logic and reasoning behind each modification
- Provide example signatures, parameters, and return types
- Note any potential side effects or impacts on other parts of the codebase
- Highlight critical architectural decisions that need to be made

You may include short code snippets to illustrate specific patterns, signatures, or structures, but do not implement the full solution.

Focus solely on the technical implementation plan - exclude testing, validation, and deployment considerations unless they directly impact the architecture.

Please proceed with your analysis based on the following <user instructions>
</meta prompt 1>
<user_instructions>
help me refactor and simplify this next.js app 
</user_instructions>