import { motion } from 'motion/react'
import { ArrowLeft, Check, Lock, Play } from 'lucide-react'
import { useNavigate, useParams, Navigate, Link } from 'react-router'
import { lessonsForTrack } from '../../content/lessons'
import { getTrack, TRACK_IDS } from '../../content/tracks'
import { LESSON_ART, TRACK_ART } from '../../content/art'
import type { TrackId } from '../../domain/types'
import { DAILY_LESSON_MINUTES } from '../../config/app'
import { isLessonAccessible } from '../../lib/access'
import { PageFrame, fadeUp } from '../../components/layout/PageFrame'
import { ArtFrame } from '../../components/art/LessonArt'
import { selectCurrentData, useAppStore } from '../../store/appStore'
import { cn } from '../../lib/cn'

const MAP_W = 340
const STEP_H = 132
const TOP = 56

export function TrackPage() {
  const { trackId = '' } = useParams()
  const navigate = useNavigate()
  const data = useAppStore(selectCurrentData)

  if (!TRACK_IDS.includes(trackId as TrackId) || !data) return <Navigate to="/rutas" replace />

  const track = getTrack(trackId as TrackId)
  const lessons = lessonsForTrack(track.id)
  const done = lessons.filter((l) => data.completions[l.id]).length
  const firstPending = lessons.find((l) => !data.completions[l.id])
  const goal = data.onboarding.goal
  const mapH = TOP + lessons.length * STEP_H + 40
  const nodes = lessons.map((lesson, i) => ({
    lesson,
    x: i % 2 === 0 ? 112 : 228,
    y: TOP + i * STEP_H,
  }))
  const pathD = nodes.reduce((d, n, i) => {
    if (i === 0) return `M ${n.x} ${n.y}`
    const prev = nodes[i - 1]
    const midY = (prev.y + n.y) / 2
    return `${d} C ${prev.x} ${midY}, ${n.x} ${midY}, ${n.x} ${n.y}`
  }, '')
  const progressFraction = lessons.length ? done / lessons.length : 0

  return (
    <PageFrame withNav>
      <motion.header {...fadeUp(0)} className="flex items-center gap-3 pt-2">
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-1 text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>
      </motion.header>

      <motion.div {...fadeUp(1)} className="mt-5">
        <ArtFrame art={TRACK_ART[track.id]} className="h-48" />
      </motion.div>

      <motion.section {...fadeUp(2)} className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          {goal === track.id && <span className="rounded-full border border-amber/40 bg-amber/10 px-2.5 py-0.5 text-[12px] font-bold text-amber">Tu ruta</span>}
          <span className="text-[13px] text-ink-muted tabular">
            {done} de {lessons.length} completadas
          </span>
        </div>
        <h1 className="mt-3 text-[32px] leading-[1.1]">{track.title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{track.description}</p>
      </motion.section>

      {firstPending && isLessonAccessible(firstPending, data, goal) && (
        <motion.button
          {...fadeUp(3)}
          onClick={() => navigate(`/leccion/${firstPending.id}`)}
          className="mt-7 flex min-h-16 w-full items-center justify-center gap-2.5 rounded-btn bg-amber px-6 text-[17px] font-bold text-bg shadow-[0_6px_16px_-8px_rgb(175_75_43/0.55)]"
          whileTap={{ scale: 0.97 }}
        >
          <Play className="size-5 fill-current" aria-hidden /> Seguir con la siguiente lección
        </motion.button>
      )}

      {/* Mapa de la ruta */}
      <motion.section {...fadeUp(4)} className="relative mt-10 w-full" style={{ aspectRatio: `${MAP_W} / ${mapH}` }}>
        <svg viewBox={`0 0 ${MAP_W} ${mapH}`} className="absolute inset-0 size-full" aria-hidden>
          <path d={pathD} fill="none" stroke="rgba(31,61,56,0.16)" strokeWidth={4} strokeLinecap="round" strokeDasharray="2 10" />
          <motion.path
            d={pathD}
            fill="none"
            stroke="#AF4B2B"
            strokeWidth={4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progressFraction }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {nodes.map((n, i) => {
          const completed = Boolean(data.completions[n.lesson.id])
          const accessible = isLessonAccessible(n.lesson, data, goal)
          const current = firstPending?.id === n.lesson.id
          const onLeft = n.x > MAP_W / 2
          return (
            <div
              key={n.lesson.id}
              className="absolute"
              style={{ left: `${(n.x / MAP_W) * 100}%`, top: n.y, transform: 'translate(-50%, -50%)' }}
            >
              <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 * i, type: 'spring', stiffness: 260, damping: 18 }}>
                <Link
                  to={accessible ? `/leccion/${n.lesson.id}` : '/premium'}
                  aria-label={`${i + 1}. ${n.lesson.title}${completed ? ', completada' : accessible ? '' : ', disponible en Premium'}`}
                  className="relative block"
                >
                  {current && <span aria-hidden className="absolute -inset-2 rounded-full border-2 border-amber/70" />}
                  <ArtFrame
                    art={LESSON_ART[n.lesson.id] ?? TRACK_ART[track.id]}
                    rounded="rounded-full"
                    className={cn('size-16 border-2', completed ? 'border-sage' : current ? 'border-amber' : 'border-line', !accessible && 'opacity-45 saturate-50')}
                  >
                    <span className="absolute inset-0 bg-bg/40" aria-hidden />
                    <span
                      className={cn(
                        'absolute -bottom-0.5 -right-0.5 grid size-6 place-items-center rounded-full border-2 border-bg',
                        completed ? 'bg-sage text-bg' : accessible ? 'bg-amber text-bg' : 'bg-surface-2 text-ink-muted',
                      )}
                      aria-hidden
                    >
                      {completed ? <Check className="size-3.5" strokeWidth={3} /> : accessible ? <span className="text-[11px] font-bold">{i + 1}</span> : <Lock className="size-3" />}
                    </span>
                  </ArtFrame>
                </Link>
              </motion.div>
              <div
                className={cn('pointer-events-none absolute top-1/2 w-[138px] -translate-y-1/2', onLeft ? 'right-[76px] text-right' : 'left-[76px] text-left')}
              >
                <p className={cn('text-[13px] leading-snug font-semibold', completed ? 'text-sage' : current ? 'text-amber' : 'text-ink')}>{n.lesson.title}</p>
                <p className="mt-0.5 text-[11px] text-ink-muted">
                  {completed ? 'Completada' : current ? 'Siguiente' : `${DAILY_LESSON_MINUTES} min`}
                </p>
              </div>
            </div>
          )
        })}
      </motion.section>
    </PageFrame>
  )
}
