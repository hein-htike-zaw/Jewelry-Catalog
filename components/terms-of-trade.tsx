'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

const TERMS = [
  {
    title: 'Trade Accounts',
    body: 'Melano Creation sells to the trade only. A valid business license, resale certificate or tax ID is required to open an account and view wholesale pricing. Accounts are reviewed and approved before the first order.',
  },
  {
    title: 'Minimum Orders & Pricing',
    body: 'Wholesale pricing is quoted per piece and scales with volume. Opening orders are subject to a minimum order value. Quoted prices are held for 14 days and may adjust with the daily gold and diamond markets.',
  },
  {
    title: 'Payment Terms',
    body: 'First orders are prepaid by wire or card. Established accounts in good standing may apply for Net 30 terms. Custom and made-to-order pieces require a 50% deposit before production begins.',
  },
  {
    title: 'Shipping & Insurance',
    body: 'All shipments are fully insured in transit and require an adult signature on delivery. Title passes to the buyer on delivery. Risk of loss is covered by our carrier insurance until the package is signed for.',
  },
  {
    title: 'Returns & Authenticity',
    body: 'Every piece is guaranteed as described for metal purity and stone specification. Stock items may be returned within 10 days in original condition for exchange or credit. Custom and engraved pieces are final sale.',
  },
]

export function TermsOfTrade() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer text-left transition-colors hover:text-foreground"
      >
        Terms of Trade
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setOpen(false)} />
          <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col border border-border/70 bg-background">
            <div className="flex items-start justify-between border-b border-border/70 px-8 pt-8 pb-6 lg:px-10">
              <div>
                <p className="text-xs tracking-luxe text-gold-foreground uppercase">
                  Melano Creation
                </p>
                <h3 className="mt-3 font-serif text-3xl text-foreground">
                  Terms of Trade
                </h3>
              </div>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-8 py-7 lg:px-10">
              <dl className="space-y-6">
                {TERMS.map((term) => (
                  <div key={term.title}>
                    <dt className="text-xs tracking-[0.14em] text-foreground uppercase">
                      {term.title}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {term.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t border-border/70 px-8 py-6 lg:px-10">
              <button
                onClick={() => setOpen(false)}
                className="w-full bg-foreground py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90 sm:w-auto sm:px-10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
