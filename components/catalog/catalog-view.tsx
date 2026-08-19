'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import {
  products,
  collections,
  productTypes,
  type Collection,
  type Karat,
  type ProductType,
} from '@/lib/products'
import { ProductCard } from '@/components/product-card'

const allKarats: Karat[] = ['10K', '14K', '18K']

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
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (collection !== 'All' && p.collection !== collection) return false
      if (karats.length && (!p.karat || !karats.includes(p.karat))) return false
      if (types.length && !types.includes(p.type)) return false
      return true
    })
  }, [collection, karats, types])

  const toggle = <T,>(list: T[], value: T, set: (v: T[]) => void) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const activeCount =
    (collection !== 'All' ? 1 : 0) + karats.length + types.length

  const reset = () => {
    setCollection('All')
    setKarats([])
    setTypes([])
  }

  const Filters = (
    <div className="space-y-10">
      <FilterGroup title="Collection">
        <button
          onClick={() => setCollection('All')}
          className={optionClass(collection === 'All')}
        >
          <span>All collections</span>
        </button>
        {collections.map((c) => (
          <button
            key={c.name}
            onClick={() => setCollection(c.name)}
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
            onClick={() => toggle(types, t, setTypes)}
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
        <p className="mt-3 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} available
        </p>
      </div>

      <div className="flex gap-12 pt-10">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-28">{Filters}</div>
        </aside>

        <div className="flex-1">
          {/* Mobile filter trigger */}
          <div className="mb-6 lg:hidden">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 border border-border px-5 py-3 text-xs tracking-[0.16em] text-foreground uppercase"
            >
              <SlidersHorizontal className="size-4" />
              Filters{activeCount > 0 ? ` (${activeCount})` : ''}
            </button>
          </div>

          {filtered.length === 0 ? (
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
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
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
