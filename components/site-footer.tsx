import Link from 'next/link'
import { TermsOfTrade } from '@/components/terms-of-trade'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <span className="font-serif text-2xl font-semibold tracking-wide text-foreground">
              MELANO CREATION
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A private wholesale showroom serving jewelers, retailers and
              distributors with fine gold, diamond and lab-grown pieces.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-luxe text-muted-foreground uppercase">
              Collections
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              <li><Link href="/catalog?collection=Gold" className="hover:text-foreground">Gold</Link></li>
              <li><Link href="/catalog?collection=Diamond" className="hover:text-foreground">Diamond</Link></li>
              <li><Link href="/catalog?collection=Lab+Diamond" className="hover:text-foreground">Lab Diamond</Link></li>
              <li><Link href="/catalog?collection=Watches" className="hover:text-foreground">Watches</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-luxe text-muted-foreground uppercase">
              Trade
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              <li><Link href="/catalog" className="hover:text-foreground">Full Catalog</Link></li>
              <li><span className="cursor-default">Open an Account</span></li>
              <li><span className="cursor-default">Volume Pricing</span></li>
              <li><TermsOfTrade /></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-luxe text-muted-foreground uppercase">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              <li>Diamond District</li>
              <li>New York, NY</li>
              <li>trade@melanocreation.co</li>
              <li>+1 (212) 555-0180</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Melano Creation. Wholesale trade only.</p>
          <p className="tracking-[0.14em] uppercase">By appointment &middot; Established 1994</p>
        </div>
      </div>
    </footer>
  )
}
