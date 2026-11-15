import { plantilla } from '../config/plantilla'

/**
 * Texto visible de la garantía, o null si la plantilla no ofrece garantía.
 * Única fuente de la frase «Garantía de N días»: cualquier mención la usa desde aquí.
 */
export function textoGarantia(dias: number | null = plantilla.garantiaDias): string | null {
  if (!dias) return null
  return dias === 1 ? 'Garantía de 1 día' : `Garantía de ${dias} días`
}
