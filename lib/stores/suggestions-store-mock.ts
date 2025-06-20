// Mock suggestions store for testing without Edge Functions
import { create } from 'zustand'

interface Suggestion {
  id: string
  text: string
  suggestion: string
  reason: string
  startIndex: number
  endIndex: number
  type: 'grammar' | 'tone' | 'seo'
  confidence: number
}

interface SuggestionsState {
  suggestions: Suggestion[]
  isAnalyzing: boolean
  overallScore: number
  selectedSuggestion: Suggestion | null
  useFastModel: boolean
  
  analyzeText: (text: string) => Promise<void>
  applySuggestion: (suggestionId: string) => void
  rejectSuggestion: (suggestionId: string) => void
  selectSuggestion: (suggestion: Suggestion | null) => void
  cancelAnalysis: () => void
  setUseFastModel: (useFast: boolean) => void
}

export const useSuggestionsStore = create<SuggestionsState>((set) => ({
  suggestions: [],
  isAnalyzing: false,
  overallScore: 85,
  selectedSuggestion: null,
  useFastModel: true,
  
  analyzeText: async (text: string) => {
    // Mock implementation - returns sample suggestions after a delay
    set({ isAnalyzing: true })
    
    setTimeout(() => {
      const mockSuggestions: Suggestion[] = [
        {
          id: 'mock-1',
          text: 'This is',
          suggestion: 'This is a',
          reason: 'Missing article',
          startIndex: 0,
          endIndex: 7,
          type: 'grammar',
          confidence: 0.9
        }
      ]
      
      set({
        suggestions: text.length > 20 ? mockSuggestions : [],
        isAnalyzing: false,
        overallScore: 85
      })
    }, 500)
  },
  
  applySuggestion: (suggestionId: string) => {
    console.log('Applied suggestion:', suggestionId)
    set(state => ({
      suggestions: state.suggestions.filter(s => s.id !== suggestionId)
    }))
  },
  
  rejectSuggestion: (suggestionId: string) => {
    console.log('Rejected suggestion:', suggestionId)
    set(state => ({
      suggestions: state.suggestions.filter(s => s.id !== suggestionId)
    }))
  },
  
  selectSuggestion: (suggestion: Suggestion | null) => {
    set({ selectedSuggestion: suggestion })
  },
  
  cancelAnalysis: () => {
    set({ isAnalyzing: false })
  },
  
  setUseFastModel: (useFast: boolean) => {
    set({ useFastModel: useFast })
  }
}))