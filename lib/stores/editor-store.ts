import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'

interface Snapshot {
  id: string
  title: string
  content: string
  channel: string | null
  created_at: string
}

interface EditorState {
  draftId: string | null
  title: string
  content: string
  channel: string | null
  history: string[]
  historyIndex: number
  lastSaved: Date | null
  isDirty: boolean
  isAutoSaving: boolean
  isSaving: boolean
  saveStatus: 'saved' | 'saving' | 'error' | null
  snapshots: Snapshot[]
  
  // Actions
  setDraftId: (id: string) => void
  setTitle: (title: string) => void
  setContent: (content: string, addToHistory?: boolean) => void
  setChannel: (channel: string | null) => void
  undo: () => void
  redo: () => void
  save: (force?: boolean) => Promise<void>
  autoSave: () => Promise<void>
  debouncedSave: () => void
  clearSaveStatus: () => void
  loadDraft: (id: string) => Promise<void>
  reset: () => void
  createSnapshot: () => Promise<void>
  loadSnapshots: () => Promise<void>
  restoreSnapshot: (snapshotId: string) => Promise<void>
}

const MAX_HISTORY_SIZE = 50

// Store the debounce timer outside the store to persist it
let saveDebounceTimer: NodeJS.Timeout | null = null

export const useEditorStore = create<EditorState>((set, get) => ({
  draftId: null,
  title: 'Untitled Draft',
  content: '',
  channel: null,
  history: [''],
  historyIndex: 0,
  lastSaved: null,
  isDirty: false,
  isAutoSaving: false,
  isSaving: false,
  saveStatus: null,
  snapshots: [],
  
  setDraftId: (id) => set({ draftId: id }),
  
  setTitle: (title) => {
    set({ title, isDirty: true })
    get().debouncedSave()
  },
  
  setChannel: (channel) => {
    set({ channel, isDirty: true })
    get().debouncedSave()
  },
  
  setContent: (content, addToHistory = true) => {
    const state = get()
    
    if (addToHistory && content !== state.content) {
      // Add to history
      let newHistory = [...state.history.slice(0, state.historyIndex + 1)]
      newHistory.push(content)
      
      // Maintain max history size
      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory = newHistory.slice(-MAX_HISTORY_SIZE)
      }
      
      set({
        content,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        isDirty: true
      })
    } else {
      set({ content, isDirty: true })
    }
    
    // Save to localStorage for recovery
    if (state.draftId) {
      try {
        localStorage.setItem(`draft_backup_${state.draftId}`, JSON.stringify({
          content,
          title: state.title,
          channel: state.channel,
          timestamp: new Date().toISOString()
        }))
      } catch (e) {
        console.warn('Failed to save backup to localStorage:', e)
      }
    }
    
    // Trigger debounced save only if we have a draftId
    if (state.draftId) {
      get().debouncedSave()
    }
  },
  
  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      set({
        content: history[newIndex],
        historyIndex: newIndex,
        isDirty: true
      })
    }
  },
  
  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      set({
        content: history[newIndex],
        historyIndex: newIndex,
        isDirty: true
      })
    }
  },
  
  save: async (force = false) => {
    const { draftId, title, content, channel, isDirty } = get()
    if (!draftId) {
      console.warn('Cannot save: No draft ID set')
      return
    }
    
    // Skip if not dirty and not forced
    if (!isDirty && !force) {
      console.log('Skip save - no changes')
      return
    }
    
    console.log('Saving draft:', draftId, 'Force:', force)
    set({ isSaving: true, saveStatus: 'saving' })
    const supabase = createClient()
    
    try {
      const { error } = await supabase
        .from('drafts')
        .update({
          title,
          content,
          channel,
          updated_at: new Date().toISOString()
        })
        .eq('id', draftId)
      
      if (!error) {
        set({
          lastSaved: new Date(),
          isDirty: false,
          saveStatus: 'saved'
        })
        
        // Clear local backup after successful save
        try {
          localStorage.removeItem(`draft_backup_${draftId}`)
        } catch (e) {
          console.warn('Failed to clear backup:', e)
        }
        
        // Clear save status after 2 seconds
        setTimeout(() => {
          const currentStatus = get().saveStatus
          if (currentStatus === 'saved') {
            set({ saveStatus: null })
          }
        }, 2000)
      } else {
        set({ saveStatus: 'error', isSaving: false })
        console.error('Failed to save draft:', error)
        // Clear error status after 3 seconds
        setTimeout(() => {
          const currentStatus = get().saveStatus
          if (currentStatus === 'error') {
            set({ saveStatus: null })
          }
        }, 3000)
      }
    } catch (error) {
      set({ saveStatus: 'error', isSaving: false })
      console.error('Failed to save draft:', error)
      // Clear error status after 3 seconds
      setTimeout(() => {
        const currentStatus = get().saveStatus
        if (currentStatus === 'error') {
          set({ saveStatus: null })
        }
      }, 3000)
    } finally {
      set({ isSaving: false })
    }
  },
  
  autoSave: async () => {
    const { isDirty, isSaving, draftId } = get()
    if (isDirty && !isSaving && draftId) {
      console.log('Auto-saving...')
      set({ isAutoSaving: true })
      await get().save()
      set({ isAutoSaving: false })
    }
  },
  
  debouncedSave: () => {
    const { draftId } = get()
    if (!draftId) {
      console.log('Skipping debounced save - no draft ID')
      return
    }
    
    // Clear existing timer
    if (saveDebounceTimer) {
      clearTimeout(saveDebounceTimer)
    }
    
    // Set new timer for 2 seconds
    console.log('Setting auto-save timer...')
    saveDebounceTimer = setTimeout(() => {
      console.log('Auto-save timer triggered')
      get().autoSave()
    }, 2000)
  },
  
  clearSaveStatus: () => {
    set({ saveStatus: null, isSaving: false })
  },
  
  loadDraft: async (id: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('drafts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (!error && data) {
      // Check for local backup
      let recoveredContent = null
      try {
        const backup = localStorage.getItem(`draft_backup_${id}`)
        if (backup) {
          const parsed = JSON.parse(backup)
          const backupTime = new Date(parsed.timestamp).getTime()
          const savedTime = new Date(data.updated_at).getTime()
          
          // If backup is newer than saved version
          if (backupTime > savedTime) {
            recoveredContent = parsed
            console.log('Recovered unsaved content from backup')
          }
          
          // Clear old backup
          localStorage.removeItem(`draft_backup_${id}`)
        }
      } catch (e) {
        console.warn('Failed to check backup:', e)
      }
      
      set({
        draftId: data.id,
        title: recoveredContent?.title || data.title,
        content: recoveredContent?.content || data.content || '',
        channel: recoveredContent?.channel || data.channel,
        history: [recoveredContent?.content || data.content || ''],
        historyIndex: 0,
        lastSaved: new Date(data.updated_at),
        isDirty: !!recoveredContent
      })
      
      // Load snapshots for this draft
      get().loadSnapshots()
      
      // If we recovered content, trigger save
      if (recoveredContent) {
        get().debouncedSave()
      }
    }
  },
  
  reset: () => {
    // Clear any pending saves
    if (saveDebounceTimer) {
      clearTimeout(saveDebounceTimer)
      saveDebounceTimer = null
    }
    
    set({
      draftId: null,
      title: 'Untitled Draft',
      content: '',
      channel: null,
      history: [''],
      historyIndex: 0,
      lastSaved: null,
      isDirty: false,
      isAutoSaving: false,
      isSaving: false,
      saveStatus: null,
      snapshots: []
    })
  },
  
  createSnapshot: async () => {
    const { draftId } = get()
    if (!draftId) return
    
    const supabase = createClient()
    await supabase.rpc('create_daily_snapshot', { p_draft_id: draftId })
    await get().loadSnapshots()
  },
  
  loadSnapshots: async () => {
    const { draftId } = get()
    if (!draftId) return
    
    const supabase = createClient()
    const { data } = await supabase
      .from('draft_snapshots')
      .select('*')
      .eq('draft_id', draftId)
      .order('created_at', { ascending: false })
      .limit(7)
    
    if (data) {
      set({ snapshots: data })
    }
  },
  
  restoreSnapshot: async (snapshotId: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('draft_snapshots')
      .select('*')
      .eq('id', snapshotId)
      .single()
    
    if (!error && data) {
      set({
        title: data.title,
        content: data.content || '',
        channel: data.channel,
        history: [data.content || ''],
        historyIndex: 0,
        isDirty: true
      })
    }
  }
}))