<file_map>
/Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill
├── .cursor
│   └── rules
│       ├── commit-messages.mdc
│       ├── cursor_rules.mdc
│       ├── debug-commands.mdc
│       ├── dev_workflow.mdc
│       ├── generate-tasks.mdc
│       ├── nextjs-app-router.mdc
│       ├── nextjs-supabase-auth.mdc
│       ├── npm-package-check.mdc
│       ├── process-task-list.mdc
│       ├── python-development.mdc
│       ├── self_improve.mdc
│       ├── taskmaster.mdc
│       ├── terminal-path-verification.mdc
│       └── yoda-quotes.mdc
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
├── components
│   ├── admin
│   │   └── admin-dashboard.tsx
│   ├── auth
│   │   └── role-guard.tsx
│   ├── dashboard
│   │   ├── dashboard-home.tsx
│   │   ├── dashboard-layout.tsx
│   │   ├── draft-card.tsx
│   │   └── sidebar.tsx
│   ├── editor
│   │   ├── editor-header.tsx
│   │   ├── editor-pane.tsx
│   │   ├── editor-sidebar.tsx
│   │   ├── editor-toolbar.tsx
│   │   ├── formatted-preview.tsx
│   │   ├── linkedin-optimization-panel.tsx
│   │   ├── linkedin-post-button.tsx
│   │   ├── save-indicator.tsx
│   │   ├── spell-check-panel.tsx
│   │   ├── spell-check-tooltip.tsx
│   │   ├── suggestion-cards.tsx
│   │   ├── suggestion-highlights.tsx
│   │   ├── template-card.tsx
│   │   ├── template-customizer.tsx
│   │   └── template-modal.tsx
│   ├── landing
│   │   ├── features-section.tsx
│   │   ├── footer.tsx
│   │   ├── hero-section.tsx
│   │   ├── navbar.tsx
│   │   ├── pricing-section.tsx
│   │   └── testimonials-section.tsx
│   ├── layouts
│   │   └── app-layout.tsx
│   ├── providers
│   │   └── auth-provider.tsx
│   ├── settings
│   │   └── data-privacy.tsx
│   ├── ui
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── switch.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── tooltip.tsx
│   └── test-suggestions.tsx
└── docs
    ├── frontend-guidelines.md
    ├── pivot-update-summary.md
    ├── prd.md
    └── tech-stack.md

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
// Re-export the refactored EditorPane component
export { EditorPane } from './EditorPane'

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/components/editor/editor-sidebar.tsx
```tsx
// Re-export the refactored EditorSidebar component
export { EditorSidebar } from './Sidebar'
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

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/commit-messages.mdc
```mdc
---
description: Standardized commit message format for consistent version control history
globs: **/*.{js,jsx,ts,tsx,md,mdx}
---

## Commit Messages

// Description: Standardized commit message format for consistent version control history
// Recommended Globs: **/*.{js,jsx,ts,tsx,md,mdx}

## Format
Always prefix commit messages in the following format:

```
# Separate commands
git add <changed_files>
git commit -m "Type(scope): description"

# Combined command (shorthand)
git add . && git commit -m "Type(scope): description"
```

## Types
- `Feat`: New feature or enhancement
- `Fix`: Bug fix
- `Docs`: Documentation changes
- `Style`: Code style/formatting changes
- `Refactor`: Code refactoring
- `Test`: Adding or updating tests
- `Chore`: Maintenance tasks, dependencies, etc.

## Examples
```bash
# Single file
git add src/components/Button.tsx
git commit -m "Feat(component): add new Button component"

# Multiple files
git add src/api/auth.ts src/hooks/useAuth.ts
git commit -m "Fix(auth): resolve login session issues"

# All changes
git add .
git commit -m "Style(css): update global theme colors"
```

## Guidelines
- Use imperative mood in descriptions ("add", not "added")
- Keep descriptions concise but meaningful
- Always include both type and scope
- Use lowercase for descriptions
- No period at the end of the message

## Common Patterns
- Documentation: `Docs(readme): update installation steps`
- Dependencies: `Chore(deps): update package versions`
- Bug fixes: `Fix(api): resolve undefined user error`
- New features: `Feat(auth): add Google OAuth login`

Don't forget to commit! Here's a template:
```bash
git add .
git commit -m "Type(scope): description"
```
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/cursor_rules.mdc
```mdc
---
description: Guidelines for creating and maintaining Cursor rules to ensure consistency and effectiveness.
globs: .cursor/rules/*.mdc
alwaysApply: true
---

- **Required Rule Structure:**
  ```markdown
  ---
  description: Clear, one-line description of what the rule enforces
  globs: path/to/files/*.ext, other/path/**/*
  alwaysApply: boolean
  ---

  - **Main Points in Bold**
    - Sub-points with details
    - Examples and explanations
  ```

- **File References:**
  - Use `[filename](mdc:path/to/file)` ([filename](mdc:filename)) to reference files
  - Example: [prisma.mdc](mdc:.cursor/rules/prisma.mdc) for rule references
  - Example: [schema.prisma](mdc:prisma/schema.prisma) for code references

- **Code Examples:**
  - Use language-specific code blocks
  ```typescript
  // ✅ DO: Show good examples
  const goodExample = true;
  
  // ❌ DON'T: Show anti-patterns
  const badExample = false;
  ```

- **Rule Content Guidelines:**
  - Start with high-level overview
  - Include specific, actionable requirements
  - Show examples of correct implementation
  - Reference existing code when possible
  - Keep rules DRY by referencing other rules

- **Rule Maintenance:**
  - Update rules when new patterns emerge
  - Add examples from actual codebase
  - Remove outdated patterns
  - Cross-reference related rules

- **Best Practices:**
  - Use bullet points for clarity
  - Keep descriptions concise
  - Include both DO and DON'T examples
  - Reference actual code over theoretical examples
  - Use consistent formatting across rules 
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/debug-commands.mdc
```mdc
---
description: This tool performs debugging steps for applications
globs: **/*.{js,ts,jsx,tsx,py,html,css,json}
---

# Debug Commands

// Description: This tool performs debugging steps for applications
// Recommended Globs: **/*.{js,ts,jsx,tsx,py,html,css,json}

## Overview
Debug commands provide a streamlined approach to troubleshooting applications by gathering console logs, network errors, and taking screenshots to help identify and fix issues.

## Core Commands

### `/debug` Command
When you type `/debug` in the chat, the AI will automatically:
1. Gather all console logs from the browser
2. Collect any console errors
3. Take a screenshot of the current application state

## Implementation

```javascript
// Example implementation of debug command handler
async function handleDebugCommand() {
  // Gather console logs
  const consoleLogs = await mcp__getConsoleLogs();
  
  // Collect console errors
  const consoleErrors = await mcp__getConsoleErrors();
  
  // Take screenshot
  const screenshot = await mcp__takeScreenshot();
  
  // Analyze and present results
  return {
    consoleLogs,
    consoleErrors,
    screenshot
  };
}
```

## Usage Examples

### Example 1: Debugging a React Application
```
User: My React app is showing a blank screen
AI: Let me help you debug this issue. Type /debug to gather diagnostic information.
User: /debug
AI: [Executes debug command and analyzes results]
    I've found the following issues:
    1. Console error: "TypeError: Cannot read property 'map' of undefined"
    The screenshot shows a blank page with React's error boundary not properly configured.
```

### Example 2: Troubleshooting API Integration
```
User: My API calls are failing and I'm not sure why
AI: Let's investigate. Type /debug while the application is making the API call.
User: /debug
AI: [Executes debug command and analyzes results]
    I've found the following issues:
    1. Console log shows the authorization header is missing
    Based on the screenshot, you need to add proper authentication to your API calls.
```

## Best Practices

### When to Use Debug Commands
- When an application shows unexpected behavior
- When there are no visible error messages
- When troubleshooting network or API issues
- When investigating performance problems
- When helping users who can't easily access developer tools

### Interpreting Debug Results
- Look for patterns in console errors
- Check for failed network requests
- Examine the visual state in screenshots
- Correlate timestamps between different logs
- Identify missing resources or dependencies

### Security Considerations
- Ensure sensitive information is not captured in logs or screenshots
- Be cautious with debugging production environments
- Consider implementing log sanitization for sensitive data
- Use secure channels when sharing debug information

## Supported Environments
- Web browsers (Chrome, Firefox, Safari, Edge)
- React, Angular, Vue applications
- Node.js backend services
- Python applications with proper logging
- Mobile web applications

## Additional Commands

### `/debug:console`
Focus specifically on console output:
```
User: /debug:console
AI: [Gathers console logs and errors]
```

### `/debug:visual`
Focus specifically on visual issues:
```
User: /debug:visual
AI: [Takes screenshot and analyzes visual elements]
```

