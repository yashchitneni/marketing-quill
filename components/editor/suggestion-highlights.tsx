'use client'

import { useEffect, useRef } from 'react'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'

interface SuggestionHighlightsProps {
  text: string
  textareaRef: React.RefObject<HTMLTextAreaElement>
}

export function SuggestionHighlights({ text, textareaRef }: SuggestionHighlightsProps) {
  const highlightContainerRef = useRef<HTMLDivElement>(null)
  const { suggestions } = useSuggestionsStore()
  const lastTextRef = useRef<string>(text)
  
  // TODO: Use suggestions for highlighting once implementation is complete
  console.log('Suggestions available:', suggestions.length)

  // Sync scroll position between textarea and highlights
  useEffect(() => {
    if (!textareaRef.current || !highlightContainerRef.current) return

    const syncScroll = () => {
      if (highlightContainerRef.current && textareaRef.current) {
        highlightContainerRef.current.scrollTop = textareaRef.current.scrollTop
        highlightContainerRef.current.scrollLeft = textareaRef.current.scrollLeft
      }
    }

    const textarea = textareaRef.current
    textarea.addEventListener('scroll', syncScroll)
    
    // Initial sync
    syncScroll()

    return () => {
      textarea.removeEventListener('scroll', syncScroll)
    }
  }, [textareaRef])

  // Store the last text value to prevent unnecessary re-renders
  useEffect(() => {
    lastTextRef.current = text
  }, [text])

  const renderHighlightedText = () => {
    // The conditional rendering in EditorPane.tsx ensures suggestions.length > 0
    // if this component is rendered. We still need to check for `!text`.
    if (!text) {
      return null;
    }

    // Diagnostic: Render the entire text as a single transparent span,
    // ignoring actual suggestion data for now.
    return (
      <span style={{ whiteSpace: 'pre-wrap', color: 'transparent' }}>
        {text}
      </span>
    );
  }

  return (
    <div
      ref={highlightContainerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: '16px',
        lineHeight: '1.75',
        padding: '32px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        userSelect: 'none' // Prevent text selection in the highlights layer
      }}
    >
      <div className="pointer-events-auto">
        {renderHighlightedText()}
      </div>
    </div>
  )
}
