import { motion } from 'motion/react'
import { Lock } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { lessonsForTrack } from '../../content/lessons'
import { TRACKS } from '../../content/tracks'
import { TRACK_ART } from '../../content/art'
import { hasPremium } from '../../lib/access'
import { PageFrame, fadeUp } from '../../components/layout/PageFrame'
import { ArtFrame } from '../../components/art/LessonArt'
import { selectCurrentData, useAppStore } from '../../store/appStore'

export function LibraryPage() {
  const data = useAppStore(selectCurrentData)
  const premium = data ? hasPremium(data.subscription) : false
  const goal = data?.onboarding.goal ?? null

  return (
    <PageFrame withNav>
      <motion.header {...fadeUp(0)} className="pt-2">
        <h1 className="text-[34px] leading-tight">Rutas</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
          Siete rutas. Lecciones de 5 minutos.
        </p>
      </motion.header>

      <div className="mt-7 flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5">
        {TRACKS.map((track, i) => {
          const lessons = lessonsForTrack(track.id)
          const done = data ? lessons.filter((l) => data.completions[l.id]).length : 0
          const pct = lessons.length ? done / lessons.length : 0
          const isGoal = goal === track.id
          return (
            <motion.div key={track.id} {...fadeUp(i + 1)}>
              <Link to={`/rutas/${track.id}`} className="card-surface group block overflow-hidden rounded-card transition-colors hover:border-ink/20">
                <div className="relative">
                  <ArtFrame art={TRACK_ART[track.id]} rounded="rounded-none" className="h-36 border-0" />
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                    {isGoal ? <Chip tone="amber">Tu ruta</Chip> : <span />}
                    {!premium && (
                      <span className="grid size-8 place-items-center rounded-full bg-bg/85 text-ink-muted">
                        <Lock className="size-4" aria-hidden />
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5 pt-4">
                  <h2 className="text-[21px] leading-snug">{track.title}</h2>
                  <p className="mt-1 text-[14px] leading-snug text-ink-muted">{track.subtitle}</p>
                  <div className="mt-4 flex items-center justify-between text-[12px] font-semibold text-ink-muted">
                    <span className="tabular">
                      {done} de {lessons.length} lecciones
                    </span>
                    <span>{Math.round(pct * 100)}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-amber-deep to-amber"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct * 100}%` }}
                      transition={{ duration: 0.25, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </PageFrame>
  )
}

function Chip({ tone, children }: { tone: 'amber'; children: ReactNode }) {
  const cls = tone === 'amber' ? 'border-amber/40 bg-bg/70 text-amber' : ''
  return <span className={`rounded-full border px-3 py-1 text-[12px] font-bold ${cls}`}>{children}</span>
}
