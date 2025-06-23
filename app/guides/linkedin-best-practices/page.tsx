import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, BookOpen, Target, TrendingUp, Users, Clock, Hash, Image, FileText } from 'lucide-react'
import Link from 'next/link'

export default function LinkedInBestPracticesPage() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold">LinkedIn Best Practices Guide</h1>
          </div>
          <p className="text-lg text-gray-600">
            Master the art of LinkedIn content creation with these proven strategies
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Writing Effective Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Writing Effective LinkedIn Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Hook Your Readers</h3>
                <p className="text-gray-600 mb-2">
                  The first 2-3 lines are crucial - they determine whether someone clicks "see more"
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm"><strong>Good:</strong> "I made a $50K mistake yesterday. Here's what I learned..."</p>
                  <p className="text-sm mt-2"><strong>Bad:</strong> "Today I want to share some thoughts about business..."</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Use Line Breaks Strategically</h3>
                <p className="text-gray-600">
                  Keep paragraphs short (1-2 lines) for better mobile readability. White space is your friend.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Tell Stories</h3>
                <p className="text-gray-600">
                  Personal stories and experiences get 3x more engagement than generic advice.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. End with Engagement</h3>
                <p className="text-gray-600">
                  Always end with a question or call-to-action to encourage comments.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Optimal Posting Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Best Times to Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Weekdays</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Tuesday - Thursday: Best days</li>
                    <li>• 7:45 AM - 8:45 AM</li>
                    <li>• 12:00 PM - 1:00 PM</li>
                    <li>• 5:00 PM - 6:00 PM</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Avoid</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Monday mornings</li>
                    <li>• Friday afternoons</li>
                    <li>• Weekends (lower B2B engagement)</li>
                    <li>• Late nights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hashtag Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Hashtag Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600">Use 3-5 relevant hashtags per post for optimal reach.</p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Hashtag Mix Formula:</p>
                <ul className="space-y-1 text-sm">
                  <li>• 1-2 Broad hashtags (#leadership, #marketing)</li>
                  <li>• 1-2 Niche hashtags (#B2BSaaS, #TechStartups)</li>
                  <li>• 1 Branded/Personal hashtag</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Content Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                High-Performing Content Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">How-to Posts</h4>
                    <p className="text-sm text-gray-600">Step-by-step guides and tutorials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Industry Insights</h4>
                    <p className="text-sm text-gray-600">Trends, predictions, and analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Personal Stories</h4>
                    <p className="text-sm text-gray-600">Failures, learnings, and victories</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold">Contrarian Views</h4>
                    <p className="text-sm text-gray-600">Challenge common beliefs respectfully</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Visual Content Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600">Posts with images get 2x more engagement.</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Use high-quality, relevant images</li>
                <li>• Infographics perform exceptionally well</li>
                <li>• Carousel posts can get 3x more reach</li>
                <li>• Native video gets highest engagement</li>
                <li>• Always add alt text for accessibility</li>
              </ul>
            </CardContent>
          </Card>

          {/* Algorithm Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                LinkedIn Algorithm Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Dwell Time is Key</p>
                <p className="text-sm">The algorithm favors posts that keep people on the platform longer.</p>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Respond to comments within the first hour</li>
                <li>• Ask questions that spark discussion</li>
                <li>• Edit posts sparingly (edits can reduce reach)</li>
                <li>• Avoid external links in the main post</li>
                <li>• Post consistently (3-5 times per week)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="/dashboard">
            <Button size="lg">
              Start Writing Better Posts
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}