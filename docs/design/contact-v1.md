# Contact v1 — Design Spec

**Author:** Saloni (design agent)
**For:** Rishi (frontend), Shubhangi (PM), Vansh (PM), Founder
**Version:** 1.0 — 2026-04-22
**Scope:** `/contact` route only. Based on PRD v1 §4 + §6 user stories, Brand Guidelines v3.

---

## 0. Design Intent (Read Before Building)

`/contact` is the **replacement for every bit.ly redirect**. Currently, artists, volunteers, and private-event inquirers get routed through third-party Google Forms via shortened links — unprofessional, breaks brand continuity, and ensures zero analytics. This page fixes all three at once.

**The core design problem:** four distinct audiences share one page.
- **Artists** submitting music for consideration
- **Volunteers** offering time
- **Private Event** inquirers asking about At-Home bookings
- **Everyone else** — partners, press, community questions

The PRD (§6) mandates a single form with a subject dropdown, not four separate forms. That's the right call — simpler to maintain, single email inbox, one form field schema to evolve.

**The through-line:** warm, efficient, respectful of time. This is not a conversion page; it's a service page. Keep it short and calm. Ivory dominant. No Deep Olive moments (a greeting page doesn't need dramatic lighting). One Saffron mention (inherited from nav). Closing CTAs are Teal (Events) and Saffron (Donate).

**60-30-10 budget:**
- 60% Ivory + Warm White (Hero, Form, Direct Contact, FAQ)
- 30% Sand (Form container background — warm, approachable)
- 10% Saffron (closing Donate CTA only) + Turmeric (small accents, submit button variant choice — see §2.2)

**What this page MUST do:**
1. Greet the visitor warmly.
2. Let them reach the right person without having to guess.
3. Handle dynamic form fields (Artist / Volunteer / Private Event subjects open extra fields) without UI jank.
4. Deflect common questions via an FAQ section (reduces form-submission volume).
5. Confirm submission clearly and tell them when to expect a reply.

---

## 1. Page Architecture — Reading Order

**Decision point: FAQ placement — above or below form?**

Argument for above: reduces form submissions. Most "Contact Us" volume on nonprofit sites is people asking questions the FAQ would answer — putting FAQ first deflects 30–50% of form volume.

Argument for below: form is the primary intent. A user arrived at /contact to contact someone; putting a wall of FAQ text before the form is interpreted as "they don't want to hear from me."

**My verdict: FAQ BELOW the form**, but with one twist — the Hero includes a soft nudge: *"Quick question? Check our FAQ below first — you might find your answer in 10 seconds."* Deflection without rudeness. The form is visually primary; FAQ is available for those who want it.

### Reading order:

1. Hero Band (warm greeting, FAQ nudge)
2. Contact Form (subject dropdown + dynamic fields)
3. Direct Contact Block (email, social links)
4. FAQ Preview (4–6 accordion items)
5. Closing CTAs (Events + Donate)

Section padding: **72px desktop / 56px tablet / 48px mobile** (tighter — this is a functional page, not a reading one). Content container max-width **880px** (narrower — forms read better at tighter widths).

---

## 2. Section-by-Section Spec

### 2.1 Hero Band — `<ContactHero />` (NEW)

**Role:** Warm greeting. Set expectations for response time. Nudge toward FAQ without being dismissive.

**Layout:**
- Full-bleed, min-height **36vh desktop / 28vh tablet / auto (~240px) mobile**. Short — form is what users came for.
- Background: `--mn-ivory` (NOT Deep Olive — a contact hero that feels like night-time reads as unapproachable). A thin 4px `--mn-turmeric` bottom-border acts as section divider.
- Container: max-width 880px.
- Center-aligned content.
- Section padding: 80px top / 72px bottom desktop.

**Content:**

```
Eyebrow (Instrument Serif italic, 18px, Henna):
  Get in touch.

H1 (DM Serif Display, 44px desktop / 32px mobile, Dark Text, line-height 1.15):
  We'd love to hear from you.

Body (Plus Jakarta Sans 400, 17px, Body Text, max-width 640px, line-height 1.7):
  Whether you're an artist looking to perform, a neighbor with a question,
  a foundation curious about our work, or someone who wants to help host
  the next Mehfil — send us a note. We read every message and typically
  respond within 24 hours.

Soft deflection link (Plus Jakarta Sans 600, 14px, Trust Teal, underline on hover):
  Quick question? Check our FAQ below — you might find your answer in 10 seconds.
  ↓
  (anchor link scrolls to #faq)
```

