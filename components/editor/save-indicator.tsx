'use client'

import { useEffect, useState } from 'react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { Check, Loader2, AlertCircle, Cloud } from 'lucide-react'

export function SaveIndicator() {
  const { saveStatus, lastSaved, isDirty } = useEditorStore()
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    // Show indicator when there's a status or when dirty
    setShowIndicator(!!saveStatus || isDirty)
  }, [saveStatus, isDirty])

  if (!showIndicator && !saveStatus) return null

  return (
    <div className="flex items-center gap-2 text-sm">
      {saveStatus === 'saving' && (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Saving...</span>
        </>
      )}
      
      {saveStatus === 'saved' && (
        <>
          <Check className="h-4 w-4 text-green-600" />
          <span className="text-green-600">Saved</span>
        </>
      )}
      
      {saveStatus === 'error' && (
        <>
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-red-600">Save failed</span>
        </>
      )}
      
      {!saveStatus && isDirty && (
        <>
          <Cloud className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Unsaved changes</span>
        </>
      )}
      
      {lastSaved && saveStatus === 'saved' && (
        <span className="text-xs text-muted-foreground">
          ({new Date(lastSaved).toLocaleTimeString()})
        </span>
      )}
    </div>
  )
}