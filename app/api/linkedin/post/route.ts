import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { linkedInAPI } from '@/lib/services/linkedin-api'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get request body
    const { content, draftId } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    // Post to LinkedIn
    const result = await linkedInAPI.postToLinkedIn(user.id, content)

    // Update draft status if provided
    if (draftId) {
      await supabase
        .from('drafts')
        .update({
          published_at: new Date().toISOString(),
          metadata: {
            linkedin_post_id: result.id,
            linkedin_activity: result.activity
          }
        })
        .eq('id', draftId)
        .eq('user_id', user.id)
    }

    // Store post in our database for analytics
    await supabase
      .from('linkedin_posts')
      .insert({
        user_id: user.id,
        linkedin_post_id: result.id,
        content: content,
        posted_at: new Date().toISOString()
      })

    return NextResponse.json({
      success: true,
      postId: result.id,
      activity: result.activity
    })

  } catch (error) {
    console.error('LinkedIn post error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to post to LinkedIn' },
      { status: 500 }
    )
  }
}