import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LinkedInTemplate } from '@/lib/data/linkedin-templates'
import { createClient } from '@/lib/supabase/client'

interface CustomTemplate extends LinkedInTemplate {
  userId: string
  isPublic: boolean
  usageCount: number
  createdAt: string
}

interface TemplatesState {
  // State
  customTemplates: CustomTemplate[]
  favoriteTemplateIds: string[]
  recentTemplateIds: string[]
  selectedTemplate: LinkedInTemplate | null
  isTemplateModalOpen: boolean
  
  // Actions
  setTemplateModalOpen: (open: boolean) => void
  selectTemplate: (template: LinkedInTemplate | null) => void
  toggleFavorite: (templateId: string) => void
  addToRecent: (templateId: string) => void
  
  // Custom templates
  saveCustomTemplate: (template: Omit<CustomTemplate, 'id' | 'userId' | 'createdAt' | 'usageCount'>) => Promise<void>
  loadCustomTemplates: () => Promise<void>
  deleteCustomTemplate: (id: string) => Promise<void>
  
  // Analytics
  trackTemplateUsage: (templateId: string) => Promise<void>
}

export const useTemplatesStore = create<TemplatesState>()(
  persist(
    (set, get) => ({
      // Initial state
      customTemplates: [],
      favoriteTemplateIds: [],
      recentTemplateIds: [],
      selectedTemplate: null,
      isTemplateModalOpen: false,
      
      // Modal controls
      setTemplateModalOpen: (open) => set({ isTemplateModalOpen: open }),
      
      selectTemplate: (template) => set({ selectedTemplate: template }),
      
      // Favorites management
      toggleFavorite: (templateId) => {
        const { favoriteTemplateIds } = get()
        const isFavorite = favoriteTemplateIds.includes(templateId)
        
        if (isFavorite) {
          set({ 
            favoriteTemplateIds: favoriteTemplateIds.filter(id => id !== templateId) 
          })
        } else {
          set({ 
            favoriteTemplateIds: [...favoriteTemplateIds, templateId] 
          })
        }
      },
      
      // Recent templates management
      addToRecent: async (templateId) => {
        const { recentTemplateIds } = get()
        const filtered = recentTemplateIds.filter(id => id !== templateId)
        const updated = [templateId, ...filtered].slice(0, 5) // Keep only 5 recent
        set({ recentTemplateIds: updated })
        
        // Track usage in database
        try {
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          
          if (user) {
            await supabase
              .from('template_usage')
              .insert({
                user_id: user.id,
                template_id: templateId
              })
          }
        } catch (error) {
          console.error('Failed to track template usage:', error)
        }
      },
      
      // Custom templates
      saveCustomTemplate: async (template) => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) throw new Error('User not authenticated')
        
        const { data, error } = await supabase
          .from('custom_templates')
          .insert({
            user_id: user.id,
            title: template.title,
            category: template.category,
            description: template.description,
            template: template.template,
            placeholders: template.placeholders,
            is_public: template.isPublic
          })
          .select()
          .single()
        
        if (error) throw error
        
        if (data) {
          const customTemplate: CustomTemplate = {
            ...template,
            id: data.id,
            userId: user.id,
            usageCount: 0,
            createdAt: data.created_at
          }
          
          set({ 
            customTemplates: [...get().customTemplates, customTemplate] 
          })
        }
      },
      
      loadCustomTemplates: async () => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) return
        
        const { data, error } = await supabase
          .from('custom_templates')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
        
        if (!error && data) {
          const templates: CustomTemplate[] = data.map(t => ({
            id: t.id,
            userId: t.user_id,
            title: t.title,
            category: t.category,
            description: t.description,
            template: t.template,
            placeholders: t.placeholders || [],
            isPublic: t.is_public,
            usageCount: t.usage_count,
            createdAt: t.created_at
          }))
          
          set({ customTemplates: templates })
        }
      },
      
      deleteCustomTemplate: async (id: string) => {
        const supabase = createClient()
        
        const { error } = await supabase
          .from('custom_templates')
          .delete()
          .eq('id', id)
        
        if (!error) {
          set({ 
            customTemplates: get().customTemplates.filter(t => t.id !== id) 
          })
        }
      },
      
      // Analytics
      trackTemplateUsage: async (templateId: string) => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) return
        
        // Track in database
        await supabase
          .from('template_usage')
          .insert({
            user_id: user.id,
            template_id: templateId
          })
        
        // Update usage count if it's a custom template
        const customTemplate = get().customTemplates.find(t => t.id === templateId)
        if (customTemplate) {
          await supabase
            .from('custom_templates')
            .update({ usage_count: customTemplate.usageCount + 1 })
            .eq('id', templateId)
          
          // Update local state
          set({
            customTemplates: get().customTemplates.map(t =>
              t.id === templateId 
                ? { ...t, usageCount: t.usageCount + 1 }
                : t
            )
          })
        }
        
        // Add to recent
        get().addToRecent(templateId)
      }
    }),
    {
      name: 'templates-storage',
      partialize: (state) => ({
        favoriteTemplateIds: state.favoriteTemplateIds,
        recentTemplateIds: state.recentTemplateIds
      })
    }
  )
)