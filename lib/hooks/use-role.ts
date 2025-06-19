'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth-store'

type RequiredRole = 'owner' | 'editor' | null

interface UseRoleOptions {
  requiredRole?: RequiredRole
  redirectTo?: string
  allowedRoles?: RequiredRole[]
}

export function useRole(options: UseRoleOptions = {}) {
  const router = useRouter()
  const { user, role, isInitialized } = useAuthStore()
  const { 
    requiredRole = null, 
    redirectTo = '/auth/login',
    allowedRoles = []
  } = options

  useEffect(() => {
    if (!isInitialized) return

    // Check if user is authenticated
    if (!user) {
      router.push(redirectTo)
      return
    }

    // Check if specific role is required
    if (requiredRole && role !== requiredRole) {
      router.push('/unauthorized')
      return
    }

    // Check if user has one of the allowed roles
    if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
      router.push('/unauthorized')
      return
    }
  }, [user, role, isInitialized, requiredRole, allowedRoles, redirectTo, router])

  return {
    user,
    role,
    isAuthenticated: !!user,
    isOwner: role === 'owner',
    isEditor: role === 'editor',
    hasRole: (checkRole: RequiredRole) => role === checkRole,
    hasAnyRole: (roles: RequiredRole[]) => role ? roles.includes(role) : false
  }
}