import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { brand } from "@/data/content";

export function AssessmentForm() {
  const { t } = useI18n();
  const sections = t.survey.sections;
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setVal = (id: string, v: string | string[]) => setValues((s) => ({ ...s, [id]: v }));
  const toggleCheckbox = (id: string, opt: string) => {
    const cur = (values[id] as string[]) || [];
    setVal(id, cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    sections.forEach((sec) =>
      sec.fields.forEach((f) => {
        if (f.required) {
          const v = values[f.id];
          if (!v || (Array.isArray(v) && v.length === 0) || (typeof v === "string" && !v.trim())) {
            errs[f.id] = "هذا الحقل مطلوب";
          }
        }
      })
    );
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = document.getElementById(`field-${Object.keys(errs)[0]}`);
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setState("loading");

    // Build email body
    const lines: string[] = ["استبيان الأكل العاطفي، التدمير الذاتي، والتحول في الحياة", ""];
    sections.forEach((sec) => {
      lines.push(`━━━ ${sec.title} ━━━`);
      sec.fields.forEach((f) => {
        const v = values[f.id];
        const ans = Array.isArray(v) ? (v.length ? v.join("، ") : "—") : (v && String(v).trim() ? String(v) : "—");
        lines.push(`• ${f.label}`);
        lines.push(`  ${ans}`);
        lines.push("");
      });
    });
    const body = lines.join("\n");
    const subject = "استبيان جديد من الموقع";
    const mailto = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open default mail client
    window.location.href = mailto;
    setTimeout(() => setState("success"), 600);
  };

  if (state === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
        <div className="w-16 h-16 mx-auto rounded-full ember-gradient grid place-items-center mb-6">
          <Check className="w-8 h-8 text-background" />
        </div>
        <h3 className="display-md mb-3">{t.survey.successTitle}</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">{t.survey.successBody}</p>
        <p className="text-sm text-muted-foreground">
          {brand.email}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {sections.map((sec) => (
        <fieldset key={sec.title} className="space-y-6 pb-8 border-b border-border last:border-0">
          <legend className="display-md ember-text mb-2">{sec.title}</legend>
          {sec.fields.map((f) => (
            <div key={f.id} id={`field-${f.id}`}>
              <label className="block eyebrow text-foreground mb-3 leading-relaxed">
                {f.label}{f.required && <span className="text-ember mr-1">*</span>}
              </label>

              {f.type === "text" || f.type === "email" ? (
                <input
                  type={f.type}
                  value={(values[f.id] as string) || ""}
                  onChange={(e) => setVal(f.id, e.target.value)}
                  className={input}
                />
              ) : f.type === "textarea" ? (
                <textarea
                  rows={4}
                  value={(values[f.id] as string) || ""}
                  onChange={(e) => setVal(f.id, e.target.value)}
                  className={input}
                />
              ) : f.type === "checkbox" ? (
                <div className="grid sm:grid-cols-2 gap-2">
                  {f.options?.map((opt) => {
                    const checked = ((values[f.id] as string[]) || []).includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleCheckbox(f.id, opt)}
                        className={cn(
                          "text-start px-4 py-3 rounded-sm border text-sm transition-all flex items-start gap-2",
                          checked ? "border-ember bg-ember/10 text-foreground" : "border-border bg-background hover:border-ember/50"
                        )}
                      >
                        <span className={cn("w-4 h-4 rounded-sm border shrink-0 mt-0.5 grid place-items-center", checked ? "border-ember bg-ember" : "border-border")}>
                          {checked && <Check className="w-3 h-3 text-background" />}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              ) : f.type === "radio" ? (
                <div className={cn("grid gap-2", f.options && f.options.length > 4 ? "grid-cols-5 sm:grid-cols-10" : "sm:grid-cols-2")}>
                  {f.options?.map((opt) => {
                    const selected = values[f.id] === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setVal(f.id, opt)}
                        className={cn(
                          "text-center px-4 py-3 rounded-sm border text-sm transition-all",
                          selected ? "border-ember bg-ember/10 text-foreground" : "border-border bg-background hover:border-ember/50"
                        )}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {errors[f.id] && <p className="text-xs text-destructive mt-2">{errors[f.id]}</p>}
            </div>
          ))}
        </fieldset>
      ))}

      <div className="pt-4">
        <CTAButton type="submit" size="lg" disabled={state === "loading"} className="w-full sm:w-auto">
          {state === "loading" ? (
            <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> {t.survey.sending}</span>
          ) : t.survey.submit}
        </CTAButton>
        <p className="text-xs text-muted-foreground mt-4">
          سيتم إرسال إجاباتك إلى {brand.email}
        </p>
      </div>
    </form>
  );
}

const input = "w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ember focus:ring-1 focus:ring-ember transition-colors";