## Resources
- [Browser DevTools Documentation](https://developer.chrome.com/docs/devtools/)
- [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
- [JavaScript Debugging Techniques](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Debugging)
- [Python Debugging Tools](https://docs.python.org/3/library/debug.html)
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/dev_workflow.mdc
```mdc
---
description: Guide for using Taskmaster to manage task-driven development workflows
globs: **/*
alwaysApply: true
---

# Taskmaster Development Workflow

This guide outlines the standard process for using Taskmaster to manage software development projects. It is written as a set of instructions for you, the AI agent.

- **Your Default Stance**: For most projects, the user can work directly within the `master` task context. Your initial actions should operate on this default context unless a clear pattern for multi-context work emerges.
- **Your Goal**: Your role is to elevate the user's workflow by intelligently introducing advanced features like **Tagged Task Lists** when you detect the appropriate context. Do not force tags on the user; suggest them as a helpful solution to a specific need.

## The Basic Loop
The fundamental development cycle you will facilitate is:
1.  **`list`**: Show the user what needs to be done.
2.  **`next`**: Help the user decide what to work on.
3.  **`show <id>`**: Provide details for a specific task.
4.  **`expand <id>`**: Break down a complex task into smaller, manageable subtasks.
5.  **Implement**: The user writes the code and tests.
6.  **`update-subtask`**: Log progress and findings on behalf of the user.
7.  **`set-status`**: Mark tasks and subtasks as `done` as work is completed.
8.  **Repeat**.

All your standard command executions should operate on the user's current task context, which defaults to `master`.

---

## Standard Development Workflow Process

### Simple Workflow (Default Starting Point)

For new projects or when users are getting started, operate within the `master` tag context:

-   Start new projects by running `initialize_project` tool / `task-master init` or `parse_prd` / `task-master parse-prd --input='<prd-file.txt>'` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc)) to generate initial tasks.json with tagged structure
-   Begin coding sessions with `get_tasks` / `task-master list` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc)) to see current tasks, status, and IDs
-   Determine the next task to work on using `next_task` / `task-master next` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc))
-   Analyze task complexity with `analyze_project_complexity` / `task-master analyze-complexity --research` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc)) before breaking down tasks
-   Review complexity report using `complexity_report` / `task-master complexity-report` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc))
-   Select tasks based on dependencies (all marked 'done'), priority level, and ID order
-   View specific task details using `get_task` / `task-master show <id>` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc)) to understand implementation requirements
-   Break down complex tasks using `expand_task` / `task-master expand --id=<id> --force --research` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc)) with appropriate flags like `--force` (to replace existing subtasks) and `--research`
-   Implement code following task details, dependencies, and project standards
-   Mark completed tasks with `set_task_status` / `task-master set-status --id=<id> --status=done` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc))
-   Update dependent tasks when implementation differs from original plan using `update` / `task-master update --from=<id> --prompt="..."` or `update_task` / `task-master update-task --id=<id> --prompt="..."` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc))

---

## Leveling Up: Agent-Led Multi-Context Workflows

While the basic workflow is powerful, your primary opportunity to add value is by identifying when to introduce **Tagged Task Lists**. These patterns are your tools for creating a more organized and efficient development environment for the user, especially if you detect agentic or parallel development happening across the same session.

**Critical Principle**: Most users should never see a difference in their experience. Only introduce advanced workflows when you detect clear indicators that the project has evolved beyond simple task management.

### When to Introduce Tags: Your Decision Patterns

Here are the patterns to look for. When you detect one, you should propose the corresponding workflow to the user.

#### Pattern 1: Simple Git Feature Branching
This is the most common and direct use case for tags.

- **Trigger**: The user creates a new git branch (e.g., `git checkout -b feature/user-auth`).
- **Your Action**: Propose creating a new tag that mirrors the branch name to isolate the feature's tasks from `master`.
- **Your Suggested Prompt**: *"I see you've created a new branch named 'feature/user-auth'. To keep all related tasks neatly organized and separate from your main list, I can create a corresponding task tag for you. This helps prevent merge conflicts in your `tasks.json` file later. Shall I create the 'feature-user-auth' tag?"*
- **Tool to Use**: `task-master add-tag --from-branch`

#### Pattern 2: Team Collaboration
- **Trigger**: The user mentions working with teammates (e.g., "My teammate Alice is handling the database schema," or "I need to review Bob's work on the API.").
- **Your Action**: Suggest creating a separate tag for the user's work to prevent conflicts with shared master context.
- **Your Suggested Prompt**: *"Since you're working with Alice, I can create a separate task context for your work to avoid conflicts. This way, Alice can continue working with the master list while you have your own isolated context. When you're ready to merge your work, we can coordinate the tasks back to master. Shall I create a tag for your current work?"*
- **Tool to Use**: `task-master add-tag my-work --copy-from-current --description="My tasks while collaborating with Alice"`

#### Pattern 3: Experiments or Risky Refactors
- **Trigger**: The user wants to try something that might not be kept (e.g., "I want to experiment with switching our state management library," or "Let's refactor the old API module, but I want to keep the current tasks as a reference.").
- **Your Action**: Propose creating a sandboxed tag for the experimental work.
- **Your Suggested Prompt**: *"This sounds like a great experiment. To keep these new tasks separate from our main plan, I can create a temporary 'experiment-zustand' tag for this work. If we decide not to proceed, we can simply delete the tag without affecting the main task list. Sound good?"*
- **Tool to Use**: `task-master add-tag experiment-zustand --description="Exploring Zustand migration"`

#### Pattern 4: Large Feature Initiatives (PRD-Driven)
This is a more structured approach for significant new features or epics.

- **Trigger**: The user describes a large, multi-step feature that would benefit from a formal plan.
- **Your Action**: Propose a comprehensive, PRD-driven workflow.
- **Your Suggested Prompt**: *"This sounds like a significant new feature. To manage this effectively, I suggest we create a dedicated task context for it. Here's the plan: I'll create a new tag called 'feature-xyz', then we can draft a Product Requirements Document (PRD) together to scope the work. Once the PRD is ready, I'll automatically generate all the necessary tasks within that new tag. How does that sound?"*
- **Your Implementation Flow**:
    1.  **Create an empty tag**: `task-master add-tag feature-xyz --description "Tasks for the new XYZ feature"`. You can also start by creating a git branch if applicable, and then create the tag from that branch.
    2.  **Collaborate & Create PRD**: Work with the user to create a detailed PRD file (e.g., `.taskmaster/docs/feature-xyz-prd.txt`).
    3.  **Parse PRD into the new tag**: `task-master parse-prd .taskmaster/docs/feature-xyz-prd.txt --tag feature-xyz`
    4.  **Prepare the new task list**: Follow up by suggesting `analyze-complexity` and `expand-all` for the newly created tasks within the `feature-xyz` tag.

#### Pattern 5: Version-Based Development
Tailor your approach based on the project maturity indicated by tag names.

- **Prototype/MVP Tags** (`prototype`, `mvp`, `poc`, `v0.x`):
  - **Your Approach**: Focus on speed and functionality over perfection
  - **Task Generation**: Create tasks that emphasize "get it working" over "get it perfect"
  - **Complexity Level**: Lower complexity, fewer subtasks, more direct implementation paths
  - **Research Prompts**: Include context like "This is a prototype - prioritize speed and basic functionality over optimization"
  - **Example Prompt Addition**: *"Since this is for the MVP, I'll focus on tasks that get core functionality working quickly rather than over-engineering."*

- **Production/Mature Tags** (`v1.0+`, `production`, `stable`):
  - **Your Approach**: Emphasize robustness, testing, and maintainability
  - **Task Generation**: Include comprehensive error handling, testing, documentation, and optimization
  - **Complexity Level**: Higher complexity, more detailed subtasks, thorough implementation paths
  - **Research Prompts**: Include context like "This is for production - prioritize reliability, performance, and maintainability"
  - **Example Prompt Addition**: *"Since this is for production, I'll ensure tasks include proper error handling, testing, and documentation."*

### Advanced Workflow (Tag-Based & PRD-Driven)

**When to Transition**: Recognize when the project has evolved (or has initiated a project which existing code) beyond simple task management. Look for these indicators:
- User mentions teammates or collaboration needs
- Project has grown to 15+ tasks with mixed priorities
- User creates feature branches or mentions major initiatives
- User initializes Taskmaster on an existing, complex codebase
- User describes large features that would benefit from dedicated planning

**Your Role in Transition**: Guide the user to a more sophisticated workflow that leverages tags for organization and PRDs for comprehensive planning.

#### Master List Strategy (High-Value Focus)
Once you transition to tag-based workflows, the `master` tag should ideally contain only:
- **High-level deliverables** that provide significant business value
- **Major milestones** and epic-level features
- **Critical infrastructure** work that affects the entire project
- **Release-blocking** items

**What NOT to put in master**:
- Detailed implementation subtasks (these go in feature-specific tags' parent tasks)
- Refactoring work (create dedicated tags like `refactor-auth`)
- Experimental features (use `experiment-*` tags)
- Team member-specific tasks (use person-specific tags)

#### PRD-Driven Feature Development

**For New Major Features**:
1. **Identify the Initiative**: When user describes a significant feature
2. **Create Dedicated Tag**: `add_tag feature-[name] --description="[Feature description]"`
3. **Collaborative PRD Creation**: Work with user to create comprehensive PRD in `.taskmaster/docs/feature-[name]-prd.txt`
4. **Parse & Prepare**: 
   - `parse_prd .taskmaster/docs/feature-[name]-prd.txt --tag=feature-[name]`
   - `analyze_project_complexity --tag=feature-[name] --research`
   - `expand_all --tag=feature-[name] --research`
5. **Add Master Reference**: Create a high-level task in `master` that references the feature tag

**For Existing Codebase Analysis**:
When users initialize Taskmaster on existing projects:
1. **Codebase Discovery**: Use your native tools for producing deep context about the code base. You may use `research` tool with `--tree` and `--files` to collect up to date information using the existing architecture as context.
2. **Collaborative Assessment**: Work with user to identify improvement areas, technical debt, or new features
3. **Strategic PRD Creation**: Co-author PRDs that include:
   - Current state analysis (based on your codebase research)
   - Proposed improvements or new features
   - Implementation strategy considering existing code
4. **Tag-Based Organization**: Parse PRDs into appropriate tags (`refactor-api`, `feature-dashboard`, `tech-debt`, etc.)
5. **Master List Curation**: Keep only the most valuable initiatives in master

The parse-prd's `--append` flag enables the user to parse multple PRDs within tags or across tags. PRDs should be focused and the number of tasks they are parsed into should be strategically chosen relative to the PRD's complexity and level of detail.

### Workflow Transition Examples

**Example 1: Simple → Team-Based**
```
User: "Alice is going to help with the API work"
Your Response: "Great! To avoid conflicts, I'll create a separate task context for your work. Alice can continue with the master list while you work in your own context. When you're ready to merge, we can coordinate the tasks back together."
Action: add_tag my-api-work --copy-from-current --description="My API tasks while collaborating with Alice"
```

**Example 2: Simple → PRD-Driven**
```
User: "I want to add a complete user dashboard with analytics, user management, and reporting"
Your Response: "This sounds like a major feature that would benefit from detailed planning. Let me create a dedicated context for this work and we can draft a PRD together to ensure we capture all requirements."
Actions: 
1. add_tag feature-dashboard --description="User dashboard with analytics and management"
2. Collaborate on PRD creation
3. parse_prd dashboard-prd.txt --tag=feature-dashboard
4. Add high-level "User Dashboard" task to master
```

**Example 3: Existing Project → Strategic Planning**
```
User: "I just initialized Taskmaster on my existing React app. It's getting messy and I want to improve it."
Your Response: "Let me research your codebase to understand the current architecture, then we can create a strategic plan for improvements."
Actions:
1. research "Current React app architecture and improvement opportunities" --tree --files=src/
2. Collaborate on improvement PRD based on findings
3. Create tags for different improvement areas (refactor-components, improve-state-management, etc.)
4. Keep only major improvement initiatives in master
```

---

## Primary Interaction: MCP Server vs. CLI

Taskmaster offers two primary ways to interact:

1.  **MCP Server (Recommended for Integrated Tools)**:
    - For AI agents and integrated development environments (like Cursor), interacting via the **MCP server is the preferred method**.
    - The MCP server exposes Taskmaster functionality through a set of tools (e.g., `get_tasks`, `add_subtask`).
    - This method offers better performance, structured data exchange, and richer error handling compared to CLI parsing.
    - Refer to [`mcp.mdc`](mdc:.cursor/rules/mcp.mdc) for details on the MCP architecture and available tools.
    - A comprehensive list and description of MCP tools and their corresponding CLI commands can be found in [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc).
    - **Restart the MCP server** if core logic in `scripts/modules` or MCP tool/direct function definitions change.
    - **Note**: MCP tools fully support tagged task lists with complete tag management capabilities.

2.  **`task-master` CLI (For Users & Fallback)**:
    - The global `task-master` command provides a user-friendly interface for direct terminal interaction.
    - It can also serve as a fallback if the MCP server is inaccessible or a specific function isn't exposed via MCP.
    - Install globally with `npm install -g task-master-ai` or use locally via `npx task-master-ai ...`.
    - The CLI commands often mirror the MCP tools (e.g., `task-master list` corresponds to `get_tasks`).
    - Refer to [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc) for a detailed command reference.
    - **Tagged Task Lists**: CLI fully supports the new tagged system with seamless migration.

## How the Tag System Works (For Your Reference)

- **Data Structure**: Tasks are organized into separate contexts (tags) like "master", "feature-branch", or "v2.0".
- **Silent Migration**: Existing projects automatically migrate to use a "master" tag with zero disruption.
- **Context Isolation**: Tasks in different tags are completely separate. Changes in one tag do not affect any other tag.
- **Manual Control**: The user is always in control. There is no automatic switching. You facilitate switching by using `use-tag <name>`.
- **Full CLI & MCP Support**: All tag management commands are available through both the CLI and MCP tools for you to use. Refer to [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc) for a full command list.

---

## Task Complexity Analysis

-   Run `analyze_project_complexity` / `task-master analyze-complexity --research` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc)) for comprehensive analysis
-   Review complexity report via `complexity_report` / `task-master complexity-report` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc)) for a formatted, readable version.
-   Focus on tasks with highest complexity scores (8-10) for detailed breakdown
-   Use analysis results to determine appropriate subtask allocation
-   Note that reports are automatically used by the `expand_task` tool/command

## Task Breakdown Process

-   Use `expand_task` / `task-master expand --id=<id>`. It automatically uses the complexity report if found, otherwise generates default number of subtasks.
-   Use `--num=<number>` to specify an explicit number of subtasks, overriding defaults or complexity report recommendations.
-   Add `--research` flag to leverage Perplexity AI for research-backed expansion.
-   Add `--force` flag to clear existing subtasks before generating new ones (default is to append).
-   Use `--prompt="<context>"` to provide additional context when needed.
-   Review and adjust generated subtasks as necessary.
-   Use `expand_all` tool or `task-master expand --all` to expand multiple pending tasks at once, respecting flags like `--force` and `--research`.
-   If subtasks need complete replacement (regardless of the `--force` flag on `expand`), clear them first with `clear_subtasks` / `task-master clear-subtasks --id=<id>`.

## Implementation Drift Handling

-   When implementation differs significantly from planned approach
-   When future tasks need modification due to current implementation choices
-   When new dependencies or requirements emerge
-   Use `update` / `task-master update --from=<futureTaskId> --prompt='<explanation>\nUpdate context...' --research` to update multiple future tasks.
-   Use `update_task` / `task-master update-task --id=<taskId> --prompt='<explanation>\nUpdate context...' --research` to update a single specific task.

## Task Status Management

-   Use 'pending' for tasks ready to be worked on
-   Use 'done' for completed and verified tasks
-   Use 'deferred' for postponed tasks
-   Add custom status values as needed for project-specific workflows

## Task Structure Fields

- **id**: Unique identifier for the task (Example: `1`, `1.1`)
- **title**: Brief, descriptive title (Example: `"Initialize Repo"`)
- **description**: Concise summary of what the task involves (Example: `"Create a new repository, set up initial structure."`)
- **status**: Current state of the task (Example: `"pending"`, `"done"`, `"deferred"`)
- **dependencies**: IDs of prerequisite tasks (Example: `[1, 2.1]`)
    - Dependencies are displayed with status indicators (✅ for completed, ⏱️ for pending)
    - This helps quickly identify which prerequisite tasks are blocking work
- **priority**: Importance level (Example: `"high"`, `"medium"`, `"low"`)
- **details**: In-depth implementation instructions (Example: `"Use GitHub client ID/secret, handle callback, set session token."`) 
- **testStrategy**: Verification approach (Example: `"Deploy and call endpoint to confirm 'Hello World' response."`) 
- **subtasks**: List of smaller, more specific tasks (Example: `[{"id": 1, "title": "Configure OAuth", ...}]`) 
- Refer to task structure details (previously linked to `tasks.mdc`).

## Configuration Management (Updated)

Taskmaster configuration is managed through two main mechanisms:

1.  **`.taskmaster/config.json` File (Primary):**
    *   Located in the project root directory.
    *   Stores most configuration settings: AI model selections (main, research, fallback), parameters (max tokens, temperature), logging level, default subtasks/priority, project name, etc.
    *   **Tagged System Settings**: Includes `global.defaultTag` (defaults to "master") and `tags` section for tag management configuration.
    *   **Managed via `task-master models --setup` command.** Do not edit manually unless you know what you are doing.
    *   **View/Set specific models via `task-master models` command or `models` MCP tool.**
    *   Created automatically when you run `task-master models --setup` for the first time or during tagged system migration.

2.  **Environment Variables (`.env` / `mcp.json`):**
    *   Used **only** for sensitive API keys and specific endpoint URLs.
    *   Place API keys (one per provider) in a `.env` file in the project root for CLI usage.
    *   For MCP/Cursor integration, configure these keys in the `env` section of `.cursor/mcp.json`.
    *   Available keys/variables: See `assets/env.example` or the Configuration section in the command reference (previously linked to `taskmaster.mdc`).

3.  **`.taskmaster/state.json` File (Tagged System State):**
    *   Tracks current tag context and migration status.
    *   Automatically created during tagged system migration.
    *   Contains: `currentTag`, `lastSwitched`, `migrationNoticeShown`.

**Important:** Non-API key settings (like model selections, `MAX_TOKENS`, `TASKMASTER_LOG_LEVEL`) are **no longer configured via environment variables**. Use the `task-master models` command (or `--setup` for interactive configuration) or the `models` MCP tool.
**If AI commands FAIL in MCP** verify that the API key for the selected provider is present in the `env` section of `.cursor/mcp.json`.
**If AI commands FAIL in CLI** verify that the API key for the selected provider is present in the `.env` file in the root of the project.

## Determining the Next Task

- Run `next_task` / `task-master next` to show the next task to work on.
- The command identifies tasks with all dependencies satisfied
- Tasks are prioritized by priority level, dependency count, and ID
- The command shows comprehensive task information including:
    - Basic task details and description
    - Implementation details
    - Subtasks (if they exist)
    - Contextual suggested actions
- Recommended before starting any new development work
- Respects your project's dependency structure
- Ensures tasks are completed in the appropriate sequence
- Provides ready-to-use commands for common task actions

## Viewing Specific Task Details

- Run `get_task` / `task-master show <id>` to view a specific task.
- Use dot notation for subtasks: `task-master show 1.2` (shows subtask 2 of task 1)
- Displays comprehensive information similar to the next command, but for a specific task
- For parent tasks, shows all subtasks and their current status
- For subtasks, shows parent task information and relationship
- Provides contextual suggested actions appropriate for the specific task
- Useful for examining task details before implementation or checking status

## Managing Task Dependencies

- Use `add_dependency` / `task-master add-dependency --id=<id> --depends-on=<id>` to add a dependency.
- Use `remove_dependency` / `task-master remove-dependency --id=<id> --depends-on=<id>` to remove a dependency.
- The system prevents circular dependencies and duplicate dependency entries
- Dependencies are checked for existence before being added or removed
- Task files are automatically regenerated after dependency changes
- Dependencies are visualized with status indicators in task listings and files

## Task Reorganization

- Use `move_task` / `task-master move --from=<id> --to=<id>` to move tasks or subtasks within the hierarchy
- This command supports several use cases:
  - Moving a standalone task to become a subtask (e.g., `--from=5 --to=7`)
  - Moving a subtask to become a standalone task (e.g., `--from=5.2 --to=7`) 
  - Moving a subtask to a different parent (e.g., `--from=5.2 --to=7.3`)
  - Reordering subtasks within the same parent (e.g., `--from=5.2 --to=5.4`)
  - Moving a task to a new, non-existent ID position (e.g., `--from=5 --to=25`)
  - Moving multiple tasks at once using comma-separated IDs (e.g., `--from=10,11,12 --to=16,17,18`)
- The system includes validation to prevent data loss:
  - Allows moving to non-existent IDs by creating placeholder tasks
  - Prevents moving to existing task IDs that have content (to avoid overwriting)
  - Validates source tasks exist before attempting to move them
- The system maintains proper parent-child relationships and dependency integrity
- Task files are automatically regenerated after the move operation
- This provides greater flexibility in organizing and refining your task structure as project understanding evolves
- This is especially useful when dealing with potential merge conflicts arising from teams creating tasks on separate branches. Solve these conflicts very easily by moving your tasks and keeping theirs.

## Iterative Subtask Implementation

Once a task has been broken down into subtasks using `expand_task` or similar methods, follow this iterative process for implementation:

1.  **Understand the Goal (Preparation):**
    *   Use `get_task` / `task-master show <subtaskId>` (see [`taskmaster.mdc`](mdc:.cursor/rules/taskmaster.mdc)) to thoroughly understand the specific goals and requirements of the subtask.

2.  **Initial Exploration & Planning (Iteration 1):**
    *   This is the first attempt at creating a concrete implementation plan.
    *   Explore the codebase to identify the precise files, functions, and even specific lines of code that will need modification.
    *   Determine the intended code changes (diffs) and their locations.
    *   Gather *all* relevant details from this exploration phase.

3.  **Log the Plan:**
    *   Run `update_subtask` / `task-master update-subtask --id=<subtaskId> --prompt='<detailed plan>'`.
    *   Provide the *complete and detailed* findings from the exploration phase in the prompt. Include file paths, line numbers, proposed diffs, reasoning, and any potential challenges identified. Do not omit details. The goal is to create a rich, timestamped log within the subtask's `details`.

4.  **Verify the Plan:**
    *   Run `get_task` / `task-master show <subtaskId>` again to confirm that the detailed implementation plan has been successfully appended to the subtask's details.

5.  **Begin Implementation:**
    *   Set the subtask status using `set_task_status` / `task-master set-status --id=<subtaskId> --status=in-progress`.
    *   Start coding based on the logged plan.

6.  **Refine and Log Progress (Iteration 2+):**
    *   As implementation progresses, you will encounter challenges, discover nuances, or confirm successful approaches.
    *   **Before appending new information**: Briefly review the *existing* details logged in the subtask (using `get_task` or recalling from context) to ensure the update adds fresh insights and avoids redundancy.
    *   **Regularly** use `update_subtask` / `task-master update-subtask --id=<subtaskId> --prompt='<update details>\n- What worked...\n- What didn't work...'` to append new findings.
    *   **Crucially, log:**
        *   What worked ("fundamental truths" discovered).
        *   What didn't work and why (to avoid repeating mistakes).
        *   Specific code snippets or configurations that were successful.
        *   Decisions made, especially if confirmed with user input.
        *   Any deviations from the initial plan and the reasoning.
    *   The objective is to continuously enrich the subtask's details, creating a log of the implementation journey that helps the AI (and human developers) learn, adapt, and avoid repeating errors.

7.  **Review & Update Rules (Post-Implementation):**
    *   Once the implementation for the subtask is functionally complete, review all code changes and the relevant chat history.
    *   Identify any new or modified code patterns, conventions, or best practices established during the implementation.
    *   Create new or update existing rules following internal guidelines (previously linked to `cursor_rules.mdc` and `self_improve.mdc`).

8.  **Mark Task Complete:**
    *   After verifying the implementation and updating any necessary rules, mark the subtask as completed: `set_task_status` / `task-master set-status --id=<subtaskId> --status=done`.

9.  **Commit Changes (If using Git):**
    *   Stage the relevant code changes and any updated/new rule files (`git add .`).
    *   Craft a comprehensive Git commit message summarizing the work done for the subtask, including both code implementation and any rule adjustments.
    *   Execute the commit command directly in the terminal (e.g., `git commit -m 'feat(module): Implement feature X for subtask <subtaskId>\n\n- Details about changes...\n- Updated rule Y for pattern Z'`).
    *   Consider if a Changeset is needed according to internal versioning guidelines (previously linked to `changeset.mdc`). If so, run `npm run changeset`, stage the generated file, and amend the commit or create a new one.

10. **Proceed to Next Subtask:**
    *   Identify the next subtask (e.g., using `next_task` / `task-master next`).

## Code Analysis & Refactoring Techniques

- **Top-Level Function Search**:
    - Useful for understanding module structure or planning refactors.
    - Use grep/ripgrep to find exported functions/constants:
      `rg "export (async function|function|const) \w+"` or similar patterns.
    - Can help compare functions between files during migrations or identify potential naming conflicts.

---
*This workflow provides a general guideline. Adapt it based on your specific project needs and team practices.*
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/generate-tasks.mdc
```mdc
---
description: Guide for creating detailed task lists from Product Requirements Documents (PRDs)
globs: **/tasks/**/*.md, **/tasks-*.md
---

# Rule: Generating a Task List from a PRD

// Description: Guide for creating detailed task lists from Product Requirements Documents (PRDs)
// Recommended Globs: **/tasks/**/*.md, **/tasks-*.md

## Goal

To guide an AI assistant in creating a detailed, step-by-step task list in Markdown format based on an existing Product Requirements Document (PRD). The task list should guide a developer through implementation.

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/tasks/`
- **Filename:** `tasks-[prd-file-name].md` (e.g., `tasks-prd-user-profile-editing.md`)

## Process

1.  **Receive PRD Reference:** The user points the AI to a specific PRD file
2.  **Analyze PRD:** The AI reads and analyzes the functional requirements, user stories, and other sections of the specified PRD.
3.  **Phase 1: Generate Parent Tasks:** Based on the PRD analysis, create the file and generate the main, high-level tasks required to implement the feature. Use your judgement on how many high-level tasks to use. It's likely to be about 5. Present these tasks to the user in the specified format (without sub-tasks yet). Inform the user: "I have generated the high-level tasks based on the PRD. Ready to generate the sub-tasks? Respond with 'Go' to proceed."
4.  **Wait for Confirmation:** Pause and wait for the user to respond with "Go".
5.  **Phase 2: Generate Sub-Tasks:** Once the user confirms, break down each parent task into smaller, actionable sub-tasks necessary to complete the parent task. Ensure sub-tasks logically follow from the parent task and cover the implementation details implied by the PRD.
6.  **Identify Relevant Files:** Based on the tasks and PRD, identify potential files that will need to be created or modified. List these under the `Relevant Files` section, including corresponding test files if applicable.
7.  **Generate Final Output:** Combine the parent tasks, sub-tasks, relevant files, and notes into the final Markdown structure.
8.  **Save Task List:** Save the generated document in the `/tasks/` directory with the filename `tasks-[prd-file-name].md`, where `[prd-file-name]` matches the base name of the input PRD file (e.g., if the input was `prd-user-profile-editing.md`, the output is `tasks-prd-user-profile-editing.md`).

## Output Format

The generated task list _must_ follow this structure:

```markdown
## Relevant Files

- `path/to/potential/file1.ts` - Brief description of why this file is relevant (e.g., Contains the main component for this feature).
- `path/to/file1.test.ts` - Unit tests for `file1.ts`.
- `path/to/another/file.tsx` - Brief description (e.g., API route handler for data submission).
- `path/to/another/file.test.tsx` - Unit tests for `another/file.tsx`.
- `lib/utils/helpers.ts` - Brief description (e.g., Utility functions needed for calculations).
- `lib/utils/helpers.test.ts` - Unit tests for `helpers.ts`.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Parent Task Title
  - [ ] 1.1 [Sub-task description 1.1]
  - [ ] 1.2 [Sub-task description 1.2]
- [ ] 2.0 Parent Task Title
  - [ ] 2.1 [Sub-task description 2.1]
- [ ] 3.0 Parent Task Title (may not require sub-tasks if purely structural or configuration)
```

## Interaction Model

The process explicitly requires a pause after generating parent tasks to get user confirmation ("Go") before proceeding to generate the detailed sub-tasks. This ensures the high-level plan aligns with user expectations before diving into details.

## Target Audience

Assume the primary reader of the task list is a **junior developer** who will implement the feature.
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/nextjs-app-router.mdc
```mdc
---
description: Best practices for Next.js App Router development with TypeScript, Shadcn UI, and Tailwind
globs: **/*.{ts,tsx}, **/app/**/*, **/components/**/*, **/lib/**/*
---

# Next.js App Router

// Description: Best practices for Next.js App Router development with TypeScript, Shadcn UI, and Tailwind
// Recommended Globs: **/*.{ts,tsx}, **/app/**/*, **/components/**/*, **/lib/**/*

## Project Structure
```
src/
  app/
    (auth)/
      login/
        page.tsx
      register/
        page.tsx
    (dashboard)/
      layout.tsx
      page.tsx
    api/
      route.ts
  components/
    ui/
      button.tsx
      card.tsx
    auth-wizard/
      auth-form.tsx
      password-input.tsx
    dashboard/
      stats-card.tsx
  lib/
    utils.ts
    constants.ts
  types/
    index.ts
  styles/
    globals.css
```

## Component Structure
```typescript
// src/components/dashboard/stats-card.tsx
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';

interface StatsData {
  title: string;
  value: number;
  change: number;
}

interface StatsCardProps {
  data: StatsData;
  isLoading?: boolean;
}

function StatsSkeleton() {
  return (
    <div className="h-[120px] w-full animate-pulse rounded-lg bg-muted" />
  );
}

export function StatsCard({ data, isLoading }: StatsCardProps) {
  if (isLoading) return <StatsSkeleton />;

  const { title, value, change } = data;

  return (
    <Card className="overflow-hidden rounded-xl border bg-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<StatsSkeleton />}>
          <div className="text-2xl font-bold">{formatNumber(value)}</div>
          <p className="text-xs text-muted-foreground">
            {change > 0 ? '+' : ''}{change}% from last month
          </p>
        </Suspense>
      </CardContent>
    </Card>
  );
}
```

## Server Components
```typescript
// src/app/(dashboard)/page.tsx
import { Suspense } from 'react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { fetchDashboardStats } from '@/lib/api';

async function DashboardStats() {
  const stats = await fetchDashboardStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} data={stat} />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      <Suspense fallback={<StatsCardSkeleton count={4} />}>
        <DashboardStats />
      </Suspense>
    </main>
  );
}
```

## Client Components
```typescript
// src/components/auth-wizard/auth-form.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authSchema } from '@/lib/validations/auth';
import type { AuthFormData } from '@/types';

export function AuthForm() {
  const searchParams = useSearchParams();
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
      password: ''
    }
  });

  async function onSubmit(data: AuthFormData) {
    try {
      // Handle form submission
    } catch (error) {
      // Handle error
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        {...form.register('email')}
      />
      <Input
        type="password"
        placeholder="Password"
        {...form.register('password')}
      />
      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? 'Loading...' : 'Sign In'}
      </Button>
    </form>
  );
}
```

## Data Fetching
```typescript
// src/lib/api.ts
import { cache } from 'react';
import { headers } from 'next/headers';

