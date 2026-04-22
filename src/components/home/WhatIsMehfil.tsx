import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * What is a Mehfil? — Cultural storytelling section.
 * The single most important education moment on the page for non-South-Asian
 * donors and grant reviewers. Narrow reading width, generous breathing room.
 * No photography — the prose IS the image.
 */
export default function WhatIsMehfil() {
  return (
    <Section
      background="warm-white"
      aria-labelledby="mehfil-heading"
      data-testid="mehfil-explainer-section"
      className="py-20 md:py-28"
    >
      <Container>
        <div className="max-w-[900px] mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 lg:gap-12">
          {/* Heading column */}
          <div>
            <h2
              id="mehfil-heading"
              data-testid="mehfil-heading"
              className="font-display text-dark-text text-[28px] md:text-[36px] leading-[1.2] mb-4"
            >
              What is a mehfil?
            </h2>
            <p
              data-testid="mehfil-italic-subtitle"
              className="font-accent italic text-[19px] md:text-[22px] text-henna leading-snug"
            >
              &ldquo;A room where the music meets you halfway.&rdquo;
            </p>
          </div>

          {/* Prose column */}
          <div className="space-y-6 font-body text-[17px] leading-[1.8] text-body-text">
            <p data-testid="mehfil-paragraph-1">
              The word <em className="italic">mehfil</em> is Urdu and Persian
              for an intimate gathering held in honor of music, poetry, and
              art. For centuries — in Lahore, Lucknow, Hyderabad, Karachi, and
              a hundred smaller cities — patrons opened their homes to artists,
              and neighbors came with nothing more than their attention. No
              stage. No spotlight. Just a shared room, a single microphone, and
              a tradition that kept itself alive one evening at a time.
            </p>
            <p data-testid="mehfil-paragraph-2">
              Mehfil Nights carries that tradition to Seattle. Our events
              happen in cozy neighborhood venues — coffee roasteries, small
              halls, living rooms. You sit on floor cushions or picnic
              blankets. You bring a beverage. You can whisper to the friend
              beside you without anyone turning around. The artist is close
              enough that you hear the breath before a note.
            </p>
            <p data-testid="mehfil-paragraph-3">
              Whether you grew up singing along to Noor Jehan, discovered
              Arijit last month, or have never heard a ghazal before — you
              belong here. A mehfil only works when the room is full of people
              who came curious.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
