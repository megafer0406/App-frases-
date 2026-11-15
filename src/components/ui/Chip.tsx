import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ChipProps {
  selected: boolean
  onSelect: () => void
  children: ReactNode
  icon?: ReactNode
  className?: string
}

/** Opción seleccionable grande, pensada para el pulgar. */
export function Chip({ selected, onSelect, children, icon, className }: ChipProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 520, damping: 32 }}
      onClick={onSelect}
      className={cn(
        'flex min-h-14 w-full items-center gap-3 rounded-btn border px-4 text-left text-[16px] font-medium transition-colors duration-200',
        selected
          ? 'border-amber/70 bg-amber/10 text-ink shadow-[0_0_0_1px_rgb(175_75_43/0.25)]'
          : 'border-line bg-surface-1 text-ink hover:border-ink/20',
        className,
      )}
    >
      {icon && <span className={cn('shrink-0', selected ? 'text-amber' : 'text-ink-muted')}>{icon}</span>}
      <span className="flex-1">{children}</span>
      <span
        className={cn(
          'grid size-6 shrink-0 place-items-center rounded-full border transition-colors',
          selected ? 'border-amber bg-amber text-bg' : 'border-ink/20',
        )}
        aria-hidden
      >
        {selected && <Check className="size-3.5" strokeWidth={3} />}
      </span>
    </motion.button>
  )
}