**Typography tokens:** Eyebrow → `font-accent` italic / 18px / `--mn-henna`. H1 → `font-display` / clamp(32px, 4.5vw, 44px) / line-height 1.15 / `--mn-dark-text`. Body → `font-body` 400 / 17px / line-height 1.7 / `--mn-body-text`. Link → `font-body` 600 / 14px / `--mn-trust-teal`.

**Color tokens:**
- Background: `--mn-ivory`
- Bottom border: `--mn-turmeric` (4px)
- Eyebrow: `--mn-henna`
- H1: `--mn-dark-text`
- Body: `--mn-body-text`
- Link: `--mn-trust-teal`

**Mobile behavior:**
- H1 drops to 32px.
- Body stays 17px.
- Center alignment maintained.
- Deflection link stays inline as a single line (wraps if needed; both parts stay Teal).

**Accessibility:**
- `<section aria-labelledby="contact-hero-heading">`, H1 has id.
- Deflection link: real `<a href="#faq">`, focusable, with `aria-label="Scroll to FAQ section"`.
- Contrast: Dark Text on Ivory = 11:1 (AAA). Teal on Ivory = 4.8:1 (AA).

**Design rationale:**
- *Cultural:* "We'd love to hear from you" — unadorned, warm, human. No marketing speak.
- *Conversion:* "Within 24 hours" commits to a response SLA. The commitment reduces abandonment ("why bother messaging, they never reply") and holds the org accountable. Only ship if founder actually will honor it.
- *Trust:* Listing the four audience types ("artist, neighbor, foundation, helper") directly in the hero tells the user the page is for them before they scroll. Grant officers especially appreciate seeing "foundation" named explicitly.

---

### 2.2 Contact Form — `<ContactForm />` (NEW)

**Role:** The main interaction. Single form with subject dropdown that reveals dynamic additional fields based on selection.

**Layout:**
- Background: `--mn-sand`. The Sand background is the "service surface" — warm, approachable, distinct from the Ivory Hero. It frames the form as a bounded, focused interaction.
- Container: max-width 720px, centered inside the section container (max 880px).
- Section padding: 80px top / 80px bottom desktop.
- Form lives in a white card:
  - Background: `--mn-warm-white`.
  - Border: 1px `--mn-clay` (slightly warmer than Light-Line, reads as a card edge on Sand).
  - Border-radius: 16px.
  - Padding: 48px 40px desktop / 32px 24px mobile.

**Above the form (inside the card):**

```
Small uppercase label (11px / weight 700 / letter-spacing 2px / color --mn-muted):
  SEND US A NOTE

H2 (DM Serif Display, 30px, Dark Text):
  How can we help?

Short paragraph (Plus Jakarta Sans 400, 14px, Body Text, line-height 1.6, 24px below H2):
  All fields are required unless marked optional. We'll respond to the email you provide.
```

**Base form fields (always visible):**

1. **Your name** — text input, required.
2. **Email address** — email input, required.
3. **Subject** — dropdown (select), required. Options:
   - General inquiry
   - Volunteer
   - Artist submission
   - Private event (At-Home)
   - Partnership / Press
4. **Message** — textarea, required. 5 rows.

**Dynamic fields — revealed based on Subject selection:**

**If subject = "Artist submission":**
5a. **Genre / Style** — text input, required (e.g., "Ghazal", "Sufi fusion", "Carnatic").
5b. **Location (city / region)** — text input, required.
5c. **Link to your music** — URL input, required (SoundCloud, YouTube, Spotify, or website).
5d. **Short bio (200 words max)** — textarea, optional but encouraged.

**If subject = "Private event (At-Home)":**
5a. **Event date** — date input, required.
5b. **Approximate guest count** — number input, required.
5c. **Event location (city or venue)** — text input, required.
5d. **Event occasion (optional)** — text input (e.g., "haldi ceremony", "milestone birthday").

