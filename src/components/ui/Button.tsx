import { motion, type HTMLMotionProps } from 'motion/react'
import { Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  fullWidth?: boolean
  loading?: boolean
  icon?: ReactNode
  children: ReactNode
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-[#f2c865] to-amber text-bg shadow-[0_4px_14px_-6px_rgb(233_180_76/0.45)] hover:brightness-105',
  secondary: 'bg-surface-2 text-ink border border-line hover:bg-[#262a34]',
  ghost: 'text-ink-muted hover:text-ink underline-offset-4 hover:underline bg-transparent',
  danger: 'bg-transparent text-danger border border-danger/40 hover:bg-danger/10',
}

export function Button({
  variant = 'primary',
  fullWidth = true,
  loading = false,
  icon,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading
  return (
    <motion.button
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 520, damping: 32 }}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex min-h-14 items-center justify-center gap-2.5 rounded-btn px-6 text-[17px] font-bold tracking-tight transition-[filter,background-color,opacity] duration-200 disabled:cursor-not-allowed disabled:opacity-40',
        fullWidth && 'w-full',
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {loading ? <Loader2 className="size-5 animate-spin" aria-hidden /> : icon}
      <span>{children}</span>
    </motion.button>
  )
}
