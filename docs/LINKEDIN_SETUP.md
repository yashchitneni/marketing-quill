# LinkedIn OAuth Setup Guide

## Current Issues Fixed
1. ✅ LinkedIn OAuth scope encoding error ("invalid_scope_error")
2. ✅ Missing `user_profiles` table in Supabase
3. ✅ Missing `published_at` and `linkedin_url` columns in drafts table

## Solution Steps

### 1. Run Database Migrations

Go to your Supabase Dashboard > SQL Editor and run the following migration:

1. Copy the entire contents of `RUN_THIS_MIGRATION.sql` from the project root
2. Paste it into the Supabase SQL Editor
3. Click "Run" to execute the migration

This migration will:
- Create the `user_profiles` table with all LinkedIn fields
- Add missing columns to the `drafts` table (`published_at`, `linkedin_url`, etc.)
- Create the `linkedin_posts` table for analytics
- Set up all necessary indexes and RLS policies
- Create profiles for any existing users

### 2. Verify LinkedIn App Configuration

In your LinkedIn Developer App:
1. Go to https://www.linkedin.com/developers/apps
2. Select your app
3. Under "OAuth 2.0 settings", add these redirect URLs:
   - `http://localhost:3000/api/auth/linkedin/callback` (for development)
   - Your production URL if deploying (e.g., `https://your-app.vercel.app/api/auth/linkedin/callback`)

4. Ensure these scopes are selected in your LinkedIn app:
   - `w_member_social` (Post, comment and react on behalf of the authenticated member)
   - `profile` (Read member's profile - replaces r_liteprofile)  
   - `email` (Read member's email address - replaces r_emailaddress)

### 3. Environment Variables

You already have these set correctly in `.env.local`:
- `LINKEDIN_CLIENT_ID=86elr8ke0uqqro`
- `LINKEDIN_CLIENT_SECRET=WPL_AP1.ddsQEXBQLiuSZmQ9.1nK20w==`
- `NEXT_PUBLIC_APP_URL=http://localhost:3000`

### 4. Test the Setup

After running the migration:
1. Run `npm run dev`
2. Go to http://localhost:3000/settings
3. Click "Connect LinkedIn"
4. You should be redirected to LinkedIn to authorize the app
5. After authorization, you'll be redirected back to settings with a success message

### 5. Troubleshooting

Run the diagnostic script to check your setup:
```bash
node scripts/check-linkedin-setup.js
```

This will show you:
- ✅ Environment variables status
- ✅ Database tables status
- ✅ LinkedIn configuration requirements

### Common Issues

1. **"relation does not exist" error**: The migration hasn't been run yet
2. **"LinkedIn integration is not configured"**: Environment variables are missing
3. **"Bummer, something went wrong" on LinkedIn**: Check redirect URLs match exactly
4. **Auth error on dashboard**: User profiles table is missing

### Next Steps

Once LinkedIn is connected, you can:
- Post directly to LinkedIn from the editor
- Analyze your past LinkedIn posts for voice profile
- Get engagement predictions based on your writing