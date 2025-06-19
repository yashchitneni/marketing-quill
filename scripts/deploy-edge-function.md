# Deploy Supabase Edge Function

To deploy the analyze-text edge function, follow these steps:

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project (get project ref from Supabase dashboard):
```bash
supabase link --project-ref YOUR_PROJECT_REF
```

4. Deploy the function:
```bash
supabase functions deploy analyze-text
```

5. Set the OpenAI API key secret:
```bash
supabase secrets set OPENAI_API_KEY=your-openai-api-key
```

The function is already created at `/supabase/functions/analyze-text/index.ts`