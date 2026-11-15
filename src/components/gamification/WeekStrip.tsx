import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import type { DayActivity } from '../../lib/weekly'
import { cn } from '../../lib/cn'

/** Tira de siete días: cada día activo se marca; hoy tiene un anillo. */
export function WeekStrip({ days }: { days: DayActivity[] }) {
  return (
    <ol className="flex items-center justify-between gap-1.5" aria-label="Actividad de los últimos siete días">
      {days.map((d, i) => {
        const active = d.lessons > 0
        return (
          <li key={d.key} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05 * i, type: 'spring', stiffness: 300, damping: 20 }}
              className={cn(
                'relative grid aspect-square w-full max-w-10 place-items-center rounded-full border text-[13px] font-bold transition-colors',
                active ? 'border-amber/60 bg-amber text-bg' : 'border-line bg-surface-1 text-ink-muted',
                d.isToday && !active && 'border-amber/60 ring-2 ring-amber/30',
              )}
              aria-label={`${d.label}: ${active ? `${d.minutes} minutos` : 'sin actividad'}`}
            >
              {active ? <Check className="size-4" strokeWidth={3} aria-hidden /> : d.isToday ? <span className="size-1.5 rounded-full bg-amber" aria-hidden /> : null}
            </motion.span>
            <span className={cn('text-[11px] font-semibold', d.isToday ? 'text-amber' : 'text-ink-muted')}>{d.label}</span>
          </li>
        )
      })}
    </ol>
  )
}
