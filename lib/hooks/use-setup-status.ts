import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/auth-store'

export interface SetupStatus {
  isComplete: boolean
  nameCompleted: boolean
  linkedinConnected: boolean
  brandVoiceCompleted: boolean
  completedSteps: number
  totalSteps: number
  percentComplete: number
}

export function useSetupStatus() {
  const { user } = useAuthStore()
  const [setupStatus, setSetupStatus] = useState<SetupStatus>({
    isComplete: false,
    nameCompleted: false,
    linkedinConnected: false,
    brandVoiceCompleted: false,
    completedSteps: 0,
    totalSteps: 3,
    percentComplete: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSetupStatus()
  }, [user])

  const fetchSetupStatus = async () => {
    if (!user) {
      setLoading(false)
      return
    }
    
    const supabase = createClient()
    
    // Check main profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, brand_voice_completed')
      .eq('id', user.id)
      .single()
    
    // Check LinkedIn connection separately
    const { data: linkedinProfile } = await supabase
      .from('user_profiles')
      .select('linkedin_profile_id')
      .eq('user_id', user.id)
      .single()
    
    const nameCompleted = !!profile?.full_name
    const linkedinConnected = !!linkedinProfile?.linkedin_profile_id
    const brandVoiceCompleted = !!profile?.brand_voice_completed
      
    const completedSteps = [nameCompleted, linkedinConnected, brandVoiceCompleted].filter(Boolean).length
    const isComplete = completedSteps === 3
    
    setSetupStatus({
      isComplete,
      nameCompleted,
      linkedinConnected,
      brandVoiceCompleted,
      completedSteps,
      totalSteps: 3,
      percentComplete: (completedSteps / 3) * 100
    })
    
    setLoading(false)
  }

  return { setupStatus, loading, refetch: fetchSetupStatus }
}