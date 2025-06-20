'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export default function TestEdgeFunction() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testFunction = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const supabase = createClient()
      
      // Test with a simple request
      const response = await supabase.functions.invoke('analyze-text', {
        body: { 
          text: 'This is a test sentence to check if the edge function works properly.',
          mode: 'full',
          model: 'gpt-3.5-turbo',
          maxTokens: 100
        }
      })

      if (response.error) {
        throw response.error
      }

      setResult(response.data)
    } catch (err: any) {
      console.error('Edge function error:', err)
      setError(err.message || 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edge Function Test</h1>
      
      <div className="space-y-4">
        <Button onClick={testFunction} disabled={loading}>
          {loading ? 'Testing...' : 'Test analyze-text Function'}
        </Button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h2 className="font-semibold text-red-700">Error:</h2>
            <pre className="text-sm text-red-600 mt-2">{error}</pre>
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h2 className="font-semibold text-green-700">Success!</h2>
            <pre className="text-sm text-green-600 mt-2">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <ul className="text-sm space-y-1">
            <li>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</li>
            <li>Has Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}