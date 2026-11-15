import { AnimatePresence, motion } from 'motion/react'
import { Gift, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { DAILY_GIFT_XP } from '../../config/app'
import { dayKey } from '../../lib/dates'
import { chime, haptic } from '../../lib/feedback'
import { selectCurrentData, useAppStore } from '../../store/appStore'

/** Regalo diario de XP fijo y un dato de bolsillo. Se abre una vez al día. */
export function DailyGift({ fact }: { fact?: string }) {
  const data = useAppStore(selectCurrentData)
  const openChest = useAppStore((s) => s.openChest)
  const sound = useAppStore((s) => s.prefs.sound)
  const opened = Boolean(data?.bonusXp[dayKey()])
  const [opening, setOpening] = useState(false)

  const open = () => {
    if (opening || opened) return
    setOpening(true)
    haptic([10, 40, 10])
    window.setTimeout(() => {
      openChest(DAILY_GIFT_XP)
      chime('win', sound)
      haptic(30)
    }, 300)
  }

  return (
    <div className="card-surface overflow-hidden rounded-card p-5">
      <div className="flex items-center gap-4">
        <motion.div
          animate={opening && !opened ? { rotate: [0, -8, 8, -8, 8, 0], scale: [1, 1.08, 1] } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#F6C96A] to-[#B9811F] text-bg shadow-[0_4px_14px_-6px_rgb(233_180_76/0.5)]"
        >
          {opened ? <Sparkles className="size-7" aria-hidden /> : <Gift className="size-7" aria-hidden />}
        </motion.div>
        <div className="flex-1">
          <p className="text-[17px] font-bold">{opened ? `+${DAILY_GIFT_XP} XP de regalo` : 'Regalo de hoy'}</p>
          <p className="mt-0.5 text-[13px] text-ink-muted">{opened ? 'Vuelve mañana por otro.' : 'Un regalo por completar tu lección.'}</p>
        </div>
        {!opened && (
          <Button fullWidth={false} onClick={open} loading={opening} className="min-h-12 px-5">
            Abrir
          </Button>
        )}
      </div>
      <AnimatePresence>
        {opened && fact && (
          <motion.p
            key="fact"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.25 }}
            className="mt-4 rounded-btn border border-line bg-bg/60 p-4 font-display text-[16px] leading-snug text-ink"
          >
            {fact}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
