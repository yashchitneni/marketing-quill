'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Linkedin, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useRouter } from 'next/navigation'

interface LinkedInPostButtonProps {
  draftId?: string
}

export function LinkedInPostButton({ draftId }: LinkedInPostButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [postResult, setPostResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  
  const { content } = useEditorStore()
  const { user } = useAuthStore()
  const router = useRouter()

  const handlePost = async () => {
    if (!content.trim()) {
      setPostResult({
        success: false,
        message: 'Please write some content before posting'
      })
      return
    }

    setIsPosting(true)
    setPostResult(null)

    try {
      const response = await fetch('/api/linkedin/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          draftId
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to post')
      }

      setPostResult({
        success: true,
        message: 'Successfully posted to LinkedIn!'
      })

      // Optionally redirect to dashboard after successful post
      setTimeout(() => {
        router.push('/dashboard?tab=published')
      }, 2000)

    } catch (error: any) {
      console.error('Post error:', error)
      
      if (error.message === 'LinkedIn not connected') {
        setPostResult({
          success: false,
          message: 'Please connect your LinkedIn account in Settings first'
        })
      } else {
        setPostResult({
          success: false,
          message: error.message || 'Failed to post to LinkedIn'
        })
      }
    } finally {
      setIsPosting(false)
    }
  }

  const checkLinkedInConnection = async () => {
    try {
      const response = await fetch('/api/linkedin/status')
      const data = await response.json()
      
      if (!data.connected) {
        setPostResult({
          success: false,
          message: 'Please connect your LinkedIn account in Settings first'
        })
        return false
      }
      
      return true
    } catch {
      return false
    }
  }

  const handleOpenDialog = async () => {
    const isConnected = await checkLinkedInConnection()
    if (isConnected) {
      setIsOpen(true)
    } else {
      setIsOpen(true) // Still open to show the error message
    }
  }

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        className="gap-2"
        variant="default"
      >
        <Linkedin className="h-4 w-4" />
        Post to LinkedIn
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-blue-600" />
              Post to LinkedIn
            </DialogTitle>
            <DialogDescription>
              Review your content before posting to LinkedIn
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <p className="whitespace-pre-wrap text-sm">
                {content || 'No content to post'}
              </p>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <span>{content.length} characters</span>
              <span className={content.length > 3000 ? 'text-red-500' : ''}>
                {content.length > 3000 ? 'Exceeds LinkedIn limit' : 'Within LinkedIn limit'}
              </span>
            </div>
          </div>

          {postResult && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              postResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {postResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <span className="text-sm">{postResult.message}</span>
            </div>
          )}

          <DialogFooter>
            {postResult?.success ? (
              <Button onClick={() => setIsOpen(false)}>
                Close
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isPosting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePost}
                  disabled={isPosting || !content.trim() || content.length > 3000}
                >
                  {isPosting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    'Post Now'
                  )}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}