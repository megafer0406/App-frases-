import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, CircleCheck, Lightbulb, Plus, Share2, Sparkles, Target, X } from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router'
import { BADGE_ICONS } from '../../components/gamification/badgeIcons'
import { ALL_LESSONS, getLesson } from '../../content/lessons'
import { getTrack } from '../../content/tracks'
import { LESSON_ART, type ArtConfig } from '../../content/art'
import type { Lesson, LessonCard, QuizQuestion } from '../../domain/types'
import { hasPremium, isLessonAccessible, nextLesson } from '../../lib/access'
import { badgeStatuses } from '../../lib/badges'
import { progressStats } from '../../lib/progress'
import { chime, haptic } from '../../lib/feedback'
import { drawShareCard, shareCanvas } from '../../lib/shareCard'
import { track } from '../../services/analytics'
import { selectCurrentAccount, selectCurrentData, useAppStore } from '../../store/appStore'
import { dayKey } from '../../lib/dates'
import { Button } from '../../components/ui/Button'
import { Confetti } from '../../components/ui/Confetti'
import { AnimatedNumber } from '../../components/ui/AnimatedNumber'
import { RichText } from '../../components/ui/RichText'
import { PageFrame } from '../../components/layout/PageFrame'
import { ArtFrame } from '../../components/art/LessonArt'
import { Tree, TREE_STAGES } from '../../components/art/Tree'
import { Medal } from '../../components/art/Medal'
import { DailyGift } from '../../components/gamification/DailyGift'
import { BreakevenCalculator } from './BreakevenCalculator'
import { DAILY_LESSON_MINUTES } from '../../config/app'
import { cn } from '../../lib/cn'

type StepDef =
  | { kind: 'hook' }
  | { kind: 'card'; card: LessonCard; index: number }
  | { kind: 'quiz'; question: QuizQuestion; index: number; total: number }
  | { kind: 'reflection' }
  | { kind: 'action' }
  | { kind: 'done' }

function buildSteps(lesson: Lesson, review: boolean): StepDef[] {
  const quiz = lesson.quiz.map((question, index) => ({ kind: 'quiz' as const, question, index, total: lesson.quiz.length }))
  if (review) return [...quiz, { kind: 'done' }]
  return [
    { kind: 'hook' },
    ...lesson.cards.map((card, index) => ({ kind: 'card' as const, card, index })),
    ...quiz,
    { kind: 'reflection' },
    { kind: 'action' },
    { kind: 'done' },
  ]
}

/* ---------- Página: decide si se puede ver la lección ---------- */

export function LessonPage() {
  const { lessonId = '' } = useParams()
  const [search] = useSearchParams()
  const location = useLocation()
  const data = useAppStore(selectCurrentData)
  const lesson = getLesson(lessonId)

  if (!lesson || !data) return <Navigate to="/hoy" replace />

  const accessible = isLessonAccessible(lesson, data, data.onboarding.goal)
  if (!accessible) return <LockedLesson lesson={lesson} />

  const review = search.get('modo') === 'repaso' && Boolean(data.completions[lesson.id])
  const firstLesson = Boolean((location.state as { firstLesson?: boolean } | null)?.firstLesson)

  return <LessonPlayer key={lesson.id + String(review)} lesson={lesson} review={review} firstLesson={firstLesson} />
}

function LockedLesson({ lesson }: { lesson: Lesson }) {
  const navigate = useNavigate()
  return (
    <PageFrame className="justify-center text-center">
      <ArtFrame art={LESSON_ART[lesson.id]} className="h-56" />
      <h1 className="mt-7 text-[30px] leading-tight">{lesson.title}</h1>
      <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
        Esta lección forma parte de tu plan completo. Empieza una prueba gratuita y tendrás acceso a todas las rutas.
      </p>
      <div className="mt-10 flex w-full flex-col gap-3">
        <Button onClick={() => navigate('/premium')} icon={<Sparkles className="size-5" aria-hidden />}>
          Desbloquear con prueba gratuita
        </Button>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>
    </PageFrame>
  )
}

/* ---------- Reproductor ---------- */

interface PlayerProps {
  lesson: Lesson
  review: boolean
  firstLesson: boolean
}

/** Foto del estado antes de la lección: sirve para detectar subida de nivel e insignias nuevas. */
interface Snapshot {
  level: number
  badges: string[]
}

