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

/** Tilde de la «í» dibujada como un pequeño sol que nace: repite el símbolo dentro de la palabra. */
function TildeSol() {
  return (
    <span className="relative inline-block">
      ı
      <svg
        viewBox="0 0 26 14"
        aria-hidden
        className="absolute left-1/2 top-[0.06em] h-[0.2em] w-[0.38em] -translate-x-[62%] -rotate-[16deg]"
      >
        <path d="M2 13 A11 11 0 0 1 24 13 Z" fill="#e8a55b" />
      </svg>
    </span>
  )
}

/** Nombre de la marca: si lleva «í», su tilde se dibuja como el sol del logo. Lectores de pantalla leen el nombre tal cual. */
export function NombreMarca({ className }: { className?: string }) {
  const nombre = plantilla.nombre
  const i = nombre.lastIndexOf('í')
  return (
    <span className={className}>
      <span className="sr-only">{nombre}</span>
      <span aria-hidden>
        {i < 0 ? (
          nombre
        ) : (
          <>
            {nombre.slice(0, i)}
            <TildeSol />
            {nombre.slice(i + 1)}
          </>
        )}
      </span>
    </span>
  )
}

/** Logo y nombre en una sola línea: el nombre de la marca nunca se parte. */
export function Wordmark() {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <LogoMark className="size-9 text-ink" />
      <NombreMarca className="whitespace-nowrap font-display text-[24px] leading-none text-ink" />
    </div>
  )
}
