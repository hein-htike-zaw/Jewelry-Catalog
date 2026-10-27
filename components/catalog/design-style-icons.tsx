import type { DesignStyle, EarringDesignStyle } from '@/lib/products'

/**
 * Small original line-art diagrams — one per Design Style filter value.
 * Ring values (`DesignStyle`) share a common band pictogram so that set reads
 * as one family, with the setting itself (stone, prongs, halo, accents...)
 * varied to make the difference between styles legible at a glance.
 *
 * The band is drawn as an open arc (not a full circle) so the stone caps
 * the opening instead of sitting as a second disconnected circle above it
 * — two stacked full circles read as a snowman at icon size, not a ring.
 *
 * Shared with the Lab Diamond Earrings Design Style filter
 * (`EarringDesignStyle`) — 'Classic'/'Halo'/'Nature Inspired' already have
 * cases above and are reused as-is; the earring-only values below (Cluster,
 * Pavé, Tennis, Geometric, Statement) get their own icons rather than being
 * forced onto the ring-band motif, since they aren't rings.
 */
export function DesignStyleIcon({
  style,
  className,
}: {
  style: DesignStyle | EarringDesignStyle
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
  // The band's visible lower arc — open at the top so a stone/setting can
  // cap it without competing with a second full-circle outline.
  const band = <path d="M13 30 A11 11 0 0 1 35 30" />

  switch (style) {
    case 'Solitaire':
      return (
        <svg {...svgProps}>
          {band}
          <circle cx="24" cy="19" r="6" />
          <path d="M28.5 14 L30.5 12 M19.5 14 L17.5 12 M28.5 24 L30.5 26 M19.5 24 L17.5 26" />
        </svg>
      )
    case 'Three Stone':
      return (
        <svg {...svgProps}>
          {band}
          <circle cx="24" cy="19" r="5" />
          <circle cx="14" cy="23" r="3" />
          <circle cx="34" cy="23" r="3" />
        </svg>
      )
    case 'Halo':
      return (
        <svg {...svgProps}>
          {band}
          <circle cx="24" cy="19" r="5" />
          {haloDots(24, 19, 9, 0, 360)}
        </svg>
      )
    case 'Hidden Halo':
      return (
        <svg {...svgProps}>
          {band}
          <circle cx="24" cy="18" r="6" />
          {haloDots(24, 20, 8.5, 110, 250)}
        </svg>
      )
    case 'Cathedral':
      return (
        <svg {...svgProps}>
          {band}
          <path d="M17 28 C17.5 23 19 19.5 21 18" />
          <path d="M31 28 C30.5 23 29 19.5 27 18" />
          <circle cx="24" cy="16" r="5" />
        </svg>
      )
    case 'Accents':
      return (
        <svg {...svgProps}>
          {band}
          <circle cx="24" cy="19" r="5" />
          <circle cx="16" cy="26" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="32" cy="26" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'East West':
      return (
        <svg {...svgProps}>
          {band}
          <ellipse cx="24" cy="19" rx="8.5" ry="4.5" />
        </svg>
      )
    case 'Vintage':
      return (
        <svg {...svgProps}>
          {band}
          <circle cx="24" cy="19" r="5" />
          <path d="M16 25 C13.5 24 13.5 21.5 15 20.5" />
          <path d="M32 25 C34.5 24 34.5 21.5 33 20.5" />
        </svg>
      )
    case 'Classic':
      return (
        <svg {...svgProps}>
          <path d="M13 30 A11 11 0 0 1 35 30" strokeWidth={2.2} />
          <circle cx="24" cy="20" r="4.5" strokeWidth={1.8} />
        </svg>
      )
    case 'Luxe':
      return (
        <svg {...svgProps}>
          {band}
          {haloDots(24, 30, 11, 180, 360, 6)}
          <circle cx="24" cy="18" r="5" />
        </svg>
      )
    case 'Unique':
      return (
        <svg {...svgProps}>
          {band}
          <circle cx="20" cy="19" r="4.5" />
          <circle cx="30" cy="15" r="2.6" />
          <circle cx="31.5" cy="22" r="1.8" />
        </svg>
      )
    case 'Nature Inspired':
      return (
        <svg {...svgProps}>
          {band}
          <circle cx="24" cy="19" r="5" />
          <path d="M15 24 C12.5 21.5 13 17.5 16.5 16.5 C17.5 20 17 22.5 15 24 Z" />
          <path d="M33 24 C35.5 21.5 35 17.5 31.5 16.5 C30.5 20 31 22.5 33 24 Z" />
        </svg>
      )
    case 'Sculptural':
      return (
        <svg {...svgProps}>
          <path d="M12 33 C12 27 17 29 21 26 C25 23 20 19 24 16 C28 19 23 23 27 26 C31 29 36 27 36 33" />
          <circle cx="24" cy="16" r="4" />
        </svg>
      )
    case 'Stacks / Flush':
      return (
        <svg {...svgProps}>
          <rect x="9" y="24" width="30" height="10" rx="5" />
          <circle cx="24" cy="24" r="3.6" />
        </svg>
      )
    case 'Gemstone':
      return (
        <svg {...svgProps}>
          {band}
          <path d="M18 15 L30 15 L34 20 L24 28 L14 20 Z" />
        </svg>
      )
    case 'Cluster':
      return (
        <svg {...svgProps}>
          <circle cx="24" cy="22" r="6" />
          <circle cx="15" cy="27" r="4" />
          <circle cx="33" cy="27" r="4" />
          <circle cx="24" cy="33" r="3.5" />
        </svg>
      )
    case 'Pavé':
      return (
        <svg {...svgProps}>
          {[14, 22, 30].map((cx) =>
            [15, 23, 31].map((cy) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.3" />
            )),
          )}
        </svg>
      )
    case 'Tennis':
      return (
        <svg {...svgProps}>
          <line x1="8" y1="24" x2="40" y2="24" />
          {[12, 18.5, 24, 29.5, 36].map((cx) => (
            <circle key={cx} cx={cx} cy="24" r="3.2" />
          ))}
        </svg>
      )
    case 'Geometric':
      return (
        <svg {...svgProps}>
          <polygon points="24,8 40,24 24,40 8,24" />
          <polygon points="24,17 31,24 24,31 17,24" opacity="0.45" />
        </svg>
      )
    case 'Statement':
      return (
        <svg {...svgProps}>
          <circle cx="24" cy="24" r="10" />
          <path d="M24 6 L24 11 M24 37 L24 42 M6 24 L11 24 M37 24 L42 24" />
        </svg>
      )
    default:
      return null
  }
}

/** A ring of small filled dots — used for halo-style accent stones. */
function haloDots(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
  count = 8,
) {
  const dots = []
  const span = endDeg - startDeg
  const isFullCircle = span >= 360
  const step = isFullCircle ? span / count : span / (count - 1 || 1)
  for (let i = 0; i < count; i++) {
    const deg = startDeg + step * i
    const rad = (deg * Math.PI) / 180
    dots.push(
      <circle
        key={i}
        cx={cx + r * Math.cos(rad)}
        cy={cy + r * Math.sin(rad)}
        r="1.3"
        fill="currentColor"
        stroke="none"
      />,
    )
  }
  return dots
}
