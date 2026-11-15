import { motion } from 'motion/react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { Button } from '../../components/ui/Button'
import { Field } from '../../components/ui/Field'
import { Wordmark } from '../../components/brand/Logo'
import { PageFrame, fadeUp } from '../../components/layout/PageFrame'
import { ArtFrame } from '../../components/art/LessonArt'
import type { FieldErrors } from '../../services/auth'
import { selectCurrentAccount, selectCurrentData, useAppStore } from '../../store/appStore'
import { hasOnboarded } from './guards'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAppStore((s) => s.login)
  const account = useAppStore(selectCurrentAccount)
  const data = useAppStore(selectCurrentData)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (account) return <Navigate to={hasOnboarded(data) ? '/hoy' : '/onboarding'} replace />

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setFormError(null)
    setNotice(null)
    const result = await login({ email, password })
    setSubmitting(false)
    if (result.ok) {
      navigate('/hoy', { replace: true })
      return
    }
    setErrors(result.errors ?? {})
    if (result.message) setFormError(result.message)
  }

  return (
    <PageFrame className="pb-10">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-2">
        <Wordmark />
        <Link to="/registro" className="inline-flex min-h-11 items-center whitespace-nowrap text-[14px] font-semibold text-ink-muted hover:text-ink">
          Crear cuenta
        </Link>
      </header>

      <motion.div {...fadeUp(0)} className="mt-6">
        <ArtFrame art={{ image: '/img/bg-cuaderno.jpg', scene: 'curve', tone: 'sage' }} className="h-40" />
      </motion.div>

      <motion.h1 {...fadeUp(1)} className="mt-7 text-[36px] leading-[1.1]">
        Qué bueno verte de nuevo.
      </motion.h1>

      <motion.form {...fadeUp(2)} onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-5">
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
        />
        <Field
          label="Contraseña"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
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

        {formError && (
          <p role="alert" className="rounded-btn border border-danger/40 bg-danger/10 px-4 py-3 text-[14px] text-danger">
            {formError}
          </p>
        )}

        <Button type="submit" loading={submitting} icon={<ArrowRight className="size-5" aria-hidden />}>
          Entrar
        </Button>

        <button
          type="button"
          onClick={() =>
            setNotice('La recuperación por email llega con la sincronización en la nube. Mientras tanto, crea una cuenta nueva.')
          }
          className="inline-flex min-h-11 items-center self-center text-[14px] text-ink-muted underline-offset-4 hover:text-ink hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </button>
        {notice && <p className="text-center text-[14px] leading-relaxed text-ink-muted">{notice}</p>}
      </motion.form>
    </PageFrame>
  )
}
