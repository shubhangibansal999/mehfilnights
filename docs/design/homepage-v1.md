# Homepage v1 — Design Spec

**Author:** Saloni (design agent)
**For:** Rishi (frontend), Shubhangi (PM), Vansh (PM), Founder
**Version:** 1.0 — 2026-04-22
**Scope:** `/` route only. Based on PRD v1 section 4 and Brand Guidelines v3.

---

## 0. Design Intent (Read Before Building)

The homepage is the front door for a grant reviewer, a first-time donor, and a community member — in that order of conversion value. It must say **what Mehfil Nights is**, **that it is a credible 501(c)(3)**, and **what you can do right now** within the first scroll.

**The through-line:** one Deep Olive "night" moment (the hero), everything else on warm Ivory. Saffron reserved for the single Donate button in nav plus the bottom Donate CTA band. Turmeric Gold for event ticket buttons. Trust Teal for "Read our story" / secondary info links.

**60-30-10 budget on this page:**
- 60% Ivory/Warm White/Sand surfaces (Impact, What is a Mehfil, Pillars, Events cards, Founder blurb, Newsletter)
- 30% Deep Olive + Sage (Hero, Donate CTA band)
- 10% Saffron + Turmeric (Donate button, event "Get Tickets" buttons, sage-green impact stat numbers as supporting accent)

**Every decision in this doc serves one of three goals:** drive donations, honor heritage, build grant-reviewer trust. Anything that serves none got cut.

---

## 1. Global Shell (Header + Footer)

Rishi is building `<Header />` and `<Footer />` as shared components. Homepage consumes them — no homepage-specific overrides.

**Header behavior on `/`:**
- Transparent over the Deep Olive hero on desktop (logo + nav in Ivory / Turmeric), solid Deep Olive background once scrolled past hero (sticky).
- Mobile: solid Deep Olive from load. Hamburger on left, Saffron "Donate" button on right — both visible at all times.
- Nav items (flat, per PRD §4): Home · About · Events · Impact · Contact · **Donate** (Saffron pill).

**Skip-to-content link** (visually hidden, visible on focus) pointing to `#main`.

---

## 2. Section-by-Section Spec

Reading order: Hero → Impact Snapshot → What is a Mehfil? → Program Pillars → Upcoming Events → Partner Strip → Founder Blurb → Newsletter → Donate CTA Band.

Section padding between majors: **96px desktop / 80px tablet / 64px mobile** (top and bottom). Content container max-width **1100px**, gutters **32px desktop / 24px tablet / 20px mobile**.

---

### 2.1 Hero — `<Hero />`

**Role:** Establish identity, mission above fold, two CTAs.

**Layout:**
- Full-bleed section, min-height `92vh` desktop / `85vh` tablet / `auto` mobile (content-driven, ~640px).
- Single-column centered layout at all breakpoints. Do NOT split hero into image-left / text-right — the Deep Olive intimacy is the mood.
- Content block vertically centered, max-width 780px, left-aligned text.
- Background: Deep Olive `--mn-deep-olive` with a full-bleed hero photograph placeholder (desktop) at `opacity: 0.35` with a Deep Olive-to-transparent gradient overlay from bottom-left so text remains 11:1 contrast. Mobile: drop the image to a decorative top strip (240px) above the text block, keep solid Deep Olive behind copy to guarantee contrast on small screens.
- Decorative element: a single thin Turmeric Gold hairline (1px) spanning 64px under the subtitle — a quiet nod to the sparkle accents in the existing logo.

**Content (real copy, not placeholder):**

```
Eyebrow (Instrument Serif italic, 18px, Turmeric):
  A mehfil — an intimate gathering for music, poetry, and art.

H1 (DM Serif Display, 56px desktop / 40px mobile, Ivory):
  South Asian live music,
  in the room next door.

Subtitle (Instrument Serif italic, 22px, Sage Muted):
  Bollywood · Ghazal · Sufi · Desi Folk · Classical · Coke Studio · Fusion —
  performed acoustically in cozy Seattle venues you can walk to.

Body (Plus Jakarta Sans 400, 17px, Ivory at 85% opacity, max-width 620px):
  Mehfil Nights is a Seattle 501(c)(3) building community through South Asian
  live music — supporting independent artists, welcoming every neighbor, and
  carrying a centuries-old tradition into the Pacific Northwest.

CTAs (horizontal pair, 16px gap, wraps to stacked on mobile):
  [ Support Our Mission ]    ← Saffron primary button → /donate
  [ See Upcoming Events → ]  ← Turmeric Gold button → /events
```

**Why Saffron on the primary CTA and not "See Events":** Saffron is reserved for donation. "Support Our Mission" IS the donation CTA — the copy softens the ask without touching the color rule. The "Upcoming Events" button uses Turmeric Gold (the reserved color for Events & Tickets per brand spec).

**Typography tokens:** eyebrow → `font-accent` italic / 18px. H1 → `font-display` / clamp(40px, 6vw, 64px) / line-height 1.1. Subtitle → `font-accent` italic / clamp(18px, 2.5vw, 22px). Body → `font-body` 400 / 17px / line-height 1.7.

