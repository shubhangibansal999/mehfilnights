/**
 * Shared event data for Mehfil Nights v1.
 *
 * Consumed by:
 *  - src/components/home/UpcomingEvents.tsx (top-3 upcoming, preview)
 *  - src/app/events/page.tsx                (full upcoming + past archive)
 *  - src/app/events/[slug]/page.tsx         (per-event detail + static params)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  WORKFLOW (no CMS):
 *
 *  Events are managed as PRODUCTS on mehfilnights.com (GoDaddy). The .org
 *  site shows a summary of each event and links the "Get Tickets" button to
 *  the GoDaddy product page where tickets are actually sold.
 *
 *  To add a new event:
 *    1. Create the event product on GoDaddy like you normally do.
 *    2. Copy the product's URL (e.g., https://www.mehfilnights.com/p/ghazal-night).
 *    3. Message the developer with: title, ISO date, venue, a 1-2 sentence
 *       blurb, artist name(s), and that GoDaddy URL.
 *    4. Developer adds a new entry to the EVENTS array below in <60 seconds
 *       and pushes — Vercel redeploys automatically.
 *
 *  To move an event to the past (grant-proof archive):
 *    After the event, change `status: "upcoming"` to `status: "past"` and
 *    fill in the `pastMetrics` and `pastQuote` fields.
 *
 *  To remove an event entirely:
 *    Delete its object from the EVENTS array.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Event = {
  slug: string;
  title: string;
  /** ISO 8601 datetime (event start). Used for <time datetime> + JSON-LD. */
  date: string;
  /** Optional end time ISO — used for JSON-LD endDate when present. */
  endDate?: string;
  venue: string;
  /** Street + city + region (single line). Populates schema.org PostalAddress. */
  venueAddress?: string;
  /** Neighborhood / district — human-friendly, e.g. "Capitol Hill". */
  neighborhood: string;
  /** Short summary (1–2 sentences, homepage / list card body). */
  description: string;
  /** Long-form description — used on the detail page. */
  longDescription: string;
  /** V1 simplified: artist names only. Richer Artist schema is v2 per PRD. */
  artists: string[];
  /** GoDaddy product page URL for ticket purchase. "#" only if truly unknown. */
  ticketUrl: string;
  /** Optional hero image URL. Falls back to Deep-Olive + Turmeric glyph. */
  imageUrl?: string;
  imageAlt?: string;
  /** Free events skip the Get-Tickets CTA copy. */
  isFree: boolean;
  status: "upcoming" | "past";
  /** Ticket price in USD for past/upcoming (for JSON-LD offer). 0 = free. */
  priceUsd?: number;
  /** Past-event-only: "what happened" metrics for the detail reflection block. */
  pastMetrics?: {
    audience?: number;
    artistsPaid?: number;
    soldOut?: boolean;
    ticketPriceCap?: number;
  };
  /** Past-event-only: attendee or artist pull quote. */
  pastQuote?: { text: string; attribution: string };
  /** Short access / logistics tags shown in the detail hero meta row. */
  accessibility?: string[];
};

/* ------------------------------------------------------------------------- */
/*  EVENT LIST — edit below to add/remove/move events.                        */
/*                                                                            */
/*  Empty on purpose until the founder supplies real events. The /events     */
/*  page renders an empty-state ("The next mehfil is being planned —         */
/*  subscribe for alerts") and the homepage hides the Upcoming Events         */
/*  section when this list is empty.                                          */
/* ------------------------------------------------------------------------- */

