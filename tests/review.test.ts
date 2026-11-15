import { describe, expect, it } from 'vitest'
import { emptyUserData } from '../src/lib/progress'
import { pickReviewLesson, REVIEW_INTERVALS } from '../src/lib/review'
import type { UserData } from '../src/domain/types'

const NOW = new Date(2026, 9, 15, 12, 0) // 15 de octubre de 2026, mediodía local

function completedDaysAgo(data: UserData, lessonId: string, daysAgo: number) {
  const when = new Date(NOW)
  when.setDate(when.getDate() - daysAgo)
  data.completions[lessonId] = {
    completedAt: when.toISOString(),
    correct: 1,
    total: 1,
    xp: 50,
    reflectionWritten: false,
  }
}

describe('pickReviewLesson', () => {
  it('no sugiere repaso si no hay lecciones en un intervalo de repaso', () => {
    const data = emptyUserData()
    completedDaysAgo(data, 'hist-caida-roma', 2)
    expect(pickReviewLesson(data, NOW)).toBeNull()
  })

  it('sugiere la lección completada hace exactamente 1, 3, 7, 14 o 30 días', () => {
    for (const days of REVIEW_INTERVALS) {
      const data = emptyUserData()
      completedDaysAgo(data, 'fil-caverna-platon', days)
      const pick = pickReviewLesson(data, NOW)
      expect(pick?.lesson.id, `intervalo ${days}`).toBe('fil-caverna-platon')
      expect(pick?.daysAgo).toBe(days)
    }
  })

  it('prefiere la más antigua si hay varias en intervalos de repaso', () => {
    const data = emptyUserData()
    completedDaysAgo(data, 'fil-caverna-platon', 1)
    completedDaysAgo(data, 'fil-sisifo-camus', 7)
    expect(pickReviewLesson(data, NOW)?.daysAgo).toBe(7)
  })

  it('ignora identificadores de lección que ya no existen', () => {
    const data = emptyUserData()
    completedDaysAgo(data, 'leccion-inexistente', 1)
    expect(pickReviewLesson(data, NOW)).toBeNull()
  })
})
