export type Collection = 'Gold' | 'Diamond' | 'Lab Diamond' | 'Watches'
export type Karat = '10K' | '14K' | '18K'
export type ProductType =
  | 'Chains'
  | 'Bracelets'
  | 'Rings'
  | 'Pendants'
  | 'Anklets'
  | 'Timepieces'

export type Construction = 'Solid' | 'Hollow'
export type Cut = 'Diamond-Cut' | 'Regular'
export type MetalColor = 'Yellow' | 'Rose' | 'White'
export type Finish = 'Plain' | 'Two-Tone'

export interface ProductVariant {
  construction: Construction
  /** Surface cut (e.g. diamond-cut vs. plain-drawn wire). Only some chain styles vary on this — omit when a product doesn't. */
  cut?: Cut
  color: MetalColor
  finish: Finish
}

export interface Product {
  slug: string
  name: string
  /** Order-reference code. Gold pieces are priced by weight and don't carry one — only set this for Diamond / Lab Diamond items that actually use one in-store. */
  sku?: string
  collection: Collection
  karat?: Karat
  type: ProductType
  /** Broad browsing group within a type, e.g. "Men's" for Rings or "Fancy" for Chains. */
  subcategory?: string
  /** Exact style shown on the product card image badge, e.g. "Rope" or "Miami Cuban". */
  style?: string
  weight: string
  image: string
  gallery?: string[]
  description: string
  specs: { label: string; value: string }[]
  /** Standard lengths this style is stocked in, e.g. ['16"', '18"', '20"']. Only some product types (chains) use this. */
  lengths?: string[]
  /** Construction × color × finish combinations actually offered. Only include combos that exist — a product with no variants is assumed to come in one form. */
  variants?: ProductVariant[]
}

export const collections: {
  name: Collection
  tagline: string
  image: string
  count: number
}[] = [
  {
    name: 'Gold',
    tagline: 'Solid 10K & 14K chains, bracelets and more',
    image: '/images/collection-gold.png',
    count: 48,
  },
  {
    name: 'Diamond',
    tagline: 'Natural diamonds set in 10K, 14K & 18K gold',
    image: '/images/collection-diamond.png',
    count: 32,
  },
  {
    name: 'Lab Diamond',
    tagline: 'Ethically grown brilliance, exceptional value',
    image: '/images/collection-lab-diamond.png',
    count: 24,
  },
  {
    name: 'Watches',
    tagline: 'Refined timepieces for the discerning buyer',
    image: '/images/product-watch.png',
    count: 18,
  },
]

export const goldKarats: Karat[] = ['10K', '14K']
export const diamondKarats: Karat[] = ['10K', '14K', '18K']
export const productTypes: ProductType[] = [
  'Chains',
  'Bracelets',
  'Rings',
  'Pendants',
  'Anklets',
  'Timepieces',
]

/**
 * Browsing groups shown as chips above the product grid once a shopper has
 * narrowed to a single product type. Only types listed here get the extra
 * layer — anything absent just shows its full list, unbroken.
 */
export const subcategoriesByType: Partial<Record<ProductType, string[]>> = {
  Rings: ["Men's", "Women's", 'Fancy', 'Engagement'],
  Chains: ['Fancy', 'Assorted'],
  Bracelets: ['Regular', 'Fancy', 'ID', 'Child ID'],
}

