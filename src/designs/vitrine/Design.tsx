// src/designs/vitrine/Design.tsx
// "Vitrine": the shop window. For boutiques whose pitch is range — the ones
// who make bridal lehengas, blouses, half-sarees and children's pattu langas
// and want all of it seen at once.
//
// The work is the page: one photograph edge to edge, then everything they
// make in an uneven grid you can narrow by kind. Type stays quiet, the ground
// stays neutral, and the brand colour appears only as small marks, the way a
// gallery paints its walls off-white so the work carries the colour.
//
// Signature motion: choosing a category re-lays the grid, each piece
// travelling to its new place. Nothing pins.
//
// Needs ten or more photographs, named by kind (work-bridal-01.jpg). A
// boutique without them belongs on another design.

import { FONTS } from '../../theme/fonts'
import {
  BarNav,
  CategoryGrid,
  ColumnServices,
  InkStory,
  MinimalFooter,
  PageHeader,
  QuoteReviews,
  SiteShell,
  StickyProcess,
  StoreVisit,
  VitrineOpener,
  WhatsAppForm,
  type IPage,
} from '../../sections'

export const fonts = FONTS.cormorantJost

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <VitrineOpener />
        <CategoryGrid />
        <ColumnServices />
        <QuoteReviews />
        <StoreVisit />
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
  return <SiteShell nav={BarNav} footer={MinimalFooter} pages={pages} />
}
