import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Zap, 
  BarChart3, 
  Brain, 
  Clock, 
  Shield,
  Globe
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Suggestions',
    description: 'Get intelligent grammar, style, and tone suggestions powered by GPT-4o with less than 2-second response time.',
    color: 'text-purple-600'
  },
  {
    icon: BarChart3,
    title: 'Subject Line Optimizer',
    description: 'Test multiple subject line variants and see predicted open rates before you send.',
    color: 'text-indigo-600'
  },
  {
    icon: Zap,
    title: 'Real-time Analysis',
    description: 'Instant feedback on readability, tone, and engagement potential as you write.',
    color: 'text-yellow-600'
  },
  {
    icon: Globe,
    title: 'SEO Optimization',
    description: 'Built-in SEO analysis for keyword density, meta descriptions, and content structure.',
    color: 'text-green-600'
  },
  {
    icon: Clock,
    title: 'Auto-save & Version History',
    description: 'Never lose your work with auto-save every 30 seconds and daily snapshots.',
    color: 'text-blue-600'
  },
  {
    icon: Shield,
    title: 'Compliance Checks',
    description: 'Ensure your copy meets industry standards and avoids problematic language.',
    color: 'text-red-600'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to Write Better Copy
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features designed specifically for SaaS marketing teams 
            to create compelling content that converts.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <feature.icon className={`h-10 w-10 mb-4 ${feature.color}`} />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}