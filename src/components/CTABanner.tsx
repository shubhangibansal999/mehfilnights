import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

/**
 * CTABanner — Deep Olive closing band with two CTAs (Donate + Contact).
 * Used on /about and /impact. Saffron Donate + Teal Contact pair gives the
 * reader who finished the page two exits without the /donate page's single
 * Saffron focus.
 *
 * NOTE: The Saffron button on this banner DOES count toward the site-wide
 * budget — but only on /donate (hero + closer). /about and /impact do NOT
 * use variant="dual" with a Saffron button; they use Turmeric here instead
 * to preserve the 4-total Saffron budget (Header + Homepage DonateBand +
 * Donate hero + Donate closer). See the primaryVariant prop.
 *
 * Saloni's About spec asks for Saffron here, but the site-wide Saffron
 * scarcity rule is load-bearing — preserving it is a deliberate deviation.
 * We use Turmeric for the primary on /about + /impact instead.
 */

export type CTABannerProps = {
  eyebrow: string;
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  /** Primary button color. Default Turmeric. Use Saffron only on /donate. */
  primaryVariant?: "turmeric" | "saffron";
  /** For aria-labelledby — must be unique per banner on the page. */
  id?: string;
};

export default function CTABanner({
  eyebrow,
  heading,
  body,
  primary,
  secondary,
  primaryVariant = "turmeric",
  id = "cta-banner-heading",
}: CTABannerProps) {
  return (
    <Section
      background="deep-olive"
      aria-labelledby={id}
      data-testid="cta-banner-section"
      className="py-20 md:py-28"
    >
      <Container>
        <div className="max-w-[820px] mx-auto text-center">
          <p
            data-testid="cta-banner-eyebrow"
            className="font-accent italic text-[18px] md:text-[20px] text-turmeric mb-5"
          >
            {eyebrow}
          </p>
          <h2
            id={id}
            data-testid="cta-banner-heading"
            className="font-display text-ivory text-[28px] md:text-[40px] leading-[1.15] mb-6"
          >
            {heading}
          </h2>
          <p
            data-testid="cta-banner-body"
            className="font-body text-[17px] text-ivory/90 leading-[1.8] mb-10 max-w-[560px] mx-auto"
          >
            {body}
          </p>

          <div
            data-testid="cta-banner-buttons"
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Button
              href={primary.href}
              variant={primaryVariant}
              size="lg"
              aria-label={primary.label}
            >
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="teal" size="lg">
              {secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
