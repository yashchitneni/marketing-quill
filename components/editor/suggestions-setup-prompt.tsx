'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useSetupStatus } from '@/lib/hooks/use-setup-status'

export function SuggestionsSetupPrompt() {
  const { setupStatus } = useSetupStatus()

  // Only show if brand voice is not completed
  if (setupStatus.brandVoiceCompleted) {
    return null
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-blue-900 mb-1">
              Unlock Personalized Suggestions
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              Complete your brand voice setup to get AI suggestions tailored to your unique writing style and business goals.
            </p>
            <Link href="/settings?tab=voice">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Set Up Brand Voice
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}