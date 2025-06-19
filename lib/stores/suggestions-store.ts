import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'

export interface Suggestion {
  id: string
  text: string
  suggestion: string
  reason: string
  startIndex: number
  endIndex: number
  confidence: number
  type: 'grammar' | 'tone'
}

interface SuggestionsState {
  suggestions: Suggestion[]
  isAnalyzing: boolean
  overallScore: number
  selectedSuggestion: Suggestion | null
  lastAnalyzedText: string
  
  // Actions
  analyzeText: (text: string) => Promise<void>
  selectSuggestion: (suggestion: Suggestion | null) => void
  acceptSuggestion: (suggestionId: string) => void
  rejectSuggestion: (suggestionId: string) => void
  clearSuggestions: () => void
  trackSuggestion: (suggestion: Suggestion, accepted: boolean, draftId: string) => Promise<void>
}

export const useSuggestionsStore = create<SuggestionsState>((set, get) => ({
  suggestions: [],
  isAnalyzing: false,
  overallScore: 100,
  selectedSuggestion: null,
  lastAnalyzedText: '',
  
  analyzeText: async (text: string) => {
    // Don't re-analyze the same text
    if (text === get().lastAnalyzedText || text.length < 10) {
      return
    }
    
    set({ isAnalyzing: true, lastAnalyzedText: text })
    
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('Not authenticated')
      }
      
      const response = await supabase.functions.invoke('analyze-text', {
        body: { text, mode: 'full' }
      })
      
      if (response.error) {
        throw response.error
      }
      
      const { grammar, tone, overallScore } = response.data
      
      // Combine and format suggestions
      const formattedSuggestions: Suggestion[] = [
        ...grammar.map((s: Omit<Suggestion, 'id' | 'type'>, index: number) => ({
          id: `grammar-${index}`,
          ...s,
          type: 'grammar' as const
        })),
        ...tone.map((s: Omit<Suggestion, 'id' | 'type'>, index: number) => ({
          id: `tone-${index}`,
          ...s,
          type: 'tone' as const
        }))
      ].sort((a, b) => a.startIndex - b.startIndex)
      
      set({
        suggestions: formattedSuggestions,
        overallScore,
        isAnalyzing: false
      })
    } catch (error) {
      console.error('Error analyzing text:', error)
      set({ isAnalyzing: false })
    }
  },
  
  selectSuggestion: (suggestion) => {
    set({ selectedSuggestion: suggestion })
  },
  
  acceptSuggestion: (suggestionId) => {
    set(state => ({
      suggestions: state.suggestions.filter(s => s.id !== suggestionId),
      selectedSuggestion: state.selectedSuggestion?.id === suggestionId 
        ? null 
        : state.selectedSuggestion
    }))
  },
  
  rejectSuggestion: (suggestionId) => {
    set(state => ({
      suggestions: state.suggestions.filter(s => s.id !== suggestionId),
      selectedSuggestion: state.selectedSuggestion?.id === suggestionId 
        ? null 
        : state.selectedSuggestion
    }))
  },
  
  clearSuggestions: () => {
    set({
      suggestions: [],
      overallScore: 100,
      selectedSuggestion: null,
      lastAnalyzedText: ''
    })
  },
  
  trackSuggestion: async (suggestion, accepted, draftId) => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return
      
      await supabase
        .from('suggestion_analytics')
        .insert({
          user_id: user.id,
          draft_id: draftId,
          suggestion_type: suggestion.type,
          suggestion_text: suggestion.suggestion,
          original_text: suggestion.text,
          accepted
        })
    } catch (error) {
      console.error('Error tracking suggestion:', error)
    }
  }
}))