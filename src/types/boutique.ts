// src/types/boutique.ts
// The contract between a boutique's data folder and the website.
// Every src/sites/<slug>/config.ts exports one BoutiqueConfig. Components in
// src/sections read only from this shape; a boutique's Site.tsx decides which
// components appear and in what order.

/** File name inside boutiques/<slug>/photos/, e.g. "work-01.jpg". */
export type PhotoFile = string

export interface Branch {
  name: string
  address: string
  landmark?: string
  /** The locality people search for, one name only: "Kengeri Satellite Town". Used by the demo directory's filters. */
  area: string
  city: string
  state: string
  pincode: string
  mapsUrl: string
  /** As written: "Mon–Sat 10am–8pm, Sun closed". */
  hours?: string
  /**
   * The same hours day by day, Monday first, read from `hours` by the
   * parser: 24-hour "10:00" to "20:00", or null for a closed day. Missing
   * when the hours couldn't be read for every day, so nothing shows "open
   * now" from a guess.
   */
  week?: (DayHours | null)[]
  parking?: boolean
}

export interface DayHours {
  /** 24-hour "10:30". */
  open: string
  /** 24-hour "20:30". */
  close: string
}

export interface ServiceGroup {
  title: string
  items: string[]
}

export interface Review {
  name: string
  text: string
  source?: 'google' | 'instagram' | 'other'
}

export type Testimonial = Review

export interface Stat {
  value: string
  label: string
}

export interface Faq {
  question: string
  answer: string
}

/** A real offer the boutique is running. Hidden on the site after `until`. */
export interface Offer {
  /** One line: "10% off bridal blouses booked before Diwali". */
  title: string
  /** Conditions, in a sentence. */
  detail?: string
  /** Last day of the offer, yyyy-mm-dd. */
  until?: string
  /** A code to show at the counter. */
  code?: string
}

export interface BridalPackage {
  name: string
  /** Starting price in rupees. Shown only when permissions.showPrices. */
  price?: number
  includes: string[]
}

export interface AlterationPrice {
  item: string
  price: number
  /** How many days the fix usually takes, in the shop's own numbers. */
  days?: number
}

/** A piece they rent out. Its photo is rental-<nn>.jpg, by its place in the data sheet. */
export interface RentalPiece {
  name: string
  pricePerDay?: number
  sizes?: string
  photo: PhotoFile
}

/** A fabric they stock. Its photo is fabric-<nn>.jpg, by its place in the data sheet. */
export interface Fabric {
  name: string
  bestFor?: string
  photo: PhotoFile
}

export interface ClassCourse {
  name: string
  level?: string
  /** "6 weeks", "3 Saturdays". */
  length?: string
  /** First day of the next batch, yyyy-mm-dd. Hidden once it has passed. */
  nextBatch?: string
  /** Fee in rupees. Shown only when permissions.showPrices. */
  fee?: number
}

/** How long a piece of work usually takes, in the shop's own numbers: "Aari work", 10. */
export interface WorkTime {
  /** "Aari work", "Saree fall and pico". */
  item: string
  days: number
}

/** How early to order a piece before a wedding, in the shop's own numbers. */
export interface LeadTime {
  /** "Bridal blouse with maggam work". */
  item: string
  /** Weeks before the wedding to order it. */
  weeks: number
}

export interface TeamMember {
  name: string
  role: string
  years?: number
  /** What garments, cuts, or handwork they build and specialize in. */
  specialty?: string
  /** How they work, their craft process and technique. */
  howTheyWork?: string
  /** One line about them, as they or the owner put it. */
  line?: string
  /** Only when the person agreed to their photo being shown. Never generated. */
  photo?: PhotoFile
}

/** A style note written for the boutique. Its photo is post-<nn>.jpg. */
export interface Post {
  title: string
  /** yyyy-mm-dd */
  date?: string
  text: string
  photo?: PhotoFile
}

/** Two photos shown together: plain-01.jpg with worked-01.jpg, match-01-a.jpg with match-01-b.jpg. */
export interface PhotoPair {
  first: PhotoFile
  second: PhotoFile
}

/** The same garment before and after an alteration: before-01.jpg with after-01.jpg. */
export interface AlterationPair {
  before: PhotoFile
  after: PhotoFile
}

export interface HeroMedia {
  type: 'image' | 'video'
  src: PhotoFile
  /** Still frame shown while a video loads, and on reduced-motion devices. */
  poster?: PhotoFile
}