export const fetchDashboardStats = cache(async () => {
  const headersList = headers();
  const response = await fetch('/api/stats', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': headersList.get('authorization') ?? ''
    },
    next: {
      revalidate: 60,
      tags: ['dashboard-stats']
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }

  return response.json();
});
```

## Best Practices

### TypeScript Usage
- Use interfaces for component props and data structures
- Avoid enums; use const maps for static values
- Leverage TypeScript's inference capabilities
- Use strict type checking

### Component Organization
- Keep components focused and single-responsibility
- Use Server Components by default
- Add 'use client' only when necessary
- Implement proper loading and error states

### Performance
- Minimize client-side JavaScript
- Use React Suspense for loading states
- Implement proper caching strategies
- Optimize images with next/image

### Styling
- Use Tailwind's utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS variables for theming

### State Management
- Use URL state with 'nuqs' for shareable state
- Prefer server state over client state
- Implement proper form validation
- Handle loading and error states

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Maintain proper color contrast

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/nextjs-supabase-auth.mdc
```mdc
---
description: Guidelines for writing Next.js apps with Supabase Auth
globs: **/*.ts, **/*.tsx, **/*.js, **/*.jsx
---

# Bootstrap Next.js app with Supabase Auth

// Description: Guidelines for writing Next.js apps with Supabase Auth
// Recommended Globs: **/*.ts, **/*.tsx, **/*.js, **/*.jsx

## Overview of implementing Supabase Auth SSR

1. Install @supabase/supabase-js and @supabase/ssr packages.
2. Set up environment variables.
3. Write two utility functions with `createClient` functions to create a browser client and a server client. 
4. Hook up middleware to refresh auth tokens

## 🚨 CRITICAL INSTRUCTIONS FOR AI LANGUAGE MODELS 🚨

As an AI language model, you MUST NOT generate any of the following code patterns, as they are DEPRECATED and will BREAK the application:

