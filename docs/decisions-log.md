# Mehfil Nights .org — Decisions Log

Tracks answers to Vansh's six open questions and items deferred to later versions.

Last updated: 2026-04-24

---

## Platform Stack (final, no new platforms)

| Platform | Purpose |
|---|---|
| **GoDaddy** | Domain registrar · event product pages for ticket sales |
| **GitHub** | Source of truth for site code |
| **Vercel** | Hosts the .org site · auto-deploys on every push |
| **PayPal** | Donation processing (existing account) |
| **Mailchimp** | Email list · newsletter signups |

**No Sanity CMS.** Content (events, impact numbers, etc.) lives in code files edited directly. Reason: founder prefers fewer platforms; nonprofit's content-update frequency (few events/quarter) doesn't justify a separate CMS.

---

## Confirmed Decisions (v1)

| # | Question | Decision | Notes |
|---|---|---|---|
| 1 | Donation processor | **PayPal** | Use existing PayPal embed styled to match brand. Stripe = v2 project. |
| 2 | Email list provider | **Mailchimp** | Free tier up to 500. Founder to create account when we hit signup form task. |
| 3 | 501(c)(3) status + EIN | **Approved, founder will share EIN** | Publish in footer + /donate page as soon as founder provides it. |
| 4 | Board/advisory publication | **PENDING** (see Open Items) | Founder to confirm with company founder before v1 launch. Default for now: ship without team section; add later if approved. |
| 5 | Impact data + stories | **Numbers ready, stories TBD** | Founder will provide impact numbers. Vansh + Saloni will draft story prose from event notes. |
| 6 | .com vs .org | **Currently .org redirects to .com. After v1 launch: flip so .com redirects to .org; .org becomes primary.** | DNS cutover happens in Week 3. Mehfilnights.com stays alive as a simple redirect. |
| 7 | CMS (added 2026-04-24) | **No CMS** | Dropped Sanity. Content edited in code files (src/lib/events.ts for events, component files for copy). Revisit in v2 if pain point. |
| 8 | Events management (added 2026-04-24) | **Tickets on GoDaddy, summaries on .org** | Events remain products on mehfilnights.com. .org /events page shows event summaries; "Get Tickets" CTAs link out to GoDaddy product URLs. |
| 9 | Hosting (added 2026-04-24) | **Vercel deployment deleted; code stays on GitHub** | Founder paused hosting to reduce platform footprint while finalizing operations-platform decision (Givebutter vs Zeffy vs Donorbox). Code remains fully portable — re-host on Vercel/Netlify/Cloudflare/etc in ~60 seconds when ready. |

---

## Open Items (resolve before v1 launch)

- [ ] **Board publication policy** — Founder of Mehfil Nights to decide between:
  - A. Nothing in v1 (defer fully)
  - B. Names + roles only (recommended — balances grant signal with privacy)
  - C. Roles only, no names
  - D. Full publication (names + photos + bios)

  Deadline: before v1 ships (end of Week 3). Impact: grant-readiness signal and /about page design.

---

## Deferred Items (v2, v3, or beyond)

### Deferred to v2 (per Vansh's PRD)
- Stripe payments integration
- Blog / editorial CMS
- Gallery page
- Mehfil Music Archive
- Meet Our Artists directory
- At-Home booking form (commercial service — stays on .com for now)
- Mehfil-ites community hub
- Newsletter archive page
- Advanced search / filters
- Multilingual content (Hindi / Urdu / Punjabi)
- Press & Media standalone page
- Partners & Supporters standalone page
- Mega-menu navigation
- Meta Pixel + advanced retargeting
- Event calendar grid view
- Electronic Press Kit PDF

### Deferred to v3 (added by founder)
- Full board of directors + advisory listing with photos + bios (pending founder decision for v1 — may move up)

---

## Risk Tracking

| Risk | Status | Mitigation |
|---|---|---|
| Timeline slip | Monitoring | Shubhangi's 62-task breakdown with explicit daily gates |
| Content editing bottleneck (no CMS) | Monitoring | Founder messages developer with event/content updates; dev applies in ~60s. Acceptable at ~5-10 content edits/quarter. Swap to a CMS in v2 if this becomes a pain point. |
| Payment processor integration complexity | **Mitigated** | Using PayPal (already live on .com) |
| Content readiness (bios, copy, impact numbers, partner logos) | Open | Content deadline = end of Week 2. Parallel content track with founder. |
| Accessibility compliance | Open | axe-core + Lighthouse on every PR; alt text required in image props; manual keyboard + VoiceOver pass pre-launch |
| Grant signal weakness without board publication | **NEW — open** | Founder to consult company founder; default without team section until decided |

---

## Sign-off

- [ ] Founder approves v1 scope as defined in `prd-v1.md` + this log
- [ ] Shubhangi task list approved for execution (`tasks-v1.md`)
- [ ] Ready to begin Phase 0 (scaffolding + repo)
