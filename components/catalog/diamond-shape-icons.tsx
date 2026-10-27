import type { DiamondShape, EarringDiamondShape } from '@/lib/products'

/**
 * Small original line-art diagrams — one per Diamond Shape filter value.
 * Deliberately schematic (not photographic) so there's no reliance on any
 * third-party jewelry-site imagery: these are generic geometric outlines,
 * drawn fresh, in the same stroke language as the rest of the site's icons.
 *
 * Shared between the Engagement Ring Diamond Shape filter (`DiamondShape`)
 * and the Lab Diamond Earrings one (`EarringDiamondShape`, which adds
 * 'Baguette') — every ring-only case here is untouched by that addition.
 */
export function DiamondShapeIcon({
  shape,
  className,
}: {
  shape: DiamondShape | EarringDiamondShape
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

  switch (shape) {
    case 'Round':
      return (
        <svg {...svgProps}>
          <circle cx="24" cy="24" r="15" />
          <circle cx="24" cy="24" r="7" opacity="0.45" />
        </svg>
      )
    case 'Oval':
      return (
        <svg {...svgProps}>
          <ellipse cx="24" cy="24" rx="12" ry="16" />
          <ellipse cx="24" cy="24" rx="5.5" ry="9" opacity="0.45" />
        </svg>
      )
    case 'Emerald':
      return (
        <svg {...svgProps}>
          <polygon points="18,9 30,9 34,14 34,34 30,39 18,39 14,34 14,14" />
          <line x1="14" y1="19" x2="34" y2="19" opacity="0.45" />
          <line x1="14" y1="29" x2="34" y2="29" opacity="0.45" />
        </svg>
      )
    case 'Cushion':
      return (
        <svg {...svgProps}>
          <rect x="9" y="9" width="30" height="30" rx="11" />
          <rect x="17" y="17" width="14" height="14" rx="6" opacity="0.45" />
        </svg>
      )
    case 'Elongated Cushion':
      return (
        <svg {...svgProps}>
          <rect x="13" y="6" width="22" height="36" rx="9" />
          <rect x="18.5" y="14" width="11" height="20" rx="5" opacity="0.45" />
        </svg>
      )
    case 'Pear':
      return (
        <svg {...svgProps}>
          <path d="M24 7 C29 14 37 19 37 27.5 A13 13 0 1 1 11 27.5 C11 19 19 14 24 7 Z" />
        </svg>
      )
    case 'Radiant':
      return (
        <svg {...svgProps}>
          <polygon points="18,9 30,9 34,14 34,34 30,39 18,39 14,34 14,14" />
          <line x1="14" y1="14" x2="34" y2="34" opacity="0.45" />
          <line x1="34" y1="14" x2="14" y2="34" opacity="0.45" />
        </svg>
      )
    case 'Princess':
      return (
        <svg {...svgProps}>
          <rect x="10" y="10" width="28" height="28" />
          <line x1="10" y1="10" x2="38" y2="38" opacity="0.45" />
          <line x1="38" y1="10" x2="10" y2="38" opacity="0.45" />
        </svg>
      )
    case 'Marquise':
      return (
        <svg {...svgProps}>
          <path d="M24 7 C32 13 37 19 37 24 C37 29 32 35 24 41 C16 35 11 29 11 24 C11 19 16 13 24 7 Z" />
        </svg>
      )
    case 'Asscher':
      return (
        <svg {...svgProps}>
          <polygon points="17,9 31,9 39,17 39,31 31,39 17,39 9,31 9,17" />
          <polygon points="20,15 28,15 33,20 33,28 28,33 20,33 15,28 15,20" opacity="0.45" />
        </svg>
      )
    case 'Heart':
      return (
        <svg {...svgProps}>
          <path d="M24 39 C9 28 6 18 13 12 C18 8 23 11 24 17 C25 11 30 8 35 12 C42 18 39 28 24 39 Z" />
        </svg>
      )
    case 'Baguette':
      return (
        <svg {...svgProps}>
          <rect x="12" y="15" width="24" height="18" />
          <line x1="19" y1="15" x2="19" y2="33" opacity="0.45" />
          <line x1="29" y1="15" x2="29" y2="33" opacity="0.45" />
        </svg>
      )
    default:
      return null
  }
}
