import { PASSWORD_MIN_LENGTH } from '../config/app'

export interface FieldErrors {
  name?: string
  email?: string
  password?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function validateRegistration(input: { name: string; email: string; password: string }): FieldErrors {
  const errors: FieldErrors = {}
  if (input.name.trim().length < 2) {
    errors.name = 'Escribe tu nombre para personalizar tu plan.'
  }
  if (!EMAIL_RE.test(normalizeEmail(input.email))) {
    errors.email = 'Revisa el formato del email. Debe tener @ y un dominio, como nombre@correo.com.'
  }
  if (input.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `La contraseña necesita al menos ${PASSWORD_MIN_LENGTH} caracteres.`
  }
  return errors
}

export function validateLogin(input: { email: string; password: string }): FieldErrors {
  const errors: FieldErrors = {}
  if (!EMAIL_RE.test(normalizeEmail(input.email))) {
    errors.email = 'Revisa el formato del email.'
  }
  if (input.password.length === 0) {
    errors.password = 'Escribe tu contraseña.'
  }
  return errors
}

export const DUPLICATE_EMAIL_MESSAGE = 'Ya existe una cuenta con este email. ¿Quieres iniciar sesión?'
export const INVALID_CREDENTIALS_MESSAGE = 'Email o contraseña no coinciden. Revísalos e intenta de nuevo.'
