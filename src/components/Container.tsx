import { forwardRef, type ElementType, type ReactNode, type HTMLAttributes } from "react";

/**
 * Container — max-width 1100px wrapper with responsive horizontal padding.
 * 16px mobile → 24px tablet (sm) → 32px desktop (md).
 * All page content should sit inside a Container for consistent gutters.
 */
export type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export const Container = forwardRef<HTMLElement, ContainerProps>(
  function Container({ as: Component = "div", children, className, ...rest }, ref) {
    const classes = [
      "w-full mx-auto max-w-[1100px]",
      "px-4 sm:px-6 md:px-8", // 16px → 24px → 32px
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

export default Container;
