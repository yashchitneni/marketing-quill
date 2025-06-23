import { linkedInTemplates } from '@/lib/data/linkedin-templates'

export interface LinkedInAnalysis {
  score: number // 0-100
  characterCount: number
  isOptimalLength: boolean
  readingTime: number // in seconds
  hashtagSuggestions: string[]
  bestPostTime: {
    day: string
    time: string
    timezone: string
  }
  engagement: {
    predicted: 'low' | 'medium' | 'high' | 'viral'
    factors: string[]
  }
  improvements: string[]
}

// LinkedIn best practices
const OPTIMAL_CHAR_MIN = 1000
const OPTIMAL_CHAR_MAX = 1300
const MAX_HASHTAGS = 5
const MIN_HASHTAGS = 3

// High-engagement keywords and phrases
const POWER_WORDS = [
  'learned', 'discovered', 'realized', 'breakthrough', 'transformed',
  'game-changer', 'insights', 'lessons', 'journey', 'growth',
  'success', 'failure', 'mistake', 'achievement', 'milestone',
  'grateful', 'thankful', 'excited', 'proud', 'humbled',
  'announcing', 'launching', 'building', 'shipped', 'achieved'
]

const QUESTION_STARTERS = [
  'what', 'why', 'how', 'when', 'where', 'who',
  'have you ever', 'do you think', 'what if'
]

const ENGAGEMENT_TRIGGERS = [
  'agree?', 'thoughts?', 'what do you think?', 'let me know',
  'comment below', 'share your', 'tell me', 'curious to hear'
]

// Industry-specific hashtags
const INDUSTRY_HASHTAGS: Record<string, string[]> = {
  tech: ['#TechInnovation', '#SoftwareDevelopment', '#TechTrends', '#DigitalTransformation', '#TechLeadership'],
  marketing: ['#MarketingStrategy', '#DigitalMarketing', '#ContentMarketing', '#MarketingTips', '#GrowthMarketing'],
  sales: ['#SalesStrategy', '#B2BSales', '#SalesLeadership', '#SalesGrowth', '#SalesTips'],
  leadership: ['#Leadership', '#LeadershipDevelopment', '#LeadershipMatters', '#ThoughtLeadership', '#ExecutiveLeadership'],
  career: ['#CareerGrowth', '#CareerDevelopment', '#CareerAdvice', '#ProfessionalDevelopment', '#CareerSuccess'],
  entrepreneurship: ['#Entrepreneurship', '#StartupLife', '#BusinessGrowth', '#Founders', '#StartupSuccess'],
  productivity: ['#Productivity', '#TimeManagement', '#WorkLifeBalance', '#ProductivityTips', '#Efficiency'],
  ai: ['#ArtificialIntelligence', '#MachineLearning', '#AIInnovation', '#FutureOfWork', '#AITransformation']
}

