import { motion } from 'motion/react'
import { ArrowRight, Anchor, CalendarDays, Clock3, Compass, Eye, Star } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Button } from '../../components/ui/Button'
import { PageFrame, fadeUp } from '../../components/layout/PageFrame'
import { ArtFrame } from '../../components/art/LessonArt'
import { Tree } from '../../components/art/Tree'
import { ARCHETYPES, FUNNEL_QUESTIONS } from '../../content/funnel'
import { ALL_LESSONS } from '../../content/lessons'
import { getTrack, TRACKS } from '../../content/tracks'
import { ARCHETYPE_ART } from '../../content/art'
import { DAILY_LESSON_MINUTES } from '../../config/app'
import { findArchetype, scoreArchetype } from '../../lib/funnel'
import { track } from '../../services/analytics'
import { useAppStore } from '../../store/appStore'

export function ResultPage() {
  const navigate = useNavigate()
  const funnel = useAppStore((s) => s.funnel)

  const complete = Boolean(funnel.completedAt) && FUNNEL_QUESTIONS.every((q) => funnel.answers[q.id])
  const { archetypeId } = scoreArchetype(funnel.answers, FUNNEL_QUESTIONS)
  const archetype = findArchetype(ARCHETYPES, archetypeId)
  const firstTrack = getTrack(archetype.firstTrack)

  useEffect(() => {
    if (complete) track('result_viewed', { archetype: archetype.id })
  }, [complete, archetype.id])

  if (!complete) return <Navigate to="/quiz" replace />

  const totalMinutes = ALL_LESSONS.length * DAILY_LESSON_MINUTES
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return (
    <PageFrame className="pb-36">
      <motion.div {...fadeUp(0)}>
        <ArtFrame art={ARCHETYPE_ART[archetype.id]} className="h-52" />
      </motion.div>

      <motion.h1 {...fadeUp(1)} className="mt-6 text-[40px] leading-[1.05]">
        {archetype.name}
      </motion.h1>
      <motion.p {...fadeUp(2)} className="mt-3 text-[17px] leading-relaxed text-ink-muted">
        Según tus respuestas: {archetype.tagline}
      </motion.p>

      <div className="mt-7 flex flex-col gap-3">
        <MirrorCard index={3} icon={<Anchor className="size-4" aria-hidden />} title="Lo que quieres trabajar" text={archetype.pain} />
        <MirrorCard index={4} icon={<Eye className="size-4" aria-hidden />} title="Lo que quieres evitar" text={archetype.fear} />
        <MirrorCard index={5} icon={<Star className="size-4" aria-hidden />} title="Lo que deseas" text={archetype.desire} accent />
      </div>

      <motion.section {...fadeUp(6)} className="mt-9">
        <h2 className="text-[24px]">Con 5 minutos al día</h2>
        <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4">
          <div className="grid grid-cols-1 gap-3">
            <Stat icon={<CalendarDays className="size-5" aria-hidden />} value={String(ALL_LESSONS.length)} label="lecciones" />
            <Stat icon={<Clock3 className="size-5" aria-hidden />} value={`${hours}h ${minutes}m`} label="de aprendizaje" />
            <Stat icon={<Compass className="size-5" aria-hidden />} value={String(TRACKS.length)} label="rutas para elegir" />
          </div>
          <div className="card-surface flex flex-col items-center gap-2 rounded-card p-4">
            <Tree stage={0} size={120} />
            <span className="text-center text-[12px] leading-snug text-ink-muted">Tu árbol crecerá al completar lecciones</span>
          </div>
        </div>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
          Tu ruta de inicio es <span className="text-ink">{firstTrack.title}</span>. Puedes cambiarla cuando quieras.
        </p>
      </motion.section>

      <motion.footer
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[440px] bg-gradient-to-t from-bg via-bg/95 to-transparent px-5 pt-10 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      >
        <Button icon={<ArrowRight className="size-5" aria-hidden />} onClick={() => navigate('/registro')}>
          Crear mi plan, {funnel.name}
        </Button>
      </motion.footer>
    </PageFrame>
  )
}

function MirrorCard({ index, icon, title, text, accent = false }: { index: number; icon: ReactNode; title: string; text: string; accent?: boolean }) {
  return (
    <motion.div
      {...fadeUp(index)}
      className={accent ? 'rounded-card border border-amber/30 bg-amber/[0.07] p-5' : 'card-surface rounded-card p-5'}
    >
      <p className="flex items-center gap-2 text-[14px] font-semibold text-ink-muted">
        <span className={accent ? 'text-amber' : 'text-copper'}>{icon}</span>
        {title}
      </p>
      <p className="mt-2 text-[16px] leading-relaxed text-ink">{text}</p>
    </motion.div>
  )
}

function Stat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="card-surface flex items-center gap-4 rounded-card p-4">
      <span className="grid size-10 place-items-center rounded-xl bg-amber/10 text-amber">{icon}</span>
      <span className="flex-1">
        <span className="block font-display text-[24px] leading-none tabular">{value}</span>
        <span className="mt-1 block text-[13px] text-ink-muted">{label}</span>
      </span>
    </div>
  )
}
