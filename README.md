# Mehfil Nights — Website

The official website for **Mehfil Nights** — a Seattle-based 501(c)(3) nonprofit arts organization building community through South Asian live music.

🌐 **Live site:** [mehfilnights.org](https://mehfilnights.org) *(launching v1)*

---

## Project Overview

This repository contains the Next.js source code for mehfilnights.org. The site is designed for grant reviewers, donors, community members, and artists, with a brand system rooted in South Asian cultural heritage (saffron, turmeric, deep olive) balanced with nonprofit trust tones (ivory, trust teal, sage).

## Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS + custom design tokens (see `docs/` for v3 brand guidelines)
- **CMS:** Sanity.io (headless — events, team, partners, impact stats)
- **Hosting:** Vercel (domain at GoDaddy, DNS pointed to Vercel)
- **Forms:** React Hook Form + Formspree / server actions
- **Analytics:** GA4
- **Accessibility:** WCAG 2.1 AA compliant

## Status

🚧 **In active development** — v1 scope locked, 3-week build target.

- [x] v1 scope approved (see `docs/prd-v1.md`)
- [x] Task breakdown complete (see `docs/tasks-v1.md`)
- [ ] Phase 0 — Repo scaffolding
- [ ] Phase 1 — CMS setup
- [ ] Phase 2 — Core pages
- [ ] Phase 3 — Integrations
- [ ] Phase 4 — Accessibility + QA
- [ ] Phase 5 — Deploy + handoff

## Documentation

- [`docs/prd-v1.md`](docs/prd-v1.md) — Product requirements, v1 scope, success metrics
- [`docs/tasks-v1.md`](docs/tasks-v1.md) — 62-task dev breakdown
- [`docs/decisions-log.md`](docs/decisions-log.md) — Founder decisions + open items + risks

## Getting Started (for developers)

```bash
# Install dependencies (after Next.js scaffold lands)
npm install

# Run the dev server
npm run dev

# Open http://localhost:3000
```

## License

All rights reserved — Mehfil Nights (501(c)(3)).
