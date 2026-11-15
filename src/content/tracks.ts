import type { Track, TrackId } from '../domain/types'

export const TRACKS: Track[] = [
  {
    id: 'historia',
    title: 'Historia que no puedes ignorar',
    subtitle: 'Guerras, revoluciones y hechos que todo adulto debe conocer',
    description:
      'Entiende los momentos que explican el mundo de hoy: cómo cayó Roma, por qué estalló la Revolución francesa y cómo se gestaron las dos guerras mundiales.',
    icon: 'landmark',
  },
  {
    id: 'filosofia',
    title: 'Filosofía y mitos',
    subtitle: 'Relatos antiguos que siguen describiendo tu vida',
    description:
      'Platón, Camus, Epicteto y Ovidio tienen algo que decirte hoy sobre las creencias, la perseverancia, el control y la desmesura.',
    icon: 'scroll',
  },
  {
    id: 'liderazgo',
    title: 'Liderazgo con método',
    subtitle: 'Cómo ver, dar feedback y guiar a tu equipo',
    description:
      'Modelos clásicos de liderazgo y de comunicación que puedes aplicar en la próxima reunión, sin necesidad de un título.',
    icon: 'compass',
  },
  {
    id: 'negocios',
    title: 'Negocios para líderes',
    subtitle: 'Qué hace cada C-level y qué números revisar cada mes',
    description:
      'Diferencia CEO, CTO, COO y CFO. Calcula tu punto de equilibrio y aprende a leer el flujo de caja antes de que sea tarde.',
    icon: 'chart',
  },
  {
    id: 'mentalidad',
    title: 'Mentalidad y hábitos',
    subtitle: 'Progreso pequeño que se vuelve grande',
    description:
      'La matemática del 1% diario, cómo convertir una intención en un hábito y cómo repasar para que lo aprendido no se borre.',
    icon: 'sprout',
  },
  {
    id: 'pensamiento',
    title: 'Pensamiento y decisiones',
    subtitle: 'Errores de razonamiento que cuestan caro',
    description:
      'Sesgos que te hacen creer lo que ya crees, datos que nunca ves y causas que explican la mayor parte de los resultados.',
    icon: 'scale',
  },
  {
    id: 'dinero',
    title: 'Dinero con criterio',
    subtitle: 'Las bases que casi nadie te enseñó',
    description:
      'Interés compuesto, colchón de emergencia y una regla simple de presupuesto. Educación financiera, no asesoría.',
    icon: 'coins',
  },
]

export const TRACK_IDS: TrackId[] = TRACKS.map((t) => t.id)

export function getTrack(id: TrackId): Track {
  const track = TRACKS.find((t) => t.id === id)
  if (!track) throw new Error(`Ruta desconocida: ${id}`)
  return track
}
