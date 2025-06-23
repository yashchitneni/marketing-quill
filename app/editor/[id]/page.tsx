'use client'

import { useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useEditorStore } from '@/lib/stores/editor-store'
import { EditorHeader } from '@/components/editor/editor-header'
import { EditorPane } from '@/components/editor/editor-pane'
import { EditorSidebar } from '@/components/editor/editor-sidebar'
import { AppLayout } from '@/components/layouts/app-layout'
import { Loader2 } from 'lucide-react'

type Params = Promise<{ id: string }>

export default function EditorPage({ params }: { params: Params }) {
  const router = useRouter()
  const { user, isInitialized } = useAuthStore()
  const { loadDraft, reset, createSnapshot } = useEditorStore()
  const resolvedParams = use(params)

  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/auth/login')
    }
  }, [isInitialized, user, router])

  useEffect(() => {
    if (user && resolvedParams.id) {
      loadDraft(resolvedParams.id)
      // Try to create a daily snapshot when loading
      createSnapshot()
    }

    return () => {
      reset()
    }
  }, [resolvedParams.id, user, loadDraft, reset, createSnapshot])

  // Real-time auto-save is now handled in the editor store
  // No need for interval-based saving

  // Save on unmount or before unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const { isDirty } = useEditorStore.getState()
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // Save on unmount
      const { isDirty, save } = useEditorStore.getState()
      if (isDirty) {
        save()
      }
    }
  }, [])

  if (!isInitialized || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <AppLayout fullWidth>
      <div className="h-full flex flex-col bg-gray-100">
        <EditorHeader />
        <div className="flex-1 flex overflow-hidden">
          <EditorPane />
          <EditorSidebar />
        </div>
      </div>
    </AppLayout>
  )
}