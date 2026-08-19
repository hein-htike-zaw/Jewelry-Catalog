import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductGallery } from '@/components/product/product-gallery'
import { InquiryDialog } from '@/components/product/inquiry-dialog'
import { ProductCard } from '@/components/product-card'
import { getProduct, getRelated, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const gallery = product.gallery?.length
    ? product.gallery
    : [
        product.image,
        `/images/collection-${product.collection.toLowerCase().replace(' ', '-')}.png`,
      ]
  const related = getRelated(product)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs tracking-[0.12em] text-muted-foreground uppercase">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="size-3" />
            <Link
              href={`/catalog?collection=${encodeURIComponent(product.collection)}`}
              className="hover:text-foreground"
            >
              {product.collection}
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ProductGallery images={gallery} name={product.name} />

            <div className="lg:pt-4">
              <p className="text-xs tracking-luxe text-gold-foreground uppercase">
                {product.collection}
                {product.karat ? ` · ${product.karat} Gold` : ''}
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-foreground lg:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 text-xs tracking-[0.14em] text-muted-foreground uppercase">
                SKU {product.sku}
              </p>

              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Key facts */}
              <div className="mt-8 grid grid-cols-3 border-y border-border/70 divide-x divide-border/70">
                <Fact label="Karat" value={product.karat ?? '—'} />
                <Fact label="Type" value={product.type} />
                <Fact label="Weight" value={product.weight} />
              </div>

              {/* Specs */}
              <div className="mt-8">
                <h2 className="text-xs tracking-luxe text-muted-foreground uppercase">
                  Specifications
                </h2>
                <dl className="mt-4 divide-y divide-border/60">
                  {product.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between py-3 text-sm"
                    >
                      <dt className="text-muted-foreground">{s.label}</dt>
                      <dd className="text-foreground">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10">
                <InquiryDialog product={product} />
                <p className="mt-4 text-center text-xs tracking-[0.1em] text-muted-foreground uppercase">
                  Wholesale pricing available to verified trade accounts
                </p>
              </div>
            </div>
          </div>

          {/* Related */}
          <section className="mt-24 border-t border-border/70 pt-16 lg:mt-32">
            <h2 className="mb-10 font-serif text-3xl text-foreground lg:text-4xl">
              You may also consider
            </h2>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-4 text-center first:pl-0 last:pr-0">
      <div className="text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-1.5 font-serif text-lg text-foreground">{value}</div>
    </div>
  )
}
