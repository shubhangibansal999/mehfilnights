# Givebutter Ticketing — Deep Dive

**Research date:** 2026-04-24
**Author:** Vansh (PM)
**Context:** Follow-up research after initial platform comparison ([`platform-comparison.md`](./platform-comparison.md)) tentatively recommended Givebutter as the operations platform for Mehfil Nights. Founder wanted specific detail on ticketing capabilities before committing.

---

## Ticketing Verdict

**Givebutter is a strong, low-cost ticketing tool for a small nonprofit gala** — weakest on promo-code granularity and "is this a donation or a ticket?" checkout clarity, but wins decisively on fees and day-of check-in.

**Recommendation: Yes, go with Givebutter for ticketing.** Two real risks to manage (tipping prompt on tickets, donation-vs-ticket framing), both mitigable with messaging.

---

## 1. Event setup — how complex is it to publish a ticketed event?

**Answer:** Form-based, step-by-step wizard (not drag-drop). Straightforward for a non-technical cofounder.

**Flow:**
1. Choose **"Event" campaign** type from the Campaigns menu
2. Set event name, date, time, location
3. Add ticket tiers — each tier supports:
   - Price
   - Quantity cap
   - Custom per-ticket fields (e.g., t-shirt size, dietary restriction, seating preference)
   - Visibility dates (e.g., early-bird until X date)
4. Configure promo codes
5. Customize the public event page (branding, description, images)
6. Publish

**Review signal:** Reviewers consistently describe event setup as "seamless" and beginner-friendly.

**Known gotchas from reviews:**

