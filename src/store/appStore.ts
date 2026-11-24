import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { PLANS, STORAGE_KEY } from '../config/app'
import type { Account, PlanId, Reflection, TrackId, UserData } from '../domain/types'
import { addDaysIso, dayKey } from '../lib/dates'
import { emptyUserData } from '../lib/progress'
import { hashPassword, verifyPassword } from '../lib/password'
import { xpForLesson } from '../lib/xp'
import {
  DUPLICATE_EMAIL_MESSAGE,
  INVALID_CREDENTIALS_MESSAGE,
  normalizeEmail,
  validateLogin,
  validateRegistration,
  type FieldErrors,
} from '../services/auth'
import { track } from '../services/analytics'
import {
  cerrarSesionEnLaNube,
  cuentasEnLaNube,
  guardarProgreso,
  iniciarSesionEnLaNube,
  leerProgreso,
  registrarEnLaNube,
  sesionEnLaNube,
} from '../services/cuentas'

export interface FunnelState {
  name: string
  answers: Record<string, string>
  completedAt: string | null
}

export type AuthResult = { ok: true } | { ok: false; errors?: FieldErrors; message?: string }

export interface Prefs {
  sound: boolean
}

export interface AppState {
  funnel: FunnelState
  accounts: Account[]
  sessionUserId: string | null
  users: Record<string, UserData>
  prefs: Prefs

  setFunnelName: (name: string) => void
  answerFunnel: (questionId: string, value: string) => void
  completeFunnel: () => void
  resetFunnel: () => void

  register: (input: { name: string; email: string; password: string }) => Promise<AuthResult>
  login: (input: { email: string; password: string }) => Promise<AuthResult>
  logout: () => void
  deleteAccount: () => void

  saveOnboarding: (input: { goal: TrackId; reminderTime: string }) => void
  completeLesson: (input: {
    lessonId: string
    correct: number
    total: number
    reflection?: string
    now?: Date
  }) => { xp: number; alreadyCompleted: boolean }
  addReflection: (text: string, lessonId: string | null) => Reflection | null
  removeReflection: (id: string) => void

  startTrial: (plan: PlanId, now?: Date) => void
  cancelSubscription: (now?: Date) => void

  openChest: (xp: number, now?: Date) => boolean
  setSound: (on: boolean) => void
}

const initialFunnel: FunnelState = { name: '', answers: {}, completedAt: null }

function newId(): string {
  return crypto.randomUUID()
}

