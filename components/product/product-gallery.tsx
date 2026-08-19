'use client'

import { useState } from 'react'
import Image from 'next/image'

export function ProductGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {images.length > 1 && (
        <div className="flex gap-4 lg:flex-col">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={[
                'relative size-20 shrink-0 overflow-hidden border transition-colors lg:size-24',
                active === i ? 'border-foreground' : 'border-border/70 hover:border-foreground/50',
              ].join(' ')}
            >
              <Image
                src={src || '/placeholder.svg'}
                alt={`${name} view ${i + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-square flex-1 overflow-hidden border border-border/70 bg-card">
        <Image
          src={images[active] || '/placeholder.svg'}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}
