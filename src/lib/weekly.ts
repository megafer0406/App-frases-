import { DAILY_LESSON_MINUTES } from '../config/app'
import type { UserData } from '../domain/types'
import { dayKey, shiftDay } from './dates'
import { activityDays } from './progress'

const WEEK_LABELS = ['D', 'L', 'M', 'X', 'J', 'V', 'S'] as const

export interface DayActivity {
  key: string
  label: string
  minutes: number
  lessons: number
  isToday: boolean
}

/** Actividad de los últimos siete días, del más antiguo al de hoy. */
export function lastSevenDays(data: UserData, now: Date = new Date()): DayActivity[] {
  const today = dayKey(now)
  const counts = activityDays(data).reduce<Record<string, number>>((acc, key) => {
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})

  return Array.from({ length: 7 }, (_, i) => {
    const key = shiftDay(today, i - 6)
    const [y, m, d] = key.split('-').map(Number)
    const weekday = new Date(y, m - 1, d).getDay()
    const lessons = counts[key] ?? 0
    return {
      key,
      label: WEEK_LABELS[weekday],
      minutes: lessons * DAILY_LESSON_MINUTES,
      lessons,
      isToday: key === today,
    }
  })
}
