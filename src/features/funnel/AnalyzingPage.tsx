import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Tree } from '../../components/art/Tree'
import { PageFrame } from '../../components/layout/PageFrame'
import { FUNNEL_QUESTIONS } from '../../content/funnel'
import { useAppStore } from '../../store/appStore'

const STEPS = ['Leyendo tus respuestas…', 'Eligiendo tu ruta inicial…', 'Preparando tus primeras lecciones…']
const STEP_MS = 1000

export function AnalyzingPage() {
  const navigate = useNavigate()
  const funnel = useAppStore((s) => s.funnel)
  const [index, setIndex] = useState(0)

  const ready = Boolean(funnel.completedAt) && FUNNEL_QUESTIONS.every((q) => funnel.answers[q.id])

  useEffect(() => {
    if (!ready) return
    const timers = STEPS.map((_, i) => window.setTimeout(() => setIndex(i + 1), STEP_MS * (i + 1)))
    const done = window.setTimeout(() => navigate('/resultado', { replace: true }), STEP_MS * STEPS.length + 500)
    return () => {
      timers.forEach(window.clearTimeout)
      window.clearTimeout(done)
    }
  }, [ready, navigate])

  if (!ready) return <Navigate to="/quiz" replace />

  return (
    <PageFrame className="items-center justify-center text-center">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}>
        <Tree stage={Math.min(4, index + 1)} size={200} />
      </motion.div>

      <h1 className="mt-6 text-[30px]">Un momento, {funnel.name}.</h1>

      <div className="mt-5 flex min-h-[64px] flex-col items-center gap-2" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-[17px] text-ink-muted"
          >
            {STEPS[Math.min(index, STEPS.length - 1)]}
          </motion.p>
        </AnimatePresence>
      </div>
    </PageFrame>
  )
}
