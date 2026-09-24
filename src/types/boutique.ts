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
  hours?: string
  parking?: boolean
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
  }

  pricing?: {
    startingAt?: { item: string; price: number }[]
    deliveryDays?: number
    express?: string
    paymentModes?: string[]
  }

  stats?: Stat[]
  reviews?: Review[]
  testimonials?: Testimonial[]

  media: {
    hero: HeroMedia
    storefront?: PhotoFile
    interior?: PhotoFile[]
    teamAtWork?: PhotoFile
    work: PhotoFile[]
    closeups?: PhotoFile[]
  }

  permissions: {
    showOwnerPhoto: boolean
    showPrices: boolean
  }

  demo: {
    /** Keeps unsold demos out of Google. Set false only after the boutique signs. */
    noindex: boolean
    preparedBy?: string
  }

  collectorNotes?: CollectorNotes
}
