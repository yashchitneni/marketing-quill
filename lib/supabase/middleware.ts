import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  })

  // Check if Supabase is enabled
  const isSupabaseEnabled = process.env.NEXT_PUBLIC_SUPABASE_ENABLED !== 'false'
  
  if (!isSupabaseEnabled) {
    // Skip all Supabase operations when disabled
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️ Supabase is disabled in development mode')
    }
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              supabaseResponse.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    // This will refresh session if expired - required for Server Components
    const {
      data: { session },
      error
    } = await supabase.auth.getSession()
    
    // Only log errors that aren't network-related
    if (error && !error.message?.includes('fetch failed')) {
      console.error('Session error:', error.message)
    }
    
    // Log session state for debugging (only in development)
    if (process.env.NODE_ENV === 'development' && !request.url.includes('favicon') && !request.url.includes('apple-touch-icon')) {
      console.log('Session in middleware:', session ? 'Active' : 'None')
    }
  } catch (error) {
    // Silently handle network errors during development
    if (process.env.NODE_ENV === 'development') {
      // Only log non-network errors
      if (error instanceof Error && !error.message?.includes('fetch failed')) {
        console.error('Middleware session error:', error.message)
      }
    }
  }

  return supabaseResponse
}
