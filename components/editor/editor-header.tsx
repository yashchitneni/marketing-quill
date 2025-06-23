'use client'

import { useRouter } from 'next/navigation'
import { useEditorStore } from '@/lib/stores/editor-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft, 
  Save, 
  Cloud, 
  CloudOff,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTemplatesStore } from '@/lib/stores/templates-store'


export function EditorHeader() {
  const router = useRouter()
  const { 
    title, 
    setTitle, 
    save, 
    isSaving,
    saveStatus,
    isDirty,
    lastSaved 
  } = useEditorStore()
  const { setTemplateModalOpen } = useTemplatesStore()

  const handleSave = async () => {
    // Force save even if not dirty when manually clicking
    await save(true)
  }

  const getSaveStatus = () => {
    if (saveStatus === 'saving') {
      return {
        icon: Cloud,
        text: 'Saving...',
        className: 'text-blue-600 animate-pulse'
      }
    }
    if (saveStatus === 'saved') {
      return {
        icon: Cloud,
        text: 'Saved',
        className: 'text-green-600'
      }
    }
    if (saveStatus === 'error') {
      return {
        icon: CloudOff,
        text: 'Save failed',
        className: 'text-red-600'
      }
    }
    if (isDirty) {
      return {
        icon: CloudOff,
        text: 'Unsaved changes',
        className: 'text-yellow-600'
      }
    }
    if (lastSaved) {
      return {
        icon: Cloud,
        text: 'All changes saved',
        className: 'text-gray-500'
      }
    }
    return {
      icon: Cloud,
      text: 'Ready',
      className: 'text-gray-500'
    }
  }

  const statusDisplay = getSaveStatus()
  const SaveIcon = statusDisplay.icon

  return (
    <div className="border-b bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="max-w-md font-medium"
            placeholder="Untitled LinkedIn Post"
          />
          
          <Button
            variant="outline"
            onClick={() => setTemplateModalOpen(true)}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Templates
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={cn("flex items-center gap-2 text-sm", statusDisplay.className)}>
            <SaveIcon className="h-4 w-4" />
            <span>{statusDisplay.text}</span>
          </div>
          
          <Button 
            onClick={handleSave}
            disabled={isSaving || saveStatus === 'saving'}
            size="sm"
            variant={isDirty ? "default" : "outline"}
          >
            <Save className="h-4 w-4 mr-2" />
            {isDirty ? 'Save' : 'Saved'}
          </Button>
        </div>
      </div>
    </div>
  )
}