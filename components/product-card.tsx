import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  // Only worth stating on the card when every variant shares one
  // construction — if a product offers both, that choice belongs on the
  // detail page, not as a single (potentially misleading) badge here.
  const constructions = product.variants
    ? [...new Set(product.variants.map((v) => v.construction))]
    : []
  const construction = constructions.length === 1 ? constructions[0] : null

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden border border-border/70 bg-card">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-background/80 px-2.5 py-1 text-[10px] tracking-[0.16em] text-foreground/70 uppercase backdrop-blur-sm">
          {product.collection}
        </span>
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {product.karat && (
            <span className="bg-background/80 px-2.5 py-1 text-[10px] tracking-[0.16em] text-gold-foreground uppercase backdrop-blur-sm">
              {product.karat}
            </span>
          )}
          {construction && (
            <span className="bg-background/80 px-2.5 py-1 text-[10px] tracking-[0.16em] text-foreground/70 uppercase backdrop-blur-sm">
              {construction}
            </span>
          )}
        </div>
      </div>
      <div className="pt-4">
        <h3 className="font-serif text-lg leading-snug text-foreground transition-colors group-hover:text-gold-foreground">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center gap-2 text-xs tracking-[0.1em] text-muted-foreground uppercase">
          <span>{product.type}</span>
          {product.sku && (
            <>
              <span className="text-border">|</span>
              <span>{product.sku}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
