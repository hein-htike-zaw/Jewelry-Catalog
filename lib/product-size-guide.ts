import type { ProductVariant } from '@/lib/products'

export function defaultSizeView(variant?: ProductVariant) {
  const views = variant?.sizeGuide?.views ?? []
  return views.find((view) => view.widthMm === 4 && view.lengthInches === 20) ?? views.find((view) => view.lengthInches === 20) ?? views[0]
}

export function findSizeView(variant: ProductVariant | undefined, widthMm: number, lengthInches: number) {
  return variant?.sizeGuide?.views.find((view) => view.widthMm === widthMm && view.lengthInches === lengthInches)
}
