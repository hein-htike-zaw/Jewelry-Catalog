'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import {
  products,
  collections,
  productTypes,
  subcategoriesByType,
  ringTypes,
  designStyles,
  settingTypes,
  bandStyles,
  diamondShapes,
  labDiamondGoldColors,
  diamondGoldColors,
  earringStyles,
  earringDesignStyles,
  earringDiamondShapes,
  type Collection,
  type Karat,
  type ProductType,
  type RingType,
  type DesignStyle,
  type SettingType,
  type BandStyle,
  type DiamondShape,
  type MetalColor,
  type EarringStyle,
  type EarringDesignStyle,
  type EarringDiamondShape,
} from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { SubcategoryNav } from '@/components/catalog/subcategory-nav'
import { VisualOptionGrid } from '@/components/catalog/visual-option-grid'
import { DesignStyleIcon } from '@/components/catalog/design-style-icons'
import { DiamondShapeIcon } from '@/components/catalog/diamond-shape-icons'
import { EarringStyleIcon } from '@/components/catalog/earring-style-icons'

const allKarats: Karat[] = ['10K', '14K']
const PAGE_SIZE = 6
const BROWSE_SECTION_SIZE = 6

/** Values actually present in stock for a Lab Diamond product attribute, e.g. the carats or color grades on hand — not a fixed style vocabulary. */
function stockedValues<T, K extends keyof T>(items: T[], key: K): NonNullable<T[K]>[] {
  const values = items.map((item) => item[key]).filter((v): v is NonNullable<T[K]> => v != null)
  return [...new Set(values)]
}

const labDiamondRingProducts = products.filter(
  (p) => p.collection === 'Lab Diamond' && p.type === 'Rings',
)
const caratOptions = stockedValues(labDiamondRingProducts, 'carat').sort((a, b) => a - b)
const diamondColorOptions = stockedValues(labDiamondRingProducts, 'diamondColor')
const clarityOptions = stockedValues(labDiamondRingProducts, 'clarity')

const labDiamondEarringProducts = products.filter(
  (p) => p.collection === 'Lab Diamond' && p.type === 'Earrings',
)
const earringCaratOptions = stockedValues(labDiamondEarringProducts, 'totalCaratWeight').sort(
  (a, b) => a - b,
)
const earringDiamondColorOptions = stockedValues(labDiamondEarringProducts, 'diamondColor')
const earringClarityOptions = stockedValues(labDiamondEarringProducts, 'clarity')

const diamondEarringProducts = products.filter(
  (p) => p.collection === 'Diamond' && p.type === 'Earrings',
)
const diamondEarringCaratOptions = stockedValues(diamondEarringProducts, 'totalCaratWeight').sort(
  (a, b) => a - b,
)
const diamondEarringColorOptions = stockedValues(diamondEarringProducts, 'diamondColor')
const diamondEarringClarityOptions = stockedValues(diamondEarringProducts, 'clarity')

interface Props {
  initialCollection?: Collection
  initialType?: ProductType
}

