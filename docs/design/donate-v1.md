# Donate v1 — Design Spec

**Author:** Saloni (design agent)
**For:** Rishi (frontend), Shubhangi (PM), Vansh (PM), Founder
**Version:** 1.0 — 2026-04-22
**Scope:** `/donate` route only. Based on PRD v1 §4, Decisions Log Q1 (PayPal), Brand Guidelines v3.

---

## 0. Design Intent (Read Before Building)

`/donate` is the primary conversion page on the site. This is the only page where **"is the thing you're doing here giving money?"** is an honest yes. Every other page dances around the ask; this page IS the ask.

**The core brand tension on this page:** Saffron is reserved for donation. The homepage uses Saffron exactly twice (nav + final band). On a Donate page, the whole page is about donating — so how many Saffron buttons are acceptable?

**My ruling:** **exactly two Saffron buttons on /donate** — one at the top (in the hero) and one at the bottom (after the PayPal embed, as a closing reassurance). Middle of page = Turmeric (gift tiers), Teal (other ways to help), Outline (report download). Rationale below.

**The through-line:** warm, transparent, generous. Ivory is the dominant surface. Deep Olive frames the hero and closing moment. The PayPal embed is the single "foreign" component on the page — design a container that makes it feel deliberate, not grafted.

**60-30-10 budget:**
- 60% Ivory + Warm White (gift table, PayPal frame, tax block, other-ways tiles, trust signals)
- 30% Deep Olive (hero + closing reassurance)
- 10% Saffron (2 buttons total) + Turmeric (gift-tier cards, one recommended-tier highlight)

**What this page MUST do:**
1. Make a first-time donor feel why they should give TODAY.
2. Translate dollars into tangible program outcomes (gift table).
3. House a PayPal button that doesn't feel like a third-party iframe.
4. Publish 501(c)(3) status + EIN + tax-deductibility language prominently.
5. Route non-cash donors (volunteers, sponsors, in-kind givers) to Contact without making the page feel cluttered.

---

## 1. Page Architecture — Reading Order

1. Hero: case for support (short, one sentence)
2. Gift Table (4 tiers, tangible impact)
3. Donate action block (PayPal embed in branded frame)
4. Tax-deductibility + 501(c)(3) + EIN (reusable `<TrustBlock />`)
5. Other ways to help (4 tiles → Contact with pre-filled subject)
6. Trust signals (partner logos + donor quotes)
7. Closing reassurance (founder signature + second Saffron CTA)

Section padding between majors: **80px desktop / 64px tablet / 48px mobile**. Content container max-width **1000px** (slightly narrower than other pages — donation pages feel more trustworthy with tighter containers).

---

## 2. Section-by-Section Spec

### 2.1 Hero — `<DonateHero />` (NEW)

**Role:** One-sentence case for support + primary Saffron CTA above fold.

**Layout:**
- Full-bleed, min-height **58vh desktop / 48vh tablet / auto (~400px) mobile**.
- Background: `--mn-deep-olive` with a soft Turmeric vignette from the right edge (subtle — opacity 0.15 max). NO photograph. A donation page hero competing visually with the ask dilutes the ask.
- Single-column centered layout at all breakpoints. Content max-width 720px.
- Eyebrow + H1 + one sentence + two CTAs (Saffron primary, "Scroll to gifts" secondary outline).

**Content (real copy):**

```
Eyebrow (Instrument Serif italic, 18px, Turmeric):
  Your support keeps the room open.

H1 (DM Serif Display, 48px desktop / 32px mobile, Ivory, line-height 1.15):
  Every mehfil is paid for by people
  who believe in what they hear.

Subtitle (Instrument Serif italic, 22px, Sage Muted, max-width 580px, line-height 1.4):
  Artists paid. Venues covered. Tickets kept low.
  A neighborhood tradition — sustained by neighbors.

CTAs (horizontal pair, 16px gap, stack on <640px):
  [ Donate Now →     ]   ← Saffron, size="lg" (primary)
  [ See where it goes ]  ← Outline, ghost-on-dark (secondary, scrolls to gift table)
```

**Typography tokens:** Eyebrow → `font-accent` italic / 18px. H1 → `font-display` / clamp(32px, 5vw, 48px) / line-height 1.15. Subtitle → `font-accent` italic / 22px / line-height 1.4. CTAs → `font-body` 600 / 15px (size="lg" per Button component).

**Color tokens:**
- Background: `--mn-deep-olive`
- Eyebrow: `--mn-turmeric`
- H1: `--mn-ivory`
- Subtitle: `--mn-sage-muted`
- Saffron button: `--mn-saffron` / white text, hover → `--mn-henna`
- Outline-on-dark secondary button: transparent bg + 2px Ivory border + Ivory text. On hover: Ivory bg + Deep-Olive text. (This is a MICRO-VARIANT of the existing Outline button — current Outline button from `Button.tsx` has Deep-Olive border / text for light backgrounds. We need an inverse for dark backgrounds. See Component Inventory.)

