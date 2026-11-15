import { motion } from 'motion/react'
import { BADGE_ICONS } from './badgeIcons'
import type { BadgeStatus } from '../../lib/badges'
import { Medal } from '../art/Medal'
import { cn } from '../../lib/cn'

/** Cuadrícula de insignias. Las bloqueadas muestran su progreso. */
export function BadgeGrid({ badges, onPick }: { badges: BadgeStatus[]; onPick?: (b: BadgeStatus) => void }) {
  return (
    <ul className="grid grid-cols-3 gap-x-3 gap-y-5 md:grid-cols-6">
      {badges.map((b, i) => {
        const Icon = BADGE_ICONS[b.def.icon]
        return (
          <li key={b.def.id}>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i }}
              onClick={() => onPick?.(b)}
              className={cn('flex w-full flex-col items-center gap-2 text-center', !b.unlocked && 'opacity-80')}
              aria-label={`${b.def.title}: ${b.unlocked ? 'desbloqueada' : `${Math.round(b.progress * 100)}% de progreso`}`}
            >
              <Medal Icon={Icon} unlocked={b.unlocked} tone={b.def.tone} size={72} />
              <span className="text-[13px] leading-tight font-semibold">{b.def.title}</span>
              {!b.unlocked && (
                <span className="h-1 w-full overflow-hidden rounded-full bg-line">
                  <span className="block h-full rounded-full bg-amber" style={{ width: `${b.progress * 100}%` }} />
                </span>
              )}
            </motion.button>
          </li>
        )
      })}
    </ul>
  )
}
