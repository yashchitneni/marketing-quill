'use client'

import { useEditorStore } from '@/lib/stores/editor-store'
import { FormattedPreview } from '../formatted-preview'

export function PreviewPanel() {
  const { content } = useEditorStore()
  
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4">
        <h4 className="font-medium mb-3">LinkedIn Preview</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <FormattedPreview content={content} />
        </div>
      </div>
      
      <div className="text-xs text-gray-500 space-y-1">
        <p>• <strong>Bold</strong> text: **text** or Cmd+B</p>
        <p>• <em>Italic</em> text: *text* or Cmd+I</p>
        <p>• Bullet lists: Click bullet icon or start line with •</p>
        <p>• Numbered lists: Click number icon or start with 1.</p>
        <p>• Hashtags and mentions turn blue automatically</p>
      </div>
    </div>
  )
}