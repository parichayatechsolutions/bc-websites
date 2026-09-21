// src/sites/sample-boutique/Site.tsx
// This boutique's site: its navigation, footer and pages, each page a list of
// components from the library. The components read the boutique's details
// from config.ts themselves, so this file only arranges them. A look the
// library doesn't have yet is added as a new component in src/sections/,
// never styled here.

import { FONTS } from '../../theme/fonts'
import {
  ArchHero,
  BrandFooter,
  ColumnServices,
  FloatingNav,
  InkStory,
  PageHeader,
  RailGallery,
  RatingReviews,
  SiteShell,
  StickyProcess,
  StitchLine,
  StoreVisit,
  WhatsAppForm,
  type IPage,
} from '../../sections'

export const fonts = FONTS.rozhaMukta

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    overlay: true,
    element: (
      <>
        <ArchHero />
        <RailGallery />
        <StitchLine>
          <ColumnServices />
          <RatingReviews />
        </StitchLine>
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
    intro: 'Twelve years of stitching for the brides and families of Tirupati.',
    element: (
      <StitchLine>
        <PageHeader />
        <InkStory />
        <StickyProcess />
      </StitchLine>
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

export default function Site() {
  return <SiteShell nav={FloatingNav} footer={BrandFooter} pages={pages} />
}
