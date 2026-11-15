import { useState } from 'react'
import { breakeven } from '../../lib/breakeven'
import { AnimatedNumber } from '../../components/ui/AnimatedNumber'

const usd = (n: number) => `US$${Math.round(n).toLocaleString('es-MX')}`

/** Herramienta interactiva de la lección de punto de equilibrio. */
export function BreakevenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(20000)
  const [price, setPrice] = useState(80)
  const [variableCost, setVariableCost] = useState(40)

  const result = breakeven({ fixedCosts, price, variableCost })

  return (
    <div className="card-surface mt-5 flex flex-col gap-4 rounded-card p-5">
      <h3 className="font-display text-[20px]">Pruébalo con tus números</h3>

      <div className="grid grid-cols-1 gap-3">
        <NumberField label="Costos fijos del mes (US$)" value={fixedCosts} onChange={setFixedCosts} />
        <NumberField label="Precio por unidad (US$)" value={price} onChange={setPrice} />
        <NumberField label="Costo variable por unidad (US$)" value={variableCost} onChange={setVariableCost} />
      </div>

      <div className="rounded-btn bg-bg/60 p-4" aria-live="polite">
        {result ? (
          <>
            <p className="text-[14px] text-ink-muted">Necesitas vender</p>
            <p className="font-display text-[34px] leading-none">
              <AnimatedNumber value={result.units} /> <span className="text-[18px] text-ink-muted">unidades</span>
            </p>
            <p className="mt-2 text-[14px] text-ink-muted">
              equivalen a <span className="font-semibold text-ink">{usd(result.sales)}</span> en ventas para no perder dinero.
            </p>
          </>
        ) : (
          <p className="text-[15px] leading-relaxed text-copper">
            Con este precio, cada venta no cubre su costo variable. Nunca habría punto de equilibrio: revisa precio o costos.
          </p>
        )}
      </div>
    </div>
  )
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-ink-muted">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        value={Number.isFinite(value) ? value : ''}
        onChange={(e) => onChange(Number(e.target.value))}
        className="min-h-12 w-full rounded-btn border border-line bg-bg px-4 text-[17px] font-semibold tabular text-ink focus:border-amber/60"
      />
    </label>
  )
}
