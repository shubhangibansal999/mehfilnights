# About v1 — Design Spec

**Author:** Saloni (design agent)
**For:** Rishi (frontend), Shubhangi (PM), Vansh (PM), Founder
**Version:** 1.0 — 2026-04-22
**Scope:** `/about` route only. Based on PRD v1 §4, Brand Guidelines v3, Decisions Log Q4.

---

## 0. Design Intent (Read Before Building)

The About page's primary audience is **grant reviewers**. Secondary audience is first-time donors who clicked "Read our full story →" from the homepage. Everything on this page exists to answer the question a program officer types into their grant-checklist spreadsheet: *"Is this a real, credible 501(c)(3) with a coherent mission, real programs, and real humans behind it?"*

**The through-line:** this is a reading page, not a selling page. Lighter and airier than the homepage — two Deep Olive moments max (a short hero band, a closing CTA band). Everything in between is Ivory and Warm White to maximize text legibility. Saffron appears once — in the final CTA.

**60-30-10 budget on this page:**
- 60% Ivory + Warm White + Sand (Hero body, Mission block, Our Story, Team/Commitment, Trust block, Press strip)
- 30% Deep Olive (top band only — short hero, ~40vh) and Pillars card accents
- 10% Saffron (closing Donate CTA) + Turmeric (hero hairline, Mission pillar icons)

**What this page MUST do:**
1. Put mission / vision / values in front of a grant reviewer within the first scroll.
2. Tell the founding story without making it about one person's heroics.
3. Recap the three programs without overlapping the homepage copy.
4. Satisfy the grant-readiness checklist (501(c)(3) + EIN + board list OR a defensible alternative).
5. Give press outlets a place to see themselves (deferred standalone page; 3-mention strip inline).

---

## 1. Page Architecture — Reading Order

1. Hero Band (short, introductory — NOT a "night moment")
2. Mission / Vision / Values block
3. Our Story narrative (3–5 paragraphs)
4. Three Programs recap (reuses homepage `<ProgramPillars />`)
5. Team / Board section (two design options — see §2.5)
6. 501(c)(3) + EIN Trust Block
7. Press & Media strip (3 mentions, inline)
8. Closing CTA band (Donate + Contact)

Section padding between majors: **96px desktop / 72px tablet / 56px mobile** (slightly tighter than the homepage — this is a single-topic reading page, and sections want to feel connected, not scenic). Content container max-width **1100px** (narrower — 860px — for the Our Story narrative section only).

---

## 2. Section-by-Section Spec

### 2.1 Hero Band — `<AboutHero />` (NEW)

**Role:** Introduce the page. Unlike the homepage, this is NOT the front door of the org — it's a "welcome, here's who we are" band. Short, warm, sets tone.

**Layout:**
- Full-bleed, min-height **52vh desktop / 44vh tablet / auto (~360px) mobile**. Explicitly NOT 92vh — this is not a hero moment competing with the homepage.
- Background: `--mn-deep-olive` with a very soft decorative treatment. No photograph. Instead: a faint (opacity 0.08) repeating Turmeric hairline pattern at the bottom edge, OR a single horizontal Turmeric gradient that fades to transparent at the top. Prefer the second — cleaner.
- Content block vertically centered, max-width 780px, **center-aligned** text (homepage hero was left-aligned; centering here signals "you've arrived somewhere").
- Generous breathing room — this is a band, not a hero.

**Content:**

```
Eyebrow (Instrument Serif italic, 18px, Turmeric, letter-spacing 0.3px):
  About Mehfil Nights.

H1 (DM Serif Display, 48px desktop / 36px mobile, Ivory, line-height 1.15):
  A room built for music,
  a tradition built for us.

Subtitle (Instrument Serif italic, 22px desktop / 19px mobile, Sage Muted, line-height 1.4, max-width 620px):
  We're a Seattle 501(c)(3) that gathers neighbors around
  South Asian live music — and keeps a centuries-old tradition
  alive by doing it one evening at a time.
```

No CTAs in the hero band. The reader just got here; give them a paragraph before asking for anything.

**Typography tokens:** Eyebrow → `font-accent` italic / 18px. H1 → `font-display` / clamp(36px, 5vw, 48px) / line-height 1.15. Subtitle → `font-accent` italic / clamp(19px, 2.2vw, 22px) / line-height 1.4.

**Color tokens:**
- Background: `--mn-deep-olive`
- Eyebrow: `--mn-turmeric`
- H1: `--mn-ivory`
- Subtitle: `--mn-sage-muted` (`#A8BFA9`) — required for WCAG AA on dark

**Mobile behavior:** Subtitle shrinks to 19px, H1 to 36px. Keep center alignment (stacking feels natural on mobile).

