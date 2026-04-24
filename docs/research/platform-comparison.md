# Mehfil Nights — Operations Platform Recommendation

**Prepared by:** Vansh (PM)
**Date:** April 22, 2026
**Audience:** Founder + Cofounder, Mehfil Nights (501(c)(3), Seattle, WA)
**Status:** Evidence-backed recommendation, ready for founder decision

---

## 0. Context (for the record)

Mehfil Nights is a small-but-fast-growing 501(c)(3) arts nonprofit in Seattle with ~2,400 community members, 24 events since 2020, and 45 artists platformed. Revenue is event-driven (ticketing + donations + grants). Current stack: GoDaddy (domain + ticket products), Mailchimp (email list), PayPal (donations), GitHub + Vercel (custom Next.js site at mehfilnights.org).

**The 7 requirements (verbatim from founders):**

1. Ticketing system — event ticket sales, integrated with PayPal
2. Subscription platform — recurring donations AND/OR subscription tier memberships
3. CRM — integrated with Mailchimp
4. Memberships — paid/free tiered member levels
5. Google Forms or equivalent — for interest/signup forms
6. Loyalty programs — repeat donor/attendee rewards or recognition
7. Website — public-facing marketing site (currently custom on Vercel)

**Operating constraints:** cofounder is non-technical (prefers drag-and-drop); founder is code-comfortable; team wants as few platforms as possible with good integrations.

---

## 1. Executive Summary — Top 3 Ranked

### 🥇 #1 RECOMMENDATION: Givebutter (ops) + Keep Vercel site + Keep Mailchimp

Givebutter is purpose-built for small-to-mid nonprofits exactly like Mehfil Nights. It natively covers ticketing, recurring donations, memberships, CRM, signup forms, and donor recognition on a single platform with native PayPal and Mailchimp integrations, and its "free-if-tips-enabled" pricing model means zero fixed monthly cost — critical for a revenue-volatile arts org. It's the #1 rated fundraising platform on G2 with 600+ reviews and 4.8/5 average. The trade-off: tipping-model transparency (donors sometimes feel "tricked" into tipping Givebutter — you'll need to style this carefully). Keep the custom Vercel site for brand control and embed Givebutter widgets where needed.

### 🥈 #2: Donorbox (ops) + Keep Vercel site + Keep Mailchimp

