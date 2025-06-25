import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  try {
    // Check if Supabase is enabled
    const isSupabaseEnabled = process.env.NEXT_PUBLIC_SUPABASE_ENABLED !== 'false'
    
    // Update session (it will handle the disabled state internally)
    let response = await updateSession(request)
    
    // Add security headers
    response.headers.set('X-DNS-Prefetch-Control', 'on')
    response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
    
    // CSRF Protection for state-changing requests
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      // Check for proper content-type (prevents simple CSRF)
      const contentType = request.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        return new NextResponse('Invalid content type', { status: 400 })
      }
      
      // Verify origin/referer for additional protection
      const origin = request.headers.get('origin')
      const referer = request.headers.get('referer')
      const host = request.headers.get('host')
      
      if (origin) {
        const originUrl = new URL(origin)
        const hostUrl = new URL(`https://${host}`)
        
        // Allow localhost in development
        const isLocalhost = originUrl.hostname === 'localhost' || 
                           originUrl.hostname === '127.0.0.1'
        
        if (!isLocalhost && originUrl.hostname !== hostUrl.hostname) {
          return new NextResponse('CSRF validation failed', { status: 403 })
        }
      }
    }
    
    // Remove sensitive headers
    response.headers.delete('X-Powered-By')
    response.headers.delete('Server')
  
  // Protected routes that require authentication
  const protectedPaths = ['/dashboard', '/editor', '/admin']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )
  
  // Admin-only routes
  const adminPaths = ['/admin']
  const isAdminPath = adminPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )
  
  // Check authentication for protected paths only if Supabase is enabled
  if (isProtectedPath && isSupabaseEnabled) {
    // Create a Supabase client for this request
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          },
        },
      }
    )
    
    // Get the user's session
    const { data: { session } } = await supabase.auth.getSession()
    
    // If no session and on a protected path, redirect to login
    if (!session && isProtectedPath) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
    
    // For admin paths, we'll check the role in the role-guard component
  } else if (isProtectedPath && !isSupabaseEnabled && process.env.NODE_ENV === 'development') {
    // In development with Supabase disabled, allow access to protected routes
    console.log('⚠️ Allowing access to protected route with Supabase disabled (dev only)')
  }
  
  return response
  } catch (error) {
    console.error('Middleware error:', error)
    // Return a basic response on error
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - apple-touch-icon files
     * - public folder
     * - image files
     */
    '/((?!_next/static|_next/image|favicon.ico|apple-touch-icon.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
