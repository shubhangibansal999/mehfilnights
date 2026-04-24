import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import UpcomingEventsList from "@/components/events/UpcomingEventsList";
import PastEventsArchive from "@/components/events/PastEventsArchive";
import { getUpcomingEvents, getPastEvents } from "@/lib/events";

/**
 * /events — list page per Saloni's Events v1 spec (Part A).
 *
 * Primary audience: community members deciding whether to come next Saturday.
 * Secondary: grant reviewers scanning the past-events archive as proof.
 *
 * Section rhythm: short Deep-Olive hero → Ivory upcoming-events catalog →
 * Deep-Olive past-events archive.
 *
 * ============================================================================
 * TODO(founder) placeholders on this page:
 *   - Real events — add to src/lib/events.ts (see the workflow comment at the
 *     top of that file). Tickets link to GoDaddy product pages.
 *   - Per-event hero images (currently falling back to the Turmeric-glyph
 *     placeholder on Deep Olive).
 *   - Past-event count (Saloni spec §2.3: "XX Mehfils since 2020").
 * ============================================================================
 */

export const metadata: Metadata = {
  title: "Events — Mehfil Nights · Upcoming & Past Mehfils in Seattle",
  description:
    "Every Mehfil is acoustic, intimate, and small enough that the artist can hear the audience breathe. See upcoming dates and our archive of past evenings in Seattle.",
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents(12);

  return (
    <>
      <EventsHero />
      <UpcomingEventsList events={upcoming} />
      <PastEventsArchive events={past} />
    </>
  );
}
