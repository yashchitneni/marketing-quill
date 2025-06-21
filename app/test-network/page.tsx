'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function TestNetwork() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    setResults({})
    
    // Test 1: Direct fetch
    try {
      console.log('Test 1: Direct fetch...')
      const response = await fetch('https://nsxpqvuouvuvehnskajo.supabase.co/functions/v1/analyze-text', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeHBxdnVvdXZ1dmVobnNrYWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyODAxNzAsImV4cCI6MjA2NTg1NjE3MH0.GUWKakdD77zYieOqBbnCGmTzPyoAwmwDVl3wgFbHkxw',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'This is a test.',
          mode: 'streaming',
          model: 'gpt-3.5-turbo',
          maxTokens: 100
        })
      })
      const data = await response.json()
      setResults(prev => ({ ...prev, directFetch: { success: true, data } }))
    } catch (error: any) {
      setResults(prev => ({ ...prev, directFetch: { success: false, error: error.message } }))
    }
    
    // Test 2: Supabase client
    try {
      console.log('Test 2: Supabase client...')
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      const response = await supabase.functions.invoke('analyze-text', {
        body: { 
          text: 'This is a test.',
          mode: 'streaming',
          model: 'gpt-3.5-turbo',
          maxTokens: 100
        }
      })
      
      setResults(prev => ({ 
        ...prev, 
        supabaseClient: { 
          success: !response.error, 
          data: response.data,
          error: response.error,
          hasSession: !!session
        } 
      }))
    } catch (error: any) {
      setResults(prev => ({ ...prev, supabaseClient: { success: false, error: error.message } }))
    }
    
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Network Test</h1>
      
      <Button onClick={runTests} disabled={loading}>
        {loading ? 'Running tests...' : 'Run Network Tests'}
      </Button>
      
      <div className="mt-8 space-y-4">
        {Object.entries(results).map(([test, result]: [string, any]) => (
          <div key={test} className="p-4 border rounded">
            <h3 className="font-semibold">{test}</h3>
            <pre className="mt-2 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}