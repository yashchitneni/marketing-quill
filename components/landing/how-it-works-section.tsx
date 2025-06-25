import { Card, CardContent } from '@/components/ui/card'
import { UserPlus, MessageSquareText, TrendingUp, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Tell Us About You',
    description: 'Share your expertise, career highlights, and ideal client profile. Our AI learns your unique voice and professional story.',
    number: '01'
  },
  {
    icon: Sparkles,
    title: 'Generate Authentic Content',
    description: 'Get personalized LinkedIn post ideas and drafts that sound exactly like you - no generic AI fluff.',
    number: '02'
  },
  {
    icon: MessageSquareText,
    title: 'Optimize & Publish',
    description: 'Fine-tune with our hook optimizer and engagement tips, then publish directly to LinkedIn.',
    number: '03'
  },
  {
    icon: TrendingUp,
    title: 'Watch Clients Come to You',
    description: 'Track engagement, build authority, and turn profile visitors into paying clients.',
    number: '04'
  }
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            From Crickets to Clients in 4 Simple Steps
          </h2>
          <p className="text-xl text-gray-600">
            Our proven system helps you build a LinkedIn presence that attracts 
            your ideal clients on autopilot.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100">
                  {step.number}
                </div>
                <step.icon className="h-10 w-10 text-indigo-600 mb-4 relative z-10" />
                <h3 className="text-xl font-semibold mb-2 relative z-10">{step.title}</h3>
                <p className="text-gray-600 relative z-10">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Join 5,000+ consultants who&apos;ve transformed their LinkedIn presence
          </p>
        </div>
      </div>
    </section>
  )
}