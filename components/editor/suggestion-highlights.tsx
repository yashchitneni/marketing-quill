'use client'

import { useEffect, useRef } from 'react'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { cn } from '@/lib/utils'

interface SuggestionHighlightsProps {
  text: string
  textareaRef: React.RefObject<HTMLTextAreaElement>
}

export function SuggestionHighlights({ text, textareaRef }: SuggestionHighlightsProps) {
  const highlightContainerRef = useRef<HTMLDivElement>(null)
  const { suggestions, selectedSuggestion, selectSuggestion } = useSuggestionsStore()
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
    if (!text || suggestions.length === 0) {
      return <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>
    }

    const elements: React.ReactElement[] = []
    let lastIndex = 0

    // Sort suggestions by startIndex
    const sortedSuggestions = [...suggestions].sort((a, b) => a.startIndex - b.startIndex)

    // Filter out suggestions that are outside the text bounds
    const validSuggestions = sortedSuggestions.filter(
      suggestion => suggestion.startIndex >= 0 && suggestion.endIndex <= text.length
    )

    validSuggestions.forEach((suggestion, index) => {
      // Add text before suggestion
      if (suggestion.startIndex > lastIndex) {
        elements.push(
          <span key={`text-${index}`} style={{ whiteSpace: 'pre-wrap' }}>
            {text.slice(lastIndex, suggestion.startIndex)}
          </span>
        )
      }

      // Add highlighted suggestion
      elements.push(
        <span
          key={`suggestion-${suggestion.id}`}
          className={cn(
            'relative cursor-pointer transition-all',
            suggestion.type === 'grammar' 
              ? 'underline decoration-red-500 decoration-wavy underline-offset-2' 
              : 'underline decoration-blue-500 decoration-wavy underline-offset-2',
            selectedSuggestion?.id === suggestion.id && 'bg-yellow-100'
          )}
          onClick={(e) => {
            e.stopPropagation()
            selectSuggestion(suggestion)
          }}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {text.slice(suggestion.startIndex, suggestion.endIndex)}
        </span>
      )

      lastIndex = suggestion.endIndex
    })

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(
        <span key="text-end" style={{ whiteSpace: 'pre-wrap' }}>
          {text.slice(lastIndex)}
        </span>
      )
    }

    return elements
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
