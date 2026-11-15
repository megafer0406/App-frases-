import { describe, expect, it } from 'vitest'
import { diffDays, dayKey, greetingFor, shiftDay } from '../src/lib/dates'

describe('dates', () => {
  it('dayKey usa la fecha local en formato YYYY-MM-DD', () => {
    expect(dayKey(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05')
  })

  it('diffDays devuelve días completos, positivo si el primero es posterior', () => {
    expect(diffDays('2026-10-15', '2026-10-12')).toBe(3)
    expect(diffDays('2026-10-12', '2026-10-15')).toBe(-3)
  })

  it('shiftDay cruza meses y bisiestos', () => {
    expect(shiftDay('2028-02-28', 1)).toBe('2028-02-29')
    expect(shiftDay('2026-03-01', -1)).toBe('2026-02-28')
  })

  it('greetingFor cambia por la hora', () => {
    expect(greetingFor(8)).toBe('Buenos días')
    expect(greetingFor(14)).toBe('Buenas tardes')
    expect(greetingFor(22)).toBe('Buenas noches')
  })
})