**If subject = "Volunteer":**
5a. **Interest areas** — multi-select checkboxes, required at least one:
  - Event setup / breakdown
  - Ticketing & greeting
  - Sound / audio
  - Hospitality (chai, food)
  - Social media / photography
  - Translation (Hindi / Urdu / Punjabi / Bengali / Tamil / other)
5b. **Availability** — text input, required (short — e.g., "weekends only" or "1 Saturday/month").

**If subject = "General inquiry" or "Partnership / Press":**
No additional fields. The base Message textarea is sufficient.

**Submit button:**
- Placement: below all fields, right-aligned on desktop / full-width on mobile.
- **Variant: Turmeric** (NOT Saffron — this is a form submission, not a donation).
- Size: lg.
- Copy: "Send message →"

**Below the submit button, small line:**

```
Plus Jakarta Sans 400 / 13px / italic / --mn-muted:
  By sending, you consent to Mehfil Nights storing your message to respond
  to you. We don't share your email. Privacy policy →
```

**Form field styling:**
- **Label** (above each field): Plus Jakarta Sans 600 / 13px / uppercase / letter-spacing 1px / `--mn-deep-olive`. 8px below field.
- **Input / select / textarea:** Background `--mn-warm-white`, 1px `--mn-clay` border, 8px radius, 14px 16px padding, 15px font size, body color `--mn-dark-text`.
- **Focus state:** 2px `--mn-trust-teal` outline with 2px offset. Border becomes `--mn-trust-teal`.
- **Placeholder text:** `--mn-muted`.
- **Error state:** 2px `--mn-henna` border, small text-under-field in Henna (e.g., "Please enter a valid email address"). Error text pairs with an inline warning icon (monochrome 14px SVG in Henna) — no color-alone signaling.
- **Success state** (after submission): entire form replaced with a success card.

**Field spacing:** 24px vertical gap between fields. Required-field asterisk: tiny `*` in Turmeric at the end of the label.

**Dynamic field appearance (critical UX detail):**

PRD §6 says dynamic fields should appear based on subject selection. The UX question is HOW they appear — abruptly, smoothly, or via section-swap.

**My ruling:** smooth vertical expand, 220ms ease-out, opacity 0 → 1 with a 40px translateY fade-up. Respect `prefers-reduced-motion` — skip animation entirely for those users, fields just appear/disappear.

Dynamic fields are grouped under a subtle section heading (inserted between field 4 and 5a):

```
(small label, 12px / weight 600 / uppercase / letter-spacing 1px / color --mn-henna):
  FOR [SUBJECT TYPE] INQUIRIES

(Example for Artist submission:)
  FOR ARTIST SUBMISSIONS
```

This grouping heading gives the user visual confirmation that their selection triggered the right fields.

**Component structure:**
- `<ContactForm />` — new wrapper.
- `<FormField />` — child for each input, with label + input + error-state handling.
- `<SubjectSelector />` — child dropdown with `onChange` hook that reveals dynamic fields.
- `<DynamicFieldsForArtist />` / `<DynamicFieldsForVolunteer />` / `<DynamicFieldsForPrivateEvent />` — conditional children, rendered when `subject` matches.
- Uses **React Hook Form** (per PRD §8 week 2) + **server actions** for submission.

**Submission backend:**
- Per PRD risk §4, forms submit to the founder's email via a simple server action (e.g., using Resend or SendGrid) OR route to a webhook that pipes to Mailchimp transactional. For v1, keep it simple: server action → Resend → founder's inbox. Include a reply-to header with the user's email.
- Honeypot field: a hidden `<input name="website">` that real users won't fill. Block submissions that do. Simple spam defense; no captcha in v1 (captcha is a11y-painful).

**Success state (after submission):**

Replace the form card with a success card of identical dimensions:

```
Background: --mn-warm-white (same as form card)
Padding: 48px 40px (same as form)

Centered content:
  Sage-green circle with white checkmark (48px) at top
  (decorative; aria-hidden)

H3 (DM Serif Display, 26px, Dark Text):
  Thanks — we got your note.

Body (Plus Jakarta Sans 400, 15px, Body Text, line-height 1.7):
  We read every message. You'll hear from us within 24 hours
  (typically the same day).

  For urgent matters, email us directly at hello@mehfilnights.org.

Link row (Plus Jakarta Sans 600, 14px, Trust Teal, underline on hover):
  [ See upcoming events → ]    [ Return to home ]
```

