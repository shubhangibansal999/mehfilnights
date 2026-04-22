# Events v1 — Design Spec

**Author:** Saloni (design agent)
**For:** Rishi (frontend), Shubhangi (PM), Vansh (PM), Founder
**Version:** 1.0 — 2026-04-22
**Scope:** `/events` list + `/events/[slug]` detail. Based on PRD v1 §4, Brand Guidelines v3.

---

## 0. Design Intent (Read Before Building)

Events pages serve **two distinct audiences**:
- **Community members** (primary on /events list + /events/[slug]): deciding whether to come next Saturday.
- **Grant reviewers** (secondary but load-bearing): scanning "is this org actually doing things?" — the **past events archive** on /events is the main grant-evidence surface of the site.

**The through-line:** events are the mood moment of the brand. This is where Deep Olive earns its place. Lead with a warm short hero band, then let the event content sit on a mix of Ivory (upcoming) and a Deep Olive strip (past — archival weight). Turmeric is the events-and-tickets color; it appears on every CTA in this section.

**What changes from homepage:**
- Homepage showed 3 upcoming events on Deep Olive. /events shows N upcoming events on **Ivory** (not Deep Olive) — because this page is a catalog, not a "night moment." Deep Olive returns for the past-events archive strip (earned mood, not decorative).
- Event card component stays identical across contexts — only the parent background and spacing change.

**What this page (both routes) MUST do:**
1. Show upcoming events clearly with date, venue, artists, ticket link.
2. Handle the "no upcoming events" empty state honestly.
3. Archive past events in a compact form that reads as grant-evidence.
4. On detail pages: give a community member everything they need in 60 seconds and give SEO crawlers structured event data.

---

## PART A — `/events` LIST PAGE

## 1. Page Architecture — Reading Order

1. Hero band (short, with subscribe-for-alerts link)
2. Upcoming Events list (primary)
3. Past Events archive (compact grid, grant-evidence)
4. Closing newsletter nudge (optional if list length is short)

Section padding between majors: **80px desktop / 64px tablet / 48px mobile**. Content container max-width **1100px**.

---

## 2. Section-by-Section Spec

### 2.1 Events Hero Band — `<EventsHero />` (NEW)

**Role:** Tell the visitor they're in the right place, point them to subscribe if nothing fits their calendar.

**Layout:**
- Full-bleed, min-height **44vh desktop / 36vh tablet / auto (~280px) mobile**. Deliberately short — this is an index page; don't bury the list.
- Background: `--mn-deep-olive`. Decorative treatment: a faint 1px Turmeric horizontal line at the bottom edge (constant; no gradient). NO photograph.
- Content block vertically centered, max-width 780px, left-aligned text at ≥768px / center-aligned ≤767px.
- Eyebrow + H1 + subtitle + subscribe-link.

**Content:**

```
Eyebrow (Instrument Serif italic, 18px, Turmeric):
  Upcoming Mehfils.

H1 (DM Serif Display, 44px desktop / 32px mobile, Ivory, line-height 1.15):
  A room, an artist, an evening
  you'll remember.

Subtitle (Instrument Serif italic, 20px, Sage Muted, max-width 580px):
  Every Mehfil is acoustic, intimate, and small enough that
  the artist can hear the audience breathe.

Subscribe link (Plus Jakarta Sans 600, 14px, Turmeric, underline on hover):
  Can't make this one? Get alerts for the next mehfil →
  [links to #newsletter or scrolls-to the footer newsletter form]
```

**Typography tokens:** Eyebrow → `font-accent` italic / 18px. H1 → `font-display` / clamp(32px, 4.5vw, 44px) / line-height 1.15. Subtitle → `font-accent` italic / 20px / line-height 1.4. Link → `font-body` 600 / 14px.

**Color tokens:**
- Background: `--mn-deep-olive`
- Eyebrow: `--mn-turmeric`
- H1: `--mn-ivory`
- Subtitle: `--mn-sage-muted`
- Link: `--mn-turmeric` (hover: `--mn-ivory`)

**Mobile behavior:**
- H1 drops to 32px.
- Subscribe link moves to a new line below subtitle (no inline flow).
- Center alignment.

**Accessibility:**
- `<section aria-labelledby="events-hero-heading">`, H1 has that id.
- Subscribe-link is a real `<a href>` pointing to the newsletter anchor or an external Mailchimp-hosted form. Real link, not a button.
- Contrast confirmed: Ivory on Deep Olive (12:1), Turmeric on Deep Olive (6.4:1).

**Design rationale:**
- *Cultural:* The subtitle ("small enough that the artist can hear the audience breathe") restates the homepage mehfil ethos in one sentence — the reader who arrived directly on /events without visiting homepage gets the cultural framing instantly.
- *Conversion:* Subscribe-link in the hero captures the "I came to check the calendar and nothing works for me" visitor — turning a bounce into an email capture. This is the highest-ROI micro-action on the page.
- *Trust:* Short hero means the content (the list) is above the fold on most desktop screens. Grant reviewers count clicks to content; this minimizes it.

