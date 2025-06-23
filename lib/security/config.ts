/**
 * Security configuration for the application
 */

export const securityConfig = {
  // Content Security Policy
  csp: {
    directives: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://*.supabase.co', 'https://vercel.live'],
      'style-src': ["'self'", "'unsafe-inline'"],
      'img-src': ["'self'", 'data:', 'https:', 'blob:'],
      'font-src': ["'self'", 'data:'],
      'connect-src': ["'self'", 'https://*.supabase.co', 'https://api.openai.com', 'wss://*.supabase.co', 'https://vercel.live'],
      'frame-src': ["'self'", 'https://*.supabase.co'],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'upgrade-insecure-requests': []
    }
  },
  
  // Security headers
  headers: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    
    // Specific limits for different endpoints
    endpoints: {
      '/api/auth': { max: 5, windowMs: 15 * 60 * 1000 }, // 5 auth attempts per 15 minutes
      '/api/analyze': { max: 20, windowMs: 60 * 1000 }, // 20 analysis per minute
      '/api/export': { max: 5, windowMs: 60 * 60 * 1000 } // 5 exports per hour
    }
  },
  
  // Session configuration
  session: {
    name: 'session',
    secret: process.env.SESSION_SECRET || 'change-this-secret-in-production',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
  },
  
  // CORS configuration
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_APP_URL 
      : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    optionsSuccessStatus: 200
  },
  
  // Input validation limits
  validation: {
    maxTitleLength: 100,
    maxContentLength: 50000,
    maxTemplateLength: 10000,
    maxDescriptionLength: 500,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedChannels: ['email', 'blog', 'social', 'website', 'ad', 'linkedin']
  },
  
  // Encryption settings
  encryption: {
    algorithm: 'aes-256-gcm',
    keyDerivation: {
      iterations: 100000,
      keyLength: 32,
      digest: 'sha256'
    }
  }
}

/**
 * Get CSP header string
 */
export function getCSPHeader(): string {
  const directives = Object.entries(securityConfig.csp.directives)
    .map(([key, values]) => {
      if (values.length === 0) return key
      return `${key} ${values.join(' ')}`
    })
    .join('; ')
  
  return directives
}

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(response: Response): Response {
  Object.entries(securityConfig.headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // Add CSP header
  response.headers.set('Content-Security-Policy', getCSPHeader())
  
  return response
}

/**
 * Check if origin is allowed
 */
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false
  
  const allowedOrigins = Array.isArray(securityConfig.cors.origin) 
    ? securityConfig.cors.origin 
    : [securityConfig.cors.origin]
  
  return allowedOrigins.some(allowed => {
    if (typeof allowed === 'string') {
      return origin === allowed
    }
    return false
  })
}

/**
 * Sanitize filename for safe storage
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/\.{2,}/g, '_')
    .substring(0, 255)
}

/**
 * Generate secure random string
 */
export function generateSecureRandom(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const values = new Uint8Array(length)
  
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(values)
  } else {
    // Server-side
    require('crypto').randomFillSync(values)
  }
  
  return Array.from(values, (byte) => chars[byte % chars.length]).join('')
}