'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Search, Sparkles, TrendingUp, Star, Clock, Plus, ArrowRight } from 'lucide-react'
import { linkedInTemplates, templateCategories, getTemplatesByCategory, getViralTemplates } from '@/lib/data/linkedin-templates'
import { useTemplatesStore } from '@/lib/stores/templates-store'
import { useEditorStore } from '@/lib/stores/editor-store'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/auth-store'

export default function TemplatesPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTemplates, setFilteredTemplates] = useState(linkedInTemplates)
  const { favoriteTemplateIds, recentTemplateIds, toggleFavorite, trackTemplateUsage } = useTemplatesStore()

  useEffect(() => {
    // Filter templates based on category and search
    let templates = selectedCategory === 'all' 
      ? linkedInTemplates 
      : selectedCategory === 'viral'
      ? getViralTemplates()
      : selectedCategory === 'favorites'
      ? linkedInTemplates.filter(t => favoriteTemplateIds.includes(t.id))
      : selectedCategory === 'recent'
      ? linkedInTemplates.filter(t => recentTemplateIds.includes(t.id))
      : getTemplatesByCategory(selectedCategory)
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      templates = templates.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      )
    }
    
    setFilteredTemplates(templates)
  }, [selectedCategory, searchQuery, favoriteTemplateIds, recentTemplateIds])

  const useTemplate = async (template: any) => {
    try {
      // Track usage
      await trackTemplateUsage(template.id)
      
      // Create a new draft with the template
      const supabase = createClient()
      const { data, error } = await supabase
        .from('drafts')
        .insert({
          user_id: user?.id,
          title: template.title,
          content: template.template,
          optimization_score: 0,
          metadata: {
            templateId: template.id,
            templateCategory: template.category
          }
        })
        .select()
        .single()
      
      if (error) {
        console.error('Error creating draft:', error)
        return
      }
      
      if (data) {
        router.push(`/editor/${data.id}`)
      }
    } catch (error) {
      console.error('Error using template:', error)
    }
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = templateCategories.find(c => c.id === categoryId)
    return category?.icon || '📝'
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">LinkedIn Templates</h1>
          </div>
          <p className="text-lg text-gray-600">
            Start with proven templates that drive engagement on LinkedIn
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="flex flex-wrap h-auto p-1 gap-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-100">
              All Templates ({linkedInTemplates.length})
            </TabsTrigger>
            <TabsTrigger value="viral" className="data-[state=active]:bg-blue-100">
              <Sparkles className="h-4 w-4 mr-1" />
              Viral ({getViralTemplates().length})
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-blue-100">
              <Star className="h-4 w-4 mr-1" />
              Favorites ({favoriteTemplateIds.length})
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-blue-100">
              <Clock className="h-4 w-4 mr-1" />
              Recent ({recentTemplateIds.length})
            </TabsTrigger>
            {templateCategories.map(cat => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="data-[state=active]:bg-blue-100"
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id}
              className="hover:shadow-lg transition-shadow flex flex-col"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                    <Badge variant="secondary" className="text-xs">
                      {templateCategories.find(c => c.id === template.category)?.label}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(template.id)}
                    className="h-8 w-8"
                  >
                    <Star 
                      className={`h-4 w-4 ${
                        favoriteTemplateIds.includes(template.id) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </Button>
                </div>
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Content Type */}
                {template.metrics?.bestFor && (
                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs">
                      {template.metrics.bestFor}
                    </Badge>
                  </div>
                )}
                
                {/* Preview */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4 flex-1">
                  <p className="text-xs text-gray-600 line-clamp-4 whitespace-pre-wrap">
                    {template.template.substring(0, 200)}...
                  </p>
                </div>
                
                {/* Actions */}
                <Button 
                  onClick={() => useTemplate(template)}
                  className="w-full"
                  size="sm"
                >
                  Use This Template
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No templates found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all')
                setSearchQuery('')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Custom Template CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create Your Own Template
            </CardTitle>
            <CardDescription>
              Save your best-performing posts as reusable templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}