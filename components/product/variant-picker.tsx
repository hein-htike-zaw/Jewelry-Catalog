'use client'

import { useState } from 'react'
import type { Finish, MetalColor, ProductVariant } from '@/lib/products'
import { useProductVariant } from '@/components/product/product-variant-context'
import { selectVariantAxis, variantAxisOptions, variantColorOptions, type VariantAxis } from '@/lib/product-variants'

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

export function VariantPicker({
  lengths = [],
  variants = [],
}: {
  lengths?: string[]
  variants?: ProductVariant[]
}) {
  const sharedVariant = useProductVariant()
  // Optional axes are derived from stored combinations, never a Cartesian product.
  const [length, setLength] = useState(lengths[0])
  const [selected, setSelected] = useState<ProductVariant | undefined>(variants[0])
  const constructions = variantAxisOptions(variants, selected, 'construction')
  const cuts = variantAxisOptions(variants, selected, 'cut')
  const surfaces = variantAxisOptions(variants, selected, 'surface')
  const options = variantColorOptions(variants, selected)
  const sizeViews = selected?.sizeGuide?.views ?? []
  const widthMm = sharedVariant?.widthMm
  const lengthInches = sharedVariant?.lengthInches
  const previewWidths = [...new Set(sizeViews.map((view) => view.widthMm))].sort((a, b) => a - b)
  const previewLengths = [...new Set(sizeViews.filter((view) => widthMm == null || view.widthMm === widthMm).map((view) => view.lengthInches))].sort((a, b) => a - b)

  const selectVariant = (variant: ProductVariant | undefined) => {
    setSelected(variant)
    sharedVariant?.setVariant(variant)
  }

  const changeAxis = (axis: VariantAxis, value: string) => {
    const next = selectVariantAxis(variants, selected, axis, value)
    if (next) selectVariant(next)
  }

  if (lengths.length === 0 && variants.length === 0) return null

  return (
    <div className="mt-8 space-y-5 border-t border-border/70 pt-8">
      {sizeViews.length > 0 && (
        <div className="space-y-5">
          <ToggleRow label="Width" options={previewWidths.map((width) => `${width} mm`)} value={widthMm == null ? '' : `${widthMm} mm`}
            onChange={(value) => sharedVariant?.setWidthMm(parseFloat(value))} />
          <ToggleRow label="Length" options={previewLengths.map((inches) => `${inches}\"`)} value={lengthInches == null ? '' : `${lengthInches}\"`}
            onChange={(value) => sharedVariant?.setLengthInches(parseFloat(value))} />
          <p className="text-xs leading-relaxed text-muted-foreground">{!sharedVariant?.hasSizeSelection ? 'Choose both width and length to view a single chain. ' : ''}{selected?.sizeGuide?.approximate ? 'Approximate visual guide; actual fit varies with neck size.' : ''}</p>
        </div>
      )}
      {!sizeViews.length && lengths.length > 1 && (
        <ToggleRow label="Length" options={lengths} value={length} onChange={setLength} />
      )}

      {constructions.length > 1 && (
        <ToggleRow
          label="Construction"
          options={constructions}
          value={selected?.construction ?? ''}
          onChange={(value) => changeAxis('construction', value)}
        />
      )}
      {constructions.length === 1 && <p className="text-sm text-muted-foreground">Construction: <span className="text-foreground">{constructions[0]}</span></p>}

      {cuts.length > 1 && (
        <ToggleRow label="Cut" options={cuts} value={selected?.cut ?? ''} onChange={(value) => changeAxis('cut', value)} />
      )}

      {surfaces.length > 1 && <ToggleRow label="Gold finish" options={surfaces} value={selected?.surface ?? ''} onChange={(value) => changeAxis('surface', value)} />}
      {selected?.surface === 'Pavé' && <p className="text-xs text-muted-foreground">Pavé is a textured gold finish. No stones. The pattern is limited to small white-toned link faces, with polished yellow gold elsewhere.</p>}

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
                  key={v.id ?? `${v.color}-${v.finish}`}
                  onClick={() => selectVariant(v)}
                  aria-label={`${v.color} ${v.finish}`}
                  aria-pressed={isSelected}
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
            {selected.surface ? ` · ${selected.surface === 'Pavé' ? 'Pavé gold finish' : 'Regular gold finish'}` : ''}
            {selected.profile ? ` · ${selected.profile} profile` : ''}
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
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={o === value}
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
