import Link from 'next/link'
import Image from 'next/image'
import { collections } from '@/lib/products'

export function CollectionCards() {
  return (
    <section className="border-t border-border/70 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs tracking-luxe text-gold-foreground uppercase">
              Explore
            </p>
            <h2 className="mt-4 font-serif text-4xl text-foreground lg:text-5xl">
              Four house collections
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Every piece is held in inventory and available for immediate
            wholesale order and fulfillment.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c) => (
            <Link
              key={c.name}
              href={`/catalog?collection=${encodeURIComponent(c.name)}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-border/70 bg-card">
                <Image
                  src={c.image || '/placeholder.svg'}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between pt-5">
                <h3 className="font-serif text-2xl text-foreground">{c.name}</h3>
                <span className="text-xs tracking-[0.12em] text-muted-foreground">
                  {c.count} pcs
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.tagline}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
