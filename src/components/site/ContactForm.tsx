import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { useI18n } from "@/i18n/I18nProvider";

export function ContactForm() {
  const { t } = useI18n();
  const schema = z.object({
    name: z.string().trim().min(2, t.contact.errors.name).max(80),
    email: z.string().trim().email(t.contact.errors.email).max(200),
    instagram: z.string().trim().max(80).optional(),
    message: z.string().trim().min(10, t.contact.errors.message).max(1000),
  });
  type FormData = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (_data: FormData) => {
    setState("loading");
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setState("success");
      reset();
    } catch {
      setState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label={t.contact.nameLabel} error={errors.name?.message}>
        <input type="text" {...register("name")} className={input} placeholder="Jane Doe" />
      </Field>
      <Field label={t.contact.emailLabel} error={errors.email?.message}>
        <input type="email" {...register("email")} className={input} placeholder="you@email.com" />
      </Field>
      <Field label={t.contact.igLabel} error={errors.instagram?.message}>
        <input type="text" {...register("instagram")} className={input} placeholder="@yourhandle" />
      </Field>
      <Field label={t.contact.messageLabel} error={errors.message?.message}>
        <textarea {...register("message")} rows={5} className={input} placeholder={t.contact.messagePlaceholder} />
      </Field>

      <AnimatePresence>
        {state === "success" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 p-4 rounded-sm bg-ember/10 border border-ember/30">
            <Check className="w-5 h-5 text-ember shrink-0" />
            <p className="text-sm">{t.contact.successMsg}</p>
          </motion.div>
        )}
        {state === "error" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 p-4 rounded-sm bg-destructive/10 border border-destructive/30">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
            <p className="text-sm">{t.contact.errorMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <CTAButton type="submit" size="lg" disabled={state === "loading"} className="w-full">
        {state === "loading" ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> {t.cta.sending}</span> : t.cta.sendMessage}
      </CTAButton>
    </form>
  );
}

const input = "w-full px-4 py-3.5 bg-surface border border-border rounded-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ember focus:ring-1 focus:ring-ember transition-colors";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-foreground mb-2 block">{label}</span>
      {children}
      {error && <span className="text-xs text-destructive mt-1.5 block">{error}</span>}
    </label>
  );
}
