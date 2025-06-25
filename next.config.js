/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Fix for Supabase realtime warnings
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
  // Security headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          // Prevent XSS attacks
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Control how much referrer information should be included
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // Force HTTPS (HSTS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          // Permissions Policy (formerly Feature Policy)
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
          }
        ]
      },
      // Temporarily disable CSP to fix the issue
      // {
      //   // Apply CSP to all pages except editor (needs adjustment for Supabase)
      //   source: '/((?!editor).*)',
      //   headers: [
      //     {
      //       key: 'Content-Security-Policy',
      //       value: `
      //         default-src 'self';
      //         script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://vercel.live https://www.linkedin.com https://api.linkedin.com;
      //         style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      //         img-src 'self' data: https: blob: https://media.licdn.com https://media-exp1.licdn.com;
      //         font-src 'self' data: https://fonts.gstatic.com;
      //         connect-src 'self' https://*.supabase.co https://api.openai.com wss://*.supabase.co https://vercel.live https://www.linkedin.com https://api.linkedin.com;
      //         frame-src 'self' https://*.supabase.co https://www.linkedin.com;
      //         object-src 'none';
      //         base-uri 'self';
      //         form-action 'self';
      //         frame-ancestors 'none';
      //         upgrade-insecure-requests;
      //       `.replace(/\s{2,}/g, ' ').trim()
      //     }
      //   ]
      // }
    ]
  },
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
}

module.exports = nextConfig