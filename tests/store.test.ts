import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { AppState } from '../src/store/appStore'

type StoreHook = typeof import('../src/store/appStore').useAppStore
let useAppStore: StoreHook

beforeAll(async () => {
  const memory = new Map<string, string>()
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => memory.get(k) ?? null,
    setItem: (k: string, v: string) => void memory.set(k, v),
    removeItem: (k: string) => void memory.delete(k),
  })
  ;({ useAppStore } = await import('../src/store/appStore'))
})

const initial = (): Partial<AppState> => ({
  funnel: { name: '', answers: {}, completedAt: null },
  accounts: [],
  sessionUserId: null,
  users: {},
})

const credentials = { name: 'Lucía', email: 'Lucia@Correo.com', password: 'contraseña-larga' }

describe('appStore: cuenta', () => {
  beforeEach(() => {
    useAppStore.setState(initial())
  })

  it('registra con email normalizado y abre sesión', async () => {
    const result = await useAppStore.getState().register(credentials)
    expect(result.ok).toBe(true)
    const state = useAppStore.getState()
    expect(state.accounts[0].email).toBe('lucia@correo.com')
    expect(state.sessionUserId).toBe(state.accounts[0].id)
    expect(state.users[state.accounts[0].id].onboarding.completedAt).toBeNull()
  })

  it('rechaza un email repetido con mensaje claro', async () => {
    await useAppStore.getState().register(credentials)
    useAppStore.getState().logout()
    const again = await useAppStore.getState().register({ ...credentials, email: 'LUCIA@correo.com' })
    expect(again.ok).toBe(false)
    if (!again.ok) expect(again.errors?.email).toMatch(/Ya existe una cuenta/)
  })

  it('valida contraseña corta antes de crear la cuenta', async () => {
    const result = await useAppStore.getState().register({ ...credentials, password: '123' })
    expect(result.ok).toBe(false)
    expect(useAppStore.getState().accounts).toHaveLength(0)
  })

  it('inicia sesión con la contraseña correcta y rechaza la incorrecta', async () => {
    await useAppStore.getState().register(credentials)
    useAppStore.getState().logout()

    const bad = await useAppStore.getState().login({ email: credentials.email, password: 'otra-cosa-larga' })
    expect(bad.ok).toBe(false)
    if (!bad.ok) expect(bad.message).toMatch(/no coinciden/)
    expect(useAppStore.getState().sessionUserId).toBeNull()

    const good = await useAppStore.getState().login({ email: credentials.email, password: credentials.password })
    expect(good.ok).toBe(true)
    expect(useAppStore.getState().sessionUserId).not.toBeNull()
  })

  it('borrar la cuenta elimina cuenta, datos y sesión', async () => {
    await useAppStore.getState().register(credentials)
    useAppStore.getState().deleteAccount()
    const state = useAppStore.getState()
    expect(state.accounts).toHaveLength(0)
    expect(state.users).toEqual({})
    expect(state.sessionUserId).toBeNull()
  })
})

describe('appStore: progreso', () => {
  beforeEach(async () => {
    useAppStore.setState(initial())
    await useAppStore.getState().register(credentials)
  })

  it('completar una lección da XP y guarda la reflexión', () => {
    const { xp, alreadyCompleted } = useAppStore.getState().completeLesson({
      lessonId: 'hist-caida-roma',
      correct: 2,
      total: 2,
      reflection: '  Las señales pequeñas importan.  ',
    })
    expect(alreadyCompleted).toBe(false)
    expect(xp).toBe(40 + 20 + 20)
    const id = useAppStore.getState().sessionUserId!
    const data = useAppStore.getState().users[id]
    expect(data.completions['hist-caida-roma'].xp).toBe(80)
    expect(data.reflections[0].text).toBe('Las señales pequeñas importan.')
  })

  it('no vuelve a dar XP si la lección ya estaba completa', () => {
    const store = useAppStore.getState()
    store.completeLesson({ lessonId: 'hist-caida-roma', correct: 1, total: 2 })
    const second = useAppStore.getState().completeLesson({ lessonId: 'hist-caida-roma', correct: 2, total: 2 })
    expect(second).toEqual({ xp: 0, alreadyCompleted: true })
    const id = useAppStore.getState().sessionUserId!
    expect(Object.keys(useAppStore.getState().users[id].completions)).toHaveLength(1)
  })

  it('guardar el onboarding marca la fecha de término', () => {
    useAppStore.getState().saveOnboarding({ goal: 'negocios', reminderTime: '21:00' })
    const id = useAppStore.getState().sessionUserId!
    const { onboarding } = useAppStore.getState().users[id]
    expect(onboarding.goal).toBe('negocios')
    expect(onboarding.reminderTime).toBe('21:00')
    expect(onboarding.completedAt).not.toBeNull()
  })
})

describe('appStore: suscripción', () => {
  beforeEach(async () => {
    useAppStore.setState(initial())
    await useAppStore.getState().register(credentials)
  })

  it('iniciar prueba anual dura 7 días y cancelar conserva el acceso', () => {
    const start = new Date('2026-10-15T10:00:00Z')
    useAppStore.getState().startTrial('anual', start)
    const id = useAppStore.getState().sessionUserId!
    const sub = useAppStore.getState().users[id].subscription
    expect(sub.status).toBe('trialing')
    expect(sub.plan).toBe('anual')
    expect(new Date(sub.trialEndsAt!).toISOString()).toBe('2026-10-22T10:00:00.000Z')

    useAppStore.getState().cancelSubscription(new Date('2026-10-20T10:00:00Z'))
    const canceled = useAppStore.getState().users[id].subscription
    expect(canceled.status).toBe('canceled')
    expect(canceled.accessUntil).toBe(sub.accessUntil)
  })
})
