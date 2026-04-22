/**
 * Shared event data for Mehfil Nights v1.
 *
 * Consumed by:
 *  - src/components/home/UpcomingEvents.tsx (top-3 upcoming, preview)
 *  - src/app/events/page.tsx                (full upcoming + past archive)
 *  - src/app/events/[slug]/page.tsx         (per-event detail + static params)
 *
 * TODO(founder, phase-1): Replace with Sanity CMS queries when the Event schema
 * lands. Keep this shape aligned with PRD §10 so the swap is mechanical. Until
 * then, this is the single source of truth — never duplicate event objects.
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
  /** External ticket URL. Use "#" placeholder only if truly unknown. */
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
/*  Data — 3 upcoming (match homepage spec) + 3 past (grant evidence).       */
/*  TODO(founder): confirm artist names, exact datetimes, venue addresses.   */
/* ------------------------------------------------------------------------- */

export const EVENTS: Event[] = [
  /* -------- UPCOMING (3) -------- */
  {
    slug: "ghazal-evening-with-bhuwin",
    title: "A Ghazal Evening with Bhuwin Khanna",
    date: "2026-10-18T19:30:00-07:00",
    endDate: "2026-10-18T22:00:00-07:00",
    venue: "Ballard Coffee Works",
    venueAddress: "5465 Leary Ave NW, Seattle, WA 98107",
    neighborhood: "Ballard",
    description:
      "Folk-Sufi blends from Rajasthan and Punjab, performed acoustically on floor cushions.",
    longDescription:
      "Bhuwin's music lives in the space between Sufi traditions of Punjab and the folk repertoire of Rajasthan. His voice has traveled from small mehfils in Lahore to festival stages across the Pacific Northwest — but his preferred room is still a small one, with floor cushions and a single microphone.\n\nThe evening will open with traditional ghazals — Ghalib, Faiz, Amir Khusrau — and then move into Bhuwin's own compositions, which trace the same poetic tradition into contemporary rooms. Expect long, unhurried ragas; expect the occasional pause for a story; expect to leave humming a couplet you didn't know you'd remember.\n\nBallard Coffee Works will clear its seating and lay out floor cushions and low tables for the evening. Guests are welcome to bring a blanket. Tea and chai will be available; the café is BYOB for wine or beer.",
    artists: ["Bhuwin Khanna", "Rohan Krishnamurthy (tabla)"],
    ticketUrl: "#",
    isFree: false,
    status: "upcoming",
    priceUsd: 30,
    accessibility: ["Doors 7:00 PM", "Floor seating", "BYOB", "ADA accessible"],
  },
  {
    slug: "mehfil-berklee-indian-ensemble",
    title: "Mehfil × Berklee Indian Ensemble",
    date: "2026-11-14T20:00:00-08:00",
    endDate: "2026-11-14T22:30:00-08:00",
    venue: "Town Hall Seattle",
    venueAddress: "1119 8th Ave, Seattle, WA 98101",
    neighborhood: "First Hill",
    description:
      "A residency performance blending Carnatic, Hindustani, and contemporary fusion traditions.",
    longDescription:
      "Our second year partnering with Town Hall Seattle — and our first hosting the touring Berklee Indian Ensemble. Seven musicians, three traditions, one intentionally small room.\n\nThe ensemble has built its reputation on rearrangements of classical pieces for mixed-tradition instrumentation. Expect Carnatic vocal ornaments over Hindustani tabla rhythms, bansuri lines answered by cello, and a handful of contemporary fusion pieces that wouldn't sit anywhere else on the Seattle concert calendar.\n\nTown Hall's Forum stage fits 200. Tickets capped at 120 to keep the acoustic intimacy a mehfil requires.",
    artists: ["Berklee Indian Ensemble (7 musicians)"],
    ticketUrl: "#",
    isFree: false,
    status: "upcoming",
    priceUsd: 25,
    accessibility: [
      "Doors 7:30 PM",
      "Theater seating",
      "ADA accessible",
      "Street parking",
    ],
  },
  {
    slug: "emerging-voices-nikhil-aarthi",
    title: "Emerging Voices: Nikhil Iyer + Aarthi Kumar",
    date: "2027-01-24T19:00:00-08:00",
    endDate: "2027-01-24T21:30:00-08:00",
    venue: "Fremont Abbey Arts Center",
    venueAddress: "4272 Fremont Ave N, Seattle, WA 98103",
    neighborhood: "Fremont",
    description:
      "Two rising Seattle artists pair Coke Studio covers with original South Asian pop.",
    longDescription:
      "The first Emerging Voices evening of 2027. Two Seattle-based artists we're platforming early in their careers — both paid fairly, both given room to do the set they actually want to play.\n\nNikhil opens with a half-hour of Coke Studio favorites reimagined for guitar and voice. Aarthi closes with original compositions that draw from Carnatic vocal training and contemporary indie pop, in roughly equal measure. A short Q&A between sets lets the room meet both artists.",
    artists: ["Nikhil Iyer", "Aarthi Kumar"],
    ticketUrl: "#",
    isFree: false,
    status: "upcoming",
    priceUsd: 20,
    accessibility: ["Doors 6:30 PM", "Floor + chair seating", "ADA accessible"],
  },

  /* -------- PAST (3) — historical proof for grant reviewers -------- */
  {
    slug: "inaugural-living-room-mehfil",
    title: "The Inaugural Mehfil",
    date: "2020-03-07T19:00:00-08:00",
    endDate: "2020-03-07T22:00:00-08:00",
    venue: "A Central District living room",
    venueAddress: "Seattle, WA",
    neighborhood: "Central District",
    description:
      "Twelve neighbors. One guitar. The evening that started everything.",
    longDescription:
      "Our first night. Twelve neighbors crammed into a living room in Seattle's Central District, a single acoustic guitar, and three hours that went long.\n\nNo tickets, no website, no nonprofit — word traveled through a WhatsApp group and a shared living room. By the end of the evening we'd committed to doing it again the following month. Five years later, we're still at it.",
    artists: ["The Founder (solo, guitar)"],
    ticketUrl: "#",
    isFree: true,
    status: "past",
    priceUsd: 0,
    pastMetrics: { audience: 12, artistsPaid: 0, soldOut: false },
    pastQuote: {
      text: "It was the first time I heard a ghazal in Seattle. I've been at every Mehfil since.",
      attribution: "Neighbor, March 2020",
    },
    accessibility: ["Floor seating", "Private residence"],
  },
  {
    slug: "town-hall-residency-november-2024",
    title: "Town Hall Residency — November 2024",
    date: "2024-11-09T20:00:00-08:00",
    endDate: "2024-11-09T22:30:00-08:00",
    venue: "Town Hall Seattle",
    venueAddress: "1119 8th Ave, Seattle, WA 98101",
    neighborhood: "First Hill",
    description:
      "Our first residency partnership with a Seattle cultural institution.",
    longDescription:
      "Our first residency partnership with a Seattle cultural institution — and the evening that convinced us to file for 501(c)(3) status.\n\nA ghazal evening on Town Hall's Forum stage with a full ensemble: vocalist, tabla, harmonium, guitar. Fifty tickets sold, audience doubled from the prior year's coffee-shop run. The Seattle Times wrote about us for the first time the following week.",
    artists: ["Arya Shah", "Vikram Patel (tabla)", "Priya Nair (harmonium)"],
    ticketUrl: "#",
    isFree: false,
    status: "past",
    priceUsd: 30,
    pastMetrics: {
      audience: 50,
      artistsPaid: 3,
      soldOut: true,
      ticketPriceCap: 30,
    },
    pastQuote: {
      text: "I've lived in Seattle for twelve years and I'd never heard a ghazal performed live here. Walking into that room felt like walking into a memory I didn't know I had.",
      attribution: "Priya S., audience member",
    },
    accessibility: ["Theater seating", "ADA accessible", "Step-free entry"],
  },
  {
    slug: "fremont-abbey-summer-2025",
    title: "Summer Mehfil at Fremont Abbey",
    date: "2025-07-26T19:30:00-07:00",
    endDate: "2025-07-26T22:00:00-07:00",
    venue: "Fremont Abbey Arts Center",
    venueAddress: "4272 Fremont Ave N, Seattle, WA 98103",
    neighborhood: "Fremont",
    description:
      "A sold-out summer evening pairing Sufi qawwali with contemporary composition.",
    longDescription:
      "A sold-out Saturday in July. Qawwali in the first set, original contemporary compositions after the break, and a long Q&A with the artists over chai that went past closing time.\n\nFirst event where we hit our 80-person capacity before the door opened — a marker we've been chasing since.",
    artists: ["Zara Ahmed Qawwali Group (4 musicians)", "Arvind Mehta"],
    ticketUrl: "#",
    isFree: false,
    status: "past",
    priceUsd: 28,
    pastMetrics: {
      audience: 80,
      artistsPaid: 5,
      soldOut: true,
      ticketPriceCap: 28,
    },
    pastQuote: {
      text: "I've never played a room this attentive. I forgot to check my phone for three hours — can't remember the last time that happened on stage.",
      attribution: "Arvind Mehta, performing artist",
    },
    accessibility: ["Floor + chair seating", "ADA accessible", "Street parking"],
  },
];

/* ------------------------------------------------------------------------- */
/*  Query helpers                                                             */
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
