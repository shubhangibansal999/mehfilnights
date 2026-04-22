import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * OurStory — narrative spine of /about. Warm White reading surface.
 * Container narrows to 860px for long-form prose legibility.
 *
 * Five numbered chapters with italic Instrument Serif subheads.
 * A 4px Turmeric chapter-mark ornament sits to the left of each chapter
 * subhead (hidden below 480px per Saloni's spec to reduce clutter).
 *
 * TODO(founder): fact-check city/year details in Chapter 1 — I seeded
 * Lahore + Boston + 2020 per Saloni's placeholder copy. Confirm real
 * trajectory before launch.
 */

type Chapter = { title: string; body: string };

const CHAPTERS: Chapter[] = [
  {
    title: "The first mehfil.",
    body: "Mehfil Nights began in 2020, in a living room in Seattle's Central District, with a dozen neighbors and a single acoustic guitar. The founder had moved west from Lahore by way of Boston, looking for a room where South Asian music lived the way it did back home — close, unhurried, shared with strangers who became friends by the end of the evening. That room didn't exist here, so we built it.",
  },
  {
    title: "Why it kept going.",
    body: "Word traveled the way it always has — through invitations, through WhatsApp groups, through neighbors bringing neighbors. By 2022 we had outgrown the first living room. Coffee roasteries opened their evening hours to us. A Fremont abbey invited us in. Town Hall Seattle offered a date. Each room was still small enough that the artist could hear the audience breathe.",
  },
  {
    title: "Becoming a nonprofit.",
    body: "In 2024, we filed for 501(c)(3) status. The paperwork was the easy part — the decision was harder. Going nonprofit meant saying out loud that Mehfil Nights was not a side project or a supper club or a commercial event business. It was a cultural institution, small but real, and it needed to be governed like one. We now have an organizing team, documented policies, and the transparency a community institution owes the community.",
  },
  {
    title: "The three pillars today.",
    body: "We host ticketed Mehfil evenings throughout the year. We run a residency program that platforms independent South Asian artists — with intentional support for women, non-binary musicians, and first-generation Americans. And we teach: every Mehfil introduces the stories behind the songs, because understanding is the first step to caring.",
  },
  {
    title: "What's next.",
    body: "The next mehfil is always being planned. We want every Seattle neighborhood to have one within walking distance. We want artists from Dhaka to Bellingham to know our room as a place where South Asian music is taken seriously. We want a listener who's never heard a ghazal before to leave their first Mehfil and come back for the next one.",
  },
];

export default function OurStory() {
  return (
    <Section
      background="warm-white"
      aria-labelledby="our-story-heading"
      data-testid="our-story-section"
      className="py-20 md:py-28"
    >
      <Container className="max-w-[860px]">
        <p
          data-testid="our-story-eyebrow"
          className="font-accent italic text-[18px] text-henna mb-3"
        >
          Our story.
        </p>
        <h2
          id="our-story-heading"
          data-testid="our-story-heading"
          className="font-display text-dark-text text-[28px] md:text-[36px] leading-[1.2] mb-6"
        >
          How one living-room evening became a nonprofit.
        </h2>
        <blockquote
          data-testid="our-story-pullline"
          className="font-accent italic text-[19px] md:text-[22px] text-henna leading-[1.4] max-w-[640px] mb-12"
        >
          &ldquo;We didn&rsquo;t set out to build an organization — we set out
          to find a room.&rdquo;
        </blockquote>

        <div data-testid="our-story-chapters" className="space-y-8">
          {CHAPTERS.map((c, i) => (
            <div
              key={c.title}
              data-testid={`our-story-chapter-${i}`}
              className="relative"
            >
              {/* 4px Turmeric chapter-mark ornament — hidden below 480px */}
              <span
                aria-hidden="true"
                className="hidden sm:block absolute -left-4 top-[12px] w-1 h-1 bg-turmeric"
              />
              <h3 className="font-accent italic text-[18px] md:text-[20px] text-henna leading-snug mb-3">
                {c.title}
              </h3>
              <p className="font-body text-[17px] leading-[1.8] text-body-text">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
