import { AnimatePresence, motion } from 'motion/react'
import { Lock, PenLine, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { getLesson } from '../../content/lessons'
import { hasPremium } from '../../lib/access'
import { formatDateShort } from '../../lib/dates'
import { PageFrame, fadeUp } from '../../components/layout/PageFrame'
import { Button } from '../../components/ui/Button'
import { ArtFrame } from '../../components/art/LessonArt'
import { selectCurrentData, useAppStore } from '../../store/appStore'

const FREE_ENTRIES = 3

export function JournalPage() {
  const navigate = useNavigate()
  const data = useAppStore(selectCurrentData)
  const addReflection = useAppStore((s) => s.addReflection)
  const removeReflection = useAppStore((s) => s.removeReflection)
  const [draft, setDraft] = useState('')
  const [justSaved, setJustSaved] = useState(false)

  if (!data) return null

  const premium = hasPremium(data.subscription)
  const visible = premium ? data.reflections : data.reflections.slice(0, FREE_ENTRIES)
  const hiddenCount = data.reflections.length - visible.length

  const save = () => {
    if (!draft.trim()) return
    addReflection(draft, null)
    setDraft('')
    setJustSaved(true)
    window.setTimeout(() => setJustSaved(false), 1600)
  }

  return (
    <PageFrame withNav>
      <motion.div {...fadeUp(0)} className="relative pt-2">
        <ArtFrame art={{ image: '/img/bg-cuaderno.jpg', scene: 'curve', tone: 'sage' }} className="h-44" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 rounded-b-card bg-gradient-to-t from-bg via-bg/80 to-transparent" />
        <div className="absolute inset-x-5 bottom-5">
          <h1 className="text-[34px] leading-tight">Tu diario</h1>
          <p className="mt-1 text-[15px] text-ink-muted">Lo que aprendiste, en tus palabras.</p>
        </div>
      </motion.div>

      <motion.section {...fadeUp(1)} className="card-surface mt-6 flex flex-col gap-3 rounded-card p-5">
        <label htmlFor="journal-draft" className="flex items-center gap-2 text-[15px] font-semibold">
          <PenLine className="size-4 text-amber" aria-hidden /> ¿Qué te quedó hoy?
        </label>
        <textarea
          id="journal-draft"
          value={draft}
          onChange={(e) => setDraft(e.target.value.slice(0, 1000))}
          rows={3}
          placeholder="Una idea, una duda o algo que quieres aplicar."
          className="w-full resize-none rounded-btn border border-line bg-bg p-4 text-[16px] leading-relaxed placeholder:text-ink-muted/80 focus:border-amber/60"
        />
        <div className="flex items-center justify-between gap-3">
          <AnimatePresence mode="wait">
            {justSaved ? (
              <motion.span key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[14px] font-semibold text-sage">
                Guardada
              </motion.span>
            ) : (
              <span key="count" className="text-[12px] text-ink-muted tabular">
                {draft.length}/1000
              </span>
            )}
          </AnimatePresence>
          <Button fullWidth={false} onClick={save} disabled={!draft.trim()} className="min-h-12 px-5">
            Guardar
          </Button>
        </div>
      </motion.section>

      <section className="mt-8 flex flex-col gap-3">
        {data.reflections.length === 0 && (
          <motion.div {...fadeUp(2)} className="card-surface flex flex-col items-center gap-4 rounded-card p-6 text-center">
            <ArtFrame art={{ scene: 'quad', tone: 'amber' }} className="h-28 w-full" />
            <p className="text-[15px] leading-relaxed text-ink-muted">
              Termina una lección y guarda tu primera reflexión. Suma XP y desbloquea «Voz propia».
            </p>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {visible.map((entry) => {
            const lesson = entry.lessonId ? getLesson(entry.lessonId) : null
            return (
              <motion.article
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="card-surface rounded-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[12px] font-semibold text-ink-muted tabular">{formatDateShort(entry.createdAt)}</p>
                    {lesson && <p className="mt-1 text-[13px] text-amber">{lesson.title}</p>}
                  </div>
                  <button
                    onClick={() => removeReflection(entry.id)}
                    aria-label="Eliminar reflexión"
                    className="grid size-10 place-items-center rounded-full text-ink-muted hover:text-danger"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
                <p className="mt-3 text-[16px] leading-relaxed whitespace-pre-line">{entry.text}</p>
              </motion.article>
            )
          })}
        </AnimatePresence>

        {hiddenCount > 0 && (
          <button onClick={() => navigate('/premium')} className="card-surface flex items-center gap-3 rounded-card p-5 text-left">
            <Lock className="size-5 shrink-0 text-amber" aria-hidden />
            <span className="text-[15px]">
              Tienes {hiddenCount} {hiddenCount === 1 ? 'reflexión más' : 'reflexiones más'} guardadas.{' '}
              <span className="font-semibold text-amber">Ver todo el diario con Premium</span>
            </span>
          </button>
        )}
      </section>
    </PageFrame>
  )
}
