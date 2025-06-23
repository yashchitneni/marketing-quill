'use client'

import { AuthGuard } from '@/lib/security/auth-guard'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export default function AdminPage() {
  return (
    <AuthGuard requireAdmin={true}>
      <AdminDashboard />
    </AuthGuard>
  )
}