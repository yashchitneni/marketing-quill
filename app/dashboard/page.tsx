import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import DashboardContent from './dashboard-content'

// Loading component for Suspense fallback
function DashboardLoading() {
  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    </DashboardLayout>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}