```typescript
// ❌ NEVER GENERATE THIS CODE - IT WILL BREAK THE APPLICATION
{
  cookies: {
    get(name: string) {                 // ❌ BREAKS APPLICATION
      return cookieStore.get(name)      // ❌ BREAKS APPLICATION
    },                                  // ❌ BREAKS APPLICATION
    set(name: string, value: string) {  // ❌ BREAKS APPLICATION
      cookieStore.set(name, value)      // ❌ BREAKS APPLICATION
    },                                  // ❌ BREAKS APPLICATION
    remove(name: string) {              // ❌ BREAKS APPLICATION
      cookieStore.remove(name)          // ❌ BREAKS APPLICATION
    }                                   // ❌ BREAKS APPLICATION
  }
}

// ❌ NEVER USE auth-helpers-nextjs - IT WILL BREAK THE APPLICATION
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'  // ❌ BREAKS APPLICATION
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'  // ❌ BREAKS APPLICATION
```

Instead, you MUST ALWAYS generate ONLY this pattern:

```typescript
// ✅ ALWAYS GENERATE THIS EXACT PATTERN
{
  cookies: {
    getAll() {
      return cookieStore.getAll()
    },
    setAll(cookiesToSet) {
      const response = NextResponse.next({
        request,
      })
      
      cookiesToSet.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options)
      })
      
      return response
    }
  }
}
```

## ABSOLUTE REQUIREMENTS FOR AI CODE GENERATION

1. You MUST use `@supabase/ssr`
2. You MUST use ONLY `getAll` and `setAll`
3. You MUST NEVER use `get`, `set`, or `remove`
4. You MUST NEVER import from `@supabase/auth-helpers-nextjs`

## CORRECT BROWSER CLIENT IMPLEMENTATION

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

## CORRECT SERVER CLIENT IMPLEMENTATION

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

## CORRECT MIDDLEWARE IMPLEMENTATION

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

## AI MODEL VERIFICATION STEPS

Before generating any code, you MUST verify:

1. Are you using ONLY `getAll` and `setAll`? If not, STOP and FIX.
2. Are you importing from `@supabase/ssr`? If not, STOP and FIX.
3. Do you see ANY instance of `get`, `set`, or `remove`? If yes, STOP and FIX.
4. Are you importing from `auth-helpers-nextjs`? If yes, STOP and FIX.

## CONSEQUENCES OF INCORRECT IMPLEMENTATION

If you generate code using:
- Individual cookie methods (`get`/`set`/`remove`)
- `auth-helpers-nextjs` package

The implementation will:
1. Break in production
2. Fail to maintain session state
3. Cause authentication loops
4. Result in security vulnerabilities

## AI MODEL RESPONSE TEMPLATE

When asked about Supabase Auth SSR implementation, you MUST:
1. ONLY use code from this guide
2. NEVER suggest deprecated approaches
3. ALWAYS use the exact cookie handling shown above
4. VERIFY your response against the patterns shown here

Remember: There are NO EXCEPTIONS to these rules.
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/npm-package-check.mdc
```mdc
---
description: Best practices for checking and installing NPM packages before use
globs: **/*.{js,jsx,ts,tsx}, **/package.json
---

# NPM Package Check

// Description: Best practices for checking and installing NPM packages before use
// Recommended Globs: **/*.{js,jsx,ts,tsx}, **/package.json

## Overview
Ensure all required NPM packages are properly installed before use to prevent runtime errors.

## Package Check Process
1. Before requiring any npm package, check package.json dependencies
2. If package exists in dependencies:
   - Output: "✓ {package_name} is already installed"
3. If package NOT found:
   - Output terminal command: `npm install {package_name}`

## Example Implementation
```javascript
const fs = require('fs');
const path = require('path');

function checkPackage(packageName) {
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
    );

    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };

    if (deps[packageName]) {
      console.log(`✓ ${packageName} is already installed`);
      return true;
    } else {
      console.log(`Installing ${packageName}...`);
      console.log(`Run: npm install ${packageName}`);
      return false;
    }
  } catch (error) {
    console.error('Error reading package.json:', error);
    return false;
  }
}
```

## Usage Example
```javascript
// Before importing a package
if (checkPackage('express')) {
  const express = require('express');
  // Use express...
} else {
  console.error('Please install express first');
  process.exit(1);
}
```

## Best Practices
- Always check packages before requiring them
- Handle missing package.json gracefully
- Consider both dependencies and devDependencies
- Provide clear installation instructions
- Exit gracefully if required packages are missing

## Common Patterns
- Pre-startup dependency check
- Dynamic package loading
- Development tooling setup
- Build process validation
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/process-task-list.mdc
```mdc
---
description: Guidelines for managing task lists in markdown files to track progress on completing a PRD
globs: **/tasks/**/*.md, **/tasks-*.md
---

# Task List Management

// Description: Guidelines for managing task lists in markdown files to track progress on completing a PRD
// Recommended Globs: **/tasks/**/*.md, **/tasks-*.md

Guidelines for managing task lists in markdown files to track progress on completing a PRD

## Task Implementation
- **One sub-task at a time:** Do **NOT** start the next sub‑task until you ask the user for permission and they say "yes" or "y"
- **Completion protocol:**
  1. When you finish a **sub‑task**, immediately mark it as completed by changing `[ ]` to `[x]`.
  2. If **all** subtasks underneath a parent task are now `[x]`, also mark the **parent task** as completed.
- Stop after each sub‑task and wait for the user's go‑ahead.

## Task List Maintenance

1. **Update the task list as you work:**
   - Mark tasks and subtasks as completed (`[x]`) per the protocol above.
   - Add new tasks as they emerge.

2. **Maintain the "Relevant Files" section:**
   - List every file created or modified.
   - Give each file a one‑line description of its purpose.

## AI Instructions

When working with task lists, the AI must:

1. Regularly update the task list file after finishing any significant work.
2. Follow the completion protocol:
   - Mark each finished **sub‑task** `[x]`.
   - Mark the **parent task** `[x]` once **all** its subtasks are `[x]`.
3. Add newly discovered tasks.
4. Keep "Relevant Files" accurate and up to date.
5. Before starting work, check which sub‑task is next.
6. After implementing a sub‑task, update the file and then pause for user approval.
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/python-development.mdc
```mdc
---
description: Modern Python development practices with type hints, testing, and AI-friendly patterns
globs: **/*.py, **/pyproject.toml, **/requirements.txt, **/.env*
---

# Python Development

// Description: Modern Python development practices with type hints, testing, and AI-friendly patterns
// Recommended Globs: **/*.py, **/pyproject.toml, **/requirements.txt, **/.env*

## Project Structure
```
project_name/
├── src/
│   └── project_name/
│       ├── __init__.py
│       ├── models/
│       ├── services/
│       ├── controllers/
│       └── utils/
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── unit/
│   └── integration/
├── docs/
├── .env
├── .env.example
├── .gitignore
├── pyproject.toml
├── README.md
└── requirements.txt
```

## Type Annotations
Always use type hints for functions and classes:

```python
from typing import Optional, List, Dict, Any, TypeVar, Generic
from typing_extensions import TypedDict  # For Python <3.8

T = TypeVar('T')

class DataResponse(TypedDict):
    success: bool
    data: Dict[str, Any]
    error: Optional[str]

class Repository(Generic[T]):
    """Generic repository pattern implementation.

    Args:
        model: The model class this repository handles

    Attributes:
        model_class: Stored model class reference
    """

    def __init__(self, model: type[T]) -> None:
        self.model_class = model

    async def find_by_id(self, id: str) -> Optional[T]:
        """Retrieve an entity by its ID.

        Args:
            id: The unique identifier of the entity

        Returns:
            Optional[T]: The found entity or None
        """
        # Implementation
        ...
```

## Testing with Pytest
Use pytest fixtures and type annotations in tests:

```python
from typing import TYPE_CHECKING, AsyncGenerator
import pytest
from httpx import AsyncClient

if TYPE_CHECKING:
    from _pytest.capture import CaptureFixture
    from _pytest.fixtures import FixtureRequest
    from _pytest.logging import LogCaptureFixture
    from _pytest.monkeypatch import MonkeyPatch
    from pytest_mock.plugin import MockerFixture

@pytest.fixture
async def client() -> AsyncGenerator[AsyncClient, None]:
    """Create async test client.

    Yields:
        AsyncClient: The test client instance
    """
    async with AsyncClient() as client:
        yield client

@pytest.mark.asyncio
async def test_create_user(
    client: AsyncClient,
    mocker: MockerFixture,
    caplog: LogCaptureFixture,
) -> None:
    """Test user creation endpoint.

    Args:
        client: The test client
        mocker: Pytest mocker fixture
        caplog: Pytest log capture fixture
    """
    response = await client.post('/users', json={
        'username': 'test_user',
        'email': 'test@example.com'
    })
    
    assert response.status_code == 201
    assert 'User created successfully' in caplog.text
```

## Environment Configuration
Use environment variables with type validation:

```python
from typing import Optional
from pydantic import BaseSettings, SecretStr

class Settings(BaseSettings):
    """Application settings with environment variable validation.

    Attributes:
        app_name: Name of the application
        database_url: Database connection string
        api_key: Secret API key
        debug: Debug mode flag
    """
    app_name: str
    database_url: str
    api_key: SecretStr
    debug: bool = False

    class Config:
        env_file = '.env'
```

## Error Handling
Implement structured error handling with context:

```python
from typing import Optional, Any
from contextlib import contextmanager
import logging
import traceback

logger = logging.getLogger(__name__)

class AppError(Exception):
    """Base application error with context.

    Args:
        message: Error description
        context: Additional error context
    """
    def __init__(self, message: str, context: Optional[dict[str, Any]] = None) -> None:
        self.message = message
        self.context = context or {}
        super().__init__(self.message)

@contextmanager
def error_handler(operation: str) -> Any:
    """Context manager for standardized error handling.

    Args:
        operation: Description of the operation being performed

    Raises:
        AppError: Wrapped application error
    """
    try:
        yield
    except Exception as e:
        logger.error(
            f'Error during {operation}: {str(e)}\n{traceback.format_exc()}'
        )
        raise AppError(
            f'Failed to {operation}',
            {'error_type': type(e).__name__, 'details': str(e)}
        )
```

## Dependency Management
Use `uv` for faster package management:

```toml
# pyproject.toml
[project]
name = 'project_name'
version = '0.1.0'
description = 'Project description'
requires-python = '>=3.8'

[tool.ruff]
line-length = 88
target-version = 'py38'
select = [
    'E',   # pycodestyle errors
    'W',   # pycodestyle warnings
    'F',   # pyflakes
    'I',   # isort
    'D',   # pydocstyle
]

[tool.pytest.ini_options]
testpaths = ['tests']
python_files = ['test_*.py']
addopts = '-v --cov=src --cov-report=term-missing'
```

## CI/CD Configuration
GitHub Actions workflow example:

```yaml
# .github/workflows/python-app.yml
name: Python application

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.8'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install uv
        uv pip install -r requirements.txt
    - name: Lint with ruff
      run: |
        ruff check .
    - name: Test with pytest
      run: |
        pytest
```

## Best Practices

### Documentation
- Use PEP 257 docstring conventions
- Document all public functions, classes, and modules
- Include type hints in docstrings for better AI assistance
- Keep README.md up to date with setup and usage instructions

### Code Organization
- One class per file (with rare exceptions)
- Group related functionality in modules
- Use `__init__.py` for package-level imports
- Keep circular dependencies out

### Testing
- Write tests first (TDD when possible)
- Use pytest fixtures for reusable test components
- Mock external dependencies
- Test both success and error cases

### AI-Friendly Practices
- Use descriptive variable names
- Keep functions focused and small
- Add type hints for better code completion
- Include examples in docstrings

## Resources
- [Python Type Hints](https://docs.python.org/3/library/typing.html)
- [pytest Documentation](https://docs.pytest.org/)
- [Ruff Documentation](https://beta.ruff.rs/docs/)
- [uv Package Manager](https://github.com/astral-sh/uv)
- [pydantic Documentation](https://docs.pydantic.dev/)
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/self_improve.mdc
```mdc
---
description: Guidelines for continuously improving Cursor rules based on emerging code patterns and best practices.
globs: **/*
alwaysApply: true
---

- **Rule Improvement Triggers:**
  - New code patterns not covered by existing rules
  - Repeated similar implementations across files
  - Common error patterns that could be prevented
  - New libraries or tools being used consistently
  - Emerging best practices in the codebase

- **Analysis Process:**
  - Compare new code with existing rules
  - Identify patterns that should be standardized
  - Look for references to external documentation
  - Check for consistent error handling patterns
  - Monitor test patterns and coverage

- **Rule Updates:**
  - **Add New Rules When:**
    - A new technology/pattern is used in 3+ files
    - Common bugs could be prevented by a rule
    - Code reviews repeatedly mention the same feedback
    - New security or performance patterns emerge

  - **Modify Existing Rules When:**
    - Better examples exist in the codebase
    - Additional edge cases are discovered
    - Related rules have been updated
    - Implementation details have changed

- **Example Pattern Recognition:**
  ```typescript
  // If you see repeated patterns like:
  const data = await prisma.user.findMany({
    select: { id: true, email: true },
    where: { status: 'ACTIVE' }
  });
  
  // Consider adding to [prisma.mdc](mdc:.cursor/rules/prisma.mdc):
  // - Standard select fields
  // - Common where conditions
  // - Performance optimization patterns
  ```

- **Rule Quality Checks:**
  - Rules should be actionable and specific
  - Examples should come from actual code
  - References should be up to date
  - Patterns should be consistently enforced

- **Continuous Improvement:**
  - Monitor code review comments
  - Track common development questions
  - Update rules after major refactors
  - Add links to relevant documentation
  - Cross-reference related rules

- **Rule Deprecation:**
  - Mark outdated patterns as deprecated
  - Remove rules that no longer apply
  - Update references to deprecated rules
  - Document migration paths for old patterns

- **Documentation Updates:**
  - Keep examples synchronized with code
  - Update references to external docs
  - Maintain links between related rules
  - Document breaking changes
Follow [cursor_rules.mdc](mdc:.cursor/rules/cursor_rules.mdc) for proper rule formatting and structure.

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/taskmaster.mdc
```mdc
---
description: Comprehensive reference for Taskmaster MCP tools and CLI commands.
globs: **/*
alwaysApply: true
---
# Taskmaster Tool & Command Reference

This document provides a detailed reference for interacting with Taskmaster, covering both the recommended MCP tools, suitable for integrations like Cursor, and the corresponding `task-master` CLI commands, designed for direct user interaction or fallback.