Success card does NOT include a "Send another message" CTA — that encourages spam. If the user wants to send another message, they can refresh.

**Mobile behavior:**
- Form card padding drops to 32px 24px.
- Submit button becomes full-width.
- Dynamic fields still animate (smooth vertical expand) unless `prefers-reduced-motion`.
- Field labels stay 13px.
- Inputs stay full-width inside the card.

**Accessibility:**
- `<form>` with `noValidate` attribute (we handle validation via React Hook Form).
- Every input has a real `<label for>` — no placeholder-as-label. Placeholders supplement but don't replace labels.
- Required fields: `aria-required="true"` + visible asterisk.
- Dynamic fields that appear: announce via `aria-live="polite"` region — "4 additional fields now visible: Genre, Location, Link to your music, Short bio."
- Error messages: `aria-invalid="true"` on the input + `aria-describedby` pointing to the error message span.
- Submit button: disabled during submission (with spinner), re-enabled on success/error.
- Focus management: on submission error, move focus to the first invalid field. On success, move focus to the success H3.
- Success state uses `role="status"` (polite live region) so screen readers announce "Thanks — we got your note."
- Multi-select checkboxes (volunteer interests) grouped in `<fieldset>` with `<legend>` "Interest areas".

**Design rationale:**
- *Cultural:* "How can we help?" is the unadorned service-oriented question. Not "We're here for you" (performative). Not "Get in touch" (generic).
- *Conversion:* Dynamic fields reduce friction — an Artist doesn't see volunteer fields, a volunteer doesn't see event-date fields. Fewer visible fields at any moment = higher completion rate. Research consistently shows this.
- *Trust:* Turmeric submit button (not Saffron) is intentional: form submission is NOT a donation action. Keeping Saffron scarce preserves its psychological pull for actual donations. The Turmeric variant here signals "action" without overclaiming.

---

### 2.3 Direct Contact Block — `<DirectContact />` (NEW)

**Role:** For users who prefer direct email or want to check social. A small utility block that respects preference.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 880px.
- Section padding: 72px top / 72px bottom desktop.
- Centered content.
- Three short rows:
  1. Email (primary)
  2. Social handles (secondary)
  3. Mailing address (tertiary — important for grant compliance)

**Content:**

```
Small eyebrow (Instrument Serif italic, 18px, Henna, centered):
  Or reach us directly.

── Row 1: Email ──
Label (Plus Jakarta Sans 600, 13px, uppercase, letter-spacing 1px, --mn-muted):
  EMAIL

Value (DM Serif Display, 24px, Dark Text — large so it's scannable):
  hello@mehfilnights.org
  (mailto link — clickable)

Small caption (Plus Jakarta Sans 400, 13px, Muted, italic):
  For general questions, partnership inquiries, and press.

── Row 2: Social ──
Label (same style as Row 1 label):
  FOLLOW ALONG

Icon row (horizontal, center-aligned, 24px gap):
  [Instagram icon] Instagram → @mehfilnights
  [YouTube icon] YouTube → Mehfil Nights
  [Mailchimp icon or envelope] Newsletter → monthly updates

(Icons: monochrome 20px line-art, color --mn-deep-olive.
 Labels: Plus Jakarta Sans 600, 14px, --mn-deep-olive.
 Real hyperlinks. Hover: color shifts to --mn-henna.)

── Row 3: Mailing address ──
Label:
  MAILING ADDRESS

Value (Plus Jakarta Sans 400, 15px, Body Text, line-height 1.7):
  Mehfil Nights
  [Street address, Suite XX]
  Seattle, WA [ZIP]

Small caption:
  For checks, physical documents, and IRS correspondence.
```

**Note on phone number:** PRD says no phone number. Honored. Small nonprofits don't need a phone line; email response within 24 hours is better service than an unanswered voicemail.

