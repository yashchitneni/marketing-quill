'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'

interface AppLayoutProps {
  children: ReactNode
  fullWidth?: boolean
}

export function AppLayout({ children, fullWidth = false }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className={`flex-1 overflow-y-auto ${fullWidth ? '' : 'max-w-7xl mx-auto w-full'}`}>
        {children}
      </main>
    </div>
  )
}