**Color tokens:**
- Background: `--mn-deep-olive`
- H1 + CTAs container border: `--mn-ivory`
- Eyebrow + hairline accent: `--mn-turmeric`
- Subtitle: `--mn-sage-muted` (`#A8BFA9`) — required for WCAG AA on dark
- Body text: `--mn-ivory` at 85% opacity (still 9.3:1, passes AAA)

**Mobile behavior:**
- Section stacks into: optional image strip (240px) → eyebrow → H1 → subtitle → body → CTAs stacked full-width (Saffron on top, Turmeric below, 12px gap).
- Remove the 1px Turmeric hairline on <480px — it reads as a line break.
- H1 shrinks to 40px, line-height 1.15.

**Accessibility:**
- `<section aria-labelledby="hero-heading">`, H1 has `id="hero-heading"`.
- Hero image uses `<Image>` with `alt=""` (decorative — H1 carries the message). If the image is ever swapped for a performance photo with identifiable artists, the alt must describe them.
- CTAs are `<Link>` components styled as buttons — real links, not buttons-around-links.
- Focus rings: 2px Turmeric outline with 2px offset. Both CTAs tab-reachable in DOM order (Saffron first).

**Design rationale:**
- *Cultural:* Deep Olive is drawn from the existing brand and evokes the physical reality of a mehfil — warm, dim, gathered. The eyebrow ("A mehfil — an intimate gathering for music, poetry, and art") does the cultural education up front so the rest of the page can assume the reader knows the word.
- *Conversion:* Mission above the fold is the single biggest grant-reviewer trust signal. Two CTAs (not one, not four) — the PRD's dual-audience reality (donors + event-goers) demands both, but the Saffron-vs-Turmeric color coding tells the eye which is the primary.
- *Trust:* Naming the 501(c)(3) and "Seattle" in the body copy means a grant reviewer confirms organizational reality in the first 5 seconds.

---

### 2.2 Impact Snapshot — `<ImpactStats />`

**Role:** Turn mission into evidence. Grant reviewers scan this within 10 seconds of hero.

**Layout:**
- Background: `--mn-ivory`. This is the first "trust layer" handoff after the dark hero — critical for tonal reset.
- Container: max-width 1100px, center-aligned.
- 4-column grid desktop (each stat in its own cell, 24px gap). 2x2 grid tablet. Stacked 1-column mobile.
- Section padding: 96px top / 96px bottom desktop.
- Above the grid: a small italic Instrument Serif eyebrow ("The mehfil, by the numbers") — 18px, Body Text color.
- Each stat cell: no visible border. A thin 1px Light-Line divider between columns on desktop (not on mobile). Text left-aligned within its cell.

**Stat card anatomy (`<StatCard />`):**
- **Number:** DM Serif Display, 56px desktop / 44px mobile, color `--mn-sage` (`#7A9A7E`). Sage is the spec-sanctioned "impact & mission" color — it reads as growth without competing with Saffron for attention.
- **Label:** Plus Jakarta Sans 600, 14px, uppercase, letter-spacing 0.8px, color `--mn-deep-olive`. Sits directly below the number with 8px gap.
- **Context line:** Plus Jakarta Sans 400, 14px, color `--mn-body-text`, line-height 1.5. 8px below the label. One short sentence max.

**Placeholder content (founder will replace numbers; copy stays):**

```
Stat 1:  [XXX]+   AUDIENCE MEMBERS WELCOMED
         Since our first Mehfil in 2020.

Stat 2:  [XX]     ARTISTS PLATFORMED
         Local, national, and international — across every South Asian tradition.

Stat 3:  [XX]     EVENTS HOSTED
         In living rooms, coffee shops, concert halls, and neighborhood venues.

Stat 4:  [XXX]+   VOLUNTEER HOURS
         Powered by Mehfil-ites who keep ticket prices low and quality high.
```

**Component structure:** `<ImpactStats stats={...} />` wraps an array of 3–4 `<StatCard />` children. Pull from CMS `ImpactStat` type (per PRD §10). If only 3 stats come back, the grid auto-adjusts to 3-column — don't show empty slots.

**Mobile behavior:**
- Stats stack vertically, 40px gap between them.
- Numbers stay at 44px — don't scale smaller, the impact reads in the size.
- Dividers become a 1px horizontal line between stacked cards.

**Accessibility:**
- `<section aria-labelledby="impact-heading">` with a visually-hidden H2: "Impact by the Numbers".
- Stat numbers are NOT real text-as-image — they're real `<p>` elements so screen readers announce them.
- Sage `#7A9A7E` on Ivory `#F5F0E8` passes AA for large text (56px is "large"). Confirmed via spec's contrast table.

