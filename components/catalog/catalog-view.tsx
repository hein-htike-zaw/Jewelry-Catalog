'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import {
  products,
  collections,
  productTypes,
  subcategoriesByType,
  type Collection,
  type Karat,
  type ProductType,
} from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { SubcategoryNav } from '@/components/catalog/subcategory-nav'

const allKarats: Karat[] = ['10K', '14K', '18K']
const PAGE_SIZE = 6
const BROWSE_SECTION_SIZE = 6

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
  const [page, setPage] = useState(1)

  // The subcategory chip row only makes sense once browsing is narrowed to
  // one product type that actually has subcategories defined for it.
  const activeType = types.length === 1 ? types[0] : null
  const subcategoryOptions = activeType ? subcategoriesByType[activeType] : undefined

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return products.filter((p) => {
      if (collection !== 'All' && p.collection !== collection) return false
      if (karats.length && (!p.karat || !karats.includes(p.karat))) return false
      if (types.length && !types.includes(p.type)) return false
      if (
        subcategoryOptions &&
        subcategory !== 'All' &&
        p.subcategory !== subcategory
      )
        return false
      if (needle) {
        const haystack = [p.name, p.sku, p.style, p.subcategory, p.type, p.collection]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(needle)) return false
      }
      return true
    })
  }, [collection, karats, types, subcategory, subcategoryOptions, query])

  // Any change to the active filter set invalidates the current page.
  useEffect(() => {
    setPage(1)
  }, [collection, karats, types, subcategory, query])

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

  const activeCount =
    (collection !== 'All' ? 1 : 0) +
    karats.length +
    types.length +
    (subcategory !== 'All' ? 1 : 0) +
    (query.trim() ? 1 : 0)

  // With nothing filtered, browsing by collection is more useful than one
  // long undifferentiated grid of everything in the showroom.
  const showBrowse = activeCount === 0

  const reset = () => {
    setCollection('All')
    setKarats([])
    setTypes([])
    setSubcategory('All')
    setQuery('')
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
    ...(subcategory !== 'All'
      ? [{ key: 'subcategory', label: subcategory, onRemove: () => setSubcategory('All') }]
      : []),
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
          {activeType && subcategoryOptions && (
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
