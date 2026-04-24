import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * EventDescription — prose-only long-form on Ivory.
 * 780px reading width. No section heading (prose flows from the hero H1).
 *
 * `longDescription` is a plain-text string with paragraph breaks on "\n\n".
 * Edit the longDescription field in src/lib/events.ts to change event copy.
 */

export default function EventDescription({
  longDescription,
}: {
  longDescription: string;
}) {
  const paragraphs = longDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <Section
      background="ivory"
      data-testid="event-description-section"
      className="py-14 md:py-20"
    >
      <Container className="max-w-[780px]">
        <p className="font-accent italic text-[18px] text-henna mb-6">
          About this evening.
        </p>
        <div className="space-y-6 font-body text-[17px] leading-[1.8] text-body-text">
          {paragraphs.map((para, i) => (
            <p key={i} data-testid={`event-description-paragraph-${i}`}>
              {para}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
