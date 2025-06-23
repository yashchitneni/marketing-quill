import { create } from 'zustand'
import { analyzeLinkedInContent, type LinkedInAnalysis } from '@/lib/utils/linkedin-analyzer'

interface LinkedInOptimizerStore {
  analysis: LinkedInAnalysis | null
  isAnalyzing: boolean
  lastAnalyzedContent: string
  
  analyzeContent: (content: string) => void
  clearAnalysis: () => void
}

export const useLinkedInOptimizerStore = create<LinkedInOptimizerStore>((set, get) => ({
  analysis: null,
  isAnalyzing: false,
  lastAnalyzedContent: '',
  
  analyzeContent: (content: string) => {
    // Don't re-analyze if content hasn't changed
    if (content === get().lastAnalyzedContent) return
    
    // Don't analyze very short content
    if (content.length < 10) {
      set({ analysis: null, lastAnalyzedContent: content })
      return
    }
    
    set({ isAnalyzing: true })
    
    // Simulate async analysis (in real app, this might be an API call)
    setTimeout(() => {
      const analysis = analyzeLinkedInContent(content)
      set({ 
        analysis, 
        isAnalyzing: false,
        lastAnalyzedContent: content 
      })
    }, 100)
  },
  
  clearAnalysis: () => {
    set({ 
      analysis: null, 
      isAnalyzing: false,
      lastAnalyzedContent: '' 
    })
  }
}))