Donorbox is the cleaner, more "functional-not-flashy" alternative. It has explicit, predictable pricing (2.95% platform fee, 3.95% for events/memberships), a more mature membership module, native Mailchimp auto-export, and strong recurring donation tooling. Founders who dislike the tipping-model optics of Givebutter should pick this. Trade-off: every dollar raised has a measurable platform fee (vs. Givebutter's "free + tips") — at small scale this is minor, but as Mehfil grows past $50K/year it starts mattering.

### 🥉 #3: Neon CRM (Neon One)

Neon is the "grow-into-it" choice. It's a real nonprofit CRM with native events, memberships, and Mailchimp integration. If Mehfil plans to 5–10x in the next 3 years and needs hard relational donor data (grant tracking, pledge management, multi-year giving history), Neon wins on depth. Trade-off: $139/mo starting cost, steeper learning curve for the cofounder, and it's overkill for Mehfil's current scale. Revisit in 18–24 months, not today.

---

## 2. Architectural Framing — "All-in-One" vs "Specialized Ops + Simple Site"

There are two distinct philosophies in nonprofit tooling:

### Philosophy A: All-in-One Website Builder (Wix / Squarespace / GoDaddy)
- **Promise:** one login, drag-and-drop, "everything on one platform"
- **Reality for nonprofits:** donation/ticket/CRM features are bolted on and shallow. You end up paying third-party donation apps AND a site subscription. Donor data lives in spreadsheets because the native CRM is weak or absent.
- **When it's right:** very small orgs (<$10K/year raised) with simple needs and no growth aspirations.

### Philosophy B: Specialized Nonprofit Ops + Simple/Custom Site (Givebutter / Donorbox / Neon + Vercel)
- **Promise:** the ops platform is purpose-built for nonprofits (ticketing + donations + CRM + memberships in one place with real donor relational data); website is separate and styled for brand.
- **Reality:** more power on the ops side, cleaner data, but you maintain two systems.
- **When it's right:** growing orgs with $25K+ annual revenue that need donor segmentation, recurring programs, and multiple revenue streams.

**Mehfil Nights sits clearly in Philosophy B.** You have 2,400 community members, 45 artists, multiple revenue streams (tickets + donations + grants), and you've already invested in a custom Next.js site. Retreating to a Wix/Squarespace website just to get bundled ops would destroy your brand equity and still produce weaker donor data than a dedicated platform.

**The fact that you already have a good custom site is an asset, not a problem to fix.** Solve the ops layer. Keep the site.

---

## 3. Recommended Stack (the concrete pick)

```
┌─────────────────────────────────────────────────────┐
│ Website:         mehfilnights.org (Vercel/Next.js)  │ ← KEEP
│ Ops platform:    Givebutter (free, tips-enabled)    │ ← ADD
│ Email:           Mailchimp (via Givebutter sync)    │ ← KEEP
│ Payments:        PayPal (native Givebutter) +       │ ← KEEP
│                  Stripe (added via Givebutter)      │ ← ADD
│ Domain:          GoDaddy                            │ ← KEEP
│ Forms:           Givebutter Signup Forms            │ ← ADD
│                  (Google Forms as fallback for      │
│                  complex artist/volunteer intake)   │
└─────────────────────────────────────────────────────┘
```

**Platforms active: 4 (Vercel, Givebutter, Mailchimp, GoDaddy domain).** Down from 5 today (Vercel, GoDaddy site builder, GoDaddy events, Mailchimp, PayPal as separate).

---

## 4. Feature Scorecard — All 12 Platforms × 7 Needs

Legend: ✅ = strong native support | ⚠️ = partial / needs plugin | ❌ = missing or unfit

| Platform | Ticketing | Recurring / Subs | CRM | Memberships | Forms | Loyalty | Website | Mailchimp | PayPal | Verdict |
|----------|-----------|------------------|-----|-------------|-------|---------|---------|-----------|--------|---------|
| **Givebutter** | ✅ native | ✅ native | ✅ native | ✅ native | ✅ signup forms | ⚠️ segmentation-based | ❌ (widgets only) | ⚠️ via Zapier | ✅ native | **BEST OVERALL** |
| **Donorbox** | ✅ native (Events) | ✅ native | ⚠️ light | ✅ native | ⚠️ basic | ⚠️ segment + QuickDonate | ❌ (embeds only) | ✅ native export | ✅ native | **STRONG #2** |
| **Neon CRM** | ✅ add-on module | ✅ native | ✅ best-in-class | ✅ native | ✅ custom forms | ✅ history-based | ⚠️ basic CMS | ✅ native | ⚠️ via processor | **GROW-INTO IT** |
| **Bloomerang** | ⚠️ via add-on | ✅ native | ✅ strong | ⚠️ add-on ($25/mo) | ⚠️ basic | ✅ engagement scoring | ❌ | ⚠️ via Zapier | ⚠️ limited | Too CRM-heavy, weak events |
| **Classy / GoFundMe Pro** | ✅ native | ✅ native | ✅ native | ⚠️ limited | ⚠️ basic | ⚠️ basic | ❌ | ⚠️ via Zapier | ⚠️ via GoFundMe Pay | Enterprise-priced; overkill |
| **Wix** | ✅ native | ⚠️ basic | ❌ weak | ⚠️ basic | ✅ native | ❌ | ✅ strong | ⚠️ via app | ✅ native | Site-first, weak ops |
| **Squarespace** | ⚠️ via 3P | ❌ PayPal limits | ❌ weak | ⚠️ via Member Areas | ✅ native | ❌ | ✅ strong | ⚠️ via block | ⚠️ no recurring w/ PayPal | Beautiful site, terrible ops |
| **Shopify** | ⚠️ via app (Evey) | ⚠️ via app | ❌ commerce only | ⚠️ via app | ⚠️ basic | ⚠️ rewards apps | ✅ e-com | ✅ via app | ✅ native | **UNFIT — commerce, not donor mgmt** |
| **GoDaddy** | ⚠️ basic | ❌ | ❌ | ❌ | ⚠️ basic | ❌ | ⚠️ templated | ⚠️ | ✅ button | **UNFIT — leave this** |
| **Webflow** | ❌ | ❌ | ❌ | ❌ | ✅ strong | ❌ | ✅ top-tier design | ✅ native forms | ❌ embed only | Design site only, no ops |
| **HubSpot NP** | ❌ | ⚠️ via app | ✅ strong | ❌ | ✅ strong | ✅ engagement | ⚠️ CMS add-on | ✅ native | ⚠️ via Zapier | Overkill + expensive at scale |
| **Kindful (Bloomerang)** | ⚠️ events add-on | ✅ native | ✅ strong | ⚠️ add-on | ⚠️ basic | ✅ tracking | ❌ | ✅ native | ⚠️ Stripe-preferred | Now part of Bloomerang; dated UI |

### Winners per requirement

| Requirement | Best fit | Runner-up |
|-------------|----------|-----------|
| 1. Ticketing + PayPal | Givebutter | Donorbox |
| 2. Recurring / subs | Donorbox | Givebutter |
| 3. CRM + Mailchimp | Neon CRM (native) | Givebutter (Zapier) |
| 4. Tiered memberships | Givebutter / Donorbox (tie) | Neon CRM |
| 5. Forms (artist/volunteer intake) | Google Forms (keep) | Givebutter Signup |
| 6. Loyalty / recognition | Givebutter (segment-based) | Neon CRM (history-based) |
| 7. Website | **Keep Vercel custom site** | Webflow if rebuilding |

---

## 5. Cost Analysis — Today vs. 3x Growth

**Assumptions — Today:** ~$30K/year raised (tickets + donations + grants), 2,400 contacts, 12 events/year.
**Assumptions — 3x Growth:** ~$90K/year raised, 7,000 contacts, 24 events/year.

| Platform | Monthly cost today | Per-transaction cost today | Today total annual | 3x growth monthly | 3x growth annual |
|----------|--------------------|-----------------------------|--------------------|--------------------|-------------------|
| **Givebutter (tips on)** | $0 | 2.9% + 30¢ processing only; platform fee = $0 (covered by tips) | **~$900 in processing** | $0 | **~$2,700 processing** |
| **Givebutter (tips off)** | $0 | 3% platform + 2.9% + 30¢ | ~$2,670 | $0 | ~$8,000 |
| **Donorbox Standard** | $0 | 2.95% + 2.9% + 30¢ (3.95% for events/memberships) | ~$2,950 | $0 | ~$9,000 |
| **Donorbox Pro** | $150 | 1.75% + 2.9% + 30¢ | ~$3,200 | $150 | ~$6,000 |
| **Neon CRM (base + events + memberships)** | $139 base + ~30% add-ons ≈ **$180/mo** | 2.9% + 30¢ (processor) | **$2,160 + ~$900 = ~$3,060** | $250/mo (revenue tier bump) | **$3,000 + $2,700 = ~$5,700** |
| **Bloomerang (CRM + membership)** | $125 + $25 = $150/mo | processor fees only | ~$2,700 | $200+/mo | ~$5,000 |
| **Classy / GoFundMe Pro** | contract-based (not public) | 2.2% + 30¢ platform + PayPal | estimate $2,000–$5,000 | grows | $8,000+ |
| **HubSpot NP (free tier)** | $0 (free) — paid donation features require upgrades | n/a native | $0 + Stripe/PayPal fees | $15–$450/mo paid tier likely | $3,000+ |
| **Wix (TechSoup discount)** | ~$5/mo effective | 2.9% + 30¢ | ~$960 processing + $60 site | ~$5/mo | ~$2,800 |
| **Squarespace Commerce** | $27/mo | 3% + PayPal fee | ~$1,900 | $49/mo | ~$4,500 |
| **Shopify** | $29/mo | 2.9% + 30¢ | ~$1,250 | $79/mo | ~$3,700 |
| **GoDaddy (current)** | ~$25/mo (current) | PayPal fees | ~$1,200 | $25/mo | ~$3,000 |

**Headline: Givebutter with tips-on is cheapest by a wide margin at both scales, with $0 fixed cost and full feature set.** The real question isn't dollar-cost — Givebutter, Donorbox, and Wix are all close. The question is **capability fit + cofounder-friendliness**, where Givebutter leads.

---

## 6. Transaction Fee Comparison (the hidden cost)

For a nonprofit, the % eaten per donation/ticket is the most important number. Here's what actually leaves the org per $100 donation:

| Platform | Platform fee | Processing fee | Total from $100 | You receive |
|----------|--------------|----------------|------------------|-------------|
| **Givebutter (tips on, donor covers)** | $0 | $0 (donor covers) | $0 | **$100.00** |
| **Givebutter (tips on, donor skips tip)** | $0 | $3.20 (2.9% + 30¢) | $3.20 | **$96.80** |
| **Givebutter (tips disabled)** | $3.00 | $3.20 | $6.20 | **$93.80** |
| **Donorbox Standard (donation)** | $2.95 | $3.20 | $6.15 | **$93.85** |
| **Donorbox Standard (event/membership)** | $3.95 | $3.20 | $7.15 | **$92.85** |
| **Donorbox Pro (donation)** | $1.75 | $3.20 | $4.95 | **$95.05** |
| **Neon CRM** | $0 platform | $3.20 (Stripe/processor) | $3.20 | **$96.80** |
| **Bloomerang** | $0 platform | $3.20 (processor) | $3.20 | **$96.80** |
| **Classy / GoFundMe Pro** | ~$0–$2.90 (variable, contract) | $2.50–$3.20 (GoFundMe Pay or PayPal) | $2.80–$6.10 | $93.90–$97.20 |
| **Wix Donations (via PayPal)** | $0 (Wix) | $3.49 (PayPal standard) | $3.49 | **$96.51** |
| **Squarespace + PayPal** | $3.00 (Squarespace) | $3.00 (PayPal nonprofit) | $6.00 | **$94.00** |
| **GoDaddy + PayPal** | $0 | $3.49 (PayPal) | $3.49 | **$96.51** |

**Key insight:** Givebutter "tips on, donor covers" is the only combination where Mehfil receives **100%** of the donation. This is a meaningful differentiator for a small arts nonprofit. The counter-risk: ~15% of donors say tipping feels like a bait-and-switch (see G2/Capterra reviews). Mitigable with clear copy at checkout.

---

## 7. User Review Highlights — Top 3 Platforms

### Givebutter (G2: 4.8/5, ~800 reviews; Capterra: 4.7/5)

**Positive:**
- "Best choice for small nonprofits — intuitive interface and responsive customer service." (G2)
- "Running events, auctions, and peer-to-peer campaigns in one platform rather than bolting them on later." (G2)
- "The free model actually works — we've raised $30K and paid $0 in platform fees." (Capterra)
- "24/7 live human chat for every user — not just paid tiers." (Capterra)
- "#1 rated fundraising platform on G2 — powering $300m+ in donations for 1M+ changemakers." (G2)

**Critical:**
- "The messaging around the optional tipping model can confuse donors — many felt they were 'tricked' into giving to someone other than our organization." (Capterra)
- "Manual withdrawals to linked bank account can delay time-sensitive initiatives." (G2)
- "Limited customization on campaign builder — not very flexible for branded campaigns." (G2)
- "Customer support response times occasionally slow on technical issues." (Capterra)
- "USD and English only — not suitable for global orgs." (G2)

*Sources: [G2 Givebutter reviews](https://www.g2.com/products/givebutter/reviews), [Capterra Givebutter reviews](https://www.capterra.com/p/172048/Givebutter/reviews/)*

### Donorbox (G2: 4.7/5; Capterra: 4.7/5)

**Positive:**
- "Made with the nonprofit in mind — has all the functionality needed, easy to customize and manage donors." (G2)
- "Drastic drop in chargeback fees after switching from Classy/Salsa." (G2)
- "Beautiful forms and likely the cheapest fees you'll find." (The Digital Nonprofit)
- "QuickDonate for repeat donors drove our recurring rate up 18%." (Capterra)
- "Strong recurring donation features and automated tax receipts." (G2)

**Critical:**
- "Platform fee jumps to 3.95% for events and memberships — surprise at scale." (Capterra)
- "CRM is light — we still need a separate donor database for real segmentation." (G2)
- "Pro tier is $150/mo — a big jump with narrow rate reduction." (Capterra)
- "Customization is functional, not beautiful — forms look generic." (G2)
- "No native website — you always need to embed somewhere else." (G2)

*Sources: [G2 Donorbox reviews](https://www.g2.com/products/donorbox/reviews), [Donorbox pricing](https://donorbox.org/pricing)*

### Neon CRM (G2: 4.4/5; Capterra: 4.4/5)

**Positive:**
- "Feels like it was built by people who understand nonprofit work — donor records, events, email, and reports all in one." (G2)
- "Automation tools have saved us significant time, especially with thank-you emails and recurring giving." (G2)
- "Revenue-based pricing is fair for small orgs — we only pay more as we raise more." (SelectHub)
- "Native Mailchimp sync is the cleanest of any CRM we tested." (Capterra)
- "Strong value for money, especially for small-to-mid orgs." (G2)

**Critical:**
- "Convoluted menu structures — onboarding takes weeks, not days." (Capterra)
- "Does a lot but has issues — lacks some polish of more focused donation tools." (G2)
- "Starting at $139/mo is painful if you're under $50K annual revenue." (Reddit r/nonprofit)
- "Steep learning curve — non-technical staff struggle without training." (Capterra)
- "Events module is solid but UI feels dated compared to Givebutter/Donorbox." (G2)

*Sources: [G2 Neon CRM reviews](https://www.g2.com/products/neon-one-llc-neon-crm/reviews), [Capterra Neon CRM reviews](https://www.capterra.com/p/102088/NeonCRM/reviews/)*

---

## 8. Case Studies — Similar-Sized Arts/Cultural Nonprofits

### Givebutter
- **Studio Tenn Theater Company** — community theater nonprofit raised $150K+ via Givebutter campaigns. ([Givebutter success stories](https://givebutter.com/success-stories))
- **Various community arts orgs** — Givebutter explicitly positions itself as "best for smaller nonprofits or community-based orgs that run events and campaigns where storytelling and peer-to-peer fundraising matters." ([Donorbox comparison](https://donorbox.org/nonprofit-blog/donorbox-vs-givebutter))

### Donorbox
- **Vanguard Music & Performing Arts** — cultural nonprofit implemented Donorbox to streamline recurring giving and event ticketing. ([Donorbox case studies](https://donorbox.org/case-studies))
- **Donorbox positioning:** "most commonly used by small to mid-sized arts and culture, animal welfare, healthcare, educational, and religious organizations." ([Donorbox comparison](https://donorbox.org/nonprofit-blog/donorbox-vs-givebutter))

### Neon CRM
- Widely adopted by mid-size arts orgs and museums ($100K+ annual revenue) where CRM depth matters. Search results indicate strong adoption in cultural/historical nonprofits but fewer public case studies at the sub-$50K revenue tier — which is itself a signal: Neon CRM is built for orgs one size up from Mehfil's current stage.

---

## 9. Migration Path — From Current Setup to Recommended Stack

**Assumed pick: Givebutter for ops + keep Vercel site + keep Mailchimp + keep GoDaddy domain.**

### Phase 1 — Setup (Week 1, ~6 hours cofounder time)
1. Create free Givebutter account; verify 501(c)(3) status (usually <24hr).
2. Connect PayPal as a payment method in Givebutter settings (native — no extra steps).
3. Optional: Connect Stripe for card payments (increases donor payment options).
4. Set up Mailchimp-Givebutter Zapier flow (new contacts → Mailchimp audience).

### Phase 2 — Content migration (Week 2, ~8 hours)
5. Export ticket buyer list from GoDaddy events — import as contacts to Givebutter CRM.
6. Export Mailchimp audience → tag existing contacts in Givebutter for segmentation.
7. Recreate membership tiers in Givebutter (free + paid levels, define benefits).
8. Build signup forms in Givebutter for: artist applications, volunteer interest, private event inquiries.

### Phase 3 — Website integration (Week 3, ~4 hours founder time)
9. Embed Givebutter donation widget on mehfilnights.org (single `<script>` tag).
10. Replace GoDaddy ticket links with Givebutter event links on relevant pages.
11. Add Givebutter signup form embeds to "Artists," "Volunteer," and "Private Events" pages.
12. Test end-to-end: buy test ticket → receive receipt → appear in CRM → sync to Mailchimp.

### Phase 4 — Run one event on new system (Week 4, live)
13. Publish next event on Givebutter only — NOT on GoDaddy.
14. Monitor: ticket conversion rate, PayPal success rate, Mailchimp sync lag.
15. After event: review metrics, iterate.

### Phase 5 — Sunset GoDaddy events (Month 2)
16. Cancel GoDaddy events feature (keep the domain).
17. Confirm all past event data is archived locally (CSV export).

**Total migration effort: ~20 hours over 4 weeks. Zero overlap cost — Givebutter is free.**

### What STAYS
- Mailchimp (primary email), GoDaddy domain (just domain), Vercel/GitHub site, PayPal account.

### What GOES
- GoDaddy ticket/event feature (replaced by Givebutter).
- Any Google Forms currently used for ticket-adjacent data (replaced by Givebutter signup forms).

### What's OPTIONAL
- Keep Google Forms only for complex artist-application intake (it's genuinely better for long-form surveys than anyone's signup form widget).

---

## 10. Risks & What to Watch For

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Donor confusion over Givebutter tipping prompt | High | Medium | Write custom checkout copy explaining tipping is optional; set default tip to lower % (5% instead of 15%); monitor donor feedback in first 60 days. |
| Mailchimp↔Givebutter sync via Zapier fails silently | Medium | Medium | Check Zapier logs weekly for first 90 days; set up alerts on task failures; consider Make.com as more reliable alt. |
| Cofounder gets stuck building campaigns | Medium | Low | Givebutter has drag-and-drop + 24/7 chat support; schedule 1hr onboarding with Givebutter CSM; founder documents 3 "standard flows" for cofounder. |
| Givebutter drops "tips-on = free" model | Low | High | The "Givebutter Guarantee" is public & marketed; contractually explicit. Keep Donorbox as a documented fallback with 2-week migration plan. |
| PayPal integration issues specific to nonprofit verification | Medium | Medium | Run $1 test transactions end-to-end before first live event; verify PayPal nonprofit rate (2.2% + 30¢) is applied. |
| Custom site drift from Givebutter brand | Medium | Low | Use Givebutter widgets (iframe/embed) rather than deep API integration — reduces coupling. |
| Need for deeper CRM (donor scoring, grant tracking) emerges at 3x scale | Medium | Medium | Plan a 12-month review checkpoint. Givebutter → Neon CRM migration is well-documented. |
| Google Forms remains critical for complex intake | High | Low | Accept it. Keep Google Forms for long-form artist apps; use Givebutter signup forms for everything short. Two tools > fighting to replace the right one. |

---

## 11. Decision Framework — 4 Questions Founders Must Answer

Before finalizing, each founder (both of you) should answer these. Disagreement is fine; it forces the real conversation.

### Q1. How do you feel about the tipping model?
Givebutter asks donors to add a ~15% tip at checkout to fund the platform. Most donors skip or reduce it — but some feel manipulated. **If that optics concern is a dealbreaker, pick Donorbox instead.** If you're comfortable setting tip to 5% default and writing clear copy, Givebutter's economics win.

### Q2. Do you need a real CRM today, or is "contacts + tags + email sync" enough for 12 months?
Givebutter/Donorbox give you contacts, tags, segments, and giving history — enough for 80% of small-org workflows. **If you need donor scoring, grant pipeline tracking, multi-year giving reports, or pledge management today, jump straight to Neon CRM** and accept the $180/mo and learning curve.

### Q3. Is the cofounder going to operate this platform solo, or will the founder always be available for setup?
If cofounder must self-serve: Givebutter > Donorbox > Wix > Neon (in that order of ease). If the founder is hands-on weekly: Neon CRM's depth becomes accessible. **Honesty matters here — plan for the cofounder's actual skill level, not the aspirational one.**

### Q4. What's the 3-year vision — do you expect to 3x revenue and staff?
- If you're staying small and event-driven: Givebutter covers you to $250K+/year without switching.
- If you're scaling toward a staffed org with development director, grants pipeline, multi-year donor cultivation: start on Givebutter for 12 months, then migrate to Neon when revenue clears ~$100K and the cost of Neon's $180/mo is <2% of budget.

---

## 12. Platforms to Explicitly NOT Use (and Why)

### ❌ Shopify — Confirmed unfit
"Shopify is designed for transactional relationships, not the deep, long-term stewardship required for donor cultivation. While Shopify excels at commerce, it was not built with the unique needs of donor relationship management in mind." ([Praella](https://praella.com/blogs/shopify-insights/shopify-for-non-profits-a-game-changer-for-mission-driven-organizations))
Use only if you start selling physical merch (t-shirts, artist merch) as a revenue stream. Even then, a Shopify "storefront" embed on your Vercel site is cheaper than a full Shopify migration.

### ❌ GoDaddy Website Builder + Commerce — Confirmed unfit
"All GoDaddy has for a donation system is a simple button that redirects the user to PayPal. Not ideal. Non-profits should instead look at Squarespace for a better donation system." ([Sitebuilder Report](https://www.sitebuilderreport.com/godaddy-review))
No native donor data, no CRM, no recurring donations, limited styling, no app marketplace. Keep the GoDaddy **domain**. Drop the GoDaddy site builder and events the moment Givebutter is live.

### ❌ Squarespace for donations specifically
PayPal can't be used for subscription products, recurring donations, or fixed-amount pricing plans on Squarespace — AND Squarespace stacks its own 3% fee on top of PayPal's 3%. ([Squarespace Help](https://support.squarespace.com/hc/en-us/articles/206545517-Accepting-PayPal))
6% combined fees is brutal for a nonprofit. Beautiful site, wrong tool.

### ❌ HubSpot Nonprofit at paid tiers
"HubSpot quickly becomes unaffordable for small-to-medium nonprofits on a budget, and the platform has bundled quite basic features requiring Professional licenses or higher." ([HubSpot Community](https://community.hubspot.com/t5/HubSpot-for-Nonprofits/Is-Hubspot-pricing-really-suitable-at-all-for-smaller-non/m-p/682173))
Free tier is fine for email/contacts but lacks donation tracking, gift acknowledgment, pledge management. Paid tiers are overkill unless you're a national org.

---

## Appendix — Source List

- [Givebutter Pricing](https://givebutter.com/pricing)
- [Givebutter G2 Reviews](https://www.g2.com/products/givebutter/reviews)
- [Givebutter Capterra Reviews](https://www.capterra.com/p/172048/Givebutter/reviews/)
- [Givebutter Mailchimp Integration](https://givebutter.com/integrations/mailchimp)
- [Givebutter PayPal Integration](https://givebutter.com/integrations/paypal)
- [Givebutter Membership Management](https://givebutter.com/features/membership-management)
- [Donorbox Pricing](https://donorbox.org/pricing)
- [Donorbox Events](https://donorbox.org/events)
- [Donorbox G2 Reviews](https://www.g2.com/products/donorbox/reviews)
- [Donorbox vs Givebutter](https://donorbox.org/nonprofit-blog/donorbox-vs-givebutter)
- [Neon CRM Pricing](https://neonone.com/solutions/neon-crm-overview/neon-crm-pricing/)
- [Neon CRM G2 Reviews](https://www.g2.com/products/neon-one-llc-neon-crm/reviews)
- [Neon CRM Mailchimp Integration](https://mailchimp.com/integrations/neoncrm-mailchimp-sync/)
- [Bloomerang Pricing](https://bloomerang.com/pricing/)
- [Bloomerang Capterra Reviews](https://www.capterra.com/p/131207/Bloomerang/reviews/)
- [GoFundMe Pro (Classy)](https://www.classy.org/)
- [HubSpot for Nonprofits](https://www.hubspot.com/nonprofits)
- [HubSpot Community — affordability concerns](https://community.hubspot.com/t5/HubSpot-for-Nonprofits/Is-Hubspot-pricing-really-suitable-at-all-for-smaller-non/m-p/682173)
- [Wix for Nonprofits Review (eRiders)](https://eriders.net/wix-for-nonprofits-review-website-builder-professional-enough/)
- [Squarespace PayPal Help](https://support.squarespace.com/hc/en-us/articles/206545517-Accepting-PayPal)
- [GoDaddy Review — Sitebuilder Report](https://www.sitebuilderreport.com/godaddy-review)
- [Shopify for Nonprofits — Praella](https://praella.com/blogs/shopify-insights/shopify-for-non-profits-a-game-changer-for-mission-driven-organizations)
- [Webflow for Nonprofit Websites](https://www.trajectorywebdesign.com/blog/webflow-for-nonprofit-websites/)
- [Donorbox + Webflow](https://donorbox.org/webflow-donation)
- [Kindful + Double the Donation](https://integrations.doublethedonation.com/kindful)
- [Bloomerang + Kindful](https://bloomerang.com/news/introducing-bloomerang-kindful-fundraising/)
- [The Digital Nonprofit — Donorbox Review](https://thedigitalnonprofit.com/donorbox-review/)
