# PRD: Mehfil Nights .org — Website v1 (Launch Scope)
**Status**: Draft — Ready for Review
**Author**: Vansh (PM)  **Last Updated**: 2026-04-21  **Version**: 1.0
**Target Launch**: 3 weeks from dev kickoff
**Stakeholders**: Founder, Shubhangi (PM/delivery), Dev (vibe-coder founder + Claude), Design (inline spec)

---

## 1. Problem Statement

Mehfil Nights is a Seattle-based 501(c)(3) that currently lives at **mehfilnights.com** — a Squarespace site built for a commercial/events audience. It does not work for the org's new reality:

- **Grant reviewers** visiting the site cannot find the mission, 501(c)(3) status, EIN, board, programs, or quantitative impact within 30 seconds. Most bounce.
- **Individual donors** see a PayPal button buried under marketing copy, with no "case for support," no tax-deductibility language, and no gift table explaining what a donation buys.
- **Community members** land on a site that reads as a private-event booking service rather than a nonprofit arts org with a clear calendar, mission, and way to engage.
- **Artists** are routed through bit.ly links to Google Forms — no polish, no trust, no org-level signal.

**Evidence (qualitative, stated in spec):**
- Grant threshold requirements ($5–10K+) explicitly require board visibility, 501(c)(3) disclosure, and impact data — currently absent on .com.
- Current "DONATE NOW" button is a raw PayPal link with zero donor education around it.
- Artist/volunteer/private-event flows all depend on third-party bit.ly redirects, which signals amateur and breaks brand continuity.
- No programs architecture exists to house the three actual programs (Mehfil Nights, Residency, Community/Youth) funders evaluate.

**Cost of not solving:** lost grant cycles (each missed cycle = ~$5–50K opportunity), donor drop-off at the payment step, and a widening credibility gap between what the org does and what the web presence communicates.

---

## 2. Goals & Success Metrics

Targets are calibrated for a small nonprofit launching its first .org presence — realistic, not aspirational.

| Goal | Metric | Baseline (from .com) | v1 Target (90 days post-launch) | Measurement |
|------|--------|----------------------|----------------------------------|--------------|
| Drive donations | Online donations $ / month | Unknown / minimal | $1,500–$3,000/mo avg | Stripe or PayPal dashboard |
| Donation conversion | % of /donate visitors who complete | Unknown | ≥ 2.5% | GA4 funnel |
| Grant readiness | % of grant-reviewer checklist items visible on site | ~30% | 100% | Manual audit (see §Appendix) |
| Build email list | Newsletter signups | Near-zero | 150+ total, 50+/mo steady | Mailchimp / provider |
| Sell event tickets | Outbound ticket-link clicks | Unknown | 200+/mo during active event cycles | GA4 outbound event |
| Credibility signal | Lighthouse Accessibility score | N/A | ≥ 95 | Lighthouse CI |
| Credibility signal | WCAG 2.1 AA automated-scan pass | N/A | 0 criticals, <5 moderates | axe / Pa11y |

