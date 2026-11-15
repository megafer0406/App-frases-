import { FREE_LESSONS_PER_TRACK } from '../../config/app'
import type { Lesson, TrackId } from '../../domain/types'
import { TRACKS } from '../tracks'
import { DINERO_LESSONS } from './dinero'
import { FILOSOFIA_LESSONS } from './filosofia'
import { HISTORIA_LESSONS } from './historia'
import { LIDERAZGO_LESSONS } from './liderazgo'
import { MENTALIDAD_LESSONS } from './mentalidad'
import { NEGOCIOS_LESSONS } from './negocios'
import { PENSAMIENTO_LESSONS } from './pensamiento'

const LESSONS_BY_TRACK: Record<TrackId, Lesson[]> = {
  historia: HISTORIA_LESSONS,
  filosofia: FILOSOFIA_LESSONS,
  liderazgo: LIDERAZGO_LESSONS,
  negocios: NEGOCIOS_LESSONS,
  mentalidad: MENTALIDAD_LESSONS,
  pensamiento: PENSAMIENTO_LESSONS,
  dinero: DINERO_LESSONS,
}

/** Todas las lecciones, en el orden de las rutas y dentro de cada ruta. */
export const ALL_LESSONS: Lesson[] = TRACKS.flatMap((t) =>
  [...LESSONS_BY_TRACK[t.id]].sort((a, b) => a.order - b.order),
)

const LESSONS_BY_ID = new Map(ALL_LESSONS.map((l) => [l.id, l]))

export function getLesson(id: string): Lesson | undefined {
  return LESSONS_BY_ID.get(id)
}

export function lessonsForTrack(trackId: TrackId): Lesson[] {
  return [...LESSONS_BY_TRACK[trackId]].sort((a, b) => a.order - b.order)
}

/** Las primeras lecciones de la ruta elegida son gratis. */
export function freeLessonIds(trackId: TrackId): string[] {
  return lessonsForTrack(trackId)
    .slice(0, FREE_LESSONS_PER_TRACK)
    .map((l) => l.id)
}
