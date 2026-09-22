// src/sites/<slug>/Site.tsx (starter copied by npm run new-boutique)
// This boutique's site: its navigation, footer and pages, each page a list of
// components from the library. Starts as a simple, complete three-page site.
// Give the boutique its own look by picking a different nav and footer,
// swapping components for their siblings, reordering, or adding and removing
// pages. Every component is listed with a one-line description in
// src/sections/index.ts.
//
// The components read the boutique's details from config.ts themselves, so
// this file only arranges them. A look the library doesn't have yet is added
// as a new component in src/sections/, never styled here.

import { FONTS } from '../../theme/fonts'
import {
  ArchHero,
  BarNav,
  ColumnServices,
  ColumnsFooter,
  InkStory,
  PageHeader,
  RailGallery,
  RatingReviews,
  SiteShell,
  StickyProcess,
  StoreVisit,
  WhatsAppForm,
  type IPage,
} from '../../sections'

export const fonts = FONTS.rozhaMukta

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <ArchHero />
        <RailGallery />
        <ColumnServices />
        <RatingReviews />
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
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

export default function Site() {
  return <SiteShell nav={BarNav} footer={ColumnsFooter} pages={pages} />
}
