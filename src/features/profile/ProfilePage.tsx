import { motion } from 'motion/react'
import { BellRing, ChevronRight, Flame, LogOut, Share2, ShieldCheck, Trash2, Volume2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { getTrack, TRACKS } from '../../content/tracks'
import { PLANS } from '../../config/app'
import type { PlanId, TrackId } from '../../domain/types'
import { daysLeft, hasPremium } from '../../lib/access'
import { formatDateShort, pluralDays } from '../../lib/dates'
import { badgeStatuses } from '../../lib/badges'
import { progressStats } from '../../lib/progress'
import { drawShareCard, shareCanvas } from '../../lib/shareCard'
import { lastSevenDays } from '../../lib/weekly'
import { PageFrame, fadeUp } from '../../components/layout/PageFrame'
import { Button } from '../../components/ui/Button'
import { Chip } from '../../components/ui/Chip'
import { Sheet } from '../../components/ui/Sheet'
import { AnimatedNumber } from '../../components/ui/AnimatedNumber'
import { Tree, TREE_STAGES } from '../../components/art/Tree'
import { WeekStrip } from '../../components/gamification/WeekStrip'
import { IMAGE_CREDITS } from '../../content/credits'
import { BadgeGrid } from '../../components/gamification/BadgeGrid'
import { selectCurrentAccount, selectCurrentData, useAppStore } from '../../store/appStore'
import { cn } from '../../lib/cn'
import { plantilla } from '../../config/plantilla'
import { EnlacesLegales } from '../legal/LegalPages'

const TIMES = ['07:30', '13:00', '21:00']

export function ProfilePage() {
  const navigate = useNavigate()
  const account = useAppStore(selectCurrentAccount)
  const data = useAppStore(selectCurrentData)
  const saveOnboarding = useAppStore((s) => s.saveOnboarding)
  const cancelSubscription = useAppStore((s) => s.cancelSubscription)
  const logout = useAppStore((s) => s.logout)
  const deleteAccount = useAppStore((s) => s.deleteAccount)
  const sound = useAppStore((s) => s.prefs.sound)
  const setSound = useAppStore((s) => s.setSound)

  const [timeSheet, setTimeSheet] = useState(false)
  const [cancelSheet, setCancelSheet] = useState(false)
  const [deleteSheet, setDeleteSheet] = useState(false)
  const [confirmWord, setConfirmWord] = useState('')
  const [creditsSheet, setCreditsSheet] = useState(false)

  if (!account || !data) return null

  const now = new Date()
  const stats = progressStats(data, now)
  const premium = hasPremium(data.subscription, now)
  const sub = data.subscription
  const goal = data.onboarding.goal ? getTrack(data.onboarding.goal) : null
  const reminder = data.onboarding.reminderTime ?? '07:30'
  const planLabel = sub.plan ? PLANS[sub.plan as PlanId].label : null
  const badges = badgeStatuses(data, now)
  const unlockedCount = badges.filter((b) => b.unlocked).length
  const week = lastSevenDays(data, now)
  const weekMinutes = week.reduce((s, d) => s + d.minutes, 0)
  const firstName = account.name.split(' ')[0]

  const accessText = (() => {
    if (sub.status === 'none') return 'Plan gratuito · tus primeras lecciones de tu ruta'
    if (sub.status === 'trialing') return `Prueba ${planLabel?.toLowerCase()} · termina el ${formatDateShort(sub.trialEndsAt ?? now.toISOString())}`
    if (sub.status === 'canceled') return `Cancelada · acceso hasta el ${formatDateShort(sub.accessUntil ?? now.toISOString())}`
    return `Plan ${planLabel?.toLowerCase()} activo`
  })()

  const share = async () => {
    const canvas = drawShareCard({
      firstName,
      levelName: stats.level.name,
      stage: stats.level.index,
      streak: stats.longestStreak,
      lessons: stats.lessonsCompleted,
      minutes: stats.minutesLearned,
      totalXp: stats.totalXp,
    })
    await shareCanvas(canvas, 'sabiduria-progreso.png')
  }

  return (
    <PageFrame withNav>
      <motion.header {...fadeUp(0)} className="card-surface flex items-center gap-5 rounded-card p-5">
        <Tree stage={stats.level.index} size={96} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[26px] leading-tight">{account.name}</h1>
          <p className="truncate text-[13px] text-ink-muted">{account.email}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber/10 px-3 py-1 text-[12px] font-bold text-amber">
            {stats.level.name} · {TREE_STAGES[stats.level.index]}
          </p>
        </div>
      </motion.header>

      <motion.section {...fadeUp(1)} className="mt-4 grid grid-cols-2 gap-3">
        <Stat label="Lecciones" value={<AnimatedNumber value={stats.lessonsCompleted} />} />
        <Stat label="Minutos" value={<AnimatedNumber value={stats.minutesLearned} />} />
        <Stat label="Racha actual" icon={<Flame className="size-4 text-copper" aria-hidden />} value={<AnimatedNumber value={stats.streak} suffix={stats.streak === 1 ? ' día' : ' días'} />} />
        <Stat label="Mejor racha" value={<AnimatedNumber value={stats.longestStreak} suffix={stats.longestStreak === 1 ? ' día' : ' días'} />} />
      </motion.section>

      <Section title="Esta semana" subtitle={`${weekMinutes} minutos`} index={2}>
        <div className="card-surface rounded-card p-5">
          <WeekStrip days={week} />
        </div>
      </Section>

      <Section title="Insignias" subtitle={`${unlockedCount} de ${badges.length}`} index={3}>
        <div className="card-surface rounded-card p-5">
          <BadgeGrid badges={badges} />
        </div>
      </Section>

      <Section title="Mi aprendizaje" index={4}>
        <Row label="Ruta de inicio" value={goal?.title ?? 'Sin definir'} onClick={() => navigate('/rutas')} />
        <Row label="Hora de tu lección" value={`Todos los días a las ${reminder}`} onClick={() => setTimeSheet(true)} icon={<BellRing className="size-4" aria-hidden />} />
        <Toggle
          label="Sonido y vibración"
          hint="Tonos suaves al responder y al completar lecciones"
          icon={<Volume2 className="size-4" aria-hidden />}
          checked={sound}
          onChange={setSound}
        />
      </Section>

      <Section title="Suscripción" index={5}>
        <div className="card-surface rounded-card p-5">
          <p className="text-[16px] leading-relaxed">{accessText}</p>
          {sub.status === 'trialing' && (
            <p className="mt-2 text-[13px] text-ink-muted">
              Quedan {pluralDays(daysLeft(sub.trialEndsAt, now))}.
            </p>
          )}
          <div className="mt-5 flex flex-col gap-3">
            {premium && sub.status !== 'canceled' && (
              <Button variant="secondary" onClick={() => setCancelSheet(true)}>
                Cancelar suscripción
              </Button>
            )}
            {!premium && <Button onClick={() => navigate('/premium')}>Ver planes</Button>}
            {sub.status === 'canceled' && !premium && (
              <Button variant="secondary" onClick={() => navigate('/premium')}>
                Volver a suscribirme
              </Button>
            )}
          </div>
          <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-ink-muted">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden />
            Cancelar aquí solo cambia tu acceso en este dispositivo. El cobro lo gestiona Hotmart.
          </p>
        </div>
      </Section>

      <Section title="Comparte tu avance" index={6}>
        <Row label="Compartir mi progreso" value="Una tarjeta con tu árbol, racha y lecciones" onClick={share} icon={<Share2 className="size-4" aria-hidden />} />
      </Section>

      <Section title="Acerca de" index={7}>
        <Row label="Créditos de imágenes" value={`${IMAGE_CREDITS.length} imágenes de Wikimedia Commons`} onClick={() => setCreditsSheet(true)} />
        <Row label="Privacidad" value="Qué datos guarda la app y dónde" onClick={() => navigate('/legal/privacidad')} />
        <Row label="Términos del servicio" value="" onClick={() => navigate('/legal/terminos')} />
        <Row label="Política de reembolso" value="" onClick={() => navigate('/legal/reembolso')} />
      </Section>

      <Section title="Cuenta" index={8}>
        <Row
          label="Cerrar sesión"
          value=""
          icon={<LogOut className="size-4" aria-hidden />}
          onClick={() => {
            logout()
            navigate('/login')
          }}
        />
        <Row label="Borrar mi cuenta y mis datos" value="" danger icon={<Trash2 className="size-4" aria-hidden />} onClick={() => setDeleteSheet(true)} />
      </Section>

      <p className="mt-10 text-center text-[12px] text-ink-muted">
        {plantilla.nombre}. Contenido educativo, no asesoría financiera ni legal.
      </p>
      <EnlacesLegales className="mt-3" />

      <Sheet open={timeSheet} onClose={() => setTimeSheet(false)} title="Hora de tu lección">
        <div role="radiogroup" aria-label="Horario" className="flex flex-col gap-3">
          {TIMES.map((t) => (
            <Chip
              key={t}
              selected={reminder === t}
              onSelect={() => {
                saveOnboarding({ goal: (data.onboarding.goal ?? TRACKS[0].id) as TrackId, reminderTime: t })
                setTimeSheet(false)
              }}
            >
              <span className="tabular">{t}</span>
            </Chip>
          ))}
        </div>
      </Sheet>

      <Sheet open={creditsSheet} onClose={() => setCreditsSheet(false)} title="Créditos de imágenes">
        <ul className="flex max-h-[60dvh] flex-col gap-3 overflow-y-auto pr-1">
          {IMAGE_CREDITS.map((c) => (
            <li key={c.file} className="text-[13px] leading-snug text-ink-muted">
              <span className="block text-[14px] font-semibold text-ink">{c.subject}</span>
              {c.author} · {c.license} ·{' '}
              <a href={c.url} target="_blank" rel="noreferrer" className="text-amber underline-offset-4 hover:underline">
                ver original
              </a>
            </li>
          ))}
        </ul>
      </Sheet>

      <Sheet open={cancelSheet} onClose={() => setCancelSheet(false)} title="¿Cancelamos?">
        <div className="flex flex-col gap-5">
          <p className="text-[16px] leading-relaxed text-ink-muted">
            Cancelar aquí cambia tu acceso en este dispositivo: lo mantienes hasta el <span className="text-ink">{formatDateShort(sub.accessUntil ?? now.toISOString())}</span>. El cobro lo gestiona Hotmart, y su cancelación también se hace allí. Tu progreso, tu árbol y tu diario se quedan guardados.
          </p>
          <Button
            variant="danger"
            onClick={() => {
              cancelSubscription()
              setCancelSheet(false)
            }}
          >
            Confirmar cancelación
          </Button>
          <Button variant="ghost" onClick={() => setCancelSheet(false)}>
            Seguir con mi plan
          </Button>
        </div>
      </Sheet>

      <Sheet
        open={deleteSheet}
        onClose={() => {
          setDeleteSheet(false)
          setConfirmWord('')
        }}
        title="Borrar tu cuenta"
      >
        <div className="flex flex-col gap-5">
          <p className="text-[15px] leading-relaxed text-ink-muted">
            Se eliminarán tu cuenta, tu progreso, tu diario y tus datos de este dispositivo. No se puede deshacer.
          </p>
          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-ink-muted">
              Escribe <span className="text-ink">BORRAR</span> para confirmar
            </span>
            <input
              value={confirmWord}
              onChange={(e) => setConfirmWord(e.target.value)}
              autoCapitalize="characters"
              className="min-h-14 rounded-btn border border-line bg-bg px-4 text-[17px] tracking-wide focus:border-danger/60"
            />
          </label>
          <Button
            variant="danger"
            disabled={confirmWord !== 'BORRAR'}
            onClick={() => {
              deleteAccount()
              navigate('/', { replace: true })
            }}
          >
            Borrar mi cuenta
          </Button>
        </div>
      </Sheet>
    </PageFrame>
  )
}

function Section({ title, subtitle, index, children }: { title: string; subtitle?: string; index: number; children: ReactNode }) {
  return (
    <motion.section {...fadeUp(index)} className="mt-9">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-[22px]">{title}</h2>
        {subtitle && <span className="text-[13px] text-ink-muted tabular">{subtitle}</span>}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </motion.section>
  )
}

function Stat({ label, value, icon }: { label: string; value: ReactNode; icon?: ReactNode }) {
  return (
    <div className="card-surface flex flex-col gap-1.5 rounded-card p-4">
      <span className="flex items-center gap-2 font-display text-[22px] leading-none tabular">
        {icon}
        {value}
      </span>
      <span className="text-[12px] text-ink-muted">{label}</span>
    </div>
  )
}

function Row({ label, value, onClick, icon, danger = false }: { label: string; value: string; onClick: () => void; icon?: ReactNode; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn('card-surface flex min-h-14 items-center gap-3 rounded-btn px-4 text-left transition-colors hover:border-ink/20', danger && 'text-danger')}
    >
      {icon && <span className={cn(danger ? 'text-danger' : 'text-ink-muted')}>{icon}</span>}
      <span className="flex-1">
        <span className="block text-[15px] font-semibold">{label}</span>
        {value && <span className="block text-[13px] text-ink-muted">{value}</span>}
      </span>
      <ChevronRight className="size-4 text-ink-muted" aria-hidden />
    </button>
  )
}

function Toggle({ label, hint, icon, checked, onChange }: { label: string; hint: string; icon: ReactNode; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="card-surface flex min-h-14 cursor-pointer items-center gap-3 rounded-btn px-4 py-3 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-amber/70">
      <span className="text-ink-muted">{icon}</span>
      <span className="flex-1">
        <span className="block text-[15px] font-semibold">{label}</span>
        <span className="block text-[13px] text-ink-muted">{hint}</span>
      </span>
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className={cn('relative h-7 w-12 shrink-0 rounded-full transition-colors', checked ? 'bg-amber' : 'bg-line')} aria-hidden>
        <span className={cn('absolute top-1 size-5 rounded-full bg-bg transition-all', checked ? 'left-6' : 'left-1')} />
      </span>
    </label>
  )
}
