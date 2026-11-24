import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { UserData } from '../domain/types'

/**
 * Cuentas en la nube (Supabase). Solo se activa si las dos variables públicas están definidas.
 * Sin ellas, la app sigue en modo demostración con las cuentas del navegador.
 */
const url = import.meta.env.VITE_CUENTAS_URL as string | undefined
const anonKey = import.meta.env.VITE_CUENTAS_ANON_KEY as string | undefined

let client: SupabaseClient | null = null
if (url && anonKey) {
  client = createClient(url, anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
  })
}

export const cuentasEnLaNube = client !== null

export type CuentaNube =
  | { ok: true; userId: string; nombre: string }
  | { ok: false; message: string }

const MENSAJES: Record<string, string> = {
  'User already registered': 'Ya existe una cuenta con este email. ¿Quieres iniciar sesión?',
  'Invalid login credentials': 'Email o contraseña no coinciden. Revísalos e intenta de nuevo.',
  'Email not confirmed': 'Confirma tu email antes de entrar. Revisa tu correo.',
}

function mensaje(error: { message: string }): string {
  return MENSAJES[error.message] ?? 'No pudimos completar la acción. Intenta de nuevo en un momento.'
}

export async function registrarEnLaNube(email: string, password: string, nombre: string): Promise<CuentaNube> {
  if (!client) return { ok: false, message: 'Las cuentas en la nube no están activas.' }
  const { data, error } = await client.auth.signUp({ email, password, options: { data: { nombre } } })
  if (error) return { ok: false, message: mensaje(error) }
  if (!data.user) return { ok: false, message: 'No pudimos crear la cuenta. Intenta de nuevo.' }
  if (!data.session) {
    return { ok: false, message: 'Revisa tu correo para confirmar la cuenta y luego inicia sesión.' }
  }
  return { ok: true, userId: data.user.id, nombre }
}

export async function iniciarSesionEnLaNube(email: string, password: string): Promise<CuentaNube> {
  if (!client) return { ok: false, message: 'Las cuentas en la nube no están activas.' }
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) return { ok: false, message: mensaje(error) }
  return { ok: true, userId: data.user.id, nombre: String(data.user.user_metadata?.nombre ?? '') }
}

export async function cerrarSesionEnLaNube(): Promise<void> {
  if (!client) return
  await client.auth.signOut()
}

/** Usuaria con sesión abierta en este navegador: id y nombre, o null. */
export async function sesionEnLaNube(): Promise<{ userId: string; nombre: string; email: string } | null> {
  if (!client) return null
  const { data } = await client.auth.getSession()
  const user = data.session?.user
  if (!user) return null
  return { userId: user.id, nombre: String(user.user_metadata?.nombre ?? ''), email: user.email ?? '' }
}

/** Progreso guardado en la nube para la usuaria con sesión. null si no hay fila todavía. */
export async function leerProgreso(userId: string): Promise<UserData | null> {
  if (!client) return null
  const { data, error } = await client.from('progreso').select('datos').eq('user_id', userId).maybeSingle()
  if (error) throw new Error(error.message)
  return (data?.datos as UserData | undefined) ?? null
}

export async function guardarProgreso(userId: string, datos: UserData): Promise<void> {
  if (!client) return
  const { error } = await client
    .from('progreso')
    .upsert({ user_id: userId, datos, actualizado_en: new Date().toISOString() })
  if (error) throw new Error(error.message)
}
