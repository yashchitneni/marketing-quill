import { create } from 'zustand'
import { checkSpelling, SpellError } from '@/lib/utils/spell-checker'

interface SpellCheckState {
  errors: SpellError[]
  isChecking: boolean
  isEnabled: boolean
  lastCheckedText: string
  personalDictionary: string[]
  
  // Actions
  checkText: (text: string, forceCheck?: boolean) => Promise<void>
  clearErrors: () => void
  setEnabled: (enabled: boolean) => void
  addToPersonalDictionary: (word: string) => void
  removeFromPersonalDictionary: (word: string) => void
}

export const useSpellCheckStore = create<SpellCheckState>((set, get) => ({
  errors: [],
  isChecking: false,
  isEnabled: true, // Enabled by default
  lastCheckedText: '',
  personalDictionary: [],
  
  checkText: async (text: string, forceCheck = false) => {
    // Skip if disabled or same text (unless forced)
    if (!get().isEnabled || (!forceCheck && text === get().lastCheckedText)) {
      return
    }
    
    // Skip very short text
    if (text.length < 3) {
      set({ errors: [], lastCheckedText: text })
      return
    }
    
    set({ isChecking: true, lastCheckedText: text })
    
    try {
      const errors = await checkSpelling(text, get().personalDictionary)
      set({ errors, isChecking: false })
    } catch (error) {
      console.error('Spell check failed:', error)
      set({ errors: [], isChecking: false })
    }
  },
  
  clearErrors: () => {
    set({ errors: [], lastCheckedText: '' })
  },
  
  setEnabled: (enabled: boolean) => {
    set({ isEnabled: enabled })
    if (!enabled) {
      // Clear errors when disabled
      set({ errors: [] })
    }
  },
  
  addToPersonalDictionary: (word: string) => {
    const { personalDictionary, lastCheckedText } = get()
    if (!personalDictionary.includes(word)) {
      set({ personalDictionary: [...personalDictionary, word] })
      // Re-check the text to remove this word from errors
      get().checkText(lastCheckedText, true)
    }
  },
  
  removeFromPersonalDictionary: (word: string) => {
    const { personalDictionary, lastCheckedText } = get()
    set({ personalDictionary: personalDictionary.filter(w => w !== word) })
    // Re-check the text to potentially add this word back to errors
    get().checkText(lastCheckedText, true)
  }
}))