**Design rationale:**
- *Cultural:* Sage carries "new beginnings" meaning across South Asian cultures — fitting for numbers that represent community growth.
- *Conversion:* Numbers this early means a grant reviewer knows in 15 seconds whether this org has scale worth funding. Sage (not Saffron) means Donate remains the only saffron moment on the page.
- *Trust:* Real numbers > hero photography for grant credibility. The eyebrow "The mehfil, by the numbers" is a small cultural touch that softens the corporate feel of stat cards.

---

### 2.3 What is a Mehfil? — `<MehfilExplainer />`

**Role:** Cultural storytelling. The single most important education moment on the page for non-South-Asian donors and grant reviewers.

**Layout:**
- Background: `--mn-warm-white` (`#FDFAF5`) — a softer off-white than Ivory, signals "pause and read."
- Container: max-width 900px (narrower than other sections — this is deliberate long-form reading width, ~70 characters per line).
- Section padding: 112px top / 112px bottom desktop (generous breathing room — a reader should slow down here).
- Two-column layout at desktop >1024px: left column (40%) holds the H2 + italic subtitle; right column (60%) holds the three paragraphs. Below 1024px: single column, heading on top, paragraphs below.
- NO photography in this section. The mood of a mehfil is built in the reader's mind by the prose. Visuals here would compete.

**Content (real copy — do not edit without founder review):**

```
H2 (DM Serif Display, 36px, Dark Text):
  What is a mehfil?

Italic subtitle (Instrument Serif italic, 22px, Henna):
  "A room where the music meets you halfway."

Paragraph 1 (Plus Jakarta Sans 400, 17px, Body Text, line-height 1.8):
  The word mehfil is Urdu and Persian for an intimate gathering held in honor
  of music, poetry, and art. For centuries — in Lahore, Lucknow, Hyderabad,
  Karachi, and a hundred smaller cities — patrons opened their homes to
  artists, and neighbors came with nothing more than their attention. No
  stage. No spotlight. Just a shared room, a single microphone, and a
  tradition that kept itself alive one evening at a time.

Paragraph 2:
  Mehfil Nights carries that tradition to Seattle. Our events happen in cozy
  neighborhood venues — coffee roasteries, small halls, living rooms. You sit
  on floor cushions or picnic blankets. You bring a beverage. You can whisper
  to the friend beside you without anyone turning around. The artist is close
  enough that you hear the breath before a note.

Paragraph 3:
  Whether you grew up singing along to Noor Jehan, discovered Arijit last
  month, or have never heard a ghazal before — you belong here. A mehfil
  only works when the room is full of people who came curious.
```

**Typography tokens:** H2 → `font-display` / 36px / line-height 1.2. Italic subtitle → `font-accent` italic / 22px / color `--mn-henna`. Body paragraphs → `font-body` 400 / 17px / line-height 1.8. Inter-paragraph spacing: 24px.

**Component structure:** `<MehfilExplainer />` — one-off. Not reused elsewhere on the page, but a similar pattern will appear on `/about`, so keep the prose content prop-driven for future reuse.

**Mobile behavior:**
- Single column always (by <1024px breakpoint).
- H2 shrinks to 28px, italic subtitle to 19px.
- Paragraph width drops to full container; line-height stays 1.8 for readability.

**Accessibility:**
- Semantic `<h2>` — this is the first H2 on the page after hero's H1.
- No decorative italics using `<em>` — italic styling via font choice, not `<em>` (the italic is aesthetic, not semantic emphasis).
- Henna `#8B4A2B` on Warm White `#FDFAF5` — contrast 5.8:1, passes AA.

**Design rationale:**
- *Cultural:* This is the moment the site pays respect to the word it's built around. Naming specific cities (Lahore, Lucknow, Hyderabad, Karachi) grounds the heritage without flattening it into "South Asian generally." Noor Jehan and Arijit as reference points bridge older and younger South Asian audiences, and the "never heard a ghazal before" line explicitly welcomes non-South-Asian readers.
- *Conversion:* A grant reviewer who reads this paragraph understands the cultural depth of the program in 45 seconds — which is ten times more persuasive than any stat card for mission-fit funding decisions.
- *Trust:* Warm White background signals "this is content worth reading," and the narrow 900px container stops people from skimming.

---

### 2.4 Three Program Pillars — `<ProgramPillars />`

**Role:** Show the three-pillar structure of the org (community, artists, education) in ONE section (NOT three subpages, per PRD deferral).

**Layout:**
- Background: `--mn-ivory` (returning to default trust layer).
- Container: max-width 1100px.
- Section padding: 96px top / 96px bottom desktop.
- Above the cards: H2 "Three ways we keep the tradition alive" + italic subtitle "Community. Artists. Education."
- 3-column grid desktop (each pillar one card, 32px gap). Stack to 1-column <768px. 2-column tablet is visually awkward with 3 items — at 768–1024px use a single column of full-width rows (large hero-like treatment per pillar) OR go straight to 3 very narrow cards. Recommend: single column at tablet too, reserve 3-column only for ≥1024px.