export interface CollectorNotes {
  collectedBy?: string
  date?: string
  decisionMaker?: string
  interestLevel?: string
  existingWebsite?: string
  goal?: string
  followUpDate?: string
  notes?: string
}

export interface BoutiqueConfig {
  slug: string

  brand: {
    name: string
    localName?: string
    tagline?: string
    logo: PhotoFile
    /** Hex colours. dark and light are optional; they are mixed from primary when missing. */
    colors: {
      primary: string
      accent: string
      dark?: string
      light?: string
    }
  }

  owner: {
    name: string
    role?: string
    photo?: PhotoFile
    story?: string
  }

  highlight?: string
  established?: number

  contact: {
    phone: string
    whatsapp: string
    email?: string
    languages?: string[]
  }

  branches: Branch[]

  social: {
    instagram?: string
    facebook?: string
    youtube?: string
    googleBusiness?: string
    googleRating?: number
    googleReviewCount?: number
  }

  services: {
    /** The top three things the boutique is known for, shown first. */
    featured: string[]
    groups: ServiceGroup[]
    /** "1 to 14 years": the ages they stitch children's wear for. */
    kidsAges?: string
  }

  pricing?: {
    startingAt?: { item: string; price: number }[]
    deliveryDays?: number
    express?: string
    paymentModes?: string[]
  }

  /** Bridal packages, in the order the boutique lists them. */
  bridalPackages?: BridalPackage[]
  /** Offers running now; the site hides any whose last day has passed. */
  offers?: Offer[]
  /** Their alteration rates. Shown only when permissions.showPrices. */
  alterationPrices?: AlterationPrice[]
  /** Present when they sell gift vouchers; amounts in rupees (may be empty). */
  giftVouchers?: { amounts: number[] }
  rentals?: RentalPiece[]
  fabrics?: Fabric[]
  classes?: ClassCourse[]
  /** How early to order each piece before a wedding; the dated wedding planner needs these. */
  leadTimes?: LeadTime[]
  /** How long handwork and saree work usually take (6j); the time sections need these. */
  workTimes?: WorkTime[]
  team?: TeamMember[]
  posts?: Post[]

  stats?: Stat[]
  reviews?: Review[]
  testimonials?: Testimonial[]
  /** Questions customers ask, with the owner's answers. */
  faq?: Faq[]

  media: {
    hero: HeroMedia
    storefront?: PhotoFile
    interior?: PhotoFile[]
    teamAtWork?: PhotoFile
    /**
     * Their finished work. A file named work-<category>-<nn>.jpg carries its
     * own category ("work-bridal-01.jpg" → Bridal), which is what the lookbook
     * templates group by; a plain work-01.jpg has none.
     */
    work: PhotoFile[]
    closeups?: PhotoFile[]
    /** Before and after pairs of their alterations. */
    alterations?: AlterationPair[]
    /** Looks by occasion: look-<occasion>-<nn>.jpg ("look-sangeet-01.jpg"). */
    looks?: PhotoFile[]
    /** Saree drapes: drape-<style>.jpg ("drape-nivi.jpg"). */
    drapes?: PhotoFile[]
    /** Optional specific 3-photo hero collage files: [tallArch, squareDetail, bottomArch] */
    heroCollage?: PhotoFile[]
    /** A groom's look per function: groom-<function>.jpg ("groom-sangeet.jpg"). */
    groom?: PhotoFile[]
    /** The same blouse plain and with handwork: plain-01.jpg with worked-01.jpg. */
    handworkPairs?: PhotoPair[]
    /** Matching outfits, mother and daughter or siblings: match-01-a.jpg with match-01-b.jpg. */
    matching?: PhotoPair[]
    /** The owner talking about her work, maker.mp4. Shown only with permission to show the owner. */
    makerVideo?: PhotoFile
    /** Hands at work in the workroom, workroom.mp4. */
    workroomVideo?: PhotoFile
    /** One-minute tips, tip-01.mp4…, each titled by its photo note. */
    tipVideos?: PhotoFile[]
    /** One line per photo, by file name: "Bridal blouse, aari work, 12 days". */
    captions?: Record<PhotoFile, string>
  }

  permissions: {
    showOwnerPhoto: boolean
    showPrices: boolean
  }

  demo: {
    /** Keeps unsold demos out of Google. Set false only after the boutique signs. */
    noindex: boolean
    /** The boutique has bought their site. Drives the demo directory's filter. */
    sold: boolean
    preparedBy?: string
  }

  collectorNotes?: CollectorNotes
}
