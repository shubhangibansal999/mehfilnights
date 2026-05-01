# Mehfil Nights — Website

The official website for **Mehfil Nights** — a Seattle-based 501(c)(3) nonprofit arts organization building community through South Asian live music.

🌐 **Future home:** [mehfilnights.org](https://mehfilnights.org) — currently redirects to mehfilnights.com; this codebase will replace it once a host is connected.

---

## Project Overview

This repository contains the Next.js source code for the upcoming mehfilnights.org website. The site is designed for grant reviewers, donors, community members, and artists, with a brand system rooted in South Asian cultural heritage (saffron, turmeric, deep olive) balanced with nonprofit trust tones (ivory, trust teal, sage).

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + custom design tokens (see `docs/design/` for the v3 brand guidelines)
- **Content:** Code-managed (no CMS — content lives in `src/lib/events.ts` and component files; edited per founder request)
- **Forms:** Native React form components (no third-party form backend yet — newsletter & contact form handlers are stubbed)
- **Accessibility:** WCAG 2.1 AA compliant by design

## Hosting

🟡 **Currently un-hosted.** Code lives on GitHub. The previous Vercel deployment was paused/deleted to reduce platform footprint. Re-host options when ready: Vercel (1-click re-import), Netlify, Cloudflare Pages, GoDaddy cPanel (via Next.js static export), or any Node.js host.

## Status

🚧 **In active development** — v1 scope locked, all 6 routes built.

- [x] v1 scope approved (see `docs/prd-v1.md`)
- [x] Task breakdown complete (see `docs/tasks-v1.md`)
- [x] Phase 0 — Repo + scaffolding
- [x] Phase 1 — Design system foundations
- [x] Phase 2 — All 6 core pages built
- [ ] Phase 3 — Real integrations (PayPal, Mailchimp, contact form backend)
- [ ] Phase 4 — Accessibility + Lighthouse pass
- [ ] Phase 5 — Re-host + DNS cutover to mehfilnights.org

## Documentation

- [`docs/handoff.md`](docs/handoff.md) — **READ FIRST** if resuming after a break or in a new session
- [`docs/decisions-log.md`](docs/decisions-log.md) — Confirmed decisions, open items, risks
- [`docs/prd-v1.md`](docs/prd-v1.md) — Product requirements, v1 scope, success metrics
- [`docs/tasks-v1.md`](docs/tasks-v1.md) — 62-task dev breakdown
- [`docs/design/`](docs/design/) — Per-page design specs (homepage + 5 interior pages)
- [`docs/research/`](docs/research/) — Platform comparison + Givebutter ticketing deep-dive + Zeffy comparison

## Getting Started (for developers)

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Open http://localhost:3000
```

## License

All rights reserved — Mehfil Nights (501(c)(3)).
