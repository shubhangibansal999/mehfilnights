import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";

/**
 * Mehfil Nights Button — v3 brand system.
 *
 * Variant map per brand spec:
 *  - "saffron"  → DONATE CTA ONLY. Saffron is reserved exclusively for donation.
 *                 This scarcity is intentional; do not reuse for anything else.
 *  - "turmeric" → Events & tickets (Get Tickets, RSVP, etc.)
 *  - "teal"     → Mission, About, informational actions
 *  - "outline"  → Reports, grant pages, secondary/tertiary CTAs
 *  - "sand"     → Low-pressure CTAs (volunteer, newsletter, etc.)
 *
 * Base styling (spec): 14px text, weight 600, 6px radius, 14px×32px padding,
 * 2px border, 0.5px letter-spacing.
 */
export type ButtonVariant = "saffron" | "turmeric" | "teal" | "outline" | "sand";
export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Saffron — Donate CTA ONLY. Hover → Henna.
  saffron:
    "bg-saffron text-white border-saffron hover:bg-henna hover:border-henna",
  // Turmeric gold — Events & Tickets. Hover → transparent + turmeric text.
  turmeric:
    "bg-turmeric text-[#2B2B2B] border-turmeric hover:bg-transparent hover:text-turmeric",
  // Trust teal — Mission/Info. Hover → transparent + teal text.
  teal:
    "bg-trust-teal text-white border-trust-teal hover:bg-transparent hover:text-trust-teal",
  // Outline — Reports, secondary. Hover → Deep Olive fill + Ivory text.
  outline:
    "bg-transparent text-deep-olive border-deep-olive hover:bg-deep-olive hover:text-ivory",
  // Soft sand — Volunteer, low-pressure. Hover → Clay + white text.
  sand:
    "bg-sand text-deep-olive border-sand hover:bg-clay hover:text-white hover:border-clay",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "text-[13px] px-5 py-2",
  md: "text-[14px] px-8 py-[14px]", // spec default: 14px × 32px
  lg: "text-[15px] px-10 py-4",
};

const BASE_CLASSES = [
  "inline-flex items-center justify-center gap-2",
  "font-body font-semibold tracking-[0.5px]",
  "rounded-[6px] border-2",
  "transition-colors duration-200 ease-out",
  "cursor-pointer select-none whitespace-nowrap",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trust-teal",
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
].join(" ");

function composeClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  extra?: string,
) {
  return [BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], extra]
    .filter(Boolean)
    .join(" ");
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = "teal", size = "md", className, children, ...rest } = props;
    const classes = composeClassName(variant, size, className);

    if ("href" in props && props.href !== undefined) {
      const { href, ...anchorRest } = rest as Omit<ButtonAsLink, keyof CommonProps>;
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          data-testid={`button-${variant}`}
          {...anchorRest}
        >
          {children}
        </Link>
      );
    }

    const buttonRest = rest as Omit<ButtonAsButton, keyof CommonProps>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        data-testid={`button-${variant}`}
        {...buttonRest}
      >
        {children}
      </button>
    );
  },
);

export default Button;