**Typography tokens:**
- Eyebrow → `font-accent` italic / 18px / `--mn-henna`
- Labels → `font-body` 600 / 13px / uppercase / letter-spacing 1px / `--mn-muted`
- Email value → `font-display` / 24px / `--mn-dark-text`
- Email caption → `font-body` 400 / 13px / italic / `--mn-muted`
- Social labels → `font-body` 600 / 14px
- Address → `font-body` 400 / 15px / line-height 1.7

**Component structure:** `<DirectContact email={email} social={social} address={address} />` — new. Social array: `[{platform, handle, url}]`.

**Mobile behavior:**
- Three rows stack vertically with 32px gap.
- Social icon row wraps to 2×2 if needed.
- Email value stays at 24px — keeps scannability.
- Address stays centered.

**Accessibility:**
- `<section aria-labelledby="direct-contact-heading">` with visually-hidden H2 "Direct contact information".
- Email is `<a href="mailto:hello@mehfilnights.org">` — clickable mailto link.
- Social icons are `aria-hidden="true"`; adjacent text carries meaning. Each social link has real accessible name ("Follow Mehfil Nights on Instagram").
- Mailing address uses `<address>` element.
- External social links: `target="_blank"` + `rel="noopener noreferrer"` + visually-hidden "(opens in new tab)" span.

**Design rationale:**
- *Cultural:* "Or reach us directly" — the option for a human who doesn't want to fill a form. Respect for reader preference.
- *Conversion:* Grant officers often want to email directly rather than submit a form. Surfacing `hello@mehfilnights.org` prominently catches that behavior.
- *Trust:* Mailing address in the Contact block (not just footer) is a grant-readiness signal. It commits the org to a physical location — required for certain state filings and for grants that require physical correspondence.

---

### 2.4 FAQ Preview — `<FAQSection />` (NEW)

**Role:** Deflect common questions. 4–6 accordion items that answer the most frequent pre-form questions.

**Layout:**
- Background: `--mn-warm-white`.
- Container: max-width 820px.
- Section padding: 96px top / 96px bottom desktop.
- Anchor: `id="faq"` — Hero deflection link scrolls here.
- Above the accordions: small eyebrow "Frequently asked" + H2 "Quick answers" (DM Serif Display / 32px).
- Accordion list below.

**`<FAQAccordion />` anatomy:**
- Each item is a bordered card:
  - Background: `--mn-ivory`.
  - 1px `--mn-light-line` border.
  - 8px border-radius (slightly tighter than other cards on site — these are compact).
  - 16px margin below each item.
- **Header row** (clickable):
  - Question text: Plus Jakarta Sans 600 / 16px / `--mn-dark-text`. Left-aligned.
  - Expand chevron: 16px monochrome SVG in `--mn-deep-olive`, right-aligned. Rotates 180° when open.
  - Padding: 20px 24px.
  - Hover state: background shifts to `--mn-sand` at 40% opacity.
- **Answer panel** (expanded):
  - Padding: 0 24px 24px 24px.
  - Answer text: Plus Jakarta Sans 400 / 15px / `--mn-body-text` / line-height 1.7.
  - Supports rich text: bold, italic, inline links (Trust Teal).

**FAQ content (placeholder — founder/Shubhangi to finalize):**

```
Eyebrow: Frequently asked
H2: Quick answers

Q1: When do you host events?
A: We typically host 6–8 Mehfils per year, concentrated in spring
and fall. The next upcoming event — and our past event archive —
is on our [events page](/events). Sign up for our newsletter
(footer) to get event announcements first.

Q2: How do I get tickets?
A: Every event has a "Get Tickets" button on its detail page, which
links out to our ticketing partner (Eventbrite or similar). Tickets
typically go on sale 6–10 weeks before each event. We keep prices
below $35 — always.

Q3: I'm a musician — how do I apply to perform?
A: Fill out the form above with "Artist submission" as your subject.
You'll need to share a link to your music (SoundCloud, YouTube,
Spotify, or website) and a short bio. We review submissions quarterly
and respond to every applicant. We prioritize independent South
Asian artists, with intentional support for women and non-binary voices.

Q4: How can I volunteer?
A: Fill out the form above with "Volunteer" as your subject. We'll
follow up about our next volunteer orientation. Most volunteer shifts
are 3 hours at a single event — ticketing, setup, sound, or hospitality.

Q5: Is Mehfil Nights a 501(c)(3)?
A: Yes. We're registered with the IRS. Our EIN is [XX-XXXXXXX].
All donations are tax-deductible. See our [Impact page](/impact)
for our annual reports and financial disclosures.

Q6: Can I book Mehfil Nights for a private event?
A: We offer limited private/At-Home event services as a separate
service (not through our 501(c)(3) nonprofit). For private event
inquiries, fill out the form above with "Private event (At-Home)"
as your subject, and we'll follow up with availability and pricing.
```

