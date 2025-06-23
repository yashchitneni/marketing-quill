import { createClient } from '@/lib/supabase/client'

export interface LinkedInPost {
  text: string
  visibility?: 'PUBLIC' | 'CONNECTIONS'
}

export interface LinkedInProfile {
  id: string
  firstName: string
  lastName: string
  profilePicture?: string
}

export interface LinkedInShareResponse {
  id: string
  activity: string
  created: {
    actor: string
    time: number
  }
  edited: boolean
  text: string
}

class LinkedInAPIService {
  private async getAccessToken(userId: string): Promise<string | null> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('linkedin_access_token, linkedin_expires_at')
      .eq('user_id', userId)
      .single()

    if (error || !data?.linkedin_access_token) {
      throw new Error('LinkedIn not connected')
    }

    // Check if token is expired
    if (data.linkedin_expires_at && new Date(data.linkedin_expires_at) < new Date()) {
      throw new Error('LinkedIn token expired')
    }

    return data.linkedin_access_token
  }

  /**
   * Post content to LinkedIn
   */
  async postToLinkedIn(userId: string, content: string): Promise<LinkedInShareResponse> {
    const accessToken = await this.getAccessToken(userId)
    if (!accessToken) throw new Error('No access token')

    // Get LinkedIn user URN
    const supabase = createClient()
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('linkedin_profile_id')
      .eq('user_id', userId)
      .single()

    if (!profile?.linkedin_profile_id) {
      throw new Error('LinkedIn profile ID not found')
    }

    // Format content for LinkedIn API v2
    const postData = {
      author: `urn:li:person:${profile.linkedin_profile_id}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    }

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(postData)
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('LinkedIn API error:', error)
      throw new Error(`Failed to post to LinkedIn: ${response.status}`)
    }

    const result = await response.json()
    return result
  }

  /**
   * Get user's LinkedIn posts
   */
  async getUserPosts(userId: string, count: number = 10): Promise<any[]> {
    const accessToken = await this.getAccessToken(userId)
    if (!accessToken) throw new Error('No access token')

    const supabase = createClient()
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('linkedin_profile_id')
      .eq('user_id', userId)
      .single()

    if (!profile?.linkedin_profile_id) {
      throw new Error('LinkedIn profile ID not found')
    }

    // LinkedIn API v2 endpoint for getting user's posts
    const response = await fetch(
      `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(urn:li:person:${profile.linkedin_profile_id})&count=${count}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch LinkedIn posts: ${response.status}`)
    }

    const data = await response.json()
    return data.elements || []
  }

  /**
   * Get LinkedIn profile information
   */
  async getProfile(userId: string): Promise<LinkedInProfile> {
    const accessToken = await this.getAccessToken(userId)
    if (!accessToken) throw new Error('No access token')

    const response = await fetch(
      'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch LinkedIn profile: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      id: data.id,
      firstName: data.firstName?.localized?.en_US || '',
      lastName: data.lastName?.localized?.en_US || '',
      profilePicture: data.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier
    }
  }

  /**
   * Get post analytics/engagement
   */
  async getPostAnalytics(userId: string, postId: string): Promise<any> {
    const accessToken = await this.getAccessToken(userId)
    if (!accessToken) throw new Error('No access token')

    // Note: Analytics API requires additional permissions
    const response = await fetch(
      `https://api.linkedin.com/v2/socialActions/${postId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch post analytics: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Check if LinkedIn is connected and valid
   */
  async isConnected(userId: string): Promise<boolean> {
    try {
      const token = await this.getAccessToken(userId)
      return !!token
    } catch {
      return false
    }
  }

  /**
   * Disconnect LinkedIn
   */
  async disconnect(userId: string): Promise<void> {
    const supabase = createClient()
    
    await supabase
      .from('user_profiles')
      .update({
        linkedin_access_token: null,
        linkedin_refresh_token: null,
        linkedin_expires_at: null,
        linkedin_profile_id: null,
        linkedin_first_name: null,
        linkedin_last_name: null,
        linkedin_connected_at: null
      })
      .eq('user_id', userId)
  }
}

export const linkedInAPI = new LinkedInAPIService()