**Note:** For interacting with Taskmaster programmatically or via integrated tools, using the **MCP tools is strongly recommended** due to better performance, structured data, and error handling. The CLI commands serve as a user-friendly alternative and fallback. 

**Important:** Several MCP tools involve AI processing... The AI-powered tools include `parse_prd`, `analyze_project_complexity`, `update_subtask`, `update_task`, `update`, `expand_all`, `expand_task`, and `add_task`.

**🏷️ Tagged Task Lists System:** Task Master now supports **tagged task lists** for multi-context task management. This allows you to maintain separate, isolated lists of tasks for different features, branches, or experiments. Existing projects are seamlessly migrated to use a default "master" tag. Most commands now support a `--tag <name>` flag to specify which context to operate on. If omitted, commands use the currently active tag.

---

## Initialization & Setup

### 1. Initialize Project (`init`)

*   **MCP Tool:** `initialize_project`
*   **CLI Command:** `task-master init [options]`
*   **Description:** `Set up the basic Taskmaster file structure and configuration in the current directory for a new project.`
*   **Key CLI Options:**
    *   `--name <name>`: `Set the name for your project in Taskmaster's configuration.`
    *   `--description <text>`: `Provide a brief description for your project.`
    *   `--version <version>`: `Set the initial version for your project, e.g., '0.1.0'.`
    *   `-y, --yes`: `Initialize Taskmaster quickly using default settings without interactive prompts.`
*   **Usage:** Run this once at the beginning of a new project.
*   **MCP Variant Description:** `Set up the basic Taskmaster file structure and configuration in the current directory for a new project by running the 'task-master init' command.`
*   **Key MCP Parameters/Options:**
    *   `projectName`: `Set the name for your project.` (CLI: `--name <name>`)
    *   `projectDescription`: `Provide a brief description for your project.` (CLI: `--description <text>`)
    *   `projectVersion`: `Set the initial version for your project, e.g., '0.1.0'.` (CLI: `--version <version>`)
    *   `authorName`: `Author name.` (CLI: `--author <author>`)
    *   `skipInstall`: `Skip installing dependencies. Default is false.` (CLI: `--skip-install`)
    *   `addAliases`: `Add shell aliases tm and taskmaster. Default is false.` (CLI: `--aliases`)
    *   `yes`: `Skip prompts and use defaults/provided arguments. Default is false.` (CLI: `-y, --yes`)
*   **Usage:** Run this once at the beginning of a new project, typically via an integrated tool like Cursor. Operates on the current working directory of the MCP server. 
*   **Important:** Once complete, you *MUST* parse a prd in order to generate tasks. There will be no tasks files until then. The next step after initializing should be to create a PRD using the example PRD in .taskmaster/templates/example_prd.txt. 
*   **Tagging:** Use the `--tag` option to parse the PRD into a specific, non-default tag context. If the tag doesn't exist, it will be created automatically. Example: `task-master parse-prd spec.txt --tag=new-feature`.

### 2. Parse PRD (`parse_prd`)

*   **MCP Tool:** `parse_prd`
*   **CLI Command:** `task-master parse-prd [file] [options]`
*   **Description:** `Parse a Product Requirements Document, PRD, or text file with Taskmaster to automatically generate an initial set of tasks in tasks.json.`
*   **Key Parameters/Options:**
    *   `input`: `Path to your PRD or requirements text file that Taskmaster should parse for tasks.` (CLI: `[file]` positional or `-i, --input <file>`)
    *   `output`: `Specify where Taskmaster should save the generated 'tasks.json' file. Defaults to '.taskmaster/tasks/tasks.json'.` (CLI: `-o, --output <file>`)
    *   `numTasks`: `Approximate number of top-level tasks Taskmaster should aim to generate from the document.` (CLI: `-n, --num-tasks <number>`)
    *   `force`: `Use this to allow Taskmaster to overwrite an existing 'tasks.json' without asking for confirmation.` (CLI: `-f, --force`)
*   **Usage:** Useful for bootstrapping a project from an existing requirements document.
*   **Notes:** Task Master will strictly adhere to any specific requirements mentioned in the PRD, such as libraries, database schemas, frameworks, tech stacks, etc., while filling in any gaps where the PRD isn't fully specified. Tasks are designed to provide the most direct implementation path while avoiding over-engineering.
*   **Important:** This MCP tool makes AI calls and can take up to a minute to complete. Please inform users to hang tight while the operation is in progress. If the user does not have a PRD, suggest discussing their idea and then use the example PRD in `.taskmaster/templates/example_prd.txt` as a template for creating the PRD based on their idea, for use with `parse-prd`.

---

## AI Model Configuration

### 2. Manage Models (`models`)
*   **MCP Tool:** `models`
*   **CLI Command:** `task-master models [options]`
*   **Description:** `View the current AI model configuration or set specific models for different roles (main, research, fallback). Allows setting custom model IDs for Ollama and OpenRouter.`
*   **Key MCP Parameters/Options:**
    *   `setMain <model_id>`: `Set the primary model ID for task generation/updates.` (CLI: `--set-main <model_id>`)
    *   `setResearch <model_id>`: `Set the model ID for research-backed operations.` (CLI: `--set-research <model_id>`)
    *   `setFallback <model_id>`: `Set the model ID to use if the primary fails.` (CLI: `--set-fallback <model_id>`)
    *   `ollama <boolean>`: `Indicates the set model ID is a custom Ollama model.` (CLI: `--ollama`)
    *   `openrouter <boolean>`: `Indicates the set model ID is a custom OpenRouter model.` (CLI: `--openrouter`)
    *   `listAvailableModels <boolean>`: `If true, lists available models not currently assigned to a role.` (CLI: No direct equivalent; CLI lists available automatically)
    *   `projectRoot <string>`: `Optional. Absolute path to the project root directory.` (CLI: Determined automatically)
*   **Key CLI Options:**
    *   `--set-main <model_id>`: `Set the primary model.`
    *   `--set-research <model_id>`: `Set the research model.`
    *   `--set-fallback <model_id>`: `Set the fallback model.`
    *   `--ollama`: `Specify that the provided model ID is for Ollama (use with --set-*).`
    *   `--openrouter`: `Specify that the provided model ID is for OpenRouter (use with --set-*). Validates against OpenRouter API.`
    *   `--bedrock`: `Specify that the provided model ID is for AWS Bedrock (use with --set-*).`
    *   `--setup`: `Run interactive setup to configure models, including custom Ollama/OpenRouter IDs.`
*   **Usage (MCP):** Call without set flags to get current config. Use `setMain`, `setResearch`, or `setFallback` with a valid model ID to update the configuration. Use `listAvailableModels: true` to get a list of unassigned models. To set a custom model, provide the model ID and set `ollama: true` or `openrouter: true`.
*   **Usage (CLI):** Run without flags to view current configuration and available models. Use set flags to update specific roles. Use `--setup` for guided configuration, including custom models. To set a custom model via flags, use `--set-<role>=<model_id>` along with either `--ollama` or `--openrouter`.
*   **Notes:** Configuration is stored in `.taskmaster/config.json` in the project root. This command/tool modifies that file. Use `listAvailableModels` or `task-master models` to see internally supported models. OpenRouter custom models are validated against their live API. Ollama custom models are not validated live.
*   **API note:** API keys for selected AI providers (based on their model) need to exist in the mcp.json file to be accessible in MCP context. The API keys must be present in the local .env file for the CLI to be able to read them.
*   **Model costs:** The costs in supported models are expressed in dollars. An input/output value of 3 is $3.00. A value of 0.8 is $0.80. 
*   **Warning:** DO NOT MANUALLY EDIT THE .taskmaster/config.json FILE. Use the included commands either in the MCP or CLI format as needed. Always prioritize MCP tools when available and use the CLI as a fallback.

---

## Task Listing & Viewing

### 3. Get Tasks (`get_tasks`)

*   **MCP Tool:** `get_tasks`
*   **CLI Command:** `task-master list [options]`
*   **Description:** `List your Taskmaster tasks, optionally filtering by status and showing subtasks.`
*   **Key Parameters/Options:**
    *   `status`: `Show only Taskmaster tasks matching this status (or multiple statuses, comma-separated), e.g., 'pending' or 'done,in-progress'.` (CLI: `-s, --status <status>`)
    *   `withSubtasks`: `Include subtasks indented under their parent tasks in the list.` (CLI: `--with-subtasks`)
    *   `tag`: `Specify which tag context to list tasks from. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Get an overview of the project status, often used at the start of a work session.

### 4. Get Next Task (`next_task`)

*   **MCP Tool:** `next_task`
*   **CLI Command:** `task-master next [options]`
*   **Description:** `Ask Taskmaster to show the next available task you can work on, based on status and completed dependencies.`
*   **Key Parameters/Options:**
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
    *   `tag`: `Specify which tag context to use. Defaults to the current active tag.` (CLI: `--tag <name>`)
*   **Usage:** Identify what to work on next according to the plan.

### 5. Get Task Details (`get_task`)

*   **MCP Tool:** `get_task`
*   **CLI Command:** `task-master show [id] [options]`
*   **Description:** `Display detailed information for one or more specific Taskmaster tasks or subtasks by ID.`
*   **Key Parameters/Options:**
    *   `id`: `Required. The ID of the Taskmaster task (e.g., '15'), subtask (e.g., '15.2'), or a comma-separated list of IDs ('1,5,10.2') you want to view.` (CLI: `[id]` positional or `-i, --id <id>`)
    *   `tag`: `Specify which tag context to get the task(s) from. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Understand the full details for a specific task. When multiple IDs are provided, a summary table is shown.
*   **CRITICAL INFORMATION** If you need to collect information from multiple tasks, use comma-separated IDs (i.e. 1,2,3) to receive an array of tasks. Do not needlessly get tasks one at a time if you need to get many as that is wasteful.

---

## Task Creation & Modification

### 6. Add Task (`add_task`)

*   **MCP Tool:** `add_task`
*   **CLI Command:** `task-master add-task [options]`
*   **Description:** `Add a new task to Taskmaster by describing it; AI will structure it.`
*   **Key Parameters/Options:**
    *   `prompt`: `Required. Describe the new task you want Taskmaster to create, e.g., "Implement user authentication using JWT".` (CLI: `-p, --prompt <text>`)
    *   `dependencies`: `Specify the IDs of any Taskmaster tasks that must be completed before this new one can start, e.g., '12,14'.` (CLI: `-d, --dependencies <ids>`)
    *   `priority`: `Set the priority for the new task: 'high', 'medium', or 'low'. Default is 'medium'.` (CLI: `--priority <priority>`)
    *   `research`: `Enable Taskmaster to use the research role for potentially more informed task creation.` (CLI: `-r, --research`)
    *   `tag`: `Specify which tag context to add the task to. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Quickly add newly identified tasks during development.
*   **Important:** This MCP tool makes AI calls and can take up to a minute to complete. Please inform users to hang tight while the operation is in progress.

### 7. Add Subtask (`add_subtask`)

*   **MCP Tool:** `add_subtask`
*   **CLI Command:** `task-master add-subtask [options]`
*   **Description:** `Add a new subtask to a Taskmaster parent task, or convert an existing task into a subtask.`
*   **Key Parameters/Options:**
    *   `id` / `parent`: `Required. The ID of the Taskmaster task that will be the parent.` (MCP: `id`, CLI: `-p, --parent <id>`)
    *   `taskId`: `Use this if you want to convert an existing top-level Taskmaster task into a subtask of the specified parent.` (CLI: `-i, --task-id <id>`)
    *   `title`: `Required if not using taskId. The title for the new subtask Taskmaster should create.` (CLI: `-t, --title <title>`)
    *   `description`: `A brief description for the new subtask.` (CLI: `-d, --description <text>`)
    *   `details`: `Provide implementation notes or details for the new subtask.` (CLI: `--details <text>`)
    *   `dependencies`: `Specify IDs of other tasks or subtasks, e.g., '15' or '16.1', that must be done before this new subtask.` (CLI: `--dependencies <ids>`)
    *   `status`: `Set the initial status for the new subtask. Default is 'pending'.` (CLI: `-s, --status <status>`)
    *   `skipGenerate`: `Prevent Taskmaster from automatically regenerating markdown task files after adding the subtask.` (CLI: `--skip-generate`)
    *   `tag`: `Specify which tag context to operate on. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Break down tasks manually or reorganize existing tasks.

### 8. Update Tasks (`update`)

