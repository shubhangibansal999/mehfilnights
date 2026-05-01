# Mehfil Nights — UI Design Reference for GoDaddy Rebuild

> Purpose: A complete, self-contained reference you can use while rebuilding the website in GoDaddy's website builder. Every color, font, layout, and copy block from the existing v1 design — captured here so you can paste/match in any visual editor.

**Companion files:**
- **`out/index.html` and the rest of `out/`** — the actual rendered site as plain HTML. Open `out/index.html` in any browser (double-click it) to see exactly what you're recreating. Take screenshots of each page to import into GoDaddy as design references.
- **`docs/design/homepage-v1.md` + 5 page specs in `docs/design/`** — Saloni's per-page wireframes with rationale.

---

## How to use this in GoDaddy

1. **Open the static HTML in your browser:** `open "/Users/shubhangihome/Documents/Claude/Mehfil Code/out/index.html"` — see the actual rendered page
2. **Take screenshots** of each page on your laptop (Cmd+Shift+4 on Mac)
3. **Match colors in GoDaddy:** copy hex codes from §Colors below into GoDaddy's color picker
4. **Match fonts in GoDaddy:** find equivalents from §Typography below in GoDaddy's font menu
5. **Paste copy directly** from §Page-by-Page Copy below
6. **Match layouts** using GoDaddy's section blocks, referencing screenshots

---

## §Colors — paste these hex codes into GoDaddy

### Cultural primaries
| Name | Hex | Use |
|---|---|---|
| **Saffron** | `#C17817` | **Donate buttons ONLY.** Never use anywhere else — it's the brand's "scarcity" color that makes donate visually irresistible. |
| **Deep Olive** | `#2C3A2E` | Dark intimate sections (hero, footer, donate band). The "night moment" color. |
| **Turmeric Gold** | `#D4A843` | Event tickets, secondary accent buttons, decorative line art |
| **Sage Green** | `#7A9A7E` | Impact metrics, mission-language highlights |
| **Henna** | `#8B4A2B` | Hover states, subtle dark accents |

### Universal trust palette
| Name | Hex | Use |
|---|---|---|
| **Ivory** | `#F5F0E8` | **Default page background** (60% of the site) |
| **Warm White** | `#FDFAF5` | Reports, grant pages, "story" sections |
| **Trust Teal** | `#3B7A7A` | Links, info-action buttons (About, Mission) |
| **Sand** | `#E6DCCB` | Card backgrounds, soft tile sections |
| **Clay** | `#B89B7E` | Borders, soft accents |
| **Linen** | `#EDE6DA` | Founder-blurb-like quiet sections |

### Neutrals (text + structure)
| Name | Hex | Use |
|---|---|---|
| **Dark Text** | `#3A3632` | Headlines on light backgrounds |
| **Body Text** | `#5C564F` | Paragraph copy |
| **Muted** | `#918A82` | Captions, partner names, fine print |
| **Light Line** | `#DDD5C8` | Dividers, card outlines |

### The 60-30-10 rule (don't break this)
- **60% Ivory surfaces** — trust, readability, breathing room
- **30% Deep Olive + Sage** — cultural depth, intimate "night" sections (hero, footer, donate band)
- **10% Saffron + Turmeric accents** — urgency, action, celebration

---

## §Typography — find these (or close matches) in GoDaddy

| Role | Font | Where used | GoDaddy substitute if exact unavailable |
|---|---|---|---|
| **Display** (headlines) | **DM Serif Display** (weight 400) | H1, H2, all major headlines | Playfair Display, Cormorant Garamond, or any high-contrast serif |
| **Accent** (italic subtitles, pull quotes) | **Instrument Serif** (italic 400) | Eyebrow text above headlines, taglines, founder quote | Cormorant Italic, Lora Italic, or any old-style italic serif |
| **Body** (everything readable) | **Plus Jakarta Sans** (300, 400, 600, 700) | Paragraphs, nav, buttons, forms | Inter, Manrope, Karla, DM Sans — any modern humanist sans |

GoDaddy's font picker should have most of these directly; if not, the substitutes in column 4 work.

