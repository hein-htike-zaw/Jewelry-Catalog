import type { EarringStyle } from '@/lib/products'

/**
 * Small original line-art diagrams — one per Earring Style filter value.
 * Same stroke language as the ring/diamond-shape icon sets so the whole
 * filter system reads as one family.
 */
export function EarringStyleIcon({
  style,
  className,
}: {
  style: EarringStyle
  className?: string
}) {
  const svgProps = {
    viewBox: '0 0 48 48',
    className,
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
  }

  switch (style) {
    case 'Stud':
      return (
        <svg {...svgProps}>
          <circle cx="24" cy="21" r="8" />
          <line x1="24" y1="29" x2="24" y2="33" />
        </svg>
      )
    case 'Hoop':
      return (
        <svg {...svgProps}>
          <path d="M24 10 A14 14 0 1 1 23.9 10" />
        </svg>
      )
    case 'Huggie':
      return (
        <svg {...svgProps}>
          <path d="M24 16 A9 9 0 1 1 23.9 16" strokeWidth={3} />
        </svg>
      )
    case 'Drop':
      return (
        <svg {...svgProps}>
          <circle cx="24" cy="12" r="4" />
          <line x1="24" y1="16" x2="24" y2="24" />
          <path d="M18 24 L30 24 L24 38 Z" />
        </svg>
      )
    default:
      return null
  }
}