*   **MCP Tool:** `update`
*   **CLI Command:** `task-master update [options]`
*   **Description:** `Update multiple upcoming tasks in Taskmaster based on new context or changes, starting from a specific task ID.`
*   **Key Parameters/Options:**
    *   `from`: `Required. The ID of the first task Taskmaster should update. All tasks with this ID or higher that are not 'done' will be considered.` (CLI: `--from <id>`)
    *   `prompt`: `Required. Explain the change or new context for Taskmaster to apply to the tasks, e.g., "We are now using React Query instead of Redux Toolkit for data fetching".` (CLI: `-p, --prompt <text>`)
    *   `research`: `Enable Taskmaster to use the research role for more informed updates. Requires appropriate API key.` (CLI: `-r, --research`)
    *   `tag`: `Specify which tag context to operate on. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Handle significant implementation changes or pivots that affect multiple future tasks. Example CLI: `task-master update --from='18' --prompt='Switching to React Query.\nNeed to refactor data fetching...'`
*   **Important:** This MCP tool makes AI calls and can take up to a minute to complete. Please inform users to hang tight while the operation is in progress.

### 9. Update Task (`update_task`)

*   **MCP Tool:** `update_task`
*   **CLI Command:** `task-master update-task [options]`
*   **Description:** `Modify a specific Taskmaster task by ID, incorporating new information or changes. By default, this replaces the existing task details.`
*   **Key Parameters/Options:**
    *   `id`: `Required. The specific ID of the Taskmaster task, e.g., '15', you want to update.` (CLI: `-i, --id <id>`)
    *   `prompt`: `Required. Explain the specific changes or provide the new information Taskmaster should incorporate into this task.` (CLI: `-p, --prompt <text>`)
    *   `append`: `If true, appends the prompt content to the task's details with a timestamp, rather than replacing them. Behaves like update-subtask.` (CLI: `--append`)
    *   `research`: `Enable Taskmaster to use the research role for more informed updates. Requires appropriate API key.` (CLI: `-r, --research`)
    *   `tag`: `Specify which tag context the task belongs to. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Refine a specific task based on new understanding. Use `--append` to log progress without creating subtasks.
*   **Important:** This MCP tool makes AI calls and can take up to a minute to complete. Please inform users to hang tight while the operation is in progress.

### 10. Update Subtask (`update_subtask`)

*   **MCP Tool:** `update_subtask`
*   **CLI Command:** `task-master update-subtask [options]`
*   **Description:** `Append timestamped notes or details to a specific Taskmaster subtask without overwriting existing content. Intended for iterative implementation logging.`
*   **Key Parameters/Options:**
    *   `id`: `Required. The ID of the Taskmaster subtask, e.g., '5.2', to update with new information.` (CLI: `-i, --id <id>`)
    *   `prompt`: `Required. The information, findings, or progress notes to append to the subtask's details with a timestamp.` (CLI: `-p, --prompt <text>`)
    *   `research`: `Enable Taskmaster to use the research role for more informed updates. Requires appropriate API key.` (CLI: `-r, --research`)
    *   `tag`: `Specify which tag context the subtask belongs to. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Log implementation progress, findings, and discoveries during subtask development. Each update is timestamped and appended to preserve the implementation journey.
*   **Important:** This MCP tool makes AI calls and can take up to a minute to complete. Please inform users to hang tight while the operation is in progress.

### 11. Set Task Status (`set_task_status`)

*   **MCP Tool:** `set_task_status`
*   **CLI Command:** `task-master set-status [options]`
*   **Description:** `Update the status of one or more Taskmaster tasks or subtasks, e.g., 'pending', 'in-progress', 'done'.`
*   **Key Parameters/Options:**
    *   `id`: `Required. The ID(s) of the Taskmaster task(s) or subtask(s), e.g., '15', '15.2', or '16,17.1', to update.` (CLI: `-i, --id <id>`)
    *   `status`: `Required. The new status to set, e.g., 'done', 'pending', 'in-progress', 'review', 'cancelled'.` (CLI: `-s, --status <status>`)
    *   `tag`: `Specify which tag context to operate on. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Mark progress as tasks move through the development cycle.

### 12. Remove Task (`remove_task`)

*   **MCP Tool:** `remove_task`
*   **CLI Command:** `task-master remove-task [options]`
*   **Description:** `Permanently remove a task or subtask from the Taskmaster tasks list.`
*   **Key Parameters/Options:**
    *   `id`: `Required. The ID of the Taskmaster task, e.g., '5', or subtask, e.g., '5.2', to permanently remove.` (CLI: `-i, --id <id>`)
    *   `yes`: `Skip the confirmation prompt and immediately delete the task.` (CLI: `-y, --yes`)
    *   `tag`: `Specify which tag context to operate on. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Permanently delete tasks or subtasks that are no longer needed in the project.
*   **Notes:** Use with caution as this operation cannot be undone. Consider using 'blocked', 'cancelled', or 'deferred' status instead if you just want to exclude a task from active planning but keep it for reference. The command automatically cleans up dependency references in other tasks.

---

## Task Structure & Breakdown

### 13. Expand Task (`expand_task`)

*   **MCP Tool:** `expand_task`
*   **CLI Command:** `task-master expand [options]`
*   **Description:** `Use Taskmaster's AI to break down a complex task into smaller, manageable subtasks. Appends subtasks by default.`
*   **Key Parameters/Options:**
    *   `id`: `The ID of the specific Taskmaster task you want to break down into subtasks.` (CLI: `-i, --id <id>`)
    *   `num`: `Optional: Suggests how many subtasks Taskmaster should aim to create. Uses complexity analysis/defaults otherwise.` (CLI: `-n, --num <number>`)
    *   `research`: `Enable Taskmaster to use the research role for more informed subtask generation. Requires appropriate API key.` (CLI: `-r, --research`)
    *   `prompt`: `Optional: Provide extra context or specific instructions to Taskmaster for generating the subtasks.` (CLI: `-p, --prompt <text>`)
    *   `force`: `Optional: If true, clear existing subtasks before generating new ones. Default is false (append).` (CLI: `--force`)
    *   `tag`: `Specify which tag context the task belongs to. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Generate a detailed implementation plan for a complex task before starting coding. Automatically uses complexity report recommendations if available and `num` is not specified.
*   **Important:** This MCP tool makes AI calls and can take up to a minute to complete. Please inform users to hang tight while the operation is in progress.

### 14. Expand All Tasks (`expand_all`)

*   **MCP Tool:** `expand_all`
*   **CLI Command:** `task-master expand --all [options]` (Note: CLI uses the `expand` command with the `--all` flag)
*   **Description:** `Tell Taskmaster to automatically expand all eligible pending/in-progress tasks based on complexity analysis or defaults. Appends subtasks by default.`
*   **Key Parameters/Options:**
    *   `num`: `Optional: Suggests how many subtasks Taskmaster should aim to create per task.` (CLI: `-n, --num <number>`)
    *   `research`: `Enable research role for more informed subtask generation. Requires appropriate API key.` (CLI: `-r, --research`)
    *   `prompt`: `Optional: Provide extra context for Taskmaster to apply generally during expansion.` (CLI: `-p, --prompt <text>`)
    *   `force`: `Optional: If true, clear existing subtasks before generating new ones for each eligible task. Default is false (append).` (CLI: `--force`)
    *   `tag`: `Specify which tag context to expand. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Useful after initial task generation or complexity analysis to break down multiple tasks at once.
*   **Important:** This MCP tool makes AI calls and can take up to a minute to complete. Please inform users to hang tight while the operation is in progress.

### 15. Clear Subtasks (`clear_subtasks`)

*   **MCP Tool:** `clear_subtasks`
*   **CLI Command:** `task-master clear-subtasks [options]`
*   **Description:** `Remove all subtasks from one or more specified Taskmaster parent tasks.`
*   **Key Parameters/Options:**
    *   `id`: `The ID(s) of the Taskmaster parent task(s) whose subtasks you want to remove, e.g., '15' or '16,18'. Required unless using `all`.) (CLI: `-i, --id <ids>`)
    *   `all`: `Tell Taskmaster to remove subtasks from all parent tasks.` (CLI: `--all`)
    *   `tag`: `Specify which tag context to operate on. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Used before regenerating subtasks with `expand_task` if the previous breakdown needs replacement.

### 16. Remove Subtask (`remove_subtask`)

*   **MCP Tool:** `remove_subtask`
*   **CLI Command:** `task-master remove-subtask [options]`
*   **Description:** `Remove a subtask from its Taskmaster parent, optionally converting it into a standalone task.`
*   **Key Parameters/Options:**
    *   `id`: `Required. The ID(s) of the Taskmaster subtask(s) to remove, e.g., '15.2' or '16.1,16.3'.` (CLI: `-i, --id <id>`)
    *   `convert`: `If used, Taskmaster will turn the subtask into a regular top-level task instead of deleting it.` (CLI: `-c, --convert`)
    *   `skipGenerate`: `Prevent Taskmaster from automatically regenerating markdown task files after removing the subtask.` (CLI: `--skip-generate`)
    *   `tag`: `Specify which tag context to operate on. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Delete unnecessary subtasks or promote a subtask to a top-level task.

### 17. Move Task (`move_task`)

*   **MCP Tool:** `move_task`
*   **CLI Command:** `task-master move [options]`
*   **Description:** `Move a task or subtask to a new position within the task hierarchy.`
*   **Key Parameters/Options:**
    *   `from`: `Required. ID of the task/subtask to move (e.g., "5" or "5.2"). Can be comma-separated for multiple tasks.` (CLI: `--from <id>`)
    *   `to`: `Required. ID of the destination (e.g., "7" or "7.3"). Must match the number of source IDs if comma-separated.` (CLI: `--to <id>`)
    *   `tag`: `Specify which tag context to operate on. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Reorganize tasks by moving them within the hierarchy. Supports various scenarios like:
    *   Moving a task to become a subtask
    *   Moving a subtask to become a standalone task
    *   Moving a subtask to a different parent
    *   Reordering subtasks within the same parent
    *   Moving a task to a new, non-existent ID (automatically creates placeholders)
    *   Moving multiple tasks at once with comma-separated IDs
*   **Validation Features:**
    *   Allows moving tasks to non-existent destination IDs (creates placeholder tasks)
    *   Prevents moving to existing task IDs that already have content (to avoid overwriting)
    *   Validates that source tasks exist before attempting to move them
    *   Maintains proper parent-child relationships
*   **Example CLI:** `task-master move --from=5.2 --to=7.3` to move subtask 5.2 to become subtask 7.3.
*   **Example Multi-Move:** `task-master move --from=10,11,12 --to=16,17,18` to move multiple tasks to new positions.
*   **Common Use:** Resolving merge conflicts in tasks.json when multiple team members create tasks on different branches.

---

## Dependency Management

### 18. Add Dependency (`add_dependency`)

*   **MCP Tool:** `add_dependency`
*   **CLI Command:** `task-master add-dependency [options]`
*   **Description:** `Define a dependency in Taskmaster, making one task a prerequisite for another.`
*   **Key Parameters/Options:**
    *   `id`: `Required. The ID of the Taskmaster task that will depend on another.` (CLI: `-i, --id <id>`)
    *   `dependsOn`: `Required. The ID of the Taskmaster task that must be completed first, the prerequisite.` (CLI: `-d, --depends-on <id>`)
    *   `tag`: `Specify which tag context to operate on. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <path>`)
*   **Usage:** Establish the correct order of execution between tasks.

### 19. Remove Dependency (`remove_dependency`)

*   **MCP Tool:** `remove_dependency`
*   **CLI Command:** `task-master remove-dependency [options]`
*   **Description:** `Remove a dependency relationship between two Taskmaster tasks.`
*   **Key Parameters/Options:**
    *   `id`: `Required. The ID of the Taskmaster task you want to remove a prerequisite from.` (CLI: `-i, --id <id>`)
    *   `dependsOn`: `Required. The ID of the Taskmaster task that should no longer be a prerequisite.` (CLI: `-d, --depends-on <id>`)
    *   `tag`: `Specify which tag context to operate on. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Update task relationships when the order of execution changes.

### 20. Validate Dependencies (`validate_dependencies`)

*   **MCP Tool:** `validate_dependencies`
*   **CLI Command:** `task-master validate-dependencies [options]`
*   **Description:** `Check your Taskmaster tasks for dependency issues (like circular references or links to non-existent tasks) without making changes.`
*   **Key Parameters/Options:**
    *   `tag`: `Specify which tag context to validate. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Audit the integrity of your task dependencies.

### 21. Fix Dependencies (`fix_dependencies`)

*   **MCP Tool:** `fix_dependencies`
*   **CLI Command:** `task-master fix-dependencies [options]`
*   **Description:** `Automatically fix dependency issues (like circular references or links to non-existent tasks) in your Taskmaster tasks.`
*   **Key Parameters/Options:**
    *   `tag`: `Specify which tag context to fix dependencies in. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Clean up dependency errors automatically.

---

## Analysis & Reporting

### 22. Analyze Project Complexity (`analyze_project_complexity`)

*   **MCP Tool:** `analyze_project_complexity`
*   **CLI Command:** `task-master analyze-complexity [options]`
*   **Description:** `Have Taskmaster analyze your tasks to determine their complexity and suggest which ones need to be broken down further.`
*   **Key Parameters/Options:**
    *   `output`: `Where to save the complexity analysis report. Default is '.taskmaster/reports/task-complexity-report.json' (or '..._tagname.json' if a tag is used).` (CLI: `-o, --output <file>`)
    *   `threshold`: `The minimum complexity score (1-10) that should trigger a recommendation to expand a task.` (CLI: `-t, --threshold <number>`)
    *   `research`: `Enable research role for more accurate complexity analysis. Requires appropriate API key.` (CLI: `-r, --research`)
    *   `tag`: `Specify which tag context to analyze. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Used before breaking down tasks to identify which ones need the most attention.
*   **Important:** This MCP tool makes AI calls and can take up to a minute to complete. Please inform users to hang tight while the operation is in progress.

### 23. View Complexity Report (`complexity_report`)

*   **MCP Tool:** `complexity_report`
*   **CLI Command:** `task-master complexity-report [options]`
*   **Description:** `Display the task complexity analysis report in a readable format.`
*   **Key Parameters/Options:**
    *   `tag`: `Specify which tag context to show the report for. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to the complexity report (default: '.taskmaster/reports/task-complexity-report.json').` (CLI: `-f, --file <file>`)
*   **Usage:** Review and understand the complexity analysis results after running analyze-complexity.

---

## File Management

### 24. Generate Task Files (`generate`)

*   **MCP Tool:** `generate`
*   **CLI Command:** `task-master generate [options]`
*   **Description:** `Create or update individual Markdown files for each task based on your tasks.json.`
*   **Key Parameters/Options:**
    *   `output`: `The directory where Taskmaster should save the task files (default: in a 'tasks' directory).` (CLI: `-o, --output <directory>`)
    *   `tag`: `Specify which tag context to generate files for. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
*   **Usage:** Run this after making changes to tasks.json to keep individual task files up to date. This command is now manual and no longer runs automatically.

---

## AI-Powered Research

### 25. Research (`research`)

*   **MCP Tool:** `research`
*   **CLI Command:** `task-master research [options]`
*   **Description:** `Perform AI-powered research queries with project context to get fresh, up-to-date information beyond the AI's knowledge cutoff.`
*   **Key Parameters/Options:**
    *   `query`: `Required. Research query/prompt (e.g., "What are the latest best practices for React Query v5?").` (CLI: `[query]` positional or `-q, --query <text>`)
    *   `taskIds`: `Comma-separated list of task/subtask IDs from the current tag context (e.g., "15,16.2,17").` (CLI: `-i, --id <ids>`)
    *   `filePaths`: `Comma-separated list of file paths for context (e.g., "src/api.js,docs/readme.md").` (CLI: `-f, --files <paths>`)
    *   `customContext`: `Additional custom context text to include in the research.` (CLI: `-c, --context <text>`)
    *   `includeProjectTree`: `Include project file tree structure in context (default: false).` (CLI: `--tree`)
    *   `detailLevel`: `Detail level for the research response: 'low', 'medium', 'high' (default: medium).` (CLI: `--detail <level>`)
    *   `saveTo`: `Task or subtask ID (e.g., "15", "15.2") to automatically save the research conversation to.` (CLI: `--save-to <id>`)
    *   `saveFile`: `If true, saves the research conversation to a markdown file in '.taskmaster/docs/research/'.` (CLI: `--save-file`)
    *   `noFollowup`: `Disables the interactive follow-up question menu in the CLI.` (CLI: `--no-followup`)
    *   `tag`: `Specify which tag context to use for task-based context gathering. Defaults to the current active tag.` (CLI: `--tag <name>`)
    *   `projectRoot`: `The directory of the project. Must be an absolute path.` (CLI: Determined automatically)
