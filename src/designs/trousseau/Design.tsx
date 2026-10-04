// src/designs/trousseau/Design.tsx
// "Trousseau": for brides. One photograph edge to edge with the name small
// in its corner, then their bridal packages one at a time, a single piece
// to ask about, a dark printed menu of what they make, what a bride said,
// and an invitation to a consult. Couture type and a quiet, expensive pace.
//
// Signature motion: the opener's photograph. Nothing pins; the rest is
// still or arrives once.
//
// The bridal sections hide for a boutique without bridal packages or
// bridal work, so this design still holds up for them, but it's made for
// the boutiques whose pitch is the wedding.

import { FONTS } from '../../theme/fonts'
import {
  AccordionFaq,
  CenteredNav,
  ColumnsFooter,
  ConsultBridal,
  FeatureGallery,
  FloatingWhatsApp,
  InkStory,
  MenuServices,
  PageHeader,
  QuoteReviews,
  ShopfrontVisit,
  SiteShell,
  StickyProcess,
  TabBridal,
  VitrineOpener,
  WhatsAppForm,
  type IPage,
} from '../../sections'

export const fonts = FONTS.bodoniInter

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <VitrineOpener />
        <TabBridal />
        <FeatureGallery />
        <MenuServices />
        <QuoteReviews />
        <ConsultBridal />
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
    intro: 'Tell us about your wedding and we’ll reply on WhatsApp, or come and see us at the store.',
    element: (
      <>
        <PageHeader />
        <WhatsAppForm />
        <ShopfrontVisit />
        <AccordionFaq />
      </>
    ),
  },
]

export default function Design() {
  return (
    <>
      <SiteShell nav={CenteredNav} footer={ColumnsFooter} pages={pages} />
      <FloatingWhatsApp />
    </>
  )
}