---

### 2.2 Upcoming Events List — `<UpcomingEventsList />` (NEW)

**Role:** The main content of the page. Show all upcoming events, sorted by date ascending.

**Layout:**
- Background: `--mn-ivory` (NOT Deep Olive — this is a catalog, not a mood moment).
- Container: max-width 1100px.
- Section padding: 80px top / 80px bottom desktop.
- Above the list: small italic Instrument Serif eyebrow "On the calendar." — 18px, Henna. Below it: a compact counter "**N upcoming events**" in Plus Jakarta Sans 600, 15px, `--mn-dark-text`, left-aligned.
- Events arranged in a **3-column grid at ≥1024px / 2-column at 768–1024px / 1-column mobile**. 24px gap.
- Sort: ascending by date. The soonest event is top-left.

**Event card — reuses `<EventCard />` from homepage.** Same component, same visual design. Pass the same card into both homepage preview and /events list. The only difference: parent section background. On Deep Olive (homepage), the Sand card pops. On Ivory (/events), the Sand card still reads as a card but subtler — intentional: homepage events are a hook; /events is a catalog.

**Card variant for /events (Ivory parent):**
- Background stays `--mn-sand`.
- Border becomes slightly stronger: 1px `--mn-clay` (instead of Light-Line) to hold its edge on a light parent. This is the one parent-aware tweak. Rishi: consider a `variant="on-light" | "on-dark"` prop on `<EventCard />` that only toggles border color.

**Image placeholder treatment (for events without uploaded images yet):**
- Aspect 16:9 area, background `--mn-deep-olive`.
- Centered decorative glyph: the Mehfil logo-mark (three concentric circles + center dot, already used on the homepage Upcoming Events section in `UpcomingEvents.tsx`) in Turmeric at 40% opacity.
- No "Image coming soon" text — the glyph carries the treatment.
- This treatment is identical to the homepage placeholder — Rishi already built it; reuse exactly.

**Empty state (no upcoming events):**
- Replace the grid with a single centered block:

```
Background: --mn-sand (a soft band)
Padding: 64px
Max-width: 620px, centered

H3 (DM Serif Display, 28px, Dark Text):
  The next mehfil is being planned.

Body (Plus Jakarta Sans 400, 17px, Body Text, line-height 1.7):
  We host 4–6 Mehfils a year, announced 6–10 weeks ahead.
  The best way to hear about the next one is email —
  one short message when tickets open, never spam.

CTA (Trust Teal button): [ Subscribe for event alerts → ]
Secondary link (Teal, 14px, underlined): See past events ↓
```

**Typography tokens:** Empty-state H3 → `font-display` / 28px. Body → `font-body` 400 / 17px / line-height 1.7.

**Component structure:**
- `<UpcomingEventsList events={events} />` — new wrapper. Takes a list of events from Sanity, filters to `date >= now`, sorts ascending, maps to `<EventCard />`. If list is empty, renders `<EmptyState />`.
- `<EmptyState variant="no-upcoming-events" />` — new. Reusable as a generic empty-state.
- `<EventCard />` — reused from homepage; potentially add `variant="on-light" | "on-dark"` prop to toggle border color.

**Mobile behavior:**
- Stack to 1 column.
- Each card full-width.
- The "**N upcoming events**" counter stays visible — actually MORE useful on mobile where the grid length isn't visible at a glance.
- Empty state padding drops to 40px.

**Accessibility:**
- Section is `<section aria-labelledby="upcoming-events-list-heading">` with a visually-hidden H2 "Upcoming events".
- Each card is `<article>` with `<h3>` for title.
- Empty state uses `<h3>` (not `<h2>` — the hidden H2 is already the section heading; this is nested content).
- Counter "N upcoming events" is a real `<p>` — screen readers announce the count.

**Design rationale:**
- *Cultural:* Keeping the same `<EventCard />` on homepage and /events is a design-system-discipline signal. A visitor who clicked through from homepage recognizes the cards immediately — no re-learning required.
- *Conversion:* The "N upcoming events" counter is unglamorous but high-converting. Community members want to know "how much content is here before I invest attention." A visible number calibrates that fast.
- *Trust:* The empty state is honest — "we host 4–6 a year, announced 6–10 weeks ahead" is grown-up copy. No fake urgency.

---

### 2.3 Past Events Archive — `<PastEventsArchive />` (NEW)

**Role:** Grant-evidence. This section's primary reader is a program officer scanning "what have they actually done." Secondary: a community member who missed an event and wants to see what they missed.

