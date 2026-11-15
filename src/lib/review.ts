import { getLesson } from '../content/lessons'
import type { Lesson, UserData } from '../domain/types'
import { dayKey, diffDays } from './dates'

/** Días después de completar una lección en los que conviene repasarla. */
export const REVIEW_INTERVALS: readonly number[] = [1, 3, 7, 14, 30]

/** La lección completada que toca repasar hoy (la más antigua que coincide con un intervalo). */
export function pickReviewLesson(
  data: UserData,
  now: Date = new Date(),
): { lesson: Lesson; daysAgo: number } | null {
  const today = dayKey(now)
  let best: { lesson: Lesson; daysAgo: number } | null = null
  for (const [lessonId, completion] of Object.entries(data.completions)) {
    const lesson = getLesson(lessonId)
    if (!lesson) continue
    const daysAgo = diffDays(today, dayKey(new Date(completion.completedAt)))
    if (REVIEW_INTERVALS.includes(daysAgo) && (!best || daysAgo > best.daysAgo)) {
      best = { lesson, daysAgo }
    }
  }
  return best
}
