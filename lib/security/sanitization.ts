import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'blockquote'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['rel'],
    FORCE_BODY: true
  })
}

/**
 * Sanitize plain text input - removes any HTML and dangerous characters
 */
export function sanitizeText(text: string): string {
  // Remove all HTML tags
  const stripped = text.replace(/<[^>]*>/g, '')
  
  // Escape special characters
  return stripped
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Sanitize and validate email address
 */
export function sanitizeEmail(email: string): string {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const trimmed = email.trim().toLowerCase()
  
  if (!emailRegex.test(trimmed)) {
    throw new Error('Invalid email address')
  }
  
  return trimmed
}

/**
 * Sanitize URL to prevent injection attacks
 */
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url)
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol')
    }
    
    return parsed.toString()
  } catch {
    throw new Error('Invalid URL')
  }
}

/**
 * Sanitize filename to prevent path traversal attacks
 */
export function sanitizeFilename(filename: string): string {
  // Remove any path separators and dangerous characters
  return filename
    .replace(/[\/\\]/g, '')
    .replace(/\.\./g, '')
    .replace(/[<>:"|?*]/g, '')
    .trim()
}

/**
 * Sanitize JSON input to prevent injection
 */
export function sanitizeJson(jsonString: string): any {
  try {
    const parsed = JSON.parse(jsonString)
    
    // Recursively sanitize all string values
    const sanitizeObject = (obj: any): any => {
      if (typeof obj === 'string') {
        return sanitizeText(obj)
      } else if (Array.isArray(obj)) {
        return obj.map(sanitizeObject)
      } else if (obj !== null && typeof obj === 'object') {
        const sanitized: any = {}
        for (const key in obj) {
          // Sanitize keys as well
          const sanitizedKey = sanitizeText(key)
          sanitized[sanitizedKey] = sanitizeObject(obj[key])
        }
        return sanitized
      }
      return obj
    }
    
    return sanitizeObject(parsed)
  } catch {
    throw new Error('Invalid JSON')
  }
}

/**
 * Sanitize SQL-like inputs to prevent SQL injection
 * Note: This is a backup - always use parameterized queries
 */
export function sanitizeSqlInput(input: string): string {
  return input
    .replace(/['";\\]/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .trim()
}

/**
 * Validate and sanitize integer input
 */
export function sanitizeInteger(input: string | number, min?: number, max?: number): number {
  const num = typeof input === 'string' ? parseInt(input, 10) : input
  
  if (isNaN(num)) {
    throw new Error('Invalid integer')
  }
  
  if (min !== undefined && num < min) {
    throw new Error(`Value must be at least ${min}`)
  }
  
  if (max !== undefined && num > max) {
    throw new Error(`Value must be at most ${max}`)
  }
  
  return num
}

/**
 * Sanitize and validate UUID
 */
export function sanitizeUuid(uuid: string): string {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const trimmed = uuid.trim().toLowerCase()
  
  if (!uuidRegex.test(trimmed)) {
    throw new Error('Invalid UUID format')
  }
  
  return trimmed
}

/**
 * Create a sanitized error message (removes sensitive info)
 */
export function sanitizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Remove stack traces and sensitive paths
    const message = error.message
      .replace(/\/[^\s]+/g, '[path]')
      .replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g, '[ip]')
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email]')
    
    return message
  }
  
  return 'An error occurred'
}

/**
 * Sanitize object for logging (removes sensitive fields)
 */
export function sanitizeForLogging(obj: any, sensitiveFields: string[] = ['password', 'token', 'secret', 'key']): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  
  const sanitized: any = Array.isArray(obj) ? [] : {}
  
  for (const key in obj) {
    if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
      sanitized[key] = '[REDACTED]'
    } else if (typeof obj[key] === 'object') {
      sanitized[key] = sanitizeForLogging(obj[key], sensitiveFields)
    } else {
      sanitized[key] = obj[key]
    }
  }
  
  return sanitized
}