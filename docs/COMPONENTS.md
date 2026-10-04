# Component inventory

Every section and version in the design lab ([docs/BoutiqueComponentLab/](BoutiqueComponentLab/)): **34 sections, 866 versions**. Use this to plan which versions become components in `src/sections/`. Open `Component Library.dc.html` in a browser to see any of them.

Built components can be seen with any boutique at `/lab` while `npm run dev` is running.

## How to use it

- **Plan:** `build`, `later`, `skip`, or `keep` for an existing component. A first pass is filled in (see [Shortlist](#shortlist)); change any of it. Blank means not planned. The aim is 3–5 versions per section that really differ in layout, rhythm or motion (DESIGN.md: a new component must be *actually* different from its siblings).
- **Status:** `built` means a component already is this version. `close` means an existing component is near it, so building it means checking it's different enough first. Blank means not started.
- **No photos:** the version works for a boutique with no photographs yet.
- **Watch:** something in the lab version that conflicts with `docs/DESIGN.md`. Fix it while porting, or don't build that version.
- When a version is built, set its status to `built` with the component path, and add the component to `src/sections/index.ts`.

### Changes every version gets when it's ported

The lab was drawn fast, so most versions break a few house rules that the port fixes as a matter of course:

- Letter-spaced, upper-case eyebrow labels above headings become sentence case or go (Typography).
- Radial-gradient glows behind sections and drop shadows on cards go (Layout: no gradient washes, no shadows).
- Inline `style` and `cqw` sizes become Tailwind classes, the type scale (`t-hero`…`t-small`), `.wrap` and `.section`.
- Raw `var(--c-primary)` and `var(--c-accent)` text become the contrast-safe roles (`text-primary-ink`, `text-accent-on-dark`).
- `ti ti-*` icon classes become `@tabler/icons-react` components; the lab's buttons become `Button`, its photos `Media`.
- Motion comes from `src/motion/moves.ts` (below), not `alive.js`.

### Library components with no lab version

`nav/BarNav`, `hero/VitrineOpener`, `header/PageHeader`.

## Motion

Each lab section offers a few motions. Allowed ones are in `src/motion/moves.ts`, so components share one implementation:

| Lab motion | Where | In React |
|---|---|---|
| Letters rise | hero, footer | `rise()` |
| Letters blur in | hero | `blurIn()` |
| Numbers count up | hero, reviews | `countUp()` |
| Photo settles | hero, gallery | `settle()` |
| Photos wipe up / Wipe in | almost every section | `wipe()` |
| Zari draws / Leaders draw / Threads draw | many | `draw()` |
| Sways in | hero, gallery, reviews | `sway()` |
| Stars fill in | reviews, trust | `starsIn()` |
| Drift | gallery | `drift()` |
| Arch opens | hero A | Inside `ArchHero` (pinned) |
| Words fill in | story B, R | Inside `InkStory` |
| Filter / swap, tab and step demos | gallery, services, faq… | Component state, with GSAP `Flip` for re-laying grids. The lab's auto-demo becomes a real tap; nothing auto-advances. |
| Next review (cross-fade) | reviews | Component state, `DURATION.base` cross-fade |
| Solid on scroll, Hide on scroll down, Dock rises | nav | Inside the nav (as `FloatingNav` does now) |
| Typing, Button sheen, Slider sweep | contact, alt | Inside the one component that uses it, finite and played once |

**Dropped** (DESIGN.md forbids them): Cards / Steps / Paragraphs / Posts / Columns fade up, Loop strip, Curtain parts, Seal turns and the play-button pulse (loops), Medallions lift (a fade-up by another name). From `alive.js` also: the moving grain overlay, gold shimmer on headings, breathing background glows, heading drift (parallax on text), tilt on photos, and magnetic pull on every button (`Magnetic` stays, once per screen).

## Shortlist

First pass, 2026-10-04: **50 versions to build**, two per speciality section marked `later`, and rule-breakers marked `skip`. Change the Plan column to change the plan.

How they were picked:

- Each new version differs from what's already built in ground (light, dark, brand colour), lead (photo or type) or interaction, not just spacing.
- Every photo-led section gets at least one version that works with few or no photos, because most demos start that way.
- Each one ends in WhatsApp where the section has an action.
- Nothing that only works by breaking DESIGN.md: loops, pop-ups, hover-only reveals, 3D turns, and the rounded "bento" tiles are `skip`.
- Speciality sections wait until a boutique needs them; the order tracker needs a backend, so all of it is `skip`.

| Section | Build | Why these |
|---|---|---|
| [nav](#00-nav) | C, E, L | C puts WhatsApp and Call in a thumb dock on phones; E is the one that survives a 40-character name (logo, WhatsApp, Menu only); L is the type-first masthead for Ledger-style pages. |
| [hero](#01-hero) | D, E, F | D is the opener for a boutique with no photos yet; E (saree border) is a new Indian ornament beside the arch; F (mosaic) shows range in one screen. P (chat opener) later: good for WhatsApp, but chat looks are already used in contact. |
| [gallery](#02-gallery) | C, E, J, N | C asks about one piece on WhatsApp; E is the arch family's category entrance; J works with three photos or none; N is the plain tap-to-enlarge grid customers expect. |
| [reviews](#03-reviews) | D, F, S | D for boutiques with many reviews; F for two reviews and a good rating; S is calm and type-led. I loops. |
| [contact](#04-contact) | C, D, E | C: two taps, no typing; D: the simplest page there is (WhatsApp, Call, Visit); E books a fitting day. All end in a written WhatsApp message. |
| [services](#05-services) | D, J, N | D is a dark menu for ceremonial pages; J is one big starting price, for thin data; N leads with what they are known for. Tiers and estimates (F, Q, W) wait for per-item prices. |
| [story](#06-story) | B, E, F | All three work without a portrait, which many owners won't give (and which we never generate). B: one line set large; E: dark editorial with the year; F: a signed letter. N turns forever. |
| [process](#07-process) | B, G, P | B ties to the running stitch with no photos; G shows their real delivery days; P is the type-led list for Ledger pages. |
| [faq](#08-faq) | A, J, K | A is the phone-friendly accordion; J leads with price and delivery facts already in the config; K keeps every answer open in ruled rows. |
| [ig](#09-ig) | A, F, H | A is the familiar profile grid; F turns photo categories into story circles; H needs only five photos. |
| [bridal](#10-bridal) | A, D, W | A is the three-package layout people recognise; D shows one package at a time, which reads better on a phone than a comparison table; W needs no package data at all, just an invitation to consult. |
| [alt](#11-alt) | A, C, M | A is the drag comparison; C shows several pairs with no interaction; M works with a single pair beside their alterations list. F depends on hover. |
| [offer](#12-offer) | A, C, E | A is the slim strip; C is a section with a photo and WhatsApp; E is a coupon to show at the counter. B auto-steps, F is a pop-up, O loops. |
| [trust](#13-trust) | A, G, Q | A is four facts in a row (count-up is fine here); G sets promises beside the rating; Q is a slim chip row for under the hero. C loops. |
| [map](#14-map) | A, F, U | A is the map with an address card; F needs no map embed (walk in, ask for the pin, call); U shows the shopfront so they recognise it on arrival. |
| [footer](#15-footer) | C, E | C signs off with WhatsApp, Call and Directions; E ends on one big invitation. With the three built, that is five. |
| [wa](#32-wa) | A, D | The sticky WhatsApp button is core, not speciality: DESIGN.md says contact is never more than a thumb away. A without its pulse (loops); D as a bar for designs whose nav has no dock. N and O move forever. |

### Order

| Wave | What | Versions | Count |
|---|---|---|---|
| A | Sections with no component yet that need no new data (**built 2026-10-04**) | trust A, G, Q · map A, F, U · ig A, F, H · wa A, D | 11 |
| B | Sections that need a new config field first (types, data sheet, parser, validator, sample-boutique), then their components | faq A, J, K · offer A, C, E · bridal A, D, W · alt A, C, M | 12 |
| C | More versions of sections that already have components | hero D, E, F · gallery C, E, J, N · reviews D, F, S · contact C, D, E · services D, J, N · story B, E, F · process B, G, P · nav C, E, L · footer C, E | 27 |

Wave A first: it fills sections the library doesn't have at all and needs no data-sheet changes, so every boutique benefits at once.

## Sections

| # | Section | Group | Versions | Built | Close | Data | To build |
|---|---|---|---|---|---|---|---|
| 00 | [Navigation](#00-nav) | Site chrome | 26 | 1 | 1 | existing | 3 |
| 01 | [Hero](#01-hero) | Page opener | 26 | 1 | 3 | existing | 3 |
| 02 | [Gallery](#02-gallery) | Their work | 26 | 1 | 2 | existing | 4 |
| 03 | [Testimonials](#03-reviews) | Trust | 26 | 1 | 1 | existing | 3 |
| 04 | [WhatsApp contact](#04-contact) | Bookings | 26 | 1 |  | existing | 3 |
| 05 | [Services & prices](#05-services) | What they make | 26 | 1 | 1 | existing | 3 |
| 06 | [Owner's story](#06-story) | About them | 26 |  | 1 | existing | 3 |
| 07 | [Making process](#07-process) | About them | 26 |  | 1 | existing | 3 |
| 08 | [FAQ](#08-faq) | Trust | 26 |  |  | new | 3 |
| 09 | [Instagram feed](#09-ig) | Their work | 26 | 3 |  | existing |  |
| 10 | [Bridal packages](#10-bridal) | What they make | 26 |  |  | new | 3 |
| 11 | [Before / after alterations](#11-alt) | Their work | 26 |  |  | new | 3 |
| 12 | [Offers banner](#12-offer) | Bookings | 26 |  |  | new | 3 |
| 13 | [Trust badges](#13-trust) | Trust | 26 | 3 |  | existing |  |
| 14 | [Location map](#14-map) | Bookings | 26 | 3 | 1 | existing |  |
| 15 | [Footer](#15-footer) | Site chrome | 26 | 3 |  | existing | 2 |
| 16 | [Fabric swatches](#16-fabric) | Speciality | 26 |  |  | new |  |
| 17 | [Blouse design picker](#17-blouse) | Speciality | 26 |  |  | none |  |
| 18 | [Measurement guide](#18-measure) | Speciality | 26 |  |  | none |  |
| 19 | [Lookbook](#19-look) | Speciality | 26 |  |  | new |  |
| 20 | [Rental collection](#20-rental) | Speciality | 26 |  |  | new |  |
| 21 | [Kids wear corner](#21-kids) | Speciality | 26 |  |  | new |  |
| 22 | [Men's tailoring](#22-men) | Speciality | 26 |  |  | new |  |
| 23 | [Embroidery types](#23-emb) | Speciality | 26 |  |  | new |  |
| 24 | [Saree services](#24-saree) | Speciality | 26 |  |  | new |  |
| 25 | [Alterations price list](#25-alter) | Speciality | 26 |  |  | new |  |
| 26 | [Trial & delivery tracker](#26-track) | Speciality | 26 |  |  | backend |  |
| 27 | [Wedding planner](#27-wed) | Speciality | 26 |  |  | none |  |
| 28 | [Gift voucher](#28-gift) | Speciality | 26 |  |  | new |  |
| 29 | [Classes & workshops](#29-class) | Speciality | 26 |  |  | new |  |
| 30 | [Team / tailors](#30-team) | Speciality | 26 |  |  | new |  |
| 31 | [Blog / style tips](#31-blog) | Speciality | 26 |  |  | new |  |
| 32 | [Sticky WhatsApp button](#32-wa) | Speciality | 26 | 2 |  | existing |  |
| 33 | [Cinematic hero · Velvet Night](#33-cine) | Speciality | 8 |  |  | existing |  |

### 00 nav

**Navigation** · Site chrome · `is.navA`–`is.navZ` in `Section Preview.dc.html`

Data: Existing fields. "Open now" and today's hours (B, G) need structured hours; `branches[].hours` is free text today.

Lab motions: Tap demo, Solid on scroll, Hide on scroll down, Dock rises.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Floating | Clear over the hero, solid once scrolled; full-screen menu on phones. |  | built: `nav/FloatingNav` |  | keep |
| B | Crest | Info strip with phone, area and today's hours; logo centred between links; zari underline. |  | close: `nav/CenteredNav` |  | keep |
| C | Pill + thumb dock | Floating pill bar on desktop; on phones a bottom dock with WhatsApp, Call and Menu. |  |  |  | build |
| D | Split centre logo | Solid bar, links split either side of a centred logo. |  |  |  |  |
| E | Menu button | Just logo, WhatsApp and a "Menu" pill; opens a numbered full-screen menu with hours. |  |  |  | build |
| F | Side rail / tab bar | Icon rail down the left on desktop; app-style tab bar at the bottom on phones. |  |  |  |  |
| G | Open-now bar | Brand strip showing open or closed today and the rating, over a solid nav. |  |  |  |  |
| H | Glass bar | Frosted, rounded bar floating inset over the hero photo. |  |  | frosted glass (contrast over photos) |  |
| I | Brand bar | Solid brand colour with icon chips for each page and a zari edge. |  |  |  |  |
| J | Tab switcher | Pages as a segmented pill control; the active one fills. |  |  |  |  |
| K | Icon nav | Icons with small labels; compact and scannable. |  |  |  |  |
| L | Masthead | Newspaper style: name set large, links in a ruled row under it. |  |  |  | build |
| M | Arch tab | Logo and name hang from the top centre in an arch-shaped tab. |  |  |  |  |
| N | Drawer | Menu slides in from the left with a photo header and hours. |  |  |  |  |
| O | Work mega menu | Desktop "Our work" opens a panel of categories; phones get a grid sheet. |  |  |  |  |
| P | Prices mega menu | Dark bar; "Services & prices" opens groups plus a starting-price card. |  |  |  |  |
| Q | Call \| Book bar | Solid bar with a split pill: Call on one side, Book on WhatsApp on the other. |  |  |  |  |
| R | CTA band | Solid nav with a brand band under it: rating, delivery and "Book a fitting". |  |  |  |  |
| S | Local-name strip | Slim dark strip with the name in the local language, above a clean nav. |  |  |  |  |
| T | Outline pill links | Clear over the hero; links inside an outlined pill, WhatsApp as an outline circle. |  |  |  |  |
| U | Dark luxe | Near-black bar with gold hairlines, a crown and an "Appointments" button. |  |  |  |  |
| V | Thread progress | A thread with a needle under the nav shows how far down the page you are. |  |  |  |  |
| W | Shrinking | Tall with a large logo at the top, shrinks to a compact bar as you scroll. |  |  |  |  |
| X | Split menu | Menu slides in as half photo with tagline, half numbered links. |  |  |  |  |
| Y | Circle menu | The menu grows as a circle from the button in brand colour. |  |  |  |  |
| Z | Radial button | A single floating button that fans out WhatsApp, Call, Work and Visit. |  |  |  |  |

### 01 hero

**Hero** · Page opener · `is.heroA`–`is.heroZ` in `Section Preview.dc.html`

Data: Existing fields. Local name (B, N) uses `brand.localName`; stats (S) use `stats`.

Lab motions: Letters rise, Letters blur in, Numbers count up, Photo settles, Photos wipe up, Zari draws, Sways in, Arch opens.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Arch | Name over a temple arch that opens on scroll. |  | built: `hero/ArchHero` |  | keep |
| B | Invitation | Full photo framed like a wedding card: name, local name, zari rule, rating. |  | close: `hero/PosterHero` |  | keep |
| C | Lookbook split | Light. Name and facts left, three-photo collage right. |  | close: `hero/SplitHero` |  | keep |
| D | Masthead | No photo at all. Name as big as the screen allows on the brand colour, facts underneath. | yes |  |  | build |
| E | Saree border | Photo on top, a woven zari border, then the name on a band of brand colour like the pallu of a saree. |  |  |  | build |
| F | Mosaic | Six photos in a grid with the name set into one tile. Shows range instantly. |  |  |  | build |
| G | Temple doors | Dark. Name above three arched doorways, each opening onto a piece of work. |  |  |  |  |
| H | Vertical name | Name runs up a brand-colour strip on the left; photo fills the rest, a small card holds the invitation. |  |  |  |  |
| I | Magazine cover | Full photo with the name as a masthead across the top and the rating as a cover line. |  |  |  |  |
| J | Duotone split | Name stacked word by word on the brand colour; photo tinted in the same colour beside it. |  |  |  |  |
| K | Arch tunnel | Dark. Four temple arches recede one inside the other, drawn in thread, with the work in the innermost arch. |  |  |  |  |
| L | Prints | Light. Three photo prints laid loosely on the page beside the name. |  |  |  |  |
| M | Rangoli ring | Round photo inside a thread ring with the name and year written around it. |  |  |  |  |
| N | Certificate | No photo. A framed card with the name, local name and a rating seal, like a guild certificate. | yes |  |  |  |
| O | Filmstrip | Full photo with a strip of thumbnails; tapping one swaps the main picture. |  |  |  |  |
| P | Chat opener | Name beside a WhatsApp-style chat: quick replies (bridal blouse, lehenga, alterations) write the message for them. |  |  |  | later |
| Q | Diagonal cut | Brand colour with the photo sliced in on a diagonal; name stacked word by word. |  |  |  |  |
| R | Jaali screen | Photo seen through a carved lattice in the brand colour; name on an arch-topped panel. |  |  |  |  |
| S | Bento | Rounded tiles: name, big photo, rating, garments delivered. Modern and scannable. |  |  | rounded tiles (shape rule) | skip |
| T | Since year | No photo. The founding year set enormous, name and tagline beneath. | yes |  |  |  |
| U | Photo in letters | Dark. The name so large that the photo shows through the letters. |  |  |  |  |
| V | Hanger rail | Garments hanging from a thread rail under the name, each labelled by kind. Suits rental boutiques. |  |  |  |  |
| W | Swing tag | Full photo with a garment tag hanging from a gold string: name, rating, invitation. |  |  |  |  |
| X | Broadsheet | Newspaper front page: masthead name, dateline, tagline as headline, photo with caption. |  | close: `hero/LedgerHero` |  | keep |
| Y | Photo slider | Three full photos you step through with arrows (never auto). Name and kind stay on top. |  |  |  |  |
| Z | Spotlight | Dark stage. Name huge behind an arched photo lit from below, so the work stands in front of the name. |  |  |  |  |

### 02 gallery

**Gallery** · Their work · `is.galleryA`–`is.galleryZ` in `Section Preview.dc.html`

Data: Existing: `media.work`, with categories taken from file names.

Lab motions: Filter / swap, Sways in, Photos wipe up, Photos settle, Drift, Zari draws.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Category grid | Uneven hang on a warm ground, zari borders, filter rail that re-lays the grid. |  | built: `gallery/CategoryGrid` |  | keep |
| B | Showcase rail | Dark. Tall arched cards sliding sideways with arrows; category in gold under each. |  | close: `gallery/RailGallery` |  | keep |
| C | Feature + strip | One large piece with an "Ask about this piece" WhatsApp button, thumbnails underneath. |  |  |  | build |
| D | Masonry | Three columns of photos at their natural heights, category and number under each. |  | close: `gallery/GridGallery` |  | keep |
| E | Arch colonnade | One tall arch per category in a row, like a temple corridor. Count under each. |  |  |  | build |
| F | Lookbook spread | Category list on the left; choosing one lays out a three-photo magazine spread. |  |  |  |  |
| G | Category tiles | Pick what you are planning from photo tiles; that category opens below. |  |  |  |  |
| H | Card deck | Dark. Photos stacked like prints; next and previous deal the deck. |  |  |  |  |
| I | Gallery wall | On the brand colour: photos in double gold frames hung salon-style at mixed sizes. |  |  |  |  |
| J | Index | Type-led list of what they make with tiny thumbnails and a WhatsApp button per row. Fine with few photos. | yes |  |  | build |
| K | Accordion | Dark. One arched panel per category; tapping one widens it and narrows the rest. |  |  |  |  |
| L | Zig-zag rows | Photo and category alternate left and right, each with an "Ask about" button. |  |  |  |  |
| M | Story circles | Round category bubbles with a gold ring, like highlights; tapping opens a full-screen viewer. |  |  |  |  |
| N | Lightbox grid | Even square grid; tapping any photo opens it large with next and previous. |  |  |  | build |
| O | Numbered rail | Sideways rail with a big outlined number behind each piece. |  |  |  |  |
| P | Sticky index | Title and current category stay put while photos scroll past (scroll inside the frame). |  |  | inner scroll; sticky on a real page |  |
| Q | Diamond lattice | On the brand colour: photos cut into gold-edged diamonds, like a jaali. |  |  |  |  |
| R | Contact sheet | Near-black film strips with sprocket holes, frame numbers and kind in gold. |  |  |  |  |
| S | Workroom pinboard | Prints taped to a board at slight angles, labelled by kind. |  |  |  |  |
| T | Coverflow | Dark. Centre photo large, neighbours turned away in perspective; arrows step through. |  |  | 3D turn (check "no 3D") | skip |
| U | Bento | Rounded tiles at mixed sizes with a kind label on each. |  |  | rounded tiles (shape rule) | skip |
| V | Full-bleed stack | One full-width photo per category stacked down the page, each with an "Ask about" button. |  |  |  |  |
| W | Clothes rail | Garments hanging from a thread rail, with category chips that change what hangs. |  |  |  |  |
| X | Catalogue | Grid of photos with a numbered brand-colour label and WhatsApp button on each. |  |  |  |  |
| Y | Instagram grid | Profile header with a "Follow on Instagram" button over a three-column square grid. |  |  |  |  |
| Z | Spotlight | Dark stage with one arched photo lit from below; category chips change the spotlight. |  |  |  |  |

### 03 reviews

**Testimonials** · Trust · `is.reviewsA`–`is.reviewsZ` in `Section Preview.dc.html`

Data: Existing: `reviews`, `testimonials`, `social.googleRating`. Praise tabs (X) need reviews tagged by topic.

Lab motions: Numbers count up, Stars fill in, Next review, Wipe in, Sways in.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Rating, dark | Huge Google rating and stars, three quotes, stats underneath. |  | built: `reviews/RatingReviews` |  | keep |
| B | One voice | One review set large with arrows; the others listed beside it to pick from. |  | close: `reviews/QuoteReviews` |  | keep |
| C | Cards on brand | Brand colour with the rating, and review cards sliding sideways. |  |  |  |  |
| D | Quote wall | Masonry of review cards on a warm ground. |  |  |  | build |
| E | Centre quote | Big gold quote mark, one review centred, dots to switch. |  |  |  |  |
| F | Rating seal | A round seal with the rating beside two reviews and a "Read all on Google" link. |  |  |  | build |
| G | Chat bubbles | Reviews shown as incoming chat messages with name and stars. |  |  |  |  |
| H | Pinned notes | On brand colour: reviews as paper notes pinned at slight angles. |  |  |  |  |
| I | Quote strip | Dark. Short quotes in pills on two rows; can scroll on a loop (rule-breaking motion). |  |  | loops (forbidden) | skip |
| J | Photo + review | Arched work photo with a brand-colour review card overlapping it. |  |  |  |  |
| K | Thread timeline | Reviews strung along a dashed thread with gold knots. |  |  |  |  |
| L | Order slips | Each review as a tailor's order slip with a "5★ delivered" stamp. |  |  |  |  |
| M | Big numbers | Rating, review count and garments delivered set huge, one quote below. |  |  |  |  |
| N | Initial cards | Cards with a coloured initial for each customer, stars and review. |  |  |  |  |
| O | Review deck | Dark. Reviews stacked like cards; arrows deal the next one. |  |  |  |  |
| P | Newspaper | Customer reports in newspaper columns with drop caps and a headline quote. |  |  |  |  |
| Q | Avatar picker | Row of customer initials; tapping one shows her review. |  |  |  |  |
| R | Zari frames | On brand colour: reviews inside double gold frames. |  |  |  |  |
| S | Ruled list | Calm, type-led rows: review on the left, name on the right. |  |  |  | build |
| T | Arch quote | One review inside a brand-colour temple arch, with arrows. |  |  |  |  |
| U | Bento | Rounded tiles: rating, three reviews, garments delivered. |  |  | rounded tiles (shape rule) | skip |
| V | Scroll reader | Dark. Large reviews that light up as you scroll (scroll inside the frame). |  |  | inner scroll; sticky on a real page |  |
| W | Stars first | Oversized five stars above each review. |  |  |  |  |
| X | Praise tabs | Tabs for Fitting, Handwork and On time, filled from what customers actually wrote. |  |  |  |  |
| Y | Google cards | Review cards with initial, stars and a "Write a review" button. |  |  |  |  |
| Z | Spotlight | Dark stage; one review lit in the centre, customer names as chips. |  |  |  |  |

### 04 contact

**WhatsApp contact** · Bookings · `is.contactA`–`is.contactZ` in `Section Preview.dc.html`

Data: Existing contact and branches. Form-only versions (M, W, Y) need no new data.

Lab motions: Tap demo, Typing, Button sheen, Wipe in.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | WhatsApp form | Name, number, need, date and note; send opens WhatsApp with it all written out. |  | built: `contact/WhatsAppForm` |  | keep |
| B | Live preview | Form on the left, the WhatsApp message building itself in a phone chat on the right. |  |  |  |  |
| C | Quick picks | Two taps, no typing: what you are planning and when, then one big send button. |  |  |  | build |
| D | Reach us trio | Three big cards: WhatsApp, Call, Visit, each with its number or area. |  |  |  | build |
| E | Book a fitting | Day chips for the next week and a time of day; a summary card sends the request. |  |  |  | build |
| F | Floating button | The WhatsApp button that floats on every page; tapping opens three quick options. |  |  |  |  |
| G | Bottom sheet | Dark. A "Contact us" button slides up a phone-style sheet of four options. |  |  |  |  |
| H | Store card | Map preview with a pin, address, hours, phone and a Directions button. |  |  |  |  |
| I | Hours board | Dark. Open or closed today, the weekly hours, WhatsApp and Call. |  |  |  |  |
| J | Scan to chat | Dark. The number set large with a copy button and a QR-style code to scan. |  |  |  |  |
| K | How ordering works | Three icon steps joined by a thread: send a photo, we suggest, come for a fitting. |  |  |  |  |
| L | Occasion picker | Tiles for wedding, reception, festival and more; the message is written for you. |  |  |  |  |
| M | Measurements | Blouse measurement fields with a tape-measure graphic; sends them with your enquiry. |  |  |  |  |
| N | Send a design | A dashed drop-zone style card inviting an Instagram or Pinterest photo. |  |  |  |  |
| O | Call me back | On brand colour: name, number and a best time to call. |  |  |  |  |
| P | Big number | The WhatsApp number as the headline, with WhatsApp, Call, Visit and Copy. |  |  |  |  |
| Q | Chat window | A chat that greets the visitor with what the boutique is known for, then quick replies. |  |  |  |  |
| R | Wedding banner | Brand-colour band between zari borders: "Planning a wedding? Let's talk." |  |  |  |  |
| S | Channel cards | Four cards: WhatsApp, Call, Instagram, Visit. |  |  |  |  |
| T | Come and visit | Dark with a grid: open today, address, hours and a glowing map pin. |  |  |  |  |
| U | Thumb bar | A bottom bar on phones (Call, Visit, WhatsApp) and a slim side rail on computers. |  |  |  |  |
| V | Visiting card | A business card that turns over on tap to show numbers, address and hours. |  |  | 3D turn (check "no 3D") |  |
| W | Wedding countdown | Pick the wedding date; a gold-edged seal shows the weeks to go. |  |  |  |  |
| X | WhatsApp + Instagram | Two big panels side by side: book on WhatsApp, see new work on Instagram. |  |  |  |  |
| Y | Fitting pass | Choose a day and time and a ticket-style pass fills in, ready to send. |  |  |  |  |
| Z | Spotlight | Dark stage with a glowing WhatsApp mark: "One message away". |  |  |  |  |

### 05 services

**Services & prices** · What they make · `is.servicesA`–`is.servicesZ` in `Section Preview.dc.html`

Data: Existing `services` and `pricing`. Tiers (F) and estimates (Q, W) need a price per item, which the config doesn't hold.

Lab motions: Tap demo, Leaders draw, Wipe in.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Columns + prices | Grouped columns with icons and the starting-price table. |  | built: `services/ColumnServices` |  | keep |
| B | Rate card | A printed rate card: dotted leaders to each price, delivery and express, groups below. |  | close: `services/ListServices` |  | keep |
| C | Price tiles + accordion | Three brand-colour price tiles, then groups that open to show every item. |  |  |  |  |
| D | Tailoring menu | Dark, framed like a restaurant menu with gold prices and a thread ornament. |  |  |  | build |
| E | Icon grid | Group tabs; each item is an icon tile that asks its price on WhatsApp. |  |  |  |  |
| F | Three tiers | Simple, designer and bridal as pricing cards with what each includes. |  |  |  |  |
| G | Tabs + price card | Underlined group tabs with a sticky brand-colour price card beside them. |  |  |  |  |
| H | How long it takes | Normal and express shown as day bars, with starting prices under them. |  |  |  |  |
| I | Swatch cards | One colour card per group: brand, accent, dark, paper. |  |  |  |  |
| J | Big price | "Blouses stitched from ₹400" set enormous, other prices as pills. |  |  |  | build |
| K | Do we make it? | A search box that filters everything they stitch, each with an Ask button. |  |  |  |  |
| L | Price medallions | Three gold-edged round medallions for the starting prices. |  |  |  |  |
| M | Bill book | Dark. Prices printed on a torn-off receipt from their bill book. |  |  |  |  |
| N | Known for | Their three "known for" specialities as big cards, other services below. |  |  |  | build |
| O | Service rail | Sideways cards, one per item, with icons and Ask price. |  |  |  |  |
| P | The index | Type-led numbered index of groups with counts. |  |  |  |  |
| Q | Price estimate | Pick a garment and toggle express; a live estimate card updates. |  |  |  |  |
| R | Price band | Brand band between zari borders with two rows of priced pills. |  |  |  |  |
| S | Sticky price card | Dark price card fixed beside group cards full of item chips. |  |  |  |  |
| T | Atelier list | Dark luxe: gold-ringed group icons, ruled prices, crown ornament. |  |  |  |  |
| U | Bento | Rounded tiles: heading, three prices, delivery, express, four groups. |  |  | rounded tiles (shape rule) | skip |
| V | Yes, we do that | Every item with a filled check, plus an "Ask anyway" card. |  |  |  |  |
| W | Three-tap price | Pick garment and handwork; a WhatsApp message asks for the price. |  |  |  |  |
| X | Price questions | FAQ accordion answered with their real prices and delivery times. |  |  |  |  |
| Y | Service cloud | Every service as a tappable pill at mixed sizes and colours. |  |  |  |  |
| Z | Spotlight | Dark stage; one starting price lit huge, chips to switch. |  |  |  |  |

### 06 story

**Owner's story** · About them · `is.storyA`–`is.storyZ` in `Section Preview.dc.html`

Data: Existing `owner` and `established`. Video (O) needs a clip; promises (M) need new text or fixed copy.

Lab motions: Words fill in, Wipe in, Seal turns, Tab demo.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Portrait + letter | Arched owner photo beside the story, signed with her name. |  | close: `story/InkStory` |  | keep |
| B | Big quote | Her first line set large, with a small round portrait. |  |  |  | build |
| C | Journey timeline | From the year they started to today, on a dashed thread. |  |  |  |  |
| D | Arch portrait + numbers | Story with years, garments and rating under it; name tag on the photo. |  |  |  |  |
| E | Dark editorial | Dark, huge faded year behind, two-column story with a drop cap. |  |  |  | build |
| F | Letter | A taped handwritten-style note: "Dear customer…", signed. |  |  |  | build |
| G | Polaroid | Tilted polaroid of the owner, story and "known for" callout. |  |  |  |  |
| H | Numbers first | Big stat column beside the story. |  |  |  |  |
| I | Year block | Brand block with the start year huge; story beside it. |  |  |  |  |
| J | Interview | Three questions answered from their own story. |  |  |  |  |
| K | Workroom photo | Full-bleed workroom photo with a frosted story card. |  |  | frosted glass (contrast over photos) |  |
| L | Zari frame | Story inside a double gold frame on brand colour. |  |  |  |  |
| M | Values | Three promise cards: made to measure, handwork, on time. |  |  |  |  |
| N | Round seal | Portrait inside a slowly turning "Handmade since" seal. |  |  | turns continuously (nothing loops) | skip |
| O | Meet the maker | Video slot with a play button beside her story. |  |  | needs a video clip |  |
| P | Chapters | Numbered chapters: the beginning, the craft, today. |  |  |  |  |
| Q | Designer card | An ID-style profile card with role, specialities, since. |  |  |  |  |
| R | Word by word | Her opening line fills in word by word. |  |  |  |  |
| S | Story tabs | Tabs for Our story, Our promise, Our workroom. |  |  |  |  |
| T | Dark luxe founder | Crown ornament, the founder's name large, gold rule. |  |  |  |  |
| U | Bento | Portrait, quote, year, rating and story tiles. |  |  | rounded tiles (shape rule) | skip |
| V | Stitch line | Story paragraphs strung on a running-stitch thread. |  |  |  |  |
| W | Instagram story | Story with their real handle, followers and a photo grid. |  |  |  |  |
| X | Year watermark | Outlined start year behind a centred story. |  |  |  |  |
| Y | Photo collage | Owner, workroom and close-up photos overlapped. |  |  |  |  |
| Z | Spotlight | Dark stage; glowing round portrait with her quote. |  |  |  |  |

### 07 process

**Making process** · About them · `is.processA`–`is.processZ` in `Section Preview.dc.html`

Data: Built-in step copy; delivery days from `pricing.deliveryDays`.

Lab motions: Step demo, Thread draws, Wipe in, Medallions lift.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Numbered grid | Six steps with icons and large thread-colour numbers. |  |  |  |  |
| B | Thread line | Round icon steps joined by a dashed thread. |  |  |  | build |
| C | Photo rows | A photo per step with the day it happens. |  |  |  |  |
| D | Dark grid | Gold numerals on a dark ruled grid. |  |  |  |  |
| E | Step viewer | Tabs for each step; a photo and text panel with Next. |  |  |  |  |
| F | Photo cards | Card per step with a photo and number tag. |  |  |  |  |
| G | Day bars | Each step as a bar across their real delivery days. |  |  |  | build |
| H | Zig-zag | Alternating photo and text rows with huge numbers. |  |  |  |  |
| I | Arcade | On brand colour: six gold-edged temple arches, one per step, with Roman numerals and a zari base. |  |  |  |  |
| J | Accordion | Numbered steps that open to explain. |  |  |  |  |
| K | Sticky intro | Heading stays put while the steps scroll past. |  |  |  |  |
| L | Pattern sheet | Steps as dashed pattern pieces on a cutting-mat grid. |  |  |  |  |
| M | Checklist + bring | Tick-list of steps beside a "What to bring" card. |  |  |  |  |
| N | Bento | Colour tiles of mixed sizes, one per step. |  |  | rounded tiles (shape rule) | skip |
| O | Photo rail | Sideways cards with photos and big numbers. |  |  |  |  |
| P | Type index | Type-led numbered list, very editorial. |  |  |  | build |
| Q | Order tracker | A delivery-style tracker showing where an order is. |  |  |  |  |
| R | Zari frame | Six steps inside a double gold frame. |  |  |  |  |
| S | Video + steps | A "watch it being made" video slot beside the steps. |  |  | needs a video clip |  |
| T | Atelier method | Dark luxe with Roman numerals and a crown. |  |  |  |  |
| U | Arch viewer | Tap a step; the arched photo beside it changes. |  | close: `process/StickyProcess` |  | keep |
| V | Stitch line | Steps strung on a running stitch with a needle. |  |  |  |  |
| W | Calendar | Day 1, the middle days and the last day as calendar cards. |  |  |  |  |
| X | Medallions | Round icon medallions that lift on hover. |  |  | hover on something not clickable |  |
| Y | Progress ring | A ring fills as you step through; numbered dots. |  |  |  |  |
| Z | Spotlight | Dark stage, one step lit at a time with pips. |  |  |  |  |

### 08 faq

**FAQ** · Trust · `is.faqA`–`is.faqZ` in `Section Preview.dc.html`

Data: **New field:** `faq` (question and answer), or built-in answers drawn from pricing and delivery.

Lab motions: Tap demo, Threads draw, Wipe in.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Accordion | Numbered questions that open, on a lattice ground. |  |  |  | build |
| B | Sticky intro | Heading and WhatsApp stay put while the questions scroll. |  |  |  |  |
| C | Topic tabs | Prices, Timing, Ordering, Visiting tabs with answer cards. |  |  |  |  |
| D | Dark accordion | Gold numerals and a soft glow on dark. |  |  |  |  |
| E | Card grid | A card per question with a ringed icon and italic number. |  |  |  |  |
| F | WhatsApp chat | Questions and answers as a WhatsApp conversation. |  |  |  |  |
| G | List + answer panel | Pick a question; the brand panel shows the answer. |  |  |  |  |
| H | Editorial rows | Large italic numbers, type-led rows. |  |  |  |  |
| I | Brand accordion | On brand colour with gold edges and a zari base. |  |  |  |  |
| J | Quick facts | Four price and delivery facts above the accordion. |  |  |  | build |
| K | Two columns | Question left, answer right, ruled rows. |  |  |  | build |
| L | Arch cards | Each question inside a gold-edged temple arch. |  |  |  |  |
| M | Big numbers | Price and delivery answers set huge, others below. |  |  |  |  |
| N | Bento | Colour tiles of mixed sizes, one per question. |  |  | rounded tiles (shape rule) | skip |
| O | Card rail | Sideways question cards with arrows. |  |  |  |  |
| P | Ask the Tailor | Newspaper-style column with a masthead. |  |  |  |  |
| Q | Flip cards | Tap a card to turn it over for the answer. |  |  |  |  |
| R | Zari frame | Questions inside a double gold frame on brand colour. |  |  |  |  |
| S | Conversation | Question and answer bubbles, customer and boutique. |  |  |  |  |
| T | Atelier | Dark luxe with Roman numerals and a crown. |  |  |  |  |
| U | Arch photo | Arched work photo beside the accordion. |  |  |  |  |
| V | Stitch line | Questions strung on a running stitch. |  |  |  |  |
| W | Owner answers | Answered by the owner, with her signature. |  |  |  |  |
| X | Question chips | Tap a question chip; the answer card changes. |  |  |  |  |
| Y | One at a time | Stepper with progress bar and arrows. |  |  |  |  |
| Z | Spotlight | Dark stage, one question lit at a time with pips. |  |  |  |  |

### 09 ig

**Instagram feed** · Their work · `is.igA`–`is.igZ` in `Section Preview.dc.html`

Data: `social.instagram` handle; posts use `media.work` (no live Instagram feed).

Lab motions: Wipe in, Tap demo, Zari draws.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Profile + grid | Handle, follow button and a clean 3×3 grid. |  | built: `instagram/GridInstagram` |  | keep |
| B | Phone profile | A phone showing their Instagram profile, beside the intro. |  |  |  |  |
| C | Masonry | Mixed-height posts in columns. |  |  |  |  |
| D | Dark grid | 3×3 grid on dark with a gold glow. |  |  |  |  |
| E | Reels strip | Tall reel cards that scroll sideways. |  |  |  |  |
| F | Stories + grid | Story highlight circles for Bridal, Blouses, Kids and more. |  | built: `instagram/StoriesInstagram` |  | keep |
| G | Post rail | Full post cards with like, comment and caption. |  |  |  |  |
| H | Feature + four | One large post beside four smaller ones. |  | built: `instagram/FeatureInstagram` |  | keep |
| I | Brand band | On brand colour; framed tiles and a zari base. |  |  |  |  |
| J | Polaroids | Tilted instant photos with handwritten captions. |  |  |  |  |
| K | Arch windows | Posts inside gold-edged temple arches. |  |  |  |  |
| L | Film strip | Dark film reel of posts with sprocket edges. |  |  |  |  |
| M | Single post | One large Instagram post beside the intro. |  |  |  |  |
| N | Bento | Posts in a mosaic of mixed sizes. |  |  | rounded tiles (shape rule) | skip |
| O | Loop strip | A row of posts looping sideways. Rule-breaking motion. |  |  | loops (forbidden) | skip |
| P | Magazine | Editorial "On our feed this week" with a ruled masthead. |  |  |  |  |
| Q | Phone mockup | A phone with their grid, and three reasons to follow. |  |  |  |  |
| R | Zari frame | A gallery wall inside a double gold frame. |  |  |  |  |
| S | Tag us | Hashtag chips above the grid. |  |  |  |  |
| T | Atelier | Dark luxe with gold-framed posts and captions. |  |  |  |  |
| U | Sticky intro | Intro stays put while the grid scrolls. |  |  |  |  |
| V | Photo deck | Stacked posts dealt with arrows. |  |  |  |  |
| W | Worn by customers | Posts with tag labels, as if tagged by customers. |  |  |  |  |
| X | Category tabs | Filter posts by Bridal, Blouses, Lehengas and Kids. |  |  |  |  |
| Y | Scan to follow | A QR-style code beside a six-post grid. |  |  |  |  |
| Z | Spotlight | Dark stage, one post lit at a time with pips. |  |  |  |  |

### 10 bridal

**Bridal packages** · What they make · `is.bridalA`–`is.bridalZ` in `Section Preview.dc.html`

Data: **New field:** bridal packages (name, what's included, price).

Lab motions: Wipe in, Tap demo, Zari draws.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Three tiers | Essential, Signature and Trousseau cards; the middle one raised and in brand colour. |  |  |  | build |
| B | Dark collection | Dark luxe tiers with gold hairline frames and a crown. |  |  |  |  |
| C | Compare table | What each package includes, side by side. |  |  |  |  |
| D | Package tabs | Switch packages; one detailed panel with price and list. |  |  |  | build |
| E | Arch cards | Each package inside a gold-edged temple arch. |  |  |  |  |
| F | Zari frame | On brand colour inside a double gold frame. |  |  |  |  |
| G | Week-by-week plan | Suggested timeline from consult to final fit. |  |  |  |  |
| H | Photo + list | Arched bridal photo beside a ruled package list. |  |  |  |  |
| I | Photo rail | Sideways package cards with photos. |  |  |  |  |
| J | Accordion | Packages that open to show what is included. |  |  |  |  |
| K | Bridal menu | Dark framed menu with dotted leaders to each price. |  |  |  |  |
| L | Invitation | A wedding-invite card inviting her to a consult. |  |  |  |  |
| M | Big prices | Starting prices set huge in a ruled grid. |  |  |  |  |
| N | Bento | Photo, three package tiles and a consult tile. |  |  | rounded tiles (shape rule) | skip |
| O | Package deck | Stacked cards dealt with arrows. |  |  |  |  |
| P | The Bridal Edit | Magazine columns with drop caps. |  |  |  |  |
| Q | Build your look | Tick what she needs; a live estimate and send button. |  |  |  |  |
| R | Couture | Dark atelier with Roman numerals and zari. |  |  |  |  |
| S | Sticky intro | Intro stays put while framed package cards scroll. |  |  |  |  |
| T | Bridal pass | Ticket-style passes with a code and Reserve button. |  |  |  |  |
| U | What is included | Tabs tick and grey out items per package. |  |  |  |  |
| V | Arched stories | Photo cards with arched tops and prices. |  |  |  |  |
| W | Owner consult | The owner invites brides to a one-to-one consult. |  |  |  | build |
| X | Ceremony tabs | Wedding, Reception, Engagement, Haldi looks. |  |  |  |  |
| Y | Wedding countdown | Pick the date; a seal shows weeks to go with advice. |  |  |  |  |
| Z | Spotlight | Dark stage, one package lit at a time with pips. |  |  |  |  |

### 11 alt

**Before / after alterations** · Their work · `is.altA`–`is.altZ` in `Section Preview.dc.html`

Data: **New photos:** before/after pairs, named by file like the work categories (`before-01.jpg`, `after-01.jpg`).

Lab motions: Slider sweep, Tap demo, Wipe in.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Drag slider | One large photo; drag across to compare before and after. |  |  |  | build |
| B | Arch slider + tabs | Arched slider with Blouse, Lehenga, Kurti and Upcycle tabs. |  |  |  |  |
| C | Pairs grid | Before and after side by side for each alteration. |  |  |  | build |
| D | Dark slider | Slider on dark with arrows to step through. |  |  |  |  |
| E | Tap toggle | Before / After switch over one large photo. |  |  |  |  |
| F | Hover reveal | Hover a card to reveal the after photo. |  |  |  | skip |
| G | Diagonal split | Each photo split on the bias, before and after. |  |  |  |  |
| H | Pairs rail | Sideways before-after pairs. |  |  |  |  |
| I | Brand band | On brand colour; pairs in gold frames with a zari base. |  |  |  |  |
| J | Stacked | Before above, after below, with an arrow between. |  |  |  |  |
| K | Arch pairs | Pairs inside tall temple arches. |  |  |  |  |
| L | Taped polaroids | Pairs pinned with tape and handwritten captions. |  |  |  |  |
| M | What we fix | Alteration services list beside a slider. |  |  |  | build |
| N | Bento | Slider, after photos and a services tile. |  |  | rounded tiles (shape rule) | skip |
| O | Pair deck | Stacked pairs dealt with arrows. |  |  |  |  |
| P | A Second Life | Magazine cover story with a drop cap. |  |  |  |  |
| Q | Three stages | Before, refitting and after for each alteration. |  |  |  |  |
| R | Zari frame | Slider inside a double gold frame on brand colour. |  |  |  |  |
| S | Sticky intro | Intro and services stay put while pairs scroll. |  |  |  |  |
| T | Atelier | Dark luxe pairs with gold frames. |  |  |  |  |
| U | Upcycling | An old saree made into a lehenga, as a feature. |  |  |  |  |
| V | Stitch line | Pairs strung on a running stitch. |  |  |  |  |
| W | Slider + review | Slider beside a real Google review about fit. |  |  |  |  |
| X | Category tabs | Tabs switch one large before-after panel. |  |  |  |  |
| Y | Services + slider | Ruled services list with a sticky arched slider. |  |  |  |  |
| Z | Spotlight | Dark stage, one pair lit at a time with pips. |  |  |  |  |

### 12 offer

**Offers banner** · Bookings · `is.offerA`–`is.offerZ` in `Section Preview.dc.html`

Data: **New field:** offers (text, valid till).

Lab motions: Tap demo, Slides in, Wipe in.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Top strip | Slim announcement bar across the top of the page. |  |  |  | build |
| B | Rotating pill | A floating pill that steps through offers. |  |  |  | skip |
| C | Photo card | Photo beside the offer and a WhatsApp button. |  |  |  | build |
| D | Dark framed band | Dark luxe with double gold hairlines. |  |  |  |  |
| E | Coupon ticket | Perforated coupon with a code to show at the counter. |  |  |  | build |
| F | Pop-up | A modal offer over the page, with close. |  |  | pop-up over content | skip |
| G | Sticky bar | Dismissible bar pinned to the bottom of the screen. |  |  |  |  |
| H | Three offers | Festive, wedding season and express as cards. |  |  |  |  |
| I | Zari band | Brand band between zari borders with the rating. |  |  |  |  |
| J | Big price | "Blouses stitched from ₹X" set enormous. |  |  |  |  |
| K | Arch card | The offer inside a brand-colour temple arch. |  |  |  |  |
| L | Festive | Marigold garland, diyas and a festive offer. |  |  |  |  |
| M | Book by | "Book by" date with day tiles. |  |  |  |  |
| N | Bento | Photo and three offer tiles. |  |  | rounded tiles (shape rule) | skip |
| O | Scrolling strip | Offers loop across a brand strip. Rule-breaking motion. |  |  | loops (forbidden) | skip |
| P | Print ad | Framed like a newspaper advertisement. |  |  |  |  |
| Q | Tap to reveal | A gift card that reveals the offer on tap. |  |  |  |  |
| R | Zari frame | Offer inside a double gold frame on brand colour. |  |  |  |  |
| S | Side tab | An "Offers" tab on the edge that slides a panel open. |  |  |  |  |
| T | Atelier | Dark luxe, crown and "By appointment". |  |  |  |  |
| U | Photo overlay | Full-bleed photo with the offer over a dark fade. |  |  |  |  |
| V | Rosette seal | A pleated rosette badge beside the offer. |  |  |  |  |
| W | Owner note | A taped handwritten-style note from the owner. |  |  |  |  |
| X | Offer tabs | Festive, Wedding and Express tabs with a photo. |  |  |  |  |
| Y | What is included | Offer beside a checklist card. |  |  |  |  |
| Z | Spotlight | Dark stage, one offer lit at a time. |  |  |  |  |

### 13 trust

**Trust badges** · Trust · `is.trustA`–`is.trustZ` in `Section Preview.dc.html`

Data: Mostly existing (rating, stats, years, payment modes). Badges like "home trial" need new flags.

Lab motions: Wipe in, Stars fill in.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Stat strip | Four ruled badges: rating, years, garments, delivery. |  | built: `trust/StatTrust` |  | keep |
| B | Seal rings | Round seals with gold double rings. |  |  |  |  |
| C | Scrolling strip | Badges loop across a brand strip. Rule-breaking motion. |  |  | loops (forbidden) | skip |
| D | Dark numbers | Dark luxe with large gold numbers. |  |  |  |  |
| E | Bento | Big rating tile with four stat tiles. |  |  | rounded tiles (shape rule) | skip |
| F | Rosettes | Pleated rosette awards with ribbons. |  |  |  |  |
| G | Promise list | Six promises beside the rating. |  | built: `trust/PromiseTrust` |  | keep |
| H | Rating card | Big Google rating card with stat boxes. |  |  |  |  |
| I | Zari band | Brand band of badges between zari borders. |  |  |  |  |
| J | Stamps | Tilted ink stamps. |  |  |  |  |
| K | Arch badges | Badges inside temple arches. |  |  |  |  |
| L | Certificate | A framed certificate of craft. |  |  |  |  |
| M | Six promises | Icon grid of what they never skip. |  |  |  |  |
| N | Google badge | A single Google rating badge. |  |  |  |  |
| O | Counters | Dark counter tiles; numbers count up. |  |  |  |  |
| P | By the numbers | Newspaper-style numbers in columns. |  |  |  |  |
| Q | Chip row | A row of trust chips, for under the hero. |  | built: `trust/LineTrust` |  | keep |
| R | Zari frame | Stats inside a double gold frame. |  |  |  |  |
| S | Sticky intro | Stats stay put while promises scroll. |  |  |  |  |
| T | Atelier | Dark luxe promises with Roman numerals. |  |  |  |  |
| U | Photo overlay | Frosted badges over a work photo. |  |  | frosted glass (contrast over photos) |  |
| V | Timeline | Opened, reviews, garments, today. |  |  |  |  |
| W | Fit guarantee | Owner-signed guarantee seal. |  |  |  |  |
| X | Promise accordion | Promises that open to explain. |  |  |  |  |
| Y | Inline strip | One slim line of proof. |  |  |  |  |
| Z | Spotlight | Dark stage with the rating lit huge. |  |  |  |  |

### 14 map

**Location map** · Bookings · `is.mapA`–`is.mapZ` in `Section Preview.dc.html`

Data: Existing `branches[].mapsUrl`. An embedded map needs coordinates or an embed link.

Lab motions: Wipe in, Zari draws.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Map + card | Framed live map with a floating address card. |  | built: `visit/MapVisit` |  | keep |
| B | Split details | Address, hours and phone beside a framed map. |  | close: `visit/StoreVisit` |  | keep |
| C | Full-bleed | Edge-to-edge map with a card over it. |  |  |  |  |
| D | Dark map | Night-toned map with gold details. |  |  |  |  |
| E | Arch window | The map seen through a temple arch. |  |  |  |  |
| F | Three ways | Walk in, ask for the pin, or call, above the map. |  | built: `visit/WaysVisit` |  | keep |
| G | Hours board | Open now and weekly hours beside a dark map. |  |  |  |  |
| H | Round medallion | Circular map framed with a gold ring. |  |  |  |  |
| I | Zari band | Brand band with a map strip between zari borders. |  |  |  |  |
| J | Postcard | "Wish you were here" postcard with a map stamp. |  |  |  |  |
| K | Zari frame | Map inside a double gold frame. |  |  |  |  |
| L | Find us. | Huge type, details and map. |  |  |  |  |
| M | Open-now pin | Map with an open or closed badge on top. |  |  |  |  |
| N | Bento | Map, address, hours, pin and directions tiles. |  |  | rounded tiles (shape rule) | skip |
| O | Map tabs | Switch between map, hours and contact. |  |  |  |  |
| P | Classified | Newspaper classified ad beside a mono map. |  |  |  |  |
| Q | Phone map | A phone showing the map and a Start button. |  |  |  |  |
| R | Visit pass | Ticket-style pass with the map as its stub. |  |  |  |  |
| S | Sticky details | Details stay put beside a tall map. |  |  |  |  |
| T | Atelier | Dark luxe framed map, by appointment. |  |  |  |  |
| U | Shopfront | Shop photo beside the map: "This is us". |  | built: `visit/ShopfrontVisit` |  | keep |
| V | Your visit | What to expect on arrival, with the map. |  |  |  |  |
| W | Owner invite | A handwritten invitation beside the map. |  |  |  |  |
| X | Map + actions | Map with three action cards overlapping it. |  |  |  |  |
| Y | Slim line | One-line address with a slim map. |  |  |  |  |
| Z | Spotlight | Dark map with a glowing spotlight on the pin. |  |  |  |  |

### 15 footer

**Footer** · Site chrome · `is.footerA`–`is.footerZ` in `Section Preview.dc.html`

Data: Existing fields.

Lab motions: Name rises, Zari draws, Icons lift, Wipe in.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Brand footer | Brand colour, logo, the name at full size, pages, contact icons. |  | built: `footer/BrandFooter` |  | keep |
| B | Columns | Dark with a zari edge: about, pages, visit and contact columns. |  | built: `footer/ColumnsFooter` |  | keep |
| C | Grand sign-off | Dark and centred: logo, huge name, local name, WhatsApp, Call, Directions. |  |  |  | build |
| D | Minimal | Light and centred: logo, name, pages, icons. |  | built: `footer/MinimalFooter` |  | keep |
| E | Big invitation | A brand-colour "Planning something? Let's talk." card above a compact row. |  |  |  | build |
| F | Map + info | Dark: a map tile with the logo pinned, full contact details beside it. |  |  |  |  |
| G | Hours board | Open or closed today and the weekly hours next to the logo and a WhatsApp button. |  |  |  |  |
| H | Double zari | Paper ground between double zari borders; visit, logo, talk-to-us columns. |  |  |  |  |
| I | Outline name | The boutique name set edge to edge in outlined letters along the bottom. |  |  |  |  |
| J | Numbers | Dark: rating, garments delivered and years as stat cards. |  |  |  |  |
| K | Three cards | Brand colour with Visit, Chat and Follow cards. |  |  |  |  |
| L | New designs | "Get new designs on WhatsApp" invitation beside the contact details. |  |  |  |  |
| M | Arch top | The footer rises in a great arch with the logo at its crown. |  |  |  |  |
| N | Split | Brand block with logo and tagline; light half with pages and contact. |  |  |  |  |
| O | Signature | "Stitched with care in the city" between thread lines. |  |  |  |  |
| P | Sitemap | Five columns: about, pages, known for, starting prices, contact. |  |  |  |  |
| Q | Thumb bar | Dark footer ending in a Call · Directions · WhatsApp bar. |  |  |  |  |
| R | Receipt | Store details printed on a bill-book receipt. |  |  |  |  |
| S | Social tiles | Four big tiles: WhatsApp, Instagram, Google, Call. |  |  |  |  |
| T | Dark luxe | Near-black with gold hairlines, crown and "By appointment". |  |  |  |  |
| U | Bento | Rounded tiles: logo, hours, address, WhatsApp, rating. |  |  | rounded tiles (shape rule) | skip |
| V | Thread edge | A running-stitch border with a needle across the top. |  |  |  |  |
| W | Photo strip | A row of work photos across the top, then logo, pages, icons. |  |  |  |  |
| X | Since year | The founding year set huge beside the contact details. |  |  |  |  |
| Y | Visiting card | Front and back of their card side by side. |  |  |  |  |
| Z | Spotlight | Dark stage with the logo glowing in rings, name and WhatsApp. |  |  |  |  |

### 16 fabric

**Fabric swatches** · Speciality · `is.fabricA`–`is.fabricZ` in `Speciality Preview.dc.html`

Data: **New data:** fabrics they stock (name, photo).

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Swatch book | Pinked squares in a grid with what each fabric is best for, and a send-your-fabric button. |  |  |  | later |
| B | Fabric shelf | Dark. Bolts standing on a gold shelf; tap one to lift it and read about it. |  |  |  |  |
| C | Swatch fan | Swatches fanned like a shade card; arrows or a tap bring one forward. |  |  |  |  |
| D | Guide + detail | Fabric list on the left, large swatch with feel, best for and care on the right. |  |  |  |  |
| E | By occasion | Wedding, reception, festival or every day; three suggested fabrics for each. |  |  |  |  |
| F | Swatch tags | Each fabric on a punched swing tag with weight and best use. |  |  |  |  |
| G | Fabric rail | Tall swatches hanging from a thread rail that scrolls sideways. |  |  |  |  |
| H | Compare two | Pick two fabrics and compare weight, sheen and drape as dot scales. | yes |  |  |  |
| I | Brand band | On brand colour between zari borders; swatches in double gold frames. |  |  |  |  |
| J | Index | Type-led numbered list with a tiny swatch and a WhatsApp button per row. |  |  |  |  |
| K | Arch swatches | Each fabric inside a temple arch with a gold hairline. |  |  |  |  |
| L | Workroom pinboard | Swatches taped to a board at slight angles with handwritten names. |  |  |  |  |
| M | Feel scale | Fabrics plotted from sheer to heavy, matte to shiny, structured to flowing. | yes |  |  |  |
| N | Bento | Big swatch, four small ones, title and a send-your-fabric tile. |  |  | rounded tiles (shape rule) | skip |
| O | Swatch deck | Dark. Swatch cards stacked like prints; arrows deal the next one. |  |  |  |  |
| P | Fabric notes | Magazine page: "Know your fabric" in two ruled columns. |  |  |  |  |
| Q | Fabric finder | Two taps (occasion, feel) and a suggested fabric with an Ask button. |  |  |  |  |
| R | Zari frame | Round swatches inside a double gold frame on brand colour. |  |  |  |  |
| S | Sticky intro | Intro stays put while fabric cards scroll past (scroll inside the frame). |  |  | inner scroll; sticky on a real page |  |
| T | Atelier | Dark luxe list with Roman numerals, round swatches and a crown. |  |  |  |  |
| U | Design + fabric | A work photo with swatch dots; ask the price of that design in the fabric picked. |  |  |  |  |
| V | Roll ends | Each fabric shown as the end of a rolled bolt. |  |  |  |  |
| W | Bring your own | A dashed "send a photo of your fabric" card beside quick fabric links. | yes |  |  | later |
| X | Care guide | Fabric tabs with how to wash, iron and store each one. |  |  |  |  |
| Y | Fabric + shade | Pick a fabric and a shade; the large swatch recolours. |  |  |  |  |
| Z | Spotlight | Dark stage with one round swatch lit in the centre; chips to switch. |  |  |  |  |

### 17 blouse

**Blouse design picker** · Speciality · `is.blouseA`–`is.blouseZ` in `Speciality Preview.dc.html`

Data: Built-in neck, back and sleeve drawings; no boutique data.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Builder | Neck, back and sleeve chips beside a live front and back diagram; sends the design on WhatsApp. | yes |  |  | later |
| B | Four steps | Neck, back, sleeves, extras one step at a time with a progress bar. | yes |  |  |  |
| C | Neck gallery | Every neck as a diagram card; back and sleeves in a bar underneath. | yes |  |  | later |
| D | Design room | Dark. Large diagram in the middle with a front / back switch, options either side. | yes |  |  |  |
| E | Part tabs | Underlined tabs for each part with option tiles; summary card beside. | yes |  |  |  |
| F | Order slip | A ruled tailor's order slip with tick boxes, torn off and sent. | yes |  |  |  |
| G | Chat | WhatsApp-style chat: the boutique asks three questions, quick replies answer. | yes |  |  |  |
| H | Front / back | One big diagram that turns from front to back; options beside it. | yes |  |  |  |
| I | Neck medallions | On brand colour between zari borders: necks in gold-ringed rounds. | yes |  |  |  |
| J | Spec sheet | Choices and starting prices as a dotted-leader spec sheet beside the diagrams. | yes |  |  |  |
| K | Neck arches | Each neck inside a temple arch; a note on the one picked. | yes |  |  |  |
| L | Sketchbook | Graph paper, diagrams drawn at an angle, handwritten notes. | yes |  |  |  |
| M | Mix and match | Three dials for neck, back and sleeves, each with arrows. | yes |  |  |  |
| N | Bento | Big diagram, a tile per part with arrows, title and send tiles. | yes |  | rounded tiles (shape rule) | skip |
| O | Design deck | Dark. Popular combinations stacked like cards; arrows deal the next. | yes |  |  |  |
| P | Blouse notes | Magazine page of four popular combinations with diagrams. | yes |  |  |  |
| Q | By occasion | Wedding, reception, festival or office sets a combination you can change. | yes |  |  |  |
| R | Zari frame | The builder inside a double gold frame on brand colour. | yes |  |  |  |
| S | Sticky preview | Diagrams stay put while every option scrolls past (scroll inside the frame). | yes |  | inner scroll; sticky on a real page |  |
| T | Atelier | Dark luxe list of necklines with Roman numerals and diagrams. | yes |  |  |  |
| U | Make it yours | A work photo beside the builder: start from a piece and change it. |  |  |  |  |
| V | Stitch line | Four steps strung on a dashed thread; the picked step opens below. | yes |  |  |  |
| W | Finishing touches | Tick-list of extras (piping, latkans, aari, maggam) beside the design. | yes |  |  |  |
| X | Neck guide | Accordion: what each neck does and what to wear it with. | yes |  |  |  |
| Y | Send a design | "Saw a design you love?" photo card beside a three-tap builder. | yes |  |  |  |
| Z | Spotlight | Dark stage with one neckline lit large; chips to switch. | yes |  |  |  |

### 18 measure

**Measurement guide** · Speciality · `is.measureA`–`is.measureZ` in `Speciality Preview.dc.html`

Data: Built-in guide; no boutique data.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Guide + diagram | List of ten measurements; the blouse drawing shows where the tape goes and how to take it. | yes |  |  | later |
| B | Fill in | Inputs for every measurement beside the drawing; units switch; sends on WhatsApp. | yes |  |  | later |
| C | Size chart | A general size chart in inches or centimetres; tap a row to highlight it. | yes |  |  |  |
| D | Tape measure | Dark. A gold tape with each measurement marked on it; tap one to see how. | yes |  |  |  |
| E | One at a time | Step through each measurement with its drawing and an input. | yes |  |  |  |
| F | Measurement card | A tailor's card with dashed blanks to fill in and send. | yes |  |  |  |
| G | Cards | A card per measurement with its drawing; tap for how to take it. | yes |  |  |  |
| H | Front and back | All the tape lines on the front and back, with a numbered key. | yes |  |  |  |
| I | Brand band | On brand colour between zari borders: chips and the drawing. | yes |  |  |  |
| J | Before you measure | What you need and five tips. | yes |  |  |  |
| K | Inches or cm | Unit switch and an input per measurement with usual values. | yes |  |  |  |
| L | Notebook | Lined paper with handwritten entries you can fill in. | yes |  |  |  |
| M | Stepper | Pick a measurement and set it with big plus and minus buttons. | yes |  |  |  |
| N | Bento | Drawing, how-to with arrows, title and send tiles. | yes |  | rounded tiles (shape rule) | skip |
| O | Card deck | Dark. Measurement cards dealt one by one. | yes |  |  |  |
| P | Fit notes | Magazine page: how to measure yourself, in two columns. | yes |  |  |  |
| Q | Size finder | Pick your bust size; a card shows the usual measurements. | yes |  |  |  |
| R | Zari frame | The size chart inside a double gold frame on brand colour. | yes |  |  |  |
| S | Sticky drawing | Drawing stays put while the how-tos scroll (scroll inside the frame). | yes |  | inner scroll; sticky on a real page |  |
| T | Atelier | Dark luxe list of the ten measures with Roman numerals. | yes |  |  |  |
| U | Bring a blouse | Workroom photo: bring a blouse that fits or come in to be measured. |  |  |  |  |
| V | Follow the tape | Measurements strung along a tape; tap one for its drawing. | yes |  |  |  |
| W | Measuring visit | Book a visit to be measured, with opening hours. | yes |  |  |  |
| X | Questions | Accordion of common measuring questions. | yes |  |  |  |
| Y | Fit profile | A profile card of all measurements with a filled count. | yes |  |  |  |
| Z | Spotlight | Dark stage with one measurement lit on the drawing. | yes |  |  |  |

### 19 look

**Lookbook** · Speciality · `is.lookA`–`is.lookZ` in `Speciality Preview.dc.html`

Data: **New data:** looks grouped by occasion (photo file names).

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Editorial spread | One tall photo and two smaller ones, switched by chapter: bridal, celebrations, festive. |  |  |  | later |
| B | Chapters | Dark. One full-bleed photo per chapter with the chapter name set large. |  |  |  |  |
| C | Page rail | Tall looks that scroll sideways with big look numbers. |  |  |  |  |
| D | Cover + contents | Dark. A magazine cover beside a numbered list of looks. |  |  |  |  |
| E | Open book | A two-page spread with a spine shadow; arrows turn the page. |  |  |  |  |
| F | Split viewer | Large photo beside a list of looks; tap one to swap the photo. |  |  |  |  |
| G | Hotspots | Tap dots on the photo to read about the neckline, sleeves and border. |  |  |  |  |
| H | Offset grid | Three columns with the middle one dropped, each with an Ask button. |  |  |  |  |
| I | Brand band | On brand colour between zari borders: looks in double gold frames. |  |  |  |  |
| J | Index | Type-led list of looks; the one picked shows beside it. |  |  |  |  |
| K | Arches | Five tall arched photos in a row with gold hairlines. |  |  |  |  |
| L | Mood board | Prints taped to a board with fabric swatches and handwritten names. |  |  |  |  |
| M | Every function | Mehendi, sangeet, wedding and reception looks on a dashed thread. |  |  |  |  |
| N | Bento | Photo tiles at mixed sizes with title and lookbook tiles. |  |  | rounded tiles (shape rule) | skip |
| O | Look deck | Dark. Photos stacked like prints; arrows deal the next one. |  |  |  |  |
| P | Season's edit | Magazine page with a drop cap and three photos. |  |  |  |  |
| Q | By occasion | Occasion chips filter the looks. |  |  |  | later |
| R | Zari frame | One look at a time inside a double gold frame on brand colour. |  |  |  |  |
| S | Sticky intro | Intro stays put while a staggered grid scrolls (scroll inside the frame). |  |  | inner scroll; sticky on a real page |  |
| T | Atelier | Dark luxe grid with Roman numerals and hairline frames. |  |  |  |  |
| U | Look of the week | One arched hero look with its kind, occasion and bridal price. |  |  |  |  |
| V | Filmstrip | Dark. Wide viewer with a strip of thumbnails below. |  |  |  |  |
| W | Love this look? | Three ways to ask: same design, my colours, or something like it. |  |  |  |  |
| X | Get the lookbook | A tilted lookbook cover with chapters and a send-it-to-me button. |  |  |  |  |
| Y | Story cards | Tall story-style cards that scroll sideways. |  |  |  |  |
| Z | Spotlight | Dark stage with one arched look lit; chips to switch. |  |  |  |  |

### 20 rental

**Rental collection** · Speciality · `is.rentalA`–`is.rentalZ` in `Speciality Preview.dc.html`

Data: **New data:** rental pieces with a price per day.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Hanger rail | Outfits hanging from a gold rail with swing tags and an Ask to rent link. |  |  |  | later |
| B | For her, him, kids | Women, men and kids chips filter the rental grid. |  |  |  |  |
| C | How it works | Four steps (check date, trial, pick up, bring back) above featured pieces. |  |  |  |  |
| D | Showroom | Dark. One arched piece lit from below with what is included; arrows step through. |  |  |  |  |
| E | Check availability | Pick an outfit and your function date; WhatsApp asks if it is free. |  |  |  | later |
| F | Rent or stitch? | A side-by-side table to help decide, using their real delivery time and bridal price. |  |  |  |  |
| G | Item detail | Large photo, thumbnails, what is included, sizes and a Check availability button. |  |  |  |  |
| H | Wardrobe | Arched outfits inside a brand-colour wardrobe with a gold edge. |  |  |  |  |
| I | Brand band | On brand colour between zari borders: pieces in double gold frames. |  |  |  |  |
| J | Index | Type-led list of everything to rent; the one picked shows beside it. |  |  |  |  |
| K | Arches | Each piece in a temple arch with an Ask to rent link. |  |  |  |  |
| L | Price tags | Each piece with a hanging tag showing its number and sizes. |  |  |  |  |
| M | By occasion | Wedding, sangeet, reception and festival chips filter the pieces. |  |  |  |  |
| N | Bento | Photo tiles with a title, a fitting promise and a check-my-date tile. |  |  | rounded tiles (shape rule) | skip |
| O | Deck | Dark. Pieces stacked like prints with details; arrows deal the next. |  |  |  |  |
| P | Rent the look | Magazine page with a drop cap and a list of pieces. |  |  |  |  |
| Q | Rental finder | Pick who and what for; matching pieces appear. |  |  |  |  |
| R | Zari frame | One piece at a time inside a double gold frame on brand colour. |  |  |  |  |
| S | Sticky intro | Intro stays put while a staggered grid scrolls (scroll inside the frame). |  |  | inner scroll; sticky on a real page |  |
| T | Atelier | Dark luxe grid with Roman numerals, by appointment. |  |  |  |  |
| U | New in | Full-bleed photo with a "New in rental" badge. |  |  |  |  |
| V | Rental timeline | Book, trial, pick up and return on a dashed thread with when each happens. |  |  |  |  |
| W | Questions | Accordion of common renting questions. |  |  |  |  |
| X | Rental pass | Pick a piece and date; a ticket-style trial pass fills in to send. |  |  |  |  |
| Y | Story cards | Tall story-style cards that scroll sideways. |  |  |  |  |
| Z | Spotlight | Dark stage with one arched piece lit; chips to switch. |  |  |  |  |

### 21 kids

**Kids wear corner** · Speciality · `is.kidsA`–`is.kidsZ` in `Speciality Preview.dc.html`

Data: **New data:** kids' work (file-name category) and age range.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Who's it for | Big round avatar buttons for girls, boys, babies and family; a shelf of matching pieces. |  |  |  | later |
| B | Mother and daughter | Two arched photos side by side for matching outfits. |  |  |  | later |
| C | Find by age | Pick an age; usual sizes and outfits that suit it. |  |  |  |  |
| D | Birthday invitation | An invitation card on confetti: her birthday look, RSVP on WhatsApp. |  |  |  |  |
| E | A year of firsts | Naming, annaprashana, first birthday and festivals on a ruled calendar strip. |  |  |  |  |
| F | Comfort is the work | A sticky headline and photo beside four numbered promises. |  |  |  |  |
| G | Photo booth | Dark. Two tilted photo-booth strips, hers and his. |  |  |  |  |
| H | The little edit | Four pieces in alternating editorial rows with what is included. |  |  |  |  |
| I | Kids index | A typeset index of every piece with ages and occasion. |  |  |  |  |
| J | Clothesline | Prints pegged on a sagging line with handwritten names. |  |  |  |  |
| K | Her colour | A large photo that tints as you pick a shade. |  |  |  |  |
| L | Siblings | Brother and sister matching, two photos joined. |  |  |  |  |
| M | Grows with her | The same outfit at 4 and at 6, let out at the seams. |  |  |  |  |
| N | Costumes, on time | School-day and stage costumes as a ruled list. |  |  |  |  |
| O | From grandparents | A letter-style gift order with From and For written in. |  |  |  |  |
| P | Storybook | An open storybook page with a drop cap and a photo. |  |  |  |  |
| Q | Size by age | A guide table of height, chest and length by age. |  |  |  |  |
| R | Mini me | The same design at your size and hers, side by side on one baseline. |  |  |  |  |
| S | When to order | Parents' timeline: order, trial, pick up, wear. |  |  |  |  |
| T | Soft on little skin | Kids fabrics in ruled rows with a fine softness line. |  |  |  |  |
| U | Parents ask | Questions and answers as a WhatsApp chat. |  |  |  |  |
| V | Growth chart | A measuring stick with ages; pick one for sizes and outfits. |  |  |  |  |
| W | One to love | Dark. One piece full-bleed with its story; arrows step through. |  |  |  |  |
| X | Kids order slip | Name, age, occasion and outfit fill an order to send. |  |  |  |  |
| Y | Party themes | Princess, garden, traditional or royal: a palette and two outfits. |  |  |  |  |
| Z | Little runway | Arched photos walking a brand-colour ramp, scrolling sideways. |  |  |  |  |

### 22 men

**Men's tailoring** · Speciality · `is.menA`–`is.menZ` in `Speciality Preview.dc.html`

Data: **New data:** men's services and prices.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Collar guide | Spread, button-down, mandarin and cutaway drawn as line art; pick one. |  |  |  |  |
| B | Groom's wardrobe | Haldi, sangeet, wedding and reception, a look for each. |  |  |  | later |
| C | Choose your fit | Slim, regular or relaxed shown as simple shapes with the ease. |  |  |  |  |
| D | Men's index | A typeset index of every piece with time and occasion. | yes |  |  | later |
| E | The edit | Four pieces in alternating photo rows. |  |  |  |  |
| F | Shirt details | Collar, cuff, pocket and fit chips build a shirt to send. |  |  |  |  |
| G | The details | Six numbered details you cannot see. | yes |  |  |  |
| H | Fabric notes | Which cloth for what, in ruled rows. | yes |  |  |  |
| I | Monogram | Type his initials; they appear on a shirt cuff. |  |  |  |  |
| J | Dress code | Office, wedding guest, groom and reception tabs with what to wear. |  |  |  |  |
| K | Order ledger | A ruled ledger page with handwritten items, trials and ready times. |  |  |  |  |
| L | Suiting swatches | Plain, pinstripe, herringbone, check, linen and silk dupion. |  |  |  |  |
| M | His measurements | Six inputs with how-to lines; sends on WhatsApp. |  |  |  |  |
| N | Groom's countdown | Pick the wedding date; order, fittings and pick-up dates appear. |  |  |  |  |
| O | The groom | Dark luxe. The sherwani timeline with Roman numerals. | yes |  |  |  |
| P | Wedding or every day | Split screen: occasion wear and everyday wear. | yes |  |  |  |
| Q | Bring your fabric | Shirt-piece card with a usual-metres guide. |  |  |  |  |
| R | Hero | Dark. Full-bleed photo: cut for you, not for a size. |  |  |  |  |
| S | Kurta and jacket | Pick colours for each; a simple drawing shows the pair. |  |  |  |  |
| T | Ask the tailor | An interview with the owner, Q and A. |  |  |  |  |
| U | East or West | Two panels, ethnic and western; tap one to widen it. |  |  |  |  |
| V | How it works | Measure, cut, trial, finish on a dashed thread. |  |  |  |  |
| W | Trouser break | No break, half break or full break drawn simply. |  |  |  |  |
| X | Father and son | Dark. Matching outfits in two arched photos. |  |  |  |  |
| Y | A suit, start to finish | Five dated steps over three weeks. | yes |  |  |  |
| Z | Alterations | Six quick alterations, each with its own WhatsApp ask. | yes |  |  |  |

### 23 emb

**Embroidery types** · Speciality · `is.embA`–`is.embZ` in `Speciality Preview.dc.html`

Data: **New data:** embroidery types they do (maggam, zardosi…) with photos.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Eight kinds of handwork | Alternating texture and text rows: what each work is, how long, best for. | yes |  |  | later |
| B | How long it takes | Day bars for each work; tap to highlight. |  |  |  |  |
| C | Which work for you? | Two questions (occasion, time) suggest a work. |  |  |  |  |
| D | On the adda | The work stretched on a wooden adda frame; chips switch the stitch. |  |  |  |  |
| E | Handwork index | A typeset index with a small round texture for each work. | yes |  |  |  |
| F | Under the loupe | Dark. A magnified round swatch with best for, done by and time. |  |  |  |  |
| G | Thread spools | Pick a spool; it lifts and the message updates. |  |  |  |  |
| H | Six motifs | Alternating rows for mango, peacock, lotus and more. |  |  |  |  |
| I | Where it goes | Neckline, sleeves, back or all over, shown on the blouse drawing. | yes |  |  |  |
| J | How heavy? | Dark. Light to bridal on a segmented control; the texture gets denser. | yes |  |  |  |
| K | Plain to precious | The same blouse plain and with handwork; switch between them. |  |  |  | later |
| L | From the adda | Dark split: a texture full-bleed beside the karigar's words. | yes |  |  |  |
| M | Texture study | One large and two small close-ups. | yes |  |  |  |
| N | What it is made of | Kundan, pearls, crystals and zari in a ruled list. | yes |  |  |  |
| O | Look closer | Dark. A magnifying lens moves to the neckline, sleeve or border. |  |  |  |  |
| P | Sampler | A cross-stitch sampler cloth with every kind of work. |  |  |  |  |
| Q | Hand or machine? | Side-by-side table of look, time, detail, feel and cost. |  |  |  |  |
| R | Zari colours | Dark luxe. Antique gold, bright gold, silver, copper, rose gold. | yes |  |  |  |
| S | Border strips | Each work as a long saree border with its time. |  |  |  |  |
| T | Caring for handwork | Six numbered care notes. | yes |  |  |  |
| U | Names in thread | Dark. Type your names and date; they appear stitched on a blouse back. | yes |  |  |  |
| V | How it is done | Sketch, trace, frame, stitch, finish on a dashed thread. |  |  |  |  |
| W | Wedding story motifs | Varmala, doli, names and more as a ruled list. | yes |  |  |  |
| X | Mix two works | Pick two kinds of work and ask about the combination. |  |  |  |  |
| Y | Send the design | Dashed photo card and what to send for a quick quote. | yes |  |  |  |
| Z | Colour match | Pick your fabric colour; suggested thread colours appear. | yes |  |  |  |

### 24 saree

**Saree services** · Speciality · `is.sareeA`–`is.sareeZ` in `Speciality Preview.dc.html`

Data: **New data:** saree services (fall and pico, pre-pleating, kuchu) and prices.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Six ways to wear it | Alternating photo rows for each drape, with a booking link. |  |  |  | later |
| B | How long it takes | Each service with its usual time as a pill. | yes |  |  |  |
| C | Pre-pleating | Arched photo with the three steps: pleats, pallu, pinned. |  |  |  |  |
| D | Fall matching | Pick your saree colour; a matching fall shows along the hem. | yes |  |  |  |
| E | What pico does | A frayed raw edge beside a neat picoed edge. | yes |  |  |  |
| F | Kuchu | A sticky photo beside four numbered tassel styles with times. |  |  |  |  |
| G | How many pleats? | Dark. Add or remove pleats; the fan of pleats grows. | yes |  |  |  |
| H | Sarees we handle | A typeset index: each saree, its care and the services it needs. | yes |  |  |  |
| I | Saree lengths | 5.5 m, 6.3 m or 9 yards: body, pallu and blouse piece as a bar. | yes |  |  |  |
| J | Wedding week | Four ruled columns, one per function, with what each saree needs. | yes |  |  |  |
| K | Finish the pallu | Kuchu, fringe, lace or plain; the pallu end changes. | yes |  |  |  |
| L | Need it tomorrow? | Brand colour. Urgent asks with their real express time. | yes |  |  |  |
| M | What does it need? | Tick services for your saree and send them in one message. | yes |  |  | later |
| N | Ready to drape | Dark. A full-bleed pallu photo with one clear promise. |  |  |  |  |
| O | Draping appointment | Dark. Pick a day and time to come in and be draped. |  |  |  |  |
| P | Season by season | Silk care for monsoon, after the rains, wedding season and summer. | yes |  |  |  |
| Q | Upcycling | Dark. Before and after: a saree made into a lehenga. |  |  |  |  |
| R | Under the saree | Petticoats and more as a ruled list. | yes |  |  |  |
| S | Ask in one line | Large "I need…" lines, each a WhatsApp ask. | yes |  |  |  |
| T | Saree doctor | Pick the problem; we explain the fix. | yes |  |  |  |
| U | Saree rack | Sarees hanging from a rod with their names down the side. | yes |  |  |  |
| V | Drop off, pick up | Three steps with their real opening hours. |  |  |  |  |
| W | Customer words | Their own Google reviews, saree ones first. | yes |  |  |  |
| X | Many sarees | A counter and services for each; sends one message. | yes |  |  |  |
| Y | Saree + blouse | One drop-off: blouse stitched and saree finished together. | yes |  |  |  |
| Z | Saree map | Tap body, border, pallu or blouse piece for the services on each. | yes |  |  |  |

### 25 alter

**Alterations price list** · Speciality · `is.alterA`–`is.alterZ` in `Speciality Preview.dc.html`

Data: **New data:** alteration price list.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Letter board | A black felt peg board with every alteration and price. | yes |  |  |  |
| B | Printed price list | Two columns grouped by garment with dotted leaders. | yes |  |  | later |
| C | Price estimate | Tick fixes; a live total and a send button. | yes |  |  | later |
| D | Receipt | A thermal receipt with every rate and the express charge. | yes |  |  |  |
| E | What we fix | Each problem struck through beside the result and its price. | yes |  |  |  |
| F | Garment tabs | Blouse, kurti, lehenga, pants and kids tabs with their fixes. | yes |  |  |  |
| G | Tap the blouse | Numbered pins on a blouse drawing; tap one for its price. | yes |  |  |  |
| H | Quickest first | Sort by time or by price. | yes |  |  |  |
| I | From ₹ | The lowest price set huge beside a ruled list of every fix. | yes |  |  |  |
| J | Search | Type sleeve, hook or length to filter the list. | yes |  |  |  |
| K | Pick the garment | Garment names as large type; the fixes for the one picked below. | yes |  |  |  |
| L | Is it fixable? | Accordion of common problems with prices in the row. | yes |  |  |  |
| M | Bring these | Four numbered things to bring, beside a short intro. | yes |  |  |  |
| N | Four common fixes | Alternating photo rows with what, how long and the price. |  |  |  |  |
| O | Alter or new? | Dark. One, two or three fixes vs stitching a new blouse. | yes |  |  |  |
| P | Price ladder | Every fix as a bar, cheapest to dearest. | yes |  |  |  |
| Q | Quote builder | Garment and problem chips write a WhatsApp message. | yes |  |  |  |
| R | Normal or express | Switch to see express timings and the real express charge. | yes |  |  |  |
| S | Card file | Index cards with garment tabs and handwritten prices. | yes |  |  |  |
| T | Price grid | Fixes by garment in one table. | yes |  |  |  |
| U | Split-flap board | An airport-style board of fixes, prices and times. | yes |  |  |  |
| V | The rate card | A printed rate card on cream, grouped by garment. | yes |  |  |  |
| W | On your phone | The price list as a phone settings screen. | yes |  |  |  |
| X | Ready on | Pick a fix; a calendar tile shows when it will be ready. | yes |  |  |  |
| Y | How we price | Four things that change the price, explained. | yes |  |  |  |
| Z | Bridal alterations | Dark luxe. Heavy and heirloom pieces handled by the master tailor. | yes |  |  |  |

### 26 track

**Trial & delivery tracker** · Speciality · `is.trackA`–`is.trackZ` in `Speciality Preview.dc.html`

Data: Needs an order-status backend. Not static content; leave out until there is one.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Progress bar | A bar with eight stage icons and the current step below. | yes |  |  | skip |
| B | Order history | A courier-style timeline, newest first, with dates. | yes |  |  | skip |
| C | Check your order | Enter the order number from your bill; a status card appears. | yes |  |  | skip |
| D | Where it is now | The current stage set huge, with trial and ready dates. | yes |  |  | skip |
| E | Dated stages | Every stage as a ruled row; the current one in italics. | yes |  |  | skip |
| F | The line | A metro line with stops; a needle rides to the current one. | yes |  |  | skip |
| G | Thread line | Thread unwinds from a spool to the needle as work progresses. | yes |  |  | skip |
| H | Workroom board | Your order card moving across To start, On the machine, Trial, Ready. | yes |  |  | skip |
| I | Calendar | Ordered, trial and ready dates marked on a month. | yes |  |  | skip |
| J | WhatsApp updates | Every stage as a message from the boutique. | yes |  |  | skip |
| K | Trial countdown | Dark. Days, hours and minutes to the trial fitting. | yes |  |  | skip |
| L | Order card | A cream order card with dotted leaders. | yes |  |  | skip |
| M | Progress | A big percentage and thin line beside the stage list. | yes |  |  | skip |
| N | Now and next | Split: the current stage on dark, coming dates on light. | yes |  |  | skip |
| O | A letter | A handwritten update from the workroom. | yes |  |  | skip |
| P | Trial checklist | What we check at the trial; tick anything to adjust. | yes |  |  | skip |
| Q | Move my trial | Pick a new day and time near the trial date. | yes |  |  | skip |
| R | It's ready! | Brand colour. A collect code, hours and area. | yes |  |  | skip |
| S | Day plan | A bar chart of each stage across the days, with today marked. | yes |  |  | skip |
| T | Dates to remember | Trial, ready and last-fix dates as huge numerals. | yes |  |  | skip |
| U | In one sentence | A large sentence: your blouse is being stitched; trial on a date. | yes |  |  | skip |
| V | Family orders | Bride, mother, sister and niece, each with progress. | yes |  |  | skip |
| W | How did we do? | Stars, then a Google review or a private note. | yes |  |  | skip |
| X | Honest update | On time or running late, with the new date. | yes |  |  | skip |
| Y | Workroom photo | Dark. A full-bleed photo of the current stage. |  |  |  | skip |
| Z | Progress photos | Photos for each stage; ones to come are greyed out. |  |  |  | skip |

### 27 wed

**Wedding planner** · Speciality · `is.wedA`–`is.wedZ` in `Speciality Preview.dc.html`

Data: Interactive planner; no boutique data.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Countdown plan | Pick the wedding date; each task gets its date, and overdue ones are flagged. | yes |  |  | later |
| B | Wedding card | An invitation card listing the wardrobe plan in order. | yes |  |  |  |
| C | Six days, six looks | Alternating photo and text rows for each function, with its palette. |  |  |  |  |
| D | Month by month | Three month calendars with every task marked. | yes |  |  |  |
| E | Count the looks | A huge outfit total beside a ruled list of family steppers. | yes |  |  |  |
| F | Family web | Bride in the centre, family around; tap one for their look. | yes |  |  |  |
| G | Colour story | A palette strip for each function. | yes |  |  |  |
| H | Wedding-day bag | A sticky intro beside a ruled list you strike through as you pack. | yes |  |  |  |
| I | The ribbon | Tasks tied along a flowing ribbon. | yes |  |  |  |
| J | Bridal checklist | A ruled card with handwritten tasks to tick. | yes |  |  |  |
| K | Wedding week | Five ruled columns, mehendi to reception, with time slots. | yes |  |  |  |
| L | Counting down | Dark. Days to go set enormous, with the next three tasks. | yes |  |  |  |
| M | Bridal consult | Pick a consult type and a day to book. | yes |  |  |  |
| N | Family group | A WhatsApp group preview: add us to your wedding group. | yes |  |  |  |
| O | Wedding season | Busy months as a bar chart with your month marked. | yes |  |  |  |
| P | A bride's diary | Editorial diary entries from week 12 to the day. | yes |  |  |  |
| Q | Your ceremonies | Pick the ceremonies; the outfit list updates. | yes |  |  | later |
| R | Both families | Split screen: bride side on paper, groom side on dark. | yes |  |  |  |
| S | Hour by hour | Dark. The wedding day timeline and how we help. | yes |  |  |  |
| T | Three trials | Fitting dates as huge numerals in a ruled list. | yes |  |  |  |
| U | How ready are you? | A big percentage and thin progress line beside a ruled checklist. | yes |  |  |  |
| V | Going as a guest | Every relation with what to wear, as ruled editorial rows. | yes |  |  |  |
| W | Myths, corrected | Myth or fact verdicts beside the real answer, in ruled rows. | yes |  |  |  |
| X | Where should I be? | Dark. Slide weeks to go; see what to do now. | yes |  |  |  |
| Y | Planner notebook | A two-page notebook spread: to do and notes. | yes |  |  |  |
| Z | Save the date | Brand colour. Type your names and date. | yes |  |  |  |

### 28 gift

**Gift voucher** · Speciality · `is.giftA`–`is.giftZ` in `Speciality Preview.dc.html`

Data: **New data:** voucher amounts. Requests go to WhatsApp; no payment flow.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Voucher builder | Amount and names; the voucher card updates live. | yes |  |  | later |
| B | Envelope | Tap the sealed envelope; the voucher slides out. | yes |  |  |  |
| C | In one sentence | A large sentence you fill in: amount, for and from. | yes |  |  |  |
| D | Any amount | Dark. Slide from ₹500 to ₹20,000; it says what that covers. | yes |  |  |  |
| E | For the occasion | Occasions as large type; the card wording updates beside them. | yes |  |  |  |
| F | Bank note | A banknote-style voucher with guilloche patterns. | yes |  |  |  |
| G | Gift tag | A kraft tag with a handwritten to and from. | yes |  |  |  |
| H | What it buys | Four amounts, each with what it actually covers at their prices. | yes |  |  | later |
| I | Folding card | A card that opens to show your message. | yes |  |  |  |
| J | Gift a service | Services at their real prices as a ruled list. | yes |  |  |  |
| K | E-voucher | Dark. A phone voucher with a QR-style code. | yes |  |  |  |
| L | Wax-sealed letter | A handwritten letter with a wax seal of their initials. | yes |  |  |  |
| M | Plastic card | A gift card with a chip that turns over on tap. | yes |  | 3D turn (check "no 3D") |  |
| N | How it works | Three numbered steps in ruled rows. | yes |  |  |  |
| O | Bulk gifting | A counter for team or wedding return gifts, with the total. | yes |  |  |  |
| P | WhatsApp or printed | Split screen: sent in minutes, or a printed card to collect. | yes |  |  |  |
| Q | Questions | Gift voucher questions with short answers. | yes |  |  |  |
| R | Ribbon banner | Brand colour with a gold ribbon and bow. | yes |  |  |  |
| S | Pick a message | Ready-made messages that fill the card. | yes |  |  |  |
| T | For Amma | An arched photo and a heartfelt line. |  |  |  |  |
| U | Choose the card | One large card beside the design names as type. | yes |  |  |  |
| V | Last minute | Dark. Sent in minutes over WhatsApp and UPI. | yes |  |  |  |
| W | Small print | The terms on a folded-corner card. | yes |  |  |  |
| X | Send on the day | Pick their date and when to send it. | yes |  |  |  |
| Y | Postcard | A postcard with a stamp, postmark and their name. | yes |  |  |  |
| Z | Gold card | Dark luxe. A metallic gold card. | yes |  |  |  |

### 29 class

**Classes & workshops** · Speciality · `is.classA`–`is.classZ` in `Speciality Preview.dc.html`

Data: **New data:** classes (name, dates, fee).

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Course cards | Six classes with level, length and next batch date. | yes |  |  | later |
| B | Timetable | A week grid of classes by time slot. | yes |  |  |  |
| C | Seats left | Dark. Chairs light up for seats still open in the next batch. | yes |  |  |  |
| D | Syllabus | Pick a class; week-by-week modules open up. | yes |  |  |  |
| E | Three levels | Beginner, intermediate and advanced in ruled columns. | yes |  |  |  |
| F | The kit | Split: what we give and what you bring. | yes |  |  |  |
| G | Certificate | A completion certificate with your name typed in. | yes |  |  |  |
| H | Student work | Alternating photo rows with student quotes. |  |  |  |  |
| I | Your teacher | The owner as teacher, with years and a quote. |  |  |  |  |
| J | Enrol | Name, age, class and batch build a WhatsApp enrolment. | yes |  |  | later |
| K | Workshop poster | Brand colour. A bold one-day workshop poster. | yes |  |  |  |
| L | Which class? | Three questions suggest a class. | yes |  |  |  |
| M | What you will make | A piece for each week of the chosen class. |  |  |  |  |
| N | Upcoming batches | The next four start dates with seats open. | yes |  |  |  |
| O | Compare classes | A table of level, length, times and what you take home. | yes |  |  |  |
| P | Summer camp | A photo beside the camp details in ruled rows. |  |  |  |  |
| Q | In person or online | Switch to compare the two. | yes |  |  |  |
| R | Students ask | Questions with short answers. | yes |  |  |  |
| S | Small batches | A huge 8 beside seats left in the next batch. | yes |  |  |  |
| T | Machine and hand | The skills you learn on each. | yes |  |  |  |
| U | Hero | Full-bleed workroom photo with the next batch date. |  |  |  |  |
| V | By the end | Six numbered outcomes. | yes |  |  |  |
| W | Learn together | A sentence with an inline group counter. | yes |  |  |  |
| X | Add to calendar | A real Google Calendar link for the next class. | yes |  |  |  |
| Y | Glossary | A typeset glossary with pronunciation. | yes |  |  |  |
| Z | Masterclass | Dark luxe. A bridal maggam masterclass over three weekends. | yes |  |  |  |

### 30 team

**Team / tailors** · Speciality · `is.teamA`–`is.teamZ` in `Speciality Preview.dc.html`

Data: **New data:** team members (name, role, photo permission).

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Editorial roster | Alternating portrait and bio rows with large names, years and a line about each person. |  |  |  | later |
| B | Founder letter | The founder in an arch, her own words, her signature and the team named below. |  |  |  | later |
| C | Five stages | Tall portraits on a rail, one per stage of the making. |  |  |  |  |
| D | Hands | Dark. A large and two small close-ups of hands at work. |  |  |  |  |
| E | Contributors page | A magazine contributors page in two ruled columns. |  |  |  |  |
| F | Years between us | One huge combined number beside a dotted list of years. | yes |  |  |  |
| G | By craft | A typeset index: each craft and who to ask for it. | yes |  |  |  |
| H | A day in the workroom | Dark. The day from 7:30 to 8:00 as a ruled timeline. | yes |  |  |  |
| I | Signatures | Each first name signed above a rule, with role in small caps. | yes |  |  |  |
| J | One at a time | A large portrait with their own words; arrows step through. |  |  |  |  |
| K | Where we work | The cutting table, the machines and the adda, with who works at each. |  |  |  |  |
| L | Tools of the trade | Dark luxe. The tool each person reaches for first. | yes |  |  |  |
| M | How we grew | From one machine to seven people, year by year. | yes |  |  |  |
| N | Join the workroom | A hiring page: send three photos of your work. | yes |  |  |  |
| O | By the numbers | Dark. People, years, garments and rating in a ruled row. | yes |  |  |  |
| P | Magazine cover | A full-bleed team photo as a cover with cover lines. |  |  |  |  |
| Q | Who to ask | Pick what you need; the right person appears with a message button. |  |  |  |  |
| R | Pull quote | Dark. One person's words over their portrait. |  |  |  |  |
| S | Thank-you note | A letter from the team, signed by everyone. | yes |  |  |  |
| T | In conversation | The founder interviewed, answers drawn from her own story. | yes |  |  |  |
| U | Group photo | A wide team photo with a from-left caption. |  |  |  |  |
| V | Apprentice to master | One person's path as a ruled timeline. |  |  |  |  |
| W | Many hands | The six people who touch a bridal blouse, in order. |  |  |  |  |
| X | Designer and makers | Split: the founder on dark, the makers on light. |  |  |  |  |
| Y | Colophon | A short credit line: designed by, cut by, stitched by. | yes |  |  |  |
| Z | Maker of the month | Dark stage with one portrait; arrows step through. |  |  |  |  |

### 31 blog

**Blog / style tips** · Speciality · `is.blogA`–`is.blogZ` in `Speciality Preview.dc.html`

Data: **New data:** posts, which someone has to write.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | The Journal | A masthead, a lead story with photo, then a ruled list of the rest. |  |  |  | later |
| B | Style notes | A large lead with photo and three stories in ruled columns below. |  |  |  |  |
| C | Browse by topic | Topics as large type; the list filters below. | yes |  |  |  |
| D | Article page | A full reading page: headline, byline, drop cap and pull quote. |  |  |  |  |
| E | Ten rules | Ten numbered workroom rules, each with why. | yes |  |  |  |
| F | The long read | Dark. One story full-bleed over its photo. |  |  |  |  |
| G | Ask the tailor | Customer questions with the boutique's answers. | yes |  |  |  |
| H | Word of the week | Brand colour. One tailoring word set huge; arrows step through. | yes |  |  |  |
| I | How to wear | One silk saree, three ways: blouse, jewellery and drape for each. |  |  |  |  |
| J | Read this month | Months as type; a seasonal note and the article to read. | yes |  |  |  |
| K | Start here | Three essentials kept in view beside everything else. | yes |  |  |  |
| L | Tips on WhatsApp | A monthly WhatsApp tip sign-up with sample messages. | yes |  |  |  |
| M | Notebook | Handwritten tips on ruled cream paper. | yes |  |  |  |
| N | One-minute tips | Dark. A rail of short video cards. |  |  | needs a video clip |  |
| O | Tip of the day | One tip set large with its reason; arrows step through. | yes |  |  |  |
| P | Contents | A two-column contents page grouped by topic. | yes |  |  |  |
| Q | Search | Type to filter articles; asks on WhatsApp if nothing matches. | yes |  |  |  |
| R | Quick tips | A rail of ten-second tip cards. | yes |  |  |  |
| S | Which neck suits you? | Pick a face shape; the neck to try and to skip. | yes |  |  |  |
| T | Reading progress | A long read in a scroll frame with a progress line and minutes left. | yes |  |  |  |
| U | The column | The founder as columnist, with her latest pieces. |  |  |  |  |
| V | Photo essay | A blouse from start to finish in alternating photo rows. |  |  |  |  |
| W | Do and don't | Split screen: before you order, and mistakes we see. | yes |  |  |  |
| X | Most read | The top five, ranked with large numerals. | yes |  |  |  |
| Y | Care cheat sheet | A printable saree care table: wash, iron, store. | yes |  |  |  |
| Z | The bridal edit | Dark luxe. Six reads in the order a bride needs them. | yes |  |  |  |

### 32 wa

**Sticky WhatsApp button** · Speciality · `is.waA`–`is.waZ` in `Speciality Preview.dc.html`

Data: Existing contact. One sticky button per site.

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Classic | A round WhatsApp button with a soft pulse. | yes | built: `contact/FloatingWhatsApp` |  | keep |
| B | Owner pill | Pill with the owner's initial, online dot and reply time. | yes |  |  |  |
| C | Chat window | Tap to open a mini chat with quick replies. | yes |  |  |  |
| D | Call \| WhatsApp bar | A full-width bottom bar for phones. | yes | built: `contact/CallWhatsAppBar` |  | keep |
| E | Owner card | A card with the owner, status and a big button. | yes |  |  |  |
| F | What do you need? | Topic list; each opens a ready-written message. | yes |  |  |  |
| G | Open now | Reads the real opening hours: open now, or when we reply. | yes |  |  |  |
| H | Side tab | A vertical tab on the right edge. | yes |  |  |  |
| I | Gold ring | Dark page. A round button with a double gold ring. | yes |  |  |  |
| J | Scroll ring | A progress ring around the button fills as you scroll. | yes |  |  |  |
| K | Tooltip | A dismissable bubble with a helpful nudge. | yes |  |  |  |
| L | Contact dock | One button opens WhatsApp, call and directions. | yes |  |  |  |
| M | Book a fitting | Pick a day; the message books it. | yes |  |  |  |
| N | Marquee strip | A moving bottom strip: now booking wedding season. | yes |  |  | skip |
| O | Spinning badge | Rotating circular text around the button. | yes |  |  | skip |
| P | Slots left | Bridal slots left this month. | yes |  |  |  |
| Q | Typing | The owner "typing…", then a greeting. | yes |  |  |  |
| R | Any language | Greeting in English, Kannada, Hindi, Tamil, Telugu. | yes |  |  |  |
| S | Quick form | Name and need build the WhatsApp message. | yes |  |  |  |
| T | Send a photo | Saw a design you love? Send the photo. | yes |  |  |  |
| U | Top banner | A sticky top strip with open-now status. | yes |  |  |  |
| V | Who to talk to | Designer or front desk, each a chat. | yes |  |  |  |
| W | Review + chat | A Google review above the chat button. | yes |  |  |  |
| X | Price + ask | Blouses from ₹, joined to an Ask us button. | yes |  |  |  |
| Y | Glass pill | A frosted-glass pill with a live dot. | yes |  | frosted glass (contrast over photos) |  |
| Z | Personal stylist | Dark luxe concierge card from the owner. | yes |  |  |  |

### 33 cine

**Cinematic hero · Velvet Night** · Speciality · `is.cineA`–`is.cineH` in `Speciality Preview.dc.html`

Data: Existing fields. A second hero family ("Velvet Night").

Lab motions: Wipe in, Tap demo, Threads draw.

| | Version | Look | No photos | Status | Watch | Plan |
|---|---|---|---|---|---|---|
| A | Arch | Headline left, gold-framed arch photo right, live open-now chip. |  |  |  |  |
| B | Monument | The boutique name huge and centred over a faded arch. |  |  |  | later |
| C | Split words | "Stitched / to fit." in giant type around a pill-shaped photo. |  |  |  |  |
| D | Full bleed | A full-screen photo washed in the brand glow, title bottom-left. |  |  |  |  |
| E | Marquee | Services drift behind the name in giant faint type. |  |  |  |  |
| F | Triptych | Three arches of work above the headline. |  |  |  |  |
| G | Founder | The owner in an arch beside her own words and signature. |  |  |  |  |
| H | Minimal | Just the name, the tagline and a scroll cue over the glow. |  |  |  | later |