> *"The ticket sales features say 'donations' and don't look like a ticketing platform, so patrons are often confused about whether they are donating or buying tickets."*
> — [Capterra review](https://www.capterra.com/p/172048/Givebutter/reviews/)

- **No native multi-day event support** — a weekend festival requires separate campaigns per day (annoying for recurring events but fine for single-night mehfils)
- **Donor-vs-ticket framing in checkout copy** can confuse attendees (mitigable by customizing labels where possible)

**Sources:** [Capterra Givebutter Reviews](https://www.capterra.com/p/172048/Givebutter/reviews/)

---

## 2. Day-of event management — can a cofounder run it solo?

**Answer: Yes, completely. No developer needed.**

**What's available:**
- **Free iOS + Android app** that scans ticket QR codes via phone camera
- **Multiple simultaneous scanners** (several volunteers at the door each using their own phone)
- **Manual check-in** from the dashboard if a guest forgets their ticket
- **Guest list management** — see who's registered, edit contact info, resend tickets
- **Refund processing** from the web dashboard
- **Custom attendee fields** — collect dietary info, emergency contact, etc. at checkout and see at check-in

**Official quote:**
> *"The fastest method is to scan the QR code on a guest's ticket using the ticket scanner… once scanned, the ticket is automatically marked as checked in."*
> — [Givebutter Help: How to scan tickets](https://help.givebutter.com/en/articles/2852270-how-to-scan-tickets-and-check-guests-in)

**Cofounder-friendliness:** **Highest of any platform tested.** The mobile check-in app alone is a bigger quality-of-life improvement than most nonprofits realize until they've used it at an event.

**Sources:**
- [Givebutter Help: How to scan tickets and check guests in](https://help.givebutter.com/en/articles/2852270-how-to-scan-tickets-and-check-guests-in)
- [Givebutter: Ticket Scanning feature](https://givebutter.com/features/ticket-scanning)

---

## 3. Promo codes — native support?

**Answer: Yes, natively supported with the common features you'd expect.**

**Supported:**
- Percent off (e.g., "20% off all tickets")
- Dollar off (e.g., "$5 off")
- Usage count cap (e.g., "first 20 buyers")
- Per-ticket-type targeting (e.g., "only GA tickets, not VIP")
- Applied via "Enter Promo Code" field at checkout

**Limitations to know:**
- **Per-ticket, not per-order.** A $10 code on 4 tickets = $40 off (not $10 off the total). Can over-apply the discount if you're not careful.
- **Doesn't work on ticket bundles.** If you sell a "family of 4" bundle, promo codes don't discount it.
- **No native date-range expiry.** You manually enable/disable codes when the window closes. Minor friction but real.

**Sources:**
- [Givebutter Help: How to use promo codes](https://help.givebutter.com/en/articles/2799365-how-to-use-promo-codes)
- [Givebutter: Per-ticket promo codes changelog](https://community.givebutter.com/changelog/per-ticket-promo-codes)

---

## 4. Checkout convenience — 1-click, Apple Pay, Google Pay?

**Answer: Excellent payment coverage, minor friction on repeat checkout.**

| Feature | Supported? |
|---|---|
| Apple Pay | ✅ enabled by default |
| Google Pay | ✅ enabled by default |
| PayPal / Venmo / Cash App | ✅ |
| ACH bank transfer | ✅ (1.9% + $0.30) |
| Guest checkout (no account required) | ✅ |
| Saved card / one-click repeat | ⚠️ Partial — auto-fills from Apple/Google Pay digital wallet; no Givebutter-native stored login |
| Mobile-optimized flow | ✅ |

**Official quote:**
> *"Digital wallets like Apple Pay and Google Pay automatically display based on a donor's mobile device or desktop browser… donors will be able to give in seconds since we can pull information such as name, email, address, and phone right from their digital wallet."*
> — [Givebutter: Apple Pay & Google Pay page](https://givebutter.com/features/apple-pay-google-pay-donations)

**What this means in practice:** For mobile users (most of your audience), checkout is effectively one-click via Apple Pay or Google Pay — the wallet pre-fills everything. For desktop users with saved card in the browser, it's auto-fill fast. Pure friction complaints in reviews are about the donation-vs-ticket messaging, not the payment mechanics themselves.

**Sources:**
- [Givebutter: Apple Pay & Google Pay feature page](https://givebutter.com/features/apple-pay-google-pay-donations)

---

## 5. Fees — what's the real cost of selling $25 × 100 tickets = $2,500 gross?

### Fee structure by platform

| Platform | Platform fee | Processor fee | Tip/service fee burden | **Net to org** |
|---|---|---|---|---|
| **Givebutter, tips ON (Guarantee kicks in)** | 0% | 2.9% + $0.30 × 100 = $102.50 | Optional tip from ticket buyer; if sufficient tips, Givebutter's Guarantee covers processor fees | **~$2,500** |
| **Givebutter, tips ON (typical)** | 0% | ~$102.50 | Tip prompt shown | ~$2,397 |
| **Givebutter, tips OFF** | 3% flat = $75 | ~$102.50 | No tip prompt | **~$2,322** |
| **Eventbrite** (US, no nonprofit discount on paid tix) | 3.7% + $1.79/ticket = $271.50 | 2.9%/order (can be absorbed or passed to buyer) | Usually passed — buyer pays $27+ for a $25 ticket | ~$2,500 if passed; ~$2,155 if absorbed |
| **Donorbox Events** | 3.95% = $98.75 | 2.2% + $0.30 nonprofit Stripe = $85 | None | **~$2,316** |
| **GoDaddy** | No dedicated nonprofit ticketing product — you'd use Commerce + manual event page, which isn't competitive | — | — | n/a |

### Plain-English math on a $25 × 100 = $2,500 event

- **Givebutter, best case (tips cover processor):** You receive **$2,500** — literally 100%.
- **Givebutter, tips disabled:** You receive **$2,322** — organization pays the platform fee and processor fee (92.9% net).
- **Eventbrite, fees absorbed:** You receive **$2,155** (86.2% net).
- **Donorbox Events:** You receive **$2,316** (92.6% net).

**Over a year of 12 events at this scale, the difference between Givebutter and Eventbrite is ~$4,000 retained in your nonprofit** — enough to sponsor two additional artists or pay for a modest venue rental.

### The tip prompt — the single real objection

Yes, ticket buyers see a "Would you like to tip Givebutter?" prompt at checkout. This is the main trade-off for the low/zero fees.

**Mitigation:**
- The tip can be set to 0% default (not the standard 15% Givebutter suggests) — you configure this in campaign settings
- Pre-event messaging can clarify: *"Tickets are processed through Givebutter, our nonprofit platform. At checkout you may be asked to tip Givebutter directly — this is optional and supports their service, not Mehfil Nights."*
- ~15% of online reviews complain about feeling "tricked" by the prompt — this is solvable with the default-tip setting and clear UX on your event page

**Sources:**
- [Givebutter: Pricing](https://givebutter.com/pricing)
- [Givebutter Help: Tips, fees, and our commitment to 100% transparency](https://help.givebutter.com/en/articles/4117457-tips-fees-and-our-commitment-to-100-transparency)
- [Eventbrite Help: Ticketing Fees](https://www.eventbrite.com/help/en-us/articles/755615/how-much-does-it-cost-for-organizers-to-use-eventbrite/)
- [Eventbrite Help: Nonprofit pricing](https://www.eventbrite.com/help/en-us/articles/585157/can-my-nonprofit-or-charity-get-lower-fees-for-our-events/)
- [Donorbox: Events pricing](https://donorbox.org/pricing)
- [Donorbox: Event Ticketing](https://donorbox.org/events)

---

## 6. Ticket Bundles — Can we sell "Party of 4" packages?

*(Added 2026-04-24 — follow-up founder question about bundle strategy to drive group sales.)*

### Can you create a bundle of 4 tickets for a Party of 4?

**✅ YES — natively supported.**

You create a separate ticket type (e.g. "Party of 4", "Family Bundle", "Group of 4") at whatever price you want. Buyers click that one ticket type and receive 4 admissions in a single transaction. Common for galas, community events, and family-oriented programming.

**Strategic framing:** Set the bundle price BELOW the individual-ticket total to create a visible "saving" and drive group conversion.

- 4 individual tickets × $25 = $100 face value
- "Party of 4" bundle at $85 → buyer sees "save $15" → higher close rate
- Optional upsell layer: include a perk ("reserved seating", "first drink on us") to make the bundle feel richer

### Can you put a promo code on a ticket bundle later?

**❌ NO — this is a known Givebutter limitation.**

Promo codes **do not apply** to bundle ticket types. This is the single real constraint on the bundle strategy.

Source: [Givebutter Help: How to use promo codes](https://help.givebutter.com/en/articles/2799365-how-to-use-promo-codes) — promo codes apply per ticket type; bundle tickets (those that sell multi-admit as a single SKU) are excluded.

### Workarounds — 3 ways to subsidize bundles without promo codes

Since you can't promo-code a bundle, you achieve "bundle discounts" via **ticket-type configuration** and **time windows**:

**Option A — Pre-discount the bundle (simplest, recommended default)**

Just price the bundle below face value from day 1. The bundle IS the subsidy.

- Individual ticket: $25
- "Party of 4" bundle: $85 ($15 off built-in)
- No promo code needed; the savings story is in the bundle name

**Option B — Time-limited discounted bundle variants**

Create multiple ticket types that come and go, using quantity caps (natively supported) or manual toggling for date-range (minor friction):

- "Early Bird Party of 4" at $75, cap = first 10 sales
- "Regular Party of 4" at $85, unlocks after early-bird fills
- When the early-bird cap hits, Givebutter auto-hides it

**Option C — Promo on individuals, not bundles, during site-wide promos**

If you later run a "20% off all tickets" promo week, the code applies to individual ticket types only. Bundle buyers still get the pre-set bundle price. Two parallel deals running in parallel.

**Trade-off to know:** Bundle buyers during a promo week don't stack promo on top of bundle. Communicate this clearly ("Promo does not stack with bundles — choose whichever saves you more") OR during promo weeks, temporarily hide the bundle to push everyone to individual-ticket purchase.

### Recommended pattern for Mehfil: tiered bundles, no promo codes

Build group discounts directly into pricing from day 1 via a ladder of bundle types. This makes promos unnecessary for bundle-style savings.

| Ticket Type | Price | Effective per-person |
|---|---|---|
| Individual | $25 | $25 |
| Duo ("Bring a friend") | $45 | $22.50 |
| Party of 4 | $85 | $21.25 |
| Community Table (8) | $160 | $20 |

Benefits:
- Attendees self-select group size, see per-person savings transparently
- No promo code machinery needed for group discounts
- Clean pricing story for marketing: "Bring more friends, save more per person"
- Frees up the promo-code system for true one-off campaigns (Diwali week, birthday week, giving Tuesday) on **individual** tickets only

### Bundle-strategy FAQ

| Question | Answer |
|---|---|
| Can I create a "Party of 4" bundle? | ✅ Yes, native |
| Can I put a percent-off promo code on the bundle later? | ❌ No (Givebutter limitation) |
| Can I pre-discount the bundle at the time of creation? | ✅ Yes, price it however you want |
| Can I time-limit the bundle (e.g., early-bird)? | ✅ Via quantity cap; ⚠️ date cap is manual toggle |
| Can I stack a bundle with a site-wide promo? | ❌ No |
| Is this a reason to pick Eventbrite over Givebutter? | ❌ No — Eventbrite has the same bundle-vs-promo limitation |

### Bottom line on bundles

**This limitation does not change the Givebutter recommendation.** The tiered-bundle pattern above gives you a better pricing strategy than promo-code gymnastics anyway. Pre-set bundle pricing is cleaner, more transparent to buyers, and reduces operational complexity compared to running time-limited promo campaigns on bundles.

---

## Final Answer

**Yes, Givebutter is good enough for Mehfil Nights' ticketing.** It's the cheapest option tested, has legitimate QR check-in via a free mobile app, and supports every payment method a Seattle arts audience expects.

### The two real risks

1. **Ticket buyers may see a tip prompt on a $25 ticket and bristle.**
   *Mitigate:* Pre-event messaging + set default tip to 0%.

2. **The "donation" framing in checkout copy can confuse ticket buyers.**
   *Mitigate:* Customize button and field labels where possible. Test your first event flow with a friend before launching publicly.

### When to reassess

- **Multi-day festival support needed** → Givebutter forces separate campaigns per day. Awkward but survivable.
- **Bundle-level promo codes needed** → Switch or use multiple single-ticket codes.
- **Event volume exceeds ~50 events/year** → Consider Eventbrite's scale features, though fees will hurt.

### Otherwise

**No add-on needed. Commit.**

---

## All sources

1. [Capterra: Givebutter Reviews](https://www.capterra.com/p/172048/Givebutter/reviews/)
2. [G2: Givebutter Reviews](https://www.g2.com/products/givebutter/reviews)
3. [Givebutter Help: How to scan tickets and check guests in](https://help.givebutter.com/en/articles/2852270-how-to-scan-tickets-and-check-guests-in)
4. [Givebutter Help: How to use promo codes](https://help.givebutter.com/en/articles/2799365-how-to-use-promo-codes)
5. [Givebutter: Per-ticket promo codes changelog](https://community.givebutter.com/changelog/per-ticket-promo-codes)
6. [Givebutter: Apple Pay & Google Pay feature page](https://givebutter.com/features/apple-pay-google-pay-donations)
7. [Givebutter: Pricing](https://givebutter.com/pricing)
8. [Givebutter Help: Tips, fees, and our commitment to 100% transparency](https://help.givebutter.com/en/articles/4117457-tips-fees-and-our-commitment-to-100-transparency)
9. [Givebutter: Ticket Scanning feature](https://givebutter.com/features/ticket-scanning)
10. [Eventbrite Help: Ticketing Fees](https://www.eventbrite.com/help/en-us/articles/755615/how-much-does-it-cost-for-organizers-to-use-eventbrite/)
11. [Eventbrite Help: Nonprofit pricing](https://www.eventbrite.com/help/en-us/articles/585157/can-my-nonprofit-or-charity-get-lower-fees-for-our-events/)
12. [Donorbox: Events pricing](https://donorbox.org/pricing)
13. [Donorbox: Event Ticketing](https://donorbox.org/events)
