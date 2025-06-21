'use client'

import { useState } from 'react'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function TestSuggestions() {
  const [text, setText] = useState('Myba we should try a different approach to fix this isue.')
  const { analyzeText, suggestions, isAnalyzing, error, overallScore, clearError } = useSuggestionsStore()

  const handleAnalyze = () => {
    clearError()
    console.log('Button clicked, analyzing:', text)
    analyzeText(text)
  }

  return (
    <div className="space-y-4 p-4 border rounded">
      <h3 className="font-semibold">Test Suggestions</h3>
      
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze..."
        rows={3}
      />
      
      <Button onClick={handleAnalyze} disabled={isAnalyzing}>
        {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
      </Button>
      
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      <div className="space-y-2">
        <p>Score: {overallScore}%</p>
        <p>Suggestions: {suggestions.length}</p>
        {suggestions.map((s) => (
          <div key={s.id} className="p-2 bg-gray-50 rounded text-sm">
            <p>"{s.text}" → "{s.suggestion}"</p>
            <p className="text-xs text-gray-600">{s.reason}</p>
          </div>
        ))}
      </div>
    </div>
  )
}