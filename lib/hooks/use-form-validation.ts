import { useState, useCallback } from 'react'
import { 
  sanitizeText, 
  sanitizeEmail, 
  sanitizeUrl, 
  sanitizeInteger,
  sanitizeUuid 
} from '@/lib/security/sanitization'

export type ValidationRule = {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
  sanitize?: (value: any) => any
}

export type ValidationSchema = {
  [key: string]: ValidationRule
}

export type ValidationErrors = {
  [key: string]: string
}

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  schema: ValidationSchema
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = useCallback((name: string, value: any): string | null => {
    const rules = schema[name]
    if (!rules) return null

    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      return 'This field is required'
    }

    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === '') return null

    // Length validations
    const stringValue = value.toString()
    if (rules.minLength && stringValue.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`
    }
    if (rules.maxLength && stringValue.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(stringValue)) {
      return 'Invalid format'
    }

    // Custom validation
    if (rules.custom) {
      const result = rules.custom(value)
      if (typeof result === 'string') return result
      if (!result) return 'Invalid value'
    }

    return null
  }, [schema])

  const sanitizeValue = useCallback((name: string, value: any): any => {
    const rules = schema[name]
    if (!rules || !rules.sanitize) return value

    try {
      return rules.sanitize(value)
    } catch (error) {
      console.error(`Sanitization error for field ${name}:`, error)
      return value
    }
  }, [schema])

  const setValue = useCallback((name: string, value: any) => {
    // Sanitize the value
    const sanitized = sanitizeValue(name, value)
    
    // Update values
    setValues(prev => ({ ...prev, [name]: sanitized }))
    
    // Validate if field has been touched
    if (touched[name]) {
      const error = validateField(name, sanitized)
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }))
    }
  }, [sanitizeValue, validateField, touched])

  const setFieldTouched = useCallback((name: string, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }))
    
    if (isTouched) {
      const error = validateField(name, values[name])
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }))
    }
  }, [validateField, values])

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(schema).forEach(name => {
      const error = validateField(name, values[name])
      if (error) {
        newErrors[name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [schema, validateField, values])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateForm,
    resetForm,
    isValid: Object.keys(errors).length === 0
  }
}

// Pre-configured validation schemas for common use cases
export const commonValidators = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    sanitize: sanitizeEmail,
    custom: (value: string) => {
      try {
        sanitizeEmail(value)
        return true
      } catch {
        return 'Invalid email address'
      }
    }
  },
  
  url: {
    required: true,
    sanitize: sanitizeUrl,
    custom: (value: string) => {
      try {
        sanitizeUrl(value)
        return true
      } catch {
        return 'Invalid URL'
      }
    }
  },
  
  title: {
    required: true,
    minLength: 3,
    maxLength: 100,
    sanitize: sanitizeText
  },
  
  content: {
    required: true,
    minLength: 10,
    maxLength: 10000,
    sanitize: sanitizeText
  },
  
  uuid: {
    required: true,
    sanitize: sanitizeUuid,
    custom: (value: string) => {
      try {
        sanitizeUuid(value)
        return true
      } catch {
        return 'Invalid ID format'
      }
    }
  },
  
  integer: {
    required: true,
    custom: (value: any) => {
      try {
        sanitizeInteger(value)
        return true
      } catch {
        return 'Must be a valid number'
      }
    }
  }
}