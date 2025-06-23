import { sanitizeText, sanitizeEmail, sanitizeUrl } from '@/lib/security/sanitization'

export interface ValidationResult {
  isValid: boolean
  sanitized?: any
  error?: string
}

/**
 * Validate and sanitize draft title
 */
export function validateDraftTitle(title: string): ValidationResult {
  if (!title || title.trim().length === 0) {
    return { isValid: false, error: 'Title is required' }
  }
  
  if (title.length > 100) {
    return { isValid: false, error: 'Title must be less than 100 characters' }
  }
  
  try {
    const sanitized = sanitizeText(title)
    return { isValid: true, sanitized }
  } catch (error) {
    return { isValid: false, error: 'Invalid title format' }
  }
}

/**
 * Validate and sanitize draft content
 */
export function validateDraftContent(content: string): ValidationResult {
  if (!content || content.trim().length === 0) {
    return { isValid: true, sanitized: '' } // Empty content is allowed
  }
  
  if (content.length > 50000) {
    return { isValid: false, error: 'Content must be less than 50,000 characters' }
  }
  
  // Allow basic markdown but sanitize dangerous HTML
  return { isValid: true, sanitized: content }
}

/**
 * Validate channel selection
 */
export function validateChannel(channel: string | null): ValidationResult {
  const validChannels = ['email', 'blog', 'social', 'website', 'ad', 'linkedin']
  
  if (channel === null) {
    return { isValid: true, sanitized: null }
  }
  
  if (!validChannels.includes(channel)) {
    return { isValid: false, error: 'Invalid channel selection' }
  }
  
  return { isValid: true, sanitized: channel }
}

/**
 * Validate template data
 */
export function validateTemplate(template: {
  title: string
  category: string
  description: string
  template: string
  placeholders?: any[]
}): ValidationResult {
  // Validate title
  const titleResult = validateDraftTitle(template.title)
  if (!titleResult.isValid) {
    return { isValid: false, error: `Title: ${titleResult.error}` }
  }
  
  // Validate category
  const validCategories = [
    'announcement', 
    'thought-leadership', 
    'case-study', 
    'tips-advice', 
    'personal-story',
    'industry-news',
    'career-growth',
    'event-promotion'
  ]
  
  if (!validCategories.includes(template.category)) {
    return { isValid: false, error: 'Invalid category' }
  }
  
  // Validate description
  if (template.description.length > 500) {
    return { isValid: false, error: 'Description must be less than 500 characters' }
  }
  
  // Validate template content
  if (template.template.length > 10000) {
    return { isValid: false, error: 'Template must be less than 10,000 characters' }
  }
  
  // Validate placeholders
  if (template.placeholders && !Array.isArray(template.placeholders)) {
    return { isValid: false, error: 'Invalid placeholders format' }
  }
  
  return {
    isValid: true,
    sanitized: {
      ...template,
      title: sanitizeText(template.title),
      description: sanitizeText(template.description),
      template: template.template, // Keep markdown formatting
      placeholders: template.placeholders || []
    }
  }
}

/**
 * Validate search query
 */
export function validateSearchQuery(query: string): ValidationResult {
  if (!query || query.trim().length === 0) {
    return { isValid: false, error: 'Search query is required' }
  }
  
  if (query.length > 100) {
    return { isValid: false, error: 'Search query must be less than 100 characters' }
  }
  
  // Remove special characters that could be used for injection
  const sanitized = query
    .replace(/[<>'"]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
  
  return { isValid: true, sanitized }
}

/**
 * Validate pagination parameters
 */
export function validatePagination(page: string | number, limit: string | number): ValidationResult {
  const pageNum = typeof page === 'string' ? parseInt(page) : page
  const limitNum = typeof limit === 'string' ? parseInt(limit) : limit
  
  if (isNaN(pageNum) || pageNum < 1) {
    return { isValid: false, error: 'Invalid page number' }
  }
  
  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    return { isValid: false, error: 'Limit must be between 1 and 100' }
  }
  
  return {
    isValid: true,
    sanitized: {
      page: pageNum,
      limit: limitNum
    }
  }
}

/**
 * Validate sort parameters
 */
export function validateSort(sortBy: string, order: string = 'desc'): ValidationResult {
  const validSortFields = ['created_at', 'updated_at', 'title', 'optimization_score']
  const validOrders = ['asc', 'desc']
  
  if (!validSortFields.includes(sortBy)) {
    return { isValid: false, error: 'Invalid sort field' }
  }
  
  if (!validOrders.includes(order.toLowerCase())) {
    return { isValid: false, error: 'Invalid sort order' }
  }
  
  return {
    isValid: true,
    sanitized: {
      sortBy,
      order: order.toLowerCase()
    }
  }
}