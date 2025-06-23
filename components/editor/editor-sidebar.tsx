'use client'

import { useState, useEffect, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useSuggestionsStore, type Suggestion } from '@/lib/stores/suggestions-store'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { SuggestionCards } from './suggestion-cards'
import { SpellCheckPanel } from './spell-check-panel'
import { LinkedInOptimizationPanel } from './linkedin-optimization-panel'
import { useTemplatesStore } from '@/lib/stores/templates-store'
import { linkedInTemplates } from '@/lib/data/linkedin-templates'
import { FormattedPreview } from './formatted-preview'
import { 
  ChevronRight, 
  ChevronLeft,
  Target,
  Zap,
  Sparkles,
  SpellCheck,
  FileText,
  Eye,
  Check,
  X,
  AlertCircle
} from 'lucide-react'

export function EditorSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('preview')
  const [userHasInteracted, setUserHasInteracted] = useState(false)
  
  // Get counts for badges
  const { suggestions } = useSuggestionsStore()
  const { errors: spellErrors } = useSpellCheckStore()
  useEditorStore()
  
  const counts = useMemo(() => {
    const grammarSuggestions = suggestions.filter(s => s.type === 'grammar')
    const toneSuggestions = suggestions.filter(s => s.type === 'tone')
    const linkedinSuggestions = suggestions.filter(s => 
      s.type === 'linkedin' || s.type === 'hook' || s.type === 'structure'
    )
    
    return {
      spell: spellErrors.length,
      grammar: grammarSuggestions.length,
      tone: toneSuggestions.length,
      linkedin: linkedinSuggestions.length,
      total: spellErrors.length + suggestions.length
    }
  }, [suggestions, spellErrors])
  
  // Auto-switch to tab with new content (but only if user hasn't manually switched)
  useEffect(() => {
    if (!userHasInteracted) {
      if (counts.linkedin > 0) {
        setActiveTab('linkedin')
      } else if (counts.spell > 0 || counts.grammar > 0) {
        setActiveTab('writing')
      } else if (counts.tone > 0) {
        setActiveTab('engage')
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

function WritingQualityPanel() {
  const { errors: spellErrors } = useSpellCheckStore()
  const { suggestions } = useSuggestionsStore()
  const grammarSuggestions = suggestions.filter(s => s.type === 'grammar')
  
  return (
    <div className="space-y-4">
      {/* Spell Check Section */}
      {spellErrors.length > 0 && (
        <>
          <h4 className="font-medium text-sm">Spelling ({spellErrors.length})</h4>
          <SpellCheckPanel />
        </>
      )}
      
      {/* Grammar Section */}
      {grammarSuggestions.length > 0 && (
        <>
          <h4 className="font-medium text-sm mt-4">Grammar ({grammarSuggestions.length})</h4>
          <SuggestionCards filterType="grammar" />
        </>
      )}
      
      {spellErrors.length === 0 && grammarSuggestions.length === 0 && (
        <div className="text-center py-8">
          <Check className="h-12 w-12 mx-auto mb-3 text-green-500" />
          <p className="text-sm text-gray-600">Excellent writing quality!</p>
          <p className="text-xs text-gray-400 mt-1">No spelling or grammar issues found</p>
        </div>
      )}
    </div>
  )
}

function LinkedInSuggestionsPanel() {
  const { suggestions } = useSuggestionsStore()
  const linkedinSuggestions = suggestions.filter(s => 
    s.type === 'linkedin' || s.type === 'hook' || s.type === 'structure'
  )
  
  // Group by urgency
  const highUrgency = linkedinSuggestions.filter(s => s.urgency === 'high')
  const mediumUrgency = linkedinSuggestions.filter(s => s.urgency === 'medium')
  const lowUrgency = linkedinSuggestions.filter(s => s.urgency === 'low')
  
  return (
    <div className="space-y-4">
      <LinkedInOptimizationPanel />
      
      {highUrgency.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-red-600">High Priority ({highUrgency.length})</h4>
          <div className="space-y-2">
            {highUrgency.map(suggestion => (
              <LinkedInSuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </>
      )}
      
      {mediumUrgency.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-orange-600 mt-4">Medium Priority ({mediumUrgency.length})</h4>
          <div className="space-y-2">
            {mediumUrgency.map(suggestion => (
              <LinkedInSuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </>
      )}
      
      {lowUrgency.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-gray-600 mt-4">Suggestions ({lowUrgency.length})</h4>
          <div className="space-y-2">
            {lowUrgency.map(suggestion => (
              <LinkedInSuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function LinkedInSuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const { content, setContent, draftId } = useEditorStore()
  const { acceptSuggestion, rejectSuggestion, trackSuggestion } = useSuggestionsStore()
  
  const handleAccept = async () => {
    if (!draftId) return
    
    // Apply the suggestion
    const newContent = 
      content.slice(0, suggestion.startIndex) + 
      suggestion.suggestion + 
      content.slice(suggestion.endIndex)
    
    setContent(newContent, true)
    acceptSuggestion(suggestion.id)
    await trackSuggestion(suggestion, true, draftId)
  }
  
  const handleReject = async () => {
    if (!draftId) return
    rejectSuggestion(suggestion.id)
    await trackSuggestion(suggestion, false, draftId)
  }
  
  const getIcon = () => {
    switch (suggestion.type) {
      case 'hook': return <Zap className="h-4 w-4" />
      case 'structure': return <FileText className="h-4 w-4" />
      case 'algorithm': return <AlertCircle className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }
  
  const getCardColor = () => {
    if (suggestion.urgency === 'high') return 'border-red-200 bg-red-50'
    if (suggestion.urgency === 'medium') return 'border-orange-200 bg-orange-50'
    return 'border-gray-200'
  }
  
  return (
    <Card className={cn("transition-all", getCardColor())}>
      <CardHeader className="pb-2 pt-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            <CardTitle className="text-sm capitalize">{suggestion.type}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm font-medium">{suggestion.reason}</p>
        {suggestion.text !== suggestion.suggestion && (
          <div className="text-xs space-y-1">
            <p className="text-gray-600">Current: {suggestion.text}</p>
            <p className="text-green-700">Suggested: {suggestion.suggestion}</p>
          </div>
        )}
        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={handleAccept} className="flex-1">
            <Check className="h-3 w-3 mr-1" />
            Apply
          </Button>
          <Button size="sm" variant="outline" onClick={handleReject} className="flex-1">
            <X className="h-3 w-3 mr-1" />
            Dismiss
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function EngagementPanel() {
  return (
    <div className="space-y-4">
      <ToneSuggestions />
      
      <div className="border-t pt-4">
        <h4 className="font-medium text-sm mb-3">Engagement Tips</h4>
        <div className="space-y-2 text-xs text-gray-600">
          <p>✓ End with an open question</p>
          <p>✓ Share a personal story</p>
          <p>✓ Use &quot;you&quot; to address readers</p>
          <p>✓ Include 1-3 relevant hashtags</p>
          <p>✓ Add a visual for longer posts</p>
        </div>
      </div>
    </div>
  )
}

function ToolsPanel() {
  return (
    <div className="space-y-4">
      <TemplatesPanel />
      
      <div className="border-t pt-4">
        <VersionHistory />
      </div>
    </div>
  )
}


function ToneSuggestions() {
  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
        <p className="font-medium mb-1">Tone & style improvements:</p>
        <ul className="space-y-0.5 ml-2">
          <li>• Word choice & clarity</li>
          <li>• Professional tone</li>
          <li>• Conciseness</li>
          <li>• LinkedIn best practices</li>
        </ul>
      </div>
      
      <SuggestionCards filterType="tone" />
    </div>
  )
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

function TemplatesPanel() {
  const { 
    recentTemplateIds, 
    favoriteTemplateIds,
    setTemplateModalOpen
  } = useTemplatesStore()
  
  const recentTemplates = recentTemplateIds
    .map(id => linkedInTemplates.find(t => t.id === id))
    .filter(Boolean)
    .slice(0, 3)
  
  const favoriteTemplates = favoriteTemplateIds
    .map(id => linkedInTemplates.find(t => t.id === id))
    .filter(Boolean)
    .slice(0, 3)
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <Button 
          onClick={() => setTemplateModalOpen(true)}
          className="w-full"
        >
          <FileText className="h-4 w-4 mr-2" />
          Browse All Templates
        </Button>
      </div>
      
      {favoriteTemplates.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 text-sm">Favorite Templates</h4>
          <div className="space-y-2">
            {favoriteTemplates.map((template) => template && (
              <button
                key={template.id}
                onClick={() => setTemplateModalOpen(true)}
                className="w-full text-left p-2 rounded border hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-sm">{template.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {template.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {recentTemplates.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 text-sm">Recently Used</h4>
          <div className="space-y-2">
            {recentTemplates.map((template) => template && (
              <button
                key={template.id}
                onClick={() => setTemplateModalOpen(true)}
                className="w-full text-left p-2 rounded border hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-sm">{template.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {template.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {favoriteTemplates.length === 0 && recentTemplates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No templates used yet</p>
          <p className="text-xs mt-1">Browse templates to get started</p>
        </div>
      )}
    </div>
  )
}

function PreviewPanel() {
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