### Type scale
| Element | Size | Line height | Weight |
|---|---|---|---|
| H1 (Hero headline) | 40-64px responsive | 1.1-1.15 | 400 (display serif) |
| H2 (Section headlines) | 32-44px | 1.2 | 400 (display serif) |
| H3 (Card titles) | 22-28px | 1.3 | 600 |
| Subtitle (italic accent) | 18-24px | 1.4 | 400 italic |
| Body | 16-17px | 1.75 | 400 |
| Nav / Buttons | 14px | — | 600, letter-spacing 0.5px, often UPPERCASE |
| Caption / fine print | 12-14px | 1.5 | 400 |

---

## §Spacing rules (the 8px grid)

| Token | Value | When to use |
|---|---|---|
| xs | 8px | Tight gaps inside cards |
| sm | 16px | Element gaps inside a section |
| md | 24px | Paragraph spacing |
| lg | 32px | Sub-section internal padding |
| xl | 48px | Card-level padding, mobile section padding |
| 2xl | 64px | Section padding on tablet |
| **3xl** | **80px** | **Vertical space between major sections (desktop)** |

**Max content width: 1100px.** Don't let text columns get wider — readability dies past ~75 characters per line.

---

## §Buttons — 5 styles, used by job

| Variant | Background | Text | Reserved For |
|---|---|---|---|
| **Saffron** | `#C17817` | white | **Donate only** — appears 4× site-wide max |
| **Turmeric Gold** | `#D4A843` | dark text | Event tickets, "See events" CTAs |
| **Trust Teal** | `#3B7A7A` | white | Mission, About, info-related actions |
| **Outline** | transparent | deep olive | Reports, secondary actions |
| **Soft Sand** | `#E6DCCB` | dark text | Volunteer, low-pressure tertiary CTAs |

**Specs:** 14px text, weight 600, 6px border-radius, ~14px×32px padding, 2px border (matching bg color), uppercase, letter-spacing 0.5px.

---

# §Page-by-Page Copy

## HOME (`/`)

### Hero — Deep Olive background

**Eyebrow** (Turmeric italic): *A mehfil — an intimate gathering for music, poetry, and art.*

**Headline H1** (DM Serif Display, ivory): South Asian live music, in the room next door.

**Body** (Plus Jakarta Sans, ivory at 85% opacity): Mehfil Nights is a Seattle 501(c)(3) building community through South Asian live music — supporting independent artists, welcoming every neighbor, and carrying a centuries-old tradition into the Pacific Northwest.

**Buttons:** [Support Our Mission] (Saffron) · [See Upcoming Events →] (Turmeric)

### Impact Snapshot — Ivory background

**Eyebrow** (italic): *The mehfil, by the numbers.*

Four large sage-green stats (animated count-up on scroll):
1. **2,400+** — Community members gathered (Since our first Mehfil in 2020)
2. **45** — Artists supported (Local, national, and international — across every South Asian tradition)
3. **24** — Mehfils hosted (In living rooms, coffee shops, concert halls, and neighborhood venues)
4. **480** — Volunteer hours given (Powered by Mehfil-ites who keep ticket prices low and quality high)

> **TODO(founder):** confirm actual numbers — these are realistic placeholders for a small Seattle nonprofit's first 5 years.

### What is a Mehfil? — Warm-white background, 2-column

Headline: **Where music sits beside you.**

Two paragraphs of cultural storytelling — Lahore, Lucknow, Noor Jehan, Arijit. Written for grant reviewers who don't know the word.

### Three Programs — Sand background, 3-card grid

Headline: **Three ways we serve.**

| Card | Title | Description |
|---|---|---|
| 🎤 | **Community** | Free and donation-based mehfils across Seattle neighborhoods, building connection one room at a time. |
| 🎵 | **Artists** | Paid performance opportunities for emerging and established South Asian musicians at every career stage. |
| 📚 | **Education** | Workshops, listening sessions, and residencies that make South Asian musical traditions accessible to all. |

### Upcoming Events — Deep Olive background

Headline: **Upcoming Mehfils.**

3 event cards (sand bg, dark text, turmeric Get Tickets buttons). Currently 2 sample upcoming events (Ghazal Evening, Diwali Mehfil) — replace with real GoDaddy event URLs.

### Partner Strip — Ivory background, quiet

