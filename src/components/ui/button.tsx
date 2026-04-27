import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-body font-medium tracking-tight transition-[transform,background-color,color,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-saffron";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-saffron text-bg hover:bg-saffron-soft active:translate-y-px shadow-[var(--shadow-cta)]",
  ghost:
    "border border-line-strong text-cream hover:border-saffron hover:text-saffron",
  link: "text-saffron underline underline-offset-4 decoration-saffron/40 hover:decoration-saffron",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-4 py-2 min-h-9",
  md: "text-sm px-6 py-3 min-h-11",
  lg: "text-base px-8 py-4 min-h-12",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface AsButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  href?: undefined;
}

interface AsLinkProps
  extends CommonProps,
    Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "children" | "className" | "href"
    > {
  href: string;
  external?: boolean;
}

export type ButtonProps = AsButtonProps | AsLinkProps;

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { variant = "primary", size = "md", className, children, ...props },
  ref,
) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props;
    if (external) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(props as AsButtonProps)}
    >
      {children}
    </button>
  );
});
