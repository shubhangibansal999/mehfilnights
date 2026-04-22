# Mehfil Nights .org — v1 Development Task List

**PM:** Shubhangi
**Date:** 2026-04-21
**Project:** mehfilnights.org (v1)
**Target stack:** Next.js 14 (App Router, TS, RSC) · Tailwind · Sanity.io · Vercel · Formspree/Server Actions · GA4 · Meta Pixel

---

## Specification Summary

**Original Requirements (from `CLAUDE.md`):** Build the official .org site for Mehfil Nights, a Seattle 501(c)(3) nonprofit. Site must serve grant reviewers, institutional funders, and community partners as primary audiences. WCAG 2.1 AA mandatory. Brand v3 design tokens (saffron, deep olive, turmeric, sage, ivory). Three fonts: DM Serif Display, Instrument Serif, Plus Jakarta Sans.

**v1 Scope (this task list covers):**
Home · Mission/About · Events list · Event detail · Contribute/Donate · Contact (with form) · Impact/Transparency · Global nav + footer · Email signup (footer + home)

**Explicitly DEFERRED to v2 (no tasks created):**
Blog · gallery · full artist directory/profiles · At-Home booking form · Mehfil-ites hub · newsletter archive · advanced search · multilingual · press page

**Base Branch convention:** `main` is protected. All feature work happens on `feature/<phase>-<short-name>` branches and merges back to `main` via PR after review. Large phases use a parent branch (e.g., `feature/phase-0-scaffold`) with sub-branches (`feature/phase-0-tokens`, etc.) merged into it.

**Definition of Done (all tasks):**
- Code merged into phase's base branch
- Lint (`npm run lint`) passes
- Typecheck (`tsc --noEmit`) passes
- Tests pass (where applicable)
- Tested in dev (`npm run dev`) and preview build (`npm run build && npm start`)
- No new console errors/warnings
- Commit message references task ID

---

## Phase Overview & Estimates

| Phase | Name | Tasks | Est. Hours |
|-------|------|-------|-----------|
| 0 | Repo + Scaffolding | 12 | 8.5 |
| 1 | CMS (Sanity) | 10 | 7.5 |
| 2 | Core Pages | 14 | 11.0 |
| 3 | Integrations | 11 | 8.0 |
| 4 | Accessibility + QA | 7 | 5.5 |
| 5 | Deploy + Handoff | 8 | 6.5 |
| **Total** | | **62** | **~47 hrs** |

---

# PHASE 0 — Repo + Scaffolding

Base branch for phase: `feature/phase-0-scaffold`

---

## [TASK-001]: Initialize Git Repo and GitHub Remote

**Phase:** 0 | **Size:** S (30 min)

### Branch & Worktree Strategy
**Base Branch:** `main` (initial commit goes directly to main)
- Initialize locally, create GitHub repo under Mehfil Nights org
- Protect `main` with required PR review before enabling branch protection

### Description
Initialize a clean git repo, create a private GitHub repository `mehfilnights-org`, push the initial commit, and set the default branch to `main`.

### Dependencies
**Blockers:** None
**Unblocks:** TASK-002

### Acceptance Criteria
- [ ] Local repo initialized at project root with `.gitignore` for Node/Next.js
- [ ] Remote `origin` points to `github.com/<org>/mehfilnights-org`
- [ ] `main` branch exists on remote with an initial commit
- [ ] README.md stub present with project name and one-line description
- [ ] Collaborators added per handoff list (founder has read access)

### Testing Requirements
- [ ] `git remote -v` shows correct origin
- [ ] `git push` to main succeeds

### Completion Requirements
- [ ] Initial commit pushed to `main`
- [ ] Repo visible to founder's GitHub account

### Deliverables
- `.gitignore` (Next.js template)
- `README.md` (stub — filled out in TASK-058)
- `LICENSE` (optional — decide with founder)

### Cross-Repo Dependencies
None

---

## [TASK-002]: Next.js 14 Project Bootstrap

**Phase:** 0 | **Size:** S (30 min)

### Branch & Worktree Strategy
**Base Branch:** `feature/phase-0-scaffold` (created off `main`)

### Description
Scaffold a Next.js 14 App Router project with TypeScript, ESLint, and the `src/` directory. Configure `tsconfig.json` path alias `@/*` → `src/*`.

### Dependencies
**Blockers:** TASK-001
**Unblocks:** TASK-003, TASK-004

### Acceptance Criteria
- [ ] `npx create-next-app@latest` run with: TypeScript yes, ESLint yes, Tailwind yes, `src/` yes, App Router yes, Turbopack optional
- [ ] `npm run dev` serves default page at `http://localhost:3000`
- [ ] `npm run build` succeeds
- [ ] `tsconfig.json` has `"@/*": ["./src/*"]` path alias
- [ ] `.nvmrc` pins Node 20 LTS

### Testing Requirements
- [ ] Dev server boots with no warnings
- [ ] Build output has zero errors

### Completion Requirements
- [ ] Branch pushed and all DoD met

### Deliverables
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `src/app/layout.tsx`, `src/app/page.tsx` (default)
- `.nvmrc`

---

## [TASK-003]: Install Tailwind + PostCSS Config Hardening

**Phase:** 0 | **Size:** S (30 min)

### Description
Verify Tailwind installation from create-next-app, add `@tailwindcss/forms` and `@tailwindcss/typography` plugins, set content globs, enable JIT defaults.

### Dependencies
**Blockers:** TASK-002
**Unblocks:** TASK-004

### Acceptance Criteria
- [ ] `tailwind.config.ts` uses TypeScript
- [ ] Content globs cover `src/app/**/*.{ts,tsx}` and `src/components/**/*.{ts,tsx}`
- [ ] `@tailwindcss/forms` and `@tailwindcss/typography` installed and registered
- [ ] `globals.css` contains `@tailwind base; components; utilities;`
- [ ] Test utility class renders on homepage (e.g., `text-red-500` visible)

### Testing Requirements
- [ ] Visual check in browser

### Deliverables
- `tailwind.config.ts`
- `postcss.config.js`
- `src/app/globals.css`

---

## [TASK-004]: Design Tokens — Brand v3 Color Palette

**Phase:** 0 | **Size:** M (45 min)

### Description
Encode the full Brand Guidelines v3 color palette (Primary cultural, Secondary trust, Neutrals) as CSS custom properties AND extend Tailwind `theme.colors` with `mn-*` tokens. Source of truth: spec section "Color Palette."

### Dependencies
**Blockers:** TASK-003
**Unblocks:** TASK-005, TASK-008

### Acceptance Criteria
- [ ] All 22 tokens from spec present in `globals.css` as CSS vars (`--mn-saffron`, `--mn-deep-olive`, `--mn-turmeric`, `--mn-sage`, `--mn-ivory`, `--mn-warm-white`, `--mn-trust-teal`, `--mn-sand`, `--mn-henna`, `--mn-sage-muted`, `--mn-clay`, `--mn-linen`, `--mn-calm-blue`, `--mn-charcoal`, `--mn-dark-text`, `--mn-body-text`, `--mn-muted`, `--mn-light-line`, `--mn-white`)
- [ ] Tailwind config exposes them as `colors.mn.saffron`, `colors.mn['deep-olive']`, etc.
- [ ] A test route `/dev/tokens` renders all swatches with hex values (kept for dev, removed before launch — see TASK-061)
- [ ] Hex values match spec EXACTLY

