import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

export function MarqueeBar() {
  const { t } = useI18n();
  const items = [...t.trustBadges, ...t.trustBadges, ...t.trustBadges];
  return (
    <div className="border-y border-border bg-surface overflow-hidden py-5">
      <div className="flex marquee whitespace-nowrap gap-12">
        {items.map((b, i) => (
          <span key={i} className="eyebrow text-muted-foreground flex items-center gap-12 shrink-0">
            {b} <span className="w-1.5 h-1.5 rounded-full bg-ember/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function FadeIn({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
