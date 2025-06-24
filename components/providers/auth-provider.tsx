'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/stores/auth-store'
import { createClient } from '@/lib/supabase/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((state) => state.fetchUser)
  const setUser = useAuthStore((state) => state.setUser)
  const isInitialized = useAuthStore((state) => state.isInitialized)
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
    let timeoutId: NodeJS.Timeout

    const initializeAuth = async () => {
      try {
        const supabase = createClient()
        
        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          console.warn('Auth initialization timeout - forcing initialization')
          // Force initialization after 3 seconds
          useAuthStore.setState({ isInitialized: true })
        }, 3000)
        
        // Check active sessions and set the user
        await fetchUser()
        
        // Clear timeout if fetchUser completes
        clearTimeout(timeoutId)
        
        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
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
  }, [fetchUser, setUser, router, pathname])

  // Show loading only for a brief moment on initial load
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return <>{children}</>
}
