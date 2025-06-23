'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Plus, 
  TrendingUp, 
  FileText, 
  Clock, 
  Sparkles,
  ArrowRight,
  Target,
  Zap,
  Users,
  BarChart3,
  PenTool,
  BookOpen,
  Linkedin
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalDrafts: number
  publishedCount: number
  averageScore: number
  recentDrafts: Array<{
    id: string
    title: string
    updated_at: string
    optimization_score: number
  }>
}

interface QuickAction {
  title: string
  description: string
  icon: React.ElementType
  action: () => void
  color: string
  loading?: boolean
}

export function DashboardHome() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [stats, setStats] = useState<DashboardStats>({
    totalDrafts: 0,
    publishedCount: 0,
    averageScore: 0,
    recentDrafts: []
  })
  const [userName, setUserName] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
      fetchUserProfile()
    }
  }, [user])

  const fetchUserProfile = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('profiles')
      .select('full_name, username')
      .eq('id', user?.id)
      .single()
    
    if (data) {
      setUserName(data.full_name || data.username || user?.email?.split('@')[0] || 'there')
    }
  }

  const fetchDashboardData = async () => {
    if (!user) return
    
    setLoading(true)
    const supabase = createClient()
    
    // Fetch stats in parallel
    const [draftsResult, publishedResult, recentResult] = await Promise.all([
      supabase
        .from('drafts')
        .select('optimization_score', { count: 'exact' })
        .eq('user_id', user.id),
      supabase
        .from('drafts')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .eq('status', 'published'),
      supabase
        .from('drafts')
        .select('id, title, updated_at, optimization_score')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(5)
    ])

    const totalDrafts = draftsResult.count || 0
    const publishedCount = publishedResult.count || 0
    
    // Calculate average score
    const scores = draftsResult.data?.map(d => d.optimization_score).filter(s => s > 0) || []
    const averageScore = scores.length > 0 
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0

    setStats({
      totalDrafts,
      publishedCount,
      averageScore,
      recentDrafts: recentResult.data || []
    })
    
    setLoading(false)
  }


  const quickActions: QuickAction[] = [
    {
      title: 'Write LinkedIn Post',
      description: 'Create engaging content for LinkedIn',
      icon: Linkedin,
      action: () => router.push('/editor/new'),
      color: 'bg-blue-500'
    },
    {
      title: 'Use Template',
      description: 'Start with proven templates',
      icon: BookOpen,
      action: () => router.push('/templates'),
      color: 'bg-purple-500'
    },
    {
      title: 'Improve Existing',
      description: 'Optimize your drafts with AI',
      icon: Sparkles,
      action: () => router.push('/dashboard?status=all'),
      color: 'bg-green-500'
    }
  ]

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const then = new Date(date)
    const diff = now.getTime() - then.getTime()
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Ready to create content that gets noticed on LinkedIn?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action) => (
          <Card 
            key={action.title}
            className="hover:shadow-lg transition-shadow cursor-pointer border-2"
            onClick={action.action}
          >
            <CardHeader>
              <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push('/dashboard?status=all')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Drafts</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDrafts}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push('/dashboard?status=published')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Published</CardTitle>
              <BarChart3 className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedCount}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.totalDrafts > 0 
                ? `${Math.round((stats.publishedCount / stats.totalDrafts) * 100)}% of total`
                : 'Start publishing'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Avg. Score</CardTitle>
              <Target className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <Progress value={stats.averageScore} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Engagement Tips</CardTitle>
              <Zap className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AI-Powered</div>
            <p className="text-xs text-gray-500 mt-1">Real-time suggestions</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Drafts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Drafts</CardTitle>
              <Link href="/dashboard?status=all">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : stats.recentDrafts.length > 0 ? (
              <div className="space-y-3">
                {stats.recentDrafts.map((draft) => (
                  <Link
                    key={draft.id}
                    href={`/editor/${draft.id}`}
                    className="block p-3 rounded-lg border hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{draft.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {formatTimeAgo(draft.updated_at)}
                        </p>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-700">
                          {draft.optimization_score}%
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <PenTool className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No drafts yet</p>
                <Link href="/editor/new">
                  <Button size="sm" className="mt-3">
                    Create Your First Draft
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* LinkedIn Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              LinkedIn Writing Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-sm">Hook readers in the first line</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    LinkedIn shows only the first 2-3 lines. Make them count!
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-sm">Use line breaks strategically</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Short paragraphs (1-2 lines) improve readability on mobile
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-sm">End with a question or CTA</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Encourage engagement by asking for opinions or experiences
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t">
                <Link href="/guides/linkedin-best-practices">
                  <Button variant="outline" size="sm" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Complete Guide
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}