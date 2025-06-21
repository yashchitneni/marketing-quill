'use client'

import { TestSuggestions } from '@/components/test-suggestions'

export default function DebugEdgePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Debug Edge Function</h1>
      <TestSuggestions />
    </div>
  )
}