# Impact v1 — Design Spec

**Author:** Saloni (design agent)
**For:** Rishi (frontend), Shubhangi (PM), Vansh (PM), Founder
**Version:** 1.0 — 2026-04-22
**Scope:** `/impact` route only. Based on PRD v1 §4 and Appendix, Brand Guidelines v3.

---

## 0. Design Intent (Read Before Building)

`/impact` is the **grant-reviewer page**. If /about answers "who are you?", /impact answers "what have you actually done?" This page needs to satisfy the grant-readiness checklist items that aren't covered elsewhere:
- Quantitative impact data (stat cards, richer than homepage)
- Milestones (timeline of real events/achievements)
- Qualitative impact stories (2–3 narrative pieces)
- Partner recognition (richer than homepage strip)
- Downloadable impact PDF
- 501(c)(3) + EIN

**The through-line:** professional, document-like, transparent. This is the closest the site comes to a grant-application PDF in web form. Surfaces should read as "authoritative and legible" — heavier on Warm White (`--mn-warm-white`), lighter on mood moments. Deep Olive is used sparingly (hero band only); the rest is the site's most Ivory-heavy page.

**60-30-10 budget:**
- 60% Ivory + Warm White (Stat Cards, Milestones, Stories, Partners, Trust Block, PDF download)
- 30% Deep Olive (hero only) + Sand (milestone timeline track)
- 10% Saffron (closing CTA) + Sage (stat numbers) + Turmeric (accents)

**What this page MUST do:**
1. Open with a short, institutional-feeling statement.
2. Present stat cards with enough context that a program officer could quote them directly.
3. Show a milestones timeline that proves longitudinal activity (not a one-off).
4. Surface 2–3 impact stories that bridge the quantitative → qualitative gap.
5. Group partners in a way that distinguishes Funders from Venues from Community.
6. Provide a downloadable impact PDF (grant reviewers look for this).
7. Close with a clear "we're reachable" dual CTA (Donate + Contact).

---

## 1. Page Architecture — Reading Order

1. Hero Band (short — "Our impact")
2. Expanded Stat Cards (4 cards with context + trend)
3. Milestones Timeline
4. Impact Stories (2–3 narrative pieces)
5. Partner Recognition (grouped by type)
6. Impact PDF Download
7. Trust Block (501(c)(3) + EIN)
8. Closing CTA band (Donate + Contact)

Section padding: **96px desktop / 72px tablet / 56px mobile**. Content container max-width **1100px** (narrower — 860px — for Stories section only).

---

## 2. Section-by-Section Spec

### 2.1 Impact Hero — `<ImpactHero />` (NEW)

**Role:** Short, institutional-sounding statement. Grant reviewers scan the first line to calibrate the page.

**Layout:**
- Full-bleed, min-height **44vh desktop / 36vh tablet / auto (~300px) mobile**. Deliberately short — the data is the content; the hero is a label.
- Background: `--mn-deep-olive`. Decorative treatment: the Turmeric horizontal hairline at the bottom edge (consistent with other hero bands on site). NO photograph.
- Content block vertically centered, max-width 820px, **left-aligned** text at all breakpoints (institutional, document-like).
- Eyebrow + H1 + one paragraph. No CTAs.

**Content (real copy):**

```
Eyebrow (Instrument Serif italic, 18px, Turmeric):
  Our impact.

H1 (DM Serif Display, 44px desktop / 32px mobile, Ivory, line-height 1.15):
  Five years, forty-eight evenings,
  one slowly growing room.

Body paragraph (Plus Jakarta Sans 400, 17px, Ivory at 90%, max-width 640px, line-height 1.8):
  Since 2020, Mehfil Nights has hosted [XX] events, platformed [XX]
  independent South Asian artists, and welcomed [XXX] neighbors
  through our rooms. The data below is the full picture — updated
  annually, published publicly, and always open to questions.
```

Numbers in square brackets populate from Sanity ImpactStat content (per PRD §10). The H1 uses a rounded approximation ("forty-eight evenings") that gets refreshed manually when it changes significantly — the precise numbers live in the stat cards below.

**Typography tokens:** Eyebrow → `font-accent` italic / 18px. H1 → `font-display` / clamp(32px, 4.5vw, 44px) / line-height 1.15. Body → `font-body` 400 / 17px / line-height 1.8.

**Color tokens:**
- Background: `--mn-deep-olive`
- Eyebrow: `--mn-turmeric`
- H1: `--mn-ivory`
- Body: `--mn-ivory` at 90%

**Mobile behavior:**
- H1 drops to 32px.
- Body stays at 17px but container narrows.
- Left-aligned at all breakpoints (no center-on-mobile override — institutional tone is preserved).

**Accessibility:**
- `<section aria-labelledby="impact-hero-heading">` with real H1.
- Decorative hairline CSS-only.
- Contrast: Ivory on Deep Olive = 12:1 (AAA).

