import type { ReactNode } from "react";

export function AdminCard({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

export function StatBox({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3">
      <p className="mb-1 text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50";

export function AdminButton({
  variant = "primary",
  className = "",
  ...props
}: { variant?: "primary" | "outline" | "danger" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles =
    variant === "primary"
      ? "bg-ember text-background hover:opacity-90"
      : variant === "danger"
        ? "border border-ember/40 text-ember hover:bg-ember/10"
        : "border border-border hover:bg-background";
  return <button {...props} className={`${base} ${styles} ${className}`} />;
}

export function AdminField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-[13px] font-medium text-foreground/80">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-[15px] text-foreground outline-none transition-colors focus:border-ember";

export function Badge({ published }: { published: boolean }) {
  return (
    <span
      className={
        "rounded-full px-2.5 py-1 text-[11px] font-medium " +
        (published ? "bg-ember/15 text-ember" : "bg-foreground/10 text-muted-foreground")
      }
    >
      {published ? "منشور" : "مسودة"}
    </span>
  );
}

export function AdminMessage({ text }: { text: string | null }) {
  if (!text) return null;
  return <p className="mb-5 rounded-md bg-ember/10 px-4 py-3 text-sm text-ember">{text}</p>;
}

export function formatBytes(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
