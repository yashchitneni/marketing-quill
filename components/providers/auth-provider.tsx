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
    return null
  }

  return <>{children}</>
}