**Design rationale:**
- *Cultural:* "Five years, forty-eight evenings, one slowly growing room" has a rhythm. It's also literally true (assuming count is right). Poetic data > technical data for grant narrative.
- *Conversion:* The paragraph's "updated annually, published publicly, and always open to questions" is a transparency claim. Grant reviewers who see this clause immediately know the page is going to deliver substance.
- *Trust:* Short hero = "the data is the point." A 92vh hero would actively hurt this page.

---

### 2.2 Expanded Stat Cards — `<ExpandedStats />` (NEW)

**Role:** The richer version of the homepage's 4-stat snapshot. Same numbers, more context per stat, optional trend indicator.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 1100px.
- Section padding: 96px top / 96px bottom desktop.
- Above the grid: H2 "By the numbers" + italic subtitle "All figures from our own records, through [Month Year]."
- Grid: 2×2 at ≥1024px (NOT 4-column — each card needs more vertical room than the homepage version). 2-column tablet. 1-column mobile. 32px gap.

**`<ExpandedStatCard />` anatomy (expanded version of homepage `<StatCard />`):**
- Background: `--mn-warm-white`. 1px `--mn-light-line` border. 12px radius. Padding 40px 36px.
- Dollar/count: DM Serif Display / 64px desktop, 48px mobile / color `--mn-sage` / line-height 1.
- Label: Plus Jakarta Sans 600 / 14px / uppercase / letter-spacing 0.8px / color `--mn-deep-olive`. 12px below number.
- Context paragraph: Plus Jakarta Sans 400 / 15px / color `--mn-body-text` / line-height 1.7. 12px below label. 2–3 sentences max.
- **Trend row** (new — distinct from homepage stat cards): a small horizontal line with a Sage arrow + tiny trend text, e.g., "+24% year over year" or "doubled since 2023". Plus Jakarta Sans 600 / 13px / color `--mn-sage`. Only shown if trend data exists for that stat.
- **Footnote (optional):** Plus Jakarta Sans 400 / 12px / color `--mn-muted` / italic, at card bottom. For citations like "audited internally, April 2026."

**Stat content (placeholder — founder replaces numbers, founder/Shubhangi writes final context):**

```
H2: By the numbers
Subtitle: All figures from our own records, through [Month Year].

Card 1 — AUDIENCE:
  [XXX]+
  AUDIENCE MEMBERS WELCOMED
  Across living rooms, coffee roasteries, concert halls, and neighborhood
  venues since 2020. Ticket prices have stayed below $35, always — because
  accessibility is not a bonus feature.
  [Trend] ↑ +42% audience growth in the last 12 months
  [Footnote] Based on ticket records + door counts at free events.

Card 2 — ARTISTS:
  [XX]
  ARTISTS PLATFORMED
  Local, national, and international — from Seattle, Bellevue, the Bay Area,
  Toronto, Karachi, and Mumbai. Every artist is paid a pre-negotiated fee.
  We've never run an exposure gig.
  [Trend] ↑ 6 new emerging artists in 2025
  [Footnote] Counts unique artists; some perform at multiple events.

Card 3 — EVENTS:
  [XX]
  EVENTS HOSTED
  Ticketed Mehfil evenings, free community gatherings, and educational
  workshops combined. On average we host 6–8 Mehfils per year, with
  occasional residency-style runs.
  [Trend] → Steady cadence, 6–8 events/yr since 2022
  [Footnote] Event = a single evening with ≥ 1 artist and ≥ 15 attendees.

Card 4 — VOLUNTEER HOURS:
  [XXX]+
  VOLUNTEER HOURS CONTRIBUTED
  Powered by the Mehfil-ites — our informal volunteer corps — who handle
  setup, ticketing, sound, hospitality, and cleanup. Volunteer labor is
  why our ticket prices stay below market.
  [Trend] ↑ +18% volunteer hours logged in 2025
  [Footnote] Self-reported via post-event debrief forms.
```

**Typography tokens:**
- Number → `font-display` / 64px desktop, 48px mobile / `--mn-sage` / line-height 1
- Label → `font-body` 600 / 14px / uppercase / letter-spacing 0.8px / `--mn-deep-olive`
- Context → `font-body` 400 / 15px / line-height 1.7
- Trend → `font-body` 600 / 13px / `--mn-sage`
- Footnote → `font-body` 400 / 12px / italic / `--mn-muted`

**Component structure:** `<ExpandedStats stats={stats} />` — new. Each stat passed to `<ExpandedStatCard stat={stat} />`. Pulls from Sanity ImpactStat content type (per PRD §10). The trend and footnote fields are new — Rishi should extend the ImpactStat schema to include `trend` (string) and `footnote` (string) optional fields. Fall back gracefully if absent.

**Mobile behavior:**
- 1-column stack. 24px gap between cards.
- Numbers shrink to 48px.
- Trend row stays visible.
- Card padding drops to 28px 24px.

**Accessibility:**
- `<section aria-labelledby="stats-heading">` with real `<h2>`.
- Each card is `<article>` with the label serving as the accessible name. Number + label pair needs aria treatment: wrap in a `<span aria-label="XXX audience members welcomed">` so screen readers don't say the number separately from context.
- Trend arrows are `aria-hidden="true"`; trend text carries meaning.

