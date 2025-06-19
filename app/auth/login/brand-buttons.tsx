'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Chrome } from 'lucide-react'

interface BrandButtonsProps {
  onGoogleSignIn: () => void
  isLoading: boolean
}

export function BrandButtons({ onGoogleSignIn, isLoading }: BrandButtonsProps) {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={onGoogleSignIn}
        disabled={isLoading}
      >
        <Chrome className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </>
  )
} 