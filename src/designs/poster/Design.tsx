// src/designs/poster/Design.tsx
// "Poster": the formal one. The name is framed over a full photograph the way
// a wedding invitation is set, what they stitch sits in tidy columns, and the
// making of a piece is told step by step. A centred
// navigation with the phone number above it opens the page like a shopfront
// board.
//
// Signature motion: the frame drawing itself around the name on arrival, then
// the collection rail and the process as the page's two pinned moments.

import { FONTS } from '../../theme/fonts'
import {
  CenteredNav,
  ColumnServices,
  InkStory,
  MinimalFooter,
  PageHeader,
  PosterHero,
  RailGallery,
  RatingReviews,
  SiteShell,
  StickyProcess,
  StoreVisit,
  WhatsAppForm,
  type IPage,
} from '../../sections'

export const fonts = FONTS.marcellusKarla

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <PosterHero />
        <ColumnServices />
        <RailGallery />
        <StickyProcess />
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
    intro: 'Who we are, and what people say after they’ve worn our work.',
    element: (
      <>
        <PageHeader />
        <InkStory />
        <RatingReviews />
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
  return <SiteShell nav={CenteredNav} footer={MinimalFooter} pages={pages} />
}