function LessonPlayer({ lesson, review, firstLesson }: PlayerProps) {
  const navigate = useNavigate()
  const steps = useMemo(() => buildSteps(lesson, review), [lesson, review])
  const completeLesson = useAppStore((s) => s.completeLesson)
  const sound = useAppStore((s) => s.prefs.sound)
  const data = useAppStore(selectCurrentData)
  const art = LESSON_ART[lesson.id]
  const account = useAppStore(selectCurrentAccount)
  const nameFirst = account?.name.split(' ')[0] ?? ''

  const [before] = useState<Snapshot>(() => {
    const d = data!
    return {
      level: progressStats(d).level.index,
      badges: badgeStatuses(d).filter((b) => b.unlocked).map((b) => b.def.id),
    }
  })

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [correct, setCorrect] = useState(0)
  const [reflection, setReflection] = useState('')

  const step = steps[index]
  const progress = steps.length > 1 ? index / (steps.length - 1) : 1
  const trackTitle = getTrack(lesson.trackId).title

  useEffect(() => {
    track('lesson_started', { lessonId: lesson.id, review })
  }, [lesson.id, review])

  const advance = () => {
    setDirection(1)
    setIndex((i) => Math.min(i + 1, steps.length - 1))
  }

  const back = () => {
    if (index === 0) return navigate(-1)
    setDirection(-1)
    setIndex((i) => i - 1)
  }

  const finish = () => {
    if (!review) {
      completeLesson({ lessonId: lesson.id, correct, total: lesson.quiz.length, reflection })
      haptic([12, 30, 12])
      chime('ok', sound)
    }
    advance()
  }

  const stats = data ? progressStats(data) : null
  const premium = data ? hasPremium(data.subscription) : false
  const completedCount = data ? Object.keys(data.completions).length : 0
  const upNext = data ? nextLesson(ALL_LESSONS, data, data.onboarding.goal) : null
  const upNextAccessible = Boolean(data && upNext && isLessonAccessible(upNext, data, data.onboarding.goal))

  return (
    <PageFrame className="pb-10">
      <header className="flex items-center gap-3 pt-2">
        <button
          onClick={back}
          aria-label={index === 0 ? 'Salir' : 'Paso anterior'}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-1 text-ink-muted transition-colors hover:text-ink"
        >
          {index === 0 ? <X className="size-5" aria-hidden /> : <ArrowLeft className="size-5" aria-hidden />}
        </button>
        <div
          role="progressbar"
          aria-label="Progreso de la lección"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-deep via-amber to-copper"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: 'spring', stiffness: 160, damping: 26 }}
          />
        </div>
        <span className="shrink-0 text-[13px] font-semibold text-ink-muted tabular">
          {review ? 'Repaso' : `${DAILY_LESSON_MINUTES} min`}
        </span>
      </header>

      <div className="flex flex-1 flex-col pt-7">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-1 flex-col"
          >
            {step.kind === 'hook' && <HookStep lesson={lesson} trackTitle={trackTitle} onStart={advance} />}

            {step.kind === 'card' && (
              <CardStep card={step.card} art={art} position={step.index + 1} total={lesson.cards.length} onNext={advance} />
            )}

            {step.kind === 'quiz' && (
              <QuizStep
                key={step.index}
                question={step.question}
                art={art}
                position={step.index + 1}
                total={step.total}
                sound={sound}
                onAnswer={(isCorrect) => {
                  if (isCorrect) setCorrect((c) => c + 1)
                  advance()
                }}
              />
            )}

            {step.kind === 'reflection' && (
              <ReflectionStep prompt={lesson.reflectionPrompt} art={art} value={reflection} onChange={setReflection} onNext={advance} />
            )}

            {step.kind === 'action' && <ActionStep lesson={lesson} art={art} onFinish={finish} />}

            {step.kind === 'done' && data && stats && (
              <DoneStep
                lesson={lesson}
                review={review}
                before={before}
                premium={premium}
                firstLesson={firstLesson || completedCount <= 1}
                nextId={upNext?.id ?? null}
                nextAccessible={upNextAccessible}
                trackId={lesson.trackId}
                nameFirst={nameFirst}
                streak={stats.streak}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageFrame>
  )
}

/* ---------- Pasos ---------- */

function HookStep({ lesson, trackTitle, onStart }: { lesson: Lesson; trackTitle: string; onStart: () => void }) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <ArtFrame art={LESSON_ART[lesson.id]} className="h-64" />
      <div>
        <h1 className="text-[34px] leading-[1.1]">{lesson.title}</h1>
        <p className="mt-3 text-[13px] text-ink-muted">
          {trackTitle} · {DAILY_LESSON_MINUTES} min
        </p>
      </div>
      <p className="font-display text-[20px] italic leading-relaxed text-ink-muted">{lesson.hook}</p>
      <div className="mt-auto pt-2">
        <Button onClick={onStart} icon={<ArrowRight className="size-5" aria-hidden />}>
          Empezar lección
        </Button>
      </div>
    </div>
  )
}

