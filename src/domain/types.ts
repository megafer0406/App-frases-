export type TrackId =
  | 'historia'
  | 'filosofia'
  | 'liderazgo'
  | 'negocios'
  | 'mentalidad'
  | 'pensamiento'
  | 'dinero'

export type ArchetypeId = 'curioso' | 'lider' | 'estratega' | 'constante'

export type PlanId = 'anual' | 'mensual'

export type CardKind = 'concepto' | 'historia' | 'mito' | 'dato' | 'formula'

export interface Track {
  id: TrackId
  title: string
  subtitle: string
  description: string
  icon: 'landmark' | 'scroll' | 'compass' | 'chart' | 'sprout' | 'scale' | 'coins'
}

export interface LessonCard {
  kind: CardKind
  title: string
  paragraphs: string[]
  takeaway?: string
  formula?: { expression: string; example: string }
  /** Herramienta interactiva que se muestra dentro de la tarjeta. */
  interactive?: 'breakeven'
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Lesson {
  id: string
  trackId: TrackId
  order: number
  title: string
  hook: string
  cards: LessonCard[]
  quiz: QuizQuestion[]
  reflectionPrompt: string
  action: string
  sources: string[]
}

export interface FunnelOption {
  value: string
  label: string
  weights: Partial<Record<ArchetypeId, number>>
}

export type QuestionIcon = 'target' | 'clock' | 'headphones' | 'message' | 'mountain' | 'mirror' | 'sun' | 'trending' | 'compass' | 'trophy'

export interface FunnelQuestion {
  id: string
  prompt: string
  hint?: string
  icon: QuestionIcon
  options: FunnelOption[]
}

export interface Archetype {
  id: ArchetypeId
  name: string
  tagline: string
  pain: string
  fear: string
  desire: string
  /** Ruta que se recomienda primero y de la que salen las lecciones gratis. */
  firstTrack: TrackId
}

export interface Account {
  id: string
  email: string
  name: string
  passwordHash: string
  salt: string
  createdAt: string
}

export interface LessonCompletion {
  completedAt: string
  correct: number
  total: number
  xp: number
  reflectionWritten: boolean
}

export interface Reflection {
  id: string
  lessonId: string | null
  text: string
  createdAt: string
}

export type SubscriptionStatus = 'none' | 'trialing' | 'active' | 'canceled'

export interface Subscription {
  status: SubscriptionStatus
  plan: PlanId | null
  startedAt: string | null
  trialEndsAt: string | null
  /** Hasta cuándo tiene acceso premium tras cancelar o durante la prueba. */
  accessUntil: string | null
  canceledAt: string | null
}

export interface Onboarding {
  goal: TrackId | null
  reminderTime: string | null
  completedAt: string | null
}

export interface UserData {
  onboarding: Onboarding
  completions: Record<string, LessonCompletion>
  reflections: Reflection[]
  subscription: Subscription
  /** XP de los cofres diarios, por día (YYYY-MM-DD). */
  bonusXp: Record<string, number>
}
