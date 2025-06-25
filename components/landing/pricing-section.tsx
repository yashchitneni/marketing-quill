'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Test the waters',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: '5 LinkedIn posts per month', included: true },
      { name: 'Basic hook suggestions', included: true },
      { name: 'Voice learning (limited)', included: true },
      { name: 'LinkedIn best practices', included: true },
      { name: 'AI-powered editing', included: false },
      { name: 'Content calendar', included: false },
      { name: 'Performance analytics', included: false },
      { name: 'Priority support', included: false }
    ]
  },
  {
    name: 'Professional',
    description: 'For serious professionals',
    monthlyPrice: 47,
    yearlyPrice: 470,
    popular: true,
    features: [
      { name: 'Unlimited LinkedIn posts', included: true },
      { name: 'Advanced hook optimization', included: true },
      { name: 'Full voice matching AI', included: true },
      { name: 'Content calendar & scheduling', included: true },
      { name: 'Engagement analytics', included: true },
      { name: 'Client-focused templates', included: true },
      { name: 'Multiple voice profiles', included: false },
      { name: '1-on-1 strategy calls', included: false }
    ]
  },
  {
    name: 'Agency',
    description: 'For agencies & teams',
    monthlyPrice: 197,
    yearlyPrice: 1970,
    features: [
      { name: 'Everything in Professional', included: true },
      { name: 'Unlimited team members', included: true },
      { name: 'Client voice profiles', included: true },
      { name: 'White-label options', included: true },
      { name: 'Advanced analytics dashboard', included: true },
      { name: 'API access', included: true },
      { name: 'Monthly strategy calls', included: true },
      { name: 'Priority support', included: true }
    ]
  }
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Investment That Pays for Itself
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            One new client from LinkedIn covers an entire year. Most users see ROI within 30 days.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={`text-lg ${!isYearly ? 'font-semibold' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-indigo-600"
            />
            <span className={`text-lg ${isYearly ? 'font-semibold' : 'text-gray-500'}`}>
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-700">Save 20%</Badge>
            </span>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-indigo-600 shadow-xl' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600">/month</span>
                  {isYearly && plan.yearlyPrice > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Billed ${plan.yearlyPrice} yearly
                    </p>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <Link href="/auth/signup">
                  <Button 
                    className={`w-full mb-6 ${
                      plan.popular 
                        ? 'bg-indigo-600 hover:bg-indigo-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    {plan.monthlyPrice === 0 ? 'Start Free' : 'Start Free Trial'}
                  </Button>
                </Link>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? '' : 'text-gray-400'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}