function nowIso(now?: Date): string {
  return (now ?? new Date()).toISOString()
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      funnel: initialFunnel,
      accounts: [],
      sessionUserId: null,
      users: {},
      prefs: { sound: false },

      setFunnelName: (name) =>
        set((s) => ({ funnel: { ...s.funnel, name: name.trim().slice(0, 40) } })),

      answerFunnel: (questionId, value) =>
        set((s) => ({
          funnel: { ...s.funnel, answers: { ...s.funnel.answers, [questionId]: value } },
        })),

      completeFunnel: () =>
        set((s) => ({ funnel: { ...s.funnel, completedAt: nowIso() } })),

      resetFunnel: () => set({ funnel: initialFunnel }),

      register: async (input) => {
        const errors = validateRegistration(input)
        if (Object.keys(errors).length > 0) return { ok: false, errors }

        const email = normalizeEmail(input.email)
        if (cuentasEnLaNube) {
          const nube = await registrarEnLaNube(email, input.password, input.name.trim())
          if (!nube.ok) return { ok: false, message: nube.message }
          const cuenta: Account = {
            id: nube.userId,
            email,
            name: nube.nombre,
            passwordHash: '',
            salt: '',
            createdAt: nowIso(),
          }
          set((s) => ({
            accounts: [...s.accounts.filter((a) => a.id !== cuenta.id), cuenta],
            sessionUserId: cuenta.id,
            users: { ...s.users, [cuenta.id]: emptyUserData() },
          }))
          track('account_created')
          return { ok: true }
        }
        if (get().accounts.some((a) => a.email === email)) {
          return { ok: false, errors: { email: DUPLICATE_EMAIL_MESSAGE } }
        }

        const { hash, salt } = await hashPassword(input.password)
        const account: Account = {
          id: newId(),
          email,
          name: input.name.trim(),
          passwordHash: hash,
          salt,
          createdAt: nowIso(),
        }

        set((s) => ({
          accounts: [...s.accounts, account],
          sessionUserId: account.id,
          users: { ...s.users, [account.id]: emptyUserData() },
        }))
        track('account_created')
        return { ok: true }
      },

      login: async (input) => {
        const errors = validateLogin(input)
        if (Object.keys(errors).length > 0) return { ok: false, errors }

        if (cuentasEnLaNube) {
          const nube = await iniciarSesionEnLaNube(normalizeEmail(input.email), input.password)
          if (!nube.ok) return { ok: false, message: nube.message }
          const email = normalizeEmail(input.email)
          const datos = await leerProgreso(nube.userId).catch(() => null)
          set((s) => ({
            accounts: [
              ...s.accounts.filter((a) => a.id !== nube.userId),
              { id: nube.userId, email, name: nube.nombre || email.split('@')[0], passwordHash: '', salt: '', createdAt: nowIso() },
            ],
            sessionUserId: nube.userId,
            users: { ...s.users, [nube.userId]: datos ?? emptyUserData() },
          }))
          return { ok: true }
        }

        const account = get().accounts.find((a) => a.email === normalizeEmail(input.email))
        if (!account) return { ok: false, message: INVALID_CREDENTIALS_MESSAGE }

        const valid = await verifyPassword(input.password, account.salt, account.passwordHash)
        if (!valid) return { ok: false, message: INVALID_CREDENTIALS_MESSAGE }

        set({ sessionUserId: account.id })
        return { ok: true }
      },

      logout: () => {
        if (cuentasEnLaNube) void cerrarSesionEnLaNube()
        set({ sessionUserId: null })
      },

      deleteAccount: () => {
        const id = get().sessionUserId
        if (!id) return
        set((s) => {
          const { [id]: _removed, ...restUsers } = s.users
          return {
            accounts: s.accounts.filter((a) => a.id !== id),
            users: restUsers,
            sessionUserId: null,
            funnel: initialFunnel,
          }
        })
      },

      saveOnboarding: ({ goal, reminderTime }) => {
        const id = get().sessionUserId
        if (!id) return
        set((s) => {
          const data = s.users[id] ?? emptyUserData()
          return {
            users: {
              ...s.users,
              [id]: {
                ...data,
                onboarding: { goal, reminderTime, completedAt: nowIso() },
              },
            },
          }
        })
        track('onboarding_completed', { goal })
      },

      completeLesson: ({ lessonId, correct, total, reflection, now }) => {
        const id = get().sessionUserId
        if (!id) return { xp: 0, alreadyCompleted: false }

        const data = get().users[id] ?? emptyUserData()
        const hasReflection = Boolean(reflection && reflection.trim().length > 0)

        if (data.completions[lessonId]) {
          if (hasReflection) {
            get().addReflection(reflection!, lessonId)
          }
          return { xp: 0, alreadyCompleted: true }
        }

        const xp = xpForLesson({ correct, reflectionWritten: hasReflection })
        const completion = {
          completedAt: nowIso(now),
          correct,
          total,
          xp,
          reflectionWritten: hasReflection,
        }

        set((s) => {
          const current = s.users[id] ?? emptyUserData()
          const reflections: Reflection[] = hasReflection
            ? [
                {
                  id: newId(),
                  lessonId,
                  text: reflection!.trim(),
                  createdAt: nowIso(now),
                },
                ...current.reflections,
              ]
            : current.reflections
          return {
            users: {
              ...s.users,
              [id]: {
                ...current,
                completions: { ...current.completions, [lessonId]: completion },
                reflections,
              },
            },
          }
        })
        track('lesson_completed', { lessonId, correct, total })
        return { xp, alreadyCompleted: false }
      },

      addReflection: (text, lessonId) => {
        const id = get().sessionUserId
        const trimmed = text.trim()
        if (!id || trimmed.length === 0) return null
        const reflection: Reflection = {
          id: newId(),
          lessonId,
          text: trimmed.slice(0, 2000),
          createdAt: nowIso(),
        }
        set((s) => {
          const current = s.users[id] ?? emptyUserData()
          return {
            users: {
              ...s.users,
              [id]: { ...current, reflections: [reflection, ...current.reflections] },
            },
          }
        })
        return reflection
      },

      removeReflection: (reflectionId) => {
        const id = get().sessionUserId
        if (!id) return
        set((s) => {
          const current = s.users[id] ?? emptyUserData()
          return {
            users: {
              ...s.users,
              [id]: {
                ...current,
                reflections: current.reflections.filter((r) => r.id !== reflectionId),
              },
            },
          }
        })
      },

      startTrial: (plan, now) => {
        const id = get().sessionUserId
        if (!id) return
        const start = nowIso(now)
        const trialEnds = addDaysIso(start, PLANS[plan].trialDays)
        set((s) => {
          const current = s.users[id] ?? emptyUserData()
          return {
            users: {
              ...s.users,
              [id]: {
                ...current,
                subscription: {
                  status: 'trialing',
                  plan,
                  startedAt: start,
                  trialEndsAt: trialEnds,
                  accessUntil: trialEnds,
                  canceledAt: null,
                },
              },
            },
          }
        })
        track('trial_started', { plan })
      },

      openChest: (xp, now) => {
        const id = get().sessionUserId
        if (!id) return false
        const data = get().users[id] ?? emptyUserData()
        const key = dayKey(now)
        if (data.bonusXp[key]) return false
        set((s) => {
          const current = s.users[id] ?? emptyUserData()
          return {
            users: { ...s.users, [id]: { ...current, bonusXp: { ...current.bonusXp, [key]: xp } } },
          }
        })
        track('chest_opened', { xp })
        return true
      },

      setSound: (on) => set((s) => ({ prefs: { ...s.prefs, sound: on } })),

      cancelSubscription: (now) => {
        const id = get().sessionUserId
        if (!id) return
        set((s) => {
          const current = s.users[id] ?? emptyUserData()
          if (current.subscription.status === 'none' || current.subscription.status === 'canceled') {
            return s
          }
          return {
            users: {
              ...s.users,
              [id]: {
                ...current,
                subscription: {
                  ...current.subscription,
                  status: 'canceled',
                  canceledAt: nowIso(now),
                },
              },
            },
          }
        })
        track('subscription_canceled')
      },
    }),
    {
      name: STORAGE_KEY,
      version: 2,
      storage: createJSONStorage(() => localStorage),
      // v1 no tenía cofres ni preferencias: completamos los campos nuevos sin perder datos.
      migrate: (persisted) => {
        const state = (persisted ?? {}) as Partial<AppState>
        const users = Object.fromEntries(
          Object.entries(state.users ?? {}).map(([id, data]) => [id, { ...emptyUserData(), ...data }]),
        )
        return { ...state, users, prefs: state.prefs ?? { sound: false } } as AppState
      },
    },
  ),
)

