import { useState, useEffect, useMemo } from 'react'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('preview')
  const [userHasInteracted, setUserHasInteracted] = useState(false)
  
  // Get counts for badges
  const { suggestions } = useSuggestionsStore()
  const { errors: spellErrors } = useSpellCheckStore()
  
  const counts = useMemo(() => {
    const grammarSuggestions = suggestions.filter(s => s.type === 'grammar')
    const toneSuggestions = suggestions.filter(s => s.type === 'tone')
    const linkedinSuggestions = suggestions.filter(s => 
      s.type === 'linkedin' || s.type === 'hook' || s.type === 'structure'
    )
    
    return {
      spell: spellErrors.length,
      grammar: grammarSuggestions.length,
      tone: toneSuggestions.length,
      linkedin: linkedinSuggestions.length,
      total: spellErrors.length + suggestions.length
    }
  }, [suggestions, spellErrors])
  
  // Auto-switch to tab with new content (but only if user hasn't manually switched)
  useEffect(() => {
    if (!userHasInteracted) {
      if (counts.linkedin > 0) {
        setActiveTab('linkedin')
      } else if (counts.spell > 0 || counts.grammar > 0) {
        setActiveTab('writing')
      } else if (counts.tone > 0) {
        setActiveTab('engage')
      }
    }
  }, [counts, userHasInteracted])
  
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setUserHasInteracted(true) // User has manually switched tabs
  }

  return {
    collapsed,
    setCollapsed,
    activeTab,
    handleTabChange,
    counts
  }
}