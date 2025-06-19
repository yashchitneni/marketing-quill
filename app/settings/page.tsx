import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings</p>
      </div>
    </DashboardLayout>
  )
} 