import { describe, expect, it } from 'vitest'
import { ALL_LESSONS, freeLessonIds, lessonsForTrack } from '../src/content/lessons'
import { TRACKS } from '../src/content/tracks'

describe('contenido de lecciones', () => {
  it('hay 26 lecciones de 5 minutos en 7 rutas', () => {
    expect(ALL_LESSONS).toHaveLength(26)
    expect(TRACKS).toHaveLength(7)
  })

  it('los identificadores son únicos', () => {
    const ids = ALL_LESSONS.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada ruta tiene al menos una lección y su orden es consecutivo desde 1', () => {
    for (const track of TRACKS) {
      const lessons = lessonsForTrack(track.id)
      expect(lessons.length).toBeGreaterThan(0)
      expect(lessons.map((l) => l.order)).toEqual(lessons.map((_, i) => i + 1))
    }
  })

  it('cada lección tiene gancho, tarjetas, comprobación, reflexión, acción y fuentes', () => {
    for (const lesson of ALL_LESSONS) {
      expect(lesson.hook.length, lesson.id).toBeGreaterThan(30)
      expect(lesson.cards.length, lesson.id).toBeGreaterThanOrEqual(2)
      expect(lesson.cards.length, lesson.id).toBeLessThanOrEqual(3)
      expect(lesson.quiz.length, lesson.id).toBeGreaterThanOrEqual(1)
      expect(lesson.quiz.length, lesson.id).toBeLessThanOrEqual(2)
      expect(lesson.reflectionPrompt.length, lesson.id).toBeGreaterThan(20)
      expect(lesson.action.length, lesson.id).toBeGreaterThan(20)
      expect(lesson.sources.length, lesson.id).toBeGreaterThanOrEqual(1)
    }
  })

  it('cada pregunta tiene 3 o 4 opciones y una respuesta correcta válida', () => {
    for (const lesson of ALL_LESSONS) {
      for (const q of lesson.quiz) {
        expect(q.options.length, lesson.id).toBeGreaterThanOrEqual(3)
        expect(q.options.length, lesson.id).toBeLessThanOrEqual(4)
        expect(q.correctIndex, lesson.id).toBeGreaterThanOrEqual(0)
        expect(q.correctIndex, lesson.id).toBeLessThan(q.options.length)
        expect(new Set(q.options).size, lesson.id).toBe(q.options.length)
        expect(q.explanation.length, lesson.id).toBeGreaterThan(15)
      }
    }
  })

  it('las lecciones gratis son las tres primeras de la ruta elegida', () => {
    for (const track of TRACKS) {
      const free = freeLessonIds(track.id)
      expect(free).toHaveLength(3)
      expect(free).toEqual(lessonsForTrack(track.id).slice(0, 3).map((l) => l.id))
    }
  })

  it('no hay marcadores de texto pendientes ni HTML en el contenido', () => {
    const blob = JSON.stringify(ALL_LESSONS)
    expect(blob).not.toMatch(/\bTODO\b|lorem|<script|<\/?[a-z]+>/)
  })

  it('las herramientas interactivas existen solo en tarjetas de fórmula', () => {
    for (const lesson of ALL_LESSONS) {
      for (const card of lesson.cards) {
        if (card.interactive) expect(card.kind, lesson.id).toBe('formula')
      }
    }
  })
})