**Accessibility:**
- `<section aria-labelledby="about-hero-heading">`, H1 has `id="about-hero-heading"`.
- Decorative gradient / hairline treatment is pure CSS — no `<img>` needed.
- Contrast: Ivory on Deep Olive = 12:1 (AAA). Sage Muted on Deep Olive = 5.2:1 (AA).

**Design rationale:**
- *Cultural:* The H1 ("a tradition built for us") claims the inheritance without being performative. "For us" is deliberately ambiguous — it welcomes South Asian diaspora readers and curious Seattleites simultaneously.
- *Conversion:* A short hero (52vh, not 92vh) trains the grant reviewer: "this page is shorter than the homepage, I can read it all." That perceived-effort signal matters for thorough due diligence.
- *Trust:* "Seattle 501(c)(3)" in the subtitle is front-loaded. A program officer who reads only this band knows three things: where, what, and that it's a nonprofit.

---

### 2.2 Mission / Vision / Values — `<MissionVisionValues />` (NEW)

**Role:** The first substantive content on the page. Grant reviewers scan this block within 10 seconds.

**Layout:**
- Background: `--mn-ivory`. Hard tonal reset from Deep Olive hero to Ivory reading surface.
- Container: max-width 1100px.
- Section padding: 96px top / 96px bottom desktop.
- Three-column grid desktop (Mission / Vision / Values, 32px gap). Stack to single column ≤ 1024px (two columns feels unbalanced with three items — prefer honest stacking).
- Above the grid: a small italic Instrument Serif eyebrow — "What guides us" — 18px, Henna.
- Each column is a card-less block (no background fill; rely on whitespace and the divider lines between columns on desktop at 1px `--mn-light-line`).

**Block anatomy:**
- Icon slot at top (40px × 40px, stroke-style line-art in `--mn-turmeric`). Suggested icons: Mission → compass-rose. Vision → sunrise/horizon. Values → hands-cupped.
- Block H3: Plus Jakarta Sans 600, 22px, `--mn-deep-olive`, uppercase, letter-spacing 1px. (The uppercase treatment — specific to these three blocks — gives them institutional weight without adding a fourth font.)
- Body: Plus Jakarta Sans 400, 16px, `--mn-body-text`, line-height 1.7.
- Values block only: instead of a paragraph, a 4–5 item bulleted list with Turmeric square bullets (4px × 4px).

**Content (real copy — founder to confirm values list):**

```
Eyebrow: What guides us.

Block 1 — MISSION:
  To connect communities across the Pacific Northwest through intimate
  South Asian live music — supporting independent artists, welcoming
  every neighbor, and honoring a centuries-old tradition.

Block 2 — VISION:
  A Seattle where every neighborhood has a mehfil within walking distance —
  where South Asian music is part of the region's living cultural fabric,
  not a once-a-year festival.

Block 3 — VALUES:
  • Artists first. We pay, we produce, we platform.
  • Every neighbor welcome. No gatekeeping, no prerequisites.
  • Acoustic intimacy. We trade spectacle for shared attention.
  • Financial transparency. Every dollar stays in the room.
  • Rooted, not preserved. Tradition lives by being lived.
```

**Component structure:** `<MissionVisionValues />` — new, one-off. Takes three slot props: `mission`, `vision`, `values` (array). Reusable on a future "About" variant if needed but scoped to this page today.

**Mobile behavior:**
- Stack to one column. 40px gap between blocks.
- Icons stay 40px.
- H3 stays at 22px.
- Values bullets stay intact; don't convert to prose paragraphs on mobile.

**Accessibility:**
- Section is `<section aria-labelledby="mvv-heading">` with a visually-hidden `<h2>` "Mission, Vision, and Values" (not the eyebrow — the eyebrow is italic decorative copy, not a heading).
- Each block uses a real `<h3>`. Three H3s at this level is correct; they are siblings under the hidden H2.
- Icons `aria-hidden="true"`.
- Values list uses `<ul>` / `<li>` semantically.

**Design rationale:**
- *Cultural:* "Rooted, not preserved. Tradition lives by being lived." is the one sentence that encapsulates the brand's positioning on heritage. Putting it in Values (not Mission) keeps Mission legible to a grant-agency grant-writer while preserving the cultural point.
- *Conversion:* Grant reviewers read Mission to judge eligibility, Vision to judge ambition-fit, Values to judge integrity. Three blocks in one section cover all three in under 60 seconds.
- *Trust:* Uppercase H3s (MISSION / VISION / VALUES) are a legible institutional signal without adding a fourth font — we achieve the "formal document" feel through letter-spacing, not typography-family bloat.

---

### 2.3 Our Story — `<OurStory />` (NEW)

**Role:** The narrative spine of the page. Not a hero origin myth — a grounded account of when, why, what, where-next.

