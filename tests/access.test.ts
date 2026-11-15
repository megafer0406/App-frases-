import { describe, expect, it } from 'vitest'
import { ALL_LESSONS, getLesson, lessonsForTrack } from '../src/content/lessons'
import { hasPremium, isLessonAccessible, nextLesson } from '../src/lib/access'
import { emptyUserData } from '../src/lib/progress'
import type { Subscription, UserData } from '../src/domain/types'

const NONE: Subscription = {
  status: 'none',
  plan: null,
  startedAt: null,
  trialEndsAt: null,
  accessUntil: null,
  canceledAt: null,
}

const NOW = new Date('2026-10-15T12:00:00Z')

describe('hasPremium', () => {
  it('sin suscripción no hay acceso premium', () => {
    expect(hasPremium(NONE, NOW)).toBe(false)
  })

  it('una prueba activa da acceso hasta su fin', () => {
    const sub: Subscription = { ...NONE, status: 'trialing', accessUntil: '2026-11-01T00:00:00Z' }
    expect(hasPremium(sub, NOW)).toBe(true)
  })

  it('una prueba vencida ya no da acceso', () => {
    const sub: Subscription = { ...NONE, status: 'trialing', accessUntil: '2026-10-01T00:00:00Z' }
    expect(hasPremium(sub, NOW)).toBe(false)
  })

  it('cancelar conserva el acceso hasta el fin del periodo', () => {
    const sub: Subscription = { ...NONE, status: 'canceled', accessUntil: '2026-11-01T00:00:00Z' }
    expect(hasPremium(sub, NOW)).toBe(true)
  })
})

describe('isLessonAccessible', () => {
  const data: UserData = emptyUserData()

  it('las tres primeras de la ruta elegida son gratis', () => {
    const lessons = lessonsForTrack('negocios')
    expect(isLessonAccessible(lessons[0], data, 'negocios', NOW)).toBe(true)
    expect(isLessonAccessible(lessons[2], data, 'negocios', NOW)).toBe(true)
    expect(isLessonAccessible(lessons[3], data, 'negocios', NOW)).toBe(false)
  })

  it('con premium todas las lecciones son accesibles', () => {
    const premium: UserData = {
      ...data,
      subscription: { ...NONE, status: 'active', plan: 'anual' },
    }
    expect(ALL_LESSONS.every((l) => isLessonAccessible(l, premium, 'historia', NOW))).toBe(true)
  })
})

describe('nextLesson', () => {
  it('devuelve la primera lección pendiente de la ruta elegida', () => {
    const data = emptyUserData()
    const first = lessonsForTrack('filosofia')[0]
    expect(nextLesson(ALL_LESSONS, data, 'filosofia')?.id).toBe(first.id)
  })

  it('salta las completadas', () => {
    const data = emptyUserData()
    const [first, second] = lessonsForTrack('filosofia')
    data.completions[first.id] = { completedAt: NOW.toISOString(), correct: 1, total: 1, xp: 50, reflectionWritten: false }
    expect(nextLesson(ALL_LESSONS, data, 'filosofia')?.id).toBe(second.id)
  })

  it('si la ruta está completa, pasa a otra ruta', () => {
    const data = emptyUserData()
    for (const lesson of lessonsForTrack('dinero')) {
      data.completions[lesson.id] = { completedAt: NOW.toISOString(), correct: 0, total: 1, xp: 40, reflectionWritten: false }
    }
    const next = nextLesson(ALL_LESSONS, data, 'dinero')
    expect(next).not.toBeNull()
    expect(next?.trackId).not.toBe('dinero')
  })

  it('devuelve null cuando todo está completo', () => {
    const data = emptyUserData()
    for (const lesson of ALL_LESSONS) {
      data.completions[lesson.id] = { completedAt: NOW.toISOString(), correct: 0, total: 1, xp: 40, reflectionWritten: false }
    }
    expect(nextLesson(ALL_LESSONS, data, 'historia')).toBeNull()
    expect(getLesson('hist-caida-roma')).toBeDefined()
  })
})
