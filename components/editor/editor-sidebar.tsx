'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { SuggestionCards } from './suggestion-cards'
import { 
  ChevronRight, 
  ChevronLeft,
  Wand2,
  MessageSquare,
  Search,
  Clock,
  Zap,
  Sparkles
} from 'lucide-react'

export function EditorSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('grammar')

  if (collapsed) {
    return (
      <div className="w-12 border-l bg-gray-50">
        <Button
          variant="ghost"
          size="icon"
          className="w-full h-12 rounded-none"
          onClick={() => setCollapsed(false)}
        >
          <ChevronLeft className="h-4 w-4" />
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 rounded-none border-b h-12">
          <TabsTrigger value="grammar" className="rounded-none">
            <Wand2 className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="tone" className="rounded-none">
            <MessageSquare className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="seo" className="rounded-none">
            <Search className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-none">
            <Clock className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="grammar" className="p-4 space-y-4">
            <GrammarSuggestions />
          </TabsContent>
          
          <TabsContent value="tone" className="p-4 space-y-4">
            <ToneSuggestions />
          </TabsContent>
          
          <TabsContent value="seo" className="p-4 space-y-4">
            <div className="text-center py-8 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">SEO analysis will appear here</p>
              <p className="text-xs mt-1">Coming in Task 7...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="p-4 space-y-4">
            <VersionHistory />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function GrammarSuggestions() {
  const { useFastModel, setUseFastModel, isAnalyzing } = useSuggestionsStore()
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
        <div className="flex items-center gap-2">
          <Label htmlFor="speed-mode" className="text-sm font-medium cursor-pointer">
            {useFastModel ? (
              <>
                <Zap className="h-4 w-4 inline mr-1 text-yellow-600" />
                Fast Mode
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 inline mr-1 text-blue-600" />
                Accurate Mode
              </>
            )}
          </Label>
        </div>
        <Switch
          id="speed-mode"
          checked={useFastModel}
          onCheckedChange={setUseFastModel}
          disabled={isAnalyzing}
        />
      </div>
      
      <div className="text-xs text-gray-500 -mt-2 px-1">
        {useFastModel 
          ? "Faster responses with basic suggestions" 
          : "More thorough analysis with advanced suggestions"}
      </div>
      
      <SuggestionCards filterType="grammar" />
    </div>
  )
}

function ToneSuggestions() {
  return <SuggestionCards filterType="tone" />
}

function VersionHistory() {
  const { 
    history, 
    historyIndex, 
    undo, 
    redo, 
    snapshots, 
    loadSnapshots, 
    restoreSnapshot,
    createSnapshot 
  } = useEditorStore()
  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  useEffect(() => {
    loadSnapshots()
  }, [loadSnapshots])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={undo} 
          disabled={!canUndo}
          size="sm"
          className="flex-1"
        >
          Undo
        </Button>
        <Button 
          onClick={redo} 
          disabled={!canRedo}
          size="sm"
          className="flex-1"
        >
          Redo
        </Button>
      </div>
      
      <div className="text-sm text-gray-600">
        <p>History: {historyIndex + 1} / {history.length}</p>
        <p className="text-xs mt-1">Up to 50 actions stored</p>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Daily Snapshots</h4>
          <Button 
            size="sm" 
            variant="outline"
            onClick={createSnapshot}
          >
            Create Snapshot
          </Button>
        </div>
        
        {snapshots.length === 0 ? (
          <p className="text-sm text-gray-500">
            No snapshots yet. Snapshots are created automatically daily.
          </p>
        ) : (
          <div className="space-y-2">
            {snapshots.map((snapshot) => (
              <div 
                key={snapshot.id}
                className="flex items-center justify-between p-2 rounded border hover:bg-gray-50"
              >
                <div className="text-sm">
                  <p className="font-medium">{snapshot.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(snapshot.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => restoreSnapshot(snapshot.id)}
                >
                  Restore
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <p className="text-xs text-gray-400 mt-2">
          Snapshots are kept for 7 days
        </p>
      </div>
    </div>
  )
}