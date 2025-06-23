'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog'
import { Download, Trash2, Shield, FileJson } from 'lucide-react'
import { securityService } from '@/lib/security/security-service'
import { useToast } from '@/lib/hooks/use-toast'
import { useRouter } from 'next/navigation'

export function DataPrivacySettings() {
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleExportData = async () => {
    try {
      setIsExporting(true)
      
      toast({
        title: 'Exporting your data...',
        description: 'This may take a moment'
      })

      const data = await securityService.exportUserData()
      
      // Create and download the file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `my-data-export-${new Date().toISOString()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: 'Export complete',
        description: 'Your data has been downloaded successfully'
      })
    } catch (error) {
      console.error('Export error:', error)
      toast({
        title: 'Export failed',
        description: 'Failed to export your data. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true)
      
      toast({
        title: 'Deleting your account...',
        description: 'This action is permanent'
      })

      await securityService.deleteAllUserData()
      
      toast({
        title: 'Account deleted',
        description: 'Your account and all associated data have been permanently deleted'
      })

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: 'Deletion failed',
        description: 'Failed to delete your account. Please try again.',
        variant: 'destructive'
      })
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-6 w-6" />
        <h2 className="text-2xl font-semibold">Data & Privacy</h2>
      </div>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            Export Your Data
          </CardTitle>
          <CardDescription>
            Download all your data in a machine-readable format (GDPR compliant)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your export will include:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-2">
              <li>Profile information</li>
              <li>All drafts and content</li>
              <li>Draft snapshots and history</li>
              <li>Custom templates</li>
              <li>Usage analytics and statistics</li>
            </ul>
            <Button 
              onClick={handleExportData} 
              disabled={isExporting}
              className="w-full sm:w-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export My Data'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-destructive/10 p-4">
              <p className="text-sm text-destructive font-medium mb-2">
                Warning: This action is irreversible
              </p>
              <p className="text-sm text-muted-foreground">
                Deleting your account will permanently remove:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-2 mt-2">
                <li>Your profile and settings</li>
                <li>All drafts and content</li>
                <li>Templates and saved data</li>
                <li>Access to the platform</li>
              </ul>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  disabled={isDeleting}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete My Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Yes, delete my account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Information */}
      <Card>
        <CardHeader>
          <CardTitle>Your Privacy Rights</CardTitle>
          <CardDescription>
            We respect your privacy and data protection rights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Under GDPR and similar regulations, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access your personal data (export)</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Restrict processing of your data</li>
              <li>Data portability</li>
              <li>Object to data processing</li>
            </ul>
            <p className="pt-2">
              For more information, please review our Privacy Policy or contact our
              data protection officer.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}