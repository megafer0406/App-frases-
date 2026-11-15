import { useEffect, useRef } from 'react'

const COLORS = ['#e8a55b', '#af4b2b', '#1f3d38', '#3f6e55', '#f1c48f']

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  spin: number
  color: string
}

/** Confeti de un solo disparo al montarse. Se omite si el usuario pide reducir movimiento. */
export function Confetti({ count = 110, duration = 1800 }: { count?: number; duration?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: width / 2 + (Math.random() - 0.5) * 60,
      y: height * 0.35,
      vx: (Math.random() - 0.5) * 9,
      vy: -Math.random() * 8 - 4,
      size: Math.random() * 6 + 4,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const elapsed = now - start
      ctx.clearRect(0, 0, width, height)
      const fade = Math.max(0, 1 - elapsed / duration)
      for (const p of particles) {
        p.vy += 0.28
        p.vx *= 0.99
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.spin
        ctx.save()
        ctx.globalAlpha = fade
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        ctx.restore()
      }
      if (elapsed < duration) {
        frame = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, width, height)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [count, duration])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-40 size-full" />
}
