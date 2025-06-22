'use client'

import { useEditorStore } from '@/lib/stores/editor-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SpellCheckPanel() {
  const { content, setContent } = useEditorStore()
  const { errors, isChecking, isEnabled, setEnabled, checkText } = useSpellCheckStore()

  const handleCorrect = async (error: typeof errors[0], suggestion: string) => {
    // Apply the correction to the content
    const newContent = 
      content.slice(0, error.startIndex) + 
      suggestion + 
      content.slice(error.endIndex)
    
    setContent(newContent, true) // Add to history so user can undo
    
    // Force update the textarea
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    if (textarea) {
      textarea.value = newContent
      const event = new Event('input', { bubbles: true })
      textarea.dispatchEvent(event)
    }
    
    // Re-run spell check after a brief delay to update the errors list
    setTimeout(() => {
      checkText(newContent, true) // Force check even if same text
    }, 100)
  }

  if (isChecking) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        <span className="ml-2 text-sm text-gray-500">Checking spelling...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with toggle */}
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Spell Check</h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setEnabled(!isEnabled)}
          className={cn(
            "text-xs",
            isEnabled ? "bg-green-50 border-green-200" : "bg-gray-50"
          )}
        >
          {isEnabled ? 'Enabled' : 'Disabled'}
        </Button>
      </div>

      {!isEnabled ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 text-center">
              Spell checking is disabled
            </p>
          </CardContent>
        </Card>
      ) : errors.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Check className="h-12 w-12 mx-auto mb-3 text-green-500" />
              <p className="text-sm text-gray-600">
                No spelling errors found
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Your content looks great!
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span>{errors.length} spelling {errors.length === 1 ? 'error' : 'errors'} found</span>
          </div>
          
          {errors.map((error, index) => (
            <Card key={`${error.word}-${error.startIndex}`} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <span className="text-red-600 font-mono">"{error.word}"</span>
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    Position {error.startIndex}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {error.suggestions.length > 0 ? (
                  <>
                    <CardDescription className="text-xs">
                      Did you mean:
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {error.suggestions.map((suggestion, suggIndex) => (
                        <Button
                          key={suggIndex}
                          size="sm"
                          variant="outline"
                          onClick={() => handleCorrect(error, suggestion)}
                          className="text-xs h-7"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <CardDescription className="text-xs">
                    Unknown word - please check spelling
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}