'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  Download, 
  Copy, 
  FileText, 
  Linkedin,
  CheckCircle,
  Link,
  Share2,
  FileJson
} from 'lucide-react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useToast } from '@/lib/hooks/use-toast'

export function ExportButton() {
  const { content, title } = useEditorStore()
  const { toast } = useToast()
  const [showPreview, setShowPreview] = useState(false)
  const [previewFormat, setPreviewFormat] = useState<'linkedin' | 'text'>('linkedin')

  const copyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: message,
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
    // LinkedIn formatting best practices
    let formatted = text
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(p => p.length > 0)
      .join('\n\n')
    
    // Ensure hashtags are on their own line at the end
    const lines = formatted.split('\n')
    const hashtagLine = lines[lines.length - 1]
    if (hashtagLine && hashtagLine.includes('#') && !hashtagLine.match(/^#\w+(\s+#\w+)*$/)) {
      // If the last line contains hashtags mixed with text, separate them
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

  const generateLinkedInDraftUrl = () => {
    // LinkedIn doesn't support pre-filled posts via URL, but we can open the compose window
    const linkedInUrl = 'https://www.linkedin.com/feed/?shareActive=true'
    
    // Copy content to clipboard first
    copyToClipboard(formatForLinkedIn(content), "Content copied! Paste it in the LinkedIn compose window.")
    
    // Open LinkedIn in new tab
    window.open(linkedInUrl, '_blank')
  }

  const downloadAsText = () => {
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${title || 'linkedin-post'}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    
    toast({
      title: "Downloaded!",
      description: "Your post has been saved as a text file",
    })
  }

  const exportAsMarkdown = () => {
    const markdown = `# ${title || 'LinkedIn Post'}\n\n${content}\n\n---\n\n*Created with MarketingQuill*`
    const element = document.createElement('a')
    const file = new Blob([markdown], { type: 'text/markdown' })
    element.href = URL.createObjectURL(file)
    element.download = `${title || 'linkedin-post'}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    
    toast({
      title: "Downloaded!",
      description: "Your post has been saved as a markdown file",
    })
  }
  
  const exportAsJSON = () => {
    const jsonData = {
      title: title || 'LinkedIn Post',
      content: content,
      formattedContent: formatForLinkedIn(content),
      metadata: {
        characterCount: content.length,
        wordCount: content.split(/\s+/).filter(word => word.length > 0).length,
        lineCount: content.split('\n').length,
        hashtagCount: (content.match(/#\w+/g) || []).length,
        exportedAt: new Date().toISOString(),
        platform: 'linkedin'
      }
    }
    
    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = `${title || 'linkedin-post'}.json`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    
    toast({
      title: "Downloaded!",
      description: "Your post has been saved as a JSON file for scheduling tools",
    })
  }

  const handlePreview = (format: 'linkedin' | 'text') => {
    setPreviewFormat(format)
    setShowPreview(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Export Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => copyToClipboard(formatForLinkedIn(content), "LinkedIn-formatted content copied!")}>
            <Copy className="mr-2 h-4 w-4" />
            Copy for LinkedIn
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={generateLinkedInDraftUrl}>
            <Linkedin className="mr-2 h-4 w-4" />
            Open LinkedIn Composer
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={downloadAsText}>
            <FileText className="mr-2 h-4 w-4" />
            Download as Text
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={exportAsMarkdown}>
            <Download className="mr-2 h-4 w-4" />
            Download as Markdown
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={exportAsJSON}>
            <FileJson className="mr-2 h-4 w-4" />
            Export as JSON (for scheduling)
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => handlePreview('linkedin')}>
            <Link className="mr-2 h-4 w-4" />
            Preview LinkedIn Format
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>LinkedIn Post Preview</DialogTitle>
            <DialogDescription>
              This is how your post will appear when formatted for LinkedIn
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {formatForLinkedIn(content).split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{content.length} characters</span>
              <span className={content.length > 3000 ? 'text-red-500 font-medium' : 'text-green-600'}>
                {content.length > 3000 
                  ? `${content.length - 3000} characters over limit` 
                  : `${3000 - content.length} characters remaining`}
              </span>
            </div>
            
            {content.length > 1300 && content.length <= 3000 && (
              <p className="mt-2 text-sm text-amber-600">
                <CheckCircle className="inline h-3 w-3 mr-1" />
                Optimal length for LinkedIn engagement
              </p>
            )}
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            <Button onClick={() => {
              copyToClipboard(formatForLinkedIn(content), "LinkedIn-formatted content copied!")
              setShowPreview(false)
            }}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Formatted
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}