/** Fondo ambiental: halo ámbar estático. Sin bucles de animación. */
export function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, color-mix(in oklab, var(--color-amber) 14%, transparent), transparent)',
        }}
      />
    </div>
  )
}