### Testing Requirements
- [ ] Visual inspection of `/dev/tokens` matches spec table

### Deliverables
- `src/app/globals.css` (CSS vars)
- `tailwind.config.ts` (colors extension)
- `src/app/dev/tokens/page.tsx` (temp dev route)

---

## [TASK-005]: Google Fonts Wiring — DM Serif Display, Instrument Serif, Plus Jakarta Sans

**Phase:** 0 | **Size:** S (30 min)

### Description
Load the three brand fonts via `next/font/google`, expose as CSS vars `--mn-font-display`, `--mn-font-accent`, `--mn-font-body`, and set body default to Plus Jakarta Sans.

### Dependencies
**Blockers:** TASK-004
**Unblocks:** TASK-006

### Acceptance Criteria
- [ ] `next/font/google` imports all three families in `src/app/layout.tsx`
- [ ] Weights: Plus Jakarta Sans 300/400/500/600/700 + italic; DM Serif Display 400; Instrument Serif 400 italic
- [ ] Each font exposes `--mn-font-display`, `--mn-font-accent`, `--mn-font-body` via `variable` option
- [ ] `<body>` gets `font-sans` → Plus Jakarta Sans by default
- [ ] Tailwind `fontFamily.display`, `fontFamily.accent`, `fontFamily.body` wired to the vars
- [ ] No FOUT on page reload

### Testing Requirements
- [ ] Visual check: headings in DM Serif, italics render in Instrument Serif

### Deliverables
- `src/app/layout.tsx`
- `tailwind.config.ts` (fontFamily extension)

---

## [TASK-006]: Typography Scale Utilities

**Phase:** 0 | **Size:** S (30 min)

### Description
Create Tailwind utility classes / component styles for the spec's type scale: `text-hero`, `text-section`, `text-subtitle` (italic Instrument Serif), `text-card-h3`, `text-body`, `text-nav`, `text-caption`.

### Dependencies
**Blockers:** TASK-005
**Unblocks:** TASK-007

### Acceptance Criteria
- [ ] Type scale from spec encoded (Hero 42–64px clamp, Section 32–44px clamp, Subtitle 20–24px italic, H3 22–28px 600, Body 16–17px 400, Nav 14px 600, Caption 12px)
- [ ] `line-height: 1.75` on body paragraphs
- [ ] Tailwind `@layer components` defines the classes
- [ ] Sample page `/dev/typography` renders all levels

### Testing Requirements
- [ ] Visual match to spec type scale table

### Deliverables
- `src/app/globals.css` (@layer components)
- `src/app/dev/typography/page.tsx` (temp)

---

## [TASK-007]: Button Component with 5 Brand Variants

**Phase:** 0 | **Size:** M (45 min)

### Description
Build `<Button>` with variants: `saffron` (donate only), `turmeric`, `teal`, `outline`, `sand`. All buttons: border-radius 6px, padding 14px 32px, font-size 14px, weight 600, letter-spacing 0.5px. Hover states per spec.

### Dependencies
**Blockers:** TASK-006
**Unblocks:** TASK-008, TASK-011

### Acceptance Criteria
- [ ] `<Button variant="..." href?="..." as="a|button">` supports all 5 variants
- [ ] Hover states match spec (saffron→henna, turmeric→transparent+turmeric text, teal→transparent+teal text, outline→deep olive fill+ivory text, sand→clay+white text)
- [ ] Focus ring visible (WCAG) — 2px outline offset with deep-olive
- [ ] Disabled state styled
- [ ] Renders as `<Link>` when `href` provided (Next.js Link)
- [ ] Tested page `/dev/buttons` shows all variants and states

### Testing Requirements
- [ ] Keyboard focus visible on Tab
- [ ] Hover transitions smooth (150ms)

### Deliverables
- `src/components/ui/Button.tsx`
- `src/app/dev/buttons/page.tsx` (temp)

---

## [TASK-008]: Layout Primitives — Container + Section

**Phase:** 0 | **Size:** S (30 min)

### Description
Build `<Container>` (max-width 1100px, horizontal padding responsive) and `<Section>` (vertical padding with variants `tight`, `default`, `loose`, optional `bg` prop for `ivory | deep-olive | sand | warm-white`).

### Dependencies
**Blockers:** TASK-004
**Unblocks:** TASK-009, TASK-011

### Acceptance Criteria
- [ ] `<Container>` max-w 1100px, px-4 sm:px-6 lg:px-8
- [ ] `<Section as="section|div">` supports `bg` prop with matching text color auto-pairing (deep-olive bg → ivory text)
- [ ] Default padding: `py-16 md:py-24`

### Testing Requirements
- [ ] Renders correctly in mobile (375px) and desktop (1440px)

### Deliverables
- `src/components/ui/Container.tsx`
- `src/components/ui/Section.tsx`

---

## [TASK-009]: Card Component (base)

**Phase:** 0 | **Size:** S (30 min)

### Description
Base `<Card>` per spec: border-radius 12px, 1px solid `--mn-light-line`, hover `translateY(-3px)` + `box-shadow: 0 8px 24px rgba(0,0,0,0.06)`. Supports `bg` prop (default sand).

### Dependencies
**Blockers:** TASK-008
**Unblocks:** TASK-026 (EventCard), TASK-025 (StatCard)

### Acceptance Criteria
- [ ] Card base styles match spec exactly
- [ ] Hover lift transition 200ms
- [ ] Variants: default (sand bg), `ivory`, `warm-white`
- [ ] Optional `as="article|div|a"` polymorphism

### Testing Requirements
- [ ] Visual hover check

### Deliverables
- `src/components/ui/Card.tsx`

---

## [TASK-010]: Root Layout + Metadata Base

**Phase:** 0 | **Size:** S (30 min)

### Description
Set up `src/app/layout.tsx` with `<html lang="en">`, skip-to-content link, base metadata (title template, default description), viewport, theme-color. Slot Header and Footer (placeholders OK until TASK-011/TASK-012).

### Dependencies
**Blockers:** TASK-005
**Unblocks:** TASK-011, TASK-012

### Acceptance Criteria
- [ ] `<html lang="en">` set
- [ ] Skip-to-content link (visually hidden until focused) → `#main`
- [ ] `<main id="main">` wraps children
- [ ] Default Metadata: titleTemplate `"%s | Mehfil Nights"`, default title "Mehfil Nights", description from spec mission
- [ ] Body applies font vars + `bg-mn-ivory text-mn-body-text`

### Testing Requirements
- [ ] Tab from page load → skip link appears

### Deliverables
- `src/app/layout.tsx`

---

## [TASK-011]: Global Header with Mobile Menu

**Phase:** 0 | **Size:** M (60 min)

### Description
Build `<Header>` — sticky on scroll, deep-olive background, logo left, primary nav center (Home, About, Events, Impact, Contribute, Contact), saffron Donate CTA rightmost. Mobile: hamburger → full-screen overlay with same links. Accessible disclosure pattern.

