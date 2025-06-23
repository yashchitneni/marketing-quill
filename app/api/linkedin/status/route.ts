import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { linkedInAPI } from '@/lib/services/linkedin-api'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if LinkedIn is connected
    const isConnected = await linkedInAPI.isConnected(user.id)

    if (isConnected) {
      // Get profile info if connected
      try {
        const profile = await linkedInAPI.getProfile(user.id)
        
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

  } catch (error: any) {
    console.error('LinkedIn status error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to check LinkedIn status' },
      { status: 500 }
    )
  }
}