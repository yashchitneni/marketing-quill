'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  User, 
  Linkedin, 
  Bot,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/auth-store'

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const [linkedinConnected, setLinkedinConnected] = useState(false)
  const [linkedinProfile, setLinkedinProfile] = useState<any>(null)
  const [voiceProfileSetup, setVoiceProfileSetup] = useState(false)
  const [brandVoice, setBrandVoice] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('linkedin')
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    fullName: ''
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [preferences, setPreferences] = useState({
    realTimeSuggestions: true,
    hookGeneration: true,
    engagementPredictions: true,
    linkedinFormatting: true,
    suggestionLevel: 'balanced'
  })
  const [writingStyles, setWritingStyles] = useState<string[]>([])
  const [writingGoals, setWritingGoals] = useState<string[]>([])
  const user = useAuthStore(state => state.user)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Check for error messages
    const errorParam = searchParams.get('error')
    const successParam = searchParams.get('success')
    const tabParam = searchParams.get('tab')
    
    // Set active tab from URL param
    if (tabParam) {
      setActiveTab(tabParam)
    }
    
    if (errorParam === 'linkedin_config') {
      setError('LinkedIn integration is not configured. Please contact support.')
    } else if (errorParam === 'app_url_config') {
      setError('Application URL is not configured. Please contact support.')
    } else if (errorParam === 'invalid_callback') {
      setError('LinkedIn authentication failed. Please try again.')
    } else if (errorParam === 'token_exchange_failed') {
      setError('Failed to connect LinkedIn. Please try again.')
    }
    
    if (successParam === 'linkedin_connected') {
      setSuccess('LinkedIn connected successfully!')
      // Clear the success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000)
    }
  }, [searchParams])
  
  // Check LinkedIn connection status and brand voice
  useEffect(() => {
    const checkUserStatus = async () => {
      if (!user) return
      
      const supabase = createClient()
      
      // Check LinkedIn connection
      const { data: linkedInData } = await supabase
        .from('user_profiles')
        .select('linkedin_profile_id, linkedin_connected_at, linkedin_first_name, linkedin_last_name, avatar_url')
        .eq('user_id', user.id)
        .single()
      
      if (linkedInData?.linkedin_profile_id) {
        setLinkedinConnected(true)
        setLinkedinProfile(linkedInData)
      }
      
      // Check brand voice setup and full profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, brand_voice, brand_voice_completed, preferences, writing_styles, writing_goals')
        .eq('id', user.id)
        .single()
      
      if (profileData) {
        setUserProfile(profileData)
        setFormData({
          email: user.email || '',
          fullName: profileData.full_name || ''
        })
        if (profileData.brand_voice_completed) {
          setVoiceProfileSetup(true)
          setBrandVoice(profileData.brand_voice)
        }
        // Load preferences
        if (profileData.preferences) {
          setPreferences(profileData.preferences)
        }
        if (profileData.writing_styles) {
          setWritingStyles(profileData.writing_styles)
        }
        if (profileData.writing_goals) {
          setWritingGoals(profileData.writing_goals)
        }
      }
    }
    
    checkUserStatus()
  }, [user, searchParams]) // Re-check when searchParams change (after redirect)

  const handleLinkedInConnect = () => {
    // Start LinkedIn OAuth flow
    window.location.href = '/api/auth/linkedin'
  }

  const handleVoiceProfileSetup = () => {
    // Navigate to brand voice setup
    window.location.href = '/settings/brand-voice'
  }
  
  const handleLinkedInDisconnect = async () => {
    if (!user) return
    
    const supabase = createClient()
    const { error } = await supabase
      .from('user_profiles')
      .update({
        linkedin_access_token: null,
        linkedin_refresh_token: null,
        linkedin_expires_at: null,
        linkedin_profile_id: null,
        linkedin_first_name: null,
        linkedin_last_name: null,
        linkedin_connected_at: null,
        linkedin_oauth_state: null
      })
      .eq('user_id', user.id)
    
    if (!error) {
      setLinkedinConnected(false)
      setLinkedinProfile(null)
      setSuccess('LinkedIn disconnected successfully')
      setTimeout(() => setSuccess(null), 5000)
    }
  }
  
  const handleAccountSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    
    setSaving(true)
    setError(null)
    
    try {
      const supabase = createClient()
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
      
      if (profileError) throw profileError
      
      // Update local state
      setUserProfile((prev: any) => ({ ...prev, full_name: formData.fullName }))
      
      // Update auth store
      useAuthStore.getState().fetchUser()
      
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(null), 5000)
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
      setTimeout(() => setError(null), 5000)
    } finally {
      setSaving(false)
    }
  }
  
  // Check for changes separately from auto-save
  useEffect(() => {
    const hasNameChange = userProfile && formData.fullName !== userProfile.full_name
    const hasEmailChange = user && formData.email !== user.email
    setHasChanges(hasNameChange || hasEmailChange)
  }, [formData.fullName, formData.email, userProfile?.full_name, user?.email])
  
  // Auto-save functionality with debouncing
  useEffect(() => {
    // Don't auto-save if no user
    if (!user) {
      return
    }
    
    // Use userProfile directly instead of initialProfileRef to avoid race conditions
    const originalName = userProfile?.full_name || ''
    const currentName = formData.fullName.trim()
    const hasNameChange = currentName && currentName !== originalName
    
    // Don't auto-save if no changes
    if (!hasNameChange) return
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    
    // Debounce the save - wait 1 second after user stops typing
    saveTimeoutRef.current = setTimeout(async () => {
      setSaving(true)
      try {
        const supabase = createClient()
        
        // Update profile name
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: currentName,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id)
        
        if (profileError) throw profileError
        
        // Update local state to reflect the saved value
        setUserProfile((prev: any) => ({ ...prev, full_name: currentName }))
        useAuthStore.getState().fetchUser()
        setSuccess('Name saved')
        setTimeout(() => setSuccess(null), 2000)
      } catch (err: any) {
        console.error('Auto-save failed:', err)
        setError(err.message || 'Failed to save name')
        setTimeout(() => setError(null), 5000)
      } finally {
        setSaving(false)
      }
    }, 1000) // 1 second debounce
    
    // Cleanup timeout on unmount or dependency change
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [formData.fullName, user?.id, userProfile?.full_name]) // Include userProfile to trigger when loaded
  
  // Save preferences immediately when changed
  const savePreference = async (key: string, value: any) => {
    if (!user) return
    
    const updatedPreferences = { ...preferences, [key]: value }
    setPreferences(updatedPreferences)
    
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .update({
          preferences: updatedPreferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
      
      if (error) throw error
    } catch (err) {
      console.error('Failed to save preference:', err)
    }
  }
  
  // Toggle writing style
  const toggleWritingStyle = async (style: string) => {
    if (!user) return
    
    const updatedStyles = writingStyles.includes(style)
      ? writingStyles.filter(s => s !== style)
      : [...writingStyles, style]
    
    setWritingStyles(updatedStyles)
    
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .update({
          writing_styles: updatedStyles,
          brand_voice_completed: updatedStyles.length > 0 || writingGoals.length > 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
      
      if (!error) {
        setVoiceProfileSetup(updatedStyles.length > 0 || writingGoals.length > 0)
      }
    } catch (err) {
      console.error('Failed to save writing style:', err)
    }
  }
  
  // Toggle writing goal
  const toggleWritingGoal = async (goal: string) => {
    if (!user) return
    
    const updatedGoals = writingGoals.includes(goal)
      ? writingGoals.filter(g => g !== goal)
      : [...writingGoals, goal]
    
    setWritingGoals(updatedGoals)
    
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .update({
          writing_goals: updatedGoals,
          brand_voice_completed: writingStyles.length > 0 || updatedGoals.length > 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
      
      if (!error) {
        setVoiceProfileSetup(writingStyles.length > 0 || updatedGoals.length > 0)
      }
    } catch (err) {
      console.error('Failed to save writing goal:', err)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="h-8 w-8" />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your account, LinkedIn connection, and writing preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="linkedin" className="relative">
              LinkedIn
              {!linkedinConnected && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-2 w-2 p-0 rounded-full">
                  <span className="sr-only">Setup required</span>
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="voice" className="relative">
              Voice Profile
              {!voiceProfileSetup && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-2 w-2 p-0 rounded-full">
                  <span className="sr-only">Setup required</span>
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account" className="relative">
              Account
              {!userProfile?.full_name && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-2 w-2 p-0 rounded-full">
                  <span className="sr-only">Setup required</span>
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* LinkedIn Integration */}
          <TabsContent value="linkedin" className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p className="text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                <p className="text-sm">{success}</p>
              </div>
            )}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                  LinkedIn Integration
                  {!linkedinConnected && (
                    <Badge variant="destructive" className="ml-2">
                      Required
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Connect your LinkedIn account to enable direct posting and voice analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${linkedinConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div>
                      <p className="font-medium">
                        {linkedinConnected ? 'LinkedIn Connected' : 'LinkedIn Not Connected'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {linkedinConnected 
                          ? 'You can post directly and we can analyze your existing content' 
                          : 'Connect to enable direct posting and voice analysis'
                        }
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleLinkedInConnect}
                    variant={linkedinConnected ? "outline" : "default"}
                  >
                    {linkedinConnected ? 'Reconnect' : 'Connect LinkedIn'}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {linkedinConnected && (
                  <div className="space-y-4">
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Connected Account</h3>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {linkedinProfile?.avatar_url ? (
                          <img 
                            src={linkedinProfile.avatar_url} 
                            alt="Profile" 
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">
                            {linkedinProfile?.linkedin_first_name && linkedinProfile?.linkedin_last_name
                              ? `${linkedinProfile.linkedin_first_name} ${linkedinProfile.linkedin_last_name}`
                              : 'LinkedIn User'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Connected {linkedinProfile?.linkedin_connected_at 
                              ? new Date(linkedinProfile.linkedin_connected_at).toLocaleDateString()
                              : 'recently'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Permissions</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Post to LinkedIn on your behalf</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Read your existing LinkedIn posts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Access basic profile information</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleLinkedInDisconnect}
                        variant="destructive"
                        size="sm"
                      >
                        Disconnect LinkedIn
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Voice Profile */}
          <TabsContent value="voice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Voice Profile
                  {!voiceProfileSetup && (
                    <Badge variant="outline" className="ml-2">
                      Optional
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Configure your unique writing style for personalized suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${voiceProfileSetup ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div>
                      <p className="font-medium">
                        {voiceProfileSetup ? 'Voice Profile Complete' : 'Voice Profile Not Set Up'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {voiceProfileSetup 
                          ? 'Your writing style has been analyzed and configured' 
                          : 'Set up your voice profile for personalized suggestions'
                        }
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleVoiceProfileSetup}>
                    {voiceProfileSetup ? 'Update Profile' : 'Set Up Voice Profile'}
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="writing-style">Writing Style Preferences</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Professional', 'Conversational', 'Thought Leader', 'Storyteller', 'Data-Driven', 'Motivational'].map((style) => (
                        <Button 
                          key={style} 
                          variant={writingStyles.includes(style) ? "default" : "outline"} 
                          size="sm" 
                          className="justify-start"
                          onClick={() => toggleWritingStyle(style)}
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="writing-goals">Writing Goals</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Build Authority', 'Generate Leads', 'Share Knowledge', 'Network Building', 'Personal Branding', 'Thought Leadership'].map((goal) => (
                        <Button 
                          key={goal} 
                          variant={writingGoals.includes(goal) ? "default" : "outline"} 
                          size="sm" 
                          className="justify-start"
                          onClick={() => toggleWritingGoal(goal)}
                        >
                          {goal}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="sample-content">Sample Content (Optional)</Label>
                    <Textarea 
                      id="sample-content"
                      placeholder="Paste a few of your favorite LinkedIn posts here to help us understand your voice..."
                      className="mt-2"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This helps us understand your unique voice and style
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Writing Preferences</CardTitle>
                <CardDescription>
                  Customize how suggestions and optimizations work for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Real-time suggestions</Label>
                    <p className="text-sm text-gray-500">
                      Get suggestions as you type
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.realTimeSuggestions}
                    onCheckedChange={(checked) => savePreference('realTimeSuggestions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Hook generation</Label>
                    <p className="text-sm text-gray-500">
                      Auto-generate compelling opening lines
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.hookGeneration}
                    onCheckedChange={(checked) => savePreference('hookGeneration', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Engagement predictions</Label>
                    <p className="text-sm text-gray-500">
                      Show predicted engagement scores
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.engagementPredictions}
                    onCheckedChange={(checked) => savePreference('engagementPredictions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>LinkedIn formatting</Label>
                    <p className="text-sm text-gray-500">
                      Auto-format for LinkedIn best practices
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.linkedinFormatting}
                    onCheckedChange={(checked) => savePreference('linkedinFormatting', checked)}
                  />
                </div>

                <Separator />

                <div>
                  <Label>Suggestion aggressiveness</Label>
                  <div className="flex gap-2 mt-2">
                    <Button 
                      variant={preferences.suggestionLevel === 'conservative' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => savePreference('suggestionLevel', 'conservative')}
                    >
                      Conservative
                    </Button>
                    <Button 
                      variant={preferences.suggestionLevel === 'balanced' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => savePreference('suggestionLevel', 'balanced')}
                    >
                      Balanced
                    </Button>
                    <Button 
                      variant={preferences.suggestionLevel === 'aggressive' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => savePreference('suggestionLevel', 'aggressive')}
                    >
                      Aggressive
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    How many suggestions to show
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Account Information
                  {!userProfile?.full_name && (
                    <Badge variant="destructive" className="ml-2">
                      Name Required
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Manage your account details and subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-2">
                        Full Name
                        {!userProfile?.full_name && (
                          <span className="text-red-500 text-sm">*</span>
                        )}
                        <span className="text-sm ml-auto">
                          {saving ? (
                            <span className="text-blue-600">Saving...</span>
                          ) : hasChanges ? (
                            <span className="text-gray-500">Will save automatically</span>
                          ) : (
                            <span className="text-green-600">Saved</span>
                          )}
                        </span>
                      </Label>
                      <Input 
                        id="name" 
                        placeholder="Your Name" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={!userProfile?.full_name ? 'border-red-300' : ''}
                      />
                      {!formData.fullName.trim() && (
                        <p className="text-xs text-red-500 mt-1">
                          Name is required for personalized experience
                        </p>
                      )}
                      {hasChanges && !saving && (
                        <p className="text-xs text-gray-500 mt-1">
                          Changes will be saved automatically
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Subscription</h3>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Free Plan</p>
                      <p className="text-sm text-gray-500">50 suggestions per month</p>
                    </div>
                    <Button variant="outline">Upgrade</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}