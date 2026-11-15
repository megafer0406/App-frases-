import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface ProgressRingProps {
  /** Valor de 0 a 1. */
  value: number
  size?: number
  stroke?: number
  children?: ReactNode
  label?: string
}

export function ProgressRing({ value, size = 128, stroke = 6, children, label }: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(1, value))
  const r = (size - stroke) / 2
  const c = size / 2
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
        <motion.circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: clamped }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e8a55b" />
            <stop offset="1" stopColor="#af4b2b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}