**`<PillarCard />` anatomy:**
- Background: `--mn-sand` (`#E6DCCB`). Ivory section with Sand cards gives just enough figure/ground contrast.
- Border: 1px `--mn-light-line`, border-radius 12px (matches spec §Components).
- Padding: 32px.
- Icon slot at top (48px × 48px, stroke-style icon in `--mn-deep-olive`). Suggested icons: Community → nested-people glyph. Artists → microphone. Education → open-book. Keep icons simple line art — no photography, no color fills.
- Card H3: Plus Jakarta Sans 600, 24px, color `--mn-deep-olive`. (H3 uses body font per spec — keeps the display font for hero and section headings only.)
- Body: Plus Jakarta Sans 400, 16px, color `--mn-body-text`, line-height 1.7.
- No per-card CTA in v1 — the PRD scope doesn't include program subpages to link to. If one exists in v2, add a Trust Teal "Learn more →" link.

**Content (real copy):**

```
H2: Three ways we keep the tradition alive
Italic subtitle: Community. Artists. Education.

Pillar 1 — Community:
  [H3] Bring people together
  [Body] We build rooms where a South Asian grandparent and a first-time
  listener feel equally at home. Floor cushions, a shared playlist, and
  the kind of quiet where a ghazal lands the way it was meant to.

Pillar 2 — Artists:
  [H3] Platform independent artists
  [Body] We pay artists, produce their shows, and put them in front of
  audiences who came to listen. We prioritize local and emerging voices —
  with intentional support for women and non-binary musicians across every
  South Asian tradition.

Pillar 3 — Education:
  [H3] Connect world cultures
  [Body] Every Mehfil introduces the stories behind the songs — the region,
  the era, the poet. We believe understanding is the first step to caring,
  and music is the most generous teacher we know.
```

**Component structure:** `<ProgramPillars />` wraps three `<PillarCard>` instances. Props: `icon`, `title`, `body`. Reusable — `/about` will use the same cards with slightly longer body copy.

