'use client'

import { useEffect, useRef, useState } from 'react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { SuggestionHighlights } from './suggestion-highlights'
import { cn } from '@/lib/utils'

export function EditorPane() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { content, setContent } = useEditorStore()
  const { suggestions, analyzeText } = useSuggestionsStore() // Added suggestions here
  const [localContent, setLocalContent] = useState(content)
  const analyzeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const contentTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialRender = useRef(true)

  // Only sync from store to local state on initial load or explicit content changes from outside
  useEffect(() => {
    if (isInitialRender.current || content !== localContent) {
      setLocalContent(content)
      isInitialRender.current = false
    }
  }, [content, localContent])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    
    // Immediately update local state to show user input
    setLocalContent(newContent)
    
    // Clear previous timeouts to prevent race conditions
    if (contentTimeoutRef.current) {
      clearTimeout(contentTimeoutRef.current)
    }
    
    if (analyzeTimeoutRef.current) {
      clearTimeout(analyzeTimeoutRef.current)
    }
    
    // Debounce store updates to avoid excessive history entries
    contentTimeoutRef.current = setTimeout(() => {
      setContent(newContent)
    }, 300)
    
    // Debounce text analysis
    analyzeTimeoutRef.current = setTimeout(() => {
      if (newContent.length >= 10) {
        analyzeText(newContent)
      }
    }, 1000) // Analyze after 1 second of no typing
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { undo, redo } = useEditorStore.getState()
    
    // Undo/Redo shortcuts
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'z') {
      e.preventDefault()
      undo()
    } else if (
      ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') ||
      ((e.metaKey || e.ctrlKey) && e.key === 'y')
    ) {
      e.preventDefault()
      redo()
    }
    
    // Tab handling
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = textareaRef.current?.selectionStart || 0
      const end = textareaRef.current?.selectionEnd || 0
      const newContent = 
        localContent.substring(0, start) + 
        '  ' + // 2 spaces for tab
        localContent.substring(end)
      
      setLocalContent(newContent)
      
      // Update store after local update
      if (contentTimeoutRef.current) {
        clearTimeout(contentTimeoutRef.current)
      }
      contentTimeoutRef.current = setTimeout(() => {
        setContent(newContent)
      }, 100)
      
      // Restore cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2
          textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current)
      if (analyzeTimeoutRef.current) clearTimeout(analyzeTimeoutRef.current)
    }
  }, [])

  return (
    <div className="flex-1 bg-white">
      <div className="h-full p-8 relative">
        {suggestions.length > 0 && (
          <SuggestionHighlights text={localContent} textareaRef={textareaRef as React.RefObject<HTMLTextAreaElement>} />
        )}
        <textarea
          ref={textareaRef}
          value={localContent}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Start writing your marketing copy..."
          className={cn(
            "w-full h-full resize-none outline-none",
            "font-mono text-base leading-relaxed",
            "placeholder:text-gray-400",
            "relative z-10 bg-white" // Changed bg-transparent to bg-white
          )}
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace"
          }}
        />
      </div>
    </div>
  )
}
