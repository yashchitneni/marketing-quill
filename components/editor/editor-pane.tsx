'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { SuggestionHighlights } from './suggestion-highlights'
import { cn } from '@/lib/utils'

export function EditorPane() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const editorStore = useEditorStore()
  const { analyzeText, cancelAnalysis } = useSuggestionsStore()
  const [localContent, setLocalContent] = useState(editorStore.content)
  const analyzeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Ref to hold the latest localContent for use in subscription callback
  const localContentRef = useRef(localContent)
  useEffect(() => {
    localContentRef.current = localContent
  }, [localContent])

  // Only sync from store on initial mount and when externally changed (undo/redo)
  useEffect(() => {
    const unsubscribe = useEditorStore.subscribe((state, prevState) => {
      // Only update if content changed in store, and it's different from our current local reality,
      // and we are not currently in the middle of a debounced save.
      if (
        state.content !== prevState.content &&
        !saveTimeoutRef.current &&
        state.content !== localContentRef.current
      ) {
        setLocalContent(state.content)
      }
    })
    return unsubscribe
  }, [])
  
  // Analyze content on mount if it exists
  useEffect(() => {
    if (editorStore.content && editorStore.content.length >= 10) {
      // Analyze after a short delay to let the UI settle
      setTimeout(() => {
        analyzeText(editorStore.content)
      }, 500)
    }
  }, []) // Only run on mount

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    
    // Update local state immediately for responsive typing
    setLocalContent(newContent)
    
    // Clear previous timeouts
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    if (analyzeTimeoutRef.current) {
      clearTimeout(analyzeTimeoutRef.current)
    }
    
    // Cancel any in-flight analysis requests
    cancelAnalysis()
    
    // Debounce saving to store
    saveTimeoutRef.current = setTimeout(() => {
      editorStore.setContent(newContent)
      saveTimeoutRef.current = null
    }, 500) // Increased debounce for less frequent updates
    
    // Debounce text analysis - reduced to 400ms for faster feedback
    analyzeTimeoutRef.current = setTimeout(() => {
      if (newContent.length >= 10) {
        analyzeText(newContent)
      }
    }, 400) // Analyze after 0.4 seconds of no typing
  }, [editorStore, analyzeText, cancelAnalysis])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Undo/Redo shortcuts
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'z') {
      e.preventDefault()
      editorStore.undo()
    } else if (
      ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') ||
      ((e.metaKey || e.ctrlKey) && e.key === 'y')
    ) {
      e.preventDefault()
      editorStore.redo()
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
      
      // Update cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2
          textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
      
      // Save the tab insertion
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      saveTimeoutRef.current = setTimeout(() => {
        editorStore.setContent(newContent)
        saveTimeoutRef.current = null
      }, 500)
    }
  }, [localContent, editorStore])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (analyzeTimeoutRef.current) {
        clearTimeout(analyzeTimeoutRef.current)
      }
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  const { suggestions } = useSuggestionsStore()

  return (
    <div className="flex-1 relative bg-background">
      {/* Highlights layer */}
      {suggestions.length > 0 && (
        <SuggestionHighlights text={localContent} textareaRef={textareaRef} />
      )}
      
      {/* Main editor textarea */}
      <textarea
        ref={textareaRef}
        value={localContent}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Start typing your content..."
        className={cn(
          "w-full h-full p-8 bg-transparent resize-none",
          "font-mono text-base leading-relaxed",
          "focus:outline-none",
          "placeholder:text-muted-foreground/50",
          // Make sure textarea is above highlights
          "relative z-10"
        )}
        style={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: '16px',
          lineHeight: '1.75',
          minHeight: '100%',
        }}
      />
    </div>
  )
}
