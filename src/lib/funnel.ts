import type { Archetype, ArchetypeId, FunnelQuestion } from '../domain/types'

export const ARCHETYPE_ORDER: ArchetypeId[] = ['curioso', 'lider', 'estratega', 'constante']

/**
 * Suma los pesos de cada respuesta y devuelve el arquetipo con más puntos.
 * En caso de empate gana el primero en ARCHETYPE_ORDER.
 * Las preguntas sin respuesta no suman nada.
 */
export function scoreArchetype(
  answers: Record<string, string>,
  questions: FunnelQuestion[],
): { archetypeId: ArchetypeId; scores: Record<ArchetypeId, number> } {
  const scores: Record<ArchetypeId, number> = {
    curioso: 0,
    lider: 0,
    estratega: 0,
    constante: 0,
  }

  for (const question of questions) {
    const chosen = answers[question.id]
    if (!chosen) continue
    const option = question.options.find((o) => o.value === chosen)
    if (!option) continue
    for (const id of ARCHETYPE_ORDER) {
      scores[id] += option.weights[id] ?? 0
    }
  }

  let archetypeId: ArchetypeId = ARCHETYPE_ORDER[0]
  for (const id of ARCHETYPE_ORDER) {
    if (scores[id] > scores[archetypeId]) archetypeId = id
  }
  return { archetypeId, scores }
}

export function findArchetype(archetypes: Archetype[], id: ArchetypeId): Archetype {
  const found = archetypes.find((a) => a.id === id)
  if (!found) throw new Error(`Arquetipo desconocido: ${id}`)
  return found
}
