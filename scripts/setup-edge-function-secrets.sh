#!/bin/bash

# Script to set up Edge Function secrets in Supabase

echo "=== Supabase Edge Function Secret Setup ==="
echo ""
echo "This script will help you set up the OpenAI API key for your Edge Functions."
echo ""

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Error: Supabase CLI is not installed."
    echo "Please install it first: npm install -g supabase"
    exit 1
fi

# Check if we're linked to a project
if ! supabase status 2>/dev/null | grep -q "API URL"; then
    echo "Error: Not linked to a Supabase project."
    echo "Please run: supabase link --project-ref your-project-ref"
    exit 1
fi

echo "Current Supabase project:"
supabase status | grep -E "API URL|Project"
echo ""

# Check if OPENAI_API_KEY is already set
echo "Checking existing secrets..."
EXISTING_SECRETS=$(supabase secrets list 2>&1)

if echo "$EXISTING_SECRETS" | grep -q "OPENAI_API_KEY"; then
    echo "✓ OPENAI_API_KEY is already set"
    echo ""
    read -p "Do you want to update it? (y/n): " UPDATE_KEY
    if [[ $UPDATE_KEY != "y" ]]; then
        echo "Skipping OPENAI_API_KEY update."
        exit 0
    fi
fi

# Prompt for OpenAI API key
echo ""
echo "Please enter your OpenAI API key (it will be hidden):"
read -s OPENAI_API_KEY

if [ -z "$OPENAI_API_KEY" ]; then
    echo "Error: OpenAI API key cannot be empty"
    exit 1
fi

# Set the secret
echo ""
echo "Setting OPENAI_API_KEY secret..."
if supabase secrets set OPENAI_API_KEY="$OPENAI_API_KEY"; then
    echo "✓ Successfully set OPENAI_API_KEY"
else
    echo "✗ Failed to set OPENAI_API_KEY"
    exit 1
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Your Edge Function secrets have been configured."
echo "The analyze-text function should now work properly."
echo ""
echo "Note: It may take a few minutes for the changes to propagate."
echo ""
echo "To verify, you can run:"
echo "  supabase secrets list"
echo ""