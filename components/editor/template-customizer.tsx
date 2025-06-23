'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { 
  ArrowLeft, 
  Copy, 
  Save,
  Sparkles,
  X,
  CheckCircle2
} from 'lucide-react'
import { LinkedInTemplate } from '@/lib/data/linkedin-templates'
import { useTemplatesStore } from '@/lib/stores/templates-store'
import { useEditorStore } from '@/lib/stores/editor-store'
import { cn } from '@/lib/utils'

interface TemplateCustomizerProps {
  template: LinkedInTemplate
  onBack: () => void
  onClose: () => void
}

export function TemplateCustomizer({ template, onBack, onClose }: TemplateCustomizerProps) {
  const { saveCustomTemplate, addToRecent } = useTemplatesStore()
  
  const [customizedContent, setCustomizedContent] = useState(template.template)
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({})
  const [saveAsCustom, setSaveAsCustom] = useState(false)
  const [customTitle, setCustomTitle] = useState(`${template.title} (Custom)`)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const [applied, setApplied] = useState(false)
  
  // Extract unique placeholders from the template
  const extractPlaceholders = (templateText: string): string[] => {
    const regex = /\[([^\]]+)\]/g
    const matches = templateText.matchAll(regex)
    const placeholders = new Set<string>()
    
    for (const match of matches) {
      placeholders.add(match[1])
    }
    
    return Array.from(placeholders)
  }
  
  // Dynamically extract placeholders from customized content
  const [dynamicPlaceholders, setDynamicPlaceholders] = useState<string[]>([])
  
  useEffect(() => {
    const placeholders = extractPlaceholders(customizedContent)
    setDynamicPlaceholders(placeholders)
  }, [customizedContent])
  
  // Generate preview content with filled placeholders
  const getPreviewContent = () => {
    let content = customizedContent
    
    Object.entries(placeholderValues).forEach(([placeholder, value]) => {
      if (value) {
        // Replace all instances of [placeholder] with the value
        const regex = new RegExp(`\\[${placeholder}\\]`, 'g')
        content = content.replace(regex, value)
      }
    })
    
    return content
  }
  
  const handlePlaceholderChange = (placeholder: string, value: string) => {
    setPlaceholderValues(prev => ({
      ...prev,
      [placeholder]: value
    }))
  }
  
  const handleSaveTemplate = async () => {
    setIsSaving(true)
    try {
      // Save the template with placeholders intact
      await saveCustomTemplate({
        title: customTitle,
        category: template.category,
        description: `Custom version of: ${template.description}`,
        template: customizedContent, // This keeps the [placeholders] intact
        placeholders: dynamicPlaceholders,
        isPublic: false
      })
      setSaveSuccess(true)
      // Show success for 2 seconds
      setTimeout(() => setSaveSuccess(false), 2000)
    } catch (error) {
      console.error('Failed to save custom template:', error)
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleApplyToEditor = async () => {
    try {
      // Track template usage
      await addToRecent(template.id)
      
      // Generate final content with filled placeholders
      const finalContent = getPreviewContent()
      
      // Apply to editor using the store's setState method
      useEditorStore.setState({ content: finalContent })
      
      // Show success feedback
      setApplied(true)
      
      // Close the modal after a short delay
      setTimeout(() => {
        onClose()
      }, 500)
    } catch (error) {
      console.error('Error applying template:', error)
    }
  }
  
  const handleCopyToClipboard = async () => {
    try {
      const contentToCopy = getPreviewContent()
      await navigator.clipboard.writeText(contentToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }
  
  const previewContent = getPreviewContent()
  const characterCount = previewContent.length
  const isOverLimit = characterCount > 3000
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] h-[85vh] p-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <DialogTitle className="text-xl">{template.title}</DialogTitle>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex flex-1 min-h-0">
          {/* Left side - Placeholder inputs */}
          <div className="w-1/3 border-r bg-gray-50 p-6 overflow-hidden flex flex-col">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Customize Your Content
            </h3>
            
            <ScrollArea className="flex-1">
              <div className="space-y-4 pr-4">
                {dynamicPlaceholders.length > 0 ? (
                  dynamicPlaceholders.map((placeholder) => (
                    <div key={placeholder}>
                      <Label htmlFor={placeholder} className="text-sm font-medium">
                        {placeholder}
                      </Label>
                      {placeholder.toLowerCase().includes('story') || 
                       placeholder.toLowerCase().includes('description') ? (
                        <Textarea
                          id={placeholder}
                          placeholder={`Enter ${placeholder}...`}
                          value={placeholderValues[placeholder] || ''}
                          onChange={(e) => handlePlaceholderChange(placeholder, e.target.value)}
                          className="mt-1"
                          rows={3}
                        />
                      ) : (
                        <Input
                          id={placeholder}
                          placeholder={`Enter ${placeholder}...`}
                          value={placeholderValues[placeholder] || ''}
                          onChange={(e) => handlePlaceholderChange(placeholder, e.target.value)}
                          className="mt-1"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Add placeholders in the preview using [brackets]
                  </p>
                )}
                
                {/* Save as custom template section */}
                <div className="pt-4 border-t space-y-3">
                  <h4 className="text-sm font-medium">Save as Template</h4>
                  <Input
                    placeholder="Template name..."
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="text-sm"
                  />
                  <Button
                    onClick={handleSaveTemplate}
                    disabled={isSaving || !customTitle.trim()}
                    size="sm"
                    className="w-full"
                    variant="outline"
                  >
                    {isSaving ? (
                      <>
                        <Save className="h-4 w-4 mr-2 animate-pulse" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Template
                      </>
                    )}
                  </Button>
                  {saveSuccess && (
                    <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded-md">
                      <CheckCircle2 className="h-4 w-4" />
                      Saved to "My Templates"!
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Templates preserve [placeholders] for future use
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
          
          {/* Right side - Template Editor and Preview */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Template Editor</h3>
                <p className="text-xs text-gray-500">Edit template and add [placeholders] in brackets</p>
              </div>
              <div className="flex items-center gap-4">
                <div className={cn(
                  "text-sm",
                  isOverLimit ? "text-red-600 font-medium" : "text-gray-600"
                )}>
                  {characterCount} / 3000 characters
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyToClipboard}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex-1 space-y-4 overflow-hidden">
              {/* Template Editor */}
              <div className="h-1/2 flex flex-col">
                <Label className="text-sm font-medium mb-2">Template (add [placeholders] here)</Label>
                <div className="flex-1 border rounded-lg bg-white">
                  <Textarea
                    value={customizedContent}
                    onChange={(e) => setCustomizedContent(e.target.value)}
                    placeholder="Your LinkedIn post template..."
                    className="w-full h-full resize-none border-0 p-4 font-mono text-sm focus:ring-0"
                  />
                </div>
              </div>
              
              {/* Preview */}
              <div className="h-1/2 flex flex-col">
                <Label className="text-sm font-medium mb-2">Preview (with filled values)</Label>
                <div className="flex-1 border rounded-lg bg-gray-50 overflow-auto">
                  <pre className="p-4 text-sm whitespace-pre-wrap font-sans">
                    {previewContent}
                  </pre>
                </div>
              </div>
            </div>
            
            {template.example && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Example:</strong> {template.example}
                </p>
              </div>
            )}
            
            <div className="flex gap-3 mt-4">
              <Button
                onClick={handleApplyToEditor}
                disabled={isOverLimit || applied}
                className="flex-1"
                type="button"
                variant={applied ? "outline" : "default"}
              >
                {applied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Applied to Editor!
                  </>
                ) : (
                  "Apply to Editor"
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={onBack}
                type="button"
              >
                Back to Templates
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}