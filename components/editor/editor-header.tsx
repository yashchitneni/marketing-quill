'use client'

import { useRouter } from 'next/navigation'
import { useEditorStore } from '@/lib/stores/editor-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  ArrowLeft, 
  Save, 
  Cloud, 
  CloudOff,
  Mail, 
  FileText, 
  Share2, 
  Globe, 
  Megaphone 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const channels = [
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'blog', label: 'Blog', icon: FileText },
  { value: 'social', label: 'Social', icon: Share2 },
  { value: 'website', label: 'Website', icon: Globe },
  { value: 'ad', label: 'Ad', icon: Megaphone }
]

export function EditorHeader() {
  const router = useRouter()
  const { 
    title, 
    setTitle, 
    channel, 
    setChannel, 
    save, 
    isSaving, 
    isAutoSaving,
    isDirty,
    lastSaved 
  } = useEditorStore()

  const handleSave = async () => {
    await save()
  }

  const getSaveStatus = () => {
    if (isSaving || isAutoSaving) {
      return {
        icon: Cloud,
        text: 'Saving...',
        className: 'text-blue-600'
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
        text: 'Saved',
        className: 'text-green-600'
      }
    }
    return {
      icon: Cloud,
      text: 'Ready',
      className: 'text-gray-500'
    }
  }

  const saveStatus = getSaveStatus()
  const SaveIcon = saveStatus.icon

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
            className="max-w-sm font-medium"
            placeholder="Untitled Draft"
          />
          
          <Select value={channel || ''} onValueChange={(value) => setChannel(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              {channels.map(({ value, label, icon: Icon }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={cn("flex items-center gap-2 text-sm", saveStatus.className)}>
            <SaveIcon className="h-4 w-4" />
            <span>{saveStatus.text}</span>
          </div>
          
          <Button 
            onClick={handleSave}
            disabled={!isDirty || isSaving}
            size="sm"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}