import { forwardRef, type ElementType, type ReactNode, type HTMLAttributes } from "react";

/**
 * Section — vertical-rhythm page section.
 * Default padding: 48px mobile, 80px desktop (per v3 spec — "80px between sections").
 *
 * Background options map to the v3 palette. The spec-intended uses are:
 *  - ivory      → default nonprofit trust layer (60%)
 *  - warm-white → grant/report pages
 *  - sand       → mission/impact (approachable)
 *  - deep-olive → the "night" moment (hero, event listings, artist spotlights)
 */
export type SectionBackground = "ivory" | "warm-white" | "sand" | "deep-olive" | "transparent";

const BACKGROUND_CLASSES: Record<SectionBackground, string> = {
  ivory: "bg-ivory text-body-text",
  "warm-white": "bg-warm-white text-body-text",
  sand: "bg-sand text-body-text",
  "deep-olive": "bg-deep-olive text-ivory",
  transparent: "",
};

export type SectionProps = {
  as?: ElementType;
  background?: SectionBackground;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section(
    { as: Component = "section", background = "ivory", children, className, ...rest },
    ref,
  ) {
    const classes = [
      "w-full",
      "py-12 md:py-20", // 48px mobile → 80px desktop
      BACKGROUND_CLASSES[background],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component ref={ref} className={classes} {...rest}>
        {children}
      </Component>
    );
  },
);

export default Section;
