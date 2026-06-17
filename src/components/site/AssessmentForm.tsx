import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { STAN_URL } from "@/data/content";

export function AssessmentForm() {
  const { t } = useI18n();
  const e = t.survey.errors;
  const schema = z.object({
    name: z.string().trim().min(2, e.name).max(80),
    email: z.string().trim().email(e.email).max(200),
    age: z.string().min(1, e.age),
    goal: z.string().min(1, e.goal),
    weightToLose: z.string().min(1, e.weight),
    trainingFrequency: z.string().min(1, e.freq),
    experience: z.string().min(1, e.exp),
    obstacles: z.string().trim().min(10, e.obstacles).max(1000),
    commitment: z.string().min(1, e.commit),
  });
  type FormData = z.infer<typeof schema>;

  const steps: { fields: (keyof FormData)[] }[] = [
    { fields: ["goal", "weightToLose"] },
    { fields: ["age", "experience", "trainingFrequency"] },
    { fields: ["obstacles", "commitment"] },
    { fields: ["name", "email"] },
  ];

  const { register, handleSubmit, trigger, formState: { errors }, reset, watch, setValue } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });
  const [step, setStep] = useState(0);
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const next = async () => {
    const valid = await trigger(steps[step].fields);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onSubmit = async (_data: FormData) => {
    setState("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
    reset();
  };

  if (state === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
        <div className="w-16 h-16 mx-auto rounded-full ember-gradient grid place-items-center mb-6">
          <Check className="w-8 h-8 text-background" />
        </div>
        <h3 className="display-md mb-3">{t.survey.successTitle}</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">{t.survey.successBody}</p>
        <CTAButton href={STAN_URL} external size="lg" icon={<ExternalLink className="w-4 h-4" />}>
          {t.cta.joinNow}
        </CTAButton>
      </motion.div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-widest">
          <span className="text-muted-foreground">{t.survey.step} {step + 1} {t.survey.of} {steps.length}</span>
          <span className="text-ember font-semibold">{t.survey.stepTitles[step]}</span>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <motion.div initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} className="h-full ember-gradient" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 min-h-[320px]"
        >
          {step === 0 && (
            <>
              <Radio label={t.survey.goalLabel} value={watch("goal")} setValue={(v) => setValue("goal", v, { shouldValidate: true })} error={errors.goal?.message} options={t.survey.goalOptions} />
              <Radio label={t.survey.weightLabel} value={watch("weightToLose")} setValue={(v) => setValue("weightToLose", v, { shouldValidate: true })} error={errors.weightToLose?.message} options={t.survey.weightOptions} />
            </>
          )}
          {step === 1 && (
            <>
              <Radio label={t.survey.ageLabel} value={watch("age")} setValue={(v) => setValue("age", v, { shouldValidate: true })} error={errors.age?.message} options={t.survey.ageOptions} />
              <Radio label={t.survey.expLabel} value={watch("experience")} setValue={(v) => setValue("experience", v, { shouldValidate: true })} error={errors.experience?.message} options={t.survey.expOptions} />
              <Radio label={t.survey.freqLabel} value={watch("trainingFrequency")} setValue={(v) => setValue("trainingFrequency", v, { shouldValidate: true })} error={errors.trainingFrequency?.message} options={t.survey.freqOptions} />
            </>
          )}
          {step === 2 && (
            <>
              <Field label={t.survey.obstaclesLabel} error={errors.obstacles?.message}>
                <textarea {...register("obstacles")} rows={5} className={input} placeholder={t.survey.obstaclesPlaceholder} />
              </Field>
              <Radio label={t.survey.commitmentLabel} value={watch("commitment")} setValue={(v) => setValue("commitment", v, { shouldValidate: true })} error={errors.commitment?.message} options={t.survey.commitmentOptions} />
            </>
          )}
          {step === 3 && (
            <>
              <Field label={t.survey.nameLabel} error={errors.name?.message}>
                <input type="text" {...register("name")} className={input} placeholder={t.survey.namePlaceholder} />
              </Field>
              <Field label={t.survey.emailLabel} error={errors.email?.message}>
                <input type="email" {...register("email")} className={input} placeholder={t.survey.emailPlaceholder} />
              </Field>
              <p className="text-xs text-muted-foreground">{t.survey.privacy}</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
        {step > 0 ? (
          <CTAButton type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft className="w-4 h-4 rtl:-scale-x-100 inline mr-2" />
            {t.cta.back}
          </CTAButton>
        ) : <div />}
        {step < steps.length - 1 ? (
          <CTAButton type="button" onClick={next} icon={<ArrowRight className="w-4 h-4" />}>{t.cta.next}</CTAButton>
        ) : (
          <CTAButton type="submit" disabled={state === "loading"}>
            {state === "loading" ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> {t.cta.submitting}</span> : t.cta.submit}
          </CTAButton>
        )}
      </div>
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

function Radio({ label, options, value, setValue, error }: { label: string; options: string[]; value: string; setValue: (v: string) => void; error?: string }) {
  return (
    <div>
      <span className="eyebrow text-foreground mb-3 block">{label}</span>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            type="button"
            key={opt}
            onClick={() => setValue(opt)}
            className={cn(
              "text-start px-4 py-3 rounded-sm border text-sm transition-all",
              value === opt
                ? "border-ember bg-ember/10 text-foreground"
                : "border-border bg-surface hover:border-ember/50",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <span className="text-xs text-destructive mt-1.5 block">{error}</span>}
    </div>
  );
}
