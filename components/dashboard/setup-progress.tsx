'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Settings, 
  Sparkles, 
  CheckCircle2, 
  Circle,
  Linkedin,
  User,
  Building2,
  X
} from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/auth-store'

interface SetupStatus {
  nameCompleted: boolean
  linkedinConnected: boolean
  brandVoiceCompleted: boolean
}

export function SetupProgress() {
  const { user } = useAuthStore()
  const [setupStatus, setSetupStatus] = useState<SetupStatus>({
    nameCompleted: false,
    linkedinConnected: false,
    brandVoiceCompleted: false
  })
  const [loading, setLoading] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    fetchSetupStatus()
  }, [user])

  const fetchSetupStatus = async () => {
    if (!user) return
    
    const supabase = createClient()
    
    // Check main profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, linkedin_connected, brand_voice_completed')
      .eq('id', user.id)
      .single()
    
    // Check LinkedIn connection in user_profiles table
    const { data: linkedinProfile } = await supabase
      .from('user_profiles')
      .select('linkedin_profile_id')
      .eq('user_id', user.id)
      .single()
    
    if (profile || linkedinProfile) {
      setSetupStatus({
        nameCompleted: !!profile?.full_name,
        linkedinConnected: !!profile?.linkedin_connected || !!linkedinProfile?.linkedin_profile_id,
        brandVoiceCompleted: !!profile?.brand_voice_completed
      })
    }
    setLoading(false)
  }

  const completedSteps = Object.values(setupStatus).filter(Boolean).length
  const totalSteps = 3
  const progressPercentage = (completedSteps / totalSteps) * 100
  const isFullySetup = completedSteps === totalSteps

  // Don't show if dismissed or fully setup
  if (dismissed || isFullySetup || loading) {
    return null
  }

  const setupSteps = [
    {
      id: 'name',
      title: 'Profile Name',
      description: 'How we address you',
      completed: setupStatus.nameCompleted,
      icon: User,
      action: '/settings?tab=account',
      required: true
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Connection',
      description: 'Post directly to LinkedIn',
      completed: setupStatus.linkedinConnected,
      icon: Linkedin,
      action: '/settings?tab=linkedin',
      required: true
    },
    {
      id: 'brandVoice',
      title: 'Brand Voice',
      description: 'Personalized AI suggestions',
      completed: setupStatus.brandVoiceCompleted,
      icon: Building2,
      action: '/settings?tab=voice',
      required: false
    }
  ]

  return (
    <Alert className="mb-6 border-amber-200 bg-amber-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-amber-600" />
            <h3 className="font-semibold text-amber-900">Complete Your Setup</h3>
          </div>
          <AlertDescription className="text-amber-800 mb-4">
            Unlock the full power of LinkedIn Writer by completing your profile setup. 
            {!setupStatus.brandVoiceCompleted && " Adding your brand voice helps us provide personalized suggestions."}
          </AlertDescription>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Progress value={progressPercentage} className="flex-1 h-2" />
              <span className="text-sm font-medium text-amber-700">
                {completedSteps}/{totalSteps}
              </span>
            </div>
            
            <div className="grid gap-2">
              {setupSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-white border"
                >
                  <div className="flex items-center gap-3">
                    {step.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-amber-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {step.title}
                        {step.required && !step.completed && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  </div>
                  {!step.completed && (
                    <Link href={step.action}>
                      <Button size="sm" variant="outline">
                        Setup
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="ml-4"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  )
}