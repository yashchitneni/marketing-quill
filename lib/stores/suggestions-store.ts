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

interface CacheEntry {
  text: string
  suggestions: Suggestion[]
  overallScore: number
  timestamp: number
}

interface SuggestionsState {
  suggestions: Suggestion[]
  isAnalyzing: boolean
  overallScore: number
  selectedSuggestion: Suggestion | null
  lastAnalyzedText: string
  cache: Map<string, CacheEntry>
  abortController: AbortController | null
  useFastModel: boolean
  error: string | null
  
  // Actions
  analyzeText: (text: string) => Promise<void>
  selectSuggestion: (suggestion: Suggestion | null) => void
  acceptSuggestion: (suggestionId: string) => void
  rejectSuggestion: (suggestionId: string) => void
  clearSuggestions: () => void
  trackSuggestion: (suggestion: Suggestion, accepted: boolean, draftId: string) => Promise<void>
  cancelAnalysis: () => void
  setUseFastModel: (useFast: boolean) => void
  clearError: () => void
}

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes cache TTL
const MAX_CACHE_SIZE = 20 // Maximum number of cached entries

export const useSuggestionsStore = create<SuggestionsState>((set, get) => ({
  suggestions: [],
  isAnalyzing: false,
  overallScore: 100,
  selectedSuggestion: null,
  lastAnalyzedText: '',
  cache: new Map<string, CacheEntry>(),
  abortController: null,
  useFastModel: true, // Default to fast model
  
  analyzeText: async (text: string) => {
    // Don't re-analyze the same text
    if (text === get().lastAnalyzedText || text.length < 10) {
      return
    }
    
    // Check client-side cache first
    const cache = get().cache
    const cacheKey = `${text}_${get().useFastModel}`
    const cachedEntry = cache.get(cacheKey)
    
    if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL) {
      set({
        suggestions: cachedEntry.suggestions,
        overallScore: cachedEntry.overallScore,
        lastAnalyzedText: text
      })
      return
    }
    
    // Cancel any existing request
    const existingController = get().abortController
    if (existingController) {
      existingController.abort()
    }
    
    // Create new abort controller
    const abortController = new AbortController()
    set({ isAnalyzing: true, lastAnalyzedText: text, abortController })
    
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('Not authenticated')
      }
      
      const response = await supabase.functions.invoke('analyze-text', {
        body: { 
          text, 
          mode: 'streaming',
          model: get().useFastModel ? 'gpt-3.5-turbo' : 'gpt-4o',
          maxTokens: get().useFastModel ? 1000 : 2000
        },
        headers: {
          'X-Abort-Signal': 'true'
        }
      })
      
      if (response.error) {
        console.error('Edge function error:', response.error)
        // Provide helpful error message
        if (response.error.message?.includes('FunctionsFetchError')) {
          throw new Error('Unable to connect to suggestion service. Please check your internet connection.')
        } else if (response.error.message?.includes('OpenAI')) {
          throw new Error('AI service temporarily unavailable. Please try again in a moment.')
        }
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
      
      // Update cache
      const newCache = new Map(cache)
      newCache.set(cacheKey, {
        text,
        suggestions: formattedSuggestions,
        overallScore,
        timestamp: Date.now()
      })
      
      // Limit cache size
      if (newCache.size > MAX_CACHE_SIZE) {
        const oldestKey = Array.from(newCache.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0]
        newCache.delete(oldestKey)
      }
      
      set({
        suggestions: formattedSuggestions,
        overallScore,
        isAnalyzing: false,
        cache: newCache,
        abortController: null
      })
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Analysis request was cancelled')
      } else {
        console.error('Error analyzing text:', error)
      }
      set({ isAnalyzing: false, abortController: null })
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
  },
  
  cancelAnalysis: () => {
    const controller = get().abortController
    if (controller) {
      controller.abort()
      set({ abortController: null, isAnalyzing: false })
    }
  },
  
  setUseFastModel: (useFast: boolean) => {
    set({ useFastModel: useFast })
    // Clear cache when switching models to force re-analysis
    get().cache.clear()
  }
}))