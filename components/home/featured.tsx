import Link from 'next/link'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export function Featured() {
  const featured = products.slice(0, 4)

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs tracking-luxe text-gold-foreground uppercase">
            Selected pieces
          </p>
          <h2 className="mt-4 font-serif text-4xl text-foreground lg:text-5xl">
            Featured this season
          </h2>
        </div>
        <Link
          href="/catalog"
          className="border-b border-foreground/40 pb-1 text-xs tracking-[0.18em] text-foreground uppercase transition-colors hover:border-foreground"
        >
          View all pieces
        </Link>
      </div>

      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  )
}
