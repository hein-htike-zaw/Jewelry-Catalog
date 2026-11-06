'use client'

import { useState } from 'react'
import { X, Check } from 'lucide-react'
import type { Product } from '@/lib/products'

export function InquiryDialog({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const close = () => {
    setOpen(false)
    setTimeout(() => setSubmitted(false), 300)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-foreground py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
      >
        Request Wholesale Quote
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50" onClick={close} />
          <div className="relative w-full max-w-lg border border-border/70 bg-background p-8 lg:p-10">
            <button
              aria-label="Close"
              onClick={close}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            {submitted ? (
              <div className="py-10 text-center">
                <span className="mx-auto flex size-14 items-center justify-center border border-gold">
                  <Check className="size-6 text-gold-foreground" />
                </span>
                <h3 className="mt-6 font-serif text-3xl text-foreground">
                  Inquiry received
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Our trade team will respond with wholesale pricing for{' '}
                  <span className="text-foreground">{product.name}</span> within
                  one business day.
                </p>
                <button
                  onClick={close}
                  className="mt-8 border border-foreground/80 px-8 py-3 text-xs tracking-[0.16em] text-foreground uppercase hover:bg-foreground hover:text-primary-foreground"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs tracking-luxe text-gold-foreground uppercase">
                  Wholesale Inquiry
                </p>
                <h3 className="mt-3 font-serif text-3xl text-foreground">
                  {product.name}
                </h3>
                {product.sku && (
                  <p className="mt-1 text-xs tracking-[0.12em] text-muted-foreground uppercase">
                    SKU {product.sku}
                  </p>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                  className="mt-7 space-y-4"
                >
                  <Field label="Business Name" name="business" />
                  <Field label="Contact Name" name="name" />
                  <Field label="Email" name="email" type="email" />
                  <div>
                    <label className="mb-2 block text-xs tracking-[0.14em] text-muted-foreground uppercase">
                      Estimated Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      defaultValue={1}
                      className="w-full border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-foreground"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-foreground py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function Field({
  label,
  name,
  type = 'text',
}: {
  label: string
  name: string
  type?: string
}) {
  return (
    <div>
      <label className="mb-2 block text-xs tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        className="w-full border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-foreground"
      />
    </div>
  )
}
