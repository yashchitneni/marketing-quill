'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { SuggestionHighlights } from '../suggestion-highlights'
import { TemplateModal } from '../template-modal'
import { EditorToolbar } from '../editor-toolbar'
import { EditorTextarea } from './EditorTextarea'
import { useEditorKeyboardShortcuts } from './useEditorKeyboardShortcuts'
import { useTextAnalysis } from './useTextAnalysis'
import { useTextInsertion } from './useTextInsertion'

export function EditorPane() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const editorStore = useEditorStore()
  const { analyzeText, cancelAnalysis, suggestions } = useSuggestionsStore()
  const { checkText: checkSpelling, errors: spellErrors } = useSpellCheckStore()
  const [localContent, setLocalContent] = useState(editorStore.content)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Ref to hold the latest localContent for use in subscription callback
  const localContentRef = useRef(localContent)
  useEffect(() => {
    localContentRef.current = localContent
  }, [localContent])

  // Subscribe to store changes for undo/redo support
  useEffect(() => {
    const unsubscribe = useEditorStore.subscribe((state, prevState) => {
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

  // Handle content changes with debounced save
  const handleContentChange = useCallback((newContent: string) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(() => {
      editorStore.setContent(newContent)
      saveTimeoutRef.current = null
    }, 500)
  }, [editorStore])

  // Use text analysis hook
  const { triggerAnalysis, triggerSpellCheck, cleanup } = useTextAnalysis({
    analyzeText,
    cancelAnalysis,
    checkSpelling,
    initialContent: editorStore.content
  })

  // Use text insertion hook
  const { handleInsert } = useTextInsertion({
    textareaRef,
    localContent,
    setLocalContent,
    onContentChange: handleContentChange
  })

  // Use keyboard shortcuts hook
  const { handleKeyDown } = useEditorKeyboardShortcuts({
    editorStore,
    onInsert: handleInsert,
    textareaRef,
    localContent,
    setLocalContent,
    saveTimeoutRef
  })

  // Handle textarea changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    
    // Update local state immediately
    setLocalContent(newContent)
    
    // Cancel any in-flight analysis
    cancelAnalysis()
    
    // Trigger analysis and spell check
    triggerSpellCheck(newContent)
    triggerAnalysis(newContent)
    
    // Save to store
    handleContentChange(newContent)
  }, [cancelAnalysis, triggerAnalysis, triggerSpellCheck, handleContentChange])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanup()
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [cleanup])

  return (
    <>
      <div className="flex-1 flex flex-col bg-background">
        <EditorToolbar textareaRef={textareaRef} onInsert={handleInsert} />
        
        <div className="flex-1 relative">
          {/* Highlights layer */}
          {(suggestions.length > 0 || spellErrors.length > 0) && (
            <SuggestionHighlights text={localContent} textareaRef={textareaRef} />
          )}
          
          {/* Main editor textarea */}
          <EditorTextarea
            ref={textareaRef}
            value={localContent}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      
      <TemplateModal />
    </>
  )
}