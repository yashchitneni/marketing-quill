import { useCallback } from 'react'

type EditorStore = {
  save: (force?: boolean) => Promise<void>
  undo: () => void
  redo: () => void
  setContent: (content: string) => void
}

interface UseEditorKeyboardShortcutsProps {
  editorStore: EditorStore
  onInsert: (before: string, after: string, placeholder?: string) => void
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  localContent: string
  setLocalContent: (content: string) => void
  saveTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
}

export function useEditorKeyboardShortcuts({
  editorStore,
  onInsert,
  textareaRef,
  localContent,
  setLocalContent,
  saveTimeoutRef
}: UseEditorKeyboardShortcutsProps) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Formatting shortcuts
    if (e.metaKey || e.ctrlKey) {
      switch(e.key.toLowerCase()) {
        case 'b':
          e.preventDefault()
          onInsert('**', '**', 'bold text')
          break
        case 'i':
          e.preventDefault()
          onInsert('*', '*', 'italic text')
          break
        case 's':
          e.preventDefault()
          // Manual save with Cmd/Ctrl + S (force save)
          editorStore.save(true)
          break
        case 'z':
          if (e.shiftKey) {
            e.preventDefault()
            editorStore.redo()
          } else {
            e.preventDefault()
            editorStore.undo()
          }
          break
        case 'y':
          e.preventDefault()
          editorStore.redo()
          break
      }
    }
    
    // Tab handling
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = textareaRef.current?.selectionStart || 0
      const end = textareaRef.current?.selectionEnd || 0
      const newContent = 
        localContent.substring(0, start) + 
        '  ' + // 2 spaces for tab
        localContent.substring(end)
      
      setLocalContent(newContent)
      
      // Update cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2
          textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
      
      // Save the tab insertion
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      saveTimeoutRef.current = setTimeout(() => {
        editorStore.setContent(newContent)
        saveTimeoutRef.current = null
      }, 500)
    }
  }, [localContent, editorStore, onInsert, textareaRef, setLocalContent, saveTimeoutRef])

  return { handleKeyDown }
}