import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { useEffect } from 'react'

interface AnimatedNumberProps {
  value: number
  duration?: number
  suffix?: string
  className?: string
}

/** Cuenta desde el valor anterior hasta el nuevo. Con cifras tabulares para que no baile. */
export function AnimatedNumber({ value, duration = 0.9, suffix, className }: AnimatedNumberProps) {
  const mv = useMotionValue(0)
  const display = useTransform(mv, (v) => Math.round(v).toLocaleString('es-MX'))

  useEffect(() => {
    const controls = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [value, duration, mv])

  return (
    <span className={`tabular ${className ?? ''}`}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
