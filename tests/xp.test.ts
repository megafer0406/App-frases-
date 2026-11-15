import { describe, expect, it } from 'vitest'
import { levelFor, xpForLesson } from '../src/lib/xp'

describe('xpForLesson', () => {
  it('da 40 XP base por completar una lección', () => {
    expect(xpForLesson({ correct: 0, reflectionWritten: false })).toBe(40)
  })

  it('suma 10 XP por respuesta correcta y 20 por reflexión', () => {
    expect(xpForLesson({ correct: 2, reflectionWritten: true })).toBe(40 + 20 + 20)
  })
})

describe('levelFor', () => {
  it('empieza en Aprendiz', () => {
    const level = levelFor(0)
    expect(level.name).toBe('Aprendiz')
    expect(level.progress).toBe(0)
  })

  it('sube de nivel al llegar al umbral', () => {
    expect(levelFor(149).name).toBe('Aprendiz')
    expect(levelFor(150).name).toBe('Explorador')
  })

  it('calcula el progreso dentro del nivel', () => {
    const level = levelFor(75)
    expect(level.name).toBe('Aprendiz')
    expect(level.progress).toBeCloseTo(0.5)
  })

  it('en el nivel máximo no tiene siguiente umbral', () => {
    const level = levelFor(5000)
    expect(level.name).toBe('Sabio')
    expect(level.nextMinXp).toBeNull()
    expect(level.progress).toBe(1)
  })
})
