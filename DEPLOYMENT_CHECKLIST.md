# MarketingQuill MVP Deployment Checklist

## ✅ Completed
- [x] Database schema ready
- [x] Edge function deployed (analyze-text)
- [x] Supabase project linked

## 🔄 In Progress

### 1. Set OpenAI API Key (Required)
```bash
supabase secrets set OPENAI_API_KEY=sk-your-actual-openai-api-key
```

### 2. Configure Google OAuth
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/nsxpqvuouvuvehnskajo/auth/providers)
2. Enable Google provider
3. Add Google OAuth credentials:
   - Get from [Google Cloud Console](https://console.cloud.google.com)
   - Redirect URL: `https://nsxpqvuouvuvehnskajo.supabase.co/auth/v1/callback`

### 3. Deploy to Vercel
```bash
# Option A: Use the deploy script
./deploy.sh

# Option B: Manual deploy
npm run build
vercel --prod
```

### 4. Environment Variables for Vercel
```
NEXT_PUBLIC_SUPABASE_URL=https://nsxpqvuouvuvehnskajo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeHBxdnVvdXZ1dmVobnNrYWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyODAxNzAsImV4cCI6MjA2NTg1NjE3MH0.GUWKakdD77zYieOqBbnCGmTzPyoAwmwDVl3wgFbHkxw
```

## 📋 Post-Deployment
- [ ] Test email authentication
- [ ] Test Google OAuth (after configuring)
- [ ] Create a test draft
- [ ] Verify text analysis works
- [ ] Check /test-suggestions page

## 🚨 Known Issues to Fix Later
1. Dashboard loading performance
2. Suggestions loading performance  
3. Real-time auto-save
4. Cursor position bug in suggestions
5. Sidebar selection feedback
6. Settings/Help pages content

## 🔗 Important URLs
- Supabase Dashboard: https://supabase.com/dashboard/project/nsxpqvuouvuvehnskajo
- Edge Functions: https://supabase.com/dashboard/project/nsxpqvuouvuvehnskajo/functions
- Your Vercel URL: (will be shown after deployment)