### Dependencies
**Blockers:** TASK-007, TASK-010
**Unblocks:** TASK-021

### Acceptance Criteria
- [ ] Desktop nav: 5–7 items per spec, Donate button is saffron (rightmost)
- [ ] Sticky on scroll with subtle shadow when scrolled
- [ ] Mobile: hamburger → full-screen menu, trap focus, close on Escape, close on route change
- [ ] `aria-expanded`, `aria-controls` on hamburger
- [ ] Active route highlighted (underline or turmeric text)
- [ ] Logo links home
- [ ] Keyboard navigable — Tab order correct

### Testing Requirements
- [ ] Keyboard: Tab through all links, Escape closes mobile menu
- [ ] Mobile at 375px width

### Deliverables
- `src/components/layout/Header.tsx`
- `src/components/layout/MobileMenu.tsx`
- `public/logo.svg` (placeholder SVG — real asset added by founder later)

---

## [TASK-012]: Global Footer with Sitemap, EIN, Socials

**Phase:** 0 | **Size:** M (45 min)

### Description
Build `<Footer>` on deep-olive background: full sitemap columns, 501(c)(3) + EIN placeholder (from SiteSettings CMS — wire in TASK-022), newsletter signup stub (full form in TASK-042), 6 social links (Facebook, Instagram, LinkedIn, TikTok, X, YouTube), copyright, mailing address (Seattle, WA).

### Dependencies
**Blockers:** TASK-007, TASK-010
**Unblocks:** TASK-021

### Acceptance Criteria
- [ ] 4-column layout on desktop, stacked on mobile
- [ ] 501(c)(3) statement: "Mehfil Nights is a registered 501(c)(3) nonprofit organization. Donations are tax-deductible to the extent allowed by law."
- [ ] EIN shown as "EIN: {env or CMS placeholder}"
- [ ] 6 social icons with `aria-label` and `rel="noopener noreferrer"` on external links
- [ ] Newsletter field (stub — not wired yet)
- [ ] Copyright year auto from JS
- [ ] Contrast passes AA (ivory text on deep-olive = 11:1)

### Testing Requirements
- [ ] Visual at mobile + desktop
- [ ] axe scan passes on footer

### Deliverables
- `src/components/layout/Footer.tsx`
- `src/components/icons/` (Facebook, Instagram, LinkedIn, TikTok, X, YouTube SVGs)

---

# PHASE 1 — CMS (Sanity)

Base branch for phase: `feature/phase-1-cms`

---

## [TASK-020]: Sanity Project Init + Sanity Studio Mount

**Phase:** 1 | **Size:** M (45 min)

### Branch & Worktree Strategy
**Base Branch:** `feature/phase-1-cms`

### Description
Create Sanity project (dataset `production`), add `sanity` + `next-sanity` packages, mount Studio at `/studio` route using embedded Studio pattern. Founder needs Sanity account created first.

### Dependencies
**Blockers:** TASK-002
**Unblocks:** All other Phase 1 tasks

### Acceptance Criteria
- [ ] Sanity project created; `projectId` and `dataset` captured in `.env.local`
- [ ] `sanity.config.ts` at repo root
- [ ] `/studio/[[...tool]]/page.tsx` serves embedded Studio
- [ ] Sanity CLI commands documented in README
- [ ] CORS origin for `http://localhost:3000` added in Sanity manage console

### Testing Requirements
- [ ] Visit `/studio` → login works → empty dataset shown

### Deliverables
- `sanity.config.ts`
- `src/sanity/env.ts`
- `src/sanity/lib/client.ts`
- `src/app/studio/[[...tool]]/page.tsx`
- `.env.example` updated with `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`

---

## [TASK-021]: Schema — SiteSettings (Singleton)

**Phase:** 1 | **Size:** S (30 min)

### Description
Define `siteSettings` singleton schema: EIN, mailing address, contact email, social URLs (FB/IG/LI/TikTok/X/YT), donate URL placeholder, annual report PDF upload, footer statement, newsletter provider toggle.

### Dependencies
**Blockers:** TASK-020
**Unblocks:** TASK-029 (home), TASK-012 (footer wiring), TASK-040 (donate)

### Acceptance Criteria
- [ ] Schema file exports `siteSettings` type
- [ ] Fields: `ein`, `mailingAddress` (string), `contactEmail`, `socialLinks` (object with 6 URL fields), `donateUrl` (placeholder), `annualReportPdf` (file), `footerStatement` (text)
- [ ] Structure builder configures it as singleton (not listable)
- [ ] Studio shows "Site Settings" as single editable document

### Deliverables
- `src/sanity/schemas/siteSettings.ts`
- `src/sanity/structure.ts`

---

## [TASK-022]: Schema — Event

**Phase:** 1 | **Size:** M (45 min)

### Description
Define `event` schema per spec CMS content model: title, slug, datetime, venue (name + address + maps URL), description (portable text), artists (array of strings for v1 — Artist reference deferred to v2), heroImage, ticketUrl, programCategory (select), isFree (bool), attendanceCount (optional).

### Dependencies
**Blockers:** TASK-020
**Unblocks:** TASK-031, TASK-032, TASK-043

### Acceptance Criteria
- [ ] Schema includes all spec fields
- [ ] Slug auto-generates from title (unique)
- [ ] `datetime` required, preview shows formatted date
- [ ] `heroImage` has hotspot + alt text requirement
- [ ] `programCategory` options: `mehfil-night`, `residency`, `community`, `youth`
- [ ] List preview shows date + title

### Deliverables
- `src/sanity/schemas/event.ts`

---

## [TASK-023]: Schema — ImpactMetric + Milestone

**Phase:** 1 | **Size:** S (30 min)

### Description
Two schemas: `impactMetric` (label, number, contextText, displayOrder) and `milestone` (title, date, description, displayOrder). Both for Impact page.

### Dependencies
**Blockers:** TASK-020
**Unblocks:** TASK-036

### Acceptance Criteria
- [ ] Both schemas registered
- [ ] `displayOrder` used for ordering in queries
- [ ] Preview shows label + number / title + date

### Deliverables
- `src/sanity/schemas/impactMetric.ts`
- `src/sanity/schemas/milestone.ts`

---

## [TASK-024]: Schema — Page + TextBlock (Mission, Contribute, Impact narrative)

**Phase:** 1 | **Size:** M (45 min)

### Description
Generic `page` schema for Mission, Contribute, Impact narrative sections: slug, title, heroImage (optional), body (portable text with block content + images + pull quotes), seoTitle, seoDescription, ogImage.

### Dependencies
**Blockers:** TASK-020
**Unblocks:** TASK-030, TASK-035, TASK-036

### Acceptance Criteria
- [ ] `page` schema with portable text body
- [ ] Custom block type `pullQuote` (quote + attribution)
- [ ] Custom block type `textBlock` (heading + body)
- [ ] SEO fields group collapsed by default

### Deliverables
- `src/sanity/schemas/page.ts`
- `src/sanity/schemas/blocks/pullQuote.ts`
- `src/sanity/schemas/blocks/textBlock.ts`

---

## [TASK-025]: Schema — TeamMember (stub)

