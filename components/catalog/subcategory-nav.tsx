'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SubcategoryNavProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

/** Must match the real row's `gap-x-8` (2rem) so width math lines up. */
const GAP_PX = 32

export function SubcategoryNav({ options, value, onChange }: SubcategoryNavProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const moreMeasureRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [visibleCount, setVisibleCount] = useState(options.length)
  const [moreOpen, setMoreOpen] = useState(false)

  // Recompute synchronously whenever the option set changes (e.g. switching
  // product type), and keep recomputing as the row is resized.
  useLayoutEffect(() => {
    setMoreOpen(false)

    const container = containerRef.current
    if (!container) return

    const recalc = () => {
      const containerWidth = container.offsetWidth
      const allWidth = measureRefs.current['All']?.offsetWidth ?? 0
      const moreWidth = moreMeasureRef.current?.offsetWidth ?? 0

      const fullWidth = options.reduce(
        (sum, s) => sum + GAP_PX + (measureRefs.current[s]?.offsetWidth ?? 0),
        allWidth,
      )

      if (fullWidth <= containerWidth) {
        setVisibleCount(options.length)
        return
      }

      const budget = containerWidth - moreWidth - GAP_PX
      let used = allWidth
      let count = 0
      for (let i = 0; i < options.length; i++) {
        const w = measureRefs.current[options[i]]?.offsetWidth ?? 0
        if (used + GAP_PX + w > budget) break
        used += GAP_PX + w
        count++
      }
      setVisibleCount(count)
    }

    recalc()
    const ro = new ResizeObserver(recalc)
    ro.observe(container)
    return () => ro.disconnect()
  }, [options])

  useEffect(() => {
    if (!moreOpen) return
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [moreOpen])

  const visible = options.slice(0, visibleCount)
  const overflow = options.slice(visibleCount)
  const overflowActive = overflow.includes(value)

  return (
    <>
      {/* Desktop: single-row tabs, overflow collapses into "More" */}
      <div
        ref={containerRef}
        className="relative hidden min-w-0 flex-nowrap items-center gap-x-8 lg:flex"
      >
        <button onClick={() => onChange('All')} className={subTabClass(value === 'All')}>
          All
        </button>
        {visible.map((s) => (
          <button key={s} onClick={() => onChange(s)} className={subTabClass(value === s)}>
            {s}
          </button>
        ))}
        {overflow.length > 0 && (
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className={[subTabClass(overflowActive), 'flex items-center gap-1'].join(' ')}
            >
              More
              <ChevronDown className="size-3" />
            </button>
            {moreOpen && (
              <div className="absolute top-full left-0 z-20 mt-3 min-w-[10rem] border border-border/70 bg-background py-2">
                {overflow.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onChange(s)
                      setMoreOpen(false)
                    }}
                    className={[
                      'block w-full px-4 py-2 text-left text-xs tracking-[0.12em] uppercase transition-colors',
                      value === s ? 'text-foreground' : 'text-foreground/60 hover:text-foreground',
                    ].join(' ')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Off-screen measuring row: same markup, used only to read natural widths */}
        <div
          className="pointer-events-none absolute top-0 left-0 -z-10 flex items-center gap-x-8 opacity-0"
          aria-hidden
        >
          <button
            ref={(el) => {
              measureRefs.current['All'] = el
            }}
            className={subTabClass(false)}
            tabIndex={-1}
          >
            All
          </button>
          {options.map((s) => (
            <button
              key={s}
              ref={(el) => {
                measureRefs.current[s] = el
              }}
              className={subTabClass(false)}
              tabIndex={-1}
            >
              {s}
            </button>
          ))}
          <button
            ref={moreMeasureRef}
            className={[subTabClass(false), 'flex items-center gap-1'].join(' ')}
            tabIndex={-1}
          >
            More
            <ChevronDown className="size-3" />
          </button>
        </div>
      </div>

      {/* Mobile: compact dropdown covering every existing subcategory */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full border border-border/70 bg-background px-4 py-3 text-xs tracking-[0.14em] text-foreground uppercase lg:hidden"
      >
        <option value="All">All</option>
        {options.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </>
  )
}

function subTabClass(active: boolean) {
  return [
    'shrink-0 border-b-2 pb-1 text-xs tracking-[0.16em] whitespace-nowrap uppercase transition-colors',
    active ? 'border-gold text-foreground' : 'border-transparent text-foreground/50 hover:text-foreground/80',
  ].join(' ')
}
