'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

export default function TestSuggestionsPage() {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  interface AnalysisResult {
    grammar: Array<{
      text: string
      suggestion: string
      reason: string
      startIndex: number
      endIndex: number
      confidence: number
    }>
    tone: Array<{
      text: string
      suggestion: string
      reason: string
      startIndex: number
      endIndex: number
      confidence: number
    }>
    overallScore: number
  }

  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const testAnalysis = async () => {
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('Not authenticated')
      }

      const response = await supabase.functions.invoke('analyze-text', {
        body: { text, mode: 'full' }
      })

      if (response.error) {
        throw response.error
      }

      setResult(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const sampleTexts = {
    grammar: "Their are many reason why you should choose our product. Its the best solution for you're business needs.",
    tone: "Our product is okay I guess. You might want to try it if you have nothing better to do. Whatever.",
    good: "Our innovative solution empowers businesses to streamline their operations and achieve unprecedented growth. Join thousands of satisfied customers who have transformed their workflows."
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Test Text Analysis</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sample Texts</CardTitle>
            <CardDescription>Click to load sample text for testing</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setText(sampleTexts.grammar)}
            >
              Grammar Issues
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setText(sampleTexts.tone)}
            >
              Tone Issues
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setText(sampleTexts.good)}
            >
              Good Text
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to analyze..."
              rows={5}
              className="font-mono"
            />
            <Button
              onClick={testAnalysis}
              disabled={!text || isAnalyzing}
              className="mt-4"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Text'
              )}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm">{error}</pre>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
              <CardDescription>
                Overall Score: {result.overallScore}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Grammar Suggestions ({result.grammar?.length || 0})</h3>
                  <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
                    {JSON.stringify(result.grammar, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tone Suggestions ({result.tone?.length || 0})</h3>
                  <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
                    {JSON.stringify(result.tone, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Full Response</h3>
                  <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}