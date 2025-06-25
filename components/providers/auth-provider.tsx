'use client'

import { useEffect, useState, Suspense } from 'react'
import { useAuthStore } from '@/lib/stores/auth-store'
import { createClient } from '@/lib/supabase/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((state) => state.fetchUser)
  const setUser = useAuthStore((state) => state.setUser)
  const isInitialized = useAuthStore((state) => state.isInitialized)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  
  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Handle error parameter from login page
  useEffect(() => {
    if (!mounted) return
    const error = searchParams.get('error')
    if (error) {
      console.error('Auth error:', error)
    }
  }, [searchParams, mounted])

  useEffect(() => {
    if (!mounted) return
    
    let timeoutId: NodeJS.Timeout

    const initializeAuth = async () => {
      try {
        const supabase = createClient()
        
        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          console.warn('Auth initialization timeout - forcing initialization')
          // Force initialization after 2 seconds
          useAuthStore.setState({ isInitialized: true })
        }, 2000)
        
        // Check active sessions and set the user
        await fetchUser()
        
        // Clear timeout if fetchUser completes
        clearTimeout(timeoutId)
        
        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth event:', event, 'Session:', session?.user?.email)
            
            if (session?.user) {
              setUser(session.user)
              await fetchUser()
              
              // Force state update
              useAuthStore.setState({ 
                user: session.user, 
                isInitialized: true 
              })
            } else {
              setUser(null)
              useAuthStore.setState({ 
                user: null, 
                isInitialized: true 
              })
            }
            
            // Handle sign in and sign out events
            if (event === 'SIGNED_IN') {
              // Only redirect if explicitly on auth pages
              if (pathname === '/auth/login' || pathname === '/auth/signup') {
                console.log('Redirecting to dashboard after sign in')
                router.push('/dashboard')
              }
            } else if (event === 'SIGNED_OUT') {
              // If on protected page, redirect to login
              if (pathname.startsWith('/dashboard') || 
                  pathname.startsWith('/editor') || 
                  pathname.startsWith('/admin') ||
                  pathname.startsWith('/settings')) {
                router.push('/auth/login')
              }
            }
            // Don't redirect on USER_UPDATED to prevent issues during settings changes
          }
        )
        
        return () => {
          subscription.unsubscribe()
          clearTimeout(timeoutId)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        // Force initialization on error
        useAuthStore.setState({ isInitialized: true })
        clearTimeout(timeoutId)
      }
    }
    
    initializeAuth()
  }, [fetchUser, setUser, router, pathname, mounted])

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null
  }
  
  // Show loading only for a brief moment on initial load
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return <>{children}</>
}

// Export wrapper component with Suspense
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <AuthProviderInner>{children}</AuthProviderInner>
    </Suspense>
  )
}
