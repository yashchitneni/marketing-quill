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

// Create a hash of the text for caching
async function hashText(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
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

    // Generate hash for caching
    const textHash = await hashText(text)

    // Check cache first
    const { data: cachedResult } = await supabase
      .from('suggestion_cache')
      .select('*')
      .eq('text_hash', textHash)
      .single()

    if (cachedResult && cachedResult.suggestions) {
      // Update access timestamp
      await supabase
        .from('suggestion_cache')
        .update({
          accessed_at: new Date().toISOString(),
          access_count: (cachedResult.access_count || 0) + 1
        })
        .eq('text_hash', textHash)

      return new Response(
        JSON.stringify(cachedResult.suggestions),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Prepare the system prompt - focus on advanced writing improvements
    const systemPrompt = model === 'gpt-3.5-turbo' 
      ? `You are a writing improvement assistant. Focus on clarity and engagement.
      
      IMPORTANT: Basic spelling is handled separately. Focus ONLY on:
      - Grammar and sentence structure
      - Clarity and conciseness
      - Basic tone improvements
      - Removing redundancy
      
      Do NOT flag spelling errors unless they create grammar issues.
      Provide 2-3 actionable improvements for better writing.`
      : `You are an expert marketing copy optimizer for SaaS companies.
    
    IMPORTANT: Basic spelling is handled separately. Focus on HIGH-VALUE improvements:
    
    MARKETING COPY OPTIMIZATION:
    1. Persuasiveness and emotional appeal
    2. Strong calls-to-action (CTAs)
    3. Benefits over features
    4. Social proof and urgency
    5. Scannable formatting suggestions
    
    TONE & VOICE:
    - Professional yet conversational
    - Active voice preferred
    - Power words for impact
    - Avoid jargon unless necessary
    
    ENGAGEMENT METRICS:
    - Subject line effectiveness (for emails)
    - Hook strength (first 2 sentences)
    - Value proposition clarity
    - Reader action guidance
    
    Target: B2B SaaS marketing managers writing emails, blogs, and landing pages.
    Score based on marketing effectiveness, not just grammar.`

    // Configure streaming based on mode
    if (mode === 'streaming') {
      // For streaming, we'll use a simpler approach with direct JSON response
      const completion = await openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt + '\n\nRespond with a JSON object containing grammar array, tone array, and overallScore number (0-100). Each suggestion must have: text, suggestion, reason, startIndex, endIndex, confidence.' },
          { role: 'user', content: `Analyze this marketing copy for improvements. Focus on tone, persuasiveness, and clarity.\n\nText to analyze:\n"${text}"\n\nProvide specific suggestions with exact positions (startIndex/endIndex). Focus on marketing effectiveness.` }
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
      
      // Cache the result
      await supabase
        .from('suggestion_cache')
        .insert({
          text_hash: textHash,
          text_length: text.length,
          suggestions: cleanedResult,
          created_at: new Date().toISOString(),
          accessed_at: new Date().toISOString(),
          access_count: 1
        })
        .onConflict('text_hash')
      
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
        { role: 'user', content: `Analyze this content for marketing effectiveness and writing quality. Text: "${text}"` }
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

    // Cache the result
    await supabase
      .from('suggestion_cache')
      .insert({
        text_hash: textHash,
        text_length: text.length,
        suggestions: cleanedResult,
        created_at: new Date().toISOString(),
        accessed_at: new Date().toISOString(),
        access_count: 1
      })
      .onConflict('text_hash')

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