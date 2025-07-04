'use client'

import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Lightbulb, AlertCircle, Loader2, WifiOff, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface SuggestionCardsProps {
  filterType?: 'grammar' | 'tone'
}

export function SuggestionCards({ filterType }: SuggestionCardsProps = {}) {
  const { content, setContent, draftId } = useEditorStore()
  const { 
    suggestions: allSuggestions, 
    selectedSuggestion, 
    isAnalyzing,
    overallScore,
    acceptSuggestion, 
    rejectSuggestion,
    trackSuggestion,
    error 
  } = useSuggestionsStore()
  
  const suggestions = filterType 
    ? allSuggestions.filter(s => s.type === filterType)
    : allSuggestions

  const handleAccept = async (suggestion: typeof suggestions[0]) => {
    if (!draftId) return

    // Get the current cursor position from the textarea
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    const cursorPos = textarea?.selectionStart || 0
    
    // Apply the suggestion to the content
    const newContent = 
      content.slice(0, suggestion.startIndex) + 
      suggestion.suggestion + 
      content.slice(suggestion.endIndex)
    
    // Calculate new cursor position
    let newCursorPos = cursorPos
    if (cursorPos >= suggestion.startIndex && cursorPos <= suggestion.endIndex) {
      // Cursor was within the replaced text, move to end of replacement
      newCursorPos = suggestion.startIndex + suggestion.suggestion.length
    } else if (cursorPos > suggestion.endIndex) {
      // Cursor was after the replaced text, adjust by the length difference
      const lengthDiff = suggestion.suggestion.length - (suggestion.endIndex - suggestion.startIndex)
      newCursorPos = cursorPos + lengthDiff
    }
    
    // Update the content in the store (this will trigger the editor to update)
    setContent(newContent, true) // Add to history so user can undo
    acceptSuggestion(suggestion.id)
    await trackSuggestion(suggestion, true, draftId)
    
    // Force update the textarea value directly and restore cursor position
    setTimeout(() => {
      if (textarea) {
        // Force the textarea to update its value
        textarea.value = newContent
        textarea.setSelectionRange(newCursorPos, newCursorPos)
        textarea.focus()
        
        // Trigger a change event to ensure the editor pane's local state updates
        const event = new Event('input', { bubbles: true })
        textarea.dispatchEvent(event)
      }
    }, 50) // Small delay to ensure React has updated
  }

  const handleReject = async (suggestion: typeof suggestions[0]) => {
    if (!draftId) return
    
    rejectSuggestion(suggestion.id)
    await trackSuggestion(suggestion, false, draftId)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  if (isAnalyzing) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        <span className="ml-2 text-sm text-gray-500">Analyzing text...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Error/Offline Notice */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
          <WifiOff className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-yellow-800">{error}</p>
            <p className="text-xs text-yellow-600 mt-1">
              Basic grammar checking is active. Some advanced suggestions may not be available.
            </p>
          </div>
        </div>
      )}
      
      {/* Overall Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <h4 className="font-medium">Content Score</h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Overall quality score based on grammar, tone, clarity, and marketing effectiveness.
                  <br /><br />
                  • 80%+ = Excellent
                  <br />
                  • 60-79% = Good
                  <br />
                  • Below 60% = Needs improvement
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Badge className={cn('px-3', getScoreBadge(overallScore))}>
          <span className={getScoreColor(overallScore)}>{overallScore}%</span>
        </Badge>
      </div>

      {/* Suggestions */}
      {suggestions.length === 0 ? (
        <div className="text-center py-8">
          <Lightbulb className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm text-gray-500">
            {allSuggestions.length === 0 
              ? "No suggestions yet. Start typing to get real-time feedback."
              : `No ${filterType} suggestions found. Try the other tabs for more feedback.`}
          </p>
          {allSuggestions.length === 0 && (
            <p className="text-xs text-gray-400 mt-2">
              Our AI analyzes for grammar, style, and clarity improvements.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <Card 
              key={suggestion.id}
              className={cn(
                "cursor-pointer transition-all",
                selectedSuggestion?.id === suggestion.id && "ring-2 ring-indigo-500"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {suggestion.type === 'grammar' ? (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <Lightbulb className="h-4 w-4 text-blue-500" />
                    )}
                    <CardTitle className="text-sm">
                      {suggestion.type === 'grammar' ? 'Grammar & Structure' : 'Tone & Style'}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(suggestion.confidence * 100)}% confident
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-gray-500 mt-0.5">Original:</span>
                    <p className="text-sm line-through text-gray-600">{suggestion.text}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-gray-500 mt-0.5">Suggested:</span>
                    <p className="text-sm font-medium text-green-700">{suggestion.suggestion}</p>
                  </div>
                </div>
                
                <CardDescription className="text-xs">
                  {suggestion.reason}
                </CardDescription>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleAccept(suggestion)}
                    className="flex-1"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(suggestion)}
                    className="flex-1"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}