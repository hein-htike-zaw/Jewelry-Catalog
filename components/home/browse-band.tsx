import Link from 'next/link'
import Image from 'next/image'
import { productTypes } from '@/lib/products'

export function BrowseBand() {
  return (
    <section className="border-t border-border/70 bg-secondary/30">
      <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
        <div className="relative min-h-[340px] overflow-hidden border-b border-border/70 lg:border-b-0 lg:border-r">
          <Image
            src="/images/collection-diamond.png"
            alt="Diamond pendant on ivory silk"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 lg:px-16 lg:py-24">
          <p className="text-xs tracking-luxe text-gold-foreground uppercase">
            Browse by category
          </p>
          <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight text-foreground lg:text-5xl">
            Find exactly what your counter needs
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Filter the full showroom by collection, gold purity and product
            type to build the assortment that fits your market.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {productTypes.map((type) => (
              <Link
                key={type}
                href={`/catalog?type=${encodeURIComponent(type)}`}
                className="border border-border px-5 py-2.5 text-xs tracking-[0.14em] text-foreground/80 uppercase transition-colors hover:border-foreground hover:text-foreground"
              >
                {type}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