**Phase:** 1 | **Size:** S (30 min)

### Description
Stub `teamMember` schema: name, photo, title, bio, roleType (staff/board/advisory/volunteer), displayOrder. v1 shows Leadership + Board on About page.

### Dependencies
**Blockers:** TASK-020
**Unblocks:** TASK-030

### Acceptance Criteria
- [ ] All fields present
- [ ] `roleType` is select enum
- [ ] Preview shows photo + name + title

### Deliverables
- `src/sanity/schemas/teamMember.ts`

---

## [TASK-026]: Sanity Schema Index + Studio Deploy

**Phase:** 1 | **Size:** S (30 min)

### Description
Wire all schemas into `sanity.config.ts`, deploy Studio to `mehfilnights.sanity.studio`, confirm founder can log in.

### Dependencies
**Blockers:** TASK-021, TASK-022, TASK-023, TASK-024, TASK-025
**Unblocks:** TASK-027, TASK-028

### Acceptance Criteria
- [ ] All 5+ schemas registered
- [ ] `npx sanity deploy` succeeds → hosted Studio URL live
- [ ] Founder invited as editor role
- [ ] Studio URL added to README

### Deliverables
- Updated `sanity.config.ts`
- Deployment confirmation

---

## [TASK-027]: Sanity Client + Typed Queries Setup

**Phase:** 1 | **Size:** M (45 min)

### Description
Set up `next-sanity` client with preview/draft mode support, install `@sanity/image-url` for image URL builder, add `sanity-codegen` or manual TS types for schemas. Create `src/sanity/queries/` folder with starter GROQ queries.

### Dependencies
**Blockers:** TASK-026
**Unblocks:** TASK-029, TASK-031, TASK-035, TASK-036

### Acceptance Criteria
- [ ] `src/sanity/lib/client.ts` exports `client` (read) with CDN enabled
- [ ] `src/sanity/lib/image.ts` exports `urlFor(source)` helper
- [ ] `src/sanity/queries/events.ts`, `siteSettings.ts` scaffolded
- [ ] TS types for Event, SiteSettings, etc. in `src/sanity/types.ts`
- [ ] Env vars validated at module load

### Deliverables
- `src/sanity/lib/client.ts`
- `src/sanity/lib/image.ts`
- `src/sanity/queries/*.ts`
- `src/sanity/types.ts`

---

## [TASK-028]: Seed Content — Site Settings + 3 Sample Events

**Phase:** 1 | **Size:** M (45 min)

### Description
Populate Studio with: one SiteSettings document (placeholder EIN, real socials from spec), 3 sample events (mix of past + upcoming), 4 sample ImpactMetric docs, 5 sample Milestones, 2 TeamMember docs, Mission page, Contribute page, Impact page body.

### Dependencies
**Blockers:** TASK-026
**Unblocks:** TASK-029 (dev), TASK-031 (dev)

### Acceptance Criteria
- [ ] Studio shows populated content for all schemas
- [ ] Images uploaded for events (use spec-described performance photos as placeholders — founder swaps)
- [ ] Seed content committed as NDJSON export in `sanity/seed/` for reproducibility

### Deliverables
- Populated Studio
- `sanity/seed/export.tar.gz` or `.ndjson` files (reproducible seed)

---

## [TASK-029]: Image Pipeline — next/image + Sanity urlFor

**Phase:** 1 | **Size:** S (30 min)

### Description
Build `<SanityImage>` wrapper component using `next/image` + `urlFor()`. Handles hotspot, lazy loading, sizes prop, alt text enforcement.

### Dependencies
**Blockers:** TASK-027
**Unblocks:** TASK-029 (home), TASK-031, TASK-032

### Acceptance Criteria
- [ ] `<SanityImage value={...} alt="..." sizes="..." priority?>` component
- [ ] Uses `next/image` with remote pattern configured for `cdn.sanity.io`
- [ ] Throws TS error if `alt` missing
- [ ] Supports fill + fixed dimension modes

### Testing Requirements
- [ ] Renders Sanity image in a test route
- [ ] `next.config.js` remote patterns include cdn.sanity.io

### Deliverables
- `src/components/ui/SanityImage.tsx`
- `next.config.js` (updated)

---

# PHASE 2 — Core Pages

Base branch for phase: `feature/phase-2-pages`

---

## [TASK-030]: Homepage — Hero Section

**Phase:** 2 | **Size:** M (60 min)

### Description
Build Hero: full-bleed performance photo (from Sanity SiteSettings or hardcoded placeholder), deep-olive gradient overlay, mission headline (DM Serif Display, 42–64px clamp), genre subtitle ("Bollywood · Ghazal · Sufi · Desi Folk · Classical · Coke Studio · Fusion") in Instrument Serif italic, two CTAs ("Upcoming Events" → `/events`, "Support Our Mission" → `/contribute`).

### Dependencies
**Blockers:** TASK-007, TASK-008, TASK-029
**Unblocks:** TASK-038

### Acceptance Criteria
- [ ] Section is 80vh min on desktop, 60vh mobile
- [ ] Headline uses exact mission sentence from spec
- [ ] Genre string exactly matches spec ("Bollywood · Ghazal · Sufi · Desi Folk · Classical · Coke Studio · Fusion")
- [ ] Two CTAs: turmeric "Upcoming Events", saffron "Support Our Mission"
- [ ] Text readable on image (AA contrast) — gradient or overlay ensures this
- [ ] Image uses `priority` prop (LCP candidate)

### Deliverables
- `src/components/home/Hero.tsx`

---

## [TASK-031]: Homepage — Three Pillars Section

**Phase:** 2 | **Size:** M (45 min)

### Description
"What to Expect" three pillars: Homely Vibe, International Music, Unplugged Feel. Copy pulled EXACTLY from spec. Sand background cards on ivory section. Icon/illustration optional placeholder.

### Dependencies
**Blockers:** TASK-008, TASK-009
**Unblocks:** TASK-038

### Acceptance Criteria
- [ ] Three Card components in 3-col grid (stacks on mobile)
- [ ] Headlines + body copy match spec verbatim
- [ ] Section uses Sand or Ivory background
- [ ] Each card has a heading (Plus Jakarta 600) + body

### Deliverables
- `src/components/home/ThreePillars.tsx`

---

## [TASK-032]: Homepage — Impact StatCards Row

**Phase:** 2 | **Size:** S (30 min)

### Description
Build `<StatCard>` component and render row of 3-4 stats below pillars. Pull from Sanity `impactMetric` (top 4 by displayOrder).

### Dependencies
**Blockers:** TASK-009, TASK-023, TASK-027
**Unblocks:** TASK-038

### Acceptance Criteria
- [ ] `<StatCard number="..." label="..." context="..." />`
- [ ] Number uses DM Serif Display 48–64px in turmeric
- [ ] Grid of 3-4 on desktop, 2x2 mobile
- [ ] Data fetched server-side from Sanity

### Deliverables
- `src/components/ui/StatCard.tsx`
- `src/components/home/ImpactStrip.tsx`
- `src/sanity/queries/impactMetrics.ts` (GROQ)

---

## [TASK-033]: Homepage — Upcoming Events Strip

**Phase:** 2 | **Size:** M (45 min)

