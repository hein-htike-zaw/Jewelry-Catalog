export type Collection = 'Gold' | 'Diamond' | 'Lab Diamond' | 'Watches'
export type Karat = '10K' | '14K'
export type ProductType =
  | 'Chains'
  | 'Bracelets'
  | 'Rings'
  | 'Pendants'
  | 'Anklets'
  | 'Timepieces'
  | 'Earrings'

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

/** Only meaningful for `type: 'Rings'` within the Lab Diamond collection. */
export type RingType = 'Engagement' | 'Wedding Band'

/**
 * Customer-facing "Design Style" filter — the ring's overall design/stone
 * arrangement, independent of how the diamond is physically secured (see
 * `SettingType`). Engagement rings only.
 */
export type DesignStyle =
  | 'Solitaire'
  | 'Three Stone'
  | 'Halo'
  | 'Hidden Halo'
  | 'Cathedral'
  | 'Accents'
  | 'East West'
  | 'Vintage'
  | 'Classic'
  | 'Luxe'
  | 'Unique'
  | 'Nature Inspired'
  | 'Sculptural'
  | 'Stacks / Flush'
  | 'Gemstone'

/**
 * Customer-facing "Setting Type" filter — how the center diamond is
 * physically secured. Independent of `DesignStyle`: a ring can be, e.g.,
 * Oval + Solitaire + Bezel. Engagement rings only. Kept to the setting
 * methods actually attested in current product data — add more only when a
 * product needs them.
 */
export type SettingType = 'Prong' | 'Bezel' | 'Channel'

/** Customer-facing "Band Style" filter — wedding bands only. */
export type BandStyle = 'Plain' | 'Pavé' | 'Half Eternity' | 'Full Eternity' | 'Channel' | 'Bezel'

export type DiamondShape =
  | 'Round'
  | 'Oval'
  | 'Emerald'
  | 'Cushion'
  | 'Elongated Cushion'
  | 'Pear'
  | 'Radiant'
  | 'Princess'
  | 'Marquise'
  | 'Asscher'
  | 'Heart'

/** 'None' covers plain metal bands that don't carry a diamond at all. */
export type DiamondType = 'Lab-Grown' | 'Natural' | 'None'

/** Customer-facing "Earring Style" filter — physical type of earring. Lab Diamond and natural Diamond earrings. */
export type EarringStyle = 'Stud' | 'Hoop' | 'Huggie' | 'Drop'

/**
 * Customer-facing "Design Style" filter for earrings — the overall visual
 * concept, independent of `EarringStyle` (what type of earring it is) and
 * `SettingType` (how the diamond is secured). Kept separate from the ring
 * `DesignStyle` type since the two vocabularies genuinely differ (e.g.
 * 'Cluster'/'Tennis' don't apply to rings, 'Solitaire'/'Cathedral' don't
 * apply to earrings) — a Stud can be Halo, a Huggie can be Pavé, etc.
 */
export type EarringDesignStyle =
  | 'Classic'
  | 'Halo'
  | 'Cluster'
  | 'Pavé'
  | 'Tennis'
  | 'Nature Inspired'
  | 'Geometric'
  | 'Statement'

/**
 * Diamond shapes for earrings — the same vocabulary as ring `DiamondShape`
 * plus 'Baguette' (common on earrings, not currently used by any ring), minus
 * 'Elongated Cushion' (not currently used by any earring). Kept as its own
 * type rather than reusing `DiamondShape` directly so adding 'Baguette' here
 * can't leak into the Engagement Ring Diamond Shape filter.
 */
