'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRole } from '@/lib/hooks/use-role'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Building2, FileText, Target, Sparkles, User, Linkedin } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useToast } from '@/lib/hooks/use-toast'

interface BrandVoice {
  companyName: string
  industry: string
  targetAudience: string
  tonePreferences: string[]
  sampleContent: string
}

interface UserProfile {
  fullName: string
  linkedInConnected: boolean
}

const toneOptions = [
  'Professional', 'Friendly', 'Conversational', 'Authoritative',
  'Inspirational', 'Educational', 'Casual', 'Technical',
  'Urgent', 'Empathetic', 'Witty', 'Formal'
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useRole()
  const authUser = useAuthStore(state => state.user)
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: '',
    linkedInConnected: false
  })
  const [brandVoice, setBrandVoice] = useState<BrandVoice>({
    companyName: '',
    industry: '',
    targetAudience: '',
    tonePreferences: [],
    sampleContent: ''
  })
  const [checkingLinkedIn, setCheckingLinkedIn] = useState(true)
  
  // Check LinkedIn connection status and load existing profile data on mount
  useEffect(() => {
    const checkUserStatus = async () => {
      const userId = user?.id || authUser?.id
      if (!userId) return
      
      const supabase = createClient()
      
      // Check LinkedIn connection
      const { data: linkedInData } = await supabase
        .from('user_profiles')
        .select('linkedin_profile_id')
        .eq('user_id', userId)
        .single()
      
      if (linkedInData?.linkedin_profile_id) {
        setUserProfile(prev => ({ ...prev, linkedInConnected: true }))
      }
      
      // Also check if user already has a name in profiles table
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .single()
      
      if (profileData?.full_name) {
        setUserProfile(prev => ({ ...prev, fullName: profileData.full_name }))
      }
      
      setCheckingLinkedIn(false)
    }
    
    checkUserStatus()
  }, [user, authUser])

  const handleToneToggle = (tone: string) => {
    setBrandVoice(prev => ({
      ...prev,
      tonePreferences: prev.tonePreferences.includes(tone)
        ? prev.tonePreferences.filter(t => t !== tone)
        : [...prev.tonePreferences, tone]
    }))
  }

  const handleComplete = async () => {
    setIsLoading(true)
    const supabase = createClient()
    
    // Save brand voice and user profile
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: userProfile.fullName,
        brand_voice: brandVoice,
        onboarding_completed: true,
        brand_voice_completed: true
      })
      .eq('id', user?.id)
    
    if (!error) {
      router.push('/dashboard')
    }
    setIsLoading(false)
  }

  const handleSkip = async () => {
    // Only allow skipping brand voice setup after name and LinkedIn are complete
    if (!userProfile.fullName.trim() || !userProfile.linkedInConnected) {
      return // Don't allow skipping without required fields
    }
    
    // Check if we have a user ID
    const userId = user?.id || authUser?.id
    if (!userId) {
      console.error('No user ID found for onboarding skip')
      return
    }
    
    // Save the name and mark onboarding as partially complete
    setIsLoading(true)
    const supabase = createClient()
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: userProfile.fullName,
          onboarding_completed: true,
          brand_voice_completed: false // Track that brand voice was skipped
        })
        .eq('id', userId)
      
      if (error) {
        console.error('Error updating profile:', error)
        // Try to navigate anyway if it's a minor error
        if (error.code === 'PGRST116') {
          // No rows returned - profile might not exist yet, create it
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              full_name: userProfile.fullName,
              onboarding_completed: true,
              brand_voice_completed: false
            })
          
          if (!insertError) {
            router.push('/dashboard')
          } else {
            console.error('Error creating profile:', insertError)
            toast({
              title: "Error",
              description: "Failed to save profile. Please try again.",
              variant: "destructive"
            })
          }
        } else {
          // Show error to user
          toast({
            title: "Error",
            description: "Failed to update profile. Please try again.",
            variant: "destructive"
          })
        }
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      console.error('Unexpected error during skip:', err)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-4">
      <div className="max-w-3xl mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to MarketingQuill!</h1>
          <p className="text-gray-600">Let&apos;s set up your brand voice to get personalized suggestions</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Welcome Setup</CardTitle>
              <Badge variant="outline">Step {currentStep} of 4</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={currentStep.toString()} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="1" onClick={() => setCurrentStep(1)}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="2" onClick={() => setCurrentStep(2)}>
                  <Building2 className="h-4 w-4 mr-2" />
                  Company
                </TabsTrigger>
                <TabsTrigger value="3" onClick={() => setCurrentStep(3)}>
                  <Target className="h-4 w-4 mr-2" />
                  Tone
                </TabsTrigger>
                <TabsTrigger value="4" onClick={() => setCurrentStep(4)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Sample
                </TabsTrigger>
              </TabsList>

              <TabsContent value="1" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="fullName">Your Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={userProfile.fullName}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">This is how we'll greet you in the app</p>
                </div>
                
                <div className="mt-6">
                  <Label className="flex items-center gap-2">
                    LinkedIn Connection
                    <span className="text-red-500 text-sm">*</span>
                  </Label>
                  <Card className="mt-2">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${userProfile.linkedInConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <Linkedin className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">
                              {userProfile.linkedInConnected ? 'LinkedIn Connected' : 'Connect LinkedIn Account'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {userProfile.linkedInConnected 
                                ? 'Your LinkedIn account is connected' 
                                : 'Required for posting and content optimization'}
                            </p>
                          </div>
                        </div>
                        {!userProfile.linkedInConnected && (
                          <Button
                            onClick={() => {
                              // Store that we're in onboarding flow
                              sessionStorage.setItem('onboarding_redirect', 'true')
                              window.location.href = '/api/auth/linkedin'
                            }}
                            disabled={checkingLinkedIn}
                          >
                            {checkingLinkedIn ? 'Checking...' : 'Connect LinkedIn'}
                          </Button>
                        )}
                        {userProfile.linkedInConnected && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Connected
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  {!userProfile.linkedInConnected && (
                    <p className="text-xs text-red-500 mt-1">
                      LinkedIn connection is required to continue
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="2" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Acme Corp"
                    value={brandVoice.companyName}
                    onChange={(e) => setBrandVoice(prev => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="SaaS, E-commerce, FinTech, etc."
                    value={brandVoice.industry}
                    onChange={(e) => setBrandVoice(prev => ({ ...prev, industry: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Textarea
                    id="audience"
                    placeholder="Marketing managers at mid-size B2B SaaS companies..."
                    value={brandVoice.targetAudience}
                    onChange={(e) => setBrandVoice(prev => ({ ...prev, targetAudience: e.target.value }))}
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="3" className="space-y-4 mt-6">
                <div>
                  <Label>Preferred Tone (select up to 4)</Label>
                  <CardDescription className="mb-3">
                    Choose the tones that best represent your brand voice
                  </CardDescription>
                  <div className="grid grid-cols-3 gap-3">
                    {toneOptions.map((tone) => (
                      <Button
                        key={tone}
                        variant={brandVoice.tonePreferences.includes(tone) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleToneToggle(tone)}
                        disabled={!brandVoice.tonePreferences.includes(tone) && brandVoice.tonePreferences.length >= 4}
                      >
                        {tone}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="4" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="sample">Sample Content (Optional)</Label>
                  <CardDescription className="mb-3">
                    Paste a sample of your existing marketing copy to help us understand your style
                  </CardDescription>
                  <Textarea
                    id="sample"
                    placeholder="Paste your best-performing email, landing page copy, or any content that represents your brand voice..."
                    value={brandVoice.sampleContent}
                    onChange={(e) => setBrandVoice(prev => ({ ...prev, sampleContent: e.target.value }))}
                    rows={8}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-8">
              {/* Show skip button after name and LinkedIn are complete */}
              {userProfile.fullName.trim() && userProfile.linkedInConnected && currentStep > 1 && (
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  disabled={isLoading}
                >
                  Skip brand voice setup
                </Button>
              )}
              {(currentStep === 1 || !userProfile.fullName.trim() || !userProfile.linkedInConnected) && <div />}
              
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < 4 ? (
                  <Button 
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={currentStep === 1 && (!userProfile.fullName.trim() || !userProfile.linkedInConnected)}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleComplete}
                    disabled={isLoading || !userProfile.fullName.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Complete Setup
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}