'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
  fallbackUrl?: string
}

interface UserProfile {
  role: string
}

export function AuthGuard({ 
  children, 
  requireAdmin = false,
  fallbackUrl = '/auth/login' 
}: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push(fallbackUrl)
          return
        }

        setUser(session.user)

        // If admin access is required, check user role
        if (requireAdmin) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()

          if (!profile || profile.role !== 'admin') {
            router.push('/dashboard')
            return
          }

          setProfile(profile)
        }

        setLoading(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push(fallbackUrl)
      }
    }

    checkAuth()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push(fallbackUrl)
        } else if (event === 'SIGNED_IN' && session) {
          setUser(session.user)
          
          if (requireAdmin) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single()

            if (!profile || profile.role !== 'admin') {
              router.push('/dashboard')
              return
            }

            setProfile(profile)
          }
          
          setLoading(false)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router, fallbackUrl, requireAdmin, supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}