# Setting Up OpenAI Integration

To enable the text analysis features, you need to:

## 1. Get an OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key (it starts with `sk-`)

## 2. Deploy the Supabase Edge Function

### Option A: Using Supabase CLI (Recommended)
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project (get project ref from Supabase dashboard)
supabase link --project-ref YOUR_PROJECT_REF

# Deploy the function
supabase functions deploy analyze-text

# Set the OpenAI API key secret
supabase secrets set OPENAI_API_KEY=your-openai-api-key
```

### Option B: Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to Edge Functions
3. Click "Create Function"
4. Name it `analyze-text`
5. Copy the contents of `/supabase/functions/analyze-text/index.ts`
6. Add the environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key

## 3. Apply Database Migrations
Run the migration file to create the suggestion_analytics table:
```sql
-- Run this in the SQL editor in Supabase dashboard
-- Contents are in /supabase/migrations/20240318000003_add_suggestion_analytics.sql
```

## 4. Test the Integration
1. Start the development server: `npm run dev`
2. Navigate to `/test-suggestions`
3. Try the sample texts to verify the integration works

## Troubleshooting

### Function not found error
- Ensure the function is deployed with the exact name `analyze-text`
- Check that your Supabase project URL and anon key are correct in `.env.local`

### Authentication error
- Make sure you're logged in before testing
- Check that the function has the correct RLS policies

### OpenAI API errors
- Verify your API key is valid
- Check your OpenAI account has credits
- Ensure the API key is set as a secret in Supabase, not in the function code

### CORS errors
- Edge functions should handle CORS automatically
- If issues persist, check the function logs in Supabase dashboard