Headline: **In partnership with.**

Text-only row (until logos uploaded): KEXP · Benaroya Hall · Chateau Ste. Michelle · Pratham USA · Town Hall Seattle · Beats of Washington

### Founder Blurb — Linen background

Decorative turmeric oil-lamp (diya) line illustration, NO portrait.

Quote (Instrument Serif italic, first person): *"We started Mehfil Nights because the music we grew up with — the music our parents danced to and our grandparents wrote — was getting harder to find in our own city. So we made a room for it. You're invited."*

— Founder, Mehfil Nights

### Newsletter Signup — Warm-white background

Headline: **Get the next mehfil first.**

Body: One email, one announcement, no spam. Unsubscribe in one click.

[email input field] [Subscribe] (Turmeric button)

### Donate Band — Deep Olive background, full-width closer

Headline (DM Serif, ivory): **Help us keep the room open.**

Body (ivory): Every dollar pays an artist, books a venue, and welcomes another neighbor.

[Donate Now] (Saffron — 4th and final Saffron of the site)

Fine print (ivory at 60%): Mehfil Nights is a 501(c)(3) nonprofit. EIN: XX-XXXXXXX. *(replace XX-XXXXXXX with real EIN)*

---

## ABOUT (`/about`)

### Sections in order:
1. **Hero band** — short warm intro: *"We are an arts nonprofit, but we are also a room. Welcome in."*
2. **Mission · Vision · Values** — three short blocks, sage accents
3. **Our Story** — narrative, 3 chapters: founding (2020), what we learned (2022), where we're going (2026+)
4. **Three programs recap** — same Community/Artists/Education trio as homepage but linked deeper
5. **Our Commitments** — *"Pay artists fairly · Keep tickets affordable · Be transparent about our money · Show up for the community"* (replaces team section since board publication is pending)
6. **501(c)(3) Trust block** — Sand bg card with EIN, founding year, IRS status
7. **Press strip** — 3 placeholder mentions (TODO: real ones)
8. **Closing CTA** — [Support Our Mission] (Turmeric, not Saffron — Saffron reserved for /donate) + [Contact Us] (Teal)

---

## EVENTS (`/events`)

### Hero band — short
"Coming up at Mehfil Nights."

### Upcoming Events — Ivory bg, list view
- Ghazal Evening · Oct 18 · Town Hall Seattle
- Diwali Mehfil · Nov 8 · The Royal Room

If empty: *"The next mehfil is being planned — subscribe for alerts." [Email signup]*

### Past Events Archive — Deep Olive bg, compact cards
- Monsoon Classical Mehfil · May 30 · Chapel Performance Space (sold out, 78 attendees)

This archive is critical for grant proof — keep it growing.

---

## EVENT DETAIL (`/events/[slug]`)

### Per-event page sections:
1. **Event hero** — Deep Olive bg with event title (DM Serif), date+venue meta, [Get Tickets] (Turmeric) button
2. **Description** — Warm-white bg, 2-4 paragraphs of the long-form event description
3. **Artists** — Names + simple list (richer artist cards = v2)
4. **Venue Details** — Address, neighborhood, accessibility notes (doors time, seating, ADA), text-only map link
5. **Past-event reflection** — only shown if event already happened: metrics row + audience quote
6. **Related Events strip** — 3 cards
7. **JSON-LD Event schema** — invisible, for Google + grant scrapers

---

## DONATE (`/donate`) — primary conversion page

