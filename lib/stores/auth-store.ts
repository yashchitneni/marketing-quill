import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

type UserRole = 'owner' | 'editor' | null

// Check if Supabase is enabled
const isSupabaseEnabled = process.env.NEXT_PUBLIC_SUPABASE_ENABLED !== 'false'

// Mock user for development when Supabase is disabled
const mockUser: User = {
  id: 'mock-user-id',
  email: 'dev@localhost',
  app_metadata: {},
  user_metadata: { full_name: 'Dev User' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  role: 'authenticated',
  updated_at: new Date().toISOString(),
} as User

interface AuthState {
  user: User | null
  role: UserRole
  isLoading: boolean
  isInitialized: boolean
  isSupabaseEnabled: boolean
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
  isSupabaseEnabled,

  signIn: async (email: string) => {
    if (!isSupabaseEnabled) {
      console.log('🔧 Dev mode: Simulating sign in for', email)
      set({ user: mockUser, role: 'owner', isLoading: false })
      return { error: null }
    }
    
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
    if (!isSupabaseEnabled) {
      console.log('🔧 Dev mode: Simulating Google sign in')
      set({ user: mockUser, role: 'owner', isLoading: false })
      return { error: null }
    }
    
    set({ isLoading: true })
    const supabase = createClient()
    
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
    
    if (error) {
      console.error('Google sign-in error:', error.message)
      set({ isLoading: false })
    }
    
    return { error }
  },

  signOut: async () => {
    if (!isSupabaseEnabled) {
      console.log('🔧 Dev mode: Simulating sign out')
      set({ user: null, role: null, isLoading: false })
      return { error: null }
    }
    
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
    if (!isSupabaseEnabled) {
      console.log('🔧 Dev mode: Using mock user')
      // Optionally auto-login in dev mode for easier testing
      if (process.env.NODE_ENV === 'development') {
        set({ user: mockUser, role: 'owner', isInitialized: true })
      } else {
        set({ user: null, role: null, isInitialized: true })
      }
      return
    }
    
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