**Layout:**
- Background: `--mn-warm-white` (`#FDFAF5`) — the "pause and read" surface we introduced on the homepage Mehfil Explainer.
- Container: max-width **860px** (narrower than other sections — this IS long-form reading).
- Section padding: 112px top / 112px bottom desktop.
- Single-column layout (no two-column splits — this is prose, not cards).
- Section header at top: eyebrow + H2 + a single italic Instrument Serif pull line under the H2.
- Body: five numbered paragraph-blocks, each with a tiny Turmeric chapter-mark to the left of the first line. Do NOT number them "1. 2. 3." — instead use short italic subheads (Instrument Serif, 20px, Henna) that act as chapter titles.

**Content (real copy — founder to review prose carefully):**

```
Eyebrow (Instrument Serif italic, 18px, Henna):
  Our story.

H2 (DM Serif Display, 36px, Dark Text, line-height 1.2):
  How one living-room evening became a nonprofit.

Pull line (Instrument Serif italic, 22px, Henna, max-width 640px):
  "We didn't set out to build an organization —
  we set out to find a room."

── Chapter 1 (italic Instrument Serif 20px, Henna): The first mehfil.
  [Plus Jakarta Sans 400, 17px, Body Text, line-height 1.8]
  Mehfil Nights began in 2020, in a living room in Seattle's Central
  District, with a dozen neighbors and a single acoustic guitar. The
  founder had moved west from Lahore by way of Boston, looking for a
  room where South Asian music lived the way it did back home — close,
  unhurried, shared with strangers who became friends by the end of
  the evening. That room didn't exist here, so we built it.

── Chapter 2: Why it kept going.
  Word traveled the way it always has — through invitations, through
  WhatsApp groups, through neighbors bringing neighbors. By 2022 we
  had outgrown the first living room. Coffee roasteries opened their
  evening hours to us. A Fremont abbey invited us in. Town Hall
  Seattle offered a date. Each room was still small enough that the
  artist could hear the audience breathe.

── Chapter 3: Becoming a nonprofit.
  In 2024, we filed for 501(c)(3) status. The paperwork was the
  easy part — the decision was harder. Going nonprofit meant saying
  out loud that Mehfil Nights was not a side project or a supper club
  or a commercial event business. It was a cultural institution, small
  but real, and it needed to be governed like one. We now have an
  organizing team, documented policies, and the transparency a
  community institution owes the community.

── Chapter 4: The three pillars today.
  We host ticketed Mehfil evenings throughout the year. We run a
  residency program that platforms independent South Asian artists
  — with intentional support for women, non-binary musicians, and
  first-generation Americans. And we teach: every Mehfil introduces
  the stories behind the songs, because understanding is the first
  step to caring.

── Chapter 5: What's next.
  The next mehfil is always being planned. We want every Seattle
  neighborhood to have one within walking distance. We want artists
  from Dhaka to Bellingham to know our room as a place where South
  Asian music is taken seriously. We want a listener who's never
  heard a ghazal before to leave their first Mehfil and come back
  for the next one.
```

**Typography tokens:** Eyebrow → `font-accent` italic / 18px. H2 → `font-display` / 36px / line-height 1.2. Pull line → `font-accent` italic / 22px / line-height 1.4. Chapter subheads → `font-accent` italic / 20px / `--mn-henna`. Paragraphs → `font-body` 400 / 17px / line-height 1.8. Inter-paragraph spacing: 32px (one full rag between chapters).

**Color tokens:**
- Background: `--mn-warm-white`
- Eyebrow + pull line + chapter subheads: `--mn-henna`
- H2: `--mn-dark-text`
- Paragraph body: `--mn-body-text`
- Tiny chapter-mark ornament (a 4px Turmeric square, 8px left of first paragraph line): `--mn-turmeric`

**Component structure:** `<OurStory story={{pullLine, chapters: [...]}} />`. New component. Each chapter has `title` and `body` — keeps prose CMS-friendly if founder wants to edit in Sanity later (but for v1, it can be hardcoded).

**Mobile behavior:**
- Single column (no change — already single-column at all breakpoints).
- H2 drops to 28px, pull line to 19px, chapter subheads to 18px.
- Body stays 17px / line-height 1.8.
- Drop the 4px Turmeric chapter-mark ornament on <480px — adds clutter at small widths.

**Accessibility:**
- Section is `<section aria-labelledby="our-story-heading">` with a real `<h2>` ("How one living-room evening became a nonprofit.").
- Chapter subheads are `<h3>` — "The first mehfil.", "Why it kept going.", etc. Five H3s under one H2 is legal and scans well in screen readers.
- Pull line is a `<blockquote>` with `cite` omitted (it's not citing an external source, it's an internal paraphrase).
- Henna `#8B4A2B` on Warm White `#FDFAF5` = 5.8:1 (AA).

