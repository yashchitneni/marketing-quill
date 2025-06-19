#!/bin/bash

echo "🔄 Restarting development server..."

# Kill any existing Next.js processes
pkill -f "next dev" || true

# Wait a moment for process to fully terminate
sleep 1

# Clear Next.js cache if requested
if [ "$1" == "--clean" ]; then
    echo "🧹 Clearing Next.js cache..."
    rm -rf .next
fi

# Start the dev server
echo "🚀 Starting development server..."
npm run dev