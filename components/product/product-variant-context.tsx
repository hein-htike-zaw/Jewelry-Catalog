'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { ProductSizeView, ProductVariant } from '@/lib/products'
import { defaultSizeView, findSizeView } from '@/lib/product-size-guide'

const ProductVariantContext = createContext<{
  variant?: ProductVariant
  setVariant: (variant: ProductVariant | undefined) => void
  sizeView?: ProductSizeView
  widthMm?: number
  lengthInches?: number
  setWidthMm: (width: number) => void
  setLengthInches: (length: number) => void
  setSizeView: (view: ProductSizeView) => void
  hasSizeSelection: boolean
  selectionRevision: number
  showOverview: () => void
} | null>(null)

export function ProductVariantProvider({ initialVariant, children }: { initialVariant?: ProductVariant; children: ReactNode }) {
  const [variant, setVariantState] = useState(initialVariant)
  const [sizeSelection, setSizeSelection] = useState<{ widthMm?: number; lengthInches?: number }>(() => {
    const initial = initialVariant?.sizeGuide?.overviewImage ? undefined : defaultSizeView(initialVariant)
    return initial ? { widthMm: initial.widthMm, lengthInches: initial.lengthInches } : {}
  })
  const sizeView = sizeSelection.widthMm != null && sizeSelection.lengthInches != null
    ? findSizeView(variant, sizeSelection.widthMm, sizeSelection.lengthInches)
    : undefined
  const hasSizeSelection = Boolean(sizeView)
  const [selectionRevision, setSelectionRevision] = useState(0)
  const setSizeView = (view: ProductSizeView) => {
    setSizeSelection({ widthMm: view.widthMm, lengthInches: view.lengthInches })
    setSelectionRevision((revision) => revision + 1)
  }
  const setWidthMm = (width: number) => {
    if (!variant?.sizeGuide?.views.some((view) => view.widthMm === width)) return
    setSizeSelection((current) => ({
      widthMm: width,
      lengthInches: width === 2 && findSizeView(variant, width, 16)
        ? 16
        : current.lengthInches != null && findSizeView(variant, width, current.lengthInches)
          ? current.lengthInches
          : undefined,
    }))
    setSelectionRevision((revision) => revision + 1)
  }
  const setLengthInches = (length: number) => {
    if (!variant?.sizeGuide?.views.some((view) => view.lengthInches === length)) return
    setSizeSelection((current) => ({ lengthInches: length, widthMm: current.widthMm != null && findSizeView(variant, current.widthMm, length) ? current.widthMm : undefined }))
    setSelectionRevision((revision) => revision + 1)
  }
  const setVariant = (next: ProductVariant | undefined) => {
    setVariantState(next)
    setSizeSelection((current) => {
      const views = next?.sizeGuide?.views ?? []
      const widthMm = views.some((view) => view.widthMm === current.widthMm) ? current.widthMm : undefined
      const lengthInches = views.some((view) => view.lengthInches === current.lengthInches && (widthMm == null || view.widthMm === widthMm)) ? current.lengthInches : undefined
      return { widthMm, lengthInches }
    })
    setSelectionRevision((revision) => revision + 1)
  }
  const showOverview = () => {
    setSizeSelection({})
    setSelectionRevision((revision) => revision + 1)
  }
  return <ProductVariantContext.Provider value={{ variant, setVariant, sizeView, setSizeView, widthMm: sizeSelection.widthMm, lengthInches: sizeSelection.lengthInches, setWidthMm, setLengthInches, hasSizeSelection, selectionRevision, showOverview }}>{children}</ProductVariantContext.Provider>
}

export function useProductVariant() {
  return useContext(ProductVariantContext)
}
