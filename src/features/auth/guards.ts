import type { UserData } from '../../domain/types'

/** ¿Terminó el onboarding (objetivo y horario)? */
export function hasOnboarded(data: UserData | null): boolean {
  return Boolean(data?.onboarding.completedAt)
}
