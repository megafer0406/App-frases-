import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Contenedor de pantalla: centrado en escritorio, margen de 20 px y entrada coreografiada. */
export function PageFrame({
  children,
  className,
  withNav = false,
}: {
  children: ReactNode
  className?: string
  withNav?: boolean
}) {
  return (
    <motion.main
      className={cn(
        'relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))]',
        withNav && 'md:max-w-[720px] md:px-8',
        !className?.includes('pb-') && (withNav ? 'pb-32' : 'pb-[max(2rem,env(safe-area-inset-bottom))]'),
        className,
      )}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  )
}

/** Animación de entrada para bloques dentro de una pantalla (usa stagger manual por índice). */
export const fadeUp = (index = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, delay: 0.06 * index, ease: [0.16, 1, 0.3, 1] as const },
})
