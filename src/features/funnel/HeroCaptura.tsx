import { motion } from 'motion/react'
import { Clock3 } from 'lucide-react'
import { ArtFrame } from '../../components/art/LessonArt'
import { DAILY_LESSON_MINUTES } from '../../config/app'
import { plantilla } from '../../config/plantilla'
import { cn } from '../../lib/cn'

/** Rombo dorado de las esquinas del marco. Es un adorno: no se lee. */
function Rombo({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={cn('absolute size-5', className)}>
      <path d="M10 1.5 L18.5 10 L10 18.5 L1.5 10 Z" className="fill-bg stroke-amber" strokeWidth="1.25" />
      <path d="M10 6.5 L13.5 10 L10 13.5 L6.5 10 Z" className="fill-amber" />
    </svg>
  )
}

/**
 * Firma de la portada: la pintura de siempre, un marco ornamental dorado y la captura real de Hoy dentro de un
 * dispositivo. Se ve solo la mitad superior de la pantalla; la base se funde con el fondo. Sin citas ni cifras.
 */
export function HeroCaptura() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative -mx-5 mt-6 md:col-start-2 md:row-span-2 md:row-start-2 md:mx-0 md:mt-0"
    >
      <ArtFrame
        art={{ image: '/img/hero-escuela-atenas-900.webp', scene: 'lens', tone: 'amber' }}
        alta
        rounded="rounded-none md:rounded-card"
        className="flex flex-col items-center border-0 pb-20 pt-12 md:h-[560px] md:justify-center md:self-start md:pb-24 md:pt-0"
      >
        <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[1.4rem] border border-amber/60 md:inset-4">
          <div className="absolute inset-[5px] rounded-[1.1rem] border border-amber/30" />
          <Rombo className="-left-2.5 -top-2.5" />
          <Rombo className="-right-2.5 -top-2.5" />
          <Rombo className="-bottom-2.5 -left-2.5" />
          <Rombo className="-bottom-2.5 -right-2.5" />
        </div>

        <div className="captura-flota captura-mascara relative z-[1] w-[min(268px,74%)] overflow-hidden rounded-t-[2.6rem] border-[7px] border-b-0 border-surface-2 bg-bg shadow-[0_30px_60px_-28px_rgb(31_61_56/0.45)]">
          <img
            src="/img/captura-hoy.webp"
            alt={`Pantalla principal de la app ${plantilla.nombre}`}
            width={780}
            height={980}
            fetchPriority="high"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[40%] bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[2] flex justify-center">
          <span className="mb-4 flex items-center gap-2 rounded-full border border-amber/30 bg-bg px-4 py-2 text-[13px] font-semibold text-amber">
            <Clock3 className="size-4" aria-hidden /> {DAILY_LESSON_MINUTES} minutos al día
          </span>
        </div>
      </ArtFrame>
    </motion.div>
  )
}
