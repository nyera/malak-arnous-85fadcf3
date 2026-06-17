import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { testimonialMeta } from "@/data/content";

export function TestimonialCarousel() {
  const { t } = useI18n();
  const items = t.testimonials.items.map((it, i) => ({ ...it, avatar: testimonialMeta[i].avatar }));
  const [i, setI] = useState(0);
  const tt = items[i];

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative min-h-[340px] md:min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center px-6"
          >
            <p className="font-serif text-2xl md:text-4xl leading-snug text-foreground italic mb-8">
              "{tt.quote}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <img src={tt.avatar} alt={tt.name} loading="lazy" className="w-14 h-14 rounded-full ring-2 ring-ember/40 object-cover" />
              <div className="text-start">
                <div className="font-semibold">{tt.name}</div>
                <div className="text-sm text-ember uppercase tracking-widest">{tt.result}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={() => setI((p) => (p - 1 + items.length) % items.length)}
          className="w-11 h-11 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 rtl:-scale-x-100" />
        </button>
        <div className="flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1 transition-all rounded-full ${idx === i ? "w-8 bg-ember" : "w-2 bg-border"}`}
              aria-label={`Go to ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setI((p) => (p + 1) % items.length)}
          className="w-11 h-11 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 rtl:-scale-x-100" />
        </button>
      </div>
    </div>
  );
}
