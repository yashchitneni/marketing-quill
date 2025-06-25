'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react'

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered LinkedIn Content
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              LinkedIn Content That{' '}
              <span className="text-indigo-600">Gets You Clients</span>
            </h1>
            
            <p className="text-xl text-gray-600">
              Stop posting generic content that gets ignored. Create authentic, 
              engaging LinkedIn posts that sound like you and attract your ideal 
              clients — in minutes, not hours.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>AI that learns your unique voice and expertise</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Hook optimization for maximum engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Strategic content planning tailored to your goals</span>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-gray-500">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
          
          {/* Right side - Product demo */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-sm border">
              <div className="bg-gray-100 p-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center text-xs text-gray-600">
                  LinkedIn Content Studio
                </div>
              </div>
              <div className="relative aspect-video bg-gray-900">
                {/* Placeholder for demo GIF */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white/60">Product Demo GIF</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50" />
          </div>
        </div>
      </div>
    </div>
  )
}