// LinkedIn-specific suggestion patterns and rules

export interface LinkedInSuggestion {
  type: 'hook' | 'structure' | 'engagement' | 'algorithm' | 'visual'
  text: string
  suggestion: string
  reason: string
  startIndex: number
  endIndex: number
  confidence: number
  urgency: 'high' | 'medium' | 'low'
}

// Engagement bait patterns that LinkedIn penalizes
const engagementBaitPatterns = [
  {
    pattern: /\b(like|react)\s+(if|this|my|the)\s+(you|post|content)/gi,
    reason: 'LinkedIn penalizes "Like if..." engagement bait',
    suggestion: 'Remove engagement bait and let content earn reactions naturally'
  },
  {
    pattern: /\b(follow|connect)\s+(me|with me|for more)/gi,
    reason: 'Direct follow requests are penalized by the algorithm',
    suggestion: 'Build value first, connections will follow naturally'
  },
  {
    pattern: /\b(share|repost)\s+(if|this|to|with)/gi,
    reason: 'Share requests reduce organic reach',
    suggestion: 'Create share-worthy content instead of asking'
  },
  {
    pattern: /\b(agree|disagree)\??\s*\n*\s*(comment|let me know|thoughts\??)/gi,
    reason: 'Generic engagement prompts are less effective',
    suggestion: 'Ask specific, thought-provoking questions instead'
  }
]

// Hook effectiveness patterns
const weakHookPatterns = [
  {
    pattern: /^(Hi|Hello|Hey)\s+(everyone|all|LinkedIn|connections|network)/i,
    reason: 'Generic greetings waste valuable hook space',
    suggestion: 'Start with a bold statement, question, or statistic'
  },
  {
    pattern: /^(I want to|I'd like to|I'm going to)\s+(share|talk about|discuss)/i,
    reason: 'Announcing intent delays the value proposition',
    suggestion: 'Jump straight into the value or story'
  },
  {
    pattern: /^(Today|This morning|Yesterday|Last week)/i,
    reason: 'Time references are weak hooks unless tied to relevance',
    suggestion: 'Lead with the insight, not the timeline'
  }
]

// Professional jargon that reduces authenticity
const jargonPatterns = [
  {
    pattern: /\b(synergy|leverage|paradigm|disrupt|ideate|circle back|deep dive|low-hanging fruit)\b/gi,
    reason: 'Corporate jargon reduces authenticity and readability',
    suggestion: 'Use simple, clear language'
  },
  {
    pattern: /\b(cutting-edge|game-changer|revolutionary|groundbreaking|innovative)\b/gi,
    reason: 'Overused buzzwords dilute your message',
    suggestion: 'Show innovation through specific examples'
  }
]

// Structure patterns for better readability
const structurePatterns = [
  {
    pattern: /^.{150,}$/m, // Paragraphs over 150 characters
    reason: 'Long paragraphs hurt mobile readability',
    suggestion: 'Break into shorter paragraphs or use line breaks'
  },
  {
    pattern: /^(?!.*\n\n).{500,}/gs, // 500+ chars without paragraph break
    reason: 'Dense text blocks reduce engagement',
    suggestion: 'Add white space with paragraph breaks'
  }
]

