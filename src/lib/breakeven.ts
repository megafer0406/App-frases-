export interface BreakevenInput {
  /** Costos fijos del periodo (renta, nómina base, software). */
  fixedCosts: number
  /** Precio de venta por unidad. */
  price: number
  /** Costo variable por unidad (materiales, comisiones, envío). */
  variableCost: number
}

export interface BreakevenResult {
  /** Margen de contribución por unidad: precio − costo variable. */
  contributionPerUnit: number
  /** Unidades que hay que vender para no ganar ni perder. */
  units: number
  /** Ventas en moneda necesarias para cubrir costos. */
  sales: number
}

/**
 * Punto de equilibrio:
 *   unidades = costos fijos / (precio − costo variable)
 *   ventas   = unidades × precio
 *
 * Devuelve null si el precio no cubre el costo variable: nunca habría equilibrio.
 */
export function breakeven(input: BreakevenInput): BreakevenResult | null {
  const contributionPerUnit = input.price - input.variableCost
  if (input.fixedCosts < 0 || input.price <= 0 || contributionPerUnit <= 0) return null
  const units = Math.ceil(input.fixedCosts / contributionPerUnit)
  return {
    contributionPerUnit,
    units,
    sales: units * input.price,
  }
}
