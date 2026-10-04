// src/designs/noir/Design.tsx
// "Noir": evening couture, dark from the first screen. The name beside four gold
// thread arches receding to their work, a clear navigation over it, the
// facts as dark tiles, the work as a deck of prints to deal through, a
// printed bridal menu, the hours board saying whether they're open right
// now, and the name in outlined letters to close. Dark and light sections
// alternate so it never feels heavy.
//
// Signature motion: the opener's photo easing in at the end of the arches.
// Nothing pins; the rest is still or arrives once.

import { FONTS } from '../../theme/fonts'
import {
  ChatContact,
  CountersTrust,
  DarkFaq,
  DarkProcess,
  DeckGallery,
  HoursContact,
  HoursVisit,
  InitialsReviews,
  MenuBridal,
  OpenWhatsApp,
  OutlineFooter,
  OutlineNav,
  PageHeader,
  SignaturesTeam,
  SiteShell,
  TunnelHero,
  ValuesStory,
  WordsStory,
  type IPage,
} from '../../sections'

export const fonts = FONTS.bodoniInter

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    overlay: true,
    element: (
      <>
        <TunnelHero />
        <CountersTrust />
        <DeckGallery />
        <ValuesStory />
        <MenuBridal />
        <InitialsReviews />
        <HoursContact />
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
    intro: 'Our story in a line, how each piece is made, and who makes it.',
    element: (
      <>
        <PageHeader />
        <WordsStory />
        <DarkProcess />
        <SignaturesTeam />
      </>
    ),
  },
  {
    path: 'contact',
    label: 'Contact us',
    intro: 'Tap what you’re looking for and WhatsApp opens with the message written.',
    element: (
      <>
        <PageHeader />
        <ChatContact />
        <HoursVisit />
        <DarkFaq />
      </>
    ),
  },
]

export default function Design() {
  return (
    <>
      <SiteShell nav={OutlineNav} footer={OutlineFooter} pages={pages} />
      <OpenWhatsApp />
    </>
  )
}
