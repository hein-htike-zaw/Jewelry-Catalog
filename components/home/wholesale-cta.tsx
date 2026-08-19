import Link from 'next/link'

export function WholesaleCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="border border-border/70 bg-primary px-8 py-16 text-center lg:px-16 lg:py-24">
        <p className="text-xs tracking-luxe text-gold uppercase">
          Trade accounts
        </p>
        <h2 className="mx-auto mt-6 max-w-2xl font-serif text-4xl leading-tight text-balance text-primary-foreground lg:text-5xl">
          Open a wholesale account and access live inventory pricing
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-primary-foreground/70">
          We work exclusively with verified jewelers, retailers and
          distributors. Submit your business details to receive our full price
          book and dedicated account manager.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/catalog"
            className="bg-gold px-8 py-4 text-xs tracking-[0.18em] text-gold-foreground uppercase transition-opacity hover:opacity-90"
          >
            Request Trade Access
          </Link>
          <Link
            href="/catalog"
            className="border-b border-primary-foreground/40 pb-1 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:border-primary-foreground"
          >
            Browse the Catalog
          </Link>
        </div>
      </div>
    </section>
  )
}
