#!/bin/bash

echo "Setting up Vercel environment variables..."

# Add NEXT_PUBLIC_SUPABASE_URL
echo "https://nsxpqvuouvuvehnskajo.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production

# Add NEXT_PUBLIC_SUPABASE_ANON_KEY
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeHBxdnVvdXZ1dmVobnNrYWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyODAxNzAsImV4cCI6MjA2NTg1NjE3MH0.GUWKakdD77zYieOqBbnCGmTzPyoAwmwDVl3wgFbHkxw" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

echo "Environment variables added! Redeploying..."

# Trigger a new deployment
vercel --prod --yes

echo "Done!"