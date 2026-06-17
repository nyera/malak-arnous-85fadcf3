import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export interface TestimonialT {
  name: string;
  handle: string;
  result: string;
  quote: string;
  avatar: string;
  program: string;
}

export function TestimonialCard({ t, index = 0 }: { t: TestimonialT; index?: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-7 rounded-sm border border-border bg-surface hover-lift break-inside-avoid mb-6"
    >
      <Quote className="w-6 h-6 text-ember/60 mb-4" />
      <blockquote className="text-foreground leading-relaxed mb-6">
        "{t.quote}"
      </blockquote>
      <figcaption className="flex items-center gap-3 pt-5 border-t border-border">
        <img
          src={t.avatar}
          alt={t.name}
          loading="lazy"
          className="w-11 h-11 rounded-full object-cover ring-2 ring-ember/30"
        />
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-sm">{t.name}</div>
          <div className="text-xs text-muted-foreground truncate">{t.handle} · {t.program}</div>
        </div>
        <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-ember font-semibold px-2.5 py-1 rounded-sm bg-ember/10 shrink-0">
          {t.result}
        </span>
      </figcaption>
    </motion.figure>
  );
}
