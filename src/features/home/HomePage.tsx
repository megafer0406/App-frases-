import { motion } from 'motion/react'
import { ArrowRight, BookOpen, Flame, Lock, NotebookPen, RotateCcw } from 'lucide-react'
import type { ReactNode } from 'react'
import { BADGE_ICONS } from '../../components/gamification/badgeIcons'
import { Link, useNavigate } from 'react-router'
import { ALL_LESSONS, getLesson, lessonsForTrack } from '../../content/lessons'
import { getTrack } from '../../content/tracks'
import { LESSON_ART, TRACK_ART } from '../../content/art'
import { DAILY_LESSON_MINUTES } from '../../config/app'
import { daysLeft, hasPremium, isLessonAccessible, nextLesson } from '../../lib/access'
import { formatDayLong, greetingFor } from '../../lib/dates'
import { progressStats } from '../../lib/progress'
import { pickReviewLesson } from '../../lib/review'
import { lastSevenDays } from '../../lib/weekly'
import { badgeStatuses, nextBadge } from '../../lib/badges'
import { LEVELS } from '../../lib/xp'
import { Button } from '../../components/ui/Button'
import { AnimatedNumber } from '../../components/ui/AnimatedNumber'
import { TiltCard } from '../../components/ui/TiltCard'
import { PageFrame, fadeUp } from '../../components/layout/PageFrame'
import { ArtFrame } from '../../components/art/LessonArt'
import { Tree } from '../../components/art/Tree'
import { Medal } from '../../components/art/Medal'
import { DailyGift } from '../../components/gamification/DailyGift'
import { WeekStrip } from '../../components/gamification/WeekStrip'
import { selectCurrentAccount, selectCurrentData, useAppStore } from '../../store/appStore'

