import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, highlight, description, align = "left", className }: Props) {
  return (
    <div className={cn("flex flex-col gap-5 max-w-3xl", align === "center" && "mx-auto text-center items-center", className)}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="h-px w-8 bg-ember" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="display-lg"
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-serif-italic ember-text normal-case">{highlight}</span>
          </>
        )}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
