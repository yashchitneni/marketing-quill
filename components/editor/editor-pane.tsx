'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { useLinkedInOptimizerStore } from '@/lib/stores/linkedin-optimizer-store'
import { SuggestionHighlights } from './suggestion-highlights'
import { TemplateModal } from './template-modal'
import { EditorToolbar } from './editor-toolbar'
import { cn } from '@/lib/utils'

export function EditorPane() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const editorStore = useEditorStore()
  const { analyzeText, cancelAnalysis } = useSuggestionsStore()
  const { checkText: checkSpelling } = useSpellCheckStore()
  const [localContent, setLocalContent] = useState(editorStore.content)
  const analyzeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const spellCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
  
  // Analyze and spell check content on mount if it exists
  useEffect(() => {
    if (editorStore.content && editorStore.content.length >= 10) {
      // Spell check immediately
      checkSpelling(editorStore.content)
      
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
    if (spellCheckTimeoutRef.current) {
      clearTimeout(spellCheckTimeoutRef.current)
    }
    
    // Cancel any in-flight analysis requests
    cancelAnalysis()
    
    // Run spell check with minimal delay (100ms)
    spellCheckTimeoutRef.current = setTimeout(() => {
      checkSpelling(newContent)
    }, 100)
    
    // Debounce saving to store
    saveTimeoutRef.current = setTimeout(() => {
      editorStore.setContent(newContent)
      saveTimeoutRef.current = null
    }, 500) // Increased debounce for less frequent updates
    
    // Debounce text analysis - 1.5 seconds to reduce API calls
    analyzeTimeoutRef.current = setTimeout(() => {
      if (newContent.length >= 10) {
        analyzeText(newContent)
      }
    }, 1500) // Analyze after 1.5 seconds of no typing
  }, [editorStore, analyzeText, cancelAnalysis])

  const handleInsert = useCallback((before: string, after: string, placeholder?: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const textToInsert = selectedText || placeholder || ''
    
    const newContent = 
      localContent.substring(0, start) + 
      before + textToInsert + after +
      localContent.substring(end)
    
    setLocalContent(newContent)
    
    // Update cursor position
    const newCursorPos = start + before.length + textToInsert.length
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.selectionStart = start + before.length
        textareaRef.current.selectionEnd = newCursorPos
      }
    }, 0)
    
    // Trigger save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(() => {
      editorStore.setContent(newContent)
      saveTimeoutRef.current = null
    }, 500)
  }, [localContent, editorStore])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Formatting shortcuts
    if (e.metaKey || e.ctrlKey) {
      switch(e.key.toLowerCase()) {
        case 'b':
          e.preventDefault()
          handleInsert('**', '**', 'bold text')
          break
        case 'i':
          e.preventDefault()
          handleInsert('*', '*', 'italic text')
          break
        case 's':
          e.preventDefault()
          // Manual save with Cmd/Ctrl + S (force save)
          editorStore.save(true)
          break
        case 'z':
          if (e.shiftKey) {
            e.preventDefault()
            editorStore.redo()
          } else {
            e.preventDefault()
            editorStore.undo()
          }
          break
        case 'y':
          e.preventDefault()
          editorStore.redo()
          break
      }
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
  }, [localContent, editorStore, handleInsert])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (analyzeTimeoutRef.current) {
        clearTimeout(analyzeTimeoutRef.current)
      }
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      if (spellCheckTimeoutRef.current) {
        clearTimeout(spellCheckTimeoutRef.current)
      }
    }
  }, [])

  const { suggestions } = useSuggestionsStore()
  const { errors: spellErrors } = useSpellCheckStore()

  return (
    <>
      <div className="flex-1 flex flex-col bg-background">
        {/* Editor Toolbar */}
        <EditorToolbar textareaRef={textareaRef} onInsert={handleInsert} />
        
        <div className="flex-1 relative">
          {/* Highlights layer */}
          {(suggestions.length > 0 || spellErrors.length > 0) && (
            <SuggestionHighlights text={localContent} textareaRef={textareaRef} />
          )}
          
          {/* Main editor textarea */}
          <textarea
            ref={textareaRef}
            value={localContent}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Start typing your LinkedIn post..."
            className={cn(
              "w-full h-full p-8 bg-transparent resize-none",
              "text-base leading-relaxed",
              "focus:outline-none",
              "placeholder:text-muted-foreground/50",
              // Make sure textarea is above highlights
              "relative z-10"
            )}
            style={{
              fontSize: '16px',
              lineHeight: '1.75',
              minHeight: '100%',
            }}
          />
        </div>
      </div>
      
      {/* Template Modal */}
      <TemplateModal />
    </>
  )
}
