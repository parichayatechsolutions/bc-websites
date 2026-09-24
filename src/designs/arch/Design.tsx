// src/designs/arch/Design.tsx
// "Arch": the ceremonial one. The boutique's name stands over a temple-arch
// window that opens onto their work as you scroll, their pieces then slide
// past on the brand colour, and a running stitch sews the rest of the page
// together. Dark, traditional, and the loudest design in the catalog.
//
// Signature motion: the arch opening (pinned), with the collection rail as
// the second pinned moment. Nothing else moves on scroll.

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
    intro: 'Who we are, who stitches your clothes, and how a piece is made.',
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

export default function Design() {
  return <SiteShell nav={FloatingNav} footer={BrandFooter} pages={pages} />
}
