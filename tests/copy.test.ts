import { describe, expect, it } from 'vitest'
import { plantilla } from '../src/config/plantilla'
import { textoGarantia } from '../src/lib/garantia'

/** Código fuente de la app (solo lectura), para vigilar frases que no pueden volver a aparecer. */
const fuentes = import.meta.glob('../src/**/*.{ts,tsx,css}', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const textos = Object.entries(fuentes).map(([ruta, texto]) => ({ ruta, texto }))

describe('garantía de 7 días', () => {
  it('la plantilla ofrece 7 días y la frase visible es «Garantía de 7 días»', () => {
    expect(plantilla.garantiaDias).toBe(7)
    expect(textoGarantia()).toBe('Garantía de 7 días')
  })

  it('sin garantía no hay texto, y un día usa el singular', () => {
    expect(textoGarantia(null)).toBeNull()
    expect(textoGarantia(1)).toBe('Garantía de 1 día')
  })

  it('ninguna mención escrita en la app usa otra duración de garantía', () => {
    const menciones = textos
      .filter(({ ruta }) => !ruta.endsWith('lib/garantia.ts'))
      .flatMap(({ texto }) => [...texto.matchAll(/[Gg]arant[ií]a de (\d+) d[ií]as?/g)].map((m) => m[1]))
    expect(menciones.length).toBeGreaterThan(0)
    expect(new Set(menciones)).toEqual(new Set(['7']))
  })
})

describe('frases de cancelación y precio verificadas contra Hotmart', () => {
  it('no queda «en dos toques» ni la promesa de no cobrar nada más', () => {
    for (const { ruta, texto } of textos) {
      expect(texto, ruta).not.toMatch(/dos toques/i)
      expect(texto, ruta).not.toMatch(/No te cobraremos nada más/)
      expect(texto, ruta).not.toMatch(/Sin encuesta obligatoria/)
    }
  })

  it('la portada conserva CTA al inicio y al final con id estable y data-evento', () => {
    const portada = textos.find(({ ruta }) => ruta.endsWith('features/funnel/WelcomePage.tsx'))?.texto ?? ''
    for (const id of ['cta-portada-arriba', 'cta-portada-final']) {
      expect(portada).toContain(`id="${id}"`)
    }
    expect(portada).toContain('data-evento="inicio-quiz"')
  })

  it('el CTA de prueba del paywall marca el inicio de compra', () => {
    const paywall = textos.find(({ ruta }) => ruta.endsWith('features/paywall/PaywallPage.tsx'))?.texto ?? ''
    expect(paywall).toContain('id="cta-premium-prueba"')
    expect(paywall).toContain('data-evento="inicio-compra"')
  })
})

describe('páginas de venta sin palabras de ejemplo', () => {
  it('la portada, su captura, el paywall y el onboarding no dicen «ejemplo», «ficticio» ni «de muestra»', () => {
    for (const sufijo of [
      'features/funnel/WelcomePage.tsx',
      'features/funnel/HeroCaptura.tsx',
      'features/paywall/PaywallPage.tsx',
      'features/onboarding/OnboardingPage.tsx',
    ]) {
      const texto = textos.find(({ ruta }) => ruta.endsWith(sufijo))?.texto ?? ''
      expect(texto.length, sufijo).toBeGreaterThan(0)
      expect(texto, sufijo).not.toMatch(/ejemplo|ficticio|de muestra/i)
    }
  })
})