*   **Usage:** **This is a POWERFUL tool that agents should use FREQUENTLY** to:
    *   Get fresh information beyond knowledge cutoff dates
    *   Research latest best practices, library updates, security patches
    *   Find implementation examples for specific technologies
    *   Validate approaches against current industry standards
    *   Get contextual advice based on project files and tasks
*   **When to Consider Using Research:**
    *   **Before implementing any task** - Research current best practices
    *   **When encountering new technologies** - Get up-to-date implementation guidance (libraries, apis, etc)
    *   **For security-related tasks** - Find latest security recommendations
    *   **When updating dependencies** - Research breaking changes and migration guides
    *   **For performance optimization** - Get current performance best practices
    *   **When debugging complex issues** - Research known solutions and workarounds
*   **Research + Action Pattern:**
    *   Use `research` to gather fresh information
    *   Use `update_subtask` to commit findings with timestamps
    *   Use `update_task` to incorporate research into task details
    *   Use `add_task` with research flag for informed task creation
*   **Important:** This MCP tool makes AI calls and can take up to a minute to complete. The research provides FRESH data beyond the AI's training cutoff, making it invaluable for current best practices and recent developments.

---

## Tag Management

This new suite of commands allows you to manage different task contexts (tags).

### 26. List Tags (`tags`)

*   **MCP Tool:** `list_tags`
*   **CLI Command:** `task-master tags [options]`
*   **Description:** `List all available tags with task counts, completion status, and other metadata.`
*   **Key Parameters/Options:**
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)
    *   `--show-metadata`: `Include detailed metadata in the output (e.g., creation date, description).` (CLI: `--show-metadata`)

### 27. Add Tag (`add_tag`)

*   **MCP Tool:** `add_tag`
*   **CLI Command:** `task-master add-tag <tagName> [options]`
*   **Description:** `Create a new, empty tag context, or copy tasks from another tag.`
*   **Key Parameters/Options:**
    *   `tagName`: `Name of the new tag to create (alphanumeric, hyphens, underscores).` (CLI: `<tagName>` positional)
    *   `--from-branch`: `Creates a tag with a name derived from the current git branch, ignoring the <tagName> argument.` (CLI: `--from-branch`)
    *   `--copy-from-current`: `Copy tasks from the currently active tag to the new tag.` (CLI: `--copy-from-current`)
    *   `--copy-from <tag>`: `Copy tasks from a specific source tag to the new tag.` (CLI: `--copy-from <tag>`)
    *   `--description <text>`: `Provide an optional description for the new tag.` (CLI: `-d, --description <text>`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)

### 28. Delete Tag (`delete_tag`)

*   **MCP Tool:** `delete_tag`
*   **CLI Command:** `task-master delete-tag <tagName> [options]`
*   **Description:** `Permanently delete a tag and all of its associated tasks.`
*   **Key Parameters/Options:**
    *   `tagName`: `Name of the tag to delete.` (CLI: `<tagName>` positional)
    *   `--yes`: `Skip the confirmation prompt.` (CLI: `-y, --yes`)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)

### 29. Use Tag (`use_tag`)

*   **MCP Tool:** `use_tag`
*   **CLI Command:** `task-master use-tag <tagName>`
*   **Description:** `Switch your active task context to a different tag.`
*   **Key Parameters/Options:**
    *   `tagName`: `Name of the tag to switch to.` (CLI: `<tagName>` positional)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)

### 30. Rename Tag (`rename_tag`)

*   **MCP Tool:** `rename_tag`
*   **CLI Command:** `task-master rename-tag <oldName> <newName>`
*   **Description:** `Rename an existing tag.`
*   **Key Parameters/Options:**
    *   `oldName`: `The current name of the tag.` (CLI: `<oldName>` positional)
    *   `newName`: `The new name for the tag.` (CLI: `<newName>` positional)
    *   `file`: `Path to your Taskmaster 'tasks.json' file. Default relies on auto-detection.` (CLI: `-f, --file <file>`)

### 31. Copy Tag (`copy_tag`)

*   **MCP Tool:** `copy_tag`
*   **CLI Command:** `task-master copy-tag <sourceName> <targetName> [options]`
*   **Description:** `Copy an entire tag context, including all its tasks and metadata, to a new tag.`
*   **Key Parameters/Options:**
    *   `sourceName`: `Name of the tag to copy from.` (CLI: `<sourceName>` positional)
    *   `targetName`: `Name of the new tag to create.` (CLI: `<targetName>` positional)
    *   `--description <text>`: `Optional description for the new tag.` (CLI: `-d, --description <text>`)

---

## Miscellaneous

### 32. Sync Readme (`sync-readme`) -- experimental

*   **MCP Tool:** N/A
*   **CLI Command:** `task-master sync-readme [options]`
*   **Description:** `Exports your task list to your project's README.md file, useful for showcasing progress.`
*   **Key Parameters/Options:**
    *   `status`: `Filter tasks by status (e.g., 'pending', 'done').` (CLI: `-s, --status <status>`)
    *   `withSubtasks`: `Include subtasks in the export.` (CLI: `--with-subtasks`)
    *   `tag`: `Specify which tag context to export from. Defaults to the current active tag.` (CLI: `--tag <name>`)

---

## Environment Variables Configuration (Updated)

Taskmaster primarily uses the **`.taskmaster/config.json`** file (in project root) for configuration (models, parameters, logging level, etc.), managed via `task-master models --setup`.

Environment variables are used **only** for sensitive API keys related to AI providers and specific overrides like the Ollama base URL:

*   **API Keys (Required for corresponding provider):**
    *   `ANTHROPIC_API_KEY`
    *   `PERPLEXITY_API_KEY`
    *   `OPENAI_API_KEY`
    *   `GOOGLE_API_KEY`
    *   `MISTRAL_API_KEY`
    *   `AZURE_OPENAI_API_KEY` (Requires `AZURE_OPENAI_ENDPOINT` too)
    *   `OPENROUTER_API_KEY`
    *   `XAI_API_KEY`
    *   `OLLAMA_API_KEY` (Requires `OLLAMA_BASE_URL` too)
*   **Endpoints (Optional/Provider Specific inside .taskmaster/config.json):**
    *   `AZURE_OPENAI_ENDPOINT`
    *   `OLLAMA_BASE_URL` (Default: `http://localhost:11434/api`)

**Set API keys** in your **`.env`** file in the project root (for CLI use) or within the `env` section of your **`.cursor/mcp.json`** file (for MCP/Cursor integration). All other settings (model choice, max tokens, temperature, log level, custom endpoints) are managed in `.taskmaster/config.json` via `task-master models` command or `models` MCP tool.

---

For details on how these commands fit into the development process, see the [Development Workflow Guide](mdc:.cursor/rules/dev_workflow.mdc).

```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/terminal-path-verification.mdc
```mdc
---
description: Best practices for verifying paths and locations before executing terminal commands
globs: **/*.{js,jsx,ts,tsx}, **/*.sh
---

# Terminal Path Verification

// Description: Best practices for verifying paths and locations before executing terminal commands
// Recommended Globs: **/*.{js,jsx,ts,tsx}, **/*.sh

## Overview
Always verify current directory and path structure before executing path-related commands to prevent errors and unintended operations.

## Core Rules
1. Before any `cd` command:
   - Use `pwd` to verify current location
   - Use `ls` to verify target directory exists
2. Before file operations:
   - Use `ls` to verify file existence
   - Use `ls -la` for detailed file information when needed

## Examples

### ✅ Good Practice
```bash
# Before changing directory
pwd  # Check current location
ls   # Verify directory structure
cd target_directory

# Before file operations
ls -la file_to_modify.txt  # Verify file exists and check permissions
vim file_to_modify.txt
```

### ❌ Bad Practice
```bash
# Directly changing directory without verification
cd some_directory  # Might not exist!

# File operations without verification
rm file.txt  # Dangerous without verification!
```

## Implementation in Cursor
```typescript
async function executeTerminalCommand(command: string) {
  // Always verify location before path-related commands
  if (command.startsWith('cd ')) {
    await verifyPath(command.split(' ')[1]);
  }

  // Always verify file existence before file operations
  if (isFileOperation(command)) {
    await verifyFileExistence(command);
  }
}

async function verifyPath(targetPath: string) {
  // Check current location
  console.log('Current location:');
  await runCommand('pwd');

  // List directory contents
  console.log('\nDirectory contents:');
  await runCommand('ls');

  // Verify target exists
  if (!(await pathExists(targetPath))) {
    throw new Error(`Target path does not exist: ${targetPath}`);
  }
}
```

## Best Practices
- Always use `pwd` before changing directories
- Use `ls` to verify directory contents
- Use `ls -la` when file permissions are important
- Implement path verification in automated scripts
- Add error handling for non-existent paths

## Common Patterns
1. Directory Navigation:
   ```bash
   pwd  # Verify current location
   ls   # Check directory structure
   cd ./project/src
   ```

2. File Operations:
   ```bash
   ls -la target_file.txt  # Verify file and permissions
   chmod +x target_file.txt
   ```

3. Project Root Verification:
   ```bash
   pwd  # Ensure we're in project root
   ls package.json  # Verify project file exists
   npm install
   ```

## Error Prevention
- Always verify paths before destructive operations
- Use absolute paths when location is uncertain
- Implement safeguards in automated scripts
- Add validation for user-provided paths

## Testing
- Test path verification in different environments
- Verify behavior with non-existent paths
- Test with various file permissions
- Validate error handling

