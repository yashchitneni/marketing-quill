import { analyzeLinkedInContent } from '../linkedin-analyzer'

describe('LinkedIn Content Analyzer', () => {
  it('should give high score for optimal content', () => {
    const content = `Have you ever wondered why some LinkedIn posts go viral while others barely get noticed?

After analyzing thousands of posts, I discovered the secret sauce. It's not about being perfect—it's about being authentic and providing value.

Here are 3 key lessons I learned:

1. Start with a hook that grabs attention
2. Share personal stories that resonate
3. Always end with a question to spark discussion

The best part? You don't need to be an influencer to succeed. You just need to be yourself and help others.

What's your biggest challenge with LinkedIn content? Let me know in the comments below! 👇

#LinkedInTips #ContentStrategy #PersonalBranding #ThoughtLeadership #ProfessionalGrowth`
    
    const analysis = analyzeLinkedInContent(content)
    
    expect(analysis.score).toBeGreaterThan(80)
    expect(analysis.isOptimalLength).toBe(true)
    expect(analysis.engagement.predicted).toBe('high')
    expect(analysis.hashtagSuggestions.length).toBeGreaterThan(0)
  })
  
  it('should identify content that needs improvement', () => {
    const content = 'Just posted something new on my website.'
    
    const analysis = analyzeLinkedInContent(content)
    
    expect(analysis.score).toBeLessThan(40)
    expect(analysis.isOptimalLength).toBe(false)
    expect(analysis.improvements.length).toBeGreaterThan(0)
    expect(analysis.engagement.predicted).toBe('low')
  })
  
  it('should suggest relevant hashtags', () => {
    const content = 'Excited to share my journey in artificial intelligence and machine learning!'
    
    const analysis = analyzeLinkedInContent(content)
    
    expect(analysis.hashtagSuggestions).toContain('#ArtificialIntelligence')
    expect(analysis.hashtagSuggestions).toContain('#MachineLearning')
  })
  
  it('should calculate reading time correctly', () => {
    // 200 words should take about 60 seconds to read
    const words = Array(200).fill('word').join(' ')
    const analysis = analyzeLinkedInContent(words)
    
    expect(analysis.readingTime).toBe(60)
  })
})