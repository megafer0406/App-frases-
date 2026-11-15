import type { PlanId } from '../domain/types'

/** Nombre visible de la app. Cámbialo aquí para usar tu marca. */

export const DAILY_LESSON_MINUTES = 5
export const FREE_LESSONS_PER_TRACK = 3
export const PASSWORD_MIN_LENGTH = 8
export const ROUTINE_GRACE_DAYS = 7
/** Regalo diario fijo: sin azar, para no parecerse a cajas de botín. */
export const DAILY_GIFT_XP = 20

/** Hashing: PBKDF2-SHA256 con sal aleatoria. Mantener alto en producción. */
export const PBKDF2_ITERATIONS = 210_000

export const STORAGE_KEY = 'sabiduria-v1'

export interface PlanConfig {
  id: PlanId
  label: string
  priceUsd: number
  periodLabel: string
  trialDays: number
  badge?: string
}

/**
 * Precios en USD (la moneda de la app) y días de prueba. Son sugeridos: confírmalos con tu oferta en Hotmart antes de vender.
 * El anual equivale a diez mensualidades y se presenta como «dos meses gratis». Las pantallas los marcan como demostración
 * mientras no haya cobro.
 */
export const PLANS: Record<PlanId, PlanConfig> = {
  anual: {
    id: 'anual',
    label: 'Anual',
    priceUsd: 39.9,
    periodLabel: 'al año',
    trialDays: 7,
  },
  mensual: {
    id: 'mensual',
    label: 'Mensual',
    priceUsd: 3.99,
    periodLabel: 'al mes',
    trialDays: 7,
  },
}
