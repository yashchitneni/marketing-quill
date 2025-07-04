import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import DashboardContent from './dashboard-content'

// Loading component for Suspense fallback
function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
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

async function getInitialData(userId: string, searchParams: Awaited<DashboardPageProps['searchParams']>) {
  const supabase = await createClient()
  const ITEMS_PER_PAGE = 20
  const page = parseInt(searchParams.page || '1')
  const from = (page - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1
  
  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, username')
    .eq('id', userId)
    .single()
  
  // Fetch all data including content in ONE query
  let query = supabase
    .from('drafts')
    .select('id, title, channel, optimization_score, status, updated_at, created_at, content, published_at, linkedin_url', { count: 'exact' })
    .eq('user_id', userId)
  
  // Apply filters
  if (searchParams.status && searchParams.status !== 'all') {
    if (searchParams.status === 'published') {
      query = query.not('published_at', 'is', null)
    } else if (searchParams.status === 'draft') {
      query = query.is('published_at', null)
    } else {
      query = query.eq('status', searchParams.status)
    }
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
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    })
    return { drafts: [], totalCount: 0 }
  }
  
  // Process content previews in memory (much faster than N+1 queries)
  const draftsWithPreview = data?.map(draft => ({
    ...draft,
    content_preview: draft.content ? draft.content.substring(0, 150) : '',
    content: undefined // Remove full content from response to save memory
  })) || []
  
  return { 
    drafts: draftsWithPreview, 
    totalCount: count || 0,
    profile
  }
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  const resolvedSearchParams = await searchParams
  const { drafts, totalCount, profile } = await getInitialData(user.id, resolvedSearchParams)
  
  // Pass user name to dashboard content
  const userName = profile?.full_name || profile?.username || user.email?.split('@')[0] || ''
  
  return (
    <DashboardLayout>
      <Suspense fallback={<DashboardLoading />}>
        <DashboardContent 
          initialDrafts={drafts} 
          initialTotalCount={totalCount}
          userName={userName}
          userEmail={user.email}
        />
      </Suspense>
    </DashboardLayout>
  )
}