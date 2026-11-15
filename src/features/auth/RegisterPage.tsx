import { motion } from 'motion/react'
import { ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { Button } from '../../components/ui/Button'
import { Field } from '../../components/ui/Field'
import { Wordmark } from '../../components/brand/Logo'
import { PageFrame, fadeUp } from '../../components/layout/PageFrame'
import { ArtFrame } from '../../components/art/LessonArt'
import { PASSWORD_MIN_LENGTH } from '../../config/app'
import type { FieldErrors } from '../../services/auth'
import { selectCurrentAccount, selectCurrentData, useAppStore } from '../../store/appStore'
import { hasOnboarded } from './guards'
import { conexiones } from '../../config/plantilla'

export function RegisterPage() {
  const navigate = useNavigate()
  const register = useAppStore((s) => s.register)
  const account = useAppStore(selectCurrentAccount)
  const data = useAppStore(selectCurrentData)
  const funnelName = useAppStore((s) => s.funnel.name)

  const [name, setName] = useState(funnelName)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (account) return <Navigate to={hasOnboarded(data) ? '/hoy' : '/onboarding'} replace />

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!accepted || submitting) return
    setSubmitting(true)
    setFormError(null)
    const result = await register({ name, email, password })
    setSubmitting(false)
    if (result.ok) {
      navigate('/onboarding', { replace: true })
      return
    }
    setErrors(result.errors ?? {})
    if (result.message) setFormError(result.message)
  }

  return (
    <PageFrame className="pb-10">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-2">
        <Wordmark />
        <Link to="/login" className="inline-flex min-h-11 items-center whitespace-nowrap text-[14px] font-semibold text-ink-muted hover:text-ink">
          Iniciar sesión
        </Link>
      </header>

      <motion.div {...fadeUp(0)} className="mt-6">
        <ArtFrame art={{ image: '/img/bg-biblioteca.jpg', scene: 'stairs', tone: 'amber' }} className="h-40" />
      </motion.div>

      <motion.h1 {...fadeUp(1)} className="mt-7 text-[36px] leading-[1.1]">
        Guarda tu plan y tu progreso.
      </motion.h1>
      <motion.p {...fadeUp(1)} className="mt-3 text-[16px] leading-relaxed text-ink-muted">
        Te pedimos tu nombre, un email y una contraseña.
      </motion.p>

      <motion.form {...fadeUp(2)} onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-5">
        <Field
          label="Tu nombre"
          name="name"
          autoComplete="given-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          maxLength={40}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="nombre@correo.com"
        />
        <Field
          label="Contraseña"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          hint={`Mínimo ${PASSWORD_MIN_LENGTH} caracteres.`}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              className="grid size-11 place-items-center rounded-full text-ink-muted hover:text-ink"
            >
              {showPassword ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
            </button>
          }
        />

        <label className="flex min-h-11 cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-ink-muted">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-[var(--color-amber)]"
          />
          <span>
            Acepto los{' '}
            <a href="/legal/terminos" target="_blank" rel="noreferrer" className="text-ink underline underline-offset-4">
              términos
            </a>{' '}
            y la{' '}
            <a href="/legal/privacidad" target="_blank" rel="noreferrer" className="text-ink underline underline-offset-4">
              política de privacidad
            </a>
            .
          </span>
        </label>

        {formError && (
          <p role="alert" className="rounded-btn border border-danger/40 bg-danger/10 px-4 py-3 text-[14px] text-danger">
            {formError}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            loading={submitting}
            disabled={!accepted}
            aria-describedby={accepted ? undefined : 'registro-aviso'}
            icon={<ArrowRight className="size-5" aria-hidden />}
          >
            Crear mi plan
          </Button>
          {!accepted && (
            <p id="registro-aviso" className="text-center text-[13px] text-ink-muted">
              Marca la casilla de los textos legales para continuar.
            </p>
          )}
        </div>
      </motion.form>

      <motion.p {...fadeUp(3)} className="mt-8 flex items-start gap-2.5 text-[13px] leading-relaxed text-ink-muted">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden />
        {conexiones.cuentas
          ? 'Tu cuenta se guarda en el servicio de cuentas que conectaste. Revisa la política de privacidad.'
          : 'Tu cuenta y tus datos se guardan en este dispositivo. Puedes borrarlos cuando quieras desde tu perfil.'}
      </motion.p>
    </PageFrame>
  )
}
