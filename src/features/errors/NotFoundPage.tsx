import { motion } from 'motion/react'
import { ArrowRight, Compass } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button } from '../../components/ui/Button'
import { PageFrame, fadeUp } from '../../components/layout/PageFrame'
import { selectCurrentAccount, selectCurrentData, useAppStore } from '../../store/appStore'
import { hasOnboarded } from '../auth/guards'

/** Página 404: explica el error y lleva a un sitio útil según el estado de la persona. */
export function NotFoundPage() {
  const navigate = useNavigate()
  const account = useAppStore(selectCurrentAccount)
  const data = useAppStore(selectCurrentData)
  const enApp = Boolean(account && hasOnboarded(data))

  return (
    <PageFrame className="justify-center text-center">
      <motion.div {...fadeUp(0)} className="flex flex-col items-center">
        <div className="grid size-16 place-items-center rounded-2xl border border-amber/30 bg-surface-1 text-amber">
          <Compass className="size-8" aria-hidden />
        </div>
        <p className="mt-7 text-[13px] font-semibold tracking-wide text-amber">Error 404</p>
        <h1 className="mt-2 text-[32px] leading-tight">Esta página no existe</h1>
        <p className="mt-3 max-w-[34ch] text-[16px] leading-relaxed text-ink-muted">
          Puede que la dirección esté mal escrita o que la página haya cambiado.
        </p>
        <div className="mt-10 w-full">
          <Button onClick={() => navigate(enApp ? '/hoy' : '/', { replace: true })} icon={<ArrowRight className="size-5" aria-hidden />}>
            {enApp ? 'Ir a Hoy' : 'Ir al inicio'}
          </Button>
        </div>
      </motion.div>
    </PageFrame>
  )
}
