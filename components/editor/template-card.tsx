'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  StarOff, 
  TrendingUp, 
  Target
} from 'lucide-react'
import { LinkedInTemplate } from '@/lib/data/linkedin-templates'
import { useTemplatesStore } from '@/lib/stores/templates-store'

interface TemplateCardProps {
  template: LinkedInTemplate
  onSelect: () => void
  isFavorite: boolean
}

export function TemplateCard({ template, onSelect, isFavorite }: TemplateCardProps) {
  const { toggleFavorite } = useTemplatesStore()
  
  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, string> = {
      story: '📖',
      howto: '📝',
      casestudy: '📊',
      thought: '💡',
      poll: '🗳️',
      list: '📋',
      behind: '🎬',
      success: '🏆',
      industry: '🏢',
      career: '💼'
    }
    return icons[categoryId] || '📄'
  }
  
  
  const preview = template.template.substring(0, 150).replace(/\[.*?\]/g, '___') + '...'
  
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group h-full flex flex-col">
      <div className="flex flex-col flex-1 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{getCategoryIcon(template.category)}</span>
              <h3 className="font-semibold text-gray-900">{template.title}</h3>
              {template.isViral && (
                <Badge variant="destructive" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Viral
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 -mr-2"
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(template.id)
            }}
          >
            {isFavorite ? (
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Preview */}
        <div 
          className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md line-clamp-3"
          onClick={onSelect}
        >
          {preview}
        </div>
        
        {/* Content Type */}
        <div className="flex-1">
          {template.metrics?.bestFor && (
            <div className="flex items-center gap-1 text-xs">
              <Target className="h-3 w-3 text-gray-400" />
              <span className="text-gray-600">{template.metrics.bestFor}</span>
            </div>
          )}
        </div>
        
        {/* Actions - Always at bottom */}
        <div className="flex gap-2 pt-2 mt-auto">
          <Button 
            onClick={onSelect}
            className="flex-1"
            size="sm"
          >
            Use Template
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              // Preview functionality could be added here
              onSelect()
            }}
          >
            Preview
          </Button>
        </div>
      </div>
    </Card>
  )
}