### Description
Show next 2–3 upcoming events via `<EventCard>`. Pull from Sanity with GROQ filter `datetime > now()`, order asc, limit 3. "View All Events →" link.

### Dependencies
**Blockers:** TASK-022, TASK-027, TASK-029
**Unblocks:** TASK-038

### Acceptance Criteria
- [ ] `<EventCard>` shows hero image, date (Pacific Time), title, venue, "Get Tickets" turmeric CTA
- [ ] Query returns 3 future events ordered by date
- [ ] Graceful empty state: "New events coming soon — sign up for our newsletter"
- [ ] Link "View All Events →" routes to `/events`

### Deliverables
- `src/components/home/UpcomingEvents.tsx`
- `src/components/ui/EventCard.tsx`
- `src/sanity/queries/events.ts` (upcoming query)

---

## [TASK-034]: Homepage — Founder Story + Newsletter + Compose Final Page

**Phase:** 2 | **Size:** M (45 min)

### Description
Two remaining sections: (1) Founder Story snapshot (3-4 sentence origin, photo, "Read our full story" → `/about`) pulled from Sanity page `founderSnippet` block or hardcoded for v1; (2) Newsletter signup block (form lives in TASK-042, this is the section wrapper). Then compose `src/app/page.tsx` with all 5 sections in order: Hero → Three Pillars → Impact Strip → Upcoming Events → Founder Story → Newsletter signup.

### Dependencies
**Blockers:** TASK-030, TASK-031, TASK-032, TASK-033
**Unblocks:** TASK-042 (gets real form), TASK-049 (metadata)

### Acceptance Criteria
- [ ] `src/app/page.tsx` renders all sections in spec order
- [ ] Founder Story section: photo left, text right (stacks mobile)
- [ ] Newsletter section on deep-olive background
- [ ] Page metadata exported (`export const metadata`)
- [ ] Server Component (no "use client" at page level)

### Deliverables
- `src/components/home/FounderStory.tsx`
- `src/components/home/NewsletterBlock.tsx` (section wrapper)
- `src/app/page.tsx`

---

## [TASK-035]: Mission / About Page

**Phase:** 2 | **Size:** M (60 min)

### Description
`/about` page rendering Sanity `page` (slug `mission`): Hero with page title, body (portable text), Mission/Vision/Values section (3-column list), Team & Board section rendering `teamMember` docs grouped by roleType. v1 keeps it to one scroll — no subpages.

### Dependencies
**Blockers:** TASK-024, TASK-025, TASK-027
**Unblocks:** TASK-049

### Acceptance Criteria
- [ ] Route `/about` fetches page by slug `mission` + all teamMembers
- [ ] Portable text renderer handles headings, paragraphs, lists, pullQuote
- [ ] Mission/Vision/Values presented in 3-col grid with icons placeholder
- [ ] Team section: groups by `roleType` (Leadership, Board) with cards (photo + name + title + bio)
- [ ] Page-specific metadata

### Deliverables
- `src/app/about/page.tsx`
- `src/components/portable-text/PortableTextRenderer.tsx`
- `src/components/about/TeamGrid.tsx`

---

## [TASK-036]: Events List Page

**Phase:** 2 | **Size:** M (45 min)

### Description
`/events` page listing all events. v1 scope: upcoming section (datetime > now) ASC, past section (datetime < now) DESC — no advanced filters (deferred to v2). Uses `<EventCard>`.

### Dependencies
**Blockers:** TASK-022, TASK-033 (EventCard)
**Unblocks:** TASK-049

### Acceptance Criteria
- [ ] Two headings: "Upcoming" and "Past Events"
- [ ] Upcoming events in card grid (3-col desktop, 1-col mobile)
- [ ] Past events in same grid but muted styling
- [ ] Empty states for both
- [ ] Metadata: "Events | Mehfil Nights"

### Deliverables
- `src/app/events/page.tsx`
- `src/sanity/queries/events.ts` (add `allEvents` query)

---

## [TASK-037]: Event Detail Page (Dynamic Route)

**Phase:** 2 | **Size:** M (60 min)

### Description
`/events/[slug]` dynamic route: hero image, title (DM Serif Display), date (Pacific Time), venue (name + address + "View on Map" link), description (portable text), artists list, ticket CTA (turmeric "Get Tickets" if ticketUrl else "Free Admission" badge). `generateStaticParams` pre-renders known slugs.

### Dependencies
**Blockers:** TASK-022, TASK-027, TASK-029
**Unblocks:** TASK-049, TASK-050 (JSON-LD)

### Acceptance Criteria
- [ ] Route handles slug lookup; 404 if not found
- [ ] `generateStaticParams` returns all event slugs
- [ ] `generateMetadata` sets title, description, OG image from event
- [ ] Pacific Time displayed (use `Intl.DateTimeFormat` with `timeZone: 'America/Los_Angeles'`)
- [ ] Venue includes Google Maps link or embed
- [ ] Free events show "Free Admission" badge instead of ticket button

### Deliverables
- `src/app/events/[slug]/page.tsx`
- `src/sanity/queries/events.ts` (add `eventBySlug` query)

---

## [TASK-038]: Contribute / Donate Page

**Phase:** 2 | **Size:** M (60 min)

### Description
`/contribute` page: Case for Support intro (from spec copy), Gift Table (6 gift amounts with what they enable — from spec), Donate CTA button (saffron, `donateUrl` from SiteSettings — placeholder Givebutter/Stripe URL), "Other Ways to Help" grid (6 cards from spec: sponsor, hire us, volunteer, donate, bring friends, follow). 501(c)(3) + EIN prominently displayed.

### Dependencies
**Blockers:** TASK-021, TASK-024, TASK-027
**Unblocks:** TASK-049

### Acceptance Criteria
- [ ] Hero/intro copy from spec's "Case for Support" section
- [ ] Gift Table: 6 rows ($25/$50/$100/$250/$500/$1000) + custom amount CTA, each row with spec copy
- [ ] Main Donate CTA is the saffron button linking to `siteSettings.donateUrl`
- [ ] "Other Ways to Help" section: 6 cards with spec's exact copy
- [ ] EIN and 501(c)(3) statement at bottom

### Deliverables
- `src/app/contribute/page.tsx`
- `src/components/contribute/GiftTable.tsx`
- `src/components/contribute/OtherWaysGrid.tsx`

---

## [TASK-039]: Contact Page (Page Shell Only)

**Phase:** 2 | **Size:** S (30 min)

### Description
`/contact` page shell: intro copy from spec ("We love our Mehfil-ites!..."), location line (Seattle, WA), social links row, form component slot (real form from TASK-041). v1 scope is General Contact only — volunteer/artist/at-home forms are v2.

### Dependencies
**Blockers:** TASK-008
**Unblocks:** TASK-041, TASK-049

### Acceptance Criteria
- [ ] Intro copy matches spec
- [ ] Socials row present
- [ ] Form section has clear heading "Get in Touch"
- [ ] Form component slot (empty pending TASK-041)

### Deliverables
- `src/app/contact/page.tsx`

---

## [TASK-040]: Impact / Transparency Page

**Phase:** 2 | **Size:** M (60 min)

