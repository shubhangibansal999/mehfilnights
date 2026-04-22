import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * MilestonesTimeline — vertical timeline on Warm White.
 * 820px max-width. Sand-colored center track (4px) on desktop; shifts to the
 * left edge at <768px. Turmeric-filled 16px node circles; larger (24px) "start"
 * and "end" anchors at the top and bottom of the track.
 *
 * Per Saloni §2.3: grant-reviewer proof surface. "Milestones on a slow-growth
 * road" — the brand voice on longevity.
 *
 * TODO(founder): replace all 6 milestones with real dates + titles +
 * descriptions. If fewer than 4 real nodes exist, switch to a horizontal
 * 3-column "chapter markers" layout (different component) rather than padding
 * the timeline with filler.
 */

type Milestone = {
  date: string; // display string, e.g. "MARCH 2020"
  dateTime: string; // ISO-ish for <time datetime>, e.g. "2020-03"
  title: string;
  description: string;
  tag?: string;
};

const MILESTONES: Milestone[] = [
  {
    date: "MARCH 2020",
    dateTime: "2020-03",
    title: "The first mehfil.",
    description:
      "A single evening in a living room in Seattle's Central District. Twelve neighbors. One guitar.",
  },
  {
    date: "AUTUMN 2021",
    dateTime: "2021-10",
    title: "First paid artist.",
    description:
      "We charged tickets for the first time and paid our first performer a full fee — funded by volunteer donations.",
  },
  {
    date: "JUNE 2023",
    dateTime: "2023-06",
    title: "Town Hall Seattle residency.",
    description:
      "Our first venue partnership with a Seattle cultural institution. 50 tickets sold; audience doubled from the prior year.",
    tag: "In partnership with Town Hall Seattle.",
  },
  {
    date: "JULY 2024",
    dateTime: "2024-07",
    title: "Filed for 501(c)(3) status.",
    description:
      "The paperwork was the easy part; the commitment was harder. We began governing like an institution.",
  },
  {
    date: "APRIL 2025",
    dateTime: "2025-04",
    title: "First grant award.",
    description:
      "A Pacific Northwest arts foundation funded us at $5K — the first outside money that wasn't a friend's gift.",
    tag: "Supported by a regional arts grantmaker.",
  },
  {
    date: "TODAY",
    dateTime: new Date().toISOString().slice(0, 7),
    title: "The next mehfil is being planned.",
    description:
      "We want every Seattle neighborhood to have one within walking distance. We're working on it.",
  },
];

export default function MilestonesTimeline() {
  const lastIndex = MILESTONES.length - 1;

  return (
    <Section
      background="warm-white"
      aria-labelledby="milestones-heading"
      data-testid="milestones-section"
      className="py-16 md:py-24"
    >
      <Container className="max-w-[820px]">
        <div className="mb-10 md:mb-14">
          <h2
            id="milestones-heading"
            data-testid="milestones-heading"
            className="font-display text-dark-text text-[28px] md:text-[36px] leading-[1.2] mb-3"
          >
            How we got here
          </h2>
          <p className="font-accent italic text-[18px] md:text-[20px] text-henna">
            Milestones on a slow-growth road.
          </p>
        </div>

        <ol data-testid="milestones-list" className="relative list-none">
          {/* Track line — left on all breakpoints for consistent mobile/desktop
              rendering. Horizontal-alternating is a v2 enhancement. */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-1 bg-sand"
          />

          {MILESTONES.map((m, i) => {
            const isAnchor = i === 0 || i === lastIndex;
            return (
              <li
                key={m.date + m.title}
                data-testid={`milestone-${i}`}
                className="relative pl-12 pb-10 last:pb-0"
              >
                {/* Node marker */}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute left-0 top-1 rounded-full bg-turmeric flex items-center justify-center",
                    isAnchor ? "w-4 h-4" : "w-3 h-3 mt-[2px]",
                  ].join(" ")}
                >
                  {isAnchor && (
                    <span className="w-1.5 h-1.5 bg-warm-white rounded-full" />
                  )}
                </span>

                <div className="bg-ivory border border-light-line rounded-[12px] px-5 py-5">
                  <p className="font-body font-bold text-[13px] uppercase tracking-[1.5px] text-henna mb-2">
                    <time dateTime={m.dateTime}>{m.date}</time>
                  </p>
                  <h3 className="font-body font-semibold text-[18px] text-dark-text mb-2">
                    {m.title}
                  </h3>
                  <p className="font-body text-[14px] leading-[1.6] text-body-text">
                    {m.description}
                  </p>
                  {m.tag && (
                    <p className="font-accent italic text-[13px] text-henna mt-3">
                      {m.tag}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
