import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface EditorTextareaProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
}

export const EditorTextarea = forwardRef<HTMLTextAreaElement, EditorTextareaProps>(
  ({ value, onChange, onKeyDown, placeholder = "Start typing your LinkedIn post...", className }, ref) => {
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full h-full p-8 resize-none",
          "text-base leading-relaxed",
          "focus:outline-none",
          "placeholder:text-muted-foreground/50",
          "bg-transparent relative z-10",
          className
        )}
        style={{
          fontSize: '16px',
          lineHeight: '1.75',
          minHeight: '100%',
          backgroundColor: 'transparent',
          color: 'inherit'
        }}
      />
    )
  }
)

EditorTextarea.displayName = 'EditorTextarea'