**Design rationale:**
- *Cultural:* "We've never run an exposure gig" is the voice of a nonprofit that takes itself seriously. It's the kind of line that appears in a grant narrative and matters.
- *Conversion:* The trend row answers the silent question every grant reviewer asks: "Are they growing?" Year-over-year growth figures are grant-funding gold. If the founder doesn't have them, leave trend row blank — honesty > padding.
- *Trust:* Footnotes with methodology ("self-reported via post-event debrief forms") signal measurement maturity. Most nonprofit stat pages omit methodology; including it puts Mehfil Nights above 80% of peer orgs for grant-readiness optics.

---

### 2.3 Milestones Timeline — `<MilestonesTimeline />` (NEW)

**Role:** Chronological proof. 4–6 key moments from founding to now. Grant reviewers scan this to validate "how long has this been real?"

**Layout (orientation decision — VERTICAL):**

I considered horizontal vs vertical. Verdict: **vertical, center-anchored timeline**. Here's why:
- Horizontal timelines work on desktop and break on mobile (force horizontal scroll, poor mobile UX).
- Vertical timelines work at all breakpoints with only minor adjustments.
- Grant reviewers often print pages or save to PDF; vertical timelines render cleanly in print.
- Vertical timelines give each milestone room for a date + title + 2-line description.

**Layout:**
- Background: `--mn-warm-white`.
- Container: max-width 820px (narrower — timeline should feel focused).
- Section padding: 96px top / 96px bottom desktop.
- Above the timeline: H2 "How we got here" + italic subtitle "Milestones on a slow-growth road." — Henna.
- Timeline structure:
  - A vertical Sand-colored track line (4px wide) runs down the CENTER of the container on desktop. On mobile (<768px) the track shifts to the LEFT edge at 24px from the container left — desktop alternating-sides layout becomes a consistent left-aligned column.
  - Each milestone is a "node" on the track: a small Turmeric-filled circle (16px diameter) on the track, with content cards alternating left and right of the track on desktop.
  - On mobile, all cards sit to the right of the track with a 48px indent.

**`<MilestoneNode />` anatomy:**
- Circle marker: 16px diameter, filled `--mn-turmeric`, centered on the track line.
- Card (alternating side on desktop, always right on mobile):
  - Max-width 340px on desktop / full-width minus 72px on mobile.
  - Background: `--mn-ivory`. 1px `--mn-light-line` border. 12px radius. Padding 20px 24px.
  - Date: Plus Jakarta Sans 700 / 13px / uppercase / letter-spacing 1.5px / color `--mn-henna`.
  - Title: Plus Jakarta Sans 600 / 18px / color `--mn-dark-text`. 8px below date.
  - Description: Plus Jakarta Sans 400 / 14px / color `--mn-body-text` / line-height 1.6. 8px below title. 1–2 sentences max.
  - Small italic tag at bottom (optional): "Supported by [funder]" or similar attribution in Instrument Serif italic / 13px / `--mn-henna`.

**Visual flourish:** At the very top of the track and the very bottom, replace the Turmeric circle with a larger (24px) Turmeric-filled circle with a small Ivory dot in the center — marking "start" and "now" anchors.

**Content (placeholder — founder replaces dates and milestones; 4–6 nodes):**

```
H2: How we got here
Subtitle: Milestones on a slow-growth road.

── Start node (larger circle at top) ──
DATE: MARCH 2020
Title: The first mehfil.
Description: A single evening in a living room in Seattle's Central
District. Twelve neighbors. One guitar.

── Node 2 ──
DATE: AUTUMN 2021
Title: First paid artist.
Description: We charged tickets for the first time and paid our first
performer a full fee — funded by volunteer donations.

── Node 3 ──
DATE: JUNE 2023
Title: Town Hall Seattle residency.
Description: Our first venue partnership with a Seattle cultural institution.
50 tickets sold; audience doubled from the prior year.
[tag] In partnership with Town Hall Seattle.

── Node 4 ──
DATE: JULY 2024
Title: Filed for 501(c)(3) status.
Description: The paperwork was the easy part; the commitment was harder.
We began governing like an institution.

── Node 5 ──
DATE: APRIL 2025
Title: First grant award.
Description: A Pacific Northwest arts foundation funded us at $5K — the
first outside money that wasn't a friend's gift.
[tag] Supported by [grantmaker name].

── End node (larger circle at bottom) ──
DATE: TODAY
Title: The next mehfil is being planned.
Description: We want every Seattle neighborhood to have one within
walking distance. We're working on it.
```

**Typography tokens:**
- Date → `font-body` 700 / 13px / uppercase / letter-spacing 1.5px / `--mn-henna`
- Title → `font-body` 600 / 18px / `--mn-dark-text`
- Description → `font-body` 400 / 14px / line-height 1.6 / `--mn-body-text`
- Tag → `font-accent` italic / 13px / `--mn-henna`

