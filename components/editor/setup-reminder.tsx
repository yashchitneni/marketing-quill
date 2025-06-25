'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { X, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useSetupStatus } from '@/lib/hooks/use-setup-status'

export function EditorSetupReminder() {
  const { setupStatus, loading } = useSetupStatus()
  const [dismissed, setDismissed] = useState(false)

  // Check if reminder was dismissed in this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('editor-setup-reminder-dismissed')
    if (dismissed === 'true') {
      setDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('editor-setup-reminder-dismissed', 'true')
  }

  // Don't show if loading, complete, or dismissed
  if (loading || setupStatus.isComplete || dismissed) {
    return null
  }

  // Only show if brand voice is not completed (name should already be done)
  if (setupStatus.brandVoiceCompleted) {
    return null
  }

  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <AlertDescription className="text-blue-900 font-medium">
              Get AI suggestions tailored to your brand voice
            </AlertDescription>
            <AlertDescription className="text-blue-800 text-sm mt-1">
              Complete your brand voice setup to receive personalized content suggestions that match your unique style.
            </AlertDescription>
            <Link href="/settings?tab=voice">
              <Button size="sm" variant="link" className="p-0 h-auto text-blue-700 hover:text-blue-900 mt-2">
                Complete setup <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-blue-600 hover:text-blue-900"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  )
}