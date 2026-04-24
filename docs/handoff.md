# Mehfil Nights — Session Handoff Doc

> **Purpose:** Upload this file at the start of a new Claude session to give it full context. The new Claude can read this + the linked files and pick up exactly where we left off.

**Last updated:** 2026-04-24

---

## Who & what

**Founder:** Shubhangi Bansal (`shubhangibansal999@gmail.com`, GitHub: `shubhangibansal999`)
**Cofounder:** non-technical, prefers visual/no-code tools.
**Org:** Mehfil Nights — Seattle-based 501(c)(3) cultural arts nonprofit. South Asian live music in cozy intimate venues. Mission: build community, support artists, educate.
**Domains:** `mehfilnights.org` (this project, the new nonprofit site) + `mehfilnights.com` (existing commercial site, stays for ticketing).
**Founder profile:** vibe-coder — non-technical, comfortable directing AI but doesn't code. Strong preference for FEW platforms. Tone with founder: warm, plain English, no jargon.

---

## Project location on disk

```
/Users/shubhangihome/Documents/Claude/Mehfil Code/
```

This is a git repo connected to `https://github.com/shubhangibansal999/mehfilnights` (public).

**Run the dev server with:** `cd "/Users/shubhangihome/Documents/Claude/Mehfil Code" && npm run dev`

---

## Live site

**URL:** https://mehfilnightsvercel.vercel.app/

Auto-deploys from `main` branch on every push (~60 seconds end-to-end).

---

## Platform stack (final, locked)

| Platform | Job | Status |
|---|---|---|
| **GoDaddy** | Domain registrar (`mehfilnights.org`) + commercial event ticket products on `.com` | ✅ |
| **GitHub** | Source of truth for site code | ✅ Auth set up via PAT in macOS Keychain |
| **Vercel** | Hosts the .org Next.js site, auto-deploys on push | ✅ Connected to GitHub repo |
| **Mailchimp** | Email list / newsletter | 🟡 Account exists, not yet wired into the site |
| **PayPal** | Donation processing | 🟡 Existing account, not yet wired into the site |

**Explicit non-platforms:** No Sanity, no Formspree, no Stripe, no Wix, no Squarespace, no Shopify. Founder pushed back hard on adding more platforms. Content lives in code files.

---

## What's been built (Phase 0–2 done)

**Tech:** Next.js 15 (App Router) + TypeScript + Tailwind v4 + 3 Google Fonts (DM Serif Display, Instrument Serif, Plus Jakarta Sans). Tailwind theme tokens for the full v3 brand palette in `src/app/globals.css`.

**Routes live:**
- `/` Home (hero, impact stats with scroll-triggered count-up, "what is a mehfil", 3 program pillars, upcoming events, partner strip, founder blurb, newsletter, donate band)
- `/about` Mission/Vision/Values, story, programs recap, commitments, 501(c)(3) trust block, press, dual-CTA closer
- `/events` Upcoming list (ivory) + past archive (deep olive) — currently empty (placeholder events removed; awaiting real ones)
- `/events/[slug]` Dynamic event detail with JSON-LD `Event` schema
- `/donate` Hero, gift table (4 tiers), PayPal embed container (placeholder), tax block, "other ways to help"
- `/impact` Expanded stats, milestone timeline, 3 stories, partner groups, PDF download placeholder
- `/contact` Dynamic form (4 subject flows: General, Volunteer, Artist, Private Event), FAQ accordion, direct contact

**Saffron discipline (per brand spec):** Saffron color used for Donate ONLY. Exactly 4 instances site-wide: Header donate button, Homepage donate band, Donate page hero, Donate page closer.

**Events workflow (no CMS):**
- Event data lives in `src/lib/events.ts` (typed, with helper functions)
- Tickets remain on GoDaddy (existing event products at `mehfilnights.com/p/...`)
- The .org `ticketUrl` field links out to GoDaddy product pages
- To add a new event: founder messages dev with one-liner (title, date, venue, description, GoDaddy URL); dev adds entry to `events.ts` and pushes; site updates in 60s

---

## Files to read in priority order (for full context)

