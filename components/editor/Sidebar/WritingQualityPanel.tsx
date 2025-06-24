'use client'

import { Check } from 'lucide-react'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { SpellCheckPanel } from '../spell-check-panel'
import { SuggestionCards } from '../suggestion-cards'

export function WritingQualityPanel() {
  const { errors: spellErrors } = useSpellCheckStore()
  const { suggestions } = useSuggestionsStore()
  const grammarSuggestions = suggestions.filter(s => s.type === 'grammar')
  
  return (
    <div className="space-y-4">
      {/* Spell Check Section */}
      {spellErrors.length > 0 && (
        <>
          <h4 className="font-medium text-sm">Spelling ({spellErrors.length})</h4>
          <SpellCheckPanel />
        </>
      )}
      
      {/* Grammar Section */}
      {grammarSuggestions.length > 0 && (
        <>
          <h4 className="font-medium text-sm mt-4">Grammar ({grammarSuggestions.length})</h4>
          <SuggestionCards filterType="grammar" />
        </>
      )}
      
      {spellErrors.length === 0 && grammarSuggestions.length === 0 && (
        <div className="text-center py-8">
          <Check className="h-12 w-12 mx-auto mb-3 text-green-500" />
          <p className="text-sm text-gray-600">Excellent writing quality!</p>
          <p className="text-xs text-gray-400 mt-1">No spelling or grammar issues found</p>
        </div>
      )}
    </div>
  )
}