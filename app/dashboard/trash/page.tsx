import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default function TrashPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Trash</h1>
        <p className="text-gray-600 mt-1">Manage your deleted drafts</p>
      </div>
    </DashboardLayout>
  )
} 