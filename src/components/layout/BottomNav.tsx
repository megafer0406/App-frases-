import { motion } from 'motion/react'
import { Library, NotebookPen, Sun, UserRound } from 'lucide-react'
import { NavLink } from 'react-router'

const TABS = [
  { to: '/hoy', label: 'Hoy', icon: Sun },
  { to: '/rutas', label: 'Rutas', icon: Library },
  { to: '/diario', label: 'Diario', icon: NotebookPen },
  { to: '/perfil', label: 'Perfil', icon: UserRound },
] as const

export function BottomNav() {
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[440px] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:max-w-[720px] md:px-8"
    >
      <div className="flex items-stretch justify-between rounded-[28px] border border-line bg-surface-1 p-1.5">
        {TABS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className="relative flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-[22px] text-[12px] font-semibold text-ink-muted transition-colors aria-[current=page]:text-bg"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-[#f2c865] to-amber"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <Icon className="relative z-10 size-5" aria-hidden strokeWidth={isActive ? 2.4 : 2} />
                <span className="relative z-10">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