**Anti-metrics** (watch, don't optimize): pageviews, session duration on homepage. Vanity for this audience.

---

## 3. Non-Goals (explicitly NOT doing in v1)

- No blog / editorial CMS
- No native video or audio player infrastructure (embed YouTube/Spotify links only, don't host)
- No full-text search
- No multilingual / i18n
- No user accounts, logins, or gated content
- No in-app ticket purchase (link out to Eventbrite / existing ticket URL)
- No Meta Pixel on launch (GA4 only — reduce complexity and privacy-policy surface area)
- No mega-menu. Flat nav only in v1.
- No calendar UI (list view of upcoming events is sufficient)
- No automated recurring-donation infrastructure beyond what Stripe/PayPal provides out of the box
- No custom illustrations or photography shoots — use existing assets only

---

## 4. MUST-SHIP v1 Pages

Six pages (plus root-level legal). Each one earns its slot by serving a specific audience.

| Page | Route | Primary Audience | Why it ships in v1 |
|------|-------|------------------|---------------------|
| **Home** | `/` | Grant reviewers, first-time visitors | The front door. Mission above fold, 3 program snapshots, upcoming events, partner logos, founder story blurb, donate CTA, newsletter signup. If this page is wrong, nothing else matters. |
| **Mission / About** | `/about` | Grant reviewers, institutional funders | Mission/Vision/Values, Our Story, Team + Board/Advisory list, 501(c)(3) + EIN. Board visibility is a grant threshold requirement — non-negotiable. |
| **Events — list** | `/events` | Community, ticket buyers | Upcoming + recent-past events pulled from Sanity. List view, not calendar. |
| **Events — detail** | `/events/[slug]` | Community, ticket buyers | Date, venue, artists, description, ticket outbound link, photos. JSON-LD Event schema (SEO). |
| **Contribute / Donate** | `/donate` | Donors, grant officers verifying giving flow | Case for support, gift table, Stripe or PayPal embed, tax-deductibility + EIN, "Other ways to help" (volunteer, sponsor, private events — as *links* to Contact, not full forms). |
| **Impact / Transparency** | `/impact` | Grant reviewers, major donors | Stat cards (audience, artists, events, volunteer hours), milestones timeline, 2–3 impact stories, downloadable PDF one-pager (even if hand-made). |
| **Contact** | `/contact` | Community, artists, partners, volunteers | Single page, four intent-based forms (or one form with a subject dropdown — see §6 user stories). Replaces all bit.ly redirects. |
| **Privacy / Terms** | `/privacy`, `/terms` | Legal, grant compliance | Boilerplate, generated. Needed for donation flow + newsletter. |

**Global components in v1:** Header (logo, nav: Home, About, Events, Impact, Contact, **Donate** as saffron button), Footer (sitemap, 501(c)(3) + EIN, newsletter field, socials, address), newsletter signup block, accessibility skip link.

---

## 5. DEFERRED to v2 (and why)

Being ruthless here. Founder will push back on some of these — hold the line.

| Spec item | Deferred because | Revisit when |
|-----------|------------------|--------------|
| **Programs section (3 dedicated subpages)** | One consolidated "Programs" section on the homepage + /about covers 80% of grant-reviewer need. Three full subpages = 2 weeks of content work alone. | After v1 traffic shows program-page demand, or a grant explicitly requires it |
| **Mehfil Music Archive** | Cultural-preservation story is real but requires media ingestion, player infra, metadata schema. Not a v1 conversion driver. | Q3 2026 — can anchor a NEA / 4Culture grant app |
| **Meet Our Artists directory** | 11 artists × rich profile pages = content bottleneck. Put artist *names + photos* on Events and Homepage instead. | After events CMS is stable and CMS editor is comfortable |
| **At-Home / Private events booking form** | This is a *commercial* service. Mehfilnights.com still exists — link there for now. Keeping it off .org clarifies nonprofit identity. | Only if founder confirms At-Home revenue funds the 501(c)(3) |
| **Mehfil-ites community hub** | No defined feature set. Community lives on Instagram today. | Never, unless we validate demand |
| **Newsletter archive page** | Mailchimp hosts past campaigns. Link out from footer if needed. | Never, unless SEO signal appears |
| **Advanced search / filters** | No content volume justifies it. ~6 upcoming events + 11 artists = browse, not search. | When archive launches |
| **Multilingual (Hindi / Urdu / Punjabi)** | Grants don't require it. Adds 2–3x content ops overhead. | Post-v2, if partner org requests |
| **Gallery page** | Homepage hero + event-detail photos deliver 90% of the visual proof. A standalone gallery is cosmetic in v1. | Alongside archive |
| **Press & Media page** | Only 3–5 items exist. Surface them as a strip on /about instead. | When press hits reach 10+ items |
| **Partners & Supporters standalone page** | Logo strip on Home and About covers the grant-reviewer signal. | When funder count > 15 |
| **Blog / editorial** | Huge content-calendar commitment. Founder has no editorial bandwidth. | Only if a content-marketing hire or volunteer owns it |
| **Mega-menu navigation** | Flat nav is faster to build, more accessible, and matches v1 page count (6 pages). | When page count > 12 |
| **Meta Pixel, advanced retargeting** | GA4 alone covers measurement needs; Pixel adds cookie-consent/privacy-policy complexity. | Only if paid social becomes a channel |
| **Event calendar grid view** | List view, sorted by date, is clearer for 2–6 events/quarter. | When events > 8/quarter |
| **Electronic Press Kit PDF** | Founder can provide on request via email until press volume justifies. | When press requests come in unprompted |

---

## 6. User Stories for v1

### Donor — "Priya, 34, Seattle, attended two Mehfils, wants to give"
- As a donor, I want to see the 501(c)(3) status and EIN clearly, so I trust my donation is tax-deductible.
- As a donor, I want to see exactly what my $50 or $500 does (gift table), so I feel my contribution has impact.
- As a donor, I want a donation flow that takes <60 seconds and works on mobile, so I finish instead of bouncing.
- **Acceptance:** Donate CTA visible on every page; /donate loads in <2s; Stripe/PayPal form accepts $25–$2,500 one-time; confirmation email sent.

### Grant Officer — "Marcus, program officer at a regional arts foundation"
- As a grant officer, I want to find the mission, board list, program descriptions, and impact data within 3 clicks, so I can complete initial due diligence.
- As a grant officer, I want to download an impact summary PDF, so I can share with my committee.
- As a grant officer, I want to verify accessibility compliance visibly (contrast, alt text), so I can check the grant's accessibility requirement.
- **Acceptance:** Grant-readiness checklist (§Appendix) is 100% satisfied on v1; Lighthouse A11y ≥ 95; impact PDF linked from /impact.

### Community Member — "Anjali, 28, discovered Mehfil on Instagram"
- As a community member, I want to see upcoming events with dates, venues, and ticket links, so I can decide whether to attend.
- As a community member, I want to sign up for email updates in one click, so I hear about the next show.
- **Acceptance:** /events shows next 3+ upcoming events; newsletter signup in footer works, sends confirmation.

### Artist-Applicant — "Farhan, emerging singer-songwriter in Bellevue"
- As an artist, I want a clear way to submit my music for consideration, so I can be evaluated for a future event.
- **Acceptance:** /contact includes an "Artist Submission" form (or subject-selectable general form) with fields for name, genre, location, music link, bio; submission routes to founder's email.

---

## 7. Top 5 Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| 1 | **Timeline slip (3 → 6 weeks)** — founder is non-engineer, Sanity CMS setup + Vercel + domain DNS + payment integration all have learning curves | High | High | Shubhangi breaks work into 1–3 day tasks with explicit "done" criteria; lock scope to §4 pages on day 1; no new features mid-build; founder's only job is content, not code decisions |
| 2 | **CMS complexity for non-technical editor** — Sanity Studio is powerful but not self-explanatory; founder may not be able to publish an event solo | High | Medium | Keep CMS schema to 4 types only in v1: Event, TeamMember, Partner, ImpactStat. Pre-seed 3 events + 1 Loom walkthrough + 1-page cheat sheet. Defer Artist / Archive / Milestone / Gallery / Press schemas. |
| 3 | **Payment processor integration** — Stripe requires business verification, bank account, and tax filing signal; PayPal already exists on .com | Medium | High | **Use PayPal Giving Fund or existing PayPal link for v1.** Stripe migration is a v2 project. Donate page embeds PayPal donate button + matches brand styling via an iframe container. Zero custom payment code in v1. |
| 4 | **Content readiness** — board bios, mission final copy, impact numbers, partner logos, 3 testimonials — none of this is dev work but all of it blocks launch | High | High | Shubhangi runs a parallel "content track" with founder. Content deadline = end of week 2, hard. If a section's content isn't ready by then, ship a placeholder-free reduced version (e.g., if only 2 board members confirmed, ship 2; don't block launch). |
| 5 | **Accessibility compliance gap at launch** — grant requirement, easy to fail silently (contrast, alt text, heading order, form labels) | Medium | High | Run axe-core + Lighthouse on every PR. Manual keyboard-nav pass before launch. VoiceOver smoke test on Home + Donate + Events. Contrast already validated in design system (spec §Accessibility). Alt-text field **required** in Sanity schema for every image. |

---

## 8. Launch Sequence (3-Week Plan)

### Week 1 — Foundation
**Dev:**
- Next.js App Router + TypeScript + Tailwind scaffolded on GitHub, auto-deploying to Vercel
- Design tokens from spec §Design System implemented as CSS vars + Tailwind theme
- Global Header + Footer components (with persistent Saffron Donate CTA)
- Sanity Studio set up with 4 content types: Event, TeamMember, Partner, ImpactStat
- Home page shell (hero, mission, 3-pillar block, upcoming events pulled from Sanity, partner logo strip, footer)
- Domain DNS from GoDaddy pointed to Vercel (founder does this with a screen-share from Shubhangi)

**Content (parallel, owned by founder + Shubhangi):**
- Final mission/vision/values copy locked
- Board/advisory member list with bios + photos collected
- 3 upcoming events drafted in Sanity
- Partner logos collected (KEXP, Chateau Ste. Michelle, Benaroya Hall, Pratham USA, etc.)
- EIN confirmed, 501(c)(3) language reviewed

**End-of-week gate:** Home page renders locally + on Vercel preview URL with real content.

### Week 2 — Core Pages
**Dev:**
- /about page (Our Story, Mission/Vision/Values, Team + Board grid, 501(c)(3) disclosure)
- /events list + /events/[slug] detail pages with JSON-LD Event schema
- /donate page (case for support + gift table + PayPal embed + tax language)
- /impact page (stat cards, milestone timeline as static content, 2–3 impact stories, PDF download link)
- /contact page with single form + subject dropdown (General, Volunteer, Artist, Private Event → routes to founder email)
- Newsletter signup wired to Mailchimp or ConvertKit embed
- Forms: React Hook Form + server actions, with accessibility labels + error states

**Content:**
- Impact stats finalized (audience, events, artists, volunteer hours)
- 2–3 impact stories written (artist + audience + volunteer)
- Gift-table dollar amounts finalized with founder (tie to real costs)
- Impact one-pager PDF produced

**End-of-week gate:** All 6 pages live on Vercel preview, clickable end-to-end, all forms submit successfully to test email.

### Week 3 — Polish, Accessibility, Launch
**Dev:**
- Accessibility audit: axe-core clean, Lighthouse A11y ≥ 95, manual keyboard-nav pass, VoiceOver smoke test
- SEO pass: metadata API on every page, OG images, sitemap.xml, robots.txt, Organization + Event JSON-LD
- GA4 installed, key events configured (donate_click, newsletter_signup, ticket_outbound, contact_submit)
- Performance pass: next/image on every image, Lighthouse Performance ≥ 90
- Privacy + Terms pages (boilerplate, reviewed by founder)
- Production DNS cutover from .com → mehfilnights.org (keep .com redirect alive for 90 days)
- Smoke test on mobile (iOS Safari + Android Chrome)

**Content:**
- Final proofread pass by founder + one external reader
- Social links verified
- 501(c)(3) + EIN verified in footer

**Launch day:** Cut DNS, announce via Instagram + email list, monitor GA4 + Sentry (if installed) + form submissions for 48 hours. Rollback plan: DNS revert to .com Squarespace (founder has the record saved).

**Launch announcement:** Instagram post + email to existing contacts with 3 links: event calendar, donate, email signup.

---

## 9. Measurement Plan — 30 / 60 / 90 Day Checkpoints

### Day 30
- **Traffic baseline:** Unique visitors, top-5 landing pages, bounce rate, mobile vs. desktop split
- **Donation funnel:** Donate page visits → PayPal click-through → completions
- **Newsletter:** Total signups, signup-rate per visitor
- **Ticket outbound clicks:** Event page → ticket URL click-through
- **Forms:** Contact submissions volume + category mix (general / volunteer / artist / private)
- **Technical:** Lighthouse scores holding? Any 404s or broken redirects from old .com?
- **Action:** Fix top 3 UX issues surfaced in real usage (expect small; examples: mobile nav overflow, form copy confusion)

### Day 60
- **Donation performance:** $ raised vs. $1,500–$3,000/mo target; donor count; avg gift size
- **Grant-readiness usage:** Any grant reviewers visited? Check referrer data + direct-link patterns from foundations
- **CMS health:** Is the founder publishing events independently? If not, Sanity schema needs a second simplification pass or a Loom retraining
- **Content gaps:** Which pages get traffic but no engagement? (Signal for v2 scope priorities)
- **Action:** Write first post-launch retro — what shipped, what surprised us, what was wrong in the PRD

### Day 90
- **Full target check** vs. §2 goals — hit, miss, directionally correct?
- **Grant outcomes:** Any grants submitted citing the new site? Any feedback from reviewers?
- **Email list:** At 150+? Engagement rate on first 1–2 campaigns?
- **v2 prioritization:** Which deferred items now have validated demand? Which never came up?
- **Action:** Produce v2 opportunity assessment for top 3 deferred items (likely candidates: Archive, Programs subpages, Artist directory). Present to founder with RICE scores.

---

## 10. Appendix

### Grant-Readiness Checklist (v1 must pass 100%)
- [ ] Mission statement above fold on homepage
- [ ] 501(c)(3) status + EIN in footer
- [ ] 501(c)(3) status + EIN on /donate page
- [ ] Board / advisory list with names + roles on /about
- [ ] Three programs described (even if on one page)
- [ ] Quantitative impact data visible on /impact
- [ ] At least 2 qualitative impact stories on /impact
- [ ] Partner logos visible (homepage + /about)
- [ ] Downloadable impact summary PDF linked from /impact
- [ ] Contact info + organizational address in footer
- [ ] Accessibility: WCAG 2.1 AA automated-scan clean, Lighthouse A11y ≥ 95
- [ ] Tax-deductibility language on donate page

### v1 CMS Schema (4 types only)
- **Event**: title, slug, date, venue, description (rich text), artists (string array for v1 — not referenced), hero_image (with required alt), ticket_url, is_free (boolean)
- **TeamMember**: name, photo (with required alt), title, bio, role_type (staff | board | advisory)
- **Partner**: name, logo (with required alt), url, partnership_type (venue | community | funder | corporate)
- **ImpactStat**: label, number, context_text, display_order

Everything else (Artist, ArchiveEntry, GalleryImage, PressItem, Milestone, Testimonial) — v2.

### Open Questions (resolve before dev kickoff)
- [ ] PayPal vs. Stripe for donations — **recommend PayPal for v1** — owner: founder — deadline: Day 1
- [ ] Mailchimp vs. ConvertKit for newsletter — owner: founder — deadline: Day 3
- [ ] EIN confirmed and ready to publish — owner: founder — deadline: Day 1
- [ ] Board/advisory final list with consents to publish — owner: founder — deadline: end of Week 1
- [ ] Annual report / impact one-pager source content — owner: founder — deadline: end of Week 2
- [ ] Keep mehfilnights.com live or redirect? — **recommend 301 redirect to .org after Day 30 soak** — owner: founder — deadline: Day 14

---

**Sign-off required from:** Founder, Shubhangi (PM), Dev
