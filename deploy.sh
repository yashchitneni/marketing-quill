#!/bin/bash

echo "🚀 MarketingQuill Deployment Script"
echo "=================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Build the project first
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo ""
    echo "📝 Make sure you have:"
    echo "1. Set OPENAI_API_KEY in Supabase: supabase secrets set OPENAI_API_KEY=your-key"
    echo "2. Configured Google OAuth in Supabase dashboard"
    echo ""
    echo "🔗 When Vercel asks for environment variables, add:"
    echo "NEXT_PUBLIC_SUPABASE_URL=https://nsxpqvuouvuvehnskajo.supabase.co"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeHBxdnVvdXZ1dmVobnNrYWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyODAxNzAsImV4cCI6MjA2NTg1NjE3MH0.GUWKakdD77zYieOqBbnCGmTzPyoAwmwDVl3wgFbHkxw"
    echo ""
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    vercel --prod
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi