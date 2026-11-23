'use client'

import { useState, type PointerEvent } from 'react'
import Image from 'next/image'
import { useProductVariant } from '@/components/product/product-variant-context'

export function ProductGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [active, setActive] = useState({ key: '', index: 0 })
  const [zoom, setZoom] = useState<{ key: string; left: number; top: number; width: number; height: number; backgroundX: number; backgroundY: number } | null>(null)
  const selectedState = useProductVariant()
  const selection = selectedState?.variant
  const sizeView = selectedState?.hasSizeSelection ? selectedState.sizeView : undefined
  const overviewImage = selection?.sizeGuide?.overviewImage
  const variantDescription = selection ? [selection.construction, `${selection.color} Gold`, selection.finish === 'Two-Tone' ? selection.finish : undefined, selection.cut, selection.surface === 'Pavé' ? 'Pavé gold finish' : undefined, selection.profile ? `${selection.profile} profile` : undefined].filter(Boolean).join(' · ') : ''
  const hasSizeGuide = Boolean(overviewImage || sizeView)
  const baseImages = selection?.gallery?.length ? selection.gallery : selection?.image ? [selection.image] : images
  const displayImages = sizeView ? [sizeView.image, ...baseImages.filter((src) => src !== sizeView.image)] : baseImages
  const galleryKey = `${selection?.id ?? selection?.image ?? images.join('|')}:${sizeView ? `${sizeView.widthMm}-${sizeView.lengthInches}` : 'overview'}:${selectedState?.selectionRevision ?? 0}`
  if (active.key !== galleryKey) setActive({ key: galleryKey, index: 0 })
  const activeIndex = active.key === galleryKey ? Math.min(active.index, displayImages.length - 1) : 0
  const currentImage = displayImages[activeIndex] || '/placeholder.svg'
  const zoomKey = `${galleryKey}:${activeIndex}`
  const lensSize = 200
  const magnification = 2.5
  const moveZoom = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const frame = event.currentTarget
    const image = frame.querySelector('img')
    if (!image?.complete || !image.naturalWidth) return
    const bounds = frame.getBoundingClientRect()
    const x = event.clientX - bounds.left - frame.clientLeft
    const y = event.clientY - bounds.top - frame.clientTop
    const contain = getComputedStyle(image).objectFit === 'contain'
    const scale = (contain ? Math.min : Math.max)(frame.clientWidth / image.naturalWidth, frame.clientHeight / image.naturalHeight)
    const width = image.naturalWidth * scale
    const height = image.naturalHeight * scale
    const offsetX = (frame.clientWidth - width) / 2
    const offsetY = (frame.clientHeight - height) / 2
    if (x < offsetX || x > offsetX + width || y < offsetY || y > offsetY + height) {
      setZoom(null)
      return
    }
    setZoom({
      key: zoomKey,
      left: Math.max(0, Math.min(x - lensSize / 2, frame.clientWidth - lensSize)),
      top: Math.max(0, Math.min(y - lensSize / 2, frame.clientHeight - lensSize)),
      width: width * magnification,
      height: height * magnification,
      backgroundX: lensSize / 2 - (x - offsetX) * magnification,
      backgroundY: lensSize / 2 - (y - offsetY) * magnification,
    })
  }
  const imageName = sizeView && selection && activeIndex === 0
    ? `${name} — ${sizeView.widthMm} mm, ${sizeView.lengthInches} inches, ${variantDescription}, length guide`
    : overviewImage && displayImages[activeIndex] === overviewImage
    ? `${name} — ${variantDescription}, width assortment comparison`
    : selection?.image
    ? `${name} — ${selection.construction}, ${selection.surface === 'Pavé' ? 'Pavé gold finish' : selection.cut ?? 'Regular'}, ${selection.color} gold, ${selection.finish}${selection.profile ? `, ${selection.profile} profile` : ''}`
    : name

  return (
    <div className={`flex flex-col-reverse gap-4 lg:flex-row ${hasSizeGuide ? 'self-start' : ''}`}>
      {(displayImages.length > 1 || overviewImage) && (
        <div className="flex gap-4 lg:flex-col">
          {displayImages.map((src, i) => (
            <button
              key={src + i}
              onClick={() => src === overviewImage ? selectedState?.showOverview() : setActive({ key: galleryKey, index: i })}
              aria-label={src === overviewImage ? 'View assortment comparison' : sizeView && i === 0 ? 'View selected chain' : `View image ${i + 1}`}
              aria-pressed={activeIndex === i}
              className={[
                'relative size-20 shrink-0 overflow-hidden border transition-colors lg:size-24',
                activeIndex === i ? 'border-foreground' : 'border-border/70 hover:border-foreground/50',
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

      <div
        className={`relative ${hasSizeGuide ? 'aspect-[4/5]' : 'aspect-square'} flex-1 overflow-hidden border border-border/70 bg-card [@media(hover:hover)_and_(pointer:fine)]:cursor-zoom-in`}
        onPointerMove={moveZoom}
        onPointerLeave={() => setZoom(null)}
        onPointerCancel={() => setZoom(null)}
        onPointerDown={() => setZoom(null)}
      >
        <Image
          src={currentImage}
          alt={imageName}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={activeIndex === 0 && (hasSizeGuide || selection?.imageFit === 'contain') ? 'bg-background object-contain' : 'object-cover'}
        />
        {sizeView && selection && activeIndex === 0 && (
          <div className="absolute right-3 bottom-3 left-3 border border-border/50 bg-background/95 px-3 py-2.5 text-center backdrop-blur-sm" aria-live="polite">
            <p className="text-xs tracking-[0.08em] text-foreground">{sizeView.widthMm} mm &middot; {sizeView.lengthInches}&Prime; &middot; {variantDescription}</p>
            {selection.sizeGuide?.approximate && <p className="mt-1 text-[10px] text-muted-foreground">Approximate visual guide &middot; fit varies with neck size</p>}
          </div>
        )}
        {overviewImage && !sizeView && (
          <div className="absolute right-3 bottom-3 left-3 border border-border/50 bg-background/95 px-3 py-2.5 text-center backdrop-blur-sm">
            <p className="text-xs tracking-[0.08em] text-foreground">{name} &middot; {variantDescription} &middot; Width assortment</p>
            <p className="mt-1 text-[10px] text-muted-foreground">Choose a width and length to see the fit preview</p>
          </div>
        )}
        {zoom?.key === zoomKey && (
          <div
            aria-hidden="true"
            data-product-zoom
            className="pointer-events-none absolute z-20 rounded-full border-2 border-white bg-card bg-no-repeat shadow-xl"
            style={{
              left: zoom.left,
              top: zoom.top,
              width: lensSize,
              height: lensSize,
              backgroundImage: `url(${JSON.stringify(currentImage)})`,
              backgroundSize: `${zoom.width}px ${zoom.height}px`,
              backgroundPosition: `${zoom.backgroundX}px ${zoom.backgroundY}px`,
            }}
          />
        )}
      </div>
    </div>
  )
}
