'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Loader2, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BrandButtons } from './brand-buttons'

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, signInWithGoogle, isLoading, user } = useAuthStore()
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  // const next = searchParams.get('next') || '/dashboard'

  // Check for error parameter in URL
  useEffect(() => {
    const urlError = searchParams.get('error')
    if (urlError) {
      setError(
        urlError === 'callback_failed' 
          ? 'Authentication failed. Please try again.' 
          : urlError
      )
    }
  }, [searchParams])

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setMessage('')
    setError(null)
    
    try {
      const { error } = await signIn(values.email)
      
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email for the login link!')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Login error:', err)
    }
  }

  async function handleGoogleSignIn() {
    setMessage('')
    setError(null)
    
    try {
      console.log('Starting Google sign-in flow...')
      const { error } = await signInWithGoogle()
      
      if (error) {
        setError(error.message)
        console.error('Google sign-in error:', error)
      }
    } catch (err) {
      setError('An unexpected error occurred with Google sign-in. Please try again.')
      console.error('Google sign-in unexpected error:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to MarketingQuill</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {message && (
                <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
              )}
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending magic link...
                  </>
                ) : (
                  'Send magic link'
                )}
              </Button>
            </form>
          </Form>

          <BrandButtons onGoogleSignIn={handleGoogleSignIn} isLoading={isLoading} />

        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}