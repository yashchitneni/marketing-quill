import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export interface SecurityEvent {
  action: string
  table_name: string
  record_id?: string
  metadata?: Record<string, any>
}

export interface UserActivity {
  id: string
  action: string
  table_name: string
  record_id: string | null
  metadata: Record<string, any> | null
  created_at: string
}

export class SecurityService {
  private supabase = createClient()

  /**
   * Check if the current user has admin role
   */
  async isAdmin(): Promise<boolean> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      if (!user) return false

      const { data: profile } = await this.supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      return profile?.role === 'admin'
    } catch (error) {
      console.error('Error checking admin status:', error)
      return false
    }
  }

  /**
   * Get current user's role
   */
  async getUserRole(): Promise<string | null> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      if (!user) return null

      const { data: profile } = await this.supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      return profile?.role || 'editor'
    } catch (error) {
      console.error('Error getting user role:', error)
      return null
    }
  }

  /**
   * Log a security event
   */
  async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      const { error } = await this.supabase.rpc('log_security_event', {
        p_action: event.action,
        p_table_name: event.table_name,
        p_record_id: event.record_id || null,
        p_metadata: event.metadata || null
      })

      if (error) {
        console.error('Error logging security event:', error)
      }
    } catch (error) {
      console.error('Error logging security event:', error)
    }
  }

  /**
   * Get user's activity log
   */
  async getUserActivity(limit: number = 50): Promise<UserActivity[]> {
    try {
      const { data, error } = await this.supabase
        .from('my_activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching user activity:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching user activity:', error)
      return []
    }
  }

  /**
   * Validate draft ownership
   */
  async validateDraftOwnership(draftId: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.rpc('validate_draft_ownership', {
        draft_id: draftId
      })

      if (error) {
        console.error('Error validating draft ownership:', error)
        return false
      }

      return data === true
    } catch (error) {
      console.error('Error validating draft ownership:', error)
      return false
    }
  }

  /**
   * Check if user has completed onboarding
   */
  async hasCompletedOnboarding(): Promise<boolean> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      if (!user) return false

      const { data: profile } = await this.supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', user.id)
        .single()

      return profile?.onboarding_completed === true
    } catch (error) {
      console.error('Error checking onboarding status:', error)
      return false
    }
  }

  /**
   * Get admin audit logs (admin only)
   */
  async getAuditLogs(
    filters: {
      user_id?: string
      action?: string
      table_name?: string
      start_date?: string
      end_date?: string
    } = {},
    limit: number = 100
  ): Promise<any[]> {
    try {
      // Check if user is admin
      const isAdmin = await this.isAdmin()
      if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
      }

      let query = this.supabase
        .from('security_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (filters.user_id) {
        query = query.eq('user_id', filters.user_id)
      }
      if (filters.action) {
        query = query.eq('action', filters.action)
      }
      if (filters.table_name) {
        query = query.eq('table_name', filters.table_name)
      }
      if (filters.start_date) {
        query = query.gte('created_at', filters.start_date)
      }
      if (filters.end_date) {
        query = query.lte('created_at', filters.end_date)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching audit logs:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching audit logs:', error)
      return []
    }
  }

  /**
   * Export user data for GDPR compliance
   */
  async exportUserData(userId?: string): Promise<any> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const targetUserId = userId || user.id

      // Only allow users to export their own data unless admin
      if (targetUserId !== user.id) {
        const isAdmin = await this.isAdmin()
        if (!isAdmin) {
          throw new Error('Unauthorized: Can only export your own data')
        }
      }

      // Fetch all user data
      const [
        profileData,
        draftsData,
        snapshotsData,
        templatesData,
        analyticsData,
        activityData
      ] = await Promise.all([
        this.supabase.from('profiles').select('*').eq('id', targetUserId).single(),
        this.supabase.from('drafts').select('*').eq('user_id', targetUserId),
        this.supabase.from('draft_snapshots').select('*').eq('user_id', targetUserId),
        this.supabase.from('custom_templates').select('*').eq('user_id', targetUserId),
        this.supabase.from('suggestion_analytics').select('*').eq('user_id', targetUserId),
        this.supabase.from('template_usage').select('*').eq('user_id', targetUserId)
      ])

      // Log the export event
      await this.logSecurityEvent({
        action: 'data_export',
        table_name: 'multiple',
        metadata: { exported_user_id: targetUserId }
      })

      return {
        exported_at: new Date().toISOString(),
        user_id: targetUserId,
        profile: profileData.data,
        drafts: draftsData.data || [],
        snapshots: snapshotsData.data || [],
        templates: templatesData.data || [],
        analytics: analyticsData.data || [],
        template_usage: activityData.data || []
      }
    } catch (error) {
      console.error('Error exporting user data:', error)
      throw error
    }
  }

  /**
   * Delete all user data (GDPR right to be forgotten)
   */
  async deleteAllUserData(): Promise<void> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Log the deletion request
      await this.logSecurityEvent({
        action: 'data_deletion_request',
        table_name: 'multiple',
        metadata: { user_id: user.id }
      })

      // Delete user account (cascades to all related data)
      const { error } = await this.supabase.auth.admin.deleteUser(user.id)
      
      if (error) {
        throw error
      }

      // Sign out the user
      await this.supabase.auth.signOut()
    } catch (error) {
      console.error('Error deleting user data:', error)
      throw error
    }
  }
}

// Export singleton instance
export const securityService = new SecurityService()