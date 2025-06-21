import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { OpenAI } from 'https://esm.sh/openai@4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalyzeRequest {
  text: string
  mode?: 'full' | 'streaming'
  model?: 'gpt-3.5-turbo' | 'gpt-4o'
  maxTokens?: number
}

interface Suggestion {
  text: string
  suggestion: string
  reason: string
  startIndex: number
  endIndex: number
  confidence: number
}

interface SuggestionResponse {
  grammar: Suggestion[]
  tone: Suggestion[]
  overallScore: number
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, mode = 'full', model = 'gpt-4o', maxTokens = 2000 } = await req.json() as AnalyzeRequest

    // Validate input
    if (!text || text.length < 10) {
      return new Response(
        JSON.stringify({ error: 'Text must be at least 10 characters long' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Initialize clients
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const openaiKey = Deno.env.get('OPENAI_API_KEY') ?? ''

    const supabase = createClient(supabaseUrl, supabaseKey)
    const openai = new OpenAI({ apiKey: openaiKey })

    // Skip server-side caching for now to debug the issue
    // const textHash = await hashText(text)

    // // Check cache first
    // const { data: cachedResult } = await supabase
    //   .from('suggestion_cache')
    //   .select('suggestions')
    //   .eq('text_hash', textHash)
    //   .single()

    // if (cachedResult) {
    //   // Update access timestamp and count
    //   await supabase
    //     .from('suggestion_cache')
    //     .update({
    //       accessed_at: new Date().toISOString(),
    //       access_count: supabase.rpc('increment', { row_id: cachedResult.id })
    //     })
    //     .eq('text_hash', textHash)

    //   return new Response(
    //     JSON.stringify(cachedResult.suggestions),
    //     { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    //   )
    // }

    // Prepare the system prompt - shorter for fast model
    const systemPrompt = model === 'gpt-3.5-turbo' 
      ? `You are a writing assistant. Analyze the text for grammar issues and basic style improvements. 
      IMPORTANT RULES:
      1. If you give a low score (below 70), you MUST provide at least 3 suggestions explaining why
      2. Look for typos like "Myba" (should be "Maybe"), "isue" (should be "issue")
      3. Check for grammar errors, clarity issues, and style improvements
      4. Be specific about what needs improvement`
      : `You are a professional writing assistant specialized in marketing copy. 
    Analyze the text for:
    1. Grammar issues (spelling, punctuation, syntax, typos like "Myba" instead of "Maybe", "isue" instead of "issue")
    2. Tone and style improvements (clarity, engagement, persuasiveness)
    3. Content structure and flow
    4. Word choice and phrasing
    
    For marketing copy, focus on:
    - Clear and compelling language
    - Active voice over passive voice
    - Concise, impactful sentences
    - Strong calls to action
    - Professional yet engaging tone
    - Specific over vague language
    
    IMPORTANT RULES:
    1. If your overallScore is below 70, you MUST provide at least 3-5 suggestions
    2. Always check for common typos: "Myba"→"Maybe", "isue"→"issue", etc.
    3. If the text has obvious errors, catch them
    4. Never give a low score without explaining why through suggestions
    
    Provide specific, actionable suggestions with exact text positions.`

    // Configure streaming based on mode
    if (mode === 'streaming') {
      // For streaming, we'll use a simpler approach with direct JSON response
      const completion = await openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt + '\n\nRespond with a JSON object containing grammar array, tone array, and overallScore number (0-100). Each suggestion must have: text, suggestion, reason, startIndex, endIndex, confidence.' },
          { role: 'user', content: `Analyze this text and find ALL errors including typos like "Myba" (should be "Maybe") and "isue" (should be "issue"). Text to analyze:\n\n"${text}"\n\nProvide the exact character positions (startIndex/endIndex) for each error.` }
        ],
        temperature: 0.3,
        max_tokens: maxTokens,
        response_format: { type: 'json_object' }
      })
      
      const result = JSON.parse(completion.choices[0].message.content || '{}') as SuggestionResponse
      
      // Validate and clean the result
      const cleanedResult = {
        grammar: (result.grammar || []).filter(s => 
          s.startIndex >= 0 && 
          s.endIndex <= text.length && 
          s.startIndex < s.endIndex
        ),
        tone: (result.tone || []).filter(s => 
          s.startIndex >= 0 && 
          s.endIndex <= text.length && 
          s.startIndex < s.endIndex
        ),
        overallScore: Math.max(0, Math.min(100, result.overallScore || 50))
      }
      
      // Skip caching for now
      // await supabase
      //   .from('suggestion_cache')
      //   .insert({
      //     text_hash: textHash,
      //     text_length: text.length,
      //     suggestions: cleanedResult
      //   })
      
      return new Response(
        JSON.stringify(cleanedResult),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Original function-based approach for non-streaming
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analyze this text and find ALL errors including typos. The text contains "Myba" (should be "Maybe") and "isue" (should be "issue"). Text: "${text}"` }
      ],
      functions: [
        {
          name: 'provide_suggestions',
          description: 'Provide grammar and tone suggestions for the text',
          parameters: {
            type: 'object',
            properties: {
              grammar: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    text: { type: 'string', description: 'The problematic text' },
                    suggestion: { type: 'string', description: 'The suggested replacement' },
                    reason: { type: 'string', description: 'Brief explanation of the issue' },
                    startIndex: { type: 'number', description: 'Start position in the text' },
                    endIndex: { type: 'number', description: 'End position in the text' },
                    confidence: { type: 'number', description: 'Confidence score 0-1' }
                  },
                  required: ['text', 'suggestion', 'reason', 'startIndex', 'endIndex', 'confidence']
                }
              },
              tone: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    text: { type: 'string', description: 'The text that could be improved' },
                    suggestion: { type: 'string', description: 'The improved version' },
                    reason: { type: 'string', description: 'Why this improves the tone' },
                    startIndex: { type: 'number', description: 'Start position in the text' },
                    endIndex: { type: 'number', description: 'End position in the text' },
                    confidence: { type: 'number', description: 'Confidence score 0-1' }
                  },
                  required: ['text', 'suggestion', 'reason', 'startIndex', 'endIndex', 'confidence']
                }
              },
              overallScore: {
                type: 'number',
                description: 'Overall quality score 0-100'
              }
            },
            required: ['grammar', 'tone', 'overallScore']
          }
        }
      ],
      function_call: { name: 'provide_suggestions' },
      temperature: 0.3,
      max_tokens: maxTokens
    })

    const result = JSON.parse(
      completion.choices[0].message.function_call?.arguments || '{}'
    ) as SuggestionResponse

    // Validate and clean the result
    const cleanedResult = {
      grammar: (result.grammar || []).filter(s => 
        s.startIndex >= 0 && 
        s.endIndex <= text.length && 
        s.startIndex < s.endIndex
      ),
      tone: (result.tone || []).filter(s => 
        s.startIndex >= 0 && 
        s.endIndex <= text.length && 
        s.startIndex < s.endIndex
      ),
      overallScore: Math.max(0, Math.min(100, result.overallScore || 50))
    }

    // Skip caching for now
    // await supabase
    //   .from('suggestion_cache')
    //   .insert({
    //     text_hash: textHash,
    //     text_length: text.length,
    //     suggestions: cleanedResult
    //   })

    return new Response(
      JSON.stringify(cleanedResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in analyze-text function:', error)
    return new Response(
      JSON.stringify({ error: 'An error occurred while analyzing the text' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

async function hashText(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}