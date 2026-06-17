import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/content";

export function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative min-h-[320px] md:min-h-[260px]">
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
              "{t.quote}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <img src={t.avatar} alt={t.name} loading="lazy" className="w-14 h-14 rounded-full ring-2 ring-ember/40 object-cover" />
              <div className="text-left">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-ember uppercase tracking-widest">{t.result}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={() => setI((p) => (p - 1 + testimonials.length) % testimonials.length)}
          className="w-11 h-11 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1 transition-all rounded-full ${idx === i ? "w-8 bg-ember" : "w-2 bg-border"}`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setI((p) => (p + 1) % testimonials.length)}
          className="w-11 h-11 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