/* ---------- Selectores ---------- */

export function selectCurrentAccount(state: AppState): Account | null {
  return state.accounts.find((a) => a.id === state.sessionUserId) ?? null
}

export function selectCurrentData(state: AppState): UserData | null {
  if (!state.sessionUserId) return null
  return state.users[state.sessionUserId] ?? null
}

/* ---------- Sincronización con la nube ---------- */

let temporizadorGuardado: ReturnType<typeof setTimeout> | undefined

if (cuentasEnLaNube) {
  // Cada cambio del progreso se guarda en Supabase, con una pausa corta para no escribir a cada toque.
  useAppStore.subscribe((state, previo) => {
    const id = state.sessionUserId
    if (!id || state.users[id] === previo.users[id]) return
    const datos = state.users[id]
    clearTimeout(temporizadorGuardado)
    temporizadorGuardado = setTimeout(() => {
      guardarProgreso(id, datos).catch(() => {
        // Sin conexión: el progreso queda en el navegador y se intenta de nuevo con el siguiente cambio.
      })
    }, 800)
  })
}

/** Al abrir la app: si hay sesión en la nube, carga el progreso de esa cuenta. */
export async function restaurarSesionEnLaNube(): Promise<void> {
  if (!cuentasEnLaNube) return
  const sesion = await sesionEnLaNube()
  if (!sesion) return
  const datos = await leerProgreso(sesion.userId).catch(() => null)
  useAppStore.setState((s) => ({
    accounts: [
      ...s.accounts.filter((a) => a.id !== sesion.userId),
      {
        id: sesion.userId,
        email: sesion.email,
        name: sesion.nombre || sesion.email.split('@')[0],
        passwordHash: '',
        salt: '',
        createdAt: nowIso(),
      },
    ],
    sessionUserId: sesion.userId,
    users: { ...s.users, [sesion.userId]: datos ?? s.users[sesion.userId] ?? emptyUserData() },
  }))
}
