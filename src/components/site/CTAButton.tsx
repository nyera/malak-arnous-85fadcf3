import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.15em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3.5 text-xs",
  lg: "px-8 py-5 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-ember text-background hover:bg-ember-glow shadow-[0_10px_40px_-10px_oklch(0.68_0.19_38_/_0.6)] hover:shadow-[0_20px_50px_-10px_oklch(0.78_0.18_55_/_0.7)] hover:-translate-y-0.5",
  secondary:
    "bg-foreground text-background hover:bg-foreground/90",
  ghost:
    "bg-transparent text-foreground hover:bg-surface-elevated",
  outline:
    "border border-foreground/20 text-foreground hover:border-ember hover:text-ember",
};

export const CTAButton = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", size = "md", icon, className, children, ...rest }, ref) => (
    <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      <span>{children}</span>
      {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
    </button>
  ),
);
CTAButton.displayName = "CTAButton";
