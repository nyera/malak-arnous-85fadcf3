import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Props {
  before: string;
  after: string;
  alt?: string;
}

export function BeforeAfter({ before, after, alt = "Transformation" }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[4/5] overflow-hidden rounded-sm select-none cursor-ew-resize bg-surface"
      onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
      onMouseMove={(e) => dragging.current && update(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => update(e.touches[0].clientX)}
      onTouchMove={(e) => update(e.touches[0].clientX)}
    >
      <img src={after} alt={`${alt} after`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={`${alt} before`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      <span className="absolute top-4 left-4 eyebrow bg-background/80 backdrop-blur px-2.5 py-1 rounded-sm">Before</span>
      <span className="absolute top-4 right-4 eyebrow bg-ember text-background px-2.5 py-1 rounded-sm">After</span>

      <motion.div
        className="absolute top-0 bottom-0 w-px bg-ember pointer-events-none shadow-[0_0_20px_oklch(0.68_0.19_38_/_0.8)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ember grid place-items-center text-background shadow-ember">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