function CardStep({
  card,
  art,
  position,
  total,
  onNext,
}: {
  card: LessonCard
  art: ArtConfig
  position: number
  total: number
  onNext: () => void
}) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-1.5" aria-hidden>
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={cn('h-1 w-6 rounded-full', i < position ? 'bg-amber' : 'bg-line')} />
          ))}
        </div>
        <span className="text-[13px] text-ink-muted tabular">
          {position} de {total}
        </span>
      </div>

      <ArtFrame art={art} className="h-44" />

      <h2 className="text-[28px] leading-[1.15]">{card.title}</h2>

      <div className="flex flex-col gap-4 text-[17px] leading-[1.65] text-ink">
        {card.paragraphs.map((p, i) => (
          <p key={i}>
            <RichText text={p} />
          </p>
        ))}
      </div>

      {card.formula && (
        <div className="card-surface rounded-card p-5">
          <p className="font-display text-[19px] leading-snug text-ink">
            <RichText text={card.formula.expression} />
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{card.formula.example}</p>
        </div>
      )}

      {card.interactive === 'breakeven' && <BreakevenCalculator />}

      {card.takeaway && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex gap-4 overflow-hidden rounded-card border border-amber/25 bg-amber/[0.06] p-5"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber">
            <Lightbulb className="size-5" aria-hidden />
          </span>
          <p className="font-display text-[18px] leading-snug">{card.takeaway}</p>
        </motion.div>
      )}

      <div className="mt-auto pt-4">
        <Button onClick={onNext} icon={<ArrowRight className="size-5" aria-hidden />}>
          Continuar
        </Button>
      </div>
    </div>
  )
}

