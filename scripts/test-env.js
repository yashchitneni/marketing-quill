require('dotenv').config({ path: '.env.local' })

console.log('Testing environment variables...')
console.log('LINKEDIN_CLIENT_ID:', process.env.LINKEDIN_CLIENT_ID)
console.log('LINKEDIN_CLIENT_SECRET:', process.env.LINKEDIN_CLIENT_SECRET ? '***' + process.env.LINKEDIN_CLIENT_SECRET.slice(-4) : 'NOT SET')
console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL)

// Test if they're accessible in the Next.js way
console.log('\nTesting Next.js public env vars:')
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '...' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(-10) : 'NOT SET')