'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Globe, 
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface LinkedInPreviewProps {
  content: string
  className?: string
  showMetrics?: boolean
}

export function LinkedInPreview({ content, className = '', showMetrics = true }: LinkedInPreviewProps) {
  const { user } = useAuthStore()
  const [profileData, setProfileData] = useState<{
    fullName: string
    avatarUrl?: string
    linkedinName?: string
  }>({
    fullName: 'Your Name'
  })
  
  // Display placeholder if no content
  const displayContent = content || 'Start typing to see your LinkedIn post preview...'

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return
      
      const supabase = createClient()
      
      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()
      
      // Get LinkedIn profile
      const { data: linkedinProfile } = await supabase
        .from('user_profiles')
        .select('linkedin_first_name, linkedin_last_name, avatar_url')
        .eq('user_id', user.id)
        .single()
      
      setProfileData({
        fullName: profile?.full_name || 'Your Name',
        linkedinName: linkedinProfile?.linkedin_first_name && linkedinProfile?.linkedin_last_name
          ? `${linkedinProfile.linkedin_first_name} ${linkedinProfile.linkedin_last_name}`
          : undefined,
        avatarUrl: linkedinProfile?.avatar_url
      })
    }
    
    fetchProfileData()
  }, [user])

  const formatContent = (text: string) => {
    if (!text) return ''
    
    // Process hashtags
    let formatted = text.replace(/#(\w+)/g, '<span class="text-blue-600 hover:underline cursor-pointer">#$1</span>')
    
    // Process mentions
    formatted = formatted.replace(/@(\w+)/g, '<span class="text-blue-600 hover:underline cursor-pointer">@$1</span>')
    
    // Process URLs
    formatted = formatted.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<span class="text-blue-600 hover:underline cursor-pointer">$1</span>'
    )
    
    // Convert line breaks to <br> tags
    formatted = formatted.replace(/\n/g, '<br>')
    
    return formatted
  }

  const characterCount = content.length
  const isOptimalLength = characterCount >= 1000 && characterCount <= 1500
  const isNearLimit = characterCount > 2800
  const isOverLimit = characterCount > 3000

  const displayName = profileData.linkedinName || profileData.fullName
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={`space-y-3 ${className}`}>
      <Card className="p-4 border-gray-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12">
              {profileData.avatarUrl ? (
                <AvatarImage src={profileData.avatarUrl} alt={displayName} />
              ) : null}
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{displayName}</h3>
                <span className="text-gray-500">• 1st</span>
              </div>
              <p className="text-sm text-gray-500">Your professional headline</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <span>Just now</span>
                <span>•</span>
                <Globe className="h-3 w-3" />
              </div>
            </div>
          </div>
          
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div 
          className="text-sm leading-relaxed text-gray-900 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: formatContent(displayContent) }}
        />

        {/* Mock Engagement */}
        {showMetrics && content.length > 0 && (
          <>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <ThumbsUp className="h-2.5 w-2.5 text-white fill-white" />
                  </div>
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    ❤️
                  </div>
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    👏
                  </div>
                </div>
                <span className="text-xs text-gray-500 ml-1">47</span>
              </div>
              
              <div className="flex gap-3 text-xs text-gray-500">
                <span>12 comments</span>
                <span>3 reposts</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-around mt-2 pt-2 border-t border-gray-100">
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                <ThumbsUp className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Like</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                <MessageSquare className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Comment</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Repeat2 className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Repost</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Send className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Send</span>
              </button>
            </div>
          </>
        )}
      </Card>

      {/* Character Count and Status */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Character count</span>
          <span className={`font-medium ${
            isOverLimit ? 'text-red-600' : 
            isNearLimit ? 'text-amber-600' : 
            isOptimalLength ? 'text-green-600' : 
            'text-gray-600'
          }`}>
            {characterCount} / 3000
          </span>
        </div>
        
        {characterCount > 0 && (
          <div className="space-y-1">
            {isOptimalLength && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Optimal length for engagement (1000-1500 characters)</span>
              </div>
            )}
            
            {isNearLimit && !isOverLimit && (
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <AlertCircle className="h-4 w-4" />
                <span>Approaching character limit</span>
              </div>
            )}
            
            {isOverLimit && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>Exceeds LinkedIn&apos;s 3000 character limit by {characterCount - 3000} characters</span>
              </div>
            )}
            
            {characterCount < 250 && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AlertCircle className="h-4 w-4" />
                <span>Consider adding more content for better engagement</span>
              </div>
            )}
          </div>
        )}
        
        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              isOverLimit ? 'bg-red-500' :
              isNearLimit ? 'bg-amber-500' :
              isOptimalLength ? 'bg-green-500' :
              'bg-blue-500'
            }`}
            style={{ width: `${Math.min((characterCount / 3000) * 100, 100)}%` }}
          />
          {isOptimalLength && (
            <>
              <div className="absolute top-0 left-[33.33%] w-px h-full bg-gray-300" />
              <div className="absolute top-0 left-[50%] w-px h-full bg-gray-300" />
            </>
          )}
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>1000 (min optimal)</span>
          <span>1500 (max optimal)</span>
          <span>3000 (limit)</span>
        </div>
      </div>
    </div>
  )
}