**Typography tokens:**
- Eyebrow → `font-accent` italic / 18px / `--mn-henna`
- H2 → `font-display` / 32px
- Question → `font-body` 600 / 16px / `--mn-dark-text`
- Answer → `font-body` 400 / 15px / line-height 1.7 / `--mn-body-text`
- Inline links → `--mn-trust-teal` / underline on hover

**Component structure:**
- `<FAQSection items={faqs} />` — wraps accordions.
- `<FAQAccordion question answer />` — child. Uses native `<details>` + `<summary>` for accessibility (no JS required for open/close). CSS handles styling.

**Accessibility benefits of `<details>` / `<summary>`:**
- Native keyboard support (Enter or Space toggles).
- Screen readers announce as "disclosure widget" with open/closed state.
- No ARIA needed (the native semantics are correct).
- Works without JavaScript.

**Mobile behavior:**
- Accordions full-width.
- Question + chevron stay aligned horizontally.
- Answer padding reduces to 0 20px 20px 20px.
- Font sizes unchanged — readability priority.

**Accessibility:**
- `<section aria-labelledby="faq-heading">` with real `<h2>` ("Quick answers").
- Each `<details>` contains a `<summary>` (the question) and the answer body.
- Questions use `<span>` inside `<summary>` — screen readers announce the text correctly.
- Chevron SVG is `aria-hidden="true"`.
- No JavaScript required for interaction — meets "works without JS" accessibility best practice.

**Design rationale:**
- *Cultural:* FAQ voice matches Mehfil Nights overall brand voice — plainspoken, unhurried, respectful of reader's time. No cute questions. No marketing copy.
- *Conversion:* Deflecting form submissions via FAQ is a net positive — fewer generic emails in the founder's inbox means faster response to real questions. The 24-hour response commitment is only honorable if volume is manageable.
- *Trust:* The `[Events page]` and `[Impact page]` inline links inside answers route the user to the right destination without requiring them to bounce back to the contact form. Seamless cross-linking is a maturity signal.

---

### 2.5 Closing CTAs — `<ContactClosingCTAs />` (NEW)

**Role:** Give the user who finished /contact two exits: check events or donate. Intentional to NOT have the full "closing CTA band" pattern from /about and /impact — this is a utility page; no Deep Olive closing moment needed.

**Layout:**
- Background: `--mn-ivory`.
- Container: max-width 880px, centered.
- Section padding: 72px top / 72px bottom desktop.
- Two smaller tiles side-by-side on desktop (2-column, 24px gap), stacked on mobile.

**Tile 1 — Events (`<CTATile />`):**
- Background: `--mn-sand`. 1px `--mn-light-line` border. 12px radius. 32px padding.
- Small label (11px / weight 700 / letter-spacing 2px / `--mn-muted`): WHAT'S NEXT
- H3 (DM Serif Display / 22px / `--mn-dark-text`): Come to a Mehfil.
- Body (Plus Jakarta Sans 400 / 14px / `--mn-body-text` / line-height 1.6): Three evenings on the calendar. Floor cushions, acoustic instruments, room built for listening.
- CTA (Teal button, size="sm"): [ See upcoming events → ]

**Tile 2 — Donate:**
- Background: `--mn-sand`. Same card structure as Tile 1.
- Small label: HELP US HOST THE NEXT ONE
- H3: Become a donor.
- Body: Every mehfil is paid for by people who believe in what they hear. Your gift keeps ticket prices low and artists paid.
- CTA (Saffron button, size="sm"): [ Donate now → ]