1. **`docs/prd-v1.md`** — Vansh's product requirements doc (what's in v1, what's deferred, top 5 risks, 30/60/90-day measurement plan)
2. **`docs/tasks-v1.md`** — Shubhangi's 62-task breakdown across 6 phases
3. **`docs/decisions-log.md`** — All confirmed decisions, open items, deferred items, risks (READ THIS FIRST FOR CURRENT STATE)
4. **`docs/design/homepage-v1.md` + 5 page specs in `docs/design/`** — Saloni's design rationale per page
5. **`docs/research/platform-comparison.md`** — 12-platform evaluation (Givebutter ranked #1)
6. **`docs/research/givebutter-ticketing-deep-dive.md`** — Givebutter ticketing specifics (event setup, check-in, promo codes, bundles, fees)
7. **`docs/research/zeffy-vs-givebutter.md`** — Head-to-head verdict (Givebutter wins, 80% confidence)

---

## Available agents

The project has 5 specialized agents you can dispatch with the Agent tool:

| Agent | Scope | Role |
|---|---|---|
| **Saloni** | Project (`.claude/agents/saloni.md`) | Senior UX/UI designer for nonprofit websites — design specs, copy, brand reviews |
| **Rishi** | Global (`~/.claude/agents/rishi.md`) | Frontend developer — implements UI, accessibility, performance |
| **Krish** | Global (`~/.claude/agents/krish.md`) | Code reviewer — security, maintainability, blockers vs nits |
| **Shubhangi** | Global (`~/.claude/agents/shubhangi.md`) | Project manager — converts specs into sized 30-60min dev tasks |
| **Vansh** | Global (`~/.claude/agents/vansh.md`) | Product manager — PRDs, strategy, platform research, GTM |

Vansh has WebFetch + WebSearch tools for research.

---

## Decisions resolved

| # | Decision |
|---|---|
| 1 | Donations via **PayPal** (Stripe = v2) |
| 2 | Email list via **Mailchimp** |
| 3 | EIN: founder will share when ready, publish in footer + /donate + /impact + /contact FAQ |
| 4 | **No Sanity CMS** — content lives in code files |
| 5 | Events stay on GoDaddy (existing workflow); .org links out for ticket purchase |
| 6 | After v1 launch: redirect mehfilnights.com → .org (currently .org redirects to .com) |
| 7 | Custom Next.js+Vercel site **stays** — not migrating to Wix/Squarespace/Shopify |
| 8 | Hero CTA wording: soft "Support Our Mission" above fold, direct "Donate Now" in closer band |

## Decisions still open

| Item | Owner | Blocker for? |
|---|---|---|
| **Board publication policy on /about** — A) skip team section (pending default), B) names + roles only, C) anonymized roles, D) full names+photos+bios | Founder + cofounder | v1 launch (grant-readiness) |
| **Givebutter vs Zeffy vs Donorbox** for ops platform — research is done, pending decision | Founder + cofounder | Wiring up donate button + memberships + CRM |
| **Real EIN** | Founder | Multiple page footers + /donate + /impact + /contact FAQ |
| **Real impact numbers** (audience, artists, events, volunteer hours) | Founder | Homepage + /impact (currently realistic placeholders) |
| **3 real impact stories** | Founder + Saloni | /impact stories section |
| **First real event(s)** to put on /events | Founder | /events page (currently empty state) |
| **Mailchimp embed code/API** | Founder | Newsletter signup wiring (currently console-logs only) |
| **Contact form backend** — mailto vs Mailchimp form vs server action | Founder + dev | Contact form actually delivering submissions |

## TODO(founder) markers in code

42 inline `TODO(founder)` comments across the codebase mark every placeholder. Grep for them: `grep -r "TODO(founder)" src/`

Includes: EIN (×6), impact numbers, founder name + title, partner logo images, real event data, Mailchimp keys, donation URL, contact email, social handles, FAQ content, impact PDF file.

---

## Common next-step paths from this point

Pick ONE based on the founder's intent in the new session:

### Path A — GoDaddy DNS cutover
Point `mehfilnights.org` from current redirect-to-.com to **Vercel**. Steps: log into GoDaddy DNS settings, change A record + CNAME to Vercel's values (Vercel dashboard provides exact values per domain), wait ~10-30 min for propagation, verify on `https://mehfilnights.org`. Vercel handles SSL automatically. Keep mehfilnights.com alive (don't break it).

### Path B — Set up Givebutter (or Zeffy) for ops
Founder creates account, shares project ID + API/embed credentials, dev wires donation button + ticketing on /donate page. ~2 hours.

### Path C — Wire up Mailchimp newsletter signup
Founder pastes Mailchimp signup form embed code; dev replaces the stub `<form onSubmit={…}>` in NewsletterSignup component with the real Mailchimp form. ~30 min.

### Path D — Wire up PayPal donate button
Founder shares hosted-button ID from PayPal nonprofit dashboard; dev replaces the placeholder PayPal embed container on /donate. ~30 min.

### Path E — Contact form backend
Replace stub `console.log` with either (a) `mailto:` link (no platform), (b) Mailchimp's contact form embed, or (c) a Next.js server action emailing via a free tier service. ~1-2 hr.

### Path F — Resolve the board-publication question
Have the founder make the call between options A/B/C/D, then dev adjusts /about page accordingly. ~30 min.

### Path G — Add first real events
Founder provides event details + GoDaddy product URL; dev adds entries to `src/lib/events.ts`. ~10 min per event.

### Path H — Pre-launch QA pass
Lighthouse audit, axe-core a11y scan, manual keyboard nav test, mobile spot-check on iOS Safari + Android Chrome, fix any contrast/aria issues. ~2 hr.

---

## How to resume in a new session

1. **Open Claude Code** in `/Users/shubhangihome/Documents/Claude/Mehfil Code/`
2. **Verify agents are loaded** — type `/agents` (should see Saloni in this project, plus Rishi, Krish, Shubhangi, Vansh globally)
3. **Upload or paste this handoff file** — say something like *"Here's the context from my previous session"* and reference this file path
4. **State what you want to do** — pick one of the paths above OR describe new direction
5. **Claude reads `docs/decisions-log.md` + this handoff** before starting work

If the founder wants to do something completely different (e.g., research a different platform, add a new page, redesign), the agents (Vansh, Saloni, Rishi) can handle that — point them at the spec/research/code as needed.

---

## Tone & approach reminders

- Founder is non-technical — keep explanations in plain English, no jargon, use analogies
- Founder pushes back on platform sprawl — never add a new platform without explicit founder approval
- Use AskUserQuestion liberally to disambiguate before doing big work
- Commit per logical chunk, push so Vercel auto-deploys, hard-refresh URL to verify
- Save research/decisions to `docs/` so they persist across sessions
- The agents have personalities — invoke them by name (Saloni for design, Rishi for code, etc.)

---

## Quick site smoke test

```bash
# In a new terminal, verify everything's healthy
cd "/Users/shubhangihome/Documents/Claude/Mehfil Code"
git status              # should be clean
git log --oneline -5    # see latest 5 commits
npm run build           # verify clean build
# Live site: https://mehfilnightsvercel.vercel.app/
```

---

*Generated 2026-04-24. Update this file when major decisions change so the next session starts with current truth.*
