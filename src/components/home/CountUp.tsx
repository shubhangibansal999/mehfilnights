"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CountUp — animates a number from 0 to its target when scrolled into view.
 *
 * Parses the target from a formatted source like "2,400+" or "45" and
 * preserves any non-numeric prefix/suffix ("+", "$", etc.) as-is.
 * Uses IntersectionObserver so the count only fires once the element
 * actually enters the viewport, avoiding wasted animation on sections
 * the user never reaches.
 *
 * Accessibility:
 * - Respects `prefers-reduced-motion` — users who opt out of motion
 *   see the final value immediately with no animation.
 * - Renders as a plain <span> so typography styles from the parent
 *   (font-display, text-sage, etc.) cascade unchanged.
 */

type Props = {
  /** Source string, e.g. "2,400+", "45", "$1,200" */
  value: string;
  /** Animation duration in ms (default 1800) */
  duration?: number;
  /** % of element visible before firing (0–1, default 0.3) */
  threshold?: number;
};

function parseStat(str: string) {
  // Split into non-numeric prefix, numeric core, non-numeric suffix
  const match = str.match(/^([^\d-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return { target: 0, prefix: "", suffix: str, hasComma: false };
  const [, prefix, num, suffix] = match;
  const clean = num.replace(/,/g, "");
  const parsed = parseFloat(clean);
  return {
    target: Number.isNaN(parsed) ? 0 : parsed,
    prefix,
    suffix,
    hasComma: num.includes(","),
  };
}

function formatNumber(n: number, hasComma: boolean): string {
  const rounded = Math.round(n);
  return hasComma ? rounded.toLocaleString("en-US") : String(rounded);
}

export default function CountUp({
  value,
  duration = 1800,
  threshold = 0.3,
}: Props) {
  const { target, prefix, suffix, hasComma } = parseStat(value);
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reduced-motion users jump straight to the final value
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setCurrent(target);
      startedRef.current = true;
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          observer.disconnect();

          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            // easeOutCubic — fast start, gentle settle
            const eased = 1 - Math.pow(1 - t, 3);
            setCurrent(eased * target);
            if (t < 1) requestAnimationFrame(animate);
            else setCurrent(target); // snap to exact final value
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, threshold]);

  return (
    <span
      ref={ref}
      // Ensure screen readers announce the final value, not intermediate counts
      aria-label={value}
    >
      <span aria-hidden="true">
        {prefix}
        {formatNumber(current, hasComma)}
        {suffix}
      </span>
    </span>
  );
}
