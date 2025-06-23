# Deployment Setup Guide

## Environment Variables Required

### In Vercel Dashboard (Settings → Environment Variables):

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://nsxpqvuouvuvehnskajo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeHBxdnVvdXZ1dmVobnNrYWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyODAxNzAsImV4cCI6MjA2NTg1NjE3MH0.GUWKakdD77zYieOqBbnCGmTzPyoAwmwDVl3wgFbHkxw

# LinkedIn OAuth Configuration
LINKEDIN_CLIENT_ID=86elr8ke0uqqro
LINKEDIN_CLIENT_SECRET=WPL_AP1.ddsQEXBQLiuSZmQ9.1nK20w==
NEXT_PUBLIC_APP_URL=https://marketing-quill.vercel.app
```

### In Supabase Dashboard (Edge Functions → Secrets):

```bash
OPENAI_API_KEY=your-openai-api-key-here
```

## GitHub Environment Setup

1. Go to GitHub repo → Settings → Environments
2. Create new environment called `production`
3. No need to add secrets here if using Vercel's environment variables

## Vercel Deployment Settings

1. Framework Preset: Next.js
2. Build Command: `npm run build` (default)
3. Output Directory: `.next` (default)
4. Install Command: `npm install` (default)

## LinkedIn OAuth Redirect URLs

Add these to your LinkedIn app settings:
- Development: `http://localhost:3000/api/auth/linkedin/callback`
- Production: `https://marketing-quill.vercel.app/api/auth/linkedin/callback`

## Troubleshooting

If deployment fails:
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Run `npm run build` locally to test
4. Check that `.env.local` is in `.gitignore` (should not be committed)