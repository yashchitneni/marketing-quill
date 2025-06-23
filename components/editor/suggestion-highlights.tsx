'use client'

import { useEffect, useRef, useState } from 'react'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { SpellCheckTooltip } from './spell-check-tooltip'
import { useEditorStore } from '@/lib/stores/editor-store'

interface SuggestionHighlightsProps {
  text: string
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}

interface TextSegment {
  text: string
  type: 'normal' | 'spell-error' | 'grammar' | 'tone' | 'linkedin' | 'hook' | 'structure' | 'engagement' | 'algorithm' | 'visual'
  startIndex: number
  endIndex: number
}

export function SuggestionHighlights({ text, textareaRef }: SuggestionHighlightsProps) {
  const highlightContainerRef = useRef<HTMLDivElement>(null)
  const { suggestions } = useSuggestionsStore()
  const { errors: spellErrors, addToPersonalDictionary } = useSpellCheckStore()
  const { setContent } = useEditorStore()
  const lastTextRef = useRef<string>(text)
  const [tooltipInfo, setTooltipInfo] = useState<{
    word: string
    suggestions: string[]
    position: { x: number; y: number }
    startIndex: number
    endIndex: number
  } | null>(null)

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
          ? '2px dotted red'
          : highlight.type === 'grammar'
          ? '2px dotted #ef4444'
          : '2px dotted #3b82f6',
        cursor: highlight.type === 'spell-error' ? 'pointer' : 'default',
        position: 'relative' as const,
        backgroundColor: highlight.type === 'spell-error' 
          ? 'rgba(255, 0, 0, 0.1)'
          : 'transparent'
      }
      
      const handleSpellErrorClick = (e: React.MouseEvent) => {
        if (highlight.type === 'spell-error') {
          e.stopPropagation()
          const error = spellErrors.find(err => 
            err.startIndex === highlight.startIndex && 
            err.endIndex === highlight.endIndex
          )
          if (error) {
            const rect = (e.target as HTMLElement).getBoundingClientRect()
            setTooltipInfo({
              word: error.word,
              suggestions: error.suggestions || [],
              position: { x: rect.left, y: rect.bottom },
              startIndex: error.startIndex,
              endIndex: error.endIndex
            })
          }
        }
      }
      
      segments.push(
        <span 
          key={`highlight-${index}`} 
          style={highlightStyle}
          onClick={handleSpellErrorClick}
          className={highlight.type === 'spell-error' ? 'pointer-events-auto cursor-pointer' : ''}
        >
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

  const handleReplace = (replacement: string) => {
    if (!tooltipInfo) return
    
    const newText = 
      text.slice(0, tooltipInfo.startIndex) + 
      replacement + 
      text.slice(tooltipInfo.endIndex)
    
    setContent(newText)
    setTooltipInfo(null)
    
    // Force spell check to re-run after replacement
    setTimeout(() => {
      const { checkText } = useSpellCheckStore.getState()
      checkText(newText, true) // Force check even if same text
    }, 100)
  }

  return (
    <>
      <div
        ref={highlightContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none z-20"
        style={{
          fontFamily: 'inherit', // Use same font as textarea
          fontSize: '16px',
          lineHeight: '1.75',
          padding: '32px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          userSelect: 'none' // Prevent text selection in the highlights layer
        }}
      >
        <div>
          {renderHighlightedText()}
        </div>
      </div>
      
      {tooltipInfo && (
        <SpellCheckTooltip
          word={tooltipInfo.word}
          position={tooltipInfo.position}
          suggestions={tooltipInfo.suggestions}
          onReplace={handleReplace}
          onDismiss={() => setTooltipInfo(null)}
          onAddToDictionary={(word) => {
            addToPersonalDictionary(word)
            setTooltipInfo(null)
          }}
        />
      )}
    </>
  )
}
