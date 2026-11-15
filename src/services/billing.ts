import type { PlanId } from '../domain/types'

/**
 * Frontera de pagos.
 *
 * Pagos simulados: no se cobra nada. El cobro y el reembolso de la plantilla van por Hotmart: esta función
 * no se conecta a Hotmart hoy. Para cobrar de verdad, ver docs/CONECTAR.md (Hotmart y confirmación de compra).
 */
export interface PurchaseResult {
  ok: boolean
  plan: PlanId
  message?: string
}

const SIMULATED_LATENCY_MS = 1400

export async function startTrialCheckout(plan: PlanId): Promise<PurchaseResult> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))
  return { ok: true, plan }
}
