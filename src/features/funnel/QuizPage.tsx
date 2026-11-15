import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Clock3, Compass, Eye, Headphones, Mountain, MessageCircle, Sun, Target, Trophy, TrendingUp, type LucideIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../components/ui/Button'
import { Chip } from '../../components/ui/Chip'
import { PageFrame } from '../../components/layout/PageFrame'
import { FUNNEL_QUESTIONS } from '../../content/funnel'
import type { QuestionIcon } from '../../domain/types'
import { track } from '../../services/analytics'
import { chime, haptic } from '../../lib/feedback'
import { useAppStore } from '../../store/appStore'

const NAME_STEP = -1
const TOTAL_STEPS = FUNNEL_QUESTIONS.length + 1

const ICONS: Record<QuestionIcon, LucideIcon> = {
  target: Target,
  clock: Clock3,
  headphones: Headphones,
  message: MessageCircle,
  mountain: Mountain,
  trending: TrendingUp,
  mirror: Eye,
  sun: Sun,
  compass: Compass,
  trophy: Trophy,
}

/** Primer paso sin respuesta, para continuar donde se quedó la persona al recargar. */
function firstPendingStep(name: string, answers: Record<string, string>): number {
  if (name.trim().length < 2) return NAME_STEP
  const idx = FUNNEL_QUESTIONS.findIndex((q) => !answers[q.id])
  return idx === -1 ? FUNNEL_QUESTIONS.length - 1 : idx
}

export function QuizPage() {
  const navigate = useNavigate()
  const funnel = useAppStore((s) => s.funnel)
  const setFunnelName = useAppStore((s) => s.setFunnelName)
  const answerFunnel = useAppStore((s) => s.answerFunnel)
  const completeFunnel = useAppStore((s) => s.completeFunnel)
  const sound = useAppStore((s) => s.prefs.sound)

  const [step, setStep] = useState(() => firstPendingStep(funnel.name, funnel.answers))
  const [direction, setDirection] = useState(1)
  const [nameDraft, setNameDraft] = useState(funnel.name)

  const progress = useMemo(() => (step + 2) / TOTAL_STEPS, [step])

  const goNext = () => {
    setDirection(1)
    if (step === FUNNEL_QUESTIONS.length - 1) {
      completeFunnel()
      track('quiz_completed')
      navigate('/analisis')
      return
    }
    setStep((s) => s + 1)
  }

  const goBack = () => {
    if (step === NAME_STEP) {
      navigate('/')
      return
    }
    setDirection(-1)
    setStep((s) => s - 1)
  }

  const choose = (questionId: string, value: string) => {
    answerFunnel(questionId, value)
    haptic(8)
    chime('ok', sound)
    window.setTimeout(goNext, 240)
  }

  const nameValid = nameDraft.trim().length >= 2
  const question = step >= 0 ? FUNNEL_QUESTIONS[step] : null
  const QuestionIcon = question ? ICONS[question.icon] : null

  return (
    <PageFrame className="justify-between">
      <header className="flex items-center gap-3">
        <button
          onClick={goBack}
          aria-label="Volver"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-1 text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <div
          role="progressbar"
          aria-label="Progreso del quiz"
          aria-valuemin={0}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={step + 2}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-deep via-amber to-copper"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: 'spring', stiffness: 180, damping: 26 }}
          />
        </div>
        <span className="shrink-0 text-[13px] font-semibold text-ink-muted tabular">
          {step + 2}/{TOTAL_STEPS}
        </span>
      </header>

      <div className="flex flex-1 flex-col justify-center py-8">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.section
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -36 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-7"
          >
            {step === NAME_STEP ? (
              <>
                <div className="grid size-16 place-items-center rounded-2xl bg-amber/10 text-amber">
                  <Compass className="size-8" aria-hidden />
                </div>
                <h1 className="text-[34px] leading-tight">¿Cómo quieres que te llamemos?</h1>
                <p className="text-[16px] text-ink-muted">Solo usamos tu nombre para saludarte.</p>
                <form
                  className="flex flex-col gap-5"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!nameValid) return
                    setFunnelName(nameDraft)
                    goNext()
                  }}
                >
                  <input
                    autoFocus
                    autoComplete="given-name"
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    maxLength={40}
                    placeholder="Tu nombre"
                    aria-label="Tu nombre"
                    className="min-h-16 w-full rounded-btn border border-line bg-surface-1 px-5 font-display text-2xl text-ink placeholder:text-ink-muted/80 focus:border-amber/60"
                  />
                  <Button type="submit" disabled={!nameValid} icon={<ArrowRight className="size-5" aria-hidden />}>
                    Continuar
                  </Button>
                </form>
              </>
            ) : (
              question && QuestionIcon && (
                <>
                  <div className="relative grid size-16 place-items-center">
                    <span className="relative grid size-16 place-items-center rounded-2xl border border-amber/30 bg-surface-1 text-amber">
                      <QuestionIcon className="size-8" aria-hidden />
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-[30px] leading-[1.15]">{question.prompt}</h1>
                    {question.hint && <p className="text-[15px] text-ink-muted">{question.hint}</p>}
                  </div>
                  <div role="radiogroup" aria-label={question.prompt} className="flex flex-col gap-3">
                    {question.options.map((option, i) => (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Chip selected={funnel.answers[question.id] === option.value} onSelect={() => choose(question.id, option.value)}>
                          {option.label}
                        </Chip>
                      </motion.div>
                    ))}
                  </div>
                </>
              )
            )}
          </motion.section>
        </AnimatePresence>
      </div>

      <p className="text-center text-[13px] text-ink-muted/80">Tus respuestas son privadas.</p>
    </PageFrame>
  )
}
