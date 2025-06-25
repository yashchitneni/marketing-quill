'use client'

import { SuggestionCards } from '../suggestion-cards'
import { SuggestionsSetupPrompt } from '../suggestions-setup-prompt'
import { useSetupStatus } from '@/lib/hooks/use-setup-status'

export function EngagementPanel() {
  const { setupStatus } = useSetupStatus()
  
  return (
    <div className="space-y-4">
      {!setupStatus.brandVoiceCompleted && <SuggestionsSetupPrompt />}
      <ToneSuggestions />
      
      <div className="border-t pt-4">
        <h4 className="font-medium text-sm mb-3">Engagement Tips</h4>
        <div className="space-y-2 text-xs text-gray-600">
          <p>✓ End with an open question</p>
          <p>✓ Share a personal story</p>
          <p>✓ Use &quot;you&quot; to address readers</p>
          <p>✓ Include 1-3 relevant hashtags</p>
          <p>✓ Add a visual for longer posts</p>
        </div>
      </div>
    </div>
  )
}

function ToneSuggestions() {
  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
        <p className="font-medium mb-1">Tone & style improvements:</p>
        <ul className="space-y-0.5 ml-2">
          <li>• Word choice & clarity</li>
          <li>• Professional tone</li>
          <li>• Conciseness</li>
          <li>• LinkedIn best practices</li>
        </ul>
      </div>
      
      <SuggestionCards filterType="tone" />
    </div>
  )
}