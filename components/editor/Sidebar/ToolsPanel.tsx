'use client'

import { TemplatesPanel } from './TemplatesPanel'
import { VersionHistory } from './VersionHistory'

export function ToolsPanel() {
  return (
    <div className="space-y-4">
      <TemplatesPanel />
      
      <div className="border-t pt-4">
        <VersionHistory />
      </div>
    </div>
  )
}