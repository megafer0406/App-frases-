import { describe, expect, it } from 'vitest'
import { BADGES, badgeStatuses, nextBadge } from '../src/lib/badges'
import { lastSevenDays } from '../src/lib/weekly'
import { emptyUserData, progressStats } from '../src/lib/progress'
import { ALL_LESSONS, lessonsForTrack } from '../src/content/lessons'
import type { UserData } from '../src/domain/types'

const NOW = new Date(2026, 9, 15, 12, 0)

function complete(data: UserData, lessonId: string, daysAgo = 0, correct = 1, total = 1) {
  const when = new Date(NOW)
  when.setDate(when.getDate() - daysAgo)
  data.completions[lessonId] = { completedAt: when.toISOString(), correct, total, xp: 50, reflectionWritten: false }
}

const unlocked = (data: UserData) => new Set(badgeStatuses(data, NOW).filter((b) => b.unlocked).map((b) => b.def.id))

describe('insignias', () => {
  it('ninguna insignia se desbloquea en una cuenta nueva', () => {
    expect(unlocked(emptyUserData()).size).toBe(0)
  })

  it('primera luz se desbloquea con la primera lección', () => {
    const data = emptyUserData()
    complete(data, ALL_LESSONS[0].id)
    expect(unlocked(data).has('primera-luz')).toBe(true)
  })

  it('constancia y semana usan la mejor racha, no la actual', () => {
    const data = emptyUserData()
    for (const d of [9, 8, 7, 6, 5, 4, 3]) complete(data, ALL_LESSONS[d].id, d)
    // Racha de 7 días hace una semana: sigue contando aunque hoy no haya actividad.
    const ids = unlocked(data)
    expect(ids.has('constancia')).toBe(true)
    expect(ids.has('semana')).toBe(true)
  })

  it('mente afilada requiere una lección con todas las respuestas correctas', () => {
    const data = emptyUserData()
    complete(data, ALL_LESSONS[0].id, 0, 1, 2)
    expect(unlocked(data).has('mente-afilada')).toBe(false)
    complete(data, ALL_LESSONS[1].id, 0, 2, 2)
    expect(unlocked(data).has('mente-afilada')).toBe(true)
  })

  it('cronista exige las cinco lecciones de Historia', () => {
    const data = emptyUserData()
    const historia = lessonsForTrack('historia')
    historia.slice(0, 4).forEach((l) => complete(data, l.id))
    expect(unlocked(data).has('cronista')).toBe(false)
    complete(data, historia[4].id)
    expect(unlocked(data).has('cronista')).toBe(true)
  })

  it('explorador se desbloquea con 150 XP y el progreso es proporcional', () => {
    const data = emptyUserData()
    complete(data, ALL_LESSONS[0].id) // 50 XP
    const status = badgeStatuses(data, NOW).find((b) => b.def.id === 'explorador')!
    expect(status.unlocked).toBe(false)
    expect(status.progress).toBeCloseTo(50 / 150)
  })

  it('el próximo hito es la insignia bloqueada con más progreso', () => {
    const data = emptyUserData()
    complete(data, ALL_LESSONS[0].id)
    complete(data, ALL_LESSONS[1].id)
    const next = nextBadge(data, NOW)
    expect(next).not.toBeNull()
    expect(next!.unlocked).toBe(false)
    expect(next!.progress).toBe(Math.max(...badgeStatuses(data, NOW).filter((b) => !b.unlocked).map((b) => b.progress)))
  })

  it('cada insignia tiene identificador único y meta positiva', () => {
    const ids = BADGES.map((b) => b.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const b of BADGES) expect(b.target).toBeGreaterThan(0)
  })
})

describe('XP y cofres', () => {
  it('el XP total suma lecciones y cofres', () => {
    const data = emptyUserData()
    complete(data, ALL_LESSONS[0].id)
    data.bonusXp['2026-10-15'] = 25
    expect(progressStats(data, NOW).totalXp).toBe(75)
  })

  it('cuenta los cofres abiertos', () => {
    const data = emptyUserData()
    data.bonusXp['2026-10-14'] = 10
    data.bonusXp['2026-10-15'] = 20
    const stats = progressStats(data, NOW)
    expect(stats.chestsOpened).toBe(2)
    expect(stats.chestOpenedToday).toBe(true)
  })
})

describe('actividad semanal', () => {
  it('devuelve siete días terminando hoy', () => {
    const days = lastSevenDays(emptyUserData(), NOW)
    expect(days).toHaveLength(7)
    expect(days[6].isToday).toBe(true)
    expect(days[6].key).toBe('2026-10-15')
    expect(days[0].key).toBe('2026-10-09')
  })

  it('suma minutos por día de lecciones completadas', () => {
    const data = emptyUserData()
    complete(data, ALL_LESSONS[0].id, 0)
    complete(data, ALL_LESSONS[1].id, 0)
    complete(data, ALL_LESSONS[2].id, 2)
    const days = lastSevenDays(data, NOW)
    expect(days[6].lessons).toBe(2)
    expect(days[6].minutes).toBe(10)
    expect(days[4].lessons).toBe(1)
    expect(days[5].minutes).toBe(0)
  })

  it('las etiquetas son letras de día en español', () => {
    const labels = lastSevenDays(emptyUserData(), NOW).map((d) => d.label)
    expect(labels.every((l) => 'DLMXJVS'.includes(l))).toBe(true)
  })
})
