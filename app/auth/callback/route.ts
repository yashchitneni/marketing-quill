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