This IS the one Saffron moment on /contact. Second tile on the page. Page stays donate-unobtrusive — the Saffron appears as an option at the end, not a demand.

**Typography tokens:**
- Label → `font-body` 600 / 11px / uppercase / letter-spacing 2px / `--mn-muted`
- H3 → `font-display` / 22px / `--mn-dark-text`
- Body → `font-body` 400 / 14px / line-height 1.6 / `--mn-body-text`

**Component structure:** `<ContactClosingCTAs />` — new; uses two `<CTATile />` child components. `<CTATile />` is worth making reusable — could surface on /events empty state or other utility pages.

**Mobile behavior:**
- Tiles stack vertically, 16px gap.
- CTAs become full-width inside tiles.
- H3 stays 22px.

**Accessibility:**
- `<section aria-labelledby="contact-closing-heading">` with visually-hidden H2 "Where to go next".
- Each tile is `<article>` with `<h3>`.
- CTAs: Saffron button has `aria-label="Donate to Mehfil Nights"`. Teal button's accessible name is its visible text.

**Design rationale:**
- *Cultural:* "Come to a Mehfil" — direct, inviting, unadorned.
- *Conversion:* Two-tile closing is proportional to the page's utility tone. A big Deep-Olive closing band would feel mismatched on a contact page. Small tiles = small ask, appropriate to context.
- *Trust:* Saffron appears exactly once on this page (closing tile) — preserves scarcity rule across the whole site.

---

## 3. Section Rhythm — the Full Scroll

| Section | Background | Approx. height | Weight | Key interactive |
|---|---|---|---|---|
| Hero Band | Ivory | 36vh (~320px desktop) | 60% | FAQ anchor link |
| Contact Form | Sand (section) / Warm White (card) | ~780px (with no dynamic fields expanded) / ~1100px (with dynamic fields) | 60% | Form submit (Turmeric) |
| Direct Contact | Ivory | ~400px | 60% | Mailto, social, address |
| FAQ | Warm White | ~660px (6 items closed) | 60% | Accordion toggles |
| Closing CTAs | Ivory | ~320px | 60% | Teal + Saffron tiles |

Zero Deep Olive moments — intentional. Page is Ivory-dominant (60%) with one Sand-section (30%) framing the form, and 10% budget spent on Saffron (closing tile), Turmeric (form submit), and Teal (most action links). Feels warm, calm, utility-first.

---

## 4. Component Inventory (for Rishi)

**New components for /contact:**
- `<ContactHero />` — /contact only
- `<ContactForm />` — wraps form state
- `<FormField />` — reusable field primitive (label + input + error state)
- `<SubjectSelector />` — dropdown that drives dynamic field reveal
- `<DynamicFieldsForArtist />` — conditional field group
- `<DynamicFieldsForVolunteer />` — conditional field group
- `<DynamicFieldsForPrivateEvent />` — conditional field group
- `<FormSuccessCard />` — success state replacement for form card
- `<DirectContact />` — email / social / address block
- `<FAQSection />` — wraps accordions
- `<FAQAccordion />` — individual `<details>`/`<summary>` accordion
- `<ContactClosingCTAs />` — wraps two tiles
- `<CTATile />` — reusable tile (can also appear on /events empty state)

**Reused:**
- `<Section />`, `<Container />`, `<Button />`, `<Header />`, `<Footer />`

**Libraries:**
- **React Hook Form** for form state + validation (per PRD §8 week 2).
- **Server actions** for submission (Next.js App Router native).
- Email send: **Resend** (free tier up to 100 emails/day; no setup overhead) OR **Mailchimp transactional** if already on Mailchimp for newsletter.

---

## 5. Breakpoints Summary

- **Mobile:** <768px — all sections stack. Hero centered. Form card padding 32px 24px. Dynamic fields animate smoothly. Direct Contact rows stack. FAQ full-width. Closing CTAs stack.
- **Tablet:** 768–1024px — Same as mobile, with slightly more breathing room. Form card stays max 720px. Closing CTAs stay 2-col but tiles narrower.
- **Desktop:** >1024px — Form max-width 720px centered within 880px section. Closing CTAs 2-col, 24px gap.

---

