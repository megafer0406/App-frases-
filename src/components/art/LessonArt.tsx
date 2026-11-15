import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { ArtConfig, SceneId, Tone } from '../../content/art'

const PALETTE: Record<Tone, { main: string; soft: string; glow: string }> = {
  amber: { main: '#E9B44C', soft: '#F6C96A', glow: '#E9B44C' },
  copper: { main: '#D9825B', soft: '#EBA384', glow: '#D9825B' },
  sage: { main: '#9DB39A', soft: '#BFD1BC', glow: '#9DB39A' },
}

const INK = '#F4EFE6'
const FAINT = 'rgba(244,239,230,0.14)'
const MUTED = 'rgba(244,239,230,0.45)'

type P = { c: (typeof PALETTE)[Tone] }

const grow = (delay: number) => ({
  initial: { scaleY: 0 },
  animate: { scaleY: 1 },
  transition: { duration: 0.25, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const SCENES: Record<SceneId, (p: P) => ReactNode> = {
  stairs: ({ c }) => (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={i}
          x={50 + i * 48}
          y={160 - (i + 1) * 26}
          width={44}
          height={(i + 1) * 26}
          rx={4}
          fill={i === 4 ? c.main : `${c.main}${i === 3 ? 'B3' : '55'}`}
          style={{ transformOrigin: `${50 + i * 48}px 160px` }}
          {...grow(i * 0.12)}
        />
      ))}
      <motion.circle cx={266} cy={40} r={9} fill={c.soft} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />
    </g>
  ),
  bars: ({ c }) => (
    <g>
      <line x1={36} y1={170} x2={290} y2={170} stroke={FAINT} strokeWidth={2} />
      {[24, 34, 50, 74, 108, 150].map((h, i) => (
        <motion.rect
          key={i}
          x={52 + i * 38}
          y={170 - h}
          width={24}
          height={h}
          rx={5}
          fill={i >= 4 ? c.main : `${c.main}55`}
          style={{ transformOrigin: `${52 + i * 38}px 170px` }}
          {...grow(i * 0.08)}
        />
      ))}
      <polyline points="64,140 102,128 140,112 178,86 216,52 254,22" fill="none" stroke={c.soft} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="4 6" />
    </g>
  ),
  lens: ({ c }) => (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={36} y={58 + i * 24} width={140 - i * 14} height={8} rx={4} fill={FAINT} />
      ))}
      <circle cx={210} cy={96} r={44} fill="rgba(21,23,28,0.6)" stroke={c.main} strokeWidth={5} />
      <circle cx={210} cy={96} r={34} fill={`${c.main}1F`} />
      <line x1={242} y1={130} x2={276} y2={164} stroke={c.main} strokeWidth={9} strokeLinecap="round" />
      <rect x={198} y={86} width={22} height={8} rx={4} fill={c.soft} />
    </g>
  ),
  pie: ({ c }) => {
    const r = 56
    const circ = 2 * Math.PI * r
    const segs = [
      { len: circ * 0.5, color: c.main, off: 0 },
      { len: circ * 0.3, color: `${c.main}88`, off: circ * 0.5 },
      { len: circ * 0.2, color: INK, off: circ * 0.8 },
    ]
    return (
      <g transform="translate(160 100) rotate(-90)">
        <circle r={r} fill="none" stroke={FAINT} strokeWidth={26} />
        {segs.map((s, i) => (
          <motion.circle
            key={i}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={26}
            strokeDasharray={`${s.len - 3} ${circ}`}
            strokeDashoffset={-s.off}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          />
        ))}
      </g>
    )
  },
  gauge: ({ c }) => (
    <g transform="translate(160 150)">
      <path d="M -90 0 A 90 90 0 0 1 90 0" fill="none" stroke={FAINT} strokeWidth={18} strokeLinecap="round" />
      <path d="M -90 0 A 90 90 0 0 1 -30 -85" fill="none" stroke={c.main} strokeWidth={18} strokeLinecap="round" />
      <path d="M 40 -83 A 90 90 0 0 1 90 0" fill="none" stroke="#D9825B" strokeWidth={18} strokeLinecap="round" />
      <motion.line x1={0} y1={0} x2={0} y2={-70} stroke={INK} strokeWidth={5} strokeLinecap="round" initial={{ rotate: -90 }} animate={{ rotate: 55 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: '0px 0px' }} />
      <circle r={8} fill={INK} />
    </g>
  ),
  org: ({ c }) => (
    <g>
      <rect x={120} y={28} width={80} height={36} rx={10} fill={c.main} />
      <path d="M160 64 V92 M70 92 H250 M70 92 V118 M160 92 V118 M250 92 V118" stroke={MUTED} strokeWidth={2} fill="none" />
      {[70, 160, 250].map((x, i) => (
        <g key={x}>
          <rect x={x - 38} y={118} width={76} height={34} rx={10} fill={i === 0 ? `${c.main}55` : FAINT} />
          <rect x={x - 22} y={132} width={44} height={6} rx={3} fill={INK} opacity={0.5} />
        </g>
      ))}
      <rect x={60} y={166} width={200} height={12} rx={6} fill={FAINT} />
    </g>
  ),
  breakeven: ({ c }) => (
    <g>
      <line x1={50} y1={170} x2={280} y2={170} stroke={MUTED} strokeWidth={2} />
      <line x1={50} y1={170} x2={50} y2={24} stroke={MUTED} strokeWidth={2} />
      <line x1={50} y1={112} x2={280} y2={112} stroke={MUTED} strokeWidth={2} strokeDasharray="6 6" />
      <motion.line x1={50} y1={170} x2={260} y2={36} stroke={c.main} strokeWidth={3.5} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25 }} />
      <circle cx={160} cy={112} r={7} fill={INK} />
      <text x={170} y={104} fill={INK} fontSize={13} fontWeight={700}>equilibrio</text>
    </g>
  ),
  flow: ({ c }) => (
    <g>
      <motion.path d="M70 26 V92" stroke="#9DB39A" strokeWidth={6} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25 }} />
      <motion.path d="M250 92 V26" stroke={c.main} strokeWidth={6} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25, delay: 0.2 }} />
      <rect x={116} y={96} width={88} height={60} rx={14} fill={FAINT} stroke={c.main} strokeWidth={2} />
      <rect x={136} y={116} width={48} height={8} rx={4} fill={INK} opacity={0.6} />
      <rect x={136} y={132} width={30} height={8} rx={4} fill={c.soft} />
      <text x={36} y={180} fill={MUTED} fontSize={12}>entra</text>
      <text x={232} y={180} fill={MUTED} fontSize={12}>sale</text>
    </g>
  ),
  sbi: ({ c }) => (
    <g>
      {[
        { x: 78, l: 'S', t: 'Situación' },
        { x: 160, l: 'C', t: 'Comportamiento' },
        { x: 242, l: 'I', t: 'Impacto' },
      ].map((n, i) => (
        <g key={n.l}>
          <motion.circle cx={n.x} cy={100} r={30} fill={i === 1 ? c.main : FAINT} stroke={c.main} strokeWidth={2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.15, type: 'spring', stiffness: 260, damping: 18 }} style={{ transformOrigin: `${n.x}px 100px` }} />
          <text x={n.x} y={108} textAnchor="middle" fill={i === 1 ? '#0C0D10' : INK} fontSize={22} fontWeight={800}>{n.l}</text>
          <text x={n.x} y={150} textAnchor="middle" fill={MUTED} fontSize={12}>{n.t}</text>
        </g>
      ))}
      <path d="M112 100 H126 M194 100 H208" stroke={c.soft} strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  target: ({ c }) => (
    <g>
      {[62, 44, 26].map((r, i) => (
        <circle key={r} cx={160} cy={100} r={r} fill={i === 2 ? c.main : 'none'} stroke={i === 2 ? 'none' : c.main} strokeOpacity={0.5 + i * 0.2} strokeWidth={3} />
      ))}
      <motion.g initial={{ x: 90, y: -60, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
        <line x1={160} y1={100} x2={230} y2={30} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <path d="M230 30 l-14 2 l10 10 z" fill={c.soft} />
      </motion.g>
    </g>
  ),
  shield: ({ c }) => (
    <g>
      <path d="M160 26 L226 50 V102 C226 140 196 166 160 180 C124 166 94 140 94 102 V50 Z" fill={FAINT} stroke={c.main} strokeWidth={3} />
      <ellipse cx={160} cy={150} rx={26} ry={8} fill={c.main} />
      <ellipse cx={160} cy={134} rx={26} ry={8} fill={c.soft} />
      <ellipse cx={160} cy={118} rx={26} ry={8} fill={c.main} />
    </g>
  ),
  curve: ({ c }) => (
    <g>
      <line x1={36} y1={170} x2={290} y2={170} stroke={FAINT} strokeWidth={2} />
      <motion.path d="M46 40 C 90 60, 110 150, 160 150 S 250 120, 280 160" fill="none" stroke={MUTED} strokeWidth={3} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25 }} />
      <motion.path d="M46 40 C 70 46, 80 60, 100 62 S 130 70, 160 60 S 220 62, 290 56" fill="none" stroke={c.main} strokeWidth={3.5} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25, delay: 0.3 }} />
      {[100, 160, 230].map((x, i) => (
        <motion.circle key={x} cx={x} cy={i === 0 ? 62 : i === 1 ? 60 : 58} r={6} fill={c.soft} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.15 }} />
      ))}
    </g>
  ),
  team: ({ c }) => (
    <g>
      {[
        { x: 96, h: 0.8, fill: FAINT },
        { x: 160, h: 1, fill: c.main },
        { x: 224, h: 0.8, fill: FAINT },
      ].map((p, i) => (
        <motion.g key={p.x} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.12 }}>
          <circle cx={p.x} cy={70 + (1 - p.h) * 20} r={18 * p.h + 6} fill={p.fill} />
          <path d={`M ${p.x - 36} 170 Q ${p.x - 36} ${110 + (1 - p.h) * 20} ${p.x} ${110 + (1 - p.h) * 20} Q ${p.x + 36} ${110 + (1 - p.h) * 20} ${p.x + 36} 170 Z`} fill={p.fill} />
        </motion.g>
      ))}
      <circle cx={160} cy={40} r={5} fill={c.soft} />
    </g>
  ),
  coins: ({ c }) => (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.g key={i} initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 18 }}>
          <ellipse cx={160} cy={150 - i * 16} rx={70 - i * 4} ry={16} fill={i % 2 ? c.soft : c.main} />
          <ellipse cx={160} cy={146 - i * 16} rx={70 - i * 4} ry={16} fill={c.main} opacity={0.4} />
        </motion.g>
      ))}
    </g>
  ),
  timeline: ({ c }) => (
    <g>
      <line x1={36} y1={110} x2={284} y2={110} stroke={FAINT} strokeWidth={3} />
      <motion.line x1={36} y1={110} x2={200} y2={110} stroke={c.main} strokeWidth={3} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25 }} />
      {[60, 120, 180, 240].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={110} r={i === 2 ? 9 : 6} fill={i <= 2 ? c.main : FAINT} />
          <rect x={x - 16} y={i % 2 ? 136 : 66} width={32} height={6} rx={3} fill={MUTED} />
        </g>
      ))}
    </g>
  ),
  split: ({ c }) => (
    <g>
      <rect x={40} y={36} width={110} height={128} rx={18} fill={`${c.main}22`} stroke={c.main} strokeWidth={2} />
      <rect x={170} y={36} width={110} height={128} rx={18} fill={FAINT} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={58} y={62 + i * 26} width={74} height={8} rx={4} fill={c.soft} />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={188} y={62 + i * 26} width={74} height={8} rx={4} fill={MUTED} />
      ))}
      <path d="M96 166 l8 8 l16 -16" stroke={c.main} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M200 160 l16 16 M216 160 l-16 16" stroke={MUTED} strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  quad: ({ c }) => (
    <g>
      {[
        { x: 60, y: 40, t: 'D', on: true },
        { x: 170, y: 40, t: 'E', on: false },
        { x: 60, y: 110, t: 'A', on: false },
        { x: 170, y: 110, t: 'D', on: false },
      ].map((q) => (
        <g key={`${q.x}-${q.y}`}>
          <rect x={q.x} y={q.y} width={100} height={60} rx={14} fill={q.on ? `${c.main}40` : FAINT} stroke={q.on ? c.main : 'none'} strokeWidth={2} />
          <text x={q.x + 50} y={q.y + 38} textAnchor="middle" fill={INK} fontSize={22} fontWeight={800}>{q.t}</text>
        </g>
      ))}
    </g>
  ),
  dashboard: ({ c }) => (
    <g>
      {[
        { x: 52, h: 60, col: c.main },
        { x: 138, h: 90, col: c.soft },
        { x: 224, h: 40, col: MUTED },
      ].map((g, i) => (
        <g key={g.x}>
          <rect x={g.x} y={40} width={44} height={130} rx={12} fill={FAINT} />
          <motion.rect x={g.x} y={170 - g.h} width={44} height={g.h} rx={12} fill={g.col} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.12, duration: 0.25 }} style={{ transformOrigin: `${g.x}px 170px` }} />
        </g>
      ))}
    </g>
  ),
  scale: ({ c }) => (
    <g>
      <line x1={160} y1={36} x2={160} y2={160} stroke={MUTED} strokeWidth={3} />
      <line x1={90} y1={70} x2={230} y2={70} stroke={MUTED} strokeWidth={3} strokeLinecap="round" />
      <path d="M70 110 Q90 140 110 110" fill={FAINT} stroke={c.main} strokeWidth={2} />
      <path d="M210 110 Q230 140 250 110" fill={FAINT} stroke={c.main} strokeWidth={2} />
      <circle cx={160} cy={36} r={6} fill={c.main} />
    </g>
  ),
  compass: ({ c }) => (
    <g transform="translate(160 100)">
      <circle r={70} fill="none" stroke={FAINT} strokeWidth={3} />
      <path d="M0 -56 L16 0 L0 56 L-16 0 Z" fill={c.main} />
      <path d="M0 -56 L16 0 L0 0 Z" fill={INK} opacity={0.8} />
      <circle r={6} fill={INK} />
    </g>
  ),
}

