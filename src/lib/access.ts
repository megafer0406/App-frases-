import { freeLessonIds, lessonsForTrack } from '../content/lessons'
import type { Lesson, Subscription, TrackId, UserData } from '../domain/types'

/** ¿Tiene acceso premium en este momento? Cubre prueba activa, plan activo y periodo cancelado pero pagado. */
export function hasPremium(sub: Subscription, now: Date = new Date()): boolean {
  if (sub.status === 'none') return false
  if (sub.status === 'active') return true
  if (!sub.accessUntil) return false
  return new Date(sub.accessUntil).getTime() > now.getTime()
}

/** Días que faltan para que termine la prueba o el acceso actual (0 si ya terminó). */
export function daysLeft(untilIso: string | null, now: Date = new Date()): number {
  if (!untilIso) return 0
  const ms = new Date(untilIso).getTime() - now.getTime()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}

export function isLessonAccessible(lesson: Lesson, data: UserData, goal: TrackId | null, now?: Date): boolean {
  if (hasPremium(data.subscription, now)) return true
  const effectiveGoal = goal ?? lesson.trackId
  return freeLessonIds(effectiveGoal).includes(lesson.id)
}

/**
 * La siguiente lección: la primera no completada de la ruta elegida.
 * Si la ruta está completa, devuelve la primera no completada de cualquier ruta.
 */
export function nextLesson(all: Lesson[], data: UserData, goal: TrackId | null): Lesson | null {
  const pool = goal ? lessonsForTrack(goal) : all
  const pending = pool.find((l) => !data.completions[l.id])
  if (pending) return pending
  return all.find((l) => !data.completions[l.id]) ?? null
}
