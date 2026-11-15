export interface LevelInfo {
  index: number
  name: string
  minXp: number
  nextMinXp: number | null
  /** Progreso dentro del nivel actual, de 0 a 1. */
  progress: number
}

export const LEVELS = [
  { name: 'Aprendiz', minXp: 0 },
  { name: 'Explorador', minXp: 150 },
  { name: 'Pensador', minXp: 400 },
  { name: 'Estratega', minXp: 800 },
  { name: 'Mentor', minXp: 1400 },
  { name: 'Sabio', minXp: 2200 },
] as const

export function xpForLesson(input: { correct: number; reflectionWritten: boolean }): number {
  return 40 + input.correct * 10 + (input.reflectionWritten ? 20 : 0)
}

export function levelFor(totalXp: number): LevelInfo {
  let index = 0
  for (let i = 0; i < LEVELS.length; i++) {
    if (totalXp >= LEVELS[i].minXp) index = i
  }
  const current = LEVELS[index]
  const next = LEVELS[index + 1] ?? null
  const span = next ? next.minXp - current.minXp : 1
  const progress = next ? Math.min(1, (totalXp - current.minXp) / span) : 1
  return {
    index,
    name: current.name,
    minXp: current.minXp,
    nextMinXp: next ? next.minXp : null,
    progress,
  }
}