export function SceneArt({ scene, tone = 'amber', className }: { scene: SceneId; tone?: Tone; className?: string }) {
  const c = PALETTE[tone]
  const id = `${scene}-${tone}`
  return (
    <svg viewBox="0 0 320 200" className={cn('size-full', className)} preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
      <defs>
        <radialGradient id={`bg-${id}`} cx="30%" cy="20%" r="90%">
          <stop offset="0" stopColor={c.glow} stopOpacity="0.28" />
          <stop offset="1" stopColor="#15171C" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#bg-${id})`} />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={0} x2={320} y1={i * 34} y2={i * 34} stroke="rgba(244,239,230,0.035)" />
      ))}
      {SCENES[scene]({ c })}
    </svg>
  )
}

/** Marco de arte: imagen real si existe; si no, la escena SVG. `alta` carga la imagen con prioridad (héroe). */
export function ArtFrame({
  art,
  className,
  children,
  rounded = 'rounded-card',
  alta = false,
}: {
  art: ArtConfig
  className?: string
  children?: ReactNode
  rounded?: string
  alta?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(art.image) && !failed
  return (
    <div className={cn('relative overflow-hidden border border-line bg-surface-1', rounded, className)}>
      {showImage ? (
        <img
          src={art.image}
          alt=""
          loading={alta ? 'eager' : 'lazy'}
          fetchPriority={alta ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <SceneArt scene={art.scene} tone={art.tone} />
      )}
      {showImage && <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-bg/10" aria-hidden />}
      {children}
    </div>
  )
}