function QuizStep({
  question,
  art,
  position,
  total,
  sound,
  onAnswer,
}: {
  question: QuizQuestion
  art: ArtConfig
  position: number
  total: number
  sound: boolean
  onAnswer: (correct: boolean) => void
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null
  const isCorrect = picked === question.correctIndex

  const choose = (i: number) => {
    setPicked(i)
    if (i === question.correctIndex) {
      haptic(14)
      chime('ok', sound)
    } else {
      haptic([20, 40, 20])
      chime('miss', sound)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center gap-4">
        <ArtFrame art={art} rounded="rounded-xl" className="size-16 shrink-0" />
        <span className="text-[13px] text-ink-muted tabular">
          Pregunta {position} de {total}
        </span>
      </div>

      <h2 className="text-[26px] leading-[1.2]">{question.question}</h2>

      <div role="radiogroup" aria-label={question.question} className="flex flex-col gap-3">
        {question.options.map((option, i) => {
          const isPicked = picked === i
          const isRight = i === question.correctIndex
          const showRight = answered && isRight
          const showWrong = answered && isPicked && !isRight
          return (
            <motion.button
              key={option}
              role="radio"
              aria-checked={isPicked}
              disabled={answered}
              onClick={() => choose(i)}
              animate={showWrong ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                'flex min-h-14 items-center gap-3 rounded-btn border px-4 text-left text-[16px] font-medium transition-colors duration-200',
                !answered && 'border-line bg-surface-1 hover:border-ink/25',
                showRight && 'border-sage bg-sage/15 text-ink',
                showWrong && 'border-danger/70 bg-danger/10',
                answered && !showRight && !showWrong && 'border-line bg-surface-1 text-ink-muted/70',
              )}
            >
              <span
                className={cn(
                  'grid size-7 shrink-0 place-items-center rounded-full border text-[13px] font-bold',
                  showRight ? 'border-sage text-sage' : showWrong ? 'border-danger text-danger' : 'border-ink/20 text-ink-muted',
                )}
                aria-hidden
              >
                {showRight ? <Check className="size-4" strokeWidth={3} /> : String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{option}</span>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            key="feedback"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-card border border-line bg-surface-2 p-5"
          >
            <p className={cn('flex items-center gap-2 text-[15px] font-bold', isCorrect ? 'text-sage' : 'text-copper')}>
              {isCorrect && <CircleCheck className="size-5" aria-hidden />}
              {isCorrect ? '¡Correcto!' : 'Casi. Así se responde:'}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-2">
        {answered && (
          <Button onClick={() => onAnswer(isCorrect)} icon={<ArrowRight className="size-5" aria-hidden />}>
            Continuar
          </Button>
        )}
      </div>
    </div>
  )
}

function ReflectionStep({
  prompt,
  art,
  value,
  onChange,
  onNext,
}: {
  prompt: string
  art: ArtConfig
  value: string
  onChange: (v: string) => void
  onNext: () => void
}) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <ArtFrame art={art} className="h-32" />
      <h2 className="text-[28px] leading-[1.2]">{prompt}</h2>
      <p className="text-[14px] text-ink-muted">Una frase basta. Se guarda en tu diario y suma 20 XP.</p>
      <div className="flex flex-col gap-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 600))}
          rows={5}
          aria-label="Tu reflexión"
          placeholder="Escribe con tus palabras…"
          className="w-full resize-none rounded-card border border-line bg-surface-1 p-4 text-[17px] leading-relaxed text-ink placeholder:text-ink-muted/80 focus:border-amber/60"
        />
        <span className="self-end text-[12px] text-ink-muted tabular">{value.length}/600</span>
      </div>
      <div className="mt-auto flex flex-col gap-3 pt-2">
        <Button onClick={onNext} icon={<ArrowRight className="size-5" aria-hidden />}>
          {value.trim() ? 'Guardar y continuar' : 'Continuar'}
        </Button>
        {!value.trim() && (
          <button onClick={onNext} className="min-h-11 text-[14px] text-ink-muted underline-offset-4 hover:text-ink hover:underline">
            Omitir por ahora
          </button>
        )}
      </div>
    </div>
  )
}

function ActionStep({ lesson, art, onFinish }: { lesson: Lesson; art: ArtConfig; onFinish: () => void }) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <ArtFrame art={art} className="h-40" />
      <div className="card-surface flex gap-4 rounded-card p-6">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sage/15 text-sage">
          <Target className="size-6" aria-hidden />
        </span>
        <p className="font-display text-[22px] leading-snug">{lesson.action}</p>
      </div>
      <details className="card-surface group rounded-card p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-semibold text-ink-muted hover:text-ink">
          Fuentes de esta lección
          <Plus className="size-5 text-amber transition-transform group-open:rotate-45" aria-hidden />
        </summary>
        <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-[14px] leading-relaxed text-ink-muted">
          {lesson.sources.map((s) => (
            <li key={s}>
              <RichText text={s} />
            </li>
          ))}
        </ul>
      </details>
      <div className="mt-auto pt-2">
        <Button onClick={onFinish} icon={<Check className="size-5" aria-hidden />}>
          Terminar lección
        </Button>
      </div>
    </div>
  )
}

function DoneStep({
  lesson,
  review,
  before,
  premium,
  firstLesson,
  nextId,
  nextAccessible,
  trackId,
  nameFirst,
  streak,
}: {
  lesson: Lesson
  review: boolean
  before: Snapshot
  premium: boolean
  firstLesson: boolean
  nextId: string | null
  nextAccessible: boolean
  trackId: Lesson['trackId']
  nameFirst: string
  streak: number
}) {
  const navigate = useNavigate()
  const data = useAppStore(selectCurrentData)
  const sound = useAppStore((s) => s.prefs.sound)
  const showPaywall = !premium && !review && (firstLesson || !nextAccessible)

  const after = data ? progressStats(data) : null
  const leveledUp = !review && after !== null && after.level.index > before.level
  const newBadges = !review && data ? badgeStatuses(data).filter((b) => b.unlocked && !before.badges.includes(b.def.id)) : []
  const fact = lesson.cards.find((c) => c.takeaway)?.takeaway

  useEffect(() => {
    if (leveledUp) {
      chime('win', sound)
      haptic([15, 50, 15, 50, 30])
    }
  }, [leveledUp, sound])

  const share = async () => {
    if (!after) return
    const canvas = drawShareCard({
      firstName: nameFirst,
      levelName: after.level.name,
      stage: after.level.index,
      streak: after.longestStreak,
      lessons: after.lessonsCompleted,
      minutes: after.minutesLearned,
      totalXp: after.totalXp,
    })
    track('share_card', { lessons: after.lessonsCompleted })
    await shareCanvas(canvas, 'sabiduria-progreso.png')
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-6 text-center">
      {!review && <Confetti />}

      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 16 }}>
        <Tree stage={after?.level.index ?? 0} size={150} />
      </motion.div>

      <div>
        <h2 className="text-[32px]">{review ? 'Repaso listo' : 'Lección completa'}</h2>
        <p className="mt-2 text-[16px] text-ink-muted">
          {review ? 'Repasar en intervalos fija lo aprendido.' : 'Tu árbol creció un poco más.'}
        </p>
      </div>

      {leveledUp && after && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full rounded-card border border-amber/40 bg-amber/10 p-4 text-left"
        >
          <p className="flex items-center gap-2 text-[15px] font-bold text-amber">
            <Sparkles className="size-4" aria-hidden /> Subiste de nivel
          </p>
          <p className="mt-1 text-[15px]">
            Ahora eres <span className="font-semibold">{after.level.name}</span>. Tu árbol se llama «{TREE_STAGES[after.level.index]}».
          </p>
        </motion.div>
      )}

      {!review && after && (
        <div className="grid w-full grid-cols-3 gap-3">
          <Metric label="XP total" value={<AnimatedNumber value={after.totalXp} />} />
          <Metric label="Racha" value={<AnimatedNumber value={streak} suffix={streak === 1 ? " día" : " días"} />} />
          <Metric label="Nivel" value={<span className="text-[17px] leading-tight">{after.level.name}</span>} />
        </div>
      )}

      {newBadges.length > 0 && (
        <section className="w-full text-left">
          <h3 className="mb-3 text-[20px]">Nueva insignia</h3>
          <ul className="flex flex-col gap-3">
            {newBadges.map((b) => {
              const Icon = BADGE_ICONS[b.def.icon]
              return (
                <li key={b.def.id} className="card-surface flex items-center gap-4 rounded-card p-4">
                  <Medal Icon={Icon} unlocked tone={b.def.tone} size={56} />
                  <div>
                    <p className="text-[16px] font-bold">{b.def.title}</p>
                    <p className="text-[13px] text-ink-muted">{b.def.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {!review && data && !data.bonusXp[dayKey()] && (
        <div className="w-full text-left">
          <DailyGift fact={fact} />
        </div>
      )}

      <div className="mt-2 flex w-full flex-col gap-3">
        {showPaywall ? (
          <>
            <Button onClick={() => navigate('/premium', { state: { firstLesson: true } })} icon={<Sparkles className="size-5" aria-hidden />}>
              Ver mi plan completo
            </Button>
            <Button variant="ghost" onClick={() => navigate('/hoy')}>
              Seguir gratis por ahora
            </Button>
          </>
        ) : nextId && !review ? (
          <>
            <Button onClick={() => navigate(`/leccion/${nextId}`, { replace: true })} icon={<ArrowRight className="size-5" aria-hidden />}>
              Siguiente lección
            </Button>
            <Link to="/hoy" className="min-h-11 text-[14px] text-ink-muted underline-offset-4 hover:text-ink hover:underline">
              Volver a Hoy
            </Link>
          </>
        ) : (
          <Button onClick={() => navigate(review ? '/hoy' : `/rutas/${trackId}`, { replace: true })}>
            {review ? 'Volver a Hoy' : 'Ver mi ruta'}
          </Button>
        )}
        {!review && (
          <Button variant="secondary" onClick={share} icon={<Share2 className="size-5" aria-hidden />}>
            Compartir mi progreso
          </Button>
        )}
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="card-surface flex flex-col items-center gap-2 rounded-card p-3">
      <span className="font-display text-[24px] leading-none tabular text-ink">{value}</span>
      <span className="text-[12px] font-semibold text-ink-muted">{label}</span>
    </div>
  )
}
