import {
  BookOpen,
  CalendarCheck,
  ChartNoAxesColumn,
  Compass,
  Flame,
  Footprints,
  Gift,
  Landmark,
  PenLine,
  Sunrise,
  Target,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import type { BadgeDef } from '../../lib/badges'

/**
 * Icono de cada insignia, importado por nombre. Así el build solo incluye estos doce iconos
 * y no todo el paquete de lucide-react en un chunk aparte.
 */
export const BADGE_ICONS: Record<BadgeDef['icon'], LucideIcon> = {
  Sunrise,
  Flame,
  CalendarCheck,
  Trophy,
  PenLine,
  BookOpen,
  Target,
  Footprints,
  Landmark,
  ChartNoAxesColumn,
  Compass,
  Gift,
}
