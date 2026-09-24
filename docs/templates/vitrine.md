# Vitrine

Template 1 of 5. The lookbook: for boutiques whose pitch is **range**.

Moodboard (stage 1): https://claude.ai/artifact/ApFJ3aTcjnmpqPgBFGMqwh

| Stage | State |
|---|---|
| 1. Moodboard | Done |
| 2. Colour and type | Settled (below) |
| 3. Site map | Settled (below) |
| 4. Build | In progress |

## The thesis

The work is the page. Type gets quiet so the photographs can be loud.
Everything a boutique makes, hung like a gallery wall — a bridal lehenga
beside a child's pattu langa beside a half-saree — so a bride sees the whole
range in one scroll and points at the thing she wants.

## Who it is for

- **Jasmine Boutique** — twenty years, bridal through to western gowns
- **Anarghya Designer Studio** — men, women and kids under one roof
- **Nine Plus** — computer and multi-head embroidery across everything

## Who it is not for

- A boutique with three photographs → **Ledger**
- A bridal house with one specialism → **Arch**
- A boutique selling on the owner's story rather than the range → **Atelier**

**Entry requirement: ten or more photographs, named by category.** A boutique
without them gets a different template. This is the one template that can be
disqualified by data.

## The feeling

A shop window on a good street: everything visible, nothing shouted. A gallery
hang, not a catalogue page. Daylight through a dressing-room window — true
colour, no drama. The confidence to be plain.

Materials it borrows from: raw silk and cotton, gold zari, tailor's chalk on
dark cloth, brown paper patterns, wooden hangers, plaster walls. Nothing
glossy, nothing plastic, no gradients.

## The five moves

1. **One piece, edge to edge.** Their best photograph, full width. The name
   small in a corner, never centred and huge.
2. **The category rail.** A quiet row of words, not a navigation bar.
3. **An uneven grid.** Two columns on a phone, three on a laptop, varying
   heights so it reads as a hang rather than a spreadsheet.
4. **Captions that do work.** "Bridal blouse · aari · 12 days". The difference
   between a mood post and a boutique.
5. **Everything else quiet.** Services as a plain list, reviews small, one
   WhatsApp button within reach. No ornament — Vitrine is the one template
   with no motif of its own.

## Signature motion

Choosing a category **re-lays the grid**, each piece travelling to its new
place (GSAP Flip). Nothing pins, nothing fades in on scroll. One motion, and
it conveys what moved where — which is what DESIGN.md asks of motion.

This also keeps Vitrine clear of the forbidden list: no per-card fade-up, no
carousel, no scroll-jacking.

## Colour direction

**The ground stays neutral; the colour comes from the clothes.** A gallery
paints its walls off-white so the work carries the colour. The brand colour
appears only as small marks: the chosen category, the enquiry button, the rule
under the active filter.

Roles: warm off-white ground (never pure white) · ink for names and captions ·
muted for secondary lines · the boutique's own primary, contrast-corrected,
for marks · hairline rules, no dashes.

Tested against four real boutiques rather than invented colours:

| Boutique | Colours | What it proves |
|---|---|---|
| Lavish Boutique | `#5B2A6E` `#C9A24A` | The easy case |
| Petals Designer Studio | `#FACC15` `#18181B` | Yellow as brand colour: unreadable as text on cream until darkened |
| House Of Taranga | `#0A0A0A` `#D4AF37` | Near-black brand colour disappears into the ink; marks must use the accent |
| Vinyasa Designer Boutique | `#DB2777` `#FFFFFF` | The accent is **white** — the template can never assume the accent is usable |

Nine of the thirty have a near-black or pale-yellow brand colour. That is the
argument for a neutral ground rather than a brand-tinted one.

## Type direction

**Cormorant Garamond over Jost** — already in the codebase as `cormorantJost`.
Vitrine takes the pair over from the old Atelier design, which is being
restructured onto a different one.

A fine old-style serif with real stroke contrast, set large and light: the
closest a webfont gets to the lettering on a good sari label, and it holds at
120px where a heavy face would only shout. Under it a geometric sans that
stays out of the way, chosen for being quiet and clear at 15px on a cheap
Android screen — captions are the working part of this template.

Name sizes come from `fitDisplay()`, so "G Boutique" (10 characters) and
"Sarika Designer and Boutique" (27) occupy about the same area without hand
setting.

Sentence case throughout. No all-caps labels, no letter-spaced eyebrows —
settled in DESIGN.md, not reopened here.

## Data this needs that we don't collect

**1. A category per photograph.** From the file name: `work-bridal-01.jpg`,
`work-kids-02.jpg`. No new field for the field team to fill; the generated
`photos-prompt.md` tells them the names.

This matters more than it looks. Every boutique's ticked service groups come
out identical — *Women, Kids, Handwork, Services* on all thirty — so
categories cannot be taken from them without producing five hundred identical
grids. They have to come from the photographs.

**2. A one-line caption per photograph.** Piece, technique, days. An optional
"Photo notes" block in `data.md`, file name → caption.

Both go through `src/types/boutique.ts`, the sheet template,
`scripts/lib/data-sheet.mjs`, `scripts/lib/validate.mjs` and `sample-boutique`
together, as CLAUDE.md requires — in stage 3, before any building.


## Site map (stage 3)

Three pages. Only the home page is Vitrine's own shape; the inner two reuse
the library, because a lookbook's argument is made on the first screen.

**Home**
1. `VitrineOpener` — their best photograph, edge to edge, name small in the
   corner
2. `CategoryGrid` — the category rail and the uneven grid, with captions
3. `ColumnServices` — what they stitch, plain
4. `QuoteReviews` — small, light, no dark band to interrupt the photographs
5. `StoreVisit` — where to find them

**About us** — `PageHeader`, `InkStory`, `StickyProcess`

**Contact us** — `PageHeader`, `WhatsAppForm`, `StoreVisit`

Navigation: `BarNav` (in the flow, so nothing floats over the photographs).
Footer: `MinimalFooter` (light and centred; a brand-coloured footer would
fight the neutral ground).

### When data is missing

| Missing | What happens |
|---|---|
| Fewer than 10 photos | The boutique should not be on Vitrine at all — the directory flags it |
| No categories in the file names | The rail hides; the grid shows everything as one set |
| No captions | Photographs stand alone; nothing is left empty |
| No reviews | `QuoteReviews` returns null, as it already does |
| One branch | `StoreVisit` shows one, as it already does |

## Decisions taken while building

**Categories need no new config field.** The category is parsed from the photo
file name (`work-bridal-01.jpg` → "Bridal") by a helper, so nothing is added
to `BoutiqueConfig` and nothing extra is asked of the field team. The default
shot list in the parser is renamed to carry categories, which turns the
validator's "photos still to add" warning into a categorised shot list.

**Captions are one new field**, `media.captions`, filled from a "Photo notes"
block in `data.md`: file name, then the caption.
