'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useSpellCheckStore } from '@/lib/stores/spell-check-store'
import { Button } from '@/components/ui/button'

interface SpellCheckTooltipProps {
  word: string
  position: { x: number; y: number }
  suggestions: string[]
  onReplace: (replacement: string) => void
  onDismiss: () => void
  onAddToDictionary?: (word: string) => void
}

export function SpellCheckTooltip({ 
  word, 
  position, 
  suggestions, 
  onReplace,
  onDismiss,
  onAddToDictionary
}: SpellCheckTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [adjustedPosition, setAdjustedPosition] = useState(position)

  useEffect(() => {
    if (!tooltipRef.current) return

    const rect = tooltipRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let newX = position.x
    let newY = position.y

    // Adjust if tooltip goes off right edge
    if (rect.right > viewportWidth) {
      newX = viewportWidth - rect.width - 10
    }

    // Adjust if tooltip goes off bottom edge
    if (rect.bottom > viewportHeight) {
      newY = position.y - rect.height - 30 // Show above cursor
    }

    setAdjustedPosition({ x: newX, y: newY })
  }, [position])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        onDismiss()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onDismiss])

  return createPortal(
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-white rounded-lg shadow-lg border p-3 max-w-xs"
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y + 20}px`,
      }}
    >
      <div className="text-sm font-medium mb-2">
        Spelling: "<span className="text-red-600">{word}</span>"
      </div>
      
      {suggestions.length > 0 ? (
        <>
          <div className="text-xs text-gray-500 mb-2">Suggestions:</div>
          <div className="space-y-1">
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm"
                onClick={() => {
                  onReplace(suggestion)
                  onDismiss()
                }}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-sm text-gray-500">No suggestions available</div>
      )}
      
      <div className="mt-2 pt-2 border-t space-y-1">
        {onAddToDictionary && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs justify-start"
            onClick={() => {
              onAddToDictionary(word)
              onDismiss()
            }}
          >
            Add to Dictionary
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs justify-start"
          onClick={onDismiss}
        >
          Ignore
        </Button>
      </div>
    </div>,
    document.body
  )
}