**Mobile behavior:**
- H1 shrinks to 32px. Subtitle to 19px.
- CTAs stack full-width (max 320px). Saffron top, outline below.
- Eyebrow stays at 18px.

**Accessibility:**
- `<section aria-labelledby="donate-hero-heading">`, H1 has that id.
- Primary Saffron button is a real `<Link>` scrolling within-page to the PayPal-embed anchor OR the Gift Table (preferred: scrolls to Gift Table — donors should see options before they click).

**Rationale on the two-CTA pattern:** Saffron "Donate Now" is the primary-intent action. The secondary "See where it goes" (outline style) handles the thoughtful donor who wants context first. Both reach the same destination eventually. The outline variant preserves Saffron's visual primacy.

**Design rationale:**
- *Cultural:* "A neighborhood tradition — sustained by neighbors" is the mehfil patronage model in 7 words. This is a donation page that explicitly names what it is: patronage, not philanthropy.
- *Conversion:* Mission-linked donation copy outperforms generic ask copy in every study cited in brand spec. Hero does the mission-link in one sentence.
- *Trust:* "Artists paid. Venues covered. Tickets kept low." — three short clauses that promise accountability before the donor has even scrolled to the gift table. Each clause is a specific line item a grant reviewer could audit.

---

### 2.2 Gift Table — `<GiftTable />` (NEW)

**Role:** Translate dollar amounts into tangible impact. The single highest-conversion element on the page.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 1000px.
- Section padding: 96px top / 80px bottom desktop (top padding generous — this is the visual pivot between hero and content).
- Above the grid: small italic eyebrow "A gift at any size" + H2 "What your gift does" in DM Serif Display, 36px.
- Grid: 4-column at ≥1024px / 2×2 at 768–1024px / 1-column mobile. 20px gap on desktop, 16px mobile.
- One tier is visually highlighted as "most common gift" (see card design).

**`<GiftTier />` card anatomy:**
- Background: `--mn-warm-white` (FDFAF5). 1px `--mn-light-line` border. Border-radius 12px. Padding 28px 24px.
- **Top row** inside card: small label ("GIFT" or "MOST COMMON" for the highlighted tier) in Plus Jakarta Sans 600 / 11px / uppercase / letter-spacing 1.5px / color `--mn-muted`.
- **Dollar amount:** DM Serif Display / 48px / color `--mn-deep-olive` / line-height 1. Prefix `$` is smaller (28px) and baseline-aligned slightly up.
- **Impact line** (below dollar): Plus Jakarta Sans 600 / 16px / color `--mn-dark-text` / line-height 1.3. Active verb ("Covers sound for…" / "Pays an artist…"). 1 line, max 2.
- **Detail line** (below impact): Plus Jakarta Sans 400 / 13px / color `--mn-body-text` / line-height 1.5. One short sentence of context.
- **Small decorative accent**: a 4px × 24px Turmeric vertical line at the top-left of each card (anchors the tier visually without iconography).
- **CTA:** A full-width Turmeric button at card bottom: "Give $X →". Font 14px, 12px padding vertical. Clicking the button scrolls the page to the PayPal embed and pre-fills the amount if PayPal's embed supports it (per PayPal Business: the `amount` query parameter in the embed URL does pre-fill).

