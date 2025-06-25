'use client'

import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { LinkedInOptimizationPanel } from '../linkedin-optimization-panel'
import { LinkedInSuggestionCard } from './LinkedInSuggestionCard'
import { SuggestionsSetupPrompt } from '../suggestions-setup-prompt'
import { useSetupStatus } from '@/lib/hooks/use-setup-status'

export function LinkedInSuggestionsPanel() {
  const { setupStatus } = useSetupStatus()
  const { suggestions } = useSuggestionsStore()
  const linkedinSuggestions = suggestions.filter(s => 
    s.type === 'linkedin' || s.type === 'hook' || s.type === 'structure'
  )
  
  // Group by urgency
  const highUrgency = linkedinSuggestions.filter(s => s.urgency === 'high')
  const mediumUrgency = linkedinSuggestions.filter(s => s.urgency === 'medium')
  const lowUrgency = linkedinSuggestions.filter(s => s.urgency === 'low')
  
  return (
    <div className="space-y-4">
      <LinkedInOptimizationPanel />
      
      {/* Show setup prompt if no suggestions and brand voice not complete */}
      {linkedinSuggestions.length === 0 && !setupStatus.brandVoiceCompleted && (
        <SuggestionsSetupPrompt />
      )}
      
      {highUrgency.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-red-600">High Priority ({highUrgency.length})</h4>
          <div className="space-y-2">
            {highUrgency.map(suggestion => (
              <LinkedInSuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </>
      )}
      
      {mediumUrgency.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-orange-600 mt-4">Medium Priority ({mediumUrgency.length})</h4>
          <div className="space-y-2">
            {mediumUrgency.map(suggestion => (
              <LinkedInSuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </>
      )}
      
      {lowUrgency.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-gray-600 mt-4">Suggestions ({lowUrgency.length})</h4>
          <div className="space-y-2">
            {lowUrgency.map(suggestion => (
              <LinkedInSuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}