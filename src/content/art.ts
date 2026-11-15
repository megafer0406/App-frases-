import type { ArchetypeId, TrackId } from '../domain/types'

/** Escenas SVG que ilustran un concepto cuando no hay imagen real. */
export type SceneId =
  | 'stairs'
  | 'bars'
  | 'lens'
  | 'pie'
  | 'gauge'
  | 'org'
  | 'breakeven'
  | 'flow'
  | 'sbi'
  | 'target'
  | 'shield'
  | 'curve'
  | 'team'
  | 'coins'
  | 'timeline'
  | 'split'
  | 'quad'
  | 'dashboard'
  | 'scale'
  | 'compass'

export type Tone = 'amber' | 'copper' | 'sage'

export interface ArtConfig {
  /** Ruta dentro de /public. Si falta el archivo, se muestra la escena. */
  image?: string
  scene: SceneId
  tone: Tone
}

/** Imágenes en /public/img. Créditos en /public/img/CREDITS.md. */
const img = (name: string) => `/img/${name}`

export const LESSON_ART: Record<string, ArtConfig> = {
  'hist-caida-roma': { image: img('lec-roma.jpg'), scene: 'timeline', tone: 'copper' },
  'hist-revolucion-francesa': { image: img('lec-revolucion.jpg'), scene: 'timeline', tone: 'amber' },
  'hist-guerras-mundiales': { image: img('lec-guerras.jpg'), scene: 'timeline', tone: 'copper' },
  'hist-crisis-misiles': { image: img('lec-crisis-misiles.jpg'), scene: 'target', tone: 'copper' },
  'hist-independencias-1810': { image: img('lec-independencia.jpg'), scene: 'timeline', tone: 'sage' },

  'fil-caverna-platon': { image: img('lec-caverna.jpg'), scene: 'lens', tone: 'amber' },
  'fil-sisifo-camus': { image: img('lec-sisifo.jpg'), scene: 'stairs', tone: 'copper' },
  'fil-epicteto-control': { image: img('lec-epicteto.jpg'), scene: 'split', tone: 'sage' },
  'fil-icaro-desmesura': { image: img('lec-icaro.jpg'), scene: 'gauge', tone: 'copper' },

  'lid-teoria-x-y': { scene: 'team', tone: 'sage' },
  'lid-feedback-sbi': { scene: 'sbi', tone: 'amber' },
  'lid-efecto-pigmalion': { image: img('lec-pigmalion.jpg'), scene: 'team', tone: 'amber' },
  'lid-liderazgo-situacional': { scene: 'quad', tone: 'sage' },

  'neg-ceo-cto-coo': { scene: 'org', tone: 'amber' },
  'neg-punto-equilibrio': { scene: 'breakeven', tone: 'amber' },
  'neg-seis-metricas': { scene: 'dashboard', tone: 'sage' },
  'neg-caja-rentabilidad': { scene: 'flow', tone: 'copper' },

  'men-regla-1-por-ciento': { scene: 'stairs', tone: 'sage' },
  'men-intencion-implementacion': { scene: 'target', tone: 'amber' },
  'men-curva-olvido': { image: img('lec-ebbinghaus.jpg'), scene: 'curve', tone: 'sage' },

  'pen-sesgo-confirmacion': { scene: 'lens', tone: 'copper' },
  'pen-sesgo-supervivencia': { image: img('lec-bombarderos.jpg'), scene: 'target', tone: 'copper' },
  'pen-pareto': { image: img('lec-pareto.jpg'), scene: 'bars', tone: 'amber' },

  'din-interes-compuesto': { image: img('lec-monedas.jpg'), scene: 'bars', tone: 'amber' },
  'din-fondo-emergencia': { image: img('lec-alcancia.jpg'), scene: 'shield', tone: 'sage' },
  'din-50-30-20': { scene: 'pie', tone: 'copper' },
}

export const TRACK_ART: Record<TrackId, ArtConfig> = {
  historia: { image: img('lec-roma.jpg'), scene: 'timeline', tone: 'copper' },
  filosofia: { image: img('hero-escuela-atenas.jpg'), scene: 'lens', tone: 'amber' },
  liderazgo: { scene: 'team', tone: 'sage' },
  negocios: { image: img('track-ciudad-negocios.jpg'), scene: 'dashboard', tone: 'amber' },
  mentalidad: { image: img('track-brote.jpg'), scene: 'stairs', tone: 'sage' },
  pensamiento: { scene: 'lens', tone: 'copper' },
  dinero: { image: img('lec-monedas.jpg'), scene: 'coins', tone: 'amber' },
}

export const ARCHETYPE_ART: Record<ArchetypeId, ArtConfig> = {
  curioso: { image: img('lec-caverna.jpg'), scene: 'lens', tone: 'amber' },
  lider: { scene: 'team', tone: 'sage' },
  estratega: { scene: 'dashboard', tone: 'copper' },
  constante: { scene: 'stairs', tone: 'sage' },
}
