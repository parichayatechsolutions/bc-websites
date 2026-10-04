// src/designs/pallu/Design.tsx
// "Pallu": built like the end of a saree. The home page opens on their work,
// a woven zari border, and the name on a band of brand colour like a pallu;
// then a line of proof, an arch for every kind of work they make, what
// they're known for, any offer they're running, and what customers wrote.
// Warm and festive, between Arch's ceremony and Atelier's quiet.
//
// Signature motion: the opener (photo uncovering, name rising, photo
// drifting). Everything after it arrives once or not at all. Nothing pins.
//
// Best with photos named by kind (work-bridal-01.jpg), which give the
// colonnade its arches; without them that section hides.

import { FONTS } from '../../theme/fonts'
import {
  AccordionFaq,
  ColonnadeGallery,
  ConsultBridal,
  EditorialStory,
  FloatingWhatsApp,
  KnownServices,
  LineTrust,
  MapVisit,
  MenuNav,
  PageHeader,
  PicksContact,
  PromiseTrust,
  SareeHero,
  SignoffFooter,
  SiteShell,
  StripOffer,
  ThreadProcess,
  WallReviews,
  type IPage,
} from '../../sections'

export const fonts = FONTS.lailaPoppins

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <SareeHero />
        <LineTrust />
        <ColonnadeGallery />
        <KnownServices />
        <StripOffer />
        <ConsultBridal />
        <WallReviews />
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
    intro: 'Who we are, how a piece is made, and what you can count on.',
    element: (
      <>
        <PageHeader />
        <EditorialStory />
        <ThreadProcess />
        <PromiseTrust />
      </>
    ),
  },
  {
    path: 'contact',
    label: 'Contact us',
    intro: 'Tell us what you’re planning and we’ll reply on WhatsApp, or come and see us at the store.',
    element: (
      <>
        <PageHeader />
        <PicksContact />
        <MapVisit />
        <AccordionFaq />
      </>
    ),
  },
]

export default function Design() {
  return (
    <>
      <SiteShell nav={MenuNav} footer={SignoffFooter} pages={pages} />
      <FloatingWhatsApp />
    </>
  )
}
