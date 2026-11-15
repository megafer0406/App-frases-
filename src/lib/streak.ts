import { ROUTINE_GRACE_DAYS } from '../config/app'
import { diffDays, shiftDay } from './dates'

/**
 * Calcula la racha de días activos.
 *
 * Reglas:
 * - Cuenta días con al menos una lección completada (sin repetir días).
 * - Si pasa un día sin actividad, la racha sigue gracias al "día de descanso",
 *   que se puede usar una vez cada ROUTINE_GRACE_DAYS días.
 * - Dos días seguidos sin actividad rompen la racha.
 * - Si hoy aún no hay actividad, la racha de ayer sigue viva.
 */
export function computeStreak(activityDays: string[], today: string): number {
  const days = [...new Set(activityDays)].sort().reverse()
  if (days.length === 0) return 0

  const gapFromToday = diffDays(today, days[0])
  if (gapFromToday > 2) return 0

  let streak = 1
  let lastRestDay: string | null = null

  if (gapFromToday === 2) {
    lastRestDay = shiftDay(today, -1)
  }

  for (let i = 1; i < days.length; i++) {
    const gap = diffDays(days[i - 1], days[i])
    if (gap === 1) {
      streak++
      continue
    }
    if (gap === 2) {
      const restDay = shiftDay(days[i], 1)
      const restAvailable =
        lastRestDay === null || Math.abs(diffDays(lastRestDay, restDay)) >= ROUTINE_GRACE_DAYS
      if (restAvailable) {
        lastRestDay = restDay
        streak++
        continue
      }
    }
    break
  }

  return streak
}

/** Mejor racha histórica con las mismas reglas. */
export function longestStreak(activityDays: string[]): number {
  const days = [...new Set(activityDays)].sort()
  let best = 0
  for (let i = 0; i < days.length; i++) {
    const slice = days.slice(0, i + 1)
    best = Math.max(best, computeStreak(slice, days[i]))
  }
  return best
}
