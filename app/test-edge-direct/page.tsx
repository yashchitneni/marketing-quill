'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TestEdgeDirect() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testDirectFetch = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('https://nsxpqvuouvuvehnskajo.supabase.co/functions/v1/analyze-text', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeHBxdnVvdXZ1dmVobnNrYWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyODAxNzAsImV4cCI6MjA2NTg1NjE3MH0.GUWKakdD77zYieOqBbnCGmTzPyoAwmwDVl3wgFbHkxw',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'Myba we should try a different approach to fix this isue.',
          mode: 'streaming',
          model: 'gpt-3.5-turbo',
          maxTokens: 1000
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error('Direct fetch error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Direct Edge Function Test</h1>
      
      <div className="space-y-4">
        <Button onClick={testDirectFetch} disabled={loading}>
          {loading ? 'Testing...' : 'Test Direct Fetch'}
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
            <div className="mt-4">
              <h3 className="font-semibold">Found {result.grammar?.length || 0} grammar suggestions:</h3>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {result.grammar?.map((s: any, i: number) => (
                <div key={i} className="mt-2 p-2 bg-white rounded">
                  <p>&quot;{s.text}&quot; → &quot;{s.suggestion}&quot;</p>
                  <p className="text-xs text-gray-600">{s.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}