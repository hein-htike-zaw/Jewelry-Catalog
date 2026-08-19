import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { CollectionCards } from '@/components/home/collection-cards'
import { Featured } from '@/components/home/featured'
import { BrowseBand } from '@/components/home/browse-band'
import { WholesaleCta } from '@/components/home/wholesale-cta'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <CollectionCards />
        <Featured />
        <BrowseBand />
        <WholesaleCta />
      </main>
      <SiteFooter />
    </div>
  )
}
