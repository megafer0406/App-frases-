import { motion } from 'motion/react'
import { ArrowRight, BookOpen, Compass, Clock3, Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { Button } from '../../components/ui/Button'
import { Wordmark } from '../../components/brand/Logo'
import { PageFrame, fadeUp } from '../../components/layout/PageFrame'
import { plantilla } from '../../config/plantilla'
import { textoGarantia } from '../../lib/garantia'
import { track } from '../../services/analytics'
import { HeroCaptura } from './HeroCaptura'

/** Botón de inicio repetido en la portada: misma acción (el quiz) y un id y un evento estables para medir. */
function BotonInicio({ id, garantia, onClick }: { id: string; garantia: string | null; onClick: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <Button id={id} data-evento="inicio-quiz" icon={<ArrowRight className="size-5" aria-hidden />} onClick={onClick}>
        Empezar (2 minutos)
      </Button>
      <p className="text-center text-[13px] text-ink-muted md:text-left">
        Gratis para empezar.{garantia ? ` ${garantia}.` : ''}
      </p>
    </div>
  )
}

export function WelcomePage() {
  const navigate = useNavigate()
  const garantia = textoGarantia()
  const empezar = () => {
    track('quiz_started')
    navigate('/quiz')
  }

  const preguntas = [
    {
      pregunta: '¿Sirve si no tengo conocimientos previos?',
      respuesta: 'Sí. Cada lección explica su idea en tarjetas cortas, con una pregunta de comprobación y una acción para el día.',
    },
    {
      pregunta: '¿Cuánto cuesta?',
      respuesta: 'Antes de elegir un plan verás su precio y su periodo. El cobro lo gestiona Hotmart.',
    },
    {
      pregunta: '¿Qué pasa con mis datos?',
      respuesta: 'Tu cuenta, tu progreso y tu diario se guardan en este dispositivo. La app no los envía a ningún servidor.',
    },
    {
      pregunta: '¿Y si no me convence?',
      respuesta: garantia
        ? `${garantia}. Pide tu reembolso a través de Hotmart, donde se gestionan los cobros. Si tienes una suscripción, su cancelación también se gestiona allí.`
        : `Escríbenos a ${plantilla.contactoEmail} para consultar tu caso.`,
    },
  ]

  return (
    <PageFrame className="pb-8 md:grid md:max-w-[960px] md:grid-cols-2 md:content-center md:gap-x-12 md:gap-y-8 md:px-8 lg:gap-x-16">
      <header className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 pt-2 md:col-span-2">
        <Wordmark />
        <Link to="/login" className="inline-flex min-h-11 items-center whitespace-nowrap text-[14px] font-semibold text-ink-muted hover:text-ink">
          Iniciar sesión
        </Link>
      </header>

      <section className="mt-6 flex flex-col gap-5 text-center md:col-start-1 md:row-start-2 md:mt-0 md:text-left">
        <motion.h1 {...fadeUp(1)} className="text-[clamp(30px,8.6vw,34px)] leading-[1.1] md:text-[clamp(36px,3.4vw,46px)]">
          {plantilla.slogan[0]} <em className="text-amber">{plantilla.slogan[1]}</em>
        </motion.h1>
        <motion.p {...fadeUp(2)} className="mx-auto max-w-[34ch] text-[16px] leading-relaxed text-ink-muted md:mx-0 md:max-w-[42ch]">
          Historia, filosofía, liderazgo y dinero: aprende una idea, compruébala con preguntas y aplícala.
        </motion.p>
        <motion.div {...fadeUp(3)}>
          <BotonInicio id="cta-portada-arriba" garantia={garantia} onClick={empezar} />
        </motion.div>
      </section>

      <HeroCaptura />

      <section className="mt-6 flex flex-col gap-5 md:col-start-1 md:row-start-3 md:mt-0">
        <motion.div {...fadeUp(4)} className="mx-auto grid w-full grid-cols-3 gap-2 md:mx-0">
          {[
            { icon: BookOpen, value: '26', label: 'lecciones' },
            { icon: Compass, value: '7', label: 'rutas' },
            { icon: Clock3, value: '5', label: 'min al día' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="card-surface flex flex-col items-center gap-1.5 rounded-card py-3">
              <Icon className="size-4 text-amber" aria-hidden />
              <span className="font-display text-[22px] leading-none tabular">{value}</span>
              <span className="text-[11px] text-ink-muted">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      <motion.section
        {...fadeUp(5)}
        aria-labelledby="preguntas-titulo"
        className="mt-10 flex flex-col gap-3 md:col-span-2 md:row-start-4 md:mx-auto md:mt-0 md:w-full md:max-w-[720px]"
      >
        <h2 id="preguntas-titulo" className="text-[24px] leading-tight">
          Preguntas frecuentes
        </h2>
        {preguntas.map((item) => (
          <details key={item.pregunta} className="card-surface group rounded-card px-5">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-2 text-[16px] font-semibold [&::-webkit-details-marker]:hidden">
              {item.pregunta}
              <Plus className="size-5 shrink-0 text-amber transition-transform group-open:rotate-45" aria-hidden />
            </summary>
            <p className="pb-4 text-[15px] leading-relaxed text-ink-muted">{item.respuesta}</p>
          </details>
        ))}
      </motion.section>

      <motion.footer
        {...fadeUp(6)}
        className="mt-10 flex flex-col gap-4 md:col-span-2 md:row-start-5 md:mx-auto md:mt-0 md:w-full md:max-w-[440px]"
      >
        <BotonInicio id="cta-portada-final" garantia={garantia} onClick={empezar} />
      </motion.footer>
    </PageFrame>
  )
}
