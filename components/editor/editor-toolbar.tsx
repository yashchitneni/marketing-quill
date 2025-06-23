'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { 
  Bold,
  Italic,
  List,
  ListOrdered,
  Hash,
  AtSign,
  Smile,
  Undo,
  Redo,
  Type
} from 'lucide-react'
import { useEditorStore } from '@/lib/stores/editor-store'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface EditorToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  onInsert: (before: string, after: string, placeholder?: string) => void
}

export function EditorToolbar({ textareaRef, onInsert }: EditorToolbarProps) {
  const { undo, redo } = useEditorStore()
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)

  const commonEmojis = ['👍', '❤️', '🎉', '🚀', '💡', '🔥', '✨', '💪', '🙌', '👏', '🎯', '💼', '📈', '✅', '🌟', '🤝']

  const formatText = (type: 'bold' | 'italic') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)

    if (type === 'bold') {
      onInsert('**', '**', selectedText || 'bold text')
    } else if (type === 'italic') {
      onInsert('*', '*', selectedText || 'italic text')
    }
  }

  const insertList = (ordered: boolean) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const lineStart = textarea.value.lastIndexOf('\n', start - 1) + 1
    const currentLine = textarea.value.substring(lineStart, start)
    
    // Check if we're already in a list
    const isInList = ordered ? /^\d+\.\s/.test(currentLine) : /^[•·]\s/.test(currentLine)
    
    if (isInList) {
      // Add new list item on next line
      onInsert('\n' + (ordered ? '2. ' : '• '), '', 'Item')
    } else {
      // Start new list
      if (start === lineStart) {
        // At beginning of line
        onInsert(ordered ? '1. ' : '• ', '', 'Item')
      } else {
        // Middle of line, start on new line
        onInsert('\n' + (ordered ? '1. ' : '• '), '', 'Item')
      }
    }
  }

  const insertHashtag = () => {
    onInsert('#', '', 'hashtag')
  }

  const insertMention = () => {
    onInsert('@', '', 'mention')
  }

  const insertEmoji = (emoji: string) => {
    onInsert(emoji, '')
    setIsEmojiOpen(false)
  }

  const clearFormatting = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const content = textarea.value
    // Remove markdown formatting
    const cleaned = content
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .replace(/^[•·]\s/gm, '') // Remove bullet points
      .replace(/^\d+\.\s/gm, '') // Remove numbered lists

    textarea.value = cleaned
    textarea.dispatchEvent(new Event('input', { bubbles: true }))
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 p-2 bg-background border-b">
        {/* Text Formatting */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('bold')}
              className="h-8 w-8 p-0"
            >
              <Bold className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Bold (⌘B)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('italic')}
              className="h-8 w-8 p-0"
            >
              <Italic className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Italic (⌘I)</p>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Lists */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertList(false)}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Bullet List</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertList(true)}
              className="h-8 w-8 p-0"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Numbered List</p>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* LinkedIn Features */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertHashtag}
              className="h-8 w-8 p-0"
            >
              <Hash className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Add Hashtag</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertMention}
              className="h-8 w-8 p-0"
            >
              <AtSign className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Mention Someone</p>
          </TooltipContent>
        </Tooltip>

        <Popover open={isEmojiOpen} onOpenChange={setIsEmojiOpen}>
          <PopoverTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Add Emoji</p>
              </TooltipContent>
            </Tooltip>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="grid grid-cols-8 gap-1">
              {commonEmojis.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  onClick={() => insertEmoji(emoji)}
                  className="h-8 w-8 p-0 text-lg hover:bg-accent"
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Utilities */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFormatting}
              className="h-8 w-8 p-0"
            >
              <Type className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Clear Formatting</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex-1" />

        {/* Undo/Redo */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              className="h-8 w-8 p-0"
            >
              <Undo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Undo (⌘Z)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              className="h-8 w-8 p-0"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Redo (⌘⇧Z)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}