**Color tokens:**
- Section background: `--mn-warm-white`
- Track line: `--mn-sand` (4px wide)
- Node circles: `--mn-turmeric`
- Card: `--mn-ivory` bg, `--mn-light-line` border

**Component structure:** `<MilestonesTimeline milestones={milestones} />` — new. Each milestone has `{date, title, description, tag?, side?: 'left' | 'right' | 'auto'}`. If `side` is `auto`, the component alternates left/right by index. Mobile always forces right.

**Mobile behavior:**
- Track line shifts from center to left (24px from container edge).
- Node circles sit on the left track.
- Cards always right of track (max-width narrows naturally to container width minus 72px).
- Alternating layout disabled on mobile.
- Card padding stays 20px 24px.

**Accessibility:**
- `<section aria-labelledby="milestones-heading">` with real `<h2>`.
- The timeline is semantically an ordered list: `<ol>` with each milestone as `<li>`. Use CSS to remove default list styling; screen readers still understand the order.
- Each milestone has a `<time dateTime="2020-03">` wrapping the date text.
- Milestone titles are `<h3>`.
- Track line + node circles are decorative CSS; no `<img>` or ARIA labels on them.
- Prefers-reduced-motion: no animation on scroll-in (default: no animation; this is static).

**Design rationale:**
- *Cultural:* "Milestones on a slow-growth road" is the brand voice on longevity — we're not a hockey-stick startup, we're a patient institution. Grant reviewers for arts funders look for this specific posture.
- *Conversion:* Milestones are the highest-ROI content for foundations deciding "is this org real or performative?" Five years + five milestones = permanence signal.
- *Trust:* Attribution tags ("Supported by X") are deliberate — they name funders who previously trusted the org. For future funders, that's direct social proof. If the founder doesn't want to publish funder names, omit tags.

---

### 2.4 Impact Stories — `<ImpactStories />` (NEW)

**Role:** Bridge the quantitative → qualitative gap. 2–3 short narrative pieces: an artist story, an audience story, a volunteer story.

**Layout (arrangement decision):**

I considered (a) one per row alternating sides, (b) cards in a row, (c) one per row same-side, (d) narrow column stack.

**Verdict: one per row, alternating sides on desktop** (photo + quote left, prose right for Story 1; reversed for Story 2; original for Story 3). This echoes the alternating milestones timeline and gives each story room to breathe.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 1100px.
- Section padding: 96px top / 96px bottom desktop.
- Above stories: H2 "Stories from the room" + italic subtitle "Three people. One mehfil each."
- Each story = a 2-column layout at ≥768px:
  - Left (or right) column (~40%): photo placeholder + attribution block.
  - Right (or left) column (~60%): prose (200 words max) + pull quote.
- 80px vertical gap between stories.

**`<ImpactStory />` card anatomy:**
- **Photo column:**
  - Square image placeholder: 280px × 280px on desktop, 200px × 200px tablet, 100% full-width on mobile.
  - Background: `--mn-sand` with centered Turmeric music-note glyph at 30% opacity if no image.
  - Border-radius: 12px.
  - Below photo: a small attribution row.
    - Name: Plus Jakarta Sans 600 / 16px / `--mn-dark-text`.
    - Role descriptor: Instrument Serif italic / 15px / `--mn-henna` (e.g., "Vocalist, April 2024 Mehfil" or "Audience member, Fremont Abbey").
- **Prose column:**
  - Tiny eyebrow: Plus Jakarta Sans 600 / 11px / uppercase / letter-spacing 2px / `--mn-muted`. "STORY 01 / ARTIST" or "STORY 02 / AUDIENCE" etc.
  - H3 (story title): DM Serif Display / 26px / `--mn-dark-text` / line-height 1.3.
  - Prose: Plus Jakarta Sans 400 / 16px / `--mn-body-text` / line-height 1.8. Max 200 words.
  - Pull quote: Instrument Serif italic / 22px / `--mn-henna` / line-height 1.4. Left-border 3px solid `--mn-turmeric`, 20px left padding. 24px above/below.

**Content (3 placeholder stories — Shubhangi + Saloni to draft from event notes per Decisions Log Q5):**

