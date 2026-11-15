/** Retroalimentación táctil y sonora. Ambas son opcionales y no fallan si el dispositivo no las soporta. */

export function haptic(pattern: number | number[] = 12): void {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return
  try {
    navigator.vibrate(pattern)
  } catch {
    /* algunos navegadores bloquean la vibración sin interacción previa */
  }
}

let audio: AudioContext | null = null

function audioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audio) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    audio = new Ctor()
  }
  return audio
}

const SCALES: Record<'ok' | 'miss' | 'win', number[]> = {
  ok: [659, 880],
  miss: [220, 185],
  win: [523, 659, 784, 1046],
}

/** Tonos cortos de respuesta. Solo suenan si la persona activó el sonido. */
export function chime(kind: 'ok' | 'miss' | 'win', enabled: boolean): void {
  if (!enabled) return
  const ctx = audioContext()
  if (!ctx) return
  if (ctx.state === 'suspended') void ctx.resume()
  SCALES[kind].forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const t = ctx.currentTime + i * 0.09
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.4)
  })
}
