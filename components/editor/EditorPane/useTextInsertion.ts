import { useCallback } from 'react'

interface UseTextInsertionProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  localContent: string
  setLocalContent: (content: string) => void
  onContentChange: (content: string) => void
}

export function useTextInsertion({
  textareaRef,
  localContent,
  setLocalContent,
  onContentChange
}: UseTextInsertionProps) {
  const handleInsert = useCallback((before: string, after: string, placeholder?: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const textToInsert = selectedText || placeholder || ''
    
    const newContent = 
      localContent.substring(0, start) + 
      before + textToInsert + after +
      localContent.substring(end)
    
    setLocalContent(newContent)
    
    // Update cursor position
    const newCursorPos = start + before.length + textToInsert.length
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.selectionStart = start + before.length
        textareaRef.current.selectionEnd = newCursorPos
      }
    }, 0)
    
    // Trigger content change
    onContentChange(newContent)
  }, [localContent, setLocalContent, textareaRef, onContentChange])

  return { handleInsert }
}