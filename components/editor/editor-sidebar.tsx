'use client'

import { useState, useEffect, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore } from '@/lib/stores/suggestions-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { SuggestionCards } from './suggestion-cards'
import { SpellCheckPanel } from './spell-check-panel'
import { 
  ChevronRight, 
  ChevronLeft,
  Wand2,
  MessageSquare,
  Search,
  Clock,
  Zap,
  Sparkles,
  SpellCheck
} from 'lucide-react'

export function EditorSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('spell')
  const [userHasInteracted, setUserHasInteracted] = useState(false)
  
  // Get counts for badges
  const { suggestions } = useSuggestionsStore()
  const { errors: spellErrors } = useSpellCheckStore()
  
  const counts = useMemo(() => {
    const grammarSuggestions = suggestions.filter(s => s.type === 'grammar')
    const toneSuggestions = suggestions.filter(s => s.type === 'tone')
    
    return {
      spell: spellErrors.length,
      grammar: grammarSuggestions.length,
      tone: toneSuggestions.length,
      total: spellErrors.length + suggestions.length
    }
  }, [suggestions, spellErrors])
  
  // Auto-switch to tab with new content (but only if user hasn't manually switched)
  useEffect(() => {
    if (!userHasInteracted) {
      if (counts.spell > 0) {
        setActiveTab('spell')
      } else if (counts.grammar > 0) {
        setActiveTab('grammar')
      } else if (counts.tone > 0) {
        setActiveTab('tone')
      }
    }
  }, [counts, userHasInteracted])
  
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setUserHasInteracted(true) // User has manually switched tabs
  }

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
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-5 rounded-none border-b h-12">
          <TabsTrigger value="spell" className="rounded-none relative" title="Spell Check">
            <SpellCheck className="h-4 w-4" />
            {counts.spell > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-red-500 hover:bg-red-500"
                variant="destructive"
              >
                {counts.spell}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="grammar" className="rounded-none relative" title="Grammar">
            <Wand2 className="h-4 w-4" />
            {counts.grammar > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-orange-500 hover:bg-orange-500"
              >
                {counts.grammar}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="tone" className="rounded-none relative" title="Tone">
            <MessageSquare className="h-4 w-4" />
            {counts.tone > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-blue-500 hover:bg-blue-500"
              >
                {counts.tone}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="seo" className="rounded-none relative" title="SEO">
            <Search className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-none relative" title="History">
            <Clock className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="spell" className="p-4 space-y-4">
            <SpellCheckPanel />
          </TabsContent>
          
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