export function analyzeLinkedInContent(text: string): LinkedInSuggestion[] {
  const suggestions: LinkedInSuggestion[] = []
  
  // Check hook effectiveness (first 150 characters)
  const firstLine = text.substring(0, 150)
  weakHookPatterns.forEach(({ pattern, reason, suggestion }) => {
    const match = firstLine.match(pattern)
    if (match) {
      suggestions.push({
        type: 'hook',
        text: match[0],
        suggestion: suggestion,
        reason: reason,
        startIndex: match.index || 0,
        endIndex: (match.index || 0) + match[0].length,
        confidence: 0.9,
        urgency: 'high'
      })
    }
  })
  
  // Check for engagement bait
  engagementBaitPatterns.forEach(({ pattern, reason, suggestion }) => {
    let match
    while ((match = pattern.exec(text)) !== null) {
      suggestions.push({
        type: 'algorithm',
        text: match[0],
        suggestion: suggestion,
        reason: reason,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        confidence: 0.95,
        urgency: 'high'
      })
    }
  })
  
  // Check for jargon
  jargonPatterns.forEach(({ pattern, reason, suggestion }) => {
    let match
    while ((match = pattern.exec(text)) !== null) {
      suggestions.push({
        type: 'engagement',
        text: match[0],
        suggestion: suggestion,
        reason: reason,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        confidence: 0.8,
        urgency: 'medium'
      })
    }
  })
  
  // Check structure
  const lines = text.split('\n')
  let currentIndex = 0
  
  lines.forEach((line, index) => {
    if (line.length > 150 && !line.includes('\n')) {
      suggestions.push({
        type: 'structure',
        text: line.substring(0, 50) + '...',
        suggestion: 'Break this into 2-3 shorter lines',
        reason: 'Long lines hurt mobile readability',
        startIndex: currentIndex,
        endIndex: currentIndex + line.length,
        confidence: 0.85,
        urgency: 'medium'
      })
    }
    currentIndex += line.length + 1 // +1 for newline
  })
  
  // Check for "See more" optimization
  const seeMoreBreak = calculateSeeMorePosition(text)
  if (seeMoreBreak < 200 && text.length > 300) {
    const beforeBreak = text.substring(0, seeMoreBreak)
    if (!beforeBreak.match(/[?!.]$/) && !beforeBreak.includes(':')) {
      suggestions.push({
        type: 'hook',
        text: 'First visible section',
        suggestion: 'Add a complete thought or cliffhanger before "See more"',
        reason: '"See more" appears mid-sentence, reducing click-through',
        startIndex: 0,
        endIndex: seeMoreBreak,
        confidence: 0.9,
        urgency: 'high'
      })
    }
  }
  
  // Suggest visual content for long posts
  if (text.length > 800 && !text.includes('[Image]') && !text.includes('[image]')) {
    suggestions.push({
      type: 'visual',
      text: 'Long text post',
      suggestion: 'Consider adding an image or creating a carousel',
      reason: 'Visual posts get 2x more engagement',
      startIndex: 0,
      endIndex: 0,
      confidence: 0.75,
      urgency: 'low'
    })
  }
  
  // Check for missing CTA
  const lastParagraph = text.split('\n').filter(p => p.trim()).pop() || ''
  const hasCTA = lastParagraph.match(/\?|what do you|how do you|share your|let me know/i)
  if (!hasCTA && text.length > 200) {
    suggestions.push({
      type: 'engagement',
      text: lastParagraph.substring(0, 50) + '...',
      suggestion: 'End with a question to encourage comments',
      reason: 'Posts with questions get 50% more comments',
      startIndex: text.lastIndexOf(lastParagraph),
      endIndex: text.length,
      confidence: 0.7,
      urgency: 'low'
    })
  }
  
  return suggestions
}

function calculateSeeMorePosition(text: string): number {
  // LinkedIn shows approximately 210-240 characters before "See more"
  // But it's actually based on lines, not just characters
  const lines = text.split('\n')
  let charCount = 0
  let lineCount = 0
  
  for (const line of lines) {
    if (lineCount >= 3) break // LinkedIn shows ~3 lines
    charCount += line.length + 1
    lineCount++
  }
  
  return Math.min(charCount, 240)
}

// Positive patterns to encourage
export const linkedInBestPractices = {
  hooks: [
    'Start with a question',
    'Open with a surprising statistic',
    'Lead with a personal story',
    'Make a bold statement',
    'Challenge conventional wisdom'
  ],
  structure: [
    'Use short paragraphs (2-3 lines max)',
    'Add line breaks for mobile readers',
    'Include 1-5 relevant hashtags at the end',
    'Format lists with emojis or bullets',
    'Create white space for scannability'
  ],
  engagement: [
    'End with an open-ended question',
    'Share a personal lesson learned',
    'Include specific examples',
    'Use "you" to speak directly to readers',
    'Tell stories with conflict and resolution'
  ],
  visual: [
    'Add images for posts over 500 characters',
    'Use carousels for step-by-step content',
    'Include screenshots for tutorials',
    'Create simple graphics for key points',
    'Use native LinkedIn document uploads'
  ]
}