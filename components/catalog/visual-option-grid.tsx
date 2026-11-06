'use client'

import { useState, type ReactNode } from 'react'

/**
 * Same toggle-a-value-in-an-array contract as the plain checkbox FilterGroup
 * rows elsewhere in the sidebar — this only changes how each option is
 * displayed (icon tile instead of a checkbox row), never what the selected
 * values mean to the filtering logic.
 */
export function VisualOptionGrid<T extends string>({
  options,
  selected,
  onToggle,
  renderIcon,
  initialCount = 8,
}: {
  options: T[]
  selected: T[]
  onToggle: (value: T) => void
  renderIcon: (value: T) => ReactNode
  initialCount?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = options.length > initialCount
  const visible = expanded ? options : options.slice(0, initialCount)

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 lg:grid-cols-3">
        {visible.map((option) => {
          const isSelected = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              aria-pressed={isSelected}
              className={[
                'flex flex-col items-center gap-1.5 border px-1 py-2.5 text-center transition-colors',
                isSelected
                  ? 'border-gold bg-gold/5'
                  : 'border-border/70 hover:border-foreground/40',
              ].join(' ')}
            >
              <span className={isSelected ? 'text-gold-foreground' : 'text-foreground/50'}>
                {renderIcon(option)}
              </span>
              <span
                className={[
                  'text-[10px] leading-tight tracking-[0.06em] uppercase',
                  isSelected ? 'text-foreground' : 'text-foreground/60',
                ].join(' ')}
              >
                {option}
              </span>
            </button>
          )
        })}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-3 text-xs tracking-[0.16em] text-gold-foreground uppercase underline-offset-4 hover:underline"
        >
          {expanded ? 'Show less' : `Show more (${options.length - initialCount})`}
        </button>
      )}
    </div>
  )
}
