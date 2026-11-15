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

        const account = get().accounts.find((a) => a.email === normalizeEmail(input.email))
        if (!account) return { ok: false, message: INVALID_CREDENTIALS_MESSAGE }

        const valid = await verifyPassword(input.password, account.salt, account.passwordHash)
        if (!valid) return { ok: false, message: INVALID_CREDENTIALS_MESSAGE }

        set({ sessionUserId: account.id })
        return { ok: true }
      },

      logout: () => set({ sessionUserId: null }),

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

