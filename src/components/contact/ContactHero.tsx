import Container from "@/components/Container";

/**
 * ContactHero — warm Ivory greeting band. NOT Deep Olive — a contact hero
 * that reads as night-time feels unapproachable.
 *
 * Per Saloni §2.1: short (~36vh), centered, FAQ deflection link at the bottom.
 */
export default function ContactHero() {
  return (
    <section
      data-testid="contact-hero"
      aria-labelledby="contact-hero-heading"
      className="relative bg-ivory min-h-[28vh] md:min-h-[36vh] flex items-center border-b-4 border-turmeric"
    >
      <Container className="py-14 md:py-20">
        <div className="max-w-[640px] mx-auto text-center">
          <p
            data-testid="contact-hero-eyebrow"
            className="font-accent italic text-[18px] text-henna mb-4"
          >
            Get in touch.
          </p>
          <h1
            id="contact-hero-heading"
            data-testid="contact-hero-heading"
            className="font-display text-dark-text text-[32px] md:text-[44px] leading-[1.15] mb-5"
          >
            We&rsquo;d love to hear from you.
          </h1>
          <p
            data-testid="contact-hero-body"
            className="font-body text-[17px] text-body-text leading-[1.7] mb-5"
          >
            Whether you&rsquo;re an artist looking to perform, a neighbor with
            a question, a foundation curious about our work, or someone who
            wants to help host the next Mehfil — send us a note. We read every
            message and typically respond within 24 hours.
          </p>
          <a
            href="#faq"
            data-testid="contact-hero-faq-link"
            aria-label="Scroll to FAQ section"
            className="inline-block font-body font-semibold text-[14px] text-trust-teal hover:underline"
          >
            Quick question? Check our FAQ below — you might find your answer
            in 10 seconds. ↓
          </a>
        </div>
      </Container>
    </section>
  );
}
