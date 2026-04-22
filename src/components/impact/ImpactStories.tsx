import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * ImpactStories — 3 narrative pieces (artist / audience / volunteer) per
 * Saloni §2.4. Alternating 2-col layout on desktop (photo-left for odd
 * indices, photo-right for even). Stacks on mobile.
 *
 * TODO(founder + PM): all three stories are placeholders. Draft real versions
 * from event notes (per Decisions Log Q5). Verify names + quotes with subjects
 * before publishing. If fewer than 3 authentic stories exist, ship 2 — do NOT
 * fabricate.
 */

type Story = {
  number: string;
  category: string; // "ARTIST" | "AUDIENCE" | "VOLUNTEER"
  name: string;
  role: string;
  title: string;
  pullQuote: string;
  prose: string;
  photoAlt?: string;
};

const STORIES: Story[] = [
  {
    number: "01",
    category: "ARTIST",
    name: "Bhuwin",
    role: "Vocalist, May 2026 Mehfil at Ballard Coffee Works",
    title: "\u201CI\u2019ve never played a room this attentive.\u201D",
    pullQuote:
      "I forgot to check my phone for three hours. I can't remember the last time that happened on stage.",
    prose:
      "Bhuwin has performed at The Kennedy Center and KEXP, but his Mehfil at Ballard Coffee Works was something else. Sixty-four people on floor cushions, a single microphone, and a room so quiet you could hear the harmonium before he struck it. \u201CI played two encores I hadn\u2019t planned,\u201D he told us afterward. \u201CThe room asked for them — not with applause, with presence.\u201D We paid Bhuwin his pre-negotiated fee, provided his travel, and he\u2019s already asked to come back.",
  },
  {
    number: "02",
    category: "AUDIENCE",
    name: "Priya S.",
    role: "Audience member, Town Hall Seattle residency, 2024",
    title: "\u201CA room I didn\u2019t know I was looking for.\u201D",
    pullQuote:
      "I've lived in Seattle twelve years. I'd never heard a ghazal performed live here. Walking into that room was like walking into a memory I didn't know I had.",
    prose:
      "Priya moved from Lucknow to Seattle in 2012. She grew up attending mehfils every other month — her grandfather ran one in their living room. In Seattle, she stopped looking. When a friend texted her the ticket link for our November 2024 Town Hall residency, she bought one \u201Cout of curiosity, not expectation.\u201D The Tuesday after the show, she signed up as a monthly donor.",
  },
  {
    number: "03",
    category: "VOLUNTEER",
    name: "Rohan K.",
    role: "Volunteer since 2022",
    title: "\u201CI came to set up a microphone. I found a community.\u201D",
    pullQuote:
      "I thought I was helping out at a music event. It turns out I was joining a family.",
    prose:
      "Rohan moved to Seattle from Toronto for a tech job in 2021 and didn\u2019t know anyone. He answered a volunteer call on Instagram for our 2022 summer Mehfil, expecting to set up chairs and leave. Four years later, he runs sound at every Mehfil, trains new volunteers, and once flew back from a work trip a day early so he wouldn\u2019t miss a show. Rohan has logged over 200 volunteer hours; we pay him nothing, and he keeps showing up.",
  },
];

const PhotoPlaceholder = (
  <svg
    aria-hidden="true"
    viewBox="0 0 64 64"
    fill="none"
    className="w-16 h-16 text-turmeric opacity-30"
  >
    <path
      d="M30 18v20c0 3-3 5-6 5s-6-2-6-5 3-5 6-5c1 0 2 0 3 1V12l19-4v26c0 3-3 5-6 5s-6-2-6-5 3-5 6-5c1 0 2 0 3 1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ImpactStories() {
  return (
    <Section
      background="ivory"
      aria-labelledby="impact-stories-heading"
      data-testid="impact-stories-section"
      className="py-16 md:py-24"
    >
      <Container>
        <div className="mb-12 md:mb-16 max-w-[760px]">
          <h2
            id="impact-stories-heading"
            data-testid="impact-stories-heading"
            className="font-display text-dark-text text-[28px] md:text-[36px] leading-[1.2] mb-3"
          >
            Stories from the room
          </h2>
          <p className="font-accent italic text-[18px] md:text-[20px] text-henna">
            Three people. One mehfil each.
          </p>
        </div>

        <div className="space-y-16 md:space-y-20">
          {STORIES.map((s, i) => {
            const photoRight = i % 2 === 1;
            return (
              <article
                key={s.number}
                data-testid={`impact-story-${i}`}
                className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-8 md:gap-10"
              >
                <div
                  className={[
                    photoRight ? "md:order-last" : "",
                    "flex flex-col items-start",
                  ].join(" ")}
                >
                  <div
                    data-testid={`impact-story-${i}-photo`}
                    className="w-full max-w-[280px] aspect-square bg-sand rounded-[12px] flex items-center justify-center"
                  >
                    {PhotoPlaceholder}
                  </div>
                  <p className="font-body font-semibold text-[16px] text-dark-text mt-5">
                    {s.name}
                  </p>
                  <p className="font-accent italic text-[15px] text-henna">
                    {s.role}
                  </p>
                </div>

                <div>
                  <p className="font-body font-semibold text-[11px] uppercase tracking-[2px] text-muted mb-3">
                    STORY {s.number} / {s.category}
                  </p>
                  <h3 className="font-display text-dark-text text-[24px] md:text-[26px] leading-[1.3] mb-5">
                    {s.title}
                  </h3>
                  <p className="font-body text-[16px] leading-[1.8] text-body-text mb-6">
                    {s.prose}
                  </p>
                  <blockquote className="font-accent italic text-[20px] md:text-[22px] text-henna leading-[1.4] border-l-[3px] border-turmeric pl-5">
                    &ldquo;{s.pullQuote}&rdquo;
                  </blockquote>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
