'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth-store'
import { createClient } from '@/lib/supabase/client'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { DraftCard } from '@/components/dashboard/draft-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Plus, Search, Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Draft {
  id: string
  title: string
  content?: string
  channel?: string
  optimization_score: number
  status: string
  updated_at: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isInitialized } = useAuthStore()
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('updated_at')
  const [filterChannel, setFilterChannel] = useState('all')
  
  const status = searchParams.get('status') || 'all'

  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/auth/login')
    }
  }, [isInitialized, user, router])

  useEffect(() => {
    if (user) {
      fetchDrafts()
    }
  }, [user, status, sortBy, filterChannel])

  const fetchDrafts = async () => {
    setIsLoading(true)
    const supabase = createClient()
    
    let query = supabase
      .from('drafts')
      .select('*')
      .eq('user_id', user?.id)
    
    // Apply status filter
    if (status !== 'all') {
      query = query.eq('status', status)
    }
    
    // Apply channel filter
    if (filterChannel !== 'all') {
      query = query.eq('channel', filterChannel)
    }
    
    // Apply sorting
    if (sortBy === 'updated_at') {
      query = query.order('updated_at', { ascending: false })
    } else if (sortBy === 'created_at') {
      query = query.order('created_at', { ascending: false })
    } else if (sortBy === 'title') {
      query = query.order('title', { ascending: true })
    } else if (sortBy === 'score') {
      query = query.order('optimization_score', { ascending: false })
    }
    
    const { data, error } = await query
    
    if (!error && data) {
      setDrafts(data)
    }
    setIsLoading(false)
  }

  const createNewDraft = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('drafts')
      .insert({
        user_id: user?.id,
        title: 'Untitled Draft',
        content: '',
        optimization_score: 0
      })
      .select()
      .single()
    
    if (!error && data) {
      router.push(`/editor/${data.id}`)
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await supabase.from('drafts').delete().eq('id', id)
    fetchDrafts()
  }

  const handleArchive = async (id: string) => {
    const supabase = createClient()
    await supabase
      .from('drafts')
      .update({ status: 'archived' })
      .eq('id', id)
    fetchDrafts()
  }

  const handleDuplicate = async (id: string) => {
    const supabase = createClient()
    const draft = drafts.find(d => d.id === id)
    if (!draft) return
    
    const { error } = await supabase
      .from('drafts')
      .insert({
        user_id: user?.id,
        title: `${draft.title} (Copy)`,
        content: draft.content,
        channel: draft.channel,
        optimization_score: 0
      })
    
    if (!error) {
      fetchDrafts()
    }
  }

  const filteredDrafts = drafts.filter(draft => 
    draft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    draft.content?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isInitialized || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Drafts</h1>
            <p className="text-gray-600 mt-1">Create and manage your marketing copy</p>
          </div>
          <Button onClick={createNewDraft} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            New Draft
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search drafts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterChannel} onValueChange={setFilterChannel}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All channels</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="ad">Ad</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated_at">Last modified</SelectItem>
                <SelectItem value="created_at">Date created</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="score">Optimization score</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : filteredDrafts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              {searchQuery ? 'No drafts found matching your search.' : 'No drafts yet. Create your first one!'}
            </p>
            {!searchQuery && (
              <Button onClick={createNewDraft} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Draft
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDrafts.map((draft) => (
              <DraftCard
                key={draft.id}
                draft={draft}
                onDelete={handleDelete}
                onArchive={handleArchive}
                onDuplicate={handleDuplicate}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}