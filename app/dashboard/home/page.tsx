import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardHome } from '@/components/dashboard/dashboard-home'

async function getDashboardData(userId: string) {
  const supabase = await createClient()
  
  // Fetch all data in parallel
  const [draftsResult, publishedResult, recentResult, profileResult] = await Promise.all([
    supabase
      .from('drafts')
      .select('optimization_score', { count: 'exact' })
      .eq('user_id', userId),
    supabase
      .from('drafts')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('status', 'published'),
    supabase
      .from('drafts')
      .select('id, title, updated_at, optimization_score')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(5),
    supabase
      .from('profiles')
      .select('full_name, username')
      .eq('id', userId)
      .single()
  ])

  const totalDrafts = draftsResult.count || 0
  const publishedCount = publishedResult.count || 0
  
  // Calculate average score
  const scores = draftsResult.data?.map(d => d.optimization_score).filter(s => s > 0) || []
  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0

  return {
    stats: {
      totalDrafts,
      publishedCount,
      averageScore,
      recentDrafts: recentResult.data || []
    },
    profile: profileResult.data
  }
}

export default async function DashboardHomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  const { stats, profile } = await getDashboardData(user.id)
  const userName = profile?.full_name || profile?.username || user.email?.split('@')[0] || 'there'
  
  return <DashboardHome initialStats={stats} initialUserName={userName} userEmail={user.email} />
}