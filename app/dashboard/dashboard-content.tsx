'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth-store'
import { createClient } from '@/lib/supabase/client'
import { DraftCard } from '@/components/dashboard/draft-card'
import { DashboardHome } from '@/components/dashboard/dashboard-home'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Plus, Search, Filter, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'
import Link from 'next/link'
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
  content_preview?: string
}

const ITEMS_PER_PAGE = 20

interface DashboardContentProps {
  initialDrafts?: Draft[]
  initialTotalCount?: number
}

export default function DashboardContent({ 
  initialDrafts = [], 
  initialTotalCount = 0 
}: DashboardContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isInitialized } = useAuthStore()
  const [drafts, setDrafts] = useState<Draft[]>(initialDrafts)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(initialDrafts.length === 0)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'updated_at')
  const [filterChannel, setFilterChannel] = useState(searchParams.get('channel') || 'all')
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'))
  const [totalCount, setTotalCount] = useState(initialTotalCount)
  
  const status = searchParams.get('status')
  const isHomePage = !status && !searchParams.get('channel') && !searchParams.get('sort') && !searchParams.get('page')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const fetchDrafts = useCallback(async (page: number) => {
    if (!user?.id) return
    
    setIsLoading(true)
    const supabase = createClient()
    
    // Calculate range for pagination
    const from = (page - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE - 1
    
    // Build the query - include content in the initial query
    let query = supabase
      .from('drafts')
      .select('id, title, channel, optimization_score, status, updated_at, created_at, content', { count: 'exact' })
      .eq('user_id', user.id)
    
    // Apply status filter
    if (status && status !== 'all') {
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
    
    // Apply pagination
    query = query.range(from, to)
    
    const { data, error, count } = await query
    
    if (!error && data) {
      // Process content previews in memory (no additional queries!)
      const draftsWithPreview = data.map(draft => ({
        ...draft,
        content_preview: draft.content ? draft.content.substring(0, 150) : '',
        content: undefined // Remove full content to save memory
      }))
      
      setDrafts(draftsWithPreview)
      setTotalCount(count || 0)
      setIsInitialLoad(false)
    }
    setIsLoading(false)
  }, [user?.id, status, filterChannel, sortBy])

  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/auth/login')
    }
  }, [isInitialized, user, router])

  useEffect(() => {
    if (user) {
      setCurrentPage(1)
      fetchDrafts(1)
    }
  }, [user, status, sortBy, filterChannel, fetchDrafts])

  useEffect(() => {
    if (user && currentPage > 1) {
      fetchDrafts(currentPage)
    }
  }, [user, currentPage, fetchDrafts])

  const createNewDraft = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('drafts')
      .insert({
        user_id: user?.id,
        title: 'Untitled LinkedIn Post',
        content: '',
        channel: 'linkedin',
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
    fetchDrafts(currentPage)
  }

  const handleArchive = async (id: string) => {
    const supabase = createClient()
    await supabase
      .from('drafts')
      .update({ status: 'archived' })
      .eq('id', id)
    fetchDrafts(currentPage)
  }

  const handleDuplicate = async (id: string) => {
    const supabase = createClient()
    
    // Fetch the full draft in one query
    const { data: fullDraft, error: fetchError } = await supabase
      .from('drafts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (fetchError || !fullDraft) return
    
    const { error } = await supabase
      .from('drafts')
      .insert({
        user_id: user?.id,
        title: `${fullDraft.title} (Copy)`,
        content: fullDraft.content || '',
        channel: fullDraft.channel,
        optimization_score: 0
      })
    
    if (!error) {
      fetchDrafts(currentPage)
    }
  }

  // Memoize filtered drafts to prevent unnecessary recalculations
  const filteredDrafts = useMemo(() => {
    if (!debouncedSearchQuery) return drafts
    
    return drafts.filter(draft => 
      draft.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      draft.content_preview?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
  }, [drafts, debouncedSearchQuery])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
  const canGoBack = currentPage > 1
  const canGoForward = currentPage < totalPages

  if (!isInitialized || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Show home page if no filters are applied
  if (isHomePage) {
    return <DashboardHome />
  }

  return (
    <div className="p-8">
      {/* Back Button for filtered views */}
      {(status || filterChannel !== 'all') && (
        <Link href="/dashboard" className="inline-block mb-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      )}
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {status === 'published' ? 'Published Posts' : 
             status === 'archived' ? 'Archived Posts' : 
             'All LinkedIn Posts'}
          </h1>
          <p className="text-gray-600 mt-1">
            {status === 'published' ? 'Your published LinkedIn content' : 
             status === 'archived' ? 'Posts you\'ve archived' : 
             'Create and manage your LinkedIn content'}
          </p>
        </div>
        <Button onClick={createNewDraft} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          New Post
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
          
          <Select 
            value={filterChannel} 
            onValueChange={(value) => {
              setFilterChannel(value)
              const params = new URLSearchParams(searchParams)
              params.set('channel', value)
              router.push(`/dashboard?${params.toString()}`)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All channels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="linkedin">LinkedIn Post</SelectItem>
              <SelectItem value="article">LinkedIn Article</SelectItem>
              <SelectItem value="newsletter">Newsletter</SelectItem>
              <SelectItem value="poll">Poll</SelectItem>
              <SelectItem value="event">Event Post</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={sortBy} 
            onValueChange={(value) => {
              setSortBy(value)
              const params = new URLSearchParams(searchParams)
              params.set('sort', value)
              router.push(`/dashboard?${params.toString()}`)
            }}
          >
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
      {(isLoading && isInitialLoad) ? (
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
        <div className="relative">
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
          
          {/* Loading overlay for subsequent loads */}
          {isLoading && !isInitialLoad && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} drafts
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newPage = currentPage - 1
                    setCurrentPage(newPage)
                    const params = new URLSearchParams(searchParams)
                    params.set('page', newPage.toString())
                    router.push(`/dashboard?${params.toString()}`)
                  }}
                  disabled={!canGoBack}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="text-sm px-4">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newPage = currentPage + 1
                    setCurrentPage(newPage)
                    const params = new URLSearchParams(searchParams)
                    params.set('page', newPage.toString())
                    router.push(`/dashboard?${params.toString()}`)
                  }}
                  disabled={!canGoForward}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}