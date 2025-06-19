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
    name: 'Free',
    description: 'Perfect for trying out MarketingQuill',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: '3 drafts per month', included: true },
      { name: 'Basic grammar suggestions', included: true },
      { name: 'SEO hints', included: true },
      { name: 'Export to Markdown', included: true },
      { name: 'Subject line optimizer', included: false },
      { name: 'Advanced tone analysis', included: false },
      { name: 'Team collaboration', included: false },
      { name: 'Priority support', included: false }
    ]
  },
  {
    name: 'Pro',
    description: 'For marketing professionals',
    monthlyPrice: 29,
    yearlyPrice: 290,
    popular: true,
    features: [
      { name: 'Unlimited drafts', included: true },
      { name: 'Advanced grammar & style', included: true },
      { name: 'Full SEO analysis', included: true },
      { name: 'All export formats', included: true },
      { name: 'Subject line optimizer', included: true },
      { name: 'Advanced tone analysis', included: true },
      { name: 'Team collaboration', included: false },
      { name: 'Priority support', included: false }
    ]
  },
  {
    name: 'Team',
    description: 'For marketing teams',
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      { name: 'Everything in Pro', included: true },
      { name: 'Unlimited team members', included: true },
      { name: 'Team templates', included: true },
      { name: 'Brand voice profiles', included: true },
      { name: 'Analytics dashboard', included: true },
      { name: 'API access', included: true },
      { name: 'SSO authentication', included: true },
      { name: 'Dedicated support', included: true }
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
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