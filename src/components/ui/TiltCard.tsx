import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from 'motion/react'
import { useRef } from 'react'
import { cn } from '../../lib/cn'

/** Tarjeta que se inclina siguiendo el puntero. Detalle premium, desactivado con reducir movimiento. */
export function TiltCard({ className, children, ...rest }: HTMLMotionProps<'div'>) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 180, damping: 18 })

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box || e.pointerType === 'touch') return
    px.set((e.clientX - box.left) / box.width)
    py.set((e.clientY - box.top) / box.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn('will-change-transform', className)}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
