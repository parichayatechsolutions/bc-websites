// src/designs/gazette/Design.tsx
// "Gazette": set like a newspaper. A plain bar on top, the name as the
// front-page headline on the brand colour, then what they make as an index,
// what they stitch in ruled rows, what customers wrote, and any offer as a
// coupon. Everything is type, so it
// needs no photographs: the design for a boutique that hasn't shared any
// yet, or whose name is its brand.
//
// Signature motion: the name rising in the headline. Nothing pins, and
// nothing else moves on scroll.
//
// On a phone, a Call / WhatsApp bar sits at the bottom once the visitor is
// past the headline.

import { FONTS } from '../../theme/fonts'
import {
  BarNav,
  CallWhatsAppBar,
  CouponOffer,
  IndexGallery,
  IndexProcess,
  LetterStory,
  ListServices,
  MapVisit,
  MastheadHero,
  MinimalFooter,
  PageHeader,
  RowsFaq,
  RuledReviews,
  SiteShell,
  StatTrust,
  TrioContact,
  type IPage,
} from '../../sections'

export const fonts = FONTS.gloockFigtree

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <MastheadHero />
        <IndexGallery />
        <ListServices />
        <RuledReviews />
        <CouponOffer />
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
    intro: 'Who we are, in our own words, and how a piece is made.',
    element: (
      <>
        <PageHeader />
        <LetterStory />
        <IndexProcess />
        <StatTrust />
      </>
    ),
  },
  {
    path: 'contact',
    label: 'Contact us',
    intro: 'WhatsApp, call or come and see us. Answers to the usual questions are below.',
    element: (
      <>
        <PageHeader />
        <TrioContact />
        <MapVisit />
        <RowsFaq />
      </>
    ),
  },
]

export default function Design() {
  return (
    <>
      <SiteShell nav={BarNav} footer={MinimalFooter} pages={pages} />
      <CallWhatsAppBar />
    </>
  )
}
