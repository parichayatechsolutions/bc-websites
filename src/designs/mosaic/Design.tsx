// src/designs/mosaic/Design.tsx
// "Mosaic": range at first sight. Six pieces and the name share one grid on
// the first screen, then the numbers that matter, every piece in a grid you
// can open large, the lowest starting price set enormous, the rating in a
// seal, any offer, and their Instagram. On a phone, WhatsApp, Call and the
// menu sit in a dock under the thumb. Young, quick and made for phones.
//
// Signature motion: the mosaic arriving (the name rising as the photos
// uncover in turn). Nothing pins.
//
// The dock is the WhatsApp control, so this design has no floating button.
// Prices show only where the boutique allows them; without them the big
// price section hides.

import { FONTS } from '../../theme/fonts'
import {
  DaysProcess,
  DockNav,
  FactsFaq,
  FittingContact,
  InviteFooter,
  LightboxGallery,
  MosaicHero,
  PageHeader,
  PairsAlterations,
  PhotoOffer,
  PriceServices,
  QuoteStory,
  SealReviews,
  SiteShell,
  StatTrust,
  StoriesInstagram,
  WaysVisit,
  type IPage,
} from '../../sections'

export const fonts = FONTS.yesevaWork

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <MosaicHero />
        <StatTrust />
        <LightboxGallery />
        <PriceServices />
        <SealReviews />
        <PhotoOffer />
        <StoriesInstagram />
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
    intro: 'Who we are, how long things take, and the alterations we’ve done.',
    element: (
      <>
        <PageHeader />
        <QuoteStory />
        <DaysProcess />
        <PairsAlterations />
      </>
    ),
  },
  {
    path: 'contact',
    label: 'Contact us',
    intro: 'Pick a day for your fitting, or find your way to the store.',
    element: (
      <>
        <PageHeader />
        <FittingContact />
        <WaysVisit />
        <FactsFaq />
      </>
    ),
  },
]

export default function Design() {
  return <SiteShell nav={DockNav} footer={InviteFooter} pages={pages} />
}
