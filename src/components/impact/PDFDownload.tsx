import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

/**
 * PDFDownload — Sand section with an Outline-button download card.
 * Grant-reviewer-facing. Outline (not Saffron) — this is a download action,
 * not a donation.
 *
 * TODO(founder): produce the 2025 Impact Report PDF (Canva / Figma / Word →
 * PDF — any format is fine for v1). Ship at
 * /public/reports/mehfil-nights-impact-2025.pdf. If not ready at launch,
 * replace the Button with a muted message: "Our 2025 report publishes in
 * [Month]. Email hello@mehfilnights.org for prior-year data."
 */

export default function PDFDownload() {
  const pdfUrl = "/reports/mehfil-nights-impact-2025.pdf";
  const sizeLabel = "1.2 MB";

  return (
    <Section
      background="sand"
      aria-labelledby="pdf-download-heading"
      data-testid="pdf-download-section"
      className="py-14 md:py-20"
    >
      <Container className="max-w-[820px]">
        <div
          role="region"
          aria-labelledby="pdf-download-heading"
          className="bg-warm-white border-2 border-deep-olive rounded-[16px] px-6 py-10 md:px-10 md:py-12 text-center"
        >
          <p className="font-body font-bold text-[11px] uppercase tracking-[2px] text-muted mb-4">
            FOR GRANT COMMITTEES & FUNDERS
          </p>
          <h2
            id="pdf-download-heading"
            data-testid="pdf-download-heading"
            className="font-display text-dark-text text-[24px] md:text-[28px] leading-[1.3] mb-4"
          >
            Download our 2025 Impact Report.
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-body-text max-w-[560px] mx-auto mb-8">
            A one-page PDF with our full year&rsquo;s activity, financials,
            program metrics, and stories — formatted for grant committee
            review. Updated annually each April.
          </p>

          <Button
            href={pdfUrl}
            variant="outline"
            size="lg"
            aria-label={`Download 2025 Impact Report, PDF, ${sizeLabel}`}
            data-testid="pdf-download-button"
          >
            Download PDF ({sizeLabel}) →
            <span className="sr-only">PDF, {sizeLabel}</span>
          </Button>

          <p className="font-body italic text-[13px] text-muted mt-5">
            Questions about our numbers or methodology?{" "}
            <a
              href="mailto:hello@mehfilnights.org"
              className="text-trust-teal underline"
            >
              Email hello@mehfilnights.org
            </a>{" "}
            — we&rsquo;ll respond within 3 business days.
          </p>
        </div>
      </Container>
    </Section>
  );
}