**Layout:**
- Background: `--mn-deep-olive`. This IS the earned mood-moment — we're looking back into the archive of past evenings. Deep Olive = night, retrospective.
- Container: max-width 1100px.
- Section padding: 96px top / 96px bottom desktop.
- Above the grid: H2 "What we've done" in Ivory + italic subtitle "A look back at past Mehfils." in Turmeric.
- Cards arranged in a **4-column compact grid at ≥1024px / 3-column tablet / 2-column <768px / 1-column <480px**. Smaller cards — these are retrospective tiles, not clickable-to-buy cards.
- 16px gap between cards.

**`<PastEventCard />` anatomy (new, compact variant):**
- Image area: 4:3 aspect ratio at top (tighter than upcoming card's 16:9 — retrospective feel, plus saves vertical space).
- Date pill: top-left over image, Turmeric bg, Deep Olive text, 11px font.
- Below image: 16px padding. No background fill inside.
- Title: Plus Jakarta Sans 600, 16px, Ivory.
- Venue: Plus Jakarta Sans 400, 12px, Sage Muted. One line.
- CTA: a tiny text link "View details →" (Trust Teal, 12px, underline on hover). No full button — past events are browsed, not clicked into with urgency.

**Placeholder (image-less) treatment:**
- Same Deep-Olive-with-Turmeric-glyph as upcoming cards, but at smaller scale (glyph 48px instead of 80px).

**Past event count display:**
- Small label below the H2, right-aligned on desktop, below title on mobile: "**XX Mehfils since 2020**" in Plus Jakarta Sans 600 / 14px / Turmeric.

TODO: Founder to provide total past event count. Fetched from Sanity count query at build time.

**Pagination:**
- v1: no pagination, no infinite scroll. Show up to **12 most-recent past events**. If more than 12 exist, add a "See all 24 past events" link at the bottom that, for v1, can link to an anchor within the same section showing everything. (True pagination is v2 — per PRD §5.)
- If ≤12 past events total, omit the "See all" link.

**Component structure:**
- `<PastEventsArchive events={pastEvents} />` — new wrapper.
- `<PastEventCard event={event} />` — new. Sibling to `<EventCard />`, not a variant — the visual difference is significant enough that it's a distinct component. Each is tuned for its context.

**Mobile behavior:**
- Grid collapses to 2 columns at <768px and 1 column at <480px.
- Image aspect stays 4:3.
- Title font size stays 16px (don't shrink — already small).
- "XX Mehfils since 2020" counter moves above the grid, center-aligned.

**Accessibility:**
- `<section aria-labelledby="past-events-heading">` with real `<h2>`.
- Each card is `<article>` with `<h3>` for title. Wrapped in `<Link>` to `/events/[slug]`.
- Date pill is `aria-hidden="true"` — date is in the link's `aria-label`.
- Image alt text comes from Sanity (per PRD §10, alt text is required on every image).

**Design rationale:**
- *Cultural:* The contrast — upcoming events on Ivory (alive, current), past events on Deep Olive (archival, respectful) — is the site's central brand move compressed into one page. The deep-olive band visually preserves the night moments.
- *Conversion:* This section is secretly the highest-value grant-evidence block on the site. A program officer who scrolls past "upcoming" and sees 24 past events laid out in a grid has their "are they real?" question answered faster than any stat card.
- *Trust:* The "XX Mehfils since 2020" counter converts the grid from decorative to quantitative in one label.

---

## PART B — `/events/[slug]` DETAIL PAGE

## 3. Detail Page Architecture — Reading Order

1. Detail Hero (title + date + venue + artists + primary CTA)
2. Full event description (rich text)
3. Artists block (name + bio + photo placeholder, one per performing artist)
4. Venue details (address, parking/accessibility, map link)
5. [Past-event only] "What happened" impact block
6. Related events strip (3 cards at the bottom)

Section padding between majors: **72px desktop / 56px mobile** (tighter than list pages — this is focused reading).

---

### 3.1 Detail Hero — `<EventDetailHero />` (NEW)

**Role:** Make the decision easy. Title, when, where, who, and "Get Tickets" visible immediately.

**Layout:**
- Full-bleed, min-height **72vh desktop / 60vh tablet / auto mobile** (content-driven, ~520px mobile). Taller than list hero because this is the page's main content summary.
- Background: `--mn-deep-olive`, with the event's hero image as a full-bleed photograph at opacity 0.4 behind the content, overlaid with a bottom-to-top Deep-Olive gradient to guarantee text contrast. If no image: solid Deep Olive with a subtle Turmeric hairline pattern at the bottom edge.
- Two-column layout ≥1024px: left column (60%) holds all text + CTA; right column (40%) holds a large 4:3 hero image inside a rounded frame (16px border-radius, 2px Turmeric border). Below 1024px: single column, image on top.
- Content block max-width 620px on the text column.

**Content structure (real example using May 18 event):**

```
Breadcrumb (Plus Jakarta Sans 400, 13px, Turmeric, letter-spacing 0.5px):
  ← All events

Date pill (Plus Jakarta Sans 700, 13px, Deep Olive on Turmeric bg, 6px padding):
  MAY 18, 2026 · SATURDAY · 7:30 PM

H1 (DM Serif Display, 48px desktop / 32px mobile, Ivory, line-height 1.15):
  A Ghazal Evening with Bhuwin

Artist line (Instrument Serif italic, 22px, Turmeric):
  Featuring Bhuwin — folk-Sufi blends from Rajasthan and Punjab.

Venue line with pin icon (Plus Jakarta Sans 400, 15px, Ivory at 90%):
  📍 Ballard Coffee Works · 5465 Leary Ave NW, Seattle 98107

CTA (Turmeric button, large — 18px padding vertical, 44px padding horizontal):
  [ Get Tickets →  ]
  (outbound to the ticket URL)

Secondary meta row (Plus Jakarta Sans 400, 13px, Sage Muted, pipe-separated):
  Doors 7:00 PM  |  Floor seating  |  BYOB  |  ADA accessible
```

**For past events, the CTA row changes:**
- Replace `[ Get Tickets → ]` with `[ See Photos → ]` (Trust Teal button).
- The photos link points to a placeholder gallery page; for v1, can link to an Instagram highlight URL or a /events/[slug]#photos anchor that scrolls to the "What happened" block.
- Add a small italic tag above the H1: *"This event has passed."* — Instrument Serif / 18px / Sage Muted.

**Typography tokens:** Breadcrumb → `font-body` 400 / 13px. Date pill → `font-body` 700 / 13px. H1 → `font-display` / clamp(32px, 5vw, 48px) / line-height 1.15. Artist line → `font-accent` italic / 22px. Venue line → `font-body` 400 / 15px. Meta row → `font-body` 400 / 13px.

**Color tokens:**
- Background: `--mn-deep-olive` + photograph at 0.4
- Breadcrumb: `--mn-turmeric`
- Date pill: `--mn-deep-olive` on `--mn-turmeric`
- H1: `--mn-ivory`
- Artist line: `--mn-turmeric`
- Venue/meta: `--mn-ivory` at 90% / `--mn-sage-muted`
- CTA: `--mn-turmeric` bg, `#2B2B2B` text (Turmeric button variant from Button component)

**Mobile behavior:**
- Hero image moves to top, aspect shifts to 16:9 (full-bleed horizontal).
- Text column single-column, full-width.
- CTA becomes full-width (max 320px).
- Meta row wraps — each item on its own line if needed, with 6px gap.

**Accessibility:**
- `<section aria-labelledby="event-hero-heading">`, H1 has that id.
- Breadcrumb is a real `<a href="/events">` with `aria-label="Back to all events"`.
- Date is marked up as `<time datetime="2026-05-18T19:30:00-07:00">` for crawler + screen-reader consumption.
- Hero image has Sanity-provided alt text (required field per PRD §10).
- Venue pin icon is `aria-hidden="true"`; the address text carries the meaning.
- CTA outbound link: `target="_blank"` + `rel="noopener noreferrer"` + visually-hidden "(opens in new tab)" text.

**Design rationale:**
- *Cultural:* Artist name in Turmeric italic (the "in-program" font) directly evokes concert-program booklet typography — a South Asian classical-music convention.
- *Conversion:* The decision stack is date → title → artist → venue → tickets. That's also the scan order of the hero. Optimized for a 15-second decision.
- *Trust:* "BYOB," "Floor seating," "ADA accessible" as a meta row answers the three questions most first-time mehfil-goers ask before committing. Putting them in the hero reduces support email.

---

### 3.2 Full Event Description — `<EventDescription />` (NEW)

**Role:** The long-form case for attending. 2–4 paragraphs of rich text.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 780px (narrower — prose reading width).
- Section padding: 80px top / 64px bottom desktop.
- No section heading — prose flows directly from hero.
- First paragraph has a small italic eyebrow above it: "About this evening." — Instrument Serif / 18px / Henna.

**Typography:**
- Paragraphs: Plus Jakarta Sans 400 / 17px / line-height 1.8, color `--mn-body-text`. 24px inter-paragraph spacing.
- Pull quote (optional, if event description includes a pull): a block with `border-left: 3px solid --mn-turmeric`, 24px left padding, Instrument Serif italic 22px, color `--mn-henna`.
- Rich text supports: bold, italic, links (Trust Teal, underlined), and ordered/unordered lists. NO images in the description body in v1 — images belong in the Artists block and the hero.

**Content (example for the Bhuwin event):**

```
Eyebrow: About this evening.

[Paragraph 1]
Bhuwin's music lives in the space between Sufi traditions of Punjab
and the folk repertoire of Rajasthan. His voice has traveled from
small mehfils in Lahore to festival stages in the Pacific Northwest —
but his preferred room is still a small one, with floor cushions and
a single microphone.

[Paragraph 2]
The evening will open with traditional ghazals — Ghalib, Faiz, Amir
Khusrau — and then move into Bhuwin's own compositions, which trace
the same poetic tradition into contemporary rooms. Expect long,
unhurried ragas; expect the occasional pause for a story; expect to
leave humming a couplet you didn't know you'd remember.

[Paragraph 3]
Ballard Coffee Works will clear its seating and lay out floor cushions
and low tables for the evening. Guests are welcome to bring their own
blanket. Tea and chai will be available; the café is BYOB for wine or
beer.
```

**Component structure:** `<EventDescription richText={event.description} />` — new. Renders Sanity Portable Text to HTML with the above styling. Reused on every /events/[slug] page.

**Mobile behavior:**
- Paragraphs stay 17px (don't shrink — readability).
- Container stays 780px inside a 20px gutter.

**Accessibility:**
- Section is `<section>` with no heading (prose continues from Hero's H1 context; this is a flow of content, not a new section).
- If the Sanity editor adds a heading inside the rich text, it's rendered as `<h2>`. Enforce "no H1 in body text" at the CMS layer.
- Links within rich text are real `<a>`s with visible hover/focus states.

**Design rationale:**
- *Cultural:* Naming Ghalib, Faiz, Amir Khusrau in the sample copy signals cultural literacy to South Asian readers who DO care about which poets are represented. General audiences get the gist from surrounding context.
- *Conversion:* 780px reading width + 1.8 line-height = optimized for longer dwell time. Longer dwell correlates with ticket-click rate.
- *Trust:* The third paragraph (logistical details) signals operational maturity — "Ballard Coffee Works will clear its seating" tells the reader the venue is a real partner, not a co-option.

---

### 3.3 Artists Block — `<EventArtists />` (NEW)

**Role:** Give each performing artist a small profile — name, one-paragraph bio, photo placeholder.

**Layout:**
- Background: `--mn-warm-white`.
- Container: max-width 900px.
- Section padding: 80px top / 80px bottom desktop.
- Heading at top: H2 "The artists" in DM Serif Display, 32px. Italic subtitle "Meet the musicians for this Mehfil." in Instrument Serif, 20px, Henna.
- Grid: 2-column at ≥768px (24px gap), 1-column mobile. If only 1 artist, full-width centered.
- Each artist occupies one card.

**`<ArtistCard />` anatomy:**
- Left-aligned photo (square, 160px × 160px, border-radius 12px) OR placeholder (warm-sand filled square with a small Turmeric music-note glyph centered, at 30% opacity).
- Right side content:
  - Name: Plus Jakarta Sans 600, 22px, `--mn-dark-text`.
  - Role descriptor: Instrument Serif italic, 17px, `--mn-henna` (e.g., "Vocalist · Composer" or "Tabla").
  - Bio: Plus Jakarta Sans 400, 15px, `--mn-body-text`, line-height 1.7 — 2–3 sentences, max ~80 words.
  - Optional link row: tiny Trust Teal links "Listen →" / "Instagram →" / "Website →". 13px, underlined on hover.
- Spacing inside card: 16px between photo and text column on desktop.

**Placeholder content (Bhuwin example):**

```
H2: The artists
Subtitle: Meet the musicians for this Mehfil.

[Photo placeholder: warm-sand square with small music-note glyph]

Name: Bhuwin
Role: Vocalist · Composer

Bio: Bhuwin is a folk-Sufi vocalist rooted in the traditions of
Rajasthan and Punjab. He's performed at The Kennedy Center, KEXP,
and countless smaller mehfils across North America. His first
album, "Roohani," was released in 2023.

Links: Listen → | Instagram →
```

**Mobile behavior:**
- Card becomes single column (photo on top, text below).
- Photo 120px × 120px.
- Name stays 22px.

**Component structure:** `<EventArtists artists={event.artists} />` — new. Each artist passed to `<ArtistCard />`. For v1, per PRD §10 CMS schema, artists on an Event are a string array (no photo/bio fields in the Event content type). So the component takes artist NAME strings and renders a simplified card with a placeholder photo and "See more at the event" subline. A richer Artist content type is v2 per PRD.

**Reality check for v1:** Given the PRD's CMS-lite constraint, the Artists block on v1 may be a **simple name-list** (not full profiles). The spec below describes the full component for when Artist profiles arrive in v2. For v1:

```
[V1 simplified layout]
H2: The artists
A single horizontal list of artist names in large Instrument Serif
italic (28px, Henna), comma-separated:

  Bhuwin, with tabla by Rohan Krishnamurthy.

Below that: one line — "Full artist bios coming soon."
```

This is honest and ships. Plan a v2 upgrade the moment a richer Artist schema exists.

**Accessibility:**
- `<section aria-labelledby="artists-heading">` with real `<h2>`.
- Each `<ArtistCard />` is `<article>` with `<h3>` for name.
- Photo alt text is a real description ("Portrait of Bhuwin, 2024.") — never empty, never "image of."
- Links within card have visible hover/focus states.

**Design rationale:**
- *Cultural:* Naming each artist's tradition / instrument explicitly honors them. A vocalist + tabla listing reads differently than "band" and matters to a South Asian classical audience.
- *Conversion:* The "Listen →" outbound link on the card drives trial — a visitor who hears the artist is materially more likely to buy tickets.
- *Trust:* Photos (when available) humanize the event. The placeholder treatment is intentional — unglamorous warm-sand + glyph rather than a stock headshot.

---

### 3.4 Venue Details — `<EventVenue />` (NEW)

**Role:** Practical logistics. Address, parking/accessibility, map.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 900px.
- Section padding: 64px top / 64px bottom desktop.
- Single-column layout with the following vertical rhythm:

```
H2: Where it happens
  (DM Serif Display, 32px, Dark Text)

Venue name + address block
  (Plus Jakarta Sans 600, 18px, Dark Text for venue name;
   400, 15px, Body Text for street address / city / zip)

Small horizontal pipe-separated meta row:
  Floor seating  |  BYOB  |  Step-free entry  |  Street parking

Longer description paragraph (200px spacing below meta):
  Ballard Coffee Works is a community coffee roastery on NW Ballard
  Ave, a 12-minute walk from the Market Street business strip and a
  short Lyft from downtown Seattle. Street parking is available along
  Leary Ave and 20th Ave NW; the 15 and D Line buses stop within a
  block. The venue has a ramp entrance and ADA-accessible restrooms.

Map link (Trust Teal text link, 15px, underline on hover):
  Open in Google Maps →
  [outbound link to Google Maps with the venue address pre-filled]
```

**No embedded map in v1** (PRD §5 non-goal). Text link only — reduces page weight, avoids the Google Maps embed cookie-policy cascade.

**Typography tokens:** H2 → `font-display` / 32px / line-height 1.2. Venue name → `font-body` 600 / 18px. Address → `font-body` 400 / 15px. Meta → `font-body` 400 / 14px. Paragraph → `font-body` 400 / 15px / line-height 1.7. Map link → `font-body` 600 / 15px.

**Component structure:** `<EventVenue venue={event.venue} accessibility={event.accessibility} mapUrl={event.mapUrl} />` — new. All fields pulled from Sanity Event. The "accessibility" meta row is an array of short strings set per event in Sanity.

**Mobile behavior:**
- All stacks naturally (already single-column).
- Meta row wraps — each item on its own line if needed.

**Accessibility:**
- `<section aria-labelledby="venue-heading">` with real `<h2>`.
- Address uses proper markup: `<address>` element. (Semantically correct for a venue address.)
- Map link is outbound: `target="_blank"` + `rel="noopener noreferrer"`.
- Accessibility features in the meta row use real text (not color-coded icons alone) — "Step-free entry" is explicit.

**Design rationale:**
- *Cultural:* "A 12-minute walk from the Market Street business strip" is the Pacific Northwest plainspoken voice. No marketing puff.
- *Conversion:* Explicit accessibility info reduces no-shows — visitors who know what to expect buy tickets with confidence.
- *Trust:* Text-link-to-Google-Maps (not embed) signals respect for privacy. Grant reviewers reviewing data-privacy compliance notice.

---

### 3.5 [Past-Event Only] What Happened — `<PastEventReflection />` (NEW)

**Role:** For past events, surface impact — attendance, artist quotes, a photo placeholder. Grant-evidence per event.

**Layout:**
- Background: `--mn-sand`.
- Container: max-width 900px.
- Section padding: 80px top / 80px bottom.
- Heading: H2 "What happened" in DM Serif Display, 32px, Dark Text.
- Content is a simple 2-column layout (≥768px) or stacked (mobile):
  - Left column: a metrics mini-list (3–4 rows, label + number):
    - AUDIENCE: 64
    - ARTISTS PAID: 2
    - VENUE: SOLD OUT
    - TICKETS KEPT BELOW: $30 (per person)
  - Right column: a single impact pull-quote from an attendee or artist:
    - Instrument Serif italic, 22px, Henna, line-height 1.4.
    - Attribution: Plus Jakarta Sans 400, 14px, Muted, below the quote.

**Placeholder copy:**

```
H2: What happened

[Left column — metrics]
   AUDIENCE           64
   ARTISTS PAID        2
   VENUE        SOLD OUT
   TICKETS KEPT BELOW  $30

[Right column — quote]
"I've lived in Seattle for twelve years and I've never heard a
ghazal here. Walking into that room felt like walking into a
memory I didn't know I had."
   — Priya, audience member
```

**Component structure:** `<PastEventReflection metrics={[]} quote={{text, attribution}} />` — new. Only rendered if `event.status === "past"`. Metrics and quote are per-event Sanity fields (add to Event content type in v2; for v1, can be hardcoded per-event in the Event document).

**Design rationale:**
- *Cultural:* The attendee quote ("walking into a memory I didn't know I had") is the emotional truth of a mehfil in one line. A grant reviewer reads this and understands why this nonprofit exists.
- *Conversion:* Past events with impact metrics become grant-application-ready content. A program officer can literally quote from the page.
- *Trust:* Numbers per event (not just aggregated) signal "we track what we do." Specific > aggregate.

---

### 3.6 Related Events Strip — `<RelatedEvents />` (NEW)

**Role:** Keep the visitor on-site. If they liked this event's page, show them what else is coming.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 1100px.
- Section padding: 80px top / 80px bottom.
- H2 "More to come" + italic subtitle "Three more evenings on the calendar."
- 3-column grid of `<EventCard />`s (reused from homepage/list). On past-event detail pages, the related strip shows 3 UPCOMING events (keep the visitor moving forward). On upcoming-event detail pages, show 3 OTHER upcoming events (excluding the current one).

**Fallback:** If fewer than 3 upcoming events exist, show what exists (1 or 2 cards, sized up to fill the grid). If zero upcoming exist, replace the section with a small "Subscribe for alerts →" link on `--mn-sand` background — a 40px-tall band.

**Component structure:** `<RelatedEvents currentSlug={slug} />` — new. Queries Sanity for top-3 upcoming events excluding `slug`. Uses existing `<EventCard />`.

**Design rationale:**
- *Cultural:* Keeping the reader in the Mehfil Nights world (not bouncing out to Instagram) reinforces the org as the destination for South Asian live music in Seattle.
- *Conversion:* Related-content strips are standard on arts-org sites for a reason — they compound ticket clicks. Keep the card format identical to homepage/list to avoid any cognitive re-learning.

---

## 4. JSON-LD Event Schema (Rishi implements)

**Saloni notes the requirement — Rishi writes the code.** Every /events/[slug] page must include a JSON-LD structured-data block in `<head>` conforming to schema.org/Event. Minimum fields:

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "A Ghazal Evening with Bhuwin",
  "startDate": "2026-05-18T19:30:00-07:00",
  "endDate": "2026-05-18T22:00:00-07:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Ballard Coffee Works",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5465 Leary Ave NW",
      "addressLocality": "Seattle",
      "addressRegion": "WA",
      "postalCode": "98107",
      "addressCountry": "US"
    }
  },
  "image": [ /* hero image URL */ ],
  "description": "Folk-Sufi blends from Rajasthan and Punjab, performed acoustically.",
  "organizer": {
    "@type": "Organization",
    "name": "Mehfil Nights",
    "url": "https://mehfilnights.org"
  },
  "offers": {
    "@type": "Offer",
    "url": "/* ticket URL */",
    "price": "25",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
```

This is required by PRD §4. It powers Google Events carousels and rich snippets in search.

---

## 5. Section Rhythm — Full Page Scrolls

### /events list page

| Section | Background | Approx. height | Weight |
|---|---|---|---|
| Hero band | Deep Olive | 44vh (~380px desktop) | 30% |
| Upcoming events list | Ivory | varies (6 events ≈ 800px) | 60% |
| Past events archive | Deep Olive | ~720px | 30% |

Two Deep Olive moments (hero, past archive), middle on Ivory. No Saffron on this page — intentional. Turmeric in hero eyebrow/link + every event card's "Get Tickets" button.

### /events/[slug] detail page

| Section | Background | Approx. height | Weight |
|---|---|---|---|
| Detail Hero | Deep Olive (+ photo) | 72vh (~650px desktop) | 30% |
| Description | Ivory | ~440px | 60% |
| Artists | Warm White | ~320px (v1 simplified) | 60% |
| Venue | Ivory | ~380px | 60% |
| [past only] What happened | Sand | ~340px | 60% |
| Related events | Ivory | ~520px | 60% |

One Deep Olive moment (hero). No Saffron. Turmeric on Get Tickets button (or Teal on See Photos for past).

---

## 6. Component Inventory (for Rishi)

**New components for /events list:**
- `<EventsHero />` — /events list only
- `<UpcomingEventsList />` — wraps events, handles empty state
- `<EmptyState variant="no-upcoming-events" />` — reusable
- `<PastEventsArchive />` — /events list only
- `<PastEventCard />` — new compact variant (distinct from `<EventCard />`)

**New components for /events/[slug]:**
- `<EventDetailHero />` — detail only
- `<EventDescription />` — renders Sanity Portable Text
- `<EventArtists />` — v1 simplified (artist names only); v2 expanded
- `<ArtistCard />` — v2 component; designed for when artist schema lands
- `<EventVenue />` — detail only
- `<PastEventReflection />` — detail only, past-event conditional
- `<RelatedEvents />` — detail only, uses existing `<EventCard />`

**Reused:**
- `<EventCard />` from `src/components/home/UpcomingEvents.tsx` — extract to `src/components/EventCard.tsx` as shared; add optional `variant="on-light" | "on-dark"` prop for border-color tweak
- `<Section />`, `<Container />`, `<Button />`, `<Header />`, `<Footer />`, `<TrustBlock />` (on the detail page footer area if founder wants it — optional)

**Refactor note for Rishi:** The existing `UpcomingEvents.tsx` component hardcodes a local `<article>` in the map. Extract that `<article>` into a standalone `<EventCard />` component so both `/` and `/events` can reuse it without duplicating markup.

---

## 7. Breakpoints Summary

- **Mobile:** <768px — single column everywhere. Hero 280–360px. Event cards full-width. Past-event archive 1-col below 480px, 2-col 480–768px. Artists stacked.
- **Tablet:** 768–1024px — Upcoming events 2-col grid. Past events 3-col. Artists 2-col. Detail hero: single column with image on top.
- **Desktop:** >1024px — Upcoming events 3-col, Past events 4-col, Artists 2-col, Detail hero 2-col (text left, image right).
- Content max-width: list page 1100px; detail page 900px (venue, artists) / 780px (description) / 1100px (related).

---

## 8. Accessibility Summary

- One H1 per page (list: hero band; detail: event title in hero).
- H2 for each section: Upcoming Events (hidden on list), Past Events, Description (no heading — flows), Artists, Venue, What Happened (if past), Related Events.
- H3 for artist names, event card titles, past-event cards.
- All `<time>` elements use real `datetime` attributes.
- All outbound ticket links: `target="_blank" rel="noopener noreferrer"` + visually-hidden "(opens in new tab)" span.
- Address uses `<address>` element on detail pages.
- Image alt text required in Sanity (per PRD §10) — no image renders without real alt.
- Empty state is navigable by keyboard — all links and the Subscribe button focus-reachable in DOM order.
- Prefers-reduced-motion: disable card hover lifts.

---

## 9. Placeholder TODOs (for founder + PM + Rishi)

- **Event data (upcoming + past)** — founder + Sanity editor to populate 3+ upcoming events, 6+ past events before launch.
- **Per-event hero images** — founder to provide at least one image per event. If none: the Deep-Olive + Turmeric-glyph placeholder is the fallback.
- **Past event metrics** — per event: audience count, artists paid, ticket price. Hardcode in Sanity Event doc for v1; add as structured fields in v2.
- **Past event quotes** — founder to provide 1 attendee or artist quote per past event where available. Acceptable to ship past events without quotes (grant-evidence still works from metrics alone).
- **Accessibility meta per event** — founder/editor marks: floor seating, BYOB, step-free entry, parking notes per event. 4 short strings.
- **Venue descriptions** — editor writes 2–3 sentences per venue. Can be hardcoded per-venue in a Sanity Venue type (or stored as rich text on the Event for v1).

---

## 10. What I'd Push Back On

1. **The 12-event past-archive cap.** I set it because v1 has no pagination. If the archive ends up at 30+ events at launch, we should actually render all of them — they're the strongest grant-evidence surface on the site. Revisit the cap once we know the true past-event count; if it's >20, render all on a single scroll (accept the longer page) rather than shipping pagination prematurely.

2. **Simplified artist block in v1.** The PRD defers an Artist content type to v2, which means /events/[slug] ships with a lightweight "list of names" artist section. That's the right call for shipping speed, but we should plan to upgrade it within 60 days of launch — artist profiles are the single biggest "where is the content" gap for a music nonprofit. Specifically: a proper Artist schema unlocks a future /artists directory (deferred per PRD, but worth accelerating).

3. **Past event photos and gallery.** "See Photos" links to a placeholder. For past events that DID have photos shared on Instagram, we should link directly to an Instagram highlight URL — not a placeholder anchor. Saves building gallery infrastructure in v1, uses real content that exists, and signals social-media activity to grant reviewers. Founder: please share Instagram highlight URLs for past events.

4. **Embedded Google Map removed for v1.** I'm honoring PRD §5. But I'd like to flag: for community members on mobile, a 1-tap map is a real convenience. When we revisit v2 map decisions, the compromise is an embedded OpenStreetMap (no Google cookies, no third-party tracking) rather than Google Maps embed. Not a v1 issue.

5. **No Upcoming Events sort filter.** PRD §5 defers filters. For v1 with ≤6 events, that's correct. If upcoming events ever exceed ~12, a simple "Past · Upcoming" toggle becomes worth the UX cost. Revisit post-launch.