// Three sample events kept inline so the events list/detail pages render
// in the design-reference static export. Replace with real events when
// GoDaddy product URLs are ready.
//
// Quick-add template — copy, fill in, push:
// {
//   slug: "kebab-case-short-slug",
//   title: "Full event title",
//   date: "2026-10-18T19:30:00-07:00",
//   endDate: "2026-10-18T22:00:00-07:00",
//   venue: "Venue name",
//   venueAddress: "Street, City, State ZIP",
//   neighborhood: "Ballard",
//   description: "One-sentence homepage/list-card blurb.",
//   longDescription: "2–4 paragraph detail-page description.",
//   artists: ["Artist Name", "Supporting Artist"],
//   ticketUrl: "https://www.mehfilnights.com/p/your-godaddy-product-slug",
//   isFree: false,
//   status: "upcoming",
//   priceUsd: 30,
//   accessibility: ["Doors 7:00 PM", "Floor seating", "ADA accessible"],
// },
export const EVENTS: Event[] = [
  {
    slug: "ghazal-evening-october-2026",
    title: "An Evening of Urdu Ghazals",
    date: "2026-10-18T19:30:00-07:00",
    endDate: "2026-10-18T22:00:00-07:00",
    venue: "Town Hall Seattle",
    venueAddress: "1119 8th Ave, Seattle, WA 98101",
    neighborhood: "First Hill",
    description:
      "An intimate evening of Urdu ghazals — Ghalib, Faiz, Mir — performed acoustically with harmonium and tabla.",
    longDescription:
      "Join us in the warm acoustics of Town Hall's Forum room for an evening dedicated to the Urdu ghazal tradition. Featuring works of Ghalib, Faiz Ahmed Faiz, and Mir Taqi Mir, performed in the classical mehfil style — singer, harmonium, tabla — with the audience seated in close, attentive intimacy.\n\nDoors open at 7:00 PM with chai and light refreshments. The performance begins at 7:30 PM and runs ~90 minutes with a brief intermission. After the performance, our artists will join the audience for an informal Q&A.\n\nThis is a fundraising event — proceeds support our 2026 artist residency program.",
    artists: ["Reshma Khan", "Aamir Hussain (harmonium)", "Devdatta Joshi (tabla)"],
    ticketUrl: "https://www.mehfilnights.com/p/ghazal-evening-october-2026",
    isFree: false,
    status: "upcoming",
    priceUsd: 30,
    accessibility: ["Doors 7:00 PM", "Floor seating + chairs available", "ADA accessible"],
  },
  {
    slug: "diwali-mehfil-november-2026",
    title: "Diwali Mehfil — Songs of Light",
    date: "2026-11-08T18:00:00-08:00",
    venue: "The Royal Room",
    venueAddress: "5000 Rainier Ave S, Seattle, WA 98118",
    neighborhood: "Columbia City",
    description:
      "A Diwali celebration with bhajans, light bites, and community across Seattle's South Asian neighborhoods.",
    longDescription:
      "Celebrate Diwali with the Mehfil Nights community at The Royal Room — Columbia City's beloved listening room. The evening opens with bhajans by emerging local artists, transitions into a curated set of devotional and folk songs from across the subcontinent, and closes with chai, mithai, and conversation.\n\nThis is a family-friendly event. Children under 12 are welcome at no charge. We ask that everyone enter the listening space respectfully — phones silenced, conversations soft during the performance.",
    artists: ["Anjali Mehta", "The Saraswati Trio"],
    ticketUrl: "https://www.mehfilnights.com/p/diwali-mehfil-november-2026",
    isFree: false,
    status: "upcoming",
    priceUsd: 25,
    accessibility: ["Family-friendly", "ADA accessible", "Vegetarian refreshments"],
  },
  {
    slug: "monsoon-classical-may-2026",
    title: "Monsoon Mehfil — Hindustani Classical",
    date: "2026-05-30T19:00:00-07:00",
    venue: "Chapel Performance Space at the Good Shepherd Center",
    venueAddress: "4649 Sunnyside Ave N, Seattle, WA 98103",
    neighborhood: "Wallingford",
    description:
      "A spring evening of Hindustani classical music featuring raga performances tied to the monsoon season.",
    longDescription:
      "An evening dedicated to ragas of the rains — Megh, Miyan ki Malhar, Gaud Malhar — performed in the Chapel's storied acoustics. Featuring vocalist Pratima Rao and accompanists from the Pacific Northwest's classical music community.\n\nThis was our first ticketed concert hall event and remains one of the most-requested formats. Recordings of selected pieces are available on request to grant reviewers and academic researchers.",
    artists: ["Pratima Rao", "Suresh Iyer (tabla)", "Meera Patel (sarangi)"],
    ticketUrl: "https://www.mehfilnights.com/p/monsoon-classical-may-2026",
    isFree: false,
    status: "past",
    priceUsd: 35,
    accessibility: ["Doors 6:30 PM", "Chairs only", "ADA accessible"],
    pastMetrics: { audience: 78, artistsPaid: 4, soldOut: true, ticketPriceCap: 35 },
    pastQuote: {
      text: "I have not heard a Megh raga performed live in Seattle in twenty years. Thank you for bringing this here.",
      attribution: "Audience member · Wallingford",
    },
  },
];

/* ------------------------------------------------------------------------- */
/*  Query helpers — these all handle empty EVENTS arrays gracefully.          */
/* ------------------------------------------------------------------------- */

export function getUpcomingEvents(limit?: number): Event[] {
  const now = Date.now();
  const upcoming = EVENTS.filter(
    (e) => e.status === "upcoming" && new Date(e.date).getTime() >= now,
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export function getPastEvents(limit?: number): Event[] {
  const past = EVENTS.filter((e) => e.status === "past").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return typeof limit === "number" ? past.slice(0, limit) : past;
}

export function getEventBySlug(slug: string): Event | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

export function getAllEventSlugs(): string[] {
  return EVENTS.map((e) => e.slug);
}

/** Short human date label, e.g. "OCT 18" — used on event card pills. */
export function formatDatePill(iso: string): string {
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  return `${month} ${day}`;
}

/** Full human date, e.g. "Saturday, October 18, 2026 · 7:30 PM". */
export function formatDateLong(iso: string): string {
  const d = new Date(iso);
  const datePart = d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timePart = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${datePart} · ${timePart}`;
}

/** Date pill for detail hero, e.g. "OCT 18, 2026 · SATURDAY · 7:30 PM". */
export function formatDetailPill(iso: string): string {
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  const year = d.getFullYear();
  const weekday = d
    .toLocaleString("en-US", { weekday: "long" })
    .toUpperCase();
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${month} ${day}, ${year} · ${weekday} · ${time}`;
}
