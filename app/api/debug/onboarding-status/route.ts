import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    
    // Check profile status
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, onboarding_completed, brand_voice_completed')
      .eq('id', user.id)
      .single()
    
    // Check LinkedIn status
    const { data: linkedinProfile, error: linkedinError } = await supabase
      .from('user_profiles')
      .select('user_id, linkedin_profile_id, linkedin_connected_at')
      .eq('user_id', user.id)
      .single()
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email
      },
      profile: profile || { error: profileError?.message || 'No profile found' },
      linkedin: linkedinProfile || { error: linkedinError?.message || 'No LinkedIn profile found' },
      debug: {
        hasProfile: !!profile && !profileError,
        hasLinkedIn: !!linkedinProfile?.linkedin_profile_id,
        canSkipOnboarding: !!profile?.full_name && !!linkedinProfile?.linkedin_profile_id
      }
    })
  } catch (error) {
    console.error('Debug route error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}