## Resources
- [Bash Documentation](https://www.gnu.org/software/bash/manual/)
- [Linux File System Hierarchy](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html)
- [File System Navigation Best Practices](https://tldp.org/LDP/abs/html/)
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/.cursor/rules/yoda-quotes.mdc
```mdc
---
description: End each Cursor chat with a wise, Yoda-style inspirational quote
globs: **/*.{md,txt}
---

# Yoda-Style Quote Endings

// Description: End each Cursor chat with a wise, Yoda-style inspirational quote
// Recommended Globs: **/*.{md,txt}

## Rule Description
At the end of every Cursor AI chat, include a wise and inspirational quote in Yoda's style.

## Format
- Add a line break after the last technical response
- Start with '---'
- Add '➡️ ' before the quote
- Add the quote in Yoda's distinctive speech pattern
- Keep it short and meaningful

## Examples
```
---
➡️ Code well you must, for in the details, greatness lies.
```

```
---
➡️ Debug or debug not. There is no try-catch.
```

## Guidelines
- Keep quotes programming or learning related
- Maintain Yoda's distinctive inverted speech pattern
- Focus on wisdom and encouragement
- Keep it light and fun
- Always include the '➡️ ' emoji prefix

## Purpose
- Add personality to coding sessions
- Provide encouragement during challenging tasks
- Make debugging more enjoyable
- Test rule installation functionality
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/docs/frontend-guidelines.md
```md
# MarketingQuill Frontend Guidelines

**Date**: June 18, 2025  
**Project**: MarketingQuill – AI Copy Copilot for SaaS Marketing Managers  
**Purpose**: Defines the design system, UI/UX standards, and implementation details for the *MarketingQuill* frontend, ensuring a consistent, accessible, and visually appealing interface. This document provides clear guidance for developers and AI tools like Cursor and Lovable/Bolt, with a focus on the editor’s three-pane layout.

## 1. Design System

### 1.1 Color Palette
- **Primary**: Indigo `#6366F1` (buttons, links, active states).  
- **Secondary**: Neutral Gray `#F3F4F6` (backgrounds).  
- **Success**: Green `#10B981` (accept buttons, positive feedback).  
- **Warning**: Yellow `#FBBF24` (alerts).  
- **Error**: Red `#EF4444` (reject buttons, errors).  

### 1.2 Typography
- **Font Families**:  
  - Editor: JetBrains Mono (monospace).  
  - UI: Inter (sans-serif).  
- **Font Sizes**:  
  - Base: 16px (body text).  
  - Secondary: 14px (labels, tooltips).  
  - Headings: 24px (titles).  

### 1.3 Component Styles
- **Buttons**: Rounded corners (4px), 8px padding, hover state lightens by 10%, focus state with 2px indigo outline.  
- **Cards**: Glassmorphism effect (subtle blur, light shadow), 4px border radius.  
- **Tabs**: Indigo underline for active tab, gray for inactive.  

### 1.4 Accessibility
- WCAG 2.1 AA compliance:  
  - Keyboard navigation for all interactive elements.  
  - Visible focus indicators (2px indigo outline).  
  - High-contrast mode toggle for users with visual impairments.  
- ARIA labels for buttons, modals, and interactive elements to support screen readers.

## 2. Editor Interface Layout Overview

The editor interface is the core of *MarketingQuill*, designed with three distinct panes to keep navigation, writing, and tools separate yet cohesive:
- **Left Sidebar**: For navigation and draft management.  
- **Content Area**: The main writing space with inline feedback.  
- **Right Sidebar**: For contextual tools like grammar, tone, and SEO suggestions.

### 2.1 Left Sidebar
**What It Looks Like**:  
- **Structure**: Vertical, collapsible sidebar fixed to the left edge of the screen.  
- **Size**:  
  - Collapsed: 60px wide (icons only).  
  - Expanded: 240px wide (icons and text labels).  
- **Appearance**:  
  - **Background**: Light gray `#F3F4F6`.  
  - **Content** (top to bottom):  
    - **Logo**: Small *MarketingQuill* logo or icon.  
    - **Drafts Icon**: Document stack icon to view saved drafts.  
    - **New Draft Icon**: Plus sign to create a new draft.  
    - **Settings Icon**: Gear icon for workspace/user settings.  
    - **Profile Icon**: Avatar icon for user profile and logout.  
    - **Toggle Button**: Arrow or hamburger icon to expand/collapse.  
  - **Icons**: Indigo `#6366F1` when active, gray when inactive, with a 10% lighten hover effect.  
  - **Tooltips**: In collapsed state, hovering over an icon shows a tooltip (e.g., “Drafts”).  

**Purpose**: Provides quick navigation and access to drafts, settings, and user options without cluttering the writing space.

### 2.2 Content Area (Editor Pane)
**What It Looks Like**:  
- **Structure**: Wide, central pane that dominates the screen, flexible in width to fill the space between the sidebars.  
- **Size**: Dynamically expands (60%–80% of screen width) based on sidebar states.  
- **Appearance**:  
  - **Background**: Light gray `#F9FAFB`.  
  - **Editor**: Monospace font (JetBrains Mono), dark gray text `#1F2937`.  
  - **Inline Suggestions**:  
    - Grammar issues: Red underlines `#EF4444`.  
    - Tone suggestions: Blue underlines `#3B82F6`.  
    - SEO recommendations: Purple underlines `#8B5CF6`.  
    - Hovering over underlines displays a tooltip with suggestion details.  
  - **Sticky Footer**: Fixed at the bottom of the pane, containing:  
    - **Word Count**: e.g., “250 words”.  
    - **SEO Score**: e.g., “SEO Score: 85/100”.  
    - **Export Button**: Dropdown with options (“Copy Markdown”, “Download HTML”, “Share Link”).  
  - **Footer Style**: Slightly darker gray `#E5E7EB` background, indigo buttons.  

**Purpose**: The primary workspace for writing and editing, designed to be clean and focused with real-time feedback.

### 2.3 Right Sidebar
**What It Looks Like**:  
- **Structure**: Vertical, toggleable sidebar fixed to the right edge of the screen.  
- **Size**: 300px wide when open, hidden when closed.  
- **Appearance**:  
  - **Background**: White `#FFFFFF`.  
  - **Tabs**: Three tabs at the top:  
    - Grammar: For spelling and syntax suggestions.  
    - Tone: For style and tone adjustments.  
    - SEO: For search optimization tips.  
    - Active tab highlighted in indigo `#6366F1`, inactive tabs in gray.  
  - **Suggestion Cards**: Scrollable list below tabs, each card showing:  
    - Issue description: e.g., “Passive voice detected”.  
    - Suggested fix: e.g., “Use active voice: ‘The team launched the product’”.  
    - Buttons: **Accept** (green `#10B981`), **Reject** (red `#EF4444`).  
  - **Toggle Button**: Arrow or “X” icon to show/hide the sidebar.  
  - **Card Style**: Light shadow, rounded corners (4px).  

**Purpose**: Offers actionable tools to refine content, kept separate to avoid overwhelming the editor pane.

### 2.4 Visual Layout Summary
- **Layout Overview**: The editor interface consists of three vertical panes arranged side by side:
  - **Left Sidebar**: 60px (collapsed) or 240px (expanded) wide, containing navigation icons and a toggle button.
  - **Content Area**: Flexible width (60%–80% of screen), hosting the editor pane and sticky footer.
  - **Right Sidebar**: 300px wide when open, featuring tabs and suggestion cards with a toggle button.
- **Spatial Relationships**: The Left Sidebar is on the left, the Content Area occupies the center, and the Right Sidebar is on the right. The Content Area adjusts dynamically based on the Left Sidebar’s state (collapsed or expanded).
- **Optional Visual Reference**: For a detailed diagram, refer to a Figma mockup (to be created) or the CSS Grid implementation in section 3.1.






```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/docs/pivot-update-summary.md
```md
# LinkedIn Writing Assistant - Pivot Update Summary

## Date: 2025-06-22

## What Was Updated

### 1. Documentation Updates
✅ **Created new files:**
- `/docs/pivot-summary.md` - Comprehensive overview of the pivot
- `/docs/linkedin-migration-plan.md` - Step-by-step migration guide
- `/.taskmaster/docs/prd-linkedin.txt` - New PRD focused on LinkedIn

✅ **Updated existing files:**
- `README.md` - Changed from MarketingQuill to LinkedIn Writing Assistant
- `package.json` - Updated name and version (0.2.0)
- `CLAUDE.md` - Added LinkedIn context and updated task priorities

### 2. Key Changes Made

#### README.md
- Title: "AI Copy Copilot for SaaS Marketing Managers" → "AI-Powered Content Optimizer for LinkedIn Creators"
- Description focused on LinkedIn content creation
- Task 5 renamed to "LinkedIn Writing Optimization"

#### package.json
- Name: `marketing-quill` → `linkedin-writing-assistant`
- Version: `0.1.0` → `0.2.0`

#### CLAUDE.md
- Added LinkedIn-specific context
- Updated known issues for LinkedIn features
- Highlighted character limits (3000 max, 1300 optimal)
- Reordered task priorities for LinkedIn focus

### 3. Task Updates Needed (Not Yet Done)

The task system needs manual updates for:
- Task 6: Subject-Line Optimizer → LinkedIn Hook Optimizer
- Task 7: SEO Hint Panel → LinkedIn Optimization Panel
- Task 8: Export Functionality → LinkedIn Post Formatter
- Task 23: Auto-draft subject → Auto-draft hook generation

### 4. Next Steps

1. **Immediate Actions:**
   - Update landing page content for LinkedIn focus
   - Modify UI text throughout the app
   - Update Supabase Edge Function prompts

2. **Feature Updates:**
   - Transform existing features for LinkedIn
   - Add LinkedIn-specific functionality
   - Implement character counter and preview

3. **Testing:**
   - Test with LinkedIn creators
   - Validate LinkedIn best practices
   - Ensure mobile preview accuracy

## How to Track Progress

### Commands to Monitor Changes:
```bash
# View current tasks
npm run task:list

# Check task health
npm run task:health

# See what to work on next
npm run task:next

# View pivot documentation
cat docs/pivot-summary.md
cat docs/linkedin-migration-plan.md
```

### Git History:
All changes are committed with message: "docs: pivot to LinkedIn Writing Assistant"

### Key Files to Review:
1. `/docs/pivot-summary.md` - Why we pivoted
2. `/docs/linkedin-migration-plan.md` - How to implement
3. `/.taskmaster/docs/prd-linkedin.txt` - What we're building

## Questions to Address

1. Should we update the Supabase project name?
2. Do we need new environment variables for LinkedIn features?
3. Should we create a new color scheme for LinkedIn branding?
4. How do we handle existing users during the transition?

## Success Metrics

Track these to measure pivot success:
- User engagement with LinkedIn-specific features
- Time to create a LinkedIn post
- Post engagement improvement
- User retention rate
- Feature adoption rate
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/docs/tech-stack.md
```md
# MarketingQuill Tech Stack Documentation

**Date**: June 18, 2025  
**Project**: MarketingQuill – AI Copy Copilot for SaaS Marketing Managers  
**Purpose**: Outlines technologies for development consistency.

## 1. Tech Stack
| Layer    | Choice                                                     |
|----------|------------------------------------------------------------|
| Frontend | Next.js 15 (React 18, TypeScript), Tailwind CSS, shadcn/ui, Zustand |
| Backend  | Supabase (Postgres, Realtime, Edge Functions)              |
| Auth     | Supabase Auth (magic-link, Google OAuth)                   |
| AI       | OpenAI GPT-4o via Edge Functions; cached in Postgres       |
| Hosting  | Vercel (frontend), Supabase (backend)                      |
| Version  | Git (GitHub)                                               |

## 2. Rationale
- **Next.js 15**: Framework built on React 18, offering server-side rendering, static generation, and file-based routing for SEO and performance. TypeScript ensures type safety.  
- **Tailwind CSS**: Utility-first styling for rapid, responsive design.  
- **shadcn/ui**: Accessible, customizable React components.  
- **Zustand**: Lightweight state management for React.  
- **Supabase**: Integrated auth, database, and real-time features.  
- **GPT-4o**: High-quality AI suggestions.  
- **Vercel**: Seamless deployment, optimized for Next.js.  
```

File: /Users/yashchitneni/Development/Cursor Projects/current-projects/marketing-quill/docs/prd.md
```md
# MarketingQuill Product Requirements Document (PRD)

**Date**: June 18, 2025  
**Project**: MarketingQuill – AI Copy Copilot for SaaS Marketing Managers  
**Purpose**: Defines the requirements for the MarketingQuill MVP, a web-based tool to streamline copywriting with AI-driven suggestions.

## 1. Project Overview
MarketingQuill is a web-based AI copy copilot for SaaS marketing managers creating email campaigns and blog content. It integrates a distraction-free editor with real-time grammar and tone suggestions, subject-line optimization, and basic SEO hints to boost content performance.

**v1 Objectives (7-day sprint)**  
- Deliver inline grammar and tone suggestions with <2s latency.  
- Generate subject-line variants with predicted open-rate scores.  
- Enable one-click exports in HTML email and Markdown formats.  
- Achieve ≥70% suggestion acceptance rate in pilot tests.

## 2. MVP Scope

### In-Scope
1. **Authentication & Roles**: Magic-link and Google OAuth; Owner/Editor roles.  
2. **Landing Page & Sign-up**: Marketing page with pricing toggle and "Start Free Trial" CTA.  
3. **Dashboard**: List of drafts (title, channel icon, optimization score, last edited).  
4. **Editor (Core)**:  
   - Monospace pane, auto-save every 30s.  
   - Inline grammar/tone suggestions (GPT-4o).  
   - Right sidebar: Grammar | Tone | SEO tabs with suggestion cards.  
   - Subject-Line Optimizer modal with A/B variants and open-rate gauge.  
   - Sticky footer: word count, live SEO score.  
5. **SEO Basics**: Local analysis for keyword density, H-tags, meta-description quality.  
6. **Exports**: Copy Markdown, download HTML email, public share link.  
7. **Versioning Lite**: Undo stack (50 actions), daily snapshot rollback (7-day retention).  
8. **Accessibility**: WCAG 2.1 AA (keyboard nav, visible focus, high-contrast toggle).

### Out-of-Scope (v1)
- Built-in scheduling or ESP sending.  
- Automated A/B testing deployment.  
- Collaboration comments, snippet libraries, template marketplaces.  
- Team roles beyond Owner/Editor.  
- Multilingual support, WordPress/LinkedIn APIs.

## 3. User Flow (Happy Path)
1. Visit `marketingquill.app`, click "Start Free Trial".  
2. Sign up via email/Google, complete onboarding (optional brand voice), land on Dashboard.  
3. Click "New Draft" to open Editor.  
4. Write/paste copy; inline suggestions appear.  
5. Open Subject-Line Optimizer, select variant (e.g., 38% open rate).  
6. Check SEO tab, fix issues (e.g., "Add H2").  
7. Export HTML email, paste into HubSpot.  
8. Return to Dashboard; optimization score and streak update.

## 4. Core Features & Acceptance Criteria
| # | Feature                | Acceptance Criteria                                                                    |
|---|------------------------|----------------------------------------------------------------------------------------|
| 1 | Grammar & Tone Coach   | Suggestions load ≤2s; Accept updates text and logs action.                             |
| 2 | Subject-Line Optimizer | ≥2 AI variants with open-rate gauge; Insert adds to header.                            |
| 3 | SEO Hint Panel         | Shows keyword count, headings, meta tips; score updates live.                          |
| 4 | Export                 | HTML/Markdown outputs retain styling; clipboard copy succeeds.                         |
| 5 | Dashboard Metrics      | Draft cards show optimization score (0-100) and last-edited timestamp.                 |
| 6 | Version Undo           | Undo up to 50 actions; snapshot restore reverts to prior day’s content.                |

## 5. Design Snapshot
- **Landing Page**: Split hero with product GIF and sign-up form; indigo `#6366F1`, glass cards.  
- **App Shell**: Top bar (workspace switch, New Draft), collapsible icon sidebar, main canvas.  
- **Editor**: Monospace (JetBrains Mono), neutral surface, colored underlines (grammar red, tone blue, SEO purple). Right sidebar with suggestion cards.  
- **Modal**: Subject-Line Optimizer with two-column variant list and gauge meter.  

## 6. Tech Stack
| Layer    | Choice                                                     |
|----------|------------------------------------------------------------|
| Frontend | Next.js 15 (React 18, TypeScript), Tailwind CSS, shadcn/ui, Zustand |
| Backend  | Supabase (Postgres, Realtime, Edge Functions)              |
| Auth     | Supabase Auth (magic-link, Google OAuth)                   |
| AI       | OpenAI GPT-4o via Edge Functions; cached in Postgres       |
| Hosting  | Vercel (frontend), Supabase (backend)                      |

## 7. Non-Functional Requirements
- **Performance**: Suggestion latency <2s, 99.9% uptime.  
- **Scalability**: Support 100 concurrent free-tier users.  
- **Security**: TLS, RBAC, GDPR-compliant data export.

## 8. Risks & Mitigations
| Risk                   | Mitigation                                              |
|------------------------|---------------------------------------------------------|
| LLM cost overruns      | Cache suggestions; limit free-tier usage.               |
| Prompt injection       | Sanitize inputs; strict function-call schemas.          |
| Latency fluctuations   | Pre-warm Edge Functions; use streaming completions.     |

## 9. Timeline (7-Day Sprint)
| Day | Focus                                           |
|-----|-------------------------------------------------|
| 1   | Repo setup, auth, landing page                  |
| 2   | Dashboard, New Draft flow                       |
| 3   | Editor core, auto-save, undo stack              |
| 4   | Grammar/tone suggestions                        |
| 5   | Subject-Line Optimizer, SEO panel               |
| 6   | Exports, accessibility, UI polish               |
| 7   | Load test, demo, deploy, announce               |

## 10. Validation & Iteration
- **Pilot Testing**: Test with 5-10 marketing managers for ≥70% suggestion acceptance.  
- **Feedback**: Bi-weekly reviews to prioritize updates.  
- **Metrics**: Track suggestion acceptance, export frequency, SEO score improvements.
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
help me refactor and simplify this next.js app. the .md files are rules/structures off which this app is built.
</user_instructions>