**Design rationale:**
- *Cultural:* Naming Lahore, Boston, Seattle in Chapter 1 places the founder's journey without reducing it to "immigrant starts nonprofit." The founder is a person with a trajectory; the org is bigger than one person.
- *Conversion:* Grant reviewers routinely ask, "Why did this org become a 501(c)(3)?" Chapter 3 answers it directly — the paperwork wasn't the hard part, the *commitment* was. That sentence alone is worth more than any mission statement for mature grant readers.
- *Trust:* Chapter 5's honesty ("the next mehfil is always being planned") signals operational reality instead of aspirational vapor — the kind of specific-grounded voice that wins arts-council trust.

---

### 2.4 Three Programs Recap — reuses `<ProgramPillars />`

**Role:** Remind the reader of the three programs. Deliberately shorter copy than the homepage version so this isn't a duplicate read.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 1100px.
- Section padding: 96px top / 96px bottom desktop.
- Above the cards: H2 "What we do" + italic subtitle "Three programs. One mission."
- Reuses the existing `<ProgramPillars />` component (homepage `src/components/home/ProgramPillars.tsx`).
- Three-column grid desktop, stacked below 1024px (same rules as homepage).

**Content (shorter bodies than homepage — deliberate):**

```
H2: What we do
Italic subtitle: Three programs. One mission.

Pillar 1 — Community (icon: nested-people):
  [H3] Bring people together
  [Body] Ticketed Mehfil evenings in cozy Seattle venues — floor cushions,
  acoustic instruments, a room built for listening.

Pillar 2 — Artists (icon: microphone):
  [H3] Platform independent artists
  [Body] A residency program that pays, produces, and promotes emerging
  South Asian musicians — with intentional support for women and
  non-binary voices.

Pillar 3 — Education (icon: open-book):
  [H3] Connect world cultures
  [Body] Every Mehfil introduces the region, the era, and the poet behind
  each song. Understanding is the first step to caring.
```

**Component reuse:** No new component. Rishi passes in new copy props. If the current `<ProgramPillars />` hardcodes the homepage copy, refactor it to take a `pillars={[]}` prop so /about can supply shorter bodies.

**Mobile behavior:** Inherits from homepage spec — single column below 1024px, 24px gap, H3 stays 24px.

**Design rationale:**
- *Conversion:* Grant reviewers who arrived on /about via a direct link (never saw homepage) still get the three-pillar architecture within one scroll. Briefer copy avoids the déjà vu for reviewers who DID read homepage first.
- *Trust:* Reusing the same component across two pages is itself a trust signal — design-system discipline reads as "this org doesn't improvise every page."

---

### 2.5 Team / Board Section — TWO OPTIONS

**This is the pending decision** (Decisions Log Q4). Founder to choose A or B before launch. I've designed both.

#### Option A: "Our Commitment" values-expanded block (ships if team publication is deferred)

**Role:** Fill the space where a team would sit with something substantive. This is NOT padding — it's a commitment statement that belongs on the page regardless.

**Layout:**
- Background: `--mn-sand` (`#E6DCCB`). A third surface color introduces a small visual shift mid-page, breaking the Warm-White → Ivory rhythm with something grounded.
- Container: max-width 1100px.
- Section padding: 96px top / 96px bottom desktop.
- Two-column layout ≥1024px: left column (40%) holds eyebrow + H2 + italic subtitle; right column (60%) holds three commitment statements (each: small H3 + 2-sentence paragraph).
- Below 1024px: stacked. Heading block on top, then the three commitments in a single column with 40px gap.

**Content:**

```
Eyebrow: How we work.

H2: Our commitments.

Italic subtitle: The practices that keep the room honest.

Commitment 1 — To our artists:
  [H3] We pay every artist.
  We don't do "exposure gigs." Every performer who takes our stage
  is paid a fair, pre-negotiated fee — regardless of ticket sales.

Commitment 2 — To our community:
  [H3] Ticket prices stay accessible.
  We set prices at what neighbors can afford, not what venues could
  charge. When costs rise, donations and sponsorships close the gap —
  not ticket buyers.

Commitment 3 — To our funders:
  [H3] Every dollar has a line item.
  Financial documents are posted publicly once a year. When you give,
  you can see exactly what your gift paid for.
```

**Typography tokens:** H2 → `font-display` / 36px. H3 → `font-body` 600 / 20px, color `--mn-deep-olive`. Italic subtitle → `font-accent` italic / 22px, color `--mn-henna`. Body → `font-body` 400 / 17px / line-height 1.7.

**Component structure:** `<OurCommitments commitments={[]} />` — new, one-off for /about. Takes an array of `{h3, body}`.

**Accessibility:**
- `<section aria-labelledby="commitments-heading">` with real `<h2>`.
- Three `<h3>`s under it.

