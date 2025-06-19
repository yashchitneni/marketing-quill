import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow SaaS',
    content: 'MarketingQuill has transformed how our team writes copy. The AI suggestions are spot-on, and we&apos;ve seen a 35% increase in email open rates.',
    rating: 5,
    image: '/testimonials/sarah.jpg'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Content Manager',
    company: 'CloudSync Inc',
    content: 'The subject line optimizer alone is worth the price. We&apos;re writing better copy in half the time, and our conversion rates have never been higher.',
    rating: 5,
    image: '/testimonials/michael.jpg'
  },
  {
    name: 'Emily Thompson',
    role: 'VP of Marketing',
    company: 'DataPro Solutions',
    content: 'Finally, an AI tool that understands SaaS marketing. The tone suggestions help us maintain consistency across all our content.',
    rating: 5,
    image: '/testimonials/emily.jpg'
  }
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Loved by Marketing Teams
          </h2>
          <p className="text-xl text-gray-600">
            See what marketing professionals are saying about MarketingQuill
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base italic">
                  &quot;{testimonial.content}&quot;
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}