export function CatalogView({ initialCollection, initialType }: Props) {
  const [collection, setCollection] = useState<Collection | 'All'>(
    initialCollection ?? 'All',
  )
  const [karats, setKarats] = useState<Karat[]>([])
  const [types, setTypes] = useState<ProductType[]>(
    initialType ? [initialType] : [],
  )
  const [subcategory, setSubcategory] = useState<string>('All')
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [labFilterPanelOpen, setLabFilterPanelOpen] = useState(false)
  const [page, setPage] = useState(1)

  // Lab Diamond Rings get their own browsing tab (Engagement / Wedding Band)
  // and their own set of attribute filters, kept separate from the generic
  // subcategory mechanism so Gold Rings' Men's/Women's/Fancy/Engagement
  // chips are never affected.
  const [ringType, setRingType] = useState<RingType | 'All'>('All')
  const [designStyleFilter, setDesignStyleFilter] = useState<DesignStyle[]>([])
  const [settingTypeFilter, setSettingTypeFilter] = useState<SettingType[]>([])
  const [bandStyleFilter, setBandStyleFilter] = useState<BandStyle[]>([])
  const [diamondShapeFilter, setDiamondShapeFilter] = useState<DiamondShape[]>([])
  const [caratFilter, setCaratFilter] = useState<number[]>([])
  const [diamondColorFilter, setDiamondColorFilter] = useState<string[]>([])
  const [clarityFilter, setClarityFilter] = useState<string[]>([])
  const [goldColorFilter, setGoldColorFilter] = useState<MetalColor[]>([])

  // Lab Diamond Earrings get their own attribute filters — fully independent
  // state from the ring ones above (even where the underlying field is
  // shared, like settingType) so switching the Product Type between Rings
  // and Earrings, both within Lab Diamond, never carries a stale selection
  // across scopes.
  const [earringStyleFilter, setEarringStyleFilter] = useState<EarringStyle[]>([])
  const [earringDesignStyleFilter, setEarringDesignStyleFilter] = useState<EarringDesignStyle[]>(
    [],
  )
  const [earringSettingTypeFilter, setEarringSettingTypeFilter] = useState<SettingType[]>([])
  const [earringDiamondShapeFilter, setEarringDiamondShapeFilter] = useState<
    EarringDiamondShape[]
  >([])
  const [earringCaratFilter, setEarringCaratFilter] = useState<number[]>([])
  const [earringDiamondColorFilter, setEarringDiamondColorFilter] = useState<string[]>([])
  const [earringClarityFilter, setEarringClarityFilter] = useState<string[]>([])
  const [earringGoldColorFilter, setEarringGoldColorFilter] = useState<MetalColor[]>([])

  // Natural Diamond Earrings reuse the same Earring Style/Design Style/
  // Setting Type/Diamond Shape vocabulary as Lab Diamond Earrings (they're
  // collection-agnostic jewelry concepts), but get their own independent
  // filter state for the same reason the Lab Diamond ones are independent
  // from the ring ones. Unlike Lab Diamond, natural Diamond pieces aren't
  // 14K-only or Yellow/White-only, so there's no dedicated Karat or Gold
  // Color restriction here — Karat reuses the shared sidebar filter, and
  // Gold Color draws from the full `diamondGoldColors` list (incl. Rose).
  const [diamondEarringStyleFilter, setDiamondEarringStyleFilter] = useState<EarringStyle[]>([])
  const [diamondEarringDesignStyleFilter, setDiamondEarringDesignStyleFilter] = useState<
    EarringDesignStyle[]
  >([])
  const [diamondEarringSettingTypeFilter, setDiamondEarringSettingTypeFilter] = useState<
    SettingType[]
  >([])
  const [diamondEarringShapeFilter, setDiamondEarringShapeFilter] = useState<
    EarringDiamondShape[]
  >([])
  const [diamondEarringCaratFilter, setDiamondEarringCaratFilter] = useState<number[]>([])
  const [diamondEarringColorFilter, setDiamondEarringColorFilter] = useState<string[]>([])
  const [diamondEarringClarityFilter, setDiamondEarringClarityFilter] = useState<string[]>([])
  const [diamondEarringGoldColorFilter, setDiamondEarringGoldColorFilter] = useState<
    MetalColor[]
  >([])

  // The subcategory chip row only makes sense once browsing is narrowed to
  // one product type that actually has subcategories defined for it.
  const activeType = types.length === 1 ? types[0] : null
  const subcategoryOptions = activeType ? subcategoriesByType[activeType] : undefined
  const isLabDiamondRings = collection === 'Lab Diamond' && activeType === 'Rings'
  const isLabDiamondEarrings = collection === 'Lab Diamond' && activeType === 'Earrings'
  const isDiamondEarrings = collection === 'Diamond' && activeType === 'Earrings'

  // Leaving the Lab Diamond Rings scope clears its filters so they can't
  // keep narrowing results invisibly once their controls are gone.
  useEffect(() => {
    if (isLabDiamondRings) return
    setRingType('All')
    setDesignStyleFilter([])
    setSettingTypeFilter([])
    setBandStyleFilter([])
    setDiamondShapeFilter([])
    setCaratFilter([])
    setDiamondColorFilter([])
    setClarityFilter([])
    setGoldColorFilter([])
    setLabFilterPanelOpen(false)
  }, [isLabDiamondRings])

  // Same idea, for leaving the Lab Diamond Earrings scope.
  useEffect(() => {
    if (isLabDiamondEarrings) return
    setEarringStyleFilter([])
    setEarringDesignStyleFilter([])
    setEarringSettingTypeFilter([])
    setEarringDiamondShapeFilter([])
    setEarringCaratFilter([])
    setEarringDiamondColorFilter([])
    setEarringClarityFilter([])
    setEarringGoldColorFilter([])
    setLabFilterPanelOpen(false)
  }, [isLabDiamondEarrings])

  // Same idea, for leaving the natural Diamond Earrings scope.
  useEffect(() => {
    if (isDiamondEarrings) return
    setDiamondEarringStyleFilter([])
    setDiamondEarringDesignStyleFilter([])
    setDiamondEarringSettingTypeFilter([])
    setDiamondEarringShapeFilter([])
    setDiamondEarringCaratFilter([])
    setDiamondEarringColorFilter([])
    setDiamondEarringClarityFilter([])
    setDiamondEarringGoldColorFilter([])
    setLabFilterPanelOpen(false)
  }, [isDiamondEarrings])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return products.filter((p) => {
      if (collection !== 'All' && p.collection !== collection) return false
      if (karats.length && (!p.karat || !karats.includes(p.karat))) return false
      if (types.length && !types.includes(p.type)) return false
      if (
        subcategoryOptions &&
        !isLabDiamondRings &&
        subcategory !== 'All' &&
        p.subcategory !== subcategory
      )
        return false
      if (isLabDiamondRings) {
        if (ringType !== 'All' && p.ringType !== ringType) return false
        if (
          designStyleFilter.length &&
          (!p.designStyle || !designStyleFilter.includes(p.designStyle))
        )
          return false
        if (
          settingTypeFilter.length &&
          (!p.settingType || !settingTypeFilter.includes(p.settingType))
        )
          return false
        if (bandStyleFilter.length && (!p.bandStyle || !bandStyleFilter.includes(p.bandStyle)))
          return false
        if (
          diamondShapeFilter.length &&
          (!p.diamondShape || !diamondShapeFilter.includes(p.diamondShape))
        )
          return false
        if (caratFilter.length && (p.carat == null || !caratFilter.includes(p.carat)))
          return false
        if (
          diamondColorFilter.length &&
          (!p.diamondColor || !diamondColorFilter.includes(p.diamondColor))
        )
          return false
        if (clarityFilter.length && (!p.clarity || !clarityFilter.includes(p.clarity)))
          return false
        if (goldColorFilter.length && (!p.goldColor || !goldColorFilter.includes(p.goldColor)))
          return false
      }
      if (isLabDiamondEarrings) {
        if (
          earringStyleFilter.length &&
          (!p.earringStyle || !earringStyleFilter.includes(p.earringStyle))
        )
          return false
        if (
          earringDesignStyleFilter.length &&
          (!p.earringDesignStyle || !earringDesignStyleFilter.includes(p.earringDesignStyle))
        )
          return false
        if (
          earringSettingTypeFilter.length &&
          (!p.settingType || !earringSettingTypeFilter.includes(p.settingType))
        )
          return false
        if (
          earringDiamondShapeFilter.length &&
          (!p.earringDiamondShape || !earringDiamondShapeFilter.includes(p.earringDiamondShape))
        )
          return false
        if (
          earringCaratFilter.length &&
          (p.totalCaratWeight == null || !earringCaratFilter.includes(p.totalCaratWeight))
        )
          return false
        if (
          earringDiamondColorFilter.length &&
          (!p.diamondColor || !earringDiamondColorFilter.includes(p.diamondColor))
        )
          return false
        if (
          earringClarityFilter.length &&
          (!p.clarity || !earringClarityFilter.includes(p.clarity))
        )
          return false
        if (
          earringGoldColorFilter.length &&
          (!p.goldColor || !earringGoldColorFilter.includes(p.goldColor))
        )
          return false
      }
      if (isDiamondEarrings) {
        if (
          diamondEarringStyleFilter.length &&
          (!p.earringStyle || !diamondEarringStyleFilter.includes(p.earringStyle))
        )
          return false
        if (
          diamondEarringDesignStyleFilter.length &&
          (!p.earringDesignStyle ||
            !diamondEarringDesignStyleFilter.includes(p.earringDesignStyle))
        )
          return false
        if (
          diamondEarringSettingTypeFilter.length &&
          (!p.settingType || !diamondEarringSettingTypeFilter.includes(p.settingType))
        )
          return false
        if (
          diamondEarringShapeFilter.length &&
          (!p.earringDiamondShape || !diamondEarringShapeFilter.includes(p.earringDiamondShape))
        )
          return false
        if (
          diamondEarringCaratFilter.length &&
          (p.totalCaratWeight == null || !diamondEarringCaratFilter.includes(p.totalCaratWeight))
        )
          return false
        if (
          diamondEarringColorFilter.length &&
          (!p.diamondColor || !diamondEarringColorFilter.includes(p.diamondColor))
        )
          return false
        if (
          diamondEarringClarityFilter.length &&
          (!p.clarity || !diamondEarringClarityFilter.includes(p.clarity))
        )
          return false
        if (
          diamondEarringGoldColorFilter.length &&
          (!p.goldColor || !diamondEarringGoldColorFilter.includes(p.goldColor))
        )
          return false
      }
      if (needle) {
        const haystack = [p.name, p.sku, p.style, p.subcategory, p.type, p.collection]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(needle)) return false
      }
      return true
    })
  }, [
    collection,
    karats,
    types,
    subcategory,
    subcategoryOptions,
    query,
    isLabDiamondRings,
    ringType,
    designStyleFilter,
    settingTypeFilter,
    bandStyleFilter,
    diamondShapeFilter,
    caratFilter,
    diamondColorFilter,
    clarityFilter,
    goldColorFilter,
    isLabDiamondEarrings,
    earringStyleFilter,
    earringDesignStyleFilter,
    earringSettingTypeFilter,
    earringDiamondShapeFilter,
    earringCaratFilter,
    earringDiamondColorFilter,
    earringClarityFilter,
    earringGoldColorFilter,
    isDiamondEarrings,
    diamondEarringStyleFilter,
    diamondEarringDesignStyleFilter,
    diamondEarringSettingTypeFilter,
    diamondEarringShapeFilter,
    diamondEarringCaratFilter,
    diamondEarringColorFilter,
    diamondEarringClarityFilter,
    diamondEarringGoldColorFilter,
  ])

  // Any change to the active filter set invalidates the current page.
  useEffect(() => {
    setPage(1)
  }, [
    collection,
    karats,
    types,
    subcategory,
    query,
    ringType,
    designStyleFilter,
    settingTypeFilter,
    bandStyleFilter,
    diamondShapeFilter,
    caratFilter,
    diamondColorFilter,
    clarityFilter,
    goldColorFilter,
    earringStyleFilter,
    earringDesignStyleFilter,
    earringSettingTypeFilter,
    earringDiamondShapeFilter,
    earringCaratFilter,
    earringDiamondColorFilter,
    earringClarityFilter,
    earringGoldColorFilter,
    diamondEarringStyleFilter,
    diamondEarringDesignStyleFilter,
    diamondEarringSettingTypeFilter,
    diamondEarringShapeFilter,
    diamondEarringCaratFilter,
    diamondEarringColorFilter,
    diamondEarringClarityFilter,
    diamondEarringGoldColorFilter,
  ])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const toggle = <T,>(list: T[], value: T, set: (v: T[]) => void) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const toggleType = (t: ProductType) => {
    toggle(types, t, setTypes)
    setSubcategory('All')
  }

  const changeCollection = (c: Collection | 'All') => {
    setCollection(c)
    setSubcategory('All')
  }

  // Design Style/Setting Type and Band Style belong to different ring types,
  // so switching tabs clears whichever ones no longer have a visible control
  // — otherwise they keep filtering invisibly and results silently drop to zero.
  const changeRingType = (value: string) => {
    setRingType(value as RingType | 'All')
    setDesignStyleFilter([])
    setSettingTypeFilter([])
    setBandStyleFilter([])
  }

  // Just the Lab Diamond Ring attribute filters — drives the badge on the
  // dedicated "Filters" button that opens their slide-over panel.
  const labFilterCount =
    designStyleFilter.length +
    settingTypeFilter.length +
    bandStyleFilter.length +
    diamondShapeFilter.length +
    caratFilter.length +
    diamondColorFilter.length +
    clarityFilter.length +
    goldColorFilter.length

  // Same idea for Lab Diamond Earrings — a separate count since the two
  // scopes never show their "Filters" button at the same time.
  const earringFilterCount =
    earringStyleFilter.length +
    earringDesignStyleFilter.length +
    earringSettingTypeFilter.length +
    earringDiamondShapeFilter.length +
    earringCaratFilter.length +
    earringDiamondColorFilter.length +
    earringClarityFilter.length +
    earringGoldColorFilter.length

  // Same idea for natural Diamond Earrings.
  const diamondEarringFilterCount =
    diamondEarringStyleFilter.length +
    diamondEarringDesignStyleFilter.length +
    diamondEarringSettingTypeFilter.length +
    diamondEarringShapeFilter.length +
    diamondEarringCaratFilter.length +
    diamondEarringColorFilter.length +
    diamondEarringClarityFilter.length +
    diamondEarringGoldColorFilter.length

  const activeCount =
    (collection !== 'All' ? 1 : 0) +
    karats.length +
    types.length +
    (subcategory !== 'All' ? 1 : 0) +
    (query.trim() ? 1 : 0) +
    (ringType !== 'All' ? 1 : 0) +
    labFilterCount +
    earringFilterCount +
    diamondEarringFilterCount

  // With nothing filtered, browsing by collection is more useful than one
  // long undifferentiated grid of everything in the showroom.
  const showBrowse = activeCount === 0

  const reset = () => {
    setCollection('All')
    setKarats([])
    setTypes([])
    setSubcategory('All')
    setQuery('')
    setRingType('All')
    setDesignStyleFilter([])
    setSettingTypeFilter([])
    setBandStyleFilter([])
    setDiamondShapeFilter([])
    setCaratFilter([])
    setDiamondColorFilter([])
    setClarityFilter([])
    setGoldColorFilter([])
    setEarringStyleFilter([])
    setEarringDesignStyleFilter([])
    setEarringSettingTypeFilter([])
    setEarringDiamondShapeFilter([])
    setEarringCaratFilter([])
    setEarringDiamondColorFilter([])
    setEarringClarityFilter([])
    setEarringGoldColorFilter([])
    setDiamondEarringStyleFilter([])
    setDiamondEarringDesignStyleFilter([])
    setDiamondEarringSettingTypeFilter([])
    setDiamondEarringShapeFilter([])
    setDiamondEarringCaratFilter([])
    setDiamondEarringColorFilter([])
    setDiamondEarringClarityFilter([])
    setDiamondEarringGoldColorFilter([])
  }

  const activeFilters: { key: string; label: string; onRemove: () => void }[] = [
    ...(collection !== 'All'
      ? [{ key: 'collection', label: collection, onRemove: () => changeCollection('All') }]
      : []),
    ...karats.map((k) => ({
      key: `karat-${k}`,
      label: `${k} Gold`,
      onRemove: () => toggle(karats, k, setKarats),
    })),
    ...types.map((t) => ({
      key: `type-${t}`,
      label: t,
      onRemove: () => toggleType(t),
    })),
    ...(subcategory !== 'All' && !isLabDiamondRings
      ? [{ key: 'subcategory', label: subcategory, onRemove: () => setSubcategory('All') }]
      : []),
    ...(ringType !== 'All'
      ? [{ key: 'ringType', label: ringType, onRemove: () => setRingType('All') }]
      : []),
    ...designStyleFilter.map((s) => ({
      key: `design-${s}`,
      label: s,
      onRemove: () => toggle(designStyleFilter, s, setDesignStyleFilter),
    })),
    ...settingTypeFilter.map((s) => ({
      key: `settingtype-${s}`,
      label: s,
      onRemove: () => toggle(settingTypeFilter, s, setSettingTypeFilter),
    })),
    ...bandStyleFilter.map((s) => ({
      key: `band-${s}`,
      label: s,
      onRemove: () => toggle(bandStyleFilter, s, setBandStyleFilter),
    })),
    ...diamondShapeFilter.map((s) => ({
      key: `shape-${s}`,
      label: s,
      onRemove: () => toggle(diamondShapeFilter, s, setDiamondShapeFilter),
    })),
    ...caratFilter.map((c) => ({
      key: `carat-${c}`,
      label: `${c} ct`,
      onRemove: () => toggle(caratFilter, c, setCaratFilter),
    })),
    ...diamondColorFilter.map((c) => ({
      key: `dcolor-${c}`,
      label: `Color ${c}`,
      onRemove: () => toggle(diamondColorFilter, c, setDiamondColorFilter),
    })),
    ...clarityFilter.map((c) => ({
      key: `clarity-${c}`,
      label: c,
      onRemove: () => toggle(clarityFilter, c, setClarityFilter),
    })),
    ...goldColorFilter.map((g) => ({
      key: `gold-${g}`,
      label: `${g} Gold`,
      onRemove: () => toggle(goldColorFilter, g, setGoldColorFilter),
    })),
    ...earringStyleFilter.map((s) => ({
      key: `earringstyle-${s}`,
      label: s,
      onRemove: () => toggle(earringStyleFilter, s, setEarringStyleFilter),
    })),
    ...earringDesignStyleFilter.map((s) => ({
      key: `earringdesign-${s}`,
      label: s,
      onRemove: () => toggle(earringDesignStyleFilter, s, setEarringDesignStyleFilter),
    })),
    ...earringSettingTypeFilter.map((s) => ({
      key: `earringsetting-${s}`,
      label: s,
      onRemove: () => toggle(earringSettingTypeFilter, s, setEarringSettingTypeFilter),
    })),
    ...earringDiamondShapeFilter.map((s) => ({
      key: `earringshape-${s}`,
      label: s,
      onRemove: () => toggle(earringDiamondShapeFilter, s, setEarringDiamondShapeFilter),
    })),
    ...earringCaratFilter.map((c) => ({
      key: `earringcarat-${c}`,
      label: `${c.toFixed(2)} CTW`,
      onRemove: () => toggle(earringCaratFilter, c, setEarringCaratFilter),
    })),
    ...earringDiamondColorFilter.map((c) => ({
      key: `earringdcolor-${c}`,
      label: `Color ${c}`,
      onRemove: () => toggle(earringDiamondColorFilter, c, setEarringDiamondColorFilter),
    })),
    ...earringClarityFilter.map((c) => ({
      key: `earringclarity-${c}`,
      label: c,
      onRemove: () => toggle(earringClarityFilter, c, setEarringClarityFilter),
    })),
    ...earringGoldColorFilter.map((g) => ({
      key: `earringgold-${g}`,
      label: `${g} Gold`,
      onRemove: () => toggle(earringGoldColorFilter, g, setEarringGoldColorFilter),
    })),
    ...diamondEarringStyleFilter.map((s) => ({
      key: `diamondearringstyle-${s}`,
      label: s,
      onRemove: () => toggle(diamondEarringStyleFilter, s, setDiamondEarringStyleFilter),
    })),
    ...diamondEarringDesignStyleFilter.map((s) => ({
      key: `diamondearringdesign-${s}`,
      label: s,
      onRemove: () =>
        toggle(diamondEarringDesignStyleFilter, s, setDiamondEarringDesignStyleFilter),
    })),
    ...diamondEarringSettingTypeFilter.map((s) => ({
      key: `diamondearringsetting-${s}`,
      label: s,
      onRemove: () =>
        toggle(diamondEarringSettingTypeFilter, s, setDiamondEarringSettingTypeFilter),
    })),
    ...diamondEarringShapeFilter.map((s) => ({
      key: `diamondearringshape-${s}`,
      label: s,
      onRemove: () => toggle(diamondEarringShapeFilter, s, setDiamondEarringShapeFilter),
    })),
    ...diamondEarringCaratFilter.map((c) => ({
      key: `diamondearringcarat-${c}`,
      label: `${c.toFixed(2)} CTW`,
      onRemove: () => toggle(diamondEarringCaratFilter, c, setDiamondEarringCaratFilter),
    })),
    ...diamondEarringColorFilter.map((c) => ({
      key: `diamondearringdcolor-${c}`,
      label: `Color ${c}`,
      onRemove: () => toggle(diamondEarringColorFilter, c, setDiamondEarringColorFilter),
    })),
    ...diamondEarringClarityFilter.map((c) => ({
      key: `diamondearringclarity-${c}`,
      label: c,
      onRemove: () => toggle(diamondEarringClarityFilter, c, setDiamondEarringClarityFilter),
    })),
    ...diamondEarringGoldColorFilter.map((g) => ({
      key: `diamondearringgold-${g}`,
      label: `${g} Gold`,
      onRemove: () => toggle(diamondEarringGoldColorFilter, g, setDiamondEarringGoldColorFilter),
    })),
  ]

  const Filters = (
    <div className="space-y-10">
      <FilterGroup title="Collection">
        <button
          onClick={() => changeCollection('All')}
          className={optionClass(collection === 'All')}
        >
          <span>All collections</span>
        </button>
        {collections.map((c) => (
          <button
            key={c.name}
            onClick={() => changeCollection(c.name)}
            className={optionClass(collection === c.name)}
          >
            <span>{c.name}</span>
            <span className="text-xs text-muted-foreground">{c.count}</span>
          </button>
        ))}
      </FilterGroup>

      {/* All Lab Diamond pieces are 14K, so a Karat filter would be a no-op there. */}
      {!isLabDiamondRings && !isLabDiamondEarrings && (
        <FilterGroup title="Gold Purity">
          {allKarats.map((k) => (
            <button
              key={k}
              onClick={() => toggle(karats, k, setKarats)}
              className={optionClass(karats.includes(k))}
            >
              <span>{k} Gold</span>
              <Check active={karats.includes(k)} />
            </button>
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Product Type">
        {productTypes.map((t) => (
          <button
            key={t}
            onClick={() => toggleType(t)}
            className={optionClass(types.includes(t))}
          >
            <span>{t}</span>
            <Check active={types.includes(t)} />
          </button>
        ))}
      </FilterGroup>

      {activeCount > 0 && (
        <button
          onClick={reset}
          className="text-xs tracking-[0.16em] text-gold-foreground uppercase underline-offset-4 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  // Lab Diamond Ring attribute filters live in their own slide-over panel
  // (see labFilterPanelOpen) rather than the general Collection/Product Type
  // sidebar above — they only ever apply within Lab Diamond > Rings, so
  // mixing them into the general filter list would make it look like they
  // combine with unrelated collections like Gold or Watches.
  const LabDiamondRingFilters = (
    <div className="space-y-10">
      {ringType === 'Engagement' && (
        <FilterGroup title="Design Style">
          <VisualOptionGrid
            options={designStyles}
            selected={designStyleFilter}
            onToggle={(s) => toggle(designStyleFilter, s, setDesignStyleFilter)}
            renderIcon={(s) => <DesignStyleIcon style={s} className="size-8" />}
          />
        </FilterGroup>
      )}

      {/* Independent from Design Style — a ring can be e.g. Solitaire + Bezel,
          so this is a separate attribute rather than folded into the values above. */}
      {ringType === 'Engagement' && (
        <FilterGroup title="Setting Type">
          {settingTypes.map((s) => (
            <button
              key={s}
              onClick={() => toggle(settingTypeFilter, s, setSettingTypeFilter)}
              className={optionClass(settingTypeFilter.includes(s))}
            >
              <span>{s}</span>
              <Check active={settingTypeFilter.includes(s)} />
            </button>
          ))}
        </FilterGroup>
      )}

      {ringType === 'Wedding Band' && (
        <FilterGroup title="Band Style">
          {bandStyles.map((s) => (
            <button
              key={s}
              onClick={() => toggle(bandStyleFilter, s, setBandStyleFilter)}
              className={optionClass(bandStyleFilter.includes(s))}
            >
              <span>{s}</span>
              <Check active={bandStyleFilter.includes(s)} />
            </button>
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Diamond Shape">
        <VisualOptionGrid
          options={diamondShapes}
          selected={diamondShapeFilter}
          onToggle={(s) => toggle(diamondShapeFilter, s, setDiamondShapeFilter)}
          renderIcon={(s) => <DiamondShapeIcon shape={s} className="size-8" />}
        />
      </FilterGroup>

      {caratOptions.length > 0 && (
        <FilterGroup title="Carat Weight">
          {caratOptions.map((c) => (
            <button
              key={c}
              onClick={() => toggle(caratFilter, c, setCaratFilter)}
              className={optionClass(caratFilter.includes(c))}
            >
              <span>{c.toFixed(2)} ct</span>
              <Check active={caratFilter.includes(c)} />
            </button>
          ))}
        </FilterGroup>
      )}

      {diamondColorOptions.length > 0 && (
        <FilterGroup title="Diamond Color">
          {diamondColorOptions.map((c) => (
            <button
              key={c}
              onClick={() => toggle(diamondColorFilter, c, setDiamondColorFilter)}
              className={optionClass(diamondColorFilter.includes(c))}
            >
              <span>{c}</span>
              <Check active={diamondColorFilter.includes(c)} />
            </button>
          ))}
        </FilterGroup>
      )}

      {clarityOptions.length > 0 && (
        <FilterGroup title="Clarity">
          {clarityOptions.map((c) => (
            <button
              key={c}
              onClick={() => toggle(clarityFilter, c, setClarityFilter)}
              className={optionClass(clarityFilter.includes(c))}
            >
              <span>{c}</span>
              <Check active={clarityFilter.includes(c)} />
            </button>
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Gold Color">
        {labDiamondGoldColors.map((g) => (
          <button
            key={g}
            onClick={() => toggle(goldColorFilter, g, setGoldColorFilter)}
            className={optionClass(goldColorFilter.includes(g))}
          >
            <span>{g} Gold</span>
            <Check active={goldColorFilter.includes(g)} />
          </button>
        ))}
      </FilterGroup>

      {labFilterCount > 0 && (
        <button
          onClick={() => {
            setDesignStyleFilter([])
            setSettingTypeFilter([])
            setBandStyleFilter([])
            setDiamondShapeFilter([])
            setCaratFilter([])
            setDiamondColorFilter([])
            setClarityFilter([])
            setGoldColorFilter([])
          }}
          className="text-xs tracking-[0.16em] text-gold-foreground uppercase underline-offset-4 hover:underline"
        >
          Clear ring filters
        </button>
      )}
    </div>
  )

  // Lab Diamond Earring attribute filters — same slide-over mechanism as the
  // ring filters above (they're mutually exclusive scopes, so the one panel
  // just swaps its contents), never mixed into the general sidebar.
  const LabDiamondEarringFilters = (
    <div className="space-y-10">
      <FilterGroup title="Earring Style">
        <VisualOptionGrid
          options={earringStyles}
          selected={earringStyleFilter}
          onToggle={(s) => toggle(earringStyleFilter, s, setEarringStyleFilter)}
          renderIcon={(s) => <EarringStyleIcon style={s} className="size-8" />}
        />
      </FilterGroup>

      {/* Independent from Earring Style — a Stud can be Halo, a Huggie can
          be Pavé, etc. — so this is never filtered as part of the values above. */}
      <FilterGroup title="Design Style">
        <VisualOptionGrid
          options={earringDesignStyles}
          selected={earringDesignStyleFilter}
          onToggle={(s) => toggle(earringDesignStyleFilter, s, setEarringDesignStyleFilter)}
          renderIcon={(s) => <DesignStyleIcon style={s} className="size-8" />}
        />
      </FilterGroup>

      {/* Also independent — how the diamond is secured, not what it looks like. */}
      <FilterGroup title="Setting Type">
        {settingTypes.map((s) => (
          <button
            key={s}
            onClick={() => toggle(earringSettingTypeFilter, s, setEarringSettingTypeFilter)}
            className={optionClass(earringSettingTypeFilter.includes(s))}
          >
            <span>{s}</span>
            <Check active={earringSettingTypeFilter.includes(s)} />
          </button>
        ))}
      </FilterGroup>

      <FilterGroup title="Diamond Shape">
        <VisualOptionGrid
          options={earringDiamondShapes}
          selected={earringDiamondShapeFilter}
          onToggle={(s) => toggle(earringDiamondShapeFilter, s, setEarringDiamondShapeFilter)}
          renderIcon={(s) => <DiamondShapeIcon shape={s} className="size-8" />}
        />
      </FilterGroup>

      {earringCaratOptions.length > 0 && (
        <FilterGroup title="Total Carat Weight">
          {earringCaratOptions.map((c) => (
            <button
              key={c}
              onClick={() => toggle(earringCaratFilter, c, setEarringCaratFilter)}
              className={optionClass(earringCaratFilter.includes(c))}
            >
              <span>{c.toFixed(2)} CTW</span>
              <Check active={earringCaratFilter.includes(c)} />
            </button>
          ))}
        </FilterGroup>
      )}

      {earringDiamondColorOptions.length > 0 && (
        <FilterGroup title="Diamond Color">
          {earringDiamondColorOptions.map((c) => (
            <button
              key={c}
              onClick={() => toggle(earringDiamondColorFilter, c, setEarringDiamondColorFilter)}
              className={optionClass(earringDiamondColorFilter.includes(c))}
            >
              <span>{c}</span>
              <Check active={earringDiamondColorFilter.includes(c)} />
            </button>
          ))}
        </FilterGroup>
      )}

      {earringClarityOptions.length > 0 && (
        <FilterGroup title="Clarity">
          {earringClarityOptions.map((c) => (
            <button
              key={c}
              onClick={() => toggle(earringClarityFilter, c, setEarringClarityFilter)}
              className={optionClass(earringClarityFilter.includes(c))}
            >
              <span>{c}</span>
              <Check active={earringClarityFilter.includes(c)} />
            </button>
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Gold Color">
        {labDiamondGoldColors.map((g) => (
          <button
            key={g}
            onClick={() => toggle(earringGoldColorFilter, g, setEarringGoldColorFilter)}
            className={optionClass(earringGoldColorFilter.includes(g))}
          >
            <span>{g} Gold</span>
            <Check active={earringGoldColorFilter.includes(g)} />
          </button>
        ))}
      </FilterGroup>

      {earringFilterCount > 0 && (
        <button
          onClick={() => {
            setEarringStyleFilter([])
            setEarringDesignStyleFilter([])
            setEarringSettingTypeFilter([])
            setEarringDiamondShapeFilter([])
            setEarringCaratFilter([])
            setEarringDiamondColorFilter([])
            setEarringClarityFilter([])
            setEarringGoldColorFilter([])
          }}
          className="text-xs tracking-[0.16em] text-gold-foreground uppercase underline-offset-4 hover:underline"
        >
          Clear earring filters
        </button>
      )}
    </div>
  )

  // Natural Diamond Earring attribute filters — same shape as
  // LabDiamondEarringFilters above (reusing the same Earring Style/Design
  // Style/Setting Type/Diamond Shape types, arrays, and icon components),
  // but with the full Yellow/Rose/White gold range via `diamondGoldColors`
  // instead of the Lab Diamond-only Yellow/White restriction, and no Karat
  // group here since that's handled by the general Gold Purity filter
  // (natural Diamond pieces vary between 10K and 14K, unlike Lab Diamond).
  const DiamondEarringFilters = (
    <div className="space-y-10">
      <FilterGroup title="Earring Style">
        <VisualOptionGrid
          options={earringStyles}
          selected={diamondEarringStyleFilter}
          onToggle={(s) => toggle(diamondEarringStyleFilter, s, setDiamondEarringStyleFilter)}
          renderIcon={(s) => <EarringStyleIcon style={s} className="size-8" />}
        />
      </FilterGroup>

      <FilterGroup title="Design Style">
        <VisualOptionGrid
          options={earringDesignStyles}
          selected={diamondEarringDesignStyleFilter}
          onToggle={(s) =>
            toggle(diamondEarringDesignStyleFilter, s, setDiamondEarringDesignStyleFilter)
          }
          renderIcon={(s) => <DesignStyleIcon style={s} className="size-8" />}
        />
      </FilterGroup>

      <FilterGroup title="Setting Type">
        {settingTypes.map((s) => (
          <button
            key={s}
            onClick={() =>
              toggle(diamondEarringSettingTypeFilter, s, setDiamondEarringSettingTypeFilter)
            }
            className={optionClass(diamondEarringSettingTypeFilter.includes(s))}
          >
            <span>{s}</span>
            <Check active={diamondEarringSettingTypeFilter.includes(s)} />
          </button>
        ))}
      </FilterGroup>

      <FilterGroup title="Diamond Shape">
        <VisualOptionGrid
          options={earringDiamondShapes}
          selected={diamondEarringShapeFilter}
          onToggle={(s) => toggle(diamondEarringShapeFilter, s, setDiamondEarringShapeFilter)}
          renderIcon={(s) => <DiamondShapeIcon shape={s} className="size-8" />}
        />
      </FilterGroup>

      {diamondEarringCaratOptions.length > 0 && (
        <FilterGroup title="Total Carat Weight">
          {diamondEarringCaratOptions.map((c) => (
            <button
              key={c}
              onClick={() => toggle(diamondEarringCaratFilter, c, setDiamondEarringCaratFilter)}
              className={optionClass(diamondEarringCaratFilter.includes(c))}
            >
              <span>{c.toFixed(2)} CTW</span>
              <Check active={diamondEarringCaratFilter.includes(c)} />
            </button>
          ))}
        </FilterGroup>
      )}

      {diamondEarringColorOptions.length > 0 && (
        <FilterGroup title="Diamond Color">
          {diamondEarringColorOptions.map((c) => (
            <button
              key={c}
              onClick={() => toggle(diamondEarringColorFilter, c, setDiamondEarringColorFilter)}
              className={optionClass(diamondEarringColorFilter.includes(c))}
            >
              <span>{c}</span>
              <Check active={diamondEarringColorFilter.includes(c)} />
            </button>
          ))}
        </FilterGroup>
      )}

      {diamondEarringClarityOptions.length > 0 && (
        <FilterGroup title="Clarity">
          {diamondEarringClarityOptions.map((c) => (
            <button
              key={c}
              onClick={() =>
                toggle(diamondEarringClarityFilter, c, setDiamondEarringClarityFilter)
              }
              className={optionClass(diamondEarringClarityFilter.includes(c))}
            >
              <span>{c}</span>
              <Check active={diamondEarringClarityFilter.includes(c)} />
            </button>
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Gold Color">
        {diamondGoldColors.map((g) => (
          <button
            key={g}
            onClick={() => toggle(diamondEarringGoldColorFilter, g, setDiamondEarringGoldColorFilter)}
            className={optionClass(diamondEarringGoldColorFilter.includes(g))}
          >
            <span>{g} Gold</span>
            <Check active={diamondEarringGoldColorFilter.includes(g)} />
          </button>
        ))}
      </FilterGroup>

      {diamondEarringFilterCount > 0 && (
        <button
          onClick={() => {
            setDiamondEarringStyleFilter([])
            setDiamondEarringDesignStyleFilter([])
            setDiamondEarringSettingTypeFilter([])
            setDiamondEarringShapeFilter([])
            setDiamondEarringCaratFilter([])
            setDiamondEarringColorFilter([])
            setDiamondEarringClarityFilter([])
            setDiamondEarringGoldColorFilter([])
          }}
          className="text-xs tracking-[0.16em] text-gold-foreground uppercase underline-offset-4 hover:underline"
        >
          Clear earring filters
        </button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="border-b border-border/70 pb-8">
        <p className="text-xs tracking-luxe text-gold-foreground uppercase">
          Wholesale Catalog
        </p>
        <h1 className="mt-4 font-serif text-4xl text-foreground lg:text-5xl">
          {collection === 'All' ? 'The Full Showroom' : collection}
        </h1>

        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} available
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {/* Mobile filter trigger — shares a row with search; sidebar covers this on desktop */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex shrink-0 items-center gap-2 border border-border px-5 py-3 text-xs tracking-[0.16em] text-foreground uppercase lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Filters{activeCount > 0 ? ` (${activeCount})` : ''}
          </button>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {activeFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={f.onRemove}
                  className="flex items-center gap-1.5 border border-border/70 bg-card px-3 py-1.5 text-xs tracking-[0.1em] text-foreground/80 uppercase transition-colors hover:border-gold hover:text-foreground"
                >
                  {f.label}
                  <X className="size-3" />
                </button>
              ))}
              <button
                onClick={reset}
                className="px-1 text-xs tracking-[0.16em] text-gold-foreground uppercase underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="relative flex-1 sm:ml-auto sm:max-w-72 sm:flex-none">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, style, SKU…"
              className="w-full border border-border bg-card py-3 pr-10 pl-11 text-sm text-foreground outline-none focus:border-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-12 pt-10">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-28">{Filters}</div>
        </aside>

        <div className="min-w-0 flex-1">
          {isLabDiamondRings && (
            <div className="mb-8 border-b border-border/70 pb-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs tracking-luxe text-muted-foreground uppercase">
                  Lab Diamond Rings
                </p>
                <button
                  onClick={() => setLabFilterPanelOpen(true)}
                  className="flex shrink-0 items-center gap-2 border border-border px-4 py-2 text-xs tracking-[0.16em] text-foreground uppercase transition-colors hover:border-foreground"
                >
                  <SlidersHorizontal className="size-3.5" />
                  Filters{labFilterCount > 0 ? ` (${labFilterCount})` : ''}
                </button>
              </div>
              <SubcategoryNav options={ringTypes} value={ringType} onChange={changeRingType} />
            </div>
          )}

          {isLabDiamondEarrings && (
            <div className="mb-8 border-b border-border/70 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs tracking-luxe text-muted-foreground uppercase">
                  Lab Diamond Earrings
                </p>
                <button
                  onClick={() => setLabFilterPanelOpen(true)}
                  className="flex shrink-0 items-center gap-2 border border-border px-4 py-2 text-xs tracking-[0.16em] text-foreground uppercase transition-colors hover:border-foreground"
                >
                  <SlidersHorizontal className="size-3.5" />
                  Filters{earringFilterCount > 0 ? ` (${earringFilterCount})` : ''}
                </button>
              </div>
            </div>
          )}

          {isDiamondEarrings && (
            <div className="mb-8 border-b border-border/70 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs tracking-luxe text-muted-foreground uppercase">
                  Natural Diamond Earrings
                </p>
                <button
                  onClick={() => setLabFilterPanelOpen(true)}
                  className="flex shrink-0 items-center gap-2 border border-border px-4 py-2 text-xs tracking-[0.16em] text-foreground uppercase transition-colors hover:border-foreground"
                >
                  <SlidersHorizontal className="size-3.5" />
                  Filters{diamondEarringFilterCount > 0 ? ` (${diamondEarringFilterCount})` : ''}
                </button>
              </div>
            </div>
          )}

          {!isLabDiamondRings &&
            !isLabDiamondEarrings &&
            !isDiamondEarrings &&
            activeType &&
            subcategoryOptions && (
            <div className="mb-8 border-b border-border/70 pb-5">
              <p className="mb-4 text-xs tracking-luxe text-muted-foreground uppercase">
                {[karats.length === 1 ? karats[0] : null, collection !== 'All' ? collection : null, activeType]
                  .filter(Boolean)
                  .join(' ')}
              </p>
              <SubcategoryNav
                options={subcategoryOptions}
                value={subcategory}
                onChange={setSubcategory}
              />
            </div>
          )}

          {showBrowse ? (
            <div className="space-y-16">
              {collections.map((c) => {
                const items = products
                  .filter((p) => p.collection === c.name)
                  .slice(0, BROWSE_SECTION_SIZE)
                if (items.length === 0) return null
                return (
                  <div key={c.name}>
                    <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border/70 pb-4">
                      <div>
                        <h2 className="font-serif text-2xl text-foreground">{c.name}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{c.tagline}</p>
                      </div>
                      <button
                        onClick={() => changeCollection(c.name)}
                        className="shrink-0 text-xs tracking-[0.16em] text-gold-foreground uppercase underline-offset-4 hover:underline"
                      >
                        View all in {c.name}
                      </button>
                    </div>
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                      {items.map((p) => (
                        <ProductCard key={p.slug} product={p} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : filtered.length === 0 ? (
            <div className="border border-dashed border-border py-24 text-center">
              <p className="font-serif text-2xl text-foreground">Nothing matches</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting or clearing your filters.
              </p>
              <button
                onClick={reset}
                className="mt-6 text-xs tracking-[0.16em] text-gold-foreground uppercase underline-offset-4 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {pageItems.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
              <Pager page={currentPage} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-background">
            <div className="flex items-center justify-between border-b border-border/70 px-6 py-5">
              <span className="text-xs tracking-luxe text-foreground uppercase">
                Filters
              </span>
              <button aria-label="Close filters" onClick={() => setDrawerOpen(false)}>
                <X className="size-5 text-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-8">{Filters}</div>
            <div className="border-t border-border/70 p-6">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-foreground py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase"
              >
                Show {filtered.length} pieces
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lab Diamond Ring/Earring filter panel — separate from the drawer
          above so these attribute filters never look bundled in with the
          general Collection/Product Type list. Appears the same way on
          every screen size, triggered only by the "Filters" button next to
          the Rings tabs or Earrings heading. Rings and Earrings are mutually
          exclusive scopes, so this one panel just swaps its content/title. */}
      {labFilterPanelOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setLabFilterPanelOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-background">
            <div className="flex items-center justify-between border-b border-border/70 px-6 py-5">
              <span className="text-xs tracking-luxe text-foreground uppercase">
                {isLabDiamondEarrings
                  ? 'Lab Diamond Earring Filters'
                  : isDiamondEarrings
                    ? 'Diamond Earring Filters'
                    : 'Lab Diamond Ring Filters'}
              </span>
              <button
                aria-label="Close filters"
                onClick={() => setLabFilterPanelOpen(false)}
              >
                <X className="size-5 text-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-8">
              {isLabDiamondEarrings
                ? LabDiamondEarringFilters
                : isDiamondEarrings
                  ? DiamondEarringFilters
                  : LabDiamondRingFilters}
            </div>
            <div className="border-t border-border/70 p-6">
              <button
                onClick={() => setLabFilterPanelOpen(false)}
                className="w-full bg-foreground py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase"
              >
                Show {filtered.length} pieces
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs tracking-luxe text-muted-foreground uppercase">
        {title}
      </h3>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

function Pager({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  return (
    <div className="mt-16 flex items-center justify-center gap-8 border-t border-border/70 pt-10">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="text-xs tracking-[0.16em] text-foreground/60 uppercase transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
      >
        Prev
      </button>
      <div className="flex items-center gap-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={[
              'border-b-2 pb-0.5 text-xs tracking-[0.14em] transition-colors',
              p === page
                ? 'border-gold text-foreground'
                : 'border-transparent text-foreground/50 hover:text-foreground/80',
            ].join(' ')}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="text-xs tracking-[0.16em] text-foreground/60 uppercase transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
      >
        Next
      </button>
    </div>
  )
}

function optionClass(active: boolean) {
  return [
    'flex items-center justify-between py-2.5 text-left text-sm transition-colors',
    active ? 'text-foreground' : 'text-foreground/60 hover:text-foreground',
  ].join(' ')
}

function Check({ active }: { active: boolean }) {
  return (
    <span
      className={[
        'flex size-4 items-center justify-center border transition-colors',
        active ? 'border-gold bg-gold' : 'border-border',
      ].join(' ')}
    >
      {active && <span className="size-1.5 bg-gold-foreground" />}
    </span>
  )
}
