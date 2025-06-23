// Dictionary-based spell checker using nspell
// @ts-ignore
import NSpell from 'nspell'

let spellChecker: any = null
let initPromise: Promise<any> | null = null

// Initialize spell checker (will be done on first use)
export async function initializeSpellChecker() {
  if (spellChecker) return spellChecker
  
  // Return existing initialization promise if already in progress
  if (initPromise) return initPromise

  initPromise = (async () => {
    try {
      // Fetch dictionary files
      const [affResponse, dicResponse] = await Promise.all([
        fetch('/dictionaries/en.aff'),
        fetch('/dictionaries/en.dic')
      ])
      
      if (!affResponse.ok || !dicResponse.ok) {
        throw new Error('Failed to load dictionary files')
      }
      
      const [affText, dicText] = await Promise.all([
        affResponse.text(),
        dicResponse.text()
      ])
      
      spellChecker = new NSpell(affText, dicText)
    
    // Add common technical/marketing terms that might not be in dictionary
    const customWords = [
      'API', 'APIs', 'SaaS', 'CTA', 'CTAs', 'SEO', 'ESP', 'ESPs',
      'HubSpot', 'Mailchimp', 'Salesforce', 'CRM', 'B2B', 'B2C',
      'webinar', 'webinars', 'blog', 'blogs', 'blogging', 'blogger',
      'email', 'emails', 'emailing', 'signup', 'signups', 'login',
      'onboarding', 'upsell', 'upselling', 'crosssell', 'crossselling',
      'analytics', 'metric', 'metrics', 'KPI', 'KPIs', 'ROI',
      'personalization', 'personalize', 'personalized',
      'MarketingQuill', 'Quill', 'copilot',
      // AI/Tech terms
      'AI', 'ML', 'LLM', 'LLMs', 'GPT', 'ChatGPT', 'OpenAI', 'NLP',
      'LinkedIn', 'Instagram', 'Facebook', 'Twitter', 'YouTube',
      'URL', 'URLs', 'PDF', 'CSV', 'JSON', 'XML', 'HTML', 'CSS',
      'JavaScript', 'TypeScript', 'Python', 'React', 'NextJS', 'NodeJS',
      'webhook', 'webhooks', 'API', 'SDK', 'OAuth', 'JWT', 'CORS',
      'async', 'sync', 'frontend', 'backend', 'fullstack', 'DevOps',
      'UI', 'UX', 'UX/UI', 'MVP', 'POC', 'QA', 'CI/CD'
    ]
    
    customWords.forEach(word => {
      spellChecker.add(word)
      // Also add lowercase version
      spellChecker.add(word.toLowerCase())
    })
    
      return spellChecker
    } catch (error) {
      console.error('Failed to initialize spell checker:', error)
      initPromise = null // Reset so it can be retried
      return null
    }
  })()
  
  return initPromise
}

export interface SpellError {
  word: string
  startIndex: number
  endIndex: number
  suggestions: string[]
}

// Check spelling of a text and return errors
export async function checkSpelling(text: string, personalDictionary: string[] = []): Promise<SpellError[]> {
  // Initialize if not already done
  if (!spellChecker) {
    await initializeSpellChecker()
  }
  
  if (!spellChecker) {
    console.warn('Spell checker not available')
    return []
  }
  
  const errors: SpellError[] = []
  
  // Split text into words while preserving positions
  // Match words (including contractions like "don't")
  const wordPattern = /\b[\w']+\b/g
  let match
  
  while ((match = wordPattern.exec(text)) !== null) {
    const word = match[0]
    const startIndex = match.index
    const endIndex = startIndex + word.length
    
    // Skip very short words (1-2 chars) and numbers
    if (word.length <= 2 || /^\d+$/.test(word)) {
      continue
    }
    
    // Skip words in personal dictionary
    if (personalDictionary.includes(word) || personalDictionary.includes(word.toLowerCase())) {
      continue
    }
    
    // Check if word is spelled correctly
    if (!spellChecker.correct(word)) {
      // Skip if it's a proper noun (starts with capital in middle of sentence)
      const prevChar = startIndex > 0 ? text[startIndex - 1] : '.'
      if (startIndex > 0 && /[A-Z]/.test(word[0]) && prevChar !== '.') {
        // Might be a proper noun, check if lowercase version is correct
        if (spellChecker.correct(word.toLowerCase())) {
          continue
        }
      }
      
      // Get suggestions
      const suggestions = spellChecker.suggest(word).slice(0, 5) // Limit to 5 suggestions
      
      errors.push({
        word,
        startIndex,
        endIndex,
        suggestions
      })
    }
  }
  
  return errors
}

// Check if a single word is spelled correctly
export async function isWordCorrect(word: string): Promise<boolean> {
  if (!spellChecker) {
    await initializeSpellChecker()
  }
  
  if (!spellChecker) return true // Assume correct if checker not available
  
  return spellChecker.correct(word)
}

// Get suggestions for a misspelled word
export async function getSuggestions(word: string): Promise<string[]> {
  if (!spellChecker) {
    await initializeSpellChecker()
  }
  
  if (!spellChecker) return []
  
  return spellChecker.suggest(word).slice(0, 5)
}