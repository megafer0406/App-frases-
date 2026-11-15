import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, Check, CircleCheck, Lock, ShieldCheck, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { Button } from '../../components/ui/Button'
import { Confetti } from '../../components/ui/Confetti'
import { ProgressRing } from '../../components/ui/ProgressRing'
import { PageFrame, fadeUp } from '../../components/layout/PageFrame'
import { ArtFrame } from '../../components/art/LessonArt'
import { FREE_LESSONS_PER_TRACK, PLANS } from '../../config/app'
import type { PlanId } from '../../domain/types'
import { hasPremium } from '../../lib/access'
import { textoGarantia } from '../../lib/garantia'
import { addDaysIso, formatDateShort } from '../../lib/dates'
import { cn } from '../../lib/cn'
import { startTrialCheckout } from '../../services/billing'
import { track } from '../../services/analytics'
import { selectCurrentAccount, selectCurrentData, useAppStore } from '../../store/appStore'
import { hasOnboarded } from '../auth/guards'
import { conexiones } from '../../config/plantilla'
import { EnlacesLegales } from '../legal/LegalPages'

const BENEFITS = [
  'Las 26 lecciones de las 7 rutas',
  'Diario de reflexiones sin límite',
  'Preguntas de repaso para volver a las ideas aprendidas',
  'Elige la hora diaria de tu lección',
  'Un día de descanso a la semana: una pausa no rompe tu racha',
]

type Phase = 'idle' | 'processing' | 'done'

