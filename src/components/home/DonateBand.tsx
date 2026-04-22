import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

/**
 * Donate CTA Band — the final Deep Olive moment.
 * Contains the second (and last) Saffron button on the page. The first is
 * the persistent Donate button in the header. Saffron scarcity is intentional.
 */
export default function DonateBand() {
  return (
    <Section
      background="deep-olive"
      aria-labelledby="donate-band-heading"
      data-testid="donate-band-section"
      className="py-20 md:py-28"
    >
      <Container>
        <div className="max-w-[760px] mx-auto text-center">
          <p
            data-testid="donate-eyebrow"
            className="font-accent italic text-[18px] md:text-[20px] text-turmeric mb-5"
          >
            Your donation keeps the room open.
          </p>
          <h2
            id="donate-band-heading"
            data-testid="donate-heading"
            className="font-display text-ivory text-[32px] md:text-[44px] leading-[1.15] mb-6"
          >
            Help us host the next Mehfil.
          </h2>
          <p
            data-testid="donate-body"
            className="font-body text-[17px] text-ivory/90 leading-[1.8] mb-10 max-w-[620px] mx-auto"
          >
            Your contribution pays artists, rents venues, provides sound and
            lights, and keeps ticket prices low so every neighbor can come.
            Every dollar stays in the room.
          </p>

          <div className="flex justify-center mb-6">
            {/* TODO(founder): swap href to real donation processor URL
                (Stripe / Givebutter / DonorBox) when the payment flow is wired. */}
            <Button
              href="/donate"
              variant="saffron"
              size="lg"
              aria-label="Donate to Mehfil Nights"
            >
              Donate Now →
            </Button>
          </div>

          <p
            data-testid="donate-tax-line"
            className="font-body text-[13px] text-sage-muted mb-2"
          >
            Mehfil Nights is a 501(c)(3) nonprofit. All donations are
            tax-deductible.
          </p>
          <p
            data-testid="donate-ein-line"
            className="font-body text-[12px] text-muted"
          >
            {/* TODO(founder): add real EIN once 501(c)(3) paperwork is on file. */}
            EIN: XX-XXXXXXX
          </p>
        </div>
      </Container>
    </Section>
  );
}
