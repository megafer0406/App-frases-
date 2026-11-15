import { lessonsForTrack } from '../content/lessons'
import type { UserData } from '../domain/types'
import type { Tone } from '../content/art'
import { activityDays, progressStats } from './progress'
import { longestStreak } from './streak'

export type BadgeId =
  | 'primera-luz'
  | 'constancia'
  | 'semana'
  | 'mes'
  | 'voz-propia'
  | 'diario-vivo'
  | 'mente-afilada'
  | 'diez-pasos'
  | 'cronista'
  | 'estratega'
  | 'explorador'
  | 'coleccionista'

export interface BadgeDef {
  id: BadgeId
  title: string
  description: string
  /** Nombre del icono de lucide-react usado en la insignia. */
  icon: 'Sunrise' | 'Flame' | 'CalendarCheck' | 'Trophy' | 'PenLine' | 'BookOpen' | 'Target' | 'Footprints' | 'Landmark' | 'ChartNoAxesColumn' | 'Compass' | 'Gift'
  tone: Tone
  target: number
  /** Métrica actual de la persona para esta insignia. */
  metric: (data: UserData, now: Date) => number
}

const completedInTrack = (data: UserData, trackId: 'historia' | 'negocios') =>
  lessonsForTrack(trackId).filter((l) => data.completions[l.id]).length

export const BADGES: BadgeDef[] = [
  { id: 'primera-luz', title: 'Primera luz', description: 'Completa tu primera lección.', icon: 'Sunrise', tone: 'amber', target: 1, metric: (d) => Object.keys(d.completions).length },
  { id: 'constancia', title: 'Constancia', description: 'Tres días seguidos aprendiendo.', icon: 'Flame', tone: 'copper', target: 3, metric: (d) => longestStreak(activityDays(d)) },
  { id: 'semana', title: 'Una semana', description: 'Siete días seguidos aprendiendo.', icon: 'CalendarCheck', tone: 'sage', target: 7, metric: (d) => longestStreak(activityDays(d)) },
  { id: 'mes', title: 'Mes de hábito', description: 'Treinta días seguidos aprendiendo.', icon: 'Trophy', tone: 'amber', target: 30, metric: (d) => longestStreak(activityDays(d)) },
  { id: 'voz-propia', title: 'Voz propia', description: 'Escribe tu primera reflexión.', icon: 'PenLine', tone: 'copper', target: 1, metric: (d) => d.reflections.length },
  { id: 'diario-vivo', title: 'Diario vivo', description: 'Acumula diez reflexiones.', icon: 'BookOpen', tone: 'sage', target: 10, metric: (d) => d.reflections.length },
  {
    id: 'mente-afilada',
    title: 'Mente afilada',
    description: 'Responde sin errores una lección completa.',
    icon: 'Target',
    tone: 'amber',
    target: 1,
    metric: (d) => Object.values(d.completions).filter((c) => c.total > 0 && c.correct === c.total).length,
  },
  { id: 'diez-pasos', title: 'Diez pasos', description: 'Completa diez lecciones.', icon: 'Footprints', tone: 'sage', target: 10, metric: (d) => Object.keys(d.completions).length },
  { id: 'cronista', title: 'Cronista', description: 'Completa la ruta de Historia.', icon: 'Landmark', tone: 'copper', target: 5, metric: (d) => completedInTrack(d, 'historia') },
  { id: 'estratega', title: 'Estratega', description: 'Completa la ruta de Negocios.', icon: 'ChartNoAxesColumn', tone: 'amber', target: 4, metric: (d) => completedInTrack(d, 'negocios') },
  { id: 'explorador', title: 'Explorador', description: 'Alcanza 150 XP.', icon: 'Compass', tone: 'sage', target: 150, metric: (d, now) => progressStats(d, now).totalXp },
  { id: 'coleccionista', title: 'Agradecido', description: 'Abre cinco regalos diarios.', icon: 'Gift', tone: 'copper', target: 5, metric: (d) => Object.keys(d.bonusXp ?? {}).length },
]

export interface BadgeStatus {
  def: BadgeDef
  value: number
  unlocked: boolean
  /** Progreso de 0 a 1. */
  progress: number
}

export function badgeStatuses(data: UserData, now: Date = new Date()): BadgeStatus[] {
  return BADGES.map((def) => {
    const value = def.metric(data, now)
    return {
      def,
      value: Math.min(value, def.target),
      unlocked: value >= def.target,
      progress: Math.min(1, value / def.target),
    }
  })
}

/** La insignia bloqueada más cercana a conseguirse (para mostrar el próximo hito). */
export function nextBadge(data: UserData, now: Date = new Date()): BadgeStatus | null {
  return (
    badgeStatuses(data, now)
      .filter((b) => !b.unlocked)
      .sort((a, b) => b.progress - a.progress)[0] ?? null
  )
}
