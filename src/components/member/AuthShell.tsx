import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="section-y">
      <div className="container-x max-w-md">
        <div className="rounded-sm border border-border bg-surface p-7 md:p-9">
          <h1 className="display-md mb-2">{title}</h1>
          {subtitle && <p className="text-muted-foreground text-[15px] leading-relaxed mb-7">{subtitle}</p>}
          {children}
        </div>
        {footer && <div className="mt-6 text-center text-sm text-muted-foreground space-y-2">{footer}</div>}
      </div>
    </section>
  );
}

export function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block mb-4">
      <span className="block mb-2 text-[13px] font-medium text-foreground/80">{label}</span>
      <input
        {...props}
        className="w-full rounded-sm border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-colors focus:border-ember"
      />
    </label>
  );
}

export function SubmitButton({ loading, children }: { loading?: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 w-full rounded-full bg-ember px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:bg-ember-glow disabled:opacity-50"
    >
      {loading ? "لحظة..." : children}
    </button>
  );
}

export function FormMessage({ error, success }: { error?: string | null; success?: string | null }) {
  if (!error && !success) return null;
  return (
    <p className={"mb-4 rounded-sm px-4 py-3 text-sm " + (error ? "bg-ember/10 text-ember" : "bg-foreground/5 text-foreground")}>
      {error ?? success}
    </p>
  );
}

export function AuthLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-ember hover:underline">
      {children}
    </Link>
  );
}