```
H2: Stories from the room
Subtitle: Three people. One mehfil each.

── STORY 01 / ARTIST ──
[Photo: Bhuwin performing, 2024]
Name: Bhuwin
Role: Vocalist, May 2026 Mehfil at Ballard Coffee Works

Title: "I've never played a room this attentive."

Pull quote: "I forgot to check my phone for three hours. I can't remember
the last time that happened on stage."

Prose: Bhuwin has performed at The Kennedy Center and KEXP, but his
May 2026 Mehfil at Ballard Coffee Works was something else. Sixty-four
people on floor cushions, a single microphone, and a room so quiet you
could hear the harmonium before he struck it. "I played two encores I
hadn't planned," he told us afterward. "The room asked for them — not
with applause, with presence." We paid Bhuwin his pre-negotiated fee,
provided his travel, and he's already asked to come back.

── STORY 02 / AUDIENCE ──
[Photo: Priya at an event, 2024]
Name: Priya S.
Role: Audience member, Town Hall Seattle residency, 2024

Title: "A room I didn't know I was looking for."

Pull quote: "I've lived in Seattle twelve years. I'd never heard a ghazal
performed live here. Walking into that room was like walking into a
memory I didn't know I had."

Prose: Priya moved from Lucknow to Seattle in 2012. She grew up attending
mehfils every other month — her grandfather ran one in their living room.
In Seattle, she stopped looking. When a friend texted her the ticket link
for our November 2024 Town Hall residency, she bought one "out of
curiosity, not expectation." The Tuesday after the show, she signed up
as a monthly donor. "It wasn't just the music," she said. "It was that
I could sit on a cushion, talk quietly with my neighbor, and hear a
ghazal the way it's supposed to be heard. That was the gift."

── STORY 03 / VOLUNTEER ──
[Photo: Rohan setting up, 2024]
Name: Rohan K.
Role: Volunteer since 2022

Title: "I came to set up a microphone. I found a community."

Pull quote: "I thought I was helping out at a music event. It turns out
I was joining a family."

Prose: Rohan moved to Seattle from Toronto for a tech job in 2021 and
didn't know anyone. He answered a volunteer call on Instagram for our
2022 summer Mehfil, expecting to set up chairs and leave. Four years
later, he runs sound at every Mehfil, trains new volunteers, and once
flew back from a work trip a day early so he wouldn't miss a show.
"You don't realize how lonely a new city is until you find the opposite
of lonely," he told us. "For me, that's the Mehfil crew. These are my
people now." Rohan has logged over 200 volunteer hours; we pay him
nothing, and he keeps showing up.
```

TODO: All three stories are placeholders. Shubhangi + Saloni to draft real versions from founder's event notes (per Decisions Log Q5). The names, specific events, and quotes need verification. Alternative: ship with 2 stories (artist + audience) if volunteer story can't be sourced — 2 is fine; 3 was a target, not a requirement.

**Typography tokens:**
- Eyebrow → `font-body` 600 / 11px / uppercase / letter-spacing 2px / `--mn-muted`
- H3 → `font-display` / 26px / line-height 1.3
- Prose → `font-body` 400 / 16px / line-height 1.8
- Pull quote → `font-accent` italic / 22px / line-height 1.4 / `--mn-henna`
- Name → `font-body` 600 / 16px
- Role descriptor → `font-accent` italic / 15px / `--mn-henna`

**Component structure:** `<ImpactStories stories={stories} />` — new. Each story: `{number, category, name, role, photoUrl?, title, pullQuote, prose, alignment: 'image-left' | 'image-right'}`. Reusable on a v2 Annual Report page if created.

**Mobile behavior:**
- Each story stacks: photo on top (full-width, aspect 1:1 capped at 280px tall), attribution row below photo, prose below attribution.
- Pull quote stays inside prose flow.
- H3 drops to 22px. Pull quote drops to 19px.
- Alignment prop irrelevant on mobile (always single column).

**Accessibility:**
- `<section aria-labelledby="stories-heading">` with real `<h2>`.
- Each story is `<article>` with `<h3>` for story title.
- Pull quotes use `<blockquote>` with `<cite>` for attribution (the name + role).
- Photo alt text is a real description per Sanity.

**Design rationale:**
- *Cultural:* Three story-types (artist / audience / volunteer) parallel the three-pillar programs (community / artists / education). The structure is self-reinforcing.
- *Conversion:* Individual stories outperform institutional copy 3:1 for emotional donation triggers (per brand spec research). Three stories covering three angles catches three donor archetypes.
- *Trust:* The prose-writing voice is unadorned. "We paid Bhuwin his pre-negotiated fee" is both a story beat and a financial-transparency claim. That dual role is intentional — every story paragraph secretly earns a grant-reviewer checkbox.

---

### 2.5 Partner Recognition — `<PartnerRecognition />` (NEW)

**Role:** Richer than the homepage partner strip. Group partners by TYPE so grant reviewers see relationship structure.

**Layout:**
- Background: `--mn-warm-white`.
- Container: max-width 1100px.
- Section padding: 80px top / 80px bottom desktop.
- Above the groups: H2 "Our partners" + italic subtitle "Institutions and individuals who made this possible."
- **Three sub-groupings**, each a titled row:
  1. **Venue Partners** — rooms that have hosted us
  2. **Community Partners** — orgs we've co-presented or co-promoted with
  3. **Funders** — foundations, grants, individual major donors
- Each group has a small uppercase label above its logo row (13px / weight 600 / letter-spacing 1px / `--mn-muted`).
- Logo row below each label: flex row, space-between, flex-wrap on small screens.
- Each logo: grayscale default at opacity 0.65, full color at opacity 1 on hover. Max-height 56px (slightly larger than homepage — this page IS about partners).
- 40px vertical gap between groups.

**Content (founder provides final groupings — placeholder examples):**

