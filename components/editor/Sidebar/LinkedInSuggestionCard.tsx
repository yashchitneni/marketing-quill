'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore, type Suggestion } from '@/lib/stores/suggestions-store'
import { Check, X, Zap, FileText, AlertCircle, Target } from 'lucide-react'

interface LinkedInSuggestionCardProps {
  suggestion: Suggestion
}

export function LinkedInSuggestionCard({ suggestion }: LinkedInSuggestionCardProps) {
  const { content, setContent, draftId } = useEditorStore()
  const { acceptSuggestion, rejectSuggestion, trackSuggestion } = useSuggestionsStore()
  
  const handleAccept = async () => {
    if (!draftId) return
    
    // Apply the suggestion
    const newContent = 
      content.slice(0, suggestion.startIndex) + 
      suggestion.suggestion + 
      content.slice(suggestion.endIndex)
    
    setContent(newContent, true)
    acceptSuggestion(suggestion.id)
    await trackSuggestion(suggestion, true, draftId)
  }
  
  const handleReject = async () => {
    if (!draftId) return
    rejectSuggestion(suggestion.id)
    await trackSuggestion(suggestion, false, draftId)
  }
  
  const getIcon = () => {
    switch (suggestion.type) {
      case 'hook': return <Zap className="h-4 w-4" />
      case 'structure': return <FileText className="h-4 w-4" />
      case 'algorithm': return <AlertCircle className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }
  
  const getCardColor = () => {
    if (suggestion.urgency === 'high') return 'border-red-200 bg-red-50'
    if (suggestion.urgency === 'medium') return 'border-orange-200 bg-orange-50'
    return 'border-gray-200'
  }
  
  return (
    <Card className={cn("transition-all", getCardColor())}>
      <CardHeader className="pb-2 pt-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            <CardTitle className="text-sm capitalize">{suggestion.type}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm font-medium">{suggestion.reason}</p>
        {suggestion.text !== suggestion.suggestion && (
          <div className="text-xs space-y-1">
            <p className="text-gray-600">Current: {suggestion.text}</p>
            <p className="text-green-700">Suggested: {suggestion.suggestion}</p>
          </div>
        )}
        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={handleAccept} className="flex-1">
            <Check className="h-3 w-3 mr-1" />
            Apply
          </Button>
          <Button size="sm" variant="outline" onClick={handleReject} className="flex-1">
            <X className="h-3 w-3 mr-1" />
            Dismiss
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}