### Sections:
1. **Hero** — Deep Olive bg, headline ("Your gift opens the next room"), case-for-support paragraph, [Donate $X] (Saffron, big — Saffron #3 of 4 site-wide)
2. **Gift Table** — 4 tiers on Sand bg cards, $100 highlighted as recommended:
   - **$25** — Covers chai for one mehfil
   - **$100** — Pays one artist's travel honorarium *(highlighted)*
   - **$500** — Underwrites sound + lighting for a whole show
   - **$2,500** — Sponsors an entire mehfil (your name on the door)
   Buttons: [Donate $X] for each tier (Turmeric — these scroll, not commit)
3. **PayPal embed container** — Sand-framed Warm-White card. *"Payments processed securely through PayPal"* — replace with real PayPal hosted button when ready
4. **Tax-deductibility block** — Trust Teal accent on Ivory: *"Your gift is tax-deductible to the full extent of the law. Mehfil Nights is a 501(c)(3) nonprofit. EIN: XX-XXXXXXX."*
5. **Other Ways to Help** — 4 tiles linking to Contact (Volunteer / Sponsor / Corporate Match / In-Kind)
6. **Closing band** — Deep Olive, [Donate Now] (Saffron — #4 and final)

---

## IMPACT (`/impact`) — primary grant-reviewer landing

### Sections:
1. **Hero band** — short statement of impact philosophy
2. **Expanded Stat Cards** — same 4 numbers from homepage, larger, with year-over-year trend + methodology footnote per card
3. **Vertical Milestone Timeline** — 4-6 chronological key moments (founding, first sold-out show, first grant, first artist residency, etc.)
4. **3 Impact Stories** — alternating photo sides on desktop, stacked on mobile:
   - Artist story (200 words + 1 quote)
   - Audience story (200 words + 1 quote)
   - Volunteer story (200 words + 1 quote)
5. **Partner Recognition Groups** — Venue Partners / Community Partners / Funders (text-only until logos uploaded)
6. **Annual Report PDF Download** — *"Download our 2025 Impact Report (PDF, 1MB)"* (Outline button) — replace placeholder with real PDF
7. **Trust block** — 501(c)(3) + EIN
8. **Closing CTA band** — [Donate] (Turmeric, not Saffron) + [Contact Us] (Teal)

---

## CONTACT (`/contact`)

### Sections:
1. **Hero** — warm greeting + nudge to FAQ below
2. **Contact Form** — Sand bg
   - Subject dropdown: General · Volunteer · Artist Submission · Private Event
   - Dynamic fields by subject:
     - General: Name, Email, Message
     - Volunteer: + Interest area (multi-select: Events / Tech / Marketing / Outreach / Fundraising)
     - Artist Submission: + Genre, Location, Music link, Bio textarea
     - Private Event: + Event date, Guest count, Location
   - [Send Message] (Turmeric — submission is not a donation, preserves Saffron scarcity)
3. **Direct Contact** — email + Instagram + LinkedIn + YouTube (no phone — small nonprofit, not appropriate yet)
4. **FAQ Accordion** — 4-6 deflection questions:
   - When do you host events? (Approximately monthly, primarily fall through spring)
   - Where do tickets go on sale? (Linked from /events to mehfilnights.com)
   - How can I become a volunteer? (Use this form, subject "Volunteer")
   - Is my donation tax-deductible? (Yes — 501(c)(3))
   - Can you perform at a private event? (Yes — see /at-home, deferred to v2; for now use this form)
5. **Closing CTA tiles** — [Donate] (Turmeric) + [See Events] (Outline)

---

## §Layout principles to honor

1. **Single H1 per page**, H2 per section, H3 inside cards
2. **Generous whitespace** — at least 80px (3xl) between major sections on desktop
3. **Saffron used 4× max site-wide** — Header donate · Homepage donate band · Donate hero · Donate closer. Nothing else.
4. **Mobile-first** — touch targets at least 44×44px, single-column stack, donate CTA stays accessible
5. **Accessibility** — alt text on every image; semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`); contrast 4.5:1 minimum

---

## §If you change layouts in GoDaddy, ask yourself

For every design choice the brand spec demanded, the question to test:
1. Does it drive donations?
2. Does it honor cultural heritage?
3. Does it build donor trust?

If the answer to all three is no — cut it.

---

## §Files in this kit

- `docs/design-reference.md` — this file (THE spec)
- `out/` — actual rendered HTML pages (open `out/index.html` in any browser)
- `docs/design/homepage-v1.md` — Saloni's full homepage wireframe
- `docs/design/about-v1.md` — About page spec
- `docs/design/events-v1.md` — Events list + detail spec
- `docs/design/donate-v1.md` — Donate page spec
- `docs/design/impact-v1.md` — Impact page spec
- `docs/design/contact-v1.md` — Contact page spec

---

*Built from Mehfil Nights brand guidelines v3 (April 2026). Update this file if the brand evolves.*
