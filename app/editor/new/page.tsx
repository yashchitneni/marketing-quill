import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function NewEditorPage() {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  // Create a new draft - try without channel first
  const { data, error } = await supabase
    .from('drafts')
    .insert({
      user_id: user.id,
      title: 'Untitled LinkedIn Post',
      content: '',
      optimization_score: 0,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating draft:', JSON.stringify(error, null, 2))
    // Provide more context about the error
    console.error('User ID:', user.id)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    })
    redirect('/dashboard')
  }
  
  if (!data) {
    console.error('No data returned from draft creation')
    redirect('/dashboard')
  }
  
  // Redirect to the editor with the new draft ID
  redirect(`/editor/${data.id}`)
}