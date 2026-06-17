import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(80),
  email: z.string().trim().email("Valid email required").max(200),
  age: z.string().min(1, "Select your age range"),
  goal: z.string().min(1, "Pick a primary goal"),
  weightToLose: z.string().min(1, "Estimate your goal"),
  trainingFrequency: z.string().min(1, "Pick a training frequency"),
  experience: z.string().min(1, "Pick your experience level"),
  obstacles: z.string().trim().min(10, "Tell us a little more").max(1000),
  commitment: z.string().min(1, "Choose your commitment level"),
});
type FormData = z.infer<typeof schema>;

const steps: { title: string; fields: (keyof FormData)[] }[] = [
  { title: "Your Goal", fields: ["goal", "weightToLose"] },
  { title: "Your Background", fields: ["age", "experience", "trainingFrequency"] },
  { title: "Your Why", fields: ["obstacles", "commitment"] },
  { title: "Contact", fields: ["name", "email"] },
];

export function AssessmentForm() {
  const { register, handleSubmit, trigger, formState: { errors }, reset, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema), mode: "onChange",
  });
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
        <h3 className="display-md mb-3">You're in.</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We've received your assessment. A coach will review it and reach out within 24 hours with your next steps.
        </p>
      </motion.div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-widest">
          <span className="text-muted-foreground">Step {step + 1} of {steps.length}</span>
          <span className="text-ember font-semibold">{steps[step].title}</span>
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
              <Radio name="goal" label="What's your primary goal?" value={watch("goal")} setValue={(v) => setValue("goal", v, { shouldValidate: true })} error={errors.goal?.message}
                options={["Lose body fat", "Build muscle", "Recomp (both)", "Get stronger", "Feel better"]} />
              <Radio name="weightToLose" label="How much weight would you like to lose?" value={watch("weightToLose")} setValue={(v) => setValue("weightToLose", v, { shouldValidate: true })} error={errors.weightToLose?.message}
                options={["Under 10 lbs", "10–20 lbs", "20–40 lbs", "40–60 lbs", "60+ lbs", "Not focused on weight"]} />
            </>
          )}
          {step === 1 && (
            <>
              <Radio name="age" label="Age range" value={watch("age")} setValue={(v) => setValue("age", v, { shouldValidate: true })} error={errors.age?.message}
                options={["18–25", "26–35", "36–45", "46–55", "55+"]} />
              <Radio name="experience" label="Training experience" value={watch("experience")} setValue={(v) => setValue("experience", v, { shouldValidate: true })} error={errors.experience?.message}
                options={["Total beginner", "1–2 years", "3–5 years", "5+ years"]} />
              <Radio name="trainingFrequency" label="How many days per week can you train?" value={watch("trainingFrequency")} setValue={(v) => setValue("trainingFrequency", v, { shouldValidate: true })} error={errors.trainingFrequency?.message}
                options={["2 days", "3 days", "4 days", "5+ days"]} />
            </>
          )}
          {step === 2 && (
            <>
              <Field label="What's been holding you back?" error={errors.obstacles?.message}>
                <textarea {...register("obstacles")} rows={5} className={input} placeholder="Be honest — this is what we'll fix together." />
              </Field>
              <Radio name="commitment" label="How committed are you, on a scale of 1–10?" value={watch("commitment")} setValue={(v) => setValue("commitment", v, { shouldValidate: true })} error={errors.commitment?.message}
                options={["Below 7 — exploring", "7 — interested", "8 — ready", "9 — all in", "10 — nothing stops me"]} />
            </>
          )}
          {step === 3 && (
            <>
              <Field label="Your name" error={errors.name?.message}>
                <input type="text" {...register("name")} className={input} placeholder="Jane Doe" />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input type="email" {...register("email")} className={input} placeholder="jane@email.com" />
              </Field>
              <p className="text-xs text-muted-foreground">By submitting, you'll receive your personalised coaching match within 24 hours. No spam, ever.</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
        {step > 0 ? (
          <CTAButton type="button" variant="ghost" onClick={() => setStep((s) => s - 1)} icon={<ArrowLeft className="w-4 h-4 order-first" />}>
            Back
          </CTAButton>
        ) : <div />}
        {step < steps.length - 1 ? (
          <CTAButton type="button" onClick={next} icon={<ArrowRight className="w-4 h-4" />}>
            Continue
          </CTAButton>
        ) : (
          <CTAButton type="submit" disabled={state === "loading"}>
            {state === "loading" ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</span> : "Submit Assessment"}
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

function Radio({ name, label, options, value, setValue, error }: {
  name: string; label: string; options: string[]; value: string; setValue: (v: string) => void; error?: string;
}) {
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
              "text-left px-4 py-3 rounded-sm border text-sm transition-all",
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
      <input type="hidden" name={name} value={value || ""} readOnly />
    </div>
  );
}
