'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { 
  Settings, 
  User, 
  Linkedin, 
  Bot, 
  Bell, 
  Shield,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react'

export default function SettingsPage() {
  const [linkedinConnected, setLinkedinConnected] = useState(false)
  const [voiceProfileSetup, setVoiceProfileSetup] = useState(false)
  const [writingGoals, setWritingGoals] = useState<string[]>([])

  const handleLinkedInConnect = () => {
    // Start LinkedIn OAuth flow
    window.location.href = '/api/auth/linkedin'
  }

  const handleVoiceProfileSetup = () => {
    // TODO: Navigate to voice profile setup flow
    console.log('Starting voice profile setup...')
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

        <Tabs defaultValue="linkedin" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            <TabsTrigger value="voice">Voice Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* LinkedIn Integration */}
          <TabsContent value="linkedin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                  LinkedIn Integration
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
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Your Name</p>
                          <p className="text-sm text-gray-500">Professional Title</p>
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
                        <Button key={style} variant="outline" size="sm" className="justify-start">
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="writing-goals">Writing Goals</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Build Authority', 'Generate Leads', 'Share Knowledge', 'Network Building', 'Personal Branding', 'Thought Leadership'].map((goal) => (
                        <Button key={goal} variant="outline" size="sm" className="justify-start">
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
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Hook generation</Label>
                    <p className="text-sm text-gray-500">
                      Auto-generate compelling opening lines
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Engagement predictions</Label>
                    <p className="text-sm text-gray-500">
                      Show predicted engagement scores
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>LinkedIn formatting</Label>
                    <p className="text-sm text-gray-500">
                      Auto-format for LinkedIn best practices
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div>
                  <Label>Suggestion aggressiveness</Label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">Conservative</Button>
                    <Button variant="default" size="sm">Balanced</Button>
                    <Button variant="outline" size="sm">Aggressive</Button>
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
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your account details and subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your Name" />
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