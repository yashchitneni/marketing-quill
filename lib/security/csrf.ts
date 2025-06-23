import { createHash } from 'crypto'
import { cookies } from 'next/headers'

const CSRF_COOKIE_NAME = 'csrf-token'
const CSRF_HEADER_NAME = 'x-csrf-token'

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
  const token = createHash('sha256')
    .update(Date.now().toString())
    .update(Math.random().toString())
    .digest('hex')
  
  return token
}

/**
 * Set CSRF token in cookie (server-side)
 */
export async function setCSRFToken(): Promise<string> {
  const token = generateCSRFToken()
  const cookieStore = await cookies()
  
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  })
  
  return token
}

/**
 * Get CSRF token from cookie (server-side)
 */
export async function getCSRFToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(CSRF_COOKIE_NAME)
  return token?.value || null
}

/**
 * Validate CSRF token (server-side)
 */
export async function validateCSRFToken(headerToken: string | null): Promise<boolean> {
  if (!headerToken) return false
  
  const cookieToken = await getCSRFToken()
  if (!cookieToken) return false
  
  // Constant-time comparison to prevent timing attacks
  return timingSafeEqual(headerToken, cookieToken)
}

/**
 * Timing-safe string comparison
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  
  return result === 0
}

/**
 * Client-side CSRF token management
 */
export class CSRFClient {
  private static token: string | null = null
  
  /**
   * Get CSRF token from meta tag or cookie
   */
  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    
    // Check if we already have it cached
    if (this.token) return this.token
    
    // Try to get from meta tag first
    const metaTag = document.querySelector('meta[name="csrf-token"]')
    if (metaTag) {
      this.token = metaTag.getAttribute('content')
      return this.token
    }
    
    // Try to get from cookie (if not httpOnly)
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === CSRF_COOKIE_NAME) {
        this.token = decodeURIComponent(value)
        return this.token
      }
    }
    
    return null
  }
  
  /**
   * Add CSRF token to fetch headers
   */
  static addToHeaders(headers: HeadersInit = {}): HeadersInit {
    const token = this.getToken()
    if (token) {
      return {
        ...headers,
        [CSRF_HEADER_NAME]: token
      }
    }
    return headers
  }
  
  /**
   * Create a fetch wrapper with CSRF protection
   */
  static fetch(url: string, options: RequestInit = {}): Promise<Response> {
    // Only add CSRF token for state-changing methods
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method?.toUpperCase() || '')) {
      options.headers = this.addToHeaders(options.headers)
    }
    
    return fetch(url, options)
  }
}

/**
 * Hook for using CSRF protection in components
 */
export function useCSRF() {
  return {
    token: CSRFClient.getToken(),
    fetch: CSRFClient.fetch.bind(CSRFClient),
    addToHeaders: CSRFClient.addToHeaders.bind(CSRFClient)
  }
}