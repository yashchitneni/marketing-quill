'use client'

import { useAuthStore } from '@/lib/stores/auth-store'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function DevWarningBanner() {
  const { isSupabaseEnabled } = useAuthStore()
  const [isMinimized, setIsMinimized] = useState(false)
  
  // Only show in development when Supabase is disabled
  if (process.env.NODE_ENV !== 'development' || isSupabaseEnabled) {
    return null
  }
  
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsMinimized(false)}
          className="bg-yellow-50 border-yellow-300 hover:bg-yellow-100"
        >
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
        </Button>
      </div>
    )
  }
  
  const handleEnableSupabase = () => {
    // Show instructions for enabling Supabase
    alert(
      'To enable Supabase:\n\n' +
      '1. Set NEXT_PUBLIC_SUPABASE_ENABLED=true in .env.local\n' +
      '2. Unpause your Supabase project\n' +
      '3. Restart the development server'
    )
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-50 border-t-2 border-yellow-300 p-4 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-yellow-800">
              Development Mode: Supabase Disabled
            </p>
            <p className="text-xs text-yellow-700">
              Authentication is mocked. Database operations will not persist.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleEnableSupabase}
            className="text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Enable Supabase
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMinimized(true)}
            className="text-xs"
          >
            Minimize
          </Button>
        </div>
      </div>
    </div>
  )
}