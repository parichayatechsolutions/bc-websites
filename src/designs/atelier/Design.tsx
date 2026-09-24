// src/designs/atelier/Design.tsx
// "Atelier": the quiet one. The name sits beside one tall photo on the page's
// own light background, the work follows as an unhurried grid, and the
// reviews are set as words rather than a rating. For a boutique whose work is
// fine and detailed and shouldn't be shouted over.
//
// Signature motion: none that takes the page over. The hero arrives once and
// the gallery's two columns drift at different speeds. Nothing pins.

import { FONTS } from '../../theme/fonts'
import {
  BarNav,
  ColumnServices,
  ColumnsFooter,
  GridGallery,
  InkStory,
  PageHeader,
  QuoteReviews,
  SiteShell,
  SplitHero,
  StickyProcess,
  StoreVisit,
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
        <SplitHero />
        <GridGallery />
        <ColumnServices />
        <QuoteReviews />
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
    intro: 'Come and see us at the store, or tell us what you need and we’ll reply on WhatsApp.',
    element: (
      <>
        <PageHeader />
        <StoreVisit />
        <WhatsAppForm />
      </>
    ),
  },
]

export default function Design() {
  return <SiteShell nav={BarNav} footer={ColumnsFooter} pages={pages} />
}
