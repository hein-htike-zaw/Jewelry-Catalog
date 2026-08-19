import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-14 pb-20 lg:px-10 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <p className="text-xs tracking-luxe text-gold-foreground uppercase">
            Wholesale Trade Showroom
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] font-medium text-balance text-foreground sm:text-6xl lg:text-7xl">
            Fine jewelry, sourced for the trade.
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
            A curated wholesale catalog of solid gold, natural and lab-grown
            diamond jewelry, and timepieces &mdash; presented for jewelers,
            retailers and distributors.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/catalog"
              className="bg-foreground px-8 py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              Browse the Catalog
            </Link>
            <Link
              href="/catalog"
              className="border-b border-foreground/40 pb-1 text-xs tracking-[0.18em] text-foreground uppercase transition-colors hover:border-foreground"
            >
              Request Trade Access
            </Link>
          </div>

          <div className="mt-14 flex gap-10 border-t border-border/70 pt-8">
            {[
              ['30+', 'Years in the district'],
              ['1,200+', 'SKUs in stock'],
              ['10K–18K', 'Gold purities'],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="font-serif text-2xl text-foreground">{stat}</div>
                <div className="mt-1 text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden border border-border/70 lg:aspect-[5/6]">
          <Image
            src="/images/hero-gold-chains.png"
            alt="Fine gold chains arranged on ivory linen"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