**Why Option A is a real design choice, not a consolation prize:** The three commitments — pay artists, accessible tickets, transparent finances — are EXACTLY the three signals grant reviewers want from a board list. Option A substitutes commitment-to-policy for committee-of-people, and for a small nonprofit that's still forming its board, this is arguably a stronger signal.

#### Option B: Names + roles grid (ships if founder approves publication)

**Role:** List team + board members. No photos, no bios — names and roles only.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 1100px.
- Section padding: 96px top / 96px bottom desktop.
- Above the grid: H2 "Our team" + italic subtitle "The people keeping the room open."
- **Two sub-groupings** with clear headers:
  1. **Staff & Organizing Team** — appears first
  2. **Board of Directors** (or "Advisors" — whichever terminology the founder uses)
- Each sub-grouping has a small uppercase Plus Jakarta Sans label (14px, weight 600, letter-spacing 1px, color `--mn-muted`) above its grid.
- Grid: 3-column desktop (24px gap), 2-column tablet, 1-column mobile. Each cell is a `<PersonCard />`.

**`<PersonCard />` anatomy:**
- No photo.
- Name: Plus Jakarta Sans 600, 18px, `--mn-dark-text`.
- Role: Instrument Serif italic, 17px, `--mn-henna` — the italic name-below-name treatment is cultural (echoes program booklets).
- Optional one-line affiliation: Plus Jakarta Sans 400, 13px, `--mn-muted` (e.g., "Seattle Arts Commission; retired").
- Background: none. Separated from other cells by 24px gap and nothing else. No border.
- Spacing inside each cell: top 24px / bottom 24px / left 0 (card aligns flush with grid gutter).

**Content (placeholder — founder provides final list):**

```
H2: Our team
Italic subtitle: The people keeping the room open.

── STAFF & ORGANIZING TEAM ──
[Founder Name]
   Founder & Artistic Director
[Name 2]
   Program Director
[Name 3]
   Community & Volunteer Lead
[Name 4]
   Communications

── BOARD OF DIRECTORS ──
[Name 5]
   Board Chair
   Seattle Arts Commission; retired
[Name 6]
   Treasurer
[Name 7]
   Secretary
[Name 8]
   At-Large Director
```

TODO: Founder to confirm final names, final role titles, and whether to include one-line affiliations (these are optional per cell — some board members may not want their day job listed).

**Component structure:** `<TeamGrid members={[]} />` — new. Takes an array of `{name, role, affiliation?, roleType: "staff" | "board" | "advisor"}`. Groups by `roleType` internally. Reads from Sanity `TeamMember` type (per PRD §10).

**Mobile behavior:**
- Stack to 1-column. 32px gap between cells.
- Keep the sub-grouping labels — they organize the list for screen-reader users.
- No horizontal rules between groups — use 48px extra gap instead (visual grouping via whitespace).

**Accessibility:**
- Each sub-grouping is its own `<section aria-labelledby="staff-label">` / `<section aria-labelledby="board-label">` so screen readers announce the grouping.
- Each cell is `<article>` with a real `<h3>` for the name.
- Roles are `<p>` — italics are font-style only, not `<em>` (the italic is aesthetic, not emphatic).

**Design rationale for Option B:**
- *Cultural:* No photos = no performative diversity signaling. The italics under names evoke the program booklets from actual South Asian classical concerts — a quiet cultural gesture.
- *Conversion:* Grant reviewers look for *names* and *role diversity*, not portraits. A clean names-only grid signals "we're a real org" without risking stock-photo vibes from low-quality headshots.
- *Trust:* Separating staff from board explicitly is the grant-reviewer-preferred layout — it shows the org understands governance separation.

**PM note to founder:** My recommendation between A and B is **B if you can publish names and get consent from all board members by end of Week 3; A if you can't.** A is NOT a placeholder — it's a legitimate, defensible design. Do not ship a half-populated Option B (e.g., 2 names with "more coming soon"). That's the worst of both.

---

### 2.6 501(c)(3) + EIN Trust Block — `<TrustBlock />` (NEW, reusable)

**Role:** The single most grant-critical element on the page. Must be prominent, not tucked in footer.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 900px, centered.
- Section padding: 64px top / 64px bottom desktop (tighter — this is an institutional statement, not a narrative block).
- **Visual treatment:** a single bordered card. Border 2px `--mn-deep-olive`, border-radius 12px, padding 40px 48px. Light sand background inside the card (`--mn-sand` at 50% — so `#F1E9DA` or similar warm tone).
- Content is center-aligned inside the card.

**Content:**

