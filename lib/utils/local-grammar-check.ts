// Local grammar and spell checking utilities
// Provides basic grammar checking when Edge Functions are unavailable

interface LocalSuggestion {
  text: string
  suggestion: string
  reason: string
  startIndex: number
  endIndex: number
  confidence: number
  type: 'grammar' | 'tone'
}

// Common typos and corrections
const commonTypos: Record<string, string> = {
  'teh': 'the',
  'recieve': 'receive',
  'occured': 'occurred',
  'seperate': 'separate',
  'definately': 'definitely',
  'untill': 'until',
  'wich': 'which',
  'alot': 'a lot',
  'thier': 'their',
  'wierd': 'weird',
  'freind': 'friend',
  'beleive': 'believe',
  'myba': 'maybe',
  'mayeb': 'maybe',
  'mabye': 'maybe',
  'mybe': 'maybe',
  'probalby': 'probably',
  'probaly': 'probably',
  'becuase': 'because',
  'beacuse': 'because',
  'tommorow': 'tomorrow',
  'tommorrow': 'tomorrow',
  'buisness': 'business',
  'bussiness': 'business',
  'adress': 'address',
  'calender': 'calendar',
  'embarass': 'embarrass',
  'grammer': 'grammar',
  'harass': 'harass',
  'neccessary': 'necessary',
  'noticable': 'noticeable',
  'occassion': 'occasion',
  'priviledge': 'privilege',
  'questionaire': 'questionnaire',
  'succesful': 'successful',
  'sucessful': 'successful',
  'transfered': 'transferred',
  'writting': 'writing',
  'arguement': 'argument',
  'commited': 'committed',
  'equiped': 'equipped',
  'refered': 'referred',
  'submited': 'submitted',
  'isue': 'issue',
  'isues': 'issues'
}

// Grammar pattern checks
const grammarPatterns = [
  {
    pattern: /\b(a)\s+([aeiou])/gi,
    suggestion: (match: RegExpMatchArray) => match[0].replace(/^a\s/, 'an '),
    reason: 'Use "an" before words starting with vowel sounds'
  },
  {
    pattern: /\b(an)\s+([bcdfghjklmnpqrstvwxyz])/gi,
    suggestion: (match: RegExpMatchArray) => match[0].replace(/^an\s/, 'a '),
    reason: 'Use "a" before words starting with consonant sounds'
  },
  {
    pattern: /\s{2,}/g,
    suggestion: () => ' ',
    reason: 'Remove extra spaces'
  },
  {
    pattern: /([.!?])\s*([a-z])/g,
    suggestion: (match: RegExpMatchArray) => match[1] + ' ' + match[2].toUpperCase(),
    reason: 'Capitalize first letter of sentence'
  },
  {
    pattern: /\b(your)\s+(a|an|the)\s+(\w+ing)\b/gi,
    suggestion: (match: RegExpMatchArray) => `you're ${match[2]} ${match[3]}`,
    reason: 'Use "you\'re" (you are) instead of "your" before a verb'
  },
  {
    pattern: /\b(there)\s+(a|an|the)\s+(\w+ing)\b/gi,
    suggestion: (match: RegExpMatchArray) => `they're ${match[2]} ${match[3]}`,
    reason: 'Use "they\'re" (they are) instead of "there"'
  },
  {
    pattern: /\b(its)\s+(a|an|the|very|really|quite|extremely)\b/gi,
    suggestion: (match: RegExpMatchArray) => `it's ${match[2]}`,
    reason: 'Use "it\'s" (it is) instead of "its" before an article or adverb'
  }
]

