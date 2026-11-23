import type { ProductVariant } from '@/lib/products'

export const variantAxes = ['construction', 'cut', 'surface'] as const
export type VariantAxis = typeof variantAxes[number]

export function variantAxisOptions(variants: ProductVariant[], selected: ProductVariant | undefined, axis: VariantAxis) {
  const parents = variantAxes.slice(0, variantAxes.indexOf(axis))
  const pool = variants.filter((variant) => !selected || parents.every((parent) => variant[parent] === selected[parent]))
  return [...new Set(pool.flatMap((variant) => variant[axis] ? [variant[axis]!] : []))]
}

/** Choose an actual stored variant; never construct a combination from independent lists. */
export function selectVariantAxis(variants: ProductVariant[], selected: ProductVariant | undefined, axis: VariantAxis, value: string) {
  const parents = variantAxes.slice(0, variantAxes.indexOf(axis))
  const candidates = variants.filter((variant) => variant[axis] === value &&
    (!selected || parents.every((parent) => variant[parent] === selected[parent])))
  const preferences = ['cut', 'surface', 'color', 'finish'] as const
  const score = (variant: ProductVariant) => selected
    ? preferences.reduce((sum, key) => sum + (key !== axis && variant[key] === selected[key] ? 1 : 0), 0)
    : 0
  return candidates.reduce<ProductVariant | undefined>((best, variant) => !best || score(variant) > score(best) ? variant : best, undefined)
}

export function variantColorOptions(variants: ProductVariant[], selected: ProductVariant | undefined) {
  return variants.filter((variant) => !selected || variantAxes.every((axis) => variant[axis] === selected[axis]))
}
