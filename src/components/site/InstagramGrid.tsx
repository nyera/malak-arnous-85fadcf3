import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import { brand, instagramPosts } from "@/data/content";

export function InstagramGrid() {
  return (
    <div>
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="grid place-items-center w-12 h-12 rounded-sm ember-gradient">
            <Instagram className="w-6 h-6 text-background" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold">{brand.instagramHandle}</div>
            <div className="text-sm text-muted-foreground">Daily training · nutrition · mindset</div>
          </div>
        </div>
        <a
          href={brand.instagram}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-ember hover:gap-3 transition-all"
        >
          Follow on Instagram <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {instagramPosts.map((src, i) => (
          <motion.a
            key={i}
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative aspect-square overflow-hidden rounded-sm bg-surface"
          >
            <img
              src={src}
              alt={`Instagram ${i + 1}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-300 grid place-items-center opacity-0 group-hover:opacity-100">
              <Instagram className="w-8 h-8 text-ember" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
