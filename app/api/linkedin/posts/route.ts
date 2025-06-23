import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { linkedInAPI } from '@/lib/services/linkedin-api'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const count = parseInt(searchParams.get('count') || '10')

    // Fetch user's LinkedIn posts
    const posts = await linkedInAPI.getUserPosts(user.id, count)

    // Process and store posts for voice analysis
    const processedPosts = posts.map(post => ({
      id: post.id,
      content: post.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary?.text || '',
      created: post.created?.time ? new Date(post.created.time) : null,
      visibility: post.visibility?.['com.linkedin.ugc.MemberNetworkVisibility'] || 'UNKNOWN'
    }))

    return NextResponse.json({
      posts: processedPosts,
      count: processedPosts.length
    })

  } catch (error: any) {
    console.error('LinkedIn get posts error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch LinkedIn posts' },
      { status: 500 }
    )
  }
}