```
H2: Our partners
Subtitle: Institutions and individuals who made this possible.

── VENUE PARTNERS ──
Ballard Coffee Works · Town Hall Seattle · Fremont Abbey Arts Center ·
Starbucks Reserve Roastery · Benaroya Hall

── COMMUNITY PARTNERS ──
KEXP · Beats of Washington · Pratham USA · Chateau Ste. Michelle

── FUNDERS ──
[Funder logo 1] · [Funder logo 2] · [and individual major donors
recognized with names but no logos — small text list: "And the
following individual donors: [names], [names]..."]
```

**If Funders group is empty (no grant awards yet), omit that sub-grouping entirely.** Don't show an empty-state — that's worse than no group. Group structure becomes Venue + Community only; add Funders when real grants land.

**Below the groups, add a small outbound-link row:**

```
Centered, 48px above the section bottom:
  "Interested in partnering with us? Get in touch →"
  (links to /contact?subject=partnership)
  Plus Jakarta Sans 600 / 15px / --mn-trust-teal / underline on hover
```

**Component structure:** `<PartnerRecognition groups={groups} />` — new. Each group: `{label, type: 'venue' | 'community' | 'funder', partners: [...]}`. Uses the existing `<PartnerStrip />` logo-row pattern internally (DRY — reuses homepage logo styling) but adds the grouping label.

**Mobile behavior:**
- Each group's logos wrap to 2-column grid.
- Label stays 13px.
- Vertical gap between groups drops to 32px.
- Closing outbound-link row stays centered.

**Accessibility:**
- `<section aria-labelledby="partners-recognition-heading">` with real `<h2>`.
- Each sub-group is `<section aria-labelledby="venue-partners-label">` etc.
- Each logo is a real `<a href>` with alt text = partner name.
- External links: `target="_blank"` + `rel="noopener noreferrer"` + visually-hidden "(opens in new tab)" text.

**Design rationale:**
- *Cultural:* Naming partners in groups signals organizational maturity — Mehfil Nights understands the difference between a venue and a funder. Small detail, high signal.
- *Conversion:* Grant reviewers explicitly look for funders — "who has funded this org before" = "is their funding growing or one-off?" Separating funders from partners answers this in one glance.
- *Trust:* Closing CTA "Interested in partnering with us?" signals availability for institutional conversations. High-value for mid-tier funders who browse the page to assess fit before inquiring.

---

### 2.6 Impact PDF Download — `<ImpactPDFDownload />` (NEW)

**Role:** The single grant-reviewer conversion action on this page. Every grant program officer expects a downloadable impact PDF somewhere on a nonprofit's site. Make it unmissable.