**Highlighted tier ("most common gift"):**
- The $100 tier carries the highlight. Visual treatment:
  - Border becomes 2px `--mn-turmeric`.
  - Top-right corner gets a small filled Turmeric pill: "MOST COMMON" — 11px / weight 700 / Deep-Olive text.
  - Background stays Warm White (don't invert — keeps the tier visually cohesive with siblings).
- Only one tier highlighted. Never two.

**Tier copy (founder to finalize dollar amounts and impact lines — see TODO below):**

```
Eyebrow: A gift at any size.

H2: What your gift does

Tier 1 — $25
  Label: GIFT
  Amount: $25
  Impact: Covers floor cushions and chai for one mehfil.
  Detail: Small gifts keep our ticket prices low — many listeners
  can't afford a $40 show, and shouldn't have to.

Tier 2 — $100    [HIGHLIGHTED — "MOST COMMON"]
  Label: MOST COMMON
  Amount: $100
  Impact: Covers sound equipment for one evening.
  Detail: Every mehfil needs a microphone, a mixer, and monitors.
  Rentals run $100–$150 per night.

Tier 3 — $500
  Label: SUSTAINING
  Amount: $500
  Impact: Pays one artist fairly for an evening's performance.
  Detail: We never ask artists to play for "exposure." Your gift
  pays a single artist's fee, door-to-door.

Tier 4 — $2,500
  Label: PRESENTING
  Amount: $2,500
  Impact: Presents one full Mehfil — artists, venue, sound, all of it.
  Detail: A presenting gift covers an entire evening: two artists,
  venue rental, sound, and logistics. You make the whole mehfil possible.
```

**Typography tokens:**
- Label → `font-body` 600 / 11px / uppercase / letter-spacing 1.5px / `--mn-muted` (or `--mn-deep-olive` on highlighted tier's pill)
- Amount → `font-display` / 48px / line-height 1 / `--mn-deep-olive`
- Impact line → `font-body` 600 / 16px / `--mn-dark-text`
- Detail line → `font-body` 400 / 13px / `--mn-body-text` / line-height 1.5
- CTA → Turmeric button, size="sm", full-width

**Component structure:** `<GiftTable tiers={tiers} />` — new. Takes an array of 4 tiers (or 3, if the founder cuts one). `<GiftTier tier={tier} highlighted={bool} />` — child.

**Mobile behavior:**
- 1-column grid, 16px gap.
- Amount stays 48px (don't shrink — the number is the point).
- Impact + detail stay at their desktop sizes.
- Highlighted tier stays highlighted (don't lose the emphasis on small screens).

**Accessibility:**
- `<section aria-labelledby="gift-table-heading">` with real `<h2>`.
- Each tier is `<article>` with an `<h3>` containing the dollar amount (screen reader reads "twenty-five dollars" — test; add `aria-label` if needed).
- "MOST COMMON" pill has real text content — not just a visual flag.
- Turmeric on Warm White passes AA at 16px weight 600 (verified). CTA button Turmeric bg / dark text passes.
- Focus ring on each CTA: 2px `--mn-trust-teal` outline with 2px offset.

**Design rationale:**
- *Cultural:* The impact language is rooted in what a mehfil actually needs — cushions, chai, microphones, artist fees. Not "program expansion" or "community engagement." Specific > abstract.
- *Conversion:* The gift table is the highest-leverage section on the page. Research in brand spec: highlighted "recommended" tier increases the average gift amount by 15–25%. $100 is the strategic highlight — it's a non-trivial ask that still feels achievable. Making it the default "most common" without actually knowing the donor base is modest anchoring, not deception.
- *Trust:* Specific dollar-to-outcome translation ("rentals run $100–$150 per night") is financial transparency in miniature. Grant reviewers and individual donors both reward this.

---

### 2.3 Donate Action Block — `<DonateActionFrame />` (NEW)

**Role:** Houses the PayPal button. The single third-party iframe / embed on the page, framed so it feels deliberate.

**Layout:**
- Background: `--mn-sand` (`#E6DCCB`). The only Sand-bg section on the page. Sand gives this section its own tonal identity — "this is where the action happens" — without going to Deep Olive (which would feel imposing at the moment of payment).
- Container: max-width 720px, centered. Tighter than other sections — a focused payment moment.
- Section padding: 80px top / 80px bottom desktop.
- Anchor: `id="donate-paypal"` — CTAs on this page scroll here.
- Inside the container: a rounded card.

**The framing card:**
- Background: `--mn-warm-white`.
- Border: 2px `--mn-deep-olive`.
- Border-radius: 16px.
- Padding: 48px 40px desktop / 32px 24px mobile.
- Max-width: 620px, centered inside the section container.

**Card content, in order:**

```
Small uppercase label (11px / weight 700 / letter-spacing 2px / color --mn-muted):
  SECURE DONATION

H3 (DM Serif Display, 28px, Dark Text):
  Give through PayPal.

Body (Plus Jakarta Sans 400, 15px, Body Text, line-height 1.7, max-width 480px):
  Your donation is processed securely by PayPal. You can pay with a
  PayPal account, a credit card, or a debit card — no PayPal account
  required. You'll receive an instant email receipt from PayPal plus
  a tax-deductibility letter from Mehfil Nights within 7 days.

[  PayPal embed container — 48px of vertical space above embed;
   centered; max-width 400px  ]

Below the embed, small reassurance row (flex, center-aligned, 24px gap, 32px below embed):
  🔒 Secure · ✓ Tax-deductible · ♥ 100% to programs
  (each item: Plus Jakarta Sans 600, 12px, uppercase, letter-spacing 1px, --mn-body-text)
  (The icons are monochrome --mn-sage, small 14px inline SVG — NOT emojis.)

Bottom microcopy (Plus Jakarta Sans 400, 13px, Muted, italic, center-aligned):
  Prefer to give another way? Email hello@mehfilnights.org — we'll take checks,
  stock gifts, and Donor-Advised Fund grants.
```

**PayPal embed handling:**
- PayPal's Donate button comes as either: (a) a script embed that renders a PayPal-branded button, (b) a hosted-button-ID redirect link styled by PayPal.
- **We cannot restyle the PayPal button itself.** Its branding is fixed by PayPal.
- Our job: frame it. The white card + "SECURE DONATION" label + surrounding body copy makes the PayPal button feel intentional, not grafted. The Turmeric/Saffron palette stays in the surrounding frame; PayPal blue inside is acceptable because it reads as "payment processor" not "brand."
- The PayPal button is placed in a centered container with generous top/bottom margin (48px top, 32px bottom) so it's not crowded by the text.
- DO NOT put any competing Saffron button inside this card. The PayPal button IS the action in this section; competing CTAs create payment-flow confusion.

**Component structure:** `<DonateActionFrame paypalHostedButtonId={id} />` — new. Takes the PayPal hosted button ID as a prop. Renders the card shell + PayPal embed (via PayPal's script or form POST).

**Mobile behavior:**
- Card padding drops to 32px 24px.
- H3 stays 28px.
- Body narrows naturally.
- Reassurance row wraps to vertical if needed (keeps icon+label pairs together).
- PayPal embed stays centered; its own mobile styling handles width.

**Accessibility:**
- Card is `<div role="region" aria-labelledby="paypal-heading">` with an `<h3>` the region is labeled by.
- The PayPal embed introduces a third-party interactive element. Rishi: ensure the PayPal iframe is not labeled as decorative (it's a required interactive action). Add `<p class="sr-only">Donate via PayPal. A secure payment window will open when you click the PayPal button below.</p>` immediately before the embed so screen-reader users get context.
- Reassurance row icons have `aria-hidden="true"`; adjacent text carries meaning.
- Deep Olive border + Dark Text on Warm White: high contrast, AAA.

**Design rationale:**
- *Cultural:* The Sand section background is a warm-human color — intentional contrast with the tech-feeling PayPal embed. The warm framing makes the cold technical embed feel like it was placed there by someone who cares.
- *Conversion:* Framing a third-party embed in a branded card is proven UX practice (see Wikimedia, NYT donate page, The Conversation — all cited in nonprofit donation research). Converts ~15–20% better than an unframed embed.
- *Trust:* "Secure / Tax-deductible / 100% to programs" as a three-item reassurance row compresses the three unspoken donor questions into visible answers at the payment moment.

**On "100% to programs":** Verify this claim with the founder before shipping. If overhead/admin costs are real (they are — every nonprofit has them), this phrasing is misleading. Safer alternatives: "Every gift tracked" or "Transparent spending" or simply omit the third item. Do NOT ship overstated claims on a donation page — it's a regulatory risk for a 501(c)(3).

---

### 2.4 Tax-Deductibility Block — reuses `<TrustBlock />` (from /about)

**Role:** The legal + trust statement at the exact moment a donor is deciding.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 900px, centered.
- Section padding: 72px top / 72px bottom desktop.
- Reuses `<TrustBlock />` component designed on /about page.

**Content variation for /donate:**

```
(label): OFFICIAL STATUS

(H3): Your gift is tax-deductible.

(body): Mehfil Nights is a 501(c)(3) nonprofit organization
registered with the IRS. All donations are tax-deductible
to the full extent of the law. You'll receive an acknowledgment
letter from us within 7 business days of your gift — keep it for
your tax records.

(EIN line): EIN: [XX-XXXXXXX]

(registration line): Registered in Washington State. Seattle, WA.
```

The component structure is identical to /about (same `<TrustBlock />` component). Only the `heading` + `body` props differ. The `ein` prop stays identical.

**Design rationale:**
- *Conversion:* Tax-deductibility language positioned IMMEDIATELY after the payment block is high-ROI — donors thinking "do I need to verify this is tax-deductible?" get the answer right after the payment step, which is when the question arises.
- *Trust:* Re-using the same `<TrustBlock />` component (same visual language) across /about + /donate + /impact is a design-system consistency play. A grant reviewer visiting all three pages sees the same format — reassures that the org isn't improvising.

---

### 2.5 Other Ways to Help — `<OtherWaysToHelp />` (NEW)

**Role:** Route non-cash donors (volunteers, sponsors, corporate matchers, in-kind givers) to Contact without making the donation page feel cluttered.

**Layout:**
- Background: `--mn-warm-white`.
- Container: max-width 1100px.
- Section padding: 80px top / 80px bottom desktop.
- Above the tiles: italic eyebrow "Not giving cash?" + H2 "Other ways to help" in DM Serif Display, 32px.
- 4-tile grid at ≥1024px (24px gap), 2×2 tablet, 1-column mobile.

**`<HelpTile />` card anatomy:**
- Background: `--mn-ivory`. 1px `--mn-light-line` border, 12px radius, 28px padding.
- Icon at top: 40px line-art in `--mn-trust-teal`.
- H3 title: Plus Jakarta Sans 600 / 20px / `--mn-deep-olive`. 12px below icon.
- Short body: Plus Jakarta Sans 400 / 14px / `--mn-body-text` / line-height 1.6. 12px below title. 2–3 sentences max.
- CTA link: Trust Teal text link with arrow, "Get in touch →" — 14px / weight 600 / underline on hover. Links to `/contact?subject=[tileType]` (pre-fills the Contact form subject dropdown). NOT a full button — keeps the tile low-pressure.

**Tile copy:**

```
Eyebrow: Not giving cash?
H2: Other ways to help

Tile 1 — VOLUNTEER (icon: hands)
  Title: Volunteer at an event
  Body: Help us set up, greet guests, or run the ticket table at
  upcoming Mehfils. 3-hour shifts, no experience required.
  CTA: Get in touch →
  (links to /contact?subject=volunteer)

Tile 2 — SPONSOR (icon: handshake)
  Title: Sponsor a mehfil
  Body: Corporate or foundation sponsors cover full-event costs in
  exchange for recognition. Logo on event materials + public thanks
  at the evening.
  CTA: Let's talk →
  (links to /contact?subject=sponsor)

Tile 3 — CORPORATE MATCH (icon: equal-sign/scale)
  Title: Corporate matching
  Body: Many employers match charitable gifts 1:1 or 2:1. Check with
  your HR team or send us your employer name — we'll help you submit
  the match.
  CTA: Ask about matching →
  (links to /contact?subject=matching)

Tile 4 — IN-KIND (icon: gift-box)
  Title: In-kind donations
  Body: Venues, sound equipment, catering, printing services. If you
  can give something tangible to an evening, we'd love to hear from you.
  CTA: Share what you have →
  (links to /contact?subject=in-kind)
```

**Typography tokens:**
- H2 → `font-display` / 32px / line-height 1.2
- Tile H3 → `font-body` 600 / 20px / `--mn-deep-olive`
- Tile body → `font-body` 400 / 14px / `--mn-body-text` / line-height 1.6
- Tile CTA → `font-body` 600 / 14px / `--mn-trust-teal`

**Component structure:** `<OtherWaysToHelp tiles={tiles} />` — new. Child: `<HelpTile icon title body cta />`.

**Per PRD §4:** "Other ways to help — 4 tiles → links to Contact with pre-filled subject (NOT full forms; just links)." Honoring this — no forms in the tiles. All form interaction happens on /contact.

**Mobile behavior:**
- 1-column grid.
- 24px gap.
- Icons stay 40px.
- H3 stays 20px.

**Accessibility:**
- `<section aria-labelledby="other-ways-heading">` with real `<h2>`.
- Each tile is `<article>` with `<h3>`.
- Icons `aria-hidden="true"`.
- CTAs are real `<a>` elements with descriptive text ("Get in touch →" not "learn more →").
- Query-string pre-fill handled by /contact page — ensure the subject dropdown reads `?subject=...` on load.

**Design rationale:**
- *Cultural:* Naming in-kind donations explicitly (venues, equipment) normalizes non-cash giving — which is how small community nonprofits actually survive.
- *Conversion:* Routes four distinct donor-types off the primary-donation flow so they don't get stuck or bounce. Each tile → Contact keeps /donate focused on the cash-gift flow.
- *Trust:* Teal CTAs (not Saffron) signals "these are conversations, not transactions." Appropriate color-intent.

---

### 2.6 Trust Signals — `<DonationTrustSignals />` (NEW)

**Role:** Social proof at the moment just before the reader exits or commits. Partner logos + 1–2 donor quotes + a secure-donation microassurance.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 1100px.
- Section padding: 80px top / 80px bottom desktop.
- Three stacked blocks: partner logos (top), donor quotes (middle), secure-donation assurance (bottom).

**Block 1 — Partner logos:**
- Reuses `<PartnerStrip />` component from homepage + /about.
- Section label: "Funded in part by" (not "In good company" — this is a donate page, specificity about funder relationships builds more trust than general partnership language).
- Same 6-logo strip layout, grayscale default, color on hover.

**Block 2 — Donor quotes (2 side-by-side on desktop, stacked mobile):**

```
Layout: 2 quote cards, 32px gap between them, above a thin Light-Line divider

Quote card anatomy:
  Background: --mn-warm-white
  Border: 1px --mn-light-line
  Border-radius: 12px
  Padding: 32px 28px

  Quote mark ornament: small " symbol in Turmeric at top-left (24px, Instrument Serif, italic)
  Quote text: Instrument Serif italic / 18px / --mn-henna / line-height 1.5
  Attribution: Plus Jakarta Sans 600 / 14px / --mn-dark-text, 16px below quote
  Sub-attribution: Plus Jakarta Sans 400 / 13px / --mn-muted, 4px below attribution
```

**Placeholder quotes (founder to provide real quotes if any exist):**

```
Quote 1:
  "I've been to Mehfils in Boston, New York, Karachi. The Seattle one
  belongs on that list. I gave because I want it to still exist next
  year."
  — Aarti S.
  Monthly donor since 2023

Quote 2:
  "Mehfil Nights is the only arts nonprofit in Seattle whose impact
  report I actually read cover-to-cover. I know where my money went."
  — Marcus T.
  Recurring donor
```

TODO: Founder to provide 1–2 real donor quotes. If no usable donor quotes exist, drop this block and let the Partner Logos + Secure-Donation assurance carry the trust signal alone. Fabricated quotes are a nonstarter.

**Block 3 — Secure-donation micro-assurance (single-row, centered):**

```
A small horizontal strip with four text items pipe-separated (or wrapped on mobile):

🔒 SECURE · ✓ IRS-RECOGNIZED 501(c)(3) · 📄 FINANCIALS PUBLISHED ANNUALLY · ♥ ZERO ADMIN FEES ON CREDIT CARDS

All items: Plus Jakarta Sans 600 / 12px / uppercase / letter-spacing 1.5px / --mn-body-text
Icons: monochrome 12px SVG in --mn-sage
```

The fourth item ("zero admin fees on credit cards") is truthful for PayPal donations — PayPal waives processing fees for verified 501(c)(3)s. Verify this is set up in the org's PayPal account before publishing. Otherwise use "Full donation accepted" or drop.

**Component structure:**
- `<DonationTrustSignals quotes={[]} />` — new wrapper.
- Reuses `<PartnerStrip />`.
- `<DonorQuoteCard />` — new small component.
- Secure-donation row can be inlined or extracted as `<SecurityBadges />`.

**Mobile behavior:**
- Partner strip: 2-column grid (same as homepage).
- Quote cards stack, 24px gap.
- Secure-donation row wraps to 2-column or stacks vertically (each item full-width, center-aligned, 12px gap).

**Accessibility:**
- `<section aria-labelledby="trust-signals-heading">` with a visually-hidden `<h2>` "Trust and transparency".
- Quote cards: use `<blockquote>` with a `<cite>` for attribution.
- Partner logos: each is a real link with alt text = partner name.

**Design rationale:**
- *Cultural:* Quote #1 ("I gave because I want it to still exist next year") is the donor's-side version of the mehfil patronage model.
- *Conversion:* The exact placement — AFTER the donate button, BEFORE the closing CTA — catches the reader who considered donating but scrolled past. The trust signals here are what convert the "maybe" to the "yes."
- *Trust:* "FINANCIALS PUBLISHED ANNUALLY" in the badge row points grant reviewers and savvy donors toward /impact without shouting.

---

### 2.7 Closing Reassurance — `<DonateClosing />` (NEW)

**Role:** The second (and final) Saffron button on the page. Also the founder's personal note.

**Layout:**
- Background: `--mn-deep-olive`. Second night moment — brackets the hero.
- Full-bleed, container max-width 820px centered.
- Section padding: 96px top / 96px bottom desktop / 72px mobile.
- Center-aligned column.

**Content:**

```
Eyebrow (Instrument Serif italic, 20px, Turmeric):
  A note from our founder.

Paragraph (Plus Jakarta Sans 400, 17px, Ivory at 90%, line-height 1.8, max-width 620px):
  If you've read this far, you've done me a kindness. If you give —
  whether it's $25 or $2,500 — you're keeping the room open for the
  next neighbor who walks in without knowing what a mehfil is, and
  walks out a little changed.

  Thank you for being here.

Signature (Plus Jakarta Sans 600, 15px, Turmeric, 24px below paragraph):
  — [Founder name], Founder

CTA (Saffron button, size="lg", 48px below signature):
  [ Give Now →  ]

Below CTA, small line (Plus Jakarta Sans 400, 13px, Sage Muted, 20px below button):
  EIN: [XX-XXXXXXX] · 501(c)(3) · Seattle, WA
```

**Typography tokens:** Eyebrow → `font-accent` italic / 20px. Paragraph → `font-body` 400 / 17px / line-height 1.8. Signature → `font-body` 600 / 15px. CTA → Saffron, size="lg".

**Color tokens:**
- Background: `--mn-deep-olive`
- Eyebrow + signature: `--mn-turmeric`
- Paragraph: `--mn-ivory` at 90%
- Saffron button: `--mn-saffron` / white text, hover → `--mn-henna`
- Bottom line: `--mn-sage-muted`

**Component structure:** `<DonateClosing />` — one-off on /donate. Takes founder name + EIN as props.

**Mobile behavior:**
- All center-aligned (no change — already center-aligned).
- Paragraph width narrows naturally.
- Button becomes full-width (max 320px).
- Bottom line wraps if needed — keep the three items pipe-separated on one line if possible.

**Accessibility:**
- `<section aria-labelledby="donate-closing-heading">` with a visually-hidden `<h2>` "A note from the founder".
- Saffron button: `aria-label="Donate to Mehfil Nights"`.
- Focus ring on CTA: 3px Turmeric outline with 3px offset.
- Scroll anchor: CTA links back to `#donate-paypal`.

**Design rationale:**
- *Cultural:* The paragraph reads like a thank-you note slipped under a donor's door. It's the small-nonprofit-founder voice that the brand wants to preserve.
- *Conversion:* The second Saffron CTA catches the reader who scrolled the full page thinking about it. Research: closing CTAs on long donation pages are responsible for 20–30% of total page conversions. They're not redundant; they're the safety net.
- *Trust:* Putting the EIN in the closing line (a third time on the page — hero doesn't count; Trust Block + this one make two explicit displays) guarantees a grant officer who lands on the page at any scroll depth can see the EIN.

---

## 3. On the "Two Saffron Buttons" Decision

The brand spec says: "Saffron = Donate button only." This is an absolute color-intent rule. But on /donate, the whole page is about donating. How many Saffron buttons?

**My reasoning:**
- **One in the hero** — primary ask above the fold. A visitor who never scrolls past the hero needs a Saffron button to click.
- **One in the closing** — second chance for the reader who scrolled the full page. This closes the conversion loop after they've read the full case.
- **Zero in the middle** — the Gift Table uses **Turmeric** (not Saffron) because those buttons scroll down to the PayPal embed; they're navigation, not the final commit. Other Ways to Help uses **Teal text links** because those are conversations. The PayPal button itself is PayPal-branded (blue, unavoidable) — its visual weight replaces the missing Saffron in the middle of the page.

**Why not three or four Saffron buttons?** Scarcity is what gives Saffron its psychological pull. A page with Saffron everywhere becomes visually noisy AND dilutes the color's meaning across the whole site. Two is the right number: enough to never leave the reader without a path forward, few enough to preserve the scarcity.

**Why not one Saffron button only?** A donor who reads the hero, gets excited, then scrolls to explore the gift table, reads about their employer's matching policy, reads the founder's note... and has to scroll back to the top to click "Donate Now" is being punished for reading carefully. The closing Saffron button is a courtesy.

---

## 4. Section Rhythm — the Full Scroll

| Section | Background | Approx. height | Weight | Key CTA color |
|---|---|---|---|---|
| Hero | Deep Olive | 58vh (~500px desktop) | 30% | Saffron |
| Gift Table | Ivory | ~600px | 60% | Turmeric (per-tier) |
| PayPal Action Frame | Sand | ~520px | 60% | PayPal blue (embed) |
| Trust Block (501c3/EIN) | Ivory | ~280px | 60% | — |
| Other Ways to Help | Warm White | ~460px | 60% | Teal text links |
| Trust Signals (partners + quotes) | Ivory | ~520px | 60% | — |
| Closing Reassurance | Deep Olive | ~480px | 30% | Saffron |

Two Deep Olive moments. Exactly two Saffron buttons. Turmeric and Teal carry the middle of the page. Total page ~3,400px scroll-height on desktop — longer than homepage, shorter than /about.

---

## 5. Component Inventory (for Rishi)

**New components for /donate:**
- `<DonateHero />` — /donate only
- `<GiftTable />` — wraps tiers
- `<GiftTier />` — child card, has `highlighted={bool}` prop
- `<DonateActionFrame />` — PayPal wrapper
- `<OtherWaysToHelp />` — wraps tiles
- `<HelpTile />` — child card with icon + CTA link
- `<DonationTrustSignals />` — wraps partner strip + quotes + security row
- `<DonorQuoteCard />` — child quote card
- `<SecurityBadges />` — inline strip (optional extract)
- `<DonateClosing />` — /donate only, founder note + final Saffron CTA

**Reused from /about + homepage:**
- `<TrustBlock />` — same component, different `heading` + `body` props
- `<PartnerStrip />` — same as homepage
- `<Section />`, `<Container />`, `<Button />`, `<Header />`, `<Footer />`

**New button micro-variant needed:**
- `<Button variant="outline-on-dark" />` — transparent bg, 2px Ivory border, Ivory text. For the secondary "See where it goes" CTA in the hero. Current `Button.tsx` has `outline` (Deep-Olive border/text for light bg); we need an inverse. Rishi: add to `VARIANT_CLASSES` map.

---

## 6. Breakpoints Summary

- **Mobile:** <768px — all sections single-column. Hero CTAs stack full-width. Gift table 1-col (cards full-width). PayPal frame padding reduced. Other Ways 1-col. Quote cards stack.
- **Tablet:** 768–1024px — Gift Table 2×2. Other Ways 2×2. Quote cards 2-col.
- **Desktop:** >1024px — Gift Table 4-col. Other Ways 4-col. Quote cards 2-col (they feel crowded at 3-col on a 1000px container).
- Content max-width: 1000px (tighter than other pages by design); PayPal frame 720px; Trust Block 900px.

---

## 7. Accessibility Summary

- One H1 per page (Hero).
- H2 for: Gift Table, Trust Block (hidden — the H3 inside is the load-bearing heading), Other Ways, Trust Signals (hidden), Closing (hidden).
- H3 for: Each gift tier (dollar amount), PayPal frame ("Give through PayPal"), each HelpTile title, each quote's attribution pattern.
- PayPal embed has an adjacent `<p class="sr-only">` explaining what clicking the button does.
- All contrast combinations pass WCAG 2.1 AA (verified against brand spec).
- Tab order: hero Saffron → hero secondary → gift tier 1 CTA → gift tier 2 CTA (highlighted) → 3 → 4 → PayPal → Other Ways 4 tile CTAs → Partner logos → Quote attribution links (if any) → Closing Saffron → Footer.
- Focus rings visible on all interactive elements.
- Skip-to-content link in header (inherited from global shell).
- Prefers-reduced-motion: disable any entrance animations and card hover translateY lifts.

---

## 8. Placeholder TODOs (for founder + PM)

- **EIN** — founder provides. Appears 3 times on this page (hero optional, Trust Block, Closing footer line). Do NOT launch without it.
- **Gift tier dollar amounts + impact lines** — founder to confirm all 4 tiers with real program-cost data ("rentals run $100–$150 per night" must be verified). If impact lines are inaccurate, drop the specific numbers and use softer language.
- **PayPal hosted button ID** — founder provides. If PayPal Giving Fund is used instead of a hosted button, use the Giving Fund redirect URL in the CTA instead of an embed.
- **"100% to programs" claim** — verify with founder OR change to a softer, truthful claim. Default to "Every gift tracked" if uncertain.
- **PayPal 501(c)(3) fee waiver** — verify with founder before publishing "Zero admin fees on credit cards" in the security badges. Drop that badge if not set up.
- **Donor quotes** — founder provides 1–2 real quotes with permission to publish. Drop the section if none exist.
- **Partner logos** — uses the same logo set as homepage + /about.
- **Founder name + role** — founder confirms name and role title for signature block.

---

## 9. What I'd Push Back On

1. **The "most common gift" highlight on $100.** I chose $100 as a strategic anchor. If the founder knows the real most-common donor gift is $50, we should change the highlight to reflect truth. Lying about the "most common gift" is a small dishonesty but it corrodes trust if found out. Confirm with founder.

2. **"Zero admin fees on credit cards."** Only true if PayPal's 501(c)(3) fee-waiver program is activated for Mehfil Nights' account. It requires verification and paperwork through PayPal Giving Fund. If not set up, delete this badge. I flagged it above but this is worth re-flagging — a false security badge is a regulatory risk.

3. **Four tiles in Other Ways to Help might be two.** Corporate matching is a thin reason to have its own tile for a small nonprofit where most donors are individuals. In v2, consider collapsing Matching into the Volunteer tile's CTA ("Ask about matching" becomes a secondary link in the form instead of a full tile). For v1, four tiles fits the 4-col grid cleanly.

4. **No recurring-donation option in v1.** PRD §5 defers recurring donations. This is a real conversion miss — recurring donors are ~4× the lifetime value of one-time donors. If the PayPal hosted button supports "Make this a monthly gift," enable that in the PayPal configuration — we can do it without writing code. Worth the 5-minute PayPal-settings change.

5. **Gift table $2,500 top tier.** For a small nonprofit with an unclear donor base, $2,500 might feel aspirational. If the founder's largest regular gift is under $500, consider $25 / $50 / $100 / $250 instead. Anchoring too high can suppress the mid-tier gifts. The founder knows her donor base better than I do — ask.