```
(small uppercase label, 13px, letter-spacing 1px, muted):
  OFFICIAL STATUS

(H3, DM Serif Display, 28px, Dark Text):
  Mehfil Nights is a 501(c)(3) nonprofit organization.

(Plus Jakarta Sans 400, 16px, Body Text, line-height 1.7, max-width 620px):
  All donations are tax-deductible to the full extent of the law.
  Mehfil Nights is registered with the IRS and complies with
  Washington State nonprofit reporting requirements.

(Plus Jakarta Sans 600, 14px, Dark Text, 16px below the paragraph):
  EIN: [XX-XXXXXXX]

(Plus Jakarta Sans 400, 14px, Muted, 8px below EIN):
  Registered in Washington State. Seattle, WA.
```

TODO: Founder to provide EIN. Ship the section with `EIN: [pending]` visible during internal preview, but hold launch until real EIN is in.

**Typography tokens:** Label → `font-body` 600 / 13px / uppercase. H3 → `font-display` / 28px / line-height 1.3. Body → `font-body` 400 / 16px / line-height 1.7. EIN → `font-body` 600 / 14px.

**Component structure:** `<TrustBlock ein={ein} />` — new, reusable. Also ships on `/donate` and `/impact` (same component, different page contexts).

**Mobile behavior:**
- Card shrinks to container width with 24px outer gutter.
- Padding drops to 28px 24px.
- H3 drops to 24px.
- Keep center alignment.

**Accessibility:**
- The bordered card is `<div role="region" aria-labelledby="trust-heading">` with a visible label ("OFFICIAL STATUS") and an H3 the region is labeled by.
- EIN is real text — never an image. Screen readers should read it digit-by-digit; add an `aria-label` that spells it with hyphens ("E-I-N: eight-five, two-three, four-five-six-seven-eight-nine") if that formatting matters to the founder. Otherwise default reading is fine.
- Deep Olive 2px border + Dark Text on light Sand fill = high-contrast card that holds up in dark-mode OS preferences.

**Design rationale:**
- *Cultural:* None needed — this is institutional infrastructure. Its job is to be correct, not beautiful.
- *Conversion:* Every nonprofit donation research paper cited in the brand spec ranks 501(c)(3) + EIN visibility in the top 3 trust signals for first-time donors. Putting it above the Contact CTA — not buried in footer — resolves the question *at the moment it arises* for a reader scrolling through /about.
- *Trust:* The bordered-card treatment signals "this information is load-bearing" — a design cue borrowed from grant-application PDF boilerplate, which is deliberate. We want grant reviewers to recognize this formatting.

---

### 2.7 Press & Media Strip — `<PressStrip />` (NEW)

**Role:** Surface 3 press mentions inline. PRD defers a standalone Press page (§5) — this is the compromise.

**Layout:**
- Background: `--mn-warm-white`.
- Container: max-width 1100px.
- Section padding: 72px top / 72px bottom (tighter — secondary content).
- Above the strip: small italic Instrument Serif eyebrow — "In the press." — 18px, Henna. Center-aligned.
- Strip: 3-column grid desktop (24px gap), stacks 1-column below 768px.
- Each cell is an outbound link to the article.

**`<PressCard />` anatomy:**
- Publication name: Plus Jakarta Sans 600, 13px, uppercase, letter-spacing 1.5px, color `--mn-muted`.
- Headline pull: DM Serif Display, 20px, color `--mn-dark-text`, line-height 1.3, max 3 lines (ellipsis).
- Date: Plus Jakarta Sans 400, 13px, color `--mn-muted`.
- Read arrow: inline Trust Teal "Read →" at bottom, appears on hover (on mobile: always visible).
- Card background: none. Separator: 1px `--mn-light-line` top border per cell on desktop (the border visually groups the row). On mobile: each card has a 1px top border + 16px top padding.

**Placeholder content (founder to replace with real mentions):**

```
Eyebrow: In the press.

Card 1:
  KEXP
  "A Seattle concert series makes South Asian music feel like home."
  March 2025
  Read →

Card 2:
  THE SEATTLE TIMES
  "Mehfil Nights is building a community one acoustic evening at a time."
  November 2024
  Read →

Card 3:
  CROSSCUT
  "A small nonprofit keeps a centuries-old tradition alive in the Pacific Northwest."
  June 2024
  Read →
```

TODO: Founder to provide 3 real press mentions with publication name, headline/pull, date, and URL. If fewer than 3 exist, show 2 (2-column) — don't fabricate.

**Component structure:** `<PressStrip items={[]} />` — new. Items: `{publication, headline, date, url}`. Simple — no CMS content type in v1 (per PRD §10); copy is committed to code. Revisit in v2 if press hits exceed 10.

**Mobile behavior:**
- Stack to 1 column. Each card full-width.
- Headline pull can grow to 4 lines without ellipsis.
- Keep the top-border separator — it anchors each item.

**Accessibility:**
- `<section aria-labelledby="press-heading">` with a visually-hidden H2 "Press coverage".
- Each card is a `<a href>` wrapping an `<article>` — outbound links to external press.
- External links: `target="_blank"` + `rel="noopener noreferrer"` + a visually-hidden "(opens in new tab)" span.
- Focus ring: 2px Trust Teal outline on hover/focus of the card link.

