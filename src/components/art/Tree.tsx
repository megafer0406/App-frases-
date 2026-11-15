import { motion } from 'motion/react'
import { cn } from '../../lib/cn'

/**
 * Árbol del saber: la mascota de la app. Crece con el nivel (0 a 5).
 * Cada etapa se dibuja en código para que no dependa de imágenes externas.
 */
export const TREE_STAGES = ['Semilla', 'Brote', 'Planta', 'Arbusto', 'Árbol', 'Árbol del saber'] as const

export function Tree({ stage, size = 160, className }: { stage: number; size?: number; className?: string }) {
  const s = Math.max(0, Math.min(5, stage))
  const trunkTop = [176, 160, 132, 110, 84, 84][s]
  const trunkW = [0, 0, 6, 8, 10, 10][s]
  const crownCenterY = [176, 158, 118, 84, 70, 62][s]
  const leaf = s >= 5 ? '#E9B44C' : s >= 3 ? '#7E9A7B' : '#9DB39A'

  return (
    <div className={cn('relative grid place-items-center', className)} style={{ width: size, height: size }} role="img" aria-label={`Tu árbol: ${TREE_STAGES[s]}`}>
      <svg viewBox="0 0 200 200" className="size-full overflow-visible" aria-hidden>
        <ellipse cx={100} cy={182} rx={56} ry={9} fill="rgba(233,180,76,0.14)" />

        {s === 0 && (
          <motion.g initial={{ scale: 0.6 }} animate={{ scale: 1 }} style={{ transformOrigin: '100px 180px' }} transition={{ type: 'spring', stiffness: 160, damping: 14 }}>
            <ellipse cx={100} cy={178} rx={22} ry={8} fill="#8A6A3C" />
            <path d="M100 174 V160" stroke="#9DB39A" strokeWidth={4} strokeLinecap="round" />
            <path d="M100 162 C 84 158, 80 144, 88 138 C 98 146, 100 154, 100 162 Z" fill={leaf} />
            <path d="M100 160 C 116 156, 122 142, 114 136 C 104 144, 100 152, 100 160 Z" fill="#BFD1BC" />
          </motion.g>
        )}

        {s >= 1 && s < 2 && (
          <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: '100px 176px' }} transition={{ duration: 0.25 }}>
            <path d="M100 176 V120" stroke="#9DB39A" strokeWidth={5} strokeLinecap="round" />
            <path d="M100 136 C 78 132, 70 112, 80 102 C 96 110, 102 124, 100 136 Z" fill={leaf} />
            <path d="M100 128 C 122 124, 130 104, 120 94 C 104 102, 98 116, 100 128 Z" fill="#BFD1BC" />
          </motion.g>
        )}

        {s >= 2 && (
          <g>
            <motion.rect x={100 - trunkW / 2} y={trunkTop} width={trunkW} height={176 - trunkTop} rx={3} fill="#8A6A3C" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: '100px 176px' }} transition={{ duration: 0.25 }} />
            <g>
              {s === 2 && (
                <>
                  <circle cx={100} cy={crownCenterY} r={22} fill={leaf} />
                  <circle cx={80} cy={crownCenterY + 10} r={14} fill="#BFD1BC" />
                  <circle cx={122} cy={crownCenterY + 8} r={14} fill="#7E9A7B" />
                </>
              )}
              {s === 3 && (
                <>
                  <circle cx={100} cy={crownCenterY} r={34} fill={leaf} />
                  <circle cx={70} cy={crownCenterY + 14} r={20} fill="#7E9A7B" />
                  <circle cx={132} cy={crownCenterY + 12} r={22} fill="#BFD1BC" />
                </>
              )}
              {s >= 4 && (
                <>
                  <circle cx={100} cy={crownCenterY} r={46} fill={leaf} />
                  <circle cx={64} cy={crownCenterY + 20} r={28} fill="#7E9A7B" />
                  <circle cx={138} cy={crownCenterY + 18} r={30} fill="#BFD1BC" />
                  <circle cx={100} cy={crownCenterY - 30} r={24} fill="#BFD1BC" />
                </>
              )}
              {s === 5 && (
                <>
                  <circle cx={100} cy={crownCenterY} r={62} fill="rgba(233,180,76,0.18)" />
                  {[
                    [80, 40],
                    [126, 50],
                    [60, 74],
                    [144, 80],
                    [104, 24],
                  ].map(([x, y]) => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r={4} fill="#F6C96A" />
                  ))}
                </>
              )}
            </g>
          </g>
        )}
      </svg>
    </div>
  )
}