export type EarringDiamondShape = Exclude<DiamondShape, 'Elongated Cushion'> | 'Baguette'

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
  /** Engagement vs. Wedding Band — only set for `collection: 'Lab Diamond'`, `type: 'Rings'`. */
  ringType?: RingType
  /** Overall design/stone arrangement. Engagement rings only. */
  designStyle?: DesignStyle
  /** How the center diamond is physically secured. Engagement Rings and Lab/natural Diamond Earrings. */
  settingType?: SettingType
  /** Wedding bands only. */
  bandStyle?: BandStyle
  /** Omit when the product carries no diamond shape info (e.g. use `diamondType: 'None'` instead). */
  diamondShape?: DiamondShape
  diamondType?: DiamondType
  /** Center-stone carat weight. Rings only — earrings use `totalCaratWeight` instead (see below). */
  carat?: number
  /** GIA-style color grade, e.g. "E". Shared across Lab Diamond and natural Diamond product types. */
  diamondColor?: string
  /** GIA-style clarity grade, e.g. "VS1". Shared across Lab Diamond and natural Diamond product types. */
  clarity?: string
  /** Lab Diamond pieces only use Yellow/White — never set this to 'Rose' for that collection. Natural Diamond pieces may use any MetalColor. */
  goldColor?: MetalColor
  /** Accent/melee stone color when it differs from the gold, e.g. "Pink". Kept separate from goldColor on purpose. */
  accentStoneColor?: string
  /** Physical earring type (Stud/Hoop/Huggie/Drop). Lab Diamond and natural Diamond earrings. */
  earringStyle?: EarringStyle
  /** Overall design concept for earrings — independent of `earringStyle` and `settingType`. Lab Diamond and natural Diamond earrings. */
  earringDesignStyle?: EarringDesignStyle
  /** Diamond shape for earrings — a separate vocabulary from ring `diamondShape` (adds 'Baguette'). Omit when a piece mixes shapes rather than invent a single one that doesn't fit. */
  earringDiamondShape?: EarringDiamondShape
  /**
   * Total diamond weight across the whole piece (both earrings in the pair),
   * in carats — e.g. 1.00 means "1.00 CTW" for the pair. Deliberately a
   * separate field from `carat` (a ring's single center stone) so the two
   * are never confused. Earrings only.
   */
  totalCaratWeight?: number
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
    tagline: 'Natural diamonds set in 10K & 14K gold',
    image: '/images/collection-diamond.png',
    count: 32,
  },
  {
    name: 'Lab Diamond',
    tagline: 'Ethically grown brilliance, exceptional value',
    image: '/images/collection-lab-diamond.png',
    count: 13,
  },
  {
    name: 'Watches',
    tagline: 'Refined timepieces for the discerning buyer',
    image: '/images/product-watch.png',
    count: 18,
  },
]

export const goldKarats: Karat[] = ['10K', '14K']
export const diamondKarats: Karat[] = ['10K', '14K']
export const productTypes: ProductType[] = [
  'Chains',
  'Bracelets',
  'Rings',
  'Pendants',
  'Anklets',
  'Timepieces',
  'Earrings',
]

export const ringTypes: RingType[] = ['Engagement', 'Wedding Band']

export const designStyles: DesignStyle[] = [
  'Solitaire',
  'Three Stone',
  'Halo',
  'Hidden Halo',
  'Cathedral',
  'Accents',
  'East West',
  'Vintage',
  'Classic',
  'Luxe',
  'Unique',
  'Nature Inspired',
  'Sculptural',
  'Stacks / Flush',
  'Gemstone',
]

export const settingTypes: SettingType[] = ['Prong', 'Bezel', 'Channel']

export const bandStyles: BandStyle[] = [
  'Plain',
  'Pavé',
  'Half Eternity',
  'Full Eternity',
  'Channel',
  'Bezel',
]

export const diamondShapes: DiamondShape[] = [
  'Round',
  'Oval',
  'Emerald',
  'Cushion',
  'Elongated Cushion',
  'Pear',
  'Radiant',
  'Princess',
  'Marquise',
  'Asscher',
  'Heart',
]

/** Lab Diamond pieces only ever come in these two — no Rose Gold in this collection. */
export const labDiamondGoldColors: MetalColor[] = ['Yellow', 'White']

