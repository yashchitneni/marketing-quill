'use client'

import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import { useTemplatesStore } from '@/lib/stores/templates-store'
import { linkedInTemplates } from '@/lib/data/linkedin-templates'

export function TemplatesPanel() {
  const { 
    recentTemplateIds, 
    favoriteTemplateIds,
    setTemplateModalOpen
  } = useTemplatesStore()
  
  const recentTemplates = recentTemplateIds
    .map(id => linkedInTemplates.find(t => t.id === id))
    .filter(Boolean)
    .slice(0, 3)
  
  const favoriteTemplates = favoriteTemplateIds
    .map(id => linkedInTemplates.find(t => t.id === id))
    .filter(Boolean)
    .slice(0, 3)
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <Button 
          onClick={() => setTemplateModalOpen(true)}
          className="w-full"
        >
          <FileText className="h-4 w-4 mr-2" />
          Browse All Templates
        </Button>
      </div>
      
      {favoriteTemplates.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 text-sm">Favorite Templates</h4>
          <div className="space-y-2">
            {favoriteTemplates.map((template) => template && (
              <button
                key={template.id}
                onClick={() => setTemplateModalOpen(true)}
                className="w-full text-left p-2 rounded border hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-sm">{template.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {template.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {recentTemplates.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 text-sm">Recently Used</h4>
          <div className="space-y-2">
            {recentTemplates.map((template) => template && (
              <button
                key={template.id}
                onClick={() => setTemplateModalOpen(true)}
                className="w-full text-left p-2 rounded border hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-sm">{template.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {template.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {favoriteTemplates.length === 0 && recentTemplates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No templates used yet</p>
          <p className="text-xs mt-1">Browse templates to get started</p>
        </div>
      )}
    </div>
  )
}