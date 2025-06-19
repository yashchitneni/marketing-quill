'use client'

import { ReactNode } from 'react'
import { useRole } from '@/lib/hooks/use-role'

interface RoleGuardProps {
  children: ReactNode
  requiredRole?: 'owner' | 'editor'
  allowedRoles?: ('owner' | 'editor')[]
  fallback?: ReactNode
}

export function RoleGuard({ 
  children, 
  requiredRole, 
  allowedRoles = [], 
  fallback = null 
}: RoleGuardProps) {
  const { role } = useRole()

  // Check if user has the required role
  if (requiredRole && role !== requiredRole) {
    return <>{fallback}</>
  }

  // Check if user has one of the allowed roles
  if (allowedRoles.length > 0 && (!role || !allowedRoles.includes(role))) {
    return <>{fallback}</>
  }

  return <>{children}</>
}