/** Natural Diamond pieces aren't restricted like Lab Diamond — all three gold colors apply. */
export const diamondGoldColors: MetalColor[] = ['Yellow', 'Rose', 'White']

export const earringStyles: EarringStyle[] = ['Stud', 'Hoop', 'Huggie', 'Drop']

export const earringDesignStyles: EarringDesignStyle[] = [
  'Classic',
  'Halo',
  'Cluster',
  'Pavé',
  'Tennis',
  'Nature Inspired',
  'Geometric',
  'Statement',
]

export const earringDiamondShapes: EarringDiamondShape[] = [
  'Round',
  'Oval',
  'Pear',
  'Emerald',
  'Cushion',
  'Radiant',
  'Princess',
  'Marquise',
  'Asscher',
  'Heart',
  'Baguette',
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
  // Diamond > Earrings — same taxonomy as Lab Diamond Earrings (Earring
  // Style / Design Style / Setting Type / Diamond Shape / Total Carat
  // Weight / Diamond Color / Clarity / Gold Color), reusing those shared
  // types and option lists, but with diamondType: 'Natural', karat varying
  // between 10K and 14K (natural Diamond isn't 14K-only like Lab Diamond),
  // and the full Yellow/Rose/White gold range (no Rose restriction here).
  // Illustrative mock products, same status as the rest of this file.
  {
    slug: 'diamond-halo-stud-earrings',
    name: 'Natural Halo Stud Earrings',
    sku: 'AU-DE-4001',
    collection: 'Diamond',
    karat: '14K',
    type: 'Earrings',
    weight: '3.0 g',
    image: '/placeholder.svg',
    description:
      'A 14K yellow gold pair of halo stud earrings, each centered on a round brilliant natural diamond surrounded by a halo of smaller pavé diamonds.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Total Carat Weight', value: '1.00 CTW' },
      { label: 'Diamond', value: 'Natural, Round' },
      { label: 'Color / Clarity', value: 'H / SI1' },
      { label: 'Earring Style', value: 'Stud' },
      { label: 'Design', value: 'Halo' },
      { label: 'Setting', value: 'Prong' },
    ],
    earringStyle: 'Stud',
    earringDesignStyle: 'Halo',
    settingType: 'Prong',
    earringDiamondShape: 'Round',
    diamondType: 'Natural',
    totalCaratWeight: 1.0,
    diamondColor: 'H',
    clarity: 'SI1',
    goldColor: 'Yellow',
  },
  {
    slug: 'diamond-classic-round-stud-earrings',
    name: 'Natural Classic Round Stud Earrings',
    sku: 'AU-DE-4002',
    collection: 'Diamond',
    karat: '10K',
    type: 'Earrings',
    weight: '2.2 g',
    image: '/placeholder.svg',
    description:
      'A 10K white gold pair of four-prong stud earrings, each set with a round brilliant natural diamond. A dependable, fast-moving everyday style.',
    specs: [
      { label: 'Metal', value: '10K White Gold' },
      { label: 'Total Carat Weight', value: '0.75 CTW' },
      { label: 'Diamond', value: 'Natural, Round' },
      { label: 'Color / Clarity', value: 'I / SI2' },
      { label: 'Earring Style', value: 'Stud' },
      { label: 'Design', value: 'Classic' },
      { label: 'Setting', value: 'Prong' },
    ],
    earringStyle: 'Stud',
    earringDesignStyle: 'Classic',
    settingType: 'Prong',
    earringDiamondShape: 'Round',
    diamondType: 'Natural',
    totalCaratWeight: 0.75,
    diamondColor: 'I',
    clarity: 'SI2',
    goldColor: 'White',
  },
  {
    slug: 'diamond-pave-huggie-earrings',
    name: 'Natural Pavé Huggie Earrings',
    sku: 'AU-DE-4003',
    collection: 'Diamond',
    karat: '14K',
    type: 'Earrings',
    weight: '2.0 g',
    image: '/placeholder.svg',
    description:
      'A 14K rose gold pair of huggie earrings lined with round natural diamonds in a pavé arrangement, sitting close against the earlobe.',
    specs: [
      { label: 'Metal', value: '14K Rose Gold' },
      { label: 'Total Carat Weight', value: '0.40 CTW' },
      { label: 'Diamond', value: 'Natural, Round' },
      { label: 'Color / Clarity', value: 'H / SI1' },
      { label: 'Earring Style', value: 'Huggie' },
      { label: 'Design', value: 'Pavé' },
    ],
    earringStyle: 'Huggie',
    earringDesignStyle: 'Pavé',
    // Setting method isn't called out distinctly from the pavé arrangement
    // itself in this product's own data — left undefined rather than guessed.
    earringDiamondShape: 'Round',
    diamondType: 'Natural',
    totalCaratWeight: 0.4,
    diamondColor: 'H',
    clarity: 'SI1',
    goldColor: 'Rose',
  },
  {
    slug: 'diamond-tennis-hoop-earrings',
    name: 'Natural Diamond Tennis Hoop Earrings',
    sku: 'AU-DE-4004',
    collection: 'Diamond',
    karat: '14K',
    type: 'Earrings',
    weight: '5.5 g',
    image: '/placeholder.svg',
    description:
      'A 14K white gold pair of hoop earrings, each channel-set with a continuous line of round natural diamonds for a tennis-bracelet look on a hoop.',
    specs: [
      { label: 'Metal', value: '14K White Gold' },
      { label: 'Total Carat Weight', value: '1.80 CTW' },
      { label: 'Diamond', value: 'Natural, Round' },
      { label: 'Color / Clarity', value: 'G / VS2' },
      { label: 'Earring Style', value: 'Hoop' },
      { label: 'Design', value: 'Tennis' },
      { label: 'Setting', value: 'Channel' },
    ],
    earringStyle: 'Hoop',
    earringDesignStyle: 'Tennis',
    settingType: 'Channel',
    earringDiamondShape: 'Round',
    diamondType: 'Natural',
    totalCaratWeight: 1.8,
    diamondColor: 'G',
    clarity: 'VS2',
    goldColor: 'White',
  },
  {
    slug: 'diamond-cluster-drop-earrings',
    name: 'Natural Cluster Drop Earrings',
    sku: 'AU-DE-4005',
    collection: 'Diamond',
    karat: '10K',
    type: 'Earrings',
    weight: '3.8 g',
    image: '/placeholder.svg',
    description:
      'A 10K yellow gold pair of drop earrings, each suspending a cluster of mixed-cut natural diamonds from a prong-set top stone.',
    specs: [
      { label: 'Metal', value: '10K Yellow Gold' },
      { label: 'Total Carat Weight', value: '1.10 CTW' },
      { label: 'Diamond', value: 'Natural, mixed cuts' },
      { label: 'Color / Clarity', value: 'H / SI1' },
      { label: 'Earring Style', value: 'Drop' },
      { label: 'Design', value: 'Cluster' },
      { label: 'Setting', value: 'Prong' },
    ],
    earringStyle: 'Drop',
    earringDesignStyle: 'Cluster',
    settingType: 'Prong',
    // Mixed diamond cuts within one cluster — no single shape accurately
    // represents this piece, so left unset rather than picking one.
    diamondType: 'Natural',
    totalCaratWeight: 1.1,
    diamondColor: 'H',
    clarity: 'SI1',
    goldColor: 'Yellow',
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
    slug: 'lab-diamond-three-stone-emerald-ring',
    name: 'Three Stone Emerald-Cut Engagement Ring',
    sku: 'AU-LD-2001',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Rings',
    weight: '4.2 g',
    image: '/images/product-diamond-ring.png',
    description:
      'A 14K white gold three stone engagement ring centered on an emerald-cut lab-grown diamond, flanked by tapered baguettes. A refined, editorial silhouette.',
    specs: [
      { label: 'Metal', value: '14K White Gold' },
      { label: 'Center diamond', value: '2.00 ct, lab-grown, Emerald' },
      { label: 'Color / Clarity', value: 'E / VS1' },
      { label: 'Setting', value: 'Three Stone' },
      { label: 'Sizing', value: 'US 4 – 9' },
    ],
    ringType: 'Engagement',
    designStyle: 'Three Stone',
    diamondShape: 'Emerald',
    diamondType: 'Lab-Grown',
    carat: 2.0,
    diamondColor: 'E',
    clarity: 'VS1',
    goldColor: 'White',
  },
  {
    slug: 'lab-diamond-solitaire-round-ring',
    name: 'Classic Solitaire Engagement Ring',
    sku: 'AU-LD-2002',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Rings',
    weight: '3.6 g',
    image: '/images/product-diamond-ring.png',
    description:
      'A 14K yellow gold four-prong solitaire set with a round brilliant lab-grown diamond. A dependable, fast-moving engagement style.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Center diamond', value: '1.50 ct, lab-grown, Round' },
      { label: 'Color / Clarity', value: 'F / VS2' },
      { label: 'Setting', value: 'Solitaire' },
      { label: 'Sizing', value: 'US 4 – 9' },
    ],
    ringType: 'Engagement',
    designStyle: 'Solitaire',
    settingType: 'Prong',
    diamondShape: 'Round',
    diamondType: 'Lab-Grown',
    carat: 1.5,
    diamondColor: 'F',
    clarity: 'VS2',
    goldColor: 'Yellow',
  },
  {
    slug: 'lab-diamond-halo-pink-accent-ring',
    name: 'Halo Engagement Ring with Pink Accents',
    sku: 'AU-LD-2003',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Rings',
    weight: '3.9 g',
    image: '/images/product-diamond-ring.png',
    description:
      'A 14K white gold halo engagement ring surrounding a round lab-grown diamond with pink accent stones along the shank. A distinctive, colorful take on a classic halo.',
    specs: [
      { label: 'Metal', value: '14K White Gold' },
      { label: 'Center diamond', value: '1.20 ct, lab-grown, Round' },
      { label: 'Color / Clarity', value: 'G / VS1' },
      { label: 'Setting', value: 'Halo' },
      { label: 'Accent stones', value: 'Pink' },
      { label: 'Sizing', value: 'US 4 – 9' },
    ],
    ringType: 'Engagement',
    designStyle: 'Halo',
    diamondShape: 'Round',
    diamondType: 'Lab-Grown',
    carat: 1.2,
    diamondColor: 'G',
    clarity: 'VS1',
    goldColor: 'White',
    accentStoneColor: 'Pink',
  },
  {
    slug: 'lab-diamond-cushion-vintage-ring',
    name: 'Vintage Cushion-Cut Engagement Ring',
    sku: 'AU-LD-2004',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Rings',
    weight: '4.5 g',
    image: '/images/product-diamond-ring.png',
    description:
      'A 14K yellow gold vintage-inspired engagement ring with milgrain detailing, set with a cushion-cut lab-grown diamond.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Center diamond', value: '1.80 ct, lab-grown, Cushion' },
      { label: 'Color / Clarity', value: 'E / VVS2' },
      { label: 'Setting', value: 'Vintage' },
      { label: 'Sizing', value: 'US 4 – 9' },
    ],
    ringType: 'Engagement',
    designStyle: 'Vintage',
    diamondShape: 'Cushion',
    diamondType: 'Lab-Grown',
    carat: 1.8,
    diamondColor: 'E',
    clarity: 'VVS2',
    goldColor: 'Yellow',
  },
  {
    slug: 'lab-diamond-plain-wedding-band',
    name: 'Plain Wedding Band',
    sku: 'AU-LD-2005',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Rings',
    weight: '3.1 g',
    image: '/images/product-diamond-ring.png',
    description:
      'A smooth, comfort-fit 14K yellow gold wedding band with no diamond — a clean everyday pairing piece.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Width', value: '3 mm' },
      { label: 'Setting', value: 'Plain' },
      { label: 'Sizing', value: 'US 4 – 12' },
    ],
    ringType: 'Wedding Band',
    bandStyle: 'Plain',
    diamondType: 'None',
    goldColor: 'Yellow',
  },
  {
    slug: 'lab-diamond-pave-wedding-band',
    name: 'Pavé Wedding Band',
    sku: 'AU-LD-2006',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Rings',
    weight: '2.8 g',
    image: '/images/product-diamond-ring.png',
    description:
      'A 14K white gold wedding band set with round lab-grown diamonds in a pavé arrangement, designed to sit flush against a solitaire.',
    specs: [
      { label: 'Metal', value: '14K White Gold' },
      { label: 'Diamonds', value: '0.35 ctw, lab-grown, Round' },
      { label: 'Color / Clarity', value: 'F / VS1' },
      { label: 'Setting', value: 'Pavé' },
      { label: 'Sizing', value: 'US 4 – 9' },
    ],
    ringType: 'Wedding Band',
    bandStyle: 'Pavé',
    diamondShape: 'Round',
    diamondType: 'Lab-Grown',
    carat: 0.35,
    diamondColor: 'F',
    clarity: 'VS1',
    goldColor: 'White',
  },
  // Lab Diamond > Earrings — new MVP category. Illustrative mock products
  // (same status as the rest of this file's data) covering a reasonable
  // spread of Earring Style / Design Style / Setting Type / Diamond Shape
  // without inventing values the filters wouldn't otherwise need: Nature
  // Inspired, Geometric, and Statement design styles are deliberately left
  // unused here rather than padded out with fabricated products. No
  // dedicated earring photography exists yet, so these use the shared
  // placeholder image rather than borrowing an unrelated product's photo.
  {
    slug: 'lab-diamond-halo-stud-earrings',
    name: 'Halo Stud Earrings',
    sku: 'AU-LD-3001',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Earrings',
    weight: '3.2 g',
    image: '/placeholder.svg',
    description:
      'A 14K white gold pair of halo stud earrings, each centered on a round brilliant lab-grown diamond surrounded by a halo of smaller pavé diamonds.',
    specs: [
      { label: 'Metal', value: '14K White Gold' },
      { label: 'Total Carat Weight', value: '1.00 CTW' },
      { label: 'Diamond', value: 'Lab-grown, Round' },
      { label: 'Color / Clarity', value: 'E / VS1' },
      { label: 'Earring Style', value: 'Stud' },
      { label: 'Design', value: 'Halo' },
      { label: 'Setting', value: 'Prong' },
    ],
    earringStyle: 'Stud',
    earringDesignStyle: 'Halo',
    settingType: 'Prong',
    earringDiamondShape: 'Round',
    diamondType: 'Lab-Grown',
    totalCaratWeight: 1.0,
    diamondColor: 'E',
    clarity: 'VS1',
    goldColor: 'White',
  },
  {
    slug: 'lab-diamond-classic-round-stud-earrings',
    name: 'Classic Round Stud Earrings',
    sku: 'AU-LD-3002',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Earrings',
    weight: '2.4 g',
    image: '/placeholder.svg',
    description:
      'A 14K yellow gold pair of four-prong stud earrings, each set with a round brilliant lab-grown diamond. A dependable, fast-moving everyday style.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Total Carat Weight', value: '1.50 CTW' },
      { label: 'Diamond', value: 'Lab-grown, Round' },
      { label: 'Color / Clarity', value: 'F / VS2' },
      { label: 'Earring Style', value: 'Stud' },
      { label: 'Design', value: 'Classic' },
      { label: 'Setting', value: 'Prong' },
    ],
    earringStyle: 'Stud',
    earringDesignStyle: 'Classic',
    settingType: 'Prong',
    earringDiamondShape: 'Round',
    diamondType: 'Lab-Grown',
    totalCaratWeight: 1.5,
    diamondColor: 'F',
    clarity: 'VS2',
    goldColor: 'Yellow',
  },
  {
    slug: 'lab-diamond-pave-huggie-earrings',
    name: 'Pavé Huggie Earrings',
    sku: 'AU-LD-3003',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Earrings',
    weight: '2.1 g',
    image: '/placeholder.svg',
    description:
      'A 14K white gold pair of huggie earrings lined with round lab-grown diamonds in a pavé arrangement, sitting close against the earlobe.',
    specs: [
      { label: 'Metal', value: '14K White Gold' },
      { label: 'Total Carat Weight', value: '0.50 CTW' },
      { label: 'Diamond', value: 'Lab-grown, Round' },
      { label: 'Color / Clarity', value: 'G / VS1' },
      { label: 'Earring Style', value: 'Huggie' },
      { label: 'Design', value: 'Pavé' },
    ],
    earringStyle: 'Huggie',
    earringDesignStyle: 'Pavé',
    // Setting method isn't called out distinctly from the pavé arrangement
    // itself in this product's own data — left undefined rather than guessed.
    earringDiamondShape: 'Round',
    diamondType: 'Lab-Grown',
    totalCaratWeight: 0.5,
    diamondColor: 'G',
    clarity: 'VS1',
    goldColor: 'White',
  },
  {
    slug: 'lab-diamond-tennis-hoop-earrings',
    name: 'Diamond Tennis Hoop Earrings',
    sku: 'AU-LD-3004',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Earrings',
    weight: '5.8 g',
    image: '/placeholder.svg',
    description:
      'A 14K white gold pair of hoop earrings, each channel-set with a continuous line of round lab-grown diamonds for a tennis-bracelet look on a hoop.',
    specs: [
      { label: 'Metal', value: '14K White Gold' },
      { label: 'Total Carat Weight', value: '2.00 CTW' },
      { label: 'Diamond', value: 'Lab-grown, Round' },
      { label: 'Color / Clarity', value: 'F / VS1' },
      { label: 'Earring Style', value: 'Hoop' },
      { label: 'Design', value: 'Tennis' },
      { label: 'Setting', value: 'Channel' },
    ],
    earringStyle: 'Hoop',
    earringDesignStyle: 'Tennis',
    settingType: 'Channel',
    earringDiamondShape: 'Round',
    diamondType: 'Lab-Grown',
    totalCaratWeight: 2.0,
    diamondColor: 'F',
    clarity: 'VS1',
    goldColor: 'White',
  },
  {
    slug: 'lab-diamond-cluster-drop-earrings',
    name: 'Cluster Drop Earrings',
    sku: 'AU-LD-3005',
    collection: 'Lab Diamond',
    karat: '14K',
    type: 'Earrings',
    weight: '4.0 g',
    image: '/placeholder.svg',
    description:
      'A 14K yellow gold pair of drop earrings, each suspending a cluster of mixed-cut lab-grown diamonds from a prong-set top stone.',
    specs: [
      { label: 'Metal', value: '14K Yellow Gold' },
      { label: 'Total Carat Weight', value: '1.20 CTW' },
      { label: 'Diamond', value: 'Lab-grown, mixed cuts' },
      { label: 'Color / Clarity', value: 'E / VS2' },
      { label: 'Earring Style', value: 'Drop' },
      { label: 'Design', value: 'Cluster' },
      { label: 'Setting', value: 'Prong' },
    ],
    earringStyle: 'Drop',
    earringDesignStyle: 'Cluster',
    settingType: 'Prong',
    // Mixed diamond cuts within one cluster — no single shape accurately
    // represents this piece, so left unset rather than picking one.
    diamondType: 'Lab-Grown',
    totalCaratWeight: 1.2,
    diamondColor: 'E',
    clarity: 'VS2',
    goldColor: 'Yellow',
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