**Design rationale:**
- *Cultural:* Press coverage from regional outlets (KEXP, Seattle Times, Crosscut) ties Mehfil Nights to the Pacific Northwest cultural ecosystem — important for PNW-specific grants (4Culture, Office of Arts & Culture Seattle).
- *Conversion:* Press logos + pull quotes are the second-highest-converting trust signal after 501(c)(3) status (per brand spec research references).
- *Trust:* Quoting the article headline (not paraphrasing it) tells the reader: "we're not editorializing the coverage, it speaks for itself." Integrity signal.

---

### 2.8 Closing CTA Band — `<CTABanner variant="dual" />` (reusable, NEW variant)

**Role:** Give the reader who just finished /about two exits: Donate (saffron) or Contact (teal).

**Layout:**
- Background: `--mn-deep-olive`.
- Full-bleed, container max-width 900px centered.
- Section padding: 96px top / 96px bottom desktop / 72px mobile.
- Center-aligned: italic eyebrow + H2 + short paragraph + two CTAs side-by-side.

**Content:**

```
Eyebrow (Instrument Serif italic, 20px, Turmeric):
  You've read our story. What now?

H2 (DM Serif Display, 40px desktop / 28px mobile, Ivory):
  Help us host the next one.

Body (Plus Jakarta Sans 400, 17px, Ivory at 90%, max-width 560px, line-height 1.8):
  Every mehfil needs a room, a sound system, and an artist.
  Your gift covers all three — and keeps ticket prices low so
  every neighbor can come.

CTAs (horizontal pair, 16px gap, wraps stacked on <480px):
  [ Donate Now → ]      ← Saffron (primary)
  [ Get in Touch ]      ← Trust Teal (secondary — links to /contact)
```

**Typography tokens:** Eyebrow → `font-accent` italic / 20px. H2 → `font-display` / clamp(28px, 4vw, 40px). Body → `font-body` 400 / 17px / line-height 1.8.

**Color tokens:**
- Background: `--mn-deep-olive`
- Eyebrow: `--mn-turmeric`
- H2 + body: `--mn-ivory` / `--mn-ivory` at 90% opacity
- Saffron button: `--mn-saffron` bg, `white` text
- Teal button: `--mn-trust-teal` bg, `white` text

**Component structure:** `<CTABanner variant="dual" primary={{label, href}} secondary={{label, href}} />`. New variant of the existing homepage CTA banner (which had `variant="donate"`). /about uses `variant="dual"`, /impact will reuse it with different copy.

**Mobile behavior:**
- H2 drops to 28px.
- Buttons stack, full-width (max 320px), 12px gap. Saffron on top (primary position), Teal below.
- Body narrows naturally.

**Accessibility:**
- `<section aria-labelledby="about-cta-heading">` with real H2.
- Saffron button has `aria-label="Donate to Mehfil Nights"`.
- Teal button's accessible name is its visible text ("Get in Touch").
- Focus rings: 3px Turmeric outline with 3px offset on Saffron; 3px Ivory outline on Teal.

**Design rationale:**
- *Cultural:* "You've read our story. What now?" is a direct, Pacific-Northwest-plainspoken ask. It respects the reader's time and time invested.
- *Conversion:* Two CTAs, color-coded by intent. Saffron = give money. Teal = have a conversation. Offering both on /about specifically (vs. single-CTA Donate Band on homepage) matches the /about reader's likely intent — grant officers more often want to *email* than donate as a first touchpoint.
- *Trust:* The Teal Contact CTA routes a grant officer to a page where they can ask questions. That option being visible says: "we're reachable by humans." Big deal for institutional funders.

---

## 3. Section Rhythm — the Full Scroll

| Section | Background | Approx. height | Weight |
|---|---|---|---|
| Hero Band | Deep Olive | 52vh (~500px desktop) | 30% |
| Mission/Vision/Values | Ivory | ~560px | 60% |
| Our Story | Warm White | ~1100px (5 chapters) | 60% |
| Programs Recap | Ivory | ~480px | 60% |
| Team / Commitments | Sand (A) or Ivory (B) | ~520px | 60% |
| Trust Block (501c3 + EIN) | Ivory | ~280px | 60% |
| Press Strip | Warm White | ~320px | 60% |
| Closing CTA | Deep Olive | ~400px | 30% |

Two Deep Olive moments (hero band + closing CTA). One Saffron moment (closing Donate button). Turmeric appears in hero eyebrow, Mission-Vision-Values icons, and closing CTA eyebrow. All within the 60-30-10 budget.

---

## 4. Component Inventory (for Rishi)

