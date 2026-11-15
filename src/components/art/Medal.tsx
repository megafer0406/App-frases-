import { motion } from 'motion/react'
import { Lock, type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { Tone } from '../../content/art'

const RING: Record<Tone, string> = {
  amber: 'from-[#F1C48F] via-[#E8A55B] to-[#AF4B2B]',
  copper: 'from-[#EBA384] via-[#D9825B] to-[#9C5A3A]',
  sage: 'from-[#BFD1BC] via-[#9DB39A] to-[#5F7A5C]',
}

/** Insignia con brillo al desbloquear. Bloqueada se ve apagada y con candado. */
export function Medal({
  Icon,
  unlocked,
  tone = 'amber',
  size = 64,
  className,
}: {
  Icon: LucideIcon
  unlocked: boolean
  tone?: Tone
  size?: number
  className?: string
}) {
  return (
    <div className={cn('relative shrink-0 overflow-hidden rounded-full p-[3px]', unlocked ? `bg-gradient-to-br ${RING[tone]}` : 'bg-line', className)} style={{ width: size, height: size }}>
      <div className="relative grid size-full place-items-center rounded-full bg-surface-2">
        <Icon
          className={cn('size-1/2', unlocked ? (tone === 'copper' ? 'text-copper' : tone === 'sage' ? 'text-sage' : 'text-amber') : 'text-ink-muted/40')}
          strokeWidth={2}
          aria-hidden
        />
        {!unlocked && <Lock className="absolute bottom-[12%] right-[12%] size-[30%] text-ink-muted" aria-hidden />}
        {unlocked && (
          <motion.span
            aria-hidden
            className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ x: '-120%' }}
            animate={{ x: '320%' }}
            transition={{ duration: 0.25, delay: 0.2, ease: 'easeInOut' }}
          />
        )}
      </div>
    </div>
  )
}
