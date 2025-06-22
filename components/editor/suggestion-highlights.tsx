'use client'

import { useEffect, useRef } from 'react'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'

interface SuggestionHighlightsProps {
  text: string
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}

interface TextSegment {
  text: string
  type: 'normal' | 'spell-error' | 'grammar' | 'tone'
  startIndex: number
  endIndex: number
}

export function SuggestionHighlights({ text, textareaRef }: SuggestionHighlightsProps) {
  const highlightContainerRef = useRef<HTMLDivElement>(null)
  const { suggestions } = useSuggestionsStore()
  const { errors: spellErrors } = useSpellCheckStore()
  const lastTextRef = useRef<string>(text)

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
    if (!text) {
      return null;
    }

    // Combine all highlights (spell errors and suggestions)
    const allHighlights: TextSegment[] = []
    
    // Add spell errors
    spellErrors.forEach(error => {
      allHighlights.push({
        text: error.word,
        type: 'spell-error',
        startIndex: error.startIndex,
        endIndex: error.endIndex
      })
    })
    
    // Add AI suggestions
    suggestions.forEach(suggestion => {
      // Check if this overlaps with a spell error
      const hasSpellError = spellErrors.some(error => 
        (error.startIndex <= suggestion.startIndex && error.endIndex >= suggestion.endIndex) ||
        (suggestion.startIndex <= error.startIndex && suggestion.endIndex >= error.endIndex)
      )
      
      if (!hasSpellError) {
        allHighlights.push({
          text: suggestion.text,
          type: suggestion.type,
          startIndex: suggestion.startIndex,
          endIndex: suggestion.endIndex
        })
      }
    })
    
    // Sort by start index
    allHighlights.sort((a, b) => a.startIndex - b.startIndex)
    
    // Build the highlighted text
    const segments: React.ReactNode[] = []
    let lastIndex = 0
    
    allHighlights.forEach((highlight, index) => {
      // Add normal text before this highlight
      if (lastIndex < highlight.startIndex) {
        segments.push(
          <span key={`normal-${index}`} style={{ color: 'transparent' }}>
            {text.slice(lastIndex, highlight.startIndex)}
          </span>
        )
      }
      
      // Add highlighted text
      const highlightStyle = {
        color: 'transparent',
        borderBottom: highlight.type === 'spell-error' 
          ? '2px wavy red'
          : highlight.type === 'grammar'
          ? '2px wavy #ef4444'
          : '2px wavy #3b82f6',
        paddingBottom: '2px'
      }
      
      segments.push(
        <span key={`highlight-${index}`} style={highlightStyle}>
          {text.slice(highlight.startIndex, highlight.endIndex)}
        </span>
      )
      
      lastIndex = highlight.endIndex
    })
    
    // Add any remaining text
    if (lastIndex < text.length) {
      segments.push(
        <span key="normal-end" style={{ color: 'transparent' }}>
          {text.slice(lastIndex)}
        </span>
      )
    }
    
    return segments
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