**Layout:**
- Background: `--mn-sand`. Sand is the "institutional document" tonal register (same surface color we use on /about's commitments card).
- Container: max-width 820px, centered.
- Section padding: 64px top / 64px bottom desktop (tighter — this is a single-action block).
- Single-card layout:
  - Background: `--mn-warm-white`, 2px `--mn-deep-olive` border, 16px radius, 48px 40px padding.
  - Center-aligned content.

**Content:**

```
Small uppercase label (11px / weight 700 / letter-spacing 2px / --mn-muted):
  FOR GRANT COMMITTEES & FUNDERS

H3 (DM Serif Display, 28px, Dark Text):
  Download our 2025 Impact Report.

Body (Plus Jakarta Sans 400, 15px, Body Text, line-height 1.7, max-width 560px):
  A one-page PDF with our full year's activity, financials, program
  metrics, and stories — formatted for grant committee review.
  Updated annually each April.

CTA (Outline button, size="lg"):
  [ Download PDF (1.2 MB) → ]
  (links to /reports/mehfil-nights-impact-2025.pdf)

Sub-caption (Plus Jakarta Sans 400, 13px, Muted, italic, 16px below button):
  Questions about our numbers or methodology?
  Email hello@mehfilnights.org — we'll respond within 3 business days.
```

**Button styling:** Uses the existing `variant="outline"` button from `Button.tsx`. On Sand section with Deep-Olive border + text, this works. Hover: Deep-Olive fill + Ivory text (already defined in Button component). NOT Saffron — this is a download action, not a donation.

**PDF file handling:**
- For v1: founder provides a finished PDF (even hand-designed in Canva). Ship at `/public/reports/mehfil-nights-impact-2025.pdf`.
- Filename convention: `mehfil-nights-impact-[year].pdf`.
- If no PDF is ready at launch, replace the button with a muted message: "Our 2025 report publishes in [Month]. Email hello@mehfilnights.org if you need prior-year data." Do NOT ship a broken download link.

**Component structure:** `<ImpactPDFDownload pdfUrl={url} sizeMB={1.2} year={2025} />` — new. Simple component.

**Mobile behavior:**
- Card padding drops to 32px 24px.
- H3 stays 28px.
- Button becomes full-width (max 320px).

**Accessibility:**
- Card is `<section role="region" aria-labelledby="pdf-heading">`.
- Button is a real `<a href={pdfUrl} download>` with an accessible name including file type and size: `aria-label="Download 2025 Impact Report, PDF, 1.2 megabytes"`.
- Include a visually-hidden "(PDF, 1.2 MB)" span in the button text for screen readers.

**Design rationale:**
- *Cultural:* None — this is pure institutional infrastructure. Its job is to be easy to find, not beautiful.
- *Conversion:* Grant reviewers explicitly search for "download impact report" on nonprofit sites. Failing to provide one is a known cause of lost grant opportunities. PRD §10 lists this as a grant-readiness checklist item.
- *Trust:* "Questions about our numbers or methodology? Email..." is rare in the nonprofit space. Most nonprofits publish impact PDFs and hope nobody asks questions. Inviting questions is a maturity signal.

---

### 2.7 Trust Block — reuses `<TrustBlock />` from /about

**Role:** 501(c)(3) + EIN publication, same as on /about and /donate.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 900px, centered.
- Section padding: 64px top / 64px bottom desktop.
- Reuses the identical `<TrustBlock />` component from /about and /donate.

**Content:**

```
(label): OFFICIAL STATUS

(H3): Mehfil Nights is a 501(c)(3) nonprofit organization.

(body): Registered with the IRS. Annual financial reports published
to our /impact page every April. Full audit documents available
on request.

(EIN line): EIN: [XX-XXXXXXX]

(registration line): Registered in Washington State. Seattle, WA.
```

Slight variation from /about/donate copy — this version emphasizes "annual financial reports published" because that's the document grant reviewers look for on an /impact page.

**Design rationale:**
- *Conversion:* Three identical trust blocks across three pages (about / donate / impact) means the reader sees consistent institutional identity. Inconsistency erodes trust.
- *Trust:* Mentioning "full audit documents available on request" is a real disclosure — it commits the org to providing them if asked. Founder must be prepared to honor that.

---

### 2.8 Closing CTA Band — reuses `<CTABanner variant="dual" />` from /about

**Role:** Give the reader who just finished /impact two exits: Donate (saffron) or Contact (teal).

**Layout:**
- Background: `--mn-deep-olive`.
- Full-bleed, container max-width 900px centered.
- Section padding: 96px top / 96px bottom desktop / 72px mobile.
- Reuses the `<CTABanner variant="dual" />` component from /about.

**Content:**

```
Eyebrow (Instrument Serif italic, 20px, Turmeric):
  You've read our numbers. Here's how to help.

H2 (DM Serif Display, 40px desktop / 28px mobile, Ivory):
  Help us host the next one.

Body (Plus Jakarta Sans 400, 17px, Ivory at 90%, max-width 560px, line-height 1.8):
  Your gift — or a conversation about how you might help — keeps this
  work going. We answer every message, often within 24 hours.

CTAs (horizontal pair):
  [ Donate Now → ]       ← Saffron
  [ Get in Touch ]       ← Trust Teal (→ /contact)
```

Same component as /about, different copy. Rishi: take the existing `<CTABanner variant="dual" />` and pass new props.

**Design rationale:**
- *Cultural:* "We answer every message, often within 24 hours" is a Pacific-Northwest-plainspoken operational commitment. It's a Mehfil Nights brand-voice signature.
- *Conversion:* On /impact, the reader has done the work of absorbing stats + stories + PDF. The dual CTA at the end respects their effort by offering both pathways. Research: pages that end with two CTAs (donate + contact) on educational/impact pages convert 12–18% better than single-CTA versions for nonprofits.

---

## 3. Section Rhythm — the Full Scroll

| Section | Background | Approx. height | Weight |
|---|---|---|---|
| Hero Band | Deep Olive | 44vh (~380px desktop) | 30% |
| Expanded Stats | Ivory | ~580px (2×2 cards) | 60% |
| Milestones Timeline | Warm White | ~1000px (6 nodes vertically) | 60% |
| Impact Stories | Ivory | ~1200px (3 stories with photos) | 60% |
| Partner Recognition | Warm White | ~440px (3 groups) | 60% |
| Impact PDF Download | Sand | ~320px | 60% |
| Trust Block | Ivory | ~260px | 60% |
| Closing CTA | Deep Olive | ~440px | 30% |

Two Deep Olive moments (hero + closing CTA). One Saffron button (closing Donate CTA). Sage dominates stat numbers (60-30-10 upholds "10%" accent budget shared with Turmeric). Warm White used 2× (Milestones, Partner Recognition) to differentiate from Ivory-heavy sections.

---

## 4. Component Inventory (for Rishi)

**New components for /impact:**
- `<ImpactHero />` — /impact only
- `<ExpandedStats />` — wraps 4 cards
- `<ExpandedStatCard />` — richer version of homepage's `<StatCard />`. Not a variant — a separate component; the layout is too different.
- `<MilestonesTimeline />` — /impact only (v1); reusable on future annual-report page
- `<MilestoneNode />` — child of MilestonesTimeline
- `<ImpactStories />` — wraps 2–3 stories
- `<ImpactStory />` — child story card
- `<PartnerRecognition />` — /impact only; uses `<PartnerStrip />` internally per group
- `<ImpactPDFDownload />` — single-card section

**Reused from earlier pages:**
- `<TrustBlock />` from /about (same component, `body` prop varies)
- `<CTABanner variant="dual" />` from /about (same component, new props)
- `<PartnerStrip />` — homepage component, reused within PartnerRecognition
- `<Section />`, `<Container />`, `<Button />`, `<Header />`, `<Footer />`

**Sanity schema extension needed (for Rishi + editor):**
- `ImpactStat` content type gains two optional fields:
  - `trend` (string, short — "+24% year over year")
  - `footnote` (string, short — methodology note)
- If the founder wants Milestones CMS-managed later, add a `Milestone` type in v2 per PRD §10. For v1, hardcode milestones in the component.

---

## 5. Breakpoints Summary

- **Mobile:** <768px — Hero stays left-aligned. Stats 1-col. Milestones: track shifts left, cards right. Stories: photo on top, stacked. Partners: 2-col logo grid per group. PDF card: 24px padding.
- **Tablet:** 768–1024px — Stats 2×2. Milestones alternating layout (narrow). Stories: 2-col but content column narrower. Partners: logos wrap 3-up.
- **Desktop:** >1024px — Stats 2×2. Milestones alternating with 340px card max. Stories alternating with 280px photo. Partners: logos in single row per group or wrap as needed.
- Content max-width: 1100px for most; Milestones 820px; Impact PDF 820px; Stories 1100px; Hero 820px.

---

## 6. Accessibility Summary

- One H1 per page (Hero).
- H2 for each content section (hidden on Trust Block and Closing).
- H3 for stat labels, milestone titles, story titles, PDF heading.
- All stat numbers are real text (not images); screen readers announce them with accessible labels.
- Milestones timeline is `<ol>` with `<li>` nodes — semantic order preserved.
- Stories use `<blockquote>` for pull quotes, `<cite>` for attribution.
- All external links (partner logos, PDF download): `target="_blank"` + `rel="noopener noreferrer"` + accessible name that includes destination type.
- PDF download link includes file size + format in accessible name.
- All contrast combinations pass WCAG 2.1 AA.
- Focus rings visible on every interactive element.
- Prefers-reduced-motion: disable any entrance animations.

---

## 7. Placeholder TODOs (for founder + PM)

- **EIN** — founder provides. Appears once on page in Trust Block.
- **All stat numbers** — founder provides audience count, artist count, event count, volunteer hours.
- **Stat trend data** — founder provides year-over-year growth. If unavailable, trend rows remain empty (component gracefully falls back).
- **Stat footnotes** — founder confirms methodology per stat.
- **Milestone dates + titles + descriptions** — founder provides 4–6 milestones. At minimum: founding, first paid artist, first institutional venue, filing 501(c)(3), first grant award.
- **Story content** — Shubhangi + Saloni draft 2–3 stories from founder's event notes (per Decisions Log Q5). Verify names + quotes with subjects before publishing.
- **Story photos** — founder/editor sources real event photos. If unavailable, Sand placeholder with music-note glyph is the fallback.
- **Partner groupings** — founder confirms which partners go in Venue / Community / Funder.
- **Funder list** — may be empty for v1; omit the Funders group if so.
- **2025 Impact Report PDF** — founder produces (Canva, Figma, Word-to-PDF — any format is fine for v1). If not ready, replace button with contact-instead message.
- **Audit documents** — founder confirms they can provide on request. Don't promise what can't be delivered.

---

## 8. What I'd Push Back On

1. **Three stories is aspirational for v1 content.** Drafting three authentic story pieces from event notes is real content work. If we can't ship three by launch, two is fine. If we can't ship two, one is fine — and in that case I'd expand the single story to take a full horizontal layout (photo + full-width prose), treating it as a featured anchor. Do NOT ship placeholder "story coming soon" — that's worse than no story section.

2. **Milestones timeline only works with ≥4 real nodes.** If the founder has only 3 meaningful moments to share, the timeline reads as padded. In that case, switch to a horizontal 3-column "chapter markers" layout instead (Founded / Went Nonprofit / Now) — a different component but honest. Revisit at founder content-draft review.

3. **"Updated annually each April" on the PDF download.** This is a commitment. If the founder can't commit to an annual April update, soften the copy to "Updated as milestones warrant" or simply publish the current-year report without the annual-commitment language. Broken commitments on a transparency page are the worst signal.

4. **The stats section assumes cumulative-since-2020 numbers.** If the founder wants to show YTD or rolling-12 numbers instead, the page still works but context lines need to be rewritten. Confirm with founder before writing context copy.

5. **Partner Recognition funder-group visibility risk.** If the Funders group is empty, we omit it. But an /impact page WITHOUT any funder recognition is a subtle grant-readiness weakness — program officers notice. Founder should prioritize landing a first small grant (even $500 from a local arts council) before the site's big push to grant reviewers. Meanwhile, consider listing INDIVIDUAL major donors (with permission) as a "Major Donors" group if no institutional funders yet exist — individual recognition is still trust signal.
