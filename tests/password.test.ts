import { describe, expect, it } from 'vitest'
import { hashPassword, newSaltHex, verifyPassword } from '../src/lib/password'

describe('password', () => {
  it('verifica una contraseña correcta', async () => {
    const { hash, salt } = await hashPassword('contraseña-segura')
    expect(await verifyPassword('contraseña-segura', salt, hash)).toBe(true)
  })

  it('rechaza una contraseña incorrecta', async () => {
    const { hash, salt } = await hashPassword('contraseña-segura')
    expect(await verifyPassword('otra-contraseña', salt, hash)).toBe(false)
  })

  it('usa una sal distinta por registro', async () => {
    const a = await hashPassword('misma')
    const b = await hashPassword('misma')
    expect(a.salt).not.toBe(b.salt)
    expect(a.hash).not.toBe(b.hash)
  })

  it('la misma sal y contraseña producen el mismo hash', async () => {
    const salt = newSaltHex()
    const a = await hashPassword('x', salt)
    const b = await hashPassword('x', salt)
    expect(a.hash).toBe(b.hash)
    expect(a.hash).toMatch(/^[0-9a-f]{64}$/)
  })
})
