'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useEditorStore } from '@/lib/stores/editor-store'
import { 
  ChevronRight, 
  ChevronLeft,
  Target,
  Sparkles,
  SpellCheck,
  FileText,
  Eye,
} from 'lucide-react'
import { useSidebarState } from './useSidebarState'
import { PreviewPanel } from './PreviewPanel'
import { WritingQualityPanel } from './WritingQualityPanel'
import { LinkedInSuggestionsPanel } from './LinkedInSuggestionsPanel'
import { EngagementPanel } from './EngagementPanel'
import { ToolsPanel } from './ToolsPanel'

export function EditorSidebar() {
  const { collapsed, setCollapsed, activeTab, handleTabChange, counts } = useSidebarState()
  
  // Initialize editor store
  useEditorStore()

  if (collapsed) {
    return (
      <div className="w-12 border-l bg-gray-50">
        <Button
          variant="ghost"
          size="icon"
          className="w-full h-12 rounded-none relative"
          onClick={() => setCollapsed(false)}
        >
          <ChevronLeft className="h-4 w-4" />
          {counts.total > 0 && (
            <Badge 
              className="absolute top-1 right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-red-500 hover:bg-red-500"
              variant="destructive"
            >
              {counts.total}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="w-96 border-l bg-gray-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Suggestions</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(true)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="grid w-full grid-cols-5 rounded-none border-b h-12 flex-shrink-0">
          <TabsTrigger value="preview" className="rounded-none relative" title="Preview">
            <Eye className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="writing" className="rounded-none relative" title="Writing Quality">
            <SpellCheck className="h-4 w-4" />
            {(counts.spell + counts.grammar) > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-red-500 hover:bg-red-500"
                variant="destructive"
              >
                {counts.spell + counts.grammar}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="rounded-none relative" title="LinkedIn">
            <Target className="h-4 w-4" />
            {counts.linkedin > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-blue-500 hover:bg-blue-500"
              >
                {counts.linkedin}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="engage" className="rounded-none relative" title="Engagement">
            <Sparkles className="h-4 w-4" />
            {counts.tone > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-purple-500 hover:bg-purple-500"
              >
                {counts.tone}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="tools" className="rounded-none relative" title="Tools">
            <FileText className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="preview" className="h-full overflow-y-auto p-4 space-y-4">
            <PreviewPanel />
          </TabsContent>
          
          <TabsContent value="writing" className="h-full overflow-y-auto p-4 space-y-4">
            <WritingQualityPanel />
          </TabsContent>
          
          <TabsContent value="linkedin" className="h-full overflow-y-auto p-4 space-y-4">
            <LinkedInSuggestionsPanel />
          </TabsContent>
          
          <TabsContent value="engage" className="h-full overflow-y-auto p-4 space-y-4">
            <EngagementPanel />
          </TabsContent>
          
          <TabsContent value="tools" className="h-full overflow-y-auto p-4 space-y-4">
            <ToolsPanel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}