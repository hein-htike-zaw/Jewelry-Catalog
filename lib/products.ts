export type Collection = 'Gold' | 'Diamond' | 'Lab Diamond' | 'Watches'
export type Karat = '10K' | '14K' | '18K'
export type ProductType =
  | 'Chains'
  | 'Bracelets'
  | 'Rings'
  | 'Pendants'
  | 'Anklets'
  | 'Timepieces'

export interface Product {
  slug: string
  name: string
  sku: string
  collection: Collection
  karat?: Karat
  type: ProductType
  weight: string
  image: string
  gallery?: string[]
  description: string
  specs: { label: string; value: string }[]
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
    image: '/images/collection-watches.png',
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

export const products: Product[] = [
  {
    slug: 'cuban-link-chain-14k',
    name: 'Cuban Link Chain',
    sku: 'AU-CH-1401',
    collection: 'Gold',
    karat: '14K',
    type: 'Chains',
    weight: '42.6 g',
    image: '/images/product-gold-chain.png',
    description:
      'A substantial solid 14K yellow gold Cuban link chain with a high-polish finish. A cornerstone wholesale piece with consistent link geometry and a secure box clasp.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Length', value: '20 in / 51 cm' },
      { label: 'Width', value: '6.5 mm' },
      { label: 'Clasp', value: 'Box with safety' },
      { label: 'Finish', value: 'High polish' },
    ],
  },
  {
    slug: 'rope-chain-10k',
    name: 'Diamond-Cut Rope Chain',
    sku: 'AU-CH-1002',
    collection: 'Gold',
    karat: '10K',
    type: 'Chains',
    weight: '18.2 g',
    image: '/images/product-gold-chain.png',
    description:
      'A brilliant diamond-cut 10K rope chain that catches light from every angle. A versatile, fast-moving wholesale staple.',
    specs: [
      { label: 'Metal', value: '10K Yellow Gold' },
      { label: 'Length', value: '22 in / 56 cm' },
      { label: 'Width', value: '3 mm' },
      { label: 'Clasp', value: 'Lobster' },
      { label: 'Finish', value: 'Diamond-cut' },
    ],
  },
  {
    slug: 'figaro-bracelet-10k',
    name: 'Figaro Link Bracelet',
    sku: 'AU-BR-1003',
    collection: 'Gold',
    karat: '10K',
    type: 'Bracelets',
    weight: '9.4 g',
    image: '/images/product-gold-bracelet.png',
    description:
      'Classic 10K Figaro link bracelet with alternating link pattern. Lightweight yet durable, ideal for everyday retail assortments.',
    specs: [
      { label: 'Metal', value: '10K Yellow Gold' },
      { label: 'Length', value: '8 in / 20 cm' },
      { label: 'Width', value: '5 mm' },
      { label: 'Clasp', value: 'Lobster' },
      { label: 'Finish', value: 'High polish' },
    ],
  },
  {
    slug: 'signet-ring-14k',
    name: 'Polished Signet Ring',
    sku: 'AU-RG-1404',
    collection: 'Gold',
    karat: '14K',
    type: 'Rings',
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
    slug: 'cross-pendant-14k',
    name: 'Beveled Cross Pendant',
    sku: 'AU-PD-1405',
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
    sku: 'AU-AN-1006',
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
    image: '/images/collection-watches.png',
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
