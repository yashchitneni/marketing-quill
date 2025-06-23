'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface FormattedPreviewProps {
  content: string
  className?: string
}

export function FormattedPreview({ content, className }: FormattedPreviewProps) {
  const formattedContent = useMemo(() => {
    if (!content) return null

    // Convert markdown-style formatting to HTML for preview
    let formatted = content
      // Escape HTML
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      
    // Bold text: **text** -> <strong>text</strong>
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    
    // Italic text: *text* -> <em>text</em>
    formatted = formatted.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
    
    // Bullet points: • text or - text at start of line
    formatted = formatted.replace(/^[•·]\s(.*)$/gm, '<li>$1</li>')
    formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    
    // Numbered lists: 1. text at start of line
    formatted = formatted.replace(/^\d+\.\s(.*)$/gm, '<li>$1</li>')
    formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      // Check if this is already wrapped in ul (bullet list)
      if (match.includes('<ul>')) return match
      return `<ol>${match}</ol>`
    })
    
    // Convert hashtags to blue
    formatted = formatted.replace(/#(\w+)/g, '<span class="text-blue-600">#$1</span>')
    
    // Convert mentions to blue
    formatted = formatted.replace(/@(\w+)/g, '<span class="text-blue-600">@$1</span>')
    
    // Convert line breaks
    formatted = formatted.replace(/\n/g, '<br />')

    return formatted
  }, [content])

  if (!content) {
    return (
      <div className={cn("text-muted-foreground/50 italic", className)}>
        Preview will appear here...
      </div>
    )
  }

  return (
    <div 
      className={cn("formatted-preview", className)}
      dangerouslySetInnerHTML={{ __html: formattedContent }}
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
      }}
    />
  )
}