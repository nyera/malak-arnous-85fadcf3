import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";
import { STAN_URL } from "@/data/content";
import { useI18n } from "@/i18n/I18nProvider";

export interface Program {
  slug: string;
  name: string;
  duration: string;
  price: string;
  tagline: string;
  description: string;
  features: string[];
  badge: string | null;
}

export function ProgramCard({ program, index = 0 }: { program: Program; index?: number }) {
  const { t } = useI18n();
  const featured = program.badge != null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative flex flex-col p-8 lg:p-10 rounded-sm border bg-surface hover-lift",
        featured ? "border-ember/40 lg:scale-[1.03] bg-gradient-to-b from-surface to-surface-elevated" : "border-border",
      )}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="eyebrow px-3 py-1 bg-ember text-background rounded-sm text-[10px]">
            {program.badge}
          </span>
        </div>
      )}
      <div className="flex items-baseline justify-between mb-6 gap-3">
        <h3 className="display-md">{program.name}</h3>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{program.duration}</span>
      </div>
      <p className="text-serif-italic text-2xl text-ember mb-4">{program.tagline}</p>
      <p className="text-muted-foreground mb-8 leading-relaxed">{program.description}</p>

      <div className="mb-8">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="display-md ember-text">{program.price}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">{t.programs.oneTime}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-10 flex-1">
        {program.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check className="w-4 h-4 text-ember shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <CTAButton
        href={STAN_URL}
        external
        variant={featured ? "primary" : "outline"}
        className="w-full"
        icon={<ArrowRight className="w-4 h-4" />}
      >
        {t.cta.joinNow} — {program.name}
      </CTAButton>
    </motion.div>
  );
}
