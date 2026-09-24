// src/designs/ledger/Design.tsx
// "Ledger": the plain-spoken one. The name runs across the full width like a
// masthead, a letterbox photo opens under it, and the boutique's facts —
// years, city, rating, branches — are set out in a line rather than claimed
// in a sentence. For a boutique that wants to look current rather than
// traditional.
//
// Signature motion: the letterbox opening from a slot as the page starts to
// move. Nothing pins.

import { FONTS } from '../../theme/fonts'
import {
  BrandFooter,
  FloatingNav,
  GridGallery,
  InkStory,
  LedgerHero,
  ListServices,
  PageHeader,
  RatingReviews,
  SiteShell,
  StickyProcess,
  StoreVisit,
  WhatsAppForm,
  type IPage,
} from '../../sections'

export const fonts = FONTS.dmSerifSans

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <LedgerHero />
        <GridGallery />
        <ListServices />
        <RatingReviews />
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
    intro: 'Who we are, who stitches your clothes, and how a piece is made.',
    element: (
      <>
        <PageHeader />
        <InkStory />
        <StickyProcess />
      </>
    ),
  },
  {
    path: 'contact',
    label: 'Contact us',
    intro: 'Tell us what you need and we’ll reply on WhatsApp, or come and see us at the store.',
    element: (
      <>
        <PageHeader />
        <WhatsAppForm />
        <StoreVisit />
      </>
    ),
  },
]

export default function Design() {
  return <SiteShell nav={FloatingNav} footer={BrandFooter} pages={pages} />
}
