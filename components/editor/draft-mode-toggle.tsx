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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { LinkedInPreview } from './linkedin-preview'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useToast } from '@/lib/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { 
  Linkedin, 
  FileText, 
  Send,
  ExternalLink,
  Copy,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

type PostMode = 'draft' | 'direct'

interface DraftModeToggleProps {
  onPost?: () => void
}

export function DraftModeToggle({ onPost }: DraftModeToggleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [postMode, setPostMode] = useState<PostMode>('draft')
  const [isProcessing, setIsProcessing] = useState(false)
  const [postResult, setPostResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const { content, title, save, draftId } = useEditorStore()
  const { toast } = useToast()
  const router = useRouter()

  const handleOpenDialog = async () => {
    // Check LinkedIn connection first
    try {
      const response = await fetch('/api/linkedin/status')
      const data = await response.json()
      
      if (!data.connected) {
        toast({
          title: "LinkedIn not connected",
          description: "Please connect your LinkedIn account in Settings first",
          variant: "destructive"
        })
        return
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check LinkedIn connection",
        variant: "destructive"
      })
      return
    }
    
    setIsOpen(true)
    setPostResult(null)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard. Paste it in LinkedIn.",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive"
      })
    }
  }

  const formatForLinkedIn = (text: string) => {
    let formatted = text
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(p => p.length > 0)
      .join('\n\n')
    
    // Ensure hashtags are on their own line at the end
    const lines = formatted.split('\n')
    const hashtagLine = lines[lines.length - 1]
    if (hashtagLine && hashtagLine.includes('#') && !hashtagLine.match(/^#\w+(\s+#\w+)*$/)) {
      const hashtags = hashtagLine.match(/#\w+/g) || []
      const textWithoutHashtags = hashtagLine.replace(/#\w+/g, '').trim()
      if (textWithoutHashtags) {
        lines[lines.length - 1] = textWithoutHashtags
        lines.push(hashtags.join(' '))
        formatted = lines.join('\n')
      }
    }
    
    return formatted
  }

  const handleDraftMode = async () => {
    setIsProcessing(true)
    
    // Save the current draft first
    await save(true)
    
    // Copy formatted content to clipboard
    const formattedContent = formatForLinkedIn(content)
    await copyToClipboard(formattedContent)
    
    // Open LinkedIn compose window
    const linkedInUrl = 'https://www.linkedin.com/feed/?shareActive=true'
    window.open(linkedInUrl, '_blank')
    
    setIsProcessing(false)
    setIsOpen(false)
    
    toast({
      title: "Draft mode activated",
      description: "Content copied! Paste it in the LinkedIn compose window.",
    })
  }

  const handleDirectPost = async () => {
    setIsProcessing(true)
    setPostResult(null)
    
    try {
      const response = await fetch('/api/linkedin/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          draftId: draftId
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

      // Redirect to dashboard after successful post
      setTimeout(() => {
        router.push('/dashboard?tab=published')
      }, 2000)

    } catch (error) {
      console.error('Post error:', error)
      
      if (error instanceof Error && error.message === 'LinkedIn not connected') {
        setPostResult({
          success: false,
          message: 'Please connect your LinkedIn account in Settings first'
        })
      } else {
        setPostResult({
          success: false,
          message: error instanceof Error ? error.message : 'Failed to post to LinkedIn'
        })
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAction = async () => {
    if (postMode === 'draft') {
      await handleDraftMode()
    } else {
      await handleDirectPost()
    }
  }

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        className="gap-2"
        variant="default"
        disabled={!content.trim()}
      >
        <Linkedin className="h-4 w-4" />
        Post to LinkedIn
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>LinkedIn Post Preview</DialogTitle>
            <DialogDescription>
              Review your post and choose how to publish it
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Post Mode Selection */}
            <div className="space-y-3">
              <Label>Publishing Mode</Label>
              <RadioGroup value={postMode} onValueChange={(value) => setPostMode(value as PostMode)}>
                <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="draft" id="draft" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="draft" className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">Save as Draft</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Recommended</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Opens LinkedIn with your content pre-copied. You can review, edit, and add media before posting.
                      </p>
                    </Label>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="direct" id="direct" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="direct" className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Send className="h-4 w-4" />
                        <span className="font-medium">Post Directly</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Publishes immediately to LinkedIn. No ability to add images or make final edits.
                      </p>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <LinkedInPreview content={content} showMetrics={true} />
            </div>
            
            {/* Post Result */}
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
          </div>

          <DialogFooter className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => copyToClipboard(formatForLinkedIn(content))}
              className="mr-auto"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Content
            </Button>
            
            <div className="flex gap-2">
              {postResult?.success ? (
                <Button
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    onClick={handleAction}
                    disabled={isProcessing || !content.trim() || content.length > 3000}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : postMode === 'draft' ? (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open LinkedIn Draft
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Post Now
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}