// src/designs/jaali/Design.tsx
// "Jaali": ceremonial and carved. Their work seen through a lattice of the
// brand colour, the name on an arch-topped panel; then the facts between
// zari borders, the work cut into diamonds like a jaali screen, what
// they stitch in medallions on light (so a shop without packages or an
// offer still gets a break from the brand colour), packages in temple
// arches and reviews in gold frames. The arch family's look,
// with a carved screen where Arch has a doorway.
//
// Signature motion: the opener's photo easing in behind the lattice.
// Nothing pins; the rest arrives once or is still.

import { FONTS } from '../../theme/fonts'
import {
  ArchBridal,
  ArchFooter,
  ArchNav,
  ArchStory,
  ArchesFaq,
  BandOffer,
  BandTrust,
  DiamondGallery,
  FramesReviews,
  HandsTeam,
  JaaliHero,
  MedallionServices,
  MedallionVisit,
  OccasionContact,
  PageHeader,
  RingWhatsApp,
  SiteShell,
  type IPage,
} from '../../sections'

export const fonts = FONTS.marcellusKarla

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <JaaliHero />
        <BandTrust />
        <DiamondGallery />
        <MedallionServices />
        <BandOffer />
        <ArchBridal />
        <FramesReviews />
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
    intro: 'Who we are and the hands each piece passes through.',
    element: (
      <>
        <PageHeader />
        <ArchStory />
        <HandsTeam />
      </>
    ),
  },
  {
    path: 'contact',
    label: 'Contact us',
    intro: 'Tell us the occasion and we’ll talk it through on WhatsApp, or come and see us.',
    element: (
      <>
        <PageHeader />
        <OccasionContact />
        <MedallionVisit />
        <ArchesFaq />
      </>
    ),
  },
]

export default function Design() {
  return (
    <>
      <SiteShell nav={ArchNav} footer={ArchFooter} pages={pages} />
      <RingWhatsApp />
    </>
  )
}
