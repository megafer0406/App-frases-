const MS_PER_DAY = 86_400_000

/** Clave de día local en formato YYYY-MM-DD. */
export function dayKey(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function toUtcMs(key: string): number {
  const [y, m, d] = key.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

/** Días transcurridos de b a a: a - b. Positivo si a es posterior. */
export function diffDays(a: string, b: string): number {
  return Math.round((toUtcMs(a) - toUtcMs(b)) / MS_PER_DAY)
}

/** Desplaza una clave de día n días (negativo para retroceder). */
export function shiftDay(key: string, n: number): string {
  const date = new Date(toUtcMs(key) + n * MS_PER_DAY)
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, '0')
  const d = String(date.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function greetingFor(hour: number): string {
  if (hour < 12) return 'Buenos días'
  if (hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

export function formatDayLong(iso: string): string {
  const text = new Date(iso).toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function addDaysIso(iso: string, days: number): string {
  return new Date(new Date(iso).getTime() + days * MS_PER_DAY).toISOString()
}

/** «1 día», «21 días»: plural correcto en español. */
export function pluralDays(n: number): string {
  return `${n} ${n === 1 ? 'día' : 'días'}`
}
