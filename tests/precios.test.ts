import { describe, expect, it } from 'vitest'
import { PLANS } from '../src/config/app'

/** Textos que deben decir lo mismo que la configuración de precios (solo lectura). */
const textos = import.meta.glob(['../README.md', '../docs/CONECTAR.md', '../src/features/paywall/PaywallPage.tsx'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const centavos = (usd: number) => Math.round(usd * 100)
const texto = (sufijo: string) => Object.entries(textos).find(([ruta]) => ruta.endsWith(sufijo))?.[1] ?? ''

describe('precios sugeridos', () => {
  it('el anual equivale a diez mensualidades: dos meses gratis', () => {
    expect(centavos(PLANS.anual.priceUsd)).toBe(centavos(PLANS.mensual.priceUsd) * 10)
  })

  it('ambos precios en USD terminan en .99 o .90', () => {
    for (const plan of [PLANS.mensual, PLANS.anual]) {
      expect([99, 90], plan.id).toContain(centavos(plan.priceUsd) % 100)
    }
  })

  it('la mensualidad está en la franja de consumo o bienestar (3.99 a 7.99 USD)', () => {
    expect(PLANS.mensual.priceUsd).toBeGreaterThanOrEqual(3.99)
    expect(PLANS.mensual.priceUsd).toBeLessThanOrEqual(7.99)
  })

  it('ambos planes tienen 7 días de prueba y el README y la guía no dicen otra cantidad', () => {
    expect(PLANS.mensual.trialDays).toBe(7)
    expect(PLANS.anual.trialDays).toBe(7)
    for (const sufijo of ['README.md', 'CONECTAR.md', 'PaywallPage.tsx']) {
      expect(texto(sufijo), sufijo).not.toMatch(/\b(14|21) días\b/)
    }
  })

  it('el README y la guía del comprador dicen que los precios son sugeridos', () => {
    expect(texto('README.md')).toContain('Precios sugeridos: confirma tu oferta en Hotmart antes de vender.')
    expect(texto('docs/CONECTAR.md')).toContain('Precios sugeridos: confirma tu oferta en Hotmart antes de vender.')
  })

  it('el paywall dice «Dos meses gratis», no «Ahorra», y sus avisos de demostración quedan marcados para la captura', () => {
    const paywall = texto('PaywallPage.tsx')
    expect(paywall).toContain('Dos meses gratis')
    expect(paywall).not.toMatch(/Ahorra/)
    expect(paywall.match(/data-captura=/g)?.length ?? 0).toBeGreaterThanOrEqual(3)
  })
})
