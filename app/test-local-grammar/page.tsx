'use client'

import { useState } from 'react'
import { performLocalGrammarCheck, calculateLocalScore } from '@/lib/utils/local-grammar-check'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

export default function TestLocalGrammar() {
  const [text, setText] = useState("Myba we should try a different approach to fix this isue.")
  const [results, setResults] = useState<any>(null)

  const runTest = () => {
    const suggestions = performLocalGrammarCheck(text)
    const score = calculateLocalScore(text, suggestions)
    setResults({ suggestions, score })
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Local Grammar Checker Test</h1>
      
      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to test..."
          className="min-h-[100px]"
        />
        
        <Button onClick={runTest}>
          Test Grammar Check
        </Button>

        {results && (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Score: {results.score}%</h3>
              <p className="text-sm text-gray-600">
                Found {results.suggestions.length} suggestions
              </p>
            </Card>

            {results.suggestions.map((suggestion: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="font-medium text-sm">
                      {suggestion.type === 'grammar' ? 'Grammar' : 'Style'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {Math.round(suggestion.confidence * 100)}% confident
                    </span>
                  </div>
                  <div>
                    <span className="line-through text-red-600">{suggestion.text}</span>
                    {' → '}
                    <span className="text-green-600 font-medium">{suggestion.suggestion}</span>
                  </div>
                  <p className="text-sm text-gray-600">{suggestion.reason}</p>
                  <p className="text-xs text-gray-400">
                    Position: {suggestion.startIndex}-{suggestion.endIndex}
                  </p>
                </div>
              </Card>
            ))}

            <div className="mt-6 p-4 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">Test Cases:</h4>
              <ul className="text-sm space-y-1">
                <li>• "Myba" → "Maybe" (typo detection)</li>
                <li>• "a example" → "an example" (article correction)</li>
                <li>• "Your the best" → "You're the best" (your/you're)</li>
                <li>• "very quickly" → suggests removing intensifier</li>
                <li>• Double words like "the the"</li>
                <li>• Missing punctuation at end of sentence</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}