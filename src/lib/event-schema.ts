/**
 * event-schema.ts — schema.org/Event JSON-LD builder.
 *
 * Output is embedded on every /events/[slug] page per Saloni's Events spec §4
 * and PRD §4. Powers Google Events carousels + rich snippets in search.
 */

import type { Event } from "./events";

const SITE_URL = "https://mehfilnights.org";
const ORG_NAME = "Mehfil Nights";

type PostalAddress = {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
};

/**
 * Best-effort parse of a single-line address into a schema.org PostalAddress.
 * Accepts formats like "5465 Leary Ave NW, Seattle, WA 98107" or "Seattle, WA".
 */
function parseAddress(address: string | undefined): PostalAddress {
  const base: PostalAddress = { "@type": "PostalAddress", addressCountry: "US" };
  if (!address) return { ...base, addressLocality: "Seattle", addressRegion: "WA" };

  const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
  // Case: "5465 Leary Ave NW, Seattle, WA 98107"
  if (parts.length >= 3) {
    const [street, locality, regionZip] = parts;
    const match = regionZip.match(/^([A-Z]{2})\s*(\d{5}(?:-\d{4})?)?$/);
    return {
      ...base,
      streetAddress: street,
      addressLocality: locality,
      addressRegion: match?.[1] ?? regionZip,
      postalCode: match?.[2],
    };
  }
  // Case: "Seattle, WA"
  if (parts.length === 2) {
    return {
      ...base,
      addressLocality: parts[0],
      addressRegion: parts[1],
    };
  }
  return { ...base, addressLocality: parts[0] ?? "Seattle", addressRegion: "WA" };
}

export function buildEventJsonLd(event: Event): Record<string, unknown> {
  const address = parseAddress(event.venueAddress);
  const absoluteImage = event.imageUrl
    ? event.imageUrl.startsWith("http")
      ? event.imageUrl
      : `${SITE_URL}${event.imageUrl}`
    : undefined;

  const offer = event.ticketUrl && event.ticketUrl !== "#"
    ? {
        "@type": "Offer",
        url: event.ticketUrl,
        price: String(event.priceUsd ?? 0),
        priceCurrency: "USD",
        availability:
          event.status === "upcoming"
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
        validFrom: new Date().toISOString(),
      }
    : undefined;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventStatus:
      event.status === "upcoming"
        ? "https://schema.org/EventScheduled"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.venue,
      address,
    },
    description: event.description,
    ...(absoluteImage ? { image: [absoluteImage] } : {}),
    organizer: {
      "@type": "NonprofitOrganization",
      name: ORG_NAME,
      url: SITE_URL,
    },
    performer: event.artists.map((name) => ({
      "@type": "PerformingGroup",
      name,
    })),
    ...(offer ? { offers: offer } : {}),
  };

  return jsonLd;
}
