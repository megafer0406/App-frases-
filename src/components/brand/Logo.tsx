import { plantilla } from '../../config/plantilla'

/**
 * Marca de la app: un sol que nace sobre el horizonte (provisional hasta tener el logo definitivo).
 * Para usar tu propio logo, reemplaza este componente.
 * El horizonte usa currentColor para que funcione sobre fondos claros y oscuros.
 */
export function LogoMark({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M11 29 A13 13 0 0 1 37 29 Z" fill="#e8a55b" />
      <line x1="6" y1="29" x2="42" y2="29" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="15" y1="35.5" x2="33" y2="35.5" stroke="currentColor" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/** Logo y nombre en una sola línea: el nombre de la marca nunca se parte. */
export function Wordmark() {
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <LogoMark className="size-9 text-ink" />
      <span className="whitespace-nowrap font-display text-[19px] tracking-tight text-ink">{plantilla.nombre}</span>
    </div>
  )
}