// Style and tone improvements
const stylePatterns = [
  {
    pattern: /\b(very|really|quite|extremely)\s+(\w+)/gi,
    suggestion: (match: RegExpMatchArray) => {
      const intensifiers: Record<string, Record<string, string>> = {
        'very': {
          'good': 'excellent',
          'bad': 'terrible',
          'big': 'enormous',
          'small': 'tiny',
          'happy': 'delighted',
          'sad': 'miserable',
          'important': 'crucial',
          'interesting': 'fascinating'
        }
      }
      const word = match[2].toLowerCase()
      const replacement = intensifiers[match[1].toLowerCase()]?.[word]
      return replacement || match[0]
    },
    reason: 'Consider using a stronger adjective instead of an intensifier',
    skipIfNoChange: true
  },
  {
    pattern: /\b(in order to)\b/gi,
    suggestion: () => 'to',
    reason: 'Simplify "in order to" to just "to"'
  },
  {
    pattern: /\b(due to the fact that)\b/gi,
    suggestion: () => 'because',
    reason: 'Simplify "due to the fact that" to "because"'
  },
  {
    pattern: /\b(at this point in time|at the present time)\b/gi,
    suggestion: () => 'now',
    reason: 'Simplify to "now" or "currently"'
  }
]

export function performLocalGrammarCheck(text: string): LocalSuggestion[] {
  const suggestions: LocalSuggestion[] = []
  
  // Check for common typos
  const words = text.match(/\b\w+\b/g) || []
  words.forEach(word => {
    const lowerWord = word.toLowerCase()
    if (commonTypos[lowerWord]) {
      const index = text.lastIndexOf(word)
      if (index !== -1) {
        // Preserve the original case
        const correction = commonTypos[lowerWord]
        const correctedWord = word[0] === word[0].toUpperCase() 
          ? correction[0].toUpperCase() + correction.slice(1)
          : correction
          
        suggestions.push({
          text: word,
          suggestion: correctedWord,
          reason: 'Common misspelling',
          startIndex: index,
          endIndex: index + word.length,
          confidence: 0.95,
          type: 'grammar'
        })
      }
    }
  })
  
  // Check grammar patterns
  grammarPatterns.forEach(({ pattern, suggestion, reason }) => {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const suggestionText = suggestion(match)
      if (suggestionText !== match[0]) {
        suggestions.push({
          text: match[0],
          suggestion: suggestionText,
          reason,
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          confidence: 0.8,
          type: 'grammar'
        })
      }
    }
  })
  
  // Check style patterns
  stylePatterns.forEach(({ pattern, suggestion, reason, skipIfNoChange }) => {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const suggestionText = suggestion(match)
      if (!skipIfNoChange || suggestionText !== match[0]) {
        suggestions.push({
          text: match[0],
          suggestion: suggestionText,
          reason,
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          confidence: 0.7,
          type: 'tone'
        })
      }
    }
  })
  
  // Check for missing punctuation at end
  if (text.length > 20 && !/[.!?]$/.test(text.trim())) {
    suggestions.push({
      text: text.slice(-1),
      suggestion: text.slice(-1) + '.',
      reason: 'Consider adding punctuation at the end',
      startIndex: text.length - 1,
      endIndex: text.length,
      confidence: 0.6,
      type: 'grammar'
    })
  }
  
  // Check for repeated words
  const repeatedWordPattern = /\b(\w+)\s+\1\b/gi
  let match
  while ((match = repeatedWordPattern.exec(text)) !== null) {
    const word = match[1]
    if (word.toLowerCase() !== 'that' && word.toLowerCase() !== 'had') { // Some repeated words are valid
      suggestions.push({
        text: match[0],
        suggestion: word,
        reason: 'Remove repeated word',
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        confidence: 0.85,
        type: 'grammar'
      })
    }
  }
  
  // Sort by position and remove overlapping suggestions
  return suggestions
    .sort((a, b) => a.startIndex - b.startIndex)
    .filter((suggestion, index, array) => {
      if (index === 0) return true
      const prev = array[index - 1]
      return suggestion.startIndex >= prev.endIndex
    })
}

export function calculateLocalScore(text: string, suggestions: LocalSuggestion[]): number {
  const wordCount = (text.match(/\b\w+\b/g) || []).length
  if (wordCount === 0) return 100
  
  // Base score starts at 100
  let score = 100
  
  // Deduct points based on errors found
  suggestions.forEach(suggestion => {
    if (suggestion.type === 'grammar') {
      score -= suggestion.confidence > 0.8 ? 5 : 3
    } else {
      score -= suggestion.confidence > 0.7 ? 2 : 1
    }
  })
  
  // Ensure score stays within bounds
  return Math.max(0, Math.min(100, score))
}