**New components to build for /about:**
- `<AboutHero />` — one-off, /about only
- `<MissionVisionValues />` — one-off, /about only (three-block layout)
- `<OurStory />` — one-off, /about only (multi-chapter narrative)
- `<OurCommitments />` — one-off, /about only (Option A of team section)
- `<TeamGrid />` — reusable-eventually; /about only in v1 (Option B of team section)
- `<PersonCard />` — child of TeamGrid
- `<TrustBlock />` — **reusable** (also on /donate and /impact)
- `<PressStrip />` — **reusable** if future pages adopt it; /about only in v1
- `<PressCard />` — child of PressStrip
- `<CTABanner variant="dual" />` — **new variant** of the existing CTABanner; reusable on /impact

**Reused from homepage:**
- `<ProgramPillars />` — reused with shorter `pillars` prop copy (refactor to accept prop if needed)
- `<Section />`, `<Container />`, `<Button />`, `<Header />`, `<Footer />`

**Photography strategy (no founder/team photos available):**
- Hero band: no photo. Decorative Deep Olive with Turmeric gradient only.
- Our Story: no photo. Prose-only.
- Team (Option B): no photos (names + roles only — this is an intentional v1 design choice, not a fallback).
- Press Strip: no images — publication name in uppercase text is the visual anchor.

This is DELIBERATE. Stock imagery would hurt the page's credibility more than the absence of imagery would. If the founder wants to add real photos in v2 (event photos, not headshots), they can anchor a new page hero or replace the Hero band's decorative background. Do NOT ship stock headshots under any condition.

---

## 5. Breakpoints Summary

- **Mobile:** <768px — single column everywhere. Hero band 44vh. Our Story Chapter ornaments hidden <480px. Press Strip stacks.
- **Tablet:** 768–1024px — MVV stacks to single column (three items don't balance in two). Programs Recap stacks. Team grid stays 2-column in Option B.
- **Desktop:** >1024px — MVV 3-col, Programs Recap 3-col, Team grid 3-col, Press Strip 3-col.
- Content max-width 1100px everywhere except Our Story (860px) and Trust Block (900px).

---

## 6. Accessibility Summary

- One H1 per page (Hero band).
- H2 per section: Hero sees H1, then hidden H2 on MVV, real H2 on Our Story, real H2 on Programs Recap, real H2 on Team/Commitments, H3 on Trust Block (section has no dedicated H2 — Trust Block's H3 is rolled under the /about H1 context), hidden H2 on Press, real H2 on Closing CTA.
- H3 used inside cards/blocks only.
- All contrast combinations pass WCAG 2.1 AA — validated against brand spec §Accessibility.
- Keyboard nav: Hero has no interactive elements (no focus traps). MVV has no interactive elements. Programs Recap cards become focusable if future variant links them. Trust Block is a static region. Press Strip cards are focusable (outbound links). Closing CTAs tab in order: Saffron first, Teal second.
- Prefers-reduced-motion: disable any fade-in-on-scroll entrance animations.

---

## 7. Placeholder TODOs (for founder + PM)

- **EIN** — founder to provide. Do NOT launch without it.
- **Our Story prose** — founder to fact-check the city/year details in Chapter 1 (I used Lahore + 2020 + Boston as plausible — founder must confirm real trajectory).
- **Values list** — founder to confirm the five-item values bulleted list.
- **Team/Commitments choice** — founder to decide A or B (Decisions Log Q4).
- **Team names, roles, affiliations** — founder to provide if Option B (end of Week 2 deadline per PRD §7).
- **Press mentions** — founder to provide 3 real press hits with publication, headline/pull, date, URL. If fewer than 3 are legitimate, show 2.

---

## 8. What I'd Push Back On

1. **Our Story length.** Five chapters is a lot for a nonprofit About page. I've designed it this way because grant reviewers genuinely read it — but if the founder wants to trim to three, the chapters to keep are: "The first mehfil," "Becoming a nonprofit," and "What's next." Drop "Why it kept going" and "Three pillars today" if we need to cut — the first is covered by homepage copy, the second is covered by the Programs Recap section on this very page.

2. **Press Strip without real press.** If the founder can't supply 3 legitimate mentions by end of Week 2, delete this section for v1. Empty or fabricated press is a bigger credibility hit than no press section at all. "Coming soon" placeholders are cowardly and grant reviewers see through them.

3. **Option A vs Option B recommendation.** I recommended B conditional on consent — but there's a stronger reason to choose A: **the commitments statement is genuinely better grant content than a board list.** A list of four names tells a reviewer nothing about how the org operates. Three commitments (pay artists, accessible tickets, transparent finances) tell them exactly how the org operates. If I were advising the founder unconditionally, I'd ship Option A in v1 and add the board list as a v2 enhancement once the board is more stable. But the grant-readiness checklist in PRD Appendix specifies board visibility, so this is a founder/PM call, not a design call.
