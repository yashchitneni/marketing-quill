import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // Update session
  const response = await updateSession(request)
  
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
  
  // Check authentication for protected paths
  if (isProtectedPath) {
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
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
