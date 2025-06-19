'use client'

import Link from 'next/link'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Button } from '@/components/ui/button'
import { PenTool } from 'lucide-react'

export function Navbar() {
  const { user } = useAuthStore()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <PenTool className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold">MarketingQuill</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Testimonials
            </Link>
            
            {user ? (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Start Free Trial
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}