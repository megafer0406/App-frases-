import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  trailing?: ReactNode
}

export function Field({ label, error, hint, trailing, className, ...inputProps }: FieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-[13px] font-semibold tracking-wide text-ink-muted">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={cn(error && errorId, hint && hintId) || undefined}
          className={cn(
            'min-h-14 w-full rounded-btn border bg-surface-1 px-4 text-ink placeholder:text-ink-muted/80 transition-colors duration-200 focus:border-amber/60',
            trailing ? 'pr-14' : '',
            error ? 'border-danger/70' : 'border-line',
          )}
          {...inputProps}
        />
        {trailing && <div className="absolute inset-y-0 right-2 grid place-items-center">{trailing}</div>}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-[14px] text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-[13px] text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