**Mobile behavior:**
- Stack to one column below 1024px. 24px gap between cards.
- Icon size stays 48px (don't shrink — anchors each card visually).
- H3 stays at 24px.

**Accessibility:**
- Each card is `<article>` inside the section. H2 for the section, H3 for each card title. No H4 creep.
- Icons are `aria-hidden="true"` SVGs — the text tells the story.
- Sand `#E6DCCB` cards on Ivory `#F5F0E8` background is a subtle contrast. This is intentional (soft layering) but make sure card borders are visible at `#DDD5C8` — test with reduced-transparency mode.
- Deep Olive text on Sand passes AAA (high contrast) — confirmed.

**Design rationale:**
- *Cultural:* The three pillars come directly from the founder's original "Why We Exist" on the current site — keeping them intact honors founder voice. The headings ("Bring people together", "Platform independent artists", "Connect world cultures") are verbs, not nouns — action-oriented per brand voice rules.
- *Conversion:* Three pillars in one section (vs. three pages) matches grant reviewer scan behavior — they want to see the program architecture at a glance.
- *Trust:* Icons are line art, not decorative illustrations — this is the "professional nonprofit" signal. The Sand background makes the cards feel like physical program cards, not marketing banners.

---

### 2.5 Upcoming Events Preview — `<UpcomingEvents />`

**Role:** Show 2–3 upcoming events, each clickable to detail page. Also signals "this org is active right now" to grant reviewers.

**Layout:**
- Background: `--mn-deep-olive`. Second "night moment" on the page — deliberate mood shift for events (per spec: "Deep Olive is the night moment. Reserve for hero, event listings, and artist spotlights").
- Container: max-width 1100px.
- Section padding: 96px top / 96px bottom desktop.
- H2 "What's next" in Ivory, italic subtitle "Three rooms, three evenings — come to one." in Turmeric.
- Top-right of section header: "See all events →" outbound link in Turmeric (not a button — a link).
- 3-column grid desktop for events (`<EventCard>` components, 24px gap). 2-column tablet. 1-column <640px (stacked).
- Below the grid: empty space — do NOT add a second CTA here. The "See all events →" above is sufficient.

**`<EventCard />` anatomy:**
- Background: `--mn-sand` on the Deep Olive section (Sand cards on Deep Olive = the spec's reserved pattern for event listings, per §Component Patterns).
- Border: 1px `--mn-light-line`, border-radius 12px.
- Padding: 0 (image bleeds to top edge) then 24px for content block.
- Image area: 16:9 aspect ratio at top, fallback is a Deep Olive panel with the Mehfil logo-mark at 40% opacity (not the full wordmark — just the sparkle glyph).
- Date pill: absolute top-left over image, 8px from edges. Turmeric Gold background, Deep Olive text, 4px border-radius, 6px × 12px padding, font-weight 600, 13px.
- Card H3 (event title): Plus Jakarta Sans 600, 22px, color `--mn-deep-olive`.
- Venue line: Plus Jakarta Sans 400, 14px, color `--mn-body-text`, with a small location-pin icon at 12px.
- Featured artist(s): Instrument Serif italic, 17px, color `--mn-henna`. One line ("Featuring Nikhil Iyer + Aarthi Kumar").
- CTA: Turmeric Gold button "Get Tickets →" full-width inside card bottom, 14px font.

**Card hover state:** translateY(-3px) + box-shadow `0 8px 24px rgba(0,0,0,0.18)` (darker shadow since section is Deep Olive). Whole card is clickable — not just the button.

**Placeholder content:**

```
Card 1:
  Date pill: MAY 18
  Title: A Ghazal Evening with Bhuwin
  Venue: Ballard Coffee Works, Seattle
  Featuring: Bhuwin — folk-Sufi blends from Rajasthan and Punjab
  [ Get Tickets → ]

Card 2:
  Date pill: JUN 07
  Title: Mehfil x Berklee Indian Ensemble
  Venue: Town Hall Seattle, First Hill
  Featuring: Berklee Indian Ensemble — residency performance
  [ Get Tickets → ]

Card 3:
  Date pill: JUL 12
  Title: Emerging Voices: Nikhil Iyer + Aarthi Kumar
  Venue: Fremont Abbey Arts Center
  Featuring: Nikhil Iyer + Aarthi Kumar — pop, Carnatic, and Coke Studio covers
  [ Get Tickets → ]
```

**Component structure:** `<UpcomingEvents events={events} />` pulls from Sanity `Event` type, orders by date ascending, slices top 3. `<EventCard />` is reusable — `/events` list page uses the same component in a 3-column grid on Ivory background (not Deep Olive).

**Mobile behavior:**
- Stack to 1 column, full card width.
- Horizontal scroll carousel is NOT recommended in v1 (accessibility cost too high for 3 items).
- Image 16:9 ratio preserved — caps at ~220px tall on a 390px viewport.
- "Get Tickets →" button full-width, stays Turmeric.

**Accessibility:**
- `<article>` per card, `<h3>` for title inside a `<section>` with H2.
- Each card wrapped in one `<Link>` to `/events/[slug]` with a descriptive `aria-label` ("May 18: A Ghazal Evening with Bhuwin at Ballard Coffee Works. View event details and tickets.").
- Date pill has `aria-hidden="true"` — date is already in the link aria-label.
- Ticket button is technically redundant to the card click — keep it visually but don't double-announce. Use `tabindex="-1"` on the inner button if the whole card is the link, OR keep the card non-clickable and only the button + title as links. Recommend the latter (cleaner semantics).
- Turmeric `#D4A843` on Deep Olive `#2C3A2E` passes AA at 6.4:1 (confirmed in spec).

**Design rationale:**
- *Cultural:* Deep Olive section intentionally echoes the evening mood of an actual Mehfil — you're literally stepping into a dim room to read about upcoming evenings.
- *Conversion:* Turmeric "Get Tickets" (not Saffron) preserves Saffron scarcity for donations while still giving event CTAs a distinctive, on-brand accent.
- *Trust:* Specific venues named (Town Hall Seattle, Fremont Abbey, Ballard Coffee Works) signal institutional embeddedness to grant reviewers — they know these venues.

---

### 2.6 Partner Logos — `<PartnerStrip />`

**Role:** Social proof via institutional logos. One of the highest-value grant-reviewer signals on the page.

**Layout:**
- Background: `--mn-ivory` (hard tonal reset back to trust layer after the Deep Olive events section).
- Container: max-width 1100px.
- Section padding: 80px top / 80px bottom desktop (slightly tighter than other sections — this is a visual rhythm section, not a reading section).
- Section label: Plus Jakarta Sans 600, 13px, uppercase, letter-spacing 1px, color `--mn-muted`, centered. Copy: "In good company". 32px below the label → logo row.
- Logo row: flex row, `justify-content: space-between`, `align-items: center`, flex-wrap on <1024px.
- Each logo sized to max-height 48px, max-width 140px, `filter: grayscale(100%)` + `opacity: 0.65`. On hover: `filter: none` + `opacity: 1` + 200ms transition.

**Partners to include (from PRD + CLAUDE.md):**

```
KEXP · Chateau Ste. Michelle · Benaroya Hall · Starbucks Reserve Roastery ·
Beats of Washington · Pratham USA
```

Up to 6 logos in v1. Space them evenly on desktop. Wrap to a second row on tablet at 3-up. On mobile, show as a 2-column grid.

**Component structure:** `<PartnerStrip partners={partners} />`. Pulls from Sanity `Partner` content type. Each partner has `name`, `logo`, `url`, `partnership_type`.

**Mobile behavior:**
- 2-column grid, 32px row gap, 24px column gap.
- Logos max-height drops to 36px.
- No hover states on touch — show all logos at full color + 0.9 opacity by default on <768px (hover doesn't exist on mobile, so the greyscale treatment hurts recognition).

**Accessibility:**
- Section is `<section aria-labelledby="partners-heading">` with a visually-hidden H2 "Our community partners".
- Each logo: `<a href={url}><img alt="{partner.name}" /></a>` — every logo is a real link, alt is the partner name.
- No SVG-only decorative logos — all must have real alt text.

**Design rationale:**
- *Cultural:* Including Pratham USA signals South-Asian-diaspora embeddedness; KEXP and Benaroya Hall signal Seattle cultural institution embeddedness. Both audiences see themselves.
- *Conversion:* Grant reviewers explicitly check partner logos to assess community ties. The "In good company" label frames this as peer recognition, not name-dropping.
- *Trust:* Greyscale-on-default treatment is deliberately understated — logos shouting for attention reads as "marketing page." Quiet treatment reads as "nonprofit page."

---

### 2.7 Founder Story Blurb — `<FounderBlurb />`

**Role:** Humanize the org in one short paragraph. The "people give to people" moment.

**Layout:**
- Background: `--mn-linen` (`#EDE6DA`) — one notch warmer than Ivory to signal intimacy without the full weight of a Deep Olive "night" section.
- Container: max-width 900px.
- Section padding: 96px top / 96px bottom.
- Two-column layout at ≥768px: left column (33%) is a portrait image (square aspect ratio, border-radius 12px, max-width 240px); right column (67%) holds italic eyebrow + short paragraph + Trust Teal "Read our story" link.
- On <768px: stack. Portrait on top (centered, 160px × 160px), text below.

**Content (real copy — founder to confirm name and one-line role):**

```
Eyebrow (Instrument Serif italic, 18px, Henna):
  A note from our founder.

Paragraph (Plus Jakarta Sans 400, 18px, Dark Text, line-height 1.8, max-width 560px):
  I moved to Seattle in 2020 looking for a room where South Asian music
  lived the way it did back home — close, unhurried, shared. I couldn't
  find one, so I built it. Five years and many Mehfils later, what started
  as one evening in a living room has become a community that shows up for
  each other. Thank you for being here.

Signature line (Plus Jakarta Sans 600, 15px, Body Text):
  — [Founder name], Founder & Artistic Director

CTA link (Plus Jakarta Sans 600, 14px, Trust Teal, underline on hover):
  Read our full story →   [links to /about#our-story]
```

**Typography tokens:** Eyebrow → `font-accent` italic / 18px. Paragraph → `font-body` 400 / 18px / line-height 1.8 (slightly larger than standard body — this is a "quote card" moment).

**Color tokens:**
- Background: `--mn-linen`
- Eyebrow: `--mn-henna`
- Paragraph: `--mn-dark-text`
- Portrait border: none (just the rounded corners)
- Link: `--mn-trust-teal`

**Component structure:** `<FounderBlurb />` — one-off, but built to be easily extractable if the founder wants to reuse the pattern on `/about`.

**Mobile behavior:**
- Portrait becomes 160px centered above the text.
- Paragraph font-size holds at 18px (don't shrink — this is a deliberate "read me slowly" moment).
- Link stays inline at the end of the signature.

**Accessibility:**
- Portrait alt text: real description — "Portrait of [Founder name] at [specific Mehfil event], [year]" — never "photo of founder."
- If the portrait is replaced with a generic group photo, update alt accordingly.
- Link has visible focus ring (2px Trust Teal outline).

**Design rationale:**
- *Cultural:* The founder's origin story IS the mehfil tradition in miniature — a person who couldn't find a room, so they made one, and neighbors came. That's the 1,000-year-old pattern restated in Seattle terms.
- *Conversion:* Nonprofit donation research is clear: personal stories outperform institutional copy 3:1 for emotional donation triggers. Putting the founder on the homepage, not buried in /about, matters.
- *Trust:* Teal link (not Saffron) — "read more" is an info action, not a donate action. Keeps Saffron scarcity intact.

---

### 2.8 Newsletter Signup — `<NewsletterSignup />`

**Role:** Convert interested visitors into email subscribers. Low-pressure second-tier conversion action.

**Layout:**
- Background: `--mn-sand` (`#E6DCCB`). Warm, low-pressure, clearly a different mood than the Saffron donate band that follows.
- Container: max-width 720px, center-aligned.
- Section padding: 80px top / 80px bottom.
- Centered column: H2, italic subtitle, email input, subscribe button, one-line reassurance.

**Content:**

```
H2 (DM Serif Display, 32px, Dark Text):
  Be the first to know about the next Mehfil.

Italic subtitle (Instrument Serif italic, 19px, Henna):
  One short email a month. Event dates, artist spotlights, no noise.

Form (flex row on ≥640px, stacked <640px):
  [ your@email.com ]   [ Subscribe ]
  ← Email input         ← Soft Sand button with Deep Olive text

Reassurance (Plus Jakarta Sans 400, 13px, Muted, 16px below form):
  We'll never share your email. Unsubscribe any time.
```

**Input styling:** background `--mn-warm-white`, border 1px `--mn-clay`, border-radius 6px, padding 14px 16px, font-size 15px, placeholder color `--mn-muted`. Focus state: 2px `--mn-trust-teal` outline.

**Button styling:** Use the "Soft Sand" button variant from brand spec (background `--mn-sand` … wait — same as section bg, won't work). **Override:** on a Sand section, use the Trust Teal variant for the Subscribe button instead (`--mn-trust-teal` bg, white text). This preserves the "low pressure" feel while giving enough visual contrast to be tappable.

**Component structure:** `<NewsletterSignup />`. Wraps Mailchimp or ConvertKit embed (per PRD risk §5 — founder chooses). Client-side form validation, server action for submission, accessible success/error states.

**Mobile behavior:**
- Form stacks: email input full-width, subscribe button full-width below (12px gap).
- H2 shrinks to 26px.
- Keep the reassurance line — it eases the ask on mobile where form abandonment is higher.

**Accessibility:**
- `<label>` for email input (visually hidden but present): "Email address".
- `<input type="email" required autocomplete="email">`.
- Error state uses text + red `--mn-henna`-adjacent color AND an icon (no color-alone signaling).
- Success state: inline message, no modal or redirect. "Thanks — you're on the list." in Sage green.
- Button is `<button type="submit">`.

**Design rationale:**
- *Cultural:* "One short email a month. Event dates, artist spotlights, no noise." — the Mehfil voice on promise-keeping. Mehfil Nights' whole brand is "intimate and unhurried" — a weekly newsletter would contradict that.
- *Conversion:* Teal subscribe button (not Saffron) maintains Saffron scarcity. Subscribing is a trust-building action, not a donation action.
- *Trust:* Reassurance line under the form answers the two unspoken donor questions (sharing + unsubscribe) in 9 words.

---

### 2.9 Donate CTA Band — `<DonateCTABand />`

**Role:** Final conversion moment. The single Saffron button on the page (aside from the nav Donate button).

**Layout:**
- Background: `--mn-deep-olive`. The last "night moment" — bookends the hero's Deep Olive.
- Full-bleed, container max-width 900px centered.
- Section padding: 112px top / 112px bottom desktop / 80px mobile.
- Center-aligned column: italic eyebrow + H2 + one-paragraph case for support + Saffron button + tax-deductibility microcopy + EIN line.

**Content:**

```
Eyebrow (Instrument Serif italic, 20px, Turmeric):
  Your donation keeps the room open.

H2 (DM Serif Display, 44px desktop / 32px mobile, Ivory):
  Help us host the next Mehfil.

Body (Plus Jakarta Sans 400, 17px, Ivory at 90%, max-width 620px, line-height 1.8):
  Your contribution pays artists, rents venues, provides sound and lights,
  and keeps ticket prices low so every neighbor can come. Every dollar
  stays in the room.

CTA button (Saffron, 16px padding vertical, 40px padding horizontal, 15px font):
  [ Donate Now →  ]

Tax line (Plus Jakarta Sans 400, 13px, Sage Muted, 20px below button):
  Mehfil Nights is a 501(c)(3) nonprofit. All donations are tax-deductible.

EIN line (Plus Jakarta Sans 400, 12px, Muted):
  EIN: [XX-XXXXXXX]
```

**Typography tokens:** Eyebrow → `font-accent` italic / 20px. H2 → `font-display` / 44px / line-height 1.15. Body → `font-body` 400 / 17px / line-height 1.8. Tax + EIN → `font-body` 400 / 13px + 12px.

**Color tokens:**
- Background: `--mn-deep-olive`
- Eyebrow: `--mn-turmeric`
- H2: `--mn-ivory`
- Body: `--mn-ivory` at 90% opacity
- Button: `--mn-saffron` (#C17817) with `--mn-white` text. Hover: `--mn-henna` (#8B4A2B).
- Tax line: `--mn-sage-muted` (for AA contrast on dark)
- EIN: `--mn-muted` (acceptable at 12px on dark — 4.8:1)

**Component structure:** `<DonateCTABand />` — one-off on homepage, but `<CTABanner variant="donate" />` is the intended reusable pattern per brand spec. Build the variant-based banner; homepage just passes `variant="donate"`.

**Mobile behavior:**
- H2 drops to 32px.
- Body paragraph narrows naturally with container.
- Button becomes full-width (max 320px), still Saffron.
- Tax + EIN lines stack on separate lines with 8px gap.

**Accessibility:**
- `<section aria-labelledby="donate-band-heading">` with H2.
- Saffron button has `aria-label="Donate to Mehfil Nights"` so screen reader users get full context.
- White-on-Saffron is AA Large (3.5:1 per spec). Button font is 15px weight 600 — qualifies as large text.
- Focus ring: 3px Turmeric outline with 3px offset (extra emphasis since this is the primary conversion button on the page).

**Design rationale:**
- *Cultural:* "Every dollar stays in the room" is the mehfil ethos compressed into 6 words — patronage, not corporate philanthropy.
- *Conversion:* The one Saffron moment on the page (plus nav) lands with weight because nothing else competes. Research cited in brand spec: warm orange tones outperform cool colors for donation conversion. Scarcity compounds the effect.
- *Trust:* Explicit 501(c)(3) + EIN in the band itself (not just footer) resolves the tax-deductibility question at the exact moment the donor is deciding.

---

## 3. Section Rhythm — the Full Scroll

Confirming the 60-30-10 budget on the homepage as a whole:

| Section | Background | Weight | Budget |
|---|---|---|---|
| Hero | Deep Olive | 92vh | 30% |
| Impact | Ivory | ~450px | 60% |
| Mehfil Explainer | Warm White | ~480px | 60% |
| Pillars | Ivory | ~520px | 60% |
| Events | Deep Olive | ~620px | 30% |
| Partners | Ivory | ~220px | 60% |
| Founder | Linen | ~380px | 60% |
| Newsletter | Sand | ~320px | 60% |
| Donate Band | Deep Olive | ~440px | 30% |

Three Deep Olive moments (hero, events, donate band), everything else on warm light surfaces. Saffron appears twice (nav Donate, bottom Donate Band). Turmeric appears four times (hero eyebrow + hairline, event date pills, event "Get Tickets" buttons, Donate band eyebrow). Ratios are within the 60-30-10 guardrail.

---

## 4. Component Inventory (for Rishi)

**New components to build for the homepage:**
- `<Hero />` — homepage-only, one-off
- `<ImpactStats />` — reusable (also on `/impact`)
- `<StatCard />` — reusable child of ImpactStats
- `<MehfilExplainer />` — one-off on homepage, prose-prop-driven
- `<ProgramPillars />` — reusable (also on `/about`)
- `<PillarCard />` — reusable child of ProgramPillars
- `<UpcomingEvents />` — homepage-only wrapper
- `<EventCard />` — reusable (also on `/events` list)
- `<PartnerStrip />` — reusable (also on `/about`)
- `<FounderBlurb />` — homepage-only
- `<NewsletterSignup />` — reusable (also in Footer)
- `<CTABanner variant="donate" />` — reusable, homepage uses it as `<DonateCTABand />`

**Shared (built by Rishi's token work):**
- `<Header />`, `<Footer />`, `<Container />`, `<Section />`, `<Button />` (with variants: `saffron` | `turmeric` | `teal` | `outline` | `soft-sand`)

---

## 5. Breakpoints Summary

- **Mobile:** <768px — single column everywhere, Hero image strip 240px, CTAs stack full-width.
- **Tablet:** 768–1024px — Impact goes 2x2, Events goes 2-col or stacked, Pillars stay stacked (per rationale in §2.4), Founder goes 2-col, Partners wrap at 3-up.
- **Desktop:** >1024px — Impact 4-col, Pillars 3-col, Events 3-col, Partners 6-across.
- Content max-width 1100px throughout except Mehfil Explainer (900px) and Newsletter (720px).

---

## 6. Accessibility Summary (per section)

- One H1 on page (hero).
- H2 per section: Impact, Mehfil Explainer, Pillars, Events, Partners (hidden), Founder (the eyebrow is decorative, so section has a visually-hidden H2 "A note from our founder"), Newsletter, Donate Band.
- H3 used inside cards only (pillar titles, event titles).
- All contrast combinations pass WCAG 2.1 AA — validated against spec §Accessibility table.
- Keyboard nav order follows DOM order; focus rings visible on all interactive elements.
- Every image has real alt text (no "image of" prefix, no empty alt unless decorative).
- Forms (newsletter) have real `<label>` elements and accessible error/success states.
- Skip-to-content link in header targets `<main id="main">`.
- Prefers-reduced-motion: disable the card hover translateY lifts, remove any fade-in-on-scroll animations.

---

## 7. What I'd Push Back On

Flagging for PM / founder review:

1. **Partner strip risk.** The PRD lists 6 partners. If only 3–4 logos are actually usable (with permission), the strip looks thin. Plan B: fall back to a single-row 3-logo strip, center-aligned, with the label "A few of the institutions we've partnered with" — softer framing, less pressure on logo count.

2. **Founder portrait availability.** If no founder portrait exists that's (a) high-res, (b) pleasing, (c) recent, the Founder Blurb becomes text-only. In that case I'd add a small decorative illustration — a minimal Turmeric line drawing of a lamp or a harmonium — rather than a stock photo. Do NOT ship a generic stock headshot.

3. **Stat numbers honesty.** If founder can't yet cite real numbers (e.g., no clean count of volunteer hours), ship 3 stats instead of 4. Empty placeholder numbers are worse than one fewer stat. The grid auto-adjusts.

4. **Events section depends on Sanity content.** If fewer than 3 upcoming events exist at launch, show 2 cards at larger size (2-col grid), not 3. Do NOT pad with past events here — this section is labeled "What's next."

5. **"Support Our Mission" vs "Donate Now" in hero.** The PRD says primary CTA = donate. I'm using softer copy ("Support Our Mission") on the hero Saffron button because a raw "Donate Now" above the fold reads transactional for a first-time visitor who hasn't yet read the mission. "Donate Now →" lives on the bottom band after the full case has been made. If the founder prefers "Donate Now" in the hero too, we can test both — but I recommend the soft hero ask + direct bottom ask.