### Description
`/impact` page designed for grant officers: Section 1 "By the Numbers" (large StatCards grid from all ImpactMetrics), Section 2 "Milestones Timeline" (vertical timeline from Milestones schema), Section 3 "Stories of Impact" (2-3 pull quotes — portable text from Impact page body), Section 4 "Annual Report + 501(c)(3) Info" (download button for annualReportPdf, EIN, footer statement).

### Dependencies
**Blockers:** TASK-021, TASK-023, TASK-024, TASK-027
**Unblocks:** TASK-049, TASK-050

### Acceptance Criteria
- [ ] All 4 sections present in spec order
- [ ] StatCards grid shows ALL impactMetrics (not just 4)
- [ ] Timeline uses `<TimelineMilestone>` component (vertical line + date + title + desc)
- [ ] Annual Report download button disabled with "Coming soon" if PDF not uploaded in SiteSettings
- [ ] EIN + 501(c)(3) statement prominent (large, not buried)

### Deliverables
- `src/app/impact/page.tsx`
- `src/components/impact/Timeline.tsx`
- `src/components/impact/TimelineMilestone.tsx`

---

# PHASE 3 — Integrations

Base branch for phase: `feature/phase-3-integrations`

---

## [TASK-041]: Contact Form (React Hook Form + Server Action)

**Phase:** 3 | **Size:** M (60 min)

### Description
Build contact form with RHF + Zod validation + Next.js server action OR Formspree submit. Fields: name, email, subject (dropdown: General/Press/Partnership/Artist), message. Success/error states. Spam honeypot field. Emails posted to `siteSettings.contactEmail`.

### Dependencies
**Blockers:** TASK-039, TASK-021
**Unblocks:** TASK-049

### Acceptance Criteria
- [ ] Form uses React Hook Form + Zod resolver
- [ ] Honeypot field hidden via CSS (bots only)
- [ ] Validation: email format, message min 10 chars, name required
- [ ] Server action (preferred) posts to Formspree fallback if SA disabled
- [ ] Success state: "Thanks! We'll be in touch within 3 business days."
- [ ] Error state: "Something went wrong — please email us directly at {contactEmail}."
- [ ] `aria-invalid`, `aria-describedby` on invalid fields
- [ ] Focus moves to first error on failed submit

### Testing Requirements
- [ ] Submit with valid data → success
- [ ] Submit with empty fields → validation errors
- [ ] Submit bot-like (honeypot filled) → silent reject

### Deliverables
- `src/components/forms/ContactForm.tsx`
- `src/app/actions/contact.ts` (server action)
- `src/lib/email.ts` (Formspree wrapper or Resend integration)

---

## [TASK-042]: Email Signup Form (Footer + Homepage)

**Phase:** 3 | **Size:** M (45 min)

### Description
Single reusable `<NewsletterForm>` component used in Footer (TASK-012) and Homepage (TASK-034). v1: posts to Formspree list endpoint OR Mailchimp/Buttondown API (decide in README based on founder choice — placeholder Formspree). Email only + consent checkbox.

### Dependencies
**Blockers:** TASK-012, TASK-034
**Unblocks:** TASK-049

### Acceptance Criteria
- [ ] Single email field + submit button
- [ ] Inline success: "Thanks — you're subscribed."
- [ ] Error handled gracefully
- [ ] Accessible labels (visually hidden label, placeholder not sole indicator)
- [ ] Provider URL from env var `NEWSLETTER_ENDPOINT`

### Deliverables
- `src/components/forms/NewsletterForm.tsx`
- Updated Footer + Homepage newsletter block to use it
- `.env.example` — add `NEWSLETTER_ENDPOINT`

---

## [TASK-043]: GA4 Integration

**Phase:** 3 | **Size:** S (30 min)

### Description
Add GA4 via `next/script` with measurement ID from env. Fire pageview on route change (App Router `usePathname` effect). Consent mode default `denied` for EU (future-proofing; v1 uses basic implementation).

### Dependencies
**Blockers:** TASK-010
**Unblocks:** TASK-060

### Acceptance Criteria
- [ ] `<GoogleAnalytics>` client component in layout
- [ ] `NEXT_PUBLIC_GA_ID` env var required
- [ ] Pageviews fire on route change
- [ ] Only loads in production (NODE_ENV === 'production')
- [ ] DebugView shows test pageviews

### Deliverables
- `src/components/analytics/GoogleAnalytics.tsx`
- Updated `src/app/layout.tsx`
- `.env.example` — add `NEXT_PUBLIC_GA_ID`

---

## [TASK-044]: Meta Pixel Integration

**Phase:** 3 | **Size:** S (30 min)

### Description
Add Meta Pixel via `next/script` with pixel ID from env. Fire PageView on route change. Production only.

### Dependencies
**Blockers:** TASK-010
**Unblocks:** TASK-060

