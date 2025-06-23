'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  X, 
  Star, 
  StarOff,
  Clock,
  TrendingUp,
  Plus
} from 'lucide-react'
import { useTemplatesStore } from '@/lib/stores/templates-store'
import { 
  linkedInTemplates, 
  templateCategories,
  getTemplatesByCategory,
  getViralTemplates,
  searchTemplates,
  LinkedInTemplate
} from '@/lib/data/linkedin-templates'
import { TemplateCard } from './template-card'
import { TemplateCustomizer } from './template-customizer'
import { cn } from '@/lib/utils'

export function TemplateModal() {
  const { 
    isTemplateModalOpen, 
    setTemplateModalOpen,
    selectedTemplate,
    selectTemplate,
    customTemplates,
    favoriteTemplateIds,
    recentTemplateIds,
    loadCustomTemplates
  } = useTemplatesStore()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [activeTab, setActiveTab] = useState('browse')
  
  useEffect(() => {
    if (isTemplateModalOpen) {
      loadCustomTemplates()
    }
  }, [isTemplateModalOpen, loadCustomTemplates])
  
  const getFilteredTemplates = () => {
    let templates: LinkedInTemplate[] = []
    
    if (activeTab === 'browse') {
      if (searchQuery) {
        templates = searchTemplates(searchQuery)
      } else if (selectedCategory === 'all') {
        templates = linkedInTemplates
      } else if (selectedCategory === 'viral') {
        templates = getViralTemplates()
      } else {
        templates = getTemplatesByCategory(selectedCategory)
      }
    } else if (activeTab === 'favorites') {
      templates = linkedInTemplates.filter(t => favoriteTemplateIds.includes(t.id))
    } else if (activeTab === 'recent') {
      templates = recentTemplateIds
        .map(id => linkedInTemplates.find(t => t.id === id))
        .filter(Boolean) as LinkedInTemplate[]
    } else if (activeTab === 'custom') {
      templates = customTemplates
    }
    
    return templates
  }
  
  const filteredTemplates = getFilteredTemplates()
  
  const handleSelectTemplate = (template: LinkedInTemplate) => {
    selectTemplate(template)
    setShowCustomizer(true)
  }
  
  const handleClose = () => {
    setTemplateModalOpen(false)
    setShowCustomizer(false)
    selectTemplate(null)
    setSearchQuery('')
    setSelectedCategory('all')
  }
  
  if (showCustomizer && selectedTemplate) {
    return (
      <TemplateCustomizer
        template={selectedTemplate}
        onBack={() => setShowCustomizer(false)}
        onClose={handleClose}
      />
    )
  }
  
  return (
    <Dialog open={isTemplateModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[1200px] w-[95vw] h-[90vh] p-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">LinkedIn Content Templates</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <div className="w-64 border-r bg-gray-50 p-4 overflow-y-auto">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setActiveTab('browse')
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  selectedCategory === 'all' && activeTab === 'browse' 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "hover:bg-white/50"
                )}
              >
                All Templates
              </button>
              
              <button
                onClick={() => {
                  setSelectedCategory('viral')
                  setActiveTab('browse')
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                  selectedCategory === 'viral' && activeTab === 'browse'
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "hover:bg-white/50"
                )}
              >
                <TrendingUp className="h-4 w-4" />
                Viral Templates
              </button>
              
              <div className="pt-2 pb-1">
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase">Categories</p>
              </div>
              
              {templateCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setActiveTab('browse')
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                    selectedCategory === category.id && activeTab === 'browse'
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "hover:bg-white/50"
                  )}
                >
                  <span>{category.icon}</span>
                  {category.label}
                </button>
              ))}
              
              <div className="pt-4 border-t mt-4">
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                    activeTab === 'favorites'
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "hover:bg-white/50"
                  )}
                >
                  <Star className="h-4 w-4" />
                  Favorites
                  {favoriteTemplateIds.length > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {favoriteTemplateIds.length}
                    </Badge>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab('recent')}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                    activeTab === 'recent'
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "hover:bg-white/50"
                  )}
                >
                  <Clock className="h-4 w-4" />
                  Recent
                </button>
                
                <button
                  onClick={() => setActiveTab('custom')}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                    activeTab === 'custom'
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "hover:bg-white/50"
                  )}
                >
                  <Plus className="h-4 w-4" />
                  My Templates
                  {customTemplates.length > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {customTemplates.length}
                    </Badge>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="p-6">
                {filteredTemplates.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      {searchQuery 
                        ? `No templates found for "${searchQuery}"`
                        : activeTab === 'favorites'
                        ? "No favorite templates yet"
                        : activeTab === 'recent'
                        ? "No recently used templates"
                        : activeTab === 'custom'
                        ? "No custom templates yet"
                        : "No templates in this category"}
                    </p>
                    {activeTab === 'custom' && (
                      <p className="text-sm text-gray-400 mt-2">
                        Create custom templates by modifying existing ones
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        onSelect={() => handleSelectTemplate(template)}
                        isFavorite={favoriteTemplateIds.includes(template.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}