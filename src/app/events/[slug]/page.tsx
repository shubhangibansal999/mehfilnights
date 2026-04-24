import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetailHero from "@/components/event-detail/EventDetailHero";
import EventDescription from "@/components/event-detail/EventDescription";
import EventArtists from "@/components/event-detail/EventArtists";
import EventVenue from "@/components/event-detail/EventVenue";
import PastEventReflection from "@/components/event-detail/PastEventReflection";
import RelatedEvents from "@/components/event-detail/RelatedEvents";
import {
  getAllEventSlugs,
  getEventBySlug,
  getUpcomingEvents,
  formatDateLong,
} from "@/lib/events";
import { buildEventJsonLd } from "@/lib/event-schema";

/**
 * /events/[slug] — per Saloni's Events v1 spec (Part B).
 *
 * Reading order: Detail Hero → Description → Artists (v1 simplified) →
 * Venue → [past-only] What Happened → Related Events.
 *
 * Inline JSON-LD <script type="application/ld+json"> emits schema.org/Event
 * markup for SEO + Google Events carousels (PRD §4, Saloni §4).
 *
 * ============================================================================
 * TODO(founder) placeholders on this page:
 *   - Event data lives in src/lib/events.ts — edit there to add/update events.
 *     Tickets are sold on mehfilnights.com (GoDaddy); ticketUrl links out.
 *   - Per-event hero images.
 *   - Richer Artist schema is v2 (EventArtists currently shows names only).
 *   - For past events: photo-gallery integration (currently "See Photos"
 *     links to the ticket URL placeholder — swap to Instagram highlight URL).
 * ============================================================================
 */

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) {
    return { title: "Event not found — Mehfil Nights" };
  }
  return {
    title: `${event.title} — ${formatDateLong(event.date)} · Mehfil Nights`,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const upcoming = getUpcomingEvents();
  const jsonLd = buildEventJsonLd(event);

  return (
    <>
      {/* JSON-LD Event structured data for search / rich snippets. */}
      <script
        type="application/ld+json"
        data-testid="event-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <EventDetailHero event={event} />
      <EventDescription longDescription={event.longDescription} />
      <EventArtists artists={event.artists} />
      <EventVenue event={event} />
      <PastEventReflection event={event} />
      <RelatedEvents events={upcoming} currentSlug={event.slug} />
    </>
  );
}
