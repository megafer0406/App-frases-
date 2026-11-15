import { plantilla } from '../config/plantilla'

export interface PageMeta {
  title: string
  description: string
}

const DEFAULT: PageMeta = {
  title: `${plantilla.nombre} · 5 minutos al día`,
  description: plantilla.tagline,
}

const RULES: { match: RegExp; title: string; description: string }[] = [
  { match: /^\/quiz$/, title: 'Tu perfil de aprendizaje', description: 'Unas preguntas cortas para saber qué ruta empezar.' },
  { match: /^\/analisis$/, title: 'Preparando tu resultado', description: 'Estamos revisando tus respuestas.' },
  { match: /^\/resultado$/, title: 'Tu resultado', description: 'El perfil de aprendizaje que sale de tus respuestas.' },
  { match: /^\/registro$/, title: 'Crear tu cuenta', description: 'Guarda tu plan y tu progreso en este dispositivo.' },
  { match: /^\/login$/, title: 'Entrar', description: 'Vuelve a tu plan y a tu progreso.' },
  { match: /^\/onboarding$/, title: 'Tu ruta y tu horario', description: 'Elige la ruta y la hora de tu lección diaria.' },
  { match: /^\/premium$/, title: 'Planes', description: 'Compara el plan anual y el mensual, y empieza con una prueba.' },
  { match: /^\/leccion\//, title: 'Lección', description: 'Una lección de 5 minutos con preguntas y una acción para hoy.' },
  { match: /^\/hoy$/, title: 'Hoy', description: 'Tu lección del día, tu racha y tu semana.' },
  { match: /^\/rutas$/, title: 'Rutas', description: 'Siete rutas de lecciones de 5 minutos.' },
  { match: /^\/rutas\//, title: 'Ruta', description: 'Las lecciones de esta ruta y tu avance en ella.' },
  { match: /^\/diario$/, title: 'Diario', description: 'Tus reflexiones guardadas.' },
  { match: /^\/perfil$/, title: 'Perfil', description: 'Tu progreso, tus insignias y tu suscripción.' },
  { match: /^\/legal\/privacidad$/, title: 'Privacidad', description: 'Qué datos guarda la app y dónde.' },
  { match: /^\/legal\/terminos$/, title: 'Términos del servicio', description: 'Condiciones de uso de la app.' },
  { match: /^\/legal\/reembolso$/, title: 'Política de reembolso', description: 'Cómo pedir un reembolso dentro de la garantía, a través de Hotmart.' },
]

/** Título y descripción de cada pantalla. Las rutas que no existen reciben un título propio. */
export function pageMeta(pathname: string): PageMeta {
  if (pathname === '/') return DEFAULT
  const rule = RULES.find((r) => r.match.test(pathname))
  if (!rule) return { title: `Página no encontrada · ${plantilla.nombre}`, description: plantilla.tagline }
  return { title: `${rule.title} · ${plantilla.nombre}`, description: rule.description }
}