export function analyzeLinkedInContent(content: string): LinkedInAnalysis {
  const characterCount = content.length
  const words = content.split(/\s+/).filter(word => word.length > 0)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0)
  
  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.ceil((words.length / 200) * 60)
  
  // Check optimal length
  const isOptimalLength = characterCount >= OPTIMAL_CHAR_MIN && characterCount <= OPTIMAL_CHAR_MAX
  
  // Generate hashtag suggestions
  const hashtagSuggestions = generateHashtagSuggestions(content)
  
  // Determine best post time
  const bestPostTime = calculateBestPostTime()
  
  // Analyze engagement potential
  const engagement = analyzeEngagementPotential(content, words, sentences, paragraphs)
  
  // Calculate overall score
  const score = calculateLinkedInScore({
    characterCount,
    isOptimalLength,
    hashtagCount: (content.match(/#\w+/g) || []).length,
    engagement,
    hasHook: hasStrongHook(sentences[0] || ''),
    hasCallToAction: hasCallToAction(content),
    readability: calculateReadability(words, sentences),
    formatting: analyzeFormatting(content)
  })
  
  // Generate improvements
  const improvements = generateImprovements({
    characterCount,
    isOptimalLength,
    hashtagCount: (content.match(/#\w+/g) || []).length,
    engagement,
    hasHook: hasStrongHook(sentences[0] || ''),
    hasCallToAction: hasCallToAction(content),
    paragraphs: paragraphs.length,
    sentences: sentences.length
  })
  
  return {
    score,
    characterCount,
    isOptimalLength,
    readingTime,
    hashtagSuggestions,
    bestPostTime,
    engagement,
    improvements
  }
}

function generateHashtagSuggestions(content: string): string[] {
  const contentLower = content.toLowerCase()
  const suggestions = new Set<string>()
  
  // Find relevant industry hashtags
  Object.entries(INDUSTRY_HASHTAGS).forEach(([industry, hashtags]) => {
    if (contentLower.includes(industry) || 
        hashtags.some(tag => contentLower.includes(tag.toLowerCase().replace('#', '')))) {
      hashtags.slice(0, 2).forEach(tag => suggestions.add(tag))
    }
  })
  
  // Add trending general hashtags based on content
  if (contentLower.includes('monday') || contentLower.includes('week')) {
    suggestions.add('#MondayMotivation')
  }
  if (contentLower.includes('tip') || contentLower.includes('advice')) {
    suggestions.add('#TipTuesday')
  }
  if (contentLower.includes('learn') || contentLower.includes('lesson')) {
    suggestions.add('#LearningAndDevelopment')
  }
  if (contentLower.includes('network') || contentLower.includes('connect')) {
    suggestions.add('#Networking')
  }
  
  // Add LinkedIn-specific hashtags
  suggestions.add('#LinkedInCommunity')
  
  return Array.from(suggestions).slice(0, MAX_HASHTAGS)
}

function calculateBestPostTime(): { day: string; time: string; timezone: string } {
  // Based on LinkedIn engagement data
  const bestTimes = [
    { day: 'Tuesday', time: '10:00 AM', timezone: 'EST' },
    { day: 'Wednesday', time: '11:00 AM', timezone: 'EST' },
    { day: 'Thursday', time: '10:00 AM', timezone: 'EST' },
    { day: 'Tuesday', time: '2:00 PM', timezone: 'EST' },
    { day: 'Wednesday', time: '3:00 PM', timezone: 'EST' }
  ]
  
  // Get current day and suggest next best time
  const now = new Date()
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' })
  const currentHour = now.getHours()
  
  // Find next best time
  let bestTime = bestTimes[0]
  for (const time of bestTimes) {
    if (time.day === currentDay && parseInt(time.time) > currentHour) {
      bestTime = time
      break
    }
  }
  
  return bestTime
}

function analyzeEngagementPotential(
  content: string, 
  words: string[], 
  sentences: string[],
  paragraphs: string[]
): { predicted: 'low' | 'medium' | 'high' | 'viral'; factors: string[] } {
  const factors: string[] = []
  let score = 0
  
  // Check for power words
  const powerWordCount = words.filter(word => 
    POWER_WORDS.includes(word.toLowerCase())
  ).length
  if (powerWordCount > 3) {
    factors.push('Uses engaging power words')
    score += 20
  }
  
  // Check for questions
  const hasQuestion = QUESTION_STARTERS.some(starter => 
    content.toLowerCase().includes(starter)
  ) || content.includes('?')
  if (hasQuestion) {
    factors.push('Contains questions to spark discussion')
    score += 15
  }
  
  // Check for call to action
  const hasCTA = ENGAGEMENT_TRIGGERS.some(trigger => 
    content.toLowerCase().includes(trigger)
  )
  if (hasCTA) {
    factors.push('Has clear call-to-action')
    score += 15
  }
  
  // Check for storytelling elements
  const hasStory = content.toLowerCase().includes('story') || 
                   content.toLowerCase().includes('once') ||
                   content.toLowerCase().includes('remember when')
  if (hasStory) {
    factors.push('Uses storytelling')
    score += 20
  }
  
  // Check formatting
  if (paragraphs.length >= 3 && paragraphs.length <= 5) {
    factors.push('Well-formatted with good paragraph breaks')
    score += 10
  }
  
  // Check for personal touch
  const hasPersonal = content.includes('I ') || content.includes('my ') || 
                      content.includes('me ') || content.includes("I'")
  if (hasPersonal) {
    factors.push('Personal and authentic tone')
    score += 10
  }
  
  // Check for value proposition
  const hasValue = content.toLowerCase().includes('tip') || 
                   content.toLowerCase().includes('lesson') ||
                   content.toLowerCase().includes('how to') ||
                   content.toLowerCase().includes('guide')
  if (hasValue) {
    factors.push('Provides clear value')
    score += 10
  }
  
  // Determine engagement level
  let predicted: 'low' | 'medium' | 'high' | 'viral'
  if (score >= 80) predicted = 'viral'
  else if (score >= 60) predicted = 'high'
  else if (score >= 40) predicted = 'medium'
  else predicted = 'low'
  
  return { predicted, factors }
}

function hasStrongHook(firstSentence: string): boolean {
  if (!firstSentence) return false
  
  const hookPatterns = [
    /^(Did you know|Have you ever|What if|Imagine|Remember when)/i,
    /^\d+/,  // Starts with number
    /^(Stop|Don't|Never|Always)/i,
    /\?$/,   // Ends with question
    /!$/     // Ends with exclamation
  ]
  
  return hookPatterns.some(pattern => pattern.test(firstSentence.trim()))
}

function hasCallToAction(content: string): boolean {
  return ENGAGEMENT_TRIGGERS.some(trigger => 
    content.toLowerCase().includes(trigger)
  )
}

function calculateReadability(words: string[], sentences: string[]): number {
  if (sentences.length === 0) return 0
  
  const avgWordsPerSentence = words.length / sentences.length
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length
  
  // Simple readability score (lower is better)
  const readabilityScore = avgWordsPerSentence * avgWordLength
  
  // Convert to 0-100 scale (inverse)
  return Math.max(0, Math.min(100, 100 - readabilityScore * 2))
}

function analyzeFormatting(content: string): number {
  let score = 0
  
  // Check for line breaks
  if (content.includes('\n\n')) score += 25
  
  // Check for bullet points or numbered lists
  if (content.match(/^[\d•\-\*]/m)) score += 25
  
  // Check for emojis (but not too many)
  const emojiCount = (content.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length
  if (emojiCount > 0 && emojiCount <= 5) score += 25
  
  // Check for proper capitalization
  if (/^[A-Z]/.test(content.trim())) score += 25
  
  return score
}

function calculateLinkedInScore(factors: {
  characterCount: number
  isOptimalLength: boolean
  hashtagCount: number
  engagement: { predicted: string }
  hasHook: boolean
  hasCallToAction: boolean
  readability: number
  formatting: number
}): number {
  let score = 0
  
  // Length score (30 points max)
  if (factors.isOptimalLength) {
    score += 30
  } else if (factors.characterCount >= 500 && factors.characterCount <= 2000) {
    score += 20
  } else if (factors.characterCount >= 100) {
    score += 10
  }
  
  // Hashtag score (10 points max)
  if (factors.hashtagCount >= MIN_HASHTAGS && factors.hashtagCount <= MAX_HASHTAGS) {
    score += 10
  } else if (factors.hashtagCount > 0) {
    score += 5
  }
  
  // Engagement score (20 points max)
  switch (factors.engagement.predicted) {
    case 'viral': score += 20; break
    case 'high': score += 15; break
    case 'medium': score += 10; break
    case 'low': score += 5; break
  }
  
  // Hook score (10 points max)
  if (factors.hasHook) score += 10
  
  // CTA score (10 points max)
  if (factors.hasCallToAction) score += 10
  
  // Readability score (10 points max)
  score += Math.floor(factors.readability / 10)
  
  // Formatting score (10 points max)
  score += Math.floor(factors.formatting / 10)
  
  return Math.min(100, Math.max(0, score))
}

function generateImprovements(factors: {
  characterCount: number
  isOptimalLength: boolean
  hashtagCount: number
  engagement: { predicted: string }
  hasHook: boolean
  hasCallToAction: boolean
  paragraphs: number
  sentences: number
}): string[] {
  const improvements: string[] = []
  
  // Length improvements
  if (!factors.isOptimalLength) {
    if (factors.characterCount < OPTIMAL_CHAR_MIN) {
      improvements.push(`Add ${OPTIMAL_CHAR_MIN - factors.characterCount} more characters for optimal engagement`)
    } else if (factors.characterCount > OPTIMAL_CHAR_MAX) {
      improvements.push(`Reduce by ${factors.characterCount - OPTIMAL_CHAR_MAX} characters for better readability`)
    }
  }
  
  // Hashtag improvements
  if (factors.hashtagCount < MIN_HASHTAGS) {
    improvements.push(`Add ${MIN_HASHTAGS - factors.hashtagCount} more relevant hashtags`)
  } else if (factors.hashtagCount > MAX_HASHTAGS) {
    improvements.push(`Remove ${factors.hashtagCount - MAX_HASHTAGS} hashtags (5 max recommended)`)
  }
  
  // Hook improvements
  if (!factors.hasHook) {
    improvements.push('Start with a question, statistic, or bold statement to grab attention')
  }
  
  // CTA improvements
  if (!factors.hasCallToAction) {
    improvements.push('Add a call-to-action to encourage engagement (e.g., "What do you think?")')
  }
  
  // Formatting improvements
  if (factors.paragraphs < 3) {
    improvements.push('Break content into more paragraphs for better readability')
  }
  
  if (factors.sentences > 10 && factors.paragraphs < 4) {
    improvements.push('Add more line breaks between ideas')
  }
  
  // Engagement improvements
  if (factors.engagement.predicted === 'low' || factors.engagement.predicted === 'medium') {
    improvements.push('Add a personal story or specific example to increase authenticity')
  }
  
  return improvements.slice(0, 5) // Return top 5 improvements
}