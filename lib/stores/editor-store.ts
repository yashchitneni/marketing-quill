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
  snapshots: Snapshot[]
  
  // Actions
  setDraftId: (id: string) => void
  setTitle: (title: string) => void
  setContent: (content: string, addToHistory?: boolean) => void
  setChannel: (channel: string | null) => void
  undo: () => void
  redo: () => void
  save: () => Promise<void>
  autoSave: () => Promise<void>
  loadDraft: (id: string) => Promise<void>
  reset: () => void
  createSnapshot: () => Promise<void>
  loadSnapshots: () => Promise<void>
  restoreSnapshot: (snapshotId: string) => Promise<void>
}

const MAX_HISTORY_SIZE = 50

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
  snapshots: [],
  
  setDraftId: (id) => set({ draftId: id }),
  
  setTitle: (title) => set({ title, isDirty: true }),
  
  setChannel: (channel) => set({ channel, isDirty: true }),
  
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
  
  save: async () => {
    const { draftId, title, content, channel } = get()
    if (!draftId) return
    
    set({ isSaving: true })
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
          isDirty: false
        })
      }
    } finally {
      set({ isSaving: false })
    }
  },
  
  autoSave: async () => {
    const { isDirty, isSaving } = get()
    if (isDirty && !isSaving) {
      set({ isAutoSaving: true })
      await get().save()
      set({ isAutoSaving: false })
    }
  },
  
  loadDraft: async (id: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('drafts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (!error && data) {
      set({
        draftId: data.id,
        title: data.title,
        content: data.content || '',
        channel: data.channel,
        history: [data.content || ''],
        historyIndex: 0,
        lastSaved: new Date(data.updated_at),
        isDirty: false
      })
      
      // Load snapshots for this draft
      get().loadSnapshots()
    }
  },
  
  reset: () => {
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