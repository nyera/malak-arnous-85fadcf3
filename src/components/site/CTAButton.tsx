import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  href?: string;
  external?: boolean;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.18em] rounded-full transition-all duration-500 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background whitespace-nowrap";

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[10.5px]",
  md: "px-7 py-3.5 text-[11px]",
  lg: "px-10 py-5 text-[12px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:bg-ember shadow-[0_8px_30px_-12px_oklch(0.24_0.015_30_/_0.35)] hover:shadow-[0_14px_40px_-12px_oklch(0.66_0.115_28_/_0.45)] hover:-translate-y-0.5",
  secondary: "bg-ember text-background hover:bg-ember-glow hover:-translate-y-0.5 shadow-[0_8px_28px_-12px_oklch(0.66_0.115_28_/_0.4)]",
  ghost: "bg-transparent text-foreground hover:text-ember",
  outline: "border border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
};

export const CTAButton = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", size = "md", icon, href, external, className, children, ...rest }, ref) => {
    const content = (
      <>
        <span>{children}</span>
        {icon && <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">{icon}</span>}
      </>
    );
    const classes = cn(base, sizes[size], variants[variant], className);
    if (href) {
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={classes}>
          {content}
        </a>
      );
    }
    return (
      <button ref={ref} className={classes} {...rest}>
        {content}
      </button>
    );
  },
);
CTAButton.displayName = "CTAButton";

// Convenience: Stan-linked Join Now button
import { STAN_URL } from "@/data/content";
import { useI18n } from "@/i18n/I18nProvider";
import { ArrowRight } from "lucide-react";

export function JoinNowButton({ size = "md", className }: { size?: Size; className?: string }) {
  const { t } = useI18n();
  return (
    <CTAButton href={STAN_URL} external size={size} icon={<ArrowRight className="w-4 h-4" />} className={className}>
      {t.cta.joinNow}
    </CTAButton>
  );
}
