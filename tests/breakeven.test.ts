import { describe, expect, it } from 'vitest'
import { breakeven } from '../src/lib/breakeven'

describe('breakeven', () => {
  it('calcula unidades y ventas del ejemplo de la lección', () => {
    const result = breakeven({ fixedCosts: 20000, price: 80, variableCost: 40 })
    expect(result).toEqual({ contributionPerUnit: 40, units: 500, sales: 40000 })
  })

  it('redondea hacia arriba las unidades', () => {
    const result = breakeven({ fixedCosts: 100, price: 10, variableCost: 3 })
    expect(result?.units).toBe(15) // 100 / 7 = 14.28…
  })

  it('devuelve null si el precio no cubre el costo variable', () => {
    expect(breakeven({ fixedCosts: 1000, price: 30, variableCost: 30 })).toBeNull()
    expect(breakeven({ fixedCosts: 1000, price: 20, variableCost: 30 })).toBeNull()
  })

  it('devuelve null con precio cero o costos fijos negativos', () => {
    expect(breakeven({ fixedCosts: 1000, price: 0, variableCost: 0 })).toBeNull()
    expect(breakeven({ fixedCosts: -1, price: 10, variableCost: 2 })).toBeNull()
  })

  it('sin costos fijos el equilibrio es cero unidades', () => {
    expect(breakeven({ fixedCosts: 0, price: 10, variableCost: 2 })?.units).toBe(0)
  })
})
