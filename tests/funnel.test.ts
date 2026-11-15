import { describe, expect, it } from 'vitest'
import { ARCHETYPES, FUNNEL_QUESTIONS } from '../src/content/funnel'
import { findArchetype, scoreArchetype } from '../src/lib/funnel'

describe('scoreArchetype', () => {
  it('elige el arquetipo con más puntos', () => {
    const answers = {
      objetivo: 'negocio', // estratega +2
      tiempo: 'variable', // estratega +1
      consumo: 'informado', // estratega +1, lider +1
      conversacion: 'opinar', // estratega +1, curioso +1
      miedo: 'rezago', // estratega +2
      frenos: 'inicio', // curioso +1, estratega +1
      persona: 'negocio', // estratega +2
      ambicion: 'numeros', // estratega +2
    }
    const { archetypeId, scores } = scoreArchetype(answers, FUNNEL_QUESTIONS)
    expect(archetypeId).toBe('estratega')
    expect(scores.estratega).toBeGreaterThan(scores.curioso)
  })

  it('en caso de empate gana el primero del orden', () => {
    const { archetypeId } = scoreArchetype({ objetivo: 'constancia', persona: 'lider' }, FUNNEL_QUESTIONS)
    // constante +2 y lider +2: empate; gana curioso/lider según el orden (lider aparece antes que constante).
    expect(archetypeId).toBe('lider')
  })

  it('ignora respuestas desconocidas y preguntas sin responder', () => {
    const { archetypeId, scores } = scoreArchetype({ objetivo: 'valor-inventado' }, FUNNEL_QUESTIONS)
    expect(archetypeId).toBe('curioso')
    expect(Object.values(scores).every((v) => v === 0)).toBe(true)
  })

  it('cada arquetipo tiene textos y ruta inicial', () => {
    for (const archetype of ARCHETYPES) {
      expect(archetype.name.length).toBeGreaterThan(5)
      expect(archetype.pain.length).toBeGreaterThan(20)
      expect(archetype.fear.length).toBeGreaterThan(20)
      expect(archetype.desire.length).toBeGreaterThan(20)
      expect(findArchetype(ARCHETYPES, archetype.id)).toBe(archetype)
    }
  })

  it('cada pregunta tiene valores únicos por opción', () => {
    for (const q of FUNNEL_QUESTIONS) {
      const values = q.options.map((o) => o.value)
      expect(new Set(values).size).toBe(values.length)
    }
  })

  it('el quiz tiene 10 preguntas (más el paso de nombre suman 11)', () => {
    expect(FUNNEL_QUESTIONS).toHaveLength(10)
  })
})
