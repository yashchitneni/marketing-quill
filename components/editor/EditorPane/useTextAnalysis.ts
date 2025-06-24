import { useRef, useCallback, useEffect } from 'react'

type SuggestionsStore = {
  analyzeText: (text: string) => Promise<void>
  cancelAnalysis: () => void
}

type SpellCheckStore = {
  checkText: (text: string) => Promise<void>
}

interface UseTextAnalysisProps {
  analyzeText: SuggestionsStore['analyzeText']
  cancelAnalysis: SuggestionsStore['cancelAnalysis']
  checkSpelling: SpellCheckStore['checkText']
  initialContent?: string
}

export function useTextAnalysis({
  analyzeText,
  cancelAnalysis,
  checkSpelling,
  initialContent = ''
}: UseTextAnalysisProps) {
  const analyzeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const spellCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Analyze and spell check content on mount if it exists
  useEffect(() => {
    if (initialContent && initialContent.length >= 10) {
      // Spell check immediately
      checkSpelling(initialContent)
      
      // Analyze after a short delay to let the UI settle
      analyzeTimeoutRef.current = setTimeout(() => {
        analyzeText(initialContent)
      }, 300)
    }
    
    // Cleanup on unmount
    return () => {
      if (analyzeTimeoutRef.current) {
        clearTimeout(analyzeTimeoutRef.current)
      }
      if (spellCheckTimeoutRef.current) {
        clearTimeout(spellCheckTimeoutRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

  const triggerAnalysis = useCallback((content: string) => {
    // Cancel any pending analysis
    if (analyzeTimeoutRef.current) {
      clearTimeout(analyzeTimeoutRef.current)
      cancelAnalysis()
    }
    
    // Schedule new analysis after user stops typing
    if (content.length >= 10) {
      analyzeTimeoutRef.current = setTimeout(() => {
        analyzeText(content)
      }, 1500) // Wait 1.5 seconds after user stops typing
    }
  }, [analyzeText, cancelAnalysis])

  const triggerSpellCheck = useCallback((content: string) => {
    // Cancel any pending spell check
    if (spellCheckTimeoutRef.current) {
      clearTimeout(spellCheckTimeoutRef.current)
    }
    
    // Schedule new spell check
    if (content.length >= 3) {
      spellCheckTimeoutRef.current = setTimeout(() => {
        checkSpelling(content)
      }, 800) // Check spelling more frequently than analysis
    }
  }, [checkSpelling])

  const cleanup = useCallback(() => {
    if (analyzeTimeoutRef.current) {
      clearTimeout(analyzeTimeoutRef.current)
      cancelAnalysis()
    }
    if (spellCheckTimeoutRef.current) {
      clearTimeout(spellCheckTimeoutRef.current)
    }
  }, [cancelAnalysis])

  return {
    triggerAnalysis,
    triggerSpellCheck,
    cleanup
  }
}