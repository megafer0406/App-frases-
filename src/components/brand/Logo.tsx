import { plantilla } from '../../config/plantilla'

/**
 * Marca de la app. Para usar tu propio logo, reemplaza este componente.
 * Mantener el tamaño y el uso de currentColor para que funcione en claro y oscuro.
 */
export function LogoMark({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <radialGradient id="logo-glow" cx="50%" cy="35%" r="70%">
          <stop offset="0" stopColor="#f6c96a" />
          <stop offset="1" stopColor="#b9811f" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity="0.15" />
      <circle cx="24" cy="24" r="11" fill="url(#logo-glow)" />
    </svg>
  )
}

/** Logo y nombre en una sola línea: el nombre de la marca nunca se parte. */
export function Wordmark() {
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <LogoMark />
      <span className="whitespace-nowrap font-display text-[19px] tracking-tight text-ink">{plantilla.nombre}</span>
    </div>
  )
}