export const products: Product[] = [
  {
    slug: 'cuban-link-chain-14k',
    name: 'Cuban Link Chain',
    collection: 'Gold',
    karat: '14K',
    type: 'Chains',
    subcategory: 'Assorted',
    style: 'Miami Cuban',
    weight: '42.6 g',
    image: '/images/products/cuban-link-chain-14k.jpg',
    description:
      'A substantial solid 14K yellow gold Cuban link chain with a high-polish finish. A cornerstone wholesale piece with consistent link geometry and a secure box clasp.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Width range', value: '4 mm – 8 mm' },
      { label: 'Construction', value: 'Solid' },
      { label: 'Clasp', value: 'Box with safety' },
      { label: 'Finish', value: 'High polish' },
    ],
    lengths: ['16"', '18"', '20"', '22"', '24"'],
  },
  {
    slug: 'rope-chain-10k',
    name: 'Rope Chain',
    collection: 'Gold',
    karat: '10K',
    type: 'Chains',
    subcategory: 'Fancy',
    style: 'Rope',
    weight: 'Varies by size & construction',
    image: '/images/product-gold-chain.png',
    description:
      'A classic 10K rope chain, available solid or hollow, diamond-cut for extra sparkle or in a regular finish. Solid regular comes in yellow, rose or white; diamond-cut and hollow are yellow only. A versatile, fast-moving wholesale staple.',
    specs: [
      { label: 'Metal', value: '10K Gold' },
      { label: 'Width range', value: '2 mm – 4 mm' },
      { label: 'Clasp', value: 'Lobster' },
    ],
    lengths: ['16"', '18"', '20"', '22"', '24"'],
    variants: [
      { construction: 'Solid', cut: 'Regular', color: 'Yellow', finish: 'Plain' },
      { construction: 'Solid', cut: 'Regular', color: 'Rose', finish: 'Plain' },
      { construction: 'Solid', cut: 'Regular', color: 'White', finish: 'Plain' },
      { construction: 'Solid', cut: 'Diamond-Cut', color: 'Yellow', finish: 'Plain' },
      { construction: 'Hollow', cut: 'Regular', color: 'Yellow', finish: 'Plain' },
      { construction: 'Hollow', cut: 'Diamond-Cut', color: 'Yellow', finish: 'Plain' },
    ],
  },
  {
    slug: 'figaro-bracelet-10k',
    name: 'Figaro Link Bracelet',
    collection: 'Gold',
    karat: '10K',
    type: 'Bracelets',
    subcategory: 'Regular',
    weight: '9.4 g',
    image: '/images/product-gold-bracelet.png',
    description:
      'Classic 10K Figaro link bracelet with alternating link pattern. Lightweight yet durable, ideal for everyday retail assortments.',
    specs: [
      { label: 'Metal', value: '10K Yellow Gold' },
      { label: 'Width range', value: '3 mm – 6 mm' },
      { label: 'Construction', value: 'Solid' },
      { label: 'Clasp', value: 'Lobster' },
      { label: 'Finish', value: 'High polish' },
    ],
    lengths: ['7"', '7.5"', '8"', '8.5"'],
  },
  {
    slug: 'franco-id-bracelet-14k',
    name: 'Franco ID Bracelet',
    collection: 'Gold',
    karat: '14K',
    type: 'Bracelets',
    subcategory: 'ID',
    style: 'Franco',
    weight: 'Varies by size & construction',
    image: '/images/products/franco-id-bracelet-14k.jpg',
    description:
      'A 14K ID bracelet with a smooth, engravable plate. Offered solid or hollow, in plain or two-tone yellow gold.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Width range', value: '6 mm – 10 mm' },
      { label: 'Plate', value: 'Smooth, engravable' },
      { label: 'Clasp', value: 'Box with safety' },
    ],
    lengths: ['7"', '7.5"', '8"'],
    variants: [
      { construction: 'Solid', color: 'Yellow', finish: 'Plain' },
      { construction: 'Solid', color: 'Yellow', finish: 'Two-Tone' },
      { construction: 'Hollow', color: 'Yellow', finish: 'Plain' },
      { construction: 'Hollow', color: 'Yellow', finish: 'Two-Tone' },
    ],
  },
  {
    slug: 'franco-child-id-bracelet-14k',
    name: 'Franco Child ID Bracelet',
    collection: 'Gold',
    karat: '14K',
    type: 'Bracelets',
    subcategory: 'Child ID',
    style: 'Franco',
    weight: 'Varies by size & construction',
    image: '/images/products/franco-child-id-bracelet-14k.jpg',
    description:
      'A 14K Franco-link ID bracelet sized for children, with a smooth, engravable plate. Offered solid or hollow, in plain or two-tone yellow gold.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Width range', value: '5 mm – 8 mm' },
      { label: 'Plate', value: 'Smooth, engravable' },
      { label: 'Clasp', value: 'Box with safety' },
    ],
    lengths: ['5.5"', '6"', '6.5"'],
    variants: [
      { construction: 'Solid', color: 'Yellow', finish: 'Plain' },
      { construction: 'Solid', color: 'Yellow', finish: 'Two-Tone' },
      { construction: 'Hollow', color: 'Yellow', finish: 'Plain' },
      { construction: 'Hollow', color: 'Yellow', finish: 'Two-Tone' },
    ],
  },
  {
    slug: 'evil-eye-bracelet-14k',
    name: 'Evil Eye Bracelet',
    collection: 'Gold',
    karat: '14K',
    type: 'Bracelets',
    subcategory: 'Fancy',
    style: 'Evil Eye',
    weight: '2.1 g',
    image: '/images/product-gold-bracelet.png',
    description:
      'A 14K gold bracelet with an evil eye charm, on a delicate chain. A fast-moving fancy piece for retail counters.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Length', value: '8"' },
      { label: 'Clasp', value: 'Lobster' },
      { label: 'Finish', value: 'High polish' },
    ],
  },
  {
    slug: 'signet-ring-14k',
    name: 'Polished Signet Ring',
    collection: 'Gold',
    karat: '14K',
    type: 'Rings',
    subcategory: "Men's",
    weight: '7.1 g',
    image: '/images/product-gold-ring.png',
    description:
      'A timeless 14K gold signet ring with a smooth, engravable face. A dependable wholesale piece with strong margins.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Face', value: '12 mm oval' },
      { label: 'Sizing', value: 'US 6 – 12' },
      { label: 'Finish', value: 'High polish' },
      { label: 'Engravable', value: 'Yes' },
    ],
  },
  {
    slug: 'franco-chain-14k',
    name: 'Franco Chain',
    collection: 'Gold',
    karat: '14K',
    type: 'Chains',
    subcategory: 'Assorted',
    style: 'Franco',
    weight: 'Varies by size & construction',
    image: '/images/product-gold-chain.png',
    description:
      'A 14K Franco chain with a tight, square-woven link pattern. Offered solid in yellow, rose or white — plain or two-tone — and hollow in yellow plain only.',
    specs: [
      { label: 'Metal', value: '14K Gold' },
      { label: 'Width range', value: '2 mm – 5 mm' },
      { label: 'Clasp', value: 'Box with safety' },
      { label: 'Finish', value: 'High polish' },
    ],
    lengths: ['16"', '18"', '20"', '22"', '24"'],
    variants: [
      { construction: 'Solid', color: 'Yellow', finish: 'Plain' },
      { construction: 'Solid', color: 'Yellow', finish: 'Two-Tone' },
      { construction: 'Solid', color: 'Rose', finish: 'Plain' },
      { construction: 'Solid', color: 'Rose', finish: 'Two-Tone' },
      { construction: 'Solid', color: 'White', finish: 'Plain' },
      { construction: 'Solid', color: 'White', finish: 'Two-Tone' },
      { construction: 'Hollow', color: 'Yellow', finish: 'Plain' },
    ],
  },
  {
    slug: 'paperclip-chain-14k',
    name: 'Paperclip Chain',
    collection: 'Gold',
    karat: '14K',
    type: 'Chains',
    subcategory: 'Fancy',
    style: 'Paperclip',
    weight: '15.8 g',
    image: '/images/product-gold-chain.png',
    description:
      'An elongated 14K yellow gold paperclip chain with a bold, modern link silhouette. A fast-moving fashion-forward piece.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Width range', value: '3 mm – 6 mm' },
      { label: 'Construction', value: 'Solid' },
      { label: 'Clasp', value: 'Lobster' },
      { label: 'Finish', value: 'High polish' },
    ],
    lengths: ['16"', '18"', '20"', '22"', '24"'],
  },
  {
    slug: 'eternity-band-14k',
    name: 'Eternity Band',
    collection: 'Gold',
    karat: '14K',
    type: 'Rings',
    subcategory: "Women's",
    weight: '3.6 g',
    image: '/images/products/eternity-band-14k.jpg',
    description:
      'A slim 14K yellow gold eternity band with a smooth polished profile. A versatile stacking piece for everyday wholesale assortments.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Width', value: '2 mm' },
      { label: 'Sizing', value: 'US 4 – 9' },
      { label: 'Finish', value: 'High polish' },
    ],
  },
  {
    slug: 'nugget-ring-14k',
    name: 'Nugget Ring',
    collection: 'Gold',
    karat: '14K',
    type: 'Rings',
    subcategory: 'Fancy',
    weight: '6.9 g',
    image: '/images/product-gold-ring.png',
    description:
      'A textured 14K yellow gold nugget ring with an organic, hand-forged look. A distinctive fancy piece that stands out in a case.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Face', value: '14 mm freeform' },
      { label: 'Sizing', value: 'US 6 – 12' },
      { label: 'Finish', value: 'Textured, brushed' },
    ],
  },
  {
    slug: 'engagement-mounting-14k',
    name: 'Solitaire Engagement Mounting',
    collection: 'Gold',
    karat: '14K',
    type: 'Rings',
    subcategory: 'Engagement',
    weight: '2.8 g',
    image: '/images/product-gold-ring.png',
    description:
      'A 14K yellow gold four-prong solitaire mounting, sold stone-ready. A steady wholesale seller for retail engagement counters.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Setting', value: 'Four-prong solitaire' },
      { label: 'Center stone', value: 'Sold separately' },
      { label: 'Sizing', value: 'US 4 – 9' },
    ],
  },
  {
    slug: 'cross-pendant-14k',
    name: 'Beveled Cross Pendant',
    collection: 'Gold',
    karat: '14K',
    type: 'Pendants',
    weight: '4.8 g',
    image: '/images/product-gold-pendant.png',
    description:
      'A clean, beveled 14K gold cross pendant with a bright polished surface. Sold as pendant only; pair with any chain in the collection.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Height', value: '28 mm' },
      { label: 'Width', value: '18 mm' },
      { label: 'Bail', value: '4 mm' },
      { label: 'Finish', value: 'High polish' },
    ],
  },
  {
    slug: 'beaded-anklet-10k',
    name: 'Beaded Anklet',
    collection: 'Gold',
    karat: '10K',
    type: 'Anklets',
    weight: '3.2 g',
    image: '/images/product-gold-anklet.png',
    description:
      'A delicate 10K gold beaded anklet with an adjustable length. A charming seasonal addition to any wholesale order.',
    specs: [
      { label: 'Metal', value: '10K Yellow Gold' },
      { label: 'Length', value: '9 – 10 in adjustable' },
      { label: 'Bead', value: '2 mm' },
      { label: 'Clasp', value: 'Spring ring' },
      { label: 'Finish', value: 'High polish' },
    ],
  },
  {
    slug: 'diamond-cluster-ring-18k',
    name: 'Diamond Cluster Ring',
    sku: 'AU-DR-1807',
    collection: 'Diamond',
    karat: '18K',
    type: 'Rings',
    weight: '5.6 g',
    image: '/images/product-diamond-ring.png',
    description:
      'An 18K gold cluster ring set with brilliant-cut natural diamonds in a micro-pavé arrangement. A premium showpiece for elevated assortments.',
    specs: [
      { label: 'Metal', value: '18K Gold' },
      { label: 'Diamonds', value: '0.85 ctw, natural' },
      { label: 'Color / Clarity', value: 'G–H / VS' },
      { label: 'Sizing', value: 'US 6 – 9' },
      { label: 'Setting', value: 'Micro-pavé' },
    ],
  },
  {
    slug: 'diamond-pendant-14k',
    name: 'Pavé Diamond Pendant',
    sku: 'AU-DP-1408',
    collection: 'Diamond',
    karat: '14K',
    type: 'Pendants',
    weight: '3.9 g',
    image: '/images/product-diamond-pendant.png',
    description:
      'A 14K gold pendant fully set with natural pavé diamonds. Sold as pendant only; a refined focal piece for layering.',
    specs: [
      { label: 'Metal', value: '14K Gold' },
      { label: 'Diamonds', value: '0.42 ctw, natural' },
      { label: 'Color / Clarity', value: 'G–H / SI' },
      { label: 'Height', value: '16 mm' },
      { label: 'Setting', value: 'Pavé' },
    ],
  },
  {
    slug: 'lab-diamond-tennis-bracelet',
    name: 'Lab Diamond Tennis Bracelet',
    sku: 'AU-LD-1409',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Bracelets',
    weight: '8.7 g',
    image: '/images/collection-lab-diamond.png',
    description:
      'A 14K white gold tennis bracelet lined with brilliant lab-grown diamonds. Exceptional sparkle and value for volume buyers.',
    specs: [
      { label: 'Metal', value: '14K White Gold' },
      { label: 'Diamonds', value: '3.00 ctw, lab-grown' },
      { label: 'Color / Clarity', value: 'F–G / VS' },
      { label: 'Length', value: '7 in / 18 cm' },
      { label: 'Clasp', value: 'Box with safety' },
    ],
  },
  {
    slug: 'lab-diamond-solitaire-pendant',
    name: 'Lab Diamond Solitaire Pendant',
    sku: 'AU-LD-1410',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Pendants',
    weight: '2.4 g',
    image: '/images/collection-diamond.png',
    description:
      'A single brilliant lab-grown diamond set in a 14K gold four-prong pendant. Clean, classic and highly sellable.',
    specs: [
      { label: 'Metal', value: '14K Gold' },
      { label: 'Diamond', value: '1.00 ct, lab-grown' },
      { label: 'Color / Clarity', value: 'E / VVS' },
      { label: 'Setting', value: 'Four-prong' },
      { label: 'Bail', value: '3 mm' },
    ],
  },
  {
    slug: 'gold-dress-watch',
    name: 'Gold Dress Timepiece',
    sku: 'AU-WT-1411',
    collection: 'Watches',
    type: 'Timepieces',
    weight: '62 g',
    image: '/images/product-watch.png',
    description:
      'A refined gold-tone dress watch with a clean dial and genuine leather strap. Quartz movement, presented in trade packaging.',
    specs: [
      { label: 'Case', value: '40 mm gold-tone' },
      { label: 'Movement', value: 'Swiss quartz' },
      { label: 'Dial', value: 'Ivory, applied indices' },
      { label: 'Strap', value: 'Genuine leather' },
      { label: 'Water resist', value: '3 ATM' },
    ],
  },
  {
    slug: 'automatic-gold-watch',
    name: 'Automatic Gold Timepiece',
    sku: 'AU-WT-1412',
    collection: 'Watches',
    type: 'Timepieces',
    weight: '78 g',
    image: '/images/product-watch.png',
    description:
      'An automatic gold-tone timepiece with an exhibition detailing and integrated bracelet. A statement piece for premium counters.',
    specs: [
      { label: 'Case', value: '42 mm gold-tone' },
      { label: 'Movement', value: 'Automatic' },
      { label: 'Dial', value: 'Champagne sunray' },
      { label: 'Bracelet', value: 'Integrated link' },
      { label: 'Water resist', value: '5 ATM' },
    ],
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getRelated(product: Product, limit = 3) {
  return products
    .filter((p) => p.slug !== product.slug && p.collection === product.collection)
    .concat(products.filter((p) => p.collection !== product.collection))
    .slice(0, limit)
}
