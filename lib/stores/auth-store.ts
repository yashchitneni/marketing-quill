import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

type UserRole = 'owner' | 'editor' | null

interface AuthState {
  user: User | null
  role: UserRole
  isLoading: boolean
  isInitialized: boolean
  signIn: (email: string) => Promise<{ error: Error | null }>
  signInWithGoogle: () => Promise<{ error: Error | null }>
  signOut: () => Promise<{ error: Error | null }>
  fetchUser: () => Promise<void>
  setUser: (user: User | null) => void
  setRole: (role: UserRole) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isLoading: false,
  isInitialized: false,

  signIn: async (email: string) => {
    set({ isLoading: true })
    const supabase = createClient()
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    set({ isLoading: false })
    return { error }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true })
    const supabase = createClient()
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      
      // We don't set isLoading to false here because we're redirecting to Google
      // The loading state will be reset when the page loads again
      
      if (error) {
        console.error('Google sign-in error:', error.message)
        set({ isLoading: false })
      }
      
      return { error }
    } catch (err) {
      console.error('Unexpected error during Google sign-in:', err)
      set({ isLoading: false })
      return { error: err instanceof Error ? err : new Error('Unknown error during Google sign-in') }
    }
  },

  signOut: async () => {
    set({ isLoading: true })
    const supabase = createClient()
    
    const { error } = await supabase.auth.signOut()
    
    if (!error) {
      set({ user: null, role: null })
    }
    
    set({ isLoading: false })
    return { error }
  },

  fetchUser: async () => {
    const supabase = createClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (user && !error) {
      set({ user })
      
      // Fetch user role from database
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      
      if (profile) {
        set({ role: profile.role as UserRole })
      }
    } else {
      set({ user: null, role: null })
    }
    
    set({ isInitialized: true })
  },

  setUser: (user: User | null) => set({ user }),
  setRole: (role: UserRole) => set({ role }),
}))
