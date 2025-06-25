import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Management Consultant',
    company: 'Chen Advisory',
    content: 'In 3 months, I went from 500 to 8,000 followers and booked 4 new enterprise clients. The AI captures my voice perfectly - my connections think I&apos;m writing everything myself!',
    rating: 5,
    image: '/testimonials/sarah.jpg'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Executive Coach',
    company: 'Peak Performance Partners',
    content: 'I was skeptical about AI content, but this tool actually makes me sound MORE authentic. My engagement rates are up 400% and I&apos;m getting 3-5 qualified leads per week.',
    rating: 5,
    image: '/testimonials/michael.jpg'
  },
  {
    name: 'Emily Thompson',
    role: 'Strategy Consultant',
    company: 'Thompson Strategic',
    content: 'Game changer. I used to spend hours on LinkedIn content. Now I create a week&apos;s worth in 30 minutes, and it performs better than anything I wrote myself.',
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
            Trusted by Top Consultants & Professionals
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands who are turning LinkedIn into their #1 client acquisition channel
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