### Acceptance Criteria
- [ ] `<MetaPixel>` client component
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` env var
- [ ] PageView on route change
- [ ] noscript fallback img tag
- [ ] Meta Events Manager confirms test events

### Deliverables
- `src/components/analytics/MetaPixel.tsx`
- `.env.example` updated

---

## [TASK-045]: JSON-LD Structured Data — NonprofitOrganization

**Phase:** 3 | **Size:** S (30 min)

### Description
Inject `NonprofitOrganization` JSON-LD on root layout. Fields from SiteSettings: name, url, logo, address, email, sameAs (socials), foundingLocation (Seattle), nonprofitStatus.

### Dependencies
**Blockers:** TASK-021, TASK-010
**Unblocks:** TASK-060

### Acceptance Criteria
- [ ] `<script type="application/ld+json">` emitted in `<head>` on all pages
- [ ] Google Rich Results Test validates without errors
- [ ] EIN included as `identifier` or `taxID`

### Deliverables
- `src/components/seo/OrganizationJsonLd.tsx`
- Used in `src/app/layout.tsx`

---

## [TASK-046]: JSON-LD Structured Data — Event

**Phase:** 3 | **Size:** S (30 min)

### Description
On `/events/[slug]` emit `Event` schema JSON-LD per schema.org (name, startDate, endDate, location.address, offers, performer, eventStatus, eventAttendanceMode).

### Dependencies
**Blockers:** TASK-037
**Unblocks:** TASK-060

### Acceptance Criteria
- [ ] JSON-LD rendered on event detail pages
- [ ] Rich Results Test validates
- [ ] `startDate` in ISO 8601 with timezone

### Deliverables
- `src/components/seo/EventJsonLd.tsx`

---

## [TASK-047]: Metadata + Open Graph Per Page

**Phase:** 3 | **Size:** M (45 min)

### Description
Set unique title + description + OG image on every v1 page. Default OG image generated via `app/opengraph-image.tsx` (Next.js convention) using brand colors + "Mehfil Nights" wordmark. Per-page images optional for event details (use event hero image).

### Dependencies
**Blockers:** TASK-030 through TASK-040
**Unblocks:** TASK-060

### Acceptance Criteria
- [ ] Default `opengraph-image.tsx` returns 1200x630 image
- [ ] Each page exports `metadata` with title, description
- [ ] Event detail uses event hero as OG
- [ ] Twitter card meta tags set
- [ ] `canonicalUrl` set on each page

### Deliverables
- `src/app/opengraph-image.tsx`
- Updated metadata exports on every page

---

## [TASK-048]: sitemap.xml + robots.txt

**Phase:** 3 | **Size:** S (30 min)

### Description
Generate dynamic sitemap via `src/app/sitemap.ts` including all static pages + all event slugs from Sanity. Generate `robots.ts` allowing all, disallowing `/studio` and `/dev/*`.

### Dependencies
**Blockers:** TASK-037
**Unblocks:** TASK-060

### Acceptance Criteria
- [ ] `/sitemap.xml` serves valid XML
- [ ] All static v1 routes + all event detail routes present
- [ ] `/robots.txt` disallows `/studio` and `/dev`
- [ ] `lastModified` populated

### Deliverables
- `src/app/sitemap.ts`
- `src/app/robots.ts`

---

# PHASE 4 — Accessibility + QA

Base branch for phase: `feature/phase-4-qa`

---

## [TASK-049]: axe-core Automated Sweep

**Phase:** 4 | **Size:** M (45 min)

### Description
Install `@axe-core/cli` or `axe-playwright`, run against every v1 route, fix all critical/serious violations.

### Dependencies
**Blockers:** All Phase 2 + 3 tasks
**Unblocks:** TASK-055

### Acceptance Criteria
- [ ] All 7 v1 routes scanned (`/`, `/about`, `/events`, `/events/[sample]`, `/contribute`, `/contact`, `/impact`)
- [ ] Zero critical violations
- [ ] Zero serious violations
- [ ] Report saved to `docs/qa/axe-report.md`

### Deliverables
- `docs/qa/axe-report.md`
- Fixes across affected components

---

## [TASK-050]: Keyboard Navigation Audit

**Phase:** 4 | **Size:** M (45 min)

### Description
Manual Tab-through every page. Verify: skip link works, focus visible on every interactive element, focus order logical, no keyboard traps, Escape closes mobile menu + modals, Enter/Space activate buttons.

### Dependencies
**Blockers:** All Phase 2 + 3 tasks
**Unblocks:** TASK-055

### Acceptance Criteria
- [ ] Every interactive element has visible focus ring (2px deep-olive)
- [ ] Focus order matches visual order on all pages
- [ ] Mobile menu fully keyboard operable
- [ ] Contact form + newsletter form fully keyboard operable
- [ ] No keyboard traps found
- [ ] Findings logged in `docs/qa/keyboard-audit.md`

### Deliverables
- `docs/qa/keyboard-audit.md`
- Fixes to focus styles where missing

---

## [TASK-051]: Color Contrast Audit

**Phase:** 4 | **Size:** S (30 min)

### Description
Verify all color combos in use meet WCAG AA per spec's contrast table. Test with WebAIM Contrast Checker on every text/bg pair actually used.

### Dependencies
**Blockers:** All Phase 2 tasks
**Unblocks:** TASK-055

### Acceptance Criteria
- [ ] All body text ≥ 4.5:1 contrast
- [ ] All large text (≥18pt or 14pt bold) ≥ 3:1
- [ ] All non-text UI (buttons, focus rings) ≥ 3:1
- [ ] Report in `docs/qa/contrast-audit.md` with each combo + ratio
- [ ] Any failing combos remediated

### Deliverables
- `docs/qa/contrast-audit.md`

---

## [TASK-052]: Screen Reader Spot Check (VoiceOver)

**Phase:** 4 | **Size:** M (45 min)

### Description
Manual VoiceOver pass (macOS) on homepage, events list, event detail, contact form. Verify heading hierarchy, landmarks, form field labels, button purposes, image alt text.

### Dependencies
**Blockers:** TASK-049
**Unblocks:** TASK-055

### Acceptance Criteria
- [ ] One `<h1>` per page
- [ ] Logical heading hierarchy (no skipped levels)
- [ ] Landmarks: header, nav, main, footer all present
- [ ] All images have meaningful alt or `alt=""` if decorative
- [ ] Form errors announced
- [ ] Report in `docs/qa/screen-reader-audit.md`

### Deliverables
- `docs/qa/screen-reader-audit.md`
- Fixes to heading hierarchy / alt text as found

---

## [TASK-053]: Lighthouse Pass (Target 90+)

**Phase:** 4 | **Size:** M (45 min)

### Description
Run Lighthouse (mobile + desktop) on homepage + event detail + impact page. Target 90+ across Performance, Accessibility, Best Practices, SEO. Fix any items below threshold.

### Dependencies
**Blockers:** All Phase 2 + 3 tasks
**Unblocks:** TASK-055

### Acceptance Criteria
- [ ] Desktop scores ≥ 90 on all 4 categories on 3 sample pages
- [ ] Mobile scores ≥ 85 Performance, ≥ 90 others
- [ ] Screenshots of scores in `docs/qa/lighthouse/`
- [ ] Common fixes applied: image sizing, font preload, unused JS

### Deliverables
- `docs/qa/lighthouse/*.html` or screenshots
- Performance fixes

---

## [TASK-054]: 404 + Error Pages

**Phase:** 4 | **Size:** S (30 min)

### Description
Build custom `not-found.tsx` and `error.tsx` at root. 404: friendly message, "Return home" button (turmeric). Error: apology + contact link.

### Dependencies
**Blockers:** TASK-010
**Unblocks:** TASK-055

### Acceptance Criteria
- [ ] `src/app/not-found.tsx` rendered on invalid routes
- [ ] `src/app/error.tsx` client component with reset handler
- [ ] Both styled on-brand (ivory bg, deep-olive text)
- [ ] Global nav + footer still visible

### Deliverables
- `src/app/not-found.tsx`
- `src/app/error.tsx`

---

## [TASK-055]: Final QA Checklist Sweep

**Phase:** 4 | **Size:** S (30 min)

### Description
Single-developer tick-through of every Grant-Readiness Checklist item from spec. Confirm each is findable on the live preview. Document gaps.

### Dependencies
**Blockers:** TASK-049 through TASK-054
**Unblocks:** TASK-056 (deploy)

### Acceptance Criteria
- [ ] All grant-readiness items from spec verified on preview
- [ ] Mission statement visible above fold on homepage
- [ ] 501(c)(3) + EIN on footer and donate page
- [ ] Board of Directors visible on /about
- [ ] Impact data on /impact
- [ ] Partner acknowledgement on home + /about (or scope-adjusted for v1)
- [ ] Checklist saved as `docs/qa/grant-readiness.md`

### Deliverables
- `docs/qa/grant-readiness.md`

---

# PHASE 5 — Deploy + Handoff

Base branch for phase: `feature/phase-5-deploy`

---

## [TASK-056]: Vercel Project Setup + Env Vars

**Phase:** 5 | **Size:** M (45 min)

### Description
Create Vercel project linked to GitHub repo, add env vars (Sanity IDs, newsletter endpoint, GA4 ID, Meta Pixel ID, contact email provider keys), enable preview deployments on PRs.

### Dependencies
**Blockers:** TASK-055
**Unblocks:** TASK-057, TASK-058

### Acceptance Criteria
- [ ] Vercel project created, linked to `main` branch for production
- [ ] All env vars from `.env.example` set in Vercel Project Settings
- [ ] Preview deploys auto-created on PR
- [ ] First production deployment succeeds
- [ ] Sanity CORS origin added for Vercel preview + prod domains

### Deliverables
- Vercel project (no file deliverable — configuration captured in README)

---

## [TASK-057]: GoDaddy DNS Cutover Doc

**Phase:** 5 | **Size:** M (45 min)

### Description
Write step-by-step doc with numbered instructions + placeholder `[SCREENSHOT: …]` markers. Covers: logging into GoDaddy, adding A record `@ → 76.76.21.21`, CNAME `www → cname.vercel-dns.com`, waiting for propagation, verifying in Vercel domain settings, enabling HTTPS. Founder-friendly language.

### Dependencies
**Blockers:** TASK-056
**Unblocks:** TASK-058

### Acceptance Criteria
- [ ] `docs/deploy-dns-godaddy.md` written
- [ ] Numbered steps (1, 2, 3…) with no ambiguity
- [ ] Screenshot placeholders `[SCREENSHOT: GoDaddy DNS Management page]` at each visual step
- [ ] Troubleshooting section for common issues (propagation delay, mismatched records)
- [ ] Verification commands (e.g., `dig mehfilnights.org`) explained in plain English

### Deliverables
- `docs/deploy-dns-godaddy.md`

---

## [TASK-058]: Founder-Facing README

**Phase:** 5 | **Size:** M (60 min)

### Description
Rewrite `README.md` for non-technical founder. Sections: What this is · Prerequisites (Node install, git install, GitHub account) · Clone and run locally (step-by-step) · How to deploy to Vercel · How to log into Sanity · How to edit content · Env var guide · Getting help.

### Dependencies
**Blockers:** TASK-056, TASK-057
**Unblocks:** TASK-061

### Acceptance Criteria
- [ ] README reads at 8th-grade level (assumes no dev background)
- [ ] Commands shown in copy-paste code blocks
- [ ] Links to DNS doc, CMS editor guide, Sanity Studio URL
- [ ] Prerequisites include direct download links (Node.js, Git)
- [ ] "Getting help" section lists: developer contact, Vercel support, Sanity support

### Deliverables
- `README.md`

---

## [TASK-059]: Volunteer CMS Editor Guide — "How to Add a New Event"

**Phase:** 5 | **Size:** M (45 min)

### Description
Plain-English guide for volunteers who will manage events. Covers: logging into Sanity Studio, navigating to Events, required fields (title, date, venue, image, description), image size recommendations, hitting Publish. Include "common mistakes" section.

### Dependencies
**Blockers:** TASK-026
**Unblocks:** TASK-061

### Acceptance Criteria
- [ ] `docs/cms-editor-guide.md` written
- [ ] "Add a new event" walkthrough with screenshot placeholders
- [ ] Image guidance: 1600x1000 min, JPEG or PNG, under 2MB
- [ ] Publish vs Draft explained
- [ ] "How to edit SiteSettings" (EIN, socials) mini section
- [ ] Common mistakes: forgetting alt text, wrong date format, unpublishing

### Deliverables
- `docs/cms-editor-guide.md`

---

## [TASK-060]: .env.example Finalization + Secrets Checklist

**Phase:** 5 | **Size:** S (30 min)

### Description
Ensure `.env.example` has every required var with a comment explaining what it is and where to get it. Add `docs/env-vars.md` with a table.

### Dependencies
**Blockers:** All tasks that added env vars (TASK-020, 041, 042, 043, 044)
**Unblocks:** TASK-061

### Acceptance Criteria
- [ ] `.env.example` includes: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN (if used), NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_META_PIXEL_ID, NEWSLETTER_ENDPOINT, CONTACT_FORM_ENDPOINT, SITE_URL
- [ ] Each var has a `# Comment` explaining purpose + where to get it
- [ ] `docs/env-vars.md` has table: var name · required · where to get it · example value

### Deliverables
- `.env.example`
- `docs/env-vars.md`

---

## [TASK-061]: Pre-Launch Cleanup + Go-Live

**Phase:** 5 | **Size:** M (45 min)

### Description
Remove `/dev/*` routes (token, typography, button previews), verify robots.txt blocks Studio, run final build, merge all phases to `main`, trigger production deploy, smoke test live domain after DNS propagation.

### Dependencies
**Blockers:** TASK-057, TASK-058, TASK-059, TASK-060
**Unblocks:** (launch complete)

### Acceptance Criteria
- [ ] All `/dev/*` routes deleted
- [ ] Robots.txt verified to block `/studio` and `/dev`
- [ ] `npm run build` succeeds with zero warnings
- [ ] `main` contains all merged phase branches
- [ ] Production URL `https://mehfilnights.org` serves the site
- [ ] SSL certificate valid
- [ ] Smoke test: every v1 route loads, contact form sends, newsletter form submits, Sanity-driven content renders

### Deliverables
- Clean `main` branch
- Live production site

---

## [TASK-062]: Launch Day Handoff Meeting Prep

**Phase:** 5 | **Size:** S (30 min)

### Description
Prepare a 1-page handoff summary for founder: URLs (site, Studio, Vercel dashboard, GitHub repo, DNS provider), credentials checklist (founder owns accounts), ongoing cost estimate, "when to call a developer" guide.

### Dependencies
**Blockers:** TASK-061
**Unblocks:** (launch complete)

### Acceptance Criteria
- [ ] `docs/handoff-summary.md` written
- [ ] All URLs listed
- [ ] Founder confirms account ownership on each (Vercel, Sanity, GoDaddy, GA4, Meta, GitHub, Formspree)
- [ ] Monthly cost estimate table (Vercel free/Pro, Sanity free tier, domain renewal)
- [ ] "When to call a developer" scenarios listed (schema changes, new page types, integrations)

### Deliverables
- `docs/handoff-summary.md`

---

## Quality Requirements (Project-Level)

- [ ] All 62 tasks completed with DoD met
- [ ] WCAG 2.1 AA compliance validated (Phase 4)
- [ ] Lighthouse ≥ 90 on homepage, event detail, impact
- [ ] Founder signs off on README + CMS editor guide
- [ ] Live at `mehfilnights.org` with HTTPS
- [ ] All 7 v1 routes functional
- [ ] Contact form delivers email; newsletter form subscribes email

---

## Technical Notes

**Development Stack (exact):** Next.js 14+ App Router, TypeScript, React Server Components, Tailwind CSS (custom v3 brand tokens), Sanity.io headless CMS, Vercel hosting, React Hook Form + Zod + Formspree or Next.js server actions, GA4, Meta Pixel, JSON-LD (Event + NonprofitOrganization), next/image, Google Fonts (DM Serif Display / Instrument Serif / Plus Jakarta Sans).

**Timeline Expectations:** ~47 dev hours across 62 tasks. Realistically 2.5–3 weeks at 20 hrs/week for one developer, or 1.5 weeks full-time, including founder review cycles.

**Branch Strategy:** 6 phase branches off `main`; each task is its own feature branch off its phase branch. Merge phase branches to `main` via PR only after full-phase QA.
