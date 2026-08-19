'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const nav = [
  { label: 'Collections', href: '/catalog' },
  { label: 'Gold', href: '/catalog?collection=Gold' },
  { label: 'Diamond', href: '/catalog?collection=Diamond' },
  { label: 'Lab Diamond', href: '/catalog?collection=Lab+Diamond' },
  { label: 'Watches', href: '/catalog?collection=Watches' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl font-semibold tracking-wide text-foreground">
            MELANO CREATION
          </span>
          <span className="mt-0.5 text-[10px] tracking-luxe text-muted-foreground">
            WHOLESALE FINE JEWELRY
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs tracking-[0.18em] text-foreground/70 uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/catalog"
            className="border border-foreground/80 px-6 py-2.5 text-xs tracking-[0.18em] text-foreground uppercase transition-colors hover:bg-foreground hover:text-primary-foreground"
          >
            Trade Inquiry
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/50 py-3 text-sm tracking-[0.14em] text-foreground/80 uppercase last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/catalog"
              onClick={() => setOpen(false)}
              className="mt-4 bg-foreground px-6 py-3 text-center text-xs tracking-[0.18em] text-primary-foreground uppercase"
            >
              Trade Inquiry
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