export function HomePage() {
  const navigate = useNavigate()
  const account = useAppStore(selectCurrentAccount)
  const data = useAppStore(selectCurrentData)

  if (!account || !data) return null

  const now = new Date()
  const goal = data.onboarding.goal
  const premium = hasPremium(data.subscription, now)
  const stats = progressStats(data, now)
  const next = nextLesson(ALL_LESSONS, data, goal)
  const nextAccessible = next ? isLessonAccessible(next, data, goal, now) : false
  const goalTrack = goal ? getTrack(goal) : null
  const goalLessons = goal ? lessonsForTrack(goal) : []
  const goalDone = goalLessons.filter((l) => data.completions[l.id]).length
  const review = pickReviewLesson(data, now)
  const week = lastSevenDays(data, now)
  const badge = nextBadge(data, now)
  const badgeDef = badge?.def
  const unlockedCount = badgeStatuses(data, now).filter((b) => b.unlocked).length
  const firstName = account.name.split(' ')[0]
  const nextLevel = LEVELS[stats.level.index + 1]

  // Dato de bolsillo: la idea clave de la última lección completada.
  const lastId = Object.entries(data.completions).sort(([, a], [, b]) => b.completedAt.localeCompare(a.completedAt))[0]?.[0]
  const lastLesson = lastId ? getLesson(lastId) : undefined
  const fact = lastLesson?.cards.find((c) => c.takeaway)?.takeaway

  const Icon = badgeDef ? BADGE_ICONS[badgeDef.icon] : null

  return (
    <PageFrame withNav>
      <motion.header {...fadeUp(0)} className="flex items-start justify-between gap-4 pt-2">
        <div>
          <p className="text-[13px] font-semibold text-ink-muted">{formatDayLong(now.toISOString())}</p>
          <h1 className="mt-1 text-[32px] leading-tight">
            {greetingFor(now.getHours())}, {firstName}
          </h1>
        </div>
        <StreakBadge streak={stats.streak} />
      </motion.header>

      {!premium && (
        <motion.div {...fadeUp(1)} className="mt-5">
          <Link
            to="/premium"
            className="flex items-center justify-between gap-3 rounded-card border border-amber/25 bg-amber/[0.07] px-4 py-3.5 text-[14px] transition-colors hover:border-amber/50"
          >
            <span className="text-ink">
              Tus primeras lecciones son gratis. <span className="font-semibold text-amber">Desbloquea tu ruta completa</span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-amber" aria-hidden />
          </Link>
        </motion.div>
      )}

      {data.subscription.status === 'trialing' && premium && (
        <motion.p {...fadeUp(1)} className="mt-4 text-[13px] text-ink-muted">
          Prueba activa · quedan {daysLeft(data.subscription.trialEndsAt, now)} días
        </motion.p>
      )}

      {/* Semana */}
      <motion.section {...fadeUp(2)} className="card-surface mt-5 rounded-card p-4">
        <div className="mb-4 flex items-baseline justify-between">
          <p className="text-[15px] font-semibold">Tu semana</p>
          <p className="text-[13px] text-ink-muted tabular">{week.reduce((s, d) => s + d.minutes, 0)} min</p>
        </div>
        <WeekStrip days={week} />
      </motion.section>

      {/* Árbol del saber + lección de hoy */}
      <motion.section {...fadeUp(3)} className="mt-4">
        <TiltCard className="card-surface overflow-hidden rounded-card p-5">
          <div className="flex items-center gap-4">
            <Tree stage={stats.level.index} size={112} className="shrink-0" />
            <div className="flex-1">
              <p className="text-[13px] text-ink-muted">Tu árbol del saber</p>
              <p className="mt-0.5 font-display text-[24px] leading-tight">{stats.level.name}</p>
              <p className="mt-1 text-[13px] text-ink-muted tabular">
                {stats.totalXp} XP
                {nextLevel ? ` · faltan ${nextLevel.minXp - stats.totalXp} para ${nextLevel.name}` : ' · nivel máximo'}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-label="Progreso de nivel" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(stats.level.progress * 100)}>
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-deep to-amber"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.level.progress * 100}%` }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-line pt-5">
            {stats.doneToday ? (
              <p className="font-display text-[22px] leading-snug">Hoy ya sumaste tu 1%.</p>
            ) : next ? (
              <ArtFrame art={LESSON_ART[next.id]} className="h-36" />
            ) : null}

            {next && (
              <div className="mt-4 flex flex-col gap-4">
                {!stats.doneToday && <h2 className="text-[22px] leading-[1.2]">{next.title}</h2>}
                {stats.doneToday && <p className="text-[15px] leading-relaxed text-ink-muted">Mañana te espera: {next.title}</p>}
                {!stats.doneToday && (
                  <p className="text-[13px] text-ink-muted">
                    {getTrack(next.trackId).title} · {DAILY_LESSON_MINUTES} min
                  </p>
                )}
                {!stats.doneToday && nextAccessible && (
                  <Button onClick={() => navigate(`/leccion/${next.id}`)} icon={<ArrowRight className="size-5" aria-hidden />}>
                    Empezar lección
                  </Button>
                )}
                {!nextAccessible && (
                  <Button onClick={() => navigate('/premium')} icon={<Lock className="size-5" aria-hidden />}>
                    Desbloquear esta lección
                  </Button>
                )}
              </div>
            )}
            {!next && <p className="mt-3 text-[16px] text-ink-muted">Terminaste todas las lecciones. ¡Qué bien!</p>}
          </div>
        </TiltCard>
      </motion.section>

      {stats.doneToday && !stats.chestOpenedToday && (
        <motion.div {...fadeUp(4)} className="mt-4">
          <DailyGift fact={fact} />
        </motion.div>
      )}

      {/* Próximo hito */}
      {badge && badgeDef && Icon && (
        <motion.section {...fadeUp(4)} className="card-surface mt-4 flex items-center gap-4 rounded-card p-4">
          <Medal Icon={Icon} unlocked={false} tone={badgeDef.tone} size={60} />
          <div className="flex-1">
            <p className="text-[12px] text-ink-muted">Próxima insignia · {unlockedCount} de {badgeStatuses(data, now).length}</p>
            <p className="mt-0.5 text-[16px] font-bold">{badgeDef.title}</p>
            <p className="text-[13px] text-ink-muted">{badgeDef.description}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full rounded-full bg-amber"
                initial={{ width: 0 }}
                animate={{ width: `${badge.progress * 100}%` }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.section>
      )}

      {/* Métricas */}
      <motion.section {...fadeUp(5)} className="mt-4 grid grid-cols-3 gap-3">
        <Metric label="Minutos" value={<AnimatedNumber value={stats.minutesLearned} />} />
        <Metric label="Lecciones" value={<AnimatedNumber value={stats.lessonsCompleted} />} />
        <Metric
          label="Mejor racha"
          value={
            <span className="inline-flex items-baseline gap-1 whitespace-nowrap">
              <AnimatedNumber value={stats.longestStreak} />
              <span className="text-[13px] font-semibold text-ink-muted">{stats.longestStreak === 1 ? 'día' : 'días'}</span>
            </span>
          }
        />
      </motion.section>

      {/* Ruta activa */}
      {goalTrack && (
        <motion.section {...fadeUp(6)} className="mt-4">
          <Link to={`/rutas/${goalTrack.id}`} className="card-surface flex items-center gap-4 rounded-card p-3 pr-5 transition-colors hover:border-ink/20">
            <ArtFrame art={TRACK_ART[goalTrack.id]} rounded="rounded-xl" className="size-20 shrink-0" />
            <div className="flex-1">
              <p className="text-[12px] text-ink-muted">Tu ruta</p>
              <p className="mt-0.5 text-[16px] font-bold leading-snug">{goalTrack.title}</p>
              <p className="mt-1 text-[13px] text-ink-muted tabular">
                {goalDone} de {goalLessons.length} lecciones
              </p>
            </div>
            <ArrowRight className="size-5 text-ink-muted" aria-hidden />
          </Link>
        </motion.section>
      )}

      {review && (
        <motion.section {...fadeUp(7)} className="mt-4">
          <button
            onClick={() => (premium ? navigate(`/leccion/${review.lesson.id}?modo=repaso`) : navigate('/premium'))}
            className="card-surface flex w-full items-center gap-4 rounded-card p-4 text-left transition-colors hover:border-ink/20"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-copper/15 text-copper">
              <RotateCcw className="size-5" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="text-[13px] text-copper">Repaso de hace {review.daysAgo} {review.daysAgo === 1 ? 'día' : 'días'}</p>
              <p className="mt-0.5 text-[15px] leading-snug">{review.lesson.title}</p>
            </div>
            {!premium && <Lock className="size-4 text-ink-muted" aria-hidden />}
          </button>
        </motion.section>
      )}

      <motion.section {...fadeUp(8)} className="mt-4">
        <Link to="/diario" className="card-surface flex items-center gap-4 rounded-card p-4 transition-colors hover:border-ink/20">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink-muted">
            <NotebookPen className="size-5" aria-hidden />
          </span>
          <div className="flex-1">
            <p className="text-[15px] font-semibold">Tu diario</p>
            <p className="mt-0.5 text-[13px] text-ink-muted">
              {data.reflections.length > 0
                ? `${data.reflections.length} ${data.reflections.length === 1 ? 'reflexión guardada' : 'reflexiones guardadas'}`
                : 'Aún no tienes reflexiones'}
            </p>
          </div>
          <BookOpen className="size-5 text-ink-muted" aria-hidden />
        </Link>
      </motion.section>

      <p className="mt-10 text-center text-[12px] text-ink-muted">Un día de descanso automático cada semana. Sin culpa.</p>
    </PageFrame>
  )
}

function StreakBadge({ streak }: { streak: number }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
      className="flex items-center gap-2 rounded-full border border-copper/30 bg-copper/10 px-3.5 py-2"
    >
      <span className="sr-only">Racha de {streak} {streak === 1 ? 'día' : 'días'}</span>
      <Flame className="size-5 text-copper" aria-hidden />
      <span className="font-display text-[20px] leading-none tabular" aria-hidden>
        <AnimatedNumber value={streak} />
      </span>
    </motion.div>
  )
}

function Metric({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="card-surface flex flex-col gap-1.5 rounded-card p-4">
      <span className="font-display text-[22px] leading-none text-ink">{value}</span>
      <span className="text-[12px] leading-snug text-ink-muted">{label}</span>
    </div>
  )
}
