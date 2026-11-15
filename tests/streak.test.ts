import { describe, expect, it } from 'vitest'
import { computeStreak, longestStreak } from '../src/lib/streak'

describe('computeStreak', () => {
  it('devuelve 0 sin actividad', () => {
    expect(computeStreak([], '2026-10-15')).toBe(0)
  })

  it('cuenta días consecutivos hasta hoy', () => {
    expect(computeStreak(['2026-10-13', '2026-10-14', '2026-10-15'], '2026-10-15')).toBe(3)
  })

  it('no cuenta dos lecciones el mismo día dos veces', () => {
    expect(computeStreak(['2026-10-15', '2026-10-15', '2026-10-14'], '2026-10-15')).toBe(2)
  })

  it('sigue viva si hoy aún no hay actividad y ayer sí', () => {
    expect(computeStreak(['2026-10-13', '2026-10-14'], '2026-10-15')).toBe(2)
  })

  it('usa el día de descanso cuando falta un solo día', () => {
    // Estuvo activo el 10, faltó el 11 (día de descanso), y volvió el 12.
    expect(computeStreak(['2026-10-10', '2026-10-12'], '2026-10-12')).toBe(2)
  })

  it('no permite dos días de descanso dentro de una misma ventana de 7 días', () => {
    const days = ['2026-10-01', '2026-10-03', '2026-10-05']
    // 02 y 04 son días de descanso: el segundo cae a 2 días del primero, dentro de la ventana.
    expect(computeStreak(days, '2026-10-05')).toBe(2)
  })

  it('se rompe con dos días seguidos sin actividad', () => {
    expect(computeStreak(['2026-10-10', '2026-10-11', '2026-10-14'], '2026-10-14')).toBe(1)
  })

  it('vale 0 si la última actividad fue hace tres días o más', () => {
    expect(computeStreak(['2026-10-12'], '2026-10-15')).toBe(0)
  })

  it('usa días calendario, no milisegundos, al cruzar meses', () => {
    expect(computeStreak(['2026-02-27', '2026-02-28', '2026-03-01'], '2026-03-01')).toBe(3)
  })
})

describe('longestStreak', () => {
  it('encuentra la mejor racha histórica', () => {
    const days = ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-10', '2026-10-11']
    expect(longestStreak(days)).toBe(3)
  })

  it('devuelve 0 sin datos', () => {
    expect(longestStreak([])).toBe(0)
  })
})
