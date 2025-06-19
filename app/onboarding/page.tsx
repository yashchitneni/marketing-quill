'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRole } from '@/lib/hooks/use-role'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Building2, FileText, Target, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface BrandVoice {
  companyName: string
  industry: string
  targetAudience: string
  tonePreferences: string[]
  sampleContent: string
}

const toneOptions = [
  'Professional', 'Friendly', 'Conversational', 'Authoritative',
  'Inspirational', 'Educational', 'Casual', 'Technical',
  'Urgent', 'Empathetic', 'Witty', 'Formal'
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useRole()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [brandVoice, setBrandVoice] = useState<BrandVoice>({
    companyName: '',
    industry: '',
    targetAudience: '',
    tonePreferences: [],
    sampleContent: ''
  })

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
    
    // Save brand voice to user profile
    const { error } = await supabase
      .from('profiles')
      .update({
        brand_voice: brandVoice,
        onboarding_completed: true
      })
      .eq('id', user?.id)
    
    if (!error) {
      router.push('/dashboard')
    }
    setIsLoading(false)
  }

  const handleSkip = () => {
    router.push('/dashboard')
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
              <CardTitle>Brand Voice Setup</CardTitle>
              <Badge variant="outline">Step {currentStep} of 3</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={currentStep.toString()} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="1" onClick={() => setCurrentStep(1)}>
                  <Building2 className="h-4 w-4 mr-2" />
                  Company Info
                </TabsTrigger>
                <TabsTrigger value="2" onClick={() => setCurrentStep(2)}>
                  <Target className="h-4 w-4 mr-2" />
                  Tone & Audience
                </TabsTrigger>
                <TabsTrigger value="3" onClick={() => setCurrentStep(3)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Sample Content
                </TabsTrigger>
              </TabsList>

              <TabsContent value="1" className="space-y-4 mt-6">
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

              <TabsContent value="2" className="space-y-4 mt-6">
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

              <TabsContent value="3" className="space-y-4 mt-6">
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
              <Button
                variant="ghost"
                onClick={handleSkip}
              >
                Skip for now
              </Button>
              
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleComplete}
                    disabled={isLoading}
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