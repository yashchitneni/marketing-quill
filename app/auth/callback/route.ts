import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(errorDescription || error)}`)
  }

  if (code) {
    const supabase = await createClient()
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (sessionError) {
      console.error('Error exchanging code for session:', sessionError.message)
      return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(sessionError.message)}`)
    }
    
    // Add a small delay to ensure session is properly established
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Session should be established at this point
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('Error getting user:', userError.message)
      return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(userError.message)}`)
    }
    
    console.log('User authenticated:', user?.email)
    
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
        const response = NextResponse.redirect(`${origin}/onboarding`)
        // Set a cookie to indicate we're in onboarding flow
        response.cookies.set('onboarding_flow', 'true', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 // 1 hour
        })
        return response
      }
      
      // Otherwise, proceed with the original redirect
      console.log('Redirecting to:', next)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If we get here, something went wrong
  console.error('Auth callback failed: No code provided')
  return NextResponse.redirect(`${origin}/auth/login?error=no_code`)
}