export function PaywallPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const account = useAppStore(selectCurrentAccount)
  const data = useAppStore(selectCurrentData)
  const startTrial = useAppStore((s) => s.startTrial)

  const [plan, setPlan] = useState<PlanId>('anual')
  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState<string | null>(null)

  const premium = data ? hasPremium(data.subscription) : false
  const fromFirstLesson = Boolean((location.state as { firstLesson?: boolean } | null)?.firstLesson)
  const config = PLANS[plan]
  const garantia = textoGarantia()

  const firstChargeDate = useMemo(
    () => formatDateShort(addDaysIso(new Date().toISOString(), config.trialDays)),
    [config.trialDays],
  )

  useEffect(() => {
    if (account) track('paywall_viewed', { from_first_lesson: fromFirstLesson })
  }, [account, fromFirstLesson])

  useEffect(() => {
    if (phase !== 'done') return
    const t = window.setTimeout(() => navigate('/hoy', { replace: true }), 1200)
    return () => window.clearTimeout(t)
  }, [phase, navigate])

  if (!account) return <Navigate to="/registro" replace />
  if (!hasOnboarded(data)) return <Navigate to="/onboarding" replace />

  const subscribe = async () => {
    setError(null)
    setPhase('processing')
    const result = await startTrialCheckout(plan)
    if (!result.ok) {
      setPhase('idle')
      setError(result.message ?? 'No pudimos confirmar tu prueba. No se hizo ningún cobro. Intenta de nuevo.')
      return
    }
    startTrial(plan)
    setPhase('done')
  }

  if (premium && phase !== 'done') {
    const until = data?.subscription.accessUntil
    return (
      <PageFrame className="items-center justify-center text-center">
        <CircleCheck className="size-14 text-sage" aria-hidden />
        <h1 className="mt-6 text-[32px]">Ya tienes acceso completo</h1>
        <p className="mt-3 text-ink-muted">
          {data?.subscription.status === 'canceled'
            ? `Tu acceso llega hasta el ${formatDateShort(until ?? new Date().toISOString())}.`
            : 'Tu plan está activo. Puedes gestionarlo desde tu perfil.'}
        </p>
        <div className="mt-10 w-full">
          <Button onClick={() => navigate('/hoy')}>Volver a Hoy</Button>
        </div>
      </PageFrame>
    )
  }

  return (
    <PageFrame className="pb-56">
      <header className="flex items-center justify-between pt-2">
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver"
          className="grid size-11 place-items-center rounded-full bg-surface-1 text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <span
          className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted"
          data-captura={conexiones.cobros ? undefined : 'oculto'}
        >
          <Lock className="size-3.5" aria-hidden /> {conexiones.cobros ? 'Sin cobro hoy' : 'Demostración · sin cobro'}
        </span>
      </header>

      <motion.div {...fadeUp(0)} className="mt-5">
        <ArtFrame
          art={{ image: '/img/bg-biblioteca.jpg', scene: 'shield', tone: 'amber' }}
          className="h-32 [@media(min-height:901px)]:h-40 [@media(max-height:800px)]:h-20"
        />
      </motion.div>

      <motion.h1 {...fadeUp(1)} className="mt-6 text-[36px] leading-[1.08]">
        {fromFirstLesson ? (
          <>
            Tu primera lección ya es tuya. <span className="text-amber">Desbloquea el resto.</span>
          </>
        ) : (
          <>
            Todas las rutas de aprendizaje, <span className="text-amber">a tu ritmo.</span>
          </>
        )}
      </motion.h1>
      <motion.p {...fadeUp(2)} className="mt-3 text-[16px] leading-relaxed text-ink-muted">
        El plan abre todas las lecciones y rutas. Empieza con la prueba; los cobros se gestionan en Hotmart.
      </motion.p>

      {!conexiones.cobros && (
        <motion.p {...fadeUp(3)} data-captura="oculto" className="mt-8 text-[13px] text-ink-muted">
          Precios de demostración: en esta versión no se cobra nada.
        </motion.p>
      )}

      <motion.div
        {...fadeUp(3)}
        role="radiogroup"
        aria-label="Elige tu plan"
        className={cn('grid gap-3', conexiones.cobros ? 'mt-8' : 'mt-3')}
      >
        {(['anual', 'mensual'] as PlanId[]).map((id) => {
          const p = PLANS[id]
          const selected = plan === id
          return (
            <button
              key={id}
              role="radio"
              aria-checked={selected}
              onClick={() => setPlan(id)}
              className={cn(
                'relative flex min-h-20 items-center gap-4 rounded-card border p-4 text-left transition-colors duration-200',
                selected ? 'border-amber/70 bg-amber/10' : 'border-line bg-surface-1 hover:border-ink/20',
              )}
            >
              <span
                className={cn(
                  'grid size-6 shrink-0 place-items-center rounded-full border',
                  selected ? 'border-amber bg-amber text-bg' : 'border-ink/25',
                )}
                aria-hidden
              >
                {selected && <Check className="size-3.5" strokeWidth={3} />}
              </span>
              <span className="flex-1">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-[17px] font-bold">{p.label}</span>
                  {id === 'anual' && (
                    <span className="rounded-full bg-sage/15 px-2.5 py-0.5 text-[12px] font-bold text-sage">
                      Dos meses gratis
                    </span>
                  )}
                </span>
                <span className="block text-[13px] text-ink-muted">
                  {p.trialDays} días gratis, luego US${p.priceUsd.toFixed(2)} {p.periodLabel}
                </span>
              </span>
              {p.badge && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-amber px-2.5 py-1 text-[11px] font-bold tracking-wide text-bg uppercase">
                  {p.badge}
                </span>
              )}
            </button>
          )
        })}
      </motion.div>

      <motion.ul {...fadeUp(4)} className="mt-7 flex flex-col gap-3">
        {BENEFITS.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-[15px] leading-snug">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sage/20 text-sage">
              <Check className="size-3.5" strokeWidth={3} aria-hidden />
            </span>
            {benefit}
          </li>
        ))}
      </motion.ul>

      <motion.section {...fadeUp(5)} className="card-surface mt-6 flex flex-col gap-3 rounded-card p-5">
        <Row label="Hoy" value="US$0.00" />
        <Row label={`Prueba de ${config.trialDays} días`} value="Sin cobro" />
        <Row label="Primer cobro" value={`${firstChargeDate} · US$${config.priceUsd.toFixed(2)}`} />
        {!conexiones.cobros && (
          <p data-captura="oculto" className="text-[13px] leading-relaxed text-ink-muted">
            Demostración: la prueba solo se activa en este dispositivo y no se cobra nada.
          </p>
        )}
      </motion.section>

      <motion.p {...fadeUp(6)} className="mt-6 text-center text-[13px] text-ink-muted">
        Gratis para siempre: tus primeras {FREE_LESSONS_PER_TRACK} lecciones de tu ruta.
      </motion.p>
      <EnlacesLegales className="mt-4" />

      {error && (
        <p role="alert" className="mt-4 rounded-btn border border-danger/40 bg-danger/10 px-4 py-3 text-[14px] text-danger">
          {error}
        </p>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[440px] bg-bg px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-3 h-3 bg-gradient-to-t from-transparent to-bg" />
        <div className="premium-border rounded-btn">
          <Button
            id="cta-premium-prueba"
            data-evento="inicio-compra"
            onClick={subscribe}
            loading={phase === 'processing'}
            icon={
              <span className="max-[359px]:hidden">
                <Sparkles className="size-5" aria-hidden />
              </span>
            }
          >
            Empezar prueba de {config.trialDays} días
          </Button>
        </div>
        <button
          onClick={() => navigate('/hoy')}
          className="mt-1 flex min-h-11 w-full items-center justify-center text-[14px] font-semibold text-ink-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Seguir gratis por ahora
        </button>
        <p className="mt-0.5 text-center text-[13px] leading-normal text-ink-muted">
          <ShieldCheck className="mr-1 inline size-4 align-[-3px] text-sage" aria-hidden />
          {garantia ? `${garantia}. ` : ''}El cobro y los reembolsos los gestiona Hotmart.
        </p>
      </div>

      <AnimatePresence>
        {phase === 'processing' && (
          <motion.div
            key="processing"
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-50 grid place-items-center bg-bg/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-6 text-center">
              <ProgressRing value={0.7} size={96} stroke={4} />
              <p className="text-[17px] text-ink-muted">Confirmando tu prueba…</p>
            </div>
          </motion.div>
        )}
        {phase === 'done' && (
          <motion.div
            key="done"
            role="status"
            className="fixed inset-0 z-50 grid place-items-center bg-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Confetti />
            <div className="flex flex-col items-center gap-5 px-8 text-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="grid size-24 place-items-center rounded-full bg-sage/20"
              >
                <Check className="size-12 text-sage" strokeWidth={2.5} aria-hidden />
              </motion.div>
              <h1 className="text-[32px]">Tu prueba empezó</h1>
              <p className="text-[16px] text-ink-muted">
                Tienes {config.trialDays} días completos para explorar todo. Vamos a tu lección de hoy.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageFrame>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 text-[15px]">
      <span className="whitespace-nowrap text-ink-muted">{label}</span>
      <span className="font-semibold tabular">{value}</span>
    </div>
  )
}
