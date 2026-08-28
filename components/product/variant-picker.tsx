'use client'

import { useState } from 'react'
import type { Construction, Cut, Finish, MetalColor, ProductVariant } from '@/lib/products'

const COLOR_HEX: Record<MetalColor, string> = {
  Yellow: '#D8B04A',
  Rose: '#E3B3A4',
  White: '#E4E2DD',
}

function swatchBackground(color: MetalColor, finish: Finish) {
  if (finish === 'Plain') return COLOR_HEX[color]
  const accent = color === 'White' ? COLOR_HEX.Yellow : COLOR_HEX.White
  return `linear-gradient(135deg, ${COLOR_HEX[color]} 50%, ${accent} 50%)`
}

function uniqueValues<T, K extends keyof T>(items: T[], key: K): NonNullable<T[K]>[] {
  const values = items.map((item) => item[key]).filter((v): v is NonNullable<T[K]> => v != null)
  return [...new Set(values)]
}

export function VariantPicker({
  lengths = [],
  variants = [],
}: {
  lengths?: string[]
  variants?: ProductVariant[]
}) {
  // Axes appear in a fixed order — Length, then Construction, then Cut,
  // then Color — so the layout stays predictable across products even as
  // more products pick up more axes. Each row only renders when the
  // product actually varies on it.
  const [length, setLength] = useState(lengths[0])

  const constructions = uniqueValues(variants, 'construction')
  const [construction, setConstruction] = useState<Construction>(constructions[0])

  const afterConstruction = variants.filter((v) => v.construction === construction)
  const cuts = uniqueValues(afterConstruction, 'cut')
  const [cut, setCut] = useState<Cut | undefined>(cuts[0])

  const options = cuts.length
    ? afterConstruction.filter((v) => v.cut === cut)
    : afterConstruction
  const [selected, setSelected] = useState<ProductVariant | undefined>(options[0])

  const changeConstruction = (c: Construction) => {
    setConstruction(c)
    const pool = variants.filter((v) => v.construction === c)
    const poolCuts = uniqueValues(pool, 'cut')
    const nextCut = poolCuts[0]
    setCut(nextCut)
    const nextOptions = poolCuts.length ? pool.filter((v) => v.cut === nextCut) : pool
    setSelected(nextOptions[0])
  }

  const changeCut = (c: Cut) => {
    setCut(c)
    const nextOptions = afterConstruction.filter((v) => v.cut === c)
    setSelected(nextOptions[0])
  }

  if (lengths.length === 0 && variants.length === 0) return null

  return (
    <div className="mt-8 space-y-5 border-t border-border/70 pt-8">
      {lengths.length > 1 && (
        <ToggleRow label="Length" options={lengths} value={length} onChange={setLength} />
      )}

      {constructions.length > 1 && (
        <ToggleRow
          label="Construction"
          options={constructions}
          value={construction}
          onChange={changeConstruction}
        />
      )}

      {cuts.length > 1 && (
        <ToggleRow label="Cut" options={cuts} value={cut as Cut} onChange={changeCut} />
      )}

      {selected && (
        <div>
          <p className="mb-3 text-xs tracking-luxe text-muted-foreground uppercase">Color</p>
          <div className="flex flex-wrap gap-3">
            {options.map((v) => {
              const isSelected = v.color === selected.color && v.finish === selected.finish
              const swatch = (
                <span
                  className="block size-full rounded-full border border-border/60"
                  style={{ background: swatchBackground(v.color, v.finish) }}
                />
              )
              return options.length > 1 ? (
                <button
                  key={`${v.color}-${v.finish}`}
                  onClick={() => setSelected(v)}
                  aria-label={`${v.color} ${v.finish}`}
                  className={[
                    'size-8 shrink-0 rounded-full border-2 transition-colors',
                    isSelected ? 'border-gold' : 'border-transparent hover:border-border',
                  ].join(' ')}
                >
                  {swatch}
                </button>
              ) : (
                <span
                  key={`${v.color}-${v.finish}`}
                  aria-label={`${v.color} ${v.finish}`}
                  className="size-8 shrink-0 rounded-full border-2 border-gold p-0"
                >
                  {swatch}
                </span>
              )
            })}
          </div>
          <p className="mt-3 text-sm text-foreground">
            {selected.color} · {selected.finish}
          </p>
        </div>
      )}
    </div>
  )
}

function ToggleRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div>
      <p className="mb-3 text-xs tracking-luxe text-muted-foreground uppercase">{label}</p>
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={[
              'border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-colors',
              o === value
                ? 'border-gold text-foreground'
                : 'border-border/70 text-foreground/60 hover:text-foreground',
            ].join(' ')}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
