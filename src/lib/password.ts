import { PBKDF2_ITERATIONS } from '../config/app'

const encoder = new TextEncoder()

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

function fromHex(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2)
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  }
  return out
}

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, [
    'deriveBits',
  ])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: salt as BufferSource, iterations },
    key,
    256,
  )
  return toHex(new Uint8Array(bits))
}

export function newSaltHex(): string {
  return toHex(crypto.getRandomValues(new Uint8Array(16)))
}

export async function hashPassword(password: string, saltHex: string = newSaltHex()) {
  const hash = await derive(password, fromHex(saltHex), PBKDF2_ITERATIONS)
  return { hash, salt: saltHex }
}

export async function verifyPassword(password: string, saltHex: string, expectedHash: string) {
  const hash = await derive(password, fromHex(saltHex), PBKDF2_ITERATIONS)
  return constantTimeEqual(hash, expectedHash)
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}
