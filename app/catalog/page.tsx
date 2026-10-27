import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CatalogView } from '@/components/catalog/catalog-view'
import type { Collection, ProductType } from '@/lib/products'

const validCollections: Collection[] = ['Gold', 'Diamond', 'Lab Diamond', 'Watches']
const validTypes: ProductType[] = [
  'Chains',
  'Bracelets',
  'Rings',
  'Pendants',
  'Anklets',
  'Timepieces',
  'Earrings',
]

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string; type?: string }>
}) {
  const params = await searchParams
  const collection = validCollections.find((c) => c === params.collection)
  const type = validTypes.find((t) => t === params.type)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <CatalogView
          key={`${collection ?? 'all'}-${type ?? 'all'}`}
          initialCollection={collection}
          initialType={type}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
