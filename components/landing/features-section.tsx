import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Zap, 
  BarChart3, 
  Brain, 
  Clock, 
  Target,
  TrendingUp,
  Users,
  MessageSquare
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Voice-Matched Content',
    description: 'AI that learns your unique voice, expertise, and professional story to create authentic content that sounds exactly like you.',
    color: 'text-purple-600'
  },
  {
    icon: TrendingUp,
    title: 'Hook Optimization',
    description: 'Create scroll-stopping opening lines that grab attention and drive 3x more engagement on your LinkedIn posts.',
    color: 'text-indigo-600'
  },
  {
    icon: Target,
    title: 'Client-Focused Strategy',
    description: 'Generate content that speaks directly to your ideal clients&apos; pain points and positions you as the solution.',
    color: 'text-yellow-600'
  },
  {
    icon: MessageSquare,
    title: 'Engagement Templates',
    description: 'Proven post formats that encourage comments, shares, and meaningful conversations with potential clients.',
    color: 'text-green-600'
  },
  {
    icon: Clock,
    title: 'Content Calendar',
    description: 'Plan weeks of strategic LinkedIn content in minutes with AI-powered topic suggestions and scheduling.',
    color: 'text-blue-600'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track which content drives the most profile views, connection requests, and client conversations.',
    color: 'text-red-600'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Turn Your LinkedIn Into a Client Magnet
          </h2>
          <p className="text-xl text-gray-600">
            Everything consultants and professionals need to create LinkedIn content 
            that builds trust, demonstrates expertise, and attracts ideal clients.
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