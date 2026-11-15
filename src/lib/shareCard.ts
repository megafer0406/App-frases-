import { plantilla } from '../config/plantilla'

/** Tarjeta de progreso para compartir (PNG 1080×1350). No incluye email ni apellidos. */

export interface ShareInput {
  firstName: string
  levelName: string
  stage: number
  streak: number
  lessons: number
  minutes: number
  totalXp: number
}

const W = 1080
const H = 1350

function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, stage: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)
  ctx.fillStyle = 'rgba(232,165,91,0.16)'
  ctx.beginPath()
  ctx.ellipse(0, 300, 180, 26, 0, 0, Math.PI * 2)
  ctx.fill()
  const trunkTop = [280, 250, 200, 160, 120, 120][stage] ?? 120
  ctx.fillStyle = '#8A6A3C'
  ctx.fillRect(-7, trunkTop, 14, 300 - trunkTop)
  const leaf = stage >= 5 ? '#E8A55B' : stage >= 3 ? '#7E9A7B' : '#9DB39A'
  const crown = (cx: number, cy: number, r: number, color: string) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()
  }
  if (stage <= 1) {
    crown(0, trunkTop - 30, 46, leaf)
  } else {
    const base = trunkTop - 40
    crown(0, base, stage >= 4 ? 130 : stage === 3 ? 100 : 70, leaf)
    crown(-70, base + 30, 60, '#7E9A7B')
    crown(72, base + 26, 64, '#BFD1BC')
    if (stage >= 5) {
      crown(0, base, 180, 'rgba(232,165,91,0.18)')
    }
  }
  ctx.restore()
}

export function drawShareCard(input: ShareInput): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, '#FFFDF9')
  bg.addColorStop(1, '#F1EADF')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  const glow = ctx.createRadialGradient(W / 2, 420, 40, W / 2, 420, 620)
  glow.addColorStop(0, 'rgba(232,165,91,0.22)')
  glow.addColorStop(1, 'rgba(232,165,91,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = '#1F3D38'
  ctx.textBaseline = 'alphabetic'
  ctx.font = '600 34px Manrope, system-ui, sans-serif'
  ctx.fillText(plantilla.nombre.toUpperCase(), 80, 110)

  ctx.font = '400 84px "DM Serif Display", Georgia, serif'
  ctx.fillText(`${input.firstName}, ${input.levelName.toLowerCase()}`, 80, 230)

  drawTree(ctx, W / 2, 560, 1.05, input.stage)

  const stats: Array<[string, string]> = [
    [String(input.streak), input.streak === 1 ? 'día de racha' : 'días de racha'],
    [String(input.lessons), input.lessons === 1 ? 'lección' : 'lecciones'],
    [String(input.minutes), 'minutos aprendidos'],
  ]
  stats.forEach(([value, label], i) => {
    const x = 80 + i * 320
    ctx.fillStyle = '#FFFDF9'
    ctx.beginPath()
    ctx.roundRect(x, 930, 280, 230, 36)
    ctx.fill()
    ctx.fillStyle = '#AF4B2B'
    ctx.font = '400 92px "DM Serif Display", Georgia, serif'
    ctx.fillText(value, x + 36, 1040)
    ctx.fillStyle = '#586863'
    ctx.font = '500 30px Manrope, system-ui, sans-serif'
    ctx.fillText(label, x + 36, 1100)
  })

  ctx.fillStyle = '#586863'
  ctx.font = '500 32px Manrope, system-ui, sans-serif'
  ctx.fillText(`${input.totalXp} XP · 5 minutos al día`, 80, 1260)
  return canvas
}

/** Comparte con la hoja nativa si existe; si no, descarga el PNG. */
export async function shareCanvas(canvas: HTMLCanvasElement, filename: string): Promise<'shared' | 'downloaded' | 'cancelled'> {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
  if (!blob) return 'cancelled'
  const file = new File([blob], filename, { type: 'image/png' })
  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean }
  if (nav.share && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file], title: `Mi progreso en ${plantilla.nombre}` })
      return 'shared'
    } catch {
      return 'cancelled'
    }
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  return 'downloaded'
}
