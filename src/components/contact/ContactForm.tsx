"use client";

import {
  type FormEvent,
  type ReactNode,
  Suspense,
  useState,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

/**
 * ContactForm — single form with a Subject dropdown that reveals dynamic
 * additional fields per selection.
 *
 * v1 implementation uses native controlled form + React useState (NO external
 * form library — per task instructions). Submission is a stub
 * (console.log + success state). Real backend lands in Phase 3.
 *
 * Dynamic field reveal is announced via aria-live="polite" for screen readers.
 * Submit button is Turmeric (NOT Saffron — submission is not a donation).
 *
 * Pre-fills subject from ?subject= URL parameter (used by /donate's Other
 * Ways to Help tiles).
 *
 * TODO(phase-3): wire to Formspree, Resend, or Next.js server action with
 * email backend. Add DKIM/SPF for deliverability.
 */

type Subject =
  | "general"
  | "volunteer"
  | "artist"
  | "private-event"
  | "partnership";

type SubjectOption = { value: Subject; label: string };

const SUBJECT_OPTIONS: SubjectOption[] = [
  { value: "general", label: "General inquiry" },
  { value: "volunteer", label: "Volunteer" },
  { value: "artist", label: "Artist submission" },
  { value: "private-event", label: "Private event (At-Home)" },
  { value: "partnership", label: "Partnership / Press" },
];

const VOLUNTEER_INTERESTS = [
  "Events",
  "Tech",
  "Marketing",
  "Outreach",
  "Fundraising",
];

/** Map URL ?subject= values (from /donate tiles etc) to internal Subject enum. */
function normalizeSubject(raw: string | null): Subject {
  if (!raw) return "general";
  const r = raw.toLowerCase();
  if (r === "volunteer") return "volunteer";
  if (r === "artist" || r === "artist-submission") return "artist";
  if (r === "private-event" || r === "private" || r === "athome")
    return "private-event";
  if (
    r === "partnership" ||
    r === "press" ||
    r === "sponsor" ||
    r === "matching" ||
    r === "in-kind"
  )
    return "partnership";
  return "general";
}

/** Outer Suspense wrapper — Next.js requires useSearchParams inside Suspense. */
export default function ContactForm() {
  return (
    <Suspense fallback={<ContactFormShell loading />}>
      <ContactFormInner />
    </Suspense>
  );
}

function ContactFormShell({
  loading,
  children,
}: {
  loading?: boolean;
  children?: ReactNode;
}) {
  return (
    <Section
      background="sand"
      data-testid="contact-form-section"
      className="py-14 md:py-20"
    >
      <Container className="max-w-[880px]">
        <div
          className="bg-warm-white border border-clay rounded-[16px] p-6 md:p-10 max-w-[720px] mx-auto"
          data-testid="contact-form-card"
        >
          {loading ? (
            <p className="font-body text-[14px] text-muted italic text-center">
              Loading form…
            </p>
          ) : (
            children
          )}
        </div>
      </Container>
    </Section>
  );
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const presetSubject = normalizeSubject(searchParams.get("subject"));

  const [submitted, setSubmitted] = useState(false);

  // Base fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<Subject>(presetSubject);
  const [message, setMessage] = useState("");

  // Artist fields
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  const [musicLink, setMusicLink] = useState("");
  const [bio, setBio] = useState("");

  // Volunteer fields
  const [interests, setInterests] = useState<string[]>([]);

  // Private event fields
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  // Honeypot (invisible to humans, traps basic bots)
  const [honeypot, setHoneypot] = useState("");

  /**
   * Handle subject change — also resets fields belonging to the group we're
   * leaving. Done in the onChange handler (not a useEffect) to keep the
   * subject → field-reset link event-driven and silence the
   * react-hooks/set-state-in-effect lint rule.
   */
  const handleSubjectChange = (next: Subject) => {
    setSubject(next);
    if (next !== "artist") {
      setGenre("");
      setLocation("");
      setMusicLink("");
      setBio("");
    }
    if (next !== "volunteer") setInterests([]);
    if (next !== "private-event") {
      setEventDate("");
      setGuestCount("");
      setEventLocation("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return; // bot — silently drop
    const payload = {
      name,
      email,
      subject,
      message,
      ...(subject === "artist"
        ? { genre, location, musicLink, bio }
        : {}),
      ...(subject === "volunteer" ? { interests } : {}),
      ...(subject === "private-event"
        ? { eventDate, guestCount, eventLocation }
        : {}),
    };
    console.log("[contact stub] would send:", payload);
    /* TODO(phase-3): replace console.log with a server-action or Formspree
       POST. Honor founder's 24-hour response SLA in the confirmation copy. */
    setSubmitted(true);
  };

  if (submitted) return <SuccessCard />;

  /** Announced via aria-live when dynamic fields appear/disappear. */
  const dynamicAnnouncement =
    subject === "artist"
      ? "Four additional fields now visible: genre, location, music link, and short bio."
      : subject === "volunteer"
        ? "One additional required field now visible: interest areas."
        : subject === "private-event"
          ? "Three additional required fields now visible: event date, guest count, and event location."
          : "";

  return (
    <ContactFormShell>
      <p className="font-body font-bold text-[11px] uppercase tracking-[2px] text-muted mb-3">
        SEND US A NOTE
      </p>
      <h2
        id="contact-form-heading"
        data-testid="contact-form-heading"
        className="font-display text-dark-text text-[26px] md:text-[30px] leading-[1.2] mb-3"
      >
        How can we help?
      </h2>
      <p className="font-body text-[14px] text-body-text leading-[1.6] mb-8">
        All fields are required unless marked optional. We&rsquo;ll respond to
        the email you provide.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="contact-form-heading"
        data-testid="contact-form"
        className="space-y-6"
      >
        {/* Honeypot — off-screen, not tabbable, hidden from screen readers. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
            visibility: "hidden",
          }}
        >
          <label>
            Website (leave blank)
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>
        </div>

        {/* Name */}
        <Field
          id="contact-name"
          label="Your name"
          required
        >
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            aria-required="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="contact-name-input"
            className="contact-input"
          />
        </Field>

        {/* Email */}
        <Field id="contact-email" label="Email address" required>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            aria-required="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="contact-email-input"
            className="contact-input"
            autoComplete="email"
          />
        </Field>

        {/* Subject */}
        <Field id="contact-subject" label="Subject" required>
          <select
            id="contact-subject"
            name="subject"
            required
            aria-required="true"
            value={subject}
            onChange={(e) => handleSubjectChange(e.target.value as Subject)}
            data-testid="contact-subject-select"
            className="contact-input"
          >
            {SUBJECT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        {/* Message */}
        <Field id="contact-message" label="Message" required>
          <textarea
            id="contact-message"
            name="message"
            required
            aria-required="true"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            data-testid="contact-message-input"
            rows={5}
            className="contact-input resize-y"
          />
        </Field>

        {/* Live announce region for dynamic fields */}
        <div
          aria-live="polite"
          className="sr-only"
          data-testid="contact-form-announcer"
        >
          {dynamicAnnouncement}
        </div>

        {/* Dynamic group heading + fields */}
        {subject === "artist" && (
          <DynamicGroup label="FOR ARTIST SUBMISSIONS" testid="artist-fields">
            <Field id="artist-genre" label="Genre / Style" required>
              <input
                id="artist-genre"
                type="text"
                required
                aria-required="true"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                data-testid="artist-genre-input"
                className="contact-input"
                placeholder="Ghazal · Sufi fusion · Carnatic"
              />
            </Field>
            <Field id="artist-location" label="Location (city / region)" required>
              <input
                id="artist-location"
                type="text"
                required
                aria-required="true"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                data-testid="artist-location-input"
                className="contact-input"
              />
            </Field>
            <Field id="artist-music-link" label="Link to your music" required>
              <input
                id="artist-music-link"
                type="url"
                required
                aria-required="true"
                value={musicLink}
                onChange={(e) => setMusicLink(e.target.value)}
                data-testid="artist-music-link-input"
                className="contact-input"
                placeholder="https://…"
              />
            </Field>
            <Field
              id="artist-bio"
              label="Short bio (200 words max, optional)"
            >
              <textarea
                id="artist-bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                data-testid="artist-bio-input"
                rows={4}
                className="contact-input resize-y"
              />
            </Field>
          </DynamicGroup>
        )}

        {subject === "volunteer" && (
          <DynamicGroup label="FOR VOLUNTEERS" testid="volunteer-fields">
            <fieldset>
              <legend className="font-body font-semibold text-[13px] uppercase tracking-[1px] text-deep-olive mb-3">
                Interest areas <span aria-hidden="true" className="text-turmeric">*</span>
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {VOLUNTEER_INTERESTS.map((interest) => (
                  <label
                    key={interest}
                    className="inline-flex items-center gap-2 text-[14px] text-body-text"
                  >
                    <input
                      type="checkbox"
                      value={interest}
                      checked={interests.includes(interest)}
                      onChange={(e) => {
                        setInterests((prev) =>
                          e.target.checked
                            ? [...prev, interest]
                            : prev.filter((x) => x !== interest),
                        );
                      }}
                      data-testid={`volunteer-interest-${interest.toLowerCase()}`}
                      className="w-4 h-4 accent-turmeric"
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </fieldset>
          </DynamicGroup>
        )}

        {subject === "private-event" && (
          <DynamicGroup
            label="FOR PRIVATE EVENT (AT-HOME) INQUIRIES"
            testid="private-event-fields"
          >
            <Field id="event-date" label="Event date" required>
              <input
                id="event-date"
                type="date"
                required
                aria-required="true"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                data-testid="event-date-input"
                className="contact-input"
              />
            </Field>
            <Field
              id="event-guest-count"
              label="Approximate guest count"
              required
            >
              <input
                id="event-guest-count"
                type="number"
                min={1}
                required
                aria-required="true"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                data-testid="event-guest-count-input"
                className="contact-input"
              />
            </Field>
            <Field
              id="event-location"
              label="Event location (city or venue)"
              required
            >
              <input
                id="event-location"
                type="text"
                required
                aria-required="true"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                data-testid="event-location-input"
                className="contact-input"
              />
            </Field>
          </DynamicGroup>
        )}

        {/* Submit row */}
        <div className="pt-2 flex flex-col sm:flex-row sm:justify-end gap-3">
          <Button
            type="submit"
            variant="turmeric"
            size="lg"
            data-testid="contact-submit"
          >
            Send message →
          </Button>
        </div>

        <p className="font-body italic text-[13px] text-muted">
          By sending, you consent to Mehfil Nights storing your message to
          respond to you. We don&rsquo;t share your email.
        </p>
      </form>

      {/* Scoped input styling — keeps Tailwind utility count small here. */}
      <style>{`
        .contact-input {
          width: 100%;
          background-color: var(--color-warm-white);
          color: var(--color-dark-text);
          border: 1px solid var(--color-clay);
          border-radius: 8px;
          padding: 12px 16px;
          font-family: var(--font-body);
          font-size: 15px;
        }
        .contact-input:focus {
          outline: 2px solid var(--color-trust-teal);
          outline-offset: 2px;
          border-color: var(--color-trust-teal);
        }
        .contact-input::placeholder { color: var(--color-muted); }
      `}</style>
    </ContactFormShell>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-body font-semibold text-[13px] uppercase tracking-[1px] text-deep-olive mb-2 block"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-turmeric ml-1">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function DynamicGroup({
  label,
  testid,
  children,
}: {
  label: string;
  testid: string;
  children: ReactNode;
}) {
  return (
    <div
      data-testid={testid}
      className="border-t border-light-line pt-6 space-y-6"
    >
      <p className="font-body font-semibold text-[12px] uppercase tracking-[1px] text-henna">
        {label}
      </p>
      {children}
    </div>
  );
}

function SuccessCard() {
  return (
    <Section
      background="sand"
      data-testid="contact-form-success-section"
      className="py-14 md:py-20"
    >
      <Container className="max-w-[880px]">
        <div
          role="status"
          data-testid="contact-form-success"
          className="bg-warm-white border border-clay rounded-[16px] p-6 md:p-10 max-w-[620px] mx-auto text-center"
        >
          <div
            aria-hidden="true"
            className="w-12 h-12 mx-auto bg-sage rounded-full flex items-center justify-center mb-5"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5 9-11"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="font-display text-dark-text text-[24px] md:text-[26px] leading-[1.3] mb-4">
            Thanks — we got your note.
          </h3>
          <p className="font-body text-[15px] text-body-text leading-[1.7] mb-3">
            We read every message. You&rsquo;ll hear from us within 24 hours
            (typically the same day).
          </p>
          <p className="font-body text-[14px] text-body-text leading-[1.7] mb-6">
            For urgent matters, email us directly at{" "}
            <a
              href="mailto:hello@mehfilnights.org"
              className="text-trust-teal underline"
            >
              hello@mehfilnights.org
            </a>
            .
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="font-body font-semibold text-[14px] text-trust-teal underline"
            >
              See upcoming events →
            </Link>
            <Link
              href="/"
              className="font-body font-semibold text-[14px] text-trust-teal underline"
            >
              Return to home
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
