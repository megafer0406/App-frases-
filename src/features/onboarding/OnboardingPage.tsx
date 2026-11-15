import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, BellRing, Moon, Sun, Sunrise } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Button } from '../../components/ui/Button'
import { Chip } from '../../components/ui/Chip'
import { PageFrame } from '../../components/layout/PageFrame'
import { ArtFrame } from '../../components/art/LessonArt'
import { ARCHETYPES, FUNNEL_QUESTIONS } from '../../content/funnel'
import { TRACKS } from '../../content/tracks'
import { TRACK_ART } from '../../content/art'
import { lessonsForTrack } from '../../content/lessons'
import { findArchetype, scoreArchetype } from '../../lib/funnel'
import type { TrackId } from '../../domain/types'
import { selectCurrentAccount, selectCurrentData, useAppStore } from '../../store/appStore'
import { hasOnboarded } from '../auth/guards'

const TIMES = [
  { value: '07:30', label: 'Mañana · 7:30', hint: 'Antes de empezar tu día', icon: Sunrise },
  { value: '13:00', label: 'Mediodía · 13:00', hint: 'En tu pausa de comida', icon: Sun },
  { value: '21:00', label: 'Noche · 21:00', hint: 'Antes de dormir', icon: Moon },
]

export function OnboardingPage() {
  const navigate = useNavigate()
  const account = useAppStore(selectCurrentAccount)
  const data = useAppStore(selectCurrentData)
  const funnel = useAppStore((s) => s.funnel)
  const saveOnboarding = useAppStore((s) => s.saveOnboarding)

  const defaultTrack: TrackId = (() => {
    if (!funnel.completedAt) return 'historia'
    const { archetypeId } = scoreArchetype(funnel.answers, FUNNEL_QUESTIONS)
    return findArchetype(ARCHETYPES, archetypeId).firstTrack
  })()

  const [step, setStep] = useState(0)
  const [finishing, setFinishing] = useState(false)
  const [goal, setGoal] = useState<TrackId>(defaultTrack)
  const [time, setTime] = useState<string>(
    FUNNEL_QUESTIONS.find((q) => q.id === 'horario')?.options.some((o) => o.value === funnel.answers.horario)
      ? (funnel.answers.horario as string)
      : '07:30',
  )

  if (!account) return <Navigate to="/registro" replace />
  if (hasOnboarded(data) && !finishing) return <Navigate to="/hoy" replace />

  const finish = () => {
    setFinishing(true)
    saveOnboarding({ goal, reminderTime: time })
    const first = lessonsForTrack(goal)[0]
    navigate(`/leccion/${first.id}`, { replace: true, state: { firstLesson: true } })
  }

  return (
    <PageFrame className="pb-10">
      <header className="flex items-center gap-3 pt-2">
        <button
          onClick={() => (step === 0 ? navigate(-1) : setStep(0))}
          aria-label="Volver"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-1 text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <div className="flex flex-1 gap-2">
          <span className="sr-only">Paso {step + 1} de 2</span>
          {[0, 1].map((i) => (
            <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full bg-amber"
                initial={false}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        {step === 0 ? (
          <Step key="goal" title="¿Qué quieres fortalecer primero?" subtitle="Empieza con lecciones gratis de esta ruta. Puedes cambiarla después.">
            <div role="radiogroup" aria-label="Ruta" className="flex flex-col gap-3">
              {TRACKS.map((track) => (
                <Chip
                  key={track.id}
                  selected={goal === track.id}
                  onSelect={() => setGoal(track.id)}
                  icon={<ArtFrame art={TRACK_ART[track.id]} rounded="rounded-xl" className="size-12" />}
                >
                  {track.title}
                </Chip>
              ))}
            </div>
            <Button className="mt-6" onClick={() => setStep(1)} icon={<ArrowRight className="size-5" aria-hidden />}>
              Continuar
            </Button>
          </Step>
        ) : (
          <Step key="time" title="¿A qué hora quieres tu lección?" subtitle="Elige un horario para tu hábito. No se envían recordatorios.">
            <div role="radiogroup" aria-label="Horario" className="flex flex-col gap-3">
              {TIMES.map((t) => {
                const Icon = t.icon
                return (
                  <Chip
                    key={t.value}
                    selected={time === t.value}
                    onSelect={() => setTime(t.value)}
                    icon={
                      <span className="grid size-10 place-items-center rounded-xl bg-amber/10 text-amber">
                        <Icon className="size-5" aria-hidden />
                      </span>
                    }
                  >
                    <span className="block">{t.label}</span>
                    <span className="block text-[13px] font-normal text-ink-muted">{t.hint}</span>
                  </Chip>
                )
              })}
            </div>

            <div className="card-surface mt-6 flex items-start gap-3 rounded-card p-4">
              <BellRing className="mt-0.5 size-5 shrink-0 text-amber" aria-hidden />
              <p className="text-[14px] leading-relaxed text-ink-muted">
                Tu horario elegido es a las <span className="text-ink tabular">{time}</span>. Si un día no puedes, no pasa nada: tu racha tiene un día de descanso a la semana.
              </p>
            </div>

            <Button className="mt-6" onClick={finish} icon={<ArrowRight className="size-5" aria-hidden />}>
              Empezar mi primera lección
            </Button>
          </Step>
        )}
      </AnimatePresence>
    </PageFrame>
  )
}

function Step({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8 flex flex-col"
    >
      <h1 className="text-[clamp(28px,8vw,32px)] leading-[1.15]">{title}</h1>
      <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </motion.section>
  )
}
