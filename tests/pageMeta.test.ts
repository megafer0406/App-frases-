import { describe, expect, it } from 'vitest'
import { pageMeta } from '../src/lib/pageMeta'
import { plantilla } from '../src/config/plantilla'

describe('título y descripción por pantalla', () => {
  it('la portada usa la marca y la promesa de la plantilla', () => {
    const m = pageMeta('/')
    expect(m.title).toBe(`${plantilla.nombre} · 5 minutos al día`)
    expect(m.description).toBe(plantilla.tagline)
  })

  it('cada pantalla principal lleva su propio título con la marca al final', () => {
    expect(pageMeta('/hoy').title).toBe(`Hoy · ${plantilla.nombre}`)
    expect(pageMeta('/rutas/historia').title).toBe(`Ruta · ${plantilla.nombre}`)
    expect(pageMeta('/legal/privacidad').title).toBe(`Privacidad · ${plantilla.nombre}`)
  })

  it('una ruta inexistente recibe el título de página no encontrada', () => {
    expect(pageMeta('/ruta-que-no-existe').title).toBe(`Página no encontrada · ${plantilla.nombre}`)
  })
})