## 6. Accessibility Summary — Form-Specific

This section is the most interactive page on the site. Accessibility specifics:

1. **Every input has a real `<label for>` element.** No placeholder-as-label.
2. **Required fields:** `aria-required="true"` + visible asterisk + programmatic validation.
3. **Error announcements:** `aria-invalid="true"` + `aria-describedby` pointing to error message.
4. **Dynamic field reveal:** `aria-live="polite"` region announces "4 additional fields now visible" when subject changes.
5. **Submit button:** `aria-disabled="true"` during submission + spinner with `role="status"`.
6. **Success state:** Live region announces success; focus moves to the success H3.
7. **Error state:** Focus moves to first invalid field.
8. **Multi-select checkboxes** (volunteer interests): `<fieldset>` with `<legend>`.
9. **Date input** (private event): native `<input type="date">` — accessible by default on modern browsers; provides native calendar.
10. **Honeypot field** for spam: `visibility: hidden` + `tabindex="-1"` + `aria-hidden="true"` + off-screen.
11. **Keyboard nav:** all fields tab-reachable in DOM order. Dynamic fields slot into tab order naturally as they appear.
12. **Prefers-reduced-motion:** animations (field reveal, submit spinner) reduce to instant state changes.
13. **FAQ accordions:** native `<details>` / `<summary>` — no custom keyboard handling needed.
14. **Skip link:** inherited from global shell. Targets `<main id="main">`.

---

## 7. Placeholder TODOs (for founder + PM + Rishi)

- **Email address** — confirm `hello@mehfilnights.org` exists and is monitored. If different email, swap throughout page.
- **Social handles + URLs** — founder confirms Instagram, YouTube, newsletter URLs.
- **Mailing address** — founder provides real physical address. Can be a P.O. Box for privacy.
- **EIN** — appears in FAQ Q5. Founder provides.
- **FAQ content review** — Shubhangi + founder proofread all 6 Q&As. Confirm any linked pages (/events, /impact) are accurate.
- **Form backend** — founder + Rishi choose Resend vs Mailchimp transactional. Configure DKIM/SPF for deliverability.
- **Subject dropdown options** — final list: General / Volunteer / Artist submission / Private event / Partnership-Press. Confirm founder.
- **Privacy policy link** — `/privacy` page is a v1 deliverable per PRD §4 ("Privacy / Terms" row). Link from under the form to that page.
- **24-hour response commitment** — founder confirms they'll honor it. If not, soften to "within a few business days".

---

## 8. What I'd Push Back On

1. **FAQ placement.** I chose below-form with a deflection link in the hero. If real usage data (30-day post-launch) shows high form volume with low-quality questions (mostly FAQ-answerable), we should reconsider and put FAQ above the form. Monitor in GA4 + email inbox triage.

2. **Private event subject on the .org page.** The decisions log + PRD §5 deferrals note At-Home bookings are a commercial service living on .com. Including "Private event (At-Home)" as a subject here conflicts slightly with that separation. My reasoning for keeping it: if visitors arrive at .org looking for private events, we route them via a Contact form rather than losing them. The founder can decide on a case-by-case basis whether to say yes. If this creates confusion, we can rename the subject to "Private event inquiry — you'll be directed to our private booking page" or simply remove the option and let it fall under "General inquiry." Founder's call.

3. **Six FAQ items might be too many.** If actual support-email volume settles to 2–3 recurring questions, trim to 4 items. A very long FAQ reads as "lots of hidden complexity" — counterproductive.

4. **Volunteer interest areas should be ranked in order of actual need.** I listed 6 checkboxes. If the org genuinely only needs help with 3 things, list 3. Over-listing creates the impression of disorganization.

5. **The form submission success state could be richer.** I kept it simple — "thanks, we got your note, you'll hear back within 24 hours." A more sophisticated version could include: expected response time variance by subject type ("Artist submissions take 2–4 weeks since we review quarterly") OR a preview of the message they just sent. For v1, simple is correct. Revisit if user feedback asks for it.

6. **No phone number decision — reaffirmed.** PRD is right. Do not add a phone number in v2 unless volume justifies a real phone line. Small nonprofits with unmanned phone lines damage trust more than they help.
