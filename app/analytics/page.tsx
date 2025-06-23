import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Eye, MessageSquare, Share2, ThumbsUp, BarChart3, Calendar, Clock } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold">Analytics</h1>
          </div>
          <p className="text-lg text-gray-600">
            Track your LinkedIn content performance and engagement metrics
          </p>
        </div>

        {/* Coming Soon Notice */}
        <Card className="mb-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">Analytics Dashboard Coming Soon!</CardTitle>
            <CardDescription className="text-green-700">
              We're building powerful analytics to help you understand what content resonates with your LinkedIn audience.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Preview of Analytics Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="opacity-75">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-400">--</div>
              <p className="text-xs text-gray-400 mt-1">Coming soon</p>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Engagement Rate</CardTitle>
                <ThumbsUp className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-400">--%</div>
              <p className="text-xs text-gray-400 mt-1">Coming soon</p>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Comments</CardTitle>
                <MessageSquare className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-400">--</div>
              <p className="text-xs text-gray-400 mt-1">Coming soon</p>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Shares</CardTitle>
                <Share2 className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-400">--</div>
              <p className="text-xs text-gray-400 mt-1">Coming soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Planned Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="opacity-75">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-gray-400" />
                <CardTitle>Post Performance Tracking</CardTitle>
              </div>
              <CardDescription>
                Monitor views, reactions, comments, and shares for each post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                • Individual post analytics<br/>
                • Engagement timeline<br/>
                • Audience demographics<br/>
                • Peak performance times
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <CardTitle>Best Time to Post</CardTitle>
              </div>
              <CardDescription>
                Discover when your audience is most active
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                • Day of week analysis<br/>
                • Hour-by-hour breakdown<br/>
                • Time zone optimization<br/>
                • Historical performance data
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-gray-400" />
                <CardTitle>Content Performance Insights</CardTitle>
              </div>
              <CardDescription>
                Understand what content drives engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                • Top performing topics<br/>
                • Optimal post length<br/>
                • Hashtag effectiveness<br/>
                • Content type comparison
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <CardTitle>Engagement Predictions</CardTitle>
              </div>
              <CardDescription>
                AI-powered predictions before you post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                • Expected reach<br/>
                • Engagement forecast<br/>
                • Optimization suggestions<br/>
                • A/B testing recommendations
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}