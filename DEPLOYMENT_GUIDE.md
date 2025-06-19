# MarketingQuill MVP Deployment Guide

This guide will walk you through deploying MarketingQuill to production.

## Prerequisites
- [x] Supabase CLI installed
- [ ] Vercel account
- [ ] GitHub repository
- [ ] OpenAI API key
- [ ] Google Cloud Console access (for OAuth)

## Step 1: Create Supabase Production Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a strong database password
3. Select a region close to your users
4. Wait for project to be ready (~2 minutes)

## Step 2: Configure Supabase Authentication

### Enable Email Authentication
1. Go to Authentication → Providers in Supabase dashboard
2. Enable Email provider
3. Configure:
   - Enable email confirmations: OFF (for MVP)
   - Minimum password length: 8

### Configure Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
5. Copy Client ID and Client Secret
6. In Supabase Authentication → Providers → Google:
   - Enable Google provider
   - Add Client ID and Client Secret
   - Add your domain to Authorized Client IDs

## Step 3: Run Database Migrations

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run the migration
supabase db push
```

## Step 4: Deploy Edge Functions

```bash
# Deploy the analyze-text function
supabase functions deploy analyze-text

# Set the OpenAI API key secret
supabase secrets set OPENAI_API_KEY=your-openai-api-key
```

## Step 5: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Deploy

### Option B: Deploy via CLI
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Deploy
vercel --prod
```

## Step 6: Post-Deployment Setup

### Update OAuth Redirect URLs
1. Get your Vercel deployment URL
2. Update Google OAuth redirect URLs:
   - Add: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   - Add: `https://your-vercel-app.vercel.app` (for authorized domains)

### Test Your Deployment
1. Visit your Vercel URL
2. Test sign up with email
3. Test Google OAuth login
4. Create a draft and test text analysis
5. Visit `/test-suggestions` to verify OpenAI integration

## Environment Variables Reference

### Required for Vercel
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Required for Supabase Edge Functions
```bash
# Set via CLI, not in .env
supabase secrets set OPENAI_API_KEY=your-openai-api-key
```

## Troubleshooting

### Google OAuth not working
- Verify redirect URLs match exactly
- Check that Google+ API is enabled
- Ensure domain is in authorized domains list

### Text analysis not working
- Check OpenAI API key is set correctly
- Verify edge function is deployed: `supabase functions list`
- Check edge function logs: `supabase functions logs analyze-text`

### Database errors
- Ensure all migrations ran successfully
- Check RLS policies are not blocking access
- Verify user is authenticated

## Quick Deployment Checklist

- [ ] Supabase project created
- [ ] Database migrations run
- [ ] Google OAuth configured
- [ ] Edge function deployed
- [ ] OpenAI API key set
- [ ] Vercel deployment live
- [ ] Environment variables configured
- [ ] Authentication tested
- [ ] Text analysis tested

## Next Steps
After successful deployment:
1. Set up a custom domain
2. Configure email templates in Supabase
3. Set up monitoring (Vercel Analytics, Supabase logs)
4. Create a backup strategy