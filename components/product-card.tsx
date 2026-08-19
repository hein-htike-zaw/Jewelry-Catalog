import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
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
      </div>
      <div className="pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-lg leading-snug text-foreground transition-colors group-hover:text-gold-foreground">
            {product.name}
          </h3>
          {product.karat && (
            <span className="shrink-0 text-xs tracking-[0.14em] text-gold-foreground">
              {product.karat}
            </span>
          )}
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-xs tracking-[0.1em] text-muted-foreground uppercase">
          <span>{product.type}</span>
          <span className="text-border">|</span>
          <span>{product.sku}</span>
        </div>
      </div>
    </Link>
  )
}
