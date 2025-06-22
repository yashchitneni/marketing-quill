import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import DashboardContent from './dashboard-content'

// Loading component for Suspense fallback
function DashboardLoading() {
  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    </DashboardLayout>
  )
}

interface DashboardPageProps {
  searchParams: Promise<{
    status?: string
    channel?: string
    sort?: string
    page?: string
  }>
}

async function getInitialDrafts(userId: string, searchParams: Awaited<DashboardPageProps['searchParams']>) {
  const supabase = await createClient()
  const ITEMS_PER_PAGE = 20
  const page = parseInt(searchParams.page || '1')
  const from = (page - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1
  
  // Fetch all data including content in ONE query
  let query = supabase
    .from('drafts')
    .select('id, title, channel, optimization_score, status, updated_at, created_at, content', { count: 'exact' })
    .eq('user_id', userId)
  
  // Apply filters
  if (searchParams.status && searchParams.status !== 'all') {
    query = query.eq('status', searchParams.status)
  }
  
  if (searchParams.channel && searchParams.channel !== 'all') {
    query = query.eq('channel', searchParams.channel)
  }
  
  // Apply sorting
  const sortBy = searchParams.sort || 'updated_at'
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
  
  const { data, count, error } = await query
  
  if (error) {
    console.error('Error fetching drafts:', error)
    return { drafts: [], totalCount: 0 }
  }
  
  // Process content previews in memory (much faster than N+1 queries)
  const draftsWithPreview = data?.map(draft => ({
    ...draft,
    content_preview: draft.content ? draft.content.substring(0, 150) : '',
    content: undefined // Remove full content from response to save memory
  })) || []
  
  return { drafts: draftsWithPreview, totalCount: count || 0 }
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  const resolvedSearchParams = await searchParams
  const { drafts, totalCount } = await getInitialDrafts(user.id, resolvedSearchParams)
  
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent initialDrafts={drafts} initialTotalCount={totalCount} />
    </Suspense>
  )
}