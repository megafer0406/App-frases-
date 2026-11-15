import { DAILY_LESSON_MINUTES } from '../config/app'
import type { UserData } from '../domain/types'
import { computeStreak, longestStreak } from './streak'
import { dayKey } from './dates'
import { levelFor } from './xp'

export function emptyUserData(): UserData {
  return {
    onboarding: { goal: null, reminderTime: null, completedAt: null },
    completions: {},
    reflections: [],
    subscription: {
      status: 'none',
      plan: null,
      startedAt: null,
      trialEndsAt: null,
      accessUntil: null,
      canceledAt: null,
    },
    bonusXp: {},
  }
}

/** Días (YYYY-MM-DD locales) con al menos una lección completada. */
export function activityDays(data: UserData): string[] {
  return Object.values(data.completions).map((c) => dayKey(new Date(c.completedAt)))
}

export interface ProgressStats {
  totalXp: number
  lessonsCompleted: number
  minutesLearned: number
  streak: number
  longestStreak: number
  doneToday: boolean
  chestOpenedToday: boolean
  chestsOpened: number
  level: ReturnType<typeof levelFor>
}

export function progressStats(data: UserData, today: Date = new Date()): ProgressStats {
  const lessonXp = Object.values(data.completions).reduce((sum, c) => sum + c.xp, 0)
  const bonus = Object.values(data.bonusXp ?? {}).reduce((sum, xp) => sum + xp, 0)
  const totalXp = lessonXp + bonus
  const lessonsCompleted = Object.keys(data.completions).length
  const days = activityDays(data)
  const todayKey = dayKey(today)
  return {
    totalXp,
    lessonsCompleted,
    minutesLearned: lessonsCompleted * DAILY_LESSON_MINUTES,
    streak: computeStreak(days, todayKey),
    longestStreak: longestStreak(days),
    doneToday: days.includes(todayKey),
    chestOpenedToday: Boolean(data.bonusXp?.[todayKey]),
    chestsOpened: Object.keys(data.bonusXp ?? {}).